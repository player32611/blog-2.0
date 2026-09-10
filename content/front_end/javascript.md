# JavaScript

::danger

该页面尚未完工!

::

## 什么是 JavaScript

## 字符串

JavaScript 字符串用于存储和操作文本。

### 定义字符串

您能够使用单引号或双引号定义字符串。

```javascript
var carname = "Porsche 911";
var carname = "Porsche 911";
```

您可以在字符串中使用引号，只要不匹配围绕字符串的引号即可：

```javascript
var answer = "It's good to see you again!";
var answer = "He is called 'Bill'";
var answer = 'He is called "Bill"';
```

### 特殊字符

由于字符串必须由引号包围，JavaScript 会误解这段字符串：

```javascript
var y = "中国是瓷器的故乡，因此 china 与"China（中国）"同名。"
```

避免此问题的解决方法是，使用 \ 转义字符。

| 代码 | 结果 |  描述  |
| :--: | :--: | :----: |
|  \'  |  '   | 单引号 |
|  \"  |  "   | 双引号 |
| \ \  |  \   | 反斜杠 |

更改后如下所示：

```javascript
var x = '中国是瓷器的故乡，因此 china 与"China（中国）"同名。';
```

其他六个 JavaScript 中有效但在 HTML 中没有任何意义的转义序列：

| 代码 |    结果    |
| :--: | :--------: |
|  \b  |   退格键   |
|  \f  |    换页    |
|  \n  |    新行    |
|  \r  |    回车    |
|  \t  | 水平制表符 |
|  \v  | 垂直制表符 |

### 字符串方法

**length** 属性 : 返回字符串的长度

**indexOf()** 方法 : 返回字符串中指定文本首次出现的索引（位置）

**lastIndexOf()** 方法 : 返回指定文本在字符串中最后一次出现的索引

::tip

如果未找到文本， indexOf() 和 lastIndexOf() 均返回 -1。

::

**search()** 方法 : 搜索特定值的字符串，并返回匹配的位置

**slice()** 方法 : 提取字符串的某个部分并在新字符串中返回被提取的部分。该方法设置两个参数：起始索引（开始位置），终止索引（结束位置）。如果某个参数为负，则从字符串的结尾开始计数。

这个例子裁剪字符串中位置 7 到位置 13 的片段：

```javascript
var str = "Apple, Banana, Mango";
var res = str.slice(7, 13);
```

res 的结果是：

```javascript
Banana;
```

**substring()** 方法 : 类似于 slice() ，不同之处在于 substring() 无法接受负的索引。

**substr()** 方法 : 类似于 slice() ，不同之处在于第二个参数规定被提取部分的长度

**replace()** 方法 : 用另一个值替换在字符串中指定的值，不会改变调用它的字符串。它返回的是新字符串。默认地，replace() 只替换首个匹配。

```javascript
str = "Please visit Microsoft!";
var n = str.replace("Microsoft", "W3School");
```

**toUpperCase()** 方法: 把字符串转换为大写

**toLowerCase()** 方法 : 把字符串转换为小写

**concat()** 方法 : 连接两个或多个字符串。下面两行是等效的:

```javascript
var text = "Hello" + " " + "World!";
var text = "Hello".concat(" ", "World!");
```

**trim()** 方法 : 删除字符串两端的空白符

**charAt()** 方法 : 返回字符串中指定下标（位置）的字符串

**charCodeAt()** 方法 : 返回字符串中指定索引的字符 unicode 编码

**split()** 方法 : 将字符串转换为数组。如果省略分隔符，被返回的数组将包含 `index[0]` 中的整个字符串。如果分隔符是 ""，被返回的数组将是间隔单个字符的数组：

```javascript
var txt = "a,b,c,d,e"; // 字符串
txt.split(","); // 用逗号分隔
txt.split(" "); // 用空格分隔
txt.split("|"); // 用竖线分隔
```

**startsWith()** 方法 : 如果字符串以指定值开头则返回 true，否则返回 false

```javascript
let text = "Hello world, welcome to the universe.";
text.startsWith("Hello"); // true
```

**endsWith()** 方法 : 如果字符串以指定值结尾则返回 true，否则返回 false

```javascript
let text = "Hello world, welcome to the universe.";
text.endsWith("universe."); // true
```

**includes()** 方法 : 如果字符串包含指定值则返回 true，否则返回 false

```javascript
let text = "Hello world, welcome to the universe.";
text.includes("world"); // true
```

**repeat()** 方法 : 返回一个新字符串，其中包含指定次数的字符串副本

```javascript
let text = "Hello";
text.repeat(3); // "HelloHelloHello"
```

**padStart()** 方法 : 用另一个字符串填充当前字符串（从开头填充），直到结果字符串达到给定的长度

```javascript
let text = "5";
text.padStart(4, "0"); // "0005"
```

**padEnd()** 方法 : 用另一个字符串填充当前字符串（从末尾填充），直到结果字符串达到给定的长度

