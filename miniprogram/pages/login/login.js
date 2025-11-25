import { storage } from "../../src/Storage";

Page({
  data: {
    weixin:storage.get('/icons/微信.png'),
    qq:storage.get('/icons/QQ.png'),
    phone: '',   // 手机号
    code: '',     // 验证码
    isLoginBtnActive: false
  },

  //更新登录按钮状态的函数
  updateLoginButtonStatus() {
    const { phone, code } = this.data;
    // 定义激活条件：手机号不为空、格式正确，且验证码不为空
    const isActive = phone !== '' && /^1[3-9]\d{9}$/.test(phone) && code !== '';
    // 将计算结果赋值给 data 中的状态变量
    this.setData({
      isLoginBtnActive: isActive
    });
    console.log(isActive)
  },

  // 监听手机号输入
  handlePhoneInput(e) {
    this.setData({ phone: e.detail.value });
    this.updateLoginButtonStatus();
  },

  // 监听验证码输入
  handleCodeInput(e) {
    this.setData({ code: e.detail.value });
    this.updateLoginButtonStatus();
  },

  // 获取验证码
  getVerifyCode() {
    const { phone } = this.data;
    // 手机号格式校验
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }
    // 这里调用后端发送验证码接口（参考之前的逻辑）
    // wx.showToast({ title: '验证码已发送', icon: 'success' });
    wx.request({
      url: '你的后端接口地址/send-code',
      method: 'POST',
      data: { phone: phone }, // 将获取到的手机号传给后端
      success: (res) => {
        if (res.data.success) {
          wx.showToast({ title: '验证码已发送', icon: 'success' });
        } else {
          wx.showToast({ title: res.data.msg, icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络请求失败，请稍后重试', icon: 'none' });
      }
    });
  },

  // 登录按钮点击
  handleLogin() {
    const { phone, code } = this.data;
    if (!phone || !code) {
      wx.showToast({ title: '请填写手机号和验证码', icon: 'none' });
      return;
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }
  
    // 显示“登录成功”提示
    wx.showToast({ 
      title: '登录成功', 
      icon: 'success',
      duration: 1500 // 提示框显示的时长
    });
  
    // 使用 setTimeout 实现延迟跳转
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index',
        success: () => {
          console.log('跳转成功，已打开 index');
        },
        fail: (err) => {
          console.error('跳转失败：', err);
        }
      });
    }, 1500); // 延迟 1.5 秒后执行跳转
  },

  // 微信登录
  wxLogin() {
    // 微信授权登录逻辑（参考之前的代码）
    wx.showToast({ title: '微信登录中', icon: 'loading' });
  },

  // QQ登录（需接入QQ登录SDK）
  qqLogin() {
    wx.showToast({ title: 'QQ登录暂未开放', icon: 'none' });
  }
});