import Vue from 'vue'
import Vuex from 'vuex'

//Global
import state from './State'
import mutations from './Mutations'

//Modules
import Play from './modules/Play/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    Play
  }
})
