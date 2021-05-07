/** @module */

import {ajax} from 'scripts/common'


//模拟ajax，测试用，开发后删除
function mockAjax(option,data,time){
	var call=function(fun){
		setTimeout(()=>{
			fun&&fun(data)
		},typeof time=='undefined'?1000:time)
		return this
	}
	call(option?option.complete:null)
	call(option?option.success:null)
	return {
		then:call,
		complete:call,
		done:call,
		error:function() { return this }
	}
}

/**
 * 默认导出
 * @type {Object}
 * @property {Function} init 初始化基本数值,返回一个method集合
 */
export default {
	init: function(bu) {
		var baseUrl = bu;
		
		return {
			/**
			 * 编辑个人信息
			 * @method
			 * @param {Object} option Ajax参数
			 */
			editPersonalData : function(option) {
				//ajax(Object.assign({type:'post',url:baseUrl+'/editPersonalData'},option);
				// 模拟
				mockAjax(option,[],600);
			},
			userLogin : function(option) {
		
				ajax(Object.assign({type:"post",url:'http://localhost:8090/fda/j_spring_security_check'},option));
				
			}
			
			
		}
	}
}
