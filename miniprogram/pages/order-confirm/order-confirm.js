import { db } from "../../src/DataBase";
const ZERO = 0

let app = getApp()

Page({
  data: {
    goods: [],
    shippingCost: ZERO.toFixed(2),
    discount: ZERO.toFixed(2),

    address: {
    },
  },
  onLoad() {
    (async () => {
      const goods = []
      for (let item of getApp().orderParams) {
        goods.push({
          ...item,
          ...((await db.collection("goods")
            .where({ _id: item.id })
            .get()).data[0])

        })
      }
      console.log(goods)
      this.setData({ goods })

      let { addressList } = (await db.collection("users").where({ username: app.globalData.username }).get()).data[0]
      let defaultAddress = null // 是否存在默认地址
      for (let address of addressList) {
        if (address.isDefault) {
          defaultAddress = address
        }
      }

      console.log("default:", defaultAddress)
      if (defaultAddress) {
        this.setData(defaultAddress)
      } else {

      }


      this.calcTotal();

    })()
  },
  calcTotal() {
    let totalPrice = 0;

    this.data.goods.forEach(item => {
      totalPrice += item.price * item.num;
    });


    this.setData({
      totalPrice
    });
  },

  selectAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
      success: (res) => {
        // 传递编辑所需的地址和索引
        res.eventChannel.emit('selectAddress');
        res.eventChannel.on('addressSelected', (addressData) => {
          this.setData(addressData)
        });
      }
    });

  },


  navigateBack() {
    wx.navigateBack({
      delta: 1
    });
  },


  editAddress() {
    // wx.navigateTo({
    //   url: ""
    // });
  },

  // 选择优惠卡券
  // chooseCoupon() {
  //   wx.showToast({
  //     title: "暂无可用优惠卡券",
  //     icon: "none"
  //   });
  // },

  // 提交订单
  submitOrder() {
    wx.showModal({
      title: "提交订单",
      content: "确认提交订单并支付吗？",
      confirmText: "确认支付",
      cancelText: "再想想",
      success: (res) => {
        if (res.confirm) {
          // 此处补充支付接口
          wx.showToast({
            title: "订单提交成功",
            icon: "success",
            success: () => {
              setTimeout(() => {
                wx.navigateTo({
                  url: "/pages/order-success/order-success"
                });
              }, 1500);
            }
          });
        }
      }
    });
  }
});



