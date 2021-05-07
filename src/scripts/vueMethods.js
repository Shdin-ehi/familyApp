/**
 * vue全局函数
 * @module
 */

export default function(Vue) {
  /**
   * 获取当前错误信息
   * @method matchError
   * @memberof Vue
   * @param  {String} name   表单元素的name
   * @param  {Object} errors 错误信息集合
   * @return {String}        第一个匹配到的当前错误信息
   */
  Vue.prototype.matchError=function(state,name,errors){ 
    var input=state[name];
    if (input&&input.pristine&&input.$error.required) {return ''}
    if (input&&input.$invalid) {
      for(var i in errors){
        if (input.$error[i]) {
          return errors[i]
        }
      }
    }
    return ''
  }

  /**
   * 删除对象内值空或空数组或空对象的属性
   * @method trimObject
   * @memberof Vue
   * @param  {Object} obj 目标对象
   * @param  {Boolean} replace 是否替换原对象,缺省值为false
   * @return {Object}     返回修剪后的对象
   */
  Vue.prototype.trimObject=function(obj,replace){
    var newObj={}
    for(var j in obj){
      if (typeof obj[j]!=='undefined'&&obj[j]!==''&&obj[j]!==null&&!(obj[j] instanceof Array===true&&obj[j].length===0)&&!(typeof obj[j]==='object'&&JSON.stringify(obj[j])==='{}')) {
        Vue.set(newObj,j,obj[j])
      }
    }
    if (replace!==true) {
      return newObj
    }else{
      obj=newObj
      return obj
    }
  }
}
