# 神经网络的学习

::: details 目录

[[toc]]

:::

## 从数据中学习

神经网络的特征就是可以从数据中学习。所谓 “从数据中学习”，是指可以由数据自动决定权重参数的值。

### 数据驱动

现在我们来思考一个具体的问题，比如如何实现数字 “5” 的识别，我们的目标是实现能区别是否是 5 的程序。

![手写数字5的例子](/images/deep-learning/neural-network-learning/fives.png)

如果让我们自己来设计一个能将 5 正确分类的程序，就会意外地发现这是一个很难的问题。人可以简单地识别出 5，但却很难明确说出是基于何种规律而识别出了 5。

因此，与其绞尽脑汁，从零开始想出一个可以识别 5 的算法，不如考虑通过有效利用数据来解决这个问题。一种方案是，先从图像中提取**特征量**，再用机器学习技术学习这些特征量的模式。

![从人工设计规则转变为由机器从数据中学习：没有人为介入的方块用灰色表示](/images/deep-learning/neural-network-learning/human-to-machine.png)

### 训练数据和测试数据

机器学习中，一般将数据分为**训练数据**和**测试数据**两部分来进行学习和实验。

首先，使用训练数据进行学习，寻找最优的参数；然后，使用测试数据评价训练得到的模型的实际能力。

::: info 泛化能力

泛化能力是指处理未被观察过的数据（不包含在训练数据中的数据）的能力。**获得泛化能力是机器学习的最终目标**。

比如，在识别手写数字的问题中，泛化能力可能会被用在自动读取明信片的邮政编码的系统上。此时，手写数字识别就必须具备较高的识别 “某个人” 写的字的能力。注意这里不是 “特定的某个人写的特定的文字”，而是 “任意一个人写的任意文字”。如果系统只能正确识别已有的训练数据，那有可能是只学习到了训练数据中的个人的习惯写法。

因此，仅仅用一个数据集去学习和评价参数，是无法进行正确评价的。这样会导致可以顺利地处理某个数据集，但无法处理其他数据集的情况。

:::

## 损失函数

神经网络的学习通过某个指标表示现在的状态。然后，以这个指标为基准，寻找最优权重参数。神经网络的学习中所用的指标称为**损失函数**（loss function）。这个损失函数可以使用任意函数，但一般用**均方误差**和**交叉熵误差**等。

### 均方误差

可以用作损失函数的函数有很多，其中最有名的是**均方误差**（mean squared error）。均方误差如下式所示：

$$E = \frac{1}{2} \sum_{k} (y_k - t_k)^2$$

这里，$y_k$ 是表示神经网络的输出，$t_k$ 表示监督数据，$k$ 表示数据的维数。

均方误差会计算神经网络的输出和正确解监督数据的各个元素之差的平方，再求总和。

```python
def mean_squared_error(y, t):
    return 0.5 * np.sum((y-t)**2)
```

::: details 手写数字识别的例子

$y_k$、$t_k$ 是由如下 10 个元素构成的数据：

```python
y = [0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0]
t = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
```

数组元素的索引从第一个开始依次对应数字 0、1、2 ······ 这里，神经网络的输出 y 是 softmax 函数的输出。由于 softmax 函数的输出可以理解为概率，因此上例表示 0 的概率是 0.1，1 的概率是 0.05，2 的概率是 0.6 等。t 是监督数据，将正确解标签设为 1，其他均设为 0。这里，标签 2 为 1，表示正确解是 2。将正确解标签表示为 1，其他标签表示为 0 的表示方法称为 **one-hot 表示**。

```python
def mean_squared_error(y, t):
    return 0.5 * np.sum((y-t)**2)

t = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] # 设 “2” 为正确解

y = [0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0] # 例1：“2” 的概率最高的情况（0.6）
print(mean_squared_error(np.array(y), np.array(t))) # 0.097500000000000031

y = [0.1, 0.05, 0.1, 0.0, 0.05, 0.1, 0.0, 0.6, 0.0, 0.0] # 例2：“7” 的概率最高的情况（0.6）
print(mean_squared_error(np.array(y), np.array(t))) # 0.59750000000000003
```

这里举了两个例子。第一个例子中，正确解是 2，神经网络的输出的最大值是 2；第二个例子中，正确解是 2，神经网络的输出的最大值是 7。 如实验结果所示，我们发现第一个例子的损失函数的值更小，和监督数据之间的误差较小。也就是说，均方误差显示第一个例子的输出结果与监督数据更加吻合。

