import {HOST, commonParams} from './common'

const getApi = (URL) => {
  return HOST + URL
}

export default {
  Rank: ()=>{
    return {
      params: {
        uin: 0,
        needNewCode: 1,
        platform: 'h5',
        ...commonParams
      },
      url: getApi('/v8/fcg-bin/fcg_myqq_toplist.fcg'),
      method: 'jsonp'
    }
  },
  RankDetails: (rankId)=>{
    return {
      params: {
        uin: 0,
        needNewCode: 1,
        platform: 'h5',
        topid: rankId,
        ...commonParams
      },
      url: getApi('/v8/fcg-bin/fcg_v8_toplist_cp.fcg'),
      method: 'jsonp'
    }
  }
}
