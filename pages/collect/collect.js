// pages/collect/collect.js
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
    return new Promise((resolve, reject) => {
      this.setData({
        isLoading: true
      })
      fetch.get("/collection").then(res => {
        resolve()
        console.log(res)
        this.setData({
          bookData: res.data,
          isLoading: false,
          hasMore: false
        })
      })
    })
  },

  getMoreData() {
    return new Promise((resolve, reject) => {
      fetch.get("/collection").then(res => {
        resolve()
        console.log(res)
      })
    })
  },

  deleteCollect(e) {
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否删除书籍',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          fetch.del(`/collection/${id}`, id).then(res => {
            wx.showToast({
              title: '已取消收藏',
              type: 'success',
              duration: 1000
            })
          })
        }else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    this.setData({
      hasMore: true
    })
    this.getMoreData().then(res => {
      this.setData({
        hasMore: false
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})