// 暂存轮播图，以后通过 getSwiperImage 方法（已定义）获取
// const swiper_images = [
//   "/images/index/358 180 swiper.png",
//   "/images/index/358 180 swiper.png",
//   "/images/index/358 180 swiper.png"
// ]

let app = getApp();
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
        destination: ""
      },
      courses: {
        title: "线上线下预约通道",
        destination: ""
      }

    },
    search_icon: app.getAsset("/icons/搜索.png"),
    map: {
      image: app.getAsset("/images/地图.png")
    },
    swiper_images: [],
    menu: {
    },
    suggestions: {
      courses: [
        {
          name: "夏布课程",
          avatar: app.getAsset("/images/头像.png"),
          craftman: "张师傅",
          desc: "从艺40年，坚守夏布工艺，融合现代设计理念，让千年技艺绽放新生命",
          tag: "工艺大师"
        }

      ]

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.DataBase.collection("goods").limit(4).get().then((res) => {
      this.setData({
        "suggestions.goods.items": res.data
      }, () => {
      })
    })

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

  gotoGoodsPage(e) {
    wx.switchTab({
      url: '/pages/goods/goods',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })

  },

  tapLocate() {
    wx.navigateTo({
      url: '/pages/workshops/workshops',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
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