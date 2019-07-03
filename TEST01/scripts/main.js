//let myHeading = document.querySelector('h1');
//myHeading.textContent = 'Hello world!';
//let myvariable = '李磊';
//  let result = num1 * num2;
  //return result;
//}
let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/程予希.jpg') {
    	myImage.setAttribute('src', 'images/程予希2.jpg');
    }else{
    	myImage.setAttribute('src', 'images/程予希.jpg');
    }
}

let mybutton = document.querySelector('button');
mybutton.onclick = setUserName;

function setUserName(){
	let myname = prompt('请输入你的名字');
	localStorage.setItem('name',myname);
}

function setHeading(name){
	let myheading = document.querySelector('h1');
	myheading.textContent = '程予希酷毙了，' + name + '!';
}

let storedName = localStorage.getItem('name');
if(!storedName){
	setUserName();
}else{
	setHeading(storedName);
}