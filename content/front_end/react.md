# React

::: details 目录

[[toc]]

:::

## 什么是 React

React 是用于构建 Web 和原生交互界面的库。

React 让你可以通过组件来构建用户界面。你可以创建像 Thumbnail、LikeButton 和 Video 这样的组件。然后将它们组合成整个应用程序。

## 搭建开发环境

**执行命令：**

```
npx create-react-app react-basic
```

当前(2025-7-16)官方更支持以下几种创建 React 应用的方式:

**Next.js**

```
npx create-next-app@latest
```

**React Router (v7)**

```
npx create-react-router@latest
```

**Expo**

```
npx create-expo-app@latest
```

## React 组件

组件 是 React 的核心概念之一。它们是构建用户界面（UI）的基础

### 定义组件

**第一步：导出组件**

export default 前缀是一种 JavaScript 标准语法（非 React 的特性）。它允许你导出一个文件中的主要函数以便你以后可以从其他文件引入它。

```JavaScript
export default
```

**第二步：定义函数**

使用 function Profile() { } 定义名为 Profile 的 JavaScript 函数。

```JavaScript
export default function Profile() {}
```

::: warning 警告
React 组件是常规的 JavaScript 函数，但 组件的名称必须以大写字母开头，否则它们将无法运行！
:::

**第三步：添加标签**

这个组件返回一个带有 src 和 alt 属性的 img 标签。img 写得像 HTML，但实际上是 JavaScript！这种语法被称为 JSX，它允许你在 JavaScript 中嵌入标签。

```JavaScript
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```

从 React 19 开始，你现在可以在函数组件中将 ref 作为 prop 进行访问：

```JavaScript
function Children1({placeholder, ref}) {
  return <input placeholder={placeholder} ref={ref} />
}
```

在其它组件中，可以通过 `useRef` 获取到绑定了 ref 的 DOM 元素

```JavaScript
const sonRef = useRef(null)
//...
<Children1 ref={sonRef} />
```

### 使用组件

可以向正常使用 HTML 标签一样使用组件。

```JSX
<section>
    <h1>了不起的科学家</h1>
    <Profile />
    <Profile />
    <Profile />
</section>
```

对于跨文件使用组件，则需先导入。以下两个文件在同一目录下:

::: code-group

```JavaScript [App.js]
import { useState } from "react";
import Children1 from './Children1.js'

function App() {
  const [num, setNum] = useState(0)
  function click(num) {
    setNum(num)
  }
  return (
    <div className="App">
      <div>{num}</div>
      <div><button onClick={() => click(1)}>1</button></div>
      <div><button onClick={() => click(2)}>2</button></div>
      <Children1 />
    </div>
  );
}

export default App;
```

```JavaScript [Children1.js]
import { useState } from "react";

function Children1() {
    const [msg, setMsg] = useState("msg")
    function click(msg) {
        setMsg(msg)
    }
    return (
        <div className="Children1">
            <div>{msg}</div>
            <div><button onClick={() => click("message1")}>1</button></div>
            <div><button onClick={() => click("message2")}>2</button></div>
        </div>
    );
}

export default Children1;
```

:::

### 组件样式控制

React 组件基础的样式控制有两种方式：

**行内样式控制** :

```JSX
<div style={{ color: 'red' }}>this is div</div>
```

**class 类名控制** :

::: code-group

```css [index.css]
.foo {
  color: red;
}
```

```JavaScript [App.js]
import './index.css'

function App () {
    return (
        <div>
            <span className='foo'>this is span</span>
        </div>
    )
}
```

:::

### 组件父传子通信

当需要进行父子组件间通信时，子组件通过 props 参数接收数据

```JavaScript
function Son(props){
    //...
}
```

父组件在使用子组件时，需传入数据名与数据值

```JavaScript
function App(){
    //...
    return(
        <Son name={name} />
    )
}
```

当父组件把内容嵌套在子组件标签中时，父组件会自动在名为 children 的 prop 属性中接收该内容

```JavaScript
//...
<Son><span>this is span</span></Son>
```

### 组件子传父通信

子组件需要传递数据给父组件时，需要调用父组件传过来的函数

