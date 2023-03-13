# addEventListener造成的弹窗内submit事件的回调执行多次的问题？使用函数名来作为参数
 节点.addEventListener('事件', function(){
                //确定后执行
            })
首先要明确一点，在元素上重复注册相同的事件监听器，多余的监听器会被移除，只保留一个
问题在于回调函数是一个匿名函数，那么这就导致了每一次注册都是一个不同的事件监听器。


# http和https的区别？
http: 协议以明文方式发送内容，不提供任何方式的数据加密。默认80端口
https: 是一种透过计算机网络进行安全通信的传输协议，由http进行通信但利用SSL/TLS来加密数据包，是提供对网站服务器的身份认证，保护交换数据的隐私与完整性。默认443端口；
工作流程：   1、TCP 三次同步握手
            2、客户端验证服务器数字证书
            3、DH 算法协商对称加密算法的密钥、hash 算法的密钥
            4、SSL 安全加密隧道协商完成
            5、网页以加密的方式传输，用协商的对称加密算法和密钥加密，保证数据机密性；用协商的hash算法进行数据完整性保护，保证数据不被篡改。
用法：   1、客户端持有对称密钥A,服务端持有非对称公钥B、私钥C；
        2、客户端先做请求，服务端把公钥B返回，
        3、客户端拿到公钥B（数字证书验证身份可靠),加密公钥A,传给服务器。
        4、服务器用私钥C解出私钥A；
        5、最后客户端通过私钥A加密数据包，服务端通过密钥A解出数据，正常通信。

# 输入框输入，请求后台接口，第一个接口返回的信息可能比较慢，到第二次调用后信息已经返回了，前一条数据才出来，如何避免页面被第一个接口返回的信息覆盖？
可以在axios中response响应拦截，比对我们发送的时间搓参数，进行比较，然后筛选出后输入值返回的数据

# 埋点问题，如何记录用户在页面的停留时长？如果直接关闭浏览器如何记录时间？
1. router.beforeEach切换路由来记录开始、结束时间重点在发送记录后重置开始时间。如果异常退出则数据会有问题，
2. 第二次进入再进入上报，每个一段时间30s更新页面数据信息暂存localStorage,再次进入页面判断值是否存在，存在则上报数据，缺点就是数据有延迟

# 三个类名：a-1，a-2,a-3如何选中这些‘a-’开头的类名
div[class^='a-']{}

# 如何实现用户下拉选择主题，选择后网站整体换肤
scss-->设置四种主题的样式
main.js引入scss文件
App.vue文件设置默认主题document.getElementById('app').setAttribute('class',主题一className)
点击切换主题功能是调用函数来设置document.getElementById('app').setAttribute('class',切换主题的className)

# 网页变为黑白配色(重大事件的样式)
html {
  filter: grayscale(1);
}

# 块元素和行内元素、行内块元素的区别
块级元素可设置高宽，独占一行
行内元素不能设置高宽，高度由内容的高度决定，一行可多个行内元素
行内块元素可设置高宽，一行可多个行内块元素

# 同源策略
协议、域名、端口相同才是同源策略.chrome每个域名最多6个.使用多个域名，可以增加并发数.在HTTP2协议中，可以开启管道化连接，即单条连接的多路复用，每条连接中并发传输多个资源，这里就不需要添加域名来增加并发数了

# elementUI日期和时间选择器绑定值为对象的显示问题
如果绑定值为对象时，则会出现视图未变而值已经变了的情况，解决方法: this.$set(this.form, "date", [ timeStart,timeEnd,]);

# 选择排序 (找出最小下标)
function func(arr){
for(var i = 0; i < arr.length;i++){
    var min = i
    for(var j = i; j < arr.length; j++){
        if(arr[j] < arr[min]){
            min = j //找出最小值的下标
        }
    }
    //循环结束后调换位置
    var temp = arr[min]
    arr[min] = arr[i]
    arr[i] = temp
}
return arr
}
# 希尔排序（插入排序基础上缩小增量,gap用for循环插入排序，将‘1’换成gap）
  let insertArr = [7, 6, 9, 3, 1, 5, 2, 4]
    let len = insertArr.length//8
    let gap = Math.floor(len / 2)//4

    for (; gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < len; i++) {  
            let j = i - gap  // j=0
            let temp = insertArr[i]//1
            while (j >=0 && insertArr[j] > temp) {
                insertArr[j+gap] = insertArr[j]
                j = j-gap
            }
            insertArr[j+gap] = temp
        }
    }


    console.log(insertArr);
# 插入排序（如果前一个数大于后一个数,将前一个数往后移一位）
let arr = [5,3,7,2,6];

