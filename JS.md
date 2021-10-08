# JS

# 原型链
![Image text](https://raw.githubusercontent.com/YHWwang/Shipping/main/img-folder/%E5%8E%9F%E5%9E%8B%E9%93%BE.png)

# js继承方法
1.原型链继承
2.构造继承
3.实例继承
4.拷贝继承
5.组合继承
6.寄生组合继承

# slice和splice的用法
slice(开始索引,结束索引--不包括)方法从数组中返回选定的元素，作为一个新数组。生成新数组
splice(开始索引,0删除|1增加个数,元素1，元素2)方法添加和删除数组元素。修改数组本身
# 什么是闭包
简要回答：能够读取其他函数内部变量的函数。
全面回答：在js中变量的作用域属于函数作用域, 在函数执行完后,作用域就会被清理,内存也会随之被回收,但是由于闭包函数是建立在函数内部的子函数, 由于其可访问上级作用域,即使上级函数执行完, 作用域也不会随之销毁, 这时的子函数(也就是闭包),便拥有了访问上级作用域中变量的权限,即使上级函数执行完后作用域内的值也不会被销毁。

# 闭包的用途
1. 可以读取函数内部的变量
2. 让这些变量的值始终保持在内存中
3. 函数执行形成的私有作用域，保护里面的变量不受外界干扰的机制

# 值引用和地址引用
值引用：Undefined、Null、Boolean、Number 、String和Symbol.可以深拷贝
地址引用: Array,Object.环到原始类型方可进行深拷贝

# setTimeout和setInterval执行后会变成全局

# 选择器有哪些
css选择器：id，class，标签，通用，属性，伪类，伪元素，子类
css权重：!import > 内联样式> id > class > 标签|伪类|属性 > 伪元类 > 通配符 > 继承

# 伪类和伪元素的区别
伪类：（:hover, :foucs, :nth-chlid)等，冒号开头，用于向某些选择器添加特殊的效果。一个选择器中出现可以多个
伪元素：（::before, ::after）等，双冒号开头，用于将特殊的效果添加到某些选择器，一个选择器中只能出现一次

# sessionStorage通过以下情况会丢失
    刷新当前页面，或者通过location.href、window.open、或者通过带target="_blank"和rel=“opener”的a标签打开新标签，之前的sessionStorage还在，
    但是如果你是主动打开一个新窗口或者新标签，对不起，打开F12你会发现，sessionStorage空空如也。
    也就是说，sessionStorage的session仅限当前标签页或者当前标签页打开的新标签页，通过其它方式新开的窗口或标签不认为是同一个session。

# js无缝轮播图
关键在与首尾一张图片如何轮播第一张图片或者最后一张的问题
1. 轮播之前需要将尾再添加一张图片，与第一张图片一致
2. 设置定时器，将图片依次向左移动一张图片宽度的距离
3. 轮播到最后一张图片时，重置当前切换索引为1，设置一个seTimeout重置父元素的left时间为一秒

    time = setInterval(() => {
        curIndex++
        if (curIndex < $('#slider .slieder-item-container li').length) {
            $('#slider .slieder-item-container').animate({
                'left': -600 * curIndex + 'px',
            })
            if (curIndex == $('#slider .slieder-item-container li').length-1) {
                curIndex = 0
                setTimeout(() => {
                    $('#slider .slieder-item-container').css('left', '0px')
                }, 1000);
            } 
        }
        $('.indicator-container .indicator').eq(curIndex).addClass('active').siblings().removeClass('active')
    }, autoplay_Delay);

# Object.prototype.toString.call()、 instanceof 以及 Array.isArray() 的区别和优劣
1.Object.prototype.toString.call():每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，会返回 [Object type]的字符串，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，所以我们需要使用call或者apply方法来改变toString方法的执行上下文
优点：对于所有基本的数据类型都能进行判断，即使是 null 和 undefined,且和下面的Array.isArray方法一样都检测出 iframes.
缺点：不能精准判断自定义对象，对于自定义对象只会返回[object Object]

2.instanceof:内部机制是通过判断对象的原型链中是不是能找到类型的 prototype.
优点：弥补Object.prototype.toString.call()不能判断自定义实例化对象的缺点。
缺点：只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。

3.Array.isArray():用来判断对象是否为数组
缺点：只能判别数组
Array.isArray()是ES5新增的方法，当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。