```JavaScript
function Son({onGetMsg}){
    const sonMsg = "this is son msg"
    return(
        <div>
            <button onClick={()=>onGetMsg(sonMsg)}>send</button>
        </div>
    )
}

function App(){
    const getMsg = (msg) => console.log(msg)
    return(
        <div>
            <Son onGetMsg={getMsg} />
        </div>
    )
}
```

## State 状态管理

在 React 中，随时间变化的数据被称为状态（state）。你可以向任何组件添加状态，并按需进行更新。

### 添加状态变量

你可以用 useState 为组件添加状态。useState 让你声明一个状态变量。它接收初始状态并返回一对值：当前状态，以及一个让你更新状态的设置函数。

```JavaScript
const [index, setIndex] = useState(0);
const [showMore, setShowMore] = useState(false);
```

### 使用状态变量

我们在 JSX 中使用状态变量时，将状态变量用 { } 包含起来

调用函数时，则传入一个函数引用

```JavaScript
import { useState } from "react";

function App() {
  const [num, setNum] = useState(0)
  function click(num) {
    setNum(num)
  }
  return (
    <div className="App">
      <div>{num}</div>
      <div><button onClick={() => click(1)}>1</button></div>
      <div><button onClick={() => click(2)}>2</button></div>
    </div>
  );
}

export default App;
```

### 修改状态的规则

**状态不可变** : 在 React 中，状态被认为是只读的，我们应该始终替换它而不是修改它，直接修改状态不能引发视图更新。

```JavaScript
let [count, setCount] = useState(0)
const handleClick = () => {
    count++//直接修改无法引发视图更新 // [!code warning]
    console.log(count)
}
```

**修改对象状态** : 对于对象类型的状态变量，应该始终传给 set 方法一个全新的对象来进行修改。

```JavaScript
const [form, setForm] = useState({
    name: 'jack'
})
const handleChangeName = () => {
    form.name = 'john'//直接修改原对象，不引发视图变化 // [!code warning]
}
```

**正确方法:**

```JavaScript
const [form, setForm] = useState({
    name: 'jack'
})
const handleChangeName = () => {
    setForm({
        ...form,
        name: 'john',
    })
}
```

## Redux 集中状态管理

Redux 是 React 最常用的集中状态管理工具，可以独立于框架运行

Redux 把整个数据修改的流程分成了三个核心概念，分别是：**state**、**action**和**reducer**

**state** : 一个对象，存放着我们管理的数据状态

**action** : 一个对象，用来描述你想怎么改数据

**reducer** : 一个函数，根据 action 的描述生成一个新的 state

### 环境准备

在 React 项目中执行以下命令来安装 Redux Toolkit 和 react-redux ：

```
npm i @reduxjs/toolkit react-redux
```

### 实现 counter

**1.使用 React Toolkit 创建 counterStore**

::: code-group

```JavaScript [counterStore.js]

import { createSlice } from "@reduxjs/toolkit"

const counterStore = createSlice({
    name: 'counter',//模块名称
    initialState: {//初始化的状态
        count: 0
    },
    reducers: {//修改数据的同步方法
        increment (state) {
            state.count++
        },
        decrement (state) {
            state.count--
        },
    }
})

const { increment, decrement } = counterStore.actions//解构出创建action对象的函数
const counterReducer = counterStore.reducer//获取reducer函数
export { increment, decrement }
export default counterReducer
```

```JavaScript [store/index.js]
import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./modules/counterStore"

const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})

export default store
```

:::

**2.为 React 注入 store**

react-redux 负责把 Redux 和 React 链接起来，内置 Provider 组件通过 store 参数把创建好的 store 实例注入到应用中，链接正式建立

```JavaScript
//index.js
import store from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
```

**3. React 组件使用 store 中的数据**

在 React 组件中使用 store 中的数据，需要用到一个钩子函数 `useSelect` ，它的作用是把 store 中的数据映射到组件中

```JavaScript
//App.js
import { useSelector } from "react-redux"

function App() {
    const { count } = useSelcet(state => state.counter)
    return (
        <div className="App">
            {count}
        </div>
    );
}

export default App;
```

**4. React 组件修改 store 中的数据**

React 组件中修改 store 中的数据需要借助另外一个 hook 函数 `useDispatch` ，它的作用是生成提交 action 对象的 dispatch 函数

```JavaScript
//App.js
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './store/modules/counterStore'
function App () {
    const { count } = useSelect(state => state.counter)
    const dispatch = useDispatch()
    return (
        <div className="App">
            <button onClick={() => dispatch(decrement())}>-</button>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
        </div>
    )
}
```

