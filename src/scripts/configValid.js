/**
 * vue-form配置、自定义表单验证类型 文档见{@link https://github.com/fergaldoyle/vue-form}
 * @module
 */
export default {
  validators: {
    //手机号
    'phone': function (value, attrValue, vnode) {
      return value.search(/^(\+86)?1[0-9]{10}$/)!==-1
    },
    //真实名字
    'fullname': function (value, attrValue, vnode) {
      return value.search(/^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/)!==-1
    },
    //非特殊字符串
    'string': function (value, attrValue, vnode) {
      return value.search(/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/)!==-1
    }
  }
}