<template>
  <div>
    <div id="app" @touchmove.prevent>
      <transition :name="transitionName">
        <keep-alive :exclude="['Singer', 'Rank-Details']">
          <router-view class="router-el"></router-view>
        </keep-alive>
      </transition>
      <play></play>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Play from 'components/Play/Play'
  import {mapState} from 'vuex'

  export default {
    name: 'app',
    data(){
      return {
        transitionName: '',
        areaWidth: 0
      }
    },
    watch:{
      '$route': function(to, from){
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'translate-right' : 'translate-left'
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

<style lang="stylus" type="text/stylus">
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
