Page({
  data: {
    userInfo: {
      avatar: '/images/me/userimg.jpg', // 替换为实际头像路径
      tag: '非遗爱好者',
      name:'张文艺'
    },
    functionInfo:{
      starNum:12,
      couponNum:8,
      lessonNum:3
    },
    goodsList: [
      { id: 1, image: '/images/me/布包.png', name: '夏布手提包',price:'68' },
      { id: 2, image: '/images/me/玩偶.png', name: '夏布老虎玩偶',price:'80' },
      { id: 3, image: '/images/me/围巾.png', name: '夏布围巾',price:'158' },
      { id: 4, image: '/images/me/围巾.png', name: '宜兴紫砂壶' ,price:'60'}
    ],
    couponList: [
      { id: 1, price:'50',name:'满300元可用',desc: '有效期至2023-12-31', type: '通用券' },
      { id: 2, price:'20',name:'无门槛',desc: '有效期至2023-11-30', type: '茶具类专用' }
    ]
  },
  onLoad() {
    // 页面加载时的初始化逻辑
  }
})