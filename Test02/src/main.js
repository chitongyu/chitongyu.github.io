import $ from 'jquery'//webpack 只能默认处理js文件
import './css/index.css'//使用loader来处理css文件
import 'bootstrap/dist/css/bootstrap.css'
import { execFileSync } from 'child_process';
console.log('okkkk')
$(function(){
    $('li:odd').css('backgroundColor','lightblue')
    $('li:even').css('backgroundColor',function(){
        return '#'+'FFCE44'
    })

})

class Ferson {//类一般使用首字母大写来区分
    static inf = {name: 'zx',age: 20}
}

var p1 = new Ferson()