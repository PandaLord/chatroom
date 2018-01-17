<template>
  <div class="otherMsg">
    <img class="avatar" src="../images/pics/testAvatar.jpg" />
    <div class="InfoArea">
      <h5 class="userName">{{ data.userName }}</h5>
      <div class="msgArea">
        <p class="msg">{{ data.msg }}</p>
      </div>
    </div> 
    
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
 .otherMsg {
    float: left;
    display: flex;
    align-items:flex-start;
    align-content: flex-start;
    justify-content:flex-start;
    margin-bottom:8px;
    margin-top:8px;
    
    .avatar {
      height: 45px;
      width: 45px;
      background-color: #e9e7ef; 
      }
    
    .InfoArea {
      display: inline-block;
      position: relative;
      margin-left:5px;
      .userName {
        font-size:8px;
        vertical-align: top;
        color:#666;
        line-height:20px;
        
      }
      .msgArea {   
          display: flex;
          position: relative;
          align-items: center;
          max-width:240px;
          min-width:20px;
          min-height:32px;
          padding:0 8px;
          background-color:#fff;
          color:#000;
          border-radius: 2px;
          .msg {
            display:inline;
            font-size:16px;  
            word-wrap: break-word;
            
            &:before {
              content:'';
              display: inline-block;
              position: absolute;
              left:-3px;
              top:3px;
              width: 0;
              height: 0;
              border:3px solid transparent;
              border-right-color:#fff;
              border-left-width: 0;
            }
          }
        
      }
      
    }

  }
</style>