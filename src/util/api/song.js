import {HOST, proxyTable} from './common'

const getApi = (URL) => {
  return HOST + URL
}

export default {
  Lyric: (songmid) => {
    return {
      url: proxyTable + '/getLyric?songmid=' + songmid,
      method: 'GET'
    }
  }
}
