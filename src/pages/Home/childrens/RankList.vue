<template>
    <div class="rank-list" ref="scrollView">
      <scroll class="singer-scroll" :data="rankList" ref="scroll">
        <ul>
          <li @click="selectRank(item.id)" class="item" v-for="item in rankList">
            <div class="icon">
              <img width="100" height="100" v-lazy="item.picUrl"/>
            </div>
            <ul class="songlist">
              <li class="song" v-for="(song,index) in item.songList">
                <span>{{index + 1}}</span>
                <span>{{song.songname}}-{{song.singername}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
      <loading v-show="!rankList.length"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapActions, mapMutations} from 'vuex'
    import Scroll from 'components/common/Scroll/Scroll'
    import Loading from 'components/common/Loading/Loading'
    import {refreshScroll} from '../../../Mixin/Mixin'
    import API from '../../../util/ApiServer'

    export default{
      data(){
        return{
          rankList: []
        }
      },
      created(){
        this.getRankList()
      },
      mixins:[refreshScroll],
      methods:{
        async getRankList(){
          const result = await API.getRankList()

          this.rankList = Object.freeze(result.topList)
        },
        selectRank(rankId){
          this.$router.push({name: 'Rank', params: {rankId: rankId}})
        }
      },
      components:{
        Scroll,
        Loading
      }
    }
</script>

<style lang="stylus" type="text/stylus">
    @import "../../../assets/stylus/variable";
    @import "../../../assets/stylus/mixin";

    .rank-list
      position fixed
      top 88px
      bottom 0
      width 100%
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)


</style>
