# JavaScript

::: danger 警告
该页面尚未完工!
:::

::: details 目录

[[toc]]

:::

## 什么是 JavaScript

## 字符串

JavaScript 字符串用于存储和操作文本。

### 定义字符串

您能够使用单引号或双引号定义字符串。

```JavaScript
var carname = "Porsche 911";
var carname = 'Porsche 911';
```

您可以在字符串中使用引号，只要不匹配围绕字符串的引号即可：

```JavaScript
var answer = "It's good to see you again!";
var answer = "He is called 'Bill'";
var answer = 'He is called "Bill"';
```

### 特殊字符

由于字符串必须由引号包围，JavaScript 会误解这段字符串：

```JavaScript
var y = "中国是瓷器的故乡，因此 china 与"China（中国）"同名。"
```

避免此问题的解决方法是，使用 \ 转义字符。

| 代码 | 结果 |  描述  |
| :--: | :--: | :----: |
|  \'  |  '   | 单引号 |
|  \"  |  "   | 双引号 |
| \ \  |  \   | 反斜杠 |

更改后如下所示：

```JavaScript
var x = "中国是瓷器的故乡，因此 china 与\"China（中国）\"同名。"
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

::: info 信息
如果未找到文本， indexOf() 和 lastIndexOf() 均返回 -1。
:::

**search()** 方法 : 搜索特定值的字符串，并返回匹配的位置

**slice()** 方法 : 提取字符串的某个部分并在新字符串中返回被提取的部分。该方法设置两个参数：起始索引（开始位置），终止索引（结束位置）。如果某个参数为负，则从字符串的结尾开始计数。

这个例子裁剪字符串中位置 7 到位置 13 的片段：

```JavaScript
var str = "Apple, Banana, Mango";
var res = str.slice(7,13);
```

res 的结果是：

```JavaScript
Banana
```

**substring()** 方法 : 类似于 slice() ，不同之处在于 substring() 无法接受负的索引。

**substr()** 方法 : 类似于 slice() ，不同之处在于第二个参数规定被提取部分的长度

**replace()** 方法 : 用另一个值替换在字符串中指定的值，不会改变调用它的字符串。它返回的是新字符串。默认地，replace() 只替换首个匹配。

```JavaScript
str = "Please visit Microsoft!";
var n = str.replace("Microsoft", "W3School");
```

**toUpperCase()** 方法: 把字符串转换为大写

**toLowerCase()** 方法 : 把字符串转换为小写

**concat()** 方法 : 连接两个或多个字符串。下面两行是等效的:

```JavaScript
var text = "Hello" + " " + "World!";
var text = "Hello".concat(" ","World!");
```

**trim()** 方法 : 删除字符串两端的空白符

**charAt()** 方法 : 返回字符串中指定下标（位置）的字符串

**charCodeAt()** 方法 : 返回字符串中指定索引的字符 unicode 编码

**split()** 方法 : 将字符串转换为数组。如果省略分隔符，被返回的数组将包含 index [0] 中的整个字符串。如果分隔符是 ""，被返回的数组将是间隔单个字符的数组：

```JavaScript
var txt = "a,b,c,d,e";   // 字符串
txt.split(",");          // 用逗号分隔
txt.split(" ");          // 用空格分隔
txt.split("|");          // 用竖线分隔
```

## 数组

### 定义数组

定义数组可用两种方法，这两种方法效果完全一样。

```JavaScript
var array-name = [item1, item2, ...];
var array-name = new Array(item1, item2, ...);
```

### 数组方法

**length** 属性 : 返回数组的长度（数组元素的数目）

**toString()** : 把数组转换为数组值（逗号分隔）的字符串

**join()** : 可将所有数组元素结合为一个字符串，但是您还可以规定分隔符

```JavaScript
var fruits = ["Banana", "Orange","Apple", "Mango"];
document.getElementById("demo").innerHTML = fruits.join(" * ");
```

**pop()** : 从数组中删除最后一个元素，并返回被删除的值

**push()** : （在数组结尾处）向数组添加一个新的元素，返回新数组的长度

**shift()** : 删除首个数组元素，并把所有其他元素“位移”到更低的索引，返回被删除的字符串

**unshift()** : （在开头）向数组添加新元素，并“反向位移”旧元素，返回新数组的长度

**splice()** : 用于向数组添加新项，返回一个包含已删除项的数组

```JavaScript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi");
```

    第一个参数（2）定义了应添加新元素的位置（拼接）。

    第二个参数（0）定义应删除多少元素。

    其余参数（“Lemon”，“Kiwi”）定义要添加的新元素。

**concat()** : 合并（连接）现有数组来创建一个新数组，不会更改现有数组。它总是返回一个新数组，并可以使用任意数量的数组参数

```JavaScript
var arr1 = ["Cecilie", "Lone"];
var arr2 = ["Emil", "Tobias", "Linus"];
var arr3 = ["Robin", "Morgan"];
var myChildren = arr1.concat(arr2, arr3);   // 将arr1、arr2 与 arr3 连接在一起
```

**slice()** : 用数组的某个片段切出新数组并创建新数组，它不会从源数组中删除任何元素。可接受两个参数，从开始参数选取元素，直到结束参数（不包括）为止。如果结束参数被省略，则会切出数组的剩余部分

**indexOf()** : 在数组中搜索元素值并返回其位置。如果未找到项，则返回 -1；如果项出现多次，则返回第一次出现的位置

**lastIndexOf()** : 返回指定元素最后一次出现的位置

**Array.includes()** : 检查数组中是否包含某个元素（包括 NaN，与 indexOf 不同）

**find()** : 返回通过测试函数的第一个数组元素的值

```JavaScript
const numbers = [4, 9, 16, 25, 29];
let first = numbers.find(myFunction);

function myFunction(value, index, array) {
    return value > 18;
}
```

**findIndex()** : 返回通过测试函数的第一个数组元素的索引

```JavaScript
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

```JavaScript
var txt = "";
var numbers = [45, 4, 9, 16, 25];
numbers.forEach(myFunction);

function myFunction(value, index, array) {
    txt = txt + value + "<br>";
}
```

**map()** : 通过对每个数组元素执行函数来创建新数组，不会对没有值的数组元素执行函数，不会更改原始数组

```JavaScript
var numbers1 = [45, 4, 9, 16, 25];
var numbers2 = numbers1.map(myFunction);

function myFunction(value, index, array) {
  return value * 2;
}
```

## 对象

### 对象属性

访问对象属性的语法为以下三种：

```JavaScript
objectName.property           // person.age
objectName["property"]       // person["age"]
objectName[expression]       // x = "age"; person[x]
```

**添加新属性** : 可以通过简单的赋值，向已存在的对象添加新属性

假设 person 对象已存在 - 那么您可以为其添加新属性：

```JavaScript
person.nationality = "English";
```

**删除属性** : delete 关键词从对象中删除属性

```JavaScript
var person = {firstName:"Bill", lastName:"Gates", age:62, eyeColor:"blue"};
delete person.age;   // 或 delete person["age"];
```

## Common JS 与 ES 模块

CommonJS 和 ES 模块（ESM）是 JavaScript 的两种模块系统，它们在语法、加载时机、特性等方面有明显区别。

::: danger 警告

该部分尚未完工!

:::

## TypeScript

点击[此处](https://typescript.p6p.net/typescript-tutorial/intro.html)

## 更多信息

更多信息请点击[此处](https://www.w3school.com.cn/js/index.asp).
