// pages/wiki/wiki.js


const app=getApp()
let utils=require('../../utils/util')
Page({


  LogIn(){
    utils.LogIn()
},

Register(){
    utils.Register()
},

toHomepage(){
    utils.toHompage()
},

    /**
     * 页面的初始数据
     */
    data: {
      albumInfo:'',
      imageU:'',
      index:'',


      songImg:'',
      songName:'',
      songArtist:'',
      songUrl:'',
      state:'paused'
    },


    audioCtx:null,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

      let albumInfo=JSON.parse(options.albumInfo)
      let imageU=options.imageU
      let index=options.index
      let songName=options.songName
      let songUrl=options.songUrl
      console.log(albumInfo)
      this.setData({
        imageU:imageU,
        albumInfo:albumInfo,
        index:index,
        songImg:imageU,
        songArtist:albumInfo.AlbumArtist,
        songName:songName,
        songUrl:songUrl
      })

      //console.log(options)
      this.audioCtx=wx.createInnerAudioContext()

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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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

   

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
      this.audioCtx.stop()
      this.setData({
        state:'paused'
      })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})