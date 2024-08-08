# elementui中Table表格数据过多导致的DOM渲染问题（只改变tr里的值）
<template>
  <div id="app">
    <h6>不管怎么滚动，dom都只渲染21条tr</h6>
    <el-table
      :data="filteredData"
      style="width: 100%; border: 2px solid red"
      v-loadmore="handelLoadmore"
      :data-size="tableData.length"
      height="300"
    >
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="sex" label="年龄"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentStartIndex: 0,
      currentEndIndex: 20
    };
  },
  directives: {
    loadmore: {
      // componentUpdated updated
      componentUpdated: function (el, binding, vnode, oldVnode) {
        // 设置默认溢出显示数量
        var spillDataNum = 20;
        // 设置隐藏函数
        var timeout = false;
        let setRowDisableNone = function (topNum, showRowNum, binding) {
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(() => {
            binding.value.call(
              null,
              topNum,
              topNum + showRowNum + spillDataNum
            );
          });
        };
        setTimeout(() => {
          const dataSize = vnode.data.attrs["data-size"];
          const oldDataSize = oldVnode.data.attrs["data-size"];
          if (dataSize === oldDataSize) return;
          const selectWrap = el.querySelector(".el-table__body-wrapper");
          const selectTbody = selectWrap.querySelector("table tbody");
          const selectRow = selectWrap.querySelector("table tr");
          if (!selectRow) {
            return;
          }
          const rowHeight = selectRow.clientHeight;
          let showRowNum = Math.round(selectWrap.clientHeight / rowHeight);

          const createElementTR = document.createElement("tr");
          let createElementTRHeight =
            (dataSize - showRowNum - spillDataNum) * rowHeight;
          createElementTR.setAttribute(
            "style",
            `height: ${createElementTRHeight}px;`
          );
          selectTbody.append(createElementTR);

          // 监听滚动后事件
          selectWrap.addEventListener("scroll", function () {
            let topPx = this.scrollTop - spillDataNum * rowHeight;
            let topNum = Math.round(topPx / rowHeight);
            let minTopNum = dataSize - spillDataNum - showRowNum;
            if (topNum > minTopNum) {
              topNum = minTopNum;
            }
            if (topNum < 0) {
              topNum = 0;
              topPx = 0;
            }
            selectTbody.setAttribute(
              "style",
              `transform: translateY(${topPx}px)`
            );
            createElementTR.setAttribute(
              "style",
              `height: ${
                createElementTRHeight - topPx > 0
                  ? createElementTRHeight - topPx
                  : 0
              }px;`
            );
            setRowDisableNone(topNum, showRowNum, binding);
          });
        });
      }
    }
  },
  computed: {
    filteredData() {
      let list = this.tableData.filter((item, index) => {
        if (index < this.currentStartIndex) {
          return false;
        } else if (index > this.currentEndIndex) {
          return false;
        } else {
          return true;
        }
      });
      return list;
    }
  },
  methods: {
    handelLoadmore(currentStartIndex, currentEndIndex) {
      this.currentStartIndex = currentStartIndex;
      this.currentEndIndex = currentEndIndex;
    },
    getTableData() {
        //表格接口数据
      this.tableData = ...
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

# 如果你现在在自己的开发分支 开发一半 线上有个紧急的bug 需要紧急修改并上线。你怎么办？
1. 创建dev分支,切换到dev分支，提交本地代码到这个临时dev分支上
2. 切换到主分支并回溯到线上的版本,创建bug分支并切换到bug分支上
3. 解决线上版本后提交bug分支，切换主分支，合并bug分支代码。
4. push提交主分支,切换dev分支，pull拉取主分支

# 解决echarts图表切换tabs改变屏幕大小后会缩成一团的问题
 chartIntance.resize({
    <!-- 重新计算时给个实时宽度 -->
    width: document.querySelector(".app-container").offsetWidth * 0.6,
});

# elementui遇到的bug
1. 同时上传多个文件时，成功回调on-success只会执行一次，if (fileList.every((item) => item.status == "success"))使用every函数去判断列表数据是否都已成功
2. form表单下如果只有一个input时回车键会刷新页面， form加上@submit.native.prevent去阻止默认行为
3. 级联选择器多选时数据不按选择的顺序进行排序，用el-select放置浮动在级联选择器上，同步处理俩边的值（elemnetui-plus版本中已解决）

# 微前端概念（single-spa,qiankun）
微前端提供了一种技术：可以将多个独立的Web应用聚合到一起，提供统一的访问入口。一个微前端应用给用户的感观就是一个完整的应用，但是在技术角度上是由一个个独立的应用组合通过某种方式组合而成的。
1. 技术栈无关：主框架不限制接入应用的技术栈，子应用具备完全自主权。
2. 独立性强：独立开发、独立部署，子应用仓库独立。
3. 状态隔离：运行时每个子应用之间状态隔离。
微前端不一定是未来发展趋势的收束点，但是它在未来一定会发挥重要作用

# 写一个限制请求数量的函数
const allRequest = [
    "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=1",
    "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=2",
    "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=3",
    "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=4",
    "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=5",
    "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=6",
    "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=7",
    "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=8",
    "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=9",
    "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=10",
];
function sendRequest(urls, max, callbackFunc) {
    let total = urls.length//总数
    let queue = []//队列
    let reqMax = max//限制数
    let current = 0//当前执行数
    let done = 0//完成数
    let results = new Array(total).fill(false)//结果

    init()

    async function init() {
        for (let index = 0; index < urls.length; index++) {
            request(index,urls[index])//循环请求
        }
    }
    async function request(index,url){
        if(current >= reqMax){//判断当前请求数是否符合最大请求数
            await new Promise( resolve =>{queue.push(resolve)})
        }
        sendHandler(index,url)
    }
    async function sendHandler(index,url){
        current++
        try {
            let result = await fetch(url)
            results[index] = result//请求结果
        } catch (error) {
            results[index] = error
        } finally{
            done++
            current--

            if(queue.length){
                queue[0]()//执行resolve()
                queue.shift()//执行完剔除
            }

            if(done == total){
                callbackFunc(results)
            }
        }
    }
}
sendRequest(allRequest, 2, (result) => { console.log(result); })

# 关于@media screen 无法准确识别屏幕宽度的情况
其中一个常见的原因是移动设备上的浏览器缩放级别不同，导致屏幕宽度的实际像素值与 CSS 像素值不一致。这可能会导致媒体查询无法准确匹配屏幕宽度。
使用@media screen and (max-device-width: 768px)属性表示设备的物理像素宽度和高度，可以更准确地匹配设备的屏幕大小。

# 安卓和ios兼容性问题
1. iOS 日期的兼容
   ios 下 new Date('2020-03-11 00:00:00') 不生效，需要对日期进行 date.replace(/-/g, '/') 处理。
2. 在移动端，单击穿透是什么？(之所以移动端不用click是click有300ms的延迟，体验不好)
   touchstart点击之后300会触发click点击事件，可通过addEventListener监听touchstart事件去e.preventDefault()阻止默认事件
3. :not()在搜狗低版本浏览器不生效,谷歌和firefox生效
   只能用class去设置css
4. iOS 上下滑动不流畅
    overflow-scrolling:touch
   -webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */ 
   -webkit-overflow-scrolling: auto; /* 当手指从触摸屏上移开，滚动会立即停止 */
5. ios软键盘落下切半屏留白问题
   $("input,select").blur(function(){
        setTimeout(() => {
        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
    })
6. 软键盘弹起和回落留白问题
   android:scrollIntoView(false);监听 webview 高度会变化，高度变小获知软键盘弹起，否则软键盘收起（软键盘收起和输入框获没获取焦点不直接关联）。软键盘与窗口处于同一层，所以当软键盘弹起时，当前窗口缩小，那么窗口内容自然要被挤
   ios:window.scrollTo（0，0）监听输入框的 focus 事件来获知软键盘弹起的scrollTop值，监听输入框的 blur 事件获知软键盘收起设置scrollTo(0,blur函数中记录的scrollTop值)。软键盘处于窗口最顶层，与原有的窗口不冲突，所以底部导航条不会被顶起

7. 软键盘遮挡输入框的问题--》弹起软键盘始终让输入框滚动到可视区
    android: window.addEventListener('resize', () => {
                setTimeout(() => {
                    document.activeElement.scrollIntoView(false);
                    scrollIntoViewIfNeeded(boolean);不属于任何规范，是一种 WebKit 专有的方法。
                }, 300);
            });
    ios: window.addEventListener('focus/blur', () => {
             setTimeout(() => {
                 window.scrollTo(0, clientHeight)恢复成原来的视口
             }, 300);
         });
8. iOS 上拉边界下拉出现白色空白 
   一. 监听事件禁止滑动    
   document.body.addEventListener('touchmove', function (e) {
        if (e._isScroller) return;    // 阻止默认事件  
        e.preventDefault();
    }, { passive: false });
    二. 滚动妥协填充空白，装饰成其他功能
9.  页面放大或缩小不确定性行为
   <meta name=viewport  content="width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no">
10. 1px边框问题解决方案(设备像素比dpr)https://mp.weixin.qq.com/s?__biz=MzUyMDk4OTU5OA==&mid=2247528392&idx=7&sn=d025e40c3dafa46108118f351ed1758f&chksm=f9e3d139ce94582fa75c29d871a2b2adde65ea2e68c682ff7b1f218417321e783243c7925f5b&scene=27
    一.伪元素 + CSS3缩放->要先放大 200% 再缩小 0.5
    width: 200%; 
    height: 200%; 
    border: 1px solid gray;
    transform: scale(0.5); 
    transform-origin: 0 0;
        // dpr适配可以这样写
        @media (-webkit-min-device-pixel-ratio: 2)  {
            .line::after {
                ...
                height: 1px;
                transform: scale(0.5);
                transform-origin: 0 0;
            }
        }
    二.动态 Viewport + rem 方式
    首先根据 dpr 来动态修改 meta 标签中 viewport 中的 initial-scale 的值，以此来动态改变 viewport 的大小；
    然后页面上统一使用 rem 来布局，viewport 宽度变化会动态影响 html 中的font-size 值，以此来实现适配。
11.  取消input在ios下，输入的时候英文首字母的默认大写
    <input autocapitalize="off" autocorrect="off" />
12. 移动端禁止选中内容
    -webkit-user-select: none; /* Chrome all / Safari all /
    -moz-user-select: none; / Firefox all （移动端不需要） /
    -ms-user-select: none; / IE 10+ */
13. ios和android下触摸元素时出现半透明灰色遮罩
    a,button,input,textarea{
        -webkit-tap-highlight-color: rgba(0,0,0,0）
        -webkit-user-modify:read-write-plaintext-only;
    }
14. IOS 默认输入框内阴影重置
    -webkit-appearance: none; 
15. 消除transition闪屏
     {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
16. 监听页面滑动到底部进行刷新：
    scrollTop(滚动条距离顶部的高度)+clientHeight(可视化区域的高度)==scrollHeight(页面总高度)在安卓端scrollTop会出现小数,用parseInt()取整


# 谷歌和火狐之间浏览器差异
1. chrome:font-wigth加粗与font-family粗字体不会重叠，最小font-size:12px（目前版本已不在有）
2. firefox：font-wigth加粗与font-family粗字体会叠加
3. firefox隐藏滚动条样式scrollbar-width: none;而::-moz-scrollbar{ display: none; }无效。谷歌::-webkit-scrollbar{display: none; }有效
4. 火狐浏览器下e.path获取不到解决方法： 
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


# addEventListener造成的弹窗内submit事件的回调执行多次的问题？使用函数名来作为参数
 1. 节点.addEventListener('事件', function Fun(){
                //确定后执行
            })
首先要明确一点，在元素上重复注册相同的事件监听器，多余的监听器会被移除，只保留一个
问题在于回调函数是一个匿名函数，那么这就导致了每一次注册都是一个不同的事件监听器。
2. 节点.onscroll = 函数名


# http和https的区别？（https://cloud.tencent.com/developer/article/1704749）
http: 协议以明文方式发送内容，不提供任何方式的数据加密。默认80端口
https: 是一种透过计算机网络进行安全通信的传输协议，由http进行通信但利用SSL/TLS来加密数据包，是提供对网站服务器的身份认证，保护交换数据的隐私与完整性。默认443端口；HTTPS采用对称加密来加密通信内容，所用的密钥称为A。用非对称加密来加密密钥A再发送给对方（有点绕）。只要密钥A不落入他人手中，那传输的数据就不会被别人破译。
工作流程：  
        1、客户端请求服务器建立安全连接，附加客户端支持的SSL与TLS版本、支持的加密算法版本、随机数。
        2、服务器响应请求，附加选择的协议版本、加密算法版本、服务器随机数。 
        3、客户端持有CA机构的公钥,服务器持有CA机构的私钥和本身服务器的公钥和私钥
        4、客户端向服务器请求公钥，用于将客户端密钥安全传给服务器
        5、服务器将CA证书和CA的私钥去加密服务器公钥发给客户端，客户端用CA的公钥验证证书的有效性，并解密得到服务器公钥
        6、客户端生成一个私钥（一个随机数）给服务器，用于加密、解密客户端与服务器间的传输数据，用服务器公钥加密，服务器用服务器的私钥解密得到客户端的私钥
        7、客户端和服务器拥有同一个私钥，这样就可以用这把私钥加密、解密所有信息了

# 输入框输入，请求后台接口，第一个接口返回的信息可能比较慢，到第二次调用后信息已经返回了，前一条数据才出来，如何避免页面被第一个接口返回的信息覆盖？（）
1. 在订阅器中on监听添加/挂起已存在的接口，emit去执行返回结果，
2. 请求拦截器去判断存储的请求是否存在并return Promise.reject()来中断这次请求，否则会正常发送给服务器，
3. 响应拦截器将拿到的结果发布给其他相同的接口，成功则去移除存储和相同接口返回结果和事件中的key,失败则判断type类型（limiteResSuccess、limiteResError、失败）移除存储和相同接口返回结果和事件中的key最后return Promise.reject(error); [对于相同的请求我们先给它挂起，等到最先发出去的请求拿到结果回来之后，把成功或失败的结果共享给后面到来的相同请求。](https://juejin.cn/post/7341840038964363283?searchId=20240617134920AD6E3AC12A4659EC055C)
   缺点：同参数是可以，如何是参数不同的同一个搜索，第二次搜索还是有概率比第一次快，而第一次还没返回，从而导致覆盖第二次的结果
4. 解决方法再给按钮加loading状态



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

# 找出最大的增量数组 [2, 9, 1, 5, 3, 7, 101, 18] -> [1,5,7,101]
 function addGap(arr) {
   let result = []
   let temp = []
   let max = 0
   for (let i = 0; i < arr.length - 1; i++) {
       max = arr[i]
       temp = []
       for (let j = i + 1; j < arr.length - 1; j++) {
           if (max < arr[j]) {
               temp.push(max)
               max = arr[j]
           }
       }
       temp.push(max)

       if (result.length < temp.length) {
           result = temp
       }
   }
   return result
}

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
    let len = insertArr.length
    let gap = Math.floor(len / 2)

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
        let pivot = arr.splice(pivotIndex, 1)[0]  //splice会修改原数组，所以不能在前面赋值长度len变量
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
 1. typeof(obj)  
 2. obj.constructor == Object  
 3. Object.getPrototypeOf(obj)  
 4. Object.prototype.toString.call(obj) 
 5. obj instanceOf Object(此种方法不能对一般定义的string,number;除非 var str = new String('con')

content-visibility:auto//渲染可视化区域，缺点目前兼容性不好，存在元素高度塌陷的问题（contain-intrinsic-size初始高度解决）
content-visibility: hidden.利用缓存绘制状态的优点，使内容不显示在屏幕上而又不绘制。隐藏的方法display：none;visibility:hidden;content-visibility: hidden

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
