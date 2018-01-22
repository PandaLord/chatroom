<template>
  <div class="viewport">
    <div class="registerArea">
      <img class="logo" src="../assets/pandaLogo.jpg">
      
      <div class="interactArea">
        <label>昵称:</label>
        <input class="userName" v-model="userName" @keyup.13="login" />
        <a class="changeAvatar" @click="isAvatar = !isAvatar" href="#">选择头像</a>
      </div>
      
      <x-button 
      type="primary" 
      class="loginButton" 
      @click.native="login">
          登录
      </x-button>
      <div class="avatarBox" v-if="isAvatar" >
        <checker v-model="avatar" default-item-class="avatar-item" selected-item-class="avatar-item-selected">
          <checker-item value="1">
            <img class="avatar" src="../images/pics/Avatar_1_45x45.png" />
          </checker-item>
          <checker-item value="2">
            <img class="avatar" src="../images/pics/Avatar_2_45x45.png" />
          </checker-item>
          <checker-item value="3">
            <img class="avatar" src="../images/pics/Avatar_3_45x45.png" />
          </checker-item>
          <checker-item value="4">
            <img class="avatar" src="../images/pics/Avatar_4_45x45.png" />
          </checker-item>
          <checker-item value="5">
            <img class="avatar" src="../images/pics/Avatar_5_45x45.png" />
          </checker-item>
          <checker-item value="6">
            <img class="avatar" src="../images/pics/Avatar_6_45x45.png" />
          </checker-item>
          <checker-item value="7">
            <img class="avatar" src="../images/pics/Avatar_7_45x45.png" />
          </checker-item>
          <checker-item value="8">
            <img class="avatar" src="../images/pics/Avatar_8_45x45.png" />
          </checker-item>
          <checker-item value="9">
            <img class="avatar" src="../images/pics/Avatar_9_45x45.png" />
          </checker-item>
          <checker-item value="10">
            <img class="avatar" src="../images/pics/Avatar_10_45x45.png" />
          </checker-item>
          <checker-item value="11">
            <img class="avatar" src="../images/pics/Avatar_11_45x45.png" />
          </checker-item>
          <checker-item value="12">
            <img class="avatar" src="../images/pics/Avatar_12_45x45.png" />
          </checker-item>
        </checker>
      </div>
    </div>
    
    <toast v-model="loginSuccess" position="middle" :time="800" text="登录成功"></toast> 
    <toast v-model="loginFailure" type="cancel" position="middle" :text='"登录失败," + loginErr' :time="1600"></toast>
  </div>
</template>
<script>
import io from "socket.io-client"
import { Toast, XButton,Checker,CheckerItem } from "vux"
export default {
  name:'Register',
  data () {
    return {
      loginSuccess: false,
      loginFailure: false,
      userName: '',
      loginErr: '',
      isAvatar: false,
      avatar:'',

    }
  },
  components:{
    XButton,
    Toast,
    Checker,
    CheckerItem,
  },

  mounted () {
    var p = this
    p.socket = io("ws://localhost:8081")
    p.socket.on("loginSuccess", function (data) { 
      if (data.userName === p.userName) {
        p.loginSuccess = true
        console.log("接受登录成功信息")
        setTimeout(function () {
          p.$router.replace(`/home/${p.userName}#${p.avatar}`)
        },1500)
      } else {
        p.loginFailure = true
        p.loginErr = "昵称传递失败"
      }
      
    })
    p.socket.on("loginFailure", function (err) {
      p.loginFailure = true
      p.loginErr = err
    })
  },
  methods: {
    login () {
      var p = this  
      if (p.avatar === '') {
        p.avatar = Math.floor(Math.random() * 12 + 1) + ''
      }
      p.socket.emit("login", {
        name:p.userName,
        avatar:p.avatar
      })  

    },
  }
}
</script>
<style lang="less" scoped>
  @fontColor: #000;
  
  * {
    padding:0;
    margin:0;
  }
  
  .viewport {
    font-size:18px;
    color:@fontColor;
    width:100%;
    height:100%;
    
    .registerArea {
      text-align: center;
      height:400px;
      padding-top:20%;
      .logo {
          display:block;
          margin:0 auto;
          margin-bottom: 10px;
          max-width:50%;
          width:300px;
          border:1px solid transparent;
          
      }
      .interactArea {
        line-height:25px;
        margin:0 auto;
        width:280px;
        display: -webkit-flex; /* Safari */
        display: inline-flex;
        white-space: nowrap;
        justify-content: space-between;
        margin-bottom:20px;
        .changeAvatar {
          text-decoration: none;
          color:#000;
          font-size:9px;
          margin-left:5px;
        }
        label {
          vertical-align: text-top;
          margin-right:10px;
        }
        .userName {
          flex:1;
          height:25px;
          font-size:15px;
          border:1px solid rgba(0,0,0,0.2);
          border-radius: 2px;
          box-shadow: 0 1px 3px rgba(0,0,0,.2);
          box-sizing: border-box; 
        }  
      }
      .loginButton {
        display:block;
        margin:0 auto;
        width:280px;
        border-radius:2px;
      }     
    }
    .avatarBox {
      margin:10px auto 0 auto;
      width:300px;
      .avatar-item {
        width:45px;
        height:45px;
      }
      .avatar-item-selected {
        border:2px solid rgba(0,0,0,0.5);
      }
    }
  }
  
</style>


