# Node.js

::: details 目录

[[toc]]

:::

## 初识 Node.js

**Node.js** 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

::: warning 注意

- 浏览器是 JavaScript 的前端运行环境

- Node.js 是 JavaScript 的后端运行环境

- Node.js 中无法调用 DOM 和 BOM 等浏览器内置 API

:::

浏览器中的 JavaScript 学习路径：JavaScript 基础语法 + 浏览器内置 API（DOM + BOM） + 第三方库（jQuery、art-template）

Node.js 的学习路径：JavaScript 语言基础 + Node.js 内置 API 模块（fs、path、http） + 第三方 API 模块（express、mysql）

## fs 文件系统模块

**fs 模块**是 Node.js 官方提供的、用来操作文件的模块。它提供了一系列的方法的属性，用来满足用户对文件的操作需求。

如果要在 JavaScript 代码中，使用 fs 模块来操作文件，则需要使用如下的方式先导入它：

```javascript
const fs = require("fs");
```

```javascript
import fs from "fs";
```

### 读取指定文件中的内容

使用 `fs.readFile()` 方法，可以读取指定文件中的内容，语法格式如下：

```javascript
fs.readFile(path[, options], callback)
```

- **path**：必选参数，字符串，表示文件的路径

- **options**：可选参数，表示以什么编码格式来读取文件

- **callback**：必选参数，文件读取完成后，通过回调函数拿到读取的结果

例如以 utf-8 的编码格式，读取指定文件的内容，并打印 `err` 和 `dataStr` 的值：

```javascript
const fs = require("fs");
fs.readFile("./files/1.txt", "utf-8", function (err, dataStr) {
  console.log(err);
  console.log("-----");
  console.log(dataStr);
});
```

::: tip 提示

如果读取成功，则 `err` 的值为 `null`

如果读取失败，则 `dataStr` 的值为 `undefined`

:::

因此，可以判断 `err` 对象是否为 `null`，从而知晓文件读取的结果：

```javascript
fs.readFile("./README.md", "utf-8", function (err, dataStr) {
  if (err) {
    return console.log("读取文件失败！" + err.message);
  }
  console.log("读取文件成功！" + dataStr);
});
```

### 向指定的文件中写入内容

使用 `fs.writeFile()` 方法，可以向指定的文件中写入内容，语法格式如下：

```javascript
fs.writeFile(file, data[, options], callback)
```

- **file**：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径

- **data**：必选参数，表示要写入的内容

- **options**：可选参数，表示以什么格式写入文件内容，默认值是 utf-8

- **callback**：必选参数，文件写入完成后的回调函数

```javascript
fs.writeFile("./files/1.txt", "Hello Node.js", function (err) {});
```

::: warning 注意

- `fs.writeFile()` 方法只能用来创建文件，不能用来创建路径

- 重复调用 `fs.writeFile()` 写入同一个文件，新写入的内容会覆盖之前的旧内容

:::

::: tip 提示

如果文件写入成功，则 `err` 的值为 `null`

如果文件写入失败，则 `err` 的值为一个错误对象

:::

因此，可以判断 `err` 对象是否为 `null`，从而知晓文件写入的结果：

```javascript
fs.writeFile("./pages/back-end/nodejs.md", "Hello node js", function (err) {
  if (err) {
    return console.log("写入文件失败！" + err.message);
  }
  console.log("写入文件成功！");
});
```

::: details 具体示例

使用 fs 文件系统模块，将文件进行整理：

整理前文件中的数据格式如下：

```
小红=99 小白=100 小黄=70 小黑=66 小绿=88
```

整理后文件中的数据格式如下：

```
小红：99
小白：100
小黄：70
小黑：66
小绿：88
```

```javascript
// 导入需要的 fs 文件系统模块
const fs = require("fs");

// 调用 fs.readFile() 读取文件的内容
fs.readFile("./files/1.txt", "utf-8", function (err, dataStr) {
  // 判断是否读取成功
  if (err) {
    return console.log("读取文件失败！" + err.message);
  }

  // 先把数据按照空格进行分割
  const arrOld = dataStr.split(" ");

  // 循环分割后的数据，对每一项数据，进行字符串的替换操作
  const arrNew = [];
  arrOld.forEach((item) => {
    arrNew.push(item.replace("=", "："));
  });

  // 把新数组中的每一项，进行合并，得到一个新的字符串
  const newStr = arrNew.join("\r\n");

  // 调用 fs.writeFile() 方法，将处理结果，写入到文件中
  fs.writeFile("./files/1.txt", newStr, function (err) {
    if (err) {
      return console.log("写入文件失败！" + err.message);
    }
    console.log("写入文件成功！");
  });
});
```

:::

### 路径动态拼接

在使用 fs 模块操作文件时，如果提供的操作路径是以 `./` 或 `../` 开头的相对路径时，很容易出现路径动态拼接错误的问题。

原因是代码在运行的时候，会以**执行 node 命令时所处的目录**，动态拼接出被操作文件的完整路径。

解决方案为在使用 fs 模块操作文件时，直接提供完整的路径，不要提供 `./` 或 `../` 开头的相对路径，从而防止路径动态拼接的问题。

或者使用 `__dirname` 获取当前文件所处的目录，再拼接出被操作文件的完整路径。

```javascript
fs.readFile(__dirname + "/files/1.txt", "utf-8", function (err, dataStr) {
  if (err) {
    return console.log("读取文件失败！" + err.message);
  }
  console.log("读取文件成功！" + dataStr);
});
```

## path 路径模块

**path 模块**是 Node.js 官方提供的，用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。

如果要在 JavaScript 代码中，使用 path 模块来处理路径，则需要使用如下的方式先导入它：

```javascript
const path = require("path");
```

```javascript
import path from "path";
```

### 路径拼接

使用 `path.join()` 方法，可以把多个路径片段拼接为完整的路径字符串，语法格式如下：

```javascript
path.join([...paths]);
```

- **...paths**: 路径片段的序列

- **返回值**：string 类型

::: details 具体示例

```javascript
const pathStr = path.join("/a", "/b/c", "../", "./d", "e");
console.log(pathStr); // 输出 /a/b/d/e

const pathStr2 = path.join(__dirname, "./files/1.txt");
console.log(pathStr2); // 输出当前文件所处目录 \files\1.txt
```

:::

### 获取路径中的文件名

使用 `path.basename()` 方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名，语法格式如下：

```javascript
path.basename(path[, ext])
```

- **path**: 必选参数，表示一个路径的字符串

- **ext**: 可选参数，文件扩展名

- **返回值**: 表示路径中的最后一部分

::: details 具体示例

```javascript
const fpath = "/a/b/c/index.html"; // 文件的存放路径

const fullName = path.basename(fpath);
console.log(fullName); // 输出 index.html

const nameWithoutExt = path.basename(fpath, ".html");
console.log(nameWithoutExt); // 输出 index
```

:::

### 获取路径中的文件扩展名

使用 `path.extname()` 方法，可以获取路径中的扩展名部分，语法格式如下：

```javascript
path.extname(path);
```

- **path**: 表示一个路径的字符串

- **返回值**: 返回得到的扩展名字符串

::: details 具体示例

```javascript
const fpath = "/a/b/c/index.html"; // 路径字符串

const fext = path.extname(fpath);
console.log(fext); // 输出 .html
```

:::

::: details 综合案例 - 拆分出 html、css、js 文件

**案例的实现步骤**：

① 创建两个正则表达式，分别用来匹配 `<style>` 和 `<script>` 标签

② 使用 fs 模块，读取需要被处理的 HTML 文件

③ 自定义 `resolveCSS` 方法，来写入 index.css 样式文件

④ 自定义 `resolveJS` 方法，来写入 index.js 脚本文件

