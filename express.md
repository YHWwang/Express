
# 如何判断对象为空
1. 使用jquery自带的$.isEmptyObject()函数
2. 封装一个函数,一旦该对象的属性是可遍历的即说明该对象存在属性，则返回false，否则该对象为空对象。
    for(let a in obj){
        retrun false
    }
3. es6的Object.keys(obj).length的方法判断。
4. 通过JSON自带的.stringify方法将对象转化为字符串来判断
# px、em、rem、vw
px固定大小
em根据父元素的字体大小
rem根据根元素html字体大小
vw可视窗口的宽度,而百分比和其父元素的宽度有关

# scoped的原理，私有化样式的原理
vue通过在DOM结构以及css样式上加唯一不重复的标记，以保证唯一，达到样式私有化模块化的目的

# 选择器有哪些
css选择器：id，class，标签，通用，属性，伪类，伪元素，子类
css权重：!import > 内联样式> id > class > 标签|伪类|属性 > 伪元类 > 通配符 > 继承

# BFC(块级格式化上下文)
触发条件：
    body 根元素
    浮动元素：float 除 none 以外的值
    绝对定位元素：position (absolute、fixed)
    display 为 inline-block、table-cells、flex
    overflow 除了 visible 以外的值 (hidden、auto、scroll)
原理：具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。
通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。
1. 同一个BFC下外边距会发生重叠
2. BFC 可以包含浮动的元素（清除浮动）
3. BFC 可以阻止元素被浮动元素覆盖

# 伪类和伪元素的区别
伪类：（:hover, :foucs, :nth-chlid)等，冒号开头，用于向某些选择器添加特殊的效果。一个选择器中出现可以多个
伪元素：（::before, ::after）等，双冒号开头，用于将特殊的效果添加到某些选择器，一个选择器中只能出现一次

# HTML5
新标签:header,nav,section,main,aside,footer
删除标签：frame,big,center,font
表单新增类型：color,email,number,tel,url,date,month,week,time.
表单新增属性：pleaceholder占位符，required必填项，Pattern正则表达式，autofocus 获取焦点

# HTTP浏览器输入URL后发生了什么
1.浏览器（客户端）进行地址解析，补全域名，然后DNS域名解析得到对应的IP地址
2.根据这个IP，通过ip寻址找到目标（服务器）地址，三次握手建立TCP连接；
3.建立TCP链接后，发送HTTP请求
4.服务器响应HTTP请求，浏览器得到 html 代码
5.浏览器解析 html 代码
6.浏览器对页面进行渲染，呈现给用户
7.服务器关闭TCP连接（TCP的四次挥手）

# 关于webkit-line-clamp设置无效的问题
需要设置word-break: break-all;

# 关于summernote中添加表情包emoji按钮，中切换表情类型后插入的位置的错误问题，解决方法：
contenteditable属性指定元素内容是否可编辑
 $('.note-editor').focusin(function () {
    return false
  })
  $('.note-editor').focusout(function () {
    $('.note-editable').focus()
  })
  $('.note-insert .note-btn').eq(1).click(function(){//解决点击链接按钮后无法输入url的问题
    $('.note-editable').attr('contenteditable', false)
  })
  $('#summernoteBox .note-popover .note-btn-group .note-btn').eq(0).click(function(){//解决点击编辑区链接按钮后无法输入url的问题
    $('.note-editable').attr('contenteditable', false)
  })
  $(document).click(function (event) {
    let dom = $('.note-editor')[0]
    if (event.target != dom && !$.contains(dom, event.target)) {//点击判断点击区域是否是指定节点
      $('.note-editable').attr('contenteditable', false)
    } else {
      $('.note-editable').attr('contenteditable', true)
    }
  })
# HTML页面生成的渲染过程
    1. html被解析器解析成DOM树
    2. css被解析成CSSOM树
    3. DOM+CSSOM生成render树
    4. 生成布局flow,即将所有渲染树的所有节点进行平面合成
    5。将布局绘制到屏幕上

# swiper不在第一屏时初始化问题
    new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
        },
        initialSlide:0,
        autoplay: true,
        loop: true,
        observer:true,//解决无法初始化问题
        observeParents:true,//解决无法初始化问题
        on: {
            touchMove: function (swiper, event) {
                //你的事件
            },
        },
    });


