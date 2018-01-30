<template>
  <div class="maopuRank">
    <div class="rankList">
        <article-card 
        v-for="(item,index) in data"
        :data="item" 
        :key="index">     
        </article-card>
    </div>   
</div>
</template>
<script>
import articleCard from './articleCard.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    articleCard,
    
  },
  methods:{
  },
  props:["data"]
}
</script>
<style lang="less" scoped>
  .maopuRank {
    position:relative;
    height:100%;
  }
  .rankList {
    width:100%;
    display:flex;
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:10%;
    flex-wrap:wrap;
    justify-content: flex-start;
    align-content:flex-start;
    overflow-y:scroll;
    overflow-x:hidden;
    
  }

</style>

