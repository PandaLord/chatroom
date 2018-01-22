<template>
  <div class="otherMsg">
    <img class="avatar" :src='"../images/pics/Avatar_" + data.avatar + "_45x45.png"' />
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
  props:["data"]
}
</script>
<style lang="less" scoped>
 .otherMsg {
    float: left;
    display: -webkit-flex; /* Safari */
    display: flex;
    width:100%;
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
      margin-left:10px;
      max-width:45%;
      flex:0 1 auto;
      .userName {
        font-size:16px;
        vertical-align: top;
        color:#666;
        line-height:20px;
        
      }
      .msgArea {   
          display: -webkit-flex; /* Safari */
          display: flex;
          position: relative;
          align-items: center;
          max-width:100%;
          min-width:20px;
          min-height:45px;
          padding:0 8px;
          background-color:#fff;
          color:#000;
          border-radius: 2px;
          border:1px solid rgba(0,0,0,0.2);
          .msg {
            display:inline;
            font-size:16px;  
            word-wrap: break-word;
            word-break: break-all;
            &::after {
              content:"";
              display:inline-block;
              position:absolute;
              z-index:9;
              top:3px;
              left:-6px;
              border:6px solid transparent;
              border-right-color:rgba(0,0,0,0.2);
              border-left-width:0;
            }
            &:before {
              content:'';
              display: inline-block;
              position: absolute;
              left:-5px;
              top:4px;
              width: 0;
              height: 0;
              z-index:10;
              border:5px solid transparent;
              border-right-color:#fff;
              border-left-width: 0;
            }
          }
        
      }
      
    }

  }
</style>