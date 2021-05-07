<template>
  <div class="edit-panel" v-show="panel"> 
    <div class="edit-panel-btns">
      <a href="javascript:void(0)" class="edit-panel-crop" @click="crop">确定</a>   
      <a href="javascript:void(0)" @click="cancel">取消</a>   
      <a href="javascript:void(0)" v-if="rotatable" @click="rotate(-90)">左旋转</a>   
      <a href="javascript:void(0)" v-if="rotatable" @click="rotate(90)">右旋转</a> 
    </div> 
    <div>  
      <img class="edit-panel-img" ref="image" :src="url" alt="Picture">  
    </div>    
  </div>  
</template>  
  
<script>  
/**
 * 图片编辑模块
 * @module components/editImage
 * @requires Cropper
 * @param {File|String} target 编辑对象，传入图片url或file对象
 * @param {Boolean} rouneded=false 是否截取圆形内部图片
 * @param {Number} width 裁剪出来生成的图片宽度
 * @param {Number} height 裁剪出来生成的图片高度
 * @param {Object} option Cropper参数，具体见Cropper官网
 * @listens success 裁剪完成后出发，参数为图片URL
 * @example
 * <edit-image :target="img" :width="208" @success="editComplete"></edit-image>
 */
import Cropper from 'cropperjs'  
export default {  
  name:"edit-image",
  data () {  
    return {  
      finalImage:'',  
      cropper:'',  
      croppable:false,  
      panel:false,
      url:''
    }  
  },  
  computed:{
    rotatable (){
      return this.option.rotatable||true
    }
  },
  props:{
    target:{
      'type':[File,String],
      'default':''
    },
    option:{
      'type':Object,
      'default':function() {
        return {}
      }
    },
    rouneded:{
      'type':Boolean,
      'default':false
    },
    width:{
      'type':Number
    },
    height:{
      'type':Number
    },

  },
  mounted () {  
    //初始化这个裁剪框  
    var self = this;  
    var image = self.$refs.image;  
    var defaultOption={  
      aspectRatio: 1,  
      viewMode: 1,  
      background:false,  
      zoomable:false,  
      ready: function () {  
        self.croppable = true;
      }  
    };
    var opt=Object.assign({},defaultOption,self.option)
    this.cropper = new Cropper(image,opt);  
  },
  watch:{
    target (newVal){
      if (!newVal) return
      if (typeof target==='string') {
        this.url = newVal;
      }else{
        this.url = this.getObjectURL(newVal);
      }
    },
    url (newVal){
      if (!this.url) {this.panel=false;return}
     //每次替换图片要重新得到新的url  
      if(this.cropper){  
        this.cropper.replace(this.url);  
      }  
      this.panel = true; 
    }
  },
  methods: {  
    getObjectURL (file) {  
      var url = null ;   
      if (window.createObjectURL!=undefined) { // basic  
        url = window.createObjectURL(file) ;  
      } else if (window.URL!=undefined) { // mozilla(firefox)  
        url = window.URL.createObjectURL(file) ;  
      } else if (window.webkitURL!=undefined) { // webkit or chrome  
        url = window.webkitURL.createObjectURL(file) ;  
      }  
      return url ;  
    },  
    rotate (deg){
      this.cropper.rotate(deg); 
    },
    crop () {  
        this.panel = false;  
        var croppedCanvas;
  
        if (!this.croppable) {  
          return;  
        }   
        // Crop  
        var opt={};
        if (this.height) {opt.height=this.height}
        if (this.width) {opt.width=this.width}
        croppedCanvas = this.cropper.getCroppedCanvas(opt);  
        
        if (this.rouneded) {
          this.finalImage = this.getRoundedCanvas(croppedCanvas).toDataURL();  
        }else{
          this.finalImage = croppedCanvas.toDataURL(); 
        }
        this.url=''
        this.$emit('success',this.finalImage)  
          
    },  
    cancel (){ 
        this.url='' 
    },
    getRoundedCanvas (sourceCanvas) {  
      var canvas = document.createElement('canvas');  
      var context = canvas.getContext('2d');  
      var width = sourceCanvas.width;  
      var height = sourceCanvas.height;  
        
      canvas.width = width;  
      canvas.height = height;  
  
      context.imageSmoothingEnabled = true;  
      context.drawImage(sourceCanvas, 0, 0, width, height);  
      context.globalCompositeOperation = 'destination-in';  
      context.beginPath();  
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);  
      context.fill();  
  
      return canvas;  
    }
  },
  beforeDestroy (){
    this.cropper.destroy()
  }
}  
</script>  
  
