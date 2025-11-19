import { storage } from "../../src/Storage";
import { db } from "../../src/DataBase";

let asset = url => storage.get(url)
  
Page({
  data: {
    cartImage: asset("/images/购物车.png")
  },


  onLoad: function () {
    db.collection("goods").get().then(res=>{
      this.setData({goodsList: res.data})
    })
  }
})