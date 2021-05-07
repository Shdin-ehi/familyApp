<template>
<div class="my-select-box">
    <mu-bottom-sheet sheetClass="my-select-box-popup" :open="open" @close="close()" @show="showError=false">
        <vue-form :state="formstate">
            <mu-list class="my-select-box-list">
                <mu-sub-header v-if="topTitle">{{topTitle}}</mu-sub-header>
                <template v-for="option,j in options" v-if="!multiSelect">
                    <mu-divider v-if="j!==0"/>
                    <mu-list-item @click="newValue=option.nativeValue">
                        <validate>
                            <mu-radio :label="option.label" :nativeValue="option.nativeValue" v-model="newValue" v-bind="rules" :name="name?(name+'_clone'):''" />
                        </validate>
                    </mu-list-item>
                </template>
                <template v-for="option,j in options" v-if="multiSelect">
                    <mu-divider v-if="j!==0"/>
                    <mu-list-item @click="checkItem(option)">
                        <validate>
                            <mu-checkbox :label="option.label" :nativeValue="option.nativeValue" v-model="newValue" v-bind="rules" :name="name?(name+'_clone'):''" />
                        </validate>
                    </mu-list-item>
                </template>
            </mu-list>
        </vue-form>
        <div class="my-select-box-error" v-if="showError&&errorText">{{errorText}}</div>
        <div class="my-select-box-btns">
            <mu-raised-button label="确定" @click="updateValue" primary/>
            <mu-raised-button label="取消" @click="close()"/>
        </div>
    </mu-bottom-sheet>
	<div>
		<span v-show="display">{{newLabel instanceof Array===true?newLabel.join(','):newLabel}}</span>
        <input type="hidden" v-model="newValue" :name="name" v-if="isEmptyObj(rules)">
        <validate v-if="!isEmptyObj(rules)">
            <input type="hidden" v-model="newValue" :name="name" v-bind="rules">
        </validate>
	</div>
</div>
</template>

<script>
/**
 * 选值页面模块，支持多选
 * @module components/mySelectPage
 * @requires muse-ui
 * @requires vue-form
 * @param {String} name input的name,若要使用验证,则必填
 * @param {String} value input的value，使用v-model时传入
 * @param {Boolean} open=false 是否弹窗输入层
 * @param {String} topTitle 输入层标题
 * @param {Object} rules 验证规则等(绑定在输入框上)
 * @param {Object|String} errors 匹配验证的错误
 * @param {Object[]} options 供选的值,label为展示值,nativeValue为表单值
 * @param {Boolean} multiSelect=false 是否启用多选，若启用，表单值为数值，如[1,2]
 * @param {Boolean} display=true 是否显示当前选中的显示值
 * @listens close 弹窗关闭时触发 
 * @listens change 表单值确认修改时触发
 * @listens input 用于触发更新v-model
 * @example
 * <my-select-page topTitle="提醒时间" v-model="itemData.tipTime" :open="showInput.ipt1" @close="showInput.ipt1=false"  name="tipTime" :rules="{required:'required'}" :errors="{required:'至少选择一项'}" :options="[{label:'一年',nativeValue:'1'},{label:'两年',nativeValue:'2'},{label:'三年',nativeValue:'3'},{label:'五年',nativeValue:'4'},{label:'十年',nativeValue:'5'},{label:'永久',nativeValue:'6'}]"/>
 */
  export default {
	name: 'my-select-page',
    data:function() {
      return {
      	openState:false,
        newValue:'',
      	showError:false,
        formstate:{}
      }
    },
    props:{
        name:{
            'type':String,
            'default':''
        },
    	value:{
    		'default':''
    	},
    	open:{
    		'type':Boolean,
    		'default':false
    	},
    	topTitle:{
    		'default':'编辑'
    	},
        rules:{
            'type':Object,
            'default':function(){return {}}
        },
    	errors:{
    		'type':[Object,String],
    		'default':function(){return {}}
    	},
    	options:{
    		'type':Array,
    		'default':function(){return []}
    	},
        multiSelect:{
            'type':Boolean,
            'default':false
        },
    	display:{
            //显示选择结果
    		'type':Boolean,
    		'default':true
    	}
    },
    computed:{
    	errorText (){ 
            if (this.name) {
                if (typeof this.errors=='string') return this.errors
                var input=this.formstate[this.name+'_clone']
                var list=this.errors
                if (input&&input.$invalid) {
                    for(var i in list){
                        if (input.$error[i]) {
                            return list[i]
                        }
                    }
                }
            }
	    	return ''
    	},
        newLabel (){
            var rs=[]
            for(var option of this.options){
                if (this.value instanceof Array!==true&&this.value==option.nativeValue) {
                    return option.label
                }else if (this.value instanceof Array==true){
                    if (this.value.filter((val)=>val==option.nativeValue).length!==0)
                        rs.push(option.label)
                }
            }
            return rs
        }
    },
    mounted (){
        if (this.multiSelect) 
            this.newValue=this.value instanceof Array?this.value.concat([]):[]
        else
            this.newValue=this.value||''
    },
    methods:{
    	updateValue (){
    		this.showError=true
	      if (this.name&&this.formstate[this.name+'_clone'].$invalid) { return; }
	      if (this.newValue!==this.value) {
	      	this.$emit('input', this.newValue)
            this.$emit('change', this.newValue)
	      }
    		this.close(true)
    	},
    	close (success){
    		var vm=this
            if(!success){
                if (this.multiSelect) 
                    this.newValue=this.value instanceof Array?this.value.concat([]):[]
                else
                    this.newValue=this.value||''
            }
    		this.showError=false
    		setTimeout(function(){
    			vm.$emit('close')
    		},0)
    	},
        isEmptyObj (o){
            return JSON.stringify(o)=='{}'
        },
        checkItem (option){
            var arr=this.newValue.filter((val)=>val==option.nativeValue)
            if (arr.length===0) {
                this.newValue.push(option.nativeValue)
            }else{
                this.newValue.splice(this.newValue.indexOf(arr[0]),1)
            }
        }
    },
    watch:{
        value:function(newVal,oldVal){
            if (this.multiSelect) 
                this.newValue=this.value instanceof Array?this.value.concat([]):[]
            else
                this.newValue=this.value||''
        }
    }
  }
</script>

<style>
    .my-select-box{display: inline-block;}
    .mu-bottom-sheet.my-select-box-popup{padding: 10px;background-color: #f9f9fa;}
    .my-select-box-list{max-height:290px;overflow: auto;}
    .my-select-box-list::-webkit-scrollbar{width:10px;height:10px;}
    .my-select-box-list::-webkit-scrollbar-button{display:none;}
    .my-select-box-list::-webkit-scrollbar-track{background-color:#000;}
    .my-select-box-list::-webkit-scrollbar-track-piece{background-color:#F5F5F5;}
    .my-select-box-list::-webkit-scrollbar-thumb{margin-right:10px; background-color:#ddd;}
    .my-select-box-list::-webkit-scrollbar-thumb:hover{background-color:#bbb;}
    .my-select-box-list::-webkit-scrollbar-corner{background-color:#999;}
    .my-select-box-list::-webkit-scrollbar-resizer{background-color:#FF6E00;}
    .my-select-box-btns button{float: left;width: 50%;}
    .my-select-box-error{color: #e11;line-height: 26px;font-size: 14px;padding:0 10px}
    .mu-bottom-sheet.my-select-box-popup .mu-sub-header{line-height: 36px}
    .mu-bottom-sheet.my-select-box-popup .mu-item{padding:5px 16px 0 16px;}
</style>
