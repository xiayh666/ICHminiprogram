
import { db } from '../../src/DataBase';
Page({
  data: {
    searchValue: "",
    goodsList: [],
    noResult: false
  },
  onLoad(options) {
    const searchValue = options.s
    this.setData({
      searchValue
    })
    this.searchGoods(searchValue);

  },

  goToDetail(e) {
    const goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/goods-detail/goods-detail?id=${goodsId}`
    });
  },

  searchGoods: async function(keyword) {

    if (!keyword.trim()) {
      this.setData({
        noResult: false,
        goodsList: []
      });
      return;
    }

    const res = await db.collection('goods').get();
    const allGoods = res.data || [];

    // 过滤出名称或描述包含关键词的商品（不区分大小写）
    const filteredGoods = allGoods.filter(goods => {
      const nameMatch = goods.name.toLowerCase().includes(keyword.toLowerCase());
      const descMatch = goods.desc.toLowerCase().includes(keyword.toLowerCase());
      return nameMatch || descMatch;
    });

    this.setData({
      goodsList: filteredGoods,
      noResult: filteredGoods.length === 0
    });
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
});
