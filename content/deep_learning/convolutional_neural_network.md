# 卷积神经网络

> **卷积神经网络**（Convolutional Neural Network，CNN）被用于图像识别、语音识别等各种场合，在图像识别的比赛中，基于深度学习的方法几乎都以 CNN 为基础。

::: details 目录

[[toc]]

:::

## 整体结构

CNN 和之前介绍的神经网络一样，可以像乐高积木一样通过组装层来构建。不过，CNN 中新出现了**卷积层**（Convolution 层）和**池化层**（Pooling 层）。

之前介绍的神经网络中，相邻层的所有神经元之间都有连接，这称为**全连接**（fully-connected），并用 Affine 层实现了全连接层。

![基于全连接层（Affine 层）的网络的例子](/images/deep-learning/convolutional-neural-network/fully-connected.png)

> 全连接的神经网络中，Affine 层后面跟着激活函数 ReLU 层（或者 Sigmoid 层）。
>
> 这里堆叠了 4 层 “Affine-ReLU” 组合，然后第 5 层是 Affine 层，最后由 Softmax 层输出最终结果（概率）。

那么，CNN 会是什么样的结构呢：

![基于 CNN 的网络的例子](/images/deep-learning/convolutional-neural-network/cnn-struct.png)

> 新增了 Convolution 层和 Pooling 层（用灰色的方块表示）

CNN 中新增了 Convolution 层和 Pooling 层。CNN 的层的连接顺序是 “Convolution-ReLU-(Pooling)”（Pooling 层有时会被省略）。这可以理解为之前的 “Affine - ReLU” 连接被替换成了 “Convolution-ReLU-(Pooling)” 连接。

还需要注意的是，靠近输出的层中使用了之前的 “Affine-ReLU” 组合。此外，最后的输出层中使用了之前的 “Affine-Softmax” 组合。这些都是一般的 CNN 中比较常见的结构。

## 卷积层

### 全连接层存在的问题

之前介绍的全连接的神经网络中使用了全连接层（Affine 层）。在全连接层中，相邻层的神经元全部连接在一起，输出的数量可以任意决定。

但这样的话数据的形状被 “忽视” 了。比如，输入数据是图像时，图像通常是高、长、通道方向上的 3 维形状。但是，向全连接层输入时，需要将 3 维数据拉平为 1 维数据。

使用了 MNIST 数据集的例子中，输入图像就是 1 通道、高 28 像素、长 28 像素的（1,28,28）形状，但却被排成 1 列，以 784 个数据的形式输入到最开始的 Affine 层。

图像是 3 维形状，这个形状中应该含有重要的空间信息。比如，空间上邻近的像素为相似的值、RBG 的各个通道之间分别有密切的关联性、相距较远的像素之间没有什么关联等，3 维形状中可能隐藏有值得提取的本质模式。

但是，因为全连接层会忽视形状，将全部的输入数据作为相同的神经元（同一维度的神经元）处理，所以无法利用与形状相关的信息。

而卷积层可以保持形状不变。当输入数据是图像时，卷积层会以 3 维数据的形式接收输入数据，并同样以 3 维数据的形式输出至下一层。因此，在 CNN 中，可以（有可能）正确理解图像等具有形状的数据。

另外，CNN 中，有时将卷积层的输入输出数据称为**特征图**（featuremap）。其中，卷积层的输入数据称为**输入特征图**（input feature map），输出数据称为**输出特征图**（output feature map）。

### 卷积运算

卷积层进行的处理就是**卷积运算**。卷积运算相当于图像处理中的 “滤波器运算”。

我们来看一个具体的例子：

卷积运算对输入数据应用滤波器。在这个例子中，输入数据是有高长方向的形状的数据，滤波器也一样，有高长方向上的维度。假设用（height, width）表示数据和滤波器的形状，则在本例中，输入大小是 (4, 4)，滤波器大小是 (3, 3)，输出大小是 (2, 2)。

![卷积运算的例子](/images/deep-learning/convolutional-neural-network/convolution-operation.png)

> 仅应用滤波器

现在来解释一下图中的卷积运算例子都进行了什么样的计算：

![卷积运算的计算顺序](/images/deep-learning/convolutional-neural-network/convolution-operation-calculation.png)

对于输入数据，卷积运算以一定间隔滑动滤波器的窗口并应用。这里所说的窗口是指图中灰色的 3×3 的部分，将各个位置上滤波器的元素和输入的对应元素相乘，然后再求和（有时将这个计算称为**乘积累加运算**）。然后，将这个结果保存到输出的对应位置。将这个过程在所有位置都进行一遍，就可以得到卷积运算的输出。

在全连接的神经网络中，除了权重参数，还存在偏置。CNN 中，滤波器的参数就对应之前的权重。并且，CNN 中也存在偏置：

![卷积运算的偏置：向应用了滤波器的元素加上某个固定值（偏置）](/images/deep-learning/convolutional-neural-network/convolution-operation-bias.png)

上图在应用了滤波器的基础上加上了偏置。偏置通常只有 1 个（1×1），这个值会被加到应用了滤波器的所有元素上。

### 填充

在进行卷积层的处理之前，有时要向输入数据的周围填入固定的数据（比如 0 等），这称为**填充**（padding），是卷积运算中经常会用到的处理。

比如，对大小为 (4, 4) 的输入数据应用了幅度为 1 的填充。“幅度为 1 的填充” 是指用幅度为 1 像素的 0 填充周围：

![卷积运算的填充处理：向输入数据的周围填入 0](/images/deep-learning/convolutional-neural-network/convolution-operation-padding.png)

> 图中用虚线表示填充，并省略了填充的内容 “0”

通过填充，大小为 (4, 4) 的输入数据变成了 (6, 6) 的形状。然后，应用大小为 (3, 3) 的滤波器，生成了大小为 (4, 4) 的输出数据。

