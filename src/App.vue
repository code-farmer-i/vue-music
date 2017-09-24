<template>
  <div>
    <div class="left-area" :style="{width: `${areaWidth}px`}"></div>
    <div id="app" @touchmove.prevent>
      <transition :name="transitionName">
        <keep-alive exclude="Singer">
          <router-view class="router-el"></router-view>
        </keep-alive>
      </transition>
    </div>
    <div class="right-area" :style="{width: `${areaWidth}px`}"></div>
  </div>
</template>

<script type="text/ecmascript-6">
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
      const routerWidth = document.querySelector('.router-el').clientWidth;

      this.areaWidth = (window.innerWidth - routerWidth) / 2
    })
  },
  watch:{
    '$route': function(to, from){
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'translate-right' : 'translate-left'
    }
  }

}
</script>

<style lang="stylus">
  .left-area, .right-area
    position fixed
    top 0
    bottom 0
    z-index 9999
    background-color #fff

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
