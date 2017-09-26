import {mapState} from 'vuex'

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
        this.scrollReresh = true;
        this.$refs.scrollView.style.bottom = '60px'

        this.$nextTick(()=>{
          this.$refs.scroll.refresh()
        })
      }
    }
  }
}
