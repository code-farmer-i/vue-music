import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home/Home'
import Recommend from 'pages/Home/childrens/Recommend'
import Singer from 'pages/Home/childrens/Singer'
import Rank from 'pages/Home/childrens/Rank'
import Search from 'pages/Home/childrens/Search'

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
        path: '/Singer',
        name: 'Singer',
        component: Singer
      }, {
        path: '/Rank',
        name: 'Rank',
        component: Rank
      },{
        path: '/Search',
        name: 'Search',
        component: Search
      }]
    }
  ]
})
