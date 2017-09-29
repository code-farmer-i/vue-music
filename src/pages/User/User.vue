<template>
    <div class="User">
      <div class="top-bar">
        <i class="icon-back" @click="$router.go(-1)"></i>
        <div class="tab">
          <div class="item" :class="{'active': toggleTab}" @click="toggleTab = true">我喜欢的</div>
          <div class="item" :class="{'active': !toggleTab}" @click="toggleTab = false">最近听的</div>
        </div>
      </div>
      <div class="list-wrap">
        <list-view :data="toggleTab ? favoriteList : latelyList" @itemClick="addSongToList"></list-view>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState, mapActions} from 'vuex'
    import ListView from 'components/common/ListView/ListView'

    export default {
      data(){
        return {
          toggleTab: true
        }
      },
      computed:{
        ...mapState({
          favoriteList: state => state.FavoriteSong.favoriteList,
          latelyList: state => state.LatelySong.latelyList
        })
      },
      methods:{
        ...mapActions(['addSongToList'])
      },
      components:{
        ListView
      }
    }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../assets/stylus/mixin.styl";
  @import "../../assets/stylus/variable2.styl";

  .User
    position fixed
    top 0
    left 50%
    bottom 0
    width 100%
    max-width 500px
    background-color $color-bg
    transform translateX( -50% )
    transform-style preserve-3d
    z-index 2
    .top-bar
      padding 8px 0
      position relative
      text-align center
      white-space nowrap
      font-size 18px
      color $color-theme
      background-color $color-theme
      .tab
        display flex
        align-items center
        margin 0 auto
        width 160px
        border 1px solid $color-bg
        box-sizing border-box
        border-radius 4px
        overflow hidden
        .item
          display block
          width 50%
          height 30px
          line-height 30px
          color $color-font
          text-align center
          font-size 14px
          background-color $color-theme
          &.active
            background-color $color-bg
            color $color-theme
      .icon-back
        position absolute
        left 10px
        top 50%
        font-size 22px
        color $color-font
        transform translateY(-50%)
        extend-click-after()
    .list-wrap
      position absolute
      top 48px
      bottom 0
      width 100%
</style>