⑤ 自定义 `resolveHTML` 方法，来写入 index.html 文件

```javascript
const regStyle = /<style>[\s\S]*<\/style>/; // 匹配 style 标签的正则
const regScript = /<script>[\s\S]*<\/script>/; // 匹配 script 标签的正则

// 自定义 resolveCSS 方法
const resolveCSS = (htmlStr) => {
  // 1. 使用正则来匹配 <style>...</style>
  const r1 = regStyle.exec(htmlStr);
  // 2. 如果匹配成功，就调用 fs.writeFile 将结果写入到 css 文件中
  const newCSS = r1[0].replace("<style>", "").replace("</style>", "");
  fs.writeFile(
    path.join(__dirname, "./clock/index.css"),
    newCSS,
    function (err) {
      if (err) return console.log("写入 CSS 失败！" + err.message);
      console.log("写入 CSS 样式文件成功！");
    },
  );
};

// 自定义 resolveJS 方法
const resolveJS = (htmlStr) => {
  // 1. 使用正则来匹配 <script>...</script>
  const r2 = regScript.exec(htmlStr);
  // 2. 如果匹配成功，就调用 fs.writeFile 将结果写入到 js 文件中
  const newJS = r2[0].replace("<script>", "").replace("</script>", "");
  fs.writeFile(path.join(__dirname, "./clock/index.js"), newJS, function (err) {
    if (err) return console.log("写入 JavaScript 脚本失败！" + err.message);
    console.log("写入 JavaScript 脚本成功！");
  });
};

// 自定义 resolveHTML 方法
const resolveHTML = (htmlStr) => {
  const newHTML = htmlStr
    .replace(regStyle, '<link rel="stylesheet" href="./index.css"/>')
    .replace(regScript, '<script src="./index.js"></script>');
  fs.writeFile(path.join(__dirname, "./clock/index.html"), newHTML, (err) => {
    if (err) return console.log("写入 HTML 文件失败！" + err.message);
    console.log("写入 HTML 文件成功！");
  });
};

// 读取需要被处理的 HTML 文件
fs.readFile(path.join(__dirname, "./index.html"), "utf-8", (err, dataStr) => {
  if (err) {
    return console.log("读取 HTML 文件失败！" + err.message);
  }
  resolveCSS(dataStr);
  resolveJS(dataStr);
  resolveHTML(dataStr);
});
```

:::

## http 模块

**http 模块**是 Node.js 官方提供的，用于创建 web 服务器的模块。通过 http 模块，就能方便的把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务。

如果要希望使用 http 模块创建 Web 服务器，则需要先导入它：

```javascript
const http = require("http");
```

```javascript
import http from "http";
```

::: details 进一步理解 http 模块的作用

服务器和普通电脑的区别在于，服务器上安装了 web 服务器软件，例如：IIS、Apache 等。通过安装这些服务器软件，就能把一台普通的电脑变成一台 web 服务器。

在 Node.js 中，我们不需要使用 ISS、Apache 等这些第三方 web 服务器软件。因为我们可以基于 Node.js 提供的 http 模块，通过几行简单的代码，就能轻松的手写一个服务器软件，从而对外提供 web 服务。

:::

### IP 地址

**IP 地址**就是互联网上每台计算机的唯一地址，因此 IP 地址具有唯一性。

IP 地址的格式通常用 "点分十进制" 表示成（a.b.c.d）的形式，其中，a、b、c、d 都是 0~255 之间的十进制整数。

::: warning 注意

互联网中每台 Web 服务器，都有自己的 IP 地址

在开发期间，自己的电脑即是一台服务器，也是一个客户端，为了方便测试，可以在自己的浏览器中输入 127.0.0.1 这个 IP 地址，就能把自己的电脑当作一台服务器进行访问了

:::

### 域名和域名服务器

尽管 IP 地址能够唯一地标记网络上的计算机，但 IP 地址是一长串数子，不直观，而且不便于记忆，于是人们又发明了另一套字符型的地址方案，即所谓的**域名**（Domain Name）地址。

IP 地址和域名是相对应的关系，这份对应关系存放在一种叫做**域名服务器**（DNS，Domain Name Server）的电脑中。使用者只需通过好记的域名访问对应的服务器即可，对应的转换工作由域名服务器实现。因此，域名服务器就是提供 IP 地址和域名之间的转换服务的服务器。

::: warning 注意

单纯使用 IP 地址，互联网中的电脑也能够正常工作。但是有了域名的加持，能让互联网的世界变得更加方便

在开发测试期间，127.0.0.1 对应的域名是 localhost，它们都代表我们自己的这台电脑，在使用效果上没有任何区别

:::

### 端口号

计算机中的端口号，就好像是显示生活中的门牌号一样。通过门牌号，外卖小哥可以在整栋大楼众多的房间中，准确把外卖送到你的手中。

同样的道理，在一台电脑中，可以运行成百上千个 web 服务。每个 web 服务都对应一个唯一的端口号。客户端发送过来的网络请求，通过端口号，可以准确地交给对应的 web 服务进行处理。

::: warning 注意

每个端口号不能被多个 web 服务占用

在实际应用中，URL 中的 80 端口可以被省略

:::

### 创建最基本的 web 服务器

**创建 web 服务器的基本步骤**：

① 导入 http 模块

② 创建 web 服务器实例

③ 为服务器实例绑定 request 事件，监听客户端的请求

④ 启动服务器

```javascript
import http from "http";

// 创建 web 服务器实例
const server = http.createServer();

// 使用服务器实例的 .on() 方法，即可监听客户端发送过来的网络请求
server.on("request", (req, res) => {
  // 只要有客户端来请求我们自己的服务器，就会触发 request 事件，从而调用这个事件处理函数
  console.log("Some visit our web server.");
});

// 调用 server.listen(端口号, 回调函数) 方法，即可启动 web 服务器
server.listen(80, () => {
  console.log("http server running at http://127.0.0.1");
});
```

### req 请求对象

只要服务器接收到了客户端的请求，就会调用通过 `server.on()` 为服务器绑定的 request 事件处理函数。

如果想在事件处理函数中，访问与客户端相关的数据或属性，可以使用如下的方式：

```javascript
server.on("request", (req, res) => {
  // req.url 是客户端请求的 URL 地址
  const url = req.url;
  // req.method 是客户端请求的 method 类型
  const method = req.method;
  const str = `Your request url is ${url}, and request method is ${method}`;
  console.log(str);
});
```

::: tip 提示

req 是请求对象，包含了与客户端相关的数据和属性。

:::

### res 响应对象

在服务器的 request 事件处理函数中，如果想访问与服务器相关的数据活属性，可以使用如下的方式：

```javascript
server.on("request", (req, res) => {
  const url = req.url;
  const method = req.method;
  const str = `Your request url is ${url}, and request method is ${method}`;
  console.log(str);
  // 调用 res.end() 方法，向客户端响应一些内容
  res.end(str);
});
```

### 解决中文乱码问题

当调用 res.end() 方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式：

```javascript
server.on("request", (req, res) => {
  // 发送的内容包含中文
  const str = `您请求的 url 地址是 ${req.url}, 请求的 method 类型是 ${req.method}`;
  // 为了防止中文显示乱码的问题，需要设置响应头 Content-Type 为 text/html；charset=utf-8
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(str);
});
```

### 根据不同的 url 响应不同的 html 内容

**核心实现步骤**：

① 获取请求的 url 地址

② 设置默认的响应内容为 404 Not Found

③ 根据不同的 url 地址，设置不同的响应内容

④ 设置 Content-Type 响应头，防止中文乱码

⑤ 使用 res.end() 把内容响应给客户端

