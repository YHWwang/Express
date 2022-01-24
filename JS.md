# JS

# 上下文和作用域的区别
作用域：是函数定义的时候就确定好的了，函数当中的变量是和函数所处的作用域有关，函数运行的作用域也是与该函数定义时的作用域有关。
上下文：主要是关键字this的值，这个是由函数运行时决定的，简单来说就是谁调用此函数，this就指向谁。

# 柯里化Currying
currying又称部分求值。一个currying的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。
柯里化的好处在于，调用函数的时候，如果某一个参数在每次调用中都相同，可以避免重复传入这个参数。
柯里化有3个常见作用：
1. 参数复用
2. 动态创建函数
3. 延迟计算/运行
function currying(func) {
        const args = [] // 闭包
        return function result(...rest) {
            if (rest.length === 0) {
                return func(...args)
            } else {
                args.push(...rest)
                return result
            }
        }
    }
    const add = (...args) => args.reduce((a, b) => a + b)

    const sum = currying(add)

    sum(2,3)(3)
    console.log(sum())

# 回调地狱
由于js是单线程的，所以很多地方都要等待，这时就会用到回调函数，而在某些业务中可能存在多层的函数回调函数，回调嵌套的代码难维护，不易排除bug,这种情况我们成为回调地狱。
处理方法一般使用promise或者async函数，promise.then()函数针对这种多层嵌套的代码方便，可大大降低维护难度，promise.all和race也是常用的方法。手写promsie


# 函数声明和函数表达式区别
1. 函数声明：函数会提升到最上层 function fn(){}
2. 函数表达式：函数表达式必须赋值完成了才能调用,不会提升 let fn = function(){} 

# 实现多维数组扁平化
1. const flat1 = (array) => {
  return array.reduce((result, it) => {
    return result.concat(Array.isArray(it) ? flat1(it) : it)
  }, [])
}
2. ES6中的arr.flat(infinity)

# JSON.stringify()理解
1.基本功能是将js对象转换成JSON
2.用于判断俩个数组或者对象是否相等
3.基本语法：JSON.stringify(value, [, replacer], [, space])
value: 必选字段，指输入的对象，比如数组这些。
replacer，该参数是可选的，它可以有两种类型，第一种是数组，第二种是函数方法。
space: 该参数的含义是指使用什么来做分隔符的。

# 实现instanceOf
const myInstanceOf = (obj, func) => {
  if (obj === null || typeof obj !== 'object') {
    return false
  }

  let proto = Object.getPrototypeOf(obj) // ES5中用来获取obj对象的原型对象的标准方法。

  if (proto === func.prototype) {
    return true
  } else if (proto === null) {
    return false
  } else {
    return myInstanceOf(proto, func)
  }
}
// 测试
let Fn = function () { }
let p1 = new Fn()

console.log(myInstanceOf({}, Object)) // true
console.log(myInstanceOf(p1, Fn)) // true
console.log(myInstanceOf({}, Fn)) // false
console.log(myInstanceOf(null, Fn)) // false
console.log(myInstanceOf(1, Fn)) // false


# 事件委托
是利用事件冒泡的特性，将本应该绑定在多个元素上的事件绑定在他们的祖先元素上，尤其在动态添加子元素的时候，可以非常方便的提高程序性能，减小内存空间。e.target.nodename.toLowerCase()可用于判断当前标签的名称

# 冒泡事件理解
事件的流程是：捕获阶段 -> 目标阶段 -> 冒泡阶段，冒泡过程就是：事件源触发事件后，会将事件反馈给他的父元素。一直到document。这个过程中如果父元素也有对应的evet.type的话也会触发。为了防止触发可以通过evet.target来判读或者直接event.stopPropagation()阻止事件冒泡preventDefault()。

