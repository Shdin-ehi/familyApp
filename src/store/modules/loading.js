/** 
 * 全局的loading层 vuex用法见 {@link http://vuex.vuejs.org/zh-cn/state.html}
 * @module vuex-loading
 */

import * as types from '../mutation-types'

// 该模块的初始状态
const state = {
	//是否弹出全局的loading窗
  isLoading:false
}

// 相关的 mutations
const mutations = {
  [types.SET_LOADING] (state, {isLoading}) {
    state.isLoading = isLoading
  }
}

/**
 * @type {Object}
 * @property {Function} loading 全局loading层的状态，若为true，正在loading
 */
const getters = {
  loading: state => state.isLoading
}

/**
 * @type {Object}
 * @property {Function} setLoading 将loading设为参数的值，显示或隐藏loading层
 */
const actions = {
  setLoading: ({ commit }, isLoading) => {
	  commit(types.SET_LOADING, {
	    isLoading:isLoading
	  })
	}
}

export default {
  state,
  mutations,
  getters,
  actions
}