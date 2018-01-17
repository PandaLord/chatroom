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
    margin-top:8px;
    margin-right:18px;
    
    .avatar {
      height: 45px;
      width: 45px; 
      background-color:#e9e7ef;
      }
    
    .InfoArea {
      display: block;
      position: relative;
      margin-right:5px;
      
      .msgArea {   
          display: flex;
          position: relative;
          align-items: center;
          max-width:240px;
          min-width:20px;
          padding:0 8px;
          min-height:45px;
          background-color:#CCFF99;
          color:#000;
          border-radius: 2px;
          .msg {
            display:inline;  
            font-size:16px; 
            word-wrap: break-word;
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