# easycom组件规范
传统vue组件，需要安装、引用、注册，三个步骤后才能使用组件
只要组件安装在项目的:
1. components目录下
2. uni_modules目录下
就可以不用引用、注册，直接在页面中使用。easycom打包后会自动剔除没有使用的组件

# 下拉刷新方法
1. pages.json配置"enablePullDownRefresh": true
2. 自定义下拉刷新scroll-view(https://uniapp.dcloud.net.cn/component/scroll-view.html)
注意，在webview渲染时，自定义下拉刷新的性能不及pages.json中配置的原生下拉刷新。
3. onPullDownRefresh() 页面中使用

# uni-app页面生命周期
1. onInit--监听页面初始化
2. onLoad--监听页面加载
3. onShow--监听页面显示
4. onReady--监听页面初次渲染完成
5. onHide--监听页面隐藏
6. onUnload--监听页面卸载
7. onResize--监听窗口尺寸变化
   
# uniapp如何实现跨端适配
使用条件编译模式，它可以实现js逻辑代码，template和css样式在某个环境中生效，在其他环境不生效
1. 以 #ifdef+环境名 开头  以#endif 结尾, 限制一段代码只在某个平台存在
2. 以 #ifndef+环境名 开头  以#endif 结尾, 限制一段代码除了某平台均存在

# vue、uni-app、小程序的页面传参方式区别
1. vue页面传参: 通过router-link标签或router对象路由跳转传参, url拼接传值 ,动态url传值, query对象传值,命名路由params传值 这四种传值方式
2. uniapp和小程序页面传参: 通过跳转路径后面拼接参数进行传值

# uni-app的路由和跳转
1. uni-navigateTo(object) 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
2. uni.redirectTo(object) 关闭当前页面，跳转到应用内的某个页面。
3. uni.reLaunch(OBJECT) 关闭所有页面，打开到应用内的某个页面。
4. uni.switchTab(OBJECT) 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
5. uni.navigateBack(OBJECT) 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。

# 小程序跳转到上一个页面会刷新吗？
在小程序中，跳转到上一个页面（通过 `navigateBack` 方法）并不会刷新页面。
跳转回上一个页面时，上一个页面的状态和数据会保留，页面会从后台恢复到前台显示。

小程序的页面栈是按照打开页面的顺序进行管理的，当跳转到上一个页面时，实际上是将当前页面从页面栈中移除，
然后显示上一个页面。因此，上一个页面并不会重新加载或刷新。

需要注意的是，如果上一个页面是通过 `redirectTo` 或 `switchTab` 方法跳转过来的，
并不会保留在页面栈中，所以无法通过 `navigateBack` 返回到上一个页面。

# 小程序如何解决跨域问题
1. 小程序没有跨域问题但需要“不校验url”,还需去网页后台配置“request合法域名”就可以了，并且必须是https开头
2. 浏览器需要设置代理来解决跨域问题==》类似于vue==〉proxy : server;在根目录新建vue.config.js ===》只在浏览器端生效;条件编译使用场景：处理跨域问题的时候，浏览器端不走请求的基础url，小程序运行，所以给这里加入条件编译判断

# 小程序分包
注意：在做项目的时候，就已经知道要分包的 ==》 千万别觉得马上要上线了，再去分包
分包不是上线才做的，是在开发的过程中，就知道会有这个问题，所以前置性就要做
1. 在manifest.json的视图源码中加入
    "optimization":{"subPackages":true}

2. 在 pages.json中进行分包：
"subPackages": [{
		"root": "login",
		"pages": [{
			"path": "login",
			"style": {
				"navigationBarTitleText": "登录"
			}
		}]
	}],

主包是不要分包的，主包有：首页 + tabbar页面

# 在非有dom的生命周期中拿到dom怎么办？
异步方法（promise,$nextTick）去获取dom

# 微信小程序如何获取DOM
uni
  .createSelectorQuery()
  .selectViewport()
  .scrollOffset((res) => {
    console.log("竖直滚动位置" + res.scrollTop);
  })
  .exec();

let view = uni.createSelectorQuery().in(this).select(".test");

view
  .fields(
    {
      size: true,
      scrollOffset: true,
    },
    (data) => {
      console.log("得到节点信息" + JSON.stringify(data));
      console.log("节点的宽为" + data.width);
    }
  )
  .exec();

view
  .boundingClientRect((data) => {
    console.log("得到布局位置信息" + JSON.stringify(data));
    console.log("节点离页面顶部的距离为" + data.top);
  })
  .exec();

# 关于适配问题
1. 移动动H5页面：使用 rem
2. uni-app小程序：rpx