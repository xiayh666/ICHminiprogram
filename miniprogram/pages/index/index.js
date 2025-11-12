// 暂存轮播图，以后通过 getSwiperImage 方法（已定义）获取
const swiper_images = [
  "/images/index/358 180 swiper.png",
  "/images/index/358 180 swiper.png",
  "/images/index/358 180 swiper.png"
]



Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_images: [
      "/images/index/358 180 swiper.png",
      "/images/index/358 180 swiper.png",
      "/images/index/358 180 swiper.png"
    ],
    menu: {
      entries: [
        {
          id: "shop",
          name: "非遗商城",
          icon: "/images/index/56 56非遗商城.png"
        },
        {
          id: "course",
          name: "名师课堂",
          icon: "/images/index/56 56名师课堂.png"
        },
        {
          id: "livestream",
          name: "直播教学",
          icon: "/images/index/56 56直播教学.png"
        },
        {
          id: "explore",
          name: "文化探索",
          icon: "/images/index/56 56文化探索.png"
        }
      ]
    },
    suggestions: {
      goods: {
        more: {
          title: "匠心之选",
          destination: ""
        },
        items: [
          {
            name: "苏州手工丝绸团扇",
            image: "/images/index/173 200团扇.png"
          },
          {
            name: "景德镇青花瓷茶具",
            image: "/images/index/173 200茶具.png"
          },
          {
            name: "云南扎染丝巾",
            image: "/images/index/173 200扎染丝巾.png"
          },
          {
            name: "宜兴紫砂壶",
            image: "/images/index/173 200紫砂壶.png"
          }
        ]
      },

      courses: {
        more: {
          title: "传承学院",
          destination: ""
        },
        items: [
        {
          name: "苏州手工丝绸团扇",
          image: "/images/index/173 200团扇.png"
        },
        {
          name: "景德镇青花瓷茶具",
          image: "/images/index/173 200茶具.png"
        },
        {
          name: "云南扎染丝巾",
          image: "/images/index/173 200扎染丝巾.png"
        },
        {
          name: "宜兴紫砂壶",
          image: "/images/index/173 200紫砂壶.png"
        }
      ]},

    craftman: {
      more: {
        title: "匠人匠心",
        destination: ""
      },
      avatar: "/images/index/358 116.png"
    }
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.swiper_images = this.getSwiperImages()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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


  getSwiperImages: function () {
    return swiper_images
  }

})