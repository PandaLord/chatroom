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
    }
  },
  
  // mounted () {
  //   var p = this
  //   let audio = document.getElementById("music")
  //   if (audio) {
  //     console.log("添加事件监听")
  //     audio.loop = false
  //     audio.addEventListener("ended", function () {
  //       p.nextSong()
  //     })
  //   } 
  // },
  
  // mounted () {
  //   let audio = document.getElementById('music')
  //   if (audio) {
  //     this.musicEnd = audio.ended
  //     console.log(this.musicEnd)        
  //   } 
  // },  
  // watch: {
  //   audio: {
  //     handler:function (curr,old) {
  //       if (curr) {
  //         console.log("bingo")
  //         console.log(curr)
  //         this.nextSong()
  //       }

  //     },
  //     deep:true
  //   }
  // },
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
  props:['song']
}
</script>
<style lang="less" scoped>
  .musicPlayer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width:100%;
    color:#fff;
    background-color: rgba(62,62,68,.94);
    height:36px;
    line-height: 36px;
    font-size:20px;

    .buttons {
      display: inline-flex;
      flex:0 0 60px;
      height:30px; 
      justify-content: flex-start;
      align-items: center;
      .icon_play,
      .icon_pause,
      .icon_nextSong {
        flex:1 0 30px;
        width:100%;
        height:100%; 
        
      }
      .icon_play {
        background: url('../images/icons/play_16px.png') round;  
      }
      .icon_pause {
        background: url('../images/icons/pause_16px.png') round;  
      }
      .icon_nextSong {
        background: url('../images/icons/nextSong_30px.png') round;  
      }
    }
    .test {
      flex:1 0 auto;
      height:30px;
    }
    .title {
      margin-left:5px;
      flex:1 0 auto;
    }
    audio {
      width:100%;
    }
  }
</style>
