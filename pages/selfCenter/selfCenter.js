// pages/selfCenter/selfCenter.js
const app=getApp()
let utils=require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
      id:'',
      name:'',
      identify:'',
      password:''
    },

    LogIn(){
        utils.LogIn()
    },

    Register(){
        utils.Register()
    },

    toHomepage(){
        utils.toHompage()
    },
  

    onShow(){

        let token=app.globalData.token
        let user=app.globalData.user

        if(token==""||user==""||token==null||user==null||token==undefined||user==undefined){
            wx.showModal({
                title: '登录异常，请重新登录',
              })

              setTimeout(()=>{
                wx.redirectTo({
                    url: '/pages/homepage/hompage',
                  })
              },2000)


        }



        this.setData({
            id:app.globalData.user.User_Id,
            name:app.globalData.user.User_Name,
            identify:app.globalData.user.User_Identify,
            password:app.globalData.user.User_Password
          })
    },


    onHide(){
        this.onShow()
    },

    logOut(){
        app.globalData.token=''
        app.globalData.user=''
        this.onLoad()
        wx.redirectTo({
          url: '/pages/homepage/hompage',
        })
        setTimeout(()=>{
            wx.showModal({
          title: '注销成功',
        })
        },2000)
        
    },

    findPassword(){
      wx.navigateTo({
        url: '/pages/findPassword/findPassword',
      })
    },


   /**
    *  
    
   onJudge(){
        let token=app.globalData.token
        let user=app.globalData.user
        if(token==""||user==""||token==null||user==null||token==undefined||user==undefined){
          wx.showModal({
            title: '登录异常，请重新登录',
          })

          setTimeout(()=>{
            wx.redirectTo({
                url: '/pages/homepage/hompage',
              })
          },2000)

        }
        else{
          wx.navigateTo({
            url: '/pages/selfCenter/selfCenter',
          })
        }
    }
    * */
    
})