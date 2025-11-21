import { storage } from '../../src/Storage.js';

Page({
  data: {
       jumpTo:storage.get('/images/跳转.png')
  },

   // 跳转常见问题
   goToCommonQues() {
    console.log('触发跳转常见问题页');
    wx.navigateTo({
      url: '/pages/normal-question/normal-question', 
      success: () => {
        console.log('跳转成功，已打开地址页');
      },
      fail: (err) => {
        console.error('跳转失败：', err);
        // 根据错误提示处理：
        // 1. 若提示 "page not found" → 路径错误或页面未注册
        // 2. 若提示语法错误 → 地址页代码有问题
      }
    });
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