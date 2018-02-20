<template>
  <div class="acfunRank">
    <div class="navbar">
      <scroller lock-y height="30px" :bounce="false"  >
        <div class="tabs">
          <div class="tab"
          :class="{ active : clickedTabIndex === index}"
          v-for="(item,index) in list"
          :key="index"
          @click="selectTab(item,index,$event)"
          >
          {{item}}
          </div>
        </div>
      </scroller>    
    </div>
    <div class="rankList">
        <card 
        v-for="(item,index) in data"
        :data="item" 
        :key="index">     
        </card>
    </div>   
</div>
</template>
<script>
import { Tab, TabItem, Scroller } from 'vux'
import Card from './card.vue'
export default {
  data () {
    return {
      tabIndex:'',
      list:['综合','动画','游戏','娱乐','体育','文章','音乐','舞蹈','国产','二次元'],
      selectedTab:'',
      clickedTabIndex:0,

    }
  },
  components: {
    Tab,
    TabItem,
    Scroller,
    Card,
    
  },
  methods:{
    selectTab (item,index,event) {
      this.selectedTab = item
      this.clickedTabIndex = index
      let rankList = document.getElementsByClassName('rankList')[0]
      this.$nextTick(() => {
        setTimeout(() => rankList.scrollTop = 0,1000)
      })
    }
  },
  watch: {
    selectedTab (curr,old) {
      this.$emit("tabChange",curr)
      
    }
  },
  props:["data"]
}
</script>
<style lang="less" scoped>
  .acfunRank {
    width:100%;
    position:relative;
    height:100%;
  }
  .navbar {
    width:100%;
    background-color:#fff;
    height:30px;
  }
  

  .tabs {
    display: flex;
    justify-content: flex-start;
    white-space: nowrap;
    align-items: center;
    // 这里的width需要包括本身tab的长度和被覆盖的长度
    width:670px;
    height:50px;
    background-color:#fff;
    padding-left:10px;  
    .tab {
      display: inline;
      flex:0 0 auto;
      height:50px;
      width:60px; 
      text-align:center;
    }
    .active {
      background-color:#ff851b;
      color:#fff;
    }

  }
  .rankList {
    width:100%;
    display:flex;
    position: absolute;
    height:~"calc(100% - 80px)";
    flex-wrap:wrap;
    justify-content: flex-start;
    align-content:flex-start;
    overflow-y:scroll;
    
  }

</style>

