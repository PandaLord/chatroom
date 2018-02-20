<template>
  <div class="musicPlayer" v-if="song !== undefined">
    <div class="buttons" >
      <i @click="playMusic" v-if="isPlaying" class="icon_pause"></i>
      <i @click="playMusic" v-else class="icon_play"></i>  
      <i @click="nextSong" class='icon_nextSong'></i>
    </div>  
    <span class="title">{{"正在播放:" + song.name }}</span>
    <audio @ended="nextSong" id="music" :src="song.url" 
    autoplay="autoplay" /> 
  </div>
</template>
<script>
export default {
  data () { 
    return {
      isPlaying:true,
      iosFlag:false,

    }
  },
  methods: {
    playMusic () {
      this.isPlaying = !this.isPlaying
      let audio = document.getElementById("music") 
      if (this.isPlaying) {  
        audio.play()     
      } else {
        audio.pause()
      }
    },
    nextSong () {
      this.isPlaying = true
      this.$emit("musicEnd")
    },
  },
  watch: {
    song: function () {
      let p = this
      document.addEventListener('touchstart', function () {
        if (p.isPlaying && !p.iosFlag) {
          let audio = document.getElementById("music")
          audio.load()
          audio.play()
          p.iosFlag = !p.iosFlag
        }    
      },false)
    }
  },
  props:['song']
}
</script>
<style lang="less" scoped>
  .musicPlayer {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex;
    -webkit-box-pack:start;/*兼容性属性*/
    -webkit-box-align: center;/*兼容性属性*/
    align-items: center;
    justify-content: flex-start;
    width:100%;
    color:#fff;
    background-color: rgba(62,62,68,.94);
    height:36px;
    line-height: 36px;
    font-size:20px;

    .buttons {
      display: -webkit-inline-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
      display: -moz-inline-box; /* 老版本语法: Firefox (buggy) */
      display: -ms-inline-flexbox; /* 混合版本语法: IE 10 */
      display: -webkit-inline-flex; /* 新版本语法: Chrome 21+ */
      display: inline-flex;
      flex-grow:0;
      flex-shrink: 0;
      flex-basis:60px;
      flex:0 0 60px;
      height:30px; 
      -webkit-box-pack:start;/*兼容性属性*/
      -webkit-box-align: center;/*兼容性属性*/
      justify-content: flex-start;
      align-items: center;
      .icon_play,
      .icon_pause,
      .icon_nextSong {
        flex-grow:1;
        flex-shrink: 0;
        flex-basis:30px;
        flex:1 0 30px;
        width:100%;
        height:100%; 
        
      }
      .icon_play {
        background:url('../images/icons/play_16px.png');
        background-repeat: round;
        background: url('../images/icons/play_16px.png') round;  
      }
      .icon_pause {
        background:url('../images/icons/play_16px.png');
        background-repeat: round;
        background: url('../images/icons/pause_16px.png') round;  
      }
      .icon_nextSong {
        background:url('../images/icons/play_16px.png');
        background-repeat: round;
        background: url('../images/icons/nextSong_30px.png') round;  
      }
    }
    .test {
      flex-grow:1;
      flex-shrink: 0;
      flex-basis:auto;
      flex:1 0 auto;
      height:30px;
    }
    .title {
      margin-left:5px;
      flex-grow:1;
      flex-shrink: 0;
      flex-basis:auto;
      flex:1 0 auto;
    }
    audio {
      width:100%;
    }
  }
</style>
