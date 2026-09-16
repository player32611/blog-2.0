# Canvas

## 什么是 Canvas

HTML5 的 canvas 元素用于通过 JavaScript 绘制图形。canvas 元素本身只是一个绘图容器，真正的绘制需要通过 JavaScript 完成，它提供的是位图级的绘图 API。

### 创建 Canvas

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

获取绘图上下文：

```javascript
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
```

::tip

canvas 默认大小为 300 × 150 像素。请通过元素的 width 和 height 属性设置尺寸，而不是 CSS。使用 CSS 设置宽高只会拉伸画布，导致图像失真。

::

::warning

canvas 元素在不支持它的旧浏览器（如 IE8 及以下）中无法显示，可以在标签内放置替代内容作为降级方案。

::

### 坐标系

Canvas 坐标系原点位于画布左上角 (0, 0)，x 轴向右延伸，y 轴向下延伸。

## 绘制矩形

Canvas 提供三种矩形绘制方法：

**fillRect(x, y, width, height)** 方法 : 绘制一个填充的矩形

**strokeRect(x, y, width, height)** 方法 : 绘制一个矩形边框

**clearRect(x, y, width, height)** 方法 : 清除指定矩形区域，使其完全透明

```javascript
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75); // 填充红色矩形

ctx.strokeRect(0, 0, 150, 75); // 绘制边框

ctx.clearRect(20, 20, 40, 30); // 清除中间区域
```

## 绘制路径

路径是绘制复杂图形（直线、曲线、多边形）的基础。

**beginPath()** 方法 : 开始一条新的路径

**moveTo(x, y)** 方法 : 将画笔移动到指定坐标，不绘制线条

**lineTo(x, y)** 方法 : 从当前位置画一条直线到指定坐标

**closePath()** 方法 : 闭合路径，连接起点与终点

**stroke()** 方法 : 描边，绘制路径轮廓

**fill()** 方法 : 填充路径内部区域

```javascript
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.lineTo(0, 100);
ctx.closePath();
ctx.stroke();
```

::tip

每次绘制独立图形前，建议先调用 beginPath() 开启新路径，否则多次绘制的路径会相互影响。

::

### 绘制圆与弧线

**arc(x, y, r, startAngle, endAngle, anticlockwise)** 方法 : 绘制圆弧或圆。角度以弧度表示，anticlockwise 为 true 时逆时针绘制

```javascript
ctx.beginPath();
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.stroke();
```

::tip

角度与弧度的换算：`弧度 = 角度 * Math.PI / 180`。绘制整圆时结束角设为 `2 * Math.PI`。

::

### 绘制曲线

**quadraticCurveTo(cp1x, cp1y, x, y)** 方法 : 绘制二次贝塞尔曲线，需要一个控制点

**bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)** 方法 : 绘制三次贝塞尔曲线，需要两个控制点

```javascript
ctx.beginPath();
ctx.moveTo(20, 100);
ctx.quadraticCurveTo(100, 0, 200, 100);
ctx.stroke();
```

## 样式与颜色

### 颜色与透明度

**fillStyle** 属性 : 设置或返回用于填充的颜色、渐变或图案

**strokeStyle** 属性 : 设置或返回用于描边的颜色、渐变或图案

**globalAlpha** 属性 : 设置或返回绘图的全局透明度（0 ~ 1）

```javascript
ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 50);

ctx.globalAlpha = 0.5;
ctx.fillStyle = "red";
ctx.fillRect(60, 30, 100, 50);
```

### 渐变

**createLinearGradient(x0, y0, x1, y1)** 方法 : 创建线性渐变对象

**createRadialGradient(x0, y0, r0, x1, y1, r1)** 方法 : 创建径向渐变对象

**addColorStop(offset, color)** 方法 : 定义渐变的颜色停止点，offset 范围为 0 ~ 1

```javascript
var grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "red");
grd.addColorStop(1, "blue");
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 200, 100);
```

### 图案

**createPattern(image, repetition)** 方法 : 使用图片创建重复图案，repetition 可取 repeat、repeat-x、repeat-y、no-repeat

## 线条样式

**lineWidth** 属性 : 设置线条宽度（默认 1）

**lineCap** 属性 : 设置线条端点的样式，可取 butt（默认）、round、square

**lineJoin** 属性 : 设置线条拐角的样式，可取 miter（默认）、round、bevel

**setLineDash(array)** 方法 : 设置虚线样式

::code-group

```javascript [lineCap: round]
ctx.beginPath();
ctx.lineWidth = 10;
ctx.lineCap = "round";
ctx.moveTo(20, 20);
ctx.lineTo(120, 20);
ctx.stroke();
```