### 提交 action 传参

在 reducers 的同步修改方法中添加 action 对象参数，在调用 actionCreater 的时候传递参数，参数会被传递到 action 对象 payload 属性上

::: code-group

```JavaScript [counterStore.js]
addToNum (state, action) {
    state.count = action.payload
}
```

```JavaScript [App.js]
<button onClick={() => dispatch(addToNum(10))}>add to 10</button>
```

:::

## Zustand 集中状态管理

Zustand 是基于 Flux 模型实现的小型、快速和可扩展的状态管理解决方案，拥有基于 hooks 的舒适的 API，非常地灵活且有趣。

### 安装 Zustand

```
npm install zustand
```

### 创建 store

创建的 store 是一个 hook，你可以放任何东西到里面：基础变量，对象、函数，状态必须不可改变地更新，set 函数合并状态以实现状态更新。

```JavaScript
//countStore.js
import { create } from 'zustand'

const useCountStore = create((set) => {
    return {
        count: 0,//状态数据
        inc: () => {
            set((state) => ({
                count: state.count + 1
            }))
        }//修改状态数据的方法
    }
})

export default useCountStore//导出 store
```

::: tip 提示

函数参数必须返回一个对象，对象内部编写状态数据和方法

set() 是用来修改数据的专门方法，必须调用它来修改数据

:::

### 绑定 store 到组件

可以在任何地方使用钩子，不需要提供 provider。基于 selector 获取您的目标状态，组件将在状态更改时重新渲染。

```JavaScript
import useCountStore from "./store/countStore"

function Children1() {
    const { count, inc } = useCountStore()
    return (
        <div>
            <div>{count}</div>
            <div><button onClick={inc}>+</button></div>
        </div>
    );
}

export default Children1;
```

### 异步支持

对于异步的支持不需要特殊的操作，直接在函数中编写异步逻辑，最后只需要调用 `set()` 方法传入新状态即可

```JavaScript
const useStore = create((set)=>{
    return{
        channelList:[],
        fetchChannelList:async()=>{
            const res = await fetch(url)
            const jsonData = await res.json()
            set({
                channelList: jsonData.data.channels
            })
        }
    }
})
```

### 切片模式

当单个 store 比较大的时候，可以采用切片模式进行模块拆分组合，类似于模块化

```JavaScript
import { create } from 'zustand'

const createCountStore = create((set) => {
    return {
        count: 0,
        inc: () => {
            set((state) => ({
                count: state.count + 1
            }))
        }
    }
})

const createChannelStore = create((set) => {
    return {
        channelList:[],
        fetchChannelList:async()=>{
            const res = await fetch(url)
            const jsonData = await res.json()
            set({
                channelList: jsonData.data.channels
            })
        }
    }
})

const useStore = create((...a)=>{
    return{
        ...createCountStore(...a)
        ...createChannelStore(...a)
    }
})
```

此时便可直接通过调用 useStore 来使用 count 和 channelList 。

## ReactRouter 路由

### 创建路由开发环境

对 React 项目安装 ReactRouter :

```
npm i react-router
```

或者在创建时直接采用含有 reeact-router 的框架:

```
npx create-react-router@latest
```

### 抽象路由模块

::: code-group

```JavaScript [App.js]
function App() {
  return (
    <div className="App">
      App
    </div >
  );
}//页面级组件

export default App;
```

```JavaScript [router.js]
import App from '../App'//引入你需要的页面级组件配置

import { createBrowserRouter } from "react-router"

const router = createrBrowserRouter([
    {
        path: '/',
        element: <App />
    }
])

export default router//导出路由配置
```

```JavaScript [index.js]
//应用入口文件渲染
import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router/router';
import { RouterProvider } from 'react-router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
```

:::

路由配置也可以采用以下写法:

```JavaScript
import App from '../App'//引入你需要的页面级组件配置

import { createBrowserRouter } from "react-router"

const router = createrBrowserRouter([
    {
        path: '/',
        Component: App
    }
])

export default router//导出路由配置
```

### 路由导航

路由系统中的多个路由之间需要进行路由跳转，并且在跳转的同时可能需要传递参数进行通信。

