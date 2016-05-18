# 笔记

***

## BOM对象 [Browser Object Model 浏览器对象模型]

### window

### location

#### location.search ==> 返回utl中？问号后面的，或者参数


>> function getQueryStringArgs () {

>>      var search = location.search,

>>         qs = search.length > 0 ? search.substring(1) : '',

>>         args = {};

>>     items = qs.length > 0 ? qs.split(':') : [],

>>     item = null,

>>     name = null,

>>     value = null,

>>     i = 0;

>>     len = items.length;


>>     for (i = 0; i< len; i++) {

>>         item = items[i].split('=');

>>         name = decodeURIComponent(item[0]);

>>         value = decodeURIComponent(item[1]);


>>         if (name.length) {

>>             args[name] = value;

>>         }

>>     }


>>     return args;


>> }



#### location.hash ==> #号后面的，改变此值，不会重载页面

### document

### screen

### navigator

### history


***

## DOM [Document Object Model 文档对象模型]

### 常用的几个小方法

> document.anchors ==> 返回包含文档中所有带name属性的<a>元素

> document.forms ==> 返回包含文档中所有的<form>元素，等同于 document.getElementsByTagName('form')

> document.images ==> 返回包含文档中所有的<img>元素，等同于 document.getElementsByTagName('img')

> document.links ==> 返回文档中所有的带href特性的<a>元素

> doucument.activeElement ==> 返回当前焦点元素，如果没有，是body元素，页面加载期间是null

> document.head || document.getElementsByTagName('head')[0] ==> 获取head元素


### querySelector, querySelectorAll,传入css选择器

> docment.querySelector('.className'); ==>返回第一个匹配的元素

> docment.querySelectorAll('.className'); ==>返回所有匹配的元素的NodeList

> add(), remove(), contains, toggle();参数都是传入类名跟jquery很一样。


### Dom常用操作

#### var domdiv = document.getElementById('div');

> 使用 domdiv.getBoundingClientRect() ==> 返回 {top: x, left: x, bottom: x, right: y, width: x, height: x}//刚刚发现这个好方法

#### 查询

> querySelector等方法在之前已说过，不再表

>  domdiv.firstChild    返回第一个子节点

>  domdiv.lastChild      返回最后一个子节点

>  domdiv.parentNode   返回父节点的对象

> domdiv.nextSibling    返回下一个兄弟节点的对象

> domdiv.previousSibling 返回前一个兄弟节点的对象

#### 添加

> domdiv.appendChild('p'); //把节点插入到父节点的最后

#### 插入

> domdiv.insertBefore(src, dest); //把节点插入到父节点的某个兄弟节点的前面  src： 要插入的节点， dest: 要在domdiv中的dest节点前插入

#### 删除

> domdiv.remove() 删除当前节点

> domdiv.removeChild(p) 删除domdiv中p节点

#### 替换

> domdiv.replaceChild(span, div) 把domdiv里面的div用span替换掉





***



## 文档模式： 标准模式[Standards mode 或者也叫 Strict mode] 怪异模式[Quirks Mode]

### 文档模式决定了可以用哪个级别的css,js中可以使用哪些API，以及如何对待文档类型（doctype）

### document.compatMode可以区分页面渲染模式 -- CSS1Compat[标准]   BackCompat[怪异]

> 标准模式是指，浏览器按W3C标准解析执行代码；怪异模式则是使用浏览器自己的方式解析执行代码，因为不同浏览器解析执行的方式不一样，所以我们称之为怪异模式。浏览器解析时到底使用标准模式还是怪异模式，与你网页中的DTD声明直接相关，DTD声明定义了标准文档的类型（标准模式解析）文档类型，会使浏览器使用相应的方式加载网页并显示，忽略DTD声明,将使网页进入怪异模式(quirks mode)。

> 如果一个网页最上面没有<!DOCTYPE html> 或者 <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 等类似的DTD声明，各家浏览器就会使用各自的解析方式去渲染页面

> 如何设置为怪异模式： 方法一：在页面项部加 <!DOCTYPE HTML PUBLIC “-//W3C//DTD HTML 4.01 Transitional//EN”>； 方法二： 什么也不加

> 如何设置为标准模式：加入以下任意一种：HTML4提供了三种DOCTYPE可选择：


>>  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


>>  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">


>>  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">


### XHTML 1.0最严格模式, 提供了三种DOCTYPE可选择：


>>   (1)过渡型（Transitional ）

>>   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


>>   (2)严格型（Strict ）

>>   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">


>>   (3)框架型（Frameset ）

>>   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">



### 如果你接手的是一个遗留网页，最初并没有DTD声明，并且使用了很多在XHTML中已经废除的标签，那么，我们建议你使用XHTML兼容模式，声明如下：

> <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

> <html xmlns="http://www.w3.org/1999/xhtml">



### 如果要强制使用某种文档模式来渲染页面，设置方法如下：

> <meta http-equiv="X-UA-Compatible" content="IE=n"> 这里的n可以是5,7,8,9等 ，【测试好像没有什么用哇】





***


## Dom0级和Dom2级事件

> var div = document.geetElementById('div');

> Dom0级事件就是div.onclick = function () {};

> Dom2级事件就是 div.addEventListener('click', function () {});  div.attachEvent('onclick', function () {})

> Dom2级事件一出必须传入相同函数名，匿名函数无法移除。removeEventListener, detachEvent

> IE 与 chrome event属性相互对应的：

>> IE下获取event要使用window.event,因IE下event是window对象的一个属性

>> DOM里直接就是event

>> CancleBubble （设置为true） ==> stopPropagation()

>> returnValue (设置为false) ==> preventDefault();

>> srcElement  ==> target


## 事件委托

> 事件委托利用了事件冒泡的原理，让自己的所触发的事件，让他的父元素代替执行


***

## 跨域 -- jsonp, cors

### jsonp的原理是动态添加一个<script>标签，而script标签的src属性是没有跨域的限制的。 GET请求可用

>> 客户端部分：

>>

>>$.ajax({

>>>    url: 'http://跨域的请求url/jsonpAction?jsonpCallback=clientDataHandle&other-params...',

>>>    dataType: 'jsonp',

>>>>    success: function () {

>>>    },

>>>    error: function () {

>>>    }

>> });

>>

>> function clientDataHandle(data) {

>>>    //针对data进行后续的操作，该干啥干啥

>>>    $("#demo").data = data;

>>}

>> 服务器部分， /jsonpAction这个路由中接受到请求后：要返回的是

>>> res.send("clientDataHandle({wantedData: 'xxxx'})")

>> //反正是这么个流程，该请求需要的数据按照参数传进了clientDataHandle函数，

>> // 返回给客户端后，自动执行了这个语句，【就是个正常调用函数的语句】


### CORS 是在服务器端，接受到http请求后，setRequestHeader('Access-Control-Allow-Origin', '*'); *可以换成允许请求的域来源， POST请求可用


### window.name

### window.postMessage();



##http://www.mkyong.com/mongodb/how-to-install-mongodb-on-mac-os-x/


## CSS3画叉号

>> 思路打开,其实就是一根线与另外一根线,搭在一块,旋转一下

> b {display:inline-block; width:12px; height:2px; background:#f00; font-size:0; line-height:0;vertical-align:middle;-webkit-transform: rotate(45deg);}
  
> b:after { content:'.'; display:block; width:12px; height:2px; background:#f00;-webkit-transform: rotate(-90deg);}
