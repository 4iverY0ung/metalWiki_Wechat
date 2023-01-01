// pages/homepage/hompage.js
const app=getApp()
let utils=require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {

//专辑信息列表
        albumsInfo:[

        ],
        //专辑名称列表
        albumName:[],
      none:'none',

//歌曲名称列表
      songNames:[],
//歌曲播放地址列表
      songJson:[],

      //歌曲名， 艺人，播放地址，图片
      songName:'',
      songArtist:'',
      songUrl:'',
      songImg:'',
    
    //专辑图片列表
    imgUrls:[
       
    ],
    indicatorDots: true,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: "",


    //SongNameAndPhoto
    snaP:'',


    state:'paused'
    

    },


    audioCtx:null,


    setPhotoAndName(){
      var imgs=this.data.imgUrls
      var albumNames=this.data.albumName
      var p=[]
      var n=[]
      
      //console.log(imgs)
      //console.log(imgs.length)
      for(var i=0;i<imgs.length;i++){
       p.push(imgs[i])
       n.push(albumNames[i])
      }

      this.setData({
        snaP:[p,n]
      })

      console.log("设置：")
      console.log(this.data.snaP)
    },



    setSongInfo(e){
        let index =e.detail.value
        console.log(index)
        this.setData({
            songName:this.data.songNames[index],
            songUrl:this.data.songJson[index],
            songArtist:this.data.albumsInfo[index].AlbumArtist,
            songImg:this.data.imgUrls[index]
        })
    },



    getAlbum(e){
        console.log("Album Select: ")
        console.log(e)
        
        let index=e.detail.value
        this.indexJump(index)
    },

    



    //Past
    fucControl(){
      if(this.data.none=='none'){
        this.setData({
        none:'grid'
        })
        console.log(this.data.none)
      }
      
      else if(this.data.none=='grid'){
        this.setData({
          none:'none'
        })
      }
      
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


   
      selfCenter(){
        let token=app.globalData.token
        let user=app.globalData.user
        if(token==""||user==""||token==null||user==null||token==undefined||user==undefined){
          wx.showModal({
            title: '登录异常，请重新登录',
          })
        }
        else{
          wx.navigateTo({
            url: '/pages/selfCenter/selfCenter',
          })
        }
      },

















    onLoad(){
        //获得轮播图片
        var i=this.setPhotoAndName
       
          wx.request({
            url: 'http://59.110.155.151:23323/resAlbum',
            method:'GET',
            success:(req)=>{
                console.log(req)
                console.log(req.data.albumjson)
                this.setData({
                    imgUrls:req.data.albumjson
                })
            }
          })
   
          //获得专辑与乐队选择框
          wx.request({
            url: 'http://59.110.155.151:23323/getAlbumInfo',
            method:'GET',
            success:(req)=>{
               console.log(req)
               this.setData({
                   albumsInfo:req.data.albumInfo,
                   albumName:req.data.albumName
               })
            }
          })
   
          //获得音乐
          wx.request({
            url: 'http://59.110.155.151:23323/getSongs',
            method:'GET',
            success:(req)=>{
                //console.log(req)
                this.setData({
                    songJson:req.data.songjson,
                    songNames:req.data.songNames
                })
                console.log(this.data.songJson)
                console.log(this.data.songNames)
                i()
            }
          })
   
          
          

       

       
       this.audioCtx=wx.createInnerAudioContext()
     
       //测试
      
      


    },





    onShow() {
      
    },








     play(e){
      this.audioCtx.src=this.data.songUrl
      this.audioCtx.play()
      this.setData({
        state:'running'
      })
      console.log("Running")
    },
  
   pause(e){
      console.log("Pause")
      this.audioCtx.pause()
      this.setData({
        state:'paused'
      })
    },

     /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
      this.audioCtx.stop()
      this.setData({
        state:'paused'
      })
    },

    onJump(e){
      console.log(e.target.dataset.index)
      
      let index=e.target.dataset.index
      
      this.indexJump(index)
    },

  

  


//页面跳转处理
    indexJump(index){
      let albumInfo=JSON.stringify(this.data.albumsInfo[index])
        console.log(albumInfo)
        wx.navigateTo({
          url: '/pages/wiki/wiki?albumInfo='+albumInfo+'&imageU='+this.data.imgUrls[index]+"&index="+index+"&songName="+this.data.songNames[index]+"&songUrl="+this.data.songJson[index]
        })
    }
})