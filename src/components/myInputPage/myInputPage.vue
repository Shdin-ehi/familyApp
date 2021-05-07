<template>
<div class="my-input-box">
    <mu-bottom-sheet sheetClass="my-input-box-popup" :open="open" @close="close()" @show="showError=false,focusInput()">
        <vue-form :state="formstate">
            <validate>
                <mu-text-field ref="input" fullWidth multiLine :rows="3" :rowsMax="8" v-model="newValue" v-bind="rules" :label="rules.label||topTitle" :errorText="showError?errorText:''" :name="name?(name+'_clone'):''"/>
            </validate>
        </vue-form>
        <div class="my-input-box-btns">
            <mu-raised-button label="确定" @click="updateValue" primary/>
            <mu-raised-button label="取消" @click="close()"/>
        </div>
    </mu-bottom-sheet>
    <div>
        <span v-show="display">{{value}}</span>
        <input type="hidden" v-model="newValue" :name="name" v-if="isEmptyObj(rules)">
        <validate v-if="!isEmptyObj(rules)">
            <input type="hidden" v-model="newValue" :name="name" v-bind="rules">
        </validate>
    </div>
</div>
</template>

<script>
/**
 * input输入页面模块
 * @module components/myInputPage
 * @requires muse-ui
 * @requires vue-form
 * @param {String} name input的name,若要使用验证,则必填
 * @param {String} value input的value，使用v-model时传入
 * @param {Boolean} open=false 是否弹窗输入层
 * @param {String} topTitle 输入层标题
 * @param {Object} rules 验证规则
 * @param {Object|String} errors 匹配验证的错误
 * @param {Boolean} display=true 是否显示当前值
 * @listens close 弹窗关闭时触发 
 * @listens change 表单值确认修改时触发
 * @listens input 用于触发更新v-model
 * @example
 * <my-input-page topTitle="更改名称" v-model="itemData.name" :open="showInput.ipt4" @close="showInput.ipt4=false"  name='locateName' :rules="{required:'required', maxlength:'10',maxLength:10}" :errors="{required:'必填项',maxlength:'必须小于10个字符'}"/>
 */
  export default {
 		name: 'my-input-page',
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
      			var input=this.formstate[this.name+'_clone'];
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
    	}
    },
    mounted (){
  		this.newValue=this.value||''
    },
    methods:{
    	updateValue (){
    		this.showError=true
    		var formattedValue = this.newValue.trim()
	      if (formattedValue !== this.newValue)
	        this.newValue = formattedValue
	      if (this.name&&this.formstate[this.name+'_clone'].$invalid) { return; }
	      if (formattedValue!==this.value) {
            this.$emit('input', formattedValue)
	      	this.$emit('change', formattedValue)
	      }
    		this.close(true)
    	},
    	close (success){
    		var vm=this
            !success&&(this.newValue = this.value||'')
    		this.showError=false
    		setTimeout(function(){
    			vm.$emit('close')
    		},0)
    	},
	    focusInput (){
	    	this.$refs.input.$el.querySelector('textarea').focus()
	    },
        isEmptyObj (o){
            return JSON.stringify(o)=='{}'
        }
    },
    watch:{
        value:function(newVal,oldVal){
            this.newValue=newVal||''
        }
    }
  }
</script>

<style>
    .my-input-box{display: inline-block;}
    .mu-bottom-sheet.my-input-box-popup{padding: 10px;background-color: #f9f9fa;}
    .my-input-box-btns button{float: left;width: 50%;}
</style>
