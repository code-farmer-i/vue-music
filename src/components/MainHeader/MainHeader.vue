<template>
  <div class="m-header">
    <img src="./logo.png" class="logo"/>
    <h1 class="text">Vue Music</h1>
    <router-link tag="div" class="mine" :to="{name: 'User'}">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../assets/stylus/variable2.styl";
  @import "../../assets/stylus/mixin.styl";

  .m-header
    position relative
    height 44px
    text-align center
    color $color-font
    font-size 0
    background-color $color-theme
    .logo
      margin-top 4px
      margin-right 4px
      display inline-block
      width 30px
      vertical-align middle
    .text
      display inline-block
      vertical-align middle
      line-height 44px
      font-size $font-size-large
    .mine
      position absolute
      top 0
      right 0
    .icon-mine
      display block
      padding 12px
      font-size 20px
      color $color-font
</style>
