# React

# React-Router路由传值的方法
1. params传值，刷新页面参数不消失，参数会在地址栏显示（配置路由path:'/about/:id'后设置link标签'/about/3'）this.props.params.id
2. query传参，刷新页面参数消失，参数不会在地址栏显示 to={{pathname:'/about', query:{id:3} 获取this.props.location.query.id
3. state传参，刷新页面参数不消失,参数不会在地址栏显示to={{pathname:'/about', state:{id:3} 获取this.props.location.state.id 

# React和Vue的区别
都使用VDOM虚拟节点，极大提升性能，组件化应用
Vue使用的是我们熟悉的模板与特性，双向绑定数据，vue单文件组成是以模板+css+js的模式呈现。
React的特色在于函数式编程的理念和丰富的技术选型，用js完成全部事情，单向数据流，通过jsx书写.

# state 异步更新，同步执行
state（）本身不是异步，但他的处理机制给人一种假象是异步的，他的处理是在生命周期变化的时候
state中有两个参数
第一个（prestate,preprop）=>{}，传入的是可以是一个对象，也可以是一个函数，函数的参数是state和prop不过都是前一个生命周期的状态，（可以解决一些生命周期导致sata还没变得bug）
第二个是callback处理异步完成后的东西

# React修改对象的值
主要借助Object.assign(target,source1,source2)。具有相同变量后者会合并掉前者的变量数据
    const book = {
        price:'0'
    }
    this.setState( (state,props)=> ({
     'a.book.price': Object.assign(state.a.book,book)
     修改对象的值可用引号('')框住，右边则借助Object.assign()合并不同的对象值
    }),()=>{
      console.log(this.state.a)
    }
  ) 

  changeState = (type1, type_child, data) => {
    let state = { ...this.state }
    state[type1][type_child] = data
    this.setState({ ...state })
    return false
  }
  this.changeState('updateForm', 'tags', tags);

  # 获取form表单数据
  export default class about extends React.Component{
    render(){
       let { getFieldDecorator } = this.props.form
       return(
            <Form name="basic1">
                <Form.Item name="firstName" label="名">
                  {getFieldDecorator('firstName',{
                      initialValue:updateForm.firstName //子组件的初始值
                  })(
                      <Input className='firstName' />
                  )
                  }
                </Form.Item>
            </Form>
       )
    }
  }
  about = Form.create({})(about);


  this.props.form.getFieldsValue() //获取form表单数据
  this.props.form.resetFields() //清除表单数据

  # 关于react中绑定this的方法 
  1. class fields方法：fun = () =>{}
  2. this.fun.bind(this)
  3. es6箭头函数：()=>this.fun()此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。

# Hook
函数组件中调用，创建组件的方法有
1. 函数组件 function(){return()}
2. es5的createClass()
3. es6的react.component()
useState 方法使用hook
useEffect hook下让函数组件拥有生命周期
定义值 const [count, setCount] = useState(100);
  <button onClick={() => setFruit('apple')}>设置改变的值
        Click me {count} 获取值
  </button>

# redux
redux 是 js 应用的可预测状态的容器。 可以理解为全局数据状态管理工具（状态管理机），用来做组件通信等。


# react-redux

1. 引用容器组件
import Nmub from './num' 

2. 容器组件
import { connect } from "react-redux";
import { incrementAction, reduceAction } from "@reducers/num"; // 引用reducers
import tests from '@components/Num' // 引用组件
const mapStateToProps = state => {
    return {
        'Numb': state.Numb
    }
}
const mkapDispatchToProps = dispatch => {
    return {
        increment: () => dispatch(incrementAction),//如果是计算则incrementAction(),
        decrement: () => dispatch(reduceAction)
    }
}
const Numb = connect(//connect作用：React 组件和 Redux 的 store 连接
    mapStateToProps,// 输入逻辑
    mkapDispatchToProps// 输出逻辑
)(tests)
export default Numb

3. reducers
export const incrementAction = { type: 'INCREMENT', count: 2 }
export const incrementAction = () => { return { type: 'INCREMENT', id: next++, text: 'next'  }} // 如果需要计算
export const reduceAction = { type: 'REDUCE', count: 1 }
const Numb = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + action.count
        case 'REDUCE':
            return state - action.count
        default:
            return state
    }
}
export default Numb
reducers.index文件下引用关联state
const rootReducer = combineReducers({
  Numb
  })
4. 组件
import React from 'react'
import PropTypes from 'prop-types' 
const tests = ({ increment, decrement, Numb }) => (
  <div>
    <p onClick={() => increment()}>click to increment num</p>
    <p onClick={() => decrement()}>click to decrement num</p>
    <p>{Numb}</p>
  </div>
)
tests.propTypes = { // 验证数据类型
  Numb: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired
}
export default tests

1.mapStateToProps（state, ownProps）mapStateToProps是一个函数，用于建立组件跟 store 的 state 的映射关系
2.mapDispatchToProps用于建立组件跟store.dispatch的映射关系,可以是一个object，也可以传入函数

// 获取sotre
import { createStore } from 'redux'
function todos(state = [], action) {
  switch (action.type) {
    case 'TEST':
      return state.concat([action.text])

    default:
      return state
  }
}
 let store = createStore(todos, ['Use Redux'])//一个参数是获取，第二个是默认值
    store.dispatch({
      type: 'TEST',
      text: 'Read the docs'
    })
    console.log(store.getState())

# redux-actions 
1. createAction(s)
2. handleAction(s)
3. combineActions
