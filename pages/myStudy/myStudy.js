// pages/myStudy/myStudy.js
import { fetch, login } from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    bookData: {}        
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  getData() {
    this.setData({
      isLoading: true
    })
    fetch.get("/readList").then(res => {
      console.log(res)
      this.setData({
        bookData: res.data,
        isLoading: false
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})