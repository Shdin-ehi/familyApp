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
			 * 获取档案类型列表
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getFileCategorys: function(option) {
				// ajax(Object.assign({type:'get',url:baseUrl+'/getFileCategorys'},option);
				// 模拟
				mockAjax(option,[
          {id:1, name:'证书类',icon:'static/demo/icon_menu_qualification.png'},
          {id:2, name:'照片类',icon:'static/demo/icon_menu_photo.png'},
          {id:3, name:'医疗保健类',icon:'static/demo/icon_menu_healthcare.png'},
          {id:4, name:'理财类',icon:'static/demo/icon_menu_financial.png'},
          {id:5, name:'文稿书信类',icon:'static/demo/icon_menu_letter.png'},
          {id:6, name:'家电使用维护类',icon:'static/demo/icon_menu_appliance.png'},
          {id:7, name:'声像类',icon:'static/demo/icon_menu_audio.png'},
          {id:8, name:'实物类',icon:'static/demo/icon_menu_entity.png'},
          {id:9, name:'综合类',icon:'static/demo/icon_menu_comprehensive.png'}
        ],0);
			},
			/**
			 * 获取存放位置列表
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getFileLocates: function(option) {
				// ajax(Object.assign({type:'get',url:baseUrl+'/getFileLocates'},option);
				// 模拟
				mockAjax(option,[
	        {id:'1', locateName:'客厅'},
	        {id:'2', locateName:'杂物室'},
	        {id:'3', locateName:'主人房'}
	      ],0);
			},
			/**
			 * 获取载体类型列表
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getCarriers: function(option) {
				// ajax(Object.assign({type:'get',url:baseUrl+'/getCarriers'},option);
				// 模拟
				mockAjax(option,[
					{id:1,carrierName:"DVDV"},
	        {id:2,carrierName:"3R照片"},
	        {id:3,carrierName:"证书"},
	        {id:4,carrierName:"录像带"},
	        {id:5,carrierName:"VCD"},
	        {id:6,carrierName:"4R照片"},
	        {id:7,carrierName:"锦旗"},
	        {id:8,carrierName:"纸质"}
	       ],0);
			},
			/**
			 * 获取档案列表
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getArchiveList: function(option) {
				// ajax(Object.assign({type:'get',url:baseUrl+'/getArchiveList'},option);
				// 模拟
				mockAjax(option,{
            "iTotalDisplayRecords":6,
            "iTotalRecords":10,
            "totalPage":2,
            "aaData":[{"id":14,"lastOperatorTime":"2017-04-19","sort":1,"ownerId":"e20afce4b12511e68bc4507b9dae4454","familyId":6,"pieceNum":"312213","annualNum":"2015","fileCategoryId":null,"fileDeadlineId":null,"fileDutyId":null,"refNum":"","fileTitle":"2","produceDate":null,"pageNum":null,"fileCarrierId":null,"fileLocateId":null,"fileText":"","status":0,"controlStatus":0,"createUser":null,"updateBy":null,"createTime":null,"cateName":"测试1","carrierName":"VCD","deadlineName":"十年","dutyName":null,"locateName":null,"ownerName":"zjr"},{"id":28,"lastOperatorTime":"2017-04-19","sort":2,"ownerId":"e20afce4b12511e68bc4507b9dae4454","familyId":6,"pieceNum":"321321","annualNum":"2017","fileCategoryId":null,"fileDeadlineId":null,"fileDutyId":null,"refNum":"231","fileTitle":"3123","produceDate":"2017-04-05","pageNum":21,"fileCarrierId":null,"fileLocateId":null,"fileText":"321312312231","status":1,"controlStatus":1,"createUser":null,"updateBy":null,"createTime":null,"cateName":"测试1","carrierName":"VCD","deadlineName":"二十年","dutyName":"爸爸","locateName":"客厅","ownerName":"zjr"},{"id":28,"lastOperatorTime":"2017-04-19","sort":2,"ownerId":"e20afce4b12511e68bc4507b9dae4454","familyId":6,"pieceNum":"321321","annualNum":"2017","fileCategoryId":null,"fileDeadlineId":null,"fileDutyId":null,"refNum":"231","fileTitle":"3123","produceDate":"2017-04-05","pageNum":21,"fileCarrierId":null,"fileLocateId":null,"fileText":"321312312231","status":1,"controlStatus":1,"createUser":null,"updateBy":null,"createTime":null,"cateName":"测试1","carrierName":"VCD","deadlineName":"二十年","dutyName":"爸爸","locateName":"客厅","ownerName":"zjr"},{"id":28,"lastOperatorTime":"2017-04-19","sort":2,"ownerId":"e20afce4b12511e68bc4507b9dae4454","familyId":6,"pieceNum":"321321","annualNum":"2017","fileCategoryId":null,"fileDeadlineId":null,"fileDutyId":null,"refNum":"231","fileTitle":"3123","produceDate":"2017-04-05","pageNum":21,"fileCarrierId":null,"fileLocateId":null,"fileText":"321312312231","status":1,"controlStatus":1,"createUser":null,"updateBy":null,"createTime":null,"cateName":"测试1","carrierName":"VCD","deadlineName":"二十年","dutyName":"爸爸","locateName":"客厅","ownerName":"zjr"},{"id":28,"lastOperatorTime":"2017-04-19","sort":2,"ownerId":"e20afce4b12511e68bc4507b9dae4454","familyId":6,"pieceNum":"321321","annualNum":"2017","fileCategoryId":null,"fileDeadlineId":null,"fileDutyId":null,"refNum":"231","fileTitle":"3123","produceDate":"2017-04-05","pageNum":21,"fileCarrierId":null,"fileLocateId":null,"fileText":"321312312231","status":1,"controlStatus":1,"createUser":null,"updateBy":null,"createTime":null,"cateName":"测试1","carrierName":"VCD","deadlineName":"二十年","dutyName":"爸爸","locateName":"客厅","ownerName":"zjr"},{"id":28,"lastOperatorTime":"2017-04-19","sort":2,"ownerId":"e20afce4b12511e68bc4507b9dae4454","familyId":6,"pieceNum":"321321","annualNum":"2017","fileCategoryId":null,"fileDeadlineId":null,"fileDutyId":null,"refNum":"231","fileTitle":"3123","produceDate":"2017-04-05","pageNum":21,"fileCarrierId":null,"fileLocateId":null,"fileText":"321312312231","status":1,"controlStatus":1,"createUser":null,"updateBy":null,"createTime":null,"cateName":"测试1","carrierName":"VCD","deadlineName":"二十年","dutyName":"爸爸","locateName":"客厅","ownerName":"zjr"},{"id":28,"lastOperatorTime":"2017-04-19","sort":2,"ownerId":"e20afce4b12511e68bc4507b9dae4454","familyId":6,"pieceNum":"321321","annualNum":"2017","fileCategoryId":null,"fileDeadlineId":null,"fileDutyId":null,"refNum":"231","fileTitle":"3123","produceDate":"2017-04-05","pageNum":21,"fileCarrierId":null,"fileLocateId":null,"fileText":"321312312231","status":1,"controlStatus":1,"createUser":null,"updateBy":null,"createTime":null,"cateName":"测试1","carrierName":"VCD","deadlineName":"二十年","dutyName":"爸爸","locateName":"客厅","ownerName":"zjr"},{"id":28,"lastOperatorTime":"2017-04-19","sort":2,"ownerId":"e20afce4b12511e68bc4507b9dae4454","familyId":6,"pieceNum":"321321","annualNum":"2017","fileCategoryId":null,"fileDeadlineId":null,"fileDutyId":null,"refNum":"231","fileTitle":"3123","produceDate":"2017-04-05","pageNum":21,"fileCarrierId":null,"fileLocateId":null,"fileText":"321312312231","status":1,"controlStatus":1,"createUser":null,"updateBy":null,"createTime":null,"cateName":"测试1","carrierName":"VCD","deadlineName":"二十年","dutyName":"爸爸","locateName":"客厅","ownerName":"zjr"},{"id":28,"lastOperatorTime":"2017-04-19","sort":2,"ownerId":"e20afce4b12511e68bc4507b9dae4454","familyId":6,"pieceNum":"321321","annualNum":"2017","fileCategoryId":null,"fileDeadlineId":null,"fileDutyId":null,"refNum":"231","fileTitle":"3123","produceDate":"2017-04-05","pageNum":21,"fileCarrierId":null,"fileLocateId":null,"fileText":"321312312231","status":1,"controlStatus":1,"createUser":null,"updateBy":null,"createTime":null,"cateName":"测试1","carrierName":"VCD","deadlineName":"二十年","dutyName":"爸爸","locateName":"客厅","ownerName":"zjr"},{"id":28,"lastOperatorTime":"2017-04-19","sort":2,"ownerId":"e20afce4b12511e68bc4507b9dae4454","familyId":6,"pieceNum":"321321","annualNum":"2017","fileCategoryId":null,"fileDeadlineId":null,"fileDutyId":null,"refNum":"231","fileTitle":"3123","produceDate":"2017-04-05","pageNum":21,"fileCarrierId":null,"fileLocateId":null,"fileText":"321312312231","status":1,"controlStatus":1,"createUser":null,"updateBy":null,"createTime":null,"cateName":"测试1","carrierName":"VCD","deadlineName":"二十年","dutyName":"爸爸","locateName":"客厅","ownerName":"zjr"},{"id":28,"lastOperatorTime":"2017-04-19","sort":2,"ownerId":"e20afce4b12511e68bc4507b9dae4454","familyId":6,"pieceNum":"321321","annualNum":"2017","fileCategoryId":null,"fileDeadlineId":null,"fileDutyId":null,"refNum":"231","fileTitle":"3123","produceDate":"2017-04-05","pageNum":21,"fileCarrierId":null,"fileLocateId":null,"fileText":"321312312231","status":1,"controlStatus":1,"createUser":null,"updateBy":null,"createTime":null,"cateName":"测试1","carrierName":"VCD","deadlineName":"二十年","dutyName":"爸爸","locateName":"客厅","ownerName":"zjr"}]},600);
			},
			/**
			 * 获取档案信息
			 * @method
			 * @param {Object} option Ajax参数
			 */
			getArchive: function(option) {
				// ajax(Object.assign({type:'get',url:baseUrl+'/getArchive'},option);
				// 模拟
				mockAjax(option,{"id":14,"lastOperatorTime":"2017-04-19","sort":1,"ownerId":"e20afce4b12511e68bc4507b9dae4454","familyId":6,"pieceNum":"312213","annualNum":"2015","fileCategoryId":null,"fileDeadlineId":null,"fileDutyId":null,"refNum":"","fileTitle":"2","produceDate":null,"pageNum":null,"fileCarrierId":null,"fileLocateId":null,"fileText":"","status":0,"controlStatus":0,"createUser":null,"updateBy":null,"createTime":null,"cateName":"证书类","carrierName":"VCD","deadlineName":"十年","dutyName":null,"locateName":null,"ownerName":"zjr"},0);
			},
			/**
			 * 修改档案信息
			 * @method
			 * @param {Object} option Ajax参数
			 */
			editArchive: function(option) {
				// ajax(Object.assign({type:'post',url:baseUrl+'/editArchive'},option);
				// 模拟
				mockAjax(option,{},0);
			},

		}
	}
}
