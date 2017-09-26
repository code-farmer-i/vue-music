import {HOST, commonParams} from './common'

const getApi = (URL) => {
  return HOST + URL
}

//搜索分页每页数量
const perpage = 30

export default {
  HotKey: ()=>{
    return {
      params: {
        uin: 0,
        needNewCode: 1,
        platform: 'h5',
        ...commonParams
      },
      url: getApi('/splcloud/fcgi-bin/gethotkey.fcg'),
      method: 'jsonp'
    }
  },
  Serch: ({query, page, zhida})=>{
    return {
      params: {
        w: query,
        p: page,
        perpage,
        n: perpage,
        catZhida: zhida ? 1 : 0,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        remoteplace: 'txt.mqq.all',
        uin: 0,
        needNewCode: 1,
        platform: 'h5',
        ...commonParams
      },
      url: getApi('/soso/fcgi-bin/search_for_qq_cp'),
      method: 'jsonp'
    }
  },
}