```javascript
server.on("request", (req, res) => {
  const url = req.url; // 获取请求的 url 地址
  let content = "<h1>404 Not Found</h1>"; // 设置默认的内容为 404 Not Found
  if (url === "/" || url === "/index.html") {
    content = "<h1>首页</h1>"; // 用户请求的是首页
  } else if (url === "/about.html") {
    content = "<h1>关于</h1>"; // 用户请求的是关于页面
  }
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(content);
});
```

::: details 综合案例 - 通过服务器访问网页文件

**核心思路**：把文件的实际存放路径，作为每个资源的请求 url 地址

**实现步骤**：

① 导入需要的模块

② 创建基本的 web 服务器

③ 将资源的请求 url 地址映射为文件的存放路径

④ 读取文件内容并响应给客户端

```javascript
// 1 导入需要的模块
const http = require("http");
const path = require("path");
const fs = require("fs");

// 2.1 创建 web 服务器
const server = http.createServer();

// 2.2 监听 web 服务器的 request 事件
server.on("request", (req, res) => {
  // 3.1 获取到客户端请求的 url 地址
  const url = req.url; // 获取请求的 url 地址
  // 3.2 把请求的 url 地址映射为本地文件的存放路径
  const fpath = path.join(__dirname, url);
  // 4.1 根据映射过来的文件路径读取文件
  fs.readFile(fpath, "utf8", (err, dataStr) => {
    // 4.2 读取文件失败后，向客户端响应固定的 "错误消息"
    if (err) return res.end("404 Not Found");
    // 4.3 读取文件成功后，将 "读取成功的内容" 响应给客户端
    res.end(dataStr);
  });
});

// 2.3 启动 web 服务器
server.listen(80, () => {
  console.log("http server running at http://127.0.0.1");
});
```

⑤ 优化资源的请求路径

```javascript
server.on("request", (req, res) => {
  const url = req.url; // 获取请求的 url 地址
  // 5.1 预定义空白的文件存放路径
  let fpath = "";
  if (url === "/") {
    // 5.2 如果请求的路径是否为 /，则手动指定文件的存放路径
    fpath = path.join(__dirname, "./clock/index.html");
  } else {
    fpath = path.join(__dirname, "clock", url);
  }
  fs.readFile(fpath, "utf8", (err, dataStr) => {
    // 4.2 读取文件失败后，向客户端响应固定的 "错误消息"
    if (err) return res.end("404 Not Found");
    // 4.3 读取文件成功后，将 "读取成功的内容" 响应给客户端
    res.end(dataStr);
  });
});
```

:::

## 模块化

**模块化**是指解决一个复杂问题时，自顶层向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组合、分解和更换的单元。

在编程邻域中的模块化，就是遵守固定的规则，把一个大文件拆分成独立并互相依赖的多个小模块。

::: tip 把代码进行模块化拆分的好处

- 提高了代码的复用性

- 提高了代码的可维护性

- 可以实现按需加载

:::

**模块化规范**就是对代码进行模块化的拆分与组合时，需要遵守的那些规则。

例如：

- 使用什么样的语法格式来引用模块

- 在模块中使用什么样的语法格式向外暴露成员

### Node.js 中的模块化

Node.js 中根据模块化来源的不同，将模块分为了 3 大类，分别是：

- **内置模块**：由 Node.js 官方提供的，例如 fs、path、http 等

- **自定义模块**：用户创建的每个 .js 文件，都是自定义模块

- **第三方模块**：由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载

### Node.js 中的模块作用域

和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做**模块作用域**。

::: tip 模块作用域的好处

防止了全局变量污染的问题

:::

### 模块的加载机制

模块在第一次加载后会被缓存，这也意味着多次调用 `require()` 不会导致模块的代码被执行多次。

::: warning 注意

不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率

:::

内置模块的加载优先级最高，即使在 node_modules 目录下有名字相同的模块，始终返回内置的模块。

加载自定义模块时，必须指定以 ./ 或 ../ 开头的路径标识符。如果没有指定，则 node 会把它当作内置模块或第三方模块进行加载。

同时如果省略的文件的扩展名，则 Node.js 会按顺序分别尝试加载以下的文件：

① 按照确切的文件名进行加载

② 补全 .js 扩展名进行加载

③ 补全 .json 扩展名进行加载

④ 补全 .node 扩展名进行加载

⑤ 加载失败，终端报错

如果传递给 `require()` 的模块标识符不是一个内置模块，也没有以 ./ 或 ../ 开头，则 Node.js 会从当前模块的父目录开始，尝试从 /node_modules 文件夹中加载第三方模块。

如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。

### 目录作为模块

当把目录作为模块标识符，传递给 `require()` 进行加载的时候，有三种加载方式：

① 在被加载的目录下查找一个叫做 package.json 的文件，并寻找 main 属性，作为 `require()` 加载的入口

② 如果目录里没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件

③ 如果以上两步都失败了，则 Node.js 会在终端打印错误消息，报告模块的缺失：`Error: Cannot find module 'xxx'`

### module 对象

在每个 .js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息，打印如下：

```javascript
console.log(module);
```

```console
{
  id: '.',
  path: 'e:\\files\\我的git库\\blog',
  exports: {},
  filename: 'e:\\files\\我的git库\\blog\\test.js',
  loaded: false,
  children: [],
  paths: [
    'e:\\files\\我的git库\\blog\\node_modules',
    'e:\\files\\我的git库\\node_modules',
    'e:\\files\\node_modules',
    'e:\\node_modules'
  ],
  Symbol(kIsMainSymbol): true,
  Symbol(kIsCachedByESMLoader): false,
  Symbol(kURL): undefined,
  Symbol(kFormat): undefined,
  Symbol(kIsExecuting): true
}
```

### CommonJS 模块化规范

CommonJS 规定：

- 每个模块内部，`module` 变量代表当前模块

- `module` 变量是一个对象，它的 `exports` 属性（即 `module.exports`）是对外的接口

- 加载某个模块，其实是加载该模块的 `module.exports` 属性。`require()` 方法用于加载模块

## Express

Express 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。

Express 的作用和 Node.js 内置的 http 模块类似，是专门用来创建 Web 服务器的。

**Express 的本质**：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。

对于前端程序员来说，最常见的两种服务器，分别是：

- **Web 网站服务器**：专门对外提供 Web 网页资源的服务器

- **API 接口服务器**：专门对外提供 API 接口的服务器

使用 Express，我们可以方便、快速的创建 Web 网站的服务器或 API 接口的服务器。

在项目所处的目录中，运行如下的终端命令，即可将 express 安装到项目中使用：

```bash
npm install express
```

### 创建基本的 Web 服务器

```javascript
import express from "express";

// 创建 web 服务器
const app = express();

// 调用 app.listen(端口号, 回调函数)，启动服务器
app.listen(80, () => {
  console.log("express server running at http://127.0.0.1");
});
```

通过 `app.get()` 方法，可以监听客户端的 GET 请求，具体的语法格式如下：

```javascript
app.get(url, (req, res) => {});
```

- **参数 1**：客户端请求的 URL 地址

- **参数 2**：请求对应的处理函数
  - **req**：请求对象（包含了与请求相关的属性与方法）
  - **res**：响应对象（包含了与响应相关的属性与方法）

通过 `res.send()` 方法，可以把处理好的内容，发送给客户端：

```javascript
res.send({});
```

::: details 具体示例

监听客户端的 GET 和 POST 请求，并向客户端响应对应的内容：

```javascript
import express from "express";

const app = express();

// 监听客户端的 GET 和 POST 请求，并向客户端响应对应的内容
app.get("/user", (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
  res.send({ name: "zs", age: 20, gender: "男" });
});

app.post("/user", (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个文本字符串
  res.send("请求成功");
});

app.listen(80, () => {
  console.log("express server running at http://127.0.0.1");
});
```

:::

通过 `req.query` 对象，可以访问到客户端通过查询字符串的形式（`?name=za&age=20`），发送到服务器的参数：

