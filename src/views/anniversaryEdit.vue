<template>
  <div class="app-view-container">
    <mu-appbar class="app-popup-topbar" title="添加纪念日">
      <mu-raised-button class="size-s" label="取消" slot="left" @click.native="cancel()"/>
      <mu-raised-button class="size-s" label="确认" slot="right" primary  @click.native="updateData()"/>
    </mu-appbar>
    <div class="app-popup-content">
      <vue-form :state="formstate">
        <mu-list class="app-list">
          <mu-flexbox style="max-width: 500px;margin:auto;padding:10px">
            <mu-flexbox-item :style="itemData.anniversaryType==1?{'border-bottom':'2px solid #1b94d6'}:''" @click.native="itemData.anniversaryType=1">
              <text-img-box title="生日">
                <img src="../assets/images/sign_birthday.png">
              </text-img-box>
            </mu-flexbox-item>
            <mu-flexbox-item :style="itemData.anniversaryType==2?{'border-bottom':'2px solid #1b94d6'}:''" @click.native="itemData.anniversaryType=2">
              <text-img-box title="家庭日">
                <img src="../assets/images/sign_family.png">
              </text-img-box>
            </mu-flexbox-item>
            <mu-flexbox-item :style="itemData.anniversaryType==3?{'border-bottom':'2px solid #1b94d6'}:''" @click.native="itemData.anniversaryType=3">
              <text-img-box title="结婚纪念日">
                <img src="../assets/images/sign_marry.png">
              </text-img-box>
            </mu-flexbox-item>
            <mu-flexbox-item :style="itemData.anniversaryType==4?{'border-bottom':'2px solid #1b94d6'}:''" @click.native="itemData.anniversaryType=4">
              <text-img-box title="其他纪念日">
                <img src="../assets/images/sign_other.png">
              </text-img-box>
            </mu-flexbox-item>
          

          </mu-flexbox>
        </mu-list>
        <mu-list class="app-list">
          <validate>
            <mu-text-field hintText="请输入纪念内容" name="title" v-model="itemData.title" fullWidth :underlineShow="false" class="item-insert" required='required' :errorText="showError?matchError(formstate,'title',{required:'必填'}):''"/>
          </validate>
          <mu-divider/>
          <mu-list-item title="纪念日期" @click="$refs.label_start.click()">
            <label slot="after" ref="label_start" class="datetime-label">{{dateFormat(itemData.start,'YYYY-MM-DD 星期w')}}<mu-icon value="date_range" class="icon_date"/><mu-date-picker class="item-hidden-input" v-model="itemData.start"/></label>
          </mu-list-item>
          <mu-divider/>
          <mu-list-item disableRipple title="农历">
            <label slot="after" class="datetime-label">{{itemData.start&&(lunarObj.IMonthCn+lunarObj.IDayCn)}}<mu-icon value="date_range" class="icon_date" color="#8a8c8f"/></label>
          </mu-list-item>
          <mu-divider/>
          <mu-list-item @click="itemData.tip=!itemData.tip" title="是否提醒">
            <mu-switch v-model="itemData.tip"  slot="right"/>
          </mu-list-item>
          <mu-divider/>
          <mu-list-item title="提醒" @click="showInput.ipt1=true">
            <div slot="after">
              <mu-icon v-if="showError&&formstate.tipTime.$invalid" value="error_outline" color="red" class="app-form-error-icon"/>
              <my-select-page topTitle="提醒时间" v-model="itemData.tipTime" :open="showInput.ipt1" @close="showInput.ipt1=false"  name="tipTime" :rules="{required:'required'}" :errors="{required:'至少选择一项'}" :options="[{label:'一年',nativeValue:'1'},{label:'两年',nativeValue:'2'},{label:'三年',nativeValue:'3'},{label:'五年',nativeValue:'4'},{label:'十年',nativeValue:'5'},{label:'永久',nativeValue:'6'}]"/>
            </div>
            <mu-icon value="chevron_right" slot="right"/>
          </mu-list-item>
          <mu-divider/>
          <mu-list-item @click="itemData.public=!itemData.public" title="开放状态">
            <mu-switch v-model="itemData.public"  slot="right"/>
          </mu-list-item>
        </mu-list>
        <mu-list class="app-list">
          <mu-sub-header>备注</mu-sub-header>
          <mu-text-field hintText="请输入备注" name="remark" v-model="itemData.remark" fullWidth multiLine :underlineShow="false" :rows="2" :rowsMax="5" class="item-insert"/>
        </mu-list>
      </vue-form>
    </div>
  </div>
</template>

<script>
import {dateFormat} from 'scripts/common'
import LunarCalendar from 'scripts/LunarCalendar'
import textImgBox from 'components/textImgBox'
import services from 'services'
export default {
  data () {
    return {
      itemData:{"id":'',"title":"","start":"",'anniversaryType':'1','tip':false,"tipTime":'','remark':'','public':false},
      fileCategorys:[],
      showInput:{},
      formstate:{},
      showError:false
    }
  },
  computed:{
    cateNameList (){
      return this.fileCategorys.map(function(x){return {label:x.name,nativeValue:x.name} })
    },
    lunarObj (){
      return LunarCalendar.solar2lunar(new Date(this.itemData.start).getFullYear(),new Date(this.itemData.start).getMonth()+1,new Date(this.itemData.start).getDate())
    }
  },
  components:{
    "text-img-box":textImgBox
  },
  mounted () {
    for (var i=1; i <= 2; i++) {
     this.$set(this.showInput,'ipt'+i,false);
    }
    this.getData()
  },
  beforeRouteUpdate (to,form,next){
    this.getData();
    next()
  },
  methods: {
    getData (){
      if (this.$route.params.action=='edit') {
        var vm=this
        //获取纪念日信息
        services.AnniversaryService.getAnniversary({
          data:{
            id: vm.$route.params.id
          },
          success:(data)=>{
            vm.itemData=data
            vm.itemData.start=dateFormat(vm.itemData.start,'YYYY-MM-DD')
          }
        })
      }
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
      //更新纪念日信息
      services.AnniversaryService.updateAnniversary({
        data:{
          id: vm.itemData.id,
          val:vm.itemData
        },
        success:(data)=>{
          vm.showToast('保存成功！',600,vm.cancel)
        },
        error:()=>{
          vm.showToast('更新失败，请重试')
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
