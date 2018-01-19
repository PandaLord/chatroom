var server = require('http').createServer()
var io = require('socket.io')(server)

server.listen(8081)

var userNames = []
var userDatas = {}
var msgList = []

io.on('connection', function (socket) {
  console.log("有用户进入注册页面")
  let loginName = null
  function login (name) {
    if (name === '') {
      socket.emit('loginFailure',"不能使用空白昵称")

    } else if (userNames.indexOf(name) === -1) {
      userNames.push(name)
      userDatas.name = {
        id:userNames.length,
        points:5
      }
      loginName = name
      socket.emit("loginSuccess",{userName:name})
      console.log("登录成功，登录昵称为:" + name)
    } else {
      socket.emit("loginFailure", "昵称重复")
      console.log("登录失败，注册昵称重复")
    }
  }
  function loginOut () {
    let userName = loginName || "匿名"
    if (userNames.length === 1) {
      userNames = []
    } else {
      userNames = userNames.filter((name) => {
        return name != userName
      })
    }
    console.log(userNames)
    delete userDatas.userName
    console.log(userName + "离开了聊天室")
  }
  
  socket.on('login', login)
  socket.on('disconnect', loginOut)

})
//这里是和参考文档不同的地方，socket.io 2.0.4 版本改了方法，并且对于不同
//命名空间的emit需要给io附上of的具体路径才能emit。
const home = io.of('/home')
home.on('connection', function (socket) {
  console.log('有用户进入聊天室')
  console.log('当前聊天室有'+ userNames)
  home.emit("usersAmount", userNames.length)
  function sendMessage (data) {
    msgList.push(data)
    home.emit("messageReceived", data)
    console.log(data.userName + ":" + data.msg)
    }

  socket.on('sendMessage', sendMessage)
  
})
console.log("this server is running on 8081")