```javascript
app.get("/", (req, res) => {
  console.log(req.query);
  res.send({ name: req.query.name, age: req.query.age, gender: "男" });
});
```

默认情况下，`req.query` 是一个空对象。

通过 `req.params` 对象，可以访问到 URL 中，通过 `:` 匹配到的动态参数：

```javascript
app.get("/user/:id", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});
```

默认情况下，`req.params` 是一个空对象。

通过 `express.static()`，我们可以非常方便地创建一个静态资源服务器。

例如，通过以下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：

```javascript
app.use(express.static("public"));
```

此时即可通过 URL 路径直接访问对应文件。

::: warning 注意

Express 在指定的静态目录中查找文件，并对外提供资源的访问路径。

因此，存放静态文件的目录名不会出现在 URL 中。

:::

如果要托管多个静态资源目录，请多次调用 `express.static()` 函数：

```javascript
app.use(express.static("public"));
app.use(express.static("./files"));
```

::: warning 注意

访问静态资源文件时，`express.static()` 函数会根据目录的添加顺序查找所需的文件

:::

如果希望在托管的静态资源访问路径之前，挂载路径前缀（即在访问的 URL 中添加静态资源目录），则可以使用如下的方式：

```javascript
app.use("/abc", express.static("./files"));
```

### Express 路由

广义上来讲，路由就是映射关系。

在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

Express 中的路由分 3 部分组成，分别是**请求的类型**、**请求的 URL 地址**、**处理函数**。

::: details 具体示例

```javascript
// 匹配 GET 请求，且请求 URL 为 /
app.get("/", (req, res) => {
  res.send("Hello World");
});

// 匹配 POST 请求，且请求 URL 为 /
app.post("/", (req, res) => {
  res.send("Got a POST request");
});
```

:::

每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。

在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的 URL 同时匹配成功，则 Express 会将这次请求，转交给对应的 function 函数进行处理。

::: warning 注意

- 按照定义的先后顺序进行匹配

- 请求类型和请求的 URL 同时匹配成功，才会调用对应的处理函数

:::

在 Express 中使用路由最简单的方式，就是把路由挂载到 app 上，示例如下：

```javascript
import express from "express";

const app = express();

// 挂载路由
app.get("/", (req, res) => {
  res.send("Hello World.");
});
app.post("/", (req, res) => {
  res.send("Hello World.");
});

// 启动 Web 服务器
app.listen(80, () => {
  console.log("express server running at http://127.0.0.1");
});
```

### 模块化路由

为了方便对路由进行模块化的管理，Express 不建议将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块。

将路由抽离为单独模块的步骤如下：

① 创建路由模块对应的 .js 文件

② 调用 `express.Router()` 函数创建路由对象

③ 向路由对象上挂载具体的路由

④ 向外共享路由对象

⑤ 使用 `app.use()` 函数注册路由模块

::: code-group

```javascript [router.js]
import express from "express";

// 创建路由对象
const router = express.Router();

router.get("/user/list", (req, res) => {
  res.send("Get user list");
});

router.post("/user/add", (req, res) => {
  res.send("Add new user");
});

export default router;
```

```javascript [index.js]
import express from "express";
// 导入路由模块
import router from "./router/router.js";

const app = express();

// 注册路由模块
app.use(router);

app.listen(80, () => {
  console.log("express server running at http://127.0.0.1");
});
```

:::

::: tip `app.use()`

`app.use()` 函数的作用，就是来注册全局中间件

:::

类似于托管静态资源时，为静态资源统一挂载访问前缀一样，路由模块添加前缀的方式也非常简单：

```javascript
app.use("/api", router);
```

### Express 中间件

**中间件**（Middleware），特指业务流程的中间处理环节。

当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理。

Express 的中间件，本质上就是一个处理函数，Express 中间件的格式如下：

```javascript
app.use(function (req, res, next) {
  next();
});
```

- **next 函数**：实现多个中间件连续调用的关键，表示把流转关系转交给下一个中间件或路由。

::: warning 注意

中间件的形参列表中，必须包含 next 参数。而路由处理函数中只包含 req 和 res。

:::

可以通过如下的方式，定义一个最简单的中间件函数：

```javascript
const mw = (req, res, next) => {
  console.log("这是最简单的中间件函数");
  // 把流转关系，转交给下一个中间件或路由
  next();
};
```

客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。

通过调用 `app.use()` 方法，即可定义一个全局生效的中间件：

```javascript
app.use(mw);

// 简化形式
app.use((req, res, next) => {
  console.log("这是最简单的中间件函数");
  next();
});
```

::: tip 中间件的作用

多个中间件之间，共享同一份 req 和 res。基于这样的特性，我们可以在上游的中间件中，统一为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

:::

::: details 具体示例 - 添加到达服务器的时间戳

```javascript
app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

app.get("/", (req, res) => {
  res.send("Home page." + req.startTime);
});
```

:::

也可以使用 `app.use()` 连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用：

```javascript
app.use((req, res, next) => {
  console.log("调用了第 1 个全局中间件");
  next();
});

app.use((req, res, next) => {
  console.log("调用了第 2 个全局中间件");
  next();
});
```

不使用 `app.use()` 定义的中间件，叫做局部生效的中间件：

```javascript
// 定义中间件函数 mw1
const mw1 = (req, res, next) => {
  console.log("这是中间件函数");
  next();
};

// mw1 这个中间件只在 "当前路由中生效"，这种用法属于 "局部生效的中间件"
app.get("/", mw1, (req, res) => {
  res.send("Home page.");
});

// mw1 这个中间件不会影响下面这个路由
app.get("/user", (req, res) => {
  res.send("User page.");
});
```

也可以在路由中，通过如下两种等价的方式，使用多个局部中间件：

```javascript
app.get("/", mw1, mw2, (req, res) => {
  res.send("Home page.");
});
app.get("/", [mw1, mw2], (req, res) => {
  res.send("Home page.");
});
```

::: warning 中间件的使用注意事项

- 大部分中间件都要在路由之前注册

- 客户端发送过来的请求，可以连续调用多个中间件进行处理

- 执行完中间件的业务代码之后，不要忘记调用 `next()` 函数

- 为了防止代码逻辑混乱，调用 `next()` 函数后不要再写额外的代码

- 连续调用多个中间件时，多个中间件之间，共享 `req` 和 `res` 对象

:::

如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。所以 data 事件可能会触发多次，每一次触发 data 事件时，获取到的数据只是完整的一部分，需要手动对接收到的数据进行拼接：

```javascript
let str = "";
req.on("data", (chunk) => {
  str += chunk;
});
```

当请求体数据接收完毕之后，会自动触发 req 的 end 事件。

因此，我们可以在 req 的 end 事件中，拿到并处理完整的请求体数据：

```javascript
req.on("end", () => {
  console.log(str);
});
```

::: details 具体示例 - 模拟 `express.urlencoded()`

手动模拟一个类似于 `express.urlencoded()` 这样的中间件，来解析 POST 提交到服务器的表单数据。

**实现步骤**：

① 定义中间件

② 监听 `req` 的 `data` 事件

③ 监听 `req` 的 `end` 事件

④ 使用 `querystring` 模块解析请求体数据

⑤ 将解析出来的数据对象挂载为 `req.body`

⑥ 将自定义中间件封装为模块

::: code-group

```javascript [custom-body-parser.js]
import queryString from "querystring";
const bodyParser = (req, res, next) => {
  let str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });
  req.on("end", () => {
    // 调用 parse() 方法，把查询字符串解析成对象格式
    req.body = queryString.parse(str);
    next();
  });
};
export default bodyParser;
```

```javascript [index.js]
import bodyParser from "./custom-body-parser.js";
app.use(bodyParser);
```

:::

