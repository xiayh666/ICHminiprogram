// 暂存轮播图，以后通过 getSwiperImage 方法（已定义）获取
// const swiper_images = [
//   "/images/index/358 180 swiper.png",
//   "/images/index/358 180 swiper.png",
//   "/images/index/358 180 swiper.png"
// ]

let app = getApp();
let data = {
  search_icon: app.getAsset("/icons/搜索.png"),
  map: {
    image: app.getAsset("/images/地图.png")
  },
  swiper_images: [],
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
      // {
      //   id: "explore",
      //   name: "文化探索",
      //   icon: "/images/index/56 56文化探索.png"
      // }
    ]
  },
  suggestions: {
    goods: {
      more: {
      },
      items: []
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
      ]
    },

    craftman: {
      more: {
        title: "线上线下预约通道",
        destination: ""
      },
      avatar: app.getAsset("/images/头像.png")
    }
  }
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    more: {
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
    if (app.globalData.cloud) {
      app.DataBase.db.collection("goods").limit(4).get().then((res)=> {
        console.log(res)
        this.setData({
          "suggestions.goods.items": res.data
        })
      })
    }

    // this.setData({
    //   "swiper_images": this.getSwiperImages(),
    //   "search_icon": "/images/index/20 20 search.png"
    // })

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