如果将填充设为 2，则输入数据的大小变为 (8, 8)；如果将填充设为 3，则大小变为 (10, 10)。

::: tip 为什么要使用填充

使用填充主要是为了调整输出的大小。

比如，对大小为 (4, 4) 的输入数据应用 (3, 3) 的滤波器时，输出大小变为 (2, 2)，相当于输出大小比输入大小缩小了 2 个元素。

这在反复进行多次卷积运算的深度网络中会成为问题。因为如果每次进行卷积运算都会缩小空间，那么在某个时刻输出大小就有可能变为 1，导致无法再应用卷积运算。

为了避免出现这样的情况，就要使用填充。

在刚才的例子中，将填充的幅度设为1，那么相对于输入大小(4,4)，输出大小也保持为原来的(4,4)。因此，卷积运算就可以在保持空间大小不变的情况下将数据传给下一层。

:::

### 步幅

应用滤波器的位置间隔称为**步幅**（stride）。

之前的例子中步幅都是 1，如果将步幅设为 2，则应用滤波器的窗口的间隔变为 2 个元素：

![步幅为2的卷积运算的例子](/images/deep-learning/convolutional-neural-network/convolution-operation-stride.png)

> 对输入大小为 (7, 7) 的数据，以步幅 2 应用了滤波器。通过将步幅设为 2，输出大小变为 (3, 3)。

像这样，步幅可以指定应用滤波器的间隔。

综上，**增大步幅后，输出大小会变小**。而**增大填充后，输出大小会变大**。

假设输入大小为 ($H$,$W$)，滤波器大小为 ($FH$,$FW$)，输出大小为 ($OH$,$OW$)，填充为 $P$，步幅为 $S$，则输出大小可通过下式进行计算：

$$OH = \frac{H + 2P - FH}{S} + 1$$

$$OW = \frac{W + 2P - FW}{S} + 1$$

::: details 具体示例

输入大小：(4, 4)；填充：1；步幅：1；滤波器大小：(3, 3)

$$OH = \frac{4 + 2 \times 1 - 3}{1} + 1 = 4$$

$$OW = \frac{4 + 2 \times 1 - 3}{1} + 1 = 4$$

输入大小：(7, 7)；填充：0；步幅：2；滤波器大小：(3, 3)

$$OH = \frac{7 + 2 \times 0 - 3}{2} + 1 = 3$$

$$OW = \frac{7 + 2 \times 0 - 3}{2} + 1 = 3$$

输入大小：(28, 31)；填充：2；步幅：3；滤波器大小：(5, 5)

$$OH = \frac{28 + 2 \times 2 - 5}{3} + 1 = 10$$

$$OW = \frac{31 + 2 \times 2 - 5}{3} + 1 = 11$$

:::

::: warning 注意

虽然只要代入值就可以计算输出大小，但是所设定的值必须使 $\frac{W + 2P - FW}{S}$ 和 $\frac{H + 2P - FH}{S}$ 分别可以除尽。

当输出大小无法除尽时（结果是小数时），需要采取报错等对策。

根据深度学习的框架的不同，当值无法除尽时，有时会向最接近的整数四舍五入，不进行报错而继续运行。

:::

### 3 维数据的卷积运算

之前的卷积运算的例子都是以有高、长方向的 2 维形状为对象的。

但是，图像是 3 维数据，除了高、长方向之外，还需要处理通道方向。

这里，我们按照与之前相同的顺序，看一下对加上了通道方向的 3 维数据进行卷积运算的例子：

![对 3 维数据进行卷积运算的例子](/images/deep-learning/convolutional-neural-network/convolution-operation-3d.png)

> 对 3 维数据进行卷积运算的例子

![对 3 维数据进行卷积运算的计算顺序](/images/deep-learning/convolutional-neural-network/convolution-operation-3d-calculation.png)

> 对 3 维数据进行卷积运算的计算顺序

和 2 维数据时相比，可以发现纵深方向（通道方向）上特征图增加了。

通道方向上有多个特征图时，会按通道进行输入数据和滤波器的卷积运算，并将结果相加，从而得到输出。

::: warning 注意

在 3 维数据的卷积运算中，输入数据和滤波器的通道数要设为相同的值。

:::

### 结合方块思考

将数据和滤波器结合长方体的方块来考虑，3 维数据的卷积运算会很容易理解。

![结合方块思考卷积运算](/images/deep-learning/convolutional-neural-network/convolution-operation-3d-block.png)

> 方块是如图所示的 3 维长方体。
>
> 请注意方块的形状

把 3 维数据表示为多维数组时，书写顺序为（channel, height, width）。比如，通道数为 $C$、高度为 $H$、长度为 $W$ 的数据的形状可以写成（$C$, $H$, $W$）。

滤波器也一样，要按（channel, height, width）的顺序书写。比如，通道数为 $C$、滤波器高度为 $FH$（FilterHeight）、长度为 $FW$（Filter Width）时，可以写成（$C$, $FH$, $FW$）。

在这个例子中，数据输出是 1 张特征图。换句话说，就是通道数为 1 的特征图。

如果要在通道方向上也拥有多个卷积运算的输出，就需要用到多个滤波器（权重）：

![基于多个滤波器的卷积运算的例子](/images/deep-learning/convolutional-neural-network/convolution-operation-3d-multiple-filters.png)

通过应用 $FN$ 个滤波器，输出特征图也生成了 $FN$ 个。如果将这 $FN$ 个特征图汇集在一起，就得到了形状为 ($FN$, $OH$, $OW$)的方块。将这个方块传给下一层，就是 CNN 的处理流。

