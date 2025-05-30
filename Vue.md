# vue-router------------
路由重定向：redirect:'路由地址' 改变路由url或组件。父组件是公共组件的情况下，可重定向到嵌套子组件path，再次添加新组件.如果地址不存在则会执行定义的*路由。重定向传参 path: '/guide/:id', redirect: '/guide/:id/index'
别名：alias:'name' 只改变url，组件不变
$router路由实例化对象，包括路由的跳转方法(push,replace),钩子函数等
$route当前路由对象，它包括path，params，hash，query，name等参数；
router.addRoutes(accessRoutes)添加一条新路由规则。如果该路由规则有 name，并且已经存在一个与之相同的名字，则会覆盖它。

# active-class来自router-link组件

# 路由组件的钩子函数：
1. 全局导航钩子：beforeEach、beforeResolve、afterEach
2. 路由独享导航钩子：beforeEnter
3. 组件内的导航钩子：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave
参数：to、from、next；正对不同的钩子函数参数有所差异。

# vue-router有几种模式
1. hash,默认模式，url会有#号,hash模式的特点在于hash出现在url中，但是不会被包括在HTTP请求中，对后端没有影响，不会重新加载页面。
2. histroy：向history栈中添加一个路由，history中存在记录。利用了HTML5 History Interface中新增的pushState()和replaceState()方法。只是当他们进行修改时，虽然修改了url，但浏览器不会立即向后端发送请求。特别注意，history模式需要后台配置支持。如果后台没有正确配置，访问时会返回404。

# 路由跳转的方法有哪些
this.$router.push(obj) 跳转到指定url路径，并想history栈中添加一个记录，点击后退会返回到上一个页面
this.$router.replace(obj)  跳转到指定url路径，但是history栈中不会有记录
this.$router.go(n)  向前或者向后跳转n个页面，n可为正整数或负整数
路由跳转时滚动到指定位置：在路由实例中设置方法scrollBehavior(){return {x:0,y:0}}

# 路由获取参数
1. query: this.$route.query.id
2. params: this.$route.params.id

# Vuex -----------
Vuex 是一个专为 Vue.js 应用程序开发的单向数据流的状态管理模式,集中式存储管理应用的所有组件的状态
场景：多个组件共享数据或者是跨组件传递数据时
1. state：用来存储变量,响应式数据
2. getters：就像计算属性computed一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
3. mutations：同步函数，更改store中的状态的唯一方法是提交store.commit()
4. actions：异步函数，通过 store.dispatch 方法触发，提交到mutations中,调用异步 API 和分发多重 mutation：
5. module：Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割.
调用方法：
this.$store.dispatch('app/increment')--(这种方法需要把文件里的state等功能变量名都export default 导出)
this.$store.dispatch('increment')--（改方法中state等功能都在一个变量中只需将导出该名），获取数据this.$store.state.app.count
require.context()动态模块热重载

# vuex的State特性
一、Vuex就是一个仓库，仓库里面放了很多对象。其中state就是数据源存放地，对应于与一般Vue对象里面的data
二、state里面存放的数据是响应式的，Vue组件从store中读取数据，若是store中的数据发生改变，依赖这个数据的组件也会发生更新
三、它通过mapState把全局的 state 和 getters 映射到当前组件的 computed 计算属性中

# Vuex实现登录验证
  1. 输入正确的用户名密码后，返回的token存到cookie中
  2. 在之后的axios请求中的请求拦截器axios.interceptors.request.use中带上token,
  3. 后台在判断请求是否有无token,有则比对成功就返数据，无token或者失效则返回401
  4. 前端设置axios响应拦截器axios.interceptors.response.use分析状态码，如拿到状态码401就清除token并跳转到登录页

# VUE ----------------------

# vue是怎么解析template的? template会变成什么?
1. 通过parse用正则等方法去解析template模板中的指令、变量、标签等数据形成AST抽象语法树
2. 通过optimize优化ast抽象语法树，标记静态节点和静态根节点，patch更新对比的时候跳过这些节点比对和重新渲染
3. 通过generator将优化好的ast抽象语法树，通过递归的方式，拼接为render字符串，最终转换成渲染函数render
# vue如何构建AST的流程？
首先通过浏览器中HTMLParser的大致流程，对AST的构建形成初步的认识：
1，将一个HTML标签分解为startTag，endTag和文本内容三部分对待；
2，创建一个栈结构，用来存放startTag；
3，遇到起始标签时入栈，遇到结束标签时出栈。每插入一个起始标签，都会以栈中上一个标签当作父节点；
4，对自闭合标签做特殊处理；
5，若出现嵌套问题，即结束标签与栈顶标签对应不上，则从栈顶一直循环出栈，直到找到相匹配的起始标签，并抛出错误；
6.判断标签类型的，很简单，用正则表达式去匹配
# 解析指令？模板变量？html标签？ 
parse的核心实现是调用了parseHTML函数，且传入了start,end,chars,comment四个方法
1. options.comment在html字符串中找到第一个<符号，如果<位于第一个位置，那么它有几种可能：1.代表可能是注释标签、2.浏览器兼容判断相关的标签、3.<!DOCTYPE>标签；以上三者都是一些比较特殊的标签，基本都会通过advance方法跳过这些标签；而advance的作用就是每解析一段html代码就将解析完的截取掉，然后通过while循环解析剩下的html代码。紧接着，剩下的就只有两种其他的标签，一种是开始标签如<div，一种是结束标签如</div>；endTagMatch，startTagMatch他们分别对应两个方法：parseStartTag和parseEndTag
2. options.start中parseStartTag主要做了两件事：第一件事是通过正则匹配解析出开始标签名称；然后第二件事通过while循环匹配属性，解析出所有标签的属性。解析完成后，会使用handleStartTag进一步处理标签,处理后的属性更加直观，同时也更方便我们去处理
3. options.chars此时会继续执行while循环，最后通过判断得出当前走到了文本内容；这里主要是分为两种情况，一种是文本里有动态数据的，比如我们文本里有{{ msg }}定义的数据，那么就会通过parseText解析出相应的tokens。否则直接按静态文本处理。最后将文本添加到currentParent.children中。
4. options.end中解析完文本后，html就只剩下</div>了，此时while循环会走parseEndTag方法，该方法主要的目的就是通过当前结束标签去找起始标签。匹配完成后将起始标签弹出栈
其主要思想就是遍历html的字符，然后进行匹配，将所有匹配到的开始标签压入栈中。当匹配到结束标签时，从栈中找到最近的相匹配的标签，将其弹出栈，然后形成一个完整的ast节点。当遍历完成时，所有的节点就会形成一棵语法树（ast）。

