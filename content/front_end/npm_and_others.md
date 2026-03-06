# npm 与其他

::: danger 警告

该页面尚未完工!

:::

::: details 目录

[[toc]]

:::

## npm 与包

### 包

Node.js 中的第三方模块又叫做**包**。

就像电脑和计算机指的是相同的东西，第三方模块和包指的是同一个概念，只不过叫法不同。

不同于 Node.js 中的内置模块与自定义模块，包是由第三方个人或团队开发出来的，免费供所有人使用。

::: details 为什么需要包

由于 Node.js 的内置模块仅提供了一些底层的 API，导致在基于内置模块进行项目开发时，效率很低。

包是基于内置模块封装出来的，提供了更高级、更方便的 API，极大的提高了开发效率。

:::

### 包的语义化版本规范

包的版本号是以 "点分十进制" 形式进行定义的，总共又三位数字，例如 2.24.0

- 第一位数字：大版本

- 第二位数字：功能版本

- 第三位数字：Bug 修复版本

**版本号提升的规则**：只要前面的版本号增长了，则后面的版本号归零

### 包管理配置文件

npm 规定，在项目根目录中，必须提供一个叫做 package.json 的包管理配置文件，用来记录与项目有关的一些配置信息。例如

- 项目的名词、版本号、描述等

- 项目中都用到了哪些包

- 哪些包只在开发期间会用到

- 哪些包在开发和部署时都需要用到

::: warning 注意

今后在项目开发中，一定要把 node_modules 文件加，添加到 .gitignore 忽略文件中

:::

### 包的分类

**项目包**：那些被安装到项目的 node_modules 目录中的包，都是项目包。

项目包又分为两类，分别是：

- **开发依赖包**：被记录到 devDependencies 节点中的包，只会在开发期间会用到

- **核心依赖包**：被记录到 dependencies 节点中的包，在开发期间和项目上线之后都会用到

**全局包**：

在执行 npm install 命令时，如果提供了 -g 参数，则会把包安装为全局包。全局包会被安装到 C:\Users\用户目录\AppData\Roaming\npm\node_modules 目录下。

::: warning 注意

- 只有工具性质的包，才有全局安装的必要性，因为它们提供了好用的终端命令

- 判断某个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可

:::

### 规范的包结构

一个规范的包，它的组成结构，必须符合以下三点要求：

- 包必须以单独的目录而存在

- 包的顶级目录下必须要包含 pacjage.json 这个包管理配置文件

- package.json 文件中必须包含 name，version，main 这三个树形，分别代表包的名字、版本号、包的入口

### package.json 属性说明

`name`：包名

`version`：包的版本号

::: tip 提示

package.json 文件中版本号的说明，安装的时候代表不同的含义:

"5.03" 表示安装指定的5.0.5版本

"~5.0.3" 表示安装5.0.X中最新的版本

"^5.0.5" 表示安装5.X.X中最新的版本

:::

`description`：包的描述

`homepage`：包的官网 url

`author`：包的作者姓名

`contributors`：包的其他贡献者姓名

`dependencies`：依赖包列表。如果依赖包没有安装， npm 会自动将依赖包安装在 node_module 目录下。

`devDependencies`：开发时依赖包列表，只在项目开发阶段会用到，在项目上线之后不会用到

`repository`：包代码存放的地方的类型，可以是 git 或 svn ，git 可在 Github 上

`main`：指定了程序的主入口文件， require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js 。

`keywords`：关键字

### npm 的使用

`npm -v`：通过查看版本，看 npm 是否安装成功

`npm install`/`npm i`：安装项目所有依赖的包

`npm install <Module Name>`：使用 npm 命令安装指定模块

`npm install <Module Name> -g `：全局安装

`npm install <Modlue Name> -D`：安装包并添加到 devDependencies 列表中

`npm install  <Module Name>@version`：安装指定版本的包

`npm uninstall <Module Name>`：卸载指定的包

`npm uninstall <Module Name> -g`：卸载全局安装的包

`npm list -g`：查看所有全局安装的模块

`npm list vue`：查看某个模块的版本号

`npm -g install npm@version`：安装指定版本的 npm

`npm init`：生成 package.json 配置文件

::: warning 注意

- 该命令只能在英文的目录下成功运行！所以，项目文件夹的名词一定要使用英文命名，不要使用中文，不能出现空格

- 运行 npm istall 命令安装包的时候，npm 包管理工具会自动把包的名称和版本号，记录到 package.json 中

:::

`npm config get registry`：查看当前的下包镜像源

`npm config set registry=<url>`：切换下包的镜像源

### nrm

为了更方便的切换下包的镜像源，我们可以安装 **nrm** 这个小工具，利用 nrm 提供的终端命令，可以快速查看和切换下包的镜像源：

```bash
npm install -g nrm
```

`nrm ls`：查看所有可用镜像源

`nrm use <registryName>`：切换下包的镜像源

### 发布包

::: danger 警告

该部分尚未完工!

:::

## 解决 ES6 语法兼容性问题

1. 使用 npm 全局安装 babel-cli 包 `npm install babel-cli -g`

2. 在项目目录下新建 `.babeirc` 文件（这是 babel 的配置文件）

```json
{
  "presets": ["es2015", "stage-2"], //设置转码规则
  "plugins": ["transform-runtime"] //设置转码插件
}
```

3. 这里我们需要转换成 es2015 ，安装我们需要的库：

```
npm install babel-core babel-preset-es2015 babel-plugin-transform-runtime babel-preset-stage-2 --save -dev
```

4. 在项目下的 `package.json` 文件做如下修改：

```json
"scripts":{"build":"babel src -w -d lib"},
```

即编译整个 src 目录并将其输出到 lib 目录。这里的 src 指的是需要转换的目录， lib 指的是输出的内容的存放目录， -w 其实是 -watch 的意思，就是监听文件，实时编译输出

5. 新建 src 目录和 lib 目录，不然会报错

6. 命令行输入 npm run build

## Promise

Promise是一门新的技术（ES6规范），用于进行异步编程。

**使用方法：**

```JavaScript
new Promise((resolve, reject) => {
    //代码片段
    resolve(res)
    reject(err)
})
    .then(res => {
        //代码片段
    }, err => {
        //代码片段
    })
```

`resolve` 调用该函数则代表执行成功，跳出 Promise ，以 res 为参数执行 `.then` 中的第一个函数

`reject` 调用该函数则代表执行失败，跳出 Promise ，以 err 为参数执行 `.then` 中的第二个函数

常规情况下 `resolve` 与 `reject` 最终只调用其中一个

**多层 Promise 调用**

```JavaScript
new Promise((resolve, reject) => {
    console.log('进入第一层')
    setTimeout(() => {
        resolve("进入第二层")
    }, 1000)
})
    .then(res => {
        console.log(res)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("进入第三层")
            }, 1000)
        })
    }, err => { })
    .then(res => {
        console.log(res)
    })
```

可以在最后使用 `.catch` 统一处理错误，而不用对每个 Promise 均编写处理错误的函数:

```JavaScript
new Promise((resolve, reject) => {
    console.log('进入第一层')
    setTimeout(() => {
        //reject("err")
        resolve("进入第二层")
    }, 1000)
})
    .then(res => {
        console.log(res)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("err")
                //resolve("进入第三层")
            }, 1000)
        })
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
```

**并行 Promise 调用**

```JavaScript
Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('这是第一个请求')
        }, 1000)
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('这是第二个请求')
        }, 1000)
    })
]).then(res => {
    console.log(res)
})
```

其中 res 的值为一个数组，其值分别代表不同 Promise 的 `resolve` 传递值
