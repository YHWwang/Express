# Webpack

# loaders的理解
打包css:style-loader,css-loader
打包图片字体等媒体:url-loader,file-loader
es6转换es5:babel-loader
仅仅只为打包文件，在打包之前运行
# plugins的理解
CommonsChunkPlugin：将chunks相同的模块代码提取成公共js
HotModuleReplacementPlugin: HMR热更新，不用刷新浏览器而将新的变更的模块替换掉旧的模块
UglifyjsWebpackPlugin：压缩 JS
CopyWebpackPlugin，将文件或者文件夹拷贝到构建的输出目录
运行在编译周期的过程中，扩展webpack的功能引用第三方插件，不仅只局限在打包，资源的加载上，它的功能要更加丰富

# 如何利用webpack来优化前端性能？（提高性能和体验）
1.压缩代码，UglifyJsPluggin压缩js,css-loader和style-loader压缩css,url-loader和file-loader压缩媒体文件.
2.利用cdn加速，在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。
例如echart进行cdn加速
    (1).webpack.base.conf.js文件中配置外部扩展externals 
        externals: {
            echarts: 'echarts',
        },
    (2).在index.html模板中加入 
    <script src="https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts.in.s"></script>
    (3).直接在vue里使用echart.init() // 具体为什么不需要this.$echart.init()猜测可能是在index页面中全局引用
3.开启gizp压缩
4.修改vue.config.js中的配置项,关闭map文件的生成，productionSourceMap: false