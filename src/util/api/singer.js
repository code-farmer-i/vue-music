import {HOST, commonParams} from './common'

const getApi = (URL) => {
  return HOST + URL
}

export default {
  Singer: ()=>{
    return {
      params: {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        ...commonParams
      },
      url: getApi('/v8/fcg-bin/v8.fcg'),
      method: 'jsonp'
    }
  },
}
