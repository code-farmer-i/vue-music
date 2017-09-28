import {HOST, commonParams} from './common'

const getApi = (URL) => {
  return HOST + URL
}

export default {
  SongList: (disstid)=>{
    return {
      params:{
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        ...commonParams
      },
      url: getApi('/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'),
      method: 'jsonp'
    }
  },
}
