import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
// 导入各个模块的初始状态和 mutations
import loading from './modules/loading'
import history from './modules/history'
import toast from './modules/toast'

Vue.use(Vuex)

export default new Vuex.Store({
  // 组合各个模块
	// actions,
 //  getters,
  modules: {
    loading,
    history,
    toast
  }
})