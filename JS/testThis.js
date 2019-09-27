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