因此，关于卷积运算的滤波器，也必须考虑滤波器的数量。作为 4 维数据，滤波器的权重数据要按 (output_channel, input_channel, height, width) 的顺序书写。比如，通道数为 3、大小为 5×5 的滤波器有 20 个时，可以写成 (20, 3, 5, 5)。

如果进一步追加偏置的加法运算处理：

![卷积运算的处理流（追加了偏置项）](/images/deep-learning/convolutional-neural-network/convolution-operation-3d-block-with-bias.png)

> 每个通道只有一个偏置。这里，偏置的形状是 ($FN$, 1, 1)，滤波器的输出结果的形状是 ($FN$, $OH$, $OW$)。

这两个方块相加时，要对滤波器的输出结果 ($FN$, $OH$, $OW$) 按通道加上相同的偏置值。

### 批处理

神经网络的处理中进行了将输入数据打包的批处理。之前的全连接神经网络的实现也对应了批处理，通过批处理，能够实现处理的高效化和学习时对 mini-batch 的对应。

我们希望卷积运算也同样对应批处理。为此，需要将在各层间传递的数据保存为 4 维数据。具体地讲，就是按 (batch_num, channel, height, width) 的顺序保存数据。

比如，将之前的处理改成对 N 个数据进行批处理：

![卷积运算的处理流（批处理）](/images/deep-learning/convolutional-neural-network/convolution-operation-3d-batch.png)

图中的批处理版的数据流中，在各个数据的开头添加了批用的维度。像这样，数据作为 4 维的形状在各层间传递。

::: warning 注意

网络间传递的是 4 维数据，对这 N 个数据进行了卷积运算。

也就是说，批处理将 N 次的处理汇总成了 1 次进行。

:::

## 池化层

池化是缩小高、长方向上的空间的运算。

比如，进行将 2×2 的区域集约成 1 个元素的处理，缩小空间大小。

![池化的处理顺序](/images/deep-learning/convolutional-neural-network/pooling-calculation.png)

> 按步幅 2 进行 2×2 的 Max 池化的处理顺序
>
> “Max 池化” 是获取最大值的运算
>
> “2×2” 表示目标区域的大小

如图所示，从 2×2 的区域中取出最大的元素。此外，这个例子中将步幅设为了 2，所以 2×2 的窗口的移动间隔为 2 个元素。一般来说，池化的窗口大小会和步幅设定成相同的值。比如， 3×3 的窗口的步幅会设为 3，4×4 的窗口的步幅会设为 4 等。

::: details 关于池化

除了 Max 池化之外，还有 Average 池化等。相对于 Max 池化是从目标区域中取出最大值，Average 池化则是计算目标区域的平均值。在图像识别领域，主要使用 Max 池化。

:::

### 池化层的特征

池化层有以下特征：

- **没有要学习的参数**：池化层和卷积层不同，没有要学习的参数。池化只是从目标区域中取最大值（或者平均值），所以不存在要学习的参数。

- **通道数不发生变化**：经过池化运算，输入数据和输出数据的通道数不会发生变化。如下图所示，计算是按通道独立进行的。

![池化中通道数不变](/images/deep-learning/convolutional-neural-network/pooling-channel-unchanged.png)

- **对微小的位置变化具有鲁棒性（健壮）**：输入数据发生微小偏差时，池化仍会返回相同的结果。比如，3×3 的池化的情况下，池化会吸收输入数据的偏差（根据数据的不同，结果有可能不一致）

![输入数据在宽度方向上只偏离 1 个元素时，输出仍为相同的结果](/images/deep-learning/convolutional-neural-network/pooling-robust.png)

## 卷积层和池化层的实现

### 四维数组

CNN 中各层间传递的数据是 4 维数据。所谓 4 维数据，比如数据的形状是 (10, 1, 28, 28)，则它对应 10 个高为 28、长为 28、通道为 1 的数据。用 Python 来实现的话，如下所示：

```python
x = np.random.rand(10, 1, 28, 28) # 随机生成数据
print(x.shape) # (10, 1, 28, 28)
```

如果要访问第 1 个数据，只要写 `x[0]` 就可以了：

```python
print(x[0].shape) # (1, 28, 28)
print(x[1].shape) # (1, 28, 28)
```

如果要访问第 1 个数据的第 1 个通道的空间数据，可以写成下面这样：

```python
print(x[0, 0]) # 或者x[0][0]
```

### 基于 im2col 的展开

但如果老老实实地实现卷积运算，估计要重复好几层的 for 语句。这样的实现有点麻烦，而且，NumPy 中存在使用 for 语句后处理变慢的缺点（NumPy 中，访问元素时最好不要用 for 语句）。

这里，我们不使用 for 语句，而是使用 im2col 这个便利的函数进行简单的实现。

im2col 是一个函数，将输入数据展开以适合滤波器（权重）。对 3 维的输入数据应用 im2col 后，数据转换为 2 维矩阵（正确地讲，是把包含批数量的 4 维数据转换成了 2 维数据）：

![im2col的示意图](/images/deep-learning/convolutional-neural-network/im2col-intent.png)

![将滤波器的应用区域从头开始依次横向展开为 1 列](/images/deep-learning/convolutional-neural-network/im2col-expand.png)

> 为了便于观察，将步幅设置得很大，以使滤波器的应用区域不重叠
>
> 在实际的卷积运算中，滤波器的应用区域几乎都是重叠的
>
> 在滤波器的应用区域重叠的情况下，使用 im2col 展开后，展开后的元素个数会多于原方块的元素个数

对于输入数据，将应用滤波器的区域（3 维方块）横向展开为 1 列。im2col 会在所有应用滤波器的地方进行这个展开处理。

使用 im2col 的实现存在比普通的实现消耗更多内存的缺点。但是，汇总成一个大的矩阵进行计算，对计算机的计算颇有益处。比如，在矩阵计算的库（线性代数库）等中，矩阵计算的实现已被高度最优化，可以高速地进行大矩阵的乘法运算。

