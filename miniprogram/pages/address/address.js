import { storage } from '../../src/Storage.js';
import { db } from "../../src/DataBase";
let app = getApp();



Page({
  data: {
    selectAddress: false,
    iconFront: storage.get('/images/铅笔icon.png'),
    addressList: [
    ]
  },

  onLoad() {
    // 从 DataBase 读取用户数据和地址数据
    (async () => {
      let { addressList } = (await db.collection("users").where({ username: app.globalData.username }).get()).data[0]
      this.setData({
        addressList
      })
    })()

    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('selectAddress', data => {
      this.data.selectAddress = true 
    });

  },
  selectAddress(e) {
    if (this.data.selectAddress !== true) {
      this.editAddress(e) 
      return
    }
    const index = e.currentTarget.dataset.index
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('addressSelected',this.data.addressList[index]);

    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  // 选择地址加编辑地址
  editAddress(e) {
    const index = e.currentTarget.dataset.index;
    const currentAddress = this.data.addressList[index];
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
      success: (res) => {
        // 传递编辑所需的地址和索引
        res.eventChannel.emit('acceptAddress', { address: currentAddress, index });
        // 监听B页面返回的「修改后地址」数据
        res.eventChannel.on('updateAddress', (updatedData) => {
          const newList = [...this.data.addressList];
          newList[updatedData.index] = updatedData.address;
          // 编辑默认地址时，清除其他默认
          if (updatedData.address.isDefault) {
            newList.forEach((item, i) => i !== updatedData.index && (item.isDefault = false));
          }
          this.setData({ addressList: newList });
        });
      }
    });
  },
  // 创建地址页面
  createAddress() {
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
      success: (res) => {
        res.eventChannel.on('addNewAddress', (newItem) => {
          let newList = [...this.data.addressList];
          // 若新地址设为默认，清除其他默认
          if (newItem.isDefault) {
            newList = newList.map(item => ({ ...item, isDefault: false }));
          }
          newList.push(newItem); // 新建地址用push添加
          this.setData({ addressList: newList });
        });
      }
    });
  }
});