# 对Vue理解
渐进式框架，只需关注视图层，1.易用->提供数据响应式让开发者只需关心业务，灵活->众多库vuex、vue-router、vue-cli等工具，高效->采用diff算法更新虚拟DOM；缺点也很明显就是不支持IE8以下的版本并且对网站的SEO不利，当然也有ssr服务端渲染方式，库nuxt.js来提高SEO

# .sync属性的认识
一个组件上只能有一个v-model，.sync修饰符可以有多个。
.sync多个组件属性需要双向绑定时使用,带有.sync修饰符的v-bind不能和表达式一起使用
vue的子组件不能直接使用父组件的数据，需要用到prop传递数据。vue通过自定义事件系统来帮助我们修改父组件上的数,子组件通过$emit()方法修改父组件上面的数据。
:a.sync="num"//它等价于:a="num" @update:a="val=>num=val"
使用.sync后写法需要注意的是：eventName只能采用update:传递过来的prop属性的方式才行。this.$emit("update:value", e.target.value)
.sync只是个语法糖

# vue父子组件的渲染顺序
   1. 挂载渲染的顺序
   父组件 beforeCreate created beforeMount
   子组件 beforeCreate created beforeMount mounted
   父组件 mounted
   2. 更新的顺序
   父组件 beforeUpdate
   子组件 beforeUpdate updated
   父组件 updated
   3. 销毁的顺序
   父组件 beforeDestroy
   子组件 beforeDestroy destroyed
   父组件 destroyed

# vue中render函数和template的区别
Vue 模板会被预编译成虚拟 DOM 渲染函数。Vue 也提供了 API 使我们可以不使用模板编译，直接手写渲染函数。在处理高度动态的逻辑时，Render渲染函数相比于模板更加灵活，因为你可以完全地使用 JavaScript 来构造你想要的 vnode。
那么为什么 Vue 默认推荐使用模板呢？有以下几点原因：
模板更贴近实际的 HTML。这使得我们能够更方便地重用一些已有的 HTML 代码片段，能够带来更好的可访问性体验、能更方便地使用 CSS 应用样式，并且更容易使设计师理解和修改。
由于其确定的语法，更容易对模板做静态分析。这使得 Vue 的模板编译器能够应用许多编译时优化来提升虚拟 DOM 的性能表现

# Vue2和Vue3中虚拟DOM的区别?
   1. 在vue2中，每次更新真实DOM之前都是对虚拟DOM全量对比 
   2. vue3中则是只对比带PatchFlag的这些node会被真正的追踪，也就是说在后续更新的过程中，Vue会知道静态节点不用管，只需要追踪带有PatchFlag的节点，这样大大的减少了非动态内容的对比消耗

 # 虚拟DOM节点优异
理解：用js模拟一颗dom树,放在浏览器内存中.当你要变更时,虚拟dom使用diff算法进行新旧虚拟dom的比较找出差异,将差异补丁通过patchVnode去反应到实际的dom树,只更新差异的部分减少了dom操作.
优点：虚拟DOM具有批处理和高效的Diff算法,最终表现在DOM上的修改只是变更的部分，可以保证非常高效的渲染,优化性能.
缺点：首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。

# 虚拟DOM的原理 （diff算法：对比找出需更新的节点，根据patch操作真实节点）
1. 用 JavaScript 对象模拟真实 DOM 树进行抽象创建虚拟DOM树
2. diff 算法 — 对比两棵虚拟 DOM 树的差异找出需更新的节点，diff 整体策略为：深度优先，同层比较
3. patch 算法(打补丁) — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树

# vue diff算法的逻辑
vue diff 算法是一种通过同层的树节点进行比较的高效算法。diff 整体策略为：深度优先，同层比较
其有两个特点：
1. 比较只会在同层级进行, 不会跨层级比较 
2. 在 diff 比较的过程中，循环从两边向中间比较(vue 的双端比较法)

新旧两个 VNode 节点的左右头尾两侧均有一个变量标识，在遍历过程中这几个变量都会向中间靠拢。当 oldStartIdx <= oldEndIdx 或者 newStartIdx <= newEndIdx 时结束循环。在遍历中，如果存在 key，并且满足 sameVnode，会将该 DOM 节点进行复用(只通过移动节点顺序)，否则则会创建一个新的 DOM 节点。
oldStartVnode、oldEndVnode 与 newStartVnode、newEndVnode 两两比较共有四种比较方法：

