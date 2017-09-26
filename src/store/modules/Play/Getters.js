const MODE_TYPE = ['normal', 'loop', 'random']

export default {
  currentSong: state => {
    return state.songList[state.currentIdx] || {};
  },
  getMode(state){
    return MODE_TYPE[state.mode];
  }
}
