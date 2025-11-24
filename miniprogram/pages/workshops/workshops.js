import { db } from "../../src/DataBase";


Page({
  data: {
    workshopList: []

  },
  onLoad(options) {
    (async () => {
      const workshopList = (await db.collection("workshops").get()).data
      this.setData({workshopList})
      

    })()

  },
  onReady() {

  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  onShareAppMessage() {
    return {
      title: '',
    };
  },

  gotoWorkshopPage() {
    wx.navigateTo({
      url: '/pages/workshop-detail/workshop-detail',
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
    
  }
});