:::

### 交叉熵误差

除了均方误差之外，**交叉熵误差**（cross entropy error）也经常被用作损失函数。交叉熵误差如下式所示：

$$E = - \sum_{k} t_k \log y_k$$

这里，log 表示以 e 为底数的自然对数（$log_e$）。 $y_k$ 是神经网络的输出，$t_k$ 是正确解标签。并且，$t_k$ 中只有正确解标签的索引为 1，其他均为 0（one-hot 表 示 ）。

::: tip 提示

该式实际上只计算对应正确解标签的输出的自然对数。

比如，假设正确解标签的索引是 2，与之对应的神经网络的输出是 0.6，则交叉熵误差是 $−log0.6 = 0.51$； 若 2 对应的输出是 0.1，则交叉熵误差为 $−log0.1=2.30$。也就是说，交叉熵误差的值是由正确解标签所对应的输出结果决定的。
:::

```python
def cross_entropy_error(y, t):
    delta = 1e-7
    return -np.sum(t * np.log(y + delta))
```

::: details 代码解释

这里，参数 y 和 t 是 NumPy 数组。函数内部在计算 np.log 时，加上了一个微小值 delta。这是因为，当出现 np.log(0) 时，np.log(0) 会变为负无限大的 -inf，这样一来就会导致后续计算无法进行。作为保护性对策，添加一个微小值可以防止负无限大的发生。

:::

::: details 实例解释

```python
def cross_entropy_error(y, t):
    delta = 1e-7
    return -np.sum(t * np.log(y + delta))

t = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] # 设 “2” 为正确解

y = [0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0] # 例1：“2” 的概率最高的情况（0.6）
print(cross_entropy_error(np.array(y), np.array(t))) # 0.51082545709933802

y = [0.1, 0.05, 0.1, 0.0, 0.05, 0.1, 0.0, 0.6, 0.0, 0.0] # 例2：“7” 的概率最高的情况（0.6）
print(cross_entropy_error(np.array(y), np.array(t))) # 2.3025840929945458
```

第一个例子中，正确解标签对应的输出为 0.6，此时的交叉熵误差大约为 0.51。第二个例子中，正确解标签对应的输出为 0.1 的低值，此时的交叉熵误差大约为 2.3。

:::

### 平均损失函数

机器学习使用训练数据进行学习。使用训练数据进行学习，严格来说，就是针对训练数据计算损失函数的值，找出使该值尽可能小的参数。因此，计算损失函数时必须将所有的训练数据作为对象。也就是说，如果训练数据有 100 个的话，我们就要把这 100 个损失函数的总和作为学习的指标。

前面介绍的损失函数的例子中考虑的都是针对单个数据的损失函数。如果要求所有训练数据的损失函数的总和，以交叉熵误差为例，可以写成下面的式子：

$$E = -\frac{1}{N} \sum_{n} \sum_{k} t_{nk} \log y_{nk}$$

这里，假设数据有 N 个，$t_{nk}$ 表示第 n 个数据的第 k 个元素的值（$y_{nk}$ 是神经网络的输出，$t_{nk}$ 是监督数据）。

通过除以 N，可以求单个数据的 “平均损失函数”。通过这样的平均化，可以获得和训练数据的数量无关的统一指标。比如，即便训练数据有 1000 个或 10000 个，也可以求得单个数据的平均损失函数。

### mini-batch 学习

MNIST 数据集的训练数据有 60000 个，如果以全部数据为对象求损失函数的和，则计算过程需要花费较长的时间。再者，如果遇到大数据，数据量会有几百万、几千万之多，这种情况下以全部数据为对象计算损失函数是不现实的。

因此，我们从全部数据中选出一部分，作为全部数据的 “近似”。神经网络的学习也是从训练数据中选出一批数据（称为 mini-batch,小批量），然后对每个 mini-batch 进行学习。比如，从 60000 个训练数据中随机选择 100 笔，再用这 100 笔数据进行学习。这种学习方式称为 **mini-batch 学习**。

### mini-batch 版交叉熵误差的实现

::: code-group

```python [同时处理单个数据和批量数据（数据作为batch集中输入）]
def cross_entropy_error(y, t):
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)
    batch_size = y.shape[0]
    return -np.sum(t * np.log(y + 1e-7)) / batch_size
```

