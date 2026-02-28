# HTML

::: danger 警告
该页面尚未完工!
:::

::: details 目录

[[toc]]

:::

## 常用元素标签

### a

a标签定义超链接，用于从一张页面链接到另一张页面。
a标签最重要的属性是 href 属性，它指示链接的目的地。

```html
<a href=""></a>
```

a标签具有多种独特属性，常用属性如下表：

|  属性  |                值                |            描述            |
| :----: | :------------------------------: | :------------------------: |
|  herf  |               URL                | 规定链接指向的页面的 URL。 |
| target | \_blank、\_parent、\_self、\_top | 规定在何处打开被链接文档。 |

同样的，a标签也支持全局属性与事件属性。

### div

最常用的标签之一，用于定义 HTML 文档中的分割或部分（分区或小节，division/section）。

```html
<div></div>
```

可以对其使用class或id等全局属性以及onclick等事件属性。

```html
<div id=""></div>
<div onclick=""></div>
```

div是块级元素。这意味着它的内容自动地开始一个新行。

### dl

dl标签定义了描述列表（又称定义列表，definition list），与dt（定义术语/名称）和dd（描述每个术语/名称）一起使用。

```html
<dl>
  <dt>计算机</dt>
  <dd>用来计算的仪器 ... ...</dd>
  <dt>显示器</dt>
  <dd>以视觉方式显示信息的装置 ... ...</dd>
</dl>
```

### form

form标签用于为接收用户输入创建 HTML 表单，元素可以包含以下一个或多个表单元素：input、textarea、button、select、option、optgroup、fieldset、label、output。

```html
<form>
  <label></label>
  <input />
</form>
```

### img

img标签用于在 HTML 页面中嵌入图像。<img> 标签有两个必需的属性：

src - 规定图像的路径

alt - 如果由于某种原因无法显示图像，则指定图像的替代文本

```html
<img src="" alt="" />
```

### ol

ol标签定义有序列表，有序列表可以是数字或字母顺序。使用li标签作为列表中的每一项。

```html
<ol>
  <li>有序</li>
  <li>列表</li>
</ol>
```

### select

select元素用于创建下拉列表，使用option标签定义下拉列表中的可用选项。

```html
<select>
  <option></option>
  <option></option>
  <option></option>
  <option></option>
</select>
```

### span

span标签是一个行内容器，用于标记文本的一部分，或文档的一部分。
与div类似，同样可以使用全局属性与事件属性，但div是块级元素，而span是行内元素。

```html
<span></span> <span id=""></span>
```

### table

table标签定义了 HTML 表格。
一个 HTML 表格由一个table元素和一个或多个tr、th和td元素组成：

```html
<table>
  <tr>
    <th>月份</th>
    <th>储蓄</th>
  </tr>
  <tr>
    <td>一月</td>
    <td>￥3400</td>
  </tr>
</table>
```

HTML 表格还可以包含以下元素：caption、colgroup、thead、tfoot、tbody。

```html
<table>
  <caption></caption>
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
```

### textarea

textarea标签定义多行文本输入控件。

```html
<textarea></textarea>
```

### ul

ul标签定义无序（带项目符号）列表，使用li标签作为列表的每一项。

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

## 文本标签

### 标题

```html
<h1>标题标签</h1>
<h2>标题标签</h2>
<h3>标题标签</h3>
<h4>标题标签</h4>
<h5>标题标签</h5>
<h6>标题标签</h6>
```

### 段落标签

```html
<p>段落标签</p>
```

### 换行标签

```html
<br />
```

### 加粗标签

```html
<strong></strong> <b></b>
```

### 倾斜标签

```html
<em></em> <i></i>
```

### 删除标签

```html
<del></del> <s></s>
```

### 下划线标签

```html
<ins></ins> <u></u>
```

## 文本符

### 空格符

```html
&nbsp
```

### 大于号

```html
&gt
```

### 小于号

```html
&lt
```

## 更多信息

更多标签请点击[此处](https://www.w3school.com.cn/tags/index.asp).
