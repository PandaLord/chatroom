<template>
  <div class="viewport">
    <div class="header">
      <a class="back"></a>
      <h1 class="title">熊猫的聊天室</h1>
      <a class="moreFunctions"></a>
    </div>
    <div class="chatArea" id="chat_con">
      <template v-for="msgData in msgList">
        <my-msg class="clearfix" :data="msgData" v-if="msgData.userName === userName">
        </my-msg>
        <other-msg class="clearfix" v-else :data="msgData" >
        </other-msg>
      </template>
    </div>
    <footer>
       <input 
        class="msgInput" 
        v-model="message"
        @keyup.13="sendMessage"/>        
        <button class="emojiButton">
          <img src="../images/icons/emoji_30px.png">
        </button>
    </footer>
  </div>
</template>
<script>
import myMsg from "./myMsg.vue"
import otherMsg from "./otherMsg.vue"
import systemMsg from './systemMsg.vue'
import io from "socket.io-client"
export default {
  name: "Home",
  data () {
    return {
      message: "",
      msgList: [],
      userName:""

    }
  },
  components:{
    myMsg,
    otherMsg,
    systemMsg
  },
  mounted () {
    var p = this
    p.socket = io("ws://localhost:8081/home")
    p.socket.on("loginName", function (name) {
      console.log("登录名称已接收到：" + name)
      p.userName = name
    })
    p.socket.on("messageReceived", function (data) {
      p.msgList.push(data)
      let scro = document.getElementById("chat_con")
      
    })
    p.socket.on("musicOrderReceived", function (data) {

    })

  },
  methods: {
    sendMessage () {
      var p = this
      var msg = p.message;
      if (msg !== '') {
          let reqData = {
            userName:p.userName,
            msgType:0,
            msgDate:new Date(),
            msg
          }
        p.message = ''
        p.socket.emit("sendMessage", reqData)
      }
      
      

    },
    sendEmoji () {

    },
    orderMusic () {

    }
  }
}

</script>
<style lang="less" scoped>
  @font-face {
    font-family: 'pingFang';
    src: url('../fonts/pingFang/pingFang.eot');
    src: url('../fonts/pingFang/pingFang.eot?#iefix') format('embeded-opentype'), /* IE6-8 */
         url('../fonts/pingFang/pingFang.woff') format('woff'), /* chrome、firefox */
         url('../fonts/pingFang/pingFang.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
         url('../fonts/pingFang/pingFang.svg#fontname') format('svg'); /* iOS 4.1- */
  }

  * {
    padding:0;
    margin:0;
    font-size:18px;
    font-family:'pingFang'
  }
  
  .clearfix {
    clear: both;
  }
  
  .viewport {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height:100%;
    
    
  }

  .header {
    width:100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    font-size:25px;
    height: 50px;
    background-color:#35495e;
    color:#fff;
    .title {
      display: inline;
      flex:0 0 auto;
    }
    .back {
      &:before {
        content:"<";
        font-size:25px;
        color:#ccc;
        padding-left:5px;
      }
    }
    .moreFunctions {
      &:after {
        content:"\2022 \2022 \2022";
        font-size:16px;
        color:#ccc;
        padding-right:5px;
      
      }
    }  
  }
  
  .chatArea {
    height: ~'calc(100% - 100px)';
    background-color:#e9e7ef;
    overflow-y: scroll;
    
    
  }

  footer {
    display: flex;
    width: 100%;
    height: 50px;
    background-color:#f0f0f4;
    border: 3px solid #f0f0f4;
    box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.2);
    align-items: center;
    .msgInput {
      flex:1 0 auto;
      height: 40px;
      &:focus {
        outline:none;
      }
    }
    .emojiButton {
      flex:0 0 40px;
      height:32px;
      border:1px solid transparent;
      border-radius:50%;
      background-color:transparent;
      &:focus {
        outline:none;
      }

    }
  }

  
</style>
