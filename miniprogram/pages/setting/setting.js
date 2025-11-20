import { storage } from '../../src/Storage.js';

Page({
  data: {
       jumpTo:storage.get('/images/跳转.png')
  },

   // 跳转常见问题
   goToCommonQues() {
    wx.navigateTo({ url: '/pages/common-ques/common-ques' });
  },
  // 跳转意见反馈
  goToFeedback() {
    wx.navigateTo({ url: '/pages/feedback/feedback' });
  },
  // 跳转了解平台
  goToAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
  },
  // 跳转邀请有礼
  goToInvite() {
    wx.navigateTo({ url: '/pages/invite/invite' });
  },
  // 跳转联系客服
  goToService() {
    wx.navigateTo({ url: '/pages/service/service' });
  },
  // 清除缓存逻辑（示例，需结合实际需求实现）
  clearCache() {
    wx.showToast({ title: '清除成功', icon: 'success' });
    // 实际项目中需调用接口或本地缓存清理方法
  }
})