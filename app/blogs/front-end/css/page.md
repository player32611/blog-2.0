# CSS

::: danger 警告
该页面尚未完工!
:::

::: details 目录

[[toc]]

:::

## 选择器

### 什么是选择器

CSS 选择器用于“查找”（或选取）要设置样式的 HTML 元素。我们可以将 CSS 选择器分为五类：

    简单选择器（根据名称、id、类来选取元素）

    组合器选择器（根据它们之间的特定关系来选取元素）

    伪类选择器（根据特定状态选取元素）

    伪元素选择器（选取元素的一部分并设置其样式）

    属性选择器（根据属性或属性值来选取元素）

### 简单选择器

**所有简单的 CSS 选择器**

|       选择器       |    示例    |             示例描述             |
| :----------------: | :--------: | :------------------------------: |
|       .class       |   .intro   | 选取所有 class="intro" 的元素。  |
|        #id         | #firstname | 选取 id="firstname" 的那个元素。 |
|         \*         |     \*     |          选取所有元素。          |
|      element       |     p      |        选取所有 p 元素。         |
| element,element,.. |   div, p   | 选取所有 div 元素和所有 p 元素。 |

::: info 备注

对于您还可以指定只有特定的 HTML 元素会受类的影响。在这个例子中，只有具有 class="center" 的 p 元素会居中对齐：

```css
p.center {
  text-align: center;
  color: red;
}
```

HTML 元素也可以引用多个类。在这个例子中，p 元素将根据 class="center" 和 class="large" 进行样式设置：

```html
<p class="center large">这个段落引用两个类。</p>
```

:::

### 组合器选择器

**所有 CSS 组合选择器**

|      选择器       |  示例   |                示例描述                |
| :---------------: | :-----: | :------------------------------------: |
|  element element  |  div p  |     选择 div 元素内的所有 p 元素。     |
|  element>element  | div > p | 选择其父元素是 div 元素的所有 p 元素。 |
|  element+element  | div + p |  选择所有紧随 div 元素之后的 p 元素。  |
| element1~element2 | p ~ ul  |   选择前面有 p 元素的每个 ul 元素。    |

### 伪类选择器

伪类用于定义元素的特殊状态。它可以用于：

    设置鼠标悬停在元素上时的样式

    为已访问和未访问链接设置不同的样式

    设置元素获得焦点时的样式

**常用的 CSS 伪类选择器**

|  选择器  |    示例     |          示例描述           |
| :------: | :---------: | :-------------------------: |
|  :focus  | input:focus | 选择获得焦点的 input 元素。 |
|  :hover  |   a:hover   |  选择鼠标悬停其上的链接。   |
|  :link   |   a:link    |  选择所有未被访问的链接。   |
| :visited |  a:visited  |   选择所有已访问的链接。    |

### 伪元素选择器

CSS 伪元素用于设置元素指定部分的样式，它可用于：

    设置元素的首字母、首行的样式
    在元素的内容之前或之后插入内容

伪元素的语法：

```css
selector::pseudo-element {
  property: value;
}
```

**::first-line** : 用于向文本的首行添加特殊样式。（只能应用于块级元素）

**::first-letter** : 用于向文本的首字母添加特殊样式。（只适用于块级元素）

**::before** : 用于在元素内容之前插入一些内容。

**::after** : 用于在元素内容之后插入一些内容。

**::selection** : 伪元素匹配用户选择的元素部分。

## 常用属性

### background

background 简写属性在一个声明中设置所有的背景属性，可以设置如下属性：background-color、background-position、background-size、background-repeat、background-origin、background-clip、background-attachment、background-image。如果不设置其中的某个值，也不会出问题。

```css
{
    background: #00FF00 url(bgimage.gif) no-repeat fixed top;
}
```

### border

border 简写属性在一个声明设置所有的边框属性。可以按顺序设置如下属性：border-width、border-style（必需）、border-color。如果不设置其中的某个值，也不会出问题。

```css
{
    border:5px solid red;
}
```

### border-radius

border-radius 属性定义元素角的半径，可以接受一到四个值。

```css
{
    border-radius: 15px 50px 30px 5px;//依次分别用于：左上角、右上角、右下角、左下角
}
{
    border-radius: 15px 50px 30px;//第一个值用于左上角，第二个值用于右上角和左下角，第三个用于右下角
}
{
    border-radius: 15px 50px;//第一个值用于左上角和右下角，第二个值用于右上角和左下角
}
{
    border-radius: 15px;//该值用于所有四个角，圆角都是一样的
}
```

### color

color 属性规定文本的颜色。

```css
{
    color:red;
}
{
    color:#00ff00;
}
{
    color:rgb(0,0,255);
}
```

### cursor

cursor 属性规定要显示的光标的类型（形状）。其常用属性值如下：

|    值     |                描述                |
| :-------: | :--------------------------------: |
|    url    |     需使用的自定义光标的 URL。     |
|  default  |     默认光标（通常是一个箭头）     |
|   auto    |      默认。浏览器设置的光标。      |
| crosshair |         光标呈现为十字线。         |
|  pointer  | 光标呈现为指示链接的指针（一只手） |

