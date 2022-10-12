# 分别使用Promise和async改写成每隔1s打印1个数字的形式
    async function print(n) {
        for (var i = 0; i < n; i++) {
            await pro(function () {
                console.log(i);
            }, 1000)
        }
    }
    function pro(cb, time) {
        return new Promise(res => {
            setTimeout(() => {
                cb()
                res()
            }, time);
        })
    }
    print(10)

# window初始化对象的name属性
console.log(name) // 等于黑猫警长,初始化时为""而不是undefined
var name = '黑猫警长' 

# 强缓存和协商缓存-----(浏览器缓存最大的价值是节省了带宽)
1. 强缓存:意思是在缓存失效之前不再需要跟服务器交互-----这种方法会有一个固定时间，所带来的问题是如果服务器数据进行了更新，但是还没有到强缓存的过期时间，则数据无法更新
常用的是Expires，Expires的值是一个绝对时间，由服务器产生
这儿存在一个问题，就是服务器的时间可能给客户端的时间不一致导致缓存时间的偏差
要解决这个问题就要使用cache-control,它保存的是一个相对浏览器的时间
如果同时存在cache-control和Expires怎么办呢？
浏览器总是优先使用cache-control，如果没有cache-control才考虑Expires

2. 协商缓存:意思是需要去服务器端询问页面有没有修改过，没有修改过则返回304直接使用缓存内容，否则返回新内容(协商缓存就是强制缓存失效后)
2.1协商步骤：
服务器发送带Last-modified:GMTtime 头的http response
浏览器下次请求时带上if-modified-since:GMTtime http 请求头
服务端用本地Last-modified时间与if-modified-since比较，计算浏览器数据是否过期并发送响应
缓存协商可应用在动态页面且实时性不是特别强的页面，如网站首页
2.2 Etag和If-None-Match
直接根据文件内容是否修改来决定缓存策略。
Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，Etag就会重新生成。
浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的Etag值放到request header里的If-None-Match里，服务器只需要比较客户端传来的If-None-Match跟自己服务器上该资源的ETag是否一致，就能很好地判断资源相对客户端而言是否被修改过了。
如果服务器发现ETag匹配不上，那么直接以常规GET 200回包形式将新的资源（当然也包括了新的ETag）发给客户端。
如果ETag是一致的，则直接返回304知会客户端直接使用本地缓存即可。

# async和defer区别
async:加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。无序
defer:加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成,有序
所以区别主要在于一个执行时间,defer会在文档解析完之后执行,并且多个defer会按照顺序执行,而async则是在js加载好之后就会执行,并且多个async,哪个加载好就执行哪个

# export 与 export default区别
1. 相同点：都是es6导出组件可导出函数变量等
2. 不同点：1. export一个文件或者模块可出现多次并且{}导出多个，2.export default 一个文件或者模块只出现一次只能导出一个

# 转换成树形结构
let arr = [
        { id: 1, name: '部门1', pid: 0 },
        { id: 2, name: '部门2', pid: 1 },
        { id: 3, name: '部门3', pid: 1 },
        { id: 4, name: '部门4', pid: 3 },
        { id: 5, name: '部门5', pid: 4 },
    ]
    function convert(list, pid = 0) {//方法一: 依次递归id,最后的子节点往当前父节点添加
        let res = []

        for (const item of list) {
            if (item.pid === pid) {
                let child = convert(list, item.id)
               if(child.length){
                   item.children = child
               }
                res.push(item)
            }
        }
        return res
    }

    function convert(list) {//方法二：利用对象键值和引用关系执行循环，对map进行添加子元素
        let res = []
        let map = list.reduce((res, v) => { return (res[v.id] = v, res) }
            , {})
        for (const item of list) {
            if (item.pid === 0) {
                res.push(item)
                continue
            }
            if(item.pid in map){
                let parent = map[item.pid]
                parent.children = parent.children || []
                parent.children.push(item)
            }
        }
        return res
        // console.log(map);
    }

# JS深度优先算法、广度优先算法
    let deepTraversal = node => {//node->对象，判断当前节点是否有children，有则循环chldren合并递归数组
        let nodes = []
        if (node !== null) {
            nodes.push(node.id)
            if (node.children && node.children.length > 0) {
                let children = node.children
                for (let i = 0; i < children.length; i++) {
                    nodes = nodes.concat(deepTraversal(children[i]))
                }
            }
        }
        return nodes
    }
    
    let widthTraversal = (tree) => {//tree->数组,队列思想，依次移除首位，判断是否有children,有则将children添加到队列里
        let node, list = [...tree]
        let nodes = []
        while (node = list.shift()) {
            nodes.push(node.id)
            node.children && list.push(...node.children)
        }
        return nodes
    }

