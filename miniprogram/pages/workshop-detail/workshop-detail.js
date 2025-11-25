import { storage } from "../../src/Storage";
import { db } from "../../src/DataBase"

let asset = url => storage.get(url)


Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "石柱县 中益乡夏布工坊",
    workshop_image: asset("/images/scene.png"),
    goodsList: [

    ]
  },

  goToDetail(e) {
    const goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/goods-detail/goods-detail?id=${goodsId}`
    });
  },

  onLoad: function (options) {
    (async () => {
      const goodsList = (await db.collection("goods").get()).data
      this.setData({
        goodsList
      })

    })()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
});