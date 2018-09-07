//index.js
import {fetch,login} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    isLoading:false,
    updateTime:"",
    pn:1,
    hasMore:true
  },
  
  onLoad() {
    this.getAllData()
    login()
  },

  getData() {
    return new Promise((resolve,reject)=>{
      this.setData({
        isLoading: true
      })
      fetch.get("/swiper").then(res => {
        resolve()
        console.log(res)
        this.setData({
          swiperData: res.data,
          isLoading: false
        })
      }).catch(err => {
        reject()
        this.setData({
          isLoading: false
        })
      })
    })
  },

  getContent() {
    return new Promise((resolve,reject)=>{
      fetch.get("/category/books").then(res => {
        resolve()
        console.log(res)
        this.setData({
          mainContent: res.data,
        })
      })
    })
  },

  getAllData() {
    return new Promise((resolve)=>{
      Promise.all([...this.getData(), ...this.getContent()]).then(() => {
        resolve()
      })
    })
  },

  getMoreContent() {
    return new Promise((resolve, reject) => {
      fetch.get("/category/books",{pn:this.data.pn}).then(res => {
        console.log(res)
        let newArr = [...this.data.mainContent,...res.data]
        this.setData({
          mainContent: newArr,
        })
        resolve(res)        
      })
    })
  },

  jumpBook(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  onPullDownRefresh() {
    this.getAllData().then(() => {
      this.setData({
        hasMore:true,
        pn:1
      })
      wx.stopPullDownRefresh()
    })
  },

  onReachBottom() {
    if (this.data.hasMore){
      this.setData({
        pn:this.data.pn+1
      })
      this.getMoreContent().then(res => {
        if (res.data.length < 2) {
          this.setData({
            hasMore: false
          })
        }
      })
    } 
  }
  
})