1. oldStartVnode/newStartVnode 比较
2. oldEndVnode/newEndVnode 比较
当新旧 VNode 节点的 start 或者 end 满足 sameVnode 时，也就是 sameVnode(oldStartVnode, newStartVnode) 或者 sameVnode(oldEndVnode, newEndVnode) 表示为 true，直接将该 VNode 节点进行 patchVnode 即可（保留）。

3. 当旧子树的开始节点与新子树的结束节点相同时
当 oldStartVnode 与 newEndVnode 满足 sameVnode，即 sameVnode(oldStartVnode, newEndVnode)。这时候说明 oldStartVnode 已经跑到了 oldEndVnode 后面去了，进行 patchVnode 的同时还需要将真实 DOM 节点移动到 oldEndVnode 的后面。

4. 当旧子树的结束节点与新子树的开始节点相同时
如果 oldEndVnode 与 newStartVnode 满足 sameVnode，即 sameVnode(oldEndVnode, newStartVnode)。这说明 oldEndVnode 跑到了 oldStartVnode 的前面，进行 patchVnode 的同时真实的 DOM 节点移动到了 oldStartVnode 的前面。
   
如果以上情况均不符合，说明开始和结束节点都不相同,进入key 的比较：
1. oldKeyToIdx：一个哈希表，存放旧节点的 key 与节点的映射关系,只不过这个 key 是 index 序列。1.如果没有 oldKeyToIdx 则会通过 createKeyToOldIdx 会得到一个 oldKeyToIdx，从 oldKeyToIdx 这个哈希表中可以找到与新节点是否有相同 key 的旧节点
idxInOld：拿新节点的 key 去 oldKeyToIdx 找是否有与旧节点相同的节点，即旧节点中是否有与新节点 key 相同的节点，没有就通过 findIdxInOld 遍历旧节点并通过 sameVnode 判断是否有相同节点，有返回索引。遍历结束出现的俩种情况：
  2-1. idxInOld 不存在，即新节点在旧节点中都没有找到，说明这是一个之前没有的新节点，需要通过 createElm 创建新节点
  2-2. idxInOld 存在，则进一步通过 sameVnode(vnodeToMove(找到的相同节点key的Vnode), newStartVnode) 判断是否是同一节点，
    2-2-1：如果是：则将旧节点赋值给 vnodeToMove 变量，并调用 patchVnode 对比和更新节点差异，最后将 vnodeToMove 对应的 DOM 移动到最前面；
    2-2-2：如果不是，说明节点被修改了，重新创建对应的 DOM 元素，插入到 DOM 树中;

移动新节点索引，继续循环遍历,遍历结束，会出现两种情况:
1. 旧子节点个数小于新子节点个数，旧节点先遍历完（oldStartIdx > oldEndIdx），循环结束,此时新节点有剩余，把新剩余节点批量插入到旧右边
2. 旧子节点个数大于新子节点个数，新节点先遍历完（newStartIdx > newEndIdx），循环结束,此时旧节点有剩余，把旧剩余节点批量删除

dom diff 有一个显著的缺点：vue 横向比较存在 bug，v-for中key到底有什么作用？
解决方案：加了 key 没 bug，默认就是 key 就是 index，绝对不可以用 index 当做 key

# vue和react的diff算法，都是忽略跨级比较，只做同级比较。
1. vue diff时调动patch函数，参数是vnode和oldVnode，分别代表新旧节点。vue对比节点。当节点元素相同，但是classname不同，认为是不同类型的元素，删除重建，而React认为是同类型节点，只是修改节点属性。vue的列表对比，采用的是两端到中间比对的方式，
2. 而react采用的是从左到右依次对比的方式。当一个集合只是把最后一个节点移到了第一个，react会把前面的节点依次移动，而vue只会把最后一个节点移到第一个

# React diff算法策略
树形子节点比较Tree diff: 
1. 逐层比较
2. 如果是compontent，执行compontent diff
3. 如果是element，执行element diff
组件component diff:
1. 先看比较双方类型一不一致，不一致直接替换
2. 类型相同则更新属性
3. 深入组件进行递归 tree diff
元素element diff：
1. 先看标签名一不一致，不一致直接替换
2. 标签名一致比较属性
3. 深入标签进行递归 tree dif
  
# 虚拟DOM是如何合并patch的  (虚拟节点如何对比的？)
1.判断老节点是否存在-----不存在->直接创建并插入节点
2.存在老节点判断是否是同一个节点----不存在->创建真实节点插入并删除老节点
3.是同一节点进行使用patchVnode详细的对比并更新

# Vue2中是对数组进行监测变化的？
由于 Object.defineProperty 只对属性 key 进行监听，无法对引用对象进行监听，所以在 Vue2 中创建一个了 Observer 类对整个对象的依赖进行管理，当对响应式对象进行新增或者删除则由响应式对象中的 dep 通知相关依赖进行更新操作。
Object.defineProperty 也可以实现对数组的监听的，但因为性能的原因 Vue2 放弃了这种方案，改由重写数组原型对象上的 7 个能操作数组内容的变更的方法，从而实现对数组的响应式监听。（push,pop,shift,unshift,sort,reverse,splice）