# 隐式转换(https://blog.csdn.net/itcast_cn/article/details/82887895)
1. 转成string类型： +（字符串连接符） 
2. 转成number类型：++/--(自增自减运算符) + - * / %(算术运算符) > < >= <= == != === !=== (关系运算符)
3. 转成boolean类型：!（逻辑非运算符）
空字符串(''),NaN,0，null,undefined这几个外返回的都是true,唯一不同的![] | !{} == fasle //ture
引用类型比地址( {} == !{}  "[object Object]" == 0 ---false)，基本类型比值
[] === [] //false 和 {} === {}//false
“==允许在相等比较中进行强制类型转换，而===不允许”。








# 匿名函数的优缺点
调用方式：1自执行；2赋值给一个变量，通过变量调用（需要在函数定义之后调用）
优点：不用命名函数命，创建闭包减少了全局变量
缺点：可能造成内存泄漏

# 内存泄露: 申请的内存没有及时回收掉
意外的全局变量: 无法被回收
定时器: 未被正确关闭，导致所引用的外部变量无法被释放
事件监听: 没有正确销毁 (低版本浏览器可能出现)
闭包: 会导致父级中的变量无法被释放
dom 引用: dom 元素被删除时，内存中的引用未被正确清空
如何查看:
1.按开发者工具的memory功能来抓取内存快照
2.node提供process.memoryUsage()

# 常见状态码
1xx: 接受，继续处理
200: 成功，并返回数据
201: 已创建
202: 已接受
203: 成为，但未授权
204: 成功，无内容
205: 成功，重置内容
206: 成功，部分内容
301: 永久移动，重定向
302: 临时移动，可使用原有URI
304: 资源未修改，可使用缓存
305: 需代理访问
400: 请求语法错误
401: 要求身份认证
403: 拒绝请求
404: 资源不存在
500: 服务器错误

# 原型/构造函数/实例
const Person = new Object()
Person:实例        Object构造函数
const per = Object.prototype
per:原型
原型(prototype): 一个简单的对象，用于实现对象的 属性继承。可以简单的理解成对象的爹
构造函数: new后面的函数。
实例: 通过构造函数和new创建出来的对象，便是实例。 实例通过__proto__指向原型，通过constructor指向构造函数。
# 原型链
![Image text](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/14/168e9d9b940c4c6f~tplv-t2oaga2asx-watermark.awebp)
# 作用域链
作用域链可以理解为一组对象列表，包含 父级和自身的变量对象，因此我们便能通过作用域链访问到父级里声明的变量或者函数。

# js继承方法(https://www.cnblogs.com/ranyonsue/p/11201730.html)
1. 原型链继承
    重点：让新实例的原型等于父类的实例（son.prototype = new Person）
　　特点：1、实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）
　　缺点：1、新实例无法向父类构造函数传参。
　　　　　2、继承单一。
　　　　　3、所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）
2. 借用构造函数继承
    重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
　　特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。
　　　　　2、可以继承多个构造函数属性（call多个）。
　　　　　3、在子实例中可向父实例传参。
　　缺点：1、只能继承父类构造函数的属性。
　　　　　2、无法实现构造函数的复用。（每次用每次都要重新调用）
　　　　　3、每个新实例都有父类构造函数的副本，臃肿。
3. 组合式继承
    重点：结合了原型链继承\借用构造函数继承两种模式的优点，传参和复用
　　特点：1、可以继承父类原型上的属性，可以传参，可复用。
　　　　　2、每个新实例引入的构造函数属性是私有的。
　　缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。
4. 原型式继承
　  重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
　　特点：类似于复制一个对象，用函数来包装。
　　缺点：1、所有实例都会继承原型上的属性。
　　　　　2、无法实现复用。（新实例属性都是后面添加的）
5. 寄生式继承
    重点：就是给原型式继承外面套了个壳子。
　　优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
　　缺点：没用到原型，无法复用。
6. 寄生组合式继承（防止原型链上属性共享）
　  重点：它是通过借用构造函数来继承属性，通过原型链形式来继承方法，会解决2次调用父类函数以及复用率的问题。

# typeof('abc')和typeof 'abc'都是string, 那么typeof是操作符还是函数？
 在MDN中。是操作符，不是函数。可以添加括号，但是括号的作用是进行分组而非函数的调用。