# js中new做了什么事
1. 创建了一个空对象
2. 将空对象的原型prototype指向构造函数的原型
3. 构造函数内部的this指向了new创建的空对象（改变this指向）
4. 对构造函数有返回值的判断（ 如果构造函数内部的返回值为普通类型和null则将new创建的对象返回出去，而如果构造函数返回的对象为引用类型对象则采用构造函数返回的对象。）
实现:   function myNew(con, ...args) {
           let obj = Object.create(null)
           Object.setPrototypeOf(obj, con.prototype)
           let result = con.apply(obj, args)
           return result instanceof Object ? result : obj
        }

# ['10','10','10','10','10'].map(parseInt);// 输出[10, NaN, 2, 3, 4]
  ['10', '10', '10', '10', '10'].map(function (item, index) { //map(回调函数，参数1值，参数2索引)
      return parseInt(item, index) // 参数1字符串，参数2进制数(2-36)0则为10，其它为NaN,默认根据string去判断参数
      parseInt(基数，进制)，parseInt('3',2)--NaN基数要在进制内，否则返回NaN
      parseInt('10',0)--1*10+0*10=10
      parseInt('10',1)--NaN
      parseInt('10',2)--1*2+0*2=2
      parseInt('10',3)--1*3+0*3=3
      parseInt('10',4)--1*4+0*4=4
  })

# 手写reduce函数
  Array.prototype.myReduce = function(fn,val){
      let arr = Array.prototype.slice.call(this)
      let res,startIndex

      res = val ? val : arr[0]
      startIndex = val ? 0 : 1 

        for(let i = startIndex;i<arr.length;i++){
            res = fn.call(null,res,arr[i])
        }
        return res
  }

# indexOf()函数会比较类型和值是否相等
[1,2,3,4,5].indexOf('3') 返回-1
[1,2,3,4,5].indexOf(3) 返回2

# this绑定的几种情况
  1. 默认绑定：函数独立调用，直接使用不带任何修饰的函数引用进行调用。非严格模式下 this 绑定到全局对象（浏览器下是 winodw，node 环境是 global），严格模式下 this 绑定到 undefined （因为严格模式不允许 this 指向全局对象）
  2. 隐式绑定：函数是否在某个上下文对象中调用，如果是的话 this 绑定的是那个上下文对象。
  3. 显示绑定：通过 call、apply、bind 我们可以修改函数绑定的 this，使其成为我们指定的对象。通过这些方法的第一个参数我们可以显式地绑定 this。
  4. new绑定：函数如果作为构造函数使用 new 调用时， this 绑定的是新创建的构造函数的实例。
  5. 箭头函数：箭头函数没有自己的this，this指向环境上下文
 this 绑定的优先级：new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定
 
# 关于axios请求拦截的理解
axios拦截分为请求拦截request和响应拦截response.
请求拦截：是指在请求发送之前进行一些操作比如每个请求体加上token等，axios.interceptors.request.use(),请求拦截是逆序的
响应拦截：是指在响应请求之后的操作比如处理服务器返回登录状态失效等, axios.interceptors.response.use()，顺序

# js循环的数据量很大（例如100W+）如何进行性能优化？
Worker接口可以创建后台任务，由于js是单线程模型，即可以给js运行新增线程。
用于处理一些耗时、耗费性能的任务（异步的除外）。
    要解决的问题是：
    1.解决页面卡死问题。
    2.发挥多核CPU的优势，提高js性能。
缺点：兼容性不好，需等主线程任务结束才能进行

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

# addFn(1)(2)(3) = 6, addFn(1)(2, 3) , addFn(1, 2, 3)(2, 3)
    function addFn(...m) {
        let args = [...m]
        let temp = function (...n) {
            args.push(...n)
            return temp
        }
        temp.toString = function () {
            return args.reduce( (a,b)=> a+b)
        }
        return temp
    }
    
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
2. ES6中的arr.flat(Infinity)


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
事件的流程是：捕获阶段 -> 目标阶段 -> 冒泡阶段，冒泡过程就是：事件源触发事件后，会将事件反馈给他的父元素。一直到document。这个过程中如果父元素也有对应的evet.type的话也会触发。为了防止触发可以通过evet.target来判读或者直接event.stopPropagation()阻止事件冒泡preventDefault()阻止默认事件。

