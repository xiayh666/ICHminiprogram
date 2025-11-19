// pages/shopping-cart/shopping-cart.js

// cloud://xiayh-6gep3q1aa40cc550.7869-xiayh-6gep3q1aa40cc550-1386130600/358 180 swiper.png 


import { db } from "../../src/DataBase";
import { storage } from "../../src/Storage";


Page({
  data: {
    shopping_cart: {
      items: []
    },
    total: {
      price: 0,
      num: 0
    },
    allSelected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    (async () => {
      let cartList_ = (await db.collection("users").where({ username: "User1" }).get()).data[0].cart
      let cartList = []
      for (let item of cartList_) {
        cartList.push({
          ...item,
          ...((await db.collection("goods")
            .where({ _id: item.id })
            .get()).data[0])

        })
      }
      console.log(cartList)

      this.setData({
        "shopping_cart.items": cartList
      })
      this.calcTotal();
      this.checkAllSelected();
    })()
  },

  /**
   * 计算总价和总数量
   */
  calcTotal() {
    const items = this.data.shopping_cart.items;
    let totalPrice = 0;
    let totalNum = 0;

    items.forEach(item => {
      if (item.selected) {
        totalPrice += item.price * item.num;
        totalNum += item.num;
      }
    });


    this.setData({
      total: {
        price: totalPrice,
        num: totalNum
      }
    });
  },

  /**
   * 检查是否全选
   */
  checkAllSelected() {
    const items = this.data.shopping_cart.items;
    const allSelected = items.every(item => item.selected);
    this.setData({ allSelected });
  },

  /**
   * 切换单个商品选中状态
   */
  toggleSelect(e) {
    const id = e.currentTarget.dataset.id;
    const items = this.data.shopping_cart.items;

    items.forEach(item => {
      if (item.id === id) {
        item.selected = !item.selected;
      }
    });

    this.setData({
      'shopping_cart.items': items
    });

    this.calcTotal();
    this.checkAllSelected();
  },

  /**
   * 切换全选状态
   */
  toggleAllSelect() {
    // allSelected: bool
    const allSelected = !this.data.allSelected;
    const items = this.data.shopping_cart.items;

    items.forEach(item => {
      item.selected = allSelected;
    });

    this.setData({
      allSelected,
      'shopping_cart.items': items
    });

    this.calcTotal();
  },

  /**
   * 增加商品数量
   */
  increaseNum(e) {
    const id = e.currentTarget.dataset.id;
    const items = this.data.shopping_cart.items;

    items.forEach(item => {
      if (item.id === id) {
        item.num++;
      }
    });

    this.setData({
      'shopping_cart.items': items
    });

    this.calcTotal();
  },

  /**
   * 减少商品数量
   */
  decreaseNum(e) {
    const id = e.currentTarget.dataset.id;
    const items = this.data.shopping_cart.items;

    items.forEach(item => {
      if (item.id === id && item.num > 1) {
        item.num--;
      }
    });

    this.setData({
      'shopping_cart.items': items
    });

    this.calcTotal();
  },

  /**
   * 直接修改数量
   */
  changeNum(e) {
    const id = e.currentTarget.dataset.id;
    let num = parseInt(e.detail.value);

    if (isNaN(num) || num < 1) {
      num = 1;
    }

    const items = this.data.shopping_cart.items;

    items.forEach(item => {
      if (item.id === id) {
        item.num = num;
      }
    });

    this.setData({
      'shopping_cart.items': items
    });

    this.calcTotal();
  },

  /**
   * 结算（未完善，可能要跳转到结算页面？）
   */
  checkout(e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.calcTotal();
  }

})