### 中间件的分类

Express 官方把常见的中间件用法，分成了 5 大类，分别是：

- **应用级别的中间件**：通过 `app.use()`、`app.get()`、`app.post()` 等绑定到 app 实例上的中间件：

```javascript
app.use((req, res, next) => {
  next();
});
```

- **路由级别的中间件**：绑定到 `express.Router()` 实例上的中间件，用法和应用级别中间件没有任何区别：

```javascript
const router = express.Router();

router.use((req, res, next) => {
  next();
});

app.use(router);
```

- **错误级别的中间件**：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题：

```javascript
app.use((err, req, res, next) => {
  console.log("Error：", err.message);
  res.send("Error：" + err.message);
});
```

::: warning 注意

错误级别的中间件，必须注册在所有路由之后

:::

- **Express 内置的中间件**：自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件：`express.static()` 快速托管静态资源的内置中间件（HTML 文件、图片、CSS 样式等）、`express.json()` 解析 JSON 格式的请求体数据（仅在 4.16.0+ 版本中可用）、`express.urlencoded()` 解析 URL-encoded 格式的请求体数据（仅在 4.16.0+ 版本中可用）：

```javascript
// 配置解析 application/json 格式数据的内置中间件
app.use(express.json());
// 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false }));
```

::: details 具体示例 - 解析 JSON 格式数据

```javascript
app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("ok");
});
```

默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined

:::

::: details 具体示例 - 解析 URL-encoded 格式数据

```javascript
app.use(express.urlencoded({ extended: false }));

app.post("/book", (req, res) => {
  console.log(req.body);
  res.send("aaa");
});
```

:::

- **第三方中间件**：非 Express 官方内置的，而是由第三方开发出来的中间件，可以按需下载并配置

## 编写接口

::: code-group

```javascript [apiRouter.js]
import express from "express";

// 创建路由对象
const apiRouter = express.Router();

// 挂载对应的路由
apiRouter.get("/get", (req, res) => {
  // 获取客户端通过查询字符串，发送到服务器的数据
  const query = req.query;
  // 把数据响应给客户端
  res.send({
    status: 0,
    message: "GET 请求成功", // 状态的描述
    data: query, // 需要响应给客户端的数据
  });
});

apiRouter.post("/post", (req, res) => {
  // 获取客户端通过请求体，发送到服务器的 URL-encoded 数据
  const body = req.body;
  // 把数据响应给客户端
  res.send({
    status: 0,
    message: "POST 请求成功", // 状态的描述
    data: body, // 需要响应给客户端的数据
  });
});

export default apiRouter;
```

```javascript [index.js]
import express from "express";
import apiRouter from "./router/apiRouter.js";

// 创建服务器实例
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

app.listen(80, () => {
  console.log("express server running at http://127.0.0.1");
});
```

:::

### 接口跨域问题

刚才编写的 GET 和 POST 接口，存在一个很严重的问题：**不支持跨域请求**

解决接口跨域问题的方案主要有两种：

- **CORS**：主流的解决方案，推荐使用

- **JSONP**：有缺陷的解决方案，只支持 GET 请求

::: details 什么是 CORS

CORS（Cross-Origin Resource Sharing，跨域资源共享）由一系列 HTTP 响应头组成，这些 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源。

浏览器的同源安全策略默认会阻止网页 "跨域" 获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头，就可以解除浏览器端的跨域访问限制。

CORS 主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了 CORS 的接口。

CORS 在浏览器中由兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、Firefox3.5+）。

:::

### 使用 cors 中间件解决接口跨域问题

cors 是 Express 的一个第三方中间件。通过安装和配置 CORS 中间件，可以很方便地解决跨域问题。

**使用步骤**：

① 运行 `npm install cors` 安装中间件

② 使用 `import cors from "cors"` 导入中间件

③ 在路由之前调用 `app.use(cors())` 配置中间件

```javascript
// 在路由之前，配置 CORS 中间件
app.use(cors());
```

### CORS 响应头

响应头部中可以携带一个 **Access-Control-Allow-Origin** 字段，其语法如下：

```http
Access-Control-Allow-Origin: <origin> | *
```

- **origin**：指定了允许访问该资源的外域 URL

例如，下面的字段值将只允许来自 http://itcast.cn 的请求：

```javascript
res.setHeader("Access-Control-Allow-Origin", "http://itcast.cn");
```

如果指定了 Access-Control-Allow-Origin 字段的值为通配符 \*，表示允许来自任何域的请求：

```javascript
res.setHeader("Access-Control-Allow-Origin", "*");
```

默认情况下，CORS 仅支持客户端向服务器发送如下的 9 个请求头：Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type（值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）

如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 **Access-Control-Allow-Headers** 对额外的请求头进行声明，否则这次请求会失败。

```javascript
res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Custom-Header");
```

默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。

如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 **Access-Control-Allow-Methods** 来指明事件请求所允许使用的 HTTP 方法。

```javascript
res.setHeader("Access-Control-Allow-Methods", "GET, POST, HEAD, DELETE");
// 允许所有的 HTTP 请求方法
res.setHeader("Access-Control-Allow-Methods", "*");
```

### CORS 请求的分类

客户端在请求 CORS 接口时，根据请求方式和请求头的不同，可以将 CORS 的请求分为两大类：

- **简单请求**：请求方式属于 GET、POST、HEAD 三者之一，且 HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type（值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）

- **预检请求**：请求方式为 GET、POST、HEAD 之外的请求方式，或请求头中包含自定义头部字段，或向服务器发送了 application/json 格式的数据

在浏览器与服务器正式通信之前，浏览器会先发送 OPTIONS 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTION 请求称为 "预检请求"。服务器成功响应预检请求后，才会发送真正的请求，并携带真实数据。

::: tip 简单请求和预检请求的区别

**简单请求的特点**：客户端与服务器之间只会发生一次请求

**预检请求的特点**：客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求

:::

### JSONP 接口

**JSONP**（JSON with Padding）是一种跨域数据交互的解决方案，主要用于解决浏览器同源策略限制下的跨域请求问题。

浏览器端通过 `<script>` 标签的 `scr` 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 **JSONP**。

::: warning 注意

- JSONP 不属于真正的 Ajax 请求，因为它没有使用 XMLHttpRequest 这个对象

- JSONP 仅支持 GET 请求，不支持 POST、PUT、DELETE 等请求

:::

如果项目中已经配置了 CORS 跨域资源共享，为了防止冲突，必须在配置 CORS 中间件之前声明 JSONP 的接口。否则 JSONP 接口会被处理成开启了 CORS 的接口。

**实现 JSONP 接口的步骤**：

① 获取客户端发送过来的回调函数的名字

② 得到要通过 JSONP 形式发送给客户端的数据

③ 根据前两步得到的数据，拼接出一个函数调用的字符串

④ 把上一步拼接得到的字符串，响应给客户端的 `<script>` 标签进行解析执行

```javascript
app.get("/api/jsonp", (req, res) => {
  const funcName = req.query.callback;
  const data = { name: "zs", age: 22 };
  const scriptStr = `${funcName}(${JSON.stringify(data)})`;
  res.send(scriptStr);
});

app.use(cors());
app.use("/api", apiRouter);
// ...
```

## MySQL 数据库

**数据库**（database）是用来组织、存储和管理数据的仓库。用户可以对数据库中的数据进行新增、查询、更新、删除等操作。

最常见的数据库有如下几个：

- MySQL 数据库

- Oracle 数据库

- SQL Server 数据库

- Mongodb 数据库

其中，MySQL、Oracle、SQL Server 属于传统型数据库（又叫做：关系型数据库或 SQL 数据库），这三者的设计理念相同，用法比较类似。

而 Mongodb 属于新型数据库（又叫做非关系数据库或 NoSQL 数据库），它在一定程度上弥补了传统型数据库的缺陷。