使用 im2col 展开输入数据后，之后就只需将卷积层的滤波器（权重）纵向展开为 1 列，并计算 2 个矩阵的乘积即可。这和全连接层的 Affine 层进行的处理基本相同：

![卷积运算的滤波器处理的细节](/images/deep-learning/convolutional-neural-network/convolution-calculation.png)

> 将滤波器纵向展开为 1 列，并计算和 im2col 展开的数据的矩阵乘积，最后转换（reshape）为输出数据的大小
>
> 基于 im2col 方式的输出结果是 2 维矩阵。因为 CNN 中数据会保存为 4 维数组，所以要将 2 维输出数据转换为合适的形状

### 卷积层的实现

先来实现一下 im2col 函数：

```python
def im2col(input_data, filter_h, filter_w, stride=1, pad=0):
    """

    Parameters
    ----------
    input_data : 由(数据量, 通道, 高, 长)的4维数组构成的输入数据
    filter_h : 滤波器的高
    filter_w : 滤波器的长
    stride : 步幅
    pad : 填充

    Returns
    -------
    col : 2维数组
    """
    N, C, H, W = input_data.shape
    out_h = (H + 2*pad - filter_h)//stride + 1 # 输出高度
    out_w = (W + 2*pad - filter_w)//stride + 1 # 输出宽度

    img = np.pad(input_data, [(0,0), (0,0), (pad, pad), (pad, pad)], 'constant')
    col = np.zeros((N, C, filter_h, filter_w, out_h, out_w))

    for y in range(filter_h):
        y_max = y + stride*out_h
        for x in range(filter_w):
            x_max = x + stride*out_w
            col[:, :, y, x, :, :] = img[:, :, y:y_max:stride, x:x_max:stride]

    col = col.transpose(0, 4, 5, 1, 2, 3).reshape(N*out_h*out_w, -1)
    return col
```

::: details 代码解释

`im2col(input_data, filter_h, filter_w, stride=1, pad=0)`

- `input_data`：由（数据量，通道，高，长）的 4 维数组构成的输入数据

- `filter_h`：滤波器的高

- `filter_w`：滤波器的长

- `stride`：步幅

- `pad`：填充

im2col 会考虑滤波器大小、步幅、填充，将输入数据展开为 2 维数组。

:::

::: details 具体示例

现在，我们来实际使用一下这个 im2col：

```python
import sys, os
import numpy as np
sys.path.append(os.pardir)
from common.util import im2col

x1 = np.random.rand(1, 3, 7, 7)
col1 = im2col(x1, 5, 5, stride=1, pad=0)
print(col1.shape) # (9, 75)

x2 = np.random.rand(10, 3, 7, 7) # 10个数据
col2 = im2col(x2, 5, 5, stride=1, pad=0)
print(col2.shape) # (90, 75)
```

第一个是批大小为 1、通道为 3 的 7×7 的数据，第二个的批大小为 10，数据形状和第一个相同。

分别对其应用 im2col 函数，在这两种情形下，第 2 维的元素个数均为 75。这是滤波器（通道为 3、大小为 5×5）的元素个数的总和。

批大小为 1 时，im2col 的结果是 (9, 75)。而第 2 个例子中批大小为 10，所以保存了 10 倍的数据，即 (90, 75)。

:::

现在使用 im2col 来实现卷积层。这里我们将卷积层实现为名为 Convolution 的类：

```python{16-18}
class Convolution:
    def __init__(self, W, b, stride=1, pad=0):
        self.W = W # 滤波器权重
        self.b = b # 偏置
        self.stride = stride # 步幅
        self.pad = pad # 填充

    def forward(self, x):
        FN, C, FH, FW = self.W.shape # 滤波器参数
        N, C, H, W = x.shape # 输入数据

        # 计算输出尺寸
        out_h = 1 + int((H + 2*self.pad - FH) / self.stride)
        out_w = 1 + int((W + 2*self.pad - FW) / self.stride)

        col = im2col(x, FH, FW, self.stride, self.pad)
        col_W = self.W.reshape(FN, -1).T # 滤波器的展开
        out = np.dot(col, col_W) + self.b

        # 重塑输出形状
        out = out.reshape(N, out_h, out_w, -1).transpose(0, 3, 1, 2)

        return out
```

::: details 代码解释

卷积层的初始化方法将滤波器（权重）、偏置、步幅、填充作为参数接收。滤波器是 (FN, C, FH, FW) 的 4 维形状。另外，FN、C、FH、FW 分别是 Filter Number（滤波器数量）、Channel、Filter Height、Filter Width 的缩写。

高亮的部分表示 Convolution 层的实现中的重要部分。用 `im2col` 展开输入数据，并用 `reshape` 将滤波器展开为 2 维数组。然后，计算展开后的矩阵的乘积。

展开滤波器的部分将各个滤波器的方块纵向展开为 1 列。这里通过 `reshape(FN, -1)` 将参数指定为 -1，这是 `reshape` 的一个便利的功能。通过在 `reshape` 时指定为 -1， `reshape` 函数会自动计算 -1 维度上的元素个数，以使多维数组的元素个数前后一致。比如，(10, 3, 5, 5) 形状的数组的元素个数共有 750 个，指定 `reshape(10, -1)` 后，就会转换成 (10, 75) 形状的数组。即将滤波器权重从 `(FN, C, FH, FW)` 重塑为 `(FN, C*FH*FW)`。

`col` 的形状为 `(N × out_h × out_w, C × FH × FW)`，`col_W` 的形状为 `(C × FH × FW, FN)`，计算后 `out` 的形状为 `(N×out_h×out_w, FN)`。