# 为什么要通过重写数组原型的7个方法，是Object.defineProperty不能监测数组变化嘛？
Object.defineProperty()是可以监测数组的变化的，但也监听不了 push、pop、shift 等对数组进行操作的方法.缺点在于性能代码和获得的用户体验收益不成正比,所以只重写以上七种方法,
原理----
   1. 就是使用拦截器覆盖 Array.prototype,之后再去使用 Array 原型上的方法的时候，则使用的是拦截器提供的方法，在拦截器内部使用原生 Array 原型上的方法去操作数组。
   2. 通过拦截器之后，我们就可以追踪到数组的变化了，然后就可以在拦截器里面进行依赖收集和触发依赖了。
   3. 在数组进行响应式初始化的时候会在 Observer 类里面给这个数组对象的添加一个 __ob__ 的属性，这个属性的值就是 Observer 这个类的实例对象，而这个 Observer 类里面有存在一个收集依赖的属性 dep，所以在对数组里的内容通过那 7 个方法进行操作的时候，会触发数组的拦截器，那么在拦截器里面就可以访问到这个数组的 Observer 类的实例对象，从而可以向这些数组的依赖发送变更通知。

# Vue3的响应式原理是怎么样的？
1. 对于基础数据类型只能通过ref来实现其响应式，核心还是将其包装成一个RefImpl对象，并在内部通过自定义的get value() 与 set value(newVal)实现依赖收集与依赖更新。
2. 对于对象类型，ref与reactive都可以将其转化为响应式数据，但其在ref内部，最终还是会调用reactive函数实现转化。
reactive函数，刚开始对target进行响应式只读判断，如果为true，则直接返回target，否则返回createReactiveObject，reactive实现的核心方法是createReactiveObject()的五个参数：
    target： 传入的原始目标对象
    isReadonly: 是否是只读的标识
    baseHandlers: 为普通对象创建proxy时的第二个参数handler，重点解析get中的track()进行依赖收集和set中的trigger()进行依赖更新
    collectionHandlers: 为collection类型（Set,Map,WeakMap,WeakSet）对象创建proxy时的第二个参数handler
    proxyMap: WeakMap类型的map，主要用于存储 target与他的proxy之间的对应关系
主要通过创建了Proxy实例对象来对代理数据实现响应式，通过Reflect实现对数据源的获取与修改。

# vue3真的只使用Proxy就可以实现对数组的代理嘛？还需要进行什么设置呐？
Proxy构造函数的第一个参数是原始数据data；第二个参数是一个叫handler的处理器对象。Handler是一系列的代理方法集合，它的作用是拦截所有发生在data数据上的操作。这里的get()和set()是最常用的两个方法，分别代理访问和赋值两个操作。在Observer里，它们的作用是分别调用dep.depend()和dep.notify()实现订阅和发布。直接反映在Vue里的好处就是：我们不再需要使用Vue.$set()这类响应式操作了。除此之外，handler共有十三种劫持方式，比如deleteProperty就是用于劫持域删除。
当数组响应式对象使用 includes、indexOf、lastIndexOf 这方法的时候，它们内部的 this 指向的是代理对象，并且在获取数组元素时得到的值要也是代理对象，所以当使用原始值去数组响应式对象中查找的时候，如果不进行特别的处理，是查找不到的，所以我们需要对上述的数组方法进行重写才能解决这个问题。

# 什么是Vite
基于esbuild与Rollup，依靠浏览器自身ESM编译功能， 实现极致开发体验的新一代构建工具！
在生产环境，由于嵌套导入会导致发送大量的网络请求，即使使用HTTP2.x（多路复用、首部压缩），在生产环境中发布未打包的ESM仍然性能低下。
在开发环境Vite使用esbuild来构建依赖，生产环境Vite则使用了更加成熟的Rollup来完成整个打包过程。因为esbuild虽然快，但针对应用级别的代码分割、CSS处理仍然不够稳定，同时也未能兼容一些未提供ESM的SDK。
Vite由两个主要部分组成：
1. dev server：利用浏览器的ESM能力来提供源文件，具有丰富的内置功能并具有高效的HMR
2. 生产构建：生产环境利用Rollup来构建代码，提供指令用来优化构建过程

# 为什么说vite不需要配置css预处理器
Vite不需要配置CSS预处理器的主要原因是因为Vite通过插件系统支持各种CSS预处理器，并且这些插件已经内置或可以通过npm安装。此外，Vite默认支持PostCSS、Sass、Less和Stylus等预处理器，并且会自动将.css文件模块化处理

# 什么是除屑优化（Tree-Shaking）
除屑优化，也即“保留有用代码”，是 Rollup 的一个处理过程，用于消除在给定项目中实际上未使用的代码。它是一种冗余代码消除的形式，但与输出大小相关的其他方法相比，可以更加高效。该算法首先标记所有相关语句，然后“摇晃语法树（让枯叶掉落下来）”，删除所有冗余代码。它的思想与“标记-清除垃圾收集算法”类似。尽管此算法与 ES 模块本身并不相关，但这个思想使其更加高效，因为它们允许 Rollup 将所有模块作为一个具有共享绑定的大型抽象语法树进行处理。

ESM静态分析（export+import） + Tree-Shaking,摇树分两步走，
  Step 1：标记出模块导出值哪些没有被用过
    其中，标记过程又可以分为三个步骤：
    Make 阶段，收集导出变量并记录到模块依赖图ModuleGraph 变量中。
    Seal 阶段，遍历ModuleGraph 标记模块导出变量有没有被使用
    生成产物时，若变量没有被其他模块使用时则删除对应的导出语句
  Step 2：使用Terser删除掉没有被用到的导出语句