function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        //当前要处理的数
        let temp = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > temp) {
            //如果前一个数大于后一个数,将前一个数往后移一位
            arr[j + 1] = arr[j]
            j--
        }
        //此时的j是要处理的数排序后应该在的位置
        arr[j+1] = temp
    }
    return arr;
}
console.log("插入排序arr", insertSort(arr))
# 归并排序（拆分成左右，在依次赋值新数组）
    mergeSort(arr){
        let left, right, middle
        let len = arr.length
        if (len < 2) {
            return arr
        }
        middle = Math.floor(len / 2)
        left = arr.slice(0, middle)
        right = arr.slice(middle)

        return merge(mergeSort(left), mergeSort(right))
    }
    function merge(left, right) {
        let result = []
        while (left.length && right.length) {
            if (left[0] >= right[0]) {
                result.push(right.shift())
            } else {
                result.push(left.shift())
            }
        }
        while (left.length) {
            result.push(left.shift())
        }
        while (right.length) {
            result.push(right.shift())
        }
        return result
    }
# 快速排序 (找到pivot基准值，将数组拆成俩个数组，大于基准值排右，小于在左)
    function quickSort(arr) {
        if (arr.length <= 1) { return arr }
        let pivotIndex = Math.floor(arr.length / 2)
        let pivot = arr.splice(pivotIndex, 1)[0]
        let left = []
        let right = []

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return quickSort(left).concat([pivot], quickSort(right))
    }


# justify-content: space-between/space-around最后一排的位置问题
   1. let goodList_len = $(dom).length % 4(一排的个数)
    if (goodList_len != 0) {
        let list = '' //动态添加li
        for (let index = 0; index < (4 - goodList_len); index++) {
            list += '<li class="goodList_last_empty"></li>'
        }
        $('.goodsList').append(list)
    }
    2.  父元素伪元素：  content: '';
                       flex: auto;
                    子元素：{
                        flex: 0 1 20%
                    }


# 谷歌和火狐之间浏览器差异
1. chrome:font-wigth加粗与font-family粗字体不会重叠，最小font-size:12px
2. firefox：font-wigth加粗与font-family粗字体会叠加
5. firefox隐藏滚动条样式scrollbar-width: none;而::-moz-scrollbar{ display: none; }无效。谷歌::-webkit-scrollbar{display: none; }有效
7. 火狐浏览器下e.path获取不到解决方法： 
   const path = this.composedPath(e);
   composedPath(e) {
            if (e.path) {
                return e.path;
            }
            let target = e.target;

            e.path = [];
            while (target.parentNode !== null) {
                e.path.push(target);
                target = target.parentNode;
            }
            e.path.push(document, window);
            return e.path;
        },

# 火狐浏览器hover字体加粗效果,宽度变化的问题
html-》加上title='文本内容'
::before{
    display: block;
    content: attr(title);
    font-weight: bold;
    visibility: hidden;
    height: 0;
    overflow: hidden;
}
:hover{
    font-weight: bold;
}

