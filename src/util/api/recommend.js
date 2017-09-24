import {HOST, commonParams} from './common'

const getApi = (URL) => {
  return HOST + URL
}

export default {
  Recommend: ()=>{
    return {
      params: {
        platform: 'h5',
        uin: 0,
        needNewCode: 1,
        ...commonParams
      },
      url: getApi('/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'),
      method: 'jsonp'
    }
  },
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
