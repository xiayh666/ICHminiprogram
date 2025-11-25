// 暂存轮播图，以后通过 getSwiperImage 方法（已定义）获取
// const swiper_images = [
//   "/images/index/358 180 swiper.png",
//   "/images/index/358 180 swiper.png",
//   "/images/index/358 180 swiper.png"
// ]

let app = getApp();
import { db } from "../../src/DataBase";
import { storage } from "../../src/Storage";
let asset = (url) => {
  let res = storage.get(url)
  console.log(res)
  return res
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    locate_img: asset("/icons/定位.png"),
    slogan_img: asset("/images/slogan.png"),
    logo_img: asset("/images/logo.png"),
    mascot_img: asset("/images/mascot.png"),
    app: app,
    animation: "anim-disable",
    more: {
      image: asset("/images/更多.png"),
      goods: {
        title: "匠心之选 非遗好物",
        destination: "/pages/goods/goods"
      },
      courses: {
        title: "线上课程",
        destination: "/pages/online-courses/online-courses"
      }

    },
    // search_icon: app.getAsset("/icons/搜索.png"),
    map: {
      image: asset("/images/地图.png")
    },
    swiper_images: [],
    menu: {
    },
    suggestions: {
      courses: [

      ]

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let setup = (async () => {
      const goodsData = (await db.collection("goods").limit(4).get()).data
      this.setData({
        "suggestions.goods.items": goodsData
      })

      const coursesData = (await db.collection("courses").limit(1).get()).data
      console.log(coursesData)
        this.setData({
          "suggestions.courses": coursesData
        })


    })
    setTimeout(() => {
      setup()
      
    }, 500);


    // this.setData({
    //   "swiper_images": this.getSwiperImages(),
    //   "search_icon": "/images/index/20 20 search.png"
    // })

  },
  onImageLoad(e) {
    console.log(e)
    this.setData({
      animation: "anim-active"
    })
  },

  gotoTab(e) {
    wx.switchTab({
      url: e.currentTarget.dataset.destination,
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
  gotoPage(e) {
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.destination,
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

  tapLocate() {
    wx.navigateTo({
      url: '/pages/workshops/workshops',
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.data.suggestions.goods.items.forEach(i => {
    //   getApp().DataBase.add("goods", i)
    // });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  // getSwiperImages: function () {
  //   return swiper_images
  // }

})