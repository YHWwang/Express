let num: string = '123321'
let arr1: number[] = [1,2]
数组范型 let arr2: Array<number> = [1,2] 
元组 let arr3:[string,number] = ['123',123]
枚举enum Color {Red, Green, Blue};
        let c: Color = Color.Blue;
类型断言: 好比其它语言里的类型转换，但是不进行特殊的数据检查和解构
    var str = '1213' 
    var str2:number = (str as string).length or (<string>someValue).length;
联合类型 var val:string|number 
接口是一系列抽象方法的声明，是一些方法特征的集合
    interface IPerson  { 
        firstName:string,
        commandline:string[]|string|(()=>string); 联合类型和接口
    }
    var customer:IPerson = { 
        firstName:"Tom",
    } 
    ?:可为空