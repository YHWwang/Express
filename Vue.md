# vue生命周期8+2+1
1. created,beforeCreate,mounted,beforeMount,updated,beforeUpdate,destory,beforeDestory
2. keep-alive中组件有俩个生命周期：activated（组件激活）,deactivated（组件未激活）
    组件创建和销毁性能上消耗大，激活和未激活则有效的缓存了组件，目的呢就是不让组件重复的渲染
3. errorCaptured（捕获子孙组件的错误）

# 更改组件内部的样式 /deep/ (深度选择器)

# 虚拟DOM节点优异
理解：用js模拟一颗dom树,放在浏览器内存中.当你要变更时,虚拟dom使用diff算法进行新旧虚拟dom的比较,将变更放到变更队列中,反应到实际的dom树,减少了dom操作.

优点：虚拟DOM具有批处理和高效的Diff算法,最终表现在DOM上的修改只是变更的部分，可以保证非常高效的渲染,优化性能.

缺点：首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。

# Vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式,集中式存储管理应用的所有组件的状态
场景：多个组件共享数据或者是跨组件传递数据时
1. state：用来存储变量,响应式数据
2. getters：就像计算属性computed一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
3. mutations：同步函数，更改store中的状态的唯一方法是提交store.commit()
4. actions：异步函数，通过 store.dispatch 方法触发，提交到mutations中,调用异步 API 和分发多重 mutation：
5. module：Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割.调用方法this.$store.dispatch('app/increment')--(这种方法需要把文件里的state等功能变量名都export default 导出)而this.$store.dispatch('increment')--（改方法中state等功能都在一个变量中只需将导出该名），获取数据this.$store.state.app.count
require.context()动态模块热重载

# vuex的State特性
一、Vuex就是一个仓库，仓库里面放了很多对象。其中state就是数据源存放地，对应于与一般Vue对象里面的data
二、state里面存放的数据是响应式的，Vue组件从store中读取数据，若是store中的数据发生改变，依赖这个数据的组件也会发生更新
三、它通过mapState把全局的 state 和 getters 映射到当前组件的 computed 计算属性中

# vue-router
路由重定向：redirect:'路由地址' 改变路由url或组件。父组件是公共组件的情况下，可重定向到嵌套子组件path，再次添加新组件.如果地址不存在则会执行定义的*路由。重定向传参 path: '/guide/:id', redirect: '/guide/:id/index'
别名：alias:'name' 只改变url，组件不变
$router路由实例化对象，包括路由的跳转方法（push,replace),钩子函数等
$route当前路由对象，它包括path，params，hash，query，name等参数；
router.addRoutes(accessRoutes)添加一条新路由规则。如果该路由规则有 name，并且已经存在一个与之相同的名字，则会覆盖它。

# 开发一个不同用户不同权限显示不同菜单项目，需要实现不同权限添加不同路由(https://segmentfault.com/a/1190000009506097)
路由分为静态和动态路由，在对后台权限管理时尤为重要，在设置动态路由时我们要设置meta{roles:['admin']}的身份，

# 路由组件的钩子函数：
    全局导航钩子：beforeEach、beforeResolve、afterEach
　　路由独享导航钩子：beforeEnter
　　组件内的导航钩子：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave
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


# 兄弟组件之间的传值（https://www.cnblogs.com/zhilu/p/13851827.html）
1.中继：通过props,emit方法给父组件，之后再让父组件分发给其它组件
2.事件总线：通过创建一个新的全局vue对象EventBus,EventBus.$emit和EventBus.$on去执行方法并监听方法

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
   
#  在ssr下当webp图片文件加载不出来时，是图片接口类型变成了text/html
   解决：webpack.base.conf.js下对图片的限制limit值小了，调大到一定量就可以

# 关于一个域名下存放俩个vue项目
前台：
1.在config.js下配置build,    assetsSubDirectory: './static'和 assetsPublicPath: '/路径名'
2.在router下的index中配置   mode: 'history'和 base:'/路径名/'
3.在打包的dist中的index.html中增加  <meta base='/路径名/'>
其他在nginx中配置   https://www.cnblogs.com/dzcici/p/13877338.html

# vue-piczoom 放大镜设置mouse-cover-canvas布设置top无效
原因是以#app进行定位，所以应在app.vue中设置top值（组件包含在一个有固定高宽的容器内width:500px;height:500px）

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
