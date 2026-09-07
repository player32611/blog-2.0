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

### this 指针?

### 闭包的概念?

### 原型与原型链?

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

### 用户角度的性能指标

> 从用户角度看，性能主要关注三个方面：加载速度、交互响应和视觉稳定性。加载速度可以通过 FCP、LCP 等指标衡量；交互响应主要关注 INP；视觉稳定性主要关注 CLS。除此之外，还需要关注用户的感知性能，比如是否快速看到首屏内容、是否能够尽早进行交互，而不仅仅是页面最终完全加载所需要的时间。

- FP(First Paint): 首次绘制，表示浏览器第一次绘制像素的时间

- FCP(First Contentful Paint): 首次内容绘制，表示页面第一次绘制出有实际内容的东西(文字、图片、SVG、Canvas)

- LCP(Largest Contentful Paint): 最大内容绘制，表示首屏中最大的主要内容元素完成渲染的时间

- INP(Interaction to Next Paint): 表示用户进行一次交互后，到浏览器完成下一次视觉更新之间的延迟

- CLS(Cumulative Layout Shift): 累计布局偏移，用于衡量页面加载过程中，元素是否发生意外移动

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

### 浏览器缓存

> 浏览器缓存主要分为强缓存和协商缓存。

> 强缓存主要通过 Cache-Control 和 Expires 控制，在缓存有效期内浏览器可以直接使用本地缓存，不需要向服务器发送请求。

> 当强缓存失效后，会进入协商缓存，主要通过 ETag/If-None-Match 和 Last-Modified/If-Modified-Since 判断资源是否发生变化。如果资源没有变化，服务器返回 304 Not Modified，浏览器继续使用本地缓存；如果发生变化，则返回 200 和新的资源。

> 在实际项目中，通常会对带 hash 的 JS、CSS、图片等静态资源设置长期缓存，而 HTML 设置较短缓存或 no-cache，从而实现缓存和资源更新之间的平衡。

> 一句话：强缓存不请求，协商缓存要请求；没变化 304，有变化 200。

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

- 减少不必要的组件渲染: 使用 `React.memo`，当组件的 props 没有变化时，可以避免重新渲染(对引用类型的 props 无效，除非使用 `useMemo` 包裹)

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

### 架构级优化

> 架构级优化主要不是针对某个组件进行优化，而是从整个应用的组件结构、状态管理、数据流和资源加载等方面降低更新成本。

> 首先是合理拆分组件和下放状态，缩小组件更新范围；其次可以使用发布订阅或者 Zustand、Redux 等状态管理方案，并结合 selector 做精确订阅，避免无关组件更新。

> 在资源层面，可以进行路由级代码分割、组件懒加载、Tree Shaking 和第三方库按需加载，减少首屏 JS 体积。

> 在数据层面，可以建立统一的数据请求和缓存层，避免重复请求，并使用分页、虚拟列表解决大数据量场景。

> 对于复杂计算，可以使用 Web Worker 将计算从主线程移出去；如果使用 Next.js，还可以结合 SSR、SSG、Streaming 等渲染策略优化首屏性能。

> 最终目标都是一样的：缩小更新范围、降低渲染成本、减少首屏资源、减少网络请求。

### 服务端渲染 SSR

> SSR，也就是服务端渲染，是指 React 在服务器端执行，将组件渲染成 HTML 后返回给浏览器。浏览器可以先展示服务器返回的 HTML，然后客户端加载 JavaScript，通过 Hydration 将 React 的事件和状态等能力绑定到已有的 HTML 上，使页面具备交互能力。

> SSR 的主要优势是可以更快返回页面内容，并且对于 SEO 友好，特别适合商品详情、新闻、博客等内容型页面。同时它也有缺点，比如增加服务器计算压力，并且存在 Hydration 成本和服务端与客户端环境不一致导致的 Hydration Mismatch 问题。

> 所以实际项目中一般会根据页面特点组合使用 CSR、SSR、SSG 和客户端渲染，而不是所有页面都使用 SSR。

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

## Vue

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