```python [监督数据是标签形式（非one-hot表示，而是像2、7这样的标签）]
def cross_entropy_error(y, t):
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)
    batch_size = y.shape[0]
    return -np.sum(np.log(y[np.arange(batch_size), t] + 1e-7)) / batch_size
```

:::

实现的要点是，由于 one-hot 表示中 t 为 0 的元素的交叉熵误差也为 0，因此针对这些元素的计算可以忽略。

### 为何要设定损失函数

假设有一个神经网络，现在我们来关注这个神经网络中的某一个权重参数。

此时，对该权重参数的损失函数求导，表示的是 “如果稍微改变这个权重参数的值，损失函数的值会如何变化”。

如果导数的值为负，通过使该权重参数向正方向改变，可以减小损失函数的值；反过来，如果导数的值为正，则通过使该权重参数向负方向改变，可以减小损失函数的值。

不过，当导数的值为 0 时，无论权重参数向哪个方向变化，损失函数的值都不会改变，此时该权重参数的更新会停在此处。

::: info 总结

在进行神经网络的学习时，不能将识别精度作为指标。因为如果以识别精度为指标，则参数的导数在绝大多数地方都会变为 0。

:::

::: details 为什么用识别精度作为指标时，参数的导数在绝大多数地方都会变成 0 呢？

假设某个神经网络正确识别出了 100 笔训练数据中的 32 笔，此时识别精度为 32%。

如果以识别精度为指标，即使稍微改变权重参数的值，识别精度也仍将保持在 32%，不会出现变化。

也就是说，**仅仅微调参数，是无法改善识别精度的**。即便识别精度有所改善，它的值也不会像 32.0123...%这样连续变化，而是变为 33%、34% 这样的不连续的、离散的值。

而如果把损失函数作为指标，则当前损失函数的值可以表示为 0.92543...这样的值。并且，如果稍微改变一下参数的值，对应的损失函数也会像 0.93432...这样发生连续性的变化。

:::

## 数值微分

利用微小的差分求导数的过程称为**数值微分**（numerical differentiation），而基于数学式的推导求导数的过程，则用 “**解析性**”（analytic）一词，称为 “解析性求解” 或者 “解析性求导”。

### 导数

导数就是表示某个瞬间的变化量。它可以定义成下面的式子：

$$\frac{df(x)}{dx} = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$

左边的符号 $\frac{df(x)}{dx}$ 表示 $f(x)$ 关于 $x$ 的导数，即 $f(x)$ 相对于 $x$ 的变化程度。该式表示的导数的含义是，$x$ 的 “微小变化” 将导致函数 $f(x)$ 的值在多大程度上发生变化。

```python
def numerical_diff(f, x):
    h = 1e-4 # 0.0001
    return (f(x+h) - f(x-h)) / (2*h)
```

### 偏导数

接下来，我们看一下下面这个函数。虽然它只是一个计算参数的平方和的简单函数，但是请注意和上例不同的是，这里有两个变量：

$$f(x_0, x_1) = x_0^2 +  x_1^2$$

```python
def function_2(x):
    return x[0]**2 + x[1]**2
    # 或者return np.sum(x**2)
```

::: details 代码解释

这里，我们假定向参数输入了一个 NumPy 数组。函数的内部实现比较简单，先计算 NumPy 数组中各个元素的平方，再求它们的和（np.sum(x\*\*2)也可以实现同样的处理）。

:::

![函数图像](/images/deep-learning/neural-network-learning/function_2.png)

现在我们来求该函数的导数。这里需要注意的是，该函数有两个变量，所以有必要区分对哪个变量求导数，即对 $x_0$ 和 $x_1$ 两个变量中的哪一个求导数。另外，我们把这里讨论的有多个变量的函数的导数称为**偏导数**。用数学式表示的话，可以写成 $\frac{\partial f}{\partial x_0}$、$\frac{\partial f}{\partial x_1}$。

不过，偏导数需要将多个变量中的某一个变量定为目标变量，并将其他变量固定为某个值。

## 梯度

像 $(\frac{\partial f}{\partial x_0},\frac{\partial f}{\partial x_1})$ 这样的由全部变量的偏导数汇总而成的向量称为**梯度**（gradient）。

