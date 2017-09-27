<template>
    <div class="User">
      <div class="top-bar">
        <i class="icon-back" @click="$router.go(-1)"></i>
        <div class="tab">
          <div class="item" :class="{'active': toggleTab}" @click="toggleTab = !toggleTab">我喜欢的</div>
          <div class="item" :class="{'active': !toggleTab}" @click="toggleTab = !toggleTab">最近听的</div>
        </div>
      </div>
      <list-view :data="toggleTab ? favoriteList : latelyList" @itemClick="addSongToList"></list-view>
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
  @import "../../assets/stylus/variable.styl";

  .User
    position fixed
    top 0
    left 50%
    bottom 0
    width 100%
    max-width 500px
    background-color #222
    transform translateX( -50% )
    transform-style preserve-3d
    z-index 2
    .top-bar
      padding 10px 0
      position relative
      text-align center
      white-space nowrap
      font-size 18px
      color #fff
      .tab
        display flex
        align-items center
        margin 0 auto
        width 240px
        border 1px solid #333
        box-sizing border-box
        border-radiu 5px
        overflow hidden
        .item
          display block
          width 50%
          height 34px
          line-height 34px
          color #fff
          text-align center
          font-size 14px
          &.active
            background-color $color-highlight-background
      .icon-back
        position absolute
        left 10px
        top 50%
        font-size 22px
        color #ffcd32
        transform translateY(-50%)
        extend-click-after()
</style>