**声明式导航** : 在模板中通过`<Link/>`组件描述处要跳转到哪里去

```JavaScript
import {Link} from 'react-router-dom'
//...
<Link to="/article">文章</Link>
```

通过给组件的 to 属性指定要跳转到路由 path，组件会被渲染为浏览器支持的 a 链接，如果需要传参直接通过字符串拼接的当时拼接参数即可

**编程式导航** : 通过`useNavigate`钩子得到导航方法，然后通过调用方法以命令式的形式进行路由跳转

```JavaScript
import { useNavigate } from "react-routerdom"
const Login = () => {
    const navigate = useNavigate()
    return(
        <div>
            我是登录页
            <button onClick={() => navigate('/article')}>跳转至文章</button>
        </div>
    )
}
```

通过调用 navigate 方法传入地址 path 实现跳转

### 路由间传参

通过导航路由传参有两种方式: searchParams 传参和 params 传参

**searchParams 传参**

在源路由中调用`navigate()`方法时在目标路由后添加参数与参数值，用`?`将路由名与参数隔开，用`&`将参数隔开

```JavaScript
navigate('/article?id=1001&name=jack')
```

在目标路由中使用`useSearchParams()`接收参数

```JavaScript
const [params] = useSearchParams()
let id = params.get('id')
```

**params 传参**

在路由配置文件中提前设置需要传递的参数名，参数名前需添加`:`

```JavaScript
{
    path: '/article/:id/:name'
    element: <Article />
}
```

在源路由中调用`navigate()`方法时在目标路由后添加参数与参数值，用`/`分割路由名与参数

```JavaScript
navigate('/article/1001')
```

最后在目标路由中使用`useParams`方法接收参数

```JavaScript
const params = useParams()
let id = params.id
```

### 嵌套路由配置

在一级路由中又内嵌了其他路由，这种关系就叫做嵌套路由，嵌套至一级路由内的路由又称作二级路由。

**实现步骤**

1.使用 children 属性配置路由嵌套关系

```JavaScript
{
    path: '/',
    element: <Layout />,
    children: [
        {
            path: 'board',
            element: <Board />,
        },
        {
            path: 'about',
            element: <About />,
        },
    ],
}
```

2.使用 `<Outlet/>` 组件配置二级路由渲染位置

```JavaScript
const Layout = () => {
    return(
        <div>
            <div>我是Layout</div>
            <Link to="/board">面板</Link>
            <Link to="/about">关于</Link>

            {/* 二级路由出口 */}
            <Outlet />
        </div>
    )
}
```

### 默认二级路由

**场景** : 当访问的是一级路由时，默认的二级路由组件可以得到渲染。

只需要在二级路由的位置去掉 path ，设置 index 属性为 true 。

```JavaScript
children:[
    {
        index: true,
        element: <Board />,
    },
    {
        path: 'about',
        element: <About />,
    },
]
```

### 404 路由配置

**场景** : 当浏览器输入 url 的路径在整个路由配置中都找不到对应的 path ，为了用户体验，可以使用 404 兜底组件进行渲染

**实现步骤**

1.准备一个 NotFound 组件

```JavaScript
const NotFound = () => {
    return <div>this is NotFound</div>
}
export default NotFound
```

2.在路由表数组的末尾，以 \* 号作为路由 path 配置路由

```JavaScript
{
    path: '*',
    element: <NotFound />
}
```

## React 内置 Hook

Hook 可以帮助在组件中使用不同的 React 功能。你可以使用内置的 Hook 或使用自定义 Hook。

### useReducer

和`useState()`的作用类似，用来管理相对复杂的状态数据

**基础用法**

1、定义一个 reducer 函数(根据不同的 action 返回不同的新状态)

```JavaScript
function reducer(state, action) {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    default:
      return state
  }
}
```

2、在组件中调用 useReducer ，并传入 reducer 函数和状态的初始值

```JavaScript
function App() {
  const [state, dispatch] = useReducer(reducer, 0)
  //...
}
```

3、事件发生时，通过 dispatch 函数分派一个 action 对象(通知 reducer 要返回那个新状态并渲染 UI)

```JavaScript
function App() {
  const [state, dispatch] = useReducer(reducer, 0)
  //...
  return (
    <div className="App">
        {/* //... */}
        <div>{state}</div>
        <div><button onClick={() => dispatch({ type: 'INC' })}>INC</button></div>
        <div><button onClick={() => dispatch({ type: 'DEC' })}>DEC</button></div>
    </div >
  );
}
```

