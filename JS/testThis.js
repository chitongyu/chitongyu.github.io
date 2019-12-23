/*
var baz = 0;
let foo = {
    bar:function() {
        console.log(this,this.baz); 
        return this.baz;
    },
    baz:1
};
let foo2 = {
    baz:2
};

let a = foo.bar();  //作为对象的方法调用，this指向调用函数的对象，即foo
let b = foo.bar.call(foo2); //使用call方法将this绑定到第一个参数对象向，此时，this指向foo2
let fn = foo.bar;
console.log(fn);
let c = fn(); //let fn创建的对象，此时，fn = function(){...}，此时函数执行时，默认指向全局window对象,其本质是undefined只是如果是浏览器会变成window
let d;
(function test(){
  d = arguments[0]()
})(foo.bar);   // arguments.callee包括了一个函数的引用去创建一个arguments对象，它能让一个匿名函数很方便的指向本身，即此时this指向arguments类数组对象
console.log(a,b,c,d);//1 2 undefined undefined
*/

// function f() {
//   console.log('aaa');
// }

// let [x = f()] = [1];

// // console.log(x);
// var obj = {};
// Object.keys(obj);

// var obj = {a: 1, b: 2, c: {a:1}};

// for (var i in obj) {
//   console.log('键名：', i);
//   console.log('键值：', obj[i]);
// }
// console.log('键值：', obj[i].a);
// console.log(obj.toString);

// var multiline = function (fn) {
//   var arr = fn.toString().split('\n');
//   return arr.slice(1, arr.length - 1).join('\n');
// };

// function f() {/*
//   这是一个
//   多行注释
// */}
// console.log(f.toString());
// console.log(multiline(f));

// //局部变量的全局化
// function y() {
//   a = 2;
// }
// // y();
// console.log(a);
// //ReferenceError: a is not defined

// //函数传递方式，数组
// var obj = [1, 2, 3];
// function f(o) {
//   // o = [2, 3, 4];//2、整个替换不会影响
//   o[1] = 3;//1、修改数组的部分，会影响原来的值
// }
// f(obj);
// console.log(obj);

// //数字开头的对象属性只能使用方括号访问
// var obj = {};
// obj['1p'] = 1;
// obj.1p = 1;//报错，这个和数组一样，array[0]
// console.log(obj);

//将类数组转换为真正的数组（一种只有数字键名的对象，且能使用length，因为有一个length键名的键值对）
// var arr = [];
// arr[-1] = 'a';
// arr[Math.pow(2, 32)] = 'b';
// // arr[0] = 1;
// arr[1] = 2;
// arr[2] = 3;
// var newArray = Array.prototype.slice.apply(arr);
// console.log(newArray);


// var value = (console.log('Hi!'), true);
// console.log(value);

// var  obj  =  {  p:  1  };
// console.log(obj.valueOf().toString());


// var obj = {
//   p: 'a'
// };
// console.log(Object.getOwnPropertyDescriptor(obj,'p'));
// Object.seal(obj);
// console.log(Object.getOwnPropertyDescriptor(obj,'p'));

//浅拷贝，拷贝的是对象的引用
// var obj = { a: 1 };
// var oldArray = [obj];

// var newArray = oldArray.concat();

// obj.a = 2;
// console.log(obj);
// console.log(newArray);

// var f = function (n) { return 'a' };
// console.log([1, , 2].map(f));

// map和forEach的区别
// arr = [1,3,4].map(item => {
//   return item + 1
// })
// console.log(arr);

// arr = [1,3,4].forEach(item => {
//   return item + 1
// })
// console.log(arr);

// var arr = ['a', 'b', 'c'];

// arr1 = [1, 2].map(function (e,index,arr) {
//   return this[e];
// }, arr) 
// // ['b', 'c']
// console.log(arr1);

// var a = {
//   b: {
//     m: function() {
//       console.log(this.p);
//     },
//     p: 'Hello'
//   }
// };

// hello() = a.b.m;//不可行，this会指向m，但是没有过属性P,hell0 = a.b ,hello.m

// /lo{2,5}k/.test('looook') // true
// var m = 'abcabc'.match(/(.)b(.)/);
// console.log(m);

//转化为JSON格式,对象。。。
// var user = {
//   firstName: '三',
//   lastName: '张',
//   // full: function() {
//   //   return this.lastName + this.firstName;
//   // },
//   get fullname() {
//     return this.lastName + this.firstName;
//   },
//   set firstname(name) {
//     this.firstname = name;
//   },
//   set lastname(name) {
//     this.lastName = name;
//   }
// };

// console.log(JSON.stringify(user));

//获取对象所有的属性（自身私有和继承的）
// function inheritedPropertyNames(obj) {
//   var props = {};
//   while(obj) {
//     Object.getOwnPropertyNames(obj).forEach(function(p) {
//       props[p] = true;
//     });
//     obj = Object.getPrototypeOf(obj);
//   }
//   return Object.getOwnPropertyNames(props);
// }
// try {
//     adddlert("Welcome guest!");
// }
// catch(err) {
//     console.log(inheritedPropertyNames(err));
// }

// 定义对象
// var obj = {counter : 0};

// 定义 setters
// Object.defineProperty(obj, "reset", {
//   get : function () {this.counter = 0;}
// });
// Object.defineProperty(obj, "increment", {
//   get : function () {this.counter++;}
// });
// Object.defineProperty(obj, "decrement", {
//   get : function () {this.counter--;}
// });
// Object.defineProperty(obj, "add", {
//   set : function (value) {this.counter += value;}
// });
// Object.defineProperty(obj, "subtract", {
//   set : function (value) {this.counter -= value;}
// });

//节流
// function throttle(fn, ms) {
// 	let canRun = true; // 通过闭包保存一个标记
// 	return function () {
// 		if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
// 		canRun = false; // 立即设置为false
// 		setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
// 			fn.apply(this, arguments);
// 			/* 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
// 			当定时器没有执行的时候标记永远是false，在开头被return掉 */
// 			canRun = true;
// 		}, ms);
// 	};
// }


// // 使用例子
// function sayHi(e) {
// 	console.log(e.target.innerWidth, e.target.innerHeight);
// }
// window.addEventListener('resize', throttle(sayHi, 1000));

var text = {"name":"Bill Gates", "birth":32, "city":"Seattle"};
JSON.stringify(text);
console.log(text);