```javascript
let text = "5";
text.padEnd(4, "0"); // "5000"
```

**trimStart()** 方法 : 删除字符串开头的空白符

**trimEnd()** 方法 : 删除字符串结尾的空白符

**replaceAll()** 方法 : 用另一个值替换字符串中出现的所有指定值，返回一个新字符串，不会改变原始字符串

```javascript
let text = "I love cats. Cats are very easy to love.";
text.replaceAll("cats", "dogs");
// "I love dogs. Dogs are very easy to love."
```

**match()** 方法 : 根据正则表达式在字符串中搜索匹配项，并以数组形式返回匹配项

```javascript
let text = "The rain in SPAIN stays mainly in the plain";
text.match(/ain/g); // ["ain", "ain", "ain"]
```

**matchAll()** 方法 : 返回一个包含所有匹配正则表达式的结果及其捕获组的迭代器

```javascript
let text = "The rain in SPAIN stays mainly in the plain";
let matches = text.matchAll(/ain/g);
```

**localeCompare()** 方法 : 按本地特定顺序比较两个字符串，如果排序时字符串位于引用字符串之前返回 -1，之后返回 1，相等返回 0

```javascript
let a = "ab";
let b = "cd";
a.localeCompare(b); // -1
```

**String.fromCharCode()** 方法 : 将 Unicode 值转换为字符

```javascript
String.fromCharCode(72, 69, 76, 76, 79); // "HELLO"
```

**String.fromCodePoint()** 方法 : 返回使用指定的代码点序列创建的字符串

```javascript
String.fromCodePoint(72, 101, 108, 108, 111); // "Hello"
```

## 数组

### 定义数组

定义数组可用两种方法，这两种方法效果完全一样。

```javascript
var array-name = [item1, item2, ...];
var array-name = new Array(item1, item2, ...);
```

### 数组方法

**length** 属性 : 返回数组的长度（数组元素的数目）

**toString()** : 把数组转换为数组值（逗号分隔）的字符串

**join()** : 可将所有数组元素结合为一个字符串，但是您还可以规定分隔符

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
document.getElementById("demo").innerHTML = fruits.join(" * ");
```

**pop()** : 从数组中删除最后一个元素，并返回被删除的值

**push()** : （在数组结尾处）向数组添加一个新的元素，返回新数组的长度

**shift()** : 删除首个数组元素，并把所有其他元素“位移”到更低的索引，返回被删除的字符串

**unshift()** : （在开头）向数组添加新元素，并“反向位移”旧元素，返回新数组的长度

**splice()** : 用于向数组添加新项，返回一个包含已删除项的数组

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi");
```

    第一个参数（2）定义了应添加新元素的位置（拼接）。

    第二个参数（0）定义应删除多少元素。

    其余参数（“Lemon”，“Kiwi”）定义要添加的新元素。

**concat()** : 合并（连接）现有数组来创建一个新数组，不会更改现有数组。它总是返回一个新数组，并可以使用任意数量的数组参数

```javascript
var arr1 = ["Cecilie", "Lone"];
var arr2 = ["Emil", "Tobias", "Linus"];
var arr3 = ["Robin", "Morgan"];
var myChildren = arr1.concat(arr2, arr3); // 将arr1、arr2 与 arr3 连接在一起
```

**slice()** : 用数组的某个片段切出新数组并创建新数组，它不会从源数组中删除任何元素。可接受两个参数，从开始参数选取元素，直到结束参数（不包括）为止。如果结束参数被省略，则会切出数组的剩余部分

**indexOf()** : 在数组中搜索元素值并返回其位置。如果未找到项，则返回 -1；如果项出现多次，则返回第一次出现的位置

**lastIndexOf()** : 返回指定元素最后一次出现的位置

**Array.includes()** : 检查数组中是否包含某个元素（包括 NaN，与 indexOf 不同）

**find()** : 返回通过测试函数的第一个数组元素的值

```javascript
const numbers = [4, 9, 16, 25, 29];
let first = numbers.find(myFunction);

function myFunction(value, index, array) {
	return value > 18;
}
```

**findIndex()** : 返回通过测试函数的第一个数组元素的索引

```javascript
const numbers = [4, 9, 16, 25, 29];
let first = numbers.findIndex(myFunction);

function myFunction(value, index, array) {
	return value > 18;
}
```

**findLast()** : 从数组末尾开始搜索，并返回满足条件的第一个元素的值

**findLastIndex()** : 方法查找满足条件的最后一个元素的索引

**reverse()** : 反转数组中的元素

**Math.max.apply()** : 查找数组中的最高值

**Math.min.apply()** : 查找数组中的最低值

**forEach()** : 为每个数组元素调用一次函数（回调函数），接受 3 个参数：项目值、项目索引、数组本身

```javascript
var txt = "";
var numbers = [45, 4, 9, 16, 25];
numbers.forEach(myFunction);

function myFunction(value, index, array) {
	txt = txt + value + "<br>";
}
```

