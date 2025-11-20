import { storage } from '../../src/Storage.js';
Page({
  data: {
    iconFront:storage.get('/images/编辑icon.png'),
    addressList: [
      { id: 1, recipient: '曹操', phone: '18286888628', address: '北京市朝阳区望京渠通东大街方恒国际中心a座', isDefault: true },
      { id: 2, recipient: '曹操', phone: '18286888628', address: '北京市朝阳区望京渠通东大街方恒国际中心a座', isDefault: false }
    ]
  },


  // 选择地址加编辑地址
  selectAddress(e) {
    const index = e.currentTarget.dataset.index;
    const currentAddress = this.data.addressList[index];
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
      success: (res) => {
        // 传递编辑所需的地址和索引
        res.eventChannel.emit('acceptAddress', { address: currentAddress, index });
        // 监听B页面返回的「修改后地址」数据
        res.eventChannel.on('updateAddress', (updatedData) => {
          const newList = [...this.data.addressList];
          newList[updatedData.index] = updatedData.address;
          // 编辑默认地址时，清除其他默认
          if (updatedData.address.isDefault) {
            newList.forEach((item, i) => i !== updatedData.index && (item.isDefault = false));
          }
          this.setData({ addressList: newList });
        });
      }
    });
  },
   // 创建地址页面
   createAddress() {
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
      success: (res) => {
        res.eventChannel.on('addNewAddress', (newItem) => {
          let newList = [...this.data.addressList];
          // 若新地址设为默认，清除其他默认
          if (newItem.isDefault) {
            newList = newList.map(item => ({ ...item, isDefault: false }));
          }
          newList.push(newItem); // 新建地址用push添加
          this.setData({ addressList: newList });
        });
      }
    });
  }
});