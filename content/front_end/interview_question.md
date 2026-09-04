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

### 接口（interface）和类型别名（type）的区别

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
