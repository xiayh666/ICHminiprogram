import { db } from "../../src/DataBase";
const ZERO = 0
Page({
  data: {
    goods: [],
    shippingCost: ZERO.toFixed(2),
    discount: 0,

    user: {
      name: "曹操",
      phoneNumber: "1828****628"
    },
    address: {
      detail: "北京市朝阳区望京阜通东大街方恒国际中心a座",
      isDefault: true
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



