<template>
    <div ref="wrapper" class="scroll-wrap">
      <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'

    export default{
      props: {
        probeType: {
          type: Number,
          default: 1
        },
        click: {
          type: Boolean,
          default: true
        },
        data: {
          type: Array,
          default: null
        },
        listenScroll:{
          type: Boolean,
          default: false
        }
      },
      mounted(){
        setTimeout(()=>{
          this.initScroll()
        }, 20)
      },
      methods:{
        initScroll(){
          const that = this;

          this.scroll = new BScroll(this.$refs.wrapper, {
            scrollY: true,
            probeType: this.probeType,
            click: this.click,
          })

          if(this.listenScroll){
            this.scroll.on('scroll', (pos)=>{
              that.$emit('scrolling', pos)
            })
          }
        },
        scrollToElement(...arg){
          this.scroll && this.scroll.scrollToElement.apply(this.scroll, arg);
        },
        scrollTo(...arg){
          this.scroll && this.scroll.scrollTo.apply(this.scroll, arg);
        },
        refresh(){
          if(this.scroll) {
            this.scroll.refresh()
            this.scroll.scrollTo(0, 0)
          }
        },
        recalculate(){
          this.scroll && this.scroll.refresh()
        }
      },
      watch:{
        data(){
          this.$nextTick(()=>{
            this.refresh()
          })
        }
      }
    }
</script>

<style lang="stylus" type="text/stylus">
  .scroll-wrap
    height 100%
    overflow hidden
</style>
