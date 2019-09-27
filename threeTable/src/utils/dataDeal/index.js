/*
 * @Author: Huanghao
 * @Date: 2019-09-09 13:22:38
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-23 15:33:49
 * @Description:
 */
// 判断为空
function isEmpty(obj) {
	if (obj == null) return true
	else if (typeof obj === 'number') {
		return false
	} else if (typeof obj === 'string') {
		// 如果为字符串
		if (obj == '') return true
		else return false
	}else if (typeof obj === 'boolean') {
		return false
	}  else if (obj instanceof Array) {
		// 如果为数祖
		if (obj.length == 0) return true
		else return false
	}else if (obj instanceof Date) {
		// 如果为日期
		return false
	}else if (obj instanceof Function) {
		// 如果为函数
		return false
	}else if (obj instanceof RegExp) {
		// 如果为正则表达式
		return false
	} else if (obj instanceof Object) {
		// 如果为对象
		for (var key in obj) {
			return false
		}
		return true
	} else {
		return false
	}
}
//获取对象的一组属性值
function getObjAttrsValue(obj,attrs){
	let str='';
	for (let i = 0; i < attrs.length; i++) {
	  str= str+obj[attrs[i]]+'-'
	}
	console.log('str',str)
	return str
	
}
//判断类型
function isType(data, type) {
    const typeObj = {
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Boolean]': 'boolean',
        '[object Null]': 'null',
        '[object Undefined]': 'undefined',
        '[object Object]': 'object',
        '[object Array]': 'array',
        '[object Function]': 'function',
        '[object Date]': 'date', // Object.prototype.toString.call(new Date())
        '[object RegExp]': 'regExp',
        '[object Map]': 'map',
        '[object Set]': 'set',
        '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
        '[object WeakMap]': 'weakMap',
        '[object Window]': 'window',  // Object.prototype.toString.call(window)
        '[object Error]': 'error', // new Error('1')
        '[object Arguments]': 'arguments',
    }
    let name = Object.prototype.toString.call(data) // 借用Object.prototype.toString()获取数据类型
    let typeName = typeObj[name] || '未知类型' // 匹配数据类型
    return typeName === type // 判断该数据类型是否为传入的类型
}
export default {
	isEmpty,
	getObjAttrsValue,
	isType
}