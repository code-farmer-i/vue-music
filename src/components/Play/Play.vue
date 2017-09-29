<template>
  <div>
    <div class="normal-player" :class="[fullScreen ? 'show enter' : 'leave']">
      <div class="title-group">
        <div class="player-header">
          <i class="icon-back" @click="showMini"></i>
          <div class="song-name" v-html="currentSong.name"></div>
        </div>
        <div class="singerName"><span v-html="currentSong.singerName" class="text"></span></div>
      </div>
      <div class="middle">
        <slider :autoPlay="false" :loop="false">
          <div class="slider-item">
            <div class="player-cd">
              <div class="cd-wrap" :class="[playing ? 'play' : 'pause']">
                <img :src="currentSong.discImg" width="100%" height="100%"
                     style="-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;">
              </div>
            </div>
            <div class="currentLyricTxt">{{currentLyricTxt}}</div>
          </div>
          <div class="slider-item">
            <lyric ref="lyric" @lyricTxtChange="setCurrentLyricTxt"></lyric>
          </div>
        </slider>
      </div>
      <div class="bottom">
        <div class="progress-wrapper">
          <span class="time time-l">{{showCurrentTime}}</span>
          <div class="progress-bar-wrapper">
            <div class="progress-bar" @click="progressClick" ref="progress">
              <div class="bar-inner">
                <div class="progress" :style="{width: `${getRatio * 100}%`}"></div>
                <div class="progress-btn-wrapper"
                     :style="{transform: `translate3d(${getRatio * progressWidth}px, 0px, 0px)`}">
                  <div class="progress-btn"></div>
                </div>
              </div>
            </div>
          </div>
          <span class="time time-r">{{showDuration}}</span>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i :class="getModeIcon" @click="changeMode"></i>
          </div>
          <div class="icon i-left">
            <i class="icon-prev" @click="changeSong('prev')"></i>
          </div>
          <div class="icon i-center">
            <i :class="[playing ? 'icon-pause' : 'icon-play']" @click="togglePlay"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-next" @click="changeSong('next')"></i>
          </div>
          <div class="icon i-right">
            <i class="icon"
               :class="[isFavorite(currentSong.id) ? 'icon-favorite' : 'icon-not-favorite']"
               @click="toggleFavorite(currentSong)"
            ></i>
          </div>
        </div>
      </div>
      <div class="player-bg">
        <img :src="currentSong.discImg" width="100%" height="100%">
      </div>
    </div>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen && songList.length" @click="showFull">
        <div class="icon">
          <img width="40" height="40" :src="currentSong.discImg" :class="[playing ? 'play' : 'pause']">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singerName"></p>
        </div>
        <div class="control">
          <div class="progress-circle" @click.stop="togglePlay">
            <div class="circle-item" :class="{'gt50': getRatio * 360 > 180}">
              <div class="circle" :style="{transform: `rotateZ(${getRatio * 360}deg)`}"></div>
              <div class="circle-fill gt50" v-show="getRatio * 360 > 180"></div>
              <div class="circle-fill lt50" v-show="getRatio * 360 < 180"></div>
              <div class="inner-circle"></div>
              <div class="play-icon" :class="[playing ? 'play' : 'pause']"></div>
            </div>
          </div>
        </div>
        <div class="control" @click.stop="showPlayList">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <play-list v-show="showSongList"></play-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import PlayList from '../PlayList/PlayList'
  import Slider from 'components/common/Slider/Slider'
  import Lyric from 'components/Lyric/Lyric'
  import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
  import {favoriteMixin, ModeMixin} from '../../Mixin/Mixin'

  export default {
    data() {
      return {
        audioDuration: 0,
        audioCurrentTime: 0,
        prevCurrentTime: 0,
        progressWidth: 0,
        progressBtnWidth: 30,
        currentLyricTxt: ''
      }
    },
    mixins: [favoriteMixin, ModeMixin],
    mounted() {
      this.$nextTick(() => {
        this.progressWidth = this.$refs.progress.clientWidth;
        this.audioEl = new Audio();

        this.audioEl.addEventListener('ended', () => {
          if (this.getMode == 'loop') {
            console.log('loop')
            this.loopCallBack()
          } else {
            this.changeSong('next')
          }
        })

        this.audioEl.onloadedmetadata = () => {
          this.audioDuration = Math.floor(this.audioEl.duration);
        }

        this.audioEl.ontimeupdate = () => {
          if (this.prevCurrentTime == Math.floor(this.audioEl.currentTime)) return

          this.audioCurrentTime = this.audioEl.currentTime;
          this.prevCurrentTime = Math.floor(this.audioEl.currentTime);
        }
      })
    },
    methods: {
      setCurrentLyricTxt(t) {
        console.log(t)
        this.currentLyricTxt = t
      },
      loopCallBack() {
        this.audioEl.play()

        //刷新歌词位置
        this.$refs.lyric.refreshLyric(0)
      },
      togglePlay() {
        this.playing ? this.pause() : this.play()
      },
      progressClick(e) {
        const n = (e.offsetX - (this.progressBtnWidth / 4)) / this.progressWidth;

        this.audioEl.currentTime = n * this.audioDuration;
        this.audioCurrentTime = n * this.audioDuration;

        //刷新歌词位置
        this.$refs.lyric.refreshLyric(this.audioCurrentTime)
      },
      _formatTime(seconds) {
        return [
          parseInt(seconds / 60 % 60),
          parseInt(seconds % 60)
        ]
          .join(":")
          .replace(/\b(\d)\b/g, "0$1");
      },
      _playSong(songId) {
        this.audioEl.src = `http://ws.stream.qqmusic.qq.com/${songId}.m4a?fromtag=46`;
        this.audioEl.play();

        //添加到最近播放列表
        this.addToLatelyList(this.currentSong)

        //更新state
        this.play()
      },
      ...mapMutations(['showMini', 'showFull', 'play', 'pause', 'showPlayList', 'addToLatelyList']),
      ...mapActions(['changeSong'])
    },
    computed: {
      getRatio() {
        return this.audioCurrentTime / this.audioDuration
      },
      showCurrentTime() {
        return this._formatTime(this.audioCurrentTime)
      },
      showDuration() {
        return this._formatTime(this.audioDuration)
      },
      ...mapState({
        playing: state => state.Play.playing,
        mode: state => state.Play.mode,
        fullScreen: state => state.Play.fullScreen,
        songList: state => state.Play.songList,
        currentIdx: state => state.Play.currentIdx,
        showSongList: state => state.Play.showSongList
      }),
      ...mapGetters(['currentSong'])
    },
    watch: {
      currentSong(song, oldSong) {
        //若当首正在播放 则不切歌 除非当期列表只有一首
        if (song.id != oldSong.id || this.songList.length == 1) {
          this._playSong(song.id)
        }
      },
      playing(play) {
        if (play) {
          this.audioEl.play()
        } else {
          this.audioEl.pause()
        }
      }
    },
    components: {
      PlayList,
      Slider,
      Lyric
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../assets/stylus/variable2.styl";
  @import "../../assets/stylus/mixin.styl";

  .normal-player
    position fixed
    top 0
    left 50%
    bottom 0
    width 100%
    max-width 500px
    background-color #222
    transform translate3d(-50%, 0, 0)
    z-index 999
    opacity 0
    pointer-events none
    transition opacity .5s
    &.show
      pointer-events all
      opacity 1
    &.enter .title-group
      animation-delay .3s
      animation-name title-enter
    &.leave .title-group
      animation-name title-leave
      animation-duration .2s
    .title-group
      position absolute
      top 0
      left 0
      z-index 2
      width 100%
      transform translate3d(0, -100%, 0)
      animation-fill-mode forwards
      animation-duration .1s
      .player-header
        position relative
        height 40px
        font-size 18px
        line-height 40px
        text-align center
        z-index 2
        color #fff
        .song-name
          margin 0 auto
          width 70%
          no-wrap()
        .icon-back
          padding 9px
          position absolute
          left 10px
          top 50%
          color $color-gray-d2
          font-size 22px
          transform translateY(-50%) rotate(-90deg)
      .singerName
        margin 4px auto 0
        width 60%
        font-size 14px
        text-align center
        color #fff
        z-index 2
        no-wrap()
        .text
          position relative
          &:after, &:before
            content ""
            position absolute
            top 50%
            width 20px
            border-top 1px solid $color-border
          &:after
            left 0
            transform translateX(-120%)
          &:before
            right 0
            transform translateX(120%)
    .middle
      position absolute
      top 58px
      bottom 148px
      width 100%
      z-index 2
      .slider-item
        position relative
        height 100%
      .currentLyricTxt
        position absolute
        left 50%
        bottom 40px
        margin-left -40%
        width 80%
        font-size $font-size-medium
        color #f4f4f4
        no-wrap()
      .player-cd
        padding-top 80%
        position absolute
        left 10%
        top 30px
        width 80%
        z-index 2
        border-radius 50%
        overflow hidden
        .cd-wrap
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          border-radius 50%
          border 10px solid hsla(0, 0%, 100%, .1)
          animation-duration 20s
          animation-timing-function linear
          animation-iteration-count infinite
          animation-name cd-rotate
          &.pause
            animation-play-state paused
    .player-bg
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      opacity .6
      filter blur(50px)
    &.enter .bottom
      animation-delay .3s
      animation-name bottom-enter
    &.leave .bottom
      animation-name bottom-leave
      animation-duration .2s
    .bottom
      position: absolute
      bottom: 50px
      width: 100%
      z-index 2
      transform translate3d(0, 150%, 0)
      animation-fill-mode forwards
      animation-duration .1s
      .progress-wrapper
        display: flex
        align-items: center
        width: 80%
        margin: 0px auto
        padding: 10px 0
        .progress-bar
          height 30px
          .bar-inner
            position relative
            top 13px
            height 2px
            background $color-gray
            .progress
              position absolute
              height 100%
              background $color-theme
            .progress-btn-wrapper
              position absolute
              left -8px
              top -13px
              width: 30px
              height 30px
              .progress-btn
                position relative
                top 7px
                left 7px
                box-sizing border-box
                width 16px
                height 16px
                border 3px solid $color-text
                border-radius 50%
                background $color-theme
        .time
          color $color-text
          font-size $font-size-small
          flex 0 0 30px
          line-height 30px
          width 30px
          &.time-l
            margin-right 4px
            text-align left
          &.time-r
            margin-left 4px
            text-align right
        .progress-bar-wrapper
          flex 1
      .operators
        display flex
        align-items: center
        .icon
          flex 1
          color $color-theme
          &.disable
            color: $color-theme-d
          i
            font-size 30px
            &.icon-not-favorite, &.icon-favorite, &.icon-sequence, &.icon-loop, &.icon-random
              font-size 26px
        .i-left
          text-align right
        .i-center
          padding 0 20px
          text-align center
          i
            font-size 48px
        .i-right
          text-align left
        .icon-not-favorite
          color $color-gray-d2
        .icon-favorite
          color $color-favorite

  .mini-player
    max-width 500px
    display flex
    align-items center
    position fixed
    left 50%
    bottom 0
    transform translateX(-50%)
    z-index 180
    width 100%
    height 60px
    background linear-gradient(top, #f9f9f9, #f3f3f3)
    border-top-1px($color-border-d)
    &.mini-enter-active, &.mini-leave-active
      transition all .4s
    &.mini-enter, &.mini-leave-to
      opacity 0
    .progress-circle
      position relative
      width 36px
      height 36px
      background-color $color-theme
      border-radius 50%
      .circle-item
        position absolute
        top 2px
        left 2px
        width 32px
        height: 32px
        border-radius 50%
        background-color #f9f9f9
        .play-icon
          position absolute
          top 11px
          left 12px
          z-index 3
          width 10px
          height 10px
          background url(play.png) no-repeat center / cover
          &.play
            width 12px
            height 12px
            top 10px
            left 10px
            background-image url(pause.png)
        .inner-circle
          position absolute
          top 2px
          left 2px
          width 28px
          height 28px
          border-radius 50%
          z-index 2
          background #f9f9f9
        .circle, .circle-fill
          position absolute
          top -1px
          left -1px
          width 34px
          height 34px
          border-radius 50%
          background-color $color-theme
          clip rect(0 17px 34px 0)
        .circle-fill
          z-index 2
        .circle-fill.gt50
          width 32px
          height 32px
          top 0
          left 0
          background-color $color-theme
          transform rotate(180deg)
          clip rect(0 16px 32px 0)
        .circle-fill.lt50
          width 32px
          height 32px
          top 0
          left 0
          background-color #f9f9f9
          clip rect(0 16px 32px 0)
    .icon
      flex 0 0 40px
      width 40px
      padding 0 10px 0 20px
      img
        border-radius 50%
        &.play
          animation cd-rotate 20s linear infinite
        &.pause
          animation-play-state: paused
    .text
      display flex
      flex-direction column
      justify-content center
      flex 1
      line-height 20px
      overflow hidden
      .name
        margin-bottom 2px
        no-wrap()
        font-size $font-size-medium
        color $color-font-d
      .desc
        no-wrap()
        font-size $font-size-small
        color $color-font-d
    .control
      flex 0 0 30px
      width 30px
      padding 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size 30px
        color $color-theme-d
      .icon-mini
        font-size 32px
        position absolute
        left 0
        top 0

  @keyframes cd-rotate {
    100% {
      transform rotateZ(360deg)
    }
  }

  @keyframes title-enter {
    0% {
      opacity 0
      transform translate3d(0, -100%, 0)
    }
    100% {
      opacity 1
      transform translate3d(0, 0, 0)
    }
  }

  @keyframes title-leave {
    0% {
      opacity 1
      transform translate3d(0, 0, 0)
    }
    100% {
      opacity 0
      transform translate3d(0, -100%, 0)
    }
  }

  @keyframes bottom-enter {
    0% {
      opacity 0
      transform translate3d(0, 150%, 0)
    }
    100% {
      opacity 1
      transform translate3d(0, 0, 0)
    }
  }

  @keyframes bottom-leave {
    0% {
      opacity 1
      transform translate3d(0, 0, 0)
    }
    100% {
      opacity 0
      transform translate3d(0, 150%, 0)
    }
  }
</style>
