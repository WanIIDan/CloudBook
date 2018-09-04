// pages/catalog/catalog.js
import { fetch } from "../../utils/util.js"
Page({

  data: {
    bookId: "",
    catalogData:[],
    isLoading: false
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      bookId: options.id
    })
    this.getData()
  },

  getData() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        isLoading: true
      })
      console.log(res)
      this.setData({
        catalogData: res.data,
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