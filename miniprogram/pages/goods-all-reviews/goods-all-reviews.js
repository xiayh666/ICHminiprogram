import { db } from "../../src/DataBase";

Page({
  data: {
    isPopWindowShow: false,
    goodsInfo: {},
    countOfreviews: 112,
    currentSwiperPage: 0,
    count: 1, // 已经选择的商品数量
    totalPrice: 0, // count 对应的总价格
    reviewDisplayLimit: 2,// 这种方式在大量数据时有性能问题，先将就用吧
    attrs: [],
  },

  onLoad: function (param) {
    const id = param.id
    db.collection("goods").where({
      _id: id
    }).get().then(res => {
      const data = res.data[0]
      console.log(data)
      const goodsInfo = {
        ...data,
      }
      this.setData({
        goodsInfo,
        totalPrice: data.price,
        // attrVals: Object.values(goodsInfo.attrs)
        attrs: goodsInfo.attrs
      })

      console.log(this.data)
    })
  },


  calcTotal() {
    this.setData({
      totalPrice: this.data.count * this.data.goodsInfo.price
    })


  },

  reduceCount() {
    if (this.data.count > 1) {
      this.setData({ count: this.data.count - 1 })
    }
    this.calcTotal();
  },

  addCount() {
    if (this.data.count < this.data.goodsInfo.inventory) {
      this.setData({ count: this.data.count + 1 })
    }
    this.calcTotal();
  },

  changeCount(e) {
    let num = parseInt(e.detail.value);

    if (isNaN(num) || num < 1) {
      num = 1;
    }



    this.setData({
      count: num
    });

    this.calcTotal();
  },

  getSelectedAttr() {
    let selectedAttr = []
    this.data.attrs.forEach(attrs => {
      attrs.options.forEach(attr => {
        if (attr.selected === true) {
          selectedAttr.push(attr.name)
        }
      })
    });
    if (selectedAttr.length < this.data.attrs.length)
      return null
    return selectedAttr
  },

  addToCart() {
    (async () => {
      let userCart = (await db.collection("users").where({ username: "曹操" }).get()).data[0].cart
      let selectedAttr = this.getSelectedAttr()
      if (!selectedAttr) {
        // 没有选好所有规格
        wx.showToast({
          title: '请选择规格',
          icon: 'none'
        })
        return
      }
      userCart.push({
        id: this.data.goodsInfo._id,
        num: this.data.count,
        selected: false,
        selectedAttr
      })
      db.collection("users").update({
        username: "曹操"
      }, {
        cart: userCart
      }).then(e => {
        wx.showToast({
          title: '已加入购物车',
          icon: 'success'
        })

      })
    })()
  },

  buyNow() {
    wx.showToast({
      title: 'buy',
      icon: 'none'
    })
  },
  onSwiperChange(e) {
    console.log(e.detail.current)
    this.setData({
      currentSwiperPage: e.detail.current
    })
  },
  openPopWindow() {
    this.setData({ isPopWindowShow: true });
  },

  closePopWindow() {
    this.setData({ isPopWindowShow: false });
    this.updateSelectedAttr()
  },

  selectAttr(e) {
    const index = e.currentTarget.dataset.index
    const classification_index = e.currentTarget.dataset.classification_index
    const classification = this.data.attrs[classification_index].name
    console.log(index)
    console.log(classification_index)


    let attrs = this.data.attrs
    attrs[classification_index].options = this.data.attrs[classification_index].options.map((item, i) => ({
      ...item,
      selected: i === index
    }))

    this.setData({ attrs });
    this.updateSelectedAttr()
  },

  // 更新显示的已选属性
  updateSelectedAttr() {
    let selectedAttrs = []
    this.data.attrs.forEach(attrs => {
      console.log(attrs)
      attrs.options.forEach(attr => {
        if (attr.selected === true) {
          selectedAttrs.push(attr.name)
        }
      })
    });
    selectedAttrs.push(this.data.count + "个")

    this.setData({
      selectedAttrs,
    });
  },
})


