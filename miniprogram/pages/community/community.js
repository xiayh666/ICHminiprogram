import { storage } from '../../src/Storage.js';
import { db } from "../../src/DataBase";

Page({
  data: {
    plus: storage.get('/images/加号.png'),
    more: storage.get('/images/更多.png'),
    shoppingCart: storage.get('/images/购物车.png'),
    tabList: ["热门话题", "技艺讨论", "作品展示", "匠人问答", "更多话题"], // Tab 数据
    currentTab: 0,  // 记录当前选中的 Tab 索引（默认选中第1项）
    topicList: [
      // {
      //   avatar: storage.get('/images/avatar1.png'),
      //   author: "刘师傅",
      //   tag: "非遗传承人",
      //   time: "2小时前",
      //   title: "夏布探讨",
      //   desc: "大家好，我想跟各位交流一下青花瓷的釉下彩绘技法。我最近在尝试不同的笔触方法，发现毛笔\
      //   蘸料后在纸上轻轻吸去多余的水分再作画，能获取更细腻的线条...",
      //   images: [
      //     storage.get('/images/花2.png'),
      //     storage.get('/images/花1.png'),
      //     storage.get('/images/花2.png')
      //   ],
      //   cart: 128,
      //   search: 42,
      //   cart2: 24
      // },
      // {
      //   avatar: storage.get('/images/avatar2.png'),
      //   author: "王女士",
      //   tag: "",
      //   time: "2小时前",
      //   title: "新作品分享",
      //   desc: "大家好，我想跟各位交流一下青花瓷的釉下彩绘技法。我最近在尝试不同的笔触方法，发现毛笔\
      //  蘸料后在纸上轻轻吸... ",
      //   images: [
      //     storage.get('/images/布包.png')
      //   ],
      //   cart: 128,
      //   search: 42,
      //   cart2: 24
      // }
    ],
    craftsmanList: [
      {
        avatar: storage.get('/images/avatar1.png'),
        name: "刘师傅",
        tag: "石柱县夏布",
        num: 1
      },
      {
        avatar: storage.get('/images/avatar2.png'),
        name: "刘师傅",
        tag: "布包艺人",
        num: 2
      },
      {
        avatar: storage.get('/images/avatar3.png'),
        name: "刘师傅",
        tag: "蓝印夏布",
        num: 3
      },
      {
        avatar: storage.get('/images/avatar4.png'),
        name: "刘师傅",
        tag: "夏布制作",
        num: 4
      },
      {
        avatar: storage.get('/images/avatar4.png'),
        name: "刘师傅",
        tag: "景德镇陶艺",
        num: 5
      },
      {
        avatar: storage.get('/images/avatar4.png'),
        name: "刘师傅",
        tag: "景德镇陶艺",
        num: 6
      }
    ],
    topicCardList: [
      {
        image: storage.get('/images/购物车空(1).png'),
        name: "#石柱县非遗季",
        meta: "128人讨论 | 32个作品",
        action: "参与"
      },
      {
        image: storage.get('/images/摄影.png'),
        name: "#传统工艺现代化",
        meta: "128人讨论 | 32个作品",
        action: "参与"
      },
      {
        image: storage.get('/images/挑战.png'),
        name: "#非遗手作挑战",
        meta: "128人讨论 | 32个作品",
        action: "参与"
      }
    ]
  },
  onLoad() {
    (async () => {
      let tagData = []
      // 热门话题
      tagData.push((await db.collection("posts").limit(2).get()).data)
      // 技艺讨论
      tagData.push((await db.collection("posts").limit(2).where({tag: "技艺讨论"}).limit(2).get()).data)
      // 作品展示
      tagData.push((await db.collection("posts").limit(2).where({tag: "作品展示"}).limit(2).get()).data)
      // 匠人问答
      tagData.push((await db.collection("posts").limit(2).where({tag: "匠人问答"}).limit(2).get()).data)
      // 更多话题
      tagData.push((await db.collection("posts").get()).data)

      this.setData({
        tagData
      })
      console.log(this.data.tagData)

      

    })()


  },

  // 点击 Tab 切换选中状态
  switchTab: function (e) {
    const index = e.currentTarget.dataset.index; // 获取点击的 Tab 索引
    this.setData({
      currentTab: index  // 更新当前选中索引
    });

    // 可选：滚动到当前选中的 Tab（优化体验）
    //:nth-child(${index + 1})
    const query = wx.createSelectorQuery();
    query.selectAll(`.tab-item`).boundingClientRect()
    query.select('.tab-scroll').boundingClientRect();
    query.select('.tab-scroll').scrollOffset();

    query.exec(res => {
      const tabLeft = res[0][index].left; // 选中项的左偏移量
      const scrollviewWidth = res[1].width
      const scrollLeft = res[2].scrollLeft; // 容器当前滚动位置
      this.setData({
        scrollLeft: scrollLeft + tabLeft - scrollviewWidth / 2 // 滚动到选中项（100为居中偏移量，可调整）
      });
    });
  },
  // 悬浮按钮点击事件
  handleFloatBtnClick() {
    console.log('悬浮按钮被点击');
    // 可执行跳转、弹窗等操作
    // 示例：跳转至指定页面
    // wx.navigateTo({ url: '/pages/add/add' })
  }
});