```css
{
    cursor:pointer;
}
```

### display

display 属性规定元素应该生成的框的类型。常用属性值如下：

|      值      |                         描述                         |
| :----------: | :--------------------------------------------------: |
|     none     |                  此元素不会被显示。                  |
|    block     |   此元素将显示为块级元素，此元素前后会带有换行符。   |
|    inline    | 默认。此元素会被显示为内联元素，元素前后没有换行符。 |
| inline-block |           行内块元素。（CSS2.1 新增的值）            |

```css
{
    display:none;
}
```

### float

float 属性定义元素在哪个方向浮动。以往这个属性总应用于图像，使文本围绕在图像周围，不过在 CSS 中，任何元素都可以浮动。浮动元素会生成一个块级框，而不论它本身是何种元素。

**注释**：假如在一行之上只有极少的空间可供浮动元素，那么这个元素会跳至下一行，这个过程会持续到某一行拥有足够的空间为止。

```css
{
    float:left;
}
{
    float:right;
}
```

### font

font 简写属性在一个声明中设置所有字体属性，可以按顺序设置如下属性：font-style、font-variant、font-weight、font-size/line-height、font-family。可以不设置其中的某个值，未设置的属性会使用其默认值。

```css
{
    font:italic arial,sans-serif;
}
```

### height

height 属性设置元素的高度，在内容区外面可以增加内边距、边框和外边距。

```css
{
    height:100px;
}
```

### margin

margin 简写属性在一个声明中设置所有外边距属性。该属性可以有 1 到 4 个值。

```css
{
    margin:10px 5px 15px 20px;//上外边距是10px，右外边距是5px，下外边距是15px，左外边距是20px。
}
{
    margin:10px 5px 15px;//上外边距是 10px，右外边距和左外边距是 5px，下外边距是 15px。
}
{
    margin:10px 5px;//上外边距和下外边距是 10px，右外边距和左外边距是 5px。
}
{
    margin:10px;//所有 4 个外边距都是 10px。
}
```

### opacity

opacity 属性设置元素的不透明级别，从 0.0 （完全透明）到 1.0（完全不透明）。

```css
{
    opacity:0.5;
}
```

### overflow

overflow 属性规定当内容溢出元素框时发生的事情，其属性值如下：

|   值    |                           描述                           |
| :-----: | :------------------------------------------------------: |
| visible |       默认值。内容不会被修剪，会呈现在元素框之外。       |
| hidden  |          内容会被修剪，并且其余内容是不可见的。          |
| scroll  | 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。 |
|  auto   | 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。 |
| inherit |         规定应该从父元素继承 overflow 属性的值。         |

```css
{
    overflow:hidden;
}
```

### padding

padding 简写属性在一个声明中设置所有内边距属性，与margin类似。

```css
{
    padding:10px 5px 15px 20px;
}
```

### position

position 属性规定元素的定位类型，其属性值如下：

|    值    |                                                                 描述                                                                 |
| :------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| absolute | 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 |
|  fixed   |           生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。           |
| relative |                   生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。                   |
|  static  |                     默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。                      |
| inherit  |                                               规定应该从父元素继承 position 属性的值。                                               |

```css
{
    position:fixed;
}
```

### resize

resize 属性规定是否可由用户调整元素的尺寸，长用于设置textarea。

**注释**：如果希望此属性生效，需要设置元素的 overflow 属性，值可以是 auto、hidden 或 scroll。

|     值     |             描述             |
| :--------: | :--------------------------: |
|    none    |   用户无法调整元素的尺寸。   |
|    both    | 用户可调整元素的高度和宽度。 |
| horizontal |    用户可调整元素的宽度。    |
|  vertical  |    用户可调整元素的高度。    |

```css
{
    resize:none;
}
```

### text-align

text-align 属性规定元素中的文本的水平对齐方式。

|   值    |                   描述                   |
| :-----: | :--------------------------------------: |
|  left   | 把文本排列到左边。默认值：由浏览器决定。 |
|  right  |            把文本排列到右边。            |
| center  |            把文本排列到中间。            |
| justify |          实现两端对齐文本效果。          |

```css
{
    text-align:center;
}
```

### width

width 属性设置元素的宽度。

```css
{
    weight:100px;
}
```

## Flex 布局

### 什么是 Flex 布局

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。在 Flexbox 布局模块（问世）之前，可用的布局模式有以下四种：

    块（Block），用于网页中的部分（节）

    行内（Inline），用于文本

    表，用于二维表数据

    定位，用于元素的明确位置

弹性框布局模块，可以更轻松地设计灵活的响应式布局结构，而无需使用浮动或定位。

### 使用 Flex 布局

如需开始使用 Flexbox 模型，您需要首先定义 Flex 容器，并将 display 属性设置为 flex。

