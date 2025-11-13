Page({
  data: {
    tabList: ["热门话题", "技艺讨论", "作品展示", "匠人问答", "更多话题"], // Tab 数据
    currentTab: 0,  // 记录当前选中的 Tab 索引（默认选中第1项）
    topicList:[
      {avatar:"/images/me/userimg.jpg",
       author:"刘师傅 · 景德镇陶艺",
       tag:"非遗传承人",
       time:"2小时前",
       title:"青花瓷的釉下彩技法探讨",
       desc:"大家好，我想跟各位交流一下青花瓷的釉下彩绘技法。我最近在尝试不同的笔触方法，发现毛笔\
        蘸料后在纸上轻轻吸去多余的水分再作画，能获取更细腻的线条...",
       images:[
         "/images/community/picture.png"
      ],
       cart:128,
       search:42,
       cart2:24},
       {avatar:"/images/me/userimg.jpg",
       author:"刘师傅 · 景德镇陶艺",
       tag:"非遗传承人",
       time:"2小时前",
       title:"青花瓷的釉下彩技法探讨",
       desc:"大家好，我想跟各位交流一下青花瓷的釉下彩绘技法。我最近在尝试不同的笔触方法，发现毛笔\
       蘸料后在纸上轻轻吸去多余的水分再作画，能获取更细腻的线条... ",
       images:[
        "/images/community/tuanshang.png"
     ],
       cart:128,
       search:42,
       cart2:24}
    ],
    craftsmanList:[
      {
        avatar:"/images/me/userimg.jpg",
        name:"刘师傅",
        tag:"景德镇陶艺"
      },
      {
        avatar:"/images/me/userimg.jpg",
        name:"刘师傅",
        tag:"景德镇陶艺"
      },
      {
        avatar:"/images/me/userimg.jpg",
        name:"刘师傅",
        tag:"景德镇陶艺"
      },
      {
        avatar:"/images/me/userimg.jpg",
        name:"刘师傅",
        tag:"景德镇陶艺"
      },
      {
        avatar:"/images/me/userimg.jpg",
        name:"刘师傅",
        tag:"景德镇陶艺"
      },
      {
        avatar:"/images/me/userimg.jpg",
        name:"刘师傅",
        tag:"景德镇陶艺"
      }
    ],
    topicCardList:[
      {
        name:"#端午非遗季",
        meta:"128人讨论 | 32个作品",
        action:"参与"
      },
      {
        name:"#端午非遗季",
        meta:"128人讨论 | 32个作品",
        action:"参与"
      },
      {
        name:"#端午非遗季",
        meta:"128人讨论 | 32个作品",
        action:"参与"
      }
    ]
  },
  // 点击 Tab 切换选中状态
  switchTab: function(e) {
    const index = e.currentTarget.dataset.index; // 获取点击的 Tab 索引
    this.setData({
      currentTab: index  // 更新当前选中索引
    });

    // 可选：滚动到当前选中的 Tab（优化体验）
    const query = wx.createSelectorQuery();
    query.select(`.tab-item:nth-child(${index + 1})`).boundingClientRect();
    query.select('.tab-scroll').scrollOffset();
    query.exec(res => {
      const tabLeft = res[0].left; // 选中项的左偏移量
      const scrollLeft = res[1].scrollLeft; // 容器当前滚动位置
      this.setData({
        scrollLeft: scrollLeft + tabLeft - 100 // 滚动到选中项（100为居中偏移量，可调整）
      });
    });
  }
});