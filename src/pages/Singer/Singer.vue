<template>
    <div class="singer">
      <top-bar :title="singer.name"></top-bar>
      <div class="singer-photo" :style="{'background-image': `url(${singer.avatar})`}"></div>
      <div class="song-list" ref="scrollView">
        <scroll :data="songList" ref="scroll">
          <ul class="song-list-wrap">
            <li v-for="(item, index) in songList" class="song-wrap" @click="_playList(index)">
              <div v-text="item.musicData.songname" class="song-name"></div>
              <div class="song-disc">{{singer.name}} {{item.musicData.albumname}}</div>
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

    export default{
      name: 'Singer',
      data(){
        return{
          singerName: '',
          singerPhoto: '',
          songList: [],
          MiniReresh: false
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
          const singerDetails = await this.$store.dispatch('getSingerDetails', singerId)

          this.songList = Object.freeze(singerDetails.list)
        },
        _playList(currentIdx){
          const songList = this.songList.map((val)=>{
            return {
              songId: val.musicData.songid,
              songName: val.musicData.songname,
              singerName: val.musicData.singer[0].name,
              discImg: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${val.musicData.albummid}.jpg?max_age=2592000`
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
      },
      computed:{
        ...mapState(['singer'])
      }
    }
</script>

<style lang="stylus" type="text/stylus">
  .singer
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
