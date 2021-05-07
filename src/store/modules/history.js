/** 
 * 存储历史记录 vuex用法见 {@link http://vuex.vuejs.org/zh-cn/state.html}
 * @module vuex-history
 */

import * as types from '../mutation-types'

// 该模块的初始状态
const state = {
  //近12个访问历史地址
  lastFullPaths:[]
}

// 相关的 mutations
const mutations = {
  [types.ADD_HISTORY] (state, {path}) {
  	state.lastFullPaths.unshift(path)
  },
  [types.DELETE_HISTORY] (state, {index}) {
    if (typeof index!=='undefined'){
    	state.lastFullPaths.splice(index,1)
    }else{
    	state.lastFullPaths.pop()
    }
  }
}

/**
 * @type {Object}
 * @property {Function} lastFullPaths 获取js存储的历史记录数组
 */
const getters = {
  lastFullPaths: state => state.lastFullPaths
}

/**
 * @type {Object}
 * @property {Function} addPath 添加新的历史记录
 * @property {Function} historyBack 删除最近一条历史记录
 * @property {Function} isLastPach 判断参数1是否是上级历史，若是返回true,否则false
 */
const actions = {
  addPath: ({ commit ,state}, path) => {
	 	if (state.lastFullPaths.length>12)
    	 	commit(types.DELETE_HISTORY,{index:state.lastFullPaths.length-1})
	  commit(types.ADD_HISTORY, {
	    path:path
	  })
	},
  historyBack: ({ commit }) => {
	 	commit(types.DELETE_HISTORY,{index:0})
	},
	isLastPach: ({ commit ,state}, path) => {
	 	return state.lastFullPaths.length>0&&state.lastFullPaths[0]==path
	}
}

export default {
  state,
  mutations,
  getters,
  actions
}