<style>  
.edit-panel {z-index: 99;position: fixed;padding-top: 60px;left: 0;top: 0;right: 0;bottom: 0;background:#151516;  } 
.edit-panel-btns{position: absolute;top:12px;left:15px;right:15px;} 
.edit-panel-btns a {padding:0 15px;height:36px;line-height:36px; border:none;border-radius: 5px;background:#4c4c4d;font-size: 14px;float: left;margin-right: 10px;-webkit-tap-highlight-color:rgba(0,0,0,.1);color: #fff}   
.edit-panel .edit-panel-crop{float: right;margin-right: 0;background: #1c5792;color: #fff} 
.edit-panel-img {  max-width: 100%;  } 

.cropper-view-box,.cropper-face {  border-radius: 50%;  }  

.cropper-container {font-size: 0; line-height: 0; position: relative; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;  user-select: none; direction: ltr; -ms-touch-action: none;   touch-action: none  }  
.cropper-container img { display: block; min-width: 0 !important; max-width: none !important; min-height: 0 !important; max-height: none !important; width: 100%; height: 100%; image-orientation: 0deg  }
.cropper-wrap-box,  
.cropper-canvas,  
.cropper-drag-box,  
.cropper-crop-box,  
.cropper-modal { position: absolute; top: 0; right: 0; bottom: 0; left: 0;  }
.cropper-wrap-box { overflow: hidden;  }
.cropper-drag-box { opacity: 0; background-color: #fff;  }
.cropper-modal { opacity: .5; background-color: #000;  }
.cropper-view-box { display: block; overflow: hidden; width: 100%;  
  height: 100%; outline: 1px solid #39f;  
  outline-color: rgba(51, 153, 255, 0.75);  } 
.cropper-dashed {position: absolute; display: block; opacity: .5;border: 0 dashed #eee  } 
.cropper-dashed.dashed-h {top: 33.33333%;left: 0;width: 100%;height: 33.33333%;border-top-width: 1px;border-bottom-width: 1px  } 
.cropper-dashed.dashed-v {top: 0;left: 33.33333%;width: 33.33333%;height: 100%;border-right-width: 1px;border-left-width: 1px  } 
.cropper-center {position: absolute;top: 50%;left: 50%; display: block; width: 0;height: 0; opacity: .75  } 
.cropper-center:before,.cropper-center:after {position: absolute;display: block;content: ' ';background-color: #eee  } 
.cropper-center:before {top: 0;left: -3px;width: 7px;height: 1px  } 
.cropper-center:after {top: -3px;left: 0;width: 1px;height: 7px  } 
.cropper-face,  
.cropper-line,  
.cropper-point {position: absolute; display: block; width: 100%;height: 100%; opacity: .1;  } 
.cropper-face {top: 0;left: 0; background-color: #fff;  } 
.cropper-line {background-color: #39f  } 
.cropper-line.line-e {top: 0;right: -3px;width: 5px;cursor: e-resize  } 
.cropper-line.line-n {top: -3px;left: 0;height: 5px;cursor: n-resize  } 
.cropper-line.line-w {top: 0;left: -3px;width: 5px;cursor: w-resize  } 
.cropper-line.line-s {bottom: -3px;left: 0;height: 5px;cursor: s-resize  } 
.cropper-point {width: 5px;height: 5px; opacity: .75;background-color: #39f  } 
.cropper-point.point-e {top: 50%;right: -3px;margin-top: -3px;cursor: e-resize  } 
.cropper-point.point-n {top: -3px;left: 50%;margin-left: -3px;cursor: n-resize  } 
.cropper-point.point-w {top: 50%;left: -3px;margin-top: -3px;cursor: w-resize  } 
.cropper-point.point-s {bottom: -3px;left: 50%;margin-left: -3px;cursor: s-resize  } 
.cropper-point.point-ne {top: -3px;right: -3px;cursor: ne-resize  } 
.cropper-point.point-nw {top: -3px;left: -3px;cursor: nw-resize  } 
.cropper-point.point-sw {bottom: -3px;left: -3px;cursor: sw-resize  } 
.cropper-point.point-se {right: -3px;bottom: -3px;width: 20px;height: 20px;cursor: se-resize;opacity: 1  } 
@media (min-width: 768px) { .cropper-point.point-se {  width: 15px;  height: 15px}  } 
@media (min-width: 992px) { .cropper-point.point-se {  width: 10px;  height: 10px}  } 
@media (min-width: 1200px) { .cropper-point.point-se {  width: 5px;  height: 5px;  opacity: .75}  }
.cropper-point.point-se:before {position: absolute;right: -50%;bottom: -50%;display: block;width: 200%;height: 200%;content: ' ';opacity: 0;background-color: #39f  } 
.cropper-invisible {opacity: 0;  } 
.cropper-bg {background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');  } 
.cropper-hide {position: absolute; display: block; width: 0;height: 0;  } 
.cropper-hidden {display: none !important;  } 
.cropper-move {cursor: move;  } 
.cropper-crop {cursor: crosshair;  } 
.cropper-disabled .cropper-drag-box,  
.cropper-disabled .cropper-face,  
.cropper-disabled .cropper-line,  
.cropper-disabled .cropper-point {cursor: not-allowed;  }
</style>  