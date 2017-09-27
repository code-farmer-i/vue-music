import {FAVORITE_LIST_LENGTH} from '../../../util/constant'

export default {
  updateFavorite(state, favorite){
    state.favoriteList = Object.freeze(favorite.slice(0, FAVORITE_LIST_LENGTH))

    localStorage.setItem('favoriteList', JSON.stringify(favorite))
  }
}
