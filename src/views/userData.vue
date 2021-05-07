<template>
<div class="app-view-container">
  <div class="app-img-title"><img src="../assets/images/title_personaldata.png"></div>
  <vue-form :state="formstate">
    <mu-list class="app-list">
       <mu-list-item title="个人头像" @click="$refs.avatar.click()">
         <div slot="after">
           <mu-avatar :src="user.avatar" slot="leftAvatar"/>
           <input type="file" ref="avatar" accept="image/png,image/jpeg,image/jpg,image/gif,image/bmp" @change="selectFile" style="display:none">
         </div>
         <mu-icon value="chevron_right" slot="right"/>
       </mu-list-item>
       <edit-image :target="img" :width="208" @success="editComplete"></edit-image>
       <mu-divider/>
       <mu-list-item title="用户名" @click="showInput.ipt2=true">
         <div slot="after">
           <my-input-page topTitle="更改用户名" v-model="user.username" :open="showInput.ipt2" @change="dirty=true" @close="showInput.ipt2=false" name="username" :rules="{maxlength:'10',maxLength:10}" :errors="{maxlength:'必须小于10个字符'}"/>
         </div>
         <mu-icon value="chevron_right" slot="right"/>
       </mu-list-item>
       <mu-divider/>
       <mu-list-item title="档案所属号" @click="showInput.ipt3=true">
         <div slot="after">{{user.own}}</div>
       </mu-list-item>
       <mu-divider/>
       <mu-list-item title="家庭角色" @click="showInput.ipt4=true">
         <div slot="after">
           <my-input-page topTitle="更改家庭角色" v-model="user.character" :open="showInput.ipt4" @change="dirty=true" @close="showInput.ipt4=false" name="character" :rules="{maxlength:'10',maxLength:10}" :errors="{maxlength:'必须小于10个字符'}"/>
         </div>
         <mu-icon value="chevron_right" slot="right"/>
       </mu-list-item>
    </mu-list>
     <mu-list class="app-list">
       <mu-list-item title="真实姓名" @click="showInput.ipt5=true">
         <div slot="after">
           <my-input-page topTitle="更改真实姓名" v-model="user.realName" :open="showInput.ipt5" @change="dirty=true" @close="showInput.ipt5=false" name="realName" :rules="{fullname:true}" :errors="{fullname:'请输入正确的姓名'}"/>
         </div>
         <mu-icon value="chevron_right" slot="right"/>
       </mu-list-item>
       <mu-divider/>
       <mu-list-item title="手机号码" @click="showInput.ipt6=true">
         <div slot="after">
           <my-input-page topTitle="更改手机号码" v-model="user.phone" :open="showInput.ipt6" @change="dirty=true" @close="showInput.ipt6=false" name="phone" :rules="{phone:true}" :errors="{phone:'请输入正确的手机号'}"/>
         </div>
         <mu-icon value="chevron_right" slot="right"/>
       </mu-list-item>
       <mu-divider/>
       <mu-list-item title="联系地址" @click="showInput.ipt7=true">
         <div slot="after">
           <my-input-page topTitle="更改联系地址" v-model="user.address" :open="showInput.ipt7" @change="dirty=true" @close="showInput.ipt7=false" name="address" :rules="{maxlength:'20',maxLength:20}" :errors="{maxlength:'必须小于20个字符'}"/>
         </div>
         <mu-icon value="chevron_right" slot="right"/>
       </mu-list-item>
     </mu-list>
    <div class="userdata-btnbar" v-if="dirty"><mu-raised-button label="保存修改" secondary @click="updateData()"/></div>

  </vue-form>
</div>
</template>

<script>
import services from 'services'
import editImage from 'components/editImage'
  export default {
    components:{
      'edit-image':editImage
    },
    data:function() {
      return {
        dirty:false,
        formstate:{},
        showError:false,
        showInput:{},
        user:{id:'',username:'',own:'',avatar:'',character:'',realName:'',phone:'',address:''},
        img:''
      }
    },
    computed:{
    },
    mounted () {
      for (var i=1; i <= 8; i++) {
       this.$set(this.showInput,'ipt'+i,false);
      }
      this.getData()
    },
    beforeRouteUpdate (to,form,next){
      this.getData()
      next()
    },
    methods:{
      getData (){
        //通过cookie或localStorage获取用户信息
        this.user={id:'131',username:'月无缘',own:'xx00409',avatar:'static/demo/demo1.jpg',character:'女儿',realName:'',phone:'',address:'东莞市'}      
      },
      updateData (){
        var vm=this
        if (vm.formstate.$invalid) {
          vm.showError=true
          return
        } 
        vm.setLoading(true)
        //编辑个人信息
        services.UserService.editPersonalData({
          data:vm.user,
          success:(data)=>{
            vm.dirty=false
            vm.showToast ('保存成功！')
          },
          error:()=>{
            vm.showToast ('修改失败，请重试')
          },
          complete:()=>{
            vm.setLoading(false)
          }
        })
      },
      selectFile (e){
        var files = e.target.files || e.dataTransfer.files;  
        if (!files.length) return; 
        this.img=files[0]
        e.target.value=null
      },
      editComplete (url){
        this.dirty=true
        this.user.avatar=url
      },
      setLoading (isLoading){  this.$store.dispatch('setLoading',isLoading) },
      showToast (toastText,time,callback){  this.$store.dispatch('showToast',{toastText,time,callback}) },
      hideToast (){  this.$store.dispatch('hideToast') }
    }
  }
</script>

<style>
.app-user-box{text-align: center;padding: 10px;position: relative;}
.app-user-btn-wr{position: absolute;right:10px;top:10px;}
.app-user-btn{display: inline-block;background-color: #338bc8;font-size: 14px;color: #fff;line-height: 32px;padding: 0 10px;text-align: center;-webkit-tap-highlight-color:rgba(255,255,255,.1)}
.app-user-img-wr{display:block;text-align: center;margin:auto;position: relative;height: 110px;width: 110px;overflow: hidden;border-radius: 50%;border:3px solid #fff;background-color: #fff;-webkit-tap-highlight-color:rgba(255,255,255,.1)}
.app-user-img-wr img{position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%);}
.app-user-name{font-size: 16px;color: #338bc8;padding:5px 0}
.app-user-own{font-size: 13px;color: #666;}

.userdata-btnbar{text-align: center;padding: 10px;}
</style>
