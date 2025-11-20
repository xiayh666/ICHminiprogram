import { storage } from "../../src/Storage";


let asset = url => storage.get(url)


Page({
  data: {
    searchValue: '', // 输入框内容
    historyList: []
  },

  onLoad() {
    // 读取本地缓存的搜索记录
    const history = wx.getStorageSync('searchHistory') || [];
    this.setData({
      historyList: history
    });
  },


  // 输入框内容变化
  onInputChange(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },

  handleSearch() {
    const { searchValue, historyList } = this.data;
    if (!searchValue.trim()) return;

    const newHistory = historyList.filter(item => item !== searchValue);
    newHistory.unshift(searchValue);


    // 更新数据并缓存
    this.setData({
      historyList: newHistory,
      searchValue: ''
    });
    wx.setStorageSync('searchHistory', newHistory);

    wx.navigateTo({
      url: `/pages/search-result/search-result?s=${searchValue}`
    });
  },

  // 选择搜索记录
  selectHistory(e) {
    const val = e.currentTarget.dataset.content;
    this.setData({
      searchValue:val 
    });
    // 直接执行搜索
    this.handleSearch();
  }
});