# this的理解，基本上可以归为四类，
全局this 是window
函数this 是调用者
构造函数的this 是new 之后的新对象
call 和 apply bind的this第一个参数

# bind apply call的区别
bind(context,arguments) 返回一个函数
call(context,arg1,arg2...) 指定作用域 同时执行函数
apply(context,args) 指定作用域 同时执行函数，后面的参数是数组
实现bind
Function.prototype.myBind(context,...args){
 return function(){
   return this.apply(context,args)
 }
}

# javascript的作用域的理解
定义变量的使用范围
全局作用域、函数作用域、局部作用域
在ES5之前，javascript只有全局作用域和函数作用域
在ES6时出现的let和const可以定义块级作用域（局部作用域）

# slice和splice的用法
slice(开始索引,结束索引--不包括)方法从数组中返回选定的元素，作为一个新数组。生成新数组
splice(开始索引,0删除|1增加个数,元素1，元素2)方法添加和删除数组元素。修改数组本身
split(字符串或正则表达式，返回数组的最大长度)用于把一个字符串分割成字符串数组。
# 什么是闭包
简要回答：能够读取其他函数内部变量的函数。
全面回答：在js中变量的作用域属于函数作用域, 在函数执行完后,作用域就会被清理,内存也会随之被回收,但是由于闭包函数是建立在函数内部的子函数, 由于其可访问上级作用域,即使上级函数执行完, 作用域也不会随之销毁, 这时的子函数(也就是闭包),便拥有了访问上级作用域中变量的权限,即使上级函数执行完后作用域内的值也不会被销毁。
特性：
1、闭包可以访问当前函数以外的变量
2、即使外部函数已经返回，闭包仍能访问外部函数定义的变量
3、闭包可以更新外部变量的值

# 闭包的用途
1. 可以读取函数内部的变量
2. 让这些变量的值始终保持在内存中
3. 函数执行形成的私有作用域，保护里面的变量不受外界干扰的机制

# 值引用和地址引用
值引用：Undefined、Null、Boolean、Number 、String和Symbol.可以深拷贝
地址引用: Array,Object.环到原始类型方可进行深拷贝。对象名存在栈内存，值存在堆内存，栈内存会提供一个引用的地址指向堆内存中的值

# setTimeout和setInterval执行后会变成全局

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
1. Object.prototype.toString.call():每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，会返回 [Object type]的字符串，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，所以我们需要使用call或者apply方法来改变toString方法的执行上下文
优点：对于所有基本的数据类型都能进行判断，即使是 null 和 undefined,且和下面的Array.isArray方法一样都检测出 iframes.
缺点：不能精准判断自定义对象，对于自定义对象只会返回[object Object]

2. typeof:只能判断原始类型

3. instanceof:内部机制是通过判断对象的原型链中是不是能找到类型的 prototype.
优点：弥补Object.prototype.toString.call()不能判断自定义实例化对象的缺点。
缺点：只能用来判断对象类型，原始类型不可以，并且所有对象类型 instanceof Object 都是 true。

4. Array.isArray():用来判断对象是否为数组
缺点：只能判别数组
Array.isArray()是ES5新增的方法，当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。

5. hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键不涉及原型链）。

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

# 实现一个Promise
class MyPromise {
  constructor (exe) {
1. 新建4个变量
    // 最后的值，Promise .then或者.catch接收的值
    this.value = undefined
    // 状态：三种状态 pending success failure
    this.status = 'pending'
    // 成功的函数队列
    this.successQueue = []
    // 失败的函数队列
    this.failureQueue = []
2. 设置成功失败状态函数
    const resolve = () => { // 成功状态函数
      const doResolve = (value) => {
        // 将缓存的函数队列挨个执行，并且将状态和值设置好
3. 判断是否为pending状态并给状态变量赋值，根据队列的长度循环，将移除队列第一个数据，cb是否为空
        if (this.status === 'pending') {
          this.status = 'success'
          this.value = value
  
          while (this.successQueue.length) {
            const cb = this.successQueue.shift()
  
            cb && cb(this.value)
          }
        }
      }

      setTimeout(doResolve, 0)
    }

    const reject = () => {//失败状态函数
      // 基本同resolve
      const doReject = (value) => {
        if (this.status === 'pending') {
          this.status = 'failure'
          this.value = value
  
          while (this.failureQueue.length) {
            const cb = this.failureQueue.shift()
  
            cb && cb(this.value)
          }
        }
      }

      setTimeout(doReject, 0)
    }

    exe(resolve, reject)
  }
  
