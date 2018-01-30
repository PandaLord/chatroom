<template>
  <div class="card" @click="toWeb(data.url)">
    <img class="cover" :src="data.src" />
    <span class="title">
      {{data.title}}
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
  .card {
    display: flex;
    width:100%;
    padding:0 10px;
    height:100px;
    justify-content: flex-start;
    align-items: center;
    background-color:#fff;
    border-bottom-width:5px;
    border-bottom-color:rgba(0,0,0,0.1);
    border-bottom-style: solid;
    .cover {
      width:35%;
      height:80%;
      
    }
    .title {
      padding:0 6px 0 6px;
      word-break: break-all;
      word-wrap: break-word;
      max-height:100%;
      overflow:hidden;
      font-size:16px;
      width:45%;
    }
      
    

  }
</style>
