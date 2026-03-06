# Vue

::: details 目录

[[toc]]

:::

## 什么是 Vue

**Vue** 是一套用于构建用户界面的渐进式框架。

**响应式的数据绑定**: 当数据发生改变，视图可以自动更新，可以不用关心 dom 操作，而专心数据操作

**可组合的视图组件**: 把视图按照功能切分成若干基本单元，组件可以一级一级组合整个应用形成倒置组件树，可维护，可重用，可测试

**vue-cli** 是 Vue 官方提供的脚手架工具，默认已经帮我们搭建好了一套利用 Webpack 管理 Vue 的项目结构

**create vue** 启动 Vite 驱动的 Vue 项目的推荐方法

## 引入 Vue

### CDN 方式引入

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

### 使用 create vue 搭建开发环境

```
npm create vue@latest
```

`node_modules` 第三方库储存目录

`src` 源码文件储存目录

`src/assets` 静态资源(图片，css等)储存目录

`src/components` 页面内小组件储存目录

`src/router` 路由

`src/store` 状态管理

`src/views` 页面大组件储存目录

`dist` 打包后的目录

## 使用 Vue

### CDN 使用案例

```html
<body>
  <div id="app">{{message}}</div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const app = Vue.createApp({
      data() {
        return {
          message: "this is a test",
        };
      },
    }).mount("#app");
  </script>
</body>
```

### 开发环境使用案例

::: code-group

```vue[App.vue]
<template>
    <div>
    {{ msg }}
    </div>
</template>

<script>
    export default {
        name:"App",
        data(){
            return{
                msg:'hello'
            }
        }
    }
</script>

<style scoped>

</style>
```

```JavaScript [main.js]
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

```html [index.html]
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>

  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

:::

## vue 模板基础语法

### 插值操作

**插值：**

```vue
<div>{{msg}}</div>
```

**指令：**

```vue
<p v-text="msg"></p>
```

| 简单指令 |           示例            |          示例描述          |
| :------: | :-----------------------: | :------------------------: |
|  v-pre   | `<h2 v-pre>{{msg}}</h2>`  |       不解析插值变量       |
|  v-once  | `<h2 v-once>{{msg}}</h2>` |    只读取插值变量初始值    |
|  v-text  | `<h2 v-text="msg"></h2>`  |    读取变量并写入元素内    |
|  v-html  | `<h2 v-html="msg"></h2>`  | 允许读取含 html 标签的变量 |

在进行数据绑定时，支持 js 单个表达式

### `v-bind` 绑定属性

```vue
<h2 v-bind:title="msg"></h2>
<h2 :title="msg"></h2>
```

使用 `v-bind:` 或 `:` 可使属性值与变量动态绑定

也可使样式与变量绑定：

```vue
<template>
  <div :style="[fontSize, backgroundColor]">123</div>
</template>

<script>
export default {
  data() {
    return {
      fontSize: "font-size:100px",
      backgroundColor: "background-color:red",
    };
  },
};
</script>
```

也可使类与属性绑定：

```vue
<template>
  <div :class="[one, two]">112233</div>
  <div :class="actives">112233</div>
  <div :class="{ one: isone, two: istwo }">112233</div>
  <div :class="{ isone, istwo }">112233</div>
  <div :class="getStyleArr()">112233</div>
  <div :class="getStyleObj()">112233</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      one: "one",
      two: "two",
      actives: ["one", "two"],
      isone: true,
      istwo: true,
    };
  },
  methods: {
    getStyleArr() {
      return [this.one, this.two];
    },
    getStyleObj() {
      return { one: this.isone, two: this.istwo };
    },
  },
};
</script>

<style scoped>
.one {
  font-size: 100px;
}
.two {
  background-color: pink;
}
.isone {
  font-size: 50px;
}
.istwo {
  background-color: blue;
}
</style>
```

### 计算属性

计算属性关键词： `computed`

使用方法同变量相同，用于组合变量，只有用于组合的变量变化时才会重新执行其中内容

```vue
<script>
export default {
  name: "App",
  data() {
    return {
      name: "123",
      slogen: "666",
    };
  },
  computed: {
    title: {
      set(values) {
        let arr = values.split(" - ");
        this.name = arr[0];
        this.slogen = arr[1];
      },
      get() {
        return this.name + "-" + this.slogen;
      },
    },
  },
};
</script>
```

