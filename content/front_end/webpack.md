# webpack

::: details 目录

[[toc]]

:::

## 什么是 webpack

webpack 是一个模块打包器（构建工具）。它的主要目标是将 JavaScript 文件打包在一起，缩减文件大小，打包后的文件用于在浏览器中使用，但它也能够胜任转换、打包或包裹任何资源。

## webpack 原理和概念

树结构：在一个入口文件中引入所有资源，形成所有依赖关系树状图

模块：对于 webpack 来说，所有的资源（css,img...）都算作模块

chunk：打包过程中被操作的模块文件叫做 chunk ，例如异步加载一个模块就是一个 chunk

bundel：bundle是最后打包后的文件，最终文件可以和 chunk 长得一模一样，但是大部分情况下他是多个 chunk 的集合。

## 安装 webpack

**使用 npm :**

```
npm i webpack webpack-cli --save-dev
```

## 使用 webpack 打包

**使用默认设置打包**

```
npx webpack
```

**以开发模式打包**

```
npx webpack --mode development
```

**以生产模式打包**

```
npx webpack --mode production
```

只有和入口产生直接/间接的引入关系，才会被打包。

## `webpack.config.js` 配置文件

`webpack.config.js`(或`webpack.config.cjs`)创建在项目根目录下，用于进行 webpack 打包的基础配置

```JavaScript
const { resolve } = require('path')

module.exports = {
    mode: 'production', //指示 webpack 以何种方式进行打包。生产模式 production ，开发模式 development
    entry: './src/index.js', //指示 webpack 以那个文件作为入口起点开始打包
    output: {
        filename: "build.js",
        path: resolve(__dirname, 'build')
    },//指示 webpack 打包后的资源输出到哪里，以及如何命名
    module: {
        rules: [

        ]
    },//让 webpack 能够去处理非 JavaScript 资源，如 css、img 等
    plugins: [

    ],
}
```

## 多入口和多出口的情况配置

当含有多个入口文件时，将入口文件作为字符数组传入 entry，此时所有的入口文件形成一个 chunk ，名称是默认的，输出也是只有一个 bundle

```JavaScript
entry: ["./src/index.js", "./src/children2.js"],
```

也可以采用对象的格式，此时有几个入口文件就会生成几个 chunk ，并输出几个 bundle ，chunk 的名称是 key

```JavaScript
entry: {
    one: './src/index.js',
    two: './src/children2.js'
},
```

也可以对象和数组混合:

```JavaScript
entry: {
    one: ['./src/index.js','./src/children2.js'],
},
```

## 打包 html 资源

使用插件对 html 文件进行处理(html-webpack-plugin)

**1、下载安装插件**

```
npm i html-webpack-plugin -D
```

**2、引入插件**

```JavaScript
const htmlWebpackPlugin = require('html-webpack-plugin')
```

**3、使用插件**

```JavaScript
plugins: [
  new htmlWebpackPlugin({
    template: './src/index.html',//作为模板的 html 的文件地址
    filename: 'demo.html',//打包后生成的 html 文件名称
    minify: {
      collapseWhitespace: true,//打包时移除空格
      removeComments: true,//打包时删除注释
    }
  })//默认会创建一个空的，目的就是自动引入打包的资源(js/css)
],
```

html-webpack-plugin插件生成的内存中的页面已帮我们创建并正确引用了打包编译生成的资源(js/css)

打包多个 html 的规律是需要有多个 entry ，每个 html 一个 entry ，同时需要新建多个 htmlWebpackPlugin

```JavaScript
entry: {
  vendor:['./src/js/jquery.js'.'./src/js/common.js'],
  index:"./src/js/index.js",
  cart:"./src/js/cart.js"
},
plugins:[
  new htmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    chunks:['index','vendor']//手动指定打包后该页面要使用的 js 文件
  }),
  new htmlWebpackPlugin({
    template: './src/cart.html',
    filename: 'cart.html',
    chunks:['cart','vendor']
  })
]
```

## 打包 css 资源

### 打包 css 资源

需要使用 npm 下载安装两个 loader 帮我们完成打包

```
npm i css-loader style-loader -D
```

`css-loader` : 处理 css 中的 @import 和 url 这样的外部资源

`style-loader` : 把样式插入到 DOM 中，方法是在 head 中插入一个 style 标签，并把样式写入到这个标签的 innerHTML 里

进行以下配置：

::: code-group

```JavaScript [webpack.config.cjs]
//...
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],//执行顺序从右到左
    }
  ]
},//让 webpack 能够去处理非 JavaScript 资源，如 css、img 等
//...
```

```JavaScript [index.js]
import './index.css'

console.log(demo)
```

:::

::: warning 警告
打包前无法看到 css 样式生效
:::

