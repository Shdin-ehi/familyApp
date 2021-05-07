/** 
 * 全局的toast层 vuex用法见 {@link http://vuex.vuejs.org/zh-cn/state.html}
 * @module vuex-toast
 */

import * as types from '../mutation-types'

// 该模块的初始状态
const state = {
  toast:false, //toast层状态
  toastText:'', //toast内容
  toastTimer:null, //toast层计时器
  toastCallback:null //toast层回调函数
}

// 相关的 mutations
const mutations = {
  [types.SET_TOAST] (state, toast) {
    state.toast = toast
  },
  [types.SET_TOASTTEXT] (state, toastText) {
    state.toastText = toastText
  },
  [types.SET_TOASTTIME] (state, toastTimer) {
    state.toastTimer = toastTimer
  },
  [types.SET_TOASTCALLBACK] (state, callback) {
    state.toastCallback = callback
  },
  [types.CLEAR_TOASTTIMER] (state) {
    if (state.toastTimer) { clearTimeout(state.toastTimer) }
  }
}

/**
 * @type {Object}
 * @property {Function} toast toast层的状态，true为显示，false为隐藏
 * @property {Function} toastText toast层文字内容
 */
const getters = {
  toast: state => state.toast,
  toastText: state => state.toastText
}

/**
 * @type {Object}
 * @property {Function} showToast 显示toast层,参数1为内容，参数2为显示时间，参数3为隐藏后的回调
 * @property {Function} hideToast 隐藏toast层
 */
const actions = {
  showToast: ({ dispatch,commit,state}, {toastText,time,callback}) => {
	 	commit(types.SET_TOASTTEXT,toastText)
    commit(types.SET_TOAST,true)
	 	commit(types.SET_TOASTCALLBACK,callback)
	 	commit(types.CLEAR_TOASTTIMER)
  	var timer = setTimeout(() => { 
  		dispatch('hideToast')
  	}, time||2000)
	 	commit(types.SET_TOASTTIME,timer)
	},
  hideToast: ({ state,dispatch,commit }) => {
    if(typeof state.toastCallback=='function') state.toastCallback();
  	commit(types.SET_TOASTTEXT,'')
    commit(types.SET_TOAST,false)
  	commit(types.SET_TOASTCALLBACK,null)
	 	commit(types.CLEAR_TOASTTIMER)
	}
}

export default {
  state,
  mutations,
  getters,
  actions
}