# vite和webpack的区别
1. Webpack通过先将整个应用打包，再将打包后代码提供给dev server，开发者才能开始开发，文件修改会对相关的依赖重新打包。（从入口文件进入逐层识别模块依赖，然后分析转换编译输出代码，最后打包）
2. Vite直接将源码交给浏览器，实现dev server秒开，浏览器显示页面需要相关模块时，再向开发服务器devServer发起请求，Vite劫持浏览器的HTTP请求，在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再返回给浏览器(整个过程没有对文件进行打包编译)，实现真正意义的按需加载。

# Vue.use原理
安装 Vue.js 插件，Vue.use会自动阻止多次注册相同的插件，届时即使多次调用也只会注册一次该插件
1. 如果Vue.use() 中的参数是一个function函数，那么函数的参数是Vue对象。
2. 如果Vue.use() 中的参数是一个Object对象，那么这个对象必须提供一个install方法，install方法的参数就是Vue。

# computed应用
多个参数（模块，包版本，更新版本，系统依赖版本）自动解析组合成一个包名。
自动生成：app_1.0.0_ts_0_ds_0
  computed: {
    getPackageName: {
      get: function () {
        let result = null;

        // 存在模块、包版本值的情况
        if (this.form.upgradeModule && this.form.upgradeVersion) {
          this.getPackageStr = "";
          // 模块
          this.getPackageStr =
            this.form.upgradeModule == 1
              ? "app_"
              : this.form.upgradeModule == 2
              ? "da_"
              : "sy_";

          // 包版本
          let upgradeVersion = this.form.upgradeVersion;
          if (upgradeVersion.includes("V")) {
            upgradeVersion = upgradeVersion.slice(1, upgradeVersion.length - 1);
          }
          let arrVer = upgradeVersion.split(".");
          let str = "";
          arrVer.forEach((item) => {
            if (item.length == 1) {
              str += item + ".";
            } else {
              for (let key = 0; key < 3; key++) {
                if (key == 2) return;
                if (Number.isInteger(parseInt(item[key]))) {
                  str += item[key];
                }
              }
              str += ".";
            }
          });
          this.getPackageStr += str + "_ts_";

          // 更新版本
          if (this.form.upgradeSoftVersion != 0) {
            this.form.upgradeSoftVersion.split(",").forEach((item) => {
              let arr = item.split(".");
              let str = "";
              for (let index = 0; index < 3; index++) {
                if (arr[index]) {
                  if (arr[index].length > 2) {
                    str += arr[index].slice(0, 2) + ".";
                  } else {
                    str += arr[index] + ".";
                  }
                }
              }
              this.getPackageStr += str.slice(0, str.length - 1) + "n";
            });
            this.getPackageStr =
              this.getPackageStr.slice(0, this.getPackageStr.length - 1) +
              "_ds_";
          } else {
            this.getPackageStr += 0 + "_ds_";
          }

          // 系统依赖版本
          if (this.form.upgradeSystemVersion != 0) {
            this.form.upgradeSystemVersion.split(",").forEach((item) => {
              let arr = item.split(".");
              let str = "";
              for (let index = 0; index < 3; index++) {
                if (arr[index]) {
                  if (arr[index].length > 2) {
                    str += arr[index].slice(0, 2) + ".";
                  } else {
                    str += arr[index] + ".";
                  }
                }
              }
              this.getPackageStr += str.slice(0, str.length - 1) + "n";
            });
            this.getPackageStr = this.getPackageStr.slice(
              0,
              this.getPackageStr.length - 1
            );
          } else {
            this.getPackageStr += "0";
          }
        }

        // 包名存在的情况
        if (
          this.form.upgradeProjectName &&
          this.form.upgradeProjectName.includes(this.getPackageStr)
        ) {
          result = this.form.upgradeProjectName;
          let _ds_Index = this.getPackageStr.slice(
            this.getPackageStr.indexOf("_ds_") + 4,
            this.getPackageStr.length
          );
          let _xlIndex = this.form.upgradeProjectName.slice(
            this.form.upgradeProjectName.indexOf("_ds_") + 4,
            this.form.upgradeProjectName.includes("x_")
              ? this.form.upgradeProjectName.indexOf("x_")
              : this.form.upgradeProjectName.length
          );
          if (_ds_Index != _xlIndex && !_xlIndex.includes("x")) {
            this.form.upgradeProjectName = result = this.getPackageStr;
          }
        } else {
          this.form.upgradeProjectName = result = this.getPackageStr;
        }
        return result;
      },
    },
  },

# 双向绑定底层原理(https://d2kbvjszk9d5ln.cloudfront.net/yshop/icon/pic/20230313-20230313060925507.jpg)
第一步：Observe的数据对象进行递归遍历包括子属性对象的属性,都加上setter和getter，使用Object.defineProperty监听属性变动,同时创建消息订阅器Dep来收集订阅者，数据变动之后调用setter就会触发notify,在调用订阅者的update方法
第二步：compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知执行更新函数
第三步：Watcher订阅者是Observer和Compile之间通信的桥梁，能够订阅并收到每个属性setter的变动通知，执行指令绑定的相应的回调函数从而更新视图
1. Object.defineProperty(监听input将指赋值给对象，触发绑定并赋值给dom)
  let a = {}
  Object.defineProperty(a,'text',{
    set:function(val){
      document.getElementById('inp).value = value
      document.getElementById('show).innerHTML = value
    }
  })
  document.getElementById('inp).addEventListener('keyup',function(e){
    a.text = e.target.value
  })
1. Proxy(监听input将对象赋值给inputProxy，)
  let inputProxy = new Proxy(a,{
    set:function(target,key,value){
        if (key === 'text' && value) {
                document.getElementById('show').innerHTML = value
                return (target[key] = value)
            }
    }
  })
 document.getElementById('inp).addEventListener('keyup',function(e){
    inputProxy.text = e.target.value
  })

