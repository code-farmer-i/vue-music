<template>
    <div>
      <div class="normal-player" :class="[fullScreen ? 'show enter' : 'leave']">
        <div class="title-group">
          <div class="player-header">
            <i class="icon-back" @click="showMini"></i>
            <div class="song-name" v-html="currentSong.name"></div>
          </div>
          <div class="singerName" v-html="currentSong.singerName"></div>
        </div>
        <div class="player-cd">
          <div class="cd-wrap" :class="[playing ? 'play' : 'pause']">
            <img :src="currentSong.discImg" width="100%" height="100%" style="-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;">
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{showCurrentTime}}</span>
            <div class="progress-bar-wrapper">
              <div class="progress-bar" @click="progressClick" ref="progress">
                <div class="bar-inner">
                  <div class="progress" :style="{width: `${getRatio * 100}%`}"></div>
                  <div class="progress-btn-wrapper" :style="{transform: `translate3d(${getRatio * progressWidth}px, 0px, 0px)`}">
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
              <i class="icon icon-not-favorite"></i>
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
          <div class="control" @click.stop="showPlaylist">
            <i class="icon-playlist"></i>
          </div>
        </div>
      </transition>

      <audio ref="audioEl"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'

    export default {
      data(){
        return{
          audioDuration: 0,
          audioCurrentTime: 0,
          prevCurrentTime: 0,
          progressWidth: 0,
          progressBtnWidth: 30
        }
      },
      mounted(){
        this.$nextTick(()=>{
          this.audioEl = this.$refs.audioEl;
          this.progressWidth = this.$refs.progress.clientWidth;

          this.audioEl.addEventListener('ended', ()=>{
            if(!this.audioEl.loop){
              this.changeSong('next')
            }
          })

          this.audioEl.onloadedmetadata = ()=>{
            this.audioDuration = Math.floor(this.audioEl.duration);
          }

          this.audioEl.ontimeupdate = () => {
            if(this.prevCurrentTime == Math.floor(this.audioEl.currentTime)) return

            this.audioCurrentTime = this.audioEl.currentTime;
            this.prevCurrentTime = Math.floor(this.audioEl.currentTime);
          }
        })
      },
      methods:{
        togglePlay(){
          this.playing ? this.pause() : this.play()
        },
        progressClick(e){
          const n = (e.offsetX - (this.progressBtnWidth / 4)) / this.progressWidth;

          this.audioEl.currentTime = n * this.audioDuration;
          this.audioCurrentTime = n * this.audioDuration;
        },
        _formatTime(seconds) {
          return [
            parseInt(seconds / 60 % 60),
            parseInt(seconds % 60)
          ]
            .join(":")
            .replace(/\b(\d)\b/g, "0$1");
        },
        _playSong(songId){
          this.audioEl.src = `http://ws.stream.qqmusic.qq.com/${songId}.m4a?fromtag=46`;
          this.audioEl.play();
        },
        ...mapMutations(['showMini', 'showFull', 'play', 'pause', 'changeSong', 'changeMode'])
      },
      computed:{
        getRatio(){
          return this.audioCurrentTime / this.audioDuration
        },
        getModeIcon(){
          let icon;

          if(this.getMode == 'normal'){
            icon = 'icon-sequence'
          }else if(this.getMode == 'loop'){
            icon = 'icon-loop'
          }else{
            icon = 'icon-random'
          }

          return icon;
        },
        showCurrentTime(){
          return this._formatTime(this.audioCurrentTime)
        },
        showDuration(){
          return this._formatTime(this.audioDuration)
        },
        ...mapState({
          playing: state => state.Play.playing,
          mode: state => state.Play.mode,
          fullScreen: state => state.Play.fullScreen,
          songList: state => state.Play.songList,
          currentIdx: state => state.Play.currentIdx,
        }),
        ...mapGetters(['currentSong', 'getMode'])
      },
      watch:{
        currentSong(song){
          this._playSong(song.id)
        },
        mode(){
          if(this.getMode == 'loop'){
            this.audioEl.loop = true;
          }else{
            this.audioEl.loop = false;
          }
        },
        playing(play){
          if(play){
            this.audioEl.play()
          }else{
            this.audioEl.pause()
          }
        }
      }
    }
</script>

<style lang="stylus" type="text/stylus">
    @import "../../assets/stylus/variable.styl";
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
            color $color-theme
            font-size 22px
            transform translateY(-50%) rotate(-90deg)
        .singerName
          font-size 14px
          text-align center
          color #fff
          z-index 2
      .player-cd
        position absolute
        left 10%
        top 70px
        width 80%
        z-index 2
        border 10px solid hsla(0,0%,100%,.1)
        border-radius 50%
        overflow  hidden
        .cd-wrap
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
        filter blur(20px)
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
              height 4px
              background rgba(0, 0, 0, 0.3)
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
          .i-left
            text-align right
          .i-center
            padding 0 20px
            text-align center
            i
              font-size 40px
          .i-right
            text-align left
          .icon-favorite
            color $color-sub-theme
    .mini-player
      display flex
      align-items center
      position fixed
      left 0
      bottom 0
      z-index 180
      width 100%
      height 60px
      background $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition all .4s
      &.mini-enter, &.mini-leave-to
        opacity 0
      .progress-circle
        position relative
        width 32px
        height 32px
        .circle-item
          position absolute
          top 0
          left 0
          width 32px
          height:32px
          border-radius 50%
          background-color rgba(255,205,49,.5)
          .play-icon
            position absolute
            top 11px
            left 12px
            z-index 3
            width 10px
            height 10px
            background url(./play-icon.png) no-repeat center/cover
            opacity .5
            &.play
              width 12px
              height 12px
              top 10px
              left 10px
              background-image url(./pause.png)
          .inner-circle
            position absolute
            top 3px
            left 3px
            width 26px
            height:26px
            border-radius 50%
            z-index 2
            background-color #333
          .circle, .circle-fill
            position absolute
            top 0
            left 0
            width 32px
            height 32px
            border-radius 50%
            background-color rgb(255,205,49)
            clip rect(0 16px 32px 0)
          .circle-fill
            z-index 2
          .circle-fill.gt50
            background-color rgb(255,205,49)
            transform rotate(180deg)
          .circle-fill.lt50
            background-color rgb(153,128,50)
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
          color $color-text
        .desc
          no-wrap()
          font-size $font-size-small
          color $color-text-d
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


    @keyframes cd-rotate{
      100%{
        transform rotateZ(360deg)
      }
    }
    @keyframes title-enter{
      0%{
        opacity 0
        transform translate3d(0, -100%, 0)
      }
      100%{
        opacity 1
        transform translate3d(0, 0, 0)
      }
    }
    @keyframes title-leave{
      0%{
        opacity 1
        transform translate3d(0, 0, 0)
      }
      100%{
        opacity 0
        transform translate3d(0, -100%, 0)
      }
    }
    @keyframes bottom-enter{
      0%{
        opacity 0
        transform translate3d(0, 150%, 0)
      }
      100%{
        opacity 1
        transform translate3d(0, 0, 0)
      }
    }
    @keyframes bottom-leave{
      0%{
        opacity 1
        transform translate3d(0, 0, 0)
      }
      100%{
        opacity 0
        transform translate3d(0, 150%, 0)
      }
    }
</style>
