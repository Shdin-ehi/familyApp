<template>
  <div class="app-view-container">
    <mu-flexbox orient="vertical" :gutter="0" style="min-height:100%">
      <mu-flexbox-item grow="0" class="app-img-title"><img src="../assets/images/title_home.png" style="margin:-5px auto -10px auto"></mu-flexbox-item>
      <mu-flexbox-item grow="0" class="app-tabs">
        <mu-tabs :value="activeTab" @change="handleTabChange">
          <mu-tab value="0" title="检索"/>
          <mu-tab value="1" title="高级检索"/>
        </mu-tabs>
      </mu-flexbox-item>
      <mu-flexbox-item class="app-content swiper-container" ref="slider">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide>
             <div class="searchbar_wrapper"><mu-text-field hintText="请输入全文名称" fullWidth icon="search" v-model="keyword"/></div>
             <div class="search-type-title">搜索指定文件类型</div>
             <div class="search-type-list">
              <mu-flat-button v-for="item in carriers" :label="item.carrierName" @click="$router.push({name:'searchResult',query:{'carrierId':item.id,keyword:keyword}})" class="demo-flat-button" primary/>
             </div>
          </swiper-slide>
          <swiper-slide>
            <vue-form :state="formstate">
              <mu-list class="app-list search-app-list">
                <validate>
                  <mu-text-field hintText="请输入检索内容" fullWidth class="item-insert" v-model="searchQuery.keyword" name="keyword" :maxlength="10" :errorText="matchError(formstate,'keyword',{maxlength:'必须小于10个字符'})"/>
                </validate>
                <mu-list-item title="全文所属" @click="showInput.ipt1=true">
                  <div slot="after">
                    <my-select-page topTitle="全文所属" v-model="searchQuery.xxx" :open="showInput.ipt1" @close="showInput.ipt1=false" :options="[{label:'不限',nativeValue:''},{label:'xxx',nativeValue:'1'}]"/>
                  </div>
                  <mu-icon value="chevron_right" slot="right"/>
                </mu-list-item>
                <mu-list-item title="档案类别" @click="showInput.ipt2=true">
                  <div slot="after">
                    <my-select-page topTitle="档案类别" v-model="searchQuery.fileCategoryId" :open="showInput.ipt2" @close="showInput.ipt2=false" :options="cateNameList"/>
                  </div>
                  <mu-icon value="chevron_right" slot="right"/>
                </mu-list-item>
                <mu-list-item disableRipple title="档案件号">
                  <div slot="after">
                    <input type="text" v-model="searchQuery.minNum" name="minNum" class="item-half-input">
                    -
                    <input type="text" v-model="searchQuery.maxNum" name="maxNum" class="item-half-input">
                  </div>
                </mu-list-item>
                <mu-list-item disableRipple title="档案日期">
                  <div slot="after">
                    <label slot="after" class="datetime-label item-half-input">{{dateFormat(searchQuery.minYear,'YYYY-MM-DD')}}<mu-icon value="date_range" class="icon_date"/><mu-date-picker class="item-hidden-input" v-model="searchQuery.minYear"/></label> -
                    <label slot="after" class="datetime-label item-half-input">{{dateFormat(searchQuery.maxYear,'YYYY-MM-DD')}}<mu-icon value="date_range" class="icon_date"/><mu-date-picker class="item-hidden-input" v-model="searchQuery.maxYear"/></label>
                  </div>
                </mu-list-item>
                <mu-list-item title="档案期限" @click="showInput.ipt3=true">
                  <div slot="after">
                    <my-select-page topTitle="更改期限" v-model="searchQuery.fileDeadlineId" :open="showInput.ipt3" @close="showInput.ipt3=false" name='fileDeadlineId'  :options="[{label:'不限',nativeValue:''},{label:'一年',nativeValue:'1'},{label:'两年',nativeValue:'2'},{label:'三年',nativeValue:'3'},{label:'五年',nativeValue:'4'},{label:'长期',nativeValue:'5'},{label:'永久',nativeValue:'6'}]"/>
                  </div>
                  <mu-icon value="chevron_right" slot="right"/>
                </mu-list-item>
                <mu-list-item title="档案载体类型" @click="showInput.ipt4=true">
                  <div slot="after">
                    <my-select-page topTitle="更改档案载体类型" v-model="searchQuery.fileCarrierId" :open="showInput.ipt4" @close="showInput.ipt4=false"  :options="carrierNameList"/>
                  </div>
                  <mu-icon value="chevron_right" slot="right"/>
                </mu-list-item>
                <mu-list-item title="档案责任者" @click="showInput.ipt5=true">
                  <div slot="after">
                    <my-select-page topTitle="更改档案责任者" v-model="searchQuery.fileDutyId" :open="showInput.ipt5" @close="showInput.ipt5=false"  :options="dutyNameList"/>
                  </div>
                  <mu-icon value="chevron_right" slot="right"/>
                </mu-list-item>
                <mu-list-item title="档案存放位置" @click="showInput.ipt6=true">
                  <div slot="after">
                    <my-select-page topTitle="更改档案存放位置" v-model="searchQuery.fileLocateId" :open="showInput.ipt6" @close="showInput.ipt6=false"  :options="locateNameList"/>
                  </div>
                  <mu-icon value="chevron_right" slot="right"/>
                </mu-list-item>
                <mu-divider/>
                <div class="search-btnbar"><mu-raised-button label="检索" icon="search" secondary @click="search()"/></div>
              </mu-list>
            </vue-form>
          </swiper-slide>
        </swiper>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>