# 动态给vue2的data添加一个新的属性时为什么不刷新？怎样解决？Vue.Set和this.$set的区别
vue2采用的Object.defineProperty()不会监测对象新属性的新增和删除.
Vue.set( target, propertyName/index, value )
this.$set( target, propertyName/index, value)
Vue.set将set函数绑定在Vue的构造函数上，需import引用Vue实例
this.$set将set函数绑定在vue原型上，只能设置实例创建后存在的数据（数据已经在data中）,直接用

# 直连AWS上传APK文件 aws-sdk
直连aws的s3桶上传文件
# 解析apk文件 AppInfoParser
1.解析apk文件拿出文件中的参数

# speak-MD5加密上传大文件
  1. fileReader实例去读取文件blob流readAsBinaryString()旧，向低版本兼容提供/readAsArrayBuffer()新
  2. 读取文件流后再用File.prototype.slice  数据文件.slice(start, Math.min(fileSize, start + sliceSize))切成数组，再依次同步上传数据块将（切片，下标等标识消息带过去）
  3. 根据接口返回的参数判断是否已经完成，后台合并文件存到aws的s3桶中
  4. 断点续传：查询服务器看哪些数据已经传成功标记一下，表示已经上传成功，只需要传剩下的部分。断点续传还需要实现文件覆盖功能，所以如果文件已经有了完整的大文件就要进行删除，上传完成后还要进行文件校验，比较上传前和上传成功后的文件大小。
  
  问题1：给后台传送完后并没有传到s3桶中，而只在后台合并文件必须进一步上传，返回的数据并不是真实已经完成了
  问题2：无法对apk文件进行分片，大图片和其它大文件都成功（具体原因不明）
  问题3: 传送速度到s3慢
  解决方法：通过aws-sdk连接aws服务器，真实上传,有上传进度

# 上传组件，需要具备的功能：
需要校验文件格式（仅需要获取文件的后缀）
可以上传任何文件，包括超大的视频文件（切片）File.prototype.slice得到切片数据流
在拿到全部切片和md5后，开始上传，此时服务器根据md5值首先会去查询一下是否已经存在当前文件。
1-1. 如果已存在，并且已经是上传成功的文件，则直接返回前端上传成功，即可实现"秒传"。
1-2. 如果已存在，并且有一部分切片上传失败，则返回给前端已经上传成功的切片name，前端拿到后，根据返回的切片，计算出未上传成功的剩余切片，然后把剩余的切片继续上传，即可实现"断点续传"。
2. 如果不存在，则开始上传，服务器根据全部已上传的切片合并成文件，此时上传成功后需再次上传额外文件关联关系参数，，这里需要注意的是，在并发上传切片时，需要控制并发量，避免一次性上传过多切片，导致崩溃。

# Vue3
基础类型：ref(初始值)定义
引用类型：reactive({
  key:vlaue
})
markRaw(将一个对象标记为不可以被转化为代理对象。返回该对象本身。const obj = markRaw({ name: name.value });)
shallowReactive(和 reactive() 不同，这里没有深层级的转换：一个浅层响应式对象里只有根级别的属性是响应式的。属性的值会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了。)
const {proxy} = getCurrentInstance()//获取组件实例化对象

组件传值
父-》子 defineProps  子-》父回调函数defineEmits
<select-user ref="selectRef" :roleId="queryParams.roleId" @ok="handleQuery" />
父：function handleQuery(val) {
      ...use val
    }
子：const props = defineProps({
      roleId: {
        type: [Number, String]
      }
    });
    const emit = defineEmits(["ok"]); emit("ok",value);

子-》父  子defineExpose抛出，父proxy.$refs
父：proxy.$refs["selectRef"].show()
子：function show() {
      queryParams.roleId = props.roleId;
      getList();
      visible.value = true;
    }
    defineExpose({
      show,
    });
依赖注入：父与孙provide+inject

# Vue3中使用v-if，v-else导致的渲染报错问题记录（Unhandled error during execution of scheduler flush. This is likely a Vue internals bug.）
发现v-if嵌套v-if渲染有可能出现这个问题；
解决方法：最外层用是v-if，里面用v-show

# 在Vue2中template标签中必须要有一个根元素，而Vue3中可以写多个，原理区别是什么？
1. 在Vue2中，模板(template)标签必须有一个根元素，这是因为Vue2中的编译器(compiler)需要将模板编译成一个render函数，而一个函数只能有一个返回值。因此，Vue2需要一个根元素来包含所有的子节点，以便编译器能够将它们编译成一个返回值。
2. 而在Vue3中，通过使用Fragment(片段)标签或者空标签，可以在template标签中包含多个根元素。这是因为Vue3中使用了新的编译器，它能够将多个根节点编译成一个返回值。这样可以让开发者更方便地组织模板结构，使代码更加简洁和易读。

# vue3.0新特征
  1. 支持Typescript
  2. 放弃class采用function-based API 函数式编程
  3. option API => Composition API（选项式API=>组合式API）
  4. Tree shaking support：支持按需编译，体积更小
  5. 重构VDOM
  6. 新的响应式机制（Object.defineProperty改用ES6的Proxy）

