// pages/center/center.js
import { fetch } from "../../utils/util.js"

Page({

  /**
 * 页面的初始数据
 */
  data: {
    isLoading:false,
    userInfo: {},
    length:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        this.setData({
          userInfo: data.userInfo
        })
      }
    })
  },

  getData() {
    return new Promise((resolve,reject)=>{
      fetch.get("/collection").then(res => {
        resolve()
        console.log(res)
        this.setData({
          length: res.data.length,
        })
      })
    })
  },

  jumpCollect() {
    wx.navigateTo({
      url: '/pages/collect/collect'
    })
  },

  onPullDownRefresh() {
    this.getData().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})