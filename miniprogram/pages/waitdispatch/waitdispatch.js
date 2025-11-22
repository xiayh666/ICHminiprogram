import {storage} from "../../src/Storage.js"
Page({
  data: {
    dispatch:storage.get('/images/待发货1.png'),
    share:storage.get('/images/分享.png'),
    addeIcon:storage.get('/images/地址.png'),
    // 可根据实际需求从接口获取数据后赋值
    orderData: {
      realPrice:"",
      remainTime: "",
      receiver: "",
      phone: "",
      address: "",
      shopName: "",
      goods:
        {
          name: "",
          image: "",
          price:'' ,
          count: ''
        }
       ,
      orderNo: "",
      orderTime: "",
      payMethod: "",
      payStatus: ""
    }
  },

  onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    // 监听「编辑地址」的传递数据
    eventChannel.on('acceptOrder', (data) => {
      this.setData({
        'orderData.realPrice':data.order.realPrice,
        'orderData.remainTime': data.order.remainTime,
        'orderData.receiver': data.order.receiver,
        'orderData.phone': data.order.phone,
        'orderData.address': data.order.address,
        'orderData.shopName': data.order.merchantName ,
        'orderData.goods.name':data.order.goods.name,
        'orderData.goods.image':data.order.goods.goodsImg,
        'orderData.goods.price':data.order.goods.price,
        'orderData.goods.count':data.order.goods.count,
        'orderData.orderNo':data.order.orderId,
        'orderData.orderTime':data.order.createTime,
        'orderData.payMethod':data.order.payMethod,
        'orderData.payStatus':data.order.statusText
      });
    });
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