```python
def numerical_gradient(f, x):
    h = 1e-4 # 0.0001
    grad = np.zeros_like(x) # 生成和 x 形状相同、所有元素都为 0 的数组
    for idx in range(x.size):
        tmp_val = x[idx]
        # f(x+h) 的计算
        x[idx] = tmp_val + h
        fxh1 = f(x)
        # f(x-h) 的计算
        x[idx] = tmp_val - h
        fxh2 = f(x)
        grad[idx] = (fxh1 - fxh2) / (2*h)
        x[idx] = tmp_val # 还原值
    return grad
```

::: details 实例计算

```python
def function_2(x):
    return x[0]**2 + x[1]**2

print(numerical_gradient(function_2, np.array([3.0, 4.0]))) # [6. 8.]
print(numerical_gradient(function_2, np.array([0.0, 2.0]))) # [0. 4.]
print(numerical_gradient(function_2, np.array([3.0, 0.0]))) # [6. 0.]
```

:::

### 梯度法

机器学习的主要任务是在学习时寻找最优参数。同样地，神经网络也必须在学习时找到最优参数（权重和偏置）。这里所说的最优参数是指损失函数取最小值时的参数。

但是，一般而言，损失函数很复杂，参数空间庞大，我们不知道它在何处能取得最小值。而通过巧妙地使用梯度来寻找函数最小值（或者尽可能小的值）的方法就是**梯度法**（gradient method）。梯度法是解决机器学习中最优化问题的常用方法，特别是在神经网络的学习中经常被使用。

::: warning 注意

梯度表示的是各点处的函数值减小最多的方向。因此，无法保证梯度所指的方向就是函数的最小值或者真正应该前进的方向。实际上，在复杂的函数中，梯度指示的方向基本上都不是函数值最小处。

虽然梯度的方向并不一定指向最小值，但沿着它的方向能够最大限度地减小函数的值。因此，在寻找函数的最小值（或者尽可能小的值）的位置的任务中，要以梯度的信息为线索，决定前进的方向。

:::

在梯度法中，函数的取值从当前位置沿着梯度方向前进一定距离，然后在新的地方重新求梯度，再沿着新梯度方向前进，如此反复，不断地沿梯度方向前进，通过不断地沿梯度方向前进，逐渐减小函数值。

现在，我们尝试用数学式来表示梯度法：

$$x_0 = x_0 - \eta \frac{\partial f}{\partial x_0}$$

$$x_1 = x_1 - \eta \frac{\partial f}{\partial x_1}$$

这里的 $\eta$ 表示更新量，在神经网络的学习中，称为**学习率**（learning rate）。学习率决定在一次学习中，应该学习多少，以及在多大程度上更新参数。

::: tip 提示

该式是表示更新一次的式子，这个步骤会反复执行。也就是说，每一步都按该式更新变量的值，通过反复执行此步骤，逐渐减小函数值。

:::

```python
def gradient_descent(f, init_x, lr=0.01, step_num=100):
    x = init_x
    for i in range(step_num):
        grad = numerical_gradient(f, x)
        x -= lr * grad
    return x
```

::: details 代码解释

参数 f 是要进行最优化的函数，init_x 是初始值，lr 是学习率，step_num 是梯度法的重复次数。

`numerical_gradient(f,x)` 会求函数的梯度，用该梯度乘以学习率得到的值进行更新操作，由 step_num 指定重复的次数。

:::

::: details 实例计算

**问题**：请用梯度法求 $f(x_0+x_1) = x_0^2 + x_1^2$ 的最小值。

```python
def function_2(x):
    return x[0]**2 + x[1]**2

init_x = np.array([-3.0, 4.0])
print(gradient_descent(function_2, init_x=init_x, lr=0.1, step_num=100))
# [-6.11110793e-10  8.14814391e-10]
```

这里，设初始值为(-3.0, 4.0)，开始使用梯度法寻找最小值。最终的结果是(-6.1e-10, 8.1e-10)，非常接近(0，0)。实际上，真的最小值就是(0，0)，所以说通过梯度法我们基本得到了正确结果。

如果用图来表示梯度法的更新过程，则可以发现，原点处是最低的地方，函数的取值一点点在向其靠近。

![梯度法的更新过程](/images/deep-learning/neural-network-learning/gradient-method.png)

:::

::: warning 学习率过大或者过小都无法得到好的结果

