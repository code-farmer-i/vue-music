<template>
  <div class="list-view" ref="scrollView">
    <scroll ref="scroll">
      <div>
        <div v-for="item in data" class="item" @click="$emit('itemClick', item)">
          <div class="item-wrap">
            <h2>{{item.name}}</h2>
            <p>{{item.singerName}} - {{item.albumName}}</p>
          </div>
        </div>
      </div>
    </scroll>
    <no-result msg="暂无歌曲" v-show="!data.length"></no-result>
  </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from '../../../components/common/Scroll/Scroll'
    import NoResult from '../../../components/common/NoResult/NoResult'
    import {refreshScroll} from '../../../Mixin/Mixin'

    export default {
      mixins: [refreshScroll],
      props: {
        data: {
          type: Array,
          default: null
        }
      },
      watch:{
        data(){
          this.$nextTick(()=>{
            this.$refs.scroll.refresh();
          })
        }
      },
      components:{
        Scroll,
        NoResult
      }
    }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/variable2.styl"
  @import "../../../assets/stylus/mixin.styl"

  .list-view
    position absolute
    top 0
    bottom 0
    width 100%
    box-sizing border-box
    overflow hidden
    font-size 14px
    .item
      position relative
      padding 0 30px
      display flex
      align-items center
      height 64px
      line-height 20px
      color $color-font-d
      border-bottom-1px($color-border)
      .item-wrap
        width 100%
      p
        margin-top 4px
        color $color-font-gray
        no-wrap()
</style>