  then (success = (value) => value, failure = (value) => value) {
4. then返回的是一个新的Promise
    return new MyPromise((resolve, reject) => {
      // 包装回到函数
5. 定义成功失败函数，判断result类型是否是promise函数
      const successFn = (value) => {
        try {
          const result = success(value)
          // 如果结果值是一个Promise，那么需要将这个Promise的值继续往下传递，否则直接resolve即可
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }
      // 基本筒成功回调函数的封装
      const failureFn = (value) => {
        try {
          const result = failure(value)
          
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }
6. 如果Promise的状态还未结束，则将成功和失败的函数缓存到队列里
      if (this.status === 'pending') {
        this.successQueue.push(successFn)
        this.failureQueue.push(failureFn)
        // 如果已经成功结束，直接执行成功回调 
      } else if (this.status === 'success') {
        success(this.value)
      } else {
        // 如果已经失败，直接执行失败回调
        failure(this.value)
      }
    })
  }
  // 其他函数就不一一实现了
  catch () {

  }
} 


# 实现promise.all
Promise.myAll = (promises) => {
  return new Promise((rs, rj) => {
    // 计数器
    let count = 0
    // 存放结果
    let result = []
    const len = promises.length
    
    if (len === 0) {
      return rs([])
    }
    
    promises.forEach((p, i) => {
      // 注意有的数组项有可能不是Promise，需要手动转化一下
      Promise.resolve(p).then((res) => {
        count += 1
        // 收集每个Promise的返回值 
        result[ i ] = res
        // 当所有的Promise都成功了，那么将返回的Promise结果设置为result
        if (count === len) {
          rs(result)
        }
        // 监听数组项中的Promise catch只要有一个失败，那么我们自己返回的Promise也会失败
      }).catch(rj)
    })
  })
}
# 实现promise.race
Promise.myRace = (promises) => {
  return new Promise((rs, rj) => {
    promises.forEach((p) => {
      // 对p进行一次包装，防止非Promise对象
      // 并且对齐进行监听，将我们自己返回的Promise的resolve，reject传递给p，
      // 哪个先改变状态，我们返回的Promise也将会是什么状态
      Promise.resolve(p).then(rs).catch(rj)
    })
  })
}

# Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大
ES6规定，Promise对象是一个构造函数，用来生成Promise实例。Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject,这两个参数都是函数。
resolve作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
reject作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

三个状态
    1、pending[待定]初始状态
    2、fulfilled[实现]操作成功
    3、rejected[被否决]操作失败
JS执行顺序
1. JavaScript是单线程从上往下执行，先进栈的后出栈，栈中函数执行完毕全部弹出才会执行微队列然后宏队列
# 任务队列-事件循环机制
1. 任务队列：同步任务会立刻执行，进入到主线程当中，异步任务会被放到任务队列（Event Queue）当中。Event Queue 单词的意思就是任务队列。
2. 事件循环:等待同步代码执行完毕后，返回来，再将异步中的任务放到主线程中,先执行微观任务，再执行宏观任务,反复这样的循环，这就是事件循环。
promise是微观任务（作业队列） ，.then、.catch、process.nextTick是异步会放到了微队列中
setTimeout和setInterval宏观任务（任务队列），先执行微观任务，在执行宏观任务；微观任务里，先执行同步再执行异步

微观任务Microtask是由js引擎发起的任务（promise,process.nextTick等），
宏观任务Macrotask是由浏览器/node发起的任务（setTimeOut、setInterval、I/O、UI交互）

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