```python
# 学习率过大的例子：lr=10.0
init_x = np.array([-3.0, 4.0])
print(gradient_descent(function_2, init_x=init_x, lr=10.0, step_num=100))
# array([ -2.58983747e+13,  -1.29524862e+12])

# 学习率过小的例子：lr=1e-10
init_x = np.array([-3.0, 4.0])
print(gradient_descent(function_2, init_x=init_x, lr=1e-10, step_num=100))
# array([-2.99999994,  3.99999992])
```

学习率过大的话，会发散成一个很大的值；反过来，学习率过小的话，基本上没怎么更新就结束了。

也就是说，设定合适的学习率是一个很重要的问题。

:::

### 神经网络的梯度

神经网络的学习也要求梯度。这里所说的梯度是指损失函数关于权重参数的梯度。

::: details 实例计算

我们以一个简单的神经网络为例，来实现求梯度的代码。为此，我们要实现一个名为 simpleNet 的类：

```python
import sys, os
sys.path.append(os.pardir)
import numpy as np
from common.functions import softmax, cross_entropy_error
from common.gradient import numerical_gradient
class simpleNet:
    def __init__(self):
        self.W = np.random.randn(2,3) # 用高斯分布进行初始化
    def predict(self, x):
        return np.dot(x, self.W)
    def loss(self, x, t):
        z = self.predict(x)
        y = softmax(z)
        loss = cross_entropy_error(y, t)
        return loss
```

这里使用了 `softmax`（输出层的概率函数） 、 `cross_entropy_error`（交叉熵损失函数）以及 `numerical_gradient`（梯度计算）方法。

simpleNet 类只有一个实例变量，即形状为 2×3 的权重参数。它有两个方法，一个是用于预测的 `predict(x)`，另一个是用于求损失函数值的 `loss(x,t)`。这里参数 x 接收输入数据，t 接收正确解标签。

现在我们来试着用一下这个 simpleNet 类：

```python
net = simpleNet()
print("权重参数：",net.W) # 权重参数
x = np.array([0.6, 0.9])
p = net.predict(x)
print("预测结果：",p)
print("最大值的索引：",np.argmax(p))
t = np.array([0, 0, 1]) # 正确解标签
print("损失函数：",net.loss(x, t))
```

接下来求梯度。和前面一样，我们使用 `numerical_gradient(f, x)` 求梯度度：

```python
def f(W):
    return net.loss(x, t)
dW = numerical_gradient(f, net.W)

# lambda 表示法
# f = lambda w: net.loss(x, t)
# dW = numerical_gradient(f, net.W)

print("梯度计算结果",dW)
```

（这里定义的函数 f(W)的参数 W 是一个伪参数。因为 `numerical_gradient(f, x)`会在内部执行 f(x),为了与之兼容而定义了 f(W)）

`numerical_gradient(f, x)` 的参数 f 是函数，x 是传给函数 f 的参数。因此，这里参数 x 取 net.W，并定义一个计算损失函数的新函数 f，然后把这个新定义的函数传递给 `numerical_gradient(f, x)`。

:::

求出神经网络的梯度后，接下来只需根据梯度法，更新权重参数即可。

## 学习算法的实现

神经网络的学习步骤如下所示：

> 前提：神经网络存在合适的权重和偏置，调整权重和偏置以便拟合训练数据的过程称为 “学习”
>
> 步骤 1（mini-batch 梯度法）：从训练数据中随机选出一部分数据，这部分数据称为 mini-batch。我们的目标是减小 mini-batch 的损失函数的值。
>
> 步骤 2（计算梯度）：为了减小 mini-batch 的损失函数的值，需要求出各个权重参数的梯度。梯度表示损失函数的值减小最多的方向。
>
> 步骤 3（更新参数）：将权重参数沿梯度方向进行微小更新。
>
> 步骤 4（重复）：重复步骤 1、步骤 2、步骤 3。

神经网络的学习按照上面 4 个步骤进行。这个方法通过梯度下降法更新参数，不过因为这里使用的数据是随机选择的 mini batch 数据，所以又称为**随机梯度下降法**（stochastic gradient descent）。“随机” 指的是 “随机选择的” 的意思，因此，随机梯度下降法是 “对随机选择的数据进行的梯度下降法”。

深度学习的很多框架中，随机梯度下降法一般由一个名为 **SGD** 的函数来实现。SGD 来源于随机梯度下降法的英文名称的首字母。

### 2 层神经网络的类

首先，我们将这个 2 层神经网络实现为一个名为 TwoLayerNet 的类：