forward 的实现中，最后会将输出大小转换为合适的形状。转换时使用了 NumPy 的 `transpose` 函数。`transpose` 会更改多维数组的轴的顺序。通过指定从 0 开始的索引（编号）序列，就可以更改轴的顺序：

![基于 NumPy 的 transpose 的轴顺序的更改：通过指定索引（编号），更改轴的顺序](/images/deep-learning/convolutional-neural-network/transpose.png)

`reshape(N, out_h, out_w, FN)` 将输出恢复为 4 维，`transpose(0, 3, 1, 2)` 将通道维度放到第 1 维。

:::

以上就是卷积层的 forward 处理的实现。通过使用 im2col 进行展开，基本上可以像实现全连接层的 Affine 层一样来实现。

接下来是卷积层的反向传播的实现：

::: code-group

```python [Convolution]
class Convolution:
    def __init__(self, W, b, stride=1, pad=0):
        self.W = W
        self.b = b
        self.stride = stride
        self.pad = pad

        # 中间数据（backward时使用）
        self.x = None
        self.col = None
        self.col_W = None

        # 权重和偏置参数的梯度
        self.dW = None
        self.db = None

    def forward(self, x):
        FN, C, FH, FW = self.W.shape
        N, C, H, W = x.shape
        out_h = 1 + int((H + 2*self.pad - FH) / self.stride)
        out_w = 1 + int((W + 2*self.pad - FW) / self.stride)

        col = im2col(x, FH, FW, self.stride, self.pad)
        col_W = self.W.reshape(FN, -1).T

        out = np.dot(col, col_W) + self.b
        out = out.reshape(N, out_h, out_w, -1).transpose(0, 3, 1, 2)

        self.x = x
        self.col = col
        self.col_W = col_W

        return out

    def backward(self, dout):
        FN, C, FH, FW = self.W.shape
        dout = dout.transpose(0,2,3,1).reshape(-1, FN)

        self.db = np.sum(dout, axis=0)
        self.dW = np.dot(self.col.T, dout)
        self.dW = self.dW.transpose(1, 0).reshape(FN, C, FH, FW)

        dcol = np.dot(dout, self.col_W.T)
        dx = col2im(dcol, self.x.shape, FH, FW, self.stride, self.pad)

        return dx
```

```python [col2im]
def col2im(col, input_shape, filter_h, filter_w, stride=1, pad=0):
    """

    Parameters
    ----------
    col :
    input_shape : 输入数据的形状（例：(10, 1, 28, 28)）
    filter_h :
    filter_w
    stride
    pad

    Returns
    -------

    """
    N, C, H, W = input_shape
    out_h = (H + 2*pad - filter_h)//stride + 1
    out_w = (W + 2*pad - filter_w)//stride + 1
    col = col.reshape(N, out_h, out_w, C, filter_h, filter_w).transpose(0, 3, 4, 5, 1, 2)

    img = np.zeros((N, C, H + 2*pad + stride - 1, W + 2*pad + stride - 1))
    for y in range(filter_h):
        y_max = y + stride*out_h
        for x in range(filter_w):
            x_max = x + stride*out_w
            img[:, :, y:y_max:stride, x:x_max:stride] += col[:, :, y, x, :, :]

    return img[:, :, pad:H + pad, pad:W + pad]
```

:::

::: details 代码解释

在进行卷积层的反向传播时，必须进行 im2col 的逆处理，可以使用 col2im 函数。

除了使用 col2im 这一点，卷积层的反向传播和 Affine 层的实现方式都一样。

:::

### 池化层的实现

池化层的实现和卷积层相同，都使用 im2col 展开输入数据。

不过，池化的情况下，在通道方向上是独立的，这一点和卷积层不同。池化的应用区域按通道单独展开：

![对输入数据展开池化的应用区域（2×2的池化的例子）](/images/deep-learning/convolutional-neural-network/pooling.png)

像这样展开之后，只需对展开的矩阵求各行的最大值，并转换为合适的形状即可：

![池化层的实现流程：池化的应用区域内的最大值元素用灰色表示](/images/deep-learning/convolutional-neural-network/pooling-implementation.png)

> 池化层的实现流程：池化的应用区域内的最大值元素用灰色表示

```python
class Pooling:
    def __init__(self, pool_h, pool_w, stride=1, pad=0):
        self.pool_h = pool_h # 池化窗口高度
        self.pool_w = pool_w # 池化窗口宽度
        self.stride = stride # 步幅
        self.pad = pad # 填充

        self.x = None # 存储输入用于反向传播
        self.arg_max = None # 存储最大值位置用于反向传播

    def forward(self, x):
        # 计算输出尺寸
        N, C, H, W = x.shape
        out_h = int(1 + (H - self.pool_h) / self.stride)
        out_w = int(1 + (W - self.pool_w) / self.stride)

        # 展开
        col = im2col(x, self.pool_h, self.pool_w, self.stride, self.pad)
        col = col.reshape(-1, self.pool_h*self.pool_w)

        arg_max = np.argmax(col, axis=1) # 每行的最大值索引
        out = np.max(col, axis=1) # 每行的最大值
        out = out.reshape(N, out_h, out_w, C).transpose(0, 3, 1, 2) # 转换

        self.x = x
        self.arg_max = arg_max

        return out

    def backward(self, dout):
        dout = dout.transpose(0, 2, 3, 1)

        pool_size = self.pool_h * self.pool_w
        dmax = np.zeros((dout.size, pool_size))
        dmax[np.arange(self.arg_max.size), self.arg_max.flatten()] = dout.flatten()
        dmax = dmax.reshape(dout.shape + (pool_size,))

        dcol = dmax.reshape(dmax.shape[0] * dmax.shape[1] * dmax.shape[2], -1)
        dx = col2im(dcol, self.x.shape, self.pool_h, self.pool_w, self.stride, self.pad)

        return dx
```

