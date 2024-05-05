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

# 类型断言
好比其它语言里的类型转换，但是不进行特殊的数据检查和解构
    var str = '1213' 
    var str2:number = (str as string).length or (<string>someValue).length;

# 联合类型
 var val:string|number 
 
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