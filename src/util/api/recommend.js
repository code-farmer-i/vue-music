import {HOST, commonParams, proxyTable} from './common'

const getApi = (URL) => {
  return HOST + URL
}

const param = function(data) {
  let url = '';

  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }

  return url ? encodeURIComponent(url.substring(1)) : ''
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
  RecommendList: ()=>{
    return {
      params: {
        loginUin:0,
        hostUin:0,
        platform: 'yqq',
        needNewCode:0,
        data: encodeURIComponent(JSON.stringify({"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}})),
        ...commonParams
      },
      url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
      method: 'jsonp',
      options:{
        name: 'recom18407305667672613'
      }
    }
  },
  cdInfo: (disstid)=>{
    return {
      url: proxyTable + '/getRecommendCd?params=' + param({
        g_tk: 5381,
        type:1,
        json:1,
        utf8:1,
        onlysong:0,
        disstid:disstid,
        loginUin:0,
        hostUin:0,
        needNewCode:0,
        platform:'yqq',
        jsonpCallback: 'playlistinfoCallback',
        format: 'jsonp',
        g_tk:5381,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice:0
      }),
      method: 'GET'
    }
  },
}
