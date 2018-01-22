<template>
  <div id="app">
    <transition name="mainView">
      <router-view class="view">
      
      </router-view>  
    </transition>
      
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
html,
body {
  height:100%;
  width:100%;
  
}
#app {
  height:100%;
  width:100%;
  position: relative;
}
.view {
  position:absolute;
  width:100%;
  top:0;
  left:0;
}
.mainView-enter-active,
.mainView-leave-active, {
  transition:left .6s ease-in-out;
}
.mainView-leave-to {
  left:-100%;
}
.mainView-enter {
  left:100%;
}



      
</style>
