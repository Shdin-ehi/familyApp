<template>
<div class="my-webuploader">
  <div class="my-webuploader-item">
    <a href="javascript:void(0)" class="picker" ref="picker">
      <i class="icon_add"></i>
    </a>
  </div>
  <template v-for="file in files">
    <div class="my-webuploader-item" @click="file.state!=='success'&&(editing=true)">
      <a href="javascript:void(0)" class="my-webuploader-item-icon" :class="'my-webuploader-item-icon-'+matchType(file.ext||file.name.match(/\.(\w+)$/)[1])">
        <img v-show="file.thumb" :src="file.thumb" alt="" :style="{'-webkit-transform':'rotate('+file.rotation+'deg)','-mos-transform':'rotate('+file.rotation+'deg)','-o-transform':'rotate('+file.rotation+'deg)','transform':'rotate('+file.rotation+'deg)'}">
      </a>
      <div class="my-webuploader-item-name">{{file.name}}</div>
      <div class="my-webuploader-item-btns" :class="{'my-webuploader-item-btns-show':editing&&file.state!=='success'}">
        <a href="javascript:void(0)" class="my-webuploader-item-close" @click.stop="removeFile(file.oFile)" v-show="file.state!='success'"></a>
        <a href="javascript:void(0)" class="my-webuploader-item-rotate-left" @click.stop="rotateFile(file,90)" v-if="rotatable&&matchType(file.ext||file.name.match(/\.(\w+)$/)[1])=='img'&&file.state=='pending'"></a>
        <a href="javascript:void(0)" class="my-webuploader-item-rotate-right" @click.stop="rotateFile(file,-90)" v-if="rotatable&&matchType(file.ext||file.name.match(/\.(\w+)$/)[1])=='img'&&file.state=='pending'"></a>
      </div>
      <span class="my-webuploader-item-error" @click.stop="retry(file.oFile)">{{file.error}}</span>
      <span class="my-webuploader-item-success" v-show="file.state=='success'">上传成功</span>
       <transition name="fadeout">
        <div v-show="!!file.percentage" class="my-webuploader-item-progress"><span class="bar" :style="{'width':file.percentage*100+'%'}"></span></div>
      </transition>
    </div>
  </template>
  <div class="my-webuploader-btn-wrap" v-show="editing">
    <mu-raised-button :label="'退出编辑'" class="exitEditing" fullWidth @click="editing=false"/>
  </div>
  <div class="my-webuploader-btn-wrap" v-show="files.filter((x)=> x.state!=='success').length!==0">
    <mu-raised-button :label="state=='uploading'?'暂停上传':'开始上传'" primary fullWidth @click="upload"/>
  </div>
</div>
</template>

