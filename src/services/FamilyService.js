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
			 * 获取家庭成员列表
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getFamilyMembers : function(option) {
				
				ajax(Object.assign({type:"get",url:baseUrl+"/fda/family/getFamilyMembers.do"},option));
			
				
				// 模拟
				/*mockAjax(option,[
            {id:1,username:'家庭成员1',avatar:'static/demo/demo1.jpg'},
            {id:2,username:'家庭成员2',avatar:'static/demo/demo1.jpg'},
            {id:3,username:'家庭成员3',avatar:'static/demo/demo1.jpg'},
            {id:4,username:'家庭成员4',avatar:'static/demo/demo1.jpg'},
            {id:5,username:'家庭成员5',avatar:'static/demo/demo1.jpg'}
			 ],0);*/
			
					
       
			},
			/**
			 * 获取家庭成员信息
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getFamilyMemberData : function(option) {
					ajax(Object.assign({type:"get",url:baseUrl+"/fda/family/familyMemberDetail.do"},option));
				// 模拟
			  //	mockAjax(option,{id:'131',username:'xxx',own:'xx00409',avatar:'static/demo/demo1.jpg',character:'女儿',realName:'',phone:'',address:'东莞市'},0);
			},
			/**
			 * 获取相册集
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getAlbums : function(option) {
				// ajax(Object.assign({type:'get',url:baseUrl+'/getAlbums'},option);
				// 模拟
				mockAjax(option,[
            {id:1,title:'宝宝萌照',src:'static/demo/demo1.jpg'},
            {id:2,title:'爸爸&妈妈',src:'static/demo/demo.jpg'},
            {id:3,title:'日常生活',src:'static/demo/demo.jpg'},
            {id:4,title:'家居活动',src:'static/demo/demo1.jpg'}
          ],0);
			},
			/**
			 * 添加相册集
			 * @method
			 * @param {Object} option Ajax参数
			 */
			addAlbum : function(option) {			
				// ajax(Object.assign({type:'post',url:baseUrl+'/addAlbum'},option);
				mockAjax(option);
			},
			/**
			 * 获取某个相册的信息
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getAlbum : function(option) {
				// ajax(Object.assign({type:'get',url:baseUrl+'/getAlbum'},option);
				// 模拟
				mockAjax(option,{id:1,title:'宝宝萌照',src:'static/demo/demo1.jpg'},0);
			},
			/**
			 * 获取某个相册的照片
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getPhotos : function(option) {
				// ajax(Object.assign({type:'get',url:baseUrl+'/getPhotos'},option);
				// 模拟
				mockAjax(option,{
            "aaData":[
              {id:1,thumb:'static/demo/demo1.jpg',src:'static/demo/demo1.jpg',title:'图片1',uploadTime:'2017-05-17'},
              {id:11,thumb:'static/demo/demo1.jpg',src:'static/demo/demo1.jpg',title:'图片1',uploadTime:'2017-05-17'},
              {id:12,thumb:'static/demo/demo1.jpg',src:'static/demo/demo1.jpg',title:'图片1',uploadTime:'2017-05-17'},
              {id:13,thumb:'static/demo/demo1.jpg',src:'static/demo/demo1.jpg',title:'图片1',uploadTime:'2017-05-17'},
              {id:2,thumb:'static/demo/demo_thumb.jpg',src:'static/demo/demo.jpg',title:'图片2',uploadTime:'2017-05-15'},
              {id:21,thumb:'static/demo/icon_menu_appliance.png',src:'static/demo/icon_menu_appliance.png',title:'图片3',uploadTime:'2017-05-15'},
              {id:3,thumb:'static/demo/icon_menu_audio.png',src:'static/demo/icon_menu_audio.png',title:'图片4',uploadTime:'2017-05-14'},
              {id:14,thumb:'static/demo/icon_menu_comprehensive.png',src:'static/demo/icon_menu_comprehensive.png',title:'图片5',uploadTime:'2017-05-17'}
            ],
            'totalPage':2
          },600);
			},
			/**
			 * 修改相册基本信息
			 * @method
			 * @param {Object} option Ajax参数
			 */
			editAlbum : function(option) {
				// ajax(Object.assign({type:'post',url:baseUrl+'/editAlbum'},option);
				// 模拟
				mockAjax(option,{},400);
			}
		}

	}

}
