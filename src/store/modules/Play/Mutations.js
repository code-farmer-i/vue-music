import {MODE_TYPE} from '../../../util/constant'

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
  showPlayList(state){
    state.showSongList = true;
  },
  hidePlayList(state){
    state.showSongList = false;
  },
  setSongList(state, songList){
    state.songList = songList;
  },
  setCurrentIdx(state, currentIdx){
    state.currentIdx = currentIdx;
  },
  addSong(state, song){
    state.songList = [song, ...state.songList]
  },
  removeSong(state, idx){
    const newSongList = [...state.songList];

    Array.prototype.splice.call(newSongList, idx, 1);

    //若删除的歌曲索引小于当前播放歌曲 随数组长度变化 当前播放歌曲的索引-1
    idx < state.currentIdx && state.currentIdx--;

    state.songList = Object.freeze(newSongList)
  },
  changeMode(state){
    if(state.mode == MODE_TYPE.length - 1){
      state.mode = 0
    }else{
      state.mode++;
    }
  },
  playRandom(state){
    const randomIdx = Math.floor(Math.random() * (state.songList.length - 1))

    state.currentIdx = randomIdx;
  },
  playNext(state){
    state.currentIdx++
  },
  playPrev(state){
    state.currentIdx--
  },
  playFirstSong(state){
    state.songList = [...state.songList];
    state.currentIdx = 0;
  },
  playLastSong(state){
    state.songList = [...state.songList];
    state.currentIdx = state.songList.length - 1;
  }
}