### 打包 less 或 sass 资源

Less 需要使用 npm 下载 less 包和 less-loader

```
npm i less less-loader -D
```

Sass 需要使用 npm 下载 sass 包和 sass-loader

```
npm i sass sass-loader -D
```

使用方法与 css 类似

::: code-group

```JavaScript [webpack.config.cjs]
//...
module: {
  rules: [
    { test: /\.css$/, use: ['style-loader', 'css-loader'] },//css
    { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },//less
    { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },//sass
  ]
},
//...
```

```JavaScript [index.js]
import './index.css'
import './index.less'
import './index.scss'

console.log(demo)
```

:::

### 提取 css 为单独文件

css 内容是打包在 js 文件中的，可以使用`mini-css-extract-plugin`插件提取成单独的 css 文件

```
npm i mini-css-extract-plugin -D
```

在 webpack 配置文件中引入并配置(此时需更改 module 中的配置)：

```JavaScript
const miniCssExtractPlugin = require('mini-css-extract-plugin')
//...

//...
module: {
  rules: [
    { test: /\.css$/, use: [miniCssExtractPlugin.loader, 'css-loader'] },
    { test: /\.less$/, use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
    { test: /\.scss$/, use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
  ]
},
plugins: [
  //...
  new miniCssExtractPlugin({
    filename: 'index.css'//打包后的 css 文件名称
  })
],
```

### 处理 css 的兼容性

需要使用 postcss 处理，下载两个包:`post-loader`和`postcss-preset-env`

```
npm i postcss-loader postcss-preset-env -D
```

在`package.json`文件中进行以下配置

```JavaScript
//...
"browserslist": [
  "> 0.2%",
  "last 2 versions",
  "not dead"
]
```

并需要在根目录下创建`postcss.config.js`(或`postcss.config.cjs`)文件进行配置

```JavaScript
module.exports = {
  plugins: [
    require('postcss-preset-env')
  ]
}
```

最后在 webpack 配置文件中进行配置

```JavaScript
//...
module: {
  rules: [
    { test: /\.css$/, use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
    { test: /\.less$/, use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'] },
    { test: /\.scss$/, use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'] },
  ]
},
//...
```

### 压缩 css 内容

使用 css-minimizer-webpack-plugin 插件压缩 css 内容

```
npm i css-minimizer-webpack-plugin -D
```

在 webpack 配置文件中引入并添加插件:

```JavaScript
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
//...

//...
plugins: [
  //...
  new cssMinimizerWebpackPlugin()
],
```

## 打包图片资源

### 打包 css 中使用的图片?

需下载 url-loader 和 file-loader 两个包

```
npm i url-loader file-loader -D
```

并在 webpack 配置文件中进行设置

```JavaScript
module: {
  rules: [
    //...
    {
      test: /\.(png|jpg|jpeg|gif)$/,//设置打包的图片格式
      loader: 'url-loader',
      options: {
        publicPath: './images/',
        outputPath: 'images/',//设置打包后的图片的存放目录
        limit: 1024 * 8,//用于限制图片大小
        name: '[name][hash:10].[ext]'//设置打包后的图片的名字
      }
    }
  ]
},
```

### 打包 html 中使用的图片?

需下载 html-loader

```
npm install html-loader -D
```

并在 webpack 配置文件中进行设置

```JavaScript
module: {
  rules: [
    {
      test: /\.html$/,
      loader: 'html-loader',
    }
  ]
},
```

## 打包其它资源字体图标

不需要优化和压缩处理，直接输出的资源，称为其它资源。

```JavaScript
module: {
  rules: [
    {
      exclude: /\.(js|json|html|css|less|scss|png|gif|jpg|jpeg)$/,//排除不需要使用此方式打包的资源
      loader: 'file-loader',
      options: {
        outputPath: 'font/',
        publicPath: './font',
        name: '[name][hash:8].[ext]'
      }
    }
  ]
},
```

## 去除项目里的死代码

### 去除没有用到的 js 代码

webpack 通过 tree-shaking 去掉了实际上并没有使用的 js 代码来减少包的大小

webpack 本身就支持，不需要另外配置

条件：必须使用 es6 模块化；开启 production 环境

### 去除没有用到的 css

webpack 使用 purgecss-webpack-plugin 去除无用的 css

```
npm i purgecss-webpack-plugin -D
```

在 webpack 配置文件中进行以下配置：

```JavaScript
const { resolve, join } = require('path')
const { glob } = require('glob')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const PATHS = { src: join(__dirname, 'src') }
//...

//...
plugins: [
  new PurgeCSSPlugin({
    paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
  })
],
```

## 更多信息

更多信息请点击[此处](https://webpack.docschina.org/)
