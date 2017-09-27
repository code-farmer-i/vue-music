import {MODE_TYPE, MODE_TYPE_CN} from '../../../util/constant'

export default {
  currentSong: state => {
    return state.songList[state.currentIdx] || {};
  },
  getMode(state){
    return MODE_TYPE[state.mode];
  },
  getModeIcon(state){
    let icon;

    if(MODE_TYPE[state.mode] == 'normal'){
      icon = 'icon-sequence'
    }else if(MODE_TYPE[state.mode] == 'loop'){
      icon = 'icon-loop'
    }else{
      icon = 'icon-random'
    }

    return icon;
  },
  getModeCN(state){
    return MODE_TYPE_CN[state.mode];
  }
}