::: details 代码解释

池化层的实现按下面 3 个阶段进行：

- 展开输入数据

- 求各行的最大值

- 转换为合适的输出大小

最大值的计算使用 NumPy 的 `np.max` 方法。`np.max` 可以指定 `axis` 参数，并在这个参数指定的各个轴方向上求最大值。

比如，如果写成 `np.max(x, axis=1)`，就可以在输入 x 的第 1 维的各个轴方向上求最大值。

:::

## CNN 的实现

我们已经实现了卷积层和池化层，现在来组合这些层，搭建进行手写数字识别的 CNN。

先来观察一下简单 CNN 的结构：

![简单 CNN 的网络构成](/images/deep-learning/convolutional-neural-network/cnn-simple.png)

网络的构成是 “Convolution - ReLU - Pooling - Affine - ReLU - Affine - Softmax”，我们将它实现为名为 `SimpleConvNet` 的类。

### 初始化

首先来看一下 `SimpleConvNet` 的初始化（`__init__`），取下面这些参数：

- `input_dim` ——— 输入数据的维度：（通道，高，长）

- `conv_param` ——— 卷积层的超参数（字典）。字典的关键字如下：
  - `filter_num` ——— 滤波器的数量
  - `filter_size` ——— 滤波器的大小
  - `stride` ——— 步幅
  - `pad` ——— 填充

- `hidden_size` ——— 隐藏层的大小

- `output_size` ——— 输出的维度

- `weight_init_std` ——— 初始化时权重的标准差

这里，卷积层的超参数通过名为 `conv_param` 的字典传入。我们设想它会像 `{'filter_num':30, 'filter_size':5, 'pad':0, 'stride':1}` 这样，保存必要的超参数值。

```python
# coding: utf-8
import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
import pickle
import numpy as np
from collections import OrderedDict
from common.layers import *
from common.gradient import numerical_gradient


class SimpleConvNet:
    """简单的ConvNet

    conv - relu - pool - affine - relu - affine - softmax

    Parameters
    ----------
    input_size : 输入大小（MNIST 的情况下为 784）
    hidden_size_list : 隐藏层的神经元数量的列表（e.g. [100, 100, 100]）
    output_size : 输出大小（MNIST 的情况下为 10）
    activation : 'relu' or 'sigmoid'
    weight_init_std : 指定权重的标准差（e.g. 0.01）
        指定 'relu' 或 'he' 的情况下设定 “He的初始值”
        指定 'sigmoid' 或 'xavier' 的情况下设定 “Xavier的初始值”
    """
    def __init__(self, input_dim=(1, 28, 28),
                 conv_param={'filter_num':30, 'filter_size':5, 'pad':0, 'stride':1},
                 hidden_size=100, output_size=10, weight_init_std=0.01):

        # 计算各层输出尺寸
        filter_num = conv_param['filter_num']
        filter_size = conv_param['filter_size']
        filter_pad = conv_param['pad']
        filter_stride = conv_param['stride']
        input_size = input_dim[1] # 输入高度/宽度
        conv_output_size = (input_size - filter_size + 2*filter_pad) / filter_stride + 1
        pool_output_size = int(filter_num * (conv_output_size/2) * (conv_output_size/2))

        # 初始化权重
        self.params = {}
        # 卷积层权重: (滤波器数量, 输入通道, 滤波器高度, 滤波器宽度)
        self.params['W1'] = weight_init_std * np.random.randn(filter_num, input_dim[0], filter_size, filter_size)
        self.params['b1'] = np.zeros(filter_num)
        # 第一个全连接层权重
        self.params['W2'] = weight_init_std * np.random.randn(pool_output_size, hidden_size)
        self.params['b2'] = np.zeros(hidden_size)
        # 第二个全连接层权重
        self.params['W3'] = weight_init_std * np.random.randn(hidden_size, output_size)
        self.params['b3'] = np.zeros(output_size)

        # 生成必要的层
        self.layers = OrderedDict()
        self.layers['Conv1'] = Convolution(self.params['W1'], self.params['b1'],
                                           conv_param['stride'], conv_param['pad'])
        self.layers['Relu1'] = Relu()
        self.layers['Pool1'] = Pooling(pool_h=2, pool_w=2, stride=2)
        self.layers['Affine1'] = Affine(self.params['W2'], self.params['b2'])
        self.layers['Relu2'] = Relu()
        self.layers['Affine2'] = Affine(self.params['W3'], self.params['b3'])

        self.last_layer = SoftmaxWithLoss()
```

::: details 代码解释

首先将由初始化参数传入的卷积层的超参数从字典中取了出来（以方便后面使用），然后，计算卷积层的输出大小。

在初始化权重部分，学习所需的参数是第 1 层的卷积层和剩余两个全连接层的权重和偏置。将这些参数保存在实例变量的 `params` 字典中。将第 1 层的卷积层的权重设为关键字 `W1`，偏置设为关键字 `b1`。同样，分别用关键字 `W2`、`b2` 和关键字 `W3`、`b3` 来保存第 2 个和第 3 个全连接层的权重和偏置。

最后，生成必要的层，从最前面开始按顺序向有序字典（`OrderedDict`）的 `layers` 中添加层。只有最后的 SoftmaxWithLoss 层被添加到别的变量 `lastLayer` 中。

:::

以上就是 `SimpleConvNet` 的初始化中进行的处理。

### 正向传播

初始化后，进行推理的 `predict` 方法和求损失函数值的 `loss` 方法就可以像下面这样实现：

```python
    def predict(self, x):
        for layer in self.layers.values():
            x = layer.forward(x)
        return x

    def loss(self, x, t):
        """求损失函数
        参数 x 是输入数据、t 是教师标签
        """
        y = self.predict(x)
        return self.last_layer.forward(y, t)
```

::: details 代码解释

