<template>
  <div class="rank">
    <div class="header">
      <a class="back" @click="backToHome"></a>
      <h3 class="title">每日排行榜</h3>
    </div>
    <div class="nav">
      <ul class="sitesList">
        <li :class="{ active : selectedWeb === 'acfun'}" @click="webChange('acfun')"><a>Acfun</a></li>
        <hr>
        <li :class="{ active : selectedWeb === 'bilibili'}" @click="webChange('bilibili')"><a>BiliBili</a></li>
        <hr>
        <li :class="{ active : selectedWeb === 'maopu'}" @click="webChange('maopu')"><a>猫扑</a></li>
        <hr>
      </ul>
    </div>
    <div class="rankingView">
      <template>
        <acfun-rank @tabChange="tabChange" v-if="selectedWeb === 'acfun' " :data="rankData"></acfun-rank>
        <bilibili-rank @tabChange="tabChange" v-if="selectedWeb === 'bilibili'"  :data="rankData"></bilibili-rank>
        <maopu-rank  v-if="selectedWeb === 'maopu'" :data="rankData"></maopu-rank>
      </template>
    </div>
  </div>  
</template>
<script>
import acfunRank from "./rankView/acfunRank.vue"
import bilibiliRank from "./rankView/bilibiliRank.vue"
import maopuRank from "./rankView/maopuRank.vue"
import io from "socket.io-client"
export default {
  data () {
    return {
      selectedWeb:"acfun",
      selectedTab:"综合",
      rankData:"",
    }
  },
  components:{
    acfunRank,
    bilibiliRank,
    maopuRank,
  },
  mounted () {
    var p = this
    p.socket = io("ws://pandachen.top:8081/rank")
    p.emitData()
    p.socket.on("receiveData",function (data) {
      console.log("接收到服务器传来的排行榜数据")
      p.rankData = data

    })
  },
  methods: {
    tabChange (tab) {
      var p = this
      p.selectedTab = tab
      p.emitData()
    },
    webChange (web) {
      var p = this
      p.selectedWeb = web
      p.emitData()
    },
    emitData () {
      var p = this
      this.socket.emit("orderData",{
        name:p.selectedWeb,
        tab:p.selectedTab,
      })
    },
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
    font-size:16px;
    
  }
  
  .rank {
    height:100%;
    width:100%;
    z-index:10000;
    .header {
      width:100%;
      display:flex;
      align-items: center;
      justify-content: flex-start;
      height: 50px;
      background-color:#35495e;
      color:#fff;
      .title {
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
    .nav {
      position:absolute;
      float:left;
      top:50px;
      left:0;
      height:100%;
      width:60px;
      background-color:#e9e7ef;
      .sitesList {
        margin:0 auto;
        width:50px;
        list-style-type: none;
        li {
          margin:10px 1px;
        }
      }
      .active {
        color:#ff851b;
        font-weight: bold;
        
      }
    }
    .rankingView {
      float:right;
      position:absolute;
      left:60px;
      top:50px;
      width:100%;
      height:100%;
      z-index:100000;
      background-color: #e9e7ef;
      
    }
  }
  
  
</style>
