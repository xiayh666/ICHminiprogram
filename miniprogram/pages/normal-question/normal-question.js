import { storage } from '../../src/Storage.js'
Page({
  data: {
    upArrow:storage.get('/images/up.png'),
    downArrow:storage.get('/images/down.png'),
    faqList: [
      { id: 1, question: '什么是滴滴零钱？', answer: '滴滴零钱是您在滴滴支付实名账户中可以使用的账户资金，可用于消费，零钱内余额可以随时进行体现。', isExpanded: true, contentHeight: 0 },
      { id: 2, question: '乘客余额如何使用？', answer: '乘客余额可在打车、支付车费时直接抵扣，优先使用余额支付。', isExpanded: false, contentHeight: 0 },
      { id: 3, question: '零钱支付支持哪些业务？', answer: '支持滴滴出行、滴滴外卖、滴滴加油等全平台业务消费。', isExpanded: false, contentHeight: 0 },
      { id: 4, question: '转入零钱、余额提现有什么限制？', answer: '支持滴滴出行、滴滴外卖、滴滴加油等全平台业务消费。', isExpanded: false, contentHeight: 0 },
      { id: 5, question: '什么是滴滴零钱？', answer: '支持滴滴出行、滴滴外卖、滴滴加油等全平台业务消费。', isExpanded: false, contentHeight: 0 },
      { id: 6, question: '提现申请提交后，多久可以到账？', answer: '支持滴滴出行、滴滴外卖、滴滴加油等全平台业务消费。', isExpanded: false, contentHeight: 0 },
      { id: 7, question: '什么是滴滴零钱？', answer: '支持滴滴出行、滴滴外卖、滴滴加油等全平台业务消费。', isExpanded: false, contentHeight: 0 },
    ]
  },

  onReady() {
    // 页面渲染完成后，计算每个内容区域的高度
    this.calcContentHeight();
  },

  // 计算内容区域高度
  calcContentHeight() {
    const { faqList } = this.data;
    faqList.forEach((item, index) => {
      const query = wx.createSelectorQuery().in(this);
      query.select(`#content-${index}`).boundingClientRect(rect => {
        if (rect) {
          faqList[index].contentHeight = rect.height;
          this.setData({ faqList });
        }
      }).exec();
    });
  },

  // 点击标题切换折叠状态
  toggleFold(e) {
    const index = e.currentTarget.dataset.index;
    const { faqList } = this.data;
    faqList[index].isExpanded = !faqList[index].isExpanded;
    this.setData({ faqList });
    console.log('处理')
  }
});