**map()** : 通过对每个数组元素执行函数来创建新数组，不会对没有值的数组元素执行函数，不会更改原始数组

```javascript
var numbers1 = [45, 4, 9, 16, 25];
var numbers2 = numbers1.map(myFunction);

function myFunction(value, index, array) {
	return value * 2;
}
```

**filter()** : 创建一个通过测试的数组元素组成的新数组，不会改变原始数组

```javascript
var numbers = [45, 4, 9, 16, 25];
var over18 = numbers.filter(myFunction);

function myFunction(value, index, array) {
	return value > 18;
}
// over18 结果为 [45, 25]
```

**reduce()** : 在每个数组元素上运行函数，以生成（减少它）单个值。该方法在数组中从左到右工作，它不会改变原始数组，可以接受一个初始值

```javascript
var numbers = [45, 4, 9, 16, 25];
var sum = numbers.reduce(myFunction, 0);

function myFunction(total, value, index, array) {
	return total + value;
}
// sum 结果为 99
```

**reduceRight()** : 与 reduce() 类似，不同之处在于它从数组的末尾（从右到左）开始工作

**every()** : 检查数组中的所有元素是否都通过测试，如果所有元素都通过则返回 true，否则返回 false

```javascript
var numbers = [45, 4, 9, 16, 25];
var allOver18 = numbers.every(myFunction);

function myFunction(value, index, array) {
	return value > 18;
}
// allOver18 结果为 false
```

**some()** : 检查数组中的某些元素是否通过测试，如果有元素通过则返回 true

```javascript
var numbers = [45, 4, 9, 16, 25];
var someOver18 = numbers.some(myFunction);

function myFunction(value, index, array) {
	return value > 18;
}
// someOver18 结果为 true
```

**sort()** : 对数组的元素进行排序，默认按字符串顺序排序，会改变原始数组。对数字排序时需要提供一个比较函数：

```javascript
var points = [40, 100, 1, 5, 25, 10];
points.sort(function (a, b) {
	return a - b; // 升序
}); // [1, 5, 10, 25, 40, 100]

points.sort(function (a, b) {
	return b - a; // 降序
}); // [100, 40, 25, 10, 5, 1]
```

**fill()** : 用一个固定值填充数组中从起始索引到终止索引（不包括）的全部元素，会改变原始数组

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("Kiwi", 1, 3);
// ["Banana", "Kiwi", "Kiwi", "Mango"]
```

**flat()** : 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回，不会改变原始数组

```javascript
var myArr = [
	[1, 2],
	[3, 4],
	[5, 6],
];
var newArr = myArr.flat();
// [1, 2, 3, 4, 5, 6]
```

**flatMap()** : 首先使用映射函数映射每个元素，然后将结果压缩成一个新数组，等同于 map() 后再 flat()

```javascript
var myArr = [1, 2, 3, 4, 5];
var newArr = myArr.flatMap(x => [x, x * 10]);
// [1, 10, 2, 20, 3, 30, 4, 40, 5, 50]
```

**at()** : 返回数组中指定索引的元素，接受负值，负值从数组末尾开始计数

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var fruit = fruits.at(2); // "Apple"
var last = fruits.at(-1); // "Mango"
```

**Array.isArray()** : 检查对象是否是数组，是则返回 true，否则返回 false

```javascript
Array.isArray([1, 2, 3]); // true
Array.isArray("hello"); // false
```

**Array.from()** : 从具有 length 属性或可迭代的对象创建一个新数组

```javascript
Array.from("ABCDEFG"); // ["A", "B", "C", "D", "E", "F", "G"]
Array.from([1, 2, 3], x => x * 2); // [2, 4, 6]
```

**Array.of()** : 通过可变数量的参数创建一个新数组，而不考虑参数的数量或类型

```javascript
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]
```

## 对象

### 对象属性

访问对象属性的语法为以下三种：

```javascript
objectName.property; // person.age
objectName["property"]; // person["age"]
objectName[expression]; // x = "age"; person[x]
```

**添加新属性** : 可以通过简单的赋值，向已存在的对象添加新属性

假设 person 对象已存在 - 那么您可以为其添加新属性：

```javascript
person.nationality = "English";
```

**删除属性** : delete 关键词从对象中删除属性

```javascript
var person = { firstName: "Bill", lastName: "Gates", age: 62, eyeColor: "blue" };
delete person.age; // 或 delete person["age"];
```

## Common JS 与 ES 模块

CommonJS 和 ES 模块（ESM）是 JavaScript 的两种模块系统，它们在语法、加载时机、特性等方面有明显区别。

::danger

该部分尚未完工!

::

## TypeScript

点击[此处](https://typescript.p6p.net/typescript-tutorial/intro.html)

## 更多信息

更多信息请点击[此处](https://www.w3school.com.cn/js/index.asp).
