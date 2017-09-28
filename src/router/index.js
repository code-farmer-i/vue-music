import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home/Home'
import Recommend from 'pages/Home/childrens/Recommend'

const SingerList = r => require.ensure([], () => r(require('pages/Home/childrens/SingerList')), 'SingerList')
const RankList = r => require.ensure([], () => r(require('pages/Home/childrens/RankList')), 'RankList')
const Search = r => require.ensure([], () => r(require('pages/Home/childrens/Search')), 'Search')

const Singer = r => require.ensure([], () => r(require('pages/Singer/Singer')), 'Singer')
const Rank = r => require.ensure([], () => r(require('pages/Rank/Rank')), 'Rank')
const User = r => require.ensure([], () => r(require('pages/User/User')), 'User')
const RecommendCd = r => require.ensure([], () => r(require('pages/RecommendCd/RecommendCd')), 'RecommendCd')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Recommend'
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: '/Recommend',
        name: 'Recommend',
        component: Recommend
      }, {
        path: '/SingerList',
        name: 'SingerList',
        component: SingerList
      }, {
        path: '/RankList',
        name: 'RankList',
        component: RankList
      },{
        path: '/Search',
        name: 'Search',
        component: Search
      }]
    },
    {
      path: '/SingerList/Singer/:singerId',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/RankList/Rank/:rankId',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/Recommend/RecommendCd/:disstid',
      name: 'RecommendCd',
      component: RecommendCd
    },
    {
      path: '/Home/User',
      name: 'User',
      component: User
    }
  ]
})
