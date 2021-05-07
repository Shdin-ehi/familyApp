export default  {
	routes: [
		{ path: '/', redirect: '/index' },
	  { path: '/index',name:'index', component:function(resolve) {require(['./views/index'],resolve)} },
	  {
	  	//档案分类
	  	path: '/archives',name:'archives', component:function(resolve) {require(['./views/archives'],resolve)}
	  },{
      //登录
      path: '/login',name:'login', component:function(resolve) {require(['./views/login'],resolve)}
    },{ 
	  	//档案列表
	  	path: '/archives/cate',name:'archivesCate', component:function(resolve) {require(['./views/archivesCate'],resolve)} ,
	  		children:[
	  			{ //档案列表
	  				path: ':cateId',name:'archivesList', components:{
	  					list:function(resolve) {require(['./views/archivesList'],resolve)}
	  				}
			  	}
	  		]
		},{
			//档案编辑
  	 	path: '/archive/:id/:action',name:'archiveEdit', component:function(resolve) {require(['./views/archiveEdit'],resolve)}
  	},{	
	  	//大事件
	  	path: '/bigevent',name:'bigevent', component:function(resolve) {require(['./views/bigevent'],resolve)} 
	  },{
  		//纪念日
  	 	path: '/anniversary',name:'anniversary', component:function(resolve) {require(['./views/anniversary'],resolve)}
  	},{
  		//纪念日页面
  	 	path: '/anniversary/:id',name:'anniversaryPage', component:function(resolve) {require(['./views/anniversaryPage'],resolve)}
  	},{
  		//纪念日编辑
  	 	path: '/anniversary/:id/:action',name:'anniversaryEdit', component:function(resolve) {require(['./views/anniversaryEdit'],resolve)}
  	},{
  		//相册集
  	 	path: '/albums',name:'albums', component:function(resolve) {require(['./views/albums'],resolve)}
  	},{
  		//画廊
  	 	path: '/album/:id',name:'album', component:function(resolve) {require(['./views/album'],resolve)}
  	},{
  		//照片添加
  	 	path: '/album/:id/add',name:'albumAdd', component:function(resolve) {require(['./views/albumAdd'],resolve)}
  	},{
  		//全文检索
  	 	path: '/search',name:'search', component:function(resolve) {require(['./views/search'],resolve)}
  	},{
  		//全文检索结果
  	 	path: '/search/list',name:'searchResult', component:function(resolve) {require(['./views/searchResult'],resolve)}
  	},{
  		//个人中心
  	 	path: '/usercenter/',name:'userCenter', component:function(resolve) {require(['./views/userCenter'],resolve)}
  	},{
  		//个人资料
  	 	path: '/usercenter/data',name:'userData', component:function(resolve) {require(['./views/userData'],resolve)}
  	},{
  		//家庭成员
  	 	path: '/family/',name:'family', component:function(resolve) {require(['./views/family'],resolve)}
  	},{
      //家庭成员信息
      path: '/family/member-:id/',name:'familyMember', component:function(resolve) {require(['./views/familyMember'],resolve)}
    }
	]
}
