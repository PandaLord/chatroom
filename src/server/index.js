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
  function orderMusic (info) {
    console.log("接收到客户端发送的音乐搜索请求，歌曲名为：" + info.song)
    musicApi.searchSong("qq",{
      key: info.song,
      limit:10,
      page:1
    }).then(res => {
      console.log('得到音乐id')
      let name = res.songList[0].name
      musicApi.getSong('qq',{
        id:res.songList[0].id,
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
  socket.on('passUserName', function (name) {
    userName = name
    sendSystemMessage(userName + "进入了聊天室")
  })
  socket.on('sendMessage', sendMessage)
  socket.on("orderMusic", orderMusic)
  socket.on("disconnect",loginOut)
  
})
console.log("this server is running on 8081")