这里，参数 x 是输入数据，t 是教师标签。

用于推理的 `predict` 方法从头开始依次调用已添加的层，并将结果传递给下一层。

在求损失函数的 `loss` 方法中，除了使用 `predict` 方法进行的 `forward` 处理之外，还会继续进行 `forward` 处理，直到到达最后的 SoftmaxWithLoss 层。

:::

### 反向传播

接下来是基于误差反向传播法求梯度的代码实现：

```python
    def gradient(self, x, t):
        """求梯度（误差反向传播法）

        Parameters
        ----------
        x : 输入数据
        t : 教师标签

        Returns
        -------
        具有各层的梯度的字典变量
            grads['W1']、grads['W2']、...是各层的权重
            grads['b1']、grads['b2']、...是各层的偏置
        """
        # forward
        self.loss(x, t)

        # backward
        dout = 1
        dout = self.last_layer.backward(dout)

        layers = list(self.layers.values())
        layers.reverse()
        for layer in layers:
            dout = layer.backward(dout)

        # 设定
        grads = {}
        grads['W1'], grads['b1'] = self.layers['Conv1'].dW, self.layers['Conv1'].db
        grads['W2'], grads['b2'] = self.layers['Affine1'].dW, self.layers['Affine1'].db
        grads['W3'], grads['b3'] = self.layers['Affine2'].dW, self.layers['Affine2'].db

        return grads
```

::: details 代码解释

参数的梯度通过误差反向传播法（反向传播）求出，通过把正向传播和反向传播组装在一起来完成。

因为已经在各层正确实现了正向传播和反向传播的功能，所以这里只需要以合适的顺序调用即可。

最后，把各个权重参数的梯度保存到 `grads` 字典中。这就是 SimpleConvNet 的实现。

:::

### 学习 MNIST 数据集

现在，使用这个 SimpleConvNet 学习 MNIST 数据集：

```python
import sys, os
sys.path.append(os.pardir)
import numpy as np
import matplotlib.pyplot as plt
from dataset.mnist import load_mnist
from simple_convnet import SimpleConvNet
from common.trainer import Trainer

# 读入数据
(x_train, t_train), (x_test, t_test) = load_mnist(flatten=False)

# 处理花费时间较长的情况下减少数据
#x_train, t_train = x_train[:5000], t_train[:5000]
#x_test, t_test = x_test[:1000], t_test[:1000]

max_epochs = 20

network = SimpleConvNet(input_dim=(1,28,28),
                        conv_param = {'filter_num': 30, 'filter_size': 5, 'pad': 0, 'stride': 1},
                        hidden_size=100, output_size=10, weight_init_std=0.01)

trainer = Trainer(network, x_train, t_train, x_test, t_test,
                  epochs=max_epochs, mini_batch_size=100,
                  optimizer='Adam', optimizer_param={'lr': 0.001},
                  evaluate_sample_num_per_epoch=1000)
trainer.train()

# 保存参数
network.save_params("params.pkl")
print("Saved Network Parameters!")

# 绘制图形
markers = {'train': 'o', 'test': 's'}
x = np.arange(max_epochs)
plt.plot(x, trainer.train_acc_list, marker='o', label='train', markevery=2)
plt.plot(x, trainer.test_acc_list, marker='s', label='test', markevery=2)
plt.xlabel("epochs")
plt.ylabel("accuracy")
plt.ylim(0, 1.0)
plt.legend(loc='lower right')
plt.show()
```

如果使用 MNIST 数据集训练 SimpleConvNet，则训练数据的识别率为 99.82%，测试数据的识别率为 98.96%（每次学习的识别精度都会发生一些误差）。测试数据的识别率大约为 99%，就小型网络来说，这是一个非常高的识别率。

如上所述，卷积层和池化层是图像识别中必备的模块。CNN 可以有效读取图像中的某种特性，在手写数字识别中，还可以实现高精度的识别。

## CNN 的可视化

CNN 中用到的卷积层在 “观察” 什么呢？本节将通过卷积层的可视化，探索 CNN 中到底进行了什么处理。

### 第1层权重的可视化

刚才我们对 MNIST 数据集进行了简单的 CNN 学习。当时，第 1 层的卷积层的权重的形状是 (30,1,5,5)，即 30 个大小为 5×5、通道为 1 的滤波器。

滤波器大小是 5×5、通道数是 1，意味着滤波器可以可视化为 1 通道的灰度图像。

现在，我们将卷积层（第 1 层）的滤波器显示为图像。并比较一下学习前和学习后的权重：

```python
import numpy as np
import matplotlib.pyplot as plt
from simple_convnet import SimpleConvNet

def filter_show(filters, nx=8, margin=3, scale=10):
    FN, C, FH, FW = filters.shape
    ny = int(np.ceil(FN / nx))

    fig = plt.figure()
    fig.subplots_adjust(left=0, right=1, bottom=0, top=1, hspace=0.05, wspace=0.05)

    for i in range(FN):
        ax = fig.add_subplot(ny, nx, i+1, xticks=[], yticks=[])
        ax.imshow(filters[i, 0], cmap=plt.cm.gray_r, interpolation='nearest')
    plt.show()


network = SimpleConvNet()
# 随机进行初始化后的权重
filter_show(network.params['W1'])

# 学习后的权重
network.load_params("params.pkl")
filter_show(network.params['W1'])
```

![学习前和学习后的第 1 层的卷积层的权重](/images/deep-learning/convolutional-neural-network/filter.png)

> 虽然权重的元素是实数，但是在图像的显示上，统一将最小值显示为黑色（0），最大值显示为白色（255）

学习前的滤波器是随机进行初始化的，所以在黑白的浓淡上没有规律可循，但学习后的滤波器变成了有规律的图像。

