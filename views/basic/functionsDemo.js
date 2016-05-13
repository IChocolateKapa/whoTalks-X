/**
 * Created by Echo on 2016/5/11.
 */
/**
 * 定义函数有两种方式：
 * 1， 函数声明式，最常见的 function sayName () {};
 *      这种方式最明显的特征是 函数声明提升。在执行代码前会先读取函数的声明，所以可以调用可以在声明之前。
 * 2， 函数表达式， 即 var sayName = function () {};
 *      这种方式类型常见的变量赋值语句，这里是匿名函数【只要function关键字后面没有跟着一个标识名，就是匿名函数】
 *      这种是跟变量类似的，不能在声明之前进行调用。
 * */
sayName();

function sayName () {
    console.log('sayname')
}

var say2;

// say2()//报错！，TypeError: say2 is not a function

say2 = function () {
    console.log('say2');
};

/**
 * 由此，在程序过程中if条件判断要注意
 * */
function test () {
    var flag = true;
    if (flag) {
        function sayHi () {
            console.log('hi-if')
        }
    } else {
        function sayHi () {
            console.log('hi-else');
        }
    }

    return sayHi;
}
function test2 () {
    var flag = true;
    if (flag) {
        var sayHi = function () {
            console.log('hi-if')
        }
    } else {
        var sayHi = function () {
            console.log('hi-else');
        }
    }

    return sayHi;
}

var ret = test();
ret();//hi-else 原因 是 后面的sayHi覆盖了前面的

var ret2 = test2();
ret2();//hi-if



/*闭包*/
/**
 * 闭包指的是有权访问另一个函数作用域中的变量的函数
 * 本质一个函数A返回另一个函数B，保存在A中作用域的变量不会被销毁，在哪里都能访问到
 * */

//Basket是一个闭包
function Basket () {
    var arr = [];
    function add (n) {
        arr.push(n);
    }
    function empty () {
        arr = [];
    }
    function mapFunc () {
        arr = arr.map(function (item, index, array) {
            return item + '-map';
        });
        return arr;
    }

    function filterFunc () {
        arr = arr.filter(function (item, index, array) {
            return item.indexOf('e') != -1;
        });
        return arr;
    }
    function getArr () {
        return arr;
    }

    return {
        add: add,
        getArr: getArr,
        empty: empty,
        mapFunc: mapFunc,
        filterFunc: filterFunc
    }
}

var basket = Basket();
basket.add(12);
console.log(basket.getArr());//[ 12 ]
basket.add(34);
console.log(basket.getArr());//[ 12, 34 ]
basket.add('echo');
console.log(basket.mapFunc());//[ '12-map', '34-map', 'echo-map' ]
console.log(basket.getArr());//[ '12-map', '34-map', 'echo-map' ]
console.log(basket.filterFunc());//[ 'echo-map' ]

function testFor() {

    for (var i = 0; i < 10; ++i) {
        console.log("i: ", i);
    }
    for (var j = 0; j < 10; j++) {
        console.log("j: ", j);
    }
}

testFor();//结果竟然一样！why??==DUANG~~: 是因为++i或者j++都是在执行完函数体代码之后才执行的相当于
/**
 * var i = 0;
 * while (i < 10) {
 *      console.log(i);
 *      i++; //或者++i;
 * }
 * */