4.hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键不涉及原型链）。

instanceof 与 isArray
当检测Array实例时，Array.isArray 优于 instanceof ，因为 Array.isArray 可以检测出 iframes

# for与foreach的性能上的区别
对十万级别时foreach好，百万级别差不多，千万级别是for好。由于foreach会回调函数，会产生额外的执行栈和上下文。for 循环则是底层写法，没有任何额外的函数调用栈和上下文不会产生额外的消耗。

# 对象的键名的转换。
1.对象的键名只能是字符串和 Symbol 类型。
2.其他类型的键名会被转换成字符串类型。
3.对象转字符串默认会调用 toString 方法。
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  //覆盖
console.log(a[b]);

---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  //symbol类型的值都不等
console.log(a[b]);

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  对象.toString()变成[object Object]
console.log(a[b]);

# input 搜索如何防抖，如何处理中文输入
 var imeFlag = true // 定义一个是否在输入中文的开关
    $(".searchInput").on('compositionstart',function (params) {
        imeFlag = true // 
    })
    $(".searchInput").on('compositionend',function (params) {// 只要输入停止就会触发
        imeFlag = false 
    })
    $(".searchInput").on('input', debounce(function (params) {
        if (!imeFlag) name(this.value) 
    }, 1000));
    function name(params) {
        console.log(params)
    }

    function debounce(fn, delay) {
        var timer
        return function () {
            var that = this
            var arg = arguments
            clearTimeout(timer)
            timer = setTimeout(function () {
                fn.apply(that, arg)
            }, delay)
        }
    }
    
# var、let 和 const 区别的实现原理是什么
1. var的话会直接在栈内存里预分配内存空间，然后等到实际语句执行的时候，再存储对应的变量，如果传的是引用类型，那么会在堆内存里开辟一个内存空间存储实际内容，栈内存会存储一个指向堆内存的指针(var和function会变量提升，函数的变量提升等级最高。)
2. let的话，是不会在栈内存里预分配内存空间，而且在栈内存分配变量时，做一个检查，如果已经有相同变量名存在就会报错(暂时性死区TDZ,使用let命令声明变量之前，该变量都是不可用的)
3. const的话，也不会预分配内存空间，在栈内存分配变量时也会做同样的检查。不过const存储的变量是不可修改的，对于基本类型来说你无法修改定义的值，对于引用类型来说你无法修改栈内存里分配的指针，但是你可以修改指针指向的对象里面的属性

# Promise
resolve作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
reject作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

三个状态
    1、pending[待定]初始状态
    2、fulfilled[实现]操作成功
    3、rejected[被否决]操作失败
promise是微观任务 ，.then、.catch、process.nextTick是异步会放到了微队列中，setTimeout和setInterval宏观任务，先执行微观任务，在执行宏观任务；微观任务里，先执行同步再执行异步

promise.all([promise1,promise2]).then(function(res){
    cossole.log(res)
    需要特别注意的是，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。
})
Promise.race的使用
顾名思义，Promise.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

# async / await 
    async是Generator 函数的语法糖
    async 函数可以保留运行堆栈。
    async会返回一个promise对象
    await前是同步执行，而在其之后的便是异步相当于Promise.then的形式

# //所谓深度克隆，就是当对象的某个属性值为object或array
JSON和extend来完成深拷贝不能解决属性为函数，undefined，循环引用的的情况
实现深拷贝的方法：https://www.cnblogs.com/gaosirs/p/10565420.html
1. 封装深拷贝函数---解决属性为undefined的情况
function deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if(obj && typeof obj === "object") {
        for(key in obj) {
            if(obj.hasOwnProperty(key)) {
                 // 判断 obj 是否是对象,如果是，递归复制
                 if(obj[key] && typeof obj[key] === "object") {
                      objClone[key] = deepClone(obj[key]);
                 }else{
                      // 如果不是
                      objClone[key] = obj[key];
                 }
            }
        }
    }      
    return objClone
} 
2. 借用JSON对象的 parse 和 stringify
function deepClone(obj){
    let newObj = JSON.stringify(obj);
    let objClone = JSON.parse(newObj);
    return objClone;  
} 
3. 借用 JQ 的 extend 方法实现深拷贝。
$.extend([deep], target, ...object);

　　deep 表示深拷贝，Boolean

 　　target 目标对象

　　 ...object 需要进行合并的对象