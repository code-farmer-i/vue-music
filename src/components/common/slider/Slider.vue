<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <div class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default{
    name: 'slider',
    data(){
      return {
        dots: 0,
        currentPageIndex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      data: {
        type: Array,
        default: null
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.initSliderWidth()
        this.initSlider()

        if (this.autoPlay) {
          this._play()
        }
      })
    },
    methods: {
      initSliderWidth(){
        const $refs = this.$refs;
        const slider = $refs.slider;
        const sliderItems = $refs.sliderGroup.children;
        const itemWidth = slider.clientWidth;

        $refs.sliderGroup.style.width = `${this.loop ? itemWidth * sliderItems.length + 2 * itemWidth : itemWidth * sliderItems.length}px`;
        this.dots = new Array(sliderItems.length)

        for(let item of sliderItems){
          item.style.width = `${itemWidth}px`;
        }
      },
      initSlider(){
        this.slide = new BScroll(this.$refs.slider, {
          scrollX: true,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: true
        })

        this.slide.on('scrollEnd', this._onScrollEnd)

        this.slide.on('touchend', () => {
          if (this.autoPlay) {
            this._play()
          }
        })

        this.slide.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })

      },
      _onScrollEnd() {
        let pageIndex = this.slide.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      },
      _play() {
        let pageIndex = this.slide.getCurrentPage().pageX + 1
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slide.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    activated() {
      if (!this.slide) {
        return
      }
      this.slide.enable()
      let pageIndex = this.slide.getCurrentPage().pageX
      if (pageIndex > this.dots.length) {
        pageIndex = pageIndex % this.dots.length
      }
      this.slide.goToPage(pageIndex, 0, 0)
      if (this.loop) {
        pageIndex -= 1
      }
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      this.slide.disable()
      clearTimeout(this.timer)
    }
  }
</script>

<style lang="stylus" type="text/stylus">

  @import "../../../assets/stylus/variable.styl";
  .slider
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    .slider-group
      position relative
      overflow hidden
      white-space nowrap
      .slider-item
        float left
        box-sizing border-box
        overflow hidden
        text-align center
        a
          display block
          width 100%
          overflow hidden
          text-decoration none
        img
          display block
          width 100%
    .dots
      position absolute
      right 0
      left 0
      bottom  12px
      text-align center
      font-size  0
    .dot
      display inline-block
      margin  0 4px
      width 8px
      height 8px
      border-radius 50%
      background $color-text-l
      &.active
        width 20px
        border-radius 5px
        background $color-text-ll

</style>
