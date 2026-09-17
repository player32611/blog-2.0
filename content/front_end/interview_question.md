# 前端面试题

## HTML

### script 标签上有哪些属性，分别作用是什么

> async 和 defer 都可以让 script 异步下载，从而避免 JS 下载阻塞 HTML 解析。async 是"下载完立即执行"，多个脚本执行顺序不确定；defer 是"HTML 解析完成后再执行"，并且多个 defer 脚本会按照 HTML 中的顺序执行。

- `src`: 指定 JS 文件地址

- `type`: 定义脚本 MIME 类型，告诉浏览器如何解析脚本

- **`async`**: 异步下载，下载完成后立即暂停 HTML 解析并执行

- **`defer`**: 异步下载，但是等 HTML 解析完成后再执行

```html
<script src="/js/app.js"></script>

<script type="text/javascript"></script>

<script async src="app.js"></script>

<script defer src="app.js"></script>
```

- `crossorigin`: 控制跨域加载脚本时 CORS 的权限，用于获取跨域脚本的错误信息(默认跨域脚本无法获取错误信息)

- `integrity`: 保证脚本的完整性，防止脚本被篡改

```html
<script src="https://cdn.example.com/app.js" crossorigin="anonymous"></script>
<script src="https://cdn.example.com/app.js" crossorigin="use-credentials"></script>

<script
	src="https://cdn.example.com/app.js"
	integrity="sha384-xxx..."
	crossorigin="anonymous"
></script>
```

::warning

script 标签会直接阻塞页面 html 的渲染，首先会通过网络请求相关的内容。请求完成后，执行 js 逻辑，完成后才会继续进行页面 html 的解析

```html
<script src="app.js"></script>
<!-- HTML 解析 -> 遇到 script -> 暂停 HTML 解析 -> 下载 JS -> 执行 JS -> 继续解析 HTML -->
```

::

::tip

async 以及 defer 的区别

- 执行阶段: `async` 是加载完了直接执行；`defer` 是加载完了并且等待整体页面渲染完成后才会去执行

- 顺序: 多个 `async` 标签同时加载，他们的执行顺序是没法保证的；多个 `defer` 标签是可以保证按照标签顺序执行的。

::

## CSS

### CSS 的 GPU 加速

> CSS GPU 加速是指浏览器将部分渲染和合成任务交给 GPU 处理，从而降低 CPU 主线程的工作量，提高动画和交互的流畅度。现代浏览器通常会将 transform、opacity 等适合合成的属性放到独立合成层，在 Composite 阶段由 GPU 完成移动、缩放等操作，避免频繁触发 Layout 和 Paint。常见的优化手段有使用 transform 和 opacity 做动画，以及合理使用 will-change。不过 GPU 加速并不是越多越好，过度创建合成层会增加 GPU 内存和图层合成成本，反而可能造成性能下降。

> 现代浏览器会根据渲染情况自动决定是否创建合成层

```css
.box {
	will-change: transform;
}

.box:hover {
	transform: translateX(100px);
}
```

::tip

GPU

GPU 专门用于处理图形渲染，擅长并行计算。可以同时处理大量像素点的计算，非常适合动画、3D 效果等场景

::

### CSS 如何形成渲染树

> 浏览器首先解析 HTML 生成 DOM Tree，同时解析 CSS 生成 CSSOM Tree。然后将 DOM 节点与 CSSOM 中的规则进行匹配，通过层叠、继承等机制计算每个节点的最终样式，也就是 Computed Style。浏览器根据 DOM 结构和计算样式生成 Render Tree，display:none 等不需要渲染的节点不会进入 Render Tree。之后浏览器对 Render Tree 进行 Layout，计算元素的位置和尺寸，再进行 Paint 和 Composite，最终显示到屏幕上。

渲染树的形成是 css 和 DOM 一起拼接而成的

1. 资源的收集: 外部 css 文件(`<link ref="stylessheet">`)、外部 css 样式(`<style></style>`)、内联样式(直接写在 dom 的 style 标签中的)

2. 词法分析: 浏览器会将预处理后的 css 字符串拆分成最小的语法单元(tokens)

3. 语法分析: 将相关 css 语法拼接成 ast 的抽象语法树(ast 是对 css 的结构化描述，包含所有样式规则的层级关系)，也会去确定样式的冲突关系包括层级的关系

### flex: 1 代表什么

> flex: 1 是 flex-grow: 1、flex-shrink: 1、flex-basis: 0% 的简写，表示元素可以伸缩，并以 0% 作为基础尺寸，按照 flex-grow 的比例分配父容器的可用空间。

`flex: 1` 等价于 `flex-grow: 1, flex-shrink: 1, flex-basis: 0%`

`flex-grow`: 扩展因子的配置，有剩余空间时，这个元素参与分配剩余空间，并且按照比例分配

```css
/* 1000px */
.container {
	display: flex;
}

/* 最终效果: 500px */
.left {
	flex: 1;
}

/* 最终效果: 500px */
.right {
	flex: 1;
}
```

`flex-shink`: 收缩因子的配置，空间不足时，允许元素按照比例进行收缩

`flex-basis`: 基础尺寸，分配剩余空间时，不把元素原来的主轴尺寸作为基础尺寸

### 元素水平垂直居中

- flex: 子元素可以不设置宽高

```css
.parent {
	display: flex;
	justify-content: center; /* 主轴水平居中 */
	align-items: center; /* 交叉轴垂直居中 */
}
```

- transform:

```css
.parent {
	position: relative;
}

.child {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
```

::tip

translate 50% 是针对于子元素本身的宽高

::

- margin: 需要知道子元素宽高

```css
.parent {
	position: relative;
}

.child {
	position: absolute;

	width: 100px;
	height: 50px;

	left: 50%;
	top: 50%;

	margin-left: -50px;
	margin-top: -25px;
}
```

- grid:

```css
.parent {
	display: grid;
	place-items: center;
}
```

## JavaScript

### 自定义实现 unshift 效果

```javascript
Array.prototype.myUnshift = function () {
	const len = arguments.length;
	// 从后往前遍历参数，然后不断往数组头部插入
	for (let i = len - 1; i >= 0; i--) {
		const element = arguments[i];
		this.splice(0, 0, element);
	}

	return this.length;
};

let arr = [1, 2, 3];

arr.myUnshift(3, 4, 5); // 3, 4, 5, 1, 2, 3
```

### 自定义数组去重

```javascript
Array.prototype.myUnique = function () {
	// 不可行
	// return Array.from(new Set(this));

	// 方法一，但无法处理对象，数组（引用类型）
	// let arr = [];
	// for (let i = 0; i < this.length; i++) {
	// 	if (arr.includes(this[i])) {
	// 		(arr, push(this[i]));
	// 	}
	// }

	// return arr;

	// 方法二，但无法处理对象，数组（引用类型）
	return this.filter((v, idx) => {
		return this.indexOf(v, 0) === idx;
	});
};

var arr = [{}, {}, "", "", 233, 233, "233", "abc", undefined, null, null, NaN, NaN, 123, [2], [2]];
```

### 获取指定范围内的随机数

```javascript
Math.round(num); // 四舍五入
Math.floor(num); // 向下取整
Math.ceil(num); // 向上取整

function fn(min, max) {
	// 不包含两端：(min, max)
	return Math.round(Math.random() * (max - min - 2) + min + 1);
	// 包含两端：[min, max]
	return Math.round(Math.random() * (max - min) + min);
	// 左开右闭：(min, max]
	return Math.ceil(Math.random() * (max - min) + min);
	// 左闭右开：[min, max)
	return Math.floor(Math.random() * (max - min) + min);
}
```

### 打印 100 以内的质数

```javascript
let count = 0;
for (let i = 2; i <= 100; i++) {
	for (let j = 1; j <= i; j++) {
		if (i % j === 0) {
			count++;
		}
	}

	if (count === 2) {
		console.log(i);
	}

	count = 0;
}
```

### 提取 url 的参数

```javascript
let url = "http://alibaba.com?a=1&b=2&c=3#hash";

function queryURLParams(url) {
	const urlObj = new URL(url);

	const params = Object.fromEntries(urlObj.searchParams.entries());
	// 提取哈希
	// const hash = urlObj.hash;

	return params;
}
```

::tip

`entries()` 用于得到键值对，如：

```javascript
[
	["a", "1"],
	["b", "2"],
	["c", "3#hash"],
];
```

::

### 数组随机排序（打乱）

```javascript
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 方法一
function result(arr) {
	for (let i = 0; i <= arr.length; i++) {
		let randomIndex = parseInt(Math.random() * arr.length);

		// 存下当前正常索引值的对应数字
		let curNum = arr[i];
		arr[i] = arr[randomIndex];
		arr[randomIndex] = curNum;
	}

	return arr;
}

// 方法二：借助 sort
arr.sort(() => Math.random() - 0.5);
```

### 使用迭代的方式实现 flatten 函数（嵌套数组扁平化）

```javascript
let arr = [1, 2, [3, 4, 5, [6, 7], 8, 9, 10, [11, [12, 13]]]];

// 方式一
// const flatten = function (arr) {
// 	while (arr.some(v => Array.isArray(v))) {
// 		arr = [].concat(...arr);
// 	}

// 	return arr;
// };

// 方式二：递归
const flatten = function (arr) {
	return [].concat(...arr.map(v => (Array.isArray(v) ? flatten(v) : v)));
};
```

### 两数之和（寻找数组中两数之和为目标值的数）

```javascript
const nums = [2, 7, 11, 15];
const target = 9;

function twoSum(nums, target) {
	for (let i = 0; i < nums.length; i++) {
		const num = nums[i];
		const targetIndex = nums.indexOf(target - num);

		if (targetIndex > -1 && targetIndex !== i) {
			return [i, targetIndex];
		}
	}
}
```

### 给 a b c 三个请求，希望 c 在 a、b 获取后再请求

```javascript
// 方式一：Promise.all()
async function request() {
	const [aData, bData] = await Promise.all([requestA(), requestB()]);

	const cData = await requestC(aData, bData);

	return cData;
}

// 方法二
let arr = [];
function fn(data) {
	arr.push(data);
	if (arr.length === 2) {
		// 触发 c
		console.log(arr);
	}
}

fs.readFile(`./a.txt`, `utf-8`, (err, data) => {
	fn(data);
});

fs.readFile(`./b.txt`, `utf-8`, (err, data) => {
	fn(data);
});
```

### 手动实现发布订阅

```javascript
class EventEmitter {
	handlers = {};

	on(type, handler, once = false) {
		if (!this.handlers[type]) {
			this.handlers[type] = [];
		}

		if (!this.handlers[type].includes(handler)) {
			this.handlers[type].push(handler);
			handler.once = once;
		}
	}

	once(type, handler) {
		this.on(type, handler, true);
	}

	off(type, handler) {
		if (this.handlers[type]) {
			this.handlers[type] = this.handlers[type].filter(h => {
				return h !== handler;
			});
		}
	}

	trigger(type) {
		if (this.handlers[type]) {
			this.handlers[type].forEach(handler => {
				handler.call(this);

				if (handler.once) {
					this.off(type, handler);
				}
			});
		}
	}
}

const ev = new EventEmitter();

function handler1() {
	console.log("handler1");
}

function handler2() {
	console.log("handler2");
}

function handler3() {
	console.log("handler3");
}

ev.on("test", handler1);
ev.once("test", handler2);
ev.on("test", handler3);

ev.trigger("test");
ev.trigger("test");
```

### this 指向问题

> JavaScript 中普通函数的 this 是动态绑定的，主要取决于函数的调用方式；而箭头函数没有自己的 this，它会捕获定义时外层作用域的 this。new、call/apply/bind 可以显式决定普通函数的 this，但不能改变箭头函数的 this。

::code-group

```javascript [普通函数]
function a() {
	// this == window
	console.log(this.name);
}

a(); // undefined
```

```javascript [对象函数调用]
const obj = {
	name: "Tom",
	say() {
		console.log(this.name);
	},
};

obj.say(); // Tom

const b = obj.say;

b(); // undefined
```

```typescript [箭头函数]
const a = {
	name: "s",
	getName: () => {
		console.log(this.name); // s
	},
};

a.getName(); // undefined
```

::

::tip

经典面试题:

```javascript
const obj = {
	name: "Tom",

	say() {
		console.log(this.name);

		setTimeout(function () {
			console.log(this.name);
		}, 0);

		setTimeout(() => {
			console.log(this.name);
		}, 0);
	},
};

obj.say();
// Tom
// undefined
// Tom
```

::

### 闭包是什么

> 闭包是指函数能够访问并持有其定义时所在词法作用域中的变量，即使这个外部函数已经执行结束，这些变量仍然可以被内部函数访问。闭包的本质可以理解为函数和它的词法环境的组合。常见用途包括实现数据私有化、保存函数状态、函数工厂以及解决异步回调中的变量捕获问题。需要注意的是，闭包会延长相关变量的生命周期，如果不合理使用可能增加内存占用，但闭包本身并不等于内存泄漏。

在 JavaScript 中，闭包是指一个函数能够访问并操作其声明时所在的词法作用域中的变量和函数，即使该函数在其词法作用域之外被调用

简单来说，闭包的核心在于: 函数和它所"捕获"额周围环境(变量，函数)捆绑在一起，形成一个独立的单元

```javascript
function outer() {
	let count = 0;

	function inner() {
		count++;
		console.log(count);
	}

	return inner;
}

const fn = outer();

fn(); // 1
fn(); // 2
fn(); // 3
```

**常见用途**:

::code-group

```javascript [数据封装]
function createCounter() {
	let count = 0;

	return {
		increment() {
			count++;
		},

		getCount() {
			return count;
		},
	};
}

const counter = createCounter();

counter.increment();
counter.increment();

console.log(counter.getCount()); // 2
```

```javascript [函数工厂]
function multiply(x) {
	return function (y) {
		return x * y;
	};
}

const double = multiply(2);
const triple = multiply(3);

double(5); // 10
triple(5); // 15
```

::

::warning

闭包的缺点

- 肯会造成内存泄漏

- 代码可读性

::

### 深拷贝与浅拷贝的区别

> 浅拷贝和深拷贝的主要区别在于对引用类型的处理。

> 浅拷贝只复制对象的第一层属性，如果属性值是引用类型，那么复制的是引用，所以修改嵌套对象可能会影响原对象。

> 常见的浅拷贝方式有 Object.assign()、对象展开运算符，以及数组的 slice()、展开运算符等。

> 深拷贝会递归复制对象的各层数据，使原对象和拷贝对象之间不存在共享的嵌套对象引用。

> 现代 JavaScript 可以使用 structuredClone() 实现深拷贝；面试中如果需要手写深拷贝，还需要考虑数组、Date、Map、Set、循环引用等特殊情况，循环引用通常可以使用 WeakMap 解决。

> JSON.parse(JSON.stringify()) 虽然可以实现简单对象的深拷贝，但会丢失 undefined、函数、Symbol 等数据，并且无法正确处理循环引用，因此不适合作为通用深拷贝方案。

在编程中，深拷贝(Deep Copy) 和浅拷贝(Shallow Copy) 是两种创建对象副本的方式，核心区别在于是否复制对象的深层数据(即引用类型的内部数据)

::code-group

```javascript [浅拷贝]
const obj = {
	name: "Tom",
	info: {
		city: "Beijing",
	},
};

const copy = { ...obj };

console.log(copy === obj); // false
console.log(copy.info === obj.info); // true，说明 info 还是指向原来的对象。

copy.info.city = "Shanghai";

console.log(obj.info.city); // Shanghai
```

```javascript [深拷贝]
// 简易实现
function deepClone(obj) {
	if (typeof obj !== "obj") return obj;
	const newObj = {};

	const newArray = [];
	if (Array.isArray(obj)) {
		obj.forEach(item => {
			newArry.push(deepClone(item));
		});
	}

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			newObj[key] = deepCopy(Obj[key]);
		}
	}

	return newObj;
}

const obj = {
	name: "Tom",
	info: {
		city: "Beijing",
	},
};

const copy = deepClone(obj);
```

::

**常见浅拷贝方式**:

```javascript
const copy = Object.assign({}, obj);

const copy = { ...obj };

const copy1 = [...arr];

const copy2 = arr.slice();

const copy3 = Array.from(arr);
```

### 原型与原型链?

### DOM 里面，如何判断 a 元素是 b 元素的子元素

> 可以使用 DOM 的 contains() 方法，例如 b.contains(a)，它可以判断 a 是否是 b 的后代节点。如果要求严格的子元素关系，需要额外判断 a !== b。

::code-group

```javascript [方案一]
const a = document.querySelector("#a");
const b = document.querySelector("#b");

console.log(b.contains(a));
```

```javascript [方案二]
const a = document.querySelector("#a");
const b = document.querySelector("#b");

// 判断 a 的祖先中是否存在 b
a.closest("#b") === b;
```

::

### js 超过 Number 最大值的数如何处理

> JavaScript 的 Number 使用 IEEE 754 双精度浮点数表示，最大安全整数是 Number.MAX_SAFE_INTEGER，即 2^53 - 1，超过这个范围后整数可能出现精度丢失。如果需要处理超过安全整数范围的大整数，可以使用 ES2020 提供的 BigInt。在前后端数据传输中，如果是订单 ID、雪花 ID 等超大整数，也可以让后端以字符串形式返回，避免 JSON 解析时发生精度丢失。

在 JavaScript 中，Number 类型基于 64 位双精度浮点数实现，其最大值由 Number.MAX_VALUE 定义

当数值超过这个上限时，会被强制转为 `Infinity`，导致精度丢失或计算错误

**解决方案**:

```javascript
const a = 9007199254740992n;
const b = BigInt("123456789012345678901234567890");
const c = BigInt(Number.MAX_VALUE) + 100n;

console.log(a);
console.log(b);
```

### js 如何判空(数组、对象、字符串、0、undefined、null、空 map、空 set)

> JS 判空不能简单使用 !value，因为 0、false、NaN 等也是 falsy，而空数组、空对象、空 Map、空 Set 都是 truthy。对于 null 和 undefined 可以使用 value == null；字符串判断 value === '' 或 trim() === ''；数组判断 length === 0；普通对象使用 Object.keys(value).length === 0；Map 和 Set 使用 size === 0。如果业务上 0 不是空值，就不能使用 !value 统一判断。

```javascript
function isEmoty(val) {
	// 基础空值
	if (val === undefined || val === null) return true;

	// 数字类型
	if (typeof val === "number") return val === 0;

	// 字符串
	if (typeof val === "string") return val === "";

	// 数组
	if (Array.isArray(val)) return val.length === 0;

	// 对象
	if (typeof val === "object" && !Array.isArray(val)) {
		if (val.constructor === Object) return Object.keys(val).length === 0;

		// 空 Map
		if (val instanceof Map) return val.size === 0;

		// 空 Set
		if (val instanceof Set) return (val, size === 0);
	}

	return false;
}
```

### js 如何实现大对象深度对比

> 大对象深度比较可以通过递归遍历对象的属性来实现，首先用 Object.is 判断是否是同一个引用，然后判断类型、数组类型和 key 数量，再递归比较每个属性。对于循环引用，可以使用 WeakMap 记录已经比较过的对象，避免无限递归。

> 但是对于大对象，性能问题比实现本身更重要。生产环境通常使用成熟的 lodash.isEqual，或者通过结构共享、引用比较 ===、缩小比较范围等方式避免每次都遍历整个对象。

```javascript
// 目标
// deepEqual(1, 2) // false
// deepEqual({a: 1, b: 2}, {a: 1, b: 2}) // true

function deepEqual(a, b) {
	// 原始值是否一致
	if (a === b) return true;

	// null/undefined/原始值
	if (a === null || b === null || typeof a !== "object" || typeof b !== "object")
		return Object.is(a, b);

	// 构造函数
	if (a.constructor !== b.constructor) return false;

	// 数组
	if (Array.isArray(a))
		return a.length === b.length && a.every((val, idx) => deepEqual(val, b[idx]));

	// Set
	if (a instanceof Set) {
		if (a.size !== b.size) return false;
		for (const val of a) {
			let hasEqual = false;
			for (const bVal of b) {
				if (deepEqual(val, bVal)) {
					hasEqual = true;
					break;
				}
			}
			if (!hasEqual) return false;
		}
	}

	// Map
	if (a instanceof Map) {
		if (a.size !== b.size) return false;
		for (const [key, val] of a) {
			let hasEqual = false;
			for (const [bKey, bVal] of b) {
				if (deepEqual(key, bKey) && deepEqual(val, bVal)) {
					hasEqual = true;
					break;
				}
			}
			if (!hasEqual) return false;
		}
	}

	// 函数
	if (typeof a === "function") return a.toString() === b.toString();

	// 普通对象 object
	const keysA = Object.keys(a);
	const keysB = Object.keys(b);

	if (keysA.length !== keysB.length) return false;
	return keysA.every(key => deepEqual(a[key], b[key]));
}
```

