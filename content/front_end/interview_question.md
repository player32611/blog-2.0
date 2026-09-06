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

### Fragments（<> </>）

> Fragment 是 React 提供的一种特殊组件，用于将多个元素组合起来，同时不会向真实 DOM 中增加额外的节点。它主要用于避免无意义的 DOM 包装，保持 HTML 结构和 DOM 层级的简洁。Fragment 可以使用 `<Fragment>` 或 `<>...</>` 简写；如果需要设置 key，则必须使用完整的 Fragment 写法。

**Fragment（片段）**用于让 React 在不增加额外 DOM 节点的情况下，返回多个元素

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
