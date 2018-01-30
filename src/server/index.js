var server = require('http').createServer()
var io = require('socket.io')(server)
var musicApi = require("music-api")
server.listen(8081)

var userNames = []
var userDatas = {}
var msgList = []


io.on('connection', function (socket) {
  console.log("有用户进入注册页面")
  let loginName = null
  function login (data) {
    let name = data.name
    let avatar = data.avatar
    if (name === '') {
      socket.emit('loginFailure',"不能使用空白昵称")
    } else if (userNames.indexOf(name) === -1) {
      userNames.push(name)
      userDatas.name = {
        id:userNames.length,
        points:5,
        avatar:avatar,
      }
      loginName = name
      socket.emit("loginSuccess", {
        userName:name,
        avatar:avatar,
      })
      console.log("登录成功，登录昵称为:" + name)
    } else {
      socket.emit("loginFailure", "昵称重复")
      console.log("登录失败，注册昵称重复")
    }
  }
  
  socket.on('login', login)
  

})
//这里是和参考文档不同的地方，socket.io 2.0.4 版本改了方法，并且对于不同
//命名空间的emit需要给io附上of的具体路径才能emit。
const home = io.of('/home')
home.on('connection', function (socket) {
  console.log('有用户进入聊天室')
  console.log('当前聊天室有'+ userNames)
  let userName = ''
  home.emit("usersAmount", userNames.length)
  
  function sendMessage (data) {
    msgList.push(data)
    home.emit("messageReceived", data)
    console.log(data.userName + ":" + data.msg)
    }
  function sendSystemMessage (message) {
    sendMessage({
      userName:"admin",
      msgType:0,
      msgDate:new Date(),
      msg:message,
    })
  }
  function loginOut () {
    userNames = userNames.filter((name) => {
      return name != userName
    })
    delete userDatas.userName
    debugger
    sendSystemMessage(userName + "离开了聊天室")
    console.log(userNames)
    home.emit("usersAmount", userNames.length)
    console.log(userName + "离开了聊天室")
  }
  function serachMusic (type,keyword) {
    return musicApi.searchSong(type, {
      key:keyword,
      limit:10,
      page:1
    })
  }
  function orderMusic (info) {
    console.log("接收到客户端发送的音乐搜索请求，歌曲名为：" + info.song)
    serachMusic("qq", info.song).then(res => {
      console.log('得到音乐id')
      let id = res.songList[0].id
      let name = res.songList[0].name
      musicApi.getSong('qq',{
        id:id,
        raw: false
        }).then(res => {
          console.log("得到播放id")
          var data = {
            user:info.user,
            name:name,
            url:res.url
          }
          home.emit("musicOrderReceived", data)
          sendSystemMessage(data.user + "点播了 " + data.name)
          console.log("发送播放信息至客户端") 
        })
    })
    .catch(err => {
      console.log(err)
      console.log("音乐获取失败")
      socket.emit("musicOrderError")
    })
  }
  // function lyricGame () {

  //   let lyricUrl = `http://music.163.com/api/song/lyric?os=pc&id=93920&lv=-1&kv=-1&tv=-1`
  // }
  socket.on('passUserName', function (name) {
    userName = name
    sendSystemMessage(userName + "进入了聊天室")
  })
  socket.on('sendMessage', sendMessage)
  socket.on("orderMusic", orderMusic)
  socket.on("disconnect",loginOut)
  
})

const rank = io.of('/rank')
rank.on('connection',function (socket) {
  const params = {
    "acfun":{
      "综合":"-1",
      "二次元":"1",
      "动画":"155",
      "音乐":"58",
      "舞蹈":"123",
      "游戏":"59",
      "娱乐":"60",
      "科技":"70",
      "体育":"69",
      "文章":"63",
    },
    "bilibili": {
      "综合":"0",
      "影视":"181",
      "动画":"1",
      "音乐":"3",
      "舞蹈":"129",
      "游戏":"4",
      "娱乐":"5",
      "科技":"36",
      "鬼畜":"119",
      "生活":"160",
    },   
  }
  console.log("有用户进入排行榜页面")
  function urlsFactory (sign,attr) {
    let url = ''
    switch (sign) {
      case "acfun":
        url = `http://www.acfun.cn/rank.aspx?channelId=${attr}&range=1&count=30&ext=1`
        break
      case "bilibili":
        url = `https://www.bilibili.com/index/rank/all-1-${attr}.json`
        break
      case "maopu":
        url = `http://staticize.mop.com/subject/rankSubjectList?&mainPlateId=1&type=10&pageIndex=1`
    }
    return url
  }
  function orderData (sign) {
    console.log("接收到数据请求")
    let site = sign.name
    let tab  = sign.tab
    let attr = ""
    if (site !== "maopu") {
      attr = params[site][tab]
    } 
    let url = urlsFactory(site,attr)
    fetch(url)
    .then(res => res.json())
    .then(res => {    
      // let oriData = JSON.parse(res)
      let data = []
      switch (site) {
        case "acfun":
          let ACFUN_URL = "http://m.acfun.cn/v/?ac="       
          res.map(element => {
            let ele = {}
            let id = element.url.slice(5)
            ele.title = element.title
            ele.src= element.titleImg
            ele.url = `${ACFUN_URL}${id}`
            data.push(ele)
          })
          break
        case "bilibili":
          let BILI_URL = "https://m.bilibili.com/video/av"
          let list = res.rank.list
          list.map(element => {
            let ele = {}
            ele.title = element.title
            ele.src = element.pic
            ele.url = `${BILI_URL}${element.aid}.html`
            data.push(ele)   
          })
          break
        case "maopu":
          let mList = res.entityList
          mList.map(element => {
            let ele = {}
            ele.title = element.title
            ele.summary  = element.summary
            ele.src = element.pic
            ele.url = element.url.slice(0,7) + 'm' + element.url.slice(7)
            data.push(ele)   
          })
          break
      }

      socket.emit("receiveData",data)
    })
      
    .catch(err => console.log(err))
    
  }
  socket.on("orderData",orderData)
})
const daily = io.of('/daily')
daily.on("connection", function (socket) {
  function orderData () {
    const URL = 'https://interface.meiriyiwen.com/article/random?dev=1'
    fetch(URL)
    .then(res => res.json())
    .then(res => {
      let d = res.data
      let data = {
        title:d.title,
        author:d.author,
        content:d.content,
      }
      socket.emit("receiveData",data)
    })
  }
  socket.on("orderData",orderData)
})
console.log("this server is running on 8081")