# git提交
1 第1步：同步远程仓库代码：git pull
2 第2步：查看当前状态：git status
3 第3步：提交代码到本地git缓存区：git add -A
4 第4步：推送代码到本地git库：git commit -m "提交内容标题"
5 第5步：提交本地代码到远程仓库：git push
回退：
git reset --hard HEAD^ ---->回退到上次提交，清除本地提交的代码
git reset --hard HEAD~` ----->回退到上次提交，不清除本地提交的代码
git reset --hard origin/master  ----->将本地的状态回退到和远程的一样 

# 前端性能优化你会怎么做?
列表优化：懒加载、虚拟列表、分页
重绘回流：合并修改、requestAnimationFrame、will-change
提交优化：防抖
网络请求：控制并发量、取消重复请求、合并请求、http缓存
webpack优化：代码压缩、gzip、CDN、代码分割、合理设置hash、图片转base64

# 解释Array.prototype.slice.apply(arguments)---将arguments 类数组转换为数组
由于 arguments不是真正的数组，所以没有slice方法，通过apply|call可以调用数组对象的slice方法，从而将arguments 类数组转换为数组

# NaN  表示什么意思，属于什么数据类型
NaN是number类型，表示不是一个数字
1/0 输出infinity表示无限大  0/0 输出NaN

# stopPropagation()和preventDefault()这两个方法有什么区别
stopPropagation 是阻止事件冒泡，即冒泡事件到当前元素处就终止了，不会继续向上级元素传递。
preventDefault 是阻止默认事件，例如：在 a 标签的 click 事件中执行了该方法，则不会进行默认的链接跳转。

#  document.write和innerHTML有什么区别
1. document.wirte会重绘整个页面
2. innerHtml是只对受影响的DOM元素进行重绘

# (a==1&&a==2)和（a===1 && a===2）为true
1. (a==1&&a==2)  
    const a = {
      i:1,
      toString/valueOf:function(){
          return a.i++
      }
    }
2. （a===1 && a===2） 
    var value = 1
    Object.defineProperty(window, 'a', {
        get(){return value++}
    })


# 模块化编程的理解
解决了代码污染的问题，提高了代码的重复率，让多人合作编程开发
AMD: require.js 为代表，依赖前置，一律先加载再使用。
CMD: sea.js 为代表，依赖就近原则。
UMD: 同时支持 AMD 和 CMD 方法。
ES6 import/export

# 如何判断对象为空
1. 使用jquery自带的$.isEmptyObject()函数
2. 封装一个函数,一旦该对象的属性是可遍历的即说明该对象存在属性，则返回false，否则该对象为空对象。
    for(let a in obj){
        retrun false
    }
3. es6的Object.keys(obj).length的方法判断。
4. 通过JSON自带的JSON.stringify方法将对象转化为字符串来判断


# scoped的原理，私有化样式的原理
vue通过在DOM结构以及css样式上加唯一不重复的标记，以保证唯一，达到样式私有化模块化的目的

# BFC(块级格式化上下文)
触发条件：
    body 根元素
    浮动元素：float 除 none 以外的值
    绝对定位元素：position (absolute、fixed)
    display 为 inline-block、table-cells、flex
    overflow 除了 visible 以外的值 (hidden、auto、scroll)
原理：具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。
通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。
1. 同一个BFC下外边距会发生重叠,不同BFC则边距不会折叠
2. BFC 清除浮动
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
tcp三次握手：(三次是最少的安全次数，两次不安全，四次浪费资源；)
1. 客户机首先发出一个SYN消息
2. 服务器使用SYN+ACK应答表示接收到了这个消息
3. 最后客户机再以ACK消息响应
四次挥手(TCP是全双工信道，何为全双工就是客户端与服务端建立两条通道,)
通道1:客户端的输出连接服务端的输入；通道2:客户端的输入连接服务端的输出
客户端：我要关闭输入通道了。 服务端：好的，你关闭吧，我这边也关闭这个通道。
服务端：我也要关闭输入通道了。 客户端：好的你关闭吧，我也把这个通道关闭。

# 关于webkit-line-clamp设置无效的问题
需要设置word-break: break-all;
  display: -webkit-box;
overflow: hidden;
word-break: break-all;
text-overflow: ellipsis;
-webkit-box-orient: vertical;
-webkit-line-clamp: 4;

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
 
 # 数据类型：8种
 1. 基本数据类型：null undefinded boolean string number symbol bigint 。都存在栈内存中，固定分配内存大小
 2. 引用数据类型：object(对象，数组，函数)。在栈内存中保存了自己地址的索引，实际值存在堆内存中

 # null 和 undefind在内存中的区别
 1. 变量赋值null 指针对象和值都清空，对象属性赋值null则在内存中分配了一个新的空间
 2. 变量赋值undefind值清空，变量还存在。对象属性赋值undefind,值为空值

 # 判断数据类型的方法：
 1.typeof(obj)  2.obj.constructor == Object  3.Object.getPrototypeOf(obj)  4.Object.prototype.toString.call(obj) 
 5.obj instanceOf Object(此种方法不能对一般定义的string,number;除非 var str = new String('con')

content-visibility:auto//渲染可视化区域，缺点目前兼容性不好，存在元素高度塌陷的问题（contain-intrinsic-size初始高度解决）
content-visibility: hidden.利用缓存绘制状态的优点，使内容不显示在屏幕上而又不绘制。隐藏的方法display：none;visibility:hidden;content-visibility: hidden
  
  https://web.dev/measure/  优化googles算法


# 页面渲染的过程 //减少回流  重绘不一定会回流(重排)，但回流(重排)一定会重绘
一、解析HTML，生成DOM树，解析CSS，生成CSSOM树
二、将DOM树和CSSOM树结合，生成渲染树(Render Tree)
三、Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
四、Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
五、Display:将像素发送给GPU，展示在页面上。

重绘：元素呈现新的外观，background-color，border-color,visibility等
重排：位置、大小（高宽）等信息的改变，

优化：
1. 减少don的增删操作
2. 元素的高宽，边框，字体大小，页面第一次加载这类操作会触发回流，定义在class中并设置class名，执行一次回流
3. 对复杂的元素比如动画让器脱离文档流，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素。
4. 这些元素会进行回流，offsetTop,offsetLeft...scrollTop滚动事件等，display:none不会触发回流
5. transform,opacity,filters这样css3的属性不会触发回流

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

BCompare 文件对比工具
CDN:https://cdnjs.com/  拥有大量前端插件的相关引用文件 

H5 notification浏览器桌面通知
详细：https://www.cnblogs.com/zhangycun/p/10410445.html
