const MODE_TYPE = ['normal', 'loop', 'random']
const MODE_TYPE_CN = ['顺序播放', '单曲循环', '随机播放']

export default {
  currentSong: state => {
    return state.songList[state.currentIdx] || {};
  },
  getMode(state){
    return MODE_TYPE[state.mode];
  },
  getModeCN(state){
    return MODE_TYPE_CN[state.mode];
  }
}
