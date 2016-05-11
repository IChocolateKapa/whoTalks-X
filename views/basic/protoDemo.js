/**
 * Created by Echo on 2016/5/11.
 */

/*原型模式*/
function Person () {};
Person.prototype.name = 'Echo';
Person.prototype.sayName = function () {
    console.log(this.name);
};
var person = new Person();
person.sayName();

/*构造函数模式*/
function Animal (name, food, age) {
    this.name = name;
    this.food = food;
    this.age = age;
    this.gender = 'female';
    this.getInfo = function () {
        console.log('name: ', name, ' eat ', food, ', aged ', age);
        console.log('this this name: ', this.name, ' eat ', this.food, ', aged ', this.age);
    }
}


var bird = new Animal('parrot', 'nuts', '10');
bird.getInfo();
var pig = new Animal('pig', 'grass', '3');
pig.getInfo();
/*错误示范*/
function SuperAnimal (name, food, age) {
    this.meme = 'meme';
}
SuperAnimal.prototype = new Animal();//'ssss', 'sssfood', 'sssage'
SuperAnimal.prototype.check = function () {
    // return this.name;
}
SuperAnimal.prototype.name = 'Eecho';
var ssani = new SuperAnimal('ssss', 'sssfood', 'sssage');
console.log('ccccccc: ', ssani.check());
console.log('cc12333: ', SuperAnimal.prototype);
console.log('meme: ', ssani.meme);
/**
 * 原型是一个对象， prototype是对象，可以自由的添加属性值和方法。
 * */
/*
function Food(name, taste) {
}
Food.prototype = {
    name: this.name,
    taste: this.taste
};
var fd = new Food('fish', 'xingqi');
/!*相当于给对象添加属性方法*!/
Food.prototype.printInfo = function () {
    console.log(this.name, 'tastes ', this.taste);
};
fd.printInfo();////undefined 'tastes ' undefined
console.log(fd.name);//undefined

/!*重写原型方法，就跟普通的对象一样的*!/
Food.prototype = {
    names: this.name,
    tas: this.taste
};

console.log(fd.name);//undefined
console.log(fd.names);//undefined

/!**
 * 在原型中查找值是一次沿着原型链向上查找的过程，所以即便先创建了实例，后来又为原型增加了方法，实例也一样能访问该方法。
 * 但如果先创建了实例，后又重写了原型对象，实例就无法访问到新的原型属性和方法了。
 * 创建实例时，实例名字是一个指向最初原型的指针，指向最初原型在堆内存中的位置，
 * 如果重写了整个原型对象，堆内存会重新分配一个位置，之前创建的实例名字指向的仍然是之前的最初原型对象，与新的原型对象直接就没有任何关系了。
 * *!/
console.log(Array.prototype.sort.toLocaleString())*/

console.log(Object.prototype)

function SuperFunc () {
    this.colors = ['red', 'green', 'yellow'];
    this.age = 12;
}
function SubFunc () {}

SubFunc.prototype = new SuperFunc();

var s1 = new SubFunc();
s1.colors.unshift('blue');
s1.age = 45;
var s2 = new SubFunc();

console.log(s2.colors)//[ 'blue', 'red', 'green', 'yellow' ]
console.log(s2.age)//12
//使用 SubFunc.prototype = new SuperFunc(); 这种方式进行继承的情况 继承了父类后的引用类型，其所有的实例共享属性和方法，如果某个实例对某个引用类型的属性进行修改，其它实例的该属性也会相应变化
//如果某个实例对某个基本类型的属性进行修改，则其他属性不受影响。
/**
 * 如果想要每一个继承的实例都拥有父级原本的属性，而不受其它实例修改的影响，应该用如下方法
 * */
function SubFunc2() {
    /*每次初始化继承体实例时，都会重新调用SuperFunc创建一个新的*/
    SuperFunc.call(this);
    this.sl = [1,2,3];
}
var s3 = new SubFunc2();
s3.colors.push('pink');
s3.sl.push('4');
console.log(s3.colors);//[ 'red', 'green', 'yellow', 'pink' ]
console.log(s3.sl);//[ 1，2，3，4]
var s4 = new SubFunc2();
console.log(s4.colors);//[ 'red', 'green', 'yellow' ]
console.log(s4.sl);//[ 1，2，3]

/**
 * call(), apply()方法都是把函数绑定到当前对象的方法，区别在于参数的传递不同
 * call(thisArg[, arg1, arg2,...])
 * apply(thisArg, []);
 * call()的参数是根据绑定的对象要传递的参数格式，有几个传几个
 * apply()第二个参数必须是数组，也可以是arguments
 * */

function SuperFuncOO (gender) {
    this.colors = ['red', 'green', 'yellow'];
    this.age = 12;
    this.gender = gender;
    this.name = 'superName';
}

function SubFunc3 (name, gender) {
    SuperFuncOO.apply(this, [gender]);
    this.name = name;
}
function SubFunc4 (name, gender) {
    SuperFuncOO.call(this, gender);
    this.name = name;
}

var su3 = new SubFunc3('echo', 'female');
console.log(su3.gender);//female
console.log(su3.name);//echo 原型链在当前原型对象中找到了属性，就不必再向上寻找了。
var su4 = new SubFunc4('ldl', 'male');
console.log(su4.name);//ldl