# 隐式转换(https://blog.csdn.net/itcast_cn/article/details/82887895)
1. 转成string类型： +（字符串连接符） 
2. 转成number类型：++/--(自增自减运算符) + - * / %(算术运算符) > < >= <= == != === !=== (关系运算符)
3. 转成boolean类型：!（逻辑非运算符）
空字符串(''),NaN,0，null,undefined这几个外返回的都是true,唯一不同的![] | !{} == fasle //ture
引用类型比地址( {} == !{}  "[object Object]" == 0 ---false)，基本类型比值
[] === [] //false 和 {} === {}//false
“==允许在相等比较中进行强制类型转换，而===不允许”。
null和undefined几乎一致，两者相等不全等，且不等于其他的：0、""和false；

# 垃圾回收（核心思想就是如何判断内存已经不再使用）
1. 引用计数（现代浏览器不再使用）：就是看一个对象是否有指向它的引用。如果没有其他对象指向它了，说明该对象已经不再需要了。引用计数有一个致命的问题，那就是循环引用，如果两个对象相互引用，尽管他们已不再使用，但是垃圾回收器不会进行回收，最终可能会导致内存泄露。
2. 标记清除：标记清除算法将“不再使用的对象”定义为“无法到达的对象”。即从根部（在JS中就是全局对象）出发定时扫描内存中的对象，凡是能从根部到达的对象，保留。那些从根部出发无法触及到的对象被标记为不再使用，稍后进行回收。

# 匿名函数的优缺点
调用方式：1自执行；2赋值给一个变量，通过变量调用（需要在函数定义之后调用）
优点：不用命名函数命，创建闭包减少了全局变量
缺点：可能造成内存泄漏

# ES6中新增了两个数据结构 WeakMap、WeakSet，就是为了解决内存泄漏的问题， WeakMap、WeakSet，与map,set的区别
Set
成员唯一、无序且不重复
[value, value]，键值与键名是一致的（或者说只有键值，没有键名）
可以遍历，方法有：add、delete、has
WeakSet
成员都是对象
成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
不能遍历，方法有add、delete、has
Map
本质上是键值对的集合，类似集合,[key, value] 的形式储存
可以遍历，方法很多可以跟各种数据格式转换
WeakMap
只接受对象作为键名（null除外），不接受其他类型的值作为键名
键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
不能遍历，方法有get、set、has、delete

WeakSet 与 Set 的区别：
WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉（不考虑该对象还存在于 WeakSet 中），所以，WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到了（被垃圾回收了），WeakSet 对象是无法被遍历的（ES6 规定 WeakSet 不可遍历），也没有办法拿到它包含的所有元素
属性：
constructor：构造函数，任何一个具有 Iterable 接口的对象，都可以作参数

集合set 与 字典map 的区别：
共同点：集合、字典 可以储存不重复的值
不同点：集合 是以 [value, value]的形式储存元素，字典 是以 [key, value] 的形式储存


# 内存泄露和内存溢出
内存泄露: 申请的内存没有及时回收掉
内存溢出：是申请或使用内存超出可以分配的内存
  场景：
    1. 意外的全局变量: 无法被回收
    2. 被遗忘的计时器: 未被正确关闭，导致所引用的外部变量无法被释放
    3. 事件监听器被遗忘: 没有正确销毁 (低版本浏览器可能出现)
    4. 闭包: 会导致父级中的变量无法被释放
    5. dom 引用: dom 元素被删除时，内存中的引用未被正确清空
    6. console的滥用
内存泄漏识别方法:
1、浏览器方法
打开开发者工具，选择 Memory
在右侧的Select profiling type字段里面勾选 timeline
点击左上角的录制按钮。
在页面上进行各种操作，模拟用户的使用情况。
一段时间后，点击左上角的 stop 按钮，面板上就会显示这段时间的内存占用情况。
2、命令行方法
node提供process.memoryUsage()

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
501（尚未实施） 
502（错误网关） 
503（服务不可用）
504（网关超时）
505（HTTP 版本不受支持） 服务器不支持请求中所用的 HTTP 协议版本。

