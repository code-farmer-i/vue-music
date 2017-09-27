import {mapState, mapMutations, mapGetters} from 'vuex'

//刷新Scroll
export const refreshScroll = {
  mounted(){
    this.refreshScrollView()
  },
  activated(){
    this.refreshScrollView()
  },
  watch:{
    MiniShow(){
      this.refreshScrollView()
    }
  },
  computed:{
    ...mapState({
      MiniShow: state => state.Play.MiniShow
    })
  },
  methods:{
    refreshScrollView(){
      if(this.MiniShow){
        this.$refs.scrollView.style.bottom = '60px'

        this.$nextTick(()=>{
          this.$refs.scroll.refresh()
        })
      }
    }
  }
}

//喜好歌曲的一些方法
export const favoriteMixin = {
  methods:{
    isFavorite(songId){
      let idx = this.favoriteList.findIndex((song)=>{
        return song.id == songId
      })

      return idx > -1
    },
    toggleFavorite(song) {
      let songIdx = this.favoriteList.findIndex((favorite) => {
        return favorite.id == song.id
      })

      songIdx > -1 ? this.deleteFavorite(songIdx) : this.addFavorite(song)
    },
    deleteFavorite(idx){
      let newList = [...this.favoriteList];

      Array.prototype.splice.call(newList, idx, 1);

      this.updateFavorite(newList);
    },
    addFavorite(song){
      let newList = [...this.favoriteList];

      newList.unshift(song)

      this.updateFavorite(newList);
    },
    ...mapMutations(['updateFavorite'])
  },
  computed:{
    ...mapState({
      favoriteList: state => state.FavoriteSong.favoriteList
    })
  }
}

//改变播放模式的方法
export const ModeMixin = {
  methods:{
    ...mapMutations(['changeMode']),
  },
  computed:{
    ...mapGetters(['getMode', 'getModeCN', 'getModeIcon']),
  }
}
