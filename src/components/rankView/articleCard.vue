<template>
  <div class="articleCard" @click="toWeb(data.url)">
    <span class="title">
      {{data.title}}
    </span>
    <span class="summary">
      {{data.summary}}
    </span>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props:['data'],
  methods: {
    toWeb (url) {
      window.open(url)
    }
  }
}
</script>
<style lang="less" scoped>
  * {
    padding:0;
    margin:0;
    color:#000;
  }
  .articleCard {
    display: flex;
    width:80%;
    padding:0 10px 0 5px;
    flex-wrap:wrap;
    justify-content: flex-start;
    align-items: flex-start;
    background-color:#fff;
    border-bottom-width:5px;
    border-bottom-color:rgba(0,0,0,0.1);
    border-bottom-style: solid;
    .title {
      display: block;
      padding:0 6px 0 6px;
      overflow:hidden;
      font-size:18px;
      
    }
    .summary {
      font-size:10px;
    }
  }
</style>