```javascript [lineJoin: round]
ctx.beginPath();
ctx.lineWidth = 10;
ctx.lineJoin = "round";
ctx.moveTo(20, 20);
ctx.lineTo(80, 80);
ctx.lineTo(140, 20);
ctx.stroke();
```

```javascript [虚线]
ctx.setLineDash([5, 5]);
ctx.beginPath();
ctx.moveTo(20, 20);
ctx.lineTo(120, 20);
ctx.stroke();
```

::

## 绘制文本

**font** 属性 : 设置字体，语法与 CSS font 类似

**textAlign** 属性 : 设置文本水平对齐方式（left、center、right 等）

**textBaseline** 属性 : 设置文本垂直对齐方式（top、middle、bottom 等）

**fillText(text, x, y)** 方法 : 绘制填充文本

**strokeText(text, x, y)** 方法 : 绘制文本边框

**measureText(text)** 方法 : 返回包含文本宽度的对象

```javascript
ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("Hello Canvas", 150, 75);
```

## 变换

变换用于平移、旋转和缩放画布。

**translate(x, y)** 方法 : 平移坐标系原点

**rotate(angle)** 方法 : 旋转坐标系，参数为弧度

**scale(x, y)** 方法 : 缩放坐标系

**save()** 方法 : 保存当前绘图状态（样式、变换等）

**restore()** 方法 : 恢复之前保存的绘图状态

::code-group

```javascript [旋转]
ctx.save();
ctx.translate(100, 100);
ctx.rotate(45 * Math.PI / 180);
ctx.fillRect(-25, -25, 50, 50);
ctx.restore();
```

```javascript [缩放]
ctx.save();
ctx.scale(2, 2);
ctx.fillRect(25, 25, 50, 50);
ctx.restore();
```

::

::tip

save() 与 restore() 成对使用，用于隔离临时变换。绘图状态保存在栈中，可嵌套保存与恢复。

::

## 绘制图像

**drawImage(image, x, y)** 方法 : 在指定位置绘制原图

**drawImage(image, x, y, width, height)** 方法 : 缩放绘制图像

**drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)** 方法 : 裁剪源图的一部分绘制到目标区域

```javascript
var img = new Image();
img.onload = function () {
	ctx.drawImage(img, 0, 0, 200, 100);
};
img.src = "example.jpg";
```

::warning

drawImage 需要在图片加载完成后再调用，否则无法绘制。务必在图片的 onload 回调中执行绘制。

::

### 像素操作

**getImageData(x, y, width, height)** 方法 : 返回指定区域的像素数据

**putImageData(imgData, x, y)** 方法 : 将像素数据写回画布

**createImageData(width, height)** 方法 : 创建空白的像素数据

```javascript
var imageData = ctx.getImageData(0, 0, 200, 100);
// imageData.data 为包含 RGBA 的 Uint8ClampedArray
```

::danger

对跨域图片调用 getImageData() 会使画布「被污染」（tainted），并抛出 SecurityError 异常。加载跨域图片时必须设置图片的 crossOrigin 属性，并确保服务器返回正确的 CORS 头。

::

## 合成与裁剪

**globalCompositeOperation** 属性 : 设置新图形与已有图形的合成方式，如 source-over（默认）、destination-over、lighter、multiply 等

**clip()** 方法 : 把当前路径作为裁剪区域，之后的绘制只在裁剪区域内生效

```javascript
ctx.beginPath();
ctx.arc(100, 100, 50, 0, 2 * Math.PI);
ctx.clip();
// 之后绘制的内容只会显示在圆形区域内
```

## 阴影

**shadowColor** 属性 : 设置阴影颜色

**shadowBlur** 属性 : 设置阴影模糊程度

**shadowOffsetX / shadowOffsetY** 属性 : 设置阴影偏移量

```javascript
ctx.shadowColor = "gray";
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.fillRect(20, 20, 100, 60);
```

## 其他常用 API

**canvas.width / canvas.height** 属性 : 获取或设置画布尺寸

**toDataURL(type)** 方法 : 将画布内容导出为图片的 base64 数据

**toBlob(callback, type)** 方法 : 将画布内容导出为 Blob 对象

```javascript
var dataURL = canvas.toDataURL("image/png");
```

::warning

重新设置 canvas.width 或 canvas.height 会清空画布上的所有内容。

::

## 动画

Canvas 常配合 requestAnimationFrame 制作动画，基本思路是清除画布、重新绘制、循环调用：

```javascript
var x = 0;
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillRect(x, 50, 30, 30);
	x += 2;
	if (x > canvas.width) x = 0;
	requestAnimationFrame(draw);
}
draw();
```

::tip

requestAnimationFrame 会在浏览器下一次重绘前调用回调函数，通常每秒约 60 次，比 setInterval 更适合做动画，且页面不可见时会自动暂停。

::
