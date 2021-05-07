<template>
  <div class="app-view-container">
    <mu-flexbox orient="vertical" :gutter="0" style="min-height:100%">
      <mu-flexbox-item grow="0" class="app-img-title"><img src="../assets/images/title_home.png" style="margin:-5px auto -10px auto"></mu-flexbox-item>
      <mu-flexbox-item class="app-content">
        <app-menunav>
          <app-menunav-item v-for="item,j in items" :to="{name:'album',params:{id:item.id}}" :title="item.title"><div :style="{'height':'100%','width':'100%','border-radius':'50%','background':'#dfeaf1 url('+(item.src||'')+') center center / cover no-repeat'}"></div></app-menunav-item>
          <app-menunav-item title="添加相册" @click.native="popup=true"><img src="../assets/images/add.png" :style="{'height':'100%','width':'100%'}"></app-menunav-item>
        </app-menunav>
      </mu-flexbox-item>
    </mu-flexbox>
    <vue-form :state="formstate">
      <my-input-page v-model="newAlbumName" :open="popup" @close="popup=false" @change="handleAdd"  name='newAlbumName' :rules="{label:'创建新相册',hintText:'请输入相册名称',required:'required', maxlength:'10',maxLength:10}" :errors="{required:'必填项',maxlength:'必须小于10个字符'}" style="display:none"/>
    </vue-form>  
  </div>
</template>

<script>
  import services from 'services'
  export default {
    data:function() {
      return {
        items:[],
        popup:false,
        newAlbumName:'',
        formstate:{}
      }
    },
    mounted: function () {
      this.getData()
    },
    beforeRouteUpdate (to,form,next){
      this.getData()
      next()
    },
    methods: {
      getData (){
        //获取档案信息
        services.FamilyService.getAlbums({
          success:(data)=>{
            this.items=data
          }
        })
      },
      handleAdd (){
        //添加
        this.setLoading(true)
        services.FamilyService.addAlbum({
          data:{name:this.newAlbumName},
          success:(data)=>{
            this.setLoading(false)
            this.newAlbumName=''
            this.getData()
          },
          error:()=>{
            this.setLoading(false)
            this.showToast('添加失败')
          },
          complete:()=>{
            this.popup=false
            this.newAlbumName=''
          }
        })
      },
      setLoading (isLoading){  this.$store.dispatch('setLoading',isLoading) },
      showToast (text,time){  this.$store.dispatch('showToast',{toastText:text,time:time}) },
      hideToast (){  this.$store.dispatch('hideToast') }
    }
  }
</script>

<style>
.popup-bottom{width: 100%;padding: 10px;background: #f6f8f9; }
.popup-bottom:before {content: '';position: absolute;top: 0;bottom: 0;width: 1px;right: 100%;background: #f6f8f9;}
.popup-bottom-btns button{float: left;width: 50%;}
</style>
