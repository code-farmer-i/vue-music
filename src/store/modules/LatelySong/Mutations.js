import {LATELY_LIST_LENGTH} from '../../../util/constant'

export default {
  addToLatelyList(state, song){
    const idx = state.latelyList.findIndex(item => item.id == song.id)
    let newList = [...state.latelyList];

    //列表已存在改曲目 则不添加 并将此曲目更新到列表第一条
    if(idx != -1){
      Array.prototype.splice.call(newList, idx, 1)
    }

    newList.unshift(song)
    newList = newList.slice(0, LATELY_LIST_LENGTH)

    state.latelyList = Object.freeze(newList);
    localStorage.setItem('latelyList', JSON.stringify(newList));
  }
}
