# 网络请求

::: details 目录

[[toc]]

:::

## fetch

`fetch()` 方法是一种常用的网络请求的方法，在现代浏览器中原生支持。

```JavaScript
fetch(url, {
  method: "get",// 没写默认是发送get请求
  headers: {
    // 请求头
  },
  body: {
    // 请求传递的参数
  }
})
const data = await res.json()
```

**更多 fetch 信息请点击[此处](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)**

## XMLHttpRequest

使用 `XMLHttpRequest` 也可以发送请求，但是很多情况下都没有使用Fetch简便

xhr.open()参数的含义：

    ① 请求的方式

    ② 请求的地址

    ③ 指定ajax请求是异步处理还是同步处理，默认为true即异步处理，同步一定会影响用户体验

```JavaScript
const xhr = new XMLHttpRequest();
xhr.open("get", url, true);
xhr.setRequestHeader("", "");// 设置请求头
xhr.send();//发送请求，可携带参数
xhr.onreadystatechange = () => {
// 返回存有 XMLHttpRequest 的状态。
// 从 0 到 4 发生变化。0 未连接 1 打开连接 2 发送请求 3 交互 4 完成交互
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {//返回状态码
      var data = xhr.response;
      return data;
    }
  }
}
```

## axios

Axios 是一个基于 promise 网络请求库，作用于node.js 和浏览器中。

Axios 简单的理解就是 ajax 的封装

### 安装 axios

使用 npm:

```bash
npm install axios
```

### 使用 axios

为使用 axios ，需先引入 axios

```JavaScript
import axios from "axios"
```

**GET 基础用例**

```JavaScript
axios.get(url)
    .then(res => {
        //代码片段
    })
    .catch(err => {
        //代码片段
    })
```

**POST 基础用例**

```JavaScript
axios.post(url, {
    firstName: 'Fred',
    lastName: 'Flintstone'
})
    .then(res => {
        //代码片段
    })
    .catch(err => {
        //代码片段
    });
```

与 Promise 类似， `.then` 用于处理请求成功后的操作， `.catch` 用于处理请求失败后的操作

### 参数传递

使用 get 请求传递参数时有两种传递方式:

```JavaScript
axios.get('url?id=1').then(res => {
  console.log(res)
})
```

```JavaScript
axios.get(url,{params:{id:1}}).then(res => {
  console.log(res)
})
```

使用 post 请求传递参数时则是以下方式:

```JavaScript
axios.get('post',"id=1").then(res => {
  console.log(res)
})
```

### 并发请求

使用 axios 的并发请求`axios.all()`方法可以同时进行多个网络请求。

```JavaScript
axios.all([
    axios.get(url1),
    axios.get(url2),
    axios.get(url3),
]).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
```

其中 res 与 err 的值均为数组，分别代表每一个请求的结果。

若想分别处理单个请求的结果，也可以使用`spread()`方法：

```JavaScript
axios.all([
    axios.get(url1),
    axios.get(url2),
    axios.get(url3),
]).then(
    axios.spread((res1, res2, res3) => {
        console.log(res1)
        console.log(res2)
        console.log(res3)
    })
)
```

### 全局配置方案

为 axios 进行全局配置可以提高代码复用性

```JavaScript
axios.defaults.baseURL = url
    axios.defaults.timeout = 5000
    axios.get('link?id=1').then(res => { })
    axios.post('link/add', 'id=1').then(res => { })
```

### 实例封装

当需要进行多个请求并且超时时长不一样时，可以用到 axios 示例进行配置。

```JavaScript
let work = axios.create({
    baseURL: url1,
    timeout: 5000
})
work.get('link?id=1').then(res => { })
```

**axios 实例的相关配置(config 参数)**

|  参数   |              信息              |
| :-----: | :----------------------------: | --- |
| baseURL |       请求的域名基本地址       |
| timeout |       后端定义的超时时长       |
|   url   |           请求的路径           | 临  |
| method  |            请求方法            |
| headers |           设置请求头           |
| params  |    请求的参数拼接在 url 中     |
|  data   | 请求的参数放在 request body 中 |

::: tip 提示
假如新建了一个 axios 实例但是没有参数，取的就是全局的配置值，实例中如果有则优先取实例中的
:::

### 拦截器

请求拦截器能为每个请求都带上参数，比如 token ，时间戳等

```JavaScript
let work = axios.create({
    baseURL: url1,
    timeout: 5000
})
work.interceptors.request.use(
config => {
    //每次发送请求之前判读是否存在 token
    //如果存在，则统一在 http 请求的 header 都加上 token ，这样后台根据 token 判断你的登录情况
    //即使本地存在 token ，也有可能 token 是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = window.localStorage.getItem("token")
    token && (config.headers.Authorization = token)
    return config
},
error => {
    return Promise.error(error)
})
```

响应拦截器能对返回的状态进行判断，比如 token 是否过期

```JavaScript
work.interceptors.response.use(config => {
  //如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  //否则的话抛出错误
  if (config.status === 200) {
      return Promise.resolve(config)
  } else {
      return Promise.reject(config)
  }
}, error => {
  if(error.response.status){
    return Promise.reject(error.response)
  }
})
```

## token

### 获取 token

```JavaScript
const token = localStorage.getItem('token')//获取 token
if(!token){
  location.href = 'url'//如果没有 token ，则返回到指定地址
}
```

当登录成功后，获取并保存 token

```JavaScript
localStorage.setItem('token',token)//将 token 保存在浏览器
location.href = 'url'//登录成功后跳转
```

## 状态码

HTTP 状态码用来表示特定的 HTTP 请求是否已成功完成。响应分为五类：信息响应 (100–199)，成功响应 (200–299)，重定向 (300–399)，客户端错误 (400–499) 和服务器错误 (500–599)。

| Code |       Text        | Information |
| :--: | :---------------: | :---------: |
| 200  |        OK         |    成功     |
| 301  | Moved Permanently | 永久重定向  |
| 302  |       Found       | 临时重定向  |
| 403  |   Forbiddenext    |  禁止访问   |
| 404  |     Not Found     | 找不到文件  |

通常来说，4 开头的状态码代表前端出现错误，5 开头的状态码代表后端出现错误。