```python
# coding: utf-8
import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
from common.functions import *
from common.gradient import numerical_gradient


class TwoLayerNet:

    def __init__(self, input_size, hidden_size, output_size, weight_init_std=0.01):
        # 初始化权重
        self.params = {}
        self.params['W1'] = weight_init_std * np.random.randn(input_size, hidden_size)
        self.params['b1'] = np.zeros(hidden_size)
        self.params['W2'] = weight_init_std * np.random.randn(hidden_size, output_size)
        self.params['b2'] = np.zeros(output_size)

    def predict(self, x):
        W1, W2 = self.params['W1'], self.params['W2']
        b1, b2 = self.params['b1'], self.params['b2']

        a1 = np.dot(x, W1) + b1
        z1 = sigmoid(a1)
        a2 = np.dot(z1, W2) + b2
        y = softmax(a2)

        return y

    # x:输入数据, t:监督数据
    def loss(self, x, t):
        y = self.predict(x)

        return cross_entropy_error(y, t)

    def accuracy(self, x, t):
        y = self.predict(x)
        y = np.argmax(y, axis=1)
        t = np.argmax(t, axis=1)

        accuracy = np.sum(y == t) / float(x.shape[0])
        return accuracy

    # x:输入数据, t:监督数据
    def numerical_gradient(self, x, t):
        loss_W = lambda W: self.loss(x, t)

        grads = {}
        grads['W1'] = numerical_gradient(loss_W, self.params['W1'])
        grads['b1'] = numerical_gradient(loss_W, self.params['b1'])
        grads['W2'] = numerical_gradient(loss_W, self.params['W2'])
        grads['b2'] = numerical_gradient(loss_W, self.params['b2'])

        return grads

    def gradient(self, x, t):
        W1, W2 = self.params['W1'], self.params['W2']
        b1, b2 = self.params['b1'], self.params['b2']
        grads = {}

        batch_num = x.shape[0]

        # forward
        a1 = np.dot(x, W1) + b1
        z1 = sigmoid(a1)
        a2 = np.dot(z1, W2) + b2
        y = softmax(a2)

        # backward
        dy = (y - t) / batch_num
        grads['W2'] = np.dot(z1.T, dy)
        grads['b2'] = np.sum(dy, axis=0)

        da1 = np.dot(dy, W2.T)
        dz1 = sigmoid_grad(a1) * da1
        grads['W1'] = np.dot(x.T, dz1)
        grads['b1'] = np.sum(dz1, axis=0)

        return grads
```

|  变量  |                                                                                                  说明                                                                                                   |
| :----: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| params |               保存神经网络的参数的字典型变量（实例变量）。`params['W1']` 是第 1 层的权重，`params['b1']` 是第 1 层的偏置。`params['W2']` 是第 2 层的权重，`params['b2']` 是第 2 层的偏置                |
| grads  | 保存梯度的字典型变量（`numerical_gradient()` 方法的返回值）。`grads['W1']` 是第 1 层权重的梯度，`grads['b1']` 是第 1 层偏置的梯度。`grads['W2']` 是第 2 层权重的梯度，`grads['b2']` 是第 2 层偏置的梯度 |

|                          方法                          |                                         说明                                         |
| :----------------------------------------------------: | :----------------------------------------------------------------------------------: |
| `__init__(self, input_size, hidden_size, output_size)` | 进行初始化。参数从头开始依次表示输入层的神经元数、隐藏层的神经元数、输出层的神经元数 |
|                   `predict(self, x)`                   |                         进行识别（推理）。参数 x 是图像数据                          |
|                   `loss(self, x, t)`                   |   计算损失函数的值。参数 x 是图像数据，t 是正确解标签（后面 3 个方法的参数也一样）   |
|                 `accuracy(self, x, t)`                 |                                     计算识别精度                                     |
|            `numerical_gradient(self, x, t)`            |                           计算权重参数相对于损失函数的梯度                           |
|                 `gradient(self, x, t)`                 |                  计算权重参数的梯度。`numerical_gradient()`的高速版                  |

::: details `params` 和 `grads`

TwoLayerNet 类有 params 和 grads 两个字典型实例变量。params 变量中保存了权重参数，比如 `params['W1']` 以 NumPy 数组的形式保存了第 1 层的权重参数。

