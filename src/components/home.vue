<template>
  <div class="viewport" >
    <div class="header">
      <a class="back"></a>
      <h1 class="title">熊猫的聊天室({{ userAmount }})</h1>
      <a class="moreFunctions"  @click="moreFShow = !moreFShow"></a>
      <more-function 
      v-if="moreFShow" 
      @musicOrder="orderMusic" 
      @backToChat="simuClick"
      @click.native="moreFShow = false"
      @musicLoading="isLoadingMusic = true">
      </more-function>
    </div>
    <toast
    v-model="isLoadingMusic" 
    position="middle" 
    :time="1800" 
    :text="'搜索中，完成后添加至歌单序列'"  
    :is-show-mask="true"></toast>
    <toast v-model="musicError" type="cancel" position="middle" text="音乐获取失败，请稍后重试" :time="1600"></toast>
    <music-player :song="musicList[0]" @musicEnd="autoSwitch"></music-player>
    <div class="chatArea" id="chat_con" @click="chatWindowClick">
      <template v-for="msgData in msgList">
        <system-msg class="clearfix"
        v-if="msgData.msgType === 0"
        :data="msgData">
        </system-msg>
        <my-msg class="clearfix" 
        :data="msgData" 
        v-else-if="msgData.userName === userName">
        </my-msg>
        <other-msg class="clearfix" v-else :data="msgData" >
        </other-msg>
      </template>
    </div>
    <footer>
       <input 
        class="msgInput" 
        v-model="message"
        @keyup.13="sendMessage(1,message,userName)"/>        
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
import musicPlayer from './music.vue'
import io from "socket.io-client"
import { Toast } from "vux"

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
      musicList:[],
      musicError: false,
      isLoadingMusic:false,
      

    }
  },
  components:{
    myMsg,
    otherMsg,
    systemMsg,
    emoji,
    moreFunction,
    musicPlayer,
    Toast,
  },
  mounted () {
    var p = this
    p.socket = io("ws://localhost:8081/home")
    p.userName = p.$route.params.id
    p.socket.emit("passUserName", p.userName)
    p.socket.on("messageReceived", function (data) {
      p.msgList.push(data)
      // 这里的nextTick是针对vue更新DOM后再获取，否则会有DOM更新与方法执行的时间差
      p.chatScroll()  
    })
    p.socket.on("usersAmount",function (amount) {
      console.log("接受到服务端发送的在线人数")
      console.log(amount)
      p.userAmount = amount
    })
    p.socket.on("orderedMusicList", function (list) {
      p.musicList = list
    })
    p.socket.on("musicOrderReceived", function (data) {
      console.log("接收到服务端传来的音乐url")
      p.musicList.push(data)
    })
    p.socket.on("musicOrderError", function (data) {
      p.isLoadingMusic = false
      p.musicError = true

    })
    
  },
  methods: {
    sendMessage (type,message,user) {
      var p = this
      if (message !== '') {
          let reqData = {
            userName:user,
            msgType:type,
            msgDate:new Date(),
            msg:message,
          }
        p.socket.emit("sendMessage", reqData)
      }     
      if (type === 1) {
        p.message = ''
      }
    },
    autoSwitch () { 
      this.musicList.shift()     
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
    orderMusic (songName) {
      console.log('接收到子组件传来的音乐搜索要求，歌曲名为：' + songName)
      this.socket.emit("orderMusic", {
        user:this.userName,
        song:songName,
      })
    },
    simuClick () {
      this.chatWindowClick()
    },
    chatWindowClick () {
      this.moreFShow = false
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
    overflow:hidden;
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
    width:~'calc(100% + 18px)';
    overflow-x:hidden;
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
