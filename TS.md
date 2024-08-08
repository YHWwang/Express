# 定义类型
let num: string = '123321'
let arr1: number[] = [1,2]

# 数组范型
 let arr2: Array<number> = [1,2] 

# 元组 
let arr3:[string,number] = ['123',123]

# 枚举
    enum Color {Red, Green, Blue};
    let c: Color = Color.Blue;

# 类型断言（手动指定一个值的类型）
类型断言允许程序员手动指定一个值的类型。这在需要明确告诉编译器某个值的类型时非常有用。
    var str = '1213' 
    var str2:number = (str as string).length or (<string>someValue).length;

# 联合类型（|）
 var val:string|number 
 
# 交叉类型（&）
interface A {
  a(): void;
}
interface B {
  b(): void;
}
type C = A & B; // 表示同时具备 A 和 B 的特性

# interface接口是一系列抽象方法的声明，是一些方法特征的集合
    interface IPerson  { 
        firstName:string,
        commandline:string[]|string|(()=>string); 联合类型和接口
    }
    var customer:IPerson = { 
        firstName:"Tom",
    } 
    ?:可为空

# 类型别名type可以用来定义变量的类型,如果是对象, 里面的属性和方法可以用逗号, 分号;
    type Point = {
        x: number
        y: number
    } // 对象类型
    function printCoord(pt: Point) {
    
    }
    printCoord({x: 100, y: 200})

# 类型别名type 和接口interface之间的区别:
1. interface扩展接口: 通过extends
   interface Animal {
    name: string
    }
    
    interface Bear extends Animal {
        honey: boolean
    }
2. ​type扩展类型别名: 通过 &
    type Animal  = {
        name: string
    }
    
    type Bear = Animal & {
        honey: boolean
    }
3. 接口: 定义相同的接口, 其字段会合并,​ 类型别名: 类型别名创建的类型创建后是不能添加新字段的
    interface MyWindow {
        count: number
    }
    
    interface MyWindow {
        title: string
    }

# 什么是命名空间（Namespace）和模块（Module） 
模块: 使用模块时，我们可以使用 export 和 import 关键字来定义和引入模块中的函数或变量。
命名空间：而在命名空间中，我们使用 namespace 来创建命名空间，并且需要在使用之前使用  <reference path="file.ts" /> 来引入命名空间。

# 类型守卫是什么？
类型守卫是一种用于在运行时检查类型的技术，它允许开发人员在特定的作用域内缩小变量的范围，以确保正确推断类型。
function isString(test: any): test is string {
  return typeof test === "string";
}
if (isString(input)) {
  // input 在此代码块中被收窄为 string 类型
}