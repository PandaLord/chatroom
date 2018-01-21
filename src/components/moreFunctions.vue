<template>
  <div class="moreFunction">
    <ul>
      <li>
        <button @click.stop="musicOrder = !musicOrder">
          <img class="icons" src="../images/icons/music_16px.png" />
          点歌
        </button>
      </li>
      <li>
        <button>
          <img class="icons" src="../images/icons/addUser_16px.png" />
          添加朋友
        </button>
      </li>
      <li>
        <button>
          <img class="icons" src="../images/icons/scan_16px.png" />
          扫一扫
        </button>
      </li>
      <li>
        <button>
          <img class="icons" src="../images/icons/cash_16px.png" />
          收付款
        </button>
      </li>
    </ul>
    <x-dialog class="musicSearch" v-model="musicOrder" @click.native.stop>
      <div class="musicForm">
        <h5 class="musicSearch_title">请输入你要搜索的歌曲</h5>
        <input class="musicSearch_input" v-model="musicSearchInput" placeholder="例如：江南 林俊杰" />
        <x-button class="confirmButton" mini plain type="primary" @click.native="musicSearchConfirm">确认</x-button>
        <x-button class="cancelButton" mini plain @click.native="musicOrder = false;backToChat()">取消</x-button>
      </div>   
    </x-dialog>
    
    
  </div>
</template>
<script>
import { Toast, XDialog,XButton } from "vux"
export default {
  data () {
    return {
      musicOrder:false,
      musicSearchInput:"",
      isLoading:false,
    }
  },
  components: {
    XDialog,
    XButton,
    Toast,
  },
  methods: {
    musicSearchConfirm () {
      let p = this
      p.musicOrder = false
      p.isLoading = true
      p.$emit('musicLoading')
      p.$emit('musicOrder', p.musicSearchInput)
      p.musicSearchInput = ""
      this.backToChat()
    },
    backToChat () {
      this.$emit("backToChat")
    }
  }
}
</script>
<style lang="less" scoped>
  * {
    padding:0;
    margin:0;
  }
  .musicSearch {
    color:#000;
    
    .musicSearch_title {
      font-size:16px;
      font-weight:300;
    }
    .musicSearch_input {
      display: block;
      margin:0 auto;
      padding-top:5px;
      outline:0;
      border:0;
      border-bottom:1px solid rgba(0,0,0,0.2);
      width:90%;
      height:50%;
    }
    .confirmButton,
    .cancelButton {
      margin:5px 10px;
      border:0;
      outline:0;
    }

  }
  .icons {
    margin:0 10px 0 5px;
    vertical-align:sub;
  }
  .moreFunction {
    position: absolute;
    z-index:1000;
    top:60px;
    right:10px;
    width:120px;
    padding:10px;
    font-size:14px;
    line-height: 30px;    
    background-color: #35495e;
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
        button {
          widtH:100%;
          text-align:start;
          color:#fff;
          background-color: transparent;
          border:0;
          outline:0;
        }
      }
      li:not(:last-child) {
        border-bottom-width: 1px;
        border-bottom-color:rgba(255,255,255,0.3)
      }
    }
    

  }
</style>
