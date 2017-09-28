<template>
    <div class="flex-list">
      <div class="title">{{title}}</div>
      <div class="item-group" v-for="group in data">
        <div class="item" v-for="item in group" @click="$emit('itemClick', item)">
          <img v-lazy="item[imgName]" :style="{height: `${itemHeight}px`}"/>
          <div class="msg">{{item[msgName]}}</div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    const ITEM_MARGIN = 8;
    const GROUP_NUM = 3;
    const MAX_GROUP = 2;

    export default {
      data(){
        return {
          data: [],
          itemHeight: 0
        }
      },
      props:{
        title: {
          type: String,
          default: ''
        },
        imgName:{
          type: String,
          default: ''
        },
        msgName:{
          type: String,
          default: ''
        }
      },
      created(){
        this.itemHeight = ((window.innerWidth > 500 ? 500 : window.innerWidth) - ITEM_MARGIN) / GROUP_NUM;
        this.$on('formatData', this.formatData)
      },
      methods:{
        formatData(data){
          let newData = [];
          let startNum = 0;
          let endNum = GROUP_NUM;
          let groupNum = parseInt(data.length / GROUP_NUM);
          groupNum = groupNum > MAX_GROUP ? MAX_GROUP : groupNum

          for(let i = 0;i< groupNum;i++){
            newData.push(data.slice(startNum, endNum))

            startNum += GROUP_NUM;
            endNum += GROUP_NUM;
          }

          this.data = Object.freeze(newData);
          this.$nextTick(()=>{
            this.$emit('complete')
          })
        }
      }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import "../../assets/stylus/variable2.styl"

  .flex-list
    .title
      margin 20px 0
      text-align center
      font-size $font-size-medium-x
      color $color-font-d
      letter-spacing 2px
    .item-group
      display flex
      align-items top
      &:not(:last-child)
        margin-bottom 10px
      .item
        flex 1
        &:not(:last-child)
          margin-right 4px
        img
          width 100%
        .msg
          font-size $font-size-small
          color $color-font-d
          line-height 16px
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 2
</style>
