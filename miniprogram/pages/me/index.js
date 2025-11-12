Page({
    data: {
        userInfo:{
          avatar:'/images/bg/OIP-C.webp',
          name:'justin',
          score:100
        }
    },
    onReady(){
     console.log(this.data.userInfo.avatar)
    }
  })