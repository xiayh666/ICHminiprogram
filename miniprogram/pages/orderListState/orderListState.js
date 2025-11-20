import { storage } from '../../src/Storage.js';

Page({
  data: {
    service:storage.get('/images/客服.png'),
    activeTab: 0, // 当前激活的标签索引（默认0：待付款）
    allOrderList: [], // 所有订单数据（模拟接口返回）
    currentOrderList: [] // 当前标签显示的订单数据
  },
  onLoad: function() {
    // 1. 模拟请求后端接口获取所有订单（真实场景替换为 wx.request）
    this.getOrderList();
  },
  // 模拟获取所有订单数据（真实场景替换为接口请求）
  getOrderList() {
    // 订单状态对应：0=待付款，1=待收货，2=待评价，3=已完成
    const mockOrders = [
      {
        orderId: '20251120001',
        status: 0, // 待付款
        statusText: '待付款',
        createTime: '2025-11-20 10:30',
        merchantName: '夏布工坊',
        totalPrice: '1988.00',
        goodsCount: 2,
        stock: 321,
        merchantId: 'merchant001',
        goodsList: [
          { goodsId: 'g001', goodsImg: storage.get('/images/围巾1.png')},
          { goodsId: 'g002', goodsImg: storage.get('/images/围巾1.png') }
        ]
      },
      {
        orderId: '20251120002',
        status: 1, // 待收货
        statusText: '待收货',
        createTime: '2025-11-19 14:20',
        merchantName: '茶香小铺',
        totalPrice: '299.00',
        goodsCount: 1,
        stock: 56,
        merchantId: 'merchant002',
        goodsList: [
          { goodsId: 'g001', goodsImg: storage.get('/images/围巾1.png') },
          { goodsId: 'g002', goodsImg: storage.get('/images/围巾1.png') }
        ]
      },
      {
        orderId: '20251120003',
        status: 2, // 待评价
        statusText: '待评价',
        createTime: '2025-11-18 09:15',
        merchantName: '文创书店',
        totalPrice: '158.00',
        goodsCount: 3,
        stock: 120,
        merchantId: 'merchant003',
        goodsList: [
          { goodsId: 'g001', goodsImg: storage.get('/images/围巾1.png') },
          { goodsId: 'g002', goodsImg: storage.get('/images/围巾1.png') }
        ]
      },
      {
        orderId: '20251120004',
        status: 3, // 已完成
        statusText: '已完成',
        createTime: '2025-11-17 16:40',
        merchantName: '绿植花店',
        totalPrice: '368.00',
        goodsCount: 1,
        stock: 45,
        merchantId: 'merchant004',
        goodsList: [
          { goodsId: 'g001', goodsImg: storage.get('/images/围巾1.png') },
          { goodsId: 'g002', goodsImg: storage.get('/images/围巾1.png') }
        ]
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

    // 4. 根据标签索引筛选对应状态的订单（核心：状态映射 tabIndex=0→待付款，1→待收货...）
    const filteredOrders = this.data.allOrderList.filter(order => {
      return order.status === tabIndex; // 订单status与标签索引一一对应
    });

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
  }
});