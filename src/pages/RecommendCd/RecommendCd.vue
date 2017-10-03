<template>
    <div class="recommend-cd">
      <top-bar :title="recommend_cd.name"></top-bar>
      <div class="cd-photo" :style="{'background-image': `url(${recommend_cd.bg})`}"></div>
      <div class="list-wrap">
        <list-view :data="songList" @itemClick="addSongToList" v-show="songList.length"></list-view>
        <loading title="''" v-show="!songList.length"></loading>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState, mapActions} from 'vuex'
    import TopBar from 'components/TopBar/TopBar'
    import Loading from 'components/common/Loading/Loading'
    import Scroll from 'components/common/Scroll/Scroll'
    import ListView from 'components/common/ListView/ListView'
    import API from '../../util/ApiServer'
    import {createSong} from '../../util/createSong'

    export default {
      name: 'RecommendCd',
      data(){
        return {
          songList: []
        }
      },
      created(){
        const disstid = this.$route.params.disstid;
        if(!this.recommend_cd){
          this.$router.go(-1)
        }

        this.getCdInfo(disstid);
      },
      methods:{
        async getCdInfo(disstid){
          let result = await API.getCdInfo(disstid);
          result = result.replace('playlistinfoCallback(', ' ')
          result = JSON.parse(result.substr(0, result.length - 1))

          let songList = result.cdlist[0].songlist;
          songList = songList.map((song)=>{
            return new createSong(song)
          })

          this.songList = Object.freeze(songList)
        },
        ...mapActions(['addSongToList'])
      },
      computed:{
        ...mapState(['recommend_cd'])
      },
      components:{
        TopBar,
        Loading,
        Scroll,
        ListView
      },
    }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../assets/stylus/variable2.styl"

  .recommend-cd
    position fixed
    top 0
    left 50%
    bottom 0
    width 100%
    max-width 500px
    background-color $color-bg-gray-m
    transform translateX(-50%)
    transform-style preserve-3d
    z-index 99
    .cd-photo
      position relative
      height 40%
      background-repeat no-repeat
      background-size cover
    .list-wrap
      position absolute
      top 40%
      bottom 0
      width 100%
</style>