我们发现，通过学习，滤波器被更新成了有规律的滤波器，比如从白到黑渐变的滤波器、含有块状区域（称为 blob）的滤波器等。

如果要问图中右边的有规律的滤波器在 “观察” 什么，答案就是它在观察边缘（颜色变化的分界线）和斑块（局部的块状区域）等。

比如，左半部分为白色、右半部分为黑色的滤波器的情况下，会对垂直方向上的边缘有响应：

![对水平方向上和垂直方向上的边缘有响应的滤波器](/images/deep-learning/convolutional-neural-network/filter2.png)

> 输出图像 1 中，垂直方向的边缘上出现白色像素，输出图像 2 中，水平方向的边缘上出现很多白色像素

图中显示了选择两个学习完的滤波器对输入图像进行卷积处理时的结果。我们发现 “滤波器 1” 对垂直方向上的边缘有响应，“滤波器 2” 对水平方向上的边缘有响应。

由此可知，卷积层的滤波器会提取边缘或斑块等原始信息。而刚才实现的 CNN 会将这些原始信息传递给后面的层。

### 基于分层结构的信息提取

上面的结果是针对第 1 层的卷积层得出的。第 1 层的卷积层中提取了边缘或斑块等 “低级” 信息。

那么在堆叠了多层的 CNN 中，各层中又会提取什么样的信息呢？

根据深度学习的可视化相关的研究，随着层次加深，提取的信息（正确地讲，是反映强烈的神经元）也越来越抽象。

::: details 具体示例

![进行一般物体识别（车或狗等）的 8 层 CNN](/images/deep-learning/convolutional-neural-network/cnn-8.png)

> 进行一般物体识别（车或狗等）的 8 层 CNN（AlexNet）。

该网络结构堆叠了多层卷积层和池化层，最后经过全连接层输出结果。

图中的方块表示的是中间数据，对于这些中间数据，会连续应用卷积运算。

:::

如果堆叠了多层卷积层，则随着层次加深，提取的信息也愈加复杂、抽象，这是深度学习中很有意思的一个地方。

最开始的层对简单的边缘有响应，接下来的层对纹理有响应，再后面的层对更加复杂的物体部件有响应。

也就是说，随着层次加深，神经元从简单的形状向 “高级” 信息变化。换句话说，就像我们理解东西的 “含义” 一样，响应的对象在逐渐变化。

## 具有代表性的 CNN

关于 CNN，迄今为止已经提出了各种网络结构。这里，我们介绍其中特别重要的两个网络，一个是在 1998 年首次被提出的 CNN 元祖 **LeNet**，另一个是在深度学习受到关注的 2012 年被提出的 **AlexNet**。

### LeNet

LeNet 在 1998 年被提出，是进行手写数字识别的网络。它有连续的卷积层和池化层（正确地讲，是只 “抽选元素” 的子采样层），最后经全连接层输出结果。

![LeNet 的网络结构](/images/deep-learning/convolutional-neural-network/lenet.png)

和 “现在的 CNN” 相比，LeNet 有几个不同点。第一个不同点在于激活函数。LeNet 中使用 sigmoid 函数，而现在的 CNN 中主要使用 ReLU 函数。此外，原始的 LeNet 中使用子采样（subsampling）缩小中间数据的大小，而现在的 CNN 中 Max 池化是主流。

综上，LeNet 与现在的 CNN 虽然有些许不同，但差别并不是那么大。

### AlexNet

在 LeNet 问世 20 多年后，AlexNet 被发布出来。AlexNet 是引发深度学习热潮的导火线，不过它的网络结构和 LeNet 基本上没有什么不同：

![AlexNet 的网络结构](/images/deep-learning/convolutional-neural-network/alexnet.png)

AlexNet 叠有多个卷积层和池化层，最后经由全连接层输出结果。虽然结构上 AlexNet 和 LeNet 没有大的不同，但有以下几点差异：

- 激活函数使用 ReLU

- 使用进行局部正规化的 LRN（Local Response Normalization）层

- 使用 Dropout

如上所述，关于网络结构，LeNet 和 AlexNet 没有太大的不同。但是，围绕它们的环境和计算机技术有了很大的进步。

## 小结

::: details 小结

- CNN 在此前的全连接层的网络中新增了卷积层和池化层

- 使用 im2col 函数可以简单、高效地实现卷积层和池化层

- 通过 CNN 的可视化，可知随着层次变深，提取的信息愈加高级

- LeNet 和 AlexNet 是 CNN 的代表性网络

- 在深度学习的发展中，大数据和 GPU 做出了很大的贡献

:::

::: details 专有名词

- **卷积神经网络（CNN）**：在普通的神经网络基础上，增加了卷积层和池化层

- **卷积层（Convolution 层）**：进行卷积运算，通过滤波器对图像进行处理

- **池化层（Pooling 层）**：进行缩小高、长方向上的空间的运算

- **全链接**：神经网络中，相邻层的所有神经元之间都有连接

- **特征图**：卷积层中输入输出的数据

- **卷积运算**：卷积层进行的处理

- **滤波器**：卷积运算中用于初步处理数据的部分

- **填充**：卷积运算中，向输入数据的周围填入固定的数据（比如 0 等），以调整输出的大小，增大填充后输出大小会变大

- **步幅**：卷积运算中，应用滤波器的位置间隔，增大步幅后输出大小会变小

- **Max 池化**：池化层处理方式的一种，从目标区域中取出最大值

- **im2col**：一个函数，将输入数据展开以适合滤波器（权重）

- **LeNet**：进行手写数字识别的网络，有连续的卷积层和池化层，最后经全连接层输出结果，使用 sigmoid 激活函数

- **AlexNet**：网络结构和 LeNet 基本相同，但激活函数使用 ReLU，使用进行局部正规化的 LRN 层，使用 Dropout

:::
