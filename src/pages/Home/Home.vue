<template>
  <div class="Home">
    <main-header></main-header>
    <nav-bar></nav-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MainHeader from 'components/MainHeader/MainHeader'
  import NavBar from 'components/NavBar/NavBar'

  export default{
    name: 'Home',
    components:{
      MainHeader,
      NavBar,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .Home
      position fixed
      top 0
      left 50%
      bottom 0
      width 100%
      max-width 500px
      background-color #222
      transform translateX( -50% )
      transform-style preserve-3d
</style>
