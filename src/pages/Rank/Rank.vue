<template>
  <div class="rank-details">
    <top-bar :title="rankInfo.ListName"></top-bar>
    <div class="rank-photo" :style="{'background-image': `url(${rankInfo.pic_album})`}"></div>
    <div class="song-list" ref="scrollView">
      <scroll :data="songList" ref="scroll">
        <ul class="song-list-wrap">
          <li v-for="(item, index) in songList" class="song-wrap" @click="_playList(index)">
            <div class="rank-index">
              <span v-if="index <= 2" class="icon" :class="[`icon${index}`]"></span>
              <span v-if="index > 2" class="text">{{index + 1}}</span>
            </div>
            <div class="content">
              <div v-text="item.data.songname" class="song-name"></div>
              <div class="song-disc">{{item.data.singer[0].name}} {{item.data.albumname}}</div>
            </div>
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
  import {createSong} from '../../util/createSong'
  import API from '../../util/ApiServer'

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
        const rankDetails = await API.getRankListDetails(rankId)

        this.songList = Object.freeze(rankDetails.songlist)
        this.rankInfo = Object.freeze(rankDetails.topinfo);
      },
      _playList(currentIdx){
        const songList = this.songList.map((val)=>{
          return new createSong(val.data)
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
  @import "../../assets/stylus/variable2.styl";
  @import "../../assets/stylus/mixin.styl";

  .rank-details
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
        .song-wrap
          padding 10px 20px
          position relative
          display flex
          align-items center
          font-size 14px
          line-height 20px
          border-bottom-1px($color-border-d)
          &:last-child::after
            border 0
          .song-name
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
            color $color-font-d
          .song-disc
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
            margin-top 4px
            color $color-font-gray
        .rank-index
          margin-right 30px
          font-size 18px
          .icon
            display inline-block
            width 25px
            height 24px
            background-size 25px 24px
          .text
            display inline-block
            width 25px
            text-align center
            color $color-font-gray
          .icon0
            bg-image('first')
          .icon1
            bg-image('second')
          .icon2
            bg-image('third')
        .content
          no-wrap()




</style>
