// pages/reg/reg.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isAgree:false
    },

    agree(e){
        this.setData({
            isAgree:e.detail.value
          })
    },

    /* 正则判断函数 */
  isPasswd(s){
    var pat = /^(\w){6,20}$/
    if(!pat.exec(s)){
      return false
    }
    return true
  },

 

  submit(e){
    console.log("注册页面获取参数如下: ");
    console.log(e)
    var userid=e.detail.value.id
    var username=e.detail.value.name
    var userpassword=e.detail.value.pwd
    var userconfirmpwd=e.detail.value.confirm
    var useridentify=e.detail.value.identify

    var userForm=JSON.stringify({userid,username,userpassword,useridentify})

    console.log("UserForm: "+userForm)
    if(userid==""||username==""||userpassword==""||userconfirmpwd==""||useridentify==""){
        wx.showModal({
          title: '不能输入为空',
        })
        return
    }
    if(userpassword!=userconfirmpwd){
        wx.showModal({
          title:"两次密码输入不一致"
        })
        return
    }
    if(!this.isPasswd(userpassword)){
        wx.showModal({
          title: '格式不对',
        })
        return
      }
   
    wx.request({
      url: 'http://59.110.155.151:23323/Reg',
      method:'POST',
      data:userForm,
      header:{'content-type':'application/json;charset=utf-8'},
      success:res=>{
          console.log(res)
          if(res.data.code==200&&res.data.msg=="Insert Success"){
              console.log("注册成功")
              wx.showModal({
                title: '注册成功',
              })
              setTimeout(() =>{
                wx.redirectTo({
                  url: '/pages/homepage/hompage',
                })
              },2000)
          }
          else{
              console.log("注册失败")
              wx.showModal({
                title: '注册失败',
              })
          }
      },
      fail:res=>{
          console.log("Fail Res: "+res)
          wx.showModal({
            title: '接口调用失败',
          })
      }
    })
    
    }

    
})