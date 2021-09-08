# JS

# 什么是闭包
简要回答：能够读取其他函数内部变量的函数。
全面回答：在js中变量的作用域属于函数作用域, 在函数执行完后,作用域就会被清理,内存也会随之被回收,但是由于闭包函数是建立在函数内部的子函数, 由于其可访问上级作用域,即使上级函数执行完, 作用域也不会随之销毁, 这时的子函数(也就是闭包),便拥有了访问上级作用域中变量的权限,即使上级函数执行完后作用域内的值也不会被销毁。

# 闭包的用途
1.可以读取函数内部的变量
2.让这些变量的值始终保持在内存中
3.函数执行形成的私有作用域，保护里面的变量不受外界干扰的机制

# 值引用和地址引用
值引用：Undefined、Null、Boolean、Number 、String和Symbol.可以深拷贝
地址引用: Array,Object.环到原始类型方可进行深拷贝

# setTimeout和setInterval执行后会变成全局

# 选择器有哪些
css选择器：id，class，标签，通用，属性，伪类，伪元素，子类
css权重：!import > 内联样式> id > class > 标签|伪类|属性 > 伪元类 > 通配符 > 继承

# 伪类和伪元素的区别
伪类：（:hover, :foucs, :nth-chlid)等，冒号开头，用于向某些选择器添加特殊的效果。一个选择器中出现可以多个
伪元素：（::before, ::after）等，双冒号开头，用于将特殊的效果添加到某些选择器，一个选择器中只能出现一次

# sessionStorage通过以下情况会丢失
刷新当前页面，或者通过location.href、window.open、或者通过带target="_blank"和rel=“opener”的a标签打开新标签，之前的sessionStorage还在，
但是如果你是主动打开一个新窗口或者新标签，对不起，打开F12你会发现，sessionStorage空空如也。
也就是说，sessionStorage的session仅限当前标签页或者当前标签页打开的新标签页，通过其它方式新开的窗口或标签不认为是同一个session。

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
# 深拷贝方法
1.JSON.parse(JSON.stringify(a))
2.迭代递归方法。此方法可判断undefined值
    function isObject(obj) {
        return typeof obj === 'object' && obj != null;
    }
    function cloneDeep(source) {
        if (!isObject(source)) return source  //判断类型是否对象，真则不进行深拷贝，假则进行深拷贝

        var target = Array.isArray(source) ? [] : {}
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) { // 判断本身是否存在该属性而非继承原型链来的属性
                if (isObject(source[key])) { // 判断子对象是否是对象或者数组
                    target[key] = cloneDeep(source[key])
                } else {
                    target[key] = source[key]
                }
            }
        }
        return target
    }
3.$.extend(true,[],a)

# 原型 prototype

