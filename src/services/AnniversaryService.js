/** 
 * 纪念日相关服务
 * @module
 * @requires scripts/scommon
 */

import ajax from 'scripts/common'

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
			 * 获取纪念日列表
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getAnniversaryList : function(option) {
				// ajax(Object.assign({type:'get',url:baseUrl+'/getAnniversaryList'},option);
				mockAjax(option,[{ "id": 11, "title": "爸爸的生日", "start": "Fri Jun 07 00:00:00 CST 2017", anniversaryType: '1' }, { "id": 12, "title": "家庭日", "start": "Fri Jun 08 00:00:00 CST 2017", anniversaryType: '2' }, { "id": 13, "title": "结婚纪念日", "start": "Fri Jun 10 00:00:00 CST 2017", anniversaryType: '3' }, { "id": 13, "title": "其他纪念日", "start": "Fri Jun 09 00:00:00 CST 2017", anniversaryType: '4' }],100);
			},
			/**
			 * 获取纪念日信息
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getAnniversary : function(option) {
				// ajax(Object.assign({type:'get',url:baseUrl+'/getAnniversary'},option);
				// 模拟
				mockAjax(option,{"id":11,"title":"爸爸的生日","start":"Fri Jun 07 00:00:00 CST 2017",'anniversaryType':'1','tip':true,"tipTime":'1','remark':'不能忘了','public':false},0);
			},
			/**
			 * 删除纪念日
			 * @method
			 * @param {Object} option Ajax参数
			 */
			deleteAnniversary : function(option) {
				// ajax(Object.assign({type:'post',url:baseUrl+'/deleteAnniversary'},option);
				// 模拟
				mockAjax(option,[],500);
			},
			/**
			 * 更新纪念日
			 * @method
			 * @param {Object} option Ajax参数
			 */
			updateAnniversary : function(option) {
				// ajax(Object.assign({type:'post',url:baseUrl+'/updateAnniversary'},option);
				// 模拟
				mockAjax(option,[],500);
			}
		}

	}

}
