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
  SingerDetails: (singerId)=>{
    return {
      params: {
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 80,
        songstatus: 1,
        singermid: singerId,
        ...commonParams
      },
      url: getApi('/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'),
      method: 'jsonp'
    }
  },
}
