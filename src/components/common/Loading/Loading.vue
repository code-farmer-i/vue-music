<template>
  <div class="loading">
    <img src="./loading.gif" width="10%">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../assets/stylus/variable.styl";

  .loading
    position absolute
    top 50%
    left 50%
    width 100%
    text-align center
    transform translate(-50%, -50%)
    .desc
      line-height 20px
      font-size $font-size-small
      color $color-text-l
</style>
