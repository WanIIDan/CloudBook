// pages/book/book.js
import { fetch } from "../../utils/util.js"
const app = getApp()
Page({

  data: {
    bookId: "",
    article:{},
    titleId:"",
    title:"",
    isShow:false,
    catalog:[],
    isLoading: false    
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      titleId: options.id,
      bookId: options.bookId
    })
    this.getData()
    this.getCatalog()
  },

  getData() {
    fetch.get(`/article/${this.data.titleId}`).then(res => {
      this.setData({
        isLoading: true
      })
      console.log(res)
      let data = app.towxml.toJson(res.data.article.content, 'markdown')
      this.setData({
        article: data,
        title:res.data.title,
        isLoading: false
      })
    })
  },

  getCatalog() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
        catalog:res.data
      })
    })
  },

  toggleCatalog() {
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
  },

  handleGet(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      titleId:id
    })
    this.getData()
    this.toggleCatalog()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})