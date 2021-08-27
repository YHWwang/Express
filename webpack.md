# Shipping

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
