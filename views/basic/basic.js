/**
 * Created by Echo on 2016/5/10.
 */

Basic();


/*这种函数定义方法是*/
function Basic () {
    var s = "i'm a girl.";
    /* join() 从数组创建字符串*/
    var ar = s.split('"').reverse().join("");
    console.log(ar);//输出"i'm a girl."
}

var arr1 = [1, , , , , 19];
console.log('arr1[2] = :', arr1[2]);//输出undefined


Array.prototype.in_array = function (ele) {
    var _this = this,
        index = -1;
    for (var i = 0; i < _this.length; i++) {
        if (_this[i] === ele) {
            index = i;
            break;
        }
    }
    return index;
};

/*这种函数定义方式是属于将无名函数赋予一个变量，此变量就变成了对方法的引用，但究根结底还是变量，
* 在作用域中有变量提升的过程，一开始就提升为undefined，如果在方法定义之前调用就会报错
* */
var inArray = function () {
    var arr = [12, '45', 'echo', 28];
    if (-1 != arr.in_array('45')) {
        console.log('found it!');
    } else {
        console.log('not founded it!');
    }
};

inArray();


function BBTest (i) {
    i = 0;
    function Bar () {
        i++;
    }
    function getVal () {
        console.log(i);
    }
    return {
        bar: Bar,
        getVal: getVal
    }
}

for (var j = 0; j < 10; j++) {
    var ret = BBTest(j);
    ret.bar();
    if (j == 9) {
        ret.getVal();
    }
}


var scope = 'global';
function checkScope () {
    scope = 'localCheck';
    console.log('in function, ', scope);//localCheck
    var scope = 'mylocalscope';
    console.log(scope);//mylocalscope
    /**
     * 函数作用域--scope在函数内部
     **/
    /**
     * 函数内部定义或者声明的变量与函数的参数变量
     * 最后才是外部的全局变量
     * 牢记这个准则
     * 函数先提升局部变量，如果参数与局部变量同名，则参数无用
     * */
    /**
     * 函数的作用域链的问题，JS语言设计准则：
     * 所有内部环境都可以沿着作用域链向上访问外部环境，查询变量和函数名，
     * 但是所有外部环境都不能访问内部环境中的任何变量和参数
     * 作用域链的最前端是函数的内部环境，包括参数和局部变量，如果要找的标志在此内部环境中有同名的，就不再向上访问外部的环境了。
     * 也就解释了checkScope3函数执行的结果
     * */
    /**
     * JS中没有块级作用域的概念，表现在if和for语句中定义的变量会自动添加到当前的执行环境中。比如
     * if (a=='12') {
     *  var url = '123456';
     * }
     * console.log(url)//'123456'可以访问到url
     * 再比如：
     * for(var i = 0; i < 10; i++){}
     * 执行完后得到i的值是10,而不是报错
     * */

    /**
     * 基本类型和引用类型：
     * 基本类型就是简单的数据段，浏览器能够明确知道这个值占用内存的字节数，undefined, null, boolen, number, string类型是按值访问的5中基本数据类型，被保存在栈内存中；
     * 引用类型就是包含多个值的对象，object类型和Array类型，因为可能嵌套了很多层，所以不能明确知道所占内存大小，
     * 于是就在堆内存上找一个起点，变量名只是一个指向引用对象的指针
     * 比如 var a = 10; var b = a; b = 20; //此时b=20，a=10
     * var c = {age: 12}; var d = c; d.age = 35; //此时c.age = 35;
     * 简单来说，值类型就是变量的副本，引用就是变量的别名，别名一变，该值所有的引用都会变，
     * 因为引用类型的变量名实际就是一个指针，并不包含实际的值
     * */
    /**
     * JS中所有函数的参数都是按值传递的。
     * 参数是把参数的值复制一份到函数内执行环境中，、
     * 如果参数是基本数值类型，那么函数内部就相当于值的复制进行的后续操作，值改变不会影响外部的值；
     * 如果传递array, object等引用类型作为参数时，函数内部对变量的改变会改变外部的值，尽管如此，不能说这是按照引用来传递参数
     *
     * */
    /**
     * 函数中变量提升至函数入口处，后面的局部scope变量提升至本来是global的scope,这样一开始的global便不再是global变成了局部变量
     * 内部的流程：
     * var scope = 'undefined';
     * scope = 'global';
     * scope = 'mylocalscope';
     * 改变的其实一直是局部变量，所以函数执行完毕后，函数外部的全局scope仍为global
     * */
}
// checkScope();
// console.log('after function checkScope, ', scope);//global
function checkScope2 (scope) {
    scope = 'localCheck';
    console.log('in function 22, ', scope);//localCheck
    var scope = 'localCheck22';
    console.log('in function 22scscs, ', scope);//localCheck22
}