```python
net = TwoLayerNet(input_size=784, hidden_size=100, output_size=10)
net.params['W1'].shape # (784, 100)
net.params['b1'].shape # (100,)
net.params['W2'].shape # (100, 10)
net.params['b2'].shape # (10,)
```

:::

::: details `__init__` 方法

进行手写数字识别时，输入图像的大小是 784（28×28），输出为 10 个类别，所以指定参数 `input_size=784`、`output_size=10`，将隐藏层的个数 hidden_size 设置为一个合适的值即可。

这里权重使用符合高斯分布的随机数进行初始化，偏置使用 0 进行初始化。

:::

### mini-batch 的实现

神经网络的学习的实现使用的是前面介绍过的 mini-batch 学习。所谓 mini-batch 学习，就是从训练数据中随机选择一部分数据（称为 mini-batch），再以这些 mini-batch 为对象，使用梯度法更新参数的过程。

```python
import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
import numpy as np
import matplotlib.pyplot as plt
from dataset.mnist import load_mnist
from two_layer_net import TwoLayerNet

# 读入数据：60,000个训练样本，10,000个测试样本
(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True, one_hot_label=True)

# 创建两层神经网络
network = TwoLayerNet(input_size=784, hidden_size=50, output_size=10)

# 超参数
iters_num = 10000  # 适当设定循环的次数
train_size = x_train.shape[0] # 训练集大小，60000
batch_size = 100 # 每个批次的样本数
learning_rate = 0.1 # 学习率

train_loss_list = [] # 记录每次迭代的训练损失

for i in range(iters_num):
    # 获取mini - batch
    batch_mask = np.random.choice(train_size, batch_size) # 从 0-59999 中随机选择 100 个不重复的索引
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    # 计算梯度
    # grad = network.numerical_gradient(x_batch, t_batch)
    grad = network.gradient(x_batch, t_batch) # 高速版!

    # 更新参数
    for key in ('W1', 'b1', 'W2', 'b2'):
        network.params[key] -= learning_rate * grad[key]

    # 记录学习过程
    loss = network.loss(x_batch, t_batch)
    train_loss_list.append(loss)
```

::: details 代码解释

这里，mini-batch 的大小为 100，需要每次从 60000 个训练数据中随机取出 100 个数据（图像数据和正确解标签数据）。

然后，对这个包含 100 笔数据的 mini-batch 求梯度，使用随机梯度下降法（SGD）更新参数。这里，梯度法的更新次数（循环的次数）为 10000。每更新一次，都对训练数据计算损失函数的值，并把该值添加到数组中。

:::

用图像来表示这个损失函数的值的推移：

![损失函数的推移](/images/deep-learning/neural-network-learning/loss-function.png)

可以发现随着学习的进行，损失函数的值在不断减小。这是学习正常进行的信号，表示神经网络的权重参数在逐渐拟合数据。也就是说，神经网络的确在学习！通过反复地向它浇灌（输入）数据，神经网络正在逐渐向最优参数靠近。

### 基于测试数据的评价

根据上图所示，我们确认了通过反复学习可以使损失函数的值逐渐减小这一事实。

不过这个损失函数的值，严格地讲是 “对训练数据的某个 mini-batch 的损失函数” 的值。训练数据的损失函数值减小，虽说是神经网络的学习正常进行的一个信号，但光看这个结果还不能说明该神经网络在其他数据集上也一定能有同等程度的表现。

神经网络的学习中，必须确认是否能够正确识别训练数据以外的其他数据，即确认是否会发生**过拟合**（过拟合是指，虽然训练数据中的数字图像能被正确辨别，但是不在训练数据中的数字图像却无法被识别的现象）

神经网络学习的最初目标是掌握泛化能力，因此，要评价神经网络的泛化能力，就必须使用不包含在训练数据中的数据。下面的代码在进行学习的过程中，会定期地对训练数据和测试数据记录识别精度。这里，每经过一个 epoch，我们都会记录下训练数据和测试数据的识别精度：

::: tip 什么是 epoch

**epoch** 是一个单位。一个 epoch 表示学习中所有训练数据均被使用过一次时的更新次数。

比如，对于 60000 笔训练数据，用大小为 100 笔数据的 mini-batch 进行学习时，重复随机梯度下降法 600 次，所有的训练数据就都被 “看过” 了。此时，600 次就是一个 epoch。

:::

