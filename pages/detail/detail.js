// pages/detail/detail.js
import {fetch} from "../../utils/util.js"
Page({

  data: {
    bookId:"",
    bookData:{}
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      bookId: options.id
    })
    this.getData()
  },

  getData() {
    fetch.get(`/book/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
        bookData: res
      })
    })
  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})