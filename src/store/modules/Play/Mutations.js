const MODE_TYPE = ['normal', 'loop', 'random']

export default {
  play(state){
    state.playing = true;
  },
  pause(state){
    state.playing = false;
  },
  showMini(state){
    state.MiniShow = true;
    state.fullScreen = false;
  },
  showFull(state){
    state.fullScreen = true;
  },
  setSongList(state, songList){
    state.songList = songList;
  },
  setCurrentIdx(state, currentIdx){
    state.currentIdx = currentIdx;
  },
  addSong(state, song){
    state.songList.unshift(song)
  },
  changeMode(state){
    if(state.mode == MODE_TYPE.length - 1){
      state.mode = 0
    }else{
      state.mode++;
    }
  },
  changeSong(state, type){
    if(MODE_TYPE[state.mode] == 'random'){
      const randomIdx = Math.floor(Math.random() * (state.songList.length - 1))

      state.currentIdx = randomIdx;
    }else if(type == 'next'){
      if(state.currentIdx == state.songList.length - 1){
        state.songList = [...state.songList]
        state.currentIdx = 0;
      }else{
        state.currentIdx++;
      }
    }else{
      if(state.currentIdx == 0){
        state.songList = [...state.songList]
        state.currentIdx = state.songList.length - 1;
      }else{
        state.currentIdx--;
      }
    }

    state.playing = true;
  }
}
