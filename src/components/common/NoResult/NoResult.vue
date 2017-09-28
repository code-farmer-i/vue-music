<template>
    <div class="no-result">{{msg}}</div>
</template>

<script type="text/ecmascript-6">
    export default {
      props:{
        msg:{
          type: String,
          default: '暂无结果'
        }
      }
    }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/variable2.styl"
  
  .no-result
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    color $color-font-gray
</style>
