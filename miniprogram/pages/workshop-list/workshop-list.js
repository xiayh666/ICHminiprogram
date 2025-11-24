import {storage} from '../../src/Storage.js'
Page({
  data:{
     workshopList:[
       {
         img:storage.get('/images/夏布工坊.png'),
         name:"中益乡 夏布工坊"
       },
       {
         img:storage.get('/images/工坊2.png'),
         name:"工坊2"
       }
     ]
  },
  // 点击工坊项跳转详情页
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
  }
});