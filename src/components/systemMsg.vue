<template>
  <div class="systemMsg">
    <h5 class="msg">{{ "系统消息:" + data.msg }}</h5>   
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props:["data"]
}
</script>
<style lang="less" scoped>
  .systemMsg {
    margin:10px auto;
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;   
    color:#fff;
    .msg {
      padding:0 10px;
      max-width:50%;
      font-size:14px;
      line-height:20px;
      border:1px solid transparent;
      border-radius:20px;
      flex:0 0 auto;
      word-break: break-all;
      word-wrap: break-word;
      background-color:rgba(62, 62, 68, 0.94);
    }


  }

</style>
