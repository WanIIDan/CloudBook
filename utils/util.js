const baseUrl = "https://m.yaojunrong.com"

const fetch = {
  http (url,method,data) {
    return new Promise((resolve,reject)=>{
      let token = wx.getStorageSync("token")
      let header = {
        "content-type": "application/json"
      }
      if(token){
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header,
        success(res) {
          console.log(res)
          if(res.header.Token){
            wx.setStorageSync("token", res.header.Token)
          }
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  get(url,data){
    return this.http(url,"GET",data)
  },
  post(url,data){
    return this.http(url,"POST",data)
  }
}

const login = () => {
  wx.login({
    success(res){
      fetch.post("/login",{
        code:res.code,
        appid:"wx743b164ad4f38b71",
        secret:"c14002b98a7759f6a458dfce094a98f2"
      }).then(res=>{
        console.log(res)
      })
    }
  })
}

exports.fetch = fetch
exports.login = login