<template>
  <div class="singer">
    <scroll class="singer-scroll" :data="singerList" :probeType="3" ref="scroll" @scrolling="onScroll">
      <ul>
        <li v-for="group in singerList" class="list-group" ref="listGroup">
          <h2 class="list-group-title">{{group.sort}}</h2>
          <ul>
            <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
              <img v-lazy="item.avatar" class="avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <div class="list-shortcut">
      <ul>
        <li v-for="(item, index) in sortList" class="item"
            @touchstart="sortTouchStart($event, index)"
            @touchmove="sortTouchMove"
            :class="{'current':sortActiveIdx === index}">{{item}}
        </li>
      </ul>
    </div>
    <loading v-show="!singerList.length"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/common/Scroll/Scroll'
  import Loading from 'components/common/Loading/Loading'

  let touch = {};
  const sortItemHeight = 18;
  let listGroupScrollY = [];
  let currentScrollY = 0;

  export default{
    data(){
      return {
        singerList: [],
        sortList: [],
        sortActiveIdx: 0
      }
    },
    created(){
      this.getSingerList()
    },
    methods: {
      sortTouchStart(e, idx){
        touch.y1 = e.touches[0].pageY;
        touch.startIdx = idx

        this.scrollToElement(idx)
      },
      sortTouchMove(e){
        touch['y2'] = e.touches[0].pageY;
        const idx = Math.ceil((touch.y2 - touch.y1) / sortItemHeight) + touch.startIdx

        this.scrollToElement(idx)
      },
      scrollToElement(idx){
        if(this.sortActiveIdx == idx || idx < 0 || idx > this.sortList.length - 1) return

        this.$refs.scroll.scrollToElement(this.$refs.listGroup[idx])
        this.sortActiveIdx = +idx;
      },
      async getSingerList(){
        const result = await this.$store.dispatch('getSingerList');

        this.formatSingerList(result.list)
      },
      formatSingerList(list){
        //拿到热门歌手
        const singerList = {};
        let title = new Set();

        singerList['热门'] = [];
        title.add('热门');

        list.forEach((val, index)=> {
          const singer = {
            sort: val.Findex,
            id: val.Fsinger_id,
            name: val.Fsinger_name,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${val.Fsinger_mid}.jpg?max_age=2592000`
          }

          if (index < 10) {
            singerList['热门'].push(singer)
          }

          if (title.has(val.Findex)) {
            singerList[val.Findex].push(singer)
          } else {
            singerList[val.Findex] = [];
            singerList[val.Findex].push(singer)
          }

          title.add(val.Findex);
        })

        let hotList = [];
        let otherList = [];
        let sortList = ['热'];

        for (const [key, singers] of Object.entries(singerList)) {
          const item = {
            sort: key,
            items: singers
          };

          if (key.match(/[a-zA-Z]/)) {
            otherList.push(item)
          } else if (key === '热门') {
            hotList.push(item)
          }
        }

        otherList.sort((a, b)=> {
          return a.sort.charCodeAt(0) - b.sort.charCodeAt(0)
        })

        sortList = sortList.concat(otherList.map( val => val.sort));

        this.sortList = Object.freeze(sortList);
        this.singerList = Object.freeze(hotList.concat(otherList))
      },
      onScroll(pos){
        const scrollY = Math.floor(-pos.y);

        if(scrollY >= currentScrollY.minY && scrollY < currentScrollY.maxY){
          return
        }

        for(let i =0;i<listGroupScrollY.length;i++){
          if(scrollY >= listGroupScrollY[i].minY && scrollY < listGroupScrollY[i].maxY){
            this.sortActiveIdx = i;
            currentScrollY = listGroupScrollY[i]
            break;
          }
        }
      }
    },
    watch:{
      singerList(){
        this.$nextTick(()=>{
          let groupHeight = [];
          let listGroup = this.$refs.listGroup;
          let prevGroupHeight = 0;

          listGroup.forEach((group)=>{
            const currentGroupHeight = group.clientHeight;

            groupHeight.push({
              minY: prevGroupHeight,
              maxY: prevGroupHeight + currentGroupHeight
            })

            prevGroupHeight = prevGroupHeight + currentGroupHeight;
          })

          listGroupScrollY = groupHeight;
          currentScrollY = listGroupScrollY[0]
        })
      }
    },
    components: {
      Loading,
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../assets/stylus/variable.styl";

  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
    .singer-scroll
      position relative
      width 100%
      height 100%
      overflow hidden
      .list-group
        padding-bottom 30px
        .list-group-title
          height 30px
          line-height 30px
          padding-left 20px
          font-size $font-size-small
          color $color-text-l
          background $color-highlight-background
        .list-group-item
          display flex
          align-items center
          padding 20px 0 0 30px
          .avatar
            width 50px
            height 50px
            border-radius 50%
          .name
            margin-left 20px
            color $color-text-l
            font-size $font-size-medium
    .list-shortcut
      position absolute
      z-index 30
      right 0
      top 50%
      transform translateY(-50%)
      width 20px
      paddind 20px 0
      border-radius 10px
      text-align center
      background $color-background-d
      font-family Helvetica
      .item
        padding 3px
        line-height 1
        color $color-text-l
        font-size $font-size-small
        &.current
          color $color-theme


</style>
