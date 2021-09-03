
# assets和static的区别
相同点：都是存放静态资源文件，
不同点：打包时会压缩assets减少体积，所以需要压缩的静态文件放在assets中,第三方资源放在static中

# js无缝轮播图
关键在与首尾一张图片如何轮播第一张图片或者最后一张的问题
1.轮播之前需要将尾再添加一张图片，与第一张图片一致
2.设置定时器，将图片依次向左移动一张图片宽度的距离
3.轮播到最后一张图片时，重置当前切换索引为1，设置一个seTimeout重置父元素的left时间为一秒

    time = setInterval(() => {
        curIndex++
        if (curIndex < $('#slider .slieder-item-container li').length) {
            $('#slider .slieder-item-container').animate({
                'left': -600 * curIndex + 'px',
            })
            if (curIndex == $('#slider .slieder-item-container li').length-1) {
                curIndex = 0
                setTimeout(() => {
                    $('#slider .slieder-item-container').css('left', '0px')
                }, 1000);
            } 
        }
        $('.indicator-container .indicator').eq(curIndex).addClass('active').siblings().removeClass('active')
    }, autoplay_Delay);
# 虚拟DOM节点优异
理解：用js模拟一颗dom树,放在浏览器内存中.当你要变更时,虚拟dom使用diff算法进行新旧虚拟dom的比较,将变更放到变更队列中,反应到实际的dom树,减少了dom操作.

优点：虚拟DOM具有批处理和高效的Diff算法,最终表现在DOM上的修改只是变更的部分，可以保证非常高效的渲染,优化性能.

缺点：首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。

# 路由的方法有哪些
this.$router.push(obj) 跳转到指定url路径，并想history栈中添加一个记录，点击后退会返回到上一个页面
this.$router.replace(obj)  跳转到指定url路径，但是history栈中不会有记录
this.$router.go(n)  向前或者向后跳转n个页面，n可为正整数或负整数

# 伪类和伪元素的区别
伪类：（:hover, :foucs, :nth-chlid)等，冒号开头，用于向某些选择器添加特殊的效果。一个选择器中出现可以多个
伪元素：（::before, ::after）等，双冒号开头，用于将特殊的效果添加到某些选择器，一个选择器中只能出现一次

# 选择器有哪些
css选择器：id，class，标签，通用，属性，伪类，伪元素，子类
css权重：!import > 内联样式> id > class > 标签|伪类|属性 > 伪元类 > 通配符 > 继承

# sessionStorage通过以下情况会丢失
刷新当前页面，或者通过location.href、window.open、或者通过带target="_blank"和rel=“opener”的a标签打开新标签，之前的sessionStorage还在，
但是如果你是主动打开一个新窗口或者新标签，对不起，打开F12你会发现，sessionStorage空空如也。
也就是说，sessionStorage的session仅限当前标签页或者当前标签页打开的新标签页，通过其它方式新开的窗口或标签不认为是同一个session。

# Promise
resolve作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
reject作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

作者：王云飞_小四_wyunfei
链接：https://www.jianshu.com/p/1b63a13c2701
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
三个状态
1、pending[待定]初始状态
2、fulfilled[实现]操作成功
3、rejected[被否决]操作失败