<script>
/**
 * 文件上传模块
 * @module components/myWebuploader
 * @requires jquery
 * @requires WebUploader
 * @requires muse-ui
 * @param {Boolean} rotatable=true 是否开启图片旋转,需后台根据旋转角度参数rotation处理
 * @param {Object} config 验证规则
 * @param {Function} uploadAccept 详见webuploader官网,uploadAccept事件，返回true时触发uploadSuccess，false触发uploadError
 * @listens uploadSuccess 文件上传成功时触发，参数为服务器响应值
 * @listens uploadComplete 文件上传完成后触发，参数为WebUploader的file对象
 * @listens uploadFinished 所有文件上传结束后触发
 * @example
 * <my-webuploader :config="{
          server:'/add',
          accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
          }
        }" @uploadSuccess="uploadSuccess"></my-webuploader>
 */
  export default {
    name: 'my-webuploader',
    data:function() {
      return {
        files:[],
        uploader:null,
        editing:false,
        state:'pending',
        defaultOption:{
          pick:{},
          accept: {
            title: '',
            extensions: 'gif,jpg,jpeg,bmp,png,doc,docx,ppt,pptx,xls,xlsx,wps,dps,et,pdf,txt,rar,zip,3gp,mp4,avi,mpv2,mpg,mpe,mpeg,rmvb,rm,asf,divx,wmv,mkv,vob,flv,ogm,qt',
            mimeTypes: '*'
          },
          thumb: {
            width:98*(window.devicePixelRatio || 1),
            height:98*(window.devicePixelRatio || 1),
            quality:60,
            allowMagnify: true,
            crop: true
          },
          chunked: false,
          server: '',
          fileNumLimit: 7,
          fileSizeLimit: 50 * 1024 * 1024,
          fileSingleSizeLimit: 10 * 1024 * 1024 
        }
      }
    },
    props:{
        rotatable:{
            'type':Boolean,
            'default':true
        },
        config:{
            'type':Object,
            'default':function() {return {} }
        },
        uploadAccept:{
          'type':Function,
          'default':(o,ret)=>ret=='y'||ret=='Y'?true:false
        }
    },
    mounted (){
      var vm=this
      var opt=Object.assign({},this.defaultOption,this.config)
      opt.pick.id=vm.$refs.picker

      require(['jquery'],function(jquery){
        window.$=window.jQuery=jquery
        require(['assets/libs/webuploader'],function(WebUploader){
          vm.uploader = WebUploader.create(opt)
          var uploader=vm.uploader

          // 当有文件添加进来的时候
          uploader.on('fileQueued', function(file) {
            vm.files.push({id:file.id,name:file.name,size:file.size,ext:file.ext,state:'pending',rotation:'0',oFile:file})
            if (file.getStatus() === 'invalid') {
              vm.$set(vm.files.filter((x)=> x.id==file.id)[0],'error',"上传失败");
            } else {
              uploader.makeThumb(file, function(error, src) {
                if (error) {
                  vm.$set(vm.files.filter((x)=> x.id==file.id)[0],'type',vm.matchType(file.ext));
                  return;
                }
                vm.$set(vm.files.filter((x)=> x.id==file.id)[0],'thumb',src);
              });
              file.rotation = 0;
            }
          });


          // 文件上传过程中创建进度条实时显示。
          uploader.on('uploadProgress', function(file, percentage) {
            vm.$set(vm.files.filter((x)=> x.id==file.id)[0],'state',"uploading");
            vm.$set(vm.files.filter((x)=> x.id==file.id)[0],'percentage',percentage);
          });

          uploader.on('uploadBeforeSend', function(o,data,headers) {
            data.rotation=o.file.rotation
            console.log(o)
            console.log(o.blob.source)
          });

          uploader.on('uploadError', function(file) {
            vm.$set(vm.files.filter((x)=> x.id==file.id)[0],'state',"error");
            vm.$set(vm.files.filter((x)=> x.id==file.id)[0],'error',"上传出错，点击此处重试");
          });

          uploader.on('uploadAccept', function(o,ret) {
            return vm.uploadAccept(o,ret)
          });

          uploader.on('uploadSuccess', function(file,response) {
            vm.$set(vm.files.filter((x)=> x.id==file.id)[0],'state',"success");
            vm.$set(vm.files.filter((x)=> x.id==file.id)[0],'error',"");
            vm.$emit('uploadSuccess',file,response)
          });

          uploader.on('uploadComplete', function(file) {
            vm.$set(vm.files.filter((x)=> x.id==file.id)[0],'percentage',100);
            vm.$set(vm.files.filter((x)=> x.id==file.id)[0],'percentage',0);
            vm.$emit('uploadComplete',file)
          });

          uploader.on('uploadFinished', function() {
            vm.$emit('uploadFinished')
          });

          uploader.on('all', function(type) {
            if (type === 'startUpload') {
              vm.state = 'uploading';
            } else if (type === 'stopUpload') {
              vm.state = 'paused';
            } else if (type === 'uploadFinished') {
              vm.state = 'done';
            }
          });

          uploader.on('error',function(code) {
            var txt = '';
            switch (code) {
              case 'F_EXCEED_SIZE':
                txt = '文件太小超过限制';
                break;
              case 'Q_EXCEED_SIZE_LIMIT':
                txt = '总太小超过限制';
                break;
              case 'F_DUPLICATE':
                txt = '已有同名的上传文件';
                break;
              case 'Q_EXCEED_NUM_LIMIT':
                txt = '数量超出限制';
                break;
              case 'Q_TYPE_DENIED':
                txt = '文件类型不支持';
                break;
              default:
                txt = code;
            }
            alert(txt);
          });
        })
      })
        
    },
    methods:{
      matchType:function (ext) {
      //根据后缀名匹配文件图标
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
          case '3gp': case 'mp4': case 'avi': case 'mpv2': case 'mpg': case 'mpe': case 'mpeg': case 'rmvb': case 'rm': case 'asf': case 'divx': case 'wmv': case 'mkv': case 'vob': case 'flv': case 'ogm': case 'qt':
            return 'video';
          default:
            return 'other';
        }
      },
      upload (){
        this.editing=false
         if (this.state === 'uploading') {
          this.uploader.stop();
        } else {
          this.uploader.upload();
        }
      },
      removeFile (file) {
        this.uploader.removeFile(file);
        this.files.splice(this.files.indexOf(this.files.filter((x)=> x.id==file.id)[0]),1)
        if (this.files.filter((x)=> x.state!=='success').length===0) {this.editing=false;}
      },
      rotateFile (file,oldDeg) {
        file.oFile.rotation+=oldDeg
        console.log(file)
        this.$set(this.files.filter((x)=> x.id==file.id)[0],'rotation',file.oFile.rotation);
      },
      retry (file) {
        this.$set(this.files.filter((x)=> x.id==file.id)[0],'error',"");
        this.uploader.retry(file);
      }
    },

    beforeDestroy (){
      this.uploader.destroy()
    }
  }
