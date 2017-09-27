import Vue from 'vue'
import Vuex from 'vuex'

//Global
import state from './State'
import mutations from './Mutations'

//Modules
import Play from './modules/Play/index'
import FavoriteSong from './modules/FavoriteSong/index'
import LatelySong from './modules/LatelySong/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    Play,
    FavoriteSong,
    LatelySong
  }
})
