import {storage} from "../../src/Storage.js"
Page({
  data: {
    clock:storage.get('/images/时钟.png'),
    share:storage.get('/images/分享.png'),
    addeIcon:storage.get('/images/地址.png'),
    // 可根据实际需求从接口获取数据后赋值
    orderData: {
      price: 15.20,
      remainTime: "23小时59分",
      receiver: "曹操",
      phone: "1828****628",
      address: "北京市朝阳区望京阜通东大街方恒国际中心a座",
      shopName: "夏布工坊",
      goods: {
        name: "夏布围巾",
        image: storage.get('/images/围巾1.png'),
        price: "15.20",
        count: 1
      },
      orderNo: "wx202009024559682059",
      orderTime: "2020-11-12 10:34:11",
      payMethod: "微信支付",
      payStatus: "已付款"
    }
  },

  onLoad: function () {
    // 页面加载时可请求订单数据并赋值
  },


  cancelOrder: function () {
    // 取消订单逻辑，可弹窗确认后调用接口
    wx.showModal({
      title: '提示',
      content: '确定要取消订单吗？',
      success: (res) => {
        if (res.confirm) {
          // 调用取消订单接口
          console.log('用户点击确定');
        }
      }
    });
  },

  goPay: function () {
    // 跳转支付逻辑
    wx.showToast({
      title: '跳转到支付页面',
      icon: 'none'
    });
    // 实际开发中可调用微信支付API
  }
});