<template>
    <div class="top-bar">
      <i class="icon-back" @click="$router.go(-1)"></i>
      <div class="top-title">{{title}}</div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
      props: {
        title: {
          type: String,
          default: ''
        }
      }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import "../../assets/stylus/mixin.styl";
  @import "../../assets/stylus/variable2.styl";

  .top-bar
    position absolute
    top 0
    z-index 99
    width 100%
    height 40px
    line-height 40px
    text-align center
    white-space nowrap
    font-size 18px
    color #fff
    .top-title
      margin 0 auto
      width 70%
      no-wrap()
    .icon-back
      position absolute
      left 10px
      top 50%
      font-size 22px
      color $color-gray-d2
      transform translateY(-50%)
      extend-click-after()
</style>