### V8 里的 JIT 是什么

> JIT 是 Just-In-Time 即时编译。V8 不会一开始就把所有 JavaScript 全部编译成机器码，而是先通过 Ignition 解释执行字节码，同时收集运行时的类型反馈。当发现某段代码执行频繁、类型比较稳定时，就把它识别为热点代码，并交给 TurboFan 进行优化编译，生成更高效的机器码。

> 如果后续发现之前的类型假设不成立，V8 还可以进行 Deoptimization，回退到通用执行路径。这样能够在运行时利用真实的代码执行情况优化 JavaScript，从而提高性能。

**核心**: 让 JS 跑的更快

**JS 执行流程**: JS 引擎逐行读代码 -> 转成字节码 -> 逐行执行

**JIT 核心思路**: 频繁执行的热点代码(比如循环、常调用函数)直接编译为机器码(CPU 直接能跑的指令)

- Ignition(解释器): 负责快速启动

- TurboFan(优化编译器): 负责深度优化

- 反优化机制: 校验之前代码生成的机器码，确保类型不出错，如果出错了它就重新交给解释器执行

**实际工作流程**:

1. 首次执行: JS 代码 -> Ignition(解释器)转字节码 -> 解释执行

2. 检测热点: 函数调用，循环执行次数，标记为热点代码

3. 编译加速: TurboFan(优化编译器) -> 直接编译为机器码，后续直接用机器码执行

**本质**: 解释执行 + 热点编译

### 判断一个对象是否为空，其原型链上是否有自定义数据或者方法

> 如果只判断对象自身是否为空，我会使用 Reflect.ownKeys(obj).length === 0，因为它能够同时检测字符串、Symbol 和不可枚举属性。如果还需要判断原型链上的自定义数据或方法，我会通过 Object.getPrototypeOf() 逐层向上遍历，同时排除 Object.prototype，因为它包含 JavaScript 默认提供的 toString、valueOf 等方法。需要注意 Object.keys() 只能够检测自身的可枚举字符串属性，而 for...in 还会遍历原型链，因此都不适合作为这个问题的完整判断方式。

```javascript
function isCompletelyEmpty(obj) {
	if (obj === null || typeof obj !== "object") return false;

	const ownProps = Object.getOwnPropertyNames(obj);
	const ownCustomProps = ownProps.filter(prop => {
		return !["__proto__", "length", "constructor"].includes(prop);
	});

	if (ownCustomProps.length > 0) return false;

	let currentProto = Object.getPrototypeOf(obj);
	while (currentProto !== Object.prototype) {
		const protoProps = Object.getOwnPropertyNames(currentProto);
		const proptoCustomProps = protoProps.filter(prop => prop !== "constructor");
		if (proptoCustomProps.length > 0) return false;
		currentProto = Object.getPrototypeOf(currentProto);
	}

	return true;
}
```

## TypeScript

### TypeScript 的优势

- 增加了静态类型，代码质量更好，更健壮

- 杜绝手误导致变量名写错

- 类型一定程度充当文档

- IDE 自动填充、自动联想

### const 和 readonly 的区别

`const` 防止变量值被修改

```typescript
const name = "Tom";

name = "Jack"; // ❌ 报错

const user = {
	name: "Tom",
	age: 18,
};

user.name = "Jack"; // ✅ 可以
user.age = 20; // ✅ 可以
```

`readonly` 防止变量属性被修改

```typescript
interface User {
	readonly name: string;
	age: number;
}

const user: User = {
	name: "Tom",
	age: 18,
};

user.age = 20; // ✅
user.name = "Jack"; // ❌
```

### 枚举（enum）和常量枚举（const enum）的区别

`enum` 会生成运行时代码

```typescript
enum Direction {
	Up,
	Down,
	Left,
	Right,
}

let direction = Direction.Up;
console.log(direction); // 0

// 编译后
var Direction = {
	0: "Up",
	1: "Down",
	2: "Left",
	3: "Right",
	Up: 0,
	Down: 1,
	Left: 2,
	Right: 3,
};

console.log(Direction.Up); // 0
console.log(Direction[0]); // "Up"
```

`const enum` 在编译阶段会被删除，成员在使用的地方会被内联（编译后通常会被直接替换成对应的值，不生成枚举对象）。减少了运行时对象创建和属性访问，生成的 JavaScript 也更小。

```typescript
const enum Direction {
	Up,
	Down,
	Left,
	Right,
}

let direction = Direction.Up;

// 编译后
let direction = 0;
console.log(Direction); // ❌
```

### 接口（interface）和类型别名（type）

`interface` 更适合描述 "对象的结构"，支持声明合并

```typescript
interface User {
	name: string;
}

interface User {
	age: number;
}

const user: User = {
	name: "Tom",
	age: 18,
};
```

`type` 更灵活，更适合复杂类型，可以额外基本类型、联合类型、交叉类型、元组等；不可以重复声明

```typescript
// 基本类型
type ID = string | number;
let id: ID;
id = 100; // ✅
id = "100"; // ✅
id = true; // ❌

// 联合类型
type Status = "success" | "error" | "loading";
let status: Status;
status = "success"; // ✅
status = "abc"; // ❌

// 交叉类型
type Admin = User & {
	permissions: string[];
};

// 元组
type Point = [number, number];
const point: Point = [10, 20];
```

- 共同点：都可以描述对象或者函数，都允许扩展

::tip

- `interface` 可以通过 `extends` 扩展

```typescript
interface User {
	name: string;
	age: number;
}

interface Admin extends User {
	role: string;
}

const admin: Admin = {
	name: "Tom",
	age: 18,
	role: "admin",
};
```

- `type` 使用交叉类型扩展

```javascript
type User = {
  name: string;
  age: number;
};

type Admin = User & {
  role: string;
};

const admin: Admin = {
  name: "Tom",
  age: 18,
  role: "admin"
};
```

::

### any 类型的作用

不清楚当前变量类型时使用，值来自于动态内容（用户输入/第三方代码库）

### any、never、unknown、null、undefined 和 void 有什么区别

- `any`：动态类型变量，失去了类型检查的作用

- `never`：永远不存在的值的类型，在抛出异常、死循环、穷尽检查时使用（函数不会正常结束）

- `unknown`：未知类型，任何类型的值都可以赋值给 `unknown`，`unknown` 只能赋值给 `unknown`、`any`（类型安全版的 `any`）

- `null`：明确为空，默认是所有类型的子类型

- `undefined`：没有被定义，默认是所有类型的子类型
  - 在 `strictNullChecks` 配置下，`null` 或者 `undefined` 只能赋值给 void 或者他们自己

- `void`：没有任何类型，当函数没有返回值时可以定义为 `void`（函数正常结束）

### interface 给 Function / Array / Class（Indexable） 做声明吗

```typescript
// Function 声明
// 表示：Say 是一个可以被调用的函数，它接收一个类型为 string 的参数 name，无返回值
interface Say {
	(name: string): void;
}
let say: Say = (name: string): void => {};

// Array 声明
// 表示：用 number 类型的索引访问这个对象时，得到的是 number
interface NumberArray {
	[index: number]: number;
}
let list: NumberArray = [1, 2, 3, 4, 5];

// Class 声明
interface Person {
	name: string;
	sayHi(name: string): string;
}
```

### 使用 string、number、boolean、symbol、object 等给类型做声明

```typescript
let name: string = "foo";
let age: number = 6;
let isDone: boolean = false;
let sym: Symbol = Symbol();
```

::tip

`string` 表示 JavaScript 的原始字符串类型，`String` 表示 String 对象类型，一般推荐 `string`

```typescript
let a: string = "hello";
let b: String = new String("hello");
```

Number 和 number，Boolean 和 boolean 同理

`Symbol` 主要是 JavaScript 中的构造/创建 Symbol 的函数对象:

```typescript
const id: symbol = Symbol("id");
```

::

::tip

- `object` 表示非原始类型

```typescript
let value: object;

value = {};
value = [];
value = function () {};
value = "hello"; // ❌
value = 123; // ❌
value = true; // ❌
```

- `Object` 比 object 更宽

```typescript
let value: Object;

value = {};
value = [];
value = "hello";
value = 123;
value = true;
```

::

### TypeScript 中的 this 和 JavaScript 中的 this 有什么差异

- `TypeScript`：在 `noImplicitThis: true` 配置下必须去声明 this 类型，才能在函数或者对象中使用 this

- 其余保持一致

```typescript
interface User {
	name: string;
	sayHello(this: User): void;
}

const user: User = {
	name: "Tom",

	sayHello() {
		console.log(this.name);
	},
};
```

### 使用 Union Types（联合类型） 时的注意事项

- 联合类型只能访问共有的属性或者方法

```typescript
function print(value: string | number) {
	console.log(value.toString()); // ✅ 两者都有
	console.log(value.length); // ❌ number 没有 length
}
```

- 使用联合类型后，通常需要类型缩小

```typescript
function print(value: string | number) {
	if (typeof value === "string") {
		console.log(value.length);
	} else {
		console.log(value.toFixed(2));
	}
}
```

### 如何设计 Class 的声明

```typescript
class Greeter {
	greeting: string;

	constructor(message: string) {
		this.greeting = message;
	}

	greet(): string {
		return `hello, #{this.greeting}`;
	}
}

let greeter = new Greeter("world");
```

### 如何获取联合枚举类型的 Key

```typescript
enum str {
	A,
	B,
	C,
	D,
}
type strUnion = keyof type of str; // 'A' | 'B' | 'C' | 'D'

enum Status {
  Pending = "pending",
  Success = "success",
  Failed = "failed"
}
type StatusKey = keyof typeof Status; // "Pending" | "Success" | "Failed"
```

::tip

`Status` 表示枚举类型；`typeof Status` 用于获取运行时的 Status 对象类型；`keyof typeof Status` 用于获取这个枚举对象的所有属性名。

::

### 简单介绍 TypeScript 模块加载机制

```typescript
import { a } from "moduleA";
```

1. 尝试通过绝对/相对定位查找模块文件

- 一般查找顺序：`.ts` -> `.tsx` -> `.d.ts`

2. 若未找到，尝试查找外部模块声明 `.d.ts`

3. 若仍未找到，抛出错误 `cannot find module 'moduleA'`

### 简单聊聊对 TypeScript 类型兼容性的理解

当一个类型 Y 可以赋值给另外一个类型 X 时，就可以说**类型 X 兼容类型 Y**

```typescript
let a: string = "hello";
let b: string = a; // ✅

let c: number = 123;
let d: string = c; // ❌
```

对于接口兼容性: 只有目标 X 中的声明的类型属性变量在原类型 Y 中都存在，就可以说**类型 X 兼容类型 Y**

::code-group

```typescript [对象类型是"结构兼容"]
interface Person {
	name: string;
}

const user = {
	name: "Tom",
	age: 18,
};

const person: Person = user; // ✅
```

```typescript [结构兼容，而不是名称兼容]
interface Person {
	name: string;
}

interface User {
	name: string;
}

let person: Person;
let user: User;

person = user; // ✅
```

::

对于函数兼容性：源函数的返回值类型可以赋值给目标函数要求的返回值类型。

```typescript
let fn1 = (x: number) => 100;
let fn2: (x: number) => number;
fn2 = fn1; // ✅

let fn: () => string;
const getValue = () => "hello";
fn = getValue; // ✅
```

::warning

关于函数参数兼容性：

```typescript
interface Animal {
	name: string;
}

interface Dog extends Animal {
	bark(): void;
}

let handleAnimal = (animal: Animal) => {};
let handleDog = (dog: Dog) => {};

handleAnimal = handleDog; // ❌
```

::

### 对象展开的副作用

- 对象展开是浅拷贝，对象展开只能保证第一层引用被复制，嵌套对象仍然共享引用。

```typescript
const user = {
	name: "Tom",
	address: {
		city: "Shanghai",
	},
};
const newUser = { ...user };

newUser !== user; // true
newUser.address === user.address; // true

newUser.address.city = "Beijing";
console.log(user.address.city); // "Beijing"
```

```typescript
const user = {
	hobbies: ["JavaScript", "TypeScript"],
};
const newUser = { ...user };

newUser.hobbies.push("React");
console.log(user.hobbies); // ["JavaScript", "TypeScript", "React"]
```

- 展开对象时，后面的属性会覆盖前面的属性

```typescript
const user = {
	name: "Tom",
	age: 18,
};

const newUser = {
	...user,
	age: 20,
};
// {
//   name: "Tom",
//   age: 20
// }
```

- 仅包含可枚举的属性，不可枚举属性丢失

```typescript
const obj = {
	name: "Tom",
};

Object.defineProperty(obj, "age", {
	value: 18,
	enumerable: false,
});

const newObj = { ...obj };

console.log(newObj.name); // Tom
console.log(newObj.age); // undefined
```

### 类型的全局声明和局部声明

当 ts 文件不包含 `import`、`export` 时变成全局声明

```typescript
interface User {
	name: string;
	age: number;
}

// 其它文件可用
const user: User = {
	name: "Tom",
	age: 18,
};
```

包含 `import`、`export` 时变成局部声明

```typescript
export interface User {
	name: string;
}

// 其它文件必须
import type { User } from "./user";
```

### 如何使 TypeScript 项目引入并识别编译为 JavaScript 的 npm 库包

> npm 包只有 JavaScript，没有 TypeScript 类型声明时，TS 项目如何既能运行，又能通过类型检查？

1. 选择安装 ts 版本 `npm install @types/xxx --save`

2. 没有类型的 js 库时，需要编写同名的 `.d.ts`

```typescript
declare module "xxx" {
	export function add(a: number, b: number): number;
}
```

### TypeScript 的 tsconfig.json 中有哪些配置项信息

```json
{
	"files": [],
	"include": [],
	"exclude": [],
	"compileOnSave": true,
	"extends": "",
	"compilerOptions": {} // 核心配置
}
```

- `files`: 精确指定需要编译的文件

- `include`: 指定需要编译的文件

- `exclude`: 排除不需要编译的文件：

- `compileOnSave`: 当文件保存时，是否自动触发 TypeScript 编译

- `extends`: 用来让一个 TS 配置文件继承另一个 TS 配置文件

- `compilerOptions`: 编译核心配置项
  - `target`: 指定编译后的 JavaScript 版本
  - `module`: 指定生成的 JavaScript 使用什么模块规范
  - `moduleResolution`: 指定 TypeScript 如何查找模块
  - `strict`: 是否开启严格类型检查

### 如何设置模块导入的路径别名

一般通过 `tsconfig.json` 的 `paths` 进行配置

```json
{
	"compilerOptions": {
		"paths": {
			"@/*": ["src/*"] // @/*  →  src/*
		}
	}
}
```

因此，原本为：

```typescript
import Button from "../../components/Button";
import request from "../../utils/request";
```

变为：

```typescript
import Button from "@/components/Button";
import request from "@/utils/request";
```

### declare、declare global 是什么

declare 用于声明全局变量、全局函数、全局命名空间、js modules、class 等（声明某个**已有**的变量/函数/类/模块等）

```typescript
declare const version: string;
```

declare global 用于为全局对象、window 增加新的属性（向全局作用域添加声明）

```typescript
export {};

declare global {
	interface Window {
		csrf: string;
	}
}

window.csrf = "xxxxxxx";
```

两者都不产生 JS 代码

### 类中成员的 public、private、protected、readonly 修饰符的理解

- `public`：默认设定、可以被外部成员访问

```typescript
class User {
	name: string = "Tom";

	public sayHello() {
		console.log(`Hello ${this.name}`);
	}
}

const user = new User();

console.log(user.name); // ✅
user.sayHello(); // ✅
```

- `private`：私有，只有当前类内部可以访问

```typescript
class User {
	private password: string = "123456";

	login() {
		console.log(this.password); // ✅
	}
}

const user = new User();

user.login(); // ✅

console.log(user.password); // ❌ Property 'password' is private
```

- `protected`：允许类内部及其子类访问

```typescript
class User {
	protected name: string = "Tom";

	protected sayHello() {
		console.log("Hello");
	}
}

class Admin extends User {
	test() {
		console.log(this.name); // ✅
		this.sayHello(); // ✅
	}
}

const admin = new Admin();

console.log(admin.name); // ❌ protected 成员不能在类外部访问
```

- `readonly`: 属性设置为只读，只读属性必须在声明时或者构造函数里被初始化

```typescript
class User {
	readonly id: number;

	constructor(id: number) {
		this.id = id;
	}
}

const user = new User(1001);

console.log(user.id); // ✅

user.id = 1002; // ❌ Cannot assign to 'id' because it is a read-only property
```

### keyof 和 typeof 关键字的作用

- `keyof`：索引类型查询操作符，获取索引类型属性名，构成联合类型

```typescript
interface User {
	name: string;
	age: number;
	address: string;
}

type UserKey = keyof User; // "name" | "age" | "address"
```

- `typeof`: 获取一个变量或者对象的类型

```typescript
const user = {
	name: "Tom",
	age: 18,
};

type User = typeof user;
// {
//   name: string;
//   age: number;
// }
```

::tip

`keyof typeof` 组合

```typescript
const user = {
	name: "Tom",
	age: 18,
	gender: "male",
};

type UserKey = keyof typeof user; // "name" | "age" | "gender"
```

::

### 简述工具类型 Exclude、omit、Merge、Intersection、Overwrite 的作用

- `Exclude<T, U>`: 从**联合类型 T** 中排除能够赋值给 U 的类型

```typescript
type Status = "pending" | "success" | "failed";

type Result = Exclude<Status, "failed">; // "pending" | "success"
```

- `Omit<T, K>`: 从**对象类型 T** 中删除指定的属性 K

```typescript
interface User {
	id: number;
	name: string;
	age: number;
	password: string;
}

type UserWithoutPassword = Omit<User, "password">;
// {
//   id: number;
//   name: string;
//   age: number;
// };
```

- `Merge<O1, O2>`: 自定义工具类型，把两个对象类型合并成一个类型

```typescript
type Merge<A, B> = {
	[K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
};

type A = {
	name: string;
};

type B = {
	age: number;
};

type User = Merge<A, B>;
// {
//   name: string;
//   age: number;
// }
```

- `Overwrite<T, U>`: 自定义工具类型，基于原来的类型，用新的类型覆盖指定属性。

```typescript
type Overwrite<T, U> = Omit<T, keyof U> & U;

interface User {
	id: number;
	name: string;
	age: number;
}

type NewUser = Overwrite<
	User,
	{
		id: string;
	}
>;
// {
//   id: string;
//   name: string;
//   age: number;
// }
```

- `Intersection<T, U>`: 指交叉类型 `&`

### 数组定义的两种方式

```typescript
type Foo = Array<string>;
interface Bar {
	baz: Array<{ name: string; age: number }>;
}
```

```typescript
type Foo = string[];
interface Bar {
	baz: { name: string; age: number }[];
}
```

### 前端如何判断数据类型

> JavaScript 中常见的数据类型判断方式有 typeof、instanceof、Array.isArray()、Object.prototype.toString.call() 和 constructor。

> typeof 适合判断基本数据类型，但存在两个经典问题：typeof null 是 "object"，数组和普通对象都会返回 "object"。

> instanceof 是通过原型链判断对象是否属于某个构造函数，但不适合判断基本类型，而且存在跨 iframe 的问题。

> 判断数组推荐使用 Array.isArray()，它对跨 iframe 的数组也更加可靠。

> 如果需要判断比较具体的类型，例如 Date、RegExp、Null、Array 等，可以使用 Object.prototype.toString.call()。

> 实际开发中一般是根据场景选择：基本类型用 typeof，数组用 Array.isArray()，复杂类型可以使用 Object.prototype.toString.call()。

- 基础类型 `typeof`，但无法对引用类型进行准确的判断

```typescript
typeof 123; // "number"
typeof "hello"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof Symbol(); // "symbol"
typeof 123n; // "bigint"
typeof function () {}; // "function"
typeof {}; // "object"
typeof []; // "object"
typeof null; // "object"
```

- 引用类型 `instanceof`

```typescript
const arr = [];

arr instanceof Array; // true

arr instanceof Object; // true
```

- `toString`，可以覆盖所有类型，但不够直观

```typescript
Object.prototype.toString.call(123);
// "[object Number]"

Object.prototype.toString.call("hello");
// "[object String]"

Object.prototype.toString.call(true);
// "[object Boolean]"

Object.prototype.toString.call(null);
// "[object Null]"

Object.prototype.toString.call(undefined);
// "[object Undefined]"

Object.prototype.toString.call([]);
// "[object Array]"

Object.prototype.toString.call({});
// "[object Object]"

Object.prototype.toString.call(new Date());
// "[object Date]"

Object.prototype.toString.call(/abc/);
// "[object RegExp]"
```

## 网络请求

### 为什么要取消网络请求

> 取消网络请求主要是为了避免无效请求继续消耗客户端和服务器资源，同时避免请求结果回来后产生无效的业务处理。特别是在搜索框、快速切换页面、重复操作等场景中，可以通过取消旧请求解决请求竞态问题，保证最终使用的是最新请求的结果。Axios 中可以使用 AbortController 实现请求取消。

如果多个相同请求不取消之前的行为，极容易导致信息展示错误

### axios 取消请求

> Axios 可以通过 AbortController 取消请求。创建 AbortController，把它的 signal 传给 Axios 请求，然后调用 controller.abort() 即可取消。取消请求后可以通过 axios.isCancel() 判断是否属于主动取消。实际开发中常用于 React 组件卸载取消请求，以及搜索框中取消上一次请求，避免请求竞态。旧版本 Axios 还有 CancelToken，但现在已经废弃。

```javascript
const controller = new AbortController();

axios.get("/api/user", {
	signal: controller.signal,
});

// 取消请求
controller.abort("取消原因");
```

::tip

当多个请求绑定同一个 AbortController 时，会一次取消多个请求

```javascript
const controller = new AbortController();

axios.get("/patha", {
	signal: controller.signal,
});

axios.get("/pathb", {
	signal: controller.signal,
});

controller.abort("取消原因");
```

::

### cookie 是什么，有哪些常用的属性

> Cookie 是浏览器保存的一小段键值数据，服务器可以通过 Set-Cookie 设置，浏览器在后续符合条件的请求中自动携带。常用属性包括 Expires、Max-Age、Domain、Path、Secure、HttpOnly 和 SameSite。其中 HttpOnly 可以降低 XSS 窃取 Cookie 的风险，SameSite 主要用于限制跨站 Cookie，从而降低 CSRF 风险。

**来源**：

- 接口响应体中的 set-cookie 字段

- 前端可通过 js 进行相关的设置

**属性**:

- 过期时间的设置: max-age 或 expires 字段

- domain(域名): 限制 Cookie 生效的域名范围

- path: 限制 Cookie 生效的路径范围

- secure: 相关的 cookie 只能在 https 协议下才能携带

- HttpOnly: 禁止 js 进行访问以及修改

- SameSite: 对于跨域属性的设置，控制跨站请求是否携带 Cookie

### HTTP2 和 HTTP1 有哪些区别

> HTTP/2 相比 HTTP/1.1 主要有几个改进。第一，HTTP/1.1 是文本传输，而 HTTP/2 使用二进制分帧，更方便进行多路复用；第二，HTTP/2 可以在一个 TCP 连接中通过多个 Stream 并行传输多个请求和响应，减少 HTTP 层的队头阻塞，因此不再需要像 HTTP/1.1 那样依赖大量 TCP 连接提高并发；第三，HTTP/2 使用 HPACK 对 Header 进行压缩，减少重复 Header 带来的网络开销；第四，HTTP/2 曾提供 Server Push，让服务器可以主动推送资源。不过 HTTP/2 仍然基于 TCP，因此 TCP 层的队头阻塞仍然存在，这也是 HTTP/3 使用 QUIC 的重要原因。

HTTP2 针对 HTTP1 的优化

- 数据格式: 二进制帧: HTTP2 协议会把相关的内容分成不一样的帧来进行发送，其中比较重要的包括 header 以及 data 帧

- 连接复用: HTTP1 中网络通过一个 TCP 连接通道，只能同时请求一个。只能等待当前请求结束后，才能请求第二个，造成浏览器只能请求 6 个同域名下面的请求；HTTP 优化了这种情况，同一个域名理论上是不会做请求接口的数量限制，用 streamId 来曲风不一样的请求，大大减少了 TCP 通道的连接数量

- 头部处理: 采用 HPACK 压缩，在服务器端，会有一个静态字典。host、User-Agent 信息等，会直接用相关的映射字段，或者索引来进行填充。

### 浏览器的存储有哪些

> Cookie 主要解决客户端和服务器之间的状态传递；localStorage 适合长期保存少量客户端数据；sessionStorage 适合保存当前页面会话的数据；IndexedDB 适合大量结构化数据；Cache Storage 主要配合 Service Worker 做资源缓存和离线应用。

- cookie: 很小，4KB；可设置有效期；按域名隔离

- localStorage: 本地存储，主打长期复用；5KB；永久有效(手动删除)；按域名隔离

- sessionStorage: 会话级存储

- IndexDB: 本地数据库，用来存储大量结构化内容，并且支持复杂查询；GB 为单位；永久有效；按域名隔离

### 浏览器跨域是什么，如何解决跨域问题

> 跨域是浏览器同源策略导致的。当请求的协议、域名或者端口与当前页面不同时，就属于跨域。浏览器的同源策略主要是为了防止恶意网站读取其他源的敏感数据。解决跨域最常用的是 CORS，由后端通过 Access-Control-Allow-Origin 等响应头告诉浏览器允许哪些源访问。开发环境还可以通过 Vite、Webpack Dev Server 等配置代理，生产环境可以通过 Nginx 反向代理。另外还有 JSONP、postMessage 等方案，其中 JSONP 主要用于兼容老项目并且只支持 GET。

协议、域名、端口号有一个不同就是跨域

### HTTP 是一个无状态的协议，那么 Web 应用要怎么保持用户的登录态

> HTTP 本身是无状态协议，服务器不会自动记住前一次请求的用户身份。Web 应用通常通过 Cookie、Session 或 Token 来维护登录态。传统方案是登录成功后服务器创建 Session，并通过 Set-Cookie 将 Session ID 返回给浏览器，之后浏览器每次请求自动携带 Cookie，服务器根据 Session ID 找到对应用户。前后端分离项目中也经常使用 JWT，登录成功后服务器返回 Token，前端保存 Token，并在后续请求的 Authorization Header 中携带，服务器验证 Token 后确定用户身份。

方案一: Cookie + Session

- 登录阶段: 用户发送账号+密码给服务器，服务器验证通过后，创建一个 session，生成 sessionID。服务器把 sessionID 通过 Set-Cookie 放到 Cookie 里返回给浏览器

方案二: Token 令牌

用户发送账号+密码给服务器后生成加密的 token，前端存储 token，后续请求时将 token 放在请求头里(`Authorization: Bearer ${token}`)。后端返回 200 则继续请求，非 200 则清除本地登录信息，返回登录页

### 前端如何设置请求超时时间

> 前端请求超时一般由请求库或浏览器 API 实现。Axios 可以直接通过 timeout 设置，例如 `axios.get(url, { timeout: 5000 })`；Fetch 本身没有 timeout 参数，可以通过 AbortController 主动取消请求，现代浏览器也可以使用 `AbortSignal.timeout()`；XMLHttpRequest 则可以直接设置 xhr.timeout。实际项目中一般会在 Axios 请求实例中统一配置默认超时时间，再针对上传、报表等耗时接口单独调整，并在响应拦截器中统一处理超时错误。

::code-group

```javascript [全局设置]
import axios from "axios";

const service = axios.create({
	baseURL: "http://api.xxx.com",
	timeout: 3000, // 全局超时时间 3 秒
});

service
	.get("/data")
	.then(res => console.log(res))
	.catch(err => {
		if (err.code === "ECONNABORTED") {
			this.$message.error("请求超时");
			retry();
		}
	});
```

```javascript [局部设置]
axios
	.get("http://api.xxx.com", {
		timeout: 5000, // 5 秒超时
	})
	.then(res => {
		console.log("请求成功");
	})
	.catch(error => {
		if (err.code === "ECONNABORTED") {
			this.$message.error("请求超时");
			retry();
		}
	});
```

::

### 如何防止前端重复请求

> 前端防止重复请求，我一般分几个层面处理。首先对于多个组件同时请求同一个 API，可以通过 Map 缓存正在进行中的 Promise，让相同请求复用同一个 Promise；对于不需要实时更新的数据，可以增加响应缓存和过期时间。

> 对于用户重复点击，可以在请求期间禁用按钮，或者根据场景使用防抖、节流。对于搜索这类连续变化的请求，可以通过 AbortController 取消上一次请求，避免旧请求覆盖新数据。

> 在大型项目中，还可以在 Axios 请求层统一生成请求唯一 key，通过 pending Map 做请求去重。最后，对于订单创建、支付等重要 POST 请求，不能只依赖前端去重，还需要后端通过幂等 ID 保证业务操作只执行一次。

::code-group

```javascript [防抖]
async function fetchSearch(keyword) {
	const response = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);
	const data = await response.json();
}

const debouncedSearch = debounce(fetchSearch, 300);

const searchInput = document.getElementbyId("searchInput");

const searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.val);
})
```

```html [按钮禁用和状态锁]
<button id="submitBtn">提交表单</button>

<script>
	const submitBtn = document.getElementbyId("submitBtn");
	let isSubmitting = false;

	async function submitForm() {
		if (isSubmitting) return;

		try {
			isSubmitting = true;
			submitBtn.disabled = true;
			submitBtn.innerText = "提交中";
			const response = await fetch(`/api/submit`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userName: "test" }),
			});
			const data = await response.json();
		} catch {
			alert("提交失败，请重试");
		} finally {
			isSubmitting = false;
			submitBtn.disabled = false;
			submitBtn.innerText = "提交表单";
		}
	}

	submitBtn.addEventListener("click", submitForm);
</script>
```

::

## React

### 用户如何根据不同的权限，查看不同的页面

早期 ReactRouter 实现: 通过 `onEnter` 实现路由进入前置校验的方式

```javascript
<Router path="/home" component={App} onEnter={(nextState, replact) => {
  if(nextState.location.pathname !== '/'){
    // 根据参数判断用户信息
    const uid = utils.getUrlParams(nextState, "uid")
    if(!uid){
      replace('/');
    } else {
      // XXXX
    }
  }
}}>
```

React Router v6/v7 实现登录鉴权：

::code-group

```tsx [AuthRoute.tsx]
function AuthRoute() {
	const token = localStorage.getItem("token");

	// 如果未登录，重定向至登录页
	if (!token) {
		return <Navigate to="/login" replace />;
	}

	// 如果验证通过，就渲染当前路由对应的子页面。
	return <Outlet />;
}
```

```tsx [PermissionRoute.tsx]
// permissions: ["home:view", "user:list", "user:add"]
function PermissionRoute({ permission }: { permission: string }) {
	// 自定义获取用户的权限
	const permissions = getPermissions();

	// 如果用户权限不包含，显示 403
	if (!permissions.includes(permission)) {
		return <Navigate to="/403" replace />;
	}

	// 如果验证通过，就渲染当前路由对应的子页面。
	return <Outlet />;
}
```

```tsx [router.tsx]
<Routes>
	<Route path="/login" element={<Login />} />

	{/* 登录权限 */}
	<Route element={<AuthRoute />}>
		<Route path="/home" element={<Home />} />

		{/* 用户列表权限 */}
		<Route element={<PermissionRoute permission="user:list" />}>
			<Route path="/user" element={<User />} />
		</Route>

		{/* 用户新增权限 */}
		<Route element={<PermissionRoute permission="user:add" />}>
			<Route path="/user/add" element={<UserAdd />} />
		</Route>
	</Route>

	<Route path="/403" element={<Forbidden />} />
</Routes>
```

::

### React.createClass、extends Component、Function Component 的区别

> React.createClass 是早期 React 提供的组件创建方式，通过对象配置定义组件，使用 getInitialState 和 this.setState 管理状态。

> ES6 之后可以通过 extends React.Component 创建 Class Component，它具有组件实例，可以使用 this.state、this.props 和生命周期方法。

> Function Component 是现在 React 推荐的组件方式，本质上是一个返回 React Element 的函数，通过 Hooks，例如 useState、useEffect 等实现状态管理、副作用和逻辑复用。

> 随着 Hooks 的出现，Function Component 在代码简洁性、逻辑复用和组合能力方面更有优势，因此现代 React 开发基本以 Function Component 为主。

- `React.createClass`：React 早期用于创建组件的方式：

```jsx
const Hello = React.createClass({
  // 支持 mixins，传入其它组件， 可以调用其它组件的生命周期与内部方法
  mixins: [
    SomeMixin
  ]

	// state 初始化
	getInitialState() {
		return {
			name: "Tom",
		};
	},

	handleClick() {
		this.setState({
			name: "Jerry",
		});
	},

	render() {
		return <div onClick={this.handleClick}>Hello {this.state.name}</div>;
	},
});
```

- extends Component：ES6 后创建组件的方式

```jsx
class Hello extends React.Component {
	// state 初始化
	constructor(props) {
		super(props);

		this.state = {
			name: "Tom",
		};
	}

	handleClick = () => {
		this.setState({
			name: "Jerry",
		});
	};

