Page({
  data: {
    userInfo: {
      avatar: '/images/me/userimg.jpg', // 替换为实际头像路径
      name: '非遗爱好者'
    },
    goodsList: [
      { id: 1, image: '/images/me/english_ppt.jpg', name: '苏州手工丝绸团扇' },
      { id: 2, image: '/images/me/english_ppt.jpg', name: '景德镇青花瓷茶具' },
      { id: 3, image: '/images/me/english_ppt.jpg', name: '云南扎染丝巾' },
      { id: 4, image: '/images/me/english_ppt.jpg', name: '宜兴紫砂壶' }
    ],
    couponList: [
      { id: 1, desc: '有效期至2023-12-31', type: '通用券' },
      { id: 2, desc: '有效期至2023-11-30', type: '茶具类专用' }
    ],
    moreGoodsList: [
      { id: 1, image: '/images/me/english_ppt.jpg', name: '宜兴紫砂壶' },
      { id: 2, image: '/images/me/english_ppt.jpg', name: '木雕工艺课程' },
      { id: 3, image: '/images/me/english_ppt.jpg', name: '敦煌飞天彩绘' }
    ],
    studyInfo:{
      image:'/images/me/english_ppt.jpg',
      memo:'学习更多的知识'
    }
  },
  onLoad() {
    // 页面加载时的初始化逻辑
  }
})