传统型数据库的数据组织结构，与 Excel 中数据的组织结构（工作簿、工作表、数据行、列）比较类似，数据的组织结构分为**数据库**（database）、**数据表**（table）、**数据行**（row）、**字段**（field）这 4 大部分组成。

在实际项目开发中，一般情况下，每个项目都对应独立的数据库。

不同的数据，要存储到数据库的不同表中。例如：用户数据存储到 users 表中，图书数据存储到 books 表中。

每个表中具体存储哪些信息，由字段来决定。例如：我们可以为 users 表设计 id、username、password 这 3 个字段。

表中的行，代表每一条具体的数据。

### 安装并配置 MySQL

- **MySQL Server**：专门用来提供数据存储和服务的软件

- **MySQL Workbench**：可视化的 MySQL 管理工具，可以方便的操作存储在 MySQL Server 中的数据

下载连接：https://downloads.mysql.com/archives/installer/

`net start mysql80`：启动 MySQL Server

`net stop mysql80`：停止 MySQL Server

### 主界面组成部分

![MySQL Workbench 主界面](/images/back-end/nodejs/mysql.png)

### 创建数据

**创建数据库的步骤**：

① 点击新建数据库按钮

![新建数据库](/images/back-end/nodejs/mysql-new-schema.png)

② 填写数据库的名称

③ 点击 Apply 按钮，创建数据库

**创建数据表的步骤**：

① 展开对应的数据库，在 Tables 节点上右键选择 Create Table ...

② 在 Table Name 内输入数据表的名称

③ 在 Comments 内输入数据表的描述（可选）

④ 设计表的字段

::: tip Data Type 数据类型

- **INT**：整数

- **VARCHAR(len)**：字符串

- **TINYINT(1)**：布尔值

:::

::: tip Storage 特殊标识

- **PK**(Primary Key)：主键、唯一标识

- **NN**(Not Null)：值不允许为空

- **UQ**(Unique)：值唯一

- **AI**(Auto Increment)：值自动增长

:::

⑤ 点击 Apply 按钮，创建数据表

**向表中写入数据的步骤**：

① 在对应表上右键选择 Select Rows - Limit 1000

② 输入需要输入的数据

③ 点击 Apply 按钮，写入数据

## SQL 管理数据库

**SQL**（Structured Query Language）是结构化查询语言，专门用来发访问和处理数据库的编程语言。能够让我们以编程的形式，操作数据库里面的数据。

SQL 能做到：

- 从数据库中查询数据

- 向数据库中插入新的数据

- 更新数据库中的数据

- 从数据库中删除数据

- 创建新数据库

- 在数据库中创建新表

- 在数据库中创建存储过程，视图

- etc...

::: tip 关键点

- SQL 是一门数据库编程语言

- 使用 SQL 语言编写出来的代码，叫做 SQL 语句

- SQL 语言只能在关系型数据库中使用（MySQL、Oracle、SQL Server）。非关系型数据库（Mongodb）不支持 SQL 语言

:::

### SELECT 语句

**SELECT** 语句用于从表中查询数据。执行的结果被存储在一个结果表中（结果集）：

```sql
-- 从 FROM 指定的【表中】，查询出【所有的】数据，* 表示【所有列】
SELECT * FROM 表名称;

-- 从 FROM 指定的【表中】，查询出指定列名称（字段）的数据
SELECT 列名称 FROM 表名称;
```

::: details 具体示例

我们希望从 users 表中选取所有的列，可以使用符号 \* 取代列的名称：

```sql
SELECT * from users
```

如获取名为 `username` 和 `password` 的列的内容（从名为 "users" 的数据库表），请使用下面的 SELECT 语句：

```sql
SELECT username, password FROM users;
```

:::

::: warning 注意

- 多个列和多个值之间，使用英文逗号进行分隔

- SQL 语句中的关键字对大小写不敏感，SELECT 等效于 select，FROM 等效于 from

:::

### INSERT INTO 语句

**INSERT INTO** 语句用于向数据表中插入新的数据行：

```sql
INSERT INTO 表名称 (列1, 列2, ...) VALUES (值1, 值2, ...);
```

::: details 具体示例

向 users 表中，插入一条 `username` 为 tony stark，`password` 为 098123 的用户数据：

```sql
INSERT INTO users (username, password) VALUES ('tony stark', '098123');
```

:::

### UPDATE 语句

**UPDATE** 语句用于修改表中的数据：

```sql
-- 1. 用 UPDATE 指定要更新哪个表中的数据
-- 2. 用 SET 指定列对应的新值
-- 3. 用 WHERE 语句指定更新的条件，不带 WHERE 语句，则更新表中所有的数据
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值;
```

::: details 具体示例

把 users 表中 `id` 为 4 的用户密码，更新为 888888：

```sql
UPDATE users SET password = '888888' WHERE id = 4;
```

把 users 表中 `id` 为 2 的用户密码和用户状态，分别更新为 admin123 和 1：

```sql
UPDATE users SET password = 'admin123', status = 1 WHERE id = 2;
```

:::

### DELETE 语句

**DELETE** 语句用于删除表中的行：

```sql
-- 从指定的表中，根据 WHERE 条件，删除对应的数据行
DELETE FROM 表名称 WHERE 列名称 = 某值;
```

::: details 具体示例

从 users 表中，删除 id 为 4 的用户：

```sql
DELETE FROM users WHERE id = 4;
```

:::

### WHERE 子句

**WHERE** 子句用于限定选择的标准。在 SELECT、UPDATE、DELETE 语句中，皆可使用 WHERE 子句来限定选择的标准：

```sql
-- 查询语句中的 WHERE 条件
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值;
-- 更新语句中的 WHERE 条件
UPDATE 表名称 SET 列名称 = 新值 WHERE 列 运算符 值;
-- 删除语句中的 WHERE 条件
DELETE FROM 表名称 WHERE 列 运算符 值;
```

下面的运算符可在 WHERE 子句中使用，用来限定选择的标准:

| 操作符  |     描述     |
| :-----: | :----------: |
|    =    |     等于     |
|   <>    |    不等于    |
|    >    |     大于     |
|    <    |     小于     |
|   >=    |   大于等于   |
|   <=    |   小于等于   |
| BETWEEN | 在某个范围内 |
|  LIKE   | 搜索某种模式 |

::: warning 注意

在某些版本的 SQL 中，操作符 `<>` 可以写为 `!=`

:::

::: details 具体示例

可以通过 WHERE 子句来限定 SELECT 的查询条件：

```sql
-- 查询 status 为 1 的所有用户
SELECT * FROM users WHERE status = 1;
-- 查询 id 大于 2 的所有用户
SELECT * FROM users WHERE id > 2;
-- 查询 username 不等于 admin 的所有用户
SELECT * FROM users WHERE username <> 'admin';
```

:::

### AND 和 OR 运算符

**AND** 和 **OR** 可在 WHERE 子语句中把两个或多个条件结合起来。

AND 表示必须同时满足多个条件，OR 表示只要满足任意一个条件即可。

::: details 具体示例

使用 AND 来显示所有 `status` 为 0，并且 `id` 小于 3 的用户：

```sql
SELECT * FROM users WHERE status = 0 AND id < 3;
```

使用 OR 来显示所有 `status` 为 1，或者 `username` 为 zs 的用户：

```sql
SELECT * FROM users WHERE status = 1 OR username = 'zs';
```

:::

### ORDER BY 子句

**ORDER BY** 语句用于根据指定的列对结果集进行排序，默认按照升序对记录进行排序。

如果希望按照降序对记录进行排序，可以使用 **DESC** 关键字。**ASC** 关键字代表升序排序。

也可以一次性先后进行多次排序。

::: details 具体示例