</script>

<style>
.my-webuploader .picker{-webkit-tap-highlight-color:rgba(0,0,0,.1);display: block;width: 100px;height: 100px; }
.my-webuploader .picker .webuploader-pick{position: absolute;top: 0;bottom: 0;left: 0;right: 0;}
.my-webuploader .picker .webuploader-pick .icon_add{position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%);width: 48px;height: 48px;}
.my-webuploader .picker .webuploader-pick .icon_add:before{content: '';display: inline-block;position: absolute;height: 100%;width: 4px;left: 50%;top: 0;margin-left: -2px;background: #ddd;border-radius:2px}
.my-webuploader .picker .webuploader-pick .icon_add:after{content: '';display: inline-block;position: absolute;width: 100%;height: 4px;top: 50%;left: 0;margin-top: -2px;background: #ddd;border-radius:2px}
.my-webuploader:after{display: block;content: '';visibility: hidden;height: 0;clear: both;}
.my-webuploader-item{width:100px;height: 100px;float: left;margin:6px;position: relative;overflow: hidden;box-sizing:border-box;border:1px solid #e3e3e3;background-color: #fefefe;border-radius: 2px}
.my-webuploader-item-icon{display: block;width: 64px;height: 64px;margin:10px auto 0px auto;position: relative;background-repeat: no-repeat;background-position: center; z-index: 1;}
.my-webuploader-item-icon-img{width: 98px;height: 98px;margin: auto;}
.my-webuploader-item-icon img{height: 100%;width: 100%;}
.my-webuploader-item-icon-other{background-image: url(../fileList/fileicon-large-default.png);}
.my-webuploader-item-icon-doc{background-image: url(../fileList/fileicon-large-doc.png);}
.my-webuploader-item-icon-ppt{background-image: url(../fileList/fileicon-large-ppt.png);}
.my-webuploader-item-icon-xls{background-image: url(../fileList/fileicon-large-xls.png);}
.my-webuploader-item-icon-pdf{background-image: url(../fileList/fileicon-large-pdf.png);}
.my-webuploader-item-icon-txt{background-image: url(../fileList/fileicon-large-txt.png);}
.my-webuploader-item-icon-rar{background-image: url(../fileList/fileicon-large-rar.png);}
.my-webuploader-item-icon-video{background-image: url(../fileList/fileicon-large-video.png);}

.my-webuploader-item-name{position:absolute; bottom: 2px;left: 0;right: 0; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;word-wrap:normal; margin: 4px 3px 3px; cursor: pointer; font-size: 12px;text-align: center;}

.my-webuploader-item-error{position: absolute;bottom: 0;left: 0;right: 0;z-index: 1;color: #fff;font-size: 14px;text-align: center;line-height: 20px;background-color: #ff6e6e;padding: 0 4px}
.my-webuploader-item-success{position: absolute;bottom: 0;left: 0;right: 0;z-index: 1;color: #fff;font-size: 14px;text-align: center;line-height: 20px;background-color: #2bb18c;padding: 0 4px}
.my-webuploader-item-progress{position: absolute;bottom: 0;left: 0;right: 0;z-index: 1;height:10px;background-color: #f9f9f9;border: 1px solid #0288d1;}
.my-webuploader-item-progress .bar{display: block;width: 0;height: 100%;background-color: #50aceb}

.my-webuploader-item-btns a{display: none;-webkit-tap-highlight-color: rgba(255,255,255,.1)}
.my-webuploader-item-btns-show a{display:block;}
.my-webuploader-item-close{position: absolute;z-index: 1;top:0;right: 0;left: 0;height: 50%;background:url(./close.png) center no-repeat rgba(44, 48, 50, 0.68);border-bottom: 1px solid #888;animation: myWebuploaderSlideDown .3s;-webkit-animation:myWebuploaderSlideDown .3s;}
.my-webuploader-item-rotate-left{position: absolute;z-index: 1;top: 50%;left: 0;width: 50%;height: 50%;background:url(./rotateLeft.png) center no-repeat rgba(44, 48, 50, 0.68);border-right: 1px solid #888;animation: myWebuploaderSlideRight .3s;-webkit-animation:myWebuploaderSlideRight .3s;}
.my-webuploader-item-rotate-right{position: absolute;z-index: 1;top: 50%;right: 0;width: 50%;height: 50%;background:url(./rotateRight.png) center no-repeat rgba(44, 48, 50, 0.68);animation: myWebuploaderSlideLeft .3s;-webkit-animation:myWebuploaderSlideLeft .3s;}

.webuploader-container {
  position: relative;
}
.webuploader-element-invisible {
  position: absolute !important;
  clip: rect(1px 1px 1px 1px);
}
.webuploader-pick-hover {
  background: transparent;
}

.webuploader-pick-disable {
  opacity: 0.6;
  pointer-events:none;
}
.my-webuploader-btn-wrap{padding:6px 12px;clear: both;}

.fadeout-enter-active, .fadeout-leave-active {
  -webkit-transition: opacity .8s;
          transition: opacity .8s
}
.fadeout-leave-active {
  opacity: 0
}
@-webkit-keyframes myWebuploaderSlideDown {
  0% {
    -webkit-transform:translate(0,-100%);
            transform:translate(0,-100%);
  }
  100% {
    -webkit-transform:translate(0,0);
            transform:translate(0,0);
  }
}
@keyframes myWebuploaderSlideDown {
  0% {
    -webkit-transform:translate(0,-100%);
            transform:translate(0,-100%);
  }
  100% {
    -webkit-transform:translate(0,0);
            transform:translate(0,0);
  }
}
@-webkit-keyframes myWebuploaderSlideLeft {
  0% {
    -webkit-transform:translate(100%,0);
            transform:translate(100%,0);
  }
  100% {
    -webkit-transform:translate(0,0);
            transform:translate(0,0);
  }
}
@keyframes myWebuploaderSlideLeft {
  0% {
    -webkit-transform:translate(100%,0);
            transform:translate(100%,0);
  }
  100% {
    -webkit-transform:translate(0,0);
            transform:translate(0,0);
  }
}
@-webkit-keyframes myWebuploaderSlideRight {
  0% {
    -webkit-transform:translate(-100%,0);
            transform:translate(-100%,0);
  }
  100% {
    -webkit-transform:translate(0,0);
            transform:translate(0,0);
  }
}
@keyframes myWebuploaderSlideRight {
  0% {
    -webkit-transform:translate(-100%,0);
            transform:translate(-100%,0);
  }
  100% {
    -webkit-transform:translate(0,0);
            transform:translate(0,0);
  }
}
</style>
