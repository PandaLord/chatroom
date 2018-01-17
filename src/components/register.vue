<template>
  <div class="viewport">
    <div class="registerArea">
      <img class="logo" src="../assets/pandaLogo.jpg">
      <div class="interactArea">
        <label>昵称:</label>
        <input class="userName" v-model="userName" @keyup.13="login" />
      </div>
      <x-button 
      type="primary" 
      class="loginButton" 
      @click.native="login">
          登录
      </x-button>
    </div>
    <toast v-model="loginSuccess" position="middle" :time="800" text="登录成功"></toast> 
    <toast v-model="loginFailure" type="cancel" position="middle" :text='"登录失败," + loginErr' :time="1600"></toast>
  </div>
</template>
<script>
import io from "socket.io-client"
import { Toast, XButton } from "vux"
export default {
  name:'Register',
  data () {
    return {
      loginSuccess: false,
      loginFailure: false,
      userName: '',
      loginErr: ''
    }
  },
  components:{
    XButton,
    Toast
  },

  mounted () {
    var p = this
    p.socket = io("ws://localhost:8081")
    p.socket.on("loginSuccess", function (data) { 
      if (data.userName === p.userName) {
        p.loginSuccess = true
        console.log("接受登录成功信息")
        setTimeout(function () {
          p.$router.replace(`/home/${p.userName}`)
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
      p.socket.emit("login", this.userName)  
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
      margin:auto;
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
        display: inline-flex;
        white-space: nowrap;
        justify-content: space-between;
        margin-bottom:20px;
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
  }
  
</style>