# VUE3.0抛弃Object.defineProperty改用ES6的Proxy的理解
Object.defineProperty缺点：
  1. 无法监听数组下标的变化，导致直接通过数组的下标给数组设置值，不能实施响应。
  2. 拦截的是对象的属性，会改变原对象
  3. 删除或者增加对象属性无法监听到
  4. 只能劫持对象的属性，因此我们需要对每个对象的每个属性进行遍历。Vue2.X里，是通过递归 + 遍历data对象来实现对数据的监控的，如果属性值也是对象那么需要深度遍历，显然如果能劫持一个完整的对象才是更好的选择。
其实说Object.defineProperty 本身是可以监控到数组下标的变化的，只是push、pop、shift、unshift、splice、sort、reverse等函数不能实时响应在 Vue 的实现中，从性能 / 体验的性价比考虑，放弃了这个特性。
   
Proxy理解：在目标对象之前设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。通过reflect(放射)对源对象的属性进行操作
Proxy的优点：
  1. 可劫持整个对象，并返回新对象
  2. 多种劫持操作（13种:get,set,has,deleteProperty,ownKeys...），可监听数组，监听对象属性的新增，删除等
应用场景：表单校验，数据格式化，增加附加属性（比如身份证号码之后，把出生年月，籍贯，性别都添加进用户信息里面）

# vue生命周期
  Vue的生命周期可以分为三个大阶段
  1. 初始化挂载阶段：beforeCreate，created,beforeMount,mounted(第一次页面加载时会触发,mounted挂载之后可获取dom)
  2. 数据更新渲染阶段: beforeUpdate,updated
  3. 销毁阶段: beforeDestroy,destroyed

# vue生命周期钩子
选项式Options api(13个):
  1. beforeCreate，created----mounted,beforeMount----updated,beforeUpdate----destory,beforeDestory
  2. keep-alive中组件有俩个生命周期：activated（组件激活）,deactivated（组件未激活）
      组件创建和销毁性能上消耗大，激活和未激活则有效的缓存了组件，目的呢就是不让组件重复的渲染
  3. errorCaptured（捕获子孙组件的错误）
  4. renderTracked (开发模式)-- 状态跟踪：只要页面有update的情况，它就会跟踪，然后生成一个event对象
  5. renderTriggered (开发模式) -- 状态触发：它不会跟踪每一个值，而是给你变化值的信息，并且新值和旧值都会给你明确的展示出来
组合式Composition API入口，setup函数注册生命周期钩子(11个):
  1.  onBeforeMount,onMounted
  2.  onBeforeUpdate,onUpdated
  3.  onBeforeUnmount,onUnmounted => 由destroyed，beforeDestroy改名
  4.  onErrorCaptured
  5.  onRenderTracked,onRenderTriggered
  6.  onActivated,onDeactivated
组合式API的优势：
  1.组件拥有了更加良好的代码组织结构
  2.相同的代码逻辑在不同的组件中进行了完整的复用

# setup（props、context(包含attrs、slots、emit)）函数（setup 中你应该避免使用 this，因为它不会找到组件实例）
增加了一个setup的生命周期函数，在beforeCreate生命函数之前执行，因此不能使用this获取实例
1. ref 响应式引用，带有 value property 的对象，不能使用es6解构会消除 prop 的响应性，解构使用toRefs
2. watch（ref变量, (newValue, oldValue)=>{}） 响应式更改,侦听响应式引用
3. computed 输出的是一个只读的响应式引用
4. setup函数只能是同步的不能是异步的（可配合async/await）,props是响应式的

# vue开发权限管理系统(https://segmentfault.com/a/1190000009506097)
前端权限控制可以分为四个方面：接口权限、按钮权限、菜单权限、路由权限
1. 接口权限：接口权限目前一般采用jwt的形式来验证，没有通过的话一般返回401，跳转到登录页面重新进行登录登录完拿到token，将token存起来，通过axios请求拦截器进行拦截，每次请求的时候头部携带token
2. 按钮权限：Vue.directive自定义指令进行按钮权限的判断，通过后台返回的数据中的permissions数组，判断绑定值是否在接口数据中.不在则移除节点el.parentNode.removeChild(el)，存在return true
3. 路由权限\菜单权限：路由分为静态和动态路由，在对后台权限管理时尤为重要，俩种方法：一种是前端在设置动态路由时我们要设置meta{roles:['admin']}的身份，第二种是后台管理系统来配置,在permission.js中设置router.beforeEach()在登录成功后去获取用户的角色信息，根据该角色去获取后台路由数据，得到的路由信息便是角色可访问的路由,将得到的路由数据格式化成组件对象格式包含懒加载
   (export const loadView = (view) => { // 路由懒加载
    return (resolve) => require([`@/views/${view}`], resolve)
  })
，获取到路由信息后通过router.addRoutes(动态路由)动态添加到可访问的路由表中，在通过next({ ...to, replace: true })确保addRoutes已完成,便得到可访问的菜单

# watch如何深度监测对象
  watch: {
    question: {
      handler(newQuestion) {
        // 在组件实例创建时会立即调用
      },
      immediate: true,// 强制立即执行回调
      deep: true //深度监测
    }
  }

# vue3 watch和watchEffect的区别
1. 使用方式：watch需要明确指定监测的数据源，而watchEffect不需要，它会自动追踪和依赖于使用到的响应式数据。‌
2. 初始化执行：watch在初始化时不会立即执行回调函数，而watchEffect会立即执行effect函数。
3. 获取数据变化前后的值：watchEffect获取不到更改前的值，而watch可以获取新值和旧值