	render() {
		return <div onClick={this.handleClick}>Hello {this.state.name}</div>;
	}
}
```

- Function Component：现代 React 更推荐的函数式写法：

```jsx
function App() {
	const [count, setCount] = useState(0);

	return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### React 事件与普通的 HTML 事件有什么区别

- 事件名称不同: 原生事件名称为全小写，React 事件为 onClick 小驼峰

- 事件函数处理不同: 原生事件采用字符串绑定，React 事件采用 `{}` 绑定

- 阻止浏览器本身的默认行为不同：原生事件采用 `return false` 阻止默认行为，React 事件采用 `preventDefault()`

- React 中使用**合成事件**，对浏览器原生事件进行了封装，使 React 可以提供统一的事件处理方式

::tip

为什么 React 使用合成事件

抹平不同浏览器的事件差异（兼容性） + 统一 React 的事件处理机制 + 方便事件委托和性能管理

::

### 受控组件与非受控组件

- 受控组件：表单数据由 React State 控制

> 受控组件是指表单元素的值由 React State 控制，例如通过 value 和 onChange 管理 input。用户输入后触发 onChange，更新 State，然后 React 再通过 value 更新 UI。

> 受控组件更符合 React 的状态驱动思想，比较适合复杂表单、实时校验和数据联动；非受控组件代码更简单，适合一些简单表单或者文件上传等场景。

```jsx
import { useState } from "react";

function App() {
	const [name, setName] = useState("");

	return (
		// 受控组件
		<input value={name} onChange={e => setName(e.target.value)} />
	);
}
```

- 非受控组件: 表单数据由 DOM 自己控制，通过 ref 获取

> 非受控组件则是由 DOM 自己维护表单数据，React 不实时保存输入值，而是在需要的时候通过 ref 从 DOM 中获取。通常使用 defaultValue 设置初始值。

```tsx
import { useRef } from "react";

function App() {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		console.log(inputRef.current?.value);
	};

	return (
		<>
			{/* 非受控组件 */}
			<input ref={inputRef} />

			<button onClick={handleSubmit}>提交</button>
		</>
	);
}
```

### 为什么 useState 要使用数组而非对象

> useState 返回数组主要是 API 设计上的考虑，而不是因为数组性能更好。它返回 `[state, setState]`，通过数组解构，使用者可以自由地给状态和更新函数命名。例如可以写成 `[count, setCount]`、`[name, setName]`。如果返回对象，就需要固定属性名称，多个 useState 使用时容易出现命名冲突，虽然可以通过对象解构重命名解决，但写法更加复杂。

同时 React Hooks 本身依赖调用顺序来关联每个 Hook 的状态，因此数组这种固定位置的返回形式也非常简洁。

`useState` 返回数组，主要是为了让开发者可以自由命名状态值和更新函数，同时保持 API 简洁、调用顺序明确。并不是因为数组比对象"性能更好"

```jsx
const [count, setCount] = useState(0);
```

::tip

数组解构与对象解构

```js
const foo = [1, 2, 3];
const [one, two, three] = foo; // 自定义名称

const user = {
	id: 123,
	name: "chenghuai",
};
const { id, name } = user; // 固定名称
```

::

### React refs

> Ref 是 React 提供的一种用于访问 DOM 节点或者保存可变值的机制。函数组件中主要通过 useRef 使用。Ref 的值保存在 current 属性中，修改 current 不会触发组件重新渲染，因此适合保存 DOM 引用、定时器、上一次的值等不需要驱动 UI 更新的数据。

`ref` 是 React 中直接访问 DOM 节点或保存可变值的一种机制，适合保存 DOM 引用、定时器、上一次的值等不需要驱动 UI 更新的数据

```tsx
import { useRef } from "react";

function App() {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFocus = () => {
		inputRef.current?.focus();
	};

	return (
		<>
			<input ref={inputRef} />
			<button onClick={handleFocus}>获取焦点</button>
		</>
	);
}
```

### ref 和 state 的区别

需要驱动 UI 更新的数据用 state；只需要在组件生命周期内保存、但不需要驱动 UI 更新的数据用 ref。

state: 修改 state -> 触发重新渲染 -> 页面更新

ref: 修改 ref.current -> 不会触发重新渲染

### 为什么要使用 Hooks

> Hooks 主要是为了让函数组件也能够使用 State、Effect、Ref、Context 等 React 能力，同时摆脱 Class 组件中 this、生命周期以及逻辑复用复杂的问题。通过 Custom Hooks，可以把可复用的状态逻辑抽离出来，让代码更容易复用和维护。因此现代 React 更推荐函数组件 + Hooks 的开发方式。

- 解决生命周期逻辑分散的问题: Class 写法中一个功能可能需要写在多个生命周期，Hooks 可以把同一个功能放到一起:

::code-group

```jsx [Class 生命周期]
componentDidMount() {
  // 请求数据
}

componentDidUpdate() {
  // 请求数据
}

componentWillUnmount() {
  // 清理
}
```

```jsx [useEffect Hook]
useEffect(() => {
	// 请求数据

	return () => {
		// 清理
	};
}, []);
```

::

- 解决 Class 组件 `this` 的复杂问题: Class 组件经常需要处理 `this`，Hooks 不需要处理 Class 中的 this:

::code-group

```jsx [Class 生命周期]
class User extends React.Component {
	handleClick() {
		console.log(this);
	}

	render() {
		return <button onClick={this.handleClick.bind(this)}>点击</button>;
	}
}
```

```jsx [useEffect Hook]
function User() {
	const handleClick = () => {
		console.log("点击");
	};

	return <button onClick={handleClick}>点击</button>;
}
```

::

- 更方便地复用状态逻辑

### 错误边界 Error Boundary

> Error Boundary 是 React 提供的错误边界机制，可以捕获子组件在渲染、生命周期以及构造过程中发生的 JavaScript 错误，并通过 getDerivedStateFromError 显示降级 UI，通过 componentDidCatch 进行错误日志记录，从而避免局部组件错误导致整个页面崩溃。它不能捕获事件处理器、异步代码以及自身抛出的错误。

错误边界更多的是一种定义，组件可以捕获发生在子组件的 JS 报错，并能降级处理

::code-group

```tsx [ErrorBoundary]
import React from "react";

interface Props {
	children: React.ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	state: State = {
		hasError: false,
	};

	static getDerivedStateFromError(error): State {
		return {
			hasError: true,
		};
	}

	componentDidCatch(error: Error, info: React.ErrorInfo) {
		console.error("Error:", error);
		console.error("Component Stack:", info.componentStack);
	}

	render() {
		if (this.state.hasError) {
			// 进行降级展示
			return (
				<div>
					<h2>页面出错了</h2>
					<button
						onClick={() => {
							this.setState({
								hasError: false,
							});
						}}
					>
						重试
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}
```

```tsx [使用]
<ErrorBoundary>
	<UserList />
</ErrorBoundary>
```

::

::warning

函数组件不能直接写 Error Boundary，目前 Error Boundary 的核心机制仍然基于 Class Component 的错误边界 API。

::

### React 代码分割

> React 代码分割是将应用的 JavaScript 代码拆分成多个 Chunk，使浏览器不需要一次性加载整个应用，而是在需要的时候按需加载。React 中最常用的方式是 React.lazy 配合 Suspense，底层通常使用动态 import() 实现。实际项目中最常见的是对路由进行懒加载，也可以对体积较大的组件进行按需加载，从而减少首屏 JavaScript 体积，提升首屏加载性能。

代码分割就是把原本一次性加载的 JavaScript 代码，拆成多个较小的代码块（Chunk），在真正需要的时候再加载。用于减少首屏需要加载的 JavaScript 体积，提高首屏加载速度。

1. `import`

```jsx
import { add } from "./utils";
console.log(add(1, 2));

import("./utils").then(utils => {
	const { add } = utils;
	console.log(add(1, 2));
});
```

2. `React.lazy`

```jsx
import { lazy, Suspense } from "react";

const OtherComponennt = lazy(() => import("./OtherComponennt"));

function App() {
	return (
		<Suspense fallback={<div>加载中...</div>}>
			<OtherComponennt />
		</Suspense>
	);
}
```

### Fragments(<> </>)

> Fragment 是 React 提供的一种特殊组件，用于将多个元素组合起来，同时不会向真实 DOM 中增加额外的节点。它主要用于避免无意义的 DOM 包装，保持 HTML 结构和 DOM 层级的简洁。Fragment 可以使用 `<Fragment>` 或 `<>...</>` 简写；如果需要设置 key，则必须使用完整的 Fragment 写法。

**Fragment(片段)**用于让 React 在不增加额外 DOM 节点的情况下，返回多个元素

React 组件通常只能返回一个根节点，要解决的话通常在最外层包裹一个 `div`，但是会多出一个没有实际意义的 `div`

使用 `<Fragment>` 可以解决

::code-group

```jsx [Fragment]
import { Fragment } from "react";

function App() {
	return (
		<Fragment>
			<h1>标题</h1>
			<p>内容</p>
		</Fragment>
	);
}

function UserList({ users }: { users: User[] }) {
  return (
    <>
      {users.map(user => (
        <Fragment key={user.id}>
          <dt>{user.name}</dt>
          <dd>{user.age}</dd>
        </Fragment>
      ))}
    </>
  );
}
```

```jsx [简写]
function App() {
	return (
		<>
			<h1>标题</h1>
			<p>内容</p>
		</>
	);
}
```

::

### React 的设计思想

> React 的核心设计思想主要是声明式 UI、组件化、状态驱动和单向数据流。开发者通过 State 和 Props 描述 UI 在不同状态下应该呈现什么样子，而不是直接操作 DOM。React 将页面拆分成可复用的组件，并通过单向数据流让数据变化更加可预测。在实现层面，React 通过 Virtual DOM、Reconciliation 等机制计算 UI 的变化并更新必要的 DOM，从而降低开发者直接操作 DOM 的复杂度。

- 声明式: 描述 UI 应该是什么样子，而不是告诉程序具体怎么修改 DOM

::code-group

```javascript [传统]
const div = document.querySelector("#app");

div.innerHTML = "Hello";

div.style.color = "red";
```

```jsx [React]
function App() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>{count}</p>

			<button onClick={() => setCount(count + 1)}>+1</button>
		</div>
	);
}
```

::

- 组件化: 组件内部状态自身维护，只处理内部渲染逻辑；组件通信中，不同组件通过 props 单项数据流进行交互

- 数据驱动视图(UI = f(state)): 不能直接操作 DOM，而是通过修改数据(state)、props，数据驱动视图更新

- 虚拟 DOM: DOM 操作消耗性能，不建议直接操作 DOM；React 会根据新的 UI 描述计算需要更新的部分(增量更新)。

### JSX 是什么，和 JS 有什么区别

> JSX 是 JavaScript 的一种语法扩展，它允许我们在 JavaScript 中使用类似 HTML 的语法来描述 UI。JSX 本身不是 HTML，也不是浏览器原生支持的 JavaScript 语法，需要经过编译转换成 JavaScript。JavaScript 是一种完整的编程语言，而 JSX 只是 JavaScript 的语法扩展。React 中通常使用 JSX 来声明组件的 UI 结构，同时可以通过 {} 在 JSX 中嵌入 JavaScript 表达式

**JSX（JavaScript XML）**是一种 JavaScript 的语法扩展(语法糖)，允许我们在 JavaScript 中使用类似 HTML 的语法描述 UI。需要通过 webpack、babel 编译后转化为 js 执行

::code-group

```jsx [编译前]
const element = <h1>Hello</h1>;
```

```javascript [编译后]
const element = React.createElement("h1", null, "Hello");
```

::

::tip

React 17 之前，JSX 必须依赖 React 变量，必须 `import React from "react";`

React 17 RC 后，不再要求手动导入 React：

::code-group

```jsx [编译前]
function App() {
	return <h1>Hello React</h1>;
}
```

```javascript [编译后]
import { jsx as _jsx } from "react/jsx-runtime";

function App() {
	return _jsx("h1", {
		children: "Hello React",
	});
}
```

::

::

### 为什么 React 自定义组件首字母大写

> React 自定义组件首字母必须大写，是因为 JSX 通过大小写来区分原生 DOM 标签和自定义 React 组件。小写标签会被当作字符串形式的 HTML 标签，例如 `<div>`；大写标签会被当作 JavaScript 变量/组件，例如 `<MyButton>`。所以 React 组件通常使用 PascalCase 命名。

JSX 通过大小写区分"原生 HTML 标签"和"自定义 React 组件"

```js
<app>hello encode</app>;
// 编译后
React.createElement("app", null, "hello encode");

<App>hello encode</App>;
// 编译后
React.createElement(App, null, "hello encode");
```

### React 组件为什么不能返回多个元素(为什么只有一个根元素)

> React 组件一次渲染需要返回一个整体的 React 元素结构，而虚拟 DOM/Fiber 是树状结构，需要有明确的根节点。因此组件不能直接返回多个并列的 JSX 根节点。如果需要返回多个元素，可以使用父元素或者 Fragment 将它们组织成一棵树。

React 组件最后会被编译为 render 函数，函数的返回值只能是一个；虚拟 DOM 是树状结构，根节点只能是一个

想返回多个元素，可以使用 **HOC 高阶函数**和 **`Reactfagment`**

```jsx
// 使用数组返回
renderList(){
  this.state.list.map((item, key) => {
    return [
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td>{item.address}</td>
      </tr>
    ]
  })
}
```

### 元素和组件的区别

> React Component 和 Element 是两个不同的概念。Component 是一个用于定义 UI 的函数或类，负责描述如何生成 UI；Element 是一个轻量级的 JavaScript 对象，用来描述某一时刻 UI 应该是什么样子。JSX，比如 `<User />`，创建的是 React Element，而 User 本身是组件。React 根据 Element 去调用组件并完成后续渲染。

组件是"生产 UI 的函数/定义"，元素是"组件执行后产生的 UI 描述对象"。

::code-group

```jsx [组件]
function User() {
	return <div>张三</div>;
}
// User 是组件
```

```jsx [元素]
const element = <User />;

// <User /> 是元素
```

::

### 简述 React 的生命周期

> React 组件生命周期主要分为三个阶段：挂载、更新和卸载。挂载阶段组件创建并加入页面，常用 constructor、render、componentDidMount；更新阶段当 props 或 state 变化时重新渲染，常用 render 和 componentDidUpdate；卸载阶段组件从页面移除，使用 componentWillUnmount 清理定时器、事件监听、订阅等资源。现代 React 推荐函数组件和 Hooks，很多类组件生命周期场景使用 useEffect 及其清理函数实现。

**生命周期**: 组件实例从创建到销毁流程

- **挂载阶段**:
  - `constructor`: 初始化
  - `static getDerviedStateFromProps`
  - `render`: 创建虚拟 DOM 阶段
  - `componentDidMount`: 挂载生成真实 DOM 时

- **更新阶段**
  - `static getDerviedStateFromProps`
  - `shouldComponentUpdate`
  - `render`: 跟新虚拟 DOM 阶段
  - `getSnapshotBeforeUpdate`: 获取更新前状态
  - `componentDidUpdate`: 完成更新后调用

- **卸载状态**
  - `componentWillUnmount`: 组件被移除时调用

::warning

函数组件不存在`componentDidMount()`、`componentDidUpdate()`、`componentWillUnmount()` 等生命周期函数

::

### React 常用组件

> Portal 是 React 提供的一种将子节点渲染到 DOM 其他位置的机制，通过 createPortal(children, domNode) 实现。它只改变元素在真实 DOM 中的位置，并不会改变 React 树中的父子关系，因此仍然可以使用 React Context，事件也按照 React 树进行传播。Portal 最常用于 Modal、Tooltip、Popover、Dropdown 等需要脱离父容器布局限制的场景。

> Context 是 React 提供的跨层级数据传递机制，主要用于解决 Prop Drilling。当多个不同层级的组件需要共享同一份数据时，可以通过 createContext 创建 Context，由父组件提供 value，子孙组件通过 useContext 获取数据，而不需要逐层传递 props。常见场景包括主题、当前用户、语言、权限以及部分全局状态。Context 应该适度使用，简单的父子数据传递优先使用 props。

> Transition 是 React 的并发渲染机制，用于将不紧急的状态更新标记为低优先级更新。通过 useTransition 可以使用 startTransition 标记更新，并通过 isPending 获取 Transition 的进行状态。这样 React 可以在处理复杂 UI 更新时优先保证用户交互的响应，并且 Transition 更新是可中断的。它不是防抖，也不是简单的异步执行，而是 React 的更新调度机制。

- `Portal`(`createPortal(children, domNode)`): 让子组件渲染在除了父组件之外的 DOM 节点的方式(用于弹窗、提示框等)

```jsx
import { createPortal } from "react-dom";

function Modal() {
	return createPortal(<div className="modal">弹窗内容</div>, document.body);
}
```

- `Fragment`: 包裹多个 JSX，但不产生额外 DOM 节点

```jsx
function App() {
	return (
		<Fragment>
			<h1>标题</h1>
			<p>内容</p>
		</Fragment>
	);
}
```

- `Context`(`createContext()`): 跨层级组件数据传递

```tsx
import { createContext, useContext } from "react";

type User = {
	name: string;
	age: number;
};

const UserContext = createContext<User | null>(null);

function App() {
	const user = {
		name: "张三",
		age: 20,
	};

	return (
		<UserContext value={user}>
			<A />
		</UserContext>
	);
}

function A() {
	return <B />;
}

function B() {
	return <C />;
}

function C() {
	const user = useContext(UserContext);

	return (
		<div>
			{user?.name} - {user?.age}
		</div>
	);
}
```

- `Transition`(`useTransition()`): React 18 引入的并发特性，允许操作被中断

```jsx
import { useState, useTransition } from "react";

function App() {
	const [tab, setTab] = useState("home");

	const [isPending, startTransition] = useTransition();

	function handleClick() {
		startTransition(() => {
			setTab("posts");
		});
	}

	return (
		<>
			<button onClick={handleClick}>Posts</button>

			{isPending && <span>加载中...</span>}

			<Content tab={tab} />
		</>
	);
}
```

### Redux 工作原理

> Redux 是一种基于单向数据流的状态管理方案。应用状态集中存储在 Store 中，组件通过 dispatch 派发 Action，Store 调用 Reducer，根据旧 State 和 Action 计算出新的 State，然后通知订阅者，React-Redux 根据状态变化触发相关组件重新渲染。

Redux 本质上是一个单向数据流的全局状态管理方案。

- 跨层级组件数据共享与通信

- 需要持久化的全局数据(用户登录信息等)

**核心概念**：

- Store: 一个全局的状态管理对象

- Reducer: 一个纯函数，更具旧 state 和 props 更新新 state

- Action: 改变状态的唯一方法(`dispatch(action)`)

- State: 保存应用的状态

dispatch(action) -> Store 接收到 Action -> rootReducer(oldState, action) -> Reducer 判断 action.type -> 计算 newState -> Store 保存 newState -> 通知订阅者 -> React-Redux 检查组件需要的数据 -> 相关组件重新渲染

### 为什么需要前端路由

> 因为 SPA 通常只有一个 HTML 页面，单页应用对 SEC 不友好，需要通过前端路由建立 URL 和组件 UI 之间的映射。用户导航时，前端路由可以监听 URL 变化并匹配对应组件，在不重新加载整个页面的情况下更新 UI。同时它还能统一处理动态参数、嵌套路由、前进后退以及权限控制等问题。

### 前端路由解决了什么问题

> 前端路由主要解决 SPA 中 URL 与 UI 的映射问题。它可以根据 URL 渲染对应的页面组件，并通过客户端导航避免整页刷新，同时支持浏览器前进后退、动态路由参数、嵌套路由以及路由级权限控制等功能。

- 在刷新页面时，能根据 url 对资源进行重定向

- 不同 url 映射到不同内容

- 拦截用户的刷新操作，感知 url 的变化，防止不必要请求

### react-router 等单页面路由组件是如何实现的

> React Router 本质上是利用浏览器的 History API 或 Hash API 实现前端路由。

> 以 BrowserRouter 为例，当用户点击 Link 时，Router 会阻止 <a> 标签的默认跳转，然后通过 history.pushState() 修改 URL，同时更新内部的 location 状态；当用户点击浏览器前进后退时，则通过监听 popstate 事件获取 URL 的变化。

> URL 变化后，Router 会根据当前 pathname 与 Route 配置进行匹配，找到对应的 React Element，然后触发 React 重新渲染，因此整个过程中不需要重新加载 HTML 页面。

> HashRouter 原理类似，只不过它监听的是 hashchange，利用 URL 中的 # 部分保存路由信息。

> BrowserRouter 在部署时还需要服务器配置 fallback，将前端路由都指向 index.html，否则直接刷新 /user 等路径时服务器可能返回 404。

- hash 模式: www.xx.com/#/a

- history 模式: www.xx.com/a

浏览器行为监听: hash 模式可以监听 `hashchange`，history 模式可以监听 `popstate` 事件

如何收集路由与组件的匹配:

```javascript
export const a = {
	patha: () => import("/components"),
};
```

### react-router-dom 有哪些组件

```jsx
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate, Outlet } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<nav>
				<Link to="/">首页</Link>

				<NavLink to="/user">用户</NavLink>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/user" element={<UserLayout />}>
					<Route path="list" element={<UserList />} />
					<Route path="detail" element={<UserDetail />} />
				</Route>

				<Route path="/login" element={<Login />} />

				<Route path="/403" element={<Forbidden />} />

				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}
```

- `BrowserRouter`: 提供路由环境（基于 html5 的 History API 管理 URL）

```jsx
<BrowserRouter>
	<App />
</BrowserRouter>
```

- `HashRouter`: 提供路由环境（把路由信息放在 URL 的 hash 部分）

- `Route`: 路由匹配

```jsx
<Routes>
	<Route path="/" element={<Home />} />
	<Route path="/user" element={<User />} />
	<Route path="/order" element={<Order />} />
</Routes>
```

- `Link`: 声明式导航

```jsx
<Link to="/user">用户管理</Link>
```

- `NavLink`: 当前活动的连接

```jsx
<NavLink to="/user" className={({ isActive }) => (isActive ? "active" : "")}>
	用户管理
</NavLink>
```

- `Outlet`: 渲染嵌套路由

::code-group

```jsx [UserLayout]
import { Outlet } from "react-router";

function UserLayout() {
	return (
		<div>
			<h1>用户中心</h1>

			<nav>
				<Link to="profile">个人资料</Link>
				<Link to="order">订单</Link>
			</nav>

			<Outlet />
		</div>
	);
}
```

```jsx [路由]
<Route path="/user" element={<UserLayout />}>
	<Route path="profile" element={<Profile />} />
	<Route path="order" element={<Order />} />
</Route>
```

::

### react-router-dom 有哪些方法

- `useNavigate`: 编程式跳转

```javascript
import { useNavigate } from "react-router";

function Login() {
	const navigate = useNavigate();

	const handleLogin = async () => {
		// 登录接口
		await login();

		navigate("/home");
	};

	return <button onClick={handleLogin}>登录</button>;
}
```

- `useParams`: 获取动态路由参数

```javascript
import { useParams } from "react-router";

// /user/100
// /user/200
// /user/300
function User() {
	const { id } = useParams();

	return <h1>用户 ID：{id}</h1>;
}
```

- `useSearchParams`: 获取/修改 URL 查询参数

```javascript
import { useSearchParams } from "react-router";

// /user?page=1&keyword=Tom
function User() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page");
	const keyword = searchParams.get("keyword");

	return (
		<div>
			page: {page}
			keyword: {keyword}
		</div>
	);
}
```

- `useLocation`: 获取当前 URL/location

### 数据如何在 React 组件中流动

> React 遵循单向数据流，数据通常从父组件通过 Props 向子组件传递。子组件不能直接修改父组件的 Props 或 State，如果子组件需要修改父组件的数据，父组件可以把更新函数作为 Props 传给子组件，由子组件调用回调通知父组件更新 State。兄弟组件之间通常通过状态提升到共同父组件进行通信；跨层级数据可以使用 Context，更复杂的全局状态可以使用 Redux、Zustand 等状态管理方案。

- 父 -> 子: props 传递

```jsx
function Parent() {
  const name = "张三";

  return <Child name={name} />;
}

function Child({ name }: { name: string }) {
  return <div>{name}</div>;
}
```

- 子 -> 父: 回调函数/事件冒泡

::code-group

```tsx [回调函数]
function Parent() {
	const [count, setCount] = useState(0);

	return <Child count={count} onChange={setCount} />;
}

function Child({ count, onChange }: { count: number; onChange: (value: number) => void }) {
	return <button onClick={() => onChange(count + 1)}>{count}</button>;
}
```

```jsx [事件冒泡]
function Parent() {
	const sayName = name => {
		console.log(name);
	};

	return (
		<div onClick={() => sayName("aaa")}>
			<Child />
		</div>
	);
}

function Child() {
	return <button>点击</button>;
}
```

::

- 兄弟组件通信: 状态提升

```jsx
function Parent() {
	const [value, setValue] = useState("");

	return (
		<>
			<ChildA onChange={setValue} />
			<ChildB value={value} />
		</>
	);
}
```

- 父组件向后代组件通信: Context

```jsx
const user = useContext(UserContext);
```

- 复杂数据通信: 状态管理

### React Hooks 解决了什么问题

> React Hooks 主要解决了函数组件能力不足、Class 组件 this 复杂、状态逻辑复用困难以及生命周期逻辑分散等问题。Hooks 让函数组件可以使用 State、Effect、Ref、Context 等 React 能力，同时可以通过 Custom Hook 抽离和复用状态逻辑，使代码能够按照业务逻辑进行组织，而不是依赖 Class 生命周期进行组织

- 解决函数组件能力不足: 类组件维护自己的 state，函数组件是无状态的

::code-group

```jsx [类组件]
class Counter extends React.Component {
	state = {
		count: 0,
	};

	render() {
		return <button>{this.state.count}</button>;
	}
}
```

```jsx [函数组件]
function Counter() {
	const [count, setCount] = useState(0); // 使用 hook

	return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

::

- 解决逻辑复用困难

- 解决生命周期逻辑分散: 类组件有生命周期钩子，函数组件没有

- 解决 `this` 的复杂问题

::warning

React Hooks 的局限性

- 不能完整为函数组件提供类组件的能力

- 对开发者提出更高要求

- 有严格规则约束

::

### React 常用 Hooks

> React 常用 Hooks 包括 useState、useEffect、useRef、useContext、useMemo、useCallback 和 useReducer 等。useState 用于状态管理，useEffect 用于与外部系统同步和处理副作用，useRef 用于操作 DOM 或保存不参与渲染的可变值，useContext 用于跨层级共享数据，useMemo 和 useCallback 用于缓存值和函数，useReducer 用于管理复杂状态。React 18 以后还需要掌握 useTransition 和 useDeferredValue 等并发相关 Hooks。

- `useState`: 用于给函数组件添加状态

- `useEffect`: 处理副作用

- `useMemo`: 缓存计算结果

- `useCallback`: 缓存函数

- `useEffectLayout`: DOM 布局相关操作

- `useContext`: 跨层级传递数据

- `useRef`: 保存可变值 / 操作 DOM

### Fiber 更新机制

> React Fiber 是 React 16 引入的新协调架构，核心目的是将渲染工作拆分成一个个 Fiber 工作单元，使 React 可以对更新进行调度，并支持暂停、恢复、复用和放弃部分渲染工作。一次更新主要经历 Render 和 Commit 两个阶段：Render 阶段负责执行组件、构建和协调 Fiber Tree、计算出需要发生的变化，这个阶段可以被调度和中断；Commit 阶段负责将计算出的变化一次性提交到 DOM，这个阶段不能被中断。

**Fiber**: React 内部表示一个组件/节点及其更新工作的数据结构，是 React 的协调架构，它把 UI 更新拆成可调度的工作单元，并通过 Render（协调）和 Commit（提交）两个阶段完成更新。

Fiber 是 FiberNode 对象，是一个链表(树形结构)，不仅记录子节点，还记录父节点、兄弟节点，是可以打断的

**更新的整体流程**: 触发更新 -> Schedule / 调度 -> Render / Reconciliation -> Commit -> 浏览器 Paint

::tip

Fiber 的双缓存

React 通常会存在两棵相关的 Fiber Tree: **Current Tree** 与 **WorkInProgress Tree**，用于减少性能损耗

- Current Tree: 当前正在显示的 UI 树

- WorkInProgress Tree(wip tree): 内存中正在计算的新 UI 树

::

### React 渲染流程

> React 的渲染流程可以分为 Trigger、Render 和 Commit 三个主要阶段。首先，当组件首次渲染或者 State、Props、Context 等发生变化时，会触发更新；然后进入 Render 阶段，React 执行组件并通过 Fiber 和 Reconciliation 计算新的 UI，比较前后结果并确定需要更新的部分，这个阶段主要负责计算，不直接修改 DOM；之后进入 Commit 阶段，将 Render 阶段计算出的变化提交到真实 DOM；最后浏览器进行 Paint，将最新 UI 显示出来。

React 使用 jsx 描绘界面，jsx 经过编译后形成 render Function，render Function 执行后形成虚拟 DOM，虚拟 DOM 转换成 Fiber(这个过程为 Reconciliation)，转换过程中创建真实 DOM，转换完成后一次性 commmit 到 DOM 上

jsx 组件 ---babel 编译--> render Function -----> 虚拟 DOM -----> Fiber(WorkInProgress Tree) ---commit--> 真实 DOM ---挂载到 Container-->

### 虚拟 DOM

> 虚拟 DOM 是 React 对 UI 的一种 JavaScript 内存表示，用来描述组件最终应该呈现什么样的 UI。当 State 或 Props 发生变化时，React 会重新计算 UI，并通过 Reconciliation 比较前后的结果，确定需要发生的变化，最后在 Commit 阶段将必要的变化应用到真实 DOM。虚拟 DOM 的核心价值不是简单地比真实 DOM 快，而是提供了声明式 UI 和高效协调的抽象，让开发者不需要手动管理大量 DOM 更新。

## Vue

### React 和 Vue 的区别有哪些

> React 和 Vue 都是用于构建用户界面的前端框架/库，但设计理念和技术实现有所不同。

> React 更偏向 UI 库，强调使用 JavaScript/JSX 描述 UI，状态更新后通过 Fiber 和 Reconciliation 机制计算 UI 的变化；Vue 更强调响应式数据驱动视图，Vue 3 使用 Proxy 实现响应式系统，并结合模板编译优化和 Virtual DOM 完成更新。

> 在开发方式上，React 主要使用 JSX，而 Vue 通常使用 SFC 单文件组件和模板语法。React 的生态更加开放，例如状态管理可以选择 Redux、Zustand 等；Vue 则有相对统一的官方生态，比如 Vue Router 和 Pinia。

> 两者现在也有很多相似之处，例如 React Hooks 和 Vue Composition API 都用于复用组件逻辑。

> 总体来说，React 更强调灵活性和 JavaScript 驱动 UI，Vue 更强调响应式、约定和开发体验。

- **页面结构表达的区别**: vue 通过模板去表达页面的结构，这种方式便于框架标识非变动的 DOM 元素，便于后续框架优化，但不够灵活；React 通过 jsx 方式来表达页面结构，有点是足够灵活，缺点是不易进行 dom 元素的标识，性能优化较为困难

### Vue 组件间的通信方式

> Vue 组件通信主要有以下几种方式：

> 父子组件：父传子使用 props，子传父使用 emit，双向绑定可以使用 v-model。
> 父组件调用子组件：使用 ref，Vue 3 `<script setup>` 中配合 `defineExpose`。
> 兄弟组件：通过共同父组件进行 emit + props 通信。
> 跨层级组件：使用 provide/inject，避免 props 逐层传递。
> 全局状态共享：使用 Pinia。
> 内容传递：使用 slot。
> 属性透传：可以使用 $attrs。

> 实际项目中，一般优先使用 props + emit，跨层级使用 provide/inject，复杂的全局状态使用 Pinia。

- 父组件 → 子组件: `defineProps()`

::code-group

```vue [父组件]
<!-- 父组件 -->
<Child :name="userName" />
```

```vue [子组件]
<!-- 子组件 -->
<script setup>
defineProps({
	name: String,
});
</script>

<template>
	<div>{{ name }}</div>
</template>
```

::

- 子组件 → 父组件：`defineEmits()`

::code-group

```vue [父组件]
<script setup>
const handleChange = value => {
	console.log(value);
};
</script>

<Child @change="handleChange" />
```

```vue [子组件]
<!-- 子组件 -->
<script setup>
const emit = defineEmits(["change"]);

function handleClick() {
	emit("change", "hello");
}
</script>

<template>
	<button @click="handleClick">点击</button>
</template>
```

::

- 父组件直接操作子组件：ref

::code-group

```vue [父组件]
<script setup>
import { ref } from "vue";

const childRef = ref();

const handleClick = () => {
	childRef.value.open();
};
</script>

<template>
	<Child ref="childRef" />

	<button @click="handleClick">打开</button>
</template>
```

```vue [子组件]
<script setup>
function open() {
	console.log("打开弹窗");
}

defineExpose({
	open,
});
</script>
```

::

- 跨层级通信：`provide()` / `inject()`

::code-group

```vue [父组件]
<script setup>
import { provide, ref } from "vue";

const count = ref(0);

provide("count", count);
</script>
```

```vue [任意后代组件]
<script setup>
import { inject } from "vue";

const count = inject("count");
</script>

<template>
	{{ count }}
</template>
```

::

### v-if 和 v-for 优先级

> v-if 和 v-for 不建议写在同一个元素上。

> Vue 2 中 v-for 优先级高于 v-if，会先遍历再判断。

> Vue 3 中 v-if 优先级高于 v-for，因此 v-if 中不能访问 v-for 定义的变量。

> 如果需要过滤列表，推荐使用 computed 提前过滤；如果是控制整个列表是否渲染，则把 v-if 放到 v-for 的父级元素上。

### Vue 生命周期

> Vue 生命周期描述的是组件从创建、挂载、更新到卸载的完整过程。

> Vue 3 Composition API 中常用的生命周期有 onBeforeMount、onMounted、onBeforeUpdate、onUpdated、onBeforeUnmount 和 onUnmounted。

> onMounted 表示组件 DOM 已经挂载完成，通常用于 DOM 操作、第三方组件初始化等；onBeforeUpdate 和 onUpdated 分别对应 DOM 更新前和更新后；onBeforeUnmount 和 onUnmounted 用于组件卸载前后的处理，通常在 onUnmounted 中清理定时器、事件监听、WebSocket 等副作用。

> Vue 3 中 setup() 承担了 Vue 2 中 beforeCreate 和 created 阶段的大部分职责。

- `onBeforeMount()`: 组件挂载 DOM 之前执行

- `onMounted()`: 组件完成 DOM 挂载之后执行

- `onBeforeUpdate()`: 响应式数据发生变化，DOM 更新之前执行

- `onUpdated()`: DOM 更新完成之后执行

- `onBeforeUnmount()`: 组件卸载之前执行

- `onUnmounted()`: 组件卸载完成之后执行

- `onActivated()`: keep-alive 激活时

- `onDeactivated()`: keep-alive 停止使用

```vue
<KeepAlive>
  <Component :is="currentComponent" />
</KeepAlive>
```

- `onErrorCaptured()`: 错误监听

- `onRenderTracked()`: 追踪组件渲染过程中，哪些响应式数据被读取（track）了

### 双向绑定原理和使用

> Vue 中双向绑定主要通过 v-model 实现，它本质上是属性绑定和事件监听的语法糖。

> 对原生表单元素来说，例如 input 的 v-model 可以理解为 :value 加上 @input，数据变化时更新视图，用户输入时通过事件更新数据。

> 对于组件来说，Vue 3 中 v-model 默认对应 modelValue prop 和 update:modelValue 事件，即：

> v-model="value" 等价于 :modelValue="value" @update:modelValue="value = $event"。

> 因此 Vue 的双向绑定本质上仍然是单向数据流 + 事件通知，并不是组件之间真正的双向数据流。

v-model 本质上是 value + input/change 事件的语法糖。

```vue
<input v-model="username" />
```

### Vue 响应式

> Vue 响应式的核心是当响应式数据发生变化时，能够自动通知依赖它的副作用，从而触发更新。

> Vue 3 主要通过 Proxy 实现对象响应式，通过拦截对象的 get 和 set 操作完成依赖收集和更新触发。

> 当组件渲染时读取响应式数据，会触发 get，Vue 通过 track 收集当前组件渲染函数等副作用与该数据之间的依赖关系；当数据发生修改时，会触发 set，Vue 通过 trigger 找到相关依赖并调度执行，最终重新渲染组件并更新 DOM。

> ref 主要通过 Ref 对象的 .value 实现响应式，reactive 则主要通过 Proxy 实现对象响应式。computed 和 watch 也建立在 Vue 的响应式依赖系统之上。

Vue 响应式是: 当响应式数据发生变化时，Vue 能自动找到依赖这个数据的地方，并触发相应的更新。

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);

const add = () => {
	count.value++;
};
</script>

<template>
	<div>{{ count }}</div>
	<button @click="add">+1</button>
</template>
```

Vue 会通过 Proxy 对对象进行代理:

```javascript
const proxy = new Proxy(target, {
	get(target, key) {
		// 依赖收集
		track(target, key);

		return target[key];
	},

	set(target, key, value) {
		target[key] = value;

		// 触发更新
		trigger(target, key);

		return true;
	},
});
```

- 读取属性 -> get -> track() -> 收集依赖

- 修改属性 -> set -> trigger() -> 触发依赖

### Vue 模板渲染原理

> Vue 的模板渲染大致分为模板编译、VNode 生成和 DOM 更新几个阶段。

> 首先，Vue 会将 template 通过编译器解析成 AST，然后经过 Transform 和 Codegen，生成 render 函数。

> 组件首次渲染时执行 render 函数，生成 VNode，然后通过 mount 将 VNode 转换成真实 DOM。

> 当响应式数据发生变化时，响应式系统通过 trigger 通知组件的 Render Effect，重新执行 render 函数生成新的 VNode，然后 Vue 对新旧 VNode 进行 Diff，通过 Patch 只更新发生变化的真实 DOM。

> Vue 3 还通过 Patch Flag、Block Tree、静态提升等编译优化手段，进一步减少运行时 Diff 和 DOM 操作。

### template 与 jsx 的区别

> Template 是 Vue 提供的模板语法，更接近 HTML，通过 v-if、v-for、v-model 等指令描述 UI，Vue 编译器可以对模板进行静态分析和优化。JSX 是 JavaScript 的语法扩展，UI 可以直接使用 JavaScript 的变量、表达式、条件、循环等能力，因此灵活性更高。两者最终都会被编译成能够生成 UI 描述结构的代码，再由框架完成 VNode/Element 到真实 DOM 的渲染。

Vue 2 时期，vue-loader 依赖 vue-template-compiler 模块解析 .vue 文件，将 template 转换成 render 函数中的参数，再交由 render 实现

Vue 3 的 SFC 编译体系会通过 vue-loader / @vitejs/plugin-vue 等工具处理 .vue 文件，其中模板由 Vue 3 Compiler 编译成 render 函数。

babel 通过 @babel/preset-react 插件将 jsx 转为 js

### Vue 2 与 Vue 3 区别

> Vue 2 和 Vue 3 最大的区别主要体现在响应式、API、编译优化和性能几个方面。Vue 2 的响应式主要基于 Object.defineProperty，Vue 3 使用 Proxy，对对象和数组的响应式支持更加完善；Vue 3 新增了 Composition API，可以通过 Composable 更好地复用逻辑；同时支持 Fragment、Teleport、Suspense 等新特性。在编译和运行时方面，Vue 3 引入了 Patch Flag、Block Tree、静态提升等优化，减少运行时 Diff 范围。此外 Vue 3 的 TypeScript 支持、Tree Shaking 和全局 API 设计也进行了改进。

- 重写响应式: Vue 2 的 `Object.defineProperty()` 替换为 Vue 3 的 `Proxy`

- composition api: Vue 3 新增 Composition API，允许编写 Composable

- VDOM升级: 从双端比较进化到最长递增子序列

- 框架写法：Vue 3 源码由 Flow 迁移到了 TypeScript。

- 整体结构，将源码拆分成多个功能包，增强模块化和可维护性，同时配合 ES Module 和 Tree Shaking 减少最终构建产物体积

- 模板编译: 将静态节点编译为常量，在运行时复用

### composition api

> Composition API 是 Vue 3 新增的一套组件逻辑组织方式，通过 ref、reactive、computed、watch、生命周期 Hooks 等 API，将组件逻辑按照功能进行组合，并可以通过 Composable 封装和复用逻辑。相比 Options API 按 data、methods、computed 等选项组织代码，Composition API 更适合复杂组件、逻辑复用和 TypeScript 开发。

Composition API: `ref()`、`computed()`、`watch()`、`onMounted()` 等

Vue 2 主要使用 Options API:

```javascript
export default {
	data() {
		return {
			count: 0,
			user: null,
		};
	},

	computed: {
		double() {
			return this.count * 2;
		},
	},

	methods: {
		increment() {
			this.count++;
		},

		login() {
			// 用户登录
		},
	},

	mounted() {
		// 初始化
	},
};
```

### nextTick()

> nextTick 是 Vue 提供的异步 API，用于等待当前这轮响应式数据更新导致的 DOM 更新完成后，再执行回调或后续代码。Vue 为了提高性能，会将组件更新进行异步批量处理，因此修改响应式数据后 DOM 不一定立即更新。当我们需要在数据修改后获取最新 DOM、操作新增元素或获取最新布局信息时，可以使用 nextTick。

作用: 在下一次 DOM 循环之后再去执行

```javascript
const handleClick = async () => {
	count.value++;

	await nextTick();

	// DOM 已经更新
};

nextTick(() => {
	// DOM 已经更新
});
```

### Teleport

> Teleport 是 Vue 3 的内置组件，可以将组件模板中的 DOM 节点渲染到当前组件之外的指定容器中，例如 body。它主要用于弹窗、遮罩、抽屉、Tooltip 等需要脱离父级 DOM 层级的场景，可以避免父元素的 overflow、z-index、transform 等样式影响。Teleport 只改变 DOM 的挂载位置，不改变组件的逻辑作用域、响应式状态和组件关系。

作用: 将任意组件的 DOM 插入到其它指定的组件层(modal、message 常用)

::code-group

```vue [示例代码]
<template>
	<button @click="visible = true">打开弹窗</button>

	<Teleport to="body">
		<div v-if="visible" class="modal">
			<div class="modal-content">
				<h2>弹窗标题</h2>
				<button @click="visible = false">关闭</button>
			</div>
		</div>
	</Teleport>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>
```

```html [渲染结果]
<body>
	<div id="app">
		<button>打开弹窗</button>
	</div>

	<div class="modal">
		<div class="modal-content">
			<h2>弹窗标题</h2>
		</div>
	</div>
</body>
```

::

- `to`: 挂载的节点位置

- `disabled`: 标识子节点是否挂载。为 true 时，内容不会挂载到指定位置，而是保留在当前组件位置

### Vue 的数据劫持是怎么样实现的

> Vue 2 的数据劫持主要通过 Object.defineProperty 实现，在初始化阶段遍历对象的属性，为每个属性设置 getter 和 setter。当组件渲染访问属性时，会在 getter 中进行依赖收集；当属性发生修改时，会触发 setter，然后通过 Dep 通知对应的 Watcher 更新视图。由于 Object.defineProperty 只能劫持已经存在的属性，所以 Vue 2 对新增属性需要通过 $set 处理，对数组则通过重写数组的变异方法来实现响应式。

> Vue 3 则使用 Proxy，可以直接代理整个对象，通过 get 进行依赖收集，通过 set、deleteProperty 等操作触发更新，因此对新增、删除属性以及数组等场景支持更自然。

- 监听范围: `defineProperty` 是递归监听所有对象的属性，也就是对象的字段；`proxy` 是监听的对象整体，而不是某个字段

- 数值支持: `defineProperty` 无法监听数组的长度变化，以及数组的变化，因为考虑到性能的原因；`proxy` 原生支持监听数组

- 兼容性: `defineProperty` 兼容性比较好，兼容比较早的 IE8 等浏览器；`proxy` 兼容性不太号，无法支持 IE

## nodejs

### nodejs 如何充分利用多核 CPU

> Node.js 的 JavaScript 执行主要依赖单线程 Event Loop，所以单个 Node.js 实例无法充分利用多核 CPU。对于 Web 服务，可以使用 Cluster 创建多个 Node.js 进程，让多个进程分布到不同 CPU 核心上；对于 CPU 密集型任务，可以使用 Worker Threads 创建多个线程，把耗时计算放到 Worker 中执行，避免阻塞主线程。生产环境还可以使用 PM2、Docker 或 Kubernetes 启动和管理多个 Node.js 实例。对于 I/O 密集型任务，一般依靠 Node.js 的异步 I/O 和 Event Loop 就可以获得较高的并发能力。

**核心结论**: JS 是单线程语言，只能利用一个主进程，如果想充分利用多核 CPU，就需要创建多个工作进程

::code-group

```javascript [cluster(原生)]
const cluster = require("cluster");
const os = require("os");

const cpuCount = os.cpus().length;

if (cluster.isPrimary) for (let i = 0; i < cpuCount; i++) cluster.fork();
else {
	const http = require("http");
	http
		.createServer((req, res) => {
			res.end(`工作进程 ${process.pid} 处理了请求`);
		})
		.listen(3000);
}
```

```bash [PM2]
npm install -g pm2
pm2 start app.js -i max # max 表示: 根据 CPU 核心数自动创建工作进程
```

::

## 性能优化

### 为什么性能优化重要

> 性能优化非常重要，一方面可以提升用户体验，让页面加载更快、交互更加流畅；另一方面可以降低 CPU、内存、网络等资源消耗，提高系统的吞吐量和并发能力，同时增强系统的稳定性。

### 从输入 URL 到页面加载完成，发生了什么

> 浏览器首先解析 URL，然后进行 DNS 解析，将域名转换成 IP 地址。接着与服务器建立 TCP 连接，如果是 HTTPS，还需要进行 TLS 握手。连接建立后，浏览器发送 HTTP 请求，服务器处理请求后返回 HTTP 响应。

> 浏览器收到 HTML 后开始解析，构建 DOM Tree，同时解析 CSS 构建 CSSOM，然后将 DOM 和 CSSOM 合并生成 Render Tree。接下来浏览器进行 Layout，计算元素的位置和尺寸，然后进行 Paint，将元素绘制到图层，最后进行 Composite 合成并显示到屏幕上。

> 同时，在 HTML 解析过程中还可能遇到 JavaScript、CSS、图片等资源，浏览器会继续发起对应的网络请求，并执行 JavaScript。JavaScript 还可能修改 DOM 和 CSS，从而触发重新布局、重绘或者重新合成。

> 所以整个过程可以概括为：URL 解析 → DNS → TCP → TLS → HTTP → 服务器处理 → HTML/CSS/JS 解析 → DOM/CSSOM → Render Tree → Layout → Paint → Composite → 页面显示。

DNS 解析大致会经历：浏览器 DNS 缓存 -> 操作系统 DNS 缓存 -> hosts -> DNS 服务器 -> 根域名服务器 -> 顶级域名服务器 -> 权威 DNS 服务器 -> 得到 IP

拿到 IP 后，浏览器与服务器建立 TCP 连接，经典 TCP 三次握手

### 性能优化的整体思路

> 性能优化首先不是直接修改代码，而是遵循测量、定位、优化、验证、监控的流程。首先通过性能指标和工具确定具体的性能瓶颈，然后根据问题所在的层面进行针对性优化。

> 前端一般可以从网络、资源加载、JavaScript 执行、浏览器渲染以及用户交互几个方面进行优化。

> 网络层可以通过 CDN、HTTP 缓存、HTTP/2、HTTP/3 等减少网络耗时；资源层可以通过代码分割、懒加载、压缩、图片优化等减少资源加载成本；运行时可以减少不必要的 React 渲染、优化 JavaScript 计算、使用防抖节流；渲染层可以减少回流和重绘；大数据量场景可以使用虚拟列表。

> 最后通过 Lighthouse、Chrome DevTools 等工具对比优化前后的指标，并持续监控，避免性能问题再次出现。

> 核心原则就是：不要凭感觉优化，要先定位瓶颈，再针对瓶颈优化。

### 前端页面性能指标都有哪些

> 从用户角度看，性能主要关注三个方面：加载速度、交互响应和视觉稳定性。加载速度可以通过 FCP、LCP 等指标衡量；交互响应主要关注 INP；视觉稳定性主要关注 CLS。除此之外，还需要关注用户的感知性能，比如是否快速看到首屏内容、是否能够尽早进行交互，而不仅仅是页面最终完全加载所需要的时间。

**核心指标**:

- **LCP**(Largest Contentful Paint): 最大内容绘制，表示首屏中最大的主要内容元素完成渲染的时间

- **INP**(Interaction to Next Paint): 表示用户进行一次交互后，到浏览器完成下一次视觉更新之间的延迟

- **CLS**(Cumulative Layout Shift): 累计布局偏移，用于衡量页面加载过程中，元素是否发生意外移动

**传统指标**:

- FP(First Paint): 首次绘制，表示浏览器第一次绘制像素的时间

- FCP(First Contentful Paint): 首次内容绘制，表示页面第一次绘制出有实际内容的东西(文字、图片、SVG、Canvas)

- TTFB: 加载第一个字节所需时间，用于衡量请求资源到响应第一个字节开始到达之间的时间

- TTI: 可交互时间，衡量的是从网页开始播放开始的时间，只要其主要资源已加载完毕，就能可靠地快速响应用户输入

### 性能指标的计算

::code-group

```javascript [web-vitals 库]
import { onFCP, onLCP, TTFB } from "web-vitals";

onCLS(console.log);
onINP(console.log);
onLCP(console.log);
onFCP(console.log);
onTTFB(console.log);
```

```javascript [Performance API]
const entryHandler = list => {
	for (const entry of list.getEntries()) {
		if (entry.name === "first-paint") {
			observer.disconnect();
		}
		// 白屏时间
		let FP = entry.startTime;
	}
};

const observer = new PerformanceObserver(entryHandler);
observer.observe({ type: "paint", buffered: true });
```

::

性能监控与上报：

```typescript
class PerformanceMonitor {
	private metrics: Record<string, any> = {};
	private readonly RESOURCE_TYPES = ["img", "css", "script"];
	private readonly PERFORMACE_ENDPOINT = "/performace";

	constructor() {
		this.init();
	}

	private init(): void {
		this.setupLoadPerformanceMonitoring();
		this.setupResourcePerformance();
	}

	// 首次内容绘制 FCP
	private setupLoadPerformanceMonitoring() {
		const reportPerformance = () => {
			const paint = performance.getEntriesByType("paint");

			const fcpEntry = paint.find(entry => entry.name === "first-contentful-paint");

			if (fcpEntry) {
				this.metrics.FCP = fcpEntry.startTime;
				this.reportMetrics();
			}
		};

		window.addEventListener("load", () => {
			setTimeout(reportPerformance, 0);
		});
	}

	// 设置资源加载性能
	private setupResourcePerformance() {
		const observer = new PerformanceObserver(list => {
			list.getEntries().forEach(entry => {
				if (this.RESOURCE_TYPES.includes(entry?.initiatorType)) {
					this.metrics[entry.name] = entry.duration;
				}
			});
		});

		observer.observe({ entryTypes: ["resource"] });
	}

	private reportMetrics() {
		try {
			navigator.sendBeacon(this.PERFORMACE_ENDPOINT, JSON.stringify(this.metrics));
		} catch (err) {
			console.error("性能上报失败", err);
		}
	}
}
```

### 常用性能检查工具

- Lighthouse

- network

- performance

### 网络层面优化

> 网络层面的性能优化主要从几个方面入手：减少请求数量、减少资源体积、提高传输效率、合理利用缓存以及优化接口请求。

> 比如通过代码分割、懒加载减少不必要的请求；通过 Tree Shaking、压缩 JS/CSS、WebP/AVIF 等减少资源体积；使用 Gzip 或 Brotli 压缩文本资源；通过 CDN 就近访问静态资源；利用 Cache-Control、ETag 等实现浏览器缓存；同时使用 HTTP/2、HTTP/3 提高网络传输效率。

> 对接口还可以通过请求合并、请求缓存、分页、避免重复请求等方式进行优化。

> 核心目标就是：少传、快传、少请求、能缓存就缓存。

### 浏览器有哪些缓存策略

> 浏览器缓存主要分为 HTTP 缓存和浏览器本地存储。HTTP 缓存又分为强缓存和协商缓存。强缓存主要通过 Cache-Control 和 Expires 控制，在缓存有效期内浏览器直接使用本地缓存，不会向服务器发送请求。缓存过期后进入协商缓存，通过 Last-Modified/If-Modified-Since 或 ETag/If-None-Match 判断资源是否发生变化，如果没有变化服务器返回 304，浏览器继续使用缓存，否则返回 200 和新的资源。

> 实际项目中通常会给 HTML 设置较短的缓存策略，而 JS、CSS、图片等静态资源使用文件指纹配合长期缓存，这样既能保证更新及时，又能提高资源加载速度。

首先进行强缓存的判断，如果命中了强缓存，则直接访问本地的文件。如果说强缓存失效了，才会进行协商缓存

`cache-control` 进行强缓存的判断(单位: 秒):

```http
Cache-Control: max-age=3600
```

### DNS 优化

> DNS 优化主要是减少 DNS 解析带来的网络耗时。

> 常见方式包括利用浏览器和操作系统的 DNS 缓存、合理设置 DNS TTL、使用 dns-prefetch 提前进行 DNS 解析，以及使用 preconnect 提前完成 DNS、TCP 和 TLS 连接。

> 在大型项目中还可以通过 CDN 和智能 DNS，根据用户所在地区将请求调度到距离用户更近的节点。同时要避免不必要的域名拆分，合理控制域名数量。

> 核心思路就是：DNS 能缓存就缓存，能提前解析就提前解析，重要域名可以提前建立连接，并通过 CDN 做就近访问。

- 减少 DNS 查询次数，提前解析关键域名，提升页面加载速度

- DNS 预取

```html
<head>
	<!-- 提前建立网络连接 -->
	<link rel="preconnect" href="https://cdn.example.com" />

	<!-- 提前进行 DNS 解析 -->
	<link rel="dns-prefetch" href="//cdn.example.com" />
</head>
```

::warning

一般建议 3-5 个关键域名

::

### 域名收敛

> 域名收敛是指在合理范围内减少页面访问的不同域名数量。

> 因为访问不同域名可能需要进行 DNS 解析，以及建立 TCP 和 TLS 连接，所以过多的域名会增加网络连接成本。

> 在 HTTP/1.1 时代，由于单域名并发连接数有限，经常使用域名分片来提高并发；而 HTTP/2、HTTP/3 支持多路复用，可以在一个连接上同时传输多个资源，因此现代 Web 更倾向于域名收敛。

> 但域名并不是越少越好，实际项目需要结合 CDN、缓存、安全隔离、服务部署等因素进行合理划分。

- 减少查询次数

- 利用 http2.0 多路复用特性，避免重复 TCP 握手

```md
cdn1.example.com
cdn2.example.com
img.example.com
static.example.com
font.example.com

             ↓

优化后：

static.example.com
```

### CDN

> CDN，也就是内容分发网络，主要通过在不同地区部署边缘节点，将静态资源缓存到距离用户更近的节点。用户请求资源时，通过 DNS 和 CDN 调度系统选择合适的节点，从 CDN 就近获取资源。

> CDN 的核心优势是降低网络延迟、提高静态资源加载速度、减少源服务器压力。

> 前端项目中通常会将 JS、CSS、图片、字体、视频等静态资源部署到 CDN，并结合文件 Hash + Cache-Control 长期缓存使用。

> 当 CDN 没有缓存资源时，会向源服务器回源获取资源并进行缓存，后续请求就可以直接从 CDN 返回。

> 一句话：CDN = 就近访问 + 边缘缓存 + 降低源站压力。

### 渲染层面优化

> 渲染层面的性能优化主要是减少浏览器和框架不必要的渲染工作。

> 浏览器层面，可以减少 DOM 操作，避免频繁触发重排和重绘，批量进行 DOM 的读写操作，避免 Layout Thrashing；动画尽量使用 transform 和 opacity，并使用 requestAnimationFrame。

> React 层面，可以通过合理拆分组件和状态、React.memo、useMemo、useCallback 等方式减少不必要的组件重新渲染；对于大量数据列表，可以使用虚拟列表，只渲染可视区域的数据。

> 同时还可以通过图片懒加载、content-visibility、拆分 Long Task、Web Worker 等方式减少主线程压力。

> 核心就是：少渲染、少计算、少布局、少绘制，并尽量让主线程保持流畅。

- 尽可能减少渲染资源个数

- 尽可能减少资源体积的大小

- 压缩 html、减少 html 体积

- CSS 按需引入，原子能力

### React 性能优化

> React 性能优化我一般从三个方面考虑：减少不必要的渲染、降低渲染成本以及降低首屏加载成本。

> 首先是渲染优化，可以通过 React.memo 避免组件在 props 没有变化时重复渲染，通过 useMemo 缓存复杂计算结果，通过 useCallback 稳定函数引用。另外要合理进行状态下放，缩小状态影响范围，避免一个状态变化导致整个页面重新渲染。

> 对于列表，可以使用稳定的 key，数据量很大时使用虚拟列表，只渲染当前可视区域的数据。

> 第二是加载优化，可以使用 React.lazy、Suspense 和路由级代码分割，配合 Tree Shaking、压缩、图片懒加载、CDN 等减少首屏资源。

> 第三是数据层优化，例如对接口请求进行缓存和去重，避免多个组件重复请求相同 API。

> 对于复杂交互，还可以使用 startTransition、useDeferredValue 等并发特性，把非紧急更新降级。

> 最后，性能优化不能只靠经验，应该先通过 React DevTools Profiler、Chrome Performance、Lighthouse 等工具定位真正的性能瓶颈，再针对性优化。

React 对于框架性能优化比较粗糙，需要前端做一些基础的优化，来达到提升页面性能的效果

- 减少不必要的组件渲染: 使用 `React.memo` 缓存组件 props 进行浅比较，当组件的 props 没有变化时，可以避免重新渲染(对引用类型的 props 无效，除非使用 `useMemo` 包裹)

```tsx
const UserInfo = React.memo(({ name }: { name: string }) => {
	console.log("UserInfo render");

	return <div>{name}</div>;
});
```

- 使用 `useMemo` 缓存计算结果/稳定引用类型: 对于复杂计算，可以避免每次 render 都重新计算，但没必要所有变量都加缓存

```tsx
// 缓存计算结果
const totalPrice = useMemo(() => {
	return list.reduce((sum, item) => {
		return sum + item.price * item.count;
	}, 0);
}, [list]);

// 稳定引用类型
const config = useMemo(
	() => ({
		color: "red",
	}),
	[theme],
);

<Child config={config} />;

// 避免依赖项陷阱
const sum = useMemo(() => {
	return state.a + state.b;
}, [state.a, state.b]);
```

- 使用 `useCallback` 缓存函数: 函数组件每次重新执行时，函数都会重新创建，父组件每次 render 都会产生新的函数引用

```tsx
const Parent = () => {
	const handleClick = useCallBack(() => {
		console.log("click");
	}, []);

	return (
		<div>
			<Child handleClick={handleClick} />
		</div>
	);
};
```

### 发布订阅者跳过中间组件 render 过程

> React 传统的父子状态传递主要通过 props，如果顶层状态发生变化，可能导致中间组件参与更新。发布订阅模式可以把状态抽离成独立 Store，组件通过订阅 Store 获取数据。Store 更新时直接通知订阅该数据的组件，而不需要通过 props 一层层向下传递，因此可以缩小 React 的更新范围，避免不相关的中间组件因为状态变化而重新执行 render。像 Zustand 这类状态管理库就是这种思想的典型应用。

### 状态下放

> 状态下放指的是将 State 放到离实际使用它最近的组件中，而不是为了方便管理而统一放到较高层组件。因为 React 中组件的 State 更新会触发该组件以及相关子树的更新，如果状态放得过高，就可能导致大量不相关组件参与 render。将状态下放后，可以缩小状态更新的影响范围，从源头减少组件 render 和 React 的协调工作。

> 但是状态也不能无限下放。如果多个组件需要共享状态，应该将状态提升到这些组件最近的公共祖先。也就是说，状态应该放在能够满足共享需求的最低层级。

::code-group

```jsx [下放前]
function App() {
	const [keyword, setKeyword] = useState("");

	return (
		<>
			<Header />
			<Search keyword={keyword} setKeyword={setKeyword} />
			<ProductList />
			<Footer />
		</>
	);
}
```

```jsx [下放后]
function App() {
	return (
		<>
			<Header />
			<Search />
			<ProductList />
			<Footer />
		</>
	);
}

function Search() {
	const [keyword, setKeyword] = useState("");

	return <input value={keyword} onChange={e => setKeyword(e.target.value)} />;
}
```

::

### 列表项 key 属性

> key 是 React 用来标识列表元素身份的特殊属性。在 Reconciliation 过程中，React 会通过 key 建立新旧节点之间的对应关系，从而判断元素是新增、删除、移动还是更新，并尽可能复用已有 Fiber 和 DOM 节点。

> key 应该具有唯一性和稳定性。动态列表不建议使用 index 作为 key，因为插入、删除或者排序后，index 会发生变化，可能导致 React 错误复用组件实例，进而出现组件内部 State 和数据对应错误的问题。

> 所以一般应该使用数据本身稳定且唯一的 ID 作为 key，例如 key={item.id}。

key 是 React 用来唯一标识列表中每个元素身份的特殊属性，主要用于 Reconciliation（协调）阶段判断哪些元素发生了新增、删除、移动或更新。

key 的本质是帮助 React 建立新旧 Virtual DOM 节点之间的对应关系，从而进行高效的 Diff/Reconciliation。

### React 循环渲染中为什么推荐不用 index 作为 key

> React 不推荐使用 index 作为 key，是因为 index 表示的是元素在列表中的位置，而不是元素本身的身份。当列表发生插入、删除、排序时，元素的位置会发生变化，导致 key 跟着变化，React 可能错误复用原来的 DOM 或组件实例，从而产生组件状态错乱、输入框内容错位等问题。

> 因此一般应该使用数据本身稳定且唯一的 ID 作为 key。只有当列表是静态的、不会发生增删排序，并且列表项没有内部状态时，才可以考虑使用 index。

### 架构级优化

> 架构级优化主要不是针对某个组件进行优化，而是从整个应用的组件结构、状态管理、数据流和资源加载等方面降低更新成本。

> 首先是合理拆分组件和下放状态，缩小组件更新范围；其次可以使用发布订阅或者 Zustand、Redux 等状态管理方案，并结合 selector 做精确订阅，避免无关组件更新。

> 在资源层面，可以进行路由级代码分割、组件懒加载、Tree Shaking 和第三方库按需加载，减少首屏 JS 体积。

> 在数据层面，可以建立统一的数据请求和缓存层，避免重复请求，并使用分页、虚拟列表解决大数据量场景。

> 对于复杂计算，可以使用 Web Worker 将计算从主线程移出去；如果使用 Next.js，还可以结合 SSR、SSG、Streaming 等渲染策略优化首屏性能。

> 最终目标都是一样的：缩小更新范围、降低渲染成本、减少首屏资源、减少网络请求。

### 服务端渲染 SSR

> SSR 即服务端渲染，是指服务器在接收到请求后执行前端组件和数据获取逻辑，将页面渲染成完整 HTML 返回给浏览器，浏览器可以直接展示页面内容，之后再通过 Hydration 将服务端 HTML 与客户端框架关联起来，使页面具备交互能力。相比 CSR，SSR 可以改善首屏内容呈现，并且更有利于 SEO，但会增加服务器计算压力和开发复杂度，同时需要处理服务端与客户端渲染结果不一致导致的 Hydration 问题。

CSR(client side render)

SSR(server side render)服务端渲染: 服务器返回的 HTML 内容包含所有 DOM 节点

- 利于 SEO

- 白屏时间更短: 浏览器只需进行 DOM、CSSOM 解析

### 组件设计进行优化

### Intersection Observer API

> Intersection Observer 是浏览器提供的异步观察元素与指定区域交叉状态的 Web API，可以判断元素是否进入或离开 viewport，以及进入区域的比例。

> 它相比传统的 scroll + getBoundingClientRect 方式，不需要开发者在 scroll 事件中频繁计算元素位置，因此更适合实现图片懒加载、组件懒加载、无限滚动和曝光埋点等功能。

> 在 React 中通常通过 useRef 获取 DOM 元素，再通过 useEffect 创建 Observer，并在组件卸载时调用 disconnect 清理观察。

> 性能优化的核心价值是：让屏幕外的资源和组件延迟到真正需要的时候再加载，从而减少首屏资源和主线程工作量。

```javascript
const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			console.log("进入可视区域");
		}
	});
});

observer.observe(element);
```

### 组件按需引入

> 组件按需引入是指只加载页面实际使用的组件，而不是一次性加载整个组件库。它可以配合 ES Module、Tree Shaking 和 Code Splitting 来减少 JavaScript Bundle 体积。对于大型、低频使用的组件，还可以通过 React.lazy 或 Next.js dynamic 进行动态加载，在真正使用组件时再下载对应 Chunk，从而减少首屏 JavaScript 的下载、解析和执行成本，提高首屏性能。

### 首屏加载优化

> 首屏加载优化主要从网络、资源、渲染和服务端几个方面入手。

> 网络层使用 CDN、HTTP/2、缓存、DNS 优化降低网络耗时；资源层通过代码分割、路由懒加载、Tree Shaking、图片压缩和懒加载减少首屏资源；渲染层提取关键 CSS、减少主线程 JS 执行，并使用骨架屏改善用户感知；服务端可以使用 SSR/SSG，让浏览器更早拿到可展示的 HTML。

> 最后通过 Chrome DevTools、Lighthouse、Performance 分析具体瓶颈，重点关注 FCP、LCP、TTFB、TBT、CLS 等指标。

- 文件优化

- 下载优化: 代码压缩

- 缓存策略

- 动画: 骨架屏，或 loading 动画

### 单页面和多页面的区别

> SPA 是 Single Page Application，通常整个应用只有一个 HTML，通过前端路由管理不同的页面状态和组件，路由切换时一般不会重新加载整个 HTML，因此交互体验比较流畅，但首屏资源可能比较大，SEO 也需要额外处理。MPA 是 Multi Page Application，不同页面通常对应不同的 HTML，页面跳转时需要向服务器请求新的页面，因此首屏可以比较快、SEO 相对友好，但页面切换会发生重新加载。

> SPA 更适合后台管理系统、Web App 等交互复杂的应用；MPA 更适合门户、新闻、电商等对 SEO 和独立页面访问要求较高的场景。需要注意 SPA/MPA 和 CSR/SSR 是两个不同维度的概念。

- html 加载: 单页面无论跳转多少个页面，都只加载一次 html；多页面则是跳转几个页面就加载几个 html

- 资源加载: 单页面会加载大部分的资源；多页面只会加载本页面需要的资源

- seo: 单页面 seo 爬虫的时候不能获取到相关页面内容；大部分多页面会把页面内容直接放到 html 中下发，这样就便于爬虫获取内容

- 单页面的流行: 单页面资源加载的缺点可以通过 js 或者 css 拆包的方式进行解决，seo 可以通过服务端渲染进行解决，React 还有 vue 框架的兴起可以使用组件以及 react-router 或者 vue-router 这类型的组件来维护页面

### 防抖和节流是什么，他们使用的场景都有哪些

> 防抖和节流都是用于处理高频事件、减少函数执行次数的性能优化手段。防抖是事件连续触发时不断重新计时，只有停止触发一段时间后才执行一次，因此适合搜索框输入、表单校验、窗口 resize、自动保存等只关心最终结果的场景。节流则是在一定时间间隔内最多执行一次，即使事件持续触发也会按照固定频率执行，因此适合 scroll、mousemove、拖拽等需要持续响应的高频事件。

> 简单来说，防抖是“只执行最后一次”，节流是“按照固定频率执行”。

防抖: 适合需要"等待用户操作停止后再执行"的结果，核心是"着重最后一次"

节流: 适合需要""控制执行频率的场景，核心是"限制单位时间内执行次数"

::code-group

```javascript [防抖]
function debounce(fn, delay) {
	let timer;

	return function (...args) {
		clearTimeout(timer);

		timer = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
}
```

```javascript [节流]
function throttle(fn, delay) {
	let lastTime = 0;

	return function (...args) {
		const now = Date.now();

		if (now - lastTime >= delay) {
			lastTime = now;
			fn.apply(this, args);
		}
	};
}
```

::

### 浏览器的事件循环机制

> JavaScript 在浏览器中主要运行在单线程上，为了处理异步任务，浏览器通过 Event Loop 机制协调调用栈、任务队列以及浏览器的 Web API。

> 同步代码会先在调用栈中执行，异步操作由浏览器提供的 Web API 处理，完成之后将对应回调放入任务队列。事件循环会不断检查调用栈，在当前任务执行完成后优先清空微任务队列，然后浏览器根据时机进行渲染，再执行后续任务。

> 常见宏任务包括 setTimeout、setInterval、DOM 事件等；常见微任务包括 Promise.then、async await、queueMicrotask 和 MutationObserver。因此一般情况下，当前宏任务执行结束后，会优先执行微任务，再进入下一个宏任务。

- 微任务: 比普通的宏任务队列优先级更高，所有微任务会在当前宏任务执行完毕后，下个宏任务才会执行

### 浏览器当中的线程以及进程

> 现代浏览器通常采用多进程架构，常见的包括浏览器主进程、渲染进程、GPU 进程、网络相关进程等，具体划分会根据浏览器版本和实现有所不同。

> 一个网页主要运行在渲染进程中，里面有 JavaScript 主线程以及其他负责事件、定时器、网络协作、Worker 等工作的线程。JavaScript 主线程主要负责 JS 执行，并参与 DOM、事件处理以及渲染相关工作。

> 浏览器采用多进程主要是为了实现稳定性、安全性和隔离性；采用多线程则是为了让不同类型的任务能够并行或异步处理，避免所有工作都阻塞在一个执行单元上。

> 普通页面的 JavaScript 主执行环境是单线程的，如果执行大量计算就会阻塞主线程，导致页面卡顿，因此可以使用 Web Worker 将计算任务放到其他线程执行。

**进程**: 操纵系统资源分配的最小单位(如内存、CPU 时间片)，进程间相互独立，通行成本高

**线程**: 进程内的执行单元(轻量级进程)，共享进程的资源，通信成本低

**主要进程**:

- 浏览器主进程: 浏览器的控制中心，可以协调其它的进程进行工作，管理全局的资源、前进以及后退

- 渲染进程: 网页渲染，生成可视化的界面

- 网络进程: 负责网络请求的进程

- GPU 进程: 负责图像渲染以及硬件加速

**渲染进程中的线程**: 每一个浏览器中的 tab 网页，都是一个单独的渲染进程

- 主线程: 执行 js 代码处理相关 DOM 以及 CSS，协调其它的线程

- 合成线程: 主要将页面不同的分层，图层，合并成最后的屏幕图像

- 绘制线程: 根据渲染树和图层信息，绘制每个图层的像素内容

- 定时器线程: setTimeout、setInteral

### 前端 web-worker 的使用

> Web Worker 是浏览器提供的后台线程 API，主要用于处理耗时的 JavaScript 计算，避免阻塞主线程。使用时首先通过 new Worker() 创建 Worker，然后主线程通过 postMessage() 向 Worker 发送数据，Worker 通过 self.onmessage 接收数据，计算完成后通过 self.postMessage() 把结果返回给主线程，主线程通过 onmessage 接收结果。Worker 不能直接操作 DOM，如果不再使用，可以通过 terminate() 销毁。

> Worker 和主线程之间默认通过结构化克隆传递数据，如果需要传输大量二进制数据，可以使用 Transferable Objects 来转移数据所有权。

前端是一个单线程的机制，如果有复杂的任务，执行时间过长，会阻塞页面的逻辑，造成页面卡顿。web-worker 的出现，提供了线程的机制，我们能够新建 worker 来完成复杂的请求

worker 和主线程的通信主要通过 postMessage 来完成

::code-group

```javascript [main.js]
const worker = new Worker("./worker.js");

worker.postMessage(1000000000);

worker.onmessage = event => {
	console.log("计算结果：", event.data);
};
```

```javascript [worker.js]
self.onmessage = event => {
	const num = event.data;

	let result = 0;

	for (let i = 0; i <= num; i++) {
		result += i;
	}

	self.postMessage(result);
};
```

::

- 值传递，而非引用传递: 发送数据给 worker 的时候，是需要把数据进行序列化，深拷贝操作的。值的传递是有性能损耗的。

- 值的类型: 包含基础类型 number、string 或者 obj

- Transferable Objects(可转移对象)

::warning

线程的限制

- 无法访问 DOM

- 同源的限制

- 需要考虑线程的数量

::

### 前端埋点是什么，发送需要注意哪些问题

> 前端埋点就是在用户使用 Web 应用的过程中采集用户行为和页面运行数据，例如页面访问、按钮点击、商品浏览、下单以及错误和性能数据，然后发送到后端的数据分析系统。

> 埋点可以通过代码埋点、可视化埋点和无埋点等方式实现。

> 在发送方面，首先要保证不影响核心业务和用户体验，一般采用异步发送和批量上报，减少 HTTP 请求数量；页面关闭时可以使用 navigator.sendBeacon 提高数据上报成功率。对于重要埋点，需要考虑网络异常导致的数据丢失，可以进行本地持久化和重试，同时通过 eventId 做幂等，避免重复上报。

> 另外还需要注意数据格式统一、数据大小、请求频率、超时、隐私保护和数据安全，敏感信息不能随意采集。最终原则就是：埋点是辅助业务的，不能反过来影响业务。

**埋点**: 在前端代码中嵌入统计代码或工具，追踪用户相关操作

- 业务相关埋点: 页面的 pv、元素的点击、曝光、任务埋点

- 页面性能&报错相关的前端页面埋点

**埋点的发送方式**

- 图片上报: 利用图片的 url 上面加上埋点信息，get 请求发送埋点。简单直接，没有任何跨域的问题。但无法进行埋点拓展，比如加密或者压缩，另外也对发送长度有限制

- 正常接口上报: 可拓展，可以进行压缩上报，或者加密上报。但有跨域的问题，另外页面关闭之前的埋点可能无法发送

- sendBeacon: 浏览器专门用于发送埋点的 api。简单，可以解决页面关闭(离开)之前发送埋点的问题。但无法拓展

### 如何进行白屏监控

> 白屏监控的核心是判断用户打开页面后，在一定时间内是否成功渲染出了有效内容。

> 一种常见方案是 DOM 采样检测，在页面的多个位置通过 document.elementsFromPoint() 获取元素，如果多个采样点都没有有效 DOM，并且超过一定时间阈值，就可以认为可能发生白屏。

> 为了避免页面正常加载过程中的误判，可以结合 MutationObserver 监听 DOM 的变化，在页面渲染出有效内容后停止检测。

> 同时还应该结合 PerformanceObserver 监控 FP、FCP、LCP，以及监听 window.onerror、unhandledrejection 和资源加载错误。因为很多白屏实际上是 JS 执行错误或者 JS/CSS Chunk 加载失败导致的。

> 最后将白屏事件以及 URL、路由、版本号、FCP、错误信息、资源 URL、设备和网络信息等上报到监控平台，用于告警和问题定位。

> 所以完整的白屏监控不是单纯检测 DOM，而是 DOM 采样 + 性能指标 + JS/资源错误 + 版本信息综合判断。

页面没有渲染的任何节点，导致页面直接白屏

- DOM 节点检测: 通过 `document.body.chileNodes` 监控相关的页面 DOM 节点是否存在，是否可见

- 渲染时间监控: 所有的元素加载完成作为起点，第一个元素渲染完成作为终点，这两个点的差值如果大过了某一个阈值，就说明大概率发生了白屏

- 页面报错监控: js 报错或关键资源的加载失败，相关的页面节点无法渲染

- 口技的指定:

### 页面重排和重绘的概念

> 重排和重绘都是浏览器渲染过程中可能发生的操作。

> 重排是元素的几何信息发生变化，例如宽高、位置、布局方式发生变化，浏览器需要重新计算页面布局。常见操作包括修改 width、height、margin、padding，添加删除 DOM，以及读取某些布局属性后导致强制同步布局。

> 重绘是元素的布局没有变化，只是视觉样式发生变化，例如修改 color、background-color 等，浏览器只需要重新绘制元素。

> 通常来说，重排的成本比重绘更高，因为重排可能影响其他元素的布局，并且通常会进一步触发重绘。

> 性能优化方面，可以通过批量修改 DOM、使用 class、避免频繁读写布局属性、读写分离，以及使用 transform 和 opacity 进行动画来减少重排和重绘。

**重排**: 是页面元素的变化，会导致页面重新对元素进行布局，并重绘

**重绘**: 就是元素本身背景页或颜色变化，重新绘制

**减少重排的策略**:

- 合并样式修改:

```javascript
document.style.width = "100px";
document.style.height = "200px";

// 优化后
document.cssText = "width: 100px; height: 200px;";
```

- 避免频繁读取布局属性(document.offsetWidth 等)

- 减少文档流中 DOM 操作

- 硬件加速

```css
.parent {
	transform: translateZ(0);
	will-change: transform;
}
```

### 浏览器渲染流程

> 浏览器首先解析 HTML 生成 DOM Tree，同时解析 CSS 生成 CSSOM，然后将 DOM 和 CSSOM 合并生成 Render Tree。接着进行 Layout，计算元素的几何信息；然后进行 Paint，将元素绘制成图层；最后由 Compositor 对各个图层进行合成，最终显示到屏幕上。

1. 解析 HTML: 从上到下读取 HTML 内容，遇到标签就构建 DOM 树

2. 解析 CSS: 当遇到 CSS(内联、`<style>` 或者 `<link>`)，都会并行构建 CSSDOM 树

3. 渲染页面: 等待 DOM 和 CSSDOM 都准备好，合并渲染树，会计算元素位置大小(布局)，并绘制到屏幕上

### JS 加载会阻塞浏览器渲染吗

> JS 加载是否阻塞浏览器渲染，要看加载方式。普通 script 会阻塞 HTML 解析，JS 的下载和执行都可能导致页面渲染延迟；async 下载不阻塞 HTML 解析，但下载完成后的执行会阻塞解析；defer 下载不阻塞解析，并在 HTML 解析完成后执行，因此通常推荐将业务脚本使用 defer。

会，而且默认是 "加载 + 执行" 双重阻塞，但不是所有情况都这样，关键看 JS 脚本的加载方式，位置和浏览器机制

JS 执行会阻塞 DOM 解析: 浏览器解析 HTML 时，一旦遇到 `<script>` 标签，都会立即停下 HTML 解析，转而去下载外部脚本并执行外部脚本

JS 执行会等待 CSSDOM: JS 代码里要操作 CSS 样式(`getComputedStyle(element)`)，浏览器会先检查 CSSDOM 有没有构建完。如果没有，会暂停 JS 执行等待 CSSDOM 就绪后再继续执行

- `defer`(延迟执行)

- `async`(异步执行)

### QPS 到达峰值如何处理

> QPS 到达峰值时，我一般会从几个层面处理。首先通过网关进行限流，例如令牌桶、漏桶等，避免流量超过系统承载能力；然后使用 Redis 等缓存减少数据库访问，对于突发流量可以通过 MQ 进行削峰填谷；如果是持续性的流量增长，则通过负载均衡进行水平扩容。同时对非核心功能进行降级，并对异常依赖进行熔断，防止故障扩散。数据库层面还可以通过读写分离、索引优化、分库分表等方式提高吞吐量。

> 整体思路就是：限流保护系统、缓存减少压力、MQ 削峰、扩容提高吞吐、降级保证核心业务、熔断避免雪崩。

::code-group

```javascript [控制并发]
const requestQueue = [];

let currentRunning = 0;

const MAX_CONCURRENT = 2;

function addToQueue(api, params, callback) {
	requestQueue.push({ api, params, callback });
	processQueue();
}

function processQueue() {
	if (currentRunning >= MAX_CONCURRENT || requestQueue.length === 0) return;

	currentRunning++;

	const { api, params, callback } = requestQueue.shift();

  fetch(api, P method: "POST", body: params)
    .then(res => res.json())
    .then(callback)
    .catch(err => console.error(err))
    .finally(() => {
      currentRunning--;
      processQueue();
    })
}

// 调用
addToQueue("/api/pay", {orderId: "xxx"}, (res) => {});
```

```javascript [缓存技术]
function requestWithCache(api, params, cacheTime = 300000) {
	const cacheKey = `${api}-${JSON.stringify(params)}`;
	const cachedData = localStorage.getItem(cacheKey);
	const caheTimeStamp = localStorage.getItem(`${cacheKey}_time`);

	// 缓存没有过期
	if (cachedData && caheTimeStamp && Date.now() - caheTimeStamp < cacheTime) {
		return Promise.reslove(JSON.parse(cachedData));
	}

	// 缓存已过期
	return fetch(api, { method: "POST", body: params })
		.then(res => res.json())
		.then(data => {
			localStorage.setIten(cacheKey, JSON.stringify(data));
			localStorage.setIten(`${cacheKey}_time`, Data.now().toString());
			return data;
		});
}
```

::

### 后端一次性返回树形结构数据，数据量非常大，前端该如何处理

**本质**: 数据量过大，给前端渲染压力过大，对内存压力过大

**解决方案**: 数据分片 + 分布渲染

```javascript
const treeData = []; // 后端返回超大数据
const renderBatchSize = 500; // 每批次渲染多少节点
let currentIndex = 0; // 当前渲染到索引

function flattenTree(data) {
	let result = [];

	data.forEach(node => {
		result.push(node);
    if(node.children && node.children.length){
      return = [..result, ...flattenTree(node.children)];
    }
	});

  return flattenTreeData;
}

const flattenData = flattenTree(treeData)

function renderBatch() {
  const endIndex = Math.min(currentIndex + renderBatchSize, flattenData.length);

  const batchData = flattenData.slice(currentIndex, endIndex);


  updateTreeData(batchData)

  currentIndex = endIndex;

  if(currentIndex < flattenData.length){
    requestIdleCallback(renderBatch); // 浏览器空闲时渲染，不会阻塞 JS 主进程
  }
}

renderBatch() // 启用分片渲染
```

### 浏览器对队头阻塞有什么优化

> 浏览器针对队头阻塞的优化主要经历了三个阶段：HTTP/1.1 中通过建立多个 TCP 连接，让不同请求分散到不同连接上，从而缓解队头阻塞；HTTP/2 引入多路复用，在一个 TCP 连接中使用多个 Stream，解决了 HTTP 层的队头阻塞，但由于底层仍然使用 TCP，一个数据包丢失会导致整个 TCP 连接上的 Stream 等待；HTTP/3 使用基于 UDP 的 QUIC，并通过独立 Stream 传输，使一个 Stream 的丢包不会阻塞其他 Stream，从而解决了 TCP 层的队头阻塞。

**队头阻塞**(Head-of-Line Blocking，HOL Blocking) 是指队列前面的请求/数据没有完成，导致后面的请求/数据即使已经准备好了，也无法继续处理

- HTTP1.1: 浏览器给同一个域名开个 TCP 链接(通常 6 个限制)，顺序排队响应

- HTTP2: 多路复用

### 你认为组件封装的一些基本准则是什么

> 我认为组件封装主要遵循几个原则：第一是单一职责，一个组件尽量只负责一类功能；第二是高内聚低耦合，组件内部逻辑集中，对外尽量通过明确的 Props、事件、Slot 等接口通信；第三是控制合理粒度，避免组件过大，也避免过度拆分；第四是保证一定的复用性和扩展性，不要把具体业务逻辑写死；第五是抽象稳定的共性，而不是为了复用强行抽象变化的业务；最后还需要考虑边界状态、样式隔离和可测试性。

> 核心思想就是：组件内部负责自己的事情，对外提供清晰稳定的接口，在复用性和复杂度之间取得平衡。

**核心准则**: 复用、稳定、已维护

- 单一职责: 组件只负责一件事，不做万能组件

- props 设计: 输入清晰要明确、可控、避免模糊不清的依赖；可选的 props 一定要提供默认值；不允许子组件直接修改 props

- 事件驱动: 一定要通过事件来通知，不要直接操作外部环境，保持解耦

- 样式隔离

- 可复用、可配置: 提取可变的部分

- 无副作用

### 如何减少项目里的 if else

> 减少项目中的 if else，我一般不会追求完全消灭条件判断，而是针对复杂分支进行重构。

> 简单条件可以使用卫语句，通过提前 return 减少嵌套；对于状态、类型等固定映射，可以使用对象或者 Map 配置代替大量 if else；对于不同业务行为，可以使用策略模式，把不同逻辑拆成独立策略；权限、菜单等场景可以采用配置驱动；如果业务状态转换比较复杂，可以使用状态机；如果是对象类型差异，则可以利用多态来消除类型判断。

> 核心思想是把不断增长的条件逻辑转换成数据配置、策略或者独立的业务对象，从而提高代码的可读性和扩展性。

::code-group

```javascript [三元运算符]
let result;
if (score >= 60) {
	result = "及格";
} else {
	result = "不及格";
}

// 优化后
const result = score >= 60 ? "及格" : "不及格";
```

```javascript [提前 return]
function calculateBonus(performance) {
	let bonus = 0;
	if (performance === "A") {
		bonus = 1000;
	} else {
		if (performance === "B") {
			bonus = 500;
		} else {
			bonus = 100;
		}
	}
	return bonus;
}

// 优化后
function calculateBonus(performance) {
	if (performance === "A") return 1000;
	if (performance === "B") return 500;
	return 100;
}
```

```javascript [固定值映射]
function getStatusText(status) {
	if (status === 0) return "待审核";
	if (status === 1) return "已通过";
	if (status === 2) return "已拒绝";
	if (status === 3) return "已撤销";
	return "位置状态";
}

// 优化后
const statusMap = {
	0: "待审核",
	1: "已通过",
	2: "已拒绝",
	3: "已撤销",
};
function getStatusText(status) {
	return statusMap[status] || "未知状态";
}
```

```javascript [策略模式]
const PaymentStrtegies = {
	wechat(amount) {
		return callWechatPayAPI(amount); // 业务逻辑
	},
	alipay(amount) {
		return callAlilpayAPI(amount);
	},
	card(amount) {
		return callCardPayAPI(amount);
	},
};

class PaymentContext {
	constructor(type) {
		this.strategy = PaymentStrtegies[type];

		if (!this.strategy) throw new Error("不支持的支付方式");
	}

	execute(amount) {
		return this.strategy(amount);
	}
}

const wechatPayment = new PaymentContext("wechat");

wechatPayment.execute(100); // 微信支付 100 元
```

::

## 工程化

### 同一个页面三个组件请求同一个 API

> 我会在公共请求层做请求去重，而不是修改组件本身。

> 具体来说，可以使用一个 Map 保存正在进行中的 Promise，以请求 URL、Method、Params 等生成唯一 key。

> 第一个组件请求时，如果 Map 中不存在这个 key，就真正发送 HTTP 请求，并把 Promise 放进去；后续组件请求相同接口时，发现 Map 中已经存在对应 Promise，就直接返回这个 Promise，从而让多个组件共享同一个请求。

> 请求完成后，在 finally 中删除 pending Promise。

> 如果还希望请求完成后的一段时间内继续复用结果，则可以进一步增加数据缓存，并配合 TTL、失效策略等。

```typescript
const pendingRequests = new Map<string, Promise<any>>();

function request(url: string, options?: RequestInit) {
	const key = `${options?.method || "GET"}:${url}`;

	// 已经有相同请求正在执行
	if (pendingRequests.has(key)) {
		return pendingRequests.get(key)!;
	}

	const promise = fetch(url, options)
		.then(res => res.json())
		.finally(() => {
			// 请求完成后删除
			pendingRequests.delete(key);
		});

	pendingRequests.set(key, promise);

	return promise;
}
```

axios 封装:

```typescript
const pendingMap = new Map<string, Promise<any>>();

function get(url: string, params?: any) {
	const key = `GET:${url}:${JSON.stringify(params || {})}`;

	const pending = pendingMap.get(key);

	if (pending) {
		return pending;
	}

	const promise = axios.get(url, { params }).finally(() => {
		pendingMap.delete(key);
	});

	pendingMap.set(key, promise);

	return promise;
}
```

### 前端构建中 CJS、ESM、UMD 等区别是什么

> CJS、ESM、UMD 本质上是不同的 JavaScript 模块规范或模块打包格式。CJS 使用 require 和 module.exports，传统上主要用于 Node.js；ESM 使用 import/export，是 JavaScript 官方标准，依赖关系静态可分析，因此更利于 Tree Shaking，也是现代前端构建的主流格式；UMD 则是为了兼容多种模块环境，把 CommonJS、AMD 和浏览器全局变量等方式统一封装。实际开发中，现代 Vite、Vue、React 项目通常优先使用 ESM，而组件库为了兼容不同消费环境，可能同时产出 ESM、CJS、UMD 等格式。

- CJS(CommonJS): Node.js 早期最常见的模块规范

- ESM(ES Modules): 现代 JavaScript 官方模块标准

- UMD(Universal Module Definition): 早于 ESM，既能在浏览器中使用，又能在非浏览器环境中使用(实质是把多种模块规范包装在一起)

::code-group

```javascript [CJS]
// math.js
module.exports = {
	add(a, b) {
		return a + b;
	},
};

const math = require("./math");
```

```javascript [ESM]
// math.js
export function add(a, b) {
	return a + b;
}

import { add } from "./math.js";
```

```javascript [UMD 本质]
(function (root, factory) {
	if (typeof module === "object" && module.exports) {
		// CommonJS
		module.exports = factory();
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	} else {
		// 浏览器
		root.MyLibrary = factory();
	}
})(this, function () {
	return {
		add(a, b) {
			return a + b;
		},
	};
});
```

::

### 前端权限管理的模型

> 前端权限管理最常见的是 RBAC，也就是基于角色的权限控制。基本关系是 User → Role → Permission，一个用户可以拥有多个角色，一个角色可以拥有多个权限。前端通常根据权限实现路由权限、菜单权限和按钮权限：路由权限控制用户能不能进入页面，菜单权限控制菜单是否展示，按钮权限控制具体操作是否展示或执行。

> 在实现上，可以登录后从后端获取用户角色和权限列表，然后统一封装 hasPermission，通过路由守卫、权限组件或者权限指令进行控制。如果系统需要更灵活的权限，也可以采用 ACL、ABAC 等模型。需要特别注意的是，前端权限主要用于 UI 控制，真正的安全权限校验必须由后端完成，不能因为前端隐藏了按钮就认为接口安全。

- ACL: 基于用户权限的管理模型
  - 好处: 只需要给当前的用户授权或者取消权限即可，清晰简单
  - 内部逻辑: user -> permission
  - 缺点: 用户量增长时正对每个用户都要维护记录，成本较高

- RBAC: 基于角色的权限管理模型
  - 特点: 权限与用户无关，用户通过角色关联权限
  - 内部逻辑: user -> role -> permission

- ABAC: 基于属性的权限管理模型
  - 优点: 可扩展性高

### peerDependencies

> peerDependencies 是 npm 中用于声明“宿主项目必须提供的依赖”的字段，常用于组件库、插件等场景。

> 比如一个 React 组件库依赖 React，我们通常不会把 React 放到 dependencies 中，而是放到 peerDependencies：

> dependencies 是包运行时自身需要的依赖，devDependencies 是开发和构建时需要的依赖，而 peerDependencies 是要求宿主项目提供的依赖。

```json
{
	"dependencies": {
		"lodash": "^4.17.21"
	},

	"devDependencies": {
		"typescript": "^5.0.0",
		"vite": "^7.0.0"
	},

	"peerDependencies": {
		"react": "^19.0.0",
		"react-dom": "^19.0.0"
	}
}
```

::tip

dependencies、devDependencies、peerDependencies 区别

- dependencies 运行时必须依赖，由 npm 自动安装

- devDependencies 开发/构建时需要，项目自己安装

- peerDependencies 要求宿主项目提供，由宿主项目安装

::

### pnpm 有什么优势

> pnpm 最大的优势是依赖复用和依赖隔离。它通过全局 Content-addressable Store 保存依赖，并通过硬链接、符号链接等方式让多个项目复用同一份依赖文件，因此相比传统 npm 安装方式可以显著减少磁盘占用，并提高安装速度。

> 另外 pnpm 的 node_modules 结构更加严格，可以减少幽灵依赖问题，强制项目声明自己真正使用的依赖。在 Monorepo 场景下，pnpm Workspace 也提供了很好的支持，所以现在很多大型前端项目和 Monorepo 项目都会选择 pnpm。

pnpm(performance npm) 速度快，节省磁盘空间

- 采用硬链接(hard link): 安装在 `~/pnpm-store` 中，允许同一个文件有多个有效的路径名称

- 建立非扁平化的 node_modules

::tip

幽灵依赖

项目代码使用了一个没有在自己 package.json 中声明的依赖，但因为其他依赖把它"带进来了"，所以项目暂时还能运行。

::

### ESlint 作用

> ESLint 是一个 JavaScript/TypeScript 静态代码检查工具，它通过解析源代码并结合各种规则，对代码进行静态分析，用于发现潜在错误、代码质量问题以及不符合团队规范的代码，同时支持部分问题的自动修复。

> 它和 Prettier 的定位不同，ESLint 更关注代码质量和规范，Prettier 主要负责代码格式化；TypeScript 则主要负责类型检查。在实际项目中通常会将 ESLint、Prettier、TypeScript 配合使用，并在 CI/CD 中执行 ESLint 检查，保证代码质量。

```javascript
const user = {
	name: "张三",
};

console.log(username); // 提示: 'username' is not defined
```

### ESlint 代码检查的过程

> ESLint 首先读取配置文件，根据配置选择 Parser 和 Rules；然后 Parser 将 JavaScript/TypeScript 源代码解析成 AST，ESLint 遍历 AST，并触发对应 Rule 对节点进行检查。如果发现问题，就通过 context.report() 收集诊断信息，最后经过 Formatter 格式化输出。使用 --fix 时，如果 Rule 提供了自动修复能力，ESLint 会根据 fix 信息修改源码，并重新进行检查。

1. 初始化 & 读配置: 向上找 `.eslintrc` 和 `package.json` eslintConfig 字段，就近原则合并；加载规则；`.eslintignore` 处理忽略文件

2. 解析代码，生成 AST: ESlint 并不直接读取代码，而是将代码转化成计算机能理解的抽象语法树(AST)

3. 遍历 AST，执行规则检查: 从根节点到子节点，逐个访问每个语法结构(变量、函数、条件语句)，并进行规则校验；每个规则都是一个小函数，判断 AST 每个节点是否触发规则，发现违规就记录下来

4. 输出结果 & 自动修复: 在终端打印违规信息，包含文件路径、行号、违规规则、错误描述；可通过 `eslint src/ --fix` 直接修改部分文件

### browserslist

> Browserslist 是一个用于配置项目浏览器兼容范围的工具。它本身不负责代码转换，而是为 Babel、Autoprefixer 等构建工具提供目标浏览器信息，从而决定 JavaScript 的转译程度、CSS 前缀以及 Polyfill 的处理范围。

配置方法：通常在 package.json

```json
{
	"browserslist": ["> 1%", "last 2 versions", "not dead"]
}
```

### Minify 代码压缩

> Minify 是前端构建阶段的代码压缩，通过删除空格、注释、换行，以及进行变量名压缩、代码优化等方式，在不改变程序功能的情况下减小 JS、CSS、HTML 等文件体积，从而降低网络传输成本。常见工具有 Terser、esbuild、SWC。它和 Tree Shaking 的区别是：Tree Shaking 主要删除未使用的代码，而 Minify 主要压缩保留下来的代码。

现代前端构建工具通常会自动完成

::code-group

```javascript [压缩前]
function calculateTotal(price, quantity) {
	const total = price * quantity;
	return total;
}
```

```javascript [压缩后]
function calculateTotal(a, b) {
	return a * b;
}
```

::

- 删除空格、换行、注释

- 删除无意义的字符

- 简化代码结构

- 删除不可达代码

- 变量名压缩(混淆)

- 合并声明

### package-lock.json

> package-lock.json 是 npm 生成的依赖锁文件，用于记录项目完整依赖树以及实际解析后的具体版本、依赖关系等信息。package.json 主要声明依赖及版本范围，而 package-lock.json 负责锁定最终安装结果，从而保证团队开发、CI/CD 和生产环境的依赖版本一致。普通项目应该将 package-lock.json 提交到 Git，CI 环境通常使用 npm ci 按 Lockfile 严格安装。

效果: 锁定版本，保证开发环境与生产环境保持一致

### serverless

> Serverless 是一种云计算架构模式，核心思想是开发者无需关注服务器的部署、运维和扩缩容，而是将业务代码以函数等形式部署到云平台，由平台负责底层基础设施。它具有自动扩缩容、按量计费、运维成本低等特点，但也存在冷启动、执行时间限制、无状态以及厂商锁定等问题。常见实现是 FaaS，例如 AWS Lambda、阿里云函数计算等。

Fass(function as a servie)(函数即服务)

Bass(backend as a service)(后端即服务)

### vite 对比 webpack 有什么优势

> Vite 最大的优势是开发环境的启动和 HMR 速度。Webpack 在开发过程中通常需要先构建整个依赖图并进行 Bundle，而 Vite 利用浏览器原生 ESM，开发时不需要对整个项目进行打包，只在浏览器请求模块时进行转换，因此启动速度更快。修改代码时，Vite 也可以基于 ESM 的模块边界进行局部更新，所以 HMR 更快，而且项目规模变大后性能下降没有传统 Bundle 模式那么明显。另外 Vite 配置更加简单，对 TypeScript、Vue、React 等现代前端技术支持也比较友好。

**开发阶段**:

- vite: 通过 `import`，这种模块机制，动态加载需要的 js 以及 css 文件，不会将所有文件进行打包；在开发阶段也会通过 esbuild 这个工具对第三方依赖包进行打包以及缓存。

**上线阶段**:

- vite: 通过 rollup 打包来进行上线的处理

vite 缺点: 开发环境正常运行，但是无法保证上线后不报错

webpack: 全量打包，dev 以及 build 环境一致，不会出现严重的 js 报错，这个也会导致 webpack dev 环境缓慢

### vite 和 webpack 在热更新上有什么区别

热更新(HMR)的本质是: 修改文件后，不刷新整个页面，只更新变化的部分

**webpack 热更新**: 源码 -> 找依赖 -> 重新打包 -> 替换 hundle

- webpack 要找到谁依赖了这个文件，找到依赖链后重新打包相关的模块

::detail

#title
具体示例
#default

当 `button.vue` 被 `page.vue` 引用，`page.vue` 又被 `main.js` 引用时，`button.vue` 自己和相关依赖的链上文件都重新编译，最终产出一个更新片段(hot update chunk)

重新打包完成后，再发送一个更新请求，浏览器里替换掉旧的 bundle，再触发一次组件重新渲染

::

**vite 热更新**: 精准定位 -> 单文件 -> 原生替换

- vite 通过 chokidar 直接监听文件变化

::detail

#title
具体示例
#default

修改 `button.vue` 后，vite 不分析依赖链，直接对 `button.vue` 进行编译，编译结果就是 ESM 文件

之后通过 webSocket 告诉浏览器 `button.vue` 变化，浏览器重新请求 `button.vue`，只替换这一个文件

::

::tip

vite 为什么快

vite 不全面打包，而是精准打包，并且依赖了原生 ESM 能力实现单文件的替换

webpack 分析依赖链，对于依赖链重新打包并重新生成 bundle 文件，并替换 bundle 文件重新渲染

::

### webpack loader

> Webpack 中 Loader 通过 module.rules 进行配置，通常通过 test 指定匹配的文件类型，通过 use 指定需要执行的 Loader。例如 SCSS 可以配置 style-loader、css-loader 和 sass-loader。多个普通 Loader 默认按照从右到左、从下到上的顺序执行，也就是数组中越靠右的 Loader 越先执行。Loader 本质上负责模块转换，而 Plugin 主要用于扩展 Webpack 的整体构建流程。

```javascript
module: {
	rules: [
		{
			test: /\.less$/,
			use: ["style-loader", "css-loader", "less-loader"],
		},
	];
}
```

**loader 的作用**: 主要是将非 js 等文件转换为 webpack 可以处理的模块，主要包括 css、image、file。loader 会将这些文件处理成 js 格式进行处理

**webpack loader 和插件的区别**:

- 作用的对象: loader 主要是文件转换，也就是编译阶段；插件是作用在打包的每一个环节，比如打包前、打包后、编译前、编译后等钩子节点
- 作用: loader 用于文件转换；插件用于扩展功能，主要是在各个生命周期扩展每一个生命周期的功能
- 本质: loader 是转换器；插件是扩展器

**文件相关 loader**:

```javascript
module: {
	rules: [
		{
			test: /\.(png|jpeg|gif|svg|ttf|woff2?)$/,
			use: [
				{
					loader: "url-loader",
					options: {
						limit: 10240, // 10kb 以下的转为 base64
						outputPath: "assets", //最终打包文件夹
						name: "[name].[hash:8].[ext]",
					},
				},
			],
		},
	];
}
```

**js loader**:

```javascript
{
  test: /\.(js|jsx)$/,
  exclude: "/node_modules/"
  use: [
    {
      loader: "babel-loader",
      options: {
        persets: [
          "@babel/preset-env", // 转 ES6 以上的语法为低级语法
          "@babel/preset-react" // 转 JSX
        ]
      },
    },
  ],
}
```

**vue/react loader**:

```javascript
{
  test: /\.vue$/,
  exclude: "/node_modules/"
  use: [
    {
      loader: "vue-loader",
    },
  ],
}
```

::tip

Loader 的执行顺序

Webpack Loader 默认从右往左执行，从下往上执行。

::

### babel-runtime 库的作用是什么

> babel-runtime 是 Babel 的运行时辅助库，用来提供 Babel 编译过程中产生的公共 helper。配合 @babel/plugin-transform-runtime 使用后，可以将原本重复注入到各个文件中的 helper 抽取出来，通过模块引用的方式复用，从而减少打包后的重复代码和体积，同时可以避免部分 polyfill 对全局环境的污染。

### 如何引入 antd 组件并支持按需加载

> Ant Design 在现代 React 项目中一般直接通过 ESM 方式引入，例如 import { Button } from 'antd'。

> 配合 Vite、Webpack、Next.js 等现代构建工具的 Tree Shaking，可以在构建阶段移除没有使用的代码，因此通常不需要额外配置 babel-plugin-import。

> 如果是以前的 Ant Design 项目，则可以通过 babel-plugin-import 将 import { Button } from 'antd' 转换成组件级别的引入，实现传统意义上的按需加载。

> 如果说的是运行时按需加载，则应该使用 import()、React.lazy 等实现代码分割和懒加载。

> 所以需要区分 组件按需引入、Tree Shaking 和运行时懒加载 这三个概念。

### 什么是前端微应用，不同的实现方式都是什么

> 前端微应用，也叫微前端，是一种将大型前端应用拆分成多个独立子应用的架构方式。每个子应用可以独立开发、独立部署，甚至可以使用不同的技术栈，最后由主应用进行组合。

> 常见实现方式主要有几种：

> 第一种是 iframe，隔离性最好，实现简单，但是通信、路由、用户体验和性能方面存在一些问题。

> 第二种是基于 single-spa、qiankun 的应用级微前端，由主应用根据路由加载和管理子应用，并通过生命周期管理子应用。

> 第三种是 Web Components，通过 Custom Elements 和 Shadow DOM 实现组件化和样式隔离，适合跨技术栈复用组件。

> 第四种是 Module Federation，通过运行时加载远程模块实现模块级共享，适合多个应用之间共享组件和业务模块。

> 另外还有构建时集成，比如把子应用发布成 npm 包，然后由主应用安装使用。

> 实际选择时，需要根据项目对隔离性、独立部署、技术栈兼容、模块共享以及性能的要求进行选择。

前端微应用架构核心是**把大前端项目拆分成多个独立小应用，再灵活组合使用**

**核心特点**:

- 独立开发部署: 每个小应用可单独开发、测试，不影响其它部分

- 灵活集成: 多个小应用能像搭积木一样，组合成完整的产品

- 互不干扰: 小应用间技术栈可不同，运行时互不冲突

### Webpack 项目中通过 script 标签引入资源，在项目中如何处理

> Webpack 项目中通过 script 标签引入资源，首先要看这个资源是否需要 Webpack 管理。

> 如果是 CDN 或者不需要打包的第三方资源，可以直接在 HTML 中使用 `<script>` 引入，Webpack 不会处理它。

> 如果希望资源参与 Webpack 的依赖分析、打包、Tree Shaking 等，则应该使用 import 引入。

> 对于通过 CDN 的第三方库，可以配合 Webpack 的 externals，让 Webpack 不把它打进 bundle，而是在运行时使用 `<script>` 加载的全局变量，从而减小打包体积。

**场景1**: 直接引入第三方库

::code-group

```html [public/index.html]
<script src="https://cdn.example.com/jquery.min.js"></script>
```

```javascript [webpack.config.js]
module.exports = {
	externals: {
		jquery: "jQuery",
	},
};
```

```javascript [xxx.js]
import $ from "jquery";

$(".app").show();
```

::

### 如何标准化处理线上用户反馈的问题

> 我们一般会把线上用户反馈标准化处理，首先统一收集问题，记录用户、环境、发生时间、操作步骤、截图以及错误信息，然后按照功能 Bug、性能、兼容性、数据等进行分类，并根据影响范围确定严重程度和优先级。

> 开发拿到问题后首先尝试复现，如果无法复现，就结合前端监控、浏览器 DevTools、网络请求和后端日志进行定位，判断是前端、后端、网络还是数据问题。定位后分析根因，而不是只修复表面现象。

> 修复完成后经过 Code Review 和测试环境验证，再进行线上发布。对于重要问题可以灰度发布，并通过错误率、接口失败率、白屏率等监控指标确认问题是否真正解决。对于严重或者重复发生的问题，还需要进行复盘，把解决方案沉淀为测试用例、监控告警或者开发规范，避免问题再次发生。

- 统一反馈入口: 产品页面里加意见反馈模块；应用商店，社群，汇总到一个统一的工单系统

- 分类: 功能异常、性能问题、需求建议、运营问题；

- 分级: 核心链路异常(10 分钟内响应 < 止损时间 < 2 小时修复) > 部分用户核心功能无法使用(30 分钟内响应 < 止损时间 < 24 小时修复) > 非和兴链路问题(24 小时内响应 < 止损时间 < 3 天修复) > 需求建议(48 小时响应，纳入需求池)

- 闭环处理: 接收登记、排查定位、处理解决、同步用户、关闭归档

- 沉淀复盘: 找到根因，出对应的预防方案，避免未来再次出现；更新知识库；优化产品

### 如何打包时运行 chunk，且在项目工程中，如何去加载这个运行时 chunk

> Webpack 的 runtime chunk 主要负责模块和 chunk 的运行时管理，例如模块映射、chunk ID 管理以及动态 import 对应 chunk 的加载。

> 在 Webpack 中可以通过 optimization.runtimeChunk: 'single' 将 runtime 单独抽成一个 chunk。构建之后会得到类似 runtime.xxx.js、main.xxx.js 和异步 chunk。

> 在项目运行时，通常由 HtmlWebpackPlugin 自动把 runtime chunk 注入 HTML，浏览器首先加载 runtime，然后加载业务入口 chunk。当业务代码执行 import() 时，runtime 会根据 chunk ID 计算资源 URL，并动态创建 script 标签加载对应的异步 chunk。

> 将 runtime 单独抽离的主要目的之一是优化缓存，业务代码发生变化时不一定需要重新下载 runtime。

::code-group

```javascript [webpack]
const path = require("path");

module.exports = {
	mode: "production",

	entry: "./src/index.js",

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[contenthash].js",
		chunkFilename: "[name].[contenthash].chunk.js",
	},

	optimization: {
		runtimeChunk: "single",
	},
};
```

```javascript [vite]
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				chunkFileNames: "js/[name]-[hash].js",
				entryFileNames: "js/[name]-[hash].js",
			},
		},
	},
});

// 使用
{
	/* <script src="runtime.js"></script>; */
}
```

::

### 如何禁止别人调试自己的前端页面代码

::code-group

```javascript [禁用右键菜单]
document.addEventListener("contextmenu", e => e.preventDefault());
```

```javascript [阻断开发者工具启动]
const initWidth = window.innerWidth;
const initHeight = window.innerHeight;

window.addEventListener("resize", {
  if(Math.abs(window.innerWidth - initWidth > 100) || Math.abs(window.innerHeight - initHeight) > 100){
    location.reload();
  }
})
```

::
