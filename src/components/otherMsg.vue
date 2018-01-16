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
    
    .avatar {
      height: 50px;
      width: 50px; 
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
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
        
      }
      .msgArea {   
          display: inline-block;
          position: relative;
          max-width:160px;
          min-width:40px;
          padding:0 5px;
          background-color:#fff;
          color:#000;
          border-radius: 2px;
          text-align:start;
          .msg {
            margin:0 auto;
            display:inline;
           
            font-size:20px;  
            word-wrap: break-word;
            word-spacing: 3px;
            
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