# //fileinput插件上传头像  
    initFileInput("input-id");
    function initFileInput(ctrlName) {
        var control = $('#' + ctrlName);
        control.fileinput({
            language: 'zh', //设置语言
            uploadUrl: "/web/user/login/updateUserPhoto", //上传的地址
            allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
            uploadAsync: false, //默认异步上传，这里如果不是异步上传，多个图片一次性提交到后台，只发一次请求，如果为异步上传，每张图片都会发一次请求，多次请求
            showUpload: true, //是否显示上传按钮
            showRemove: true, //显示移除按钮
            showPreview: true, //是否显示预览
            showCaption: false,//是否显示标题
            browseClass: "btn btn-primary", //按钮样式
            maxFileSize: 10,
            maxFileCount: 1, //允许同时上传的最大文件个数
            enctype: 'multipart/form-data',
            validateInitialCount: true,
            msgFilesTooMany: "The number of files selected for upload ({n}) exceeds the maximum allowed value {m}!",
            msgSizeTooLarge: 'The maximum size of the pictures allowed to be uploaded is 10kb!',
            layoutTemplates: {
                // actionDelete:'', //去除上传预览的缩略图中的删除图标
                // actionUpload:'',//去除上传预览缩略图中的上传图片；
                // actionZoom:'',   //去除上传预览缩略图详情的图标
                // actionDownload:'' //去除上传预览缩略图中的下载图标
            },
            uploadExtraData: function () {   //向后台传递的附带参数
                var data = {
                    id: "10000",
                    msg: "这里可以添加参数"
                }
                return data;
            }
        }).on('filebatchuploadsuccess', function (event, data, previewId, index) {     //上传中
            // console.log($('.file-error-message ul li').text());
            if($('.file-error-message ul li').text() != ''){
              alert('The maximum size of the pictures allowed to be uploaded is 10kb!')
              $("#updateImageModal").modal('hide');
              $('div.modal-backdrop').hide();
              return false
            }
            console.log('文件正在上传');
        }).on("filebatchuploadsuccess", function (event, data, previewId, index) {    //一个文件上传成功
            var form = data.form, files = data.files, extra = data.extra,
                response = data.response, reader = data.reader;
            var data = data.response;
            $("#updateImageModal").modal('hide');
            $("#usersImage").attr("src", data.data);
            $('div.modal-backdrop').hide();
            console.log(response);//打印出返回的json
            console.log(response.status);//打印出状态
        }).on('filebatchuploaderror', function (event, data, msg) {  //一个文件上传失败
            console.log('文件上传失败！' + data.status);
        })
    }
    
# //js监听变量的变化
    
     var obj = {//对象
        category: 1,
    }
    var observe1 = (object, onChange) => {//proxy监听值的变化
        const handler = {
            get(target, property, receiver) {
                try {
                    return new Proxy(target[property], handler);
                } catch (err) {
                    return Reflect.get(target, property, receiver);
                }
            },
            set(target, key, value, receiver) {
                onChange(value);
                return Reflect.set(target, key, value, receiver);
            }
        };
        return new Proxy(object, handler);
    };
    var watchedObj = observe1(obj//监听的值必须为对象, (val) => {
        // console.log(`哈哈哈，监听到值变化为${val}了`);
    });
      watchedObj.category = size//size为动态变量
    
# $('#summernote').summernote({//富文本编辑选中图片上传图片流，返回图片的url
        placeholder: '',
        tabsize: 2,
        height: 462,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ],
        callbacks: {
            onImageUpload: function (files) {
                sendFile( $('#summernote'), files[0]);
            }
        }
    });
    //ajax上传图片
    function sendFile($summernote, file) {
            if((file.size / 1024 / 1024) > 1) {//限制图片文件的大小
            $('#alertBox').html(`
            <div class="alert alert-warning  alert-dismissible fade show" role="alert">
            Picture cannot exceed 1M...
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
            $('#maskLayer').hide()//自定义遮布层
            return false;
        }
        var formData = new FormData();
        formData.append("file", file);
        $.ajax({
            url: "/uploadFile",//路径
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (data) {
             $('#maskLayer').hide()
                $summernote.summernote('insertImage', data.data, function ($image) {
                    $image.attr('src', data.data);
                });
            }
        });
    }


# IIFE(立即执行函数)内的var穿透了块作用域，name被提升至if()之前，且此时name为undefined。
 
# 在非匿名自执行函数中，外部函数变量为只读状态无法修改,所以打印的是函数
    var b = 10;
    (function b(){
       b = 20;
        console.log(b); //function b(){...} 
    })();


# 数组交集
   let a = new Set([1,5,8,2,3,1])
    let b = new Set([5,4,9,2,3,1])
    let c = [...a].filter( (n)=>{
       return b.has(n)
    } )
 
 # 数据类型：null;undefinded;boolean;string;object;number;symbol;bigint;8种

 # 判断数据类型的方法：
 1.typeof(obj)  2.obj.constructor == Object  3.Object.getPrototypeOf(obj)  4.Object.prototype.toString.call(obj) 
 5.obj instanceOf Object(此种方法不能对一般定义的string,number;除非 var str = new String('con')

content-visibility:auto//渲染可视化区域，缺点目前兼容性不好，存在元素高度塌陷的问题（contain-intrinsic-size初始高度解决）
content-visibility: hidden.利用缓存绘制状态的优点，使内容不显示在屏幕上而又不绘制。隐藏的方法display：none;visibility:hidden;content-visibility: hidden
  
  https://web.dev/measure/  优化googles算法



# //减少回流  重绘不一定会回流，但回流一定会重绘
一、解析HTML，生成DOM树，解析CSS，生成CSSOM树
二、将DOM树和CSSOM树结合，生成渲染树(Render Tree)
三、Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
四、Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
五、Display:将像素发送给GPU，展示在页面上。
1.减少don的增删操作
2.元素的高宽，边框，字体大小，页面第一次加载这类操作会触发回流，定义在class中并设置class名，执行一次回流
3.对复制的元素比如动画让器脱离文档流，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素。
4.这些元素会进行回流，offsetTop,offsetLeft...scrollTop滚动事件等，display:none不会触发回流
5.transform,opacity,filters这样css3的属性不会触发回流

# 防抖/节流的原理----https://segmentfault.com/a/1190000018428170
防抖：无论你执行多少次，我就执行最后一次，该函数在指定的时间期限内工作一次，重在清零 clearTimeout
节流：控制流量，单位时间内事件只能触发一次，该函数在指定的时间期限内不再工作
import debounce from '@/utils/auth'
 fun:debounce(function(index,item){
 // -----doing
 },500})
export function debounce(fn,delay){
 let timer = null
     return ()=>{
         if(timer){
            clearTimeout(timer)
         }
        let arg = arguments
        timer = setTimeout(()=>{
             fn.apply(this,arg)
         },1000)
     }
}
如果要节流或者防抖的函数有参数则要使用匿名函数来作为参数赋值
window.onscroll = throttle(() => fun(), 2000)
var timer = true
    function throttle(fun, delay) {
        let self = this, arg = arguments
        return function () {
            if (!timer) {
                return false
            }
            timer = false
            setTimeout(() => {
                fun.apply(self, arg)
                timer = true
            }, delay)
            // console.log(timer)
        }
    }
    


水平垂直居中：父元素设为display:flex。子元素设置margin:auto

localStorage.setItem(key，value)设置本地级存储
localStorage.getItem(key)获取本地级存储
localStorage.removeItem("key");删除存储


fildder抓取工具如何抓取js,css等其他数据,主要是在‘tools’中配置https与connections的选项，以及导入安全证书

fiddler抓取数据包的时候出现乱码，在‘transformer’中选择'None'

关于图片压缩建议压缩成webp格式，压缩比例较高，并且相对与其他格式压缩后图片清晰度有明显优势 ------https://zhitu.isux.us/

BCompare 文件对比工具
CDN:https://cdnjs.com/  拥有大量前端插件的相关引用文件 

倒计时插件：https://countdownmail.com/拥有各种时区时间的一款倒计时

wave波浪效果(目前发现只能应用到点击事件中)
http://ch-ny.com/content/themes/bridge-child/js/libs/Waves/docs/
html: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/node-waves/0.7.6/waves.min.css" integrity="sha512-bsNktdxsLu4ooy7axuzyyFz87SWrDBaCmZsk2Dvin1/2noq49vt1jfNWUAfdybRpFCzRjdWygAOEopdbo8cGpA==" crossorigin="anonymous" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/node-waves/0.7.6/waves.min.js" integrity="sha512-MzXgHd+o6pUd/tm8ZgPkxya3QUCiHVMQolnY3IZqhsrOWQaBfax600esAw3XbBucYB15hZLOF0sKMHsTPdjLFg==" crossorigin="anonymous"></script>
      <span class="img1 waves-effect">
            <div style="width: 300px;height: 300px; position: relative;"></div>
      </span>
js:  Waves.displayEffect();

H5 notification浏览器桌面通知
详细：https://www.cnblogs.com/zhangycun/p/10410445.html

lottie动画设置的俩种方式：（好处json文件大小会比gif文件小很多，性能也会更好）
<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.4.3/lottie.min.js"></script>
#lottie{
    overflow: hidden;
    transform: translate3d(0,0,0);
    text-align: center;
    opacity: 1;
}
1：  html,<script type="text/javascript" src="./data.json"></script>
     json: var lottie = {动画json代码}//一定要设置将json赋值变量，否则报错
     js: var anim2 = lottie.loadAnimation({
        container: document.getElementById("lottie2"), // 容器
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData:lottle1,
      });
2：  var anim = lottie.loadAnimation({
        container: document.getElementById("lottie"), // 容器
        renderer: "svg",
        loop: true,
        autoplay: true,
        // animationData:lottle1,
        path:"https://assets5.lottiefiles.com/datafiles/B1zOc97lUJINcA2/data.json" // 直接设置json链接
      });


谷歌登录不能切换账号问题
  var auth2 = gapi.auth2.getAuthInstance(); 
  auth2.signOut()
  auth2.disconnect();//清除登录权限
按照谷歌官网XHR接口回调的数据是字符串(两种字符串与xml)，因用JSON.parse()改成json格式方便操作
 xhr.onreadystatechange=function(data){
              if(xhr.status === 200 && xhr.readyState === 4){
                  let req = JSON.parse(xhr.responseText).data.token//xhr.responseText 获取参数
                  setToken(req,'google')
                  that.$store.dispatch('saveToken',req)
                }
             }
Swiper自定义分页器格式
 var arr = ['Iceberg Silver','Graphite Black','Mist Grey'] //分页器文字
      var _html = `<span class="select_box"></span>`
      $('.swiper-pagination-bullet').each(function(index){
          $(this).html(_html+arr[index])
      })