# 原型/构造函数/实例
const Person = new Object()
Person:实例        Object构造函数
const per = Object.prototype
per:原型
原型(prototype): 一个简单的对象，用于实现对象的 属性继承。可以简单的理解成对象的爹
构造函数: new后面的函数。
实例: 通过构造函数和new创建出来的对象，便是实例。 实例通过__proto__指向原型，通过constructor指向构造函数。
__proto__ 属性在 ES6 时才被标准化，以确保 Web 浏览器的兼容性，但是不推荐使用，除了标准化的原因之外还有性能问题。为了更好的支持，推荐使用 Object.getPrototypeOf()。

# 原型链和作用域链的区别?
1. 原型链：当访问一个对象的属性时， 会在这个对象的属性上去找，如果没有找到就会去这个对象的--proto-- 上去找，即构造函数prototype 上找，如果没有会一直在--proto-- 上找，直到最顶层，不到即为undefined 。这样一层一层地向上，就彷佛一条链子串起来，所以就叫原型链。
![Image text](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/14/168e9d9b940c4c6f~tplv-t2oaga2asx-watermark.awebp)
2. 作用域链：变量取值会到创建这个变量的函数的作用域中取值，如果找不到，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链。
3. 作用域链是相对于变量而言， 原型是相对于属性而言
作用域最顶层是window ，原型链最顶层是Object
作用域链和原型继承查找时的区别：如果去查找一个普通对象的属性，但是在当前对象和其原型中都找不到时，会返回undefined；但查找的属性在作用域链中不存在的话就会抛出ReferenceError。

# 原型链Object和Function关系(https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/2019-07-24-060321-20220722064903218.jpg)
Object instanceof Function 		// true --- Object.__proto__ === Function.prototype
Function instanceof Object 		// true --- Function.__proto__.__proto__ === Object.prototype
Object instanceof Object 		// true --- Object.__proto__.__proto__ === Object.prototype
Function instanceof Function 	// true --- Function.__proto__ === Function.prototype


# js继承方法(https://www.cnblogs.com/ranyonsue/p/11201730.html)
1. 原型链继承
     解释：继承父类的属性和父类构造函数的属性，不可传参继承单一共享父类属性
     重点：让新实例的原型等于父类的实例（son.prototype = new Person）
     特点：继承实例的构造函数和父类的属性和方法
     缺点：1、新实例无法向父类构造函数传参。
　　　　　 3、所有新实例都会共享父类实例的属性。
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
splice(开始索引,删除或增加的个数,元素1，元素2)方法添加和删除数组元素。修改数组本身
split(字符串或正则表达式，返回数组的最大长度)用于把一个字符串分割成字符串数组。

# 什么是闭包?做什么用？优缺点？
简要回答：能够读取其他函数内部变量的函数。一个闭包内对变量的修改，不会影响到另外一个闭包中的变量
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

   1. typeof:只能判断原始类型，typeof null === 'object' 因为null是空指针对象

   2. instanceof:内部机制是通过判断对象的原型链中是不是能找到类型的 prototype.
   优点：弥补Object.prototype.toString.call()不能判断自定义实例化对象的缺点。
   缺点：只能用来判断对象类型，原始类型不可以，并且所有对象类型 instanceof Object 都是 true。

   1. Array.isArray():用来判断对象是否为数组
   缺点：只能判别数组
   Array.isArray()是ES5新增的方法，当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。

   1. hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键不涉及原型链）。

instanceof 与 isArray
当检测Array实例时，Array.isArray 优于 instanceof ，因为 Array.isArray 可以检测出 iframes

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
a[c]='c';  覆盖，对象.toString()变成[object Object]
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
   3. const的话，也不会预分配内存空间，在栈内存分配变量时也会做同样的检查。不过const存储的变量是不可修改的，对于基本类型来说你无法修改定义的值，对于引用类型来说你无法修改栈内存里分配的指针，但是你可以修改指针指向的对象里面的属性.Object.freeze()让整个对象都不能修改