`state` : 状态

`dispatch` : 修改状态的方法

dispatch 除了可以传递状态 type ，还可以传递参数:

```JavaScript
function App() {
  const [state, dispatch] = useReducer(reducer, 0)
  //...
  return (
    <div className="App">
        {/* //... */}
        <div>{state}</div>
        <div><button onClick={() => dispatch({ type: 'INC' })}>INC</button></div>
        <div><button onClick={() => dispatch({ type: 'DEC' })}>DEC</button></div>
        <div><button onClick={() => dispatch({ type: 'SET', payload: 100 })}>SET</button></div>
        <Children1 />
    </div >
  );
}
```

### useMemo

作用：在组件每次重新渲染的时候缓存计算的结果，用于提高性能

```JavaScript
const result = useMemo(()=>{
    return add(count1)
},[count1])
```

使用 useMemo 做缓存之后可以保证只有依赖项发生变化时才会重新计算

### React.memo

作用：允许组件在 props 没有改变的情况下跳过渲染

```JavaScript
const MemoComponent = memo(function Children1(props)){
    //...
}
```

经过 memo 函数包裹生成的缓存组件只有在 props 发生变化的时候才会重新渲染

### useCallback

作用：在组件多次重新渲染的时候缓存函数

```JavaScript
const changeHandler = useCallback((value) => console.log(value),[])
```

使用 useCallback 包裹函数之后，函数可以保证在 App 重新渲染的时候保持引用稳定

### useInperativeHandlle

作用：让父组件访问子组件中的方法

::: code-group

```JavaScript [Children1.js]
function click() {
    //...
}
useImperativeHandle(ref, () => {
    return {
        click
    }
})
return (
    <div className="Children1"></div>
);
```

```JavaScript [App.js]
function App() {
  const sonRef = useRef(null)
  //...
  return (
    <div className="App">
      <Children1 ref={sonRef} />
    </div >
  );
}
```

:::

此时 sonRef 中就可以访问 `click()`方法

### useRef

当你希望组件“记住”某些信息，但又不想让这些信息 触发新的渲染 时，你可以使用 ref 。

在你的组件内，调用 `useRef` Hook 并传入你想要引用的初始值作为唯一参数。

```JavaScript
const ref = useRef(0);
```

useRef 返回一个这样的对象:

```JavaScript
{
  current: 0 // 你向 useRef 传入的值
}
```

你可以用 ref.current 属性访问该 ref 的当前值。这个值是有意被设置为可变的，意味着你既可以读取它也可以写入它。但组件不会在每次变化时重新渲染，而是在其它数据触发渲染时进行重新渲染。

### useEffect

`useEffect`用于在 React 组件中创建不是由事件引起而是由渲染本身引起的操作，比如发送 ajax 请求，更改 DOM 等等。

`useEffect`接受两个参数；参数 1 是一个函数，可以把它叫做副作用函数，在函数内部可以放置要执行的操作；参数 2 是一个数组(可选参)，在数组里放置依赖项，不同依赖项会影响第一个参数函数的执行，当是一个空数组的时候，副作用函数只会在组件渲染完毕之后执行一次。

```JavaScript
useEffect(()=>{
    //副作用操作逻辑
},[])
```

|     依赖项     |        副作用函数执行时机         |
| :------------: | :-------------------------------: |
|   没有依赖项   |    组件初始渲染+组件更新时执行    |
|   空数组依赖   |      只在初始渲染时执行一次       |
| 添加特定依赖项 | 组件初始渲染+特性依赖项变化时执行 |

在`useEffect`中编写的由渲染本身引起的对接组件外部的操作，社区也经常把它叫做副作用操作，比如在`useEffect`中开启了一个定时器，我们想在组件卸载时把这个定时器再清理掉，这个过程就是清理副作用。

```JavaScript
useEffect(() => {
    //副作用逻辑
    return() => {
        //清除副作用逻辑
    }
},[])
```

### useContext

`useContext`与`createContext`联合使用可以实现跨层传递数据

先使用`createContext`方法创建一个上下文对象

```JavaScript
const MsgContext = createContext()
```

再在顶层组件通过 Provider 组件提供数据

