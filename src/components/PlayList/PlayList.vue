<template>
    <transition
      name="play-list"
      @before-enter="initHeight"
      @after-enter="refreshScroll"
    >
      <div class="play-list" @click="hidePlayList">
        <div class="play-list-wrap" @click.stop>
          <div class="list-head">
            <i class="icon mode-icon" :class="[getModeIcon]" @click="changeMode"></i>
            <div class="mode-type">{{getModeCN}}</div>
          </div>
          <div class="list-content" ref="scrollView">
            <scroll ref="scroll">
              <div>
                <transition-group name="list-item" tag="div" @after-leave="recalculate">
                  <div v-for="(song, index) in songList" class="item" :key="song.id">
                    <i class="icon playing" :class="{'icon-play': index == currentIdx}"></i>
                    <div class="song-info" v-html="`${song.name} ${song.singerName}`" @click="setCurrentIdx(index)"></div>
                    <i class="icon" :class="isFavorite(song.id) ? 'icon-favorite' : 'icon-not-favorite'" @click="toggleFavorite(song)"></i>
                    <i class="icon icon-delete" @click="removeSongItem(index)"></i>
                  </div>
                </transition-group>
              </div>
            </scroll>
          </div>
        </div>
      </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
    import Scroll from '../common/Scroll/Scroll'
    import {favoriteMixin, ModeMixin} from '../../Mixin/Mixin'

    export default {
      mixins:[favoriteMixin, ModeMixin],
      computed:{
        ...mapState({
          songList: state => state.Play.songList,
          currentIdx: state => state.Play.currentIdx
        })
      },
      methods:{
        removeSongItem(idx){
          this.removeSong(idx);
        },
        initHeight(){
          this.$refs.scroll.$refs.wrapper.style.height = 'auto'
        },
        recalculate(){
          this.$refs.scroll.recalculate()
        },
        refreshScroll(){
          let scrollComponent = this.$refs.scroll;

          scrollComponent.$refs.wrapper.style.height = this.$refs.scrollView.clientHeight + 'px'

          scrollComponent.refresh()
        },
        ...mapMutations(['hidePlayList', 'setCurrentIdx', 'removeSong'])
      },
      components:{
        Scroll
      }
    }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../assets/stylus/variable.styl"
  @import "../../assets/stylus/mixin.styl"

  .play-list
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    overflow hidden
    background-color rgba(0,0,0,.3)
    z-index 1000
    .play-list-wrap
      padding-bottom 20px
      position absolute
      bottom 0
      left 0
      width 100%
      background-color $color-highlight-background
      color $color-text-l
      font-size 14px
      .list-head
        display flex
        align-items center
        padding 20px 30px 10px 20px
        .mode-icon
          margin-right 10px
          font-size 30px
          color $color-theme-d
        .mode-type
          flex 1
      .list-content
        max-height 240px
        overflow hidden
        .item
          display flex
          height 40px
          align-items center
          padding 0 30px 0 20px
          overflow hidden
          .icon
            font-size 12px
          .playing
            width 20px
            color $color-theme-d
          .song-info
            flex 1
            color $color-text-d
            no-wrap()
          .icon-not-favorite, .icon-favorite, .icon-delete
            position relative
            color $color-theme
            padding 4px
          .icon-not-favorite, .icon-favorite
            margin-right 10px
  .play-list-enter-active.play-list{
    animation: list-active .3s forwards
  }

  .play-list-enter-active .play-list-wrap{
    animation: wrap-active .3s forwards
  }

  .play-list-leave-active.play-list{
    animation: list-active .3s forwards reverse
  }

  .play-list-leave-active .play-list-wrap{
    animation: wrap-active .3s forwards reverse
  }

  @keyframes list-active{
    0%{
      background-color transparent
    }
    100%{
      background-color rgba(0, 0, 0, .3)
    }
  }

  @keyframes wrap-active{
    0%{
      transform translateY(100%)
    }
    100%{
      transform translateY(0)
    }
  }

  .list-item-leave-active{
    transition .1s
  }

  .list-item-leave-to{
    height 0px!important
  }
</style>
