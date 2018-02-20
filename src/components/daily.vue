<template>
  <div class="daily">
    <div class="header">
      <a class="back" @click="backToHome"></a>
      <h3 class="headerTitle">每日一文</h3>
    </div>
    <div class="textArea">
      <span class="title">{{data.title}}</span>
      <span class="author">{{data.author}}</span>
      <div class="content" v-html="data.content">
        
      </div>
    </div>
    
  </div>
</template>
<script>
import io from "socket.io-client"

export default {
  data () {
    return {
      data:{}
    }
  },
  mounted () {
    var p = this
    p.socket = io('ws://pandachen.top:8081/daily')
    p.socket.emit("orderData")
    p.socket.on("receiveData",function (data) { 
      console.log("收到服务器发送的每日一文")
      p.data = data
    })
  },
  methods:{
    backToHome () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
  * {
    padding:0;
    margin:0;    
  }
  .daily {
    height:100%;
    width:100%;
    background-color:rgb(223, 206, 171);
    z-index:100000;
    .header {
      width:100%;
      display:flex;
      align-items: center;
      justify-content: flex-start;
      height: 50px;
      background-color:#35495e;
      color:#fff;
      .headerTitle {
        display: inline;
        flex:1 0 auto;
        text-align:center;
        margin-left:-40px;
      }
      .back {
        flex:0 0 40px;
        white-space: nowrap;
        &:before {
          content:"返回";
          vertical-align: middle;
          color:#ccc;
          padding-left:10px;
        }
      } 
    }
    .textArea {
      position:absolute;
      left:0;
      top:50px;
      right:0; // 隐藏滚动条
      bottom:0;
      z-index:11111;
      padding:0 5px 0 5px;
      overflow-y: scroll;
      overflow-x:hidden;
      
    
      .title {
        font-size:30px;
        text-align:center;
        display: block;
      }
      .author {
        font-size:18px;
        display:block;
        text-align:center;
      }
      .content {
        p {
          margin-bottom:100px;
        }
      }
    }  
  }
  
</style>
