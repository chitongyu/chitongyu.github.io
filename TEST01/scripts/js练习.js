function getdate(){
	document.getElementById("demo").innerHTML=Date();
}

function changeimg(element){
	element.src = element.src.match("2")?"images/程予希.jpg":"images/程予希2.jpg"
}

//不能输入数字
function noNumbers(e){
	var keynum
	var keychar
	var numcheck

	if(window.event) // IE
	{
		keynum = e.keyCode
	}
	else if(e.which) // Netscape/Firefox/Opera
	{
		keynum = e.which
	}
	keychar = String.fromCharCode(keynum)
	numcheck = /\d/
	return !numcheck.test(keychar)
}

for (var i = 0; i < 10; i++) {
    // some code
}


var myObject, myArray;
myObject={
    name: "hahaha ",
    hsk: "en"
};
a = 5;
function myFunction(a, b) {
    //alert(this);
    var a = 4;
    return this.name +this.hsk + a;
}
myArray = [10, 2]
myObject = myFunction.apply(myObject, myArray);       
document.getElementById("demo").innerHTML = myObject;


function myFunction1(a, b) {
    //alert(this);
    //return this.name +this.hsk;
    return this;
}
document.getElementById("demo2").innerHTML = myFunction1(1,2); 

//局部变量计数器
var add = (function () {//只能是function
	    let counter = 0;//函数拥有私有变量变成可能
	    return function () {return counter += 1;}//隐式函数，只自动执行定义一次
	})();
function myFunction3(){
	document.getElementById("demo3").innerHTML = add();
}
var value1 = document.getElementById("demo3").innerHTML;

console.log(value1);