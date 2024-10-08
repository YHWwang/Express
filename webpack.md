# Webpack

# Webpack核心概念
入口(entry):指示 webpack 应该使用哪个模块，来作为构建其内部依赖图
输出(output):告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件
编译器(loader): 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中
插件(plugin):loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务
模式(mode)
浏览器兼容性(browser compatibility)
环境(environment)
Webpack的构建大致就是一个初始化、编译、输出的过程
1. 初始化：启动构建，读取与合并配置参数，加载Plugin，实例化Compiler
2. 编译：从Entry发出，针对每个Module串行调用对应的Loader去翻译文件内容，再找到该Module依赖的Module,递归地进行编译处理
3. 输出：对编译后的Module组合成Chunk,把Chunk转换成文件，输出到文件系统


# webpack 构建过程
1. 根据配置，识别入口文件；
2. 逐层识别模块依赖（包括 Commonjs、AMD、或 ES6 的 import 等，都会被识别和分析）；
3. Webpack 主要工作内容就是分析代码，转换代码，编译代码，最后输出代码；
4. 输出最后打包后的代码。

# webpack常见的优化手段
一、 打包速度
1. Loader 设置include和exclude指定文件搜索范围
2. cache-loader 缓存loader处理的结果
3. happypack多线程打包
4. webpack-pacallel-uglify-plugin并行运行UglifyJS插件
5. DDLPlugin
二、打包体积
1. image-webpack-loader压缩图片
2. CDN加速
3. gzip压缩
4. 公共代码抽离

 # 公共代码抽离
     config.optimization = {
      splitChunks: {
          cacheGroups: {
              vendor: {
                  chunks: 'all',
                  test: /node_modules/,
                  name: 'vendor',
                  minChunks: 1,
                  maxInitialRequests: 5,
                  minSize: 0,
                  priority: 100
              },
              common: {
                  chunks: 'all',
                  test: /[\\/]src[\\/]js[\\/]/,
                  name: 'common',
                  minChunks: 2,
                  maxInitialRequests: 5,
                  minSize: 0,
                  priority: 60
              },
              styles: {
                  name: 'styles',
                  test: /\.(sa|sc|c)ss$/,
                  chunks: 'all',
                  enforce: true
              },
              runtimeChunk: {
                  name: 'manifest'
              }
          }
      }
  }

# webpack打包vue慢怎么办?
一、cdn加速
    1.使用webpack-bundle-analyzer对项目进行模块分析，查看哪些模块体积过大，然后针对性优化，比如我项目中引用了常用的UI库element-ui和echarts等按需加载
    2.配置webpack的externals,防止将某些import的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖。
    3.然后在main.js中移除相关库的import
    4.在index.html模板文件中，添加相关库的cdn引用
二、webpack.base.config.js文件配置
    1.include：path.resolve(__dirname, "app/src"),--匹配特定条件，一般是提供一个字符串或者字符串数组（目录绝对路径或文件绝对路径）
    2.exclude：/node_modules/--排除特定条件。一般是提供一个字符串或字符串数组（目录绝对路径或文件绝对路径）
三、DDLPlugin
    一般代码分为业务代码和第三方库，把复用性较高的第三方模块打包到动态链接库中，在不升级这些库的情况下，动态库不需要重新打包，每次构建只重新打包业务代码。
四、 happypack

# assets和static的区别
相同点：都是存放静态资源文件，
不同点：打包时会压缩assets减少体积，所以需要压缩的静态文件放在assets中,第三方资源放在static中

webpack:
deleteOriginalAssets: false //删除原文件
  productionSourceMap: false // 是否生成map文件
# loaders的理解
它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。
打包css:style-loader,css-loader
打包图片字体等媒体:url-loader,file-loader
打包图片文件：image-webpack-loader
es6转换es5:babel-loader

优化方法：
    test:/\.js$/,
    loader:'babel-loader',     1.压缩js文件
    include:[resolve('src')],  2.只在src文件夹下查找
    exclude:/node_modules/      3.不会去查找的路径

# plugins的理解
是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务
运行在编译周期的过程中，扩展webpack的功能引用第三方插件，不仅只局限在打包，资源的加载上，它的功能要更加丰富
CommonsChunkPlugin：将chunks相同的模块代码提取成公共js
HotModuleReplacementPlugin: HMR热更新，不用刷新浏览器而将新的变更的模块替换掉旧的模块
UglifyjsWebpackPlugin：压缩 JS(webpack4.0以上，node6.9以上)
webpack-pacallel-uglify-plugin:并行运行UglifyJS插件
CopyWebpackPlugin: 将文件或者文件夹拷贝到构建的输出目录


# 如何利用webpack来优化前端性能？（提高性能和体验）
1.压缩代码，UglifyJsPlugin压缩js,css-loader和style-loader压缩css,url-loader和file-loader压缩媒体文件，image-webpack-loader压缩图片
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
4.修改vue.config.js中的配置项,关闭map文件的生成，productionSourceMap: false。如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错，也就是说map文件相当于是查看源码的一个东西
# image-webpack-loader压缩图片(file-loader之后不能使用image-webpack-loader)
  {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug:true
          }
        }
        ]
      },
# Gzip压缩，config->index(https://www.cnblogs.com/zigood/p/12504401.html)
    build:{
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
    }

  if (config.build.productionGzip) {//gzip配置
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        //asset: '[path].gz[query]',
        filename: '[path].gz[query]',//注意这里改成filename
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          config.build.productionGzipExtensions.join('|') +
          ')$'
        ),
        threshold: 10240,
        deleteOriginalAssets: false,//删除源文件,不建议
        minRatio: 0.8
      })
    )
  }
# happypack提升webpack构建速度 --https://blog.csdn.net/zgd826237710/article/details/88172290
在使用 Webpack 对项目进行构建时，会对大量文件进行解析和处理。当文件数量变多之后，Webpack 构件速度就会变慢。由于运行在 Node.js 之上的 Webpack 是单线程模型的，所以 Webpack 需要处理的任务要一个一个进行操作。而 Happypack 的作用就是将文件解析任务分解成多个子进程并发执行。子进程处理完任务后再将结果发送给主进程。所以可以大大提升 Webpack 的项目构件速度

# webpack-parallel-uglify-plugin 并行运行UglifyJS插件，可有效减少构建时间（安装版本不可过高）
  new ParallelUglifyPlugin({
      cacheDir: '.cache/',//缓存文件
      uglifyJS: {
        output: {
          comments: false
        },
        warnings: false,解决warnings警告问题
        compress: {
          // warnings: false, 默认放这里会警告`warnings` is not a supported option  ，内容不支持“警告”选项
          drop_debugger: true,
          drop_console: false
        }
      }
    }),
    // UglifyJsPlugin
new UglifyJsPlugin({
        uglifyOptions: {
            compress: {
                drop_debugger: true,
                drop_console: true,  //生产环境自动删除console
            },
            warnings: false,
        },
        sourceMap: false,
        parallel: true,（重点）//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
    })
