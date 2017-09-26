export default {
  playList({commit, state}, {songList, currentIdx}){
    commit('setSongList', songList)
    commit('setCurrentIdx', currentIdx)
    commit('showFull')
    commit('play')
  },
  addSongToList({commit, state}, song){
    commit('addSong', song)
    commit('setCurrentIdx', 0)
    commit('showFull')
    commit('play')
  }
}
