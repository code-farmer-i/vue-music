<template>
  <div class="rank-details">
    <top-bar :title="rankInfo.ListName"></top-bar>
    <div class="rank-photo" :style="{'background-image': `url(${rankInfo.pic_album})`}"></div>
    <div class="song-list" ref="scrollView">
      <scroll :data="songList" ref="scroll">
        <ul class="song-list-wrap">
          <li v-for="(item, index) in songList" class="song-wrap" @click="_playList(index)">
            <div v-text="item.data.songname" class="song-name"></div>
            <div class="song-disc">{{item.data.singer[0].name}} {{item.data.albumname}}</div>
          </li>
        </ul>
      </scroll>
      <loading v-if="!songList.length"></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopBar from 'components/TopBar/TopBar'
  import {mapState, mapActions} from 'vuex'
  import Loading from 'components/common/Loading/Loading'
  import Scroll from 'components/common/Scroll/Scroll'
  import {refreshScroll} from '../../Mixin/Mixin'
  import rank from "../../util/api/rank";

  export default{
    name: 'Rank-Details',
    data(){
      return{
        singerName: '',
        singerPhoto: '',
        songList: [],
        rankInfo: {},
        MiniReresh: false
      }
    },
    mixins: [refreshScroll],
    created(){
      const rankId = this.$route.params.rankId;
      if(!rankId){
        this.$router.go(-1);
      }

      this.getRankDetails(rankId);
    },
    methods:{
      async getRankDetails(rankId){
        const rankDetails = await this.$store.dispatch('getRankListDetails', rankId)

        this.songList = Object.freeze(rankDetails.songlist)
        this.rankInfo = rankDetails.topinfo;
      },
      _playList(currentIdx){
        const songList = this.songList.map((val)=>{
          return {
            songId: val.data.songid,
            songName: val.data.songname,
            singerName: val.data.singer[0].name,
            discImg: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${val.data.albummid}.jpg?max_age=2592000`
          }
        })

        this.playList({songList: Object.freeze(songList), currentIdx})
      },
      ...mapActions(['playList'])
    },
    components:{
      TopBar,
      Loading,
      Scroll
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .rank-details
    position fixed
    top 0
    left 50%
    bottom 0
    width 100%
    max-width 500px
    background-color #222
    transform translateX(-50%)
    transform-style preserve-3d
    z-index 99
    .rank-photo
      position relative
      height 40%
      background-repeat no-repeat
      background-size cover
    .song-list
      position absolute
      top 40%
      bottom 0
      width  100%
      .song-list-wrap
        padding 20px 30px
        .song-wrap
          padding 10px 0
          font-size 14px
          line-height 20px
          .song-name
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
            color #fff
          .song-disc
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
            margin-top 4px
            color hsla(0,0%,100%,.3)



</style>
