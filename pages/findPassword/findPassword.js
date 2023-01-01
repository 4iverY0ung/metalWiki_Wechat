// pages/findPassword/findPassword.js
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    isPasswd(s){
        var pat = /^(\w){6,20}$/
        if(!pat.exec(s)){
          return false
        }
        return true
      },

    submit(e){
        console.log(e)
        var userid=e.detail.value.id;
        var newPassword=e.detail.value.newPwd;
        var confirmPwd=e.detail.value.confirmPwd;
        
        if(userid==''){
            wx.showModal({
                title: '不能输入为空',
              })
              return
        }
        if(newPassword!=confirmPwd||newPassword==''||!this.isPasswd(newPassword)){
            wx.showModal({
              title: '密码格式错误',
            })
            return
        }

        var newInfo=JSON.stringify({userid,newPassword})
        wx.request({
          url: 'http://59.110.155.151:23323/ResetPassword',
          method:'POST',
          data:newInfo,
          header:{'content-type':'application/json;charset=utf-8'},
          fail:res=>{
            console.log("Fail Res: "+res)
            wx.showModal({
              title: '接口调用失败',
            })
        },
        success:res=>{
            console.log(res)
            if(res.data.code==200&&res.data.data==1){
                wx.showModal({
                  title: '修改成功',
                })
                setTimeout(()=>{
                    wx.redirectTo({
                        url: '/pages/homepage/hompage',
                      })
                },2000)
                app.globalData.token=''
                app.globalData.user=''
            }
            else{
                wx.showModal({
                    title: '修改失败',
                  })
            }
        }
        })

    }
})