import { storage } from '../../src/Storage.js';


Page({
  data: {
    evaluateWait:storage.get('/images/待评价.png'),
    receiptWait:storage.get('/images/待收货.png'),
    unpaid:storage.get('/images/待付款.png'),
    unshipped:storage.get('/images/待发货.png'),
    afterSale:storage.get('/images/售后.png'),
    star:storage.get('/images/收藏夹.png'),
    coupon:storage.get('/images/优惠券.png'),
    shipAddress:storage.get('/images/收货地址.png'),
    browsing:storage.get('/images/浏览记录.png'),
    setting:storage.get('/images/设置.png'),
    userInfo: {
      avatar: storage.get('/images/userimg.png'), // 替换为实际头像路径
      tag: '非遗爱好者',
      name:'张文艺'
    },
    functionInfo:{
      starNum:12,
      couponNum:8,
      lessonNum:3
    },
    goodsList: [
      { id: 1, image:storage.get('/images/布包.png'), name: '夏布手提包',price:'68' },
      { id: 2, image: storage.get('/images/玩偶.png'), name: '夏布老虎玩偶',price:'80' },
      { id: 3, image: storage.get('/images/围巾1.png'), name: '夏布围巾',price:'158' },
      { id: 4, image:storage.get('/images/围巾1.png'), name: '宜兴紫砂壶' ,price:'60'}
    ],
    couponList: [
      { id: 1, price:'50',name:'满300元可用',desc: '有效期至2023-12-31', type: '通用券' },
      { id: 2, price:'20',name:'无门槛',desc: '有效期至2023-11-30', type: '茶具类专用' }
    ]
  },
  onLoad() {
    // 页面加载时的初始化逻辑
  },
  ToAddress() {
    console.log('触发跳转收货地址页');
    wx.navigateTo({
      url: '/pages/address/address', 
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
  ToGoodList(){
    console.log('触发跳转订单状态页');
    wx.navigateTo({
      url: '/pages/orderListState/orderListState', 
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
  ToSetting(){
    console.log('触发跳转设置页');
    wx.navigateTo({
      url: '/pages/setting/setting', 
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
  }
})