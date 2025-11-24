// app.js

import { db } from "src/DataBase"
import { storage } from "src/Storage"

App({
  onLaunch: function () {
    this.globalData = {
      // env 参数说明：
      //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
      //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
      //   如不填则使用默认环境（第一个创建的环境）
      env: "xiayh-6gep3q1aa40cc550",
      cloud_path: "cloud://xiayh-6gep3q1aa40cc550.7869-xiayh-6gep3q1aa40cc550-1386130600",
      cloud: false,
      username: "曹操"
    };
    this.getAsset = (url) => {
      if(this.globalData.cloud) {
        return this.globalData.cloud_path + "/assets" + url
      } else { 
        console.log(url)
        return storage.get(url)
      }
    }
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }
    if (this.globalData.cloud) {
      // this.DataBase = {
      //   db: wx.cloud.database({
      //     // env: this.globalData.env
      //   }),
      //   add: function (collection_name, data) {
      //     console.log(this.db)
      //     console.log(collection_name)
      //     console.log(data)
      //     this.db.collection(collection_name).add({ data: data }).then(e => {
      //       console.log(e)
      //     })
      //     // this.db.collection(collection_name).where({
      //     //   price: this.db.command.gt(30)
      //     // }).get().then((e)=> {
      //     //   console.log(e)
      //     // })
      //   }
      // }
      this.DataBase = wx.cloud.database()

    } else {
      db.initDataBase()
      this.DataBase = db
    }


    wx.navigateTo({
      url: '/pages/course-detail/course-detail',
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





