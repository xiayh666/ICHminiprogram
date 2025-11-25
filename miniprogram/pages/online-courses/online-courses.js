import { db } from "../../src/DataBase";


Page({
  data: {
    courses: [
    ],
    craftmen: [

    ]
  },

  onLoad() {
    (async () => {
      const courses = (await db.collection("courses").limit(5).get()).data
      const craftmen = (await db.collection("craftmen").limit(5).get()).data
      console.log("courses", courses)
      console.log("craftmen", craftmen)


      this.setData({
        courses,
        craftmen
      })

    })()

  },


  gotoCourseDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/course-detail/course-detail'
    });
  },

  gotoCraftsmanDetail(e) {
    wx.navigateTo({
      url: '/pages/craftsman-detail/craftsman-detail'
    });
  }
});