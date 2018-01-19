<template>
  <div class="moreFunction">
    <ul>
      <li>
        <buttton>
          <img class="icons" src="../images/icons/chat_16px.png" />
          发起群聊
        </buttton>
      </li>
      <li>
        <buttton>
          <img class="icons" src="../images/icons/addUser_16px.png" />
          添加朋友
        </buttton>
      </li>
      <li>
        <buttton>
          <img class="icons" src="../images/icons/scan_16px.png" />
          扫一扫
        </buttton>
      </li>
      <li>
        <buttton>
          <img class="icons" src="../images/icons/cash_16px.png" />
          收付款
        </buttton>
      </li>

    </ul>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
  * {
    padding:0;
    margin:0;
  }
  .icons {
    color:#fff;
    margin:0 10px 0 5px;
    vertical-align:sub;
  }
  .moreFunction {
    position: absolute;
    z-index:1000;
    top:60px;
    right:10px;
    width:120px;
    white-space: nowrap;
    padding:10px;
    font-size:14px;
    line-height: 30px;
    
    background-color: #35495e;
    color:#fff;
    &::before {
      content:'';
      position: absolute;
      top:-16px;
      right:4px;
      
      
      border:10px solid transparent;
      border-bottom-color:#35495e;  
    }
    ul {
      list-style-type: none;
      li {
        border:2px solid transparent;
      }
      li:not(:last-child) {
        border-bottom-width: 1px;
        border-bottom-color:rgba(255,255,255,0.3)
      }
    }
    

  }
</style>