// checkScope2('paramScope');
// console.log('after function checkScope2, ', scope);//global


function checkScope3 (scope) {
    var a = 10;
    var b = a;
    b = 30;
    console.log('a:', a);//10

    var c = {age: 23};
    var d = c;
    d.age = 56;
    console.log(c.age);//56
    scope = [1,2,3,4];
    console.log('in function 33, ', scope);//[1,2,3,4]
}

// checkScope3('paramScope3');
// console.log('after function checkScope3, ', scope);//global


var bsc = 20;
function changeVal(n) {
    n += 40;
    return n;
}
var ret = changeVal(bsc);
console.log(ret);
console.log(bsc);


var person = {name: 'echo'};
function changeObj (obj) {
    obj.name = 'ldl123';
    return obj;
}

function changeObj2 (obj) {
    obj.name = 'ldl123';

    obj = {};
    console.log('obj: ', obj)
    obj.name = 'chocolate';
    console.log('affter -- obj: ', obj)
    return obj;
}


var p1 = changeObj(person);
console.log(p1);//｛。..:ldl123｝
console.log(person);//｛。..:ldl123｝,可以看到person的值也发生了变化，但这并不能说参数按照引用传递



var p2 = changeObj2(person);
console.log(p2);//｛。..:chocolate｝
console.log(person);//｛。..:ldl123｝


var sarr = ['red', 'green', 'red'];
/**
 * 所有对象都具有valueOf(), toString(), toLocaleString()这三个方法
 * */
console.log(sarr.valueOf());
console.log(sarr.toString());
console.log(typeof sarr.toLocaleString());

/*栈方法： pop, push， 数组尾部添加，数组尾部删除*/
/*队列方法： shift, push, 数组尾部添加，数组头部删除*/
/*队列方法： unshift, pop， 数组头部添加，数组尾部删除*/

/*push返回值是数组改变后的长度*/
console.log(sarr.push('yellow'));
/*pop返回的是数组最后一项的值，并且数组把最后一项删掉*/
console.log(sarr.pop('yellow'));

/*shift返回数组第一项，并且数组会删除第一项*/
console.log(sarr.shift());

/*unshift返回数组在头部添加元素后的长度*/
console.log(sarr.unshift('yellow', 'red'));

var numarr = [12, 2, 6, 29, 8];
console.log('slice: ', numarr.slice(-1));//[8]
console.log('slice: ', numarr.slice(-2));//[29, 8]
console.log('slice: ', numarr.slice(-1, 3));//[]
console.log('slice: ', numarr.slice(-1, -1));//[]
console.log('slice: ', numarr.slice(-1, -2));//[]
console.log('slice: ', numarr.slice(-2, -1));//[29]

console.log(numarr.sort());//[ 12, 2, 29, 6, 8 ]
console.log(numarr.sort(function (a, b) {
    return a > b;
}));//返回[ 2, 6, 8, 12, 29 ]
console.log(numarr.sort(function (a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    if (a == b) return 0;
}));//返回[ 2, 6, 8, 12, 29 ],与上面方法等同
/**
 * sort方法内部是按照字符串来比较，数组中每一项都调用toString()方法后进行比较
 * */


/*Test time*/
var myscp = 'regular';
function getScp (myscp) {
    console.log(myscp);//regular
    var myscp;
    console.log(myscp);//regular
}

getScp(myscp);
console.log(typeof getScp);//function
/**
 * 函数被调用时,两轮:初始化变量;执行代码
 * 初始化变量又分为了三个步骤:
 * 1, 声明并且初始化(!!)函数的参数
 * 2,声明局部变量,包括将匿名函数赋给一个局部变量,但是并不(!!)初始化它们
 * 3,声明并初始化函数
 * */

var curDate = new Date();
console.log(curDate.toDateString())//Wed May 11 2016

console.log(curDate.toTimeString())//09:17:24 GMT+0800 (CST)
console.log(curDate.toLocaleDateString())//5/11/2016
console.log(curDate.toLocaleTimeString())//9:17:24 AM
console.log(curDate.toUTCString())//Wed, 11 May 2016 01:17:24 GMT