`set()`: 用于主动修改计算属性中的值

`get()`: 返回计算属性的值

### 事件监听

绑定事件监听器指令：`v-on`

缩写：`@`

```vue
<template>
  <div>
    <button v-on:click="num--">-</button>
    <input type="text" size="2" v-model="num" />
    <button @click="num++">+</button>
    <br />
    <button v-on:click="sub()">-</button>
    <input type="text" size="2" v-model="num" />
    <button @click="add">+</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    sub() {
      this.num--;
    },
    add() {
      this.num++;
    },
  },
};
</script>
```

`$event` : 事件对象，用在方法的参数传递中

**`v-on` 事件修饰符号**

| 修饰符号 |                      示例                       |                 示例描述                 |
| :------: | :---------------------------------------------: | :--------------------------------------: |
|  .stop   |  `<button @click.stop = "button()"></button>`   |     阻止事件冒泡，即不触发父元素事件     |
|  .self   |  `<button @click.self = "button()"></button>`   |    当事件在该元素本身触发时才触发事件    |
| .capture | `<button @click.capture = "button()"></button>` | 使用事件捕获模式，即将该事件的优先级提前 |
| .prevent |   `<a href="url" @click.prevent = "a()"></a>`   |               阻止默认事件               |
|  .once   |  `<button @click.once = "button()"></button>`   |              事件只触发一次              |

::: tip 提示
事件修饰符号可叠加使用`<button @click.self.stop = "button()"></button>`
:::

### 条件判断

`v-if` : 是“真正”的条件渲染，切换过程中条件块内的事件监听器和子组件会被适当地销毁和重建

`v-show` : 基于 CSS 进行切换

```vue
<template>
  <button @click="isshow = !isshow">切换</button>
  <div v-if="isshow">
    {{ msg }}
  </div>
  <div v-show="isshow">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "message",
      isshow: true,
    };
  },
};
</script>
```

`v-else` : 在 `v-if` 不渲染的条件下渲染，不需要传参

```vue
<template>
  <button @click="isshow = !isshow">切换</button>
  <div v-if="isshow">
    {{ msg }}
  </div>
  <div v-else>
    {{ msg2 }}
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "message",
      msg2: "message2",
      isshow: true,
    };
  },
};
</script>
```

`v-else-if` : 在 `v-if` 不渲染的条件下进行条件渲染，需要传参

```vue
<div v-if="">
    {{ msg }}
</div>
<div v-else-if="">
    {{ msg2 }}
</div>
```

### 循环遍历

遍历指令：`v-for`

**遍历数组:**

```vue
<li v-for="(item, index) in list">{{index}} - {{ item }}</li>
```

`item` : 数组的各个子项

`index` : 索引

`list` : 需要遍历的数组

**遍历对象:**

```vue
<li v-for="(value, key, index) in obj">{{index}}:{{key}} - {{ item }}</li>
```

`value` : 对象的各个属性值

`key` : 对象的各个属性名

`index` : 索引

`obj` : 需要遍历的对象

**数组内遍历对象:**

```vue
<template>
  <ul>
    <li v-for="(item, index) in books">
      {{ index + 1 }}-{{ item.name }}:{{ item.price }}
    </li>
  </ul>
  <template>
    <script>
      export default {
        name: "App",
        data() {
          return {
            books: [
              { id: 1, name: "11", price: 111 },
              { id: 2, name: "22", price: 222 },
              { id: 3, name: "33", price: 333 },
              { id: 4, name: "44", price: 444 },
              { id: 5, name: "55", price: 555 },
            ],
          };
        },
      };
    </script></template
  >
</template>
```

`:key` 唯一标识: 用于标识组件的唯一性，高效更新虚拟DOM

### 其它语法

`v-model` : 负责监听用户的输入事件，从而更新数据，并对一些极端场景进行一些特殊处理。同时，`v-model`会忽略所有表单元素的`value`、`checked`、`selected`特性的初始值，总是将 vue 实例中的数据作为数据来源。当输入事件发生时，实时更新 vue 实例中的数据。