# watch和computed的区别
watch：
1. 主要用于监控vue实例的变化，监控的变量和对象当然必须在data里面声明才可以，
2. 一般用于监控路由、input输入框的值特殊处理等等，它比较适合的场景是一个数据影响多个数据
3. 将对象和属性用引号的方式：‘对象名.属性名’（newVal,oldVal）{}
computed:
1. computed用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；
2. computed比较适合对多个变量或者对象进行处理后返回一个结果值，也就是数多个变量中的某一个值发生了变化则我们监控的这个值也就会发生变化，举例：购物车里面的商品列表和总金额之间的关系，只要商品列表里面的商品数量发生变化，或减少或增多或删除商品，总金额都应该发生变化。这里的这个总金额使用computed属性来进行计算是最好的选择
3. 这些计算将被缓存，并且只在需要时更新。

# computed和methods的区别
1. 虽然这两种方式输出的结果是相同的，但是性能上的消耗是不同的。methods每次页面渲染时都被执行一次
2. 只要results（数据）还没有发生改变，多次访问totalMark（函数）计算属性会立即返回之前的计算结果，而不必再次执行函数。
3. 计算属性是基于它们的依赖进行缓存的，而方法是不会基于它们的依赖进行缓存的。从而使用计算属性要比方法性能更好。


# 组件之间的传值（https://www.cnblogs.com/zhilu/p/13851827.html）
父子：props,emit
兄弟：
1.中继：通过props,emit方法给父组件，之后再让父组件分发给其它组件
2.事件总线：通过创建一个新的全局vue对象EventBus,EventBus.$emit和EventBus.$on去执行方法并监听方法
孙子：provide/inject

# 三级或者多级表格组件
    <TreeTable
      @give-advice="showAdvice" 
      :kindList="kindList" // 数据
      :head="headClass"
      name="tab1"
    ></TreeTable>
组件内
    <div>
    <el-table
      :id="name"
      class="tabChlid"
      :data="kindList"
      style="width: 100%"
      :header-row-style="head"
    >
      <el-table-column type="expand">//多级表格嵌套
        <template slot-scope="props">
          <TreeTableName // 子集表格数据 TreeTableName组件自己调用自己，
            v-if="props.row.children"
            @give-advice="showAdvice"
            :kindList="props.row.children"
            :head="headClass"
          ></TreeTableName>
        </template>
      </el-table-column>
      <el-table-column label="ID" align="center" prop="id" />
      ...
      
    showAdvice(advice) {
      //  this.$emit("kindList", advice);  无法向父级数据，可能是层级问题，导致kindList变量在组件未传值到父组件
      this.$emit("give-advice", advice); // 通过回调函数可行
    },
    
# vue组件自己调用自己
只需要再vue文件中设置name属性，让后再template中使用name属性值的标签
export default {
  name: "TreeTableName",
  }
 <TreeTableName
            v-if="props.row.children"
            :kindList="props.row.children"
            :header-cell-style="headClass"
          ></TreeTableName>


# mixin混入理解：（https://www.jianshu.com/p/4ab8d255d070）
1.使用场景可在运用在判断是否登录等重复性很高的功能，或者方法中。
2.可以局部混入跟全局混入
3.组件中方法性的优先级最高，其次是混入的方法
4.如果多个方法冲突，则已函数所在组件优先级高，混入方法优先级低


# NextTick:获取更新之后的dom节点
不能立即获取更新之后的dom是由于vue异步更新队列，其原理：操作dom后会加入到一个队列中，如果同一个执行多次只会推入一次(去重作用)，执行栈执行完后将任务队列的任务推入

# 白屏时间：输入url到渲染第一个元素/出现第一个元素的时间。
   在页面下的title后加window.pageStartTime = Date.now(); 在css加载完后加 window.firstPaint = Date.now();
   在控制台firstPaint - performance.timing.navigationStart  输出
# 首屏时间：输入url到首屏页面渲染完成的时间。
   在首屏可见模块后增加window.firstScreen = Date.now(); 控制台打印firstScreen- performance.timing.navigationStart
# 解决方法：路由懒加载，按需加载ui框架，gzip;项目依赖优化（依赖优化详细链接）
https://blog.csdn.net/weixin_42604828/article/details/93324751?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.baidujs&dist_request_id=&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.baidujs

# 调用第三方js插件时，js文件放在index.html，js代码要放在mounted函数中以便进行数据交互并用this指向全局获取数据
  
  append|prepend这类函数在li中插入标签时注意要使用eq(index)，不可使用$(node)[index]这种格式，否则将输出字符串而不是html代码
  本地使用load()引用html本地存在一个跨域问题,
  解决方法：vscode使用插件list server在html文件右击选择‘open with list server’即可，或者解决跨域问题

# 关于一个域名下存放俩个vue项目
前台：
1. 在config.js下配置build,    assetsSubDirectory: './static'和 assetsPublicPath: '/bi'
2. 在router下的index中配置   mode: 'history', base:'/bi/'
3. 在打包的dist中的index.html中增加  <meta base='/bi/'>
其他在nginx中配置   https://www.cnblogs.com/dzcici/p/13877338.html

# vue如何在js文件中设置i18n国际化
window.vm = new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
window.vm.$t(‘name’)//js中使用

根据不同的国际化语言设置不同的样式
document.getElementsByTagName('html')[0].setAttribute('lang',Cookies.get('lang') === 'en'? 'en' : 'zh');//判断当前语言并加入html
.classNamer:lang(en) {// css判断当前环境是否是’en’
Css
}

在路由中定义vue-i8n国际化
路由中设置：title: 'router.name'
vue:{{$t(item.title) }}
