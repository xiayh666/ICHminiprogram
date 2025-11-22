import { storage } from '../../src/Storage.js';

Page({
  data: {
    service:storage.get('/images/客服.png'),
    activeTab: 0, // 当前激活的标签索引（默认0：待付款）
    allOrderList: [], // 所有订单数据（模拟接口返回）
    currentOrderList: [] // 当前标签显示的订单数据
  },
  onLoad: function() {
    this.getOrderList();
  },
  // 模拟获取所有订单数据（真实场景替换为接口请求）
  getOrderList() {
    // 订单状态对应：0=待付款，1=待发货，2=待收货，3=待评价，4=已完成
    const mockOrders = [
      {
        orderId: '20251120001',
        status: 0, // 待付款
        statusText: '待付款',
        createTime: '2025-11-20 10:30',
        receiver: "曹操",
        phone: "1828****628",
        address: "北京市朝阳区望京阜通东大街方恒国际中心a座",
        merchantName: '夏布工坊',
        realPrice: '1988.00',
        merchantId: 'merchant001',
        remainTime:'23小时59分',
        payMethod:'微信支付',
        goods: 
          { 
           goodsImg: storage.get('/images/围巾1.png'),
           name:'夏布围巾',
           count:1,
           price:1988,
           stock: 321,
          },
          orderPosition:{
            province:"",
            place:"",
            nextPlace:"",
            currTime:""
          },
      },
      {
        orderId: '20251120001',
        status: 1, // 待发货
        statusText: '待发货',
        createTime: '2025-11-20 10:30',
        receiver: "曹操",
        phone: "1828****628",
        address: "北京市朝阳区望京阜通东大街方恒国际中心a座",
        merchantName: '夏布工坊',
        realPrice: '1988.00',
        merchantId: 'merchant001',
        remainTime:'23小时59分',
        payMethod: "微信支付",
        goods: 
          { 
           goodsImg: storage.get('/images/围巾1.png'),
           name:'夏布围巾',
           count:1,
           price:1988,
           stock: 321,
          },
          orderPosition:{
            province:"",
            place:"",
            nextPlace:"",
            currTime:""
          },
      },
      {
        orderId: '20251120001',
        status: 2, // 待收货
        statusText: '待收货',
        createTime: '2025-11-20 10:30',
        receiver: "曹操",
        phone: "1828****628",
        address: "北京市朝阳区望京阜通东大街方恒国际中心a座",
        merchantName: '夏布工坊',
        realPrice: '1988.00',
        merchantId: 'merchant001',
        remainTime:'23小时59分',
        payMethod: "微信支付",
        goods: 
          { 
           goodsImg: storage.get('/images/围巾1.png'),
           name:'夏布围巾',
           count:1,
           price:1988,
           stock: 321,
          },
          orderPosition:{
            province:"北京市",
            place:"北京综合邮件处理中心",
            nextPlace:"北京海淀区中关村中心",
            currTime:"2020-11-12 10:31:11"
          },
      },
      {
        orderId: '20251120001',
        status: 3, // 待评价
        statusText: '待评价',
        createTime: '2025-11-20 10:30',
        receiver: "曹操",
        phone: "1828****628",
        address: "北京市朝阳区望京阜通东大街方恒国际中心a座",
        merchantName: '夏布工坊',
        realPrice: '1988.00',
        merchantId: 'merchant001',
        remainTime:'23小时59分',
        payMethod: "微信支付",
        goods: 
          { 
           goodsImg: storage.get('/images/围巾1.png'),
           name:'夏布围巾',
           count:1,
           price:1988,
           stock: 321,
          },
          orderPosition:{
            province:"",
            place:"",
            nextPlace:"",
            currTime:""
          },
      },
      {
        orderId: '20251120001',
        status: 4, // 已完成
        statusText: '已完成',
        createTime: '2025-11-20 10:30',
        receiver: "曹操",
        phone: "1828****628",
        address: "北京市朝阳区望京阜通东大街方恒国际中心a座",
        merchantName: '夏布工坊',
        realPrice: '1988.00',
        merchantId: 'merchant001',
        remainTime:'23小时59分',
        payMethod: "微信支付",
        goods: 
          { 
           goodsImg: storage.get('/images/围巾1.png'),
           name:'夏布围巾',
           count:1,
           price:1988,
           stock: 321,
          },
          orderPosition:{
            province:"",
            place:"",
            nextPlace:"",
            currTime:""
          },
      }
    ];

    // 初始化时，默认显示「待付款」订单（activeTab=0）
    this.setData({
      allOrderList: mockOrders,
      currentOrderList: mockOrders.filter(order => order.status === 0)
    });
  },

  // 标签切换核心事件
  switchTab: function(e) {
    // 1. 获取点击的标签索引
    const tabIndex = Number(e.currentTarget.dataset.index);

    // 2. 如果点击的是当前激活的标签，直接返回（避免重复操作）
    if (this.data.activeTab === tabIndex) return;

    // 3. 更新激活标签状态
    this.setData({ activeTab: tabIndex });

    // 4. 根据标签索引筛选对应状态的订单
  let filteredOrders;
  if (tabIndex === 1) {
    // 如果是索引为 1 的标签页（待收货）
    // 筛选出 status 为 1 (待收货) 或 2 (待评价) 的订单
    filteredOrders = this.data.allOrderList.filter(order => {
      return order.status === 1 || order.status === 2;
    });
  } else {
    // 其他标签页，保持原有的一对一映射逻辑
    const statusMap = {
      0: 0,   // 待付款
      2: 3,    // 待评价
      3: 4     //已完成
    };
    const targetStatus = statusMap[tabIndex];
    filteredOrders = this.data.allOrderList.filter(order => {
      return order.status === targetStatus;
    });
  }

    // 5. 更新当前显示的订单列表
    this.setData({ currentOrderList: filteredOrders });

    // ------------ 真实场景扩展 ------------
    // 如果订单数据需要从后端获取（而非本地筛选），可替换为接口请求：
    // wx.request({
    //   url: 'https://your-api.com/orders', // 你的订单接口
    //   data: { status: tabIndex }, // 传递状态参数（0=待付款，1=待收货...）
    //   success: (res) => {
    //     this.setData({ currentOrderList: res.data.orders });
    //   }
    // });
  },
  // 以下是辅助事件（之前的逻辑补充，可选）
  contactMerchant(e) {
    const merchantId = e.currentTarget.dataset.merchantId;
    console.log('联系商家：', merchantId);
    // 跳转到商家聊天页面或拨打客服电话等逻辑
  },
  modifyOrder(e) {
    const orderId = e.currentTarget.dataset.orderId;
    console.log('修改订单：', orderId);
    // 跳转到订单修改页面：wx.navigateTo({ url: `/pages/modifyOrder/modifyOrder?orderId=${orderId}` });
  },
  goToPay(e) {
    const orderId = e.currentTarget.dataset.orderId;
    console.log('去支付：', orderId);
    // 跳转到支付页面：wx.navigateTo({ url: `/pages/pay/pay?orderId=${orderId}` });
  },
  confirmReceipt(e) {
    const orderId = e.currentTarget.dataset.orderId;
    console.log('确认收货：', orderId);
    // 调用确认收货接口逻辑
  },
  goToComment(e) {
    const orderId = e.currentTarget.dataset.orderId;
    console.log('去评价：', orderId);
    // 跳转到评价页面：wx.navigateTo({ url: `/pages/comment/comment?orderId=${orderId}` });
  },
  //跳转到具体的订单页面
  // 优化后的订单点击事件处理函数
handleOrderTap(e) {
  const index = e.currentTarget.dataset.index;
  const currentOrder = this.data.currentOrderList[index];
  const status = currentOrder.status;

  let targetUrl;

  // 根据订单状态决定跳转的目标页面
  switch (status) {
    case 0:
      targetUrl = '/pages/waitpay/waitpay';
      break;
    case 1:
      targetUrl = '/pages/waitdispatch/waitdispatch';
      break;
    case 2:
      targetUrl = '/pages/waitreceive/waitreceive';
      break;
    case 3: // 假设待评价也有一个页面
      targetUrl = '/pages/comment/comment';
      break;
    case 4:
      targetUrl = '/pages/order-finish/order-finish';
      break;
    default:
      console.log("未知的订单状态:", status);
      return; // 如果状态未知，则不执行跳转
  }
  
  // 调用通用的跳转函数
  this.navigateToOrderPage(targetUrl, currentOrder, index);
},

// 通用的跳转函数
navigateToOrderPage(url, orderData, index) {
  console.log(`触发跳转到 ${url}`);
  wx.navigateTo({
    url: url,
    success: (res) => {
      // 统一在这里传递数据
      res.eventChannel.emit('acceptOrder', { order: orderData, index });
      console.log(`跳转成功，已打开 ${url}`);
    },
    fail: (err) => {
      console.error('跳转失败：', err);
    }
  });
}

  
});