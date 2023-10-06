# Nodejs异步io模型？
1. 事件轮询
2. 观察者
3. 请求对象


# express和koa的区别(https://www.jianshu.com/p/feff9c4b6327)
express 是完整和强大的，里面集成了大量的中间件，比如说：路由，静态资源等中间件。对于开发者而言，技术统一，都是使用 express 内部提供的。
koa 是灵活和自由的，基本上没有集成任何中间件（核心代码只有大致1600行左右），中间件都需要自己去安装。对于开发者而言，选择技术的类型是多样的，丰富的。
执行顺序:
   Express 封装、内置了很多中间件，比如 connect和 router，而 KOA 则比较轻量，开发者可以根据自身需求定制框架；
   Express 是基于 callback 来处理中间件的，而 KOA 则是基于 await/async；
   在异步执行中间件时，Express 并非严格按照洋葱模型执行中间件，而 KOA 则是严格遵循洋葱模型的。
   Express 使用 callback捕获异常，对于深层次的异常捕获不了，Koa 使用 try catch，能更好地解决异常捕获。

# Node子进程
node的主线程为单线程，单线程提高了代码的运行速度，但node内部使用多线程完成IO操作，当某些操作阻塞主线程时，则将开启子线程用于处理操作，将最终操作结果返回给主线程即可。
node中使用child_process创建子线程，通常使用
1. child_process.exec() 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。
2. child_process.spawn()使用指定的命令行参数创建新进程。
3.  child_process.fork()是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。

# Node中EventEmitter的理解
事件触发与事件监听功能的封装
1. 引用模块
var events = require('events');
var eventEmitter = new events.EventEmitter();

2. 创建监听器函数
// 监听器 #1
var listener1 = function listener1() {
   console.log('监听器 listener1 执行。');
}
// 监听器 #2
var listener2 = function listener2() {
  console.log('监听器 listener2 执行。');
}

3. 绑定监听器( on/addListener方法 )
// 绑定 connection 事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);
// 绑定 connection 事件，处理函数为 listener2
eventEmitter.on('connection', listener2);

4. 计算监听器个数（listenerCount）
var eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件。");

5. 触发监听器（emit）
// 处理 connection 事件 
eventEmitter.emit('connection');

6. 移除监听器（removeListener）
// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

# nodeJS全局变量？全局对象？
全局变量：__filename、__dirname
全局对象：global、console、process、Buffer、setTimeout、setInterval、setImmediate

# 说下进程、线程和协程
1. 进程是一个具有一定独立功能的程序在一个数据集上的一次动态执行的过程，是操作系统进行资源分配和调度的一个独立单位，是应用程序运行的载体。进程是一种抽象的概念，从来没有统一的标准定义。
2. 线程是程序执行中一个单一的顺序控制流程，是程序执行流的最小单元，是处理器调度和分派的基本单位。一个进程可以有一个或多个线程，各个线程之间共享程序的内存空间(也就是所在进程的内存空间)。一个标准的线程由线程ID、当前指令指针(PC)、寄存器和堆栈组成。而进程由内存空间(代码、数据、进程空间、打开的文件)和一个或多个线程组成。
3. 协程，英文Coroutines，是一种基于线程之上，但又比线程更加轻量级的存在，这种由程序员自己写程序来管理的轻量级线程叫做『用户空间线程』，具有对内核来说不可见的特性。
   
# 进程和线程的区别与联系
【区别】：
调度：线程作为调度和分配的基本单位，进程作为拥有资源的基本单位；
并发性：不仅进程之间可以并发执行，同一个进程的多个线程之间也可并发执行；
拥有资源：进程是拥有资源的一个独立单位，线程不拥有系统资源，但可以访问隶属于进程的资源。
系统开销：在创建或撤消进程时，由于系统都要为之分配和回收资源，导致系统的开销明显大于创建或撤消线程时的开销。但是进程有独立的地址空间，一个进程崩溃后，在保护模式下不会对其它进程产生影响，而线程只是一个进程中的不同执行路径。线程有自己的堆栈和局部变量，但线程之间没有单独的地址空间，一个进程死掉就等于所有的线程死掉，所以多进程的程序要比多线程的程序健壮，但在进程切换时，耗费资源较大，效率要差一些。
【联系】：
一个线程只能属于一个进程，而一个进程可以有多个线程，但至少有一个线程；
资源分配给进程，同一进程的所有线程共享该进程的所有资源；
处理机分给线程，即真正在处理机上运行的是线程；
线程在执行过程中，需要协作同步。不同进程的线程间要利用消息通信的办法实现同步。


# 怎么看nodejs可支持高并发？
1. nodejs是单线程架构模型，单线程的优势：在于节省了线程切换的开销以及线程冲突的问题
   劣势：劣势也很明显，现在起步都是 4 核，单线程没法充分利用 cpu 的资源
   单线程，一旦崩溃，应用就挂掉了，大家调试脚本也知道一旦执行过程报错了，本次调试就直接结束了
   因为只能利用一个 cpu ，一旦 cpu 被某个计算一直占用， cpu 得不到释放，后续的请求就会一直被挂起，直接无响应了
   当然这些劣势都已经有成熟的解决方案了，使用 PM2 管理进程，或者上 K8S 也可以
2. 核心在于Node事件循环机制和异步I/O处理
浏览器和 nodejs 的事件循环是稍有区别的，nodejs 是异步非阻塞的，之所以单线程能处理高并发的原因，得益于libuv层的事件循环机制和底层线程池实现
Node 中的 Event Loop 和浏览器中的是完全不相同的东西。Node.js采用V8作为js的解析引擎，而I/O处理方面使用了自己设计的libuv，是Node专门开发的一个封装库，提供跨平台的异步I/O能力。
我们所说的node.js单线程只是一个js主线程与ui渲染共享一个线程，本质上的异步操作还是由线程池完成的，node将所有的阻塞操作都交给了内部的线程池去实现，本身只负责不断的往返调度，并没有进行真正的I/O操作，从而实现异步非阻塞I/O，这便是node单线程和事件驱动的精髓之处了。

Node.js的运行机制如下:
V8引擎解析JavaScript脚本。
解析后的代码，调用Node API。
libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
V8引擎再将结果返回给用户。

1. 浏览器事件循环机制中，微任务的任务队列是在每个宏任务执行完之后执行。
2. Node事件循环机制中，微任务会在事件循环的各个阶段之间执行，也就是说，一个阶段执行完毕，就会去执行微任务队列的任务。

事件循环中细分为这六个阶段，依次如下：
Timers: 定时器 Interval Timoout 回调事件，将依次执行定时器回调函数
Pending callbacks: 执行延迟到下一个循环迭代的 I/O 回调。
Idle,prepare:  队列的移动，仅系统内部使用
Poll轮询: 检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 setImmediate() 排定的之外），其余情况 node 将在此处阻塞。
Check: 执行 setImmediate() 的回调，setImmediate在这里执行
Close callbacks: 执行close事件的callback，如执行 socket 的 close 事件回调