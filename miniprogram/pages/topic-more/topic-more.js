// pages/topic-more/topic-more.js
import { storage } from '../../src/Storage.js';
Page({
  data: {
    plus:storage.get('/images/加号.png'),
    shoppingCart:storage.get('/images/购物车.png'),
    topicList:[
      {avatar:storage.get('/images/avatar1.png'),
       author:"刘师傅",
       tag:"非遗传承人",
       time:"2小时前",
       title:"夏布探讨",
       desc:"大家好，我想跟各位交流一下青花瓷的釉下彩绘技法。我最近在尝试不同的笔触方法，发现毛笔\
        蘸料后在纸上轻轻吸去多余的水分再作画，能获取更细腻的线条...",
       images:[
         storage.get('/images/花2.png'),
         storage.get('/images/花1.png'),
         storage.get('/images/花2.png')
      ],
       cart:128,
       search:42,
       },
       {avatar:storage.get('/images/avatar2.png'),
       author:"王女士",
       tag:"",
       time:"2小时前",
       title:"新作品分享",
       desc:"大家好，我想跟各位交流一下青花瓷的釉下彩绘技法。我最近在尝试不同的笔触方法，发现毛笔\
       蘸料后在纸上轻轻吸... ",
       images:[
        storage.get('/images/布包.png')
     ],
       cart:128,
       search:42,
       }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})