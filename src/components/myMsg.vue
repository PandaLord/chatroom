<template>
  <div class="myMsg">
    <div class="InfoArea">
      <div class="msgArea">
        <p class="msg">{{ data.msg }}</p>
      </div>
    </div> 
    <img class="avatar" :src='"../images/pics/Avatar_" + data.avatar + "_45x45.png"' />
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
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items:flex-start;
    justify-content:flex-end;
    width:100%;
    margin-bottom:8px;
    margin-top:8px;
    margin-right:18px;
    
    .avatar {
      height: 45px;
      width: 45px; 
      background-color:#e9e7ef;
      }
    
    .InfoArea {
      display: inline-block;
      position: relative;
      margin-right:10px;
      max-width:45%;
      flex:0 1 auto;
      
      .msgArea {   
          display: -webkit-flex; /* Safari */
          display: flex;
          position: relative;
          align-items: center;
          max-width:100%;
          min-width:20px;
          padding:0 8px;
          min-height:45px;
          background-color:#CCFF99;
          color:#000;
          border-radius: 2px;
          border:1px solid rgba(0,0,0,0.2);
          z-index:12;
          .msg {
            display:inline;  
            font-size:16px; 
            word-wrap: break-word;
            word-break: break-all;        
            &::before {
              content:"";
              display:inline-block;
              position:absolute;
              z-index:9;
              top:3.8px;
              right:-6.2px;
              border:5.3px solid transparent;
              border-left-color:rgb(163,204,122);
              border-right-width:0;   
            }
            &:after {
              content:'';
              display: inline-block;
              position: absolute;
              right:-5px;
              top:4px;
              z-index:10;
              width: 0;
              height: 0;
              border:5px solid transparent;
              border-left-color:#CCFF99;
              border-right-width: 0;
            }
          }
      }
    }
  }
</style>