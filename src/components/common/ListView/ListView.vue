<template>
  <div class="list-view" ref="scrollView">
    <scroll ref="scroll">
      <div>
        <div v-for="item in data" class="item" @click="itemClick(item)">
          <div>
            <h2>{{item.name}}</h2>
            <p>{{item.singerName}} {{item.albumName}}</p>
          </div>
        </div>
      </div>
    </scroll>
    <div class="no-result" v-show="!data.length">暂无歌曲</div>
  </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from '../../../components/common/Scroll/Scroll'
    import {refreshScroll} from '../../../Mixin/Mixin'

    export default {
      mixins: [refreshScroll],
      props: {
        data: {
          type: Array,
          default: null
        }
      },
      methods:{
        itemClick(item){
          this.$emit('itemClick', item);
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
        Scroll
      }
    }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/variable.styl"

  .list-view
    padding 20px 30px
    position absolute
    top 56px
    bottom 0
    width 100%
    box-sizing border-box
    overflow hidden
    font-size 14px
    .item
      display flex
      align-items center
      height 64px
      line-height 20px
      p
        margin-top 4px
        color $color-text-d
</style>
