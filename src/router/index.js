import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home/Home'
import Recommend from 'pages/Home/childrens/Recommend'

const SingerList = () => import('pages/Home/childrens/SingerList')
const RankList = () => import('pages/Home/childrens/RankList')
const Search = () => import('pages/Home/childrens/Search')

const Singer = () => import('pages/Singer/Singer')
const Rank = () => import('pages/Rank/Rank')
const User = () => import('pages/User/User')
const RecommendCd = () => import('pages/RecommendCd/RecommendCd')

Vue.use(Router)

const router = new Router({
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
        meta: {
          requiresAuth: true
        },
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

export default router
