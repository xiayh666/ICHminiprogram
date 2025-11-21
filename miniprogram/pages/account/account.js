import { storage } from '../../src/Storage.js';
import { db } from '../../src/DataBase.js';
let app = getApp();


Page({
  data: {
    iconFront:storage.get('/images/编辑icon.png'),
    avatar: "",
    nickname: "",
    id: "",
    phone: "",
    password: "",
    addressList: []
  },

  onLoad() {
    this.fetchUserInfo()
  },

//从数据库中加载用户信息
  async fetchUserInfo() {
    try {
      const { data } = await db.collection("users")
        .where({ username: app.globalData.username })
        .get();
  
      if (data.length > 0) {
        this.setData({
          nickname: data[0].username || [] ,
          phone: data[0].phone || [],
          password: data[0].password || [],
          id:data[0]._id || [],
          avatar:data[0].avatar || [],
          addressList: data[0].addressList || []
        });
      } else {
        // 用户不存在时的处理
        wx.showToast({
          title: '用户信息不存在',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error("获取地址列表失败：", error);
      wx.showToast({
        title: '加载地址失败',
        icon: 'error'
      });
    } 
  },
 
  // 点击头像的事件
  onAvatarTap: function () {
    wx.navigateTo({
      url: "/pages/avatar/avatar"
    });
  },

  // 点击编辑地址的事件
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
});