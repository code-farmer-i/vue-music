<template>
  <div>
    <div class="left-area" ref="leftArea"></div>
    <div id="app" @touchmove.prevent>
      <transition :name="transitionName">
        <keep-alive :exclude="['Singer', 'Rank-Details', 'RecommendCd']">
          <router-view class="router-el"></router-view>
        </keep-alive>
      </transition>
      <play></play>
    </div>
    <div class="right-area" ref="rightArea"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Play from 'components/Play/Play'
  import {mapState} from 'vuex'

  const APP_MAX_WIDTH = 500;

  export default {
    name: 'app',
    data(){
      return {
        transitionName: '',
        areaWidth: 0
      }
    },
    mounted(){
      this.$nextTick(()=>{
        const areaWidth = window.innerWidth > 500 ? (window.innerWidth - 500) / 2 : 0

        this.$refs.leftArea.style.width = `${areaWidth}px`
        this.$refs.rightArea.style.width = `${areaWidth}px`
      })
    },
    watch:{
      '$route': function(to, from){
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'translate-right' : 'translate-left';
      }
    },
    computed:{
      ...mapState({
        currentIdx: state => state.Play.currentIdx
      })
    },
    components:{
      Play
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  .left-area, .right-area
    position fixed
    top 0
    bottom 0
    background-color #fff
    z-index 999
  .left-area
    left 0
  .right-area
    right 0

  .translate-left-enter-active, .translate-left-leave-active, .translate-right-enter-active, .translate-right-leave-active
    transition .4s

  .translate-left-enter
    transform translateX(50%)!important

  .translate-left-leave-to
    transform translateX(-70%)!important

  .translate-right-enter
    transform translateX(-70%)!important

  .translate-right-leave-to
    transform translateX(50%)!important


</style>
