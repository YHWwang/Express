# CSS

# 画一条0.5px的线
1. 可以通过直接设置宽高border为0.5px(chrome,安卓不支持)
2. 设置box-shadow的垂直方向的偏移量为0.5px(chrome,安卓支持,其它不支持)
3. 借助线性渐变linear-gradient
4. 使用transform: scaleY(0.5)的方法（都支持）
5. 使用SVG的方法。
单独用transform: scaleY(0.5);height: 1px;这样肯定是会变虚，加上这个transform-origin: 50% 100%;就不会有虚化

# 盒子模型
1. IE盒子模型，content-box,包含了padding和border，盒子高宽包含边框+内边距+内容
2. W3C标准盒子模型，border-box，盒子高宽就是盒子的高宽，不包括border,padding

# 选择器有哪些
css选择器：id，class，标签，通用，属性，伪类，伪元素，子类
css权重：!import > 内联样式> id > class > 标签|伪类|属性 > 伪元类 > 通配符 > 继承
# px、em、rem、vw
px固定大小
em根据父元素的字体大小
rem根据根元素html字体大小
vw可视窗口的宽度,而百分比和其父元素的宽度有关

# 用css创建一个三角形
   width: 0;
    height: 0;
    margin: 100px auto;
    border-top: 50px solid transparent;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 50px solid red;

# SASS

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

