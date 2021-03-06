// pages/detail/detail.js
import {fetch} from "../../utils/util.js"
Page({

  data: {
    bookId:"",
    bookData:{},
    isLoading: false,
    isShow:true
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      bookId: options.id,
    })
    this.getData()
  },

  getData() {
    this.setData({
      isLoading: true
    })
    fetch.get(`/book/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
        bookData: res,
        isLoading: false
      })
    })
  },

  jumpCatalog() {
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`
    })
  },

  handleShow() {
    this.setData({
      isShow:!this.data.isShow
    })
  },

  handleCollect() {
    fetch.post("/collection",{bookId:this.data.bookId}).then(res=>{
      if(res.code == 200){
        wx.showToast({
          title: '收藏成功',
          type: 'success',
          duration: 1000
        })
        let bookData = {...this.data.bookData}
        bookData.isCollect = 1
        this.setData({
          bookData:bookData
        })
      }
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:this.data.bookData.data.title,
      path:`/pages/detail/detail?id=${this.data.bookId}`,
      imageUrl:this.data.bookData.data.img
    }
  }
})