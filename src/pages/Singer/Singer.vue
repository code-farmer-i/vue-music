<template>
    <div class="singer">
      <top-bar :title="singer.name"></top-bar>
      <div class="singer-photo" :style="{'background-image': `url(${singer.avatar})`}"></div>
      <div class="song-list" ref="scrollView">
        <scroll :data="songList" ref="scroll">
          <ul class="song-list-wrap">
            <li v-for="(song, index) in songList" class="song-wrap" @click="_playList(index)">
              <div v-html="song.name" class="song-name"></div>
              <div class="song-disc" v-html="`${song.singerName} - ${song.albumName}`"></div>
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
    import createSong from '../../util/createSong'
    import API from '../../util/ApiServer'

    export default{
      name: 'Singer',
      data(){
        return{
          singerName: '',
          singerPhoto: '',
          songList: [],
          MiniReresh: false,
          a: {}
        }
      },
      mixins: [refreshScroll],
      created(){
        const singerId = this.$route.params.singerId;
        if(!this.singer){
          this.$router.go(-1)
        }

        this.getSingerDetails(singerId);
      },
      methods:{
        async getSingerDetails(singerId){
          let singerDetails = await API.getSingerDetails(singerId)

          this.songList = Object.freeze(singerDetails.list.map(val => new createSong(val.musicData)))
        },
        _playList(currentIdx){
          this.playList({songList: this.songList, currentIdx})
        },
        ...mapActions(['playList'])
      },
      components:{
        TopBar,
        Loading,
        Scroll
      },
      computed:{
        ...mapState(['singer'])
      }
    }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../assets/stylus/variable2.styl";
  @import "../../assets/stylus/mixin.styl";

  .singer
    position fixed
    top 0
    left 50%
    bottom 0
    width 100%
    max-width 500px
    transform translateX(-50%)
    transform-style preserve-3d
    z-index 99
    background-color $color-bg-gray-m
    .singer-photo
      position relative
      height 40%
      background-repeat no-repeat
      background-size cover
      &::after
        content ""
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        background-color rgba(7,17,27,.4)
    .song-list
      position absolute
      top 40%
      bottom 0
      width  100%
      .song-list-wrap
        .song-wrap
          padding 10px 20px
          position relative
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



</style>
