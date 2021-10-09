# 安装sass

# sass的功能特性
1. 变量 
    $a:1px
    padding:$a
2. 混合:Mixins被当作一个公认的选择器，还可以在Mixins中定义变量或者默认参数。
    @mixin a($a:2px){//默认值为2px
        padding:$a
        }
    .b{
        @include a(5px)
    }
3. 嵌套
    .a{
        .b{}
    }
4. 运算符
    border:(@width/2) solid #000
5. 作用域：Sass中是不存在什么全局变量,一旦修改值都会更改
    $color:black
    .a{
        $color:blue//编译后全部的$color将变成blue
    }
6. 导入 @import 'index.css'

# webpack.base.conf.js
 {
        test: /\.(scss|sass)$/,
        use: [
           // Creates `style` nodes from JS strings
           'style-loader',
           // Translates CSS into CommonJS
           'css-loader',
           // Compiles Sass to CSS
           'sass-loader',
           //用于形成浏览器的前缀
           'postcss-loader'
        ]
      },
# package.json  版本过高会不匹配，以下版本可以运行
"node-sass": "^4.14.1",
"sass-loader": "^7.3.1",
"sass-resources-loader": "^2.2.4",

# 在需要的vue页面下
<style lang="scss" scoped="" type="text/css">
@import 'scss文件地址'
</style>

# uitl.js
 scss: generateLoaders('sass').concat({
      loader:"sass-resources-loader",
      options:{
        resources: path.resolve(__dirname,'./../src/assets/style/index.scss')
      }
    }),

# vscode安装live sass compiler 实时进行转换css
在扩展里选择live sass compiler右侧的设置按钮，选择扩展配置，在界面中点击"在settings.json中编辑"，输入以下配置

  "[scss]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },

    "liveSassCompile.settings.generateMap": false,
    "liveSassCompile.settings.autoprefix": [
        "> 1%",
        "last 3 versions"
    ],
    "liveSassCompile.settings.formats": [
        {
            "format": "compressed",
            1.嵌套输出 nested，2.展开输出 expanded ，3.紧凑输出 compact，压缩输出 compressed
            "extensionName": ".min.css",
            "savePath": null //文件输出路径
        }
    ],
    "liveSassCompile.settings.excludeList": [
        "**/node_modules/**",
        ".vscode/**"
    ]

