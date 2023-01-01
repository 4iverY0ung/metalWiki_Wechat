// pages/login/login.js
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    findPassword(){
      wx.navigateTo({
        url: '/pages/findPassword/findPassword',
      })
    },
    /**
     *  onLoad:function(){
      console.log("Global Data: ")
      console.log(app.globalData.token)
    },
     */
   

    logsubmit(e){
        console.log("Log In Event: ")
        console.log(e)
        var LogInId=e.detail.value.LogID
        var LogInPassword=e.detail.value.LogPas
        console.log("LogInId: "+LogInId)
        console.log("LogInPassword: "+LogInPassword)

        var LogInUser=JSON.stringify({LogInId,LogInPassword})


        if(LogInId==""||LogInPassword==""){
            console.log("输入为空")
            wx.showModal({
              title: '请输入正确数据',
            })
            return
        }

        wx.request({
          url: 'http://59.110.155.151:23323/Log',
          method:'POST',
          data:LogInUser,
          header:{'content-type':'application/json;charset=utf-8'},
          success:res=>{
            //显示服务器传回参数
            console.log(res)

            //console.log(typeof res.data.data[1])
            //获取服务器传过来的用户信息以及Token
            console.log("User: "+res.data.data[0])
            console.log("Token: "+res.data.data[1].token)

            //为token赋值
            //console.log(JSON.stringify(res.data[1]))
            app.globalData.token=res.data.data[1].token
            console.log("Global Data Token: ")
            console.log(app.globalData.token)

            //为user赋值
            app.globalData.user=res.data.data[0]
            console.log("Global Data User: ")
            console.log(app.globalData.user)


            wx.showModal({
              title: '登录成功',
            })
    
            setTimeout(()=>{
              wx.redirectTo({
                url: '/pages/homepage/hompage',
              })
            },2000)
             
           
          },
          fail:res=>{
            console.log("Fail Res: "+res)
            wx.showModal({
              title: '接口调用失败',
            })
        }
        })
        
        

    },


})