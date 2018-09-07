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
    isLoading: false,
    font:40,
    index:""
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
        isLoading: true,
        isShow:false
      })
      console.log(res)
      this.setData({
        article: res.data.article.content,
        title:res.data.title,
        isLoading: false,
        index:res.data.article.index
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

  handleAdd() {
    this.setData({
      font:this.data.font+2
    })
  },

  handleSub() {
    if(this.data.font<28){
      wx.showModal({
        title: '温馨提示',
        content: '字体太小影响视力哦~',
        showCancel:false
      })
    }else{
      this.setData({
        font: this.data.font-2
      })
    }
  },

  handlePrev() {
    let catalog = this.data.catalog
    if(this.data.index-1<0){
      wx.showToast({
        title: '前面没有章节了',
      })
    }else{
      this.setData({
        titleId: catalog[this.data.index - 1]._id
      })
      this.getData()
    }
  },

  handleNext() {
    let catalog = this.data.catalog
    if(catalog[this.data.index+1]){
      this.setData({
        titleId: catalog[this.data.index+1]._id
      })
      this.getData()
    }else{
      wx.showToast({
        title: '最后一章啦！',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})