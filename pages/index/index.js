//index.js
import {fetch} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent:[],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 500
  },
  
  onLoad() {
    this.getData(),
    this.getContent()
  },

  getData() {
    fetch.get("/swiper").then(res=>{
      this.setData({
        swiperData:res.data
      })
    })
  },

  getContent() {
    fetch.get("/category/books").then(res=>{
      console.log(res)
      this.setData({
        mainContent:res.data
      })
    })
  },

  jumpBook(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }

})