```html
<div>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

```css
{
    display:flex;
}
```

### flex-direction

flex-direction 属性定义容器要在哪个方向上堆叠 flex 项目，即主轴的方向（项目的排列方向）。

|       值       |               描述               |
| :------------: | :------------------------------: |
|     column     |  垂直堆叠 flex 项目（从上到下）  |
| column-reverse | 垂直堆叠 flex 项目（但从下到上） |
|      row       |  水平堆叠 flex 项目（从左到右）  |
|  row-reverse   | 水平堆叠 flex 项目（但从右到左） |

```css
{
    flex-direction:row;
}
```

### flex-wrap

flex-wrap 属性规定是否应该对 flex 项目换行。

|      值      |            描述            |
| :----------: | :------------------------: |
|    nowrap    | 不对 flex 项目换行（默认） |
|     wrap     |    flex 项目将向下换行     |
| wrap-reverse |    flex 项目将向上换行     |

```css
{
    flex-wrap:nowrap;
}
```

### flex-flow

flex-flow 属性是用于同时设置 flex-direction 和 flex-wrap 属性的简写属性。

```css
{
    display: flex;
    flex-flow: row wrap;
}
```

### justify-content

justify-content 属性用于对齐 flex 项目，即决定项目在主轴上的对齐方式。

|      值       |                              描述                               |
| :-----------: | :-------------------------------------------------------------: |
|  flex-start   |                flex 项目在容器的开头对齐（默认）                |
|    center     |                    flex 项目在容器的中心对齐                    |
|   flex-end    |                    flex 项目在容器的末端对齐                    |
| space-between |            flex 项目在两端对齐，项目之间的间隔都相等            |
| space-around  | flex 项目两侧的间隔相等。项目之间的间隔比项目与边框的间隔大一倍 |

```css
{
    justify-content: center;
}
```

### align-items

align-items 属性用于垂直对齐 flex 项目，即决定项目在交叉轴上如何对齐

|     值     |                            描述                            |
| :--------: | :--------------------------------------------------------: |
|  stretch   | 如果项目未设置高度或设为auto，将占满整个容器的高度（默认） |
| flex-start |                      交叉轴的起点对齐                      |
|   center   |                      交叉轴的中点对齐                      |
|  flex-end  |                      交叉轴的终点对齐                      |
|  baseline  |              flex 项目的第一行文字的基线对齐               |

```css
{
    align-items: center;
}
```

## Grid布局

### 什么是 Grid 布局

CSS 网格布局模块（CSS Grid Layout Module）提供了带有行和列的基于网格的布局系统，它使网页设计变得更加容易，而无需使用浮动和定位。Flex 布局是一维布局，Grid 布局是二维布局。

### 使用 Grid 布局

Grid 布局由一个父元素以及一个或多个子元素组成。当 HTML 元素的 display 属性设置为 grid 或 inline-grid 时，它就会成为网格容器。行与列均从1开始编号。

```html
<div class="grid-container">
  <div></div>
  <div></div>
  <div></div>
</div>
```

```css
.grid-container {
  display: grid;
}
```

网格容器的所有直接子元素将自动成为网格项目。

### 定义行和列

**grid-template-columns** 属性定义网格布局中的列数，并可定义每列的宽度。

**grid-template-rows** 属性定义每列的高度。

```css
{
    grid-template-rows: 50px 50px;
    grid-template-columns: 50px 100px;
}
```

**fr** : fr 单位代表网格容器中可用空间的一等份。grid-template-columns:1fr 2fr 表示宽度分为两部分，分别为剩余宽度的 1/3 和 2/3。

**auto** :由浏览器决定长度。grid-template-columns: 100px auto 100px 表示第一第三列为 100px，中间由浏览器决定长度

```css
{
    grid-template-columns: 1fr 2fr;
}
{
    grid-template-columns: 100px auto 100px;
}
```

### 单元格的间隙

**row-gap** :设置行与行之间的间距（行间距）

**column-gap** :设置列与列之间的间距（列间距）

**gap** : column-gap 和 row-gap 的合并简写形式

```css
{
    row-gap:10px;
    column-gap:10px;
    gap:10px;
}
```

### 项目位置

**grid-column-start** :左边框所在的垂直网格线

**grid-column-end** :右边框所在的垂直网格线

**grid-row-start** :上边框所在的水平网格线

**grid-row-end** : 下边框所在的水平网格线

**grid-area** :速写属性

```css
{
    grid-area: 1 / 2 / 5 / 6;//从 row-line 1 和 column-line 2 开始，在 row-line 5 和 column line 6 结束
}
{
    grid-area: 2 / 1 / span 2 / span 3;//从 row-line 2 和 column-line 开始，并跨越 2 行和 3 列
}
```

## sass

### 什么是 sass

Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，这些拓展令 CSS 更加强大与优雅。使用 Sass 以及 Sass 的样式库（如 Compass）有助于更好地组织管理样式文件，以及更高效地开发项目。

### 安装 sass

使用 npm :

```
npm install -D sass-embedded
```

### sass 对 css 的功能扩展

点击[此处](https://www.sass.hk/docs/index.html)

## less

### 安装 less

使用 npm :

```
npm install less -D
```

### less 对 css 的功能扩展

点击[此处](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)

## 更多信息

更多信息请点击[此处](https://www.w3school.com.cn/cssref/index.asp).