```python {21,22,24,44-50}
import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
import numpy as np
import matplotlib.pyplot as plt
from dataset.mnist import load_mnist
from two_layer_net import TwoLayerNet

# 读入数据：60,000 个训练样本，10,000 个测试样本
(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True, one_hot_label=True)

# 创建两层神经网络
network = TwoLayerNet(input_size=784, hidden_size=50, output_size=10)

# 超参数
iters_num = 10000  # 适当设定循环的次数
train_size = x_train.shape[0] # 训练集大小，60000
batch_size = 100 # 每个批次的样本数
learning_rate = 0.1 # 学习率

train_loss_list = [] # 记录每次迭代的训练损失
train_acc_list = [] # 记录每个 epoch 的训练准确率
test_acc_list = [] # 记录每个 epoch 的测试准确率

iter_per_epoch = max(train_size / batch_size, 1) # 平均每个 epoch 的重复次数

for i in range(iters_num):
    # 获取mini - batch
    batch_mask = np.random.choice(train_size, batch_size) # 从 0-59999 中随机选择 100 个不重复的索引
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    # 计算梯度
    # grad = network.numerical_gradient(x_batch, t_batch)
    grad = network.gradient(x_batch, t_batch) # 高速版!

    # 更新参数
    for key in ('W1', 'b1', 'W2', 'b2'):
        network.params[key] -= learning_rate * grad[key]

    # 记录学习过程
    loss = network.loss(x_batch, t_batch)
    train_loss_list.append(loss)

    # 计算每个 epoch 的识别精度
    if i % iter_per_epoch == 0:
        train_acc = network.accuracy(x_train, t_train)
        test_acc = network.accuracy(x_test, t_test)
        train_acc_list.append(train_acc)
        test_acc_list.append(test_acc)
        print("train acc, test acc | " + str(train_acc) + ", " + str(test_acc))

# 绘制图形
markers = {'train': 'o', 'test': 's'}
x = np.arange(len(train_acc_list))
plt.plot(x, train_acc_list, label='train acc')
plt.plot(x, test_acc_list, label='test acc', linestyle='--')
plt.xlabel("epochs")
plt.ylabel("accuracy")
plt.ylim(0, 1.0)
plt.legend(loc='lower right')
plt.show()
```

在上面的例子中，每经过一个 epoch，就对所有的训练数据和测试数据计算识别精度，并记录结果。之所以要计算每一个 epoch 的识别精度，是因为如果在 for 语句的循环中一直计算识别精度，会花费太多时间。

把从上面的代码中得到的结果用图表示的话，如下：

![训练数据和测试数据的识别精度的推移（横轴的单位是epoch）](/images/deep-learning/neural-network-learning/recognition-accuracy.png)

> 图中实线表示训练数据的识别精度，虚线表示测试数据的识别精度。

如图所示，随着 epoch 的前进（学习的进行），我们发现使用训练数据和测试数据评价的识别精度都提高了，并且，这两个识别精度基本上没有差异（两条线基本重叠在一起）。因此，可以说这次的学习中没有发生过拟合的现象。

## 小结

::: details 小结

- 机器学习中使用的数据集分为训练数据和测试数据

- 神经网络用训练数据进行学习，并用测试数据评价学习到的模型的泛化能力。

- 神经网络的学习以损失函数为指标，更新权重参数，以使损失函数的值减小。

- 利用某个给定的微小值的差分求导数的过程，称为数值微分。

- 利用数值微分，可以计算权重参数的梯度。

- 数值微分虽然费时间，但是实现起来很简单。

:::

::: details 专有名词

- **训练数据**：神经网络学习时使用的数据集。

- **测试数据**：神经网络学习过程中，对学习效果进行评价时使用的数据集。

- **泛化能力**：神经网络学习过程中，对训练数据以外的数据进行评价，以评价学习效果。

- **损失函数**：神经网络学习过程中，用于评价学习效果的指标。损失函数越小，表示学习效果越好。

- **mini-batch**：一个训练数据集的子集，通常取一个较小的数据集，比如 100 个样本。

- **学习率**：神经网络学习过程中，权重参数的更新大小。

- **过拟合**：神经网络学习过程中，在训练数据上过拟合，即在训练数据上表现良好，但测试数据上表现不好。

- **epoch**：一个 epoch 表示学习中，所有训练数据均被使用过一次时的更新次数。

- **超参数**：神经网络学习过程中，需要设定手动的参数。比如，学习率、权重参数的初始值、权重参数的更新大小等等。

:::