```vue
<input type="text" v-model="msg" />
```

**`v-model`的修饰符**:

`.lazy` : 懒加载

`.number` : 转换为 number 类型

`.trim` : 自动过滤空格

修饰符可叠加使用

## Vue 组件化开发

**组件的分类:** 页面级组件、业务上可复用的基础组件、与业务无关的独立功能组件

**组件开发三要素:**

`prop` : 用于定义组件的属性

`自定义事件` : 用于触发组件的事件

`slot` : 用于组件功能的扩展

**组件设计需要考虑的问题** : 可扩展性强；组件中方法函数的抽离，便于复用，使用程度高；文档清除详细；颗粒度合适，适度抽象；功能尽可能单一，代码行数适中。

### 创建一个 Vue 组件

在项目的`src/components`文件夹下创建 vue 文件：

```vue
<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "HelloWorld",
    };
  },
};
</script>

<style scoped></style>
```

### 使用 vue 组件

先导入 vue 组件，再注册组件，最后使用组件：

```vue
<template>
  <div>
    <input type="text" v-model="msg" />
    <br />
    {{ msg }}
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  data() {
    return {
      msg: "msg",
    };
  },
  components: {
    HelloWorld,
  },
};
</script>

<style scoped></style>
```

::: tip 提示

父组件中定义的样式可在子类中使用。若不想在子组件内生效，则需在 `style` 后加上关键词 `scoped`

若想使用 scss 语法，则需加上 `lang="scss"`

:::

### 组件间通信

**数据父传子**

`props` : 用于父传子通信。在子组件中添加 `props` 属性并设置形参，并在父组件中为使用的子组件的对应形参传值。

::: code-group

```vue [App.vue]
<template>
  <div>
    <HelloWorld :msg="app_msg" :ary="app_ary"></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  data() {
    return {
      app_msg: "this is app msg",
      app_ary: ["11", "22", "33"],
    };
  },
  components: {
    HelloWorld,
  },
};
</script>

<style scoped></style>
```

```vue [HelloWorld.vue]
<template>
  <div>
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="item in ary">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["msg", "ary"],
  data() {
    return {};
  },
};
</script>

<style scoped></style>
```

:::

`props` 也可使用对象的方式书写：

```vue
props:{ msg:{ type:String, default:'########', required:true }, ary:{
type:Array, default:['aa','bb','cc'] } },
```

`type` : 数据类型

`default` : 默认值

`required` : 是否必需

**数据子传父**

`$emit` : 子组件通过触发事件的方式传递数据给父组件，调用 `$emit` 并设定事件名称与传递数据，在父组件中接收事件并触发父组件事件

::: code-group

```vue [App.vue]
<template>
  <div>
    <div>{{ count }}</div>
    <HelloWorld @myChangeEvent="myAppEvent"></HelloWorld>
    <HelloWorld @myChangeEvent="myAppEvent"></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  data() {
    return {
      count: 0,
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    myAppEvent(data) {
      this.count += data;
    },
  },
};
</script>

<style scoped></style>
```

```vue [HelloWorld.vue] {16}
<template>
  <div>
    <button @click="change(1)">+1</button>
    <button @click="change(2)">+2</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  methods: {
    change(num) {
      this.$emit("myChangeEvent", num);
    },
  },
};
</script>

<style scoped></style>
```

:::

**子组件调用父组件的方法**

`$parent` : 用于访问上一级父组件

`$root` : 用于访问根组件

::: code-group

```vue [App.vue]
<template>
  <div>
    <div>{{ count }}</div>
    <HelloWorld @addEvent="addAppNum"></HelloWorld>
    <HelloWorld @addEvent="addAppNum"></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  data() {
    return {
      count: 0,
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    addAppNum(data) {
      this.count += data;
      console.log("addAppNum");
    },
    setAppNum(num) {
      this.count = num;
      console.log("setAppNum");
    },
  },
};
</script>

<style scoped></style>
```

```vue [HelloWorld.vue] {17}
<template>
  <div>
    <button @click="add(1)">+1</button>
    <button @click="add(2)">+2</button>
    <button @click="set(0)">0</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  methods: {
    add(num) {
      this.$emit("addEvent", num);
    },
    set(num) {
      this.$parent.setAppNum(num);
    },
  },
};
</script>

<style scoped></style>
```

:::

**父组件调用子组件的方法**

`$refs` 用于访问所有子组件，用 `ref` 设置子组件别名

::: code-group

```vue [App.vue] {5,6,24,27}
<template>
  <div>
    <button @click="addOne(1)">One+1</button>
    <button @click="setOne(0)">One=0</button>
    <HelloWorld ref="one"></HelloWorld>
    <HelloWorld ref="two"></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  data() {
    return {
      count: 0,
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    addOne(num) {
      this.$refs.one.addHelloWorld(num);
    },
    setOne(num) {
      this.$refs.one.setHelloWorld(num);
    },
  },
};
</script>

<style scoped></style>
```

```vue [HelloWorld.vue]
<template>
  <div>HelloWorldCount: {{ count }}</div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    addHelloWorld(num) {
      this.count += num;
      console.log("addHelloWorldNum");
    },
    setHelloWorld(num) {
      this.count = num;
      console.log("setHelloWorldNum");
    },
  },
};
</script>

<style scoped></style>
```

:::

### 插槽 slot

插槽可以实现组件的扩展性，抽取共性，保留不同

在子组件中需要插入的位置添加 `slot` 标签并设置插槽名称，在父组件中使用 `templat` 标签并在 `v-slot` 属性中设置需要插入的插槽。`slot` 标签内部的值为默认值。

::: code-group

```vue [App.vue] {5,8}
<template>
  <div>
    <HelloWorld></HelloWorld>
    <HelloWorld>
      <template v-slot:one><a href="">aaaa</a></template>
    </HelloWorld>
    <HelloWorld>
      <template v-slot:two><button>bbbb</button></template>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    HelloWorld,
  },
};
</script>

<style scoped></style>
```

```vue [HelloWorld.vue] {5,10}
<template>
  <div>
    <span>
      Hello-
      <slot name="one">####</slot>
      -World
    </span>
    <span>
      World-
      <slot name="two">####</slot>
      -Hello
    </span>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
};
</script>

<style scoped></style>
```

:::

插槽中可正常使用父组件中的属性。

**插槽中使用子组件中的属性**

先在插槽中定义属性代表的数据，再在父组件中设置子组件名称，用 js 语法访问数据。

::: code-group

```vue [App.vue] {3-11}
<template>
  <div>
    <HelloWorld>
      <template v-slot:default="children">{{ children.children }}</template>
    </HelloWorld>
    <HelloWorld>
      <template v-slot:one="children">{{ children.children }}</template>
    </HelloWorld>
    <HelloWorld>
      <template v-slot:two="children">{{ children.children }}</template>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    HelloWorld,
  },
};
</script>

<style scoped></style>
```

```vue [HelloWorld.vue] {3-5}
<template>
  <div>
    <span>Hello-<slot :children="childrenData">####</slot>-World</span>
    <span
      >Hello-<slot name="one" :children="childrenData">####</slot>-World</span
    >
    <span
      >Hello-<slot name="two" :children="childrenData">####</slot>-World</span
    >
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      childrenData: "childrenData",
    };
  },
};
</script>

<style scoped></style>
```

:::

### 生命周期函数

生命周期函数指在组件创建、更新与销毁过程中自动调用的一些函数。具体见[此处](https://cn.vuejs.org/guide/essentials/lifecycle.html)。

```vue
<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  beforeCreate() {
    console.log("创建实例之前自动调用 beforeCreate");
  },
};
</script>
```

`this.$nextTick(()=>{})` : 用于将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。

`keep-alive`标签 : 缓存其中被销毁的元素

### 组件内网络请求

使用 axios 进行网络请求：

```vue
<script>
import axios from "axios";
export default {
  name: "Axios",
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    axios
      .get(url)
      .then((res) => {
        this.data = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
```

**封装网络请求**

新建 js 文件并在其中写入网络请求的逻辑

```JavaScript
import axios from "axios";

const instance = axios.create({
    baseURL: 'baseurl'
})

export function get(url, params) {
    return instance.get(url, {
        params
    })
}

export function post(url, params) {
    return instance.post(url, params, {

    })
}

export function del(url) {
    return instance.delete(url)
}
```

**使用封装的网络请求**

在组件中导入封装的网络请求文件并使用

```vue
<script>
import { get } from "@/network/request";
export default {
  name: "Axios",
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    get(url)
      .then((res) => {
        this.data = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
```

## VueRouter 路由应用

Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。

`create-vue` 脚手架工具中自带安装 VueRouter 的选项，也可以执行以下命令手动安装：

```
npm install vue-router@4
```

`src/components` 小组件

`src/views` 页面级别组件

`src/router` 路由配置文件

### 创建路由

1、在`src/router`的 `index.js`文件中导入创建路由的方法`createRouter()`和`createWebHistory()`

2、配置路由设置

3、配置路由表

4、导出路由

5、在主入口文件中使用路由

::: code-group

```JavaScript [index.js]
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
```

```JavaScript [main.js]
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
```

:::

`path` : 路径

`name` : 名称

`component` : 对应的组件(使用前需导入)

也可使用懒加载方式加载组件，此种方法无需提前导入

```JavaScript
{
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
},
```

### 路由跳转

使用自带的`RouterLink`标签进行跳转，跳转后的组件在`RouterView`标签中显示。

```vue
<template>
  <div class="wrapper">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </div>
  <RouterView />
</template>
```

**自定义 RouterLink**

使用全局属性 `$router` 进行主动页面跳转

```vue
<button @click="$router.push(url)"></button>
<button @click="$router.go(num)"></button>
```

`url` : 想要跳转的地址

`num` : 正数为前进一定页面，负数为后退一定页面

::: tip 提示
`$router`表示一整个路由，`$route`表示当前页面路由
:::

### 路由页面视图

`RouterView` 标签用于在指定部分显示路由，使用方法类似`slot`插槽

### 嵌套路由

在`index.js`中配置 children 属性即可设置嵌套路由。嵌套路由的地址为父地址与子地址组合

```vue
{ path: '/home', name: 'home', component: HomeView, children: [ { path: 'home1',
component: () => import('../views/Home1.vue') }, { path: 'home2', component: ()
=> import('../views/Home2.vue') } ] },
```

`path` : 子路由地址，设置为 ' ' 时表示默认路由

### 路由传参

传递参数主要有两种类型：params 和 query

**params**

1、设置参数: 在`index.js`中配置传递参数的名字

```JavaScript {2}
{
    path: 'home1/:num',
    component: () => import('../views/Home1.vue')
},
```

此处 num 就是参数的名字

2、传递参数: 在路由跳转的时候对应位置写入要传递的值

```vue
<RouterLink to="/home/home1/1">Home1</RouterLink>
```

3、参数接收: 使用`$route`中的 params 属性获取传递的参数

```vue
<div>num: {{ $route.params.num }}</div>
```

**query**

1、传递参数: 在路由跳转的时候写入参数名与参数值，可以使用对象的格式

```vue
<RouterLink to="/home/home1?msg=message111&num=111">Home1</RouterLink>
<RouterLink
  :to="{ path: '/home/home2', query: { msg: 'message222', num: 222 } }"
>Home2</RouterLink>
```

2、参数接收: 使用`$route`中的 query 属性获取传递的参数

```vue
<h1>This is a home1 page</h1>
{{ $route.query.msg }}+{{ $route.query.num }}
```

使用自定义事件跳转路由时参数传递方法同上

### 重定向和别名

**重定向** : 在 routes 配置中完成，要重定向 /a 到 /b

```vue {4}
{ path: '/home', name: 'home', redirect: '/about', component: HomeView, }
```

```vue {4}
{ path: '/home', name: 'home', redirect: {name:'About'}, component: HomeView, }
```

```vue {4}
{ path: '/home', name: 'home', redirect: to => { return { path: 'About'
},query:{msg:'message',num:to.params.id} }, component: HomeView, }
```

以上写法均可

**别名** : 当用户访问别名网址时，匹配原地址

```vue {4}
{ path: '/home', name: 'home', alias: '/h', component: HomeView, }
```

```vue {4}
{ path: '/home', name: 'home', alias: ['/a','/b','/c'], component: HomeView, }
```

### 导航守卫

导航首位主要用来通过跳转或取消的方式守卫导航。

**全局前置导航守卫** : 在`index.js`中的路由外层添加

```JavaScript
router.beforeEach((to, from) => {
  return false
})

```

此时阻止任何跳转

```JavaScript
router.beforeEach((to, from) => {
  return true
})

```

此时允许跳转

`to` : 即将要进入的目标路由对象

`from` : 当前导航正要离开的路由

利用导航守卫打印地址:

```JavaScript
router.beforeEach((to, from) => {
  console.log(from.fullPath);
  console.log(to.fullPath);
})
```

利用导航守卫设置页面标题:

```JavaScript [index.js] {5-7}
//...
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'HomeView'
      },
    },
//...
router.beforeEach((to, from) => {
  document.title = to.meta.title
})
//...
```

**全局后置导航守卫**

```JavaScript
router.afterEach((to, from, failure) => {
  //...
})
```

`failure` : 导航是否失败

**路由独享导航守卫**

```JavaScript {5}
{
    path: '/home',
    name: 'home',
    component: HomeView,
    beforeEnter:(to,from)=>{}
}
```

**组件内导航守卫**

```vue
beforeRouteEnter(to, from) { // 在渲染该组件的对应路由被验证前调用 //
不能获取组件实例 `this` ！ // 因为当守卫执行时，组件实例还没被创建！ },
beforeRouteUpdate(to, from) { // 在当前路由改变，但是该组件被复用时调用 //
举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2`
之间跳转的时候， // 由于会渲染同样的 `UserDetails`
组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。 //
因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this` },
beforeRouteLeave(to, from) { // 在导航离开渲染该组件的对应路由时调用 // 与
`beforeRouteUpdate` 一样，它可以访问组件实例 `this` },
```

### `KeepAlive`和 VueRouter结合使用

`KeepAlive`和 VueRouter结合使用可以时页面跳转时保留原页面的数据

```vue
<RouterView v-slot="{ Component }">
    <transition>
        <KeepAlive>
            <component :is="Component"></component>
        </KeepAlive>
    </transition>
</RouterView>
```

```vue
<RouterView v-slot="{ Component }">
    <transition>
        <KeepAlive exclude="About">
            <component :is="Component"></component>
        </KeepAlive>
    </transition>
</RouterView>
```

```vue
<RouterView v-slot="{ Component }">
    <transition>
        <KeepAlive include="About">
            <component :is="Component"></component>
        </KeepAlive>
    </transition>
</RouterView>
```

`exclude` : 设置不缓存的组件

`include` : 设置缓存的组件

**与组件内导航守卫结合使用实现保留页面访问地址:**

::: code-group

```vue [App.vue]
<template>
  //...
  <RouterView v-slot="{ Component }">
    <transition>
      <KeepAlive>
        <component :is="Component"></component>
      </KeepAlive>
    </transition>
  </RouterView>
</template>
```

```vue [HomeView.vue] {19,22-27}
<template>
  <h1>This is a home page</h1>
  <RouterLink to="/home/home1?msg=message111&num=111">Home1</RouterLink>
  <RouterLink
    :to="{ path: '/home/home2', query: { msg: 'message222', num: 222 } }"
    >Home2</RouterLink
  >
  <RouterView v-slot="{ Component }">
    <transition>
      <KeepAlive
        >h
        <component :is="Component"></component>
      </KeepAlive>
    </transition>
  </RouterView>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      path: "/home",
    };
  },
  activated() {
    this.$router.push(this.path);
  },
  beforeRouteLeave(to, from) {
    this.path = from.fullPath;
  },
};
</script>
```

s
:::

## Pinia 状态管理

Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。

### 安装 Pinia 状态管理

`create-vue`中自带安装 Pinia 的选项，但你也可以手动执行以下命令安装：

```
npm install pinia
```

### 开始使用 Pinia

1、**创建 pinia 实例** (根 store) 并将其传递给应用。在`main.js`中配置以下代码：

```JavaScript {2,6,10}
//...
import { createPinia } from 'pinia'
//...

//...
const pinia = createPinia()
//...

//...
app.use(pinia)
//...
```

2、**定义 Store** 。在`src/stores`中创建你想要的数据并配置，最后导出:

```JavaScript
//counter.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'//导入定义容器的方法

export const useCounterStore = defineStore('counter', () => {//容器 ID 必须唯一
  const count = ref(0)//数据
  const name = ref("counter")
  const doubleCount = computed(() => count.value * 2)//计算属性
  function increment() {
    count.value++
  }//方法

  return { count, name, doubleCount, increment }
})
```

也可使用另一种方式定义 Store

```JavaScript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'counter' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

3、**使用 Store** 。在组件中导入 Store 并使用:

```vue {2,3,9-11}
<script setup>
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>count: {{ counterStore.count }}</div>
    <div>doubleCount: {{ counterStore.doubleCount }}</div>
    <button @click="counterStore.increment()">increment</button>
  </div>
</template>
```

### 解构访问 Pinia 容器数据

使用解构方法可以将单个数据从 Store 提取出来:

```vue
const counterStore = useCounterStore() const { count, name } = useCounterStore
```

但这样解构出的数据并不是响应式的，需要做 ref 相应式代理。正确的方法如下:

```vue
//... impot { storeToRefs } from 'pinia' //... //... const counterStore =
useCounterStore() //... //... const { count, name } = storeToRefs(counterStore)
//...
```

### 状态更新和 Actions

以下为 Store 外最简单更新数据的方式:

```vue
counterStore.count++ counterStore.foo = 'name'
```

使用`$patch`可以批量更新多个数据:

```vue
counterStore.$patch({ count: counterStore.count + 1 name: 'name' })
```

也可`$patch`一个函数:

```vue
counterStore.$patch(state => { state.count++ state.name = 'name'
state.arr.push(4) })
```

对于复杂逻辑，通常封装在方法中:

```JavaScript
actions: {
    increment(data) {
        //业务逻辑
    },
},
```

::: warning 警告
不能使用箭头函数定义 action
:::

### gatters 使用

gatters 类似于组件的 computed，用来封装计算属性，有缓存的功能

```JavaScript
gatters: {
    count10 (state) {
        return state.count + 10
    }
}
```

其中的函数接受一个可选参数：state 状态对象

如果在 gatters 中使用了 this 则必须手动指定返回值的类型，否则类型推导不出来:

```JavaScript
gatters: {
    count10 (): number {
        return this.count + 10
    }
}
```

## 组合式 API (Composition API)

::: warning 警告
以下大部分 API 都需要在使用前导入
:::

组合式 API 是为了实现基于函数的逻辑复用机制而产生的。主要思想是我们将它们定义为新的 setup 函数返回的 JavaScript 变量，而不是将组件的功能（例如 state、methods、comouted等）定义为对象属性。其具体写法如下:

```vue
<template>
  <div class="about">
    <h3>count: {{ data.count }}</h3>
    <h3>double: {{ data.double }}</h3>
    <button @click="add()">+</button>
  </div>
</template>

<script>
import { computed, reactive } from "vue";

export default {
  setup() {
    const data = reactive({
      count: 0, //data数据
      double: computed(() => data.count * 2), //计算属性
    });
    function add() {
      data.count++;
    } //方法
    return { data, add };
  },
};
</script>
```

也可使用另一种写法:

```vue
<script setup>
import { computed, reactive } from "vue";
const data = reactive({
  count: 0,
  double: computed(() => data.count * 2),
});
function add() {
  data.count++;
}
</script>
```

### `setup()`方法详解

`setup()`函数是 vue3 中专门新增的方法，可以理解为Composition Api 的入口。

执行时机在`beforecreate()`之后，`create()`之前执行，故无法访问 this 。

```vue
setup(props,context){ //... }
```

`props` : 用于接受传递过来的属性

`context` : 是一个上下文对象

在使用 `script setup` 的单文件组件中，props 可以使用 `defineProps()` 宏来声明：

```vue
<script setup>
const props = defineProps(["foo"]);

console.log(props.foo);
</script>
```

还可以使用对象的形式

```vue
defineProps({ title: String, likes: Number })
```

### 常用 API

`ref()` : 接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 `.value`

```vue {3,8,11,14}
<template>
  //...
  <h3>num: {{ num }}</h3>
  //...
</template>

<script>
import { computed, reactive, ref } from 'vue';
export default{
    //...
    let num = ref(2)
    function add(){
        data.count++
        num.value++
    }
    return {data,num,add}
  }
}
</script>
```

与`defineExpose()`结合使用可以传递DOM元素给父组件。以下代码中的`childDom.value.childDom`就代表了子组件中的 div 。

::: code-group

```vue [Children1.vue]
<script setup>
import { ref } from "vue";
const childDom = ref(null);
defineExpose({ childDom });
</script>

<template>
  <div class="children1">
    <div ref="childDom">count: {{ data.count }}</div>
  </div>
</template>
```

```vue [App.vue]
<script setup>
import children1 from "@/components/children1.vue";
import { ref } from "vue";
function show() {
  console.log(childDom.value.childDom);
}
const childDom = ref(null);
</script>

<template>
  <children1 ref="childDom"></children1>
</template>
```

:::

`reactive()` : 返回一个对象的响应式代理

```vue
<script setup>
import { reactive } from 'vue';
const data = reactive({
    name: name
    count:0,
})
</script>
```

`toRef()` : 可以将值、refs 或 getters 规范化为 refs (3.3+)。也可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。

`readonly()` : 接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。

`isRef()` : 检查某个值是否为 ref

### computed 计算属性 API

`computed()`用来创建计算属性，返回值是一个 ref 的实例

```vue
let fullname = computed(()=>{ return "namea"+"-"+"name2" })
```

### 侦听器`watch`

`watch()`函数用来监视某些数据项的变化，从而触发某些特定的操作。

```vue
let a = ref(0) watch(a,(newA,oldA)=>{ console.log(oldA+'->'+newA)
},{immediate:true})
```

也可以同时监听多个值:

```vue
let a = ref(0) let b = ref(0) watch([a,b],([newA,newB],[oldA,oldB])=>{
console.log(oldA+'->'+newA+','+oldB+'->'+newB) },{immediate:false})
```

`immediate` : 创建时是否自动执行

可以监听由`reactive()`创建的对象。

```vue
const data = reactive({ num1:1, num2:2, count:0, }) watch(data,()=>{
console.log(data) })
```

单独监听对象里的某个值时，需使用回调函数。

```vue
const data = reactive({ num1:1, num2:2, count:0, })
watch(()=>data.num2,(newNum,oldNum)=>{ console.log(oldNum+'=>'+newNum) })
```

`watchEffect()`立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```vue
watchEffect(()=>{ console.log("a"+a.value) })
```

### 生命周期 API

在新版的生命周期函数，可以按需导入到组件中，且只能在`setup()`函数中使用。

```vue
onMounted(()=>{ console.log('onMounted...') }) onUpdated(()=>{
console.log('onUpdated...') })
```

### 在组合 API 中 provide 和 inject 使用

provide/inject 这对选项允许一个祖先组件向其所有子孙后代组件注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

provide 就相当于加强版父组件 prop ,可以跨越中间组件， inject 就相当于加强版子组件的 props

**在祖先组件中定义:**

```vue
export default{ data(){ return{ title:"root" } }, provide(){ return{
title:this.title } }, }
```

**在后代组件中接受:**

```vue
export default{ inject:['title'] }
```

在`setup()`中则使用以下方式:

**祖先组件中:**

```vue
setup(props,context){ let title = ref('root') provide("title",title) return
{title} }
```

**后代组件中:**

```vue
setup(){ let title = inject('title') return {title} }
```

使用常规方法时数据不是相应式的，使用组合 API 式是响应式的。

### 组合式 API 处理路由

常规方法中路由传参使用`$route.params`在`template`中使用参数，用`this.$route.params`在`script`中使用参数。

在`setup()`中，则使用`useRoute()`和`useRouter()`来分别代表`$route`和`$router`

```vue
const route = useRoute() const router = useRouter()
```

在`setup()`中，对于通常方法的导航守卫，需在其前面加 on

```vue
onBeforeRouteLeave((to,from)=>{ //... })
```

## 更多信息

更多信息请点击[此处](https://cn.vuejs.org/guide/introduction)
