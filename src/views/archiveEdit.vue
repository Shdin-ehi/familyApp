<template>
  <div class="app-view-container">
    <mu-appbar class="app-popup-topbar" title="详情">
      <mu-raised-button class="size-s" label="取消" @click.native="cancel()" slot="left"/>
      <mu-raised-button class="size-s" label="确认" primary  @click.native="updateData()" slot="right"/>
    </mu-appbar>
    <div class="app-popup-content">
      <vue-form :state="formstate">
        <mu-list class="app-list">
          <mu-sub-header>{{itemData.fileTitle}}</mu-sub-header>
          <mu-divider/>
          <mu-list-item title="日期" @click="$refs.label_lastOperatorTime.click()">
            <label slot="after" ref="label_lastOperatorTime" class="datetime-label">{{dateFormat(itemData.lastOperatorTime,'YYYY-MM-DD 星期w')}}<mu-icon value="date_range" class="icon_date"/><mu-date-picker class="item-hidden-input" v-model="itemData.lastOperatorTime"/></label>
          </mu-list-item>
          <mu-divider/>
          <mu-list-item title="档案类别" @click="showInput.ipt1=true">
            <div slot="after">
              <mu-icon v-if="showError&&formstate.fileCategoryId.$invalid" value="error_outline" color="red" class="app-form-error-icon"/>
              <my-select-page topTitle="更改档案类别" v-model="itemData.fileCategoryId" :open="showInput.ipt1" @close="showInput.ipt1=false" name='fileCategoryId' :rules="{required:'required'}" :errors="{required:'至少选择一项'}" :options="cateNameList"/>
            </div>
            <mu-icon value="chevron_right" slot="right"/>
          </mu-list-item>
          <mu-divider/>
          <mu-list-item title="期限" @click="showInput.ipt2=true">
            <div slot="after">
              <mu-icon v-if="showError&&formstate.fileDeadlineId.$invalid" value="error_outline" color="red" class="app-form-error-icon"/>
              <my-select-page topTitle="更改期限" v-model="itemData.fileDeadlineId" :open="showInput.ipt2" @close="showInput.ipt2=false" name='fileDeadlineId' :rules="{required:'required'}" :errors="{required:'至少选择一项'}" :options="[{label:'一年',nativeValue:'1'},{label:'两年',nativeValue:'2'},{label:'三年',nativeValue:'3'},{label:'五年',nativeValue:'4'},{label:'长期',nativeValue:'5'},{label:'永久',nativeValue:'6'}]"/>
            </div>
            <mu-icon value="chevron_right" slot="right"/>
          </mu-list-item>
          <mu-divider/>
          <mu-list-item @click="public=!public" title="是否公开">
            <mu-switch v-model="public"  slot="right"/>
          </mu-list-item>
        </mu-list>
        <mu-list class="app-list">
          <mu-list-item title="件号" @click="showInput.ipt4=true">
            <div slot="after">
              <mu-icon v-if="showError&&formstate.locateName.$invalid" value="error_outline" color="red" class="app-form-error-icon"/>
              <my-input-page topTitle="更改件号" v-model="itemData.locateName" :open="showInput.ipt4" @close="showInput.ipt4=false"  name='locateName' :rules="{hintText:'请输入件号',required:'required', maxlength:'10',maxLength:10}" :errors="{required:'必填项',maxlength:'必须小于10个字符'}"/>
            </div>
            <mu-icon value="chevron_right" slot="right"/>
          </mu-list-item>
        </mu-list>
        <mu-list class="app-list">
          <mu-sub-header>备注</mu-sub-header>
          <validate>
            <mu-text-field hintText="请输入备注" fullWidth multiLine :underlineShow="false" :rows="2" :rowsMax="5" class="item-insert" v-model="itemData.deadlineName" name="note" :maxlength="10" :errorText="matchError(formstate,'note',{maxlength:'必须小于10个字符'})"/>
          </validate>
        </mu-list>
      </vue-form>
    </div>
  </div>
</template>

<script>
import {dateFormat} from 'scripts/common'
import services from 'services'
export default {
  data () {
    return {
      itemData:{"id":'',"lastOperatorTime":"","sort":'',"ownerId":"","familyId":'',"pieceNum":"","annualNum":"","fileCategoryId":'',"fileDeadlineId":'',"fileDutyId":'',"refNum":"","fileTitle":"","produceDate":null,"pageNum":null,"fileCarrierId":null,"fileLocateId":null,"fileText":"","status":0,"controlStatus":0,"createUser":null,"updateBy":null,"createTime":null,"cateName":null,"carrierName":null,"deadlineName":null,"dutyName":null,"locateName":null,"ownerName":null},
      fileCategorys:[],
      public:false,
      showInput:{},
      formstate:{},
      showError:false
    }
  },
  computed:{
    cateNameList (){
      return this.fileCategorys.map(function(x){return {label:x.name,nativeValue:x.id+''} })
    }
  },
  mounted () {
    for (var i=1; i <= 10; i++) {
     this.$set(this.showInput,'ipt'+i,false);
    }
    this.getData();
  },
  beforeRouteUpdate (to,form,next){
    this.getData();
    next()
  },
  methods: {
    getData (){
      if (this.$route.params.action=='edit') {
        //获取档案信息
        services.ArchiveService.getArchive({
          data:{id:this.$route.params.id},
          success:(data)=>{
            this.itemData=data
          }
        })
      }
      //获取档案类型列表
      services.ArchiveService.getFileCategorys({
        success:(data)=>{
          this.fileCategorys=data
        }
      })
    },
    cancel (){
      this.$root.$router.back()
    },
    updateData (){
      var vm=this
      if (vm.formstate.$invalid) {
        vm.showError=true
        return
      }
      vm.setLoading(true)
      //修改档案
      services.ArchiveService.editArchive({
        data:vm.itemData,
        success:(data)=>{
          vm.showToast ('保存成功！',1200,vm.cancel)
        },
        error:()=>{
          vm.showToast ('更新失败，请重新保存！',2500)
        },
        complete:()=>{
          vm.setLoading(false)
        }
      })
    },
    dateFormat,
    setLoading (isLoading){  this.$store.dispatch('setLoading',isLoading) },
    showToast (toastText,time,callback){  this.$store.dispatch('showToast',{toastText,time,callback}) },
    hideToast (){  this.$store.dispatch('hideToast') }
  }
}
</script>

<style>
</style>
