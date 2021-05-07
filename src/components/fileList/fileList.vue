<template>
<div class="app-file-list">
	<div class="app-file-list-item" v-for="item,j in list" @click="handleClick(item)">
		<a v-if="!(gallery&&item.src&&item.thumb)" class="app-file-list-item-icon" :class="'app-fileicon-'+matchType(item.ext||item.name.match(/\.(\w+)$/)[1])" :href="item.src||'javascript:;'">
			<img v-if="!!item.thumb" :src="item.thumb" @load="setImgSize">
			<span class="app-fileicon-video-start" v-if="item.thumb&&matchType(item.ext||item.name.match(/\.(\w+)$/)[1])=='video'"></span>
		</a>
    <v-img v-else class="app-file-list-item-icon" :class="'app-fileicon-'+matchType(item.ext||item.name.match(/\.(\w+)$/)[1])" :src="item.src||'javascript:;'" :thumb="item.thumb" :group="'gallery'+hashNum" :title="item.name" @load="setImgSize">
      <span class="app-fileicon-video-start" v-if="item.thumb&&matchType(item.ext||item.name.match(/\.(\w+)$/)[1])=='video'"></span>
    </v-img> 
		<div class="app-file-list-item-name">{{item.name}}</div>
	</div>
</div>
</template>

<script>
/**
 * 文件列表模块
 * @module components/fileList
 * @requires jquery
 * @requires libs/fancybox
 * @param {Array} list 文件data数组
 * @param {Boolean} gallery=true 是否要启用图片查看
 * @example
 *<app-file-list :list="[{name:'文件1.doc',ext:'doc',src:'',thumb:'x.png'}]"></app-file-list>
  //其中name为文件名，ext为扩展名，src为文件链接、原图地址，thumb为缩略图地址
 */
  export default {
 		name: 'app-file-list',
    data:function() {
      return {
      	hashNum:new Date().getTime()
      }
    },
    props:{
    	list:{
    		'type':Array,
    		'default':function(){return []}
    	},
    	gallery:{
    		'type':Boolean,
    		'default':true
    	}
    },
    mounted:function() {
    },
    methods:{
    	handleClick (fileData){
    		this.$emit('click',fileData);
    	},
    	matchType (ext){
    		switch (ext) {
					case 'png': case 'gif': case 'jpg': case 'jpeg': case 'bmp':
						return 'img';
					case 'doc': case 'docx': case 'wps':
						return 'doc';
					case 'ppt': case 'pptx': case 'dps':
						return 'ppt';
					case 'xls': case 'xlsx': case 'et':
						return 'xls';
					case 'pdf':
						return 'pdf';
					case 'txt':
						return 'txt';
					case 'rar': case 'zip':
						return 'rar';
					case '3gp': case 'mp4': case 'ogg': case 'webm': case 'avi': case 'mpv2': case 'mpg': case 'mpe': case 'mpeg': case 'rmvb': case 'rm': case 'asf': case 'divx': case 'wmv': case 'mkv': case 'vob': case 'flv': case 'ogm': case 'qt':
						return 'video';
					default:
						return 'other';
		   	}
    	},
      setImgSize (event){
        event.target.style.height='auto'
        event.target.style.width='auto'
        if (event.target.clientWidth>=event.target.parentNode.clientWidth&&event.target.clientHeight>=event.target.parentNode.clientHeight) {
            if (event.target.clientWidth>event.target.clientHeight) {
                event.target.style.height='100%'
            }else{
                event.target.style.width='100%'
            }
        }
      }
    }
  }
</script>

<style>
.app-file-list:after{content: '';display: block;clear: both;height: 0;visibility: hidden;}
.app-file-list-item{float: left;width: 86px;height: 86px;float: left;margin: 3px;text-align: center;position: relative;}
.app-file-list-item-icon{display: block; position: relative;margin: 5px auto 0;width:56px;height:56px;overflow: hidden;cursor: pointer;background-repeat:no-repeat;background-position:center center;background-image: url(./fileicon-large-default.png);}
.app-file-list-item-icon img{position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%)}
.app-file-list-item-name{ white-space: nowrap; text-overflow: ellipsis; overflow: hidden;word-wrap:normal; margin: 4px 3px 3px; cursor: pointer; font-size: 12px;}

.app-fileicon-other{background-image: url(./fileicon-large-default.png);}
.app-fileicon-doc{background-image: url(./fileicon-large-doc.png);}
.app-fileicon-ppt{background-image: url(./fileicon-large-ppt.png);}
.app-fileicon-xls{background-image: url(./fileicon-large-xls.png);}
.app-fileicon-pdf{background-image: url(./fileicon-large-pdf.png);}
.app-fileicon-txt{background-image: url(./fileicon-large-txt.png);}
.app-fileicon-rar{background-image: url(./fileicon-large-rar.png);}
.app-fileicon-video{background-image: url(./fileicon-large-video.png);}
.app-fileicon-video-start{display: inline-block;position: absolute;top: 0;bottom: 0;left: 0;right: 0;background: url(./fileicon-large-video-overlay.png) no-repeat center center;background-color: rgba(0,0,0,0.4);}
</style>