对 users 表中的数据，按照，`status` 字段进行升序排序：

```sql
-- 如下两条 SQL 语句是等价的
SELECT * FROM users ORDER BY status;
SELECT * FROM users ORDER BY status ASC;
```

对 users 表中的数据，按照，`id` 字段进行降序排序：

```sql
SELECT * FROM users ORDER BY id DESC;
```

对 users 表中的数据，先按照，`status` 字段进行降序排序，再按照 `username` 的字母顺序，进行升序排序：

```sql
SELECT * FROM users ORDER BY status DESC, username ASC;
```

:::

### COUNT(\*) 函数

**COUNT(\*)** 函数用于返回查询结果的总数据条数，语法格式如下：

```sql
SELECT COUNT(*) FROM 表名称;
```

::: details 具体示例

查询 users 表中 `status` 为 0 的总数据条数：

```sql
SELECT COUNT(*) FROM users WHERE status = 0;
```

:::

### AS 关键字

如果希望给查询出来的列名称设置别名，可以使用 **AS** 关键字。

::: details 具体示例

使用 AS 关键字给列起别名

```sql
SELECT COUNT(*) AS total FROM users WHERE status = 0;
SELECT username AS uname, password AS upwd FROM users;
```

:::

## mysql 模块

**在项目中操作数据库的步骤**：

① 安装操作 MySQL 数据库的第三方模块 mysql

② 通过 mysql 模块连接到 MySQL数据库

③ 通过 mysql 模块执行 SQL 语句

### 安装 mysql 模块

mysql 模块是托管于 npm 上的第三方模块。它提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。

想要在项目中使用它，需要先运行如下命令，将 mysql 安装为项目的依赖包：

```bash
npm install mysql2
```

### 配置 mysql 模块

在使用 mysql 模块操作 MySQL 数据库之前，必须先对 mysql 模块进行必要的配置，主要的配置步骤如下：

```javascript
import mysql from "mysql2";

// 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: "127.0.0.1", // 数据库的 IP 地址
  user: "root", // 登录数据库的账号
  password: 密码, // 登录数据库的密码
  database: "my_db_01", // 指定要操作哪个数据库
});
```

### 测试 mysql 模块能否正常工作

调用 `dp.query()` 函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果。

只要能打印出 `[ { '1': 1 } ]` 的结果，就证明数据库连接正常。

```javascript
// 检测 mysql 模块能否正常工作
db.query("SELECT 1", (err, result) => {
  if (err) return console.log(err.message);
  console.log(result);
});
```

### 查询数据

::: details 具体示例

查询 users 表中所有的数据：

```javascript
// 查询 users 表中所有的用户数据
db.query("SELECT * FROM users", (err, result) => {
  // 查询失败
  if (err) return console.log(err.message);
  // 查询成功
  console.log(result);
});
```

:::

::: warning 注意

如果执行的是 SELECT 查询语句，则执行的结果是数组

:::

### 插入数据

::: details 具体示例

向 users 表中新增数据，其中 `username` 为 Spider-Man，`password` 为 pcc321：

```javascript
// 要插入到 users 表中的数据对象
const user = { username: "Spider-Man", password: "pcc321" };
// 待执行的 SQL 语句，其中英文的 ? 表示占位符
const sqlStr = "INSERT INTO users (username, password) VALUES (?, ?)";
// 使用数组的形式，依次为 ? 占位符指定具体的值
db.query(sqlStr, [user.username, user.password], (err, result) => {
  if (err) return console.log(err.message);
  if (result.affectedRows === 1) {
    console.log("插入数据成功！");
  }
});
```

:::

::: tip 插入数据的便捷方式

向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速插入数据：

```javascript
const user = { username: "Spider-Man2", password: "pcc4321" };
const sqlStr = "INSERT INTO users SET ?";
db.query(sqlStr, user, (err, result) => {
  if (err) return console.log(err.message);
  if (result.affectedRows === 1) {
    console.log("插入数据成功！");
  }
});
```

:::

::: warning 注意

如果执行的是 INSERT 插入语句，则执行的结果是对象

:::

### 更新数据

::: details 具体示例

可以通过如下方式，更新表中的数据：

```javascript
// 要更新的数据对象
const user = { id: 7, username: "aaa", password: "000" };
// 待执行的 SQL 语句
const sqlStr = "UPDATE users SET username=?, password=? WHERE id=?";
// 调用 db.query() 执行 SQL 语句的同时，使用数组依次为占位符指定具体的值
db.query(sqlStr, [user.username, user.password, user.id], (err, result) => {
  if (err) return console.log(err.message);
  if (result.affectedRows === 1) {
    console.log("更新数据成功！");
  }
});
```

:::

::: tip 更新数据的便捷方式

更新表数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速更新表数据：

```javascript
const user = { id: 7, username: "aaaa", password: "0000" };
const sqlStr = "UPDATE users SET ? WHERE id=?";
db.query(sqlStr, [user, user.id], (err, result) => {
  if (err) return console.log(err.message);
  if (result.affectedRows === 1) {
    console.log("更新数据成功！");
  }
});
```

:::

::: warning 注意

如果执行的是 UPDATE 更新语句，则执行的结果是对象

:::

### 删除数据

::: details 具体示例

在删除数据时，推荐根据 `id` 这样的唯一表示，来删除对应的数据：

```javascript
// 要执行的 SQL 语句
const sqlStr = "DELETE FROM users WHERE id=?";
// 调用 db.query() 执行 SQL 语句的同时，为 ? 占位符指定具体的值
db.query(sqlStr, 7, (err, result) => {
  if (err) return console.log(err.message);
  if (result.affectedRows === 1) {
    console.log("删除数据成功！");
  }
});
```

:::

::: warning 注意

- 如果 SQL 语句中有多个占位符，则必须使用数组为每个占位符指定具体的值

- 如果 SQl 语句中只有一个占位符，则可以省略数组

:::

::: warning 注意

如果执行的是 DELETE 删除语句，则执行的结果是对象

:::

::: tip 标记删除

使用 DELETE 语句，会真正的把数据从表中删除掉。为了保险期间，推荐使用**标记删除**的形式，来模拟删除的动作。

所谓标记删除，就是在表中设置类似于 `status` 这样的状态字段，来标记当前这条数据是否被删除。

当用户执行了删除的动作时，我们并没有执行 DELETE 语句把数据删除掉，而是执行了 UPDATE 语句，将这条数据对应的 `status` 字段标记为删除即可。

```javascript
// 标记删除：使用 UPDATE 语句代替 DELETE 语句；只更新数据的状态，并没有真正删除
db.query("UPDATE users SET status=1 WHERE id=?", 6, (err, result) => {
  if (err) return console.log(err.message);
  if (result.affectedRows === 1) {
    console.log("删除数据成功！");
  }
});
```

:::

## 前后端的身份认证

### Web 开发模式

目前主流的 Web 开发模式有两种，分别是：

- 基于**服务端渲染**的传统 Web 开发模式：服务器发送给客户端的 HTML 页面，是在服务端通过字符串的拼接，动态生成的。因此，客户端不需要通过网络请求额外请求页面的数据：

```javascript
app.get("/index.html", (req, res) => {
  // 要渲染的数据
  const user = { name: "zs", age: 20 };
  // 服务器端通过字符串的拼接，动态生成 HTML 内容
  const html = `<h1?>姓名：${user.name}，年龄：${user.age}</h1>`;
  // 把生成好的页面内容响应给客户端，因此客户端拿到的是带有真实数据的 HTML 页面
  res.send(html);
});
```

优点：前端耗时少，有利于 SEO

缺点：占用服务器端资源，不利于前后端分离，开发效率低

比如企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的 SEO，则这是我们就需要使用服务器端渲染

