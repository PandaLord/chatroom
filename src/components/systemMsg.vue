<template>
  <div class="systemMsg">
    <span class="msg">{{ data.msg }}</span>   
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  ready () {
    this.$el.scrollIntoView()
  },
  props:["data"]
}
</script>
<style lang="less" scoped>

</style>