<script>
import {dateFormat} from 'scripts/common'
import services from 'services'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    data:function() {
      return {
        swiperOption: {
          notNextTick: true,
          autoHeight: false,
          // observeParents:true,
          onSlideChangeStart: (swiper)=>{
            if (this.activeTab!=swiper.activeIndex)
              this.activeTab=swiper.activeIndex+''
          }
        },
        activeTab:'0',
        keyword:'',
        fileCategorys:[],
        carriers:[],
        userlist:[],
        fileLocates:[],
        formstate:{},
        showError:false,
        showInput:{},
        searchQuery:{
          xxx:'',//全文所属
          fileCategoryId:'',//档案类型
          fileDeadlineId:'',//档案期限
          maxNum:'',
          minNum:'',
          maxYear:'',
          minYear:'',
          fileDutyId:'',//档案责任者
          fileLocateId:'',//档案存放位置
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    computed:{
      swiper () {
        return this.$refs.mySwiper.swiper
      },
      cateNameList (){
        var rs=this.fileCategorys.map(function(x){return {label:x.name,nativeValue:x.id+''} })
        rs.unshift({label:'不限',nativeValue:''})
        return rs
      },
      carrierNameList (){
        var rs=this.carriers.map(function(x){return {label:x.carrierName,nativeValue:x.id+''} })
        rs.unshift({label:'不限',nativeValue:''})
        return rs
      },
      dutyNameList (){
        var rs=this.userlist.map(function(x){return {label:x.username,nativeValue:x.id+''} })
        rs.unshift({label:'不限',nativeValue:''})
        return rs
      },
      locateNameList (){
        var rs=this.fileLocates.map(function(x){return {label:x.locateName,nativeValue:x.id+''} })
        rs.unshift({label:'不限',nativeValue:''})
        return rs
      }
    },
    mounted (){
      var vm=this;
      for (var i=1; i <= 8; i++) {
       this.$set(this.showInput,'ipt'+i,false);
      }

      //获取档案类型
      services.ArchiveService.getFileCategorys({
        success:(data)=>{
          vm.fileCategorys=data
        }
      })

      //获取载体类型
      services.ArchiveService.getCarriers({
        success:(data)=>{
          vm.carriers=data
        }
      })
      //获取用户列表
      services.FamilyService.getFamilyMembers({
        success:(data)=>{
          vm.userlist=data
        }
      })
      //获取存放位置列表
      services.ArchiveService.getFileLocates({
        success:(data)=>{
          vm.fileLocates=data
        }
      })
    },
    methods:{
      handleTabChange (val) {
        this.activeTab = val
      },
      dateFormat,
      search (){
        this.showError=true
        if (this.formstate.$invalid) return
        this.$router.push({name:'searchResult',query:this.trimObject(this.searchQuery)})
      }
    },
    watch:{
      activeTab (newVal,oldVal){
        //tab切换
        if (newVal!=this.swiper.activeIndex)
          this.swiper.slideTo(parseInt(newVal))
      }
    }
  }
</script>

<style>
  .searchbar_wrapper{padding-right: 15px;padding-top:10px}
  .search-type-title{padding: 20px;font-size: 14px;color: #888;text-align: center;}
  .search-type-list{padding:10px;text-align: center;}
  .search-type-list button{margin:10px 0}
  .search-btnbar{text-align: center;padding: 10px;}
  .search-app-list{border: 0;overflow: hidden;}
  .search-app-list {border: 0;overflow: hidden;}
</style>
