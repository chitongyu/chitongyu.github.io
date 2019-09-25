<!-- TOC -->

- [各种md符号的使用](#各种md符号的使用)
	- [插件](#插件)
	- [md符号使用](#md符号使用)

<!-- /TOC -->
# 各种md符号的使用
## 插件
1. Markdown TOC（自动填充标题）
2. Markdown Preview Enhanced
## md符号使用
1. 一般符号的使用
**这是加粗的文字**
*这是倾斜的文字*
_这是倾斜的文字_
***这是斜体加粗的文字***
~~这是加删除线的文字~~
2. 引用
>这是引用的内容
>>这是引用的内容
>>这是引用的内容
>>这是引用的内容
   3. 分隔符
---
***
4. 图片
![图片alt](https://raw.githubusercontent.com/hongmaju/light7Local/master/img/productShow/20170518152848.png "图片")
![图片alt](图片地址 ''图片title'')

![程予希](D:\Language\WEB\soft\github\hsq\chitongyu.github.io\app01\src\images\1.jpg "这是程予希")

这里是![wan]

[wan]: https://raw.githubusercontent.com/hongmaju/light7Local/master/img/productShow/20170518152848.png
5. 列表
+ 列表内容
+ 列表内容
+ 列表内容
+ 列表内容

   - 列表内容
   - 列表内容
   - 列表内容
      * 列表内容
      * 列表内容
      * 列表内容

1. 列表内容
2. 列表内容
3. 列表内容
数字和文字用空格隔开

+ 无序列表
   1. 第一行
   2. 第二行
   第一行 文文二位文文二位二位e二位
   第二行 二位二位
   第三行 二位二位
   第四行 二位e
   - 列表2
      * 列表三
	     1. 第一行
		 2. 第二行


6. 表格的使用
   
表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

表头 | 表头 | 表头 
 --- | --- | --- |
第一行|第一行|第一行
第二行|第二行|第二行
第三行|第三行|第三行

| 表头 | 表头 | 表头 |
| --- | --- | --- |
|第一行|第一行|第一行|
|第二行|第二行|第二行|
|第三行|第三行|第三行|

| name | age | sex |
|:-------:|:-------|-------:|
| 第一行 | 第一行 |第一 行|
|  第二行 | 第二行 |第二行 |
|第三行 | 第三行 |第三行 |

 name | age
 --- | ---
 第一行 | 第一行 
 第二行 | 第二行
 第三行 | 第三行 

学号|姓名|分数
-|-|-|
12|小明|78
14|小红|79
13|小绿|80

7. 空格的使用

空格的使用：&nbsp; &nbsp;weweefse  eefse 

8. 链接的使用：
[▲]
[百度]
[程予希](http://www.baidu.com "chenyuxi")

[▲]:#插件
[百度]:www.baidu.com

9. code使用：

`main.js`
```
import Vuex from 'vuex'
Vue.use(Vuex);
var store = new Vuex.Store({
	state: {
		shopList:{}
	},
	mutations: {//中间仓库管理员
		addInfo(state,infoList){
			var flage = false
			state.shopList.some(item => {//shopList已存在该商品
				if(item.id == infoList.id){
					item.id += parseInt(infoList.id)
					flage = true
					return true
				}
			})
			if(!flage){
				state.shopList.push(infoList)
				console.log("添加:",infoList)
			}

		}
	}
})
```
