export default {
  playList({commit, state}, {songList, currentIdx}){
    commit('setSongList', songList)
    commit('setCurrentIdx', currentIdx)
    commit('showFull')
    commit('play')
  }
}
