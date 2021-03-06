// pages/myStudy/myStudy.js
import { fetch, login } from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    bookData: {},
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  getData() {
    return new Promise((resolve,reject)=>{
      this.setData({
        isLoading: true
      })
      fetch.get("/readList").then(res => {
        resolve()
        console.log(res)
        let arr = [...res.data]
        arr = arr.map(item=>{
          item.title.percent = Math.round((item.title.index/item.title.total)*100)
          return item
        })
        this.setData({
          bookData: arr,
          isLoading: false,
        })
      })
    })
  },

  getMoreData() {
    return new Promise((resolve, reject) => {
      fetch.get("/readList").then(res => {
        resolve()
        console.log(res)
      })
    })
  },

  onPullDownRefresh() {
    this.getData().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  jumpDetail(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  onReachBottom() {
    if (this.data.hasMore) {
      this.getMoreData().then(res => {
        this.setData({
          hasMore: false
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})