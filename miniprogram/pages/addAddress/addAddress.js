import { db } from "../../src/DataBase";


let app = getApp();


Page({
  data: {
    recipient: '',
    phone: '',
    address: '',
    isDefault: false,
    currentIndex: -1, // -1 表示默认是「新建」场景
    isEdit: false // 标记是否是编辑场景
  },

  onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    // 监听「编辑地址」的传递数据
    eventChannel.on('acceptAddress', (data) => {
      this.setData({
        recipient: data.address.recipient,
        phone: data.address.phone,
        address: data.address.address,
        isDefault: data.address.isDefault,
        currentIndex: data.index,
        isEdit: true // 标记为编辑场景
      });
    });
    // 新建场景：不接收acceptAddress事件，保持默认值即可
  },

  // 输入框绑定方法不变（bindRecipient、bindPhone等）
  bindRecipient(e) { this.setData({ recipient: e.detail.value }); },
  bindPhone(e) { this.setData({ phone: e.detail.value }); },
  bindAddress(e) { this.setData({ address: e.detail.value }); },
  bindDefault(e) { this.setData({ isDefault: e.detail.value }); },

  // 提交方法：区分新建和编辑
  submitEdit() {
    const { recipient, phone, address, isDefault, currentIndex, isEdit } = this.data;
    // 校验逻辑不变
    if (!recipient || !phone || !address) {
      wx.showToast({ title: '请完善信息', icon: 'none' });
      return;
    }

    const eventChannel = this.getOpenerEventChannel();
    if (isEdit) {
      // 编辑场景：回传修改后的数据和索引
      eventChannel.emit('updateAddress', {
        address: { id: Date.now(), recipient, phone, address, isDefault },
        index: currentIndex
      });
      (async () => {
        let { username, addressList } = (await db.collection("users").where({ username: app.globalData.username }).get()).data[0]
        if (isDefault) {
          addressList = addressList.map(i => {
            return {
              ...i,
              isDefault: false
            }
          })
        }
        addressList[currentIndex] = { recipient, phone, address, isDefault }
        db.collection("users").update({ username }, {
          addressList
        })
        console.log(db.collections)
      })()

    } else {
      // 新建场景：回传新地址数据
      eventChannel.emit('addNewAddress', {
        id: Date.now(), recipient, phone, address, isDefault
      });
      (async () => {
        let { username, addressList } = (await db.collection("users").where({ username: app.globalData.username }).get()).data[0]
        if (isDefault) {
          addressList = addressList.map(i => {
            return {
              ...i,
              isDefault: false
            }
          })
        }
        addressList.push({ recipient, phone, address, isDefault })
        db.collection("users").update({ username }, {
          addressList
        })
        console.log(db.collections)
      })()
    }

    // 提交成功后返回
    wx.showToast({ title: isEdit ? '修改成功' : '添加成功' });
    setTimeout(() => wx.navigateBack(), 1000);
  }
});