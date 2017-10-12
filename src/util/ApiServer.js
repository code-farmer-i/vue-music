import API from './api'
import axios from 'axios'
import jsonp from './myJsonp'


const apiFactory = ({url, params, method, dataName, options})=>{
  const request = method === 'jsonp' ?
    jsonp(url, params, options ? options : {param: 'jsonpCallback'})
    : axios({
      method: method,
      url: url,
      data: params || ''
    })

  return new Promise((resolve)=>{
    request
    .then((res)=>{
      console.log(res)
      resolve(res[dataName] || res.data || res)
    })
  })
}

export default{
  getRecommend(){
    return apiFactory(API.Recommend())
  },
  getRecommendList(){
    return apiFactory(API.RecommendList())
  },
  getSingerList(){
    return apiFactory(API.Singer())
  },
  getSingerDetails(singerId){
    return apiFactory(API.SingerDetails(singerId))
  },
  getRankList(){
    return apiFactory(API.Rank())
  },
  getRankListDetails(rankId){
    return apiFactory(API.RankDetails(rankId))
  },
  getHotKey(){
    return apiFactory(API.HotKey())
  },
  getSerch(params){
    return apiFactory(API.Serch(params))
  },
  getCdInfo(disstid){
    return apiFactory(API.cdInfo(disstid))
  },
  getLyric(songmid){
    return apiFactory(API.Lyric(songmid))
  }
}
