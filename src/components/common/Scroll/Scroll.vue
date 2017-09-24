<template>
    <div ref="wrapper">
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
        }
      },
      mounted(){
        console.log('scroll')
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

          this.scroll.on('scroll', (pos)=>{
             that.$emit('scrolling', pos)
          })
        },
        scrollToElement(...arg){
          this.scroll && this.scroll.scrollToElement.apply(this.scroll, arg);
        },
      },
      watch:{
        data(){
          this.$nextTick(()=>{
            this.scroll && this.scroll.refresh()
          })
        }
      }
    }
</script>
