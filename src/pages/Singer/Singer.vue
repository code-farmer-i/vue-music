<template>
    <div class="singer">
      <top-bar :title="singer.name"></top-bar>
      <div class="singer-photo" :style="{'background-image': `url(${singer.avatar})`}"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import TopBar from 'components/TopBar/TopBar'
    import {mapState} from 'vuex'

    export default{
      name: 'Singer',
      data(){
        return{
          singerName: '',
          singerPhoto: ''
        }
      },
      created(){
        console.log('created')
        const singerId = this.$route.params.singerId;

        this.getSingerDetails(singerId);
      },
      methods:{
        async getSingerDetails(singerId){
          const singerDetails = await this.$store.dispatch('getSingerDetails', singerId)

          console.log(singerDetails);
        }
      },
      components:{
        TopBar
      },
      computed:{
        ...mapState(['singer'])
      }
    }
</script>

<style lang="stylus">
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


</style>