- 基于**前后端分离**的新型 Web 开发模式：后端只负责提供 API 接口，前端调用接口的开发模式

优点：开发体验好，用户体验好，减轻了服务器端的渲染压力

缺点：不利于 SEO

类似后台管理项目，交互性比较强，不需要考虑 SEO，那么就可以使用前后端分离的开发模式

另外，具体使用何种开发模式并不是绝对的，为了同时兼顾了首页的渲染速度和前后端分离的开发效率，一些网站采用了首屏服务器端渲染 + 其他页面前后端分离的开发模式。

### 身份认证

**身份认证**（Authentication）又称 "身份验证"、"鉴权"，是指通过一定的手段，完成对用户身份的确认。

身份认证的目的，是为了确认当前所声称为某种身份的用户，确实是所声称的用户。

对于服务端渲染和前后端分离这两种开发模式来说，分别有着不同的身份认证方案：

- 服务端渲染推荐使用 **Session 认证机制**

- 前后端分离推荐使用 **JWT 认证机制**

### Session 认证机制

当前端请求后端接口不存在跨域问题的时候，推荐使用 Session 身份认证机制。

::: tip HTTP 协议的无状态性

HTTP 协议的无状态性，指的是客户端的每次 HTTP 请求都是独立的，连续多个请求之间没有直接的关系，服务器不会主动保留每次 HTTP 请求的状态。

:::

::: tip Cookie

Cookie 是存储在用户浏览器中的一段不超过 4 KB 的字符串。它由一个名称（Name）、一个值（Value）和其他几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成。

不同域名下的 Cookie 各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的 Cookie 一同发送到服务器。

Cookie 的几大特性：自动发送、域名独立、过期时限、4 KB 限制

客户端第一次请求服务器的时候，服务器通过响应头的形式，向客户端发送一个身份认证的 Cookie，客户端会自动将 Cookie 保存在浏览器这种

随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的 Cookie，通过请求头的形式发送给服务器，服务器即可验明客户端的身份。

由于 Cookie 是存储在浏览器中的，而且浏览器也提供了读写 Cookie 的 AOI，因此 Cookie 很容易被伪造，不具有安全性。因此不建议服务器将虫咬的隐私数据，通过 Cookie 的形式发送给浏览器

:::

**Session 的工作原理**：

![Session 的工作原理](/images/back-end/nodejs/session.png)

在 Express 项目中，只需要安装 express-session 中间件，即可在项目中使用 Session 认证：

```bash
npm install express-session
```

express-session 中间件安装超过后，需要通过 `app.use()` 来注册 session 中间件：

```javascript
import session from "express-session";

// 配置 Session 中间件
app.use(
  session({
    secret: "itheima", // secret 属性的只可以为任意字符串
    resave: false, // 固定写法
    saveUninitialized: true, // 固定写法
  }),
);
```

当 express-session 中间件配置成功后，即可通过 `req.session` 来访问和使用 session 对象，从而存储用户的关键信息：

```javascript
// 登录的 API 接口
app.post("/api/login", (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== "admin" || req.body.password != "000000") {
    return res.send({ status: 1, msg: "登录失败" });
  }
  req.session.user = req.body; // 将用户的信息，存储到 Session 中
  req.session.islogin = true; // 将用户的登录状态，存储到 Session 中
  res.send({ status: 0, msg: "登录成功" });
});
```

此时其他接口便可以直接从 `req.session` 对象上获取之前存储的数据：

```javascript
// 获取用户姓名的接口
app.get("/api/username", (req, res) => {
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: "fail" });
  }
  res.send({
    status: 0,
    msg: "success",
    username: req.session.user.username,
  });
});
```

调用 `req.session.destroy()` 函数，即可清空服务器保存的 session 信息：

```javascript
// 退出登录的接口
app.post("/api/logout", (req, res) => {
  // 清空当前客户端对应的 session 信息
  req.session.destroy();
  res.send({
    status: 0,
    msg: "退出登录成功",
  });
});
```

::: warning 注意

Session 认证机制需要配合 Cookie 才能实现。由于 Cookie 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置。才能实现跨域 Session 认证

:::

### JWT 认证机制

当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制。

**JWT**（JSON Web Token）是目前最流行的跨域认证解决方案。

**JWT 的工作原理**：

![JWT 的工作原理](/images/back-end/nodejs/jwt.png)

用户的信息通过 Token 字符串的形式，保存在客户端浏览器中。服务器通过还原 Token 字符串的形式来认证用户的身份。

JWT 通常由三部分组成，分别是 **Header**（头部）、**Payload**（有效荷载）、**Signature**（签名），三者之间使用英文的 "." 分隔：

```
Header.Payload.Signature
```

- **Payload**：真正的用户信息，是用户信息经过加密之后生成的字符串

- **Header** 和 **Signature**：安全性相关的部分，只是为了保证 Token 的安全性

当客户端收到服务器返回的 JWT 之后，通常会将它存储在 localStorage 或 sessionStorage 中。此后，客户端每次与服务器通信，都要带上这个 JWT 的字符串，从而进行身份认证。推荐的做法是把 JWT 放在 HTTP 请求头的 Authorization 字段中，格式如下：

```
Authorization: Bearer <token>
```

在 Express 中使用 JWT，需要安装如下两个 JWT 相关的包并导入：

```bash
npm install jsonwebtoken express-jwt
```

- **jsonwebtoken**：用于生成 JWT 字符串

- **express-jwt**：用于将 JWT 字符串解析还原成 JSON 对象

为了保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的 secret 密钥：

- 当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串

- 当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密

```javascript
// secret 密钥的本质：一个字符串
const secretKey = "itheima";
```

在登录成功后，调用 jsonwebtoken 包提供的 `sign()` 方法，将用户的信息加密成 JWT 字符串，响应给客户端：

```javascript
import jwt from "jsonwebtoken";

// 登录接口
app.post("/api/login", (req, res) => {
  // ...
  // 用户登录成功之后，生成 JWT 字符串，通过 token 属性响应给客户端
  const userinfo = req.body;
  res.send({
    status: 200,
    msg: "登录成功",
    // 调用 jwt.sign() 生成 JWT 字符串，三个参数分别是：用户信息对象、加密密钥、配置对象
    token: jwt.sign({ username: userinfo.username }, secretKey, {
      expiresIn: "30s",
    }),
  });
});
```

- **参数 1**：用户的信息对象

- **参数 2**：加密的密钥

- **参数 3**：配置对象，可以配置当前 token 的有效期

客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的 Authorization 字段，将 Token 字符串发送到服务器进行身份认证。此时服务器可以通过 express-jwt 这个中间件，自动将客户端发送过来的 Token 解析还原成 JSON 对象：

```javascript
import { expressjwt } from "express-jwt";

app.use(
  expressJWT({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  }),
);
```

- **expressJwt()**：用来解析 Token 的中间件

- **unless()**：用来指定哪些接口不需要访问权限

当 express-jwt 这个中间件配置成功之后，即可在那些有权限的接口中，使用 `req.auth` 对象，来访问从 JWT 字符串中解析出来的用户信息了：

```javascript
// 一个有权限的 API 接口
app.get("/admin/getinfo", (req, res) => {
  res.send({
    status: 200,
    msg: "获取用户信息成功",
    data: req.auth,
  });
});
```

::: warning 注意

不要把密码加密到 token 字符串中

:::

当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串过期或不合法，会产生一个解析失败的错误，影响项目的正常运行。我们可以通过 Express 的错误中间件，捕获这个错误并进行相关的处理：

```javascript
app.use((err, req, res, next) => {
  // token 解析失败导致的错误
  if (err.name === "UnauthorizedError") {
    return res.send({ status: 401, msg: "无效的 token" });
  }
  // 其他原因导致的错误
  res.send({ status: 500, msg: "未知错误" });
});
```
