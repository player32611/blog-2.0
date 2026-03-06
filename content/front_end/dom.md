# DOM

::: danger 警告
该页面尚未完工!
:::

::: details 目录

[[toc]]

:::

## DOM 简介

DOM 的全称是 Document Object Model ，即文档对象模型，是一套对文档的内容进行抽象和概念化的方法，它是针对 HTML 和 XML 文档的一个 API （应用程序编程接口）描绘了一个层次化的节点树，允许开发人员添加，移除和修改页面的某一部分。

## DOM 文档

### 查找 HTML 元素

**document.getElementById(id)** : 通过元素 id 来查找元素

**document.getElementsByTagName(name)** : 通过标签名来查找元素

**document.getElementsByClassName(name)** : 通过类名来查找元素

**document.querySelector()、document.querySelectorAll()** : 通过CSS选择器字符串来查找元素

### 改变 HTML 元素

**element.innerHTML = new html content** : 改变元素的 inner HTML

**element.attribute = new value** : 改变 HTML 元素的属性值

**element.setAttribute(attribute, value)** : 改变 HTML 元素的属性值

**element.style.property = new style** : 改变 HTML 元素的样式

### 添加和删除元素

**document.createElement(element)** : 创建 HTML 元素

**document.removeChild(element)** : 删除 HTML 元素

**document.appendChild(element)** : 添加 HTML 元素

**document.replaceChild(element)** : 替换 HTML 元素

**document.write(text)** : 写入 HTML 输出流

## DOM 事件监听程序

**addEventListener()** 方法为指定元素指定事件处理程序，不会覆盖已有的事件处理程序。

**语法**

```JavaScript
element.addEventListener(event, function, useCapture);
```

第一个参数是事件的类型（比如 "click" 或 "mousedown"）。

第二个参数是当事件发生时我们需要调用的函数。

第三个参数是布尔值，指定使用事件冒泡还是事件捕获。此参数是可选的。

通过使用 **removeEventListener()** 方法轻松地删除事件监听器。

```JavaScript
element.removeEventListener("mousemove", myFunction);
```

## DOM 集合

getElementsByTagName() 方法返回 HTMLCollection 对象，是类数组的 HTML 元素列表（集合）。

```JavaScript
var x = document.getElementsByTagName("p");
```

**length** 属性定义了 HTMLCollection 中元素的数量

```JavaScript
var myCollection = document.getElementsByTagName("p");
document.getElementById("demo").innerHTML = myCollection.length;
```

**HTMLCollection 并非数组！**

HTMLCollection 也许看起来像数组，但并非数组。

您能够遍历列表并通过数字引用元素（就像数组那样）。

不过，您无法对 HTMLCollection 使用数组方法，比如 valueOf()、pop()、push() 或 join()。