```JavaScript
//...
return (
    <MsgContext.Provider calue={msg}>
    {/* //... */}
    </MsgContext.Provider>
)
```

最后在底层组件中使用`useContext`钩子函数接收数据

```JavaScript
//...
const msg = useContext(JavaScript)
```

## 封装 axios 网络请求

### 封装 axios 实例

在项目中封装 axios 实例可以提高代码的复用性

```TypeScript
// src/utils/http.ts
import axios from "axios";

const httpInstance = axios.create({
    baseURL: url,//基础地址
    timeout: 5000,//超时时间
})

//拦截器
httpInstance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

httpInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export { httpInstance }
```

### 实例中转

当一个项目中需要有不同请求基础地址时，可以将他们统一封装到一个文件中进行使用

```TypeScript
// src/utils/index.ts
import { httpInstance } from "./http";//一个请求基础地址

export { httpInstance as http }//统一导出
```

### 详细请求

对于已有的请求基础地址，我们会对其下不同数据的请求进行封装

```TypeScript
import { http } from '../utils'//导入请求基础地址


type ResType<T> = {
    data: T
}//统一返回的数据类型

export type Test1Type = {
    id: number
    name: string
}//求该数据所返回的类型

type Test1Params = {
    id: number
}//请求该数据所需要的参数

export function getTest1Data(params: Test1Params) {
    return http.request<ResType<Test1Type>>({
        url: '/category',
        params,
    })
}//请求
```

### 使用封装后的 axios

想要使用封装后的请求，只需导入对应的文件并传递参数即可

```TypeScript
import { getTest1Data } from './apis/Test1'

getTest1Data({ id: 1 }).then((res) => {
    console.log(res.data.data)
})
```

### 渲染数据

渲染数据的本质是在页面初始加载的时候进行请求获取数据，成功获取数据后传入 state 中并触发渲染逻辑

```TypeScript
import { useEffect, useState } from 'react'
import { getTest1Data } from '../../../apis/Test1'
import type { Test1Type } from '../../../apis/Test1'

const Tab3 = () => {
    const [Test1Data, setTest1Data] = useState<Test1Type>({
        id: 0,
        name: ''
    })//设置初始 state 数据
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getTest1Data({ id: 1 })//获取数据后赋值
                setTest1Data({ id: res.data.data.id, name: res.data.data.name })//更改 state 数据，触发渲染逻辑
            } catch (error) {
                throw new Error('获取失败')
            }
        }
        getData()
    }, [])//仅在页面初始加载时发起请求
    return (
        <>
            <div>Test1Data.id: {Test1Data.id}</div>
            <div>Test1Data.name: {Test1Data.name}</div>
        </>
    )
}

export default Tab3;
```

## TypeScript 使用调整

::: tip 提示
每个包含 JSX 的文件都必须使用`.tsx`文件扩展名。这是一个 TypeScript 特定的扩展，告诉 TypeScript 该文件包含 JSX。
:::

### TypeScript 对组件的调整

在为组件提供传递的参数时，需要使用 interface 或 type 来对组件的参数类型进行描述：

```TypeScript
interface MyButtonProps {
  title: string;
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return (
    <button disabled={disabled}>{title}</button>
  );
}
```

### TypeScript 对 Hook 的调整

**useState**

对于常规数据，你需要为 state 显式提供一个类型

```TypeScript
// 显式设置类型为 "boolean"
const [enabled, setEnabled] = useState<boolean>(false)
```

当你有一个联合类型时，你可能需要提供一个 type

```TypeScript
type Status = "idle" | "loading" | "success" | "error";
const [status, setStatus] = useState<Status>("idle");
```

**useReducer**

你可以选择性地为`useReducer`提供类型参数以为 state 提供类型。但是更好的做法仍然是在初始 state 上添加类型

```TypeScript
import {useReducer} from 'react';

interface State {
   count: number
};

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

const [state, dispatch] = useReducer(stateReducer, initialState);
```

**useMemo**

函数的类型是根据第一个参数中函数的返回值进行推断的，如果希望明确指定，可以为该 Hook 提供一个类型参数以指定函数类型。

```TypeScript
// 从 filterTodos 的返回值推断 visibleTodos 的类型
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab])
```

## 更多信息

更多信息请点击[此处](https://zh-hans.react.dev/learn)
