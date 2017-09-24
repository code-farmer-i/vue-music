<template>
  <div class="Home">
    <main-header></main-header>
    <top-bar></top-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MainHeader from 'components/MainHeader/MainHeader'
  import TopBar from 'components/TopBar/TopBar'
  import Recommend from 'pages/Home/childrens/Recommend'
  import Singer from 'pages/Home/childrens/Singer'
  import Rank from 'pages/Home/childrens/Rank'
  import Search from 'pages/Home/childrens/Search'

  export default{
    components:{
      MainHeader,
      TopBar,
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
</style>
