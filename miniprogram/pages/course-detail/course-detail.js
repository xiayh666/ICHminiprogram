import { storage } from "../../src/Storage";

let asset = url => storage.get(url)



Page({
  data: {
    selectedCourse: 0,

    star: 5,
    play_img: asset("/images/播放.png"),
    icon_lock: asset("/images/lock.png"),
    icon_unlock: asset("/images/unlock.png"),
    courses: [
      { id: 1, name: '入门课', price: 15.20, isLocked: true },
      { id: 2, name: '进阶课', price: 20.20, isLocked: true },
      { id: 3, name: '专业课', price: 25.20, isLocked: true }
    ]
  },


  selectCourse(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedCourse: index
    });
  },

  handleBuy() {
    const selected = this.data.courses[this.data.selectedCourse];
    wx.showModal({
      title: '购买确认',
      content: `您即将购买 ${selected.name}，价格：¥${selected.price.toFixed(2)}`,
      confirmText: '确认购买',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 购买
          wx.showToast({
            title: '购买成功',
            icon: 'success',
            duration: 2000
          });
        }
      }
    });
  },
});