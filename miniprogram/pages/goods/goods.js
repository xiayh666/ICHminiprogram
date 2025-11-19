let app =  getApp();

  
Page({
  data: {
  },

  gotoGoodsDetail(e) {
    const goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      // url: `/pages/goods/goods-detail/goods-detail`
    });
  },

  onLoad: function () {
    app.DataBase.collection("goods").get().then(res=>{
      this.setData({goodsList: res.data})
    })
  }
})