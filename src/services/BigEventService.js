/** @module */

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
			 * 获取大事件列表
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getMemos : function(option) {
				// ajax(Object.assign({type:'get',url:baseUrl+'/getMemos'},option);
				// 模拟
				mockAjax(option,[{"id":11,"title":"增加两条记录，然后单项删除","start":"Fri May 07 00:00:00 CST 2017","allDay":true,"_type":"FmMemorabilia","content":"测试用内容，以下是附件相关内容展示和下载，请注意流量"},{"id":19,"title":"我的大事件","start":"Mon May 27 00:00:00 CST 2017","allDay":true,"_type":"FmMemorabilia"},{"id":20,"title":"今天发生件大事","start":"Tue May 28 00:00:00 CST 2017","allDay":true,"_type":"FmMemorabilia"},{"id":21,"title":"测试增加权限判断","start":"Wed May 05 00:00:00 CST 2017","allDay":true,"_type":"FmMemorabilia"},{"id":22,"title":"验证增加权限判断","start":"Wed May 05 00:00:00 CST 2017","allDay":true,"_type":"FmMemorabilia"},{"id":23,"title":"修改了再次测试增加权限判断","start":"Wed May 05 00:00:00 CST 2017","allDay":true,"_type":"FmMemorabilia"},{"id":25,"title":"测试删除操作权限","start":"Wed May 05 00:00:00 CST 2017","allDay":true,"_type":"FmMemorabilia"}],0);
			},
			/**
			 * 获取大事件文件列表
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getMemoFile : function(option) {
				// ajax(Object.assign({type:'get',url:baseUrl+'/getMemoFile'},option);
				// 模拟
				mockAjax(option,[{
                id: 1,
                name:'文件1.jpg',
                thumb:'static/demo/demo_thumb.jpg',
                src:'static/demo/demo.jpg'
              },{
                id: 2,
                name:'文件2.xls'
              },{
                id: 3,
                name:'文件3.doc'
              },{
                id: 4,
                name:'文件4.ppt'
              },{
                id: 5,
                name:'文件5.mp4',
                thumb:'static/demo/demo_thumb.jpg'
              }],500);
			}
		}

	}

}
