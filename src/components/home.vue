<template>
  <div class="viewport" >
    <div class="header">
      <a class="back"></a>
      <h1 class="title">熊猫的聊天室({{ userAmount }})</h1>
      <a class="moreFunctions" @click="moreFShow = !moreFShow"></a>
      <more-function v-if="moreFShow"></more-function>
    </div>
    
    <div class="chatArea" id="chat_con" @click="moreFShow = false">
      <template v-for="msgData in msgList">
        <my-msg class="clearfix" :data="msgData" v-if="msgData.userName === userName">
        </my-msg>
        <other-msg class="clearfix" v-else :data="msgData" >
        </other-msg>
      </template>
      <div id="end"></div>
    </div>
    <footer>
       <input 
        class="msgInput" 
        v-model="message"
        @keyup.13="sendMessage"/>        
        <button class="emojiButton" @click="animateEmoji">
          <img src="../images/icons/emoji_30px.png">
        </button>
        <transition name="emoji">
          <emoji v-if="emojiSwitch" class="emoji"></emoji>
        </transition>
        
    </footer>
    
  </div>
</template>
<script>
import myMsg from "./myMsg.vue"
import otherMsg from "./otherMsg.vue"
import systemMsg from './systemMsg.vue'
import emoji from './emoji.vue'
import moreFunction from './moreFunctions.vue'
import io from "socket.io-client"


export default {
  name: "Home",
  data () {
    return {
      message: "",
      msgList: [],
      userName:"",
      emojiSwitch: false,
      moreFShow: false,
      userAmount: 0,

    }
  },
  components:{
    myMsg,
    otherMsg,
    systemMsg,
    emoji,
    moreFunction,
  },
  mounted () {
    var p = this
    p.socket = io("ws://localhost:8081/home")
    p.userName = p.$route.params.id
    p.socket.on("messageReceived", function (data) {
      p.msgList.push(data)
      // 这里的nextTick是针对vue更新DOM后再获取，否则会有DOM更新与方法执行的时间差
      p.chatScroll()  
    })
    p.socket.on("usersAmount",function (amount) {
      p.userAmount = amount
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
    chatScroll () {
      this.$nextTick(() => {
        let end = document.getElementById("chat_con")
        // 这里是使滚动条滚到最底部的代码
        end.scrollTop = end.scrollHeight
      })
    },
    animateEmoji () {
      this.emojiSwitch = !this.emojiSwitch
      this.chatScroll()
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
    display: -webkit-flex; /* Safari */
    display: flex;
    height:100%;
    overflow:hidden;
    flex-direction: column;
    justify-content: space-between;
    max-height:100%;
    
  }

  .header {
    width:100%;
    display:flex;
    flex:1 0 auto;
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
    width:~'calc(100% + 18px)'
  }

  footer {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap:wrap;
    width: 100%;
    background-color:#f0f0f4;
    border: 3px solid #f0f0f4;
    box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.3);
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
      display:block;
      height:32px;
      border:1px solid transparent;
      border-radius:50%;
      background-color:transparent;
      &:focus {
        outline:none;
      }

    }
    .emoji-enter-active, .emoji-leave-active {
      transition: height 0.25s ease-out;
    }

    .emoji-enter, .emoji-leave-to {
      height:0;
    }
    
  }

  
</style>
