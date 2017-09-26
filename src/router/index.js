import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home/Home'
import Recommend from 'pages/Home/childrens/Recommend'

const SingerList = r => require.ensure([], () => r(require('pages/Home/childrens/SingerList')), 'SingerList')
const Rank = r => require.ensure([], () => r(require('pages/Home/childrens/Rank')), 'Rank')
const Search = r => require.ensure([], () => r(require('pages/Home/childrens/Search')), 'Search')

const Singer = r => require.ensure([], () => r(require('pages/Singer/Singer')), 'Singer')

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
        path: '/Rank',
        name: 'Rank',
        component: Rank
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
    }
  ]
})
