const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const app=getApp()

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


function toHompage(){
    wx.redirectTo({
      url: '/pages/homepage/hompage',
    })
}

function Register(){
    console.log("Register Event")
    wx.navigateTo({
      url: '/pages/reg/reg',
    })
  }
  
function  LogIn(){
    console.log("LogIn Event")
    let token=app.globalData.token
    let user=app.globalData.user
    console.log("Token: "+token)
    console.log("User: ")
    console.log(user)
    if(token!=""&&user!=""){
      wx.showModal({
        title: '已登录',
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  }








module.exports = {
  formatTime:formatTime,
  Register:Register,
  LogIn:LogIn,
  toHompage:toHompage,
  
}
