/** @module */

import axios from 'axios'

/**
 * 封装axios，减少学习成本，参数基本跟jq ajax一致
 * @param {Object} opt  ajax参数
 * @param {String} opt.type=post  请求的类型
 * @param {String} opt.url  请求地址
 * @param {Object} opt.data  请求参数
 * @param {String} opt.time=10000  超时时间
 * @param {String} opt.baseURL=''  主路径
 * @param {String} opt.dataType=json  预期服务器返回的数据类型，xml html json ...
 * @param {Object} opt.headers={'Content-Type':'application/x-www-form-urlencoded'} 自定义请求headers
 * @param {Function} opt.success       请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
 * @param {Function} opt.error     发送请求错误
 * @param {Function} opt.complete     请求完成后调用
 * @param return axios ajax对象
 */
export const ajax = function(opt) {
  var opts = {
    type: 'post',
    data: {},
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    baseURL: '',
    timeout: 10 * 1000,
    responseType: 'json'
  };
  if (!opt.url) {
    return false;
  }
  var options=Object.assign({}, opts, opt);
  options.method=options.type
  delete options.type

  if (options.method.toUpperCase()=='GET') {
    options.params=options.data
    delete options.data
  }else{
    var params = new URLSearchParams();
    for(var i in options.data)
      params.append(i,options.data[i] );
    options.data=params
  }
  axios(options).then(function(res) {
    opt.complete && opt.complete(res, res.data || res.statusText);
    if (res.status == 200) {
      opt.success && opt.success(res.data, res)
    } else {
      opt.error && opt.error(res.statusText);
    }
  }).catch(function(error) {
    opt.complete && opt.complete(error);
    opt.error && opt.error(error);
  });
}

/**
 * 判断日期是否相等
 * @method
 * @param  {String|Object}  date1 时间字符串或日期对象1
 * @param  {String|Object}  date2 时间字符串或日期对象2
 * @return {Boolean}       相等返回true，否则false
 */
export const isEqualDate = function(date1, date2) {
  date1 = new Date(date1)
  date2 = new Date(date2)
    //判断日期是否相等
  return date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate() && date1.getFullYear() === date2.getFullYear()
}

/**
 * 获取第n个月的中文月份显示
 * @method
 * @param  {Number} num 第n个月
 * @return {String}    返回[一月, 二月, 三月, 四月, 五月, 六月, 七月, 八月, 九月, 十月, 十一月, 十二月]对应的月份
 */
export const transformMonth = function(num) {
  var monthLongList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  return monthLongList[num - 1]
}

/**
 * 将日期格式化成自定义的字符串
 * @method
 * @param  {String|Object} date      时间字符串或者date对象
 * @param  {String} formatStr 要格式化成的结果
 * @return {String}           返回格式化的字符串
 * @demo    dateFormat(new Date(),'YYYY-M-D 星期w') => '2017-5-2 星期二'
 * @demo    dateFormat('Sat May 27 2017 11:57:45 GMT+0800 (中国标准时间)','YYYY-MM-DD hh-mm-ss') => '2017-05-27 11:57:45'
 */
export const dateFormat = function(date, formatStr) {
  if (!date) return ''
  date = new Date(date)
  var str = formatStr;
  var Week = ['日', '一', '二', '三', '四', '五', '六'];

  str = str.replace(/yyyy|YYYY/, date.getFullYear());
  str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));

  str = str.replace(/MM/, date.getMonth() > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
  str = str.replace(/M/g, date.getMonth() + 1);

  str = str.replace(/w|W/g, Week[date.getDay()]);

  str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
  str = str.replace(/d|D/g, date.getDate());

  str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
  str = str.replace(/h|H/g, date.getHours());
  str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
  str = str.replace(/m/g, date.getMinutes());

  str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
  str = str.replace(/s|S/g, date.getSeconds());

  return str;
}

/**
 * 通过在图片load事件里注册调用，设置设置图片大小，使得原本大于容器过多的图片大小刚好可以cover住容器
 * @method
 * @param {Object} event 事件默认参数，原生event
 */
export const setImgSize = function(event) {
  event.target.style.height = 'auto'
  event.target.style.width = 'auto'
  if (event.target.clientWidth >= event.target.parentNode.clientWidth && event.target.clientHeight >= event.target.parentNode.clientHeight) {
    if (event.target.clientWidth > event.target.clientHeight) {
      event.target.style.height = '100%'
    } else {
      event.target.style.width = '100%'
    }
  }
}
