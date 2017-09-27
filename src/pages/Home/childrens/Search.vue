<template>
  <div>
    <div class="search-box-wrapper">
      <div class="search-box">
        <i class="icon-search"></i>
        <input ref="query" class="box" placeholder="搜索歌曲、歌手" v-model="queryStr" v-on:input="setQuery('input')"/>
        <i v-show="queryStr" class="icon-dismiss" @click="clear"></i>
      </div>
    </div>
    <div class="quickSearch" v-show="!queryStr.length" ref="scrollView2">
      <scroll :data="searchHistory" ref="scroll2">
        <div>
          <div class="hot-key">
            <div class="title">热门搜索</div>
            <div class="hot-key-wrap">
              <div class="item" v-for="item in hotKey" @click="setQuery('hotkey', item.k)">{{item.k}}</div>
            </div>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="clearQuery">
            <i class="icon-clear"></i>
          </span>
            </h1>
            <div v-for="(key, index) in searchHistory" class="search-item">
              <div class="search-key" @click="setQuery('history', key)">{{key}}</div>
              <i class="icon-delete" @click="deleteQuery(index)"></i>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-scroll" v-show="queryStr.length" ref="scrollView">
      <scroll ref="scroll" :data="songList">
        <div class="search-result">
          <div v-show="!!singer.singername" class="item" @click="selectSinger(singer)">
            <span class="icon icon-mine"></span>
            <div class="serach-info">{{singer.singername}}</div>
          </div>
          <div v-for="(song, index) in songList" class="item" :key="song.songmid" @click="selectSong(song)">
            <span class="icon icon-music"></span>
            <div class="serach-info" v-html="`${song.songname} ${song.singer[0].name}`"></div>
          </div>
        </div>
      </scroll>
      <!--<loading v-show="searching" :title="''"></loading>-->
      <div class="no-result" v-show="noResult">暂无搜索结果</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'components/common/Scroll/Scroll'
    import Loading from 'components/common/Loading/Loading'
    import {mapActions, mapMutations} from 'vuex'
    import {refreshScroll} from '../../../Mixin/Mixin'
    import createSinger from '../../../util/createSinger'
    import createSong from '../../../util/createSong'
    import searchHistory from '../../../util/searchHistory'
    import API from '../../../util/ApiServer'

    export default{
      created(){
        this.getHotKey()
      },
      mixins:[refreshScroll],
      data(){
        return {
          queryStr: '',
          hotKey: [],
          singer:{},
          songList:[],
          totalNum: 0,
          pageNum: 1,
          searchHistory: Object.freeze(JSON.parse(localStorage.getItem('queryHistory'))),
          noResult: false,
          searching: false,
        }
      },
      methods:{
        async getHotKey(){
          const result = await API.getHotKey();

          this.hotKey = result.hotkey.slice(0, 9);
        },
        async getSearch(){
          this.searching = !this.songList.length ? true : false

          const result = await API.getSerch(this.queryData)

          this.searching = false;
          this.noResult = result.zhida.type == 0 && result.song.totalnum == 0;
          this.singer = result.zhida.type == 2 ? Object.freeze(result.zhida) : {};
          this.songList = Object.freeze(result.song.list);
        },
        setQuery(type, k){
          //若是点击热搜则直接搜索，如果是用户输入则进行延迟搜索
          if(type == 'input'){
            this.querySetTimeout()
          }else{
            this.queryStr = k;
            this.getSearch()
          }
        },
        querySetTimeout(){
          this.timmer && clearTimeout(this.timmer)

          if(this.queryStr == '') return

          this.timmer = setTimeout(()=>{
            this.getSearch()
          }, 300)
        },
        selectSong(song){
          const songObj = new createSong(song)

          this.addHistory()
          this.addSongToList(Object.freeze(songObj))
        },
        selectSinger(singer){
          const singerObj = new createSinger(singer.singermid, singer.singername);

          this.addHistory()
          this.setSinger(singerObj)

          this.$router.push({name: 'Singer', params:{singerId: singerObj.id}})
        },
        addHistory(){
          const s = [...this.searchHistory];

          s.unshift(this.queryStr);

          this.searchHistory = Object.freeze([...new Set(s)]);
        },
        deleteQuery(idx){
          const s = [...this.searchHistory];

          Array.prototype.splice.call(s, idx, 1);

          this.searchHistory = Object.freeze(s);
        },
        clearQuery(){
          this.searchHistory = [];
        },
        clear(){
          this.queryStr = ''
        },
        refreshScrollView(){
          if(this.MiniShow){
            this.$refs.scrollView.style.bottom = '60px'
            this.$refs.scrollView2.style.bottom = '60px'

            this.$nextTick(()=>{
              this.$refs.scroll.refresh()
              this.$refs.scroll2.refresh()
            })
          }
        },
        ...mapActions(['playList', 'addSongToList']),
        ...mapMutations(['setSinger'])
      },
      computed:{
        queryData(){
          return {'query': this.queryStr, 'page': this.pageNum, 'zhida': 1}
        },
        hasNextPage(){
          return this.totalNum > pageNum * 20
        }
      },
      watch:{
        searchHistory(newVal){
          localStorage.setItem('queryHistory', JSON.stringify(newVal))
        },
        queryStr(newVal){
          if(newVal == ''){
            this.$nextTick(()=>{
              this.$refs.scroll2.refresh()
            })
          }
        }
      },
      components:{
        Scroll,
        Loading
      }
    }
</script>

<style lang="stylus" type="text/stylus">

  @import "../../../assets/stylus/variable.styl";
  @import "../../../assets/stylus/mixin.styl";

  .search-box-wrapper
    margin: 20px
    .search-box
      display: flex
      align-items: center
      box-sizing: border-box
      width: 100%
      padding: 0 6px
      height: 40px
      background: $color-highlight-background
      border-radius: 6px
      .icon-search
        font-size: 24px
        color: $color-background
      .box
        flex: 1
        margin: 0 5px
        line-height: 18px
        background: $color-highlight-background
        color: $color-text
        font-size: $font-size-medium
        outline 0
        &::placeholder
          color: $color-text-d
      .icon-dismiss
        position relative
        font-size: 16px
        color: $color-background
        extend-click-after()
  .quickSearch
    position fixed
    top 170px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .hot-key
      margin 0 20px 20px
      .title
        margin-bottom: 20px;
        font-size: 14px;
        color $color-text-l
      .item
        display inline-block
        padding 5px 10px
        margin 0 20px 10px 0
        border-radius: 6px
        background #333
        font-size 14px
        color $color-text-l
  .search-scroll
    position fixed
    top 170px
    left 0
    bottom 0
    width 100%
    overflow hidden
  .no-result
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    color $color-text-l
  .search-result
    width 100%
    padding 0 30px
    box-sizing border-box
    font-size 14px
    color $color-text-d
    .item
      padding-bottom 20px
      display: flex
      align-items center
      .icon
        margin-right 14px
      .serach-info
        height 20px
        line-height 20px
        no-wrap()
  .search-history
    position: relative
    margin: 0 20px
    .title
      display: flex
      align-items: center
      height: 40px
      font-size: $font-size-medium
      color: $color-text-l
      .text
        flex: 1
      .clear
        extend-click()
        .icon-clear
          font-size: $font-size-medium
          color: $color-text-d
    .search-item
      display flex
      align-items center
      height 40px
      line-height 40px
      font-size 16px
      color $color-text-l
      .search-key
        flex 1
        height 100%
      .icon-delete
        position relative
        font-size 12px
        color $color-text-d
        extend-click-after()
</style>
