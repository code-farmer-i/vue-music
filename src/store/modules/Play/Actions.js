const MODE_TYPE = ['normal', 'loop', 'random']

export default {
  playList({commit, state}, {songList, currentIdx}){
    commit('setSongList', songList)
    commit('setCurrentIdx', currentIdx)
    commit('showFull')
    commit('play')
  },
  addSongToList({commit, state}, song){

    let idx = state.songList.findIndex((s)=>{
      return s.id == song.id
    })

    //如果歌单中已经存在这首歌曲 则不重复添加 并播放该首
    if(idx == -1){
      commit('setCurrentIdx', 0)
      commit('addSong', song)
    }else{
      commit('setCurrentIdx', idx)
    }

    commit('showFull')
    commit('play')
  },
  changeSong({commit, state}, type){
    if(MODE_TYPE[state.mode] == 'random'){
      commit('playRandom')
    }else if(type == 'next'){
      if(state.currentIdx == state.songList.length - 1){
        commit('playFirstSong')
      }else{
        commit('playNext')
      }
    }else{
      if(state.currentIdx == 0){
        commit('playLastSong')
      }else{
        commit('playPrev')
      }
    }

    commit('play')
  }
}
