<template>
  <div class="recommend" ref="scrollView">
    <scroll ref="scroll" class="recommend-content" :data="bannerList">
      <div>
        <div class="slider-wrapper">
          <slider v-if="bannerList.length">
            <div v-for="item in bannerList" class="slider-item">
              <a :href="item.linkUrl">
                <img class="needsclick" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <flex-list title="歌单推荐" ref="recomPlaylist" imgName="cover" msgName="title" @complete="refreshScroll" @itemClick="toRecommendCd" v-show="recommends"></flex-list>
        <flex-list title="新歌首发" ref="newSongList" imgName="discImg" msgName="title" @complete="refreshScroll" @itemClick="addSongToList" v-show="recommends"></flex-list>
      </div>
      <loading v-show="!recommends"></loading>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'components/common/Loading/Loading'
  import Slider from 'components/common/Slider/Slider'
  import Scroll from 'components/common/Scroll/Scroll'
  import API from '../../../util/ApiServer'
  import FlexList from 'components/FlexList/FlexList'
  import {refreshScroll} from '../../../Mixin/Mixin'
  import {createSong2} from '../../../util/createSong'
  import {mapActions, mapMutations} from 'vuex'


  export default {
    data() {
      return {
        bannerList: [],
        recommends: false
      }
    },
    mixins: [refreshScroll],
    created() {
      this.getRecommend();
      this.getRecommendList();
    },
    methods: {
      async getRecommend(){
        const result = await API.getRecommend()

        this.bannerList = Object.freeze(result.slider);
      },
      async getRecommendList(){
        const result = await API.getRecommendList()
        let newSongList = result.new_song.data.song_list;

        newSongList = newSongList.map((song)=>{
            return new createSong2(song)
        })


        let rec = result.recomPlaylist.data.v_hot;
        rec = rec.sort((a, b)=>{
          return b.listen_num - a.listen_num
        })

        this.$refs.recomPlaylist.formatData(rec);
        this.$refs.newSongList.formatData(newSongList);
        this.recommends = true;
      },
      toRecommendCd(cd){
        this.setRecommendCd({
          name: cd.title,
          bg: cd.cover
        })

        this.$router.push({name: 'RecommendCd', params: {disstid: cd.content_id}})
      },
      refreshScroll(){
        this.$refs.scroll.refresh()
      },
      ...mapMutations(['setRecommendCd']),
      ...mapActions(['addSongToList'])
    },
    components: {
      Loading,
      Slider,
      Scroll,
      FlexList
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/variable2.styl";

  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0
    background-color $color-gray-l
  .recommend-content
    height 100%
    overflow hidden
  .slider-wrapper
    padding-top 40%
    position relative
    width 100%
    overflow hidden
    .needsclick
      display block
      width 100%
  .recommend-list
    .list-title
      height 65px
      line-height 65px
      text-align center
      font-size $font-size-medium-x
      color $color-font-d
    .item
      display flex
      box-sizing border-box
       align-items center
       padding 0 20px 20px 20px
    .icon
      flex 0 0 60px
      width 60px
      padding-right 20px
    .text
      display flex
      flex-direction column
      justify-content center
      flex 1
      line-height 20px
      overflow hidden
      font-size $font-size-medium
    .name
      margin-bottom 10px
      color $color-text
    .desc
      color $color-text-d
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
