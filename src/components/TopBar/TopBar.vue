<template>
    <div class="top-bar">
      <i class="icon-back" @click="$router.go(-1)"></i>
      {{title}}
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

<style lang="stylus" type="text/stylus">
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
    .icon-back
      position absolute
      left 10px
      top 50%
      font-size 22px
      color #ffcd32
      transform translateY(-50%)
</style>
