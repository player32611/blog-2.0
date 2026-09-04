# 前端面试题

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

对于接口兼容性：只有目标 X 中的声明的类型属性变量在原类型 Y 中都存在，就可以说**类型 X 兼容类型 Y**

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

- `files`：精确指定需要编译的文件

- `include`：指定需要编译的文件

- `exclude`：排除不需要编译的文件：

- `compileOnSave`：当文件保存时，是否自动触发 TypeScript 编译

- `extends`：用来让一个 TS 配置文件继承另一个 TS 配置文件

- `compilerOptions`：编译核心配置项
  - `target`：指定编译后的 JavaScript 版本
  - `module`：指定生成的 JavaScript 使用什么模块规范
  - `moduleResolution`：指定 TypeScript 如何查找模块
  - `strict`：是否开启严格类型检查

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
