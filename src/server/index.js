var server = require('http').createServer()
var io = require('socket.io')(server)
var musicApi = require("music-api")
server.listen(8081)

var userNames = []
var msgList = []


io.on('connection', function (socket) {
  console.log("有用户进入注册页面")
  let loginName = null
  function login (name) {
    if (name === '') {
      socket.emit('loginFailure',"不能使用空白昵称")
    } else if (userNames.indexOf(name) === -1) {
      // userNames.push(name)
      // userDatas.name = {
      //   id:userNames.length,
      //   points:5,
      //   avatar:avatar,
      // }
      loginName = name
      socket.emit("loginSuccess", loginName)
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
  let userName = ''
  let avatar = ''
  home.emit("usersAmount", userNames.length)
  function sendMessage (data) {
    let pattern = /\[[\u4e00-\u9fa5]+\]/g
    let emojiList =  [
      '微笑', '撇嘴', '色', '发呆', '得意', '流泪',
      '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒',
      '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗',
      '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢',
      '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', 
      '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰',
      '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', 
      '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', 
      '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球',
      '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', 
      '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', 
      '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳',
      '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳',
      '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', 
      '挥手', '激动', '街舞','献吻', '左太极', '右太极'
      ]
    let list = []
    let match
    while (match=pattern.exec(data.msg)) {
      list.push(match[0])
    }
    list.forEach(function (item) {
      let item2 = item.replace("[","").replace("]","")
      let index = emojiList.indexOf(item2)
      if (index !== -1) {
        let emotion = `<span style="background:
        url(https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/default218877.gif) 
          ${index * -24}px 0;width:24px;height:24px;margin:4px 2px 0 2px;
          vertical-align:sub;display:inline-block"></span>`                        
        data.msg = data.msg.replace(item,emotion)
      }    
    })
    msgList.push(data)
    home.emit("messageReceived", data)
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
    // delete userDatas.userName
    if (userName !== null && userName !== "") {
      sendSystemMessage(userName + "离开了聊天室")
      console.log(userNames)
      updateUsersAmount()
      console.log(userName + "离开了聊天室")
    }
    
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
  function updateUsersAmount () {
    home.emit("usersAmount",userNames.length)
  }
  socket.on('passUserData', function (data) {
    userNames.push(data.userName)
    userName = data.userName
    avatar = data.avatar
    console.log('当前聊天室有'+ userNames)
    sendSystemMessage(userName + "进入了聊天室")
    updateUsersAmount()
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

