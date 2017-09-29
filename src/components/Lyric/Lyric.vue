<template>
    <div class="lyric">
      <scroll :data="lyric" ref="scroll">
        <div>
          <div v-for="(lyric, index) of lyric"
               class="lyric-item"
               :class="{'active': lyricCurrentLine === index}"
               ref="lyricItems"
          >{{lyric.txt}}</div>
        </div>
      </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import API from '../../util/ApiServer'
    import Scroll from 'components/common/Scroll/Scroll'
    import {decodeBase64} from '../../util/base64'
    import lyricParse from 'lyric-parser'
    import {mapState, mapGetters} from 'vuex'

    export default {
      data(){
        return {
          lyric: [],
          currentLyric: null,
          lyricCurrentLine: -1
        }
      },
      props:{
        audioCurrentTime: {
          type: Number,
          default: 0
        }
      },
      methods: {
        async getLyric(songmid){
          if(this.currentLyric) this.currentLyric.stop()

          let result = await API.getLyric(songmid)
          result = result.replace('MusicJsonCallback_lrc(', ' ')
          result = JSON.parse(result.substr(0, result.length - 1))

          this.currentLyric = new lyricParse(decodeBase64(result.lyric), this.onLyricLinesChange)
          this.lyric = Object.freeze(this.currentLyric.lines)
          this.currentLyric.play()

        },
        onLyricLinesChange(lyricCurrentLine){
          const currentNum = lyricCurrentLine.lineNum;

          if(currentNum >= 2){
            this.$refs.scroll.scrollToElement(this.$refs.lyricItems[currentNum - 2], 1000)
          }else{
            this.$refs.scroll.scrollTo(0, 0, 1000)
          }

          this.lyricCurrentLine = currentNum;
          this.$emit('lyricTxtChange', lyricCurrentLine.txt)
        },
        refreshLyric(t){
          this.currentLyric && this.currentLyric.seek(t * 1000)
        }
      },
      watch:{
        currentSong(song, oldSong){
          if(song.id != oldSong.id || this.songList.length == 1){
            this.getLyric(song.songMid)
          }
        },
        playing(play){
          if(!play){
            this.currentLyric && this.currentLyric.togglePlay();
          }else{
            this.currentLyric && this.currentLyric.togglePlay();
          }
        }
      },
      computed:{
        ...mapState({
          playing: state => state.Play.playing,
        }),
        ...mapGetters(['currentSong'])
      },
      components:{
        Scroll
      }
    }
</script>

<style lang="stylus" type="text/stylus">
    @import "../../assets/stylus/variable2.styl"
    @import "../../assets/stylus/mixin.styl"

    .lyric
      box-sizing border-box
      padding 40px 0
      width 100%
      height 100%
      overflow hidden
      .lyric-item
        width 100%
        height 50px
        line-height 50px
        font-size $font-size-medium
        no-wrap()
        &.active
          color $color-theme
</style>
