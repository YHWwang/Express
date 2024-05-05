# Readux （严格的单向数据流,只有一个单一的 store）
1. Actions:store 数据的唯一来源
let nextTodoId = 0
export const addTodo = label => {
  return {
    type: 'ADD_TODO',
    value: nextTodoId++,
    label
  }
}
2. Reducers:指定了应用状态的变化如何响应 actions 并发送到 store 的
   const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            value: action.value,
            label: action.label,
            completed: false
          }
        ]
      case 'TOGGLE_TODO':
        return state.map(todo =>
          (todo.value === action.value) 
            ? {...todo, completed: !todo.completed}
            : todo
        )
      default:
        return state
    }
  }
  export default todos
3. Store:连接Actions + Reducers
    维持应用的 state；
    提供 getState() 方法获取 state；
    提供 dispatch(action) 方法更新 state；
    通过 subscribe(listener) 注册监听器;
    通过 subscribe(listener) 返回的函数注销监听器。


# Readux合并多个reducer 
const todoApp = combineReducers({
  todos,
  visibilityFilter
})

# React-Router
ReactRouter中提供了以下三大组件：
1. Router是所有路由组件共用的底层接口组件，它是路由规则制定的最外层的容器。
2. Route路由规则匹配，并显示当前的规则对应的组件。
3. Link路由跳转的组件

# React-router-dom---(V6)路由编程式跳转
import { useNavigate } from 'react-router-dom';
  const navigate = useNavigate()
  navigate('/page')

# Ref修改子组件值(useRef)
父：
import React, { useRef,MutableRefObject } from 'react'
const formRef:MutableRefObject<any> = useRef(null)
const openForm = () => {//子组件的抛出方法
 formRef.current.openForm()
};
子：
import React, { forwardRef ,useImperativeHandle} from 'react'
const SonComponent = forwardRef((props, ref) => {
   useImperativeHandle(ref, () => {
       return {
           useImperativeHandle(ref,()=>{
            return {
              openForm:()=>{//抛出的方法
                setIsModalOpen(true);//hook修改值
              }
            }
          })
       }
   })
   return <div>我是子组件</div>
})
export default SonComponent;

<FormPages ref={formRef} />


# React-Router路由传值的方法
1. params传值，刷新页面参数不消失，参数会在地址栏显示（配置路由path:'/about/:id'后设置link标签'/about/3'）this.props.params.id
2. query传参，刷新页面参数消失，参数不会在地址栏显示 to={{pathname:'/about', query:{id:3} 获取this.props.location.query.id
3. state传参，刷新页面参数不消失,参数不会在地址栏显示to={{pathname:'/about', state:{id:3} 获取this.props.location.state.id 

# React

# React和Vue的区别
  相同：两个都是MVVM框架，数据驱动视图;
  不同: 1、vue是完整一套由官方维护的框架，核心库主要有由尤雨溪大神独自维护，而react是不要脸的书维护（很多库由社区维护），曾经一段时间很多人质疑vue的后续维护性，似乎这并不是问题。
        2、vue上手简单，进阶式框架，白话说你可以学一点，就可以在你项目中去用一点，你不一定需要一次性学习整个vue才能去使用它，而react，恐怕如果你这样会面对项目束手无策。
        3、语法上vue并不限制你必须es6+完全js形式编写页面，可以视图和js逻辑尽可能分离，减少很多人看不惯react-jsx的恶心嵌套，毕竟都是作为前端开发者，还是更习惯于html干净。
        4、很多人说react适合大型项目，适合什么什么，vue轻量级，适合移动端中小型项目，其实我想说，说这话的人是心里根本没点逼数，vue完全可以应对复杂的大型应用，甚至于说如果你react学的不是很好，写出来的东西或根本不如vue写的，毕竟vue跟着官方文档撸就行，自有人帮你规范，而react比较懒散自由，可以自由发挥
        5、vue在国内人气明显胜过react，这很大程度上得益于它的很多语法包括编程思维更符合国人思想

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

# Hook (React 16.8 新增的特性,它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性)
1. useState状态钩子
   const [data, setData] = useState(0)
2. useContext共享状态钩子
   const TestContext = React.createContext({})
   父组件：<TestContext.Provider
    value:{{
      username:'xxxxx'
      messageDetail:'xxxxxx
    }}
    >
      <div>
        <子组件1 />
        <子组件2 />
      </div>
    </TestContext.Provider>
  子组件： const {username} = useContext(TestContext)
3. useEffect 副作用钩子
    它可以用来更好的处理副作用，如异步请求等；可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
   useEffect(() => {
    api()
  }, [变量])

# Hooks解决的问题
1. 类组件的不足：1.状态逻辑难复用2.趋向复杂难以维护3.this指向问题
2. Hooks优势: 1.能优化类组件的三大问题
              2.能在无需修改组件结构的情况下复用状态逻辑（自定义 Hooks ）
              3.能将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）
              4.副作用的关注点分离：副作用指那些没有发生在数据向视图转换过程中的逻辑，如 ajax 请求、访问原生dom 元素、本地持久化缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志等。以往这些副作用都是写在类组件生命周期函数中的。而 useEffect 在全部渲染完毕后才会执行，useLayoutEffect 会在浏览器 layout 之后，painting 之前执行。

# useEffect: 在全部渲染完毕后才会执行 (useLayoutEffect 会在 浏览器 layout 之后，painting 之前执行)
你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合
  useEffect(() => {
    $axios.get('api/getList').then(res => {
      setData(res.data.data)
    }
    )
  }, [])
 useEffect(() => {
        console.log("这里传空数组,只在第一次渲染时调用");
    },[]);

    useEffect(() => {
        console.log("这里不传第二个参数,所有状态改变的时候都调用");
    });

    useEffect(() => {
        return ()=>{
            console.log("这里只在组件卸载的时候调用");
        }
    },[]);