# 实现一个Promise
     class MyPromise {
            constructor(exe) {
                this.status = 'pending';
                this.value = null;
                this.successQueue = [];
                this.failureQueue = [];

                let resolve = value => {
                    if (this.status !== 'pending') return;
                    // then中的函数总是异步执行的
                    this.status = 'fulfilled';
                    this.value = value;

                    let timer = setTimeout(() => {
                        clearTimeout(timer);
                        this.successQueue.forEach(item => {
                            item(this.value);
                        })
                    }, 0)
                }
                let reject = value => {
                    if (this.status !== 'pending') return;
                    // then中的函数总是异步执行的
                    this.status = 'rejected';
                    this.value = value;
                    let timer = setTimeout(() => {
                        clearTimeout(timer);
                        this.failureQueue.forEach(item => {
                            item(this.value);
                        })
                    }, 0);
                }
                // 执行器立即执行
                try {
                    exe(resolve, reject);
                } catch (err) {
                    //如果一开始执行器出错就走reject
                    reject(err);
                }
            }

            then(successFn, failureFn) {
                typeof successFn !== 'function' ? successFn = result => result : null;
                return new MyPromise((resolve, reject) => {
                    this.successQueue.push(() => {
                        try {
                            let result = successFn(this.value);
                            result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
                        } catch (err) {
                            reject(err);
                        }
                    });

                    typeof failureFn !== 'function' ? failureFn = reason => reject(reason) : null;
                    this.failureQueue.push(() => {
                        try {
                            let result = failureFn(this.value);
                            result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
                        } catch (err) {
                            reject(err);
                        }
                    });
                })
            }

            catch(failFn) {
                return this.then(null, failFn);
            }

        }
# 实现Promise.finally
     Promise.prototype.myFinally = function (callBack) {
         return this.then(data => {
             callBack()
             return data
         }, reason => {
             callBack()
             throw reason
         })
     }
# 实现Promise.all
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
# 实现Promise.allSettled
        Promise.myAllSettled = (promises) => {
            return new Promise((resolve, reject) => {
                let result = []
                let count = 0
                let len = promises.length

                promises.forEach((p, i) => {
                    Promise.resolve(p).then((res) => {
                        result[i] = {
                            status: 'fulfilled',
                            value: res
                        }
                        count++
                        if (count === len) {
                            resolve(result)
                        }
                    }, reason => {
                        count++
                        result[i] = {
                            status: 'rejected',
                            value: reason
                        }
                        if (count === len) {
                            resolve(result)
                        }
                    })
                })
            })
        }
# 实现Promise.race
Promise.myRace = (promises) => {//有一个错误会rejected
  return new Promise((rs, rj) => {
    promises.forEach((p) => {
      // 对p进行一次包装，防止非Promise对象
      // 并且对齐进行监听，将我们自己返回的Promise的resolve，reject传递给p，
      // 哪个先改变状态，我们返回的Promise也将会是什么状态
      Promise.resolve(p).then(rs).catch(rj)
    })
  })
}
# 实现Promise.any
        Promise.myAny = promises => {//全部错误会rejected
            let result = [],
                len = promises.length,
                count = 0

            return new Promise((resolve, reject) => {
                promises.forEach(p => {
                    Promise.resolve(p).then(res => {
                        resolve(res)
                    }, err => {
                        result[count] = err
                        count++
                        if (len === count) {
                            reject(result)
                        }
                    })
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

# 任务队列-事件循环机制
1. 任务队列：同步任务会立刻执行，进入到主线程当中，异步任务会被放到任务队列（Event Queue）当中。Event Queue 单词的意思就是任务队列。
2. 事件循环:等待同步代码执行完毕后，返回来，再将任务队列中的任务依次放到主线程中，反复这样的循环这就是事件循环。

js是单线程，同步任务和异步任务，先执行同步推到主线程中，异步任务推到任务队列中，任务队列里任务可分为微任务和宏任务，宏观任务执行在下次轮询之间，微观任务在本次轮询之后渲染之前，所以微观比宏观快。
promise是微观任务（作业队列） ，.then、.catch、process.nextTick是异步会放到了微队列中
setTimeout和setInterval宏观任务（任务队列），先执行微观任务，在执行宏观任务；微观任务里，先执行同步再执行异步

微观任务Microtask是由js引擎发起的任务（promise,process.nextTick等）
宏观任务Macrotask是由浏览器/node发起的任务（script、setTimeOut、setInterval、I/O、UI交互）

# async / await 
    async是Generator 函数的语法糖
    async 函数可以保留运行堆栈。
    async会返回一个promise对象
    await前是同步执行，而在其函数之后的便是异步相当于Promise.then的形式

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
   4. object.assign 
      基本数据类型深拷贝，引用数据类型浅拷贝