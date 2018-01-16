<template>
  <div class="myMsg">
    <div class="InfoArea">
      <div class="msgArea">
        <p class="msg">{{ data.msg }}</p>
      </div>
    </div> 
    <img class="avatar" src="../images/pics/testAvatar.jpg" />
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
 .myMsg {
    float: right;
    display: flex;
    align-items:flex-start;
    justify-content:flex-start;
    margin-bottom:8px;
    
    .avatar {
      height: 30px;
      width: 30px; 
      }
    
    .InfoArea {
      display: block;
      position: relative;
      margin-right:5px;
      
      .msgArea {   
          display: inline-block;
          position: relative;
          max-width:160px;
          min-width:40px;
          padding:0 5px;
          background-color:#CCFF99;
          color:#000;
          border-radius: 2px;
          text-align:start;
          .msg {
            margin:0 auto;
            display:inline;  
            font-size:20px; 
            word-wrap: break-word;
            word-spacing: 3px;
            white-space:pre-line ;
            &:after {
              content:'';
              display: inline-block;
              position: absolute;
              right:-3px;
              top:3px;
              width: 0;
              height: 0;
              border:3px solid transparent;
              border-left-color:#CCFF99;
              border-right-width: 0;
            }
          }
        
      }
      
    }

  }
</style>