# 神经网络的学习

## 从数据中学习

神经网络的特征就是可以从数据中学习。所谓 “从数据中学习”，是指可以由数据自动决定权重参数的值。

### 数据驱动

现在我们来思考一个具体的问题，比如如何实现数字 “5” 的识别，我们的目标是实现能区别是否是 5 的程序。

![手写数字5的例子](/images/content/deep-learning/neural-network-learning/fives.png)

如果让我们自己来设计一个能将 5 正确分类的程序，就会意外地发现这是一个很难的问题。人可以简单地识别出 5，但却很难明确说出是基于何种规律而识别出了 5。

因此，与其绞尽脑汁，从零开始想出一个可以识别 5 的算法，不如考虑通过有效利用数据来解决这个问题。一种方案是，先从图像中提取**特征量**，再用机器学习技术学习这些特征量的模式。

![从人工设计规则转变为由机器从数据中学习：没有人为介入的方块用灰色表示](/images/content/deep-learning/neural-network-learning/human-to-machine.png)

### 训练数据和测试数据

机器学习中，一般将数据分为**训练数据**和**测试数据**两部分来进行学习和实验。

首先，使用训练数据进行学习，寻找最优的参数；然后，使用测试数据评价训练得到的模型的实际能力。

::detail

#title
泛化能力
#default
泛化能力是指处理未被观察过的数据（不包含在训练数据中的数据）的能力。**获得泛化能力是机器学习的最终目标**。

比如，在识别手写数字的问题中，泛化能力可能会被用在自动读取明信片的邮政编码的系统上。此时，手写数字识别就必须具备较高的识别 “某个人” 写的字的能力。注意这里不是 “特定的某个人写的特定的文字”，而是 “任意一个人写的任意文字”。如果系统只能正确识别已有的训练数据，那有可能是只学习到了训练数据中的个人的习惯写法。

因此，仅仅用一个数据集去学习和评价参数，是无法进行正确评价的。这样会导致可以顺利地处理某个数据集，但无法处理其他数据集的情况。

::

## 损失函数

神经网络的学习通过某个指标表示现在的状态。然后，以这个指标为基准，寻找最优权重参数。神经网络的学习中所用的指标称为**损失函数**(loss function)，衡量的方式是比较网络输出和真实输出的差异。这个损失函数可以使用任意函数，但一般用**均方误差**和**交叉熵误差**等。

### 回归任务损失函数(MAE 损失函数)

**Mean absolute loss**(MAE) 也被称为 L1 Loss，是以绝对误差作为距离

$$L = \frac{1}{n} \sum_{n} |y_i - f(x_i)|$$

由于 L1 loss 具有稀疏性，为了乘法较大的值，因此常常将其作为正则项添加到其它 loss 中作为约束

L1 loss 的最大问题是梯度在零点不平滑，导致会跳过极小值

::detail

#title
PyTorch 实现
#default

```python
y_true = torch.tensor([2.0, 2.0, 2.0], dtype=torch.float) # 手动创建样本真实值
y_pred = torch.tensor([1.0, 1.0, 1.9], requires_grad=True) # 手动创建样本预测值
criterion = nn.L1Loss() # 创建损失函数
loss = criterion(y_pred, y_true) # 计算损失值
print(f'loss: {loss}')
```

::

### 均方误差(MSE 损失函数)

可以用作损失函数的函数有很多，其中最有名的是**均方误差**(mean squared error, MSE)。它以误差的平方和的均值作为距离

$$E = \frac{1}{2} \sum_{k} (y_k - t_k)^2$$

- $y_k$: 神经网络的输出

- $t_k$: 监督数据

- $k$: 数据的维数。

均方误差会计算神经网络的输出和正确解监督数据的各个元素之差的平方，再求总和。

```python
def mean_squared_error(y, t):
    return 0.5 * np.sum((y-t)**2)
```

::tip

- L2 loss 也常常作为正则项

- 当预测值与目标值相差很大时，梯度容易爆炸

::

::detail

#title
手写数字识别的例子
#default
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

::

::detail

#title
PyTorch 实现
#default

```python
y_true = torch.tensor([2.0, 2.0, 2.0], dtype=torch.float) # 手动创建样本真实值
y_pred = torch.tensor([1.0, 1.0, 1.9], requires_grad=True) # 手动创建样本预测值
criterion = nn.MSELoss() # 创建损失函数
loss = criterion(y_pred, y_true) # 计算损失值
print(f'loss: {loss}')
```

::

### 交叉熵误差(softmax 损失)

除了均方误差之外，**交叉熵误差**(cross entropy error) 也经常被用作损失函数。交叉熵误差如下式所示：

$$E = - \sum_{k} t_k \log y_k$$

- $log$: 表示以 e 为底数的自然对数($log_e$)

- $y_k$: 神经网络的输出

- $t_k$: 正确解标签。并且，$t_k$ 中只有正确解标签的索引为 1，其他均为 0(one-hot 表示)

::tip

该式实际上只计算对应正确解标签的输出的自然对数。

比如，假设正确解标签的索引是 2，与之对应的神经网络的输出是 0.6，则交叉熵误差是 $−log0.6 = 0.51$； 若 2 对应的输出是 0.1，则交叉熵误差为 $−log0.1=2.30$。也就是说，交叉熵误差的值是由正确解标签所对应的输出结果决定的。

::

```python
def cross_entropy_error(y, t):
    delta = 1e-7
    return -np.sum(t * np.log(y + delta))
```

::detail

#title
代码解释
#default
这里，参数 y 和 t 是 NumPy 数组。函数内部在计算 np.log 时，加上了一个微小值 delta。这是因为，当出现 np.log(0) 时，np.log(0) 会变为负无限大的 -inf，这样一来就会导致后续计算无法进行。作为保护性对策，添加一个微小值可以防止负无限大的发生。

::

::detail

#title
实例解释
#default

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

::

::detail

#title
PyTorch 实现
#default

```python
y_true = torch.tensor([1, 2]) # 手动创建样本真实值
y_pred = torch.tensor([[0.1, 0.8, 0.1], [0.7, 0.2, 0.1]], requires_grad=True, dtype=torch.float) # 手动创建样本预测值
criterion = nn.CrossEntropyLoss() # 创建损失函数
loss = criterion(y_pred, y_true) # 计算损失值
print(f'loss: {loss}')
```

::

### 二分类任务损失函数

在处理二分类任务是，我们不再使用 softmax 激活函数，而是使用 sigmoid 激活函数，那损失函数也相应的进行调整，使用二分类的交叉熵损失函数:

$$ L = -y \log y' - (1 - y) \log (1 - y')$$

- $y$: 样本 x 属于某一个类别的真实概率

- $y'$: 样本属于某一类别的预测概率

- $L$: 用来衡量真实值 $y$ 与预测值 $y'$ 之间差异性的损失结果

::detail

#title
PyTorch 实现
#default

```python
y_true = torch.tensor([0, 1, 0], dtype=torch.float) # 手动创建样本真实值
y_pred = torch.tensor([0.6901, 0.5423, 0.2639]) # 手动创建样本预测值
criterion = nn.BCELoss() # 创建损失函数
loss = criterion(y_pred, y_true) # 计算损失值
print(f'loss: {loss}')
```

::

### 回归任务损失函数(Smooth L1 损失函数)

Smooth L1 说的是光滑之后的 L1

$$
{smooth}_{L1}(x) = \begin{cases}
0.5x^2 & (|x| < 1) \\
|x| - 0.5 & (otherwise)
\end{cases}
$$

在 [-1, 1] 之间实际上就是 L2 损失，这样解决了 L1 的不光滑问题

在 [-1, 1] 区间外，实际上就是 L1 损失，这样就解决了离群点梯度爆炸的问题

::detail

#title
PyTorch 实现
#default

```python
y_true = torch.tensor([2.0, 2.0, 2.0], dtype=torch.float) # 手动创建样本真实值
y_pred = torch.tensor([1.0, 1.0, 1.9], requires_grad=True) # 手动创建样本预测值
criterion = nn.SmoothL1Loss() # 创建损失函数
loss = criterion(y_pred, y_true) # 计算损失值
print(f'loss: {loss}')
```

::

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

::code-group

```python [同时处理单个数据和批量数据（数据作为 batch 集中输入）]
def cross_entropy_error(y, t):
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)
    batch_size = y.shape[0]
    return -np.sum(t * np.log(y + 1e-7)) / batch_size
```

```python [监督数据是标签形式（非 one-hot 表示，而是像 2、7 这样的标签）]
def cross_entropy_error(y, t):
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)
    batch_size = y.shape[0]
    return -np.sum(np.log(y[np.arange(batch_size), t] + 1e-7)) / batch_size
```

::

实现的要点是，由于 one-hot 表示中 t 为 0 的元素的交叉熵误差也为 0，因此针对这些元素的计算可以忽略。

### 为何要设定损失函数

假设有一个神经网络，现在我们来关注这个神经网络中的某一个权重参数。

此时，对该权重参数的损失函数求导，表示的是 “如果稍微改变这个权重参数的值，损失函数的值会如何变化”。

如果导数的值为负，通过使该权重参数向正方向改变，可以减小损失函数的值；反过来，如果导数的值为正，则通过使该权重参数向负方向改变，可以减小损失函数的值。

不过，当导数的值为 0 时，无论权重参数向哪个方向变化，损失函数的值都不会改变，此时该权重参数的更新会停在此处。

::tip

在进行神经网络的学习时，不能将识别精度作为指标。因为如果以识别精度为指标，则参数的导数在绝大多数地方都会变为 0。

::

::detail

#title
为什么用识别精度作为指标时，参数的导数在绝大多数地方都会变成 0 呢？
#default
假设某个神经网络正确识别出了 100 笔训练数据中的 32 笔，此时识别精度为 32%。

如果以识别精度为指标，即使稍微改变权重参数的值，识别精度也仍将保持在 32%，不会出现变化。

也就是说，**仅仅微调参数，是无法改善识别精度的**。即便识别精度有所改善，它的值也不会像 32.0123...%这样连续变化，而是变为 33%、34% 这样的不连续的、离散的值。

而如果把损失函数作为指标，则当前损失函数的值可以表示为 0.92543...这样的值。并且，如果稍微改变一下参数的值，对应的损失函数也会像 0.93432...这样发生连续性的变化。

::

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

::detail

#title
代码解释
#default
这里，我们假定向参数输入了一个 NumPy 数组。函数的内部实现比较简单，先计算 NumPy 数组中各个元素的平方，再求它们的和（np.sum(x\*\*2)也可以实现同样的处理）。

::

![函数图像](/images/content/deep-learning/neural-network-learning/function_2.png)

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

::detail

#title
实例计算
#default

```python
def function_2(x):
    return x[0]**2 + x[1]**2

print(numerical_gradient(function_2, np.array([3.0, 4.0]))) # [6. 8.]
print(numerical_gradient(function_2, np.array([0.0, 2.0]))) # [0. 4.]
print(numerical_gradient(function_2, np.array([3.0, 0.0]))) # [6. 0.]
```

::

### 梯度法

机器学习的主要任务是在学习时寻找最优参数。同样地，神经网络也必须在学习时找到最优参数（权重和偏置）。这里所说的最优参数是指损失函数取最小值时的参数。

但是，一般而言，损失函数很复杂，参数空间庞大，我们不知道它在何处能取得最小值。而通过巧妙地使用梯度来寻找函数最小值（或者尽可能小的值）的方法就是**梯度法**（gradient method）。梯度法是解决机器学习中最优化问题的常用方法，特别是在神经网络的学习中经常被使用。

::warning

梯度表示的是各点处的函数值减小最多的方向。因此，无法保证梯度所指的方向就是函数的最小值或者真正应该前进的方向。实际上，在复杂的函数中，梯度指示的方向基本上都不是函数值最小处。

虽然梯度的方向并不一定指向最小值，但沿着它的方向能够最大限度地减小函数的值。因此，在寻找函数的最小值（或者尽可能小的值）的位置的任务中，要以梯度的信息为线索，决定前进的方向。

::

在梯度法中，函数的取值从当前位置沿着梯度方向前进一定距离，然后在新的地方重新求梯度，再沿着新梯度方向前进，如此反复，不断地沿梯度方向前进，通过不断地沿梯度方向前进，逐渐减小函数值。

现在，我们尝试用数学式来表示梯度法：

$$x_0 = x_0 - \eta \frac{\partial f}{\partial x_0}$$

$$x_1 = x_1 - \eta \frac{\partial f}{\partial x_1}$$

这里的 $\eta$ 表示更新量，在神经网络的学习中，称为**学习率**（learning rate）。学习率决定在一次学习中，应该学习多少，以及在多大程度上更新参数。

::tip

该式是表示更新一次的式子，这个步骤会反复执行。也就是说，每一步都按该式更新变量的值，通过反复执行此步骤，逐渐减小函数值。

::

```python
def gradient_descent(f, init_x, lr=0.01, step_num=100):
    x = init_x
    for i in range(step_num):
        grad = numerical_gradient(f, x)
        x -= lr * grad
    return x
```

::detail

#title
代码解释
#default
参数 f 是要进行最优化的函数，init_x 是初始值，lr 是学习率，step_num 是梯度法的重复次数。

`numerical_gradient(f,x)` 会求函数的梯度，用该梯度乘以学习率得到的值进行更新操作，由 step_num 指定重复的次数。

::

::detail

#title
实例计算
#default
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

![梯度法的更新过程](/images/content/deep-learning/neural-network-learning/gradient-method.png)

::

::warning

学习率过大或者过小都无法得到好的结果：

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

::

### 神经网络的梯度

神经网络的学习也要求梯度。这里所说的梯度是指损失函数关于权重参数的梯度。

::detail

#title
实例计算
#default
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

::

求出神经网络的梯度后，接下来只需根据梯度法，更新权重参数即可。

## 学习算法的实现

神经网络的学习步骤如下所示：

> 前提：神经网络存在合适的权重和偏置，调整权重和偏置以便拟合训练数据的过程称为 “学习”

> 步骤 1（mini-batch 梯度法）：从训练数据中随机选出一部分数据，这部分数据称为 mini-batch。我们的目标是减小 mini-batch 的损失函数的值。

> 步骤 2（计算梯度）：为了减小 mini-batch 的损失函数的值，需要求出各个权重参数的梯度。梯度表示损失函数的值减小最多的方向。

> 步骤 3（更新参数）：将权重参数沿梯度方向进行微小更新。

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

::detail

#title
`params` 和 `grads`
#default
TwoLayerNet 类有 params 和 grads 两个字典型实例变量。params 变量中保存了权重参数，比如 `params['W1']` 以 NumPy 数组的形式保存了第 1 层的权重参数。

```python
net = TwoLayerNet(input_size=784, hidden_size=100, output_size=10)
net.params['W1'].shape # (784, 100)
net.params['b1'].shape # (100,)
net.params['W2'].shape # (100, 10)
net.params['b2'].shape # (10,)
```

::

::detail

#title
`__init__` 方法
#default
进行手写数字识别时，输入图像的大小是 784（28×28），输出为 10 个类别，所以指定参数 `input_size=784`、`output_size=10`，将隐藏层的个数 hidden_size 设置为一个合适的值即可。

这里权重使用符合高斯分布的随机数进行初始化，偏置使用 0 进行初始化。

::

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

::detail

#title
代码解释
#default
这里，mini-batch 的大小为 100，需要每次从 60000 个训练数据中随机取出 100 个数据（图像数据和正确解标签数据）。

然后，对这个包含 100 笔数据的 mini-batch 求梯度，使用随机梯度下降法（SGD）更新参数。这里，梯度法的更新次数（循环的次数）为 10000。每更新一次，都对训练数据计算损失函数的值，并把该值添加到数组中。

::

用图像来表示这个损失函数的值的推移：

![损失函数的推移](/images/content/deep-learning/neural-network-learning/loss-function.png)

可以发现随着学习的进行，损失函数的值在不断减小。这是学习正常进行的信号，表示神经网络的权重参数在逐渐拟合数据。也就是说，神经网络的确在学习！通过反复地向它浇灌（输入）数据，神经网络正在逐渐向最优参数靠近。

### 基于测试数据的评价

根据上图所示，我们确认了通过反复学习可以使损失函数的值逐渐减小这一事实。

不过这个损失函数的值，严格地讲是 “对训练数据的某个 mini-batch 的损失函数” 的值。训练数据的损失函数值减小，虽说是神经网络的学习正常进行的一个信号，但光看这个结果还不能说明该神经网络在其他数据集上也一定能有同等程度的表现。

神经网络的学习中，必须确认是否能够正确识别训练数据以外的其他数据，即确认是否会发生**过拟合**（过拟合是指，虽然训练数据中的数字图像能被正确辨别，但是不在训练数据中的数字图像却无法被识别的现象）

神经网络学习的最初目标是掌握泛化能力，因此，要评价神经网络的泛化能力，就必须使用不包含在训练数据中的数据。下面的代码在进行学习的过程中，会定期地对训练数据和测试数据记录识别精度。这里，每经过一个 epoch，我们都会记录下训练数据和测试数据的识别精度：

::detail

#title
什么是 epoch
#default
**epoch** 是一个单位。一个 epoch 表示学习中所有训练数据均被使用过一次时的更新次数。

比如，对于 60000 笔训练数据，用大小为 100 笔数据的 mini-batch 进行学习时，重复随机梯度下降法 600 次，所有的训练数据就都被 “看过” 了。此时，600 次就是一个 epoch。

::

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

![训练数据和测试数据的识别精度的推移（横轴的单位是epoch）](/images/content/deep-learning/neural-network-learning/recognition-accuracy.png)

> 图中实线表示训练数据的识别精度，虚线表示测试数据的识别精度。

如图所示，随着 epoch 的前进（学习的进行），我们发现使用训练数据和测试数据评价的识别精度都提高了，并且，这两个识别精度基本上没有差异（两条线基本重叠在一起）。因此，可以说这次的学习中没有发生过拟合的现象

## 参数的优化方法

神经网络的学习的目的是找到使损失函数的值尽可能小的参数。这是寻找最优参数的问题，解决这个问题的过程称为**最优化**（optimization）。但遗憾的是，神经网络的最优化问题非常难。这是因为参数空间非常复杂，无法轻易找到最优解（无法使用那种通过解数学式一下子就求得最小值的方法）。而且，在深度神经网络中，参数的数量非常庞大，导致最优化问题更加复杂

在深度学习中，梯度下降的集中方式的根本区别就在于 Batch Size 不同

### SGD(梯度下降法)

之前我们为了找到最优参数，我们将参数的梯度（导数）作为了线索。使用参数的梯度，沿梯度方向更新参数，并重复这个步骤多次，从而逐渐靠近最优参数，这个过程称为**随机梯度下降法**（stochastic gradient descent），简称 **SGD**

SGD 是一个简单的方法，比起胡乱地搜索参数空间，也算是 “聪明” 的方法。但是，根据不同的问题，也存在比 SGD 更加聪明的方法

梯度下降法是一种寻找使损失函数最小化的方法。从数学角度来看，梯度的方向使函数增长速度最快的方向，那么梯度的反方向就是函数减少最快的方向

用数学式可以将 SGD 写成如下的式：

![SGD数学式](/images/content/deep-learning/learning-skill/SGD.png)

> $W$：需要更新的权重参数

> $\frac{\partial L}{\partial W}$：损失函数关于 $W$ 的梯度

> $\eta$：学习率，实际上会取 0.01 或 0.001 这些事先决定好的值，如果学习率太小，那么每次训练之后得到的效果都太小；如果学习率太大，那就有可能直接跳过最优解

> ←：表示用右边的值更新左边的值

可知，SGD 是朝着梯度方向只前进一定距离的简单方法。现在，我们将 SGD 实现为一个 Python 类（为方便后面使用，我们将其实现为一个名为 SGD 的类）：

```python
class SGD:
    def __init__(self, lr=0.01):
        self.lr = lr
    def update(self, params, grads):
        for key in params.keys():
            params[key] -= self.lr * grads[key]
```

::detail

#title
代码解释
#default
这里，进行初始化时的参数 `lr` 表示 learning rate（学习率）。这个学习率会保存为实例变量。

代码段中还定义了 `update(params, grads)` 方法，这个方法在 SGD 中会被反复调用。

参数 `params` 和 `grads`（与之前的神经网络的实现一样）是字典型变量，按 `params['W1']`、`grads['W1']` 的形式，分别保存了权重参数和它们的梯度。

::

使用这个 SGD 类，可以按如下方式进行神经网络的参数的更新（下面的代码是不能实际运行的伪代码）。

```
network = TwoLayerNet(...)
optimizer = SGD()
for i in range(10000):
    ...
    x_batch, t_batch = get_mini_batch(...) # mini-batch
    grads = network.gradient(x_batch, t_batch)
    params = network.params
optimizer.update(params, grads)
```

::detail

#title
伪代码解释
#default
这里首次出现的变量名 `optimizer` 表示 “进行最优化的人” 的意思，这里由 SGD 承担这个角色。参数的更新由 optimizer 负责完成。我们在这里需要做的只是将参数和梯度的信息传给 `optimizer`。

::

像这样，通过单独实现进行最优化的类，功能的模块化变得更简单。这样一来，只需要将 `SGD()` 换成其它可行的优化类，就可以实现快速切换。

### SGD 的缺点

虽然SGD简单，并且容易实现，但是在解决某些问题时可能没有效率。

::detail

#title
具体示例
#default
我们来思考一下求下面这个函数的最小值的问题：

$$ f(x, y) = \frac{1}{20}x^2 + y^2 $$

![图形（左图）和等高线（右图）](/images/content/deep-learning/learning-skill/SGD-example.png)

> $f(x, y) = \frac{1}{20}x^2 + y^2$ 的图形（左图）和它的等高线（右图）

该函数数是向 x 轴方向延伸的 “碗” 状函数，且等高线呈向 x 轴方向延伸的椭圆状。

如果用图表示梯度的话，则如下所示：

![梯度图](/images/content/deep-learning/learning-skill/SGD-gradient.png)

这个梯度的特征是，y 轴方向上大，x 轴方向上小。换句话说，就是 y 轴方向的坡度大，而 x 轴方向的坡度小。这里需要注意的是，虽然这个函数的最小值在 (x,y)=(0,0) 处，但是图中的梯度在很多地方并没有指向(0,0)。

我们来尝试对这种形状的函数应用 SGD。从 (x,y)=(−7.0,2.0) 处（初始值）开始搜索：

![基于SGD的最优化的更新路径：呈 “之” 字形朝最小值(0,0)移动，效率低](/images/content/deep-learning/learning-skill/SGD-search.png)

结果显示，SGD 呈 “之” 字形移动。这是一个相当低效的路径。也就是说，SGD 的缺点是，如果函数的形状非均向（anisotropic），比如呈延伸状，搜索的路径就会非常低效。

::

因此，我们需要比单纯朝梯度方向前进的 SGD 更聪明的方法。SGD 低效的根本原因是，梯度的方向并没有指向最小值的方向。

为了改正 SGD 的缺点，下面我们将介绍 **Momentum**、**AdaGrad**、**Adam** 这 3 种方法来取代 SGD。

### Momentum

**Momentum**是 “动量” 的意思，和物理有关。用数学式表示 Momentum 方法，如下所示：

![Momentum 数学式](/images/content/deep-learning/learning-skill/Momentum.png)

> $W$：需要更新的权重参数
>
> $\frac{\partial L}{\partial W}$：损失函数关于 $W$ 的梯度
>
> $\eta$：学习率
>
> $v$：对应物理上的速度
>
> ←：表示用右边的值更新左边的值
>
> $a$：承担逐渐减速的任务

该式表示了物体在梯度方向上受力，在这个力的作用下，物体的速度增加这一物理法则。

::detail

#title
具体示例
#default
Momentum 方法给人的感觉就像是小球在地面上滚动：

![小球滚动](/images/content/deep-learning/learning-skill/Momentum-ball.png)

::

同时式中有 $αv$ 这一项。在物体不受任何力时，该项承担使物体逐渐减速的任务（$α$ 设定为 0.9 之类的值），对应物理上的地面摩擦或空气阻力。

```python
class Momentum:
    def __init__(self, lr=0.01, momentum=0.9):
        self.lr = lr
        self.momentum = momentum
        self.v = None
    def update(self, params, grads):
        if self.v is None:
            self.v = {}
            for key, val in params.items():
                self.v[key] = np.zeros_like(val)
        for key in params.keys():
            self.v[key] = self.momentum*self.v[key] - self.lr*grads[key]
            params[key] += self.v[key]
```

::detail

#title
代码解释
#default
实例变量 `v` 会保存物体的速度。初始化时，`v` 中什么都不保存，但当第一次调用 `update()` 时，`v` 会以字典型变量的形式保存与参数结构相同的数据。

::

现在尝试使用 Momentum 解决函数 $f(x, y) = \frac{1}{20}x^2 + y^2$ 的最优化问题：

![基于 Momentum 的最优化的更新路径](/images/content/deep-learning/learning-skill/Momentum-search.png)

可以看到，更新路径就像小球在碗中滚动一样。

和 SGD 相比，我们发现 “之” 字形的 “程度” 减轻了。这是因为虽然 x 轴方向上受到的力非常小，但是一直在同一方向上受力，所以朝同一个方向会有一定的加速。反过来，虽然 y 轴方向上受到的力很大，但是因为交互地受到正方向和反方向的力，它们会互相抵消，所以 y 轴方向上的速度不稳定。

因此，和 SGD 时的情形相比，可以更快地朝 x 轴方向靠近，减弱 “之” 字形的变动程度。

### AdaGrad

在神经网络的学习中，学习率（数学式中记为 $η$）的值很重要。学习率过小，会导致学习花费过多时间；反过来，学习率过大，则会导致学习发散而不能正确进行。

在关于学习率的有效技巧中，有一种被称为**学习率衰减**（learning ratedecay）的方法，即随着学习的进行，使学习率逐渐减小。实际上，一开始 “多” 学，然后逐渐 “少” 学的方法，在神经网络的学习中经常被使用。

逐渐减小学习率的想法，相当于将 “全体” 参数的学习率值一起降低。而 **AdaGrad** 进一步发展了这个想法，针对 “一个一个” 的参数，赋予其 “定制” 的值。

AdaGrad 会为参数的每个元素适当地调整学习率，与此同时进行学习（AdaGrad 的 Ada 来自英文单词 Adaptive，即 “适当的” 的意思）。

![AdaGrad 数学式](/images/content/deep-learning/learning-skill/AdaGrad.png)

> $W$：需要更新的权重参数
>
> $\frac{\partial L}{\partial W}$：损失函数关于 $W$ 的梯度
>
> $\eta$：学习率
>
> $h$：保存了以前的所有梯度值的平方和
>
> ←：表示用右边的值更新左边的值
>
> ʘ：对应矩阵元素的乘法

在更新参数时，通过乘以 $\frac{1}{\sqrt{h}}$，就可以调整学习的尺度。这意味着，参数的元素中变动较大（被大幅更新）的元素的学习率将变小。也就是说，可以按参数的元素进行学习率衰减，使变动大的参数的学习率逐渐减小。

::warning

AdaGrad 会记录过去所有梯度的平方和。因此，学习越深入，更新的幅度就越小。实际上，如果无止境地学习，更新量就会变为 0，完全不再更新。为了改善这个问题，可以使用 RMSProp 方法。RMSProp 方法并不是将过去所有的梯度一视同仁地相加，而是逐渐地遗忘过去的梯度，在做加法运算时将新梯度的信息更多地反映出来。这种操作从专业上讲，称为 “指数移动平均”，呈指数函数式地减小过去的梯度的尺度。

::

```python
class AdaGrad:
    def __init__(self, lr=0.01):
        self.lr = lr
        self.h = None
    def update(self, params, grads):
        if self.h is None:
            self.h = {}
            for key, val in params.items():
                self.h[key] = np.zeros_like(val)
        for key in params.keys():
            self.h[key] += grads[key] * grads[key]
            params[key] -= self.lr * grads[key] / (np.sqrt(self.h[key]) + 1e-7)
```

::detail

#title
代码解释
#default
这里需要注意的是，最后一行加上了微小值 `1e-7`。这是为了防止当 `self.h[key]` 中有 0 时，将 0 用作除数的情况。在很多深度学习的框架中，这个微小值也可以设定为参数，但这里我们用的是 `1e-7` 这个固定值。

::

现在，让我们试着使用 AdaGrad 解决函数 $f(x, y) = \frac{1}{20}x^2 + y^2$ 的最优化问题：

![基于 AdaGrad 的最优化的更新路径](/images/content/deep-learning/learning-skill/AdaGrad-search.png)

可知，函数的取值高效地向着最小值移动。由于 y 轴方向上的梯度较大，因此刚开始变动较大，但是后面会根据这个较大的变动按比例进行调整，减小更新的步伐。因此，y 轴方向上的更新程度被减弱，“之” 字形的变动程度有所衰减。

### Adam

Momentum 参照小球在碗中滚动的物理规则进行移动，AdaGrad 为参数的每个元素适当地调整更新步伐。如果将这两个方法融合在一起会怎么样呢？这就是 **Adam** 方法的基本思路。

Adam 是 2015 年提出的方法。它的理论有些复杂，直观地讲，就是融合了 Momentum 和 AdaGrad 的方法。通过组合前面两个方法的优点，有望实现参数空间的高效搜索。此外，进行超参数的 “偏置校正” 也是 Adam 的特征。

```python
class Adam:
    def __init__(self, lr=0.001, beta1=0.9, beta2=0.999):
        self.lr = lr
        self.beta1 = beta1
        self.beta2 = beta2
        self.iter = 0
        self.m = None
        self.v = None
    def update(self, params, grads):
        if self.m is None:
            self.m, self.v = {}, {}
            for key, val in params.items():
                self.m[key] = np.zeros_like(val)
                self.v[key] = np.zeros_like(val)
        self.iter += 1
        lr_t  = self.lr * np.sqrt(1.0 - self.beta2**self.iter) / (1.0 - self.beta1**self.iter)
        for key in params.keys():
            self.m[key] += (1 - self.beta1) * (grads[key] - self.m[key])
            self.v[key] += (1 - self.beta2) * (grads[key]**2 - self.v[key])
            params[key] -= lr_t * self.m[key] / (np.sqrt(self.v[key]) + 1e-7)
```

现在尝试使用 Adam 解决函数 $f(x, y) = \frac{1}{20}x^2 + y^2$ 的最优化问题：

![基于 Adam 的最优化的更新路径](/images/content/deep-learning/learning-skill/Adam-search.png)

基于 Adam 的更新过程就像小球在碗中滚动一样。虽然 Momentun 也有类似的移动，但是相比之下，Adam 的小球左右摇晃的程度有所减轻。这得益于学习的更新程度被适当地调整了。

::tip

Adam 会设置 3 个超参数。一个是学习率（论文中以 $α$ 出现），另外两个是一次 momentum 系数 $β_1$ 和二次 momentum 系数 $β_2$。根据论文，标准的设定值是 $β_1$ 为 0.9，$β_2$ 为 0.999。设置了这些值后，大多数情况下都能顺利运行。

::

### 使用哪种更新方法呢

这里我们来比较一下 SGD、Momentum、AdaGrad、Adam 这 4 种方法：

```python
import sys, os
sys.path.append(os.pardir)
import numpy as np
import matplotlib.pyplot as plt
from collections import OrderedDict
from common.optimizer import *

def f(x, y):
    return x**2 / 20.0 + y**2

def df(x, y):
    return x / 10.0, 2.0*y

init_pos = (-7.0, 2.0)
params = {}
params['x'], params['y'] = init_pos[0], init_pos[1]
grads = {}
grads['x'], grads['y'] = 0, 0

optimizers = OrderedDict()
optimizers["SGD"] = SGD(lr=0.95)
optimizers["Momentum"] = Momentum(lr=0.1)
optimizers["AdaGrad"] = AdaGrad(lr=1.5)
optimizers["Adam"] = Adam(lr=0.3)

idx = 1

for key in optimizers:
    optimizer = optimizers[key]
    x_history = []
    y_history = []
    params['x'], params['y'] = init_pos[0], init_pos[1]

    for i in range(30):
        x_history.append(params['x'])
        y_history.append(params['y'])

        grads['x'], grads['y'] = df(params['x'], params['y'])
        optimizer.update(params, grads)

    x = np.arange(-10, 10, 0.01)
    y = np.arange(-5, 5, 0.01)

    X, Y = np.meshgrid(x, y)
    Z = f(X, Y)

    # for simple contour line
    mask = Z > 7
    Z[mask] = 0

    # plot
    plt.subplot(2, 2, idx)
    idx += 1
    plt.plot(x_history, y_history, 'o-', color="red")
    plt.contour(X, Y, Z)
    plt.ylim(-10, 10)
    plt.xlim(-10, 10)
    plt.plot(0, 0, '+')
    plt.title(key)
    plt.xlabel("x")
    plt.ylabel("y")

plt.show()
```

![最优化方法的比较：SGD、Momentum、AdaGrad、Adam](/images/content/deep-learning/learning-skill/optimizer-compare.png)

根据使用的方法不同，参数更新的路径也不同。只看这个图的话，AdaGrad 似乎是最好的，不过也要注意，结果会根据要解决的问题而变。并且，很显然，超参数（学习率等）的设定值不同，结果也会发生变化。

这 4 种方法各有各的特点，都有各自擅长解决的问题和不擅长解决的问题。很多研究中至今仍在使用 SGD。Momentum 和 AdaGrad 也是值得一试的方法。最近，很多研究人员和技术人员都喜欢用 Adam。

::detail

#title
基于 MNIST 数据集的更新方法的比较
#default
我们以手写数字识别为例，比较前面介绍的 SGD、Momentum、AdaGrad、Adam 这 4 种方法，并确认不同的方法在学习进展上有多大程度的差异。

```python
# coding: utf-8
import os
import sys
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
import matplotlib.pyplot as plt
from dataset.mnist import load_mnist
from common.util import smooth_curve
from common.multi_layer_net import MultiLayerNet
from common.optimizer import *


# 0:读入MNIST数据==========
(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True)

train_size = x_train.shape[0]
batch_size = 128
max_iterations = 2000


# 1:进行实验的设置==========
optimizers = {}
optimizers['SGD'] = SGD()
optimizers['Momentum'] = Momentum()
optimizers['AdaGrad'] = AdaGrad()
optimizers['Adam'] = Adam()
#optimizers['RMSprop'] = RMSprop()

networks = {}
train_loss = {}
for key in optimizers.keys():
    networks[key] = MultiLayerNet(
        input_size=784, hidden_size_list=[100, 100, 100, 100],
        output_size=10)
    train_loss[key] = []


# 2:开始训练==========
for i in range(max_iterations):
    batch_mask = np.random.choice(train_size, batch_size)
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    for key in optimizers.keys():
        grads = networks[key].gradient(x_batch, t_batch)
        optimizers[key].update(networks[key].params, grads)

        loss = networks[key].loss(x_batch, t_batch)
        train_loss[key].append(loss)

    if i % 100 == 0:
        print( "===========" + "iteration:" + str(i) + "===========")
        for key in optimizers.keys():
            loss = networks[key].loss(x_batch, t_batch)
            print(key + ":" + str(loss))


# 3.绘制图形==========
markers = {"SGD": "o", "Momentum": "x", "AdaGrad": "s", "Adam": "D"}
x = np.arange(max_iterations)
for key in optimizers.keys():
    plt.plot(x, smooth_curve(train_loss[key]), marker=markers[key], markevery=100, label=key)
plt.xlabel("iterations")
plt.ylabel("loss")
plt.ylim(0, 1)
plt.legend()
plt.show()
```

> 这个实验以一个 5 层神经网络为对象，其中每层有 100 个神经元。激活函数使用的是 ReLU。

![基于MNIST数据集的更新方法的比较](/images/content/deep-learning/learning-skill/optimizer-compare-mnist.png)

从图中结果可知，与 SGD 相比，其他 3 种方法学习得更快，而且速度基本相同，仔细看的话，AdaGrad 的学习进行得稍微快一点。这个实验需要注意的地方是，实验结果会随学习率等超参数、神经网络的结构（几层深等）的不同而发生变化。不过，一般而言，与 SGD 相比，其他 3 种方法可以学习得更快，有时最终的识别精度也更高。

::

## 参数初始值

在神经网络的学习中，权重的初始值特别重要。实际上，设定什么样的权重初始值，经常关系到神经网络的学习能否成功。

**参数初始化的作用**:

- 防止梯度消失或爆炸: 初始权重值过大或过小会导致梯度在反向传播中指数级增大或缩小

- 提高收敛速度: 合理的初始化使得网络的激活值分布适中，有助于梯度高效更新

- 保持对称性破除: 权重的初始化需要打破对称性，否则网络的学习能力会受到限制

### 可以将权重初始值设为 0 吗

**权值衰减**（weight decay）是一种抑制过拟合、提高泛化能力的技巧。简单地说，权值衰减就是一种以减小权重参数的值为目的进行学习的方法。通过减小权重参数的值来抑制过拟合的发生。

如果想减小权重的值，一开始就将初始值设为较小的值才是正途。

::tip

之前我们的权重初始值都是像 `0.01 * np.random.randn(10, 100)` 这样，使用由高斯分布生成的值乘以 0.01 后得到的值（标准差为 0.01 的高斯分布）。

::

如果我们把权重初始值全部设为 0 以减小权重的值，会怎么样呢？从结论来说，将权重初始值设为 0 不是一个好主意。事实上，将权重初始值设为 0 的话，将无法正确进行学习。

为什么不能将权重初始值设为 0 呢？严格地说，为什么不能将权重初始值设成一样的值呢？这是因为在误差反向传播法中，所有的权重值都会进行相同的更新。

比如，在 2 层神经网络中，假设第 1 层和第 2 层的权重为 0。这样一来，正向传播时，因为输入层的权重为 0，所以第 2 层的神经元全部会被传递相同的值。第 2 层的神经元中全部输入相同的值，这意味着反向传播时第 2 层的权重全部都会进行相同的更新（“乘法节点的反向传播”）。因此，权重被更新为相同的值，并拥有了对称的值（重复的值）。这使得神经网络拥有许多不同的权重的意义丧失了。为了防止 “权重均一化”（严格地讲，是为了瓦解权重的对称结构），必须随机生成初始值。

### 隐藏层的激活值的分布

观察隐藏层的激活值（激活函数的输出数据）的分布，可以获得很多启发。我们来做一个简单的实验，观察权重初始值是如何影响隐藏层的激活值的分布的。

这里要做的实验是，向一个 5 层神经网络（激活函数使用 sigmoid 函数）传入随机生成的输入数据，用直方图绘制各层激活值的数据分布。

```python
import numpy as np
import matplotlib.pyplot as plt

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def ReLU(x):
    return np.maximum(0, x)

def tanh(x):
    return np.tanh(x)

input_data = np.random.randn(1000, 100)  # 1000个数据
node_num = 100  # 各隐藏层的节点（神经元）数
hidden_layer_size = 5  # 隐藏层有5层
activations = {}  # 激活值的结果保存在这里

x = input_data

for i in range(hidden_layer_size):
    if i != 0:
        x = activations[i-1]

    # 改变初始值进行实验！
    w = np.random.randn(node_num, node_num) * 1 # 标准差为 1 的高斯分布
    # w = np.random.randn(node_num, node_num) * 0.01 # 标准差为 0.01 的高斯分布
    # w = np.random.randn(node_num, node_num) * np.sqrt(1.0 / node_num) # Xaiver初始值
    # w = np.random.randn(node_num, node_num) * np.sqrt(2.0 / node_num) # He 初始值

    a = np.dot(x, w)

    # 将激活函数的种类也改变，来进行实验！
    z = sigmoid(a)
    # z = ReLU(a)
    # z = tanh(a)

    activations[i] = z

# 绘制直方图
for i, a in activations.items():
    plt.subplot(1, len(activations), i+1)
    plt.title(str(i+1) + "-layer")
    if i != 0: plt.yticks([], [])
    # plt.xlim(0.1, 1)
    # plt.ylim(0, 7000)
    plt.hist(a.flatten(), 30, range=(0,1))
plt.show()
```

::detail

#title
代码解释
#default
这里假设神经网络有 5 层，每层有 100 个神经元。

然后，用高斯分布随机生成 1000 个数据作为输入数据，并把它们传给 5 层神经网络。

激活函数使用 sigmoid 函数，各层的激活值的结果保存在 activations 变量中。

这个代码段中需要注意的是权重的尺度。虽然这次我们使用的是标准差为 1 的高斯分布，但实验的目的是通过改变这个尺度（标准差），观察激活值的分布如何变化。

::

运行这段代码后，可以得到使用标准差为 **1** 的高斯分布作为权重初始值时的各层激活值的分布：

![使用标准差为 1 的高斯分布作为权重初始值时的各层激活值的分布](/images/content/deep-learning/learning-skill/activation-distribution-1.png)

观察结果，可以发现，各层的激活值呈偏向 0 和 1 的分布。

这里使用的 sigmoid 函数是 S 型函数，随着输出不断地靠近 0（或者靠近 1），它的导数的值逐渐接近 0。因此，偏向 0 和 1 的数据分布会造成反向传播中梯度的值不断变小，最后消失。这个问题称为**梯度消失**（gradient vanishing）。层次加深的深度学习中，梯度消失的问题可能会更加严重。

下面，将权重的标准差设为 **0.01**，进行相同的实验：

![使用标准差为 0.01 的高斯分布作为权重初始值时的各层激活值的分布](/images/content/deep-learning/learning-skill/activation-distribution-0.01.png)

这次呈集中在 0.5 附近的分布。因为不像刚才的例子那样偏向 0 和 1，所以不会发生梯度消失的问题。

但是，激活值的分布有所偏向，说明在表现力上会有很大问题。

因为如果有多个神经元都输出几乎相同的值，那它们就没有存在的意义了。比如，如果 100 个神经元都输出几乎相同的值，那么也可以由 1 个神经元来表达基本相同的事情。因此，激活值在分布上有所偏向会出现 “表现力受限” 的问题。

::tip

各层的激活值的分布都要求有适当的广度。因为通过在各层间传递多样性的数据，神经网络可以进行高效的学习。反过来，如果传递的是有所偏向的数据，就会出现梯度消失或者 “表现力受限” 的问题，导致学习可能无法顺利进行。

::

接着，我们尝试使用 Xavier Glorot 等人的论文中推荐的权重初始值（俗称 “Xavier 初始值”）：

::detail

#title
关于 Xavier
#default
现在，在一般的深度学习框架中，Xavier 初始值已被作为标准使用。比如，Caffe 框架中，通过在设定权重初始值时赋予 xavier 参数，就可以使用 Xavier 初始值。

Xavier 的论文中，为了使各层的激活值呈现出具有相同广度的分布，推导了合适的权重尺度。推导出的结论是，**如果前一层的节点数为 $n$，则初始值使用标准差为 $\sqrt{\frac{1}{n}}$ 的分布**。

![Xavier 初始值](/images/content/deep-learning/learning-skill/xavier-initial-value.png)

使用 Xavier 初始值后，前一层的节点数越多，要设定为目标节点的初始值的权重尺度就越小。

::

![使用 Xavier 初始值作为权重初始值时的各层激活值的分布](/images/content/deep-learning/learning-skill/activation-distribution-xavier.png)

从这个结果可知，越是后面的层，图像变得越歪斜，但是呈现了比之前更有广度的分布。因为各层间传递的数据有适当的广度，所以 sigmoid 函数的表现力不受限制，有望进行高效的学习。

::detail

#title
激活函数的优化
#default
图中可以看到，后面的层的分布呈稍微歪斜的形状。如果用 tanh 函数（双曲线函数）代替 sigmoid 函数，这个稍微歪斜的问题就能得到改善。实际上，使用 tanh 函数后，会呈漂亮的吊钟型分布。tanh 函数和 sigmoid 函数同是 S 型曲线函数，但 tanh 函数是关于原点 (0, 0) 对称的 S 型曲线，而 sigmoid 函数是关于 (x,y)=(0, 0.5) 对称的 S 型曲线。众所周知，用作激活函数的函数最好具有关于原点对称的性质。

::

### 参数初始化方法

- **均匀分布初始化**: 权重参数初始化从区间均匀随机取值，默认区间为 (0, 1)。可以设置为在 ($-\frac{1}{\sqrt{n}}$, $\frac{1}{\sqrt{n}}$) 均匀分布中生成当前神经元的权重(n 为神经元的输入数量)
  - 优点: 能有效打破对称性
  - 缺点: 随机选择范围不当可能导致梯度问题
  - 适用场景: 浅层网络或低复杂度模型
  - PyTorch 代码: `nn.init.uniform_(层)`

- **正态分布初始化**: 随机初始化从均值为 0，标准差是 1 的高斯分布中取样，使用一些很小的值对参数 $W$ 进行初始化
  - PyTorch 代码: `nn.init.normal_(层)`

- **全 0 初始化**: 将神经网络中的所有权重参数初始化为 0
  - 优点: 实现简单
  - 缺点: 无法打破对称性，所有神经元更新方向相同，无法有效训练
  - 适用场景: 几乎不使用，仅用于偏置项的初始化
  - PyTorch 代码: `nn.init.zeros_(层)`

- **全 1 初始化**: 将神经网络中的所有权重参数初始化为 1
  - 优点: 实现简单
  - 缺点: 无法打破对称性，所有神经元更新方向相同，无法有效训练；会导致激活函数在网络中呈指数增长
  - 适用场景: 测试或调试(比如验证神经网络是否能在前向传播和反向传播)；特殊模型结构；偏置初始化
  - PyTorch 代码: `nn.init.ones_(层)`

- **固定值初始化**: 将神经网络中的所有权重参数初始化为某个固定值
  - 优点: 实现简单
  - 缺点: 无法打破对称性，所有神经元更新方向相同，无法有效训练；初始权重过大或过小可能导致梯度爆炸或梯度消失
  - 适用场景: 测试或调试
  - PyTorch 代码: `nn.init.constant_(层, 初始值)`

- **kaiming 初始化(HE 初始化)**: 分为正态分布的 HE 初始化和均匀分布的 HE 初始化
  - 正态分布的 HE 初始化: 从 `[0, std]` 中抽取样本，`std = sqrt(2 / n)`
  - 均匀分布的 HE 初始化: 从 `[-limit, limit]` 中的均匀分布中抽取样本，`limit = sqrt(6 / n)`
  - n: 输入层神经元的个数
  - 优点: 适合 ReLU，能保持梯度稳定
  - 缺点: 对非 ReLU 激活函数效果一般
  - 适用场景: 深度网络(10 层及以上)，使用 ReLU、Leaky ReLU 激活函数
  - PyTorch 代码: `nn.init.kaiming_normal_(层)` 和 `nn.init.kaiming_uniform_(层)`

- **Xavier 初始化(Glorot 初始化)**: 分为正态分布的 Xavier 初始化和均匀分布的 Xavier 初始化
  - 正态化的 Xavier 初始化: 从 `[0, std]` 中抽取样本，`std = sqrt(2 / (in + out))`
  - 均匀分布的 Xavier 初始化: 从 `[-limit, limit]` 中的均匀分布中抽取样本，`limit = sqrt(6 / (in + out))`
  - in: 该层的输入数；out: 该层的输出数
  - 优点: 使用于 Sigmoid、Tanh 等激活函数，解决梯度消失问题
  - 缺点: 对 ReLU 等激活函数表现欠佳
  - 适用场景: 深度网络(10 层及以上)，使用 Sigmoid 或 Tanh 激活函数
  - PyTorch 代码: `nn.init.xavier_normal_(层)` 和 `nn.init.xavier_uniform_(层)`

### HE 初始化

Xavier 初始化是以激活函数是线性函数为前提而推导出来的。因为 sigmoid 函数和 tanh 函数左右对称，且中央附近可以视作线性函数，所以适合使用 Xavier 初始值。

但当激活函数使用 ReLU 时，一般推荐使用 ReLU 专用的初始值，也就是 Kaiming He 等人推荐的初始值，也称为**He 初始值**。

当前一层的节点数为 $n$ 时，He 初始值使用标准差为 $\sqrt{\frac{2}{n}}$ 的高斯分布。

::detail

#title
Xavier 初始值与 He 初始值的对比
#default
当 Xavier 初始值是 $\sqrt{\frac{1}{n}}$ 时，（直观上）可以解释为，因为 ReLU 的负值区域的值为 0，为了使它更有广度，所以需要 2 倍的系数。

::

现在来看一下激活函数使用 ReLU 时激活值的分布，依次是权重初始值为标准差是 0.01 的高斯分布时、初始值为 Xavier 初始值时、初始值为 He 初始值时的结果：

![激活函数使用ReLU时,不同权重初始值的激活值分布的变化](/images/content/deep-learning/learning-skill/activation-distribution-relu.png)

- 当初始值为标准差是 0.01 的高斯分布时，各层的激活值非常小。神经网络上传递的是非常小的值，说明逆向传播时权重的梯度也同样很小。这是很严重的问题，实际上学习基本上没有进展。

- 当初始值为 Xavier 初始值时，各层的激活值呈现更宽的分布，但依然有偏斜。在这种情况下，随着层的加深，偏向一点点变大。实际上，层加深后，激活值的偏向变大，学习时会出现梯度消失的问题。

- 当初始值为 He 初始值时，各层中分布的广度相同。由于即便层加深，数据的广度也能保持不变，因此逆向传播时，也会传递合适的值。

总结一下，当激活函数使用 ReLU 时，权重初始值使用 He 初始值，当激活函数为 sigmoid 或 tanh 等 S 型曲线函数时，初始值使用 Xavier 初始值。这是目前的最佳实践。

::detail

#title
基于 PyTorch 的实现
#default

```python
import torch.nn as nn

if __name__ == '__main__':
    # 创建一个层
    linear = nn.Linear(5, 3)
    # 对权重 w 进行初始化(正态分布的 HE 初始化)
    nn.init.kaiming_normal_(linear.weight)

    print(linear.weight.data)
```

::

### 基于 MNIST 数据集的权重初始值的比较

下面通过实际的数据，观察不同的权重初始值的赋值方法会在多大程度上影响神经网络的学习。

```python
import os
import sys

sys.path.append(os.pardir)
import numpy as np
import matplotlib.pyplot as plt
from dataset.mnist import load_mnist
from common.util import smooth_curve
from common.multi_layer_net import MultiLayerNet
from common.optimizer import SGD


# 0:读入MNIST数据==========
(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True)

train_size = x_train.shape[0]
batch_size = 128
max_iterations = 2000


# 1:进行实验的设置==========
weight_init_types = {'std=0.01': 0.01, 'Xavier': 'sigmoid', 'He': 'relu'}
optimizer = SGD(lr=0.01)

networks = {}
train_loss = {}
for key, weight_type in weight_init_types.items():
    networks[key] = MultiLayerNet(input_size=784, hidden_size_list=[100, 100, 100, 100],
                                  output_size=10, weight_init_std=weight_type)
    train_loss[key] = []


# 2:开始训练==========
for i in range(max_iterations):
    batch_mask = np.random.choice(train_size, batch_size)
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    for key in weight_init_types.keys():
        grads = networks[key].gradient(x_batch, t_batch)
        optimizer.update(networks[key].params, grads)

        loss = networks[key].loss(x_batch, t_batch)
        train_loss[key].append(loss)

    if i % 100 == 0:
        print("===========" + "iteration:" + str(i) + "===========")
        for key in weight_init_types.keys():
            loss = networks[key].loss(x_batch, t_batch)
            print(key + ":" + str(loss))


# 3.绘制图形==========
markers = {'std=0.01': 'o', 'Xavier': 's', 'He': 'D'}
x = np.arange(max_iterations)
for key in weight_init_types.keys():
    plt.plot(x, smooth_curve(train_loss[key]), marker=markers[key], markevery=100, label=key)
plt.xlabel("iterations")
plt.ylabel("loss")
plt.ylim(0, 2.5)
plt.legend()
plt.show()
```

::detail

#title
代码解释
#default
这个实验中，神经网络有 5 层，每层有 100 个神经元，激活函数使用的是 ReLU。

::

![基于MNIST数据集的权重初始值的比较：横轴是学习的迭代次数（iterations），纵轴是损失函数的值（loss）](/images/content/deep-learning/learning-skill/weight-init-comparison.png)

从图中的结果可知，初始值为标准差是 0.01 的高斯分布时完全无法进行学习。这和刚才观察到的激活值的分布一样，是因为正向传播中传递的值很小（集中在 0 附近的数据）。因此，逆向传播时求到的梯度也很小，权重几乎不进行更新。

相反，当权重初始值为 Xavier 初始值和 He 初始值时，学习进行得很顺利。并且，我们发现 He 初始值时的学习进度更快一些。

综上，在神经网络的学习中，权重初始值非常重要。很多时候权重初始值的设定关系到神经网络的学习能否成功。权重初始值的重要性容易被忽视，而任何事情的开始（初始值）总是关键的，

## Batch Normalization

如果设定了合适的权重初始值，则各层的激活值分布会有适当的广度，从而可以顺利地进行学习。

那么，为了使各层拥有适当的广度，“强制性” 地调整激活值的分布会怎样呢？实际上，**Batch Normalization** 方法就是基于这个想法而产生的

### Batch Normalization 的算法

Batch Normalization（下文简称Batch Norm）是 2015 年提出的方法。Batch Norm 虽然是一个问世不久的新方法，但已经被很多研究人员和技术人员广泛使用。

::tip

Batch Norm 的优点：

- 可以使学习快速进行（可以增大学习率）

- 不那么依赖初始值（对于初始值不用那么神经质）

- 抑制过拟合（降低 Dropout 等的必要性）

考虑到深度学习要花费很多时间，第一个优点令人非常开心。另外，后两点也可以帮我们消除深度学习的学习中的很多烦恼。

::

Batch Norm 的思路是调整各层的激活值分布使其拥有适当的广度。为此，要向神经网络中插入对数据分布进行正规化的层，即 Batch Normalization 层（下文简称 Batch Norm 层）：

![使用了 Batch Normalization 的神经网络的例子（Batch Norm 层的背景为灰色）](/images/content/deep-learning/learning-skill/batch-norm.png)

Batch Norm，顾名思义，以进行学习时的 mini-batch 为单位，按 minibatch 进行正规化。具体而言，就是进行使数据分布的均值为 0、方差为 1 的正规化。用数学式表示的话，如下所示：

![Batch Norm 的算法](/images/content/deep-learning/learning-skill/batch-norm-algorithm.png)

> $\mu_B$： minibatch 中数据的均值
>
> $\sigma_B^2$：minibatch 中数据的方差
>
> $ε$：一个微小值（比如，10e-7 等），防止出现除以 0 的情况。

这里对 mini-batch 的 $m$ 个输入数据的集合 $B={\{x_1,x_2,...,x_m\}}$ 求均值 $\mu_B$ 和方差 $\sigma_B^2$。然后，对输入数据进行均值为 0、方差为 1（合适的分布）的正规化。

接着，Batch Norm 层会对正规化后的数据进行缩放和平移的变换，用数学式可以如下表示：

![Batch Norm 层对输入数据的变换](/images/content/deep-learning/learning-skill/batch-norm-transform.png)

> $\gamma$ 和 $\beta$：两个参数，分别对输入数据进行缩放和平移的变换，一开始设置为 1 和 0，然后再通过学习调整到合适的值。

上面就是 Batch Norm 的算法。这个算法是神经网络上的正向传播。如果使用计算图，Batch Norm 可以表示为：

![Batch Norm 的计算图](/images/content/deep-learning/learning-skill/batch-norm-graph.png)

### Batch Normalization 的评估

现在我们使用 Batch Norm 层进行实验，观察使用 Batch Norm 层和不使用 Batch Norm 层时学习的过程会如何变化：

```python
import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
import numpy as np
import matplotlib.pyplot as plt
from dataset.mnist import load_mnist
from common.multi_layer_net_extend import MultiLayerNetExtend
from common.optimizer import SGD, Adam

(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True)

# 为了快速实验，只取前 1000 个样本
x_train = x_train[:1000]
t_train = t_train[:1000]

max_epochs = 20
train_size = x_train.shape[0]
batch_size = 100
learning_rate = 0.01


def __train(weight_init_std):
    # 创建两个相同结构的网络：一个使用 Batch Norm 层，一个不用
    bn_network = MultiLayerNetExtend(input_size=784, hidden_size_list=[100, 100, 100, 100, 100], output_size=10, weight_init_std=weight_init_std, use_batchnorm=True)
    network = MultiLayerNetExtend(input_size=784, hidden_size_list=[100, 100, 100, 100, 100], output_size=10, weight_init_std=weight_init_std)
    optimizer = SGD(lr=learning_rate)

    train_acc_list = []
    bn_train_acc_list = []

    iter_per_epoch = max(train_size / batch_size, 1)
    epoch_cnt = 0

    for i in range(1000000000):
        batch_mask = np.random.choice(train_size, batch_size)
        x_batch = x_train[batch_mask]
        t_batch = t_train[batch_mask]

        # 两个网络同时用相同的数据训练
        for _network in (bn_network, network):
            grads = _network.gradient(x_batch, t_batch)
            optimizer.update(_network.params, grads)

        if i % iter_per_epoch == 0:
            train_acc = network.accuracy(x_train, t_train)
            bn_train_acc = bn_network.accuracy(x_train, t_train)
            train_acc_list.append(train_acc)
            bn_train_acc_list.append(bn_train_acc)

            print("epoch:" + str(epoch_cnt) + " | " + str(train_acc) + " - " + str(bn_train_acc))

            epoch_cnt += 1
            if epoch_cnt >= max_epochs:
                break

    return train_acc_list, bn_train_acc_list

# 3.绘制图形==========
weight_scale_list = np.logspace(0, -4, num=16)
x = np.arange(max_epochs)

for i, w in enumerate(weight_scale_list):
    print( "============== " + str(i+1) + "/16" + " ==============")
    train_acc_list, bn_train_acc_list = __train(w)

    plt.subplot(4,4,i+1)
    plt.title("W:" + str(w))
    if i == 15:
        plt.plot(x, bn_train_acc_list, label='Batch Normalization', markevery=2)
        plt.plot(x, train_acc_list, linestyle = "--", label='Normal(without BatchNorm)', markevery=2)
    else:
        plt.plot(x, bn_train_acc_list, markevery=2)
        plt.plot(x, train_acc_list, linestyle="--", markevery=2)

    plt.ylim(0, 1.0)
    if i % 4:
        plt.yticks([])
    else:
        plt.ylabel("accuracy")
    if i < 12:
        plt.xticks([])
    else:
        plt.xlabel("epochs")
    plt.legend(loc='lower right')

plt.show()
```

![基于 Batch Norm 的效果：使用 Batch Norm 后，学习进行得更快了](/images/content/deep-learning/learning-skill/batch-norm-result.png)

从图中的结果可知，使用 Batch Norm 后，学习进行得更快了。

接着，给予不同的初始值尺度，观察学习的过程如何变化：

![图中的实线是使用了 Batch Norm时的结果，虚线是没有使用 Batch Norm 时的结果：图的标题处标明了权重初始值的标准差](/images/content/deep-learning/learning-skill/weight-init-scale-result.png)

我们发现，几乎所有的情况下都是使用 Batch Norm 时学习进行得更快。同时也可以发现，实际上，在不使用 Batch Norm 的情况下，如果不赋予一个尺度好的初始值，学习将完全无法进行。

综上，通过使用 Batch Norm，可以推动学习的进行。并且，对权重初始值变得健壮（表示不那么依赖初始值）。

## 正则化

机器学习的问题中，**过拟合**是一个很常见的问题。过拟合指的是只能拟合训练数据，但不能很好地拟合不包含在训练数据中的其他数据的状态。

机器学习的目标是提高泛化能力，即便是没有包含在训练数据里的未观测数据，也希望模型可以进行正确的识别。我们可以制作复杂的、表现力强的模型，但是相应地，抑制过拟合的技巧也很重要。

### 过拟合

发生过拟合的原因，主要有以下两个：

- 模型拥有大量参数、表现力强。

- 训练数据少。

::detail

#title
具体示例：制造过拟合现象
#default
这里，我们故意满足这两个条件，制造过拟合现象。为此，要从 MNIST 数据集原本的 60000 个训练数据中只选定 300 个，并且，为了增加网络的复杂度，使用 7 层网络（每层有 100 个神经元，激活函数为 ReLU）。

```python
import os
import sys

sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
import numpy as np
import matplotlib.pyplot as plt
from dataset.mnist import load_mnist
from common.multi_layer_net import MultiLayerNet
from common.optimizer import SGD

(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True)

# 为了再现过拟合，减少学习数据
x_train = x_train[:300]
t_train = t_train[:300]

# weight decay（权值衰减）的设定 =======================
weight_decay_lambda = 0 # 不使用权值衰减的情况
# weight_decay_lambda = 0.1
# ====================================================

network = MultiLayerNet(
    input_size=784,
    hidden_size_list=[100, 100, 100, 100, 100, 100], # 6 个隐藏层，每层 100 个神经元
    output_size=10,
    weight_decay_lambda=weight_decay_lambda)
optimizer = SGD(lr=0.01)

max_epochs = 201
train_size = x_train.shape[0]
batch_size = 100

train_loss_list = []
train_acc_list = []
test_acc_list = []

iter_per_epoch = max(train_size / batch_size, 1)
epoch_cnt = 0

for i in range(1000000000):
    # 小批量训练
    batch_mask = np.random.choice(train_size, batch_size)
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    # 计算梯度并更新权重
    grads = network.gradient(x_batch, t_batch)
    optimizer.update(network.params, grads)

    # 每完成一个epoch记录准确率
    if i % iter_per_epoch == 0:
        train_acc = network.accuracy(x_train, t_train)
        test_acc = network.accuracy(x_test, t_test)
        train_acc_list.append(train_acc)
        test_acc_list.append(test_acc)

        print("epoch:" + str(epoch_cnt) + ", train acc:" + str(train_acc) + ", test acc:" + str(test_acc))

        epoch_cnt += 1
        if epoch_cnt >= max_epochs:
            break

# 3.绘制图形==========
markers = {'train': 'o', 'test': 's'}
x = np.arange(max_epochs)
plt.plot(x, train_acc_list, marker='o', label='train', markevery=10)
plt.plot(x, test_acc_list, marker='s', label='test', markevery=10)
plt.xlabel("epochs")
plt.ylabel("accuracy")
plt.ylim(0, 1.0)
plt.legend(loc='lower right')
plt.show()
```

![训练数据（train）和测试数据（test）的识别精度的变化](/images/content/deep-learning/learning-skill/overfitting-result.png)

过了 100 个 epoch 左右后，用训练数据测量到的识别精度几乎都为 100%。但是，对于测试数据，离 100% 的识别精度还有较大的差距。如此大的识别精度差距，是只拟合了训练数据的结果。从图中可知，模型对训练时没有使用的一般数据（测试数据）拟合得不是很好。

::

### 权值衰减

**权值衰减**是一直以来经常被使用的一种抑制过拟合的方法。该方法通过在学习的过程中对大的权重进行惩罚，来抑制过拟合。很多过拟合原本就是因为权重参数取值过大才发生的。

神经网络的学习目的是减小损失函数的值。这时，例如为损失函数加上权重的平方范数（L2 范数）。这样一来，就可以抑制权重变大。

如果将权重记为 $W$，L2范数的权值衰减就是 $\frac{1}{2} \lambda W^2$，然后将这个 $\frac{1}{2} \lambda W^2$ 加到损失函数上。

> $\lambda$ 是控制正则化强度的超参数，设置得越大，对大的权重施加的惩罚就越重。
>
> $\frac{1}{2} \lambda W^2$ 开头的 $\frac{1}{2}$ 是用于将 $\frac{1}{2} \lambda W^2$ 的求导结果变成 $\lambda W$ 的调整用常量。

对于所有权重，权值衰减方法都会为损失函数加上 $\frac{1}{2} \lambda W^2$。因此，在求权重梯度的计算中，要为之前的误差反向传播法的结果加上正则化项的导数 $\lambda W$。

::tip

**范数**：

L2 范数相当于各个元素的平方和。用数学式表示的话，假设有权重 $W=(w_1, w_2, ..., w_n)$，则 L2 范数可用 $\sqrt{w_1^2 + w_2^2 + ... + w_n^2}$ 计算出来。

除了 L2 范数，还有 L1 范数、L∞ 范数等。

L1 范数是各个元素的绝对值之和，相当于 $|w_1| + |w_2| + ... + |w_n|$。

L∞ 范数也称为 Max 范数，相当于各个元素的绝对值中最大的那一个。

L2 范数、L1 范数、L∞ 范数都可以用作正则化项，它们各有各的特点。

::

现在我们来进行实验。对于刚刚进行的实验，应用 λ=0.1 的权值衰减：

![使用了权值衰减的训练数据（train）和测试数据（test）的识别精度的变化](/images/content/deep-learning/learning-skill/weight-decay-result.png)

虽然训练数据的识别精度和测试数据的识别精度之间有差距，但是与没有使用权值衰减的结果相比，差距变小了。这说明过拟合受到了抑制。

此外，还要注意，训练数据的识别精度没有达到 100%。

### Dropout

权值衰减方法实现简单，在某种程度上能够抑制过拟合。但是，如果网络的模型变得很复杂，只用权值衰减就难以应对了。在这种情况下，我们经常会使用 **Dropout** 方法。

Dropout 是一种在学习的过程中随机删除神经元的方法。训练时，随机选出隐藏层的神经元，然后将其删除。被删除的神经元不再进行信号的传递。

![Dropout的概念图：左边是一般的神经网络，右边是应用了 Dropout 的网络](/images/content/deep-learning/learning-skill/dropout.png)

> 左边是一般的神经网络，右边是应用了 Dropout 的网络
>
> Dropout 通过随机选择并删除神经元，停止向前传递信号

训练时，每传递一次数据，就会随机选择要删除的神经元。

测试时，虽然会传递所有的神经元信号，但是对于各个神经元的输出，要乘上训练时的删除比例后再输出。

```python
class Dropout:
    def __init__(self, dropout_ratio=0.5):
        self.dropout_ratio = dropout_ratio # 丢弃率，默认50%
        self.mask = None # 用于记录在前向传播中哪些神经元被保留

    def forward(self, x, train_flg=True):
        if train_flg: # 训练模式
            self.mask = np.random.rand(*x.shape) > self.dropout_ratio
            return x * self.mask
        else: # 测试/推理模式
            return x * (1.0 - self.dropout_ratio)

    def backward(self, dout):
        return dout * self.mask
```

::detail

#title
代码解释
#default
每次正向传播时，`self.mask` 中都会以 `False` 的形式保存要删除的神经元。

`self.mask` 会随机生成和 `x` 形状相同的数组，并将值比 `dropout_ratio` 大的元素设为 `True`。

反向传播时的行为和 ReLU 相同。

也就是说，正向传播时传递了信号的神经元，反向传播时按原样传递信号；正向传播时没有传递信号的神经元，反向传播时信号将停在那里。

::

现在，我们使用 MNIST 数据集进行验证，以确认 Dropout 的效果：

::code-group

```python [overfit_dropout.py]
import os
import sys
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
import numpy as np
import matplotlib.pyplot as plt
from dataset.mnist import load_mnist
from common.multi_layer_net_extend import MultiLayerNetExtend
from common.trainer import Trainer

(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True)

# 为了再现过拟合，减少学习数据
x_train = x_train[:300]
t_train = t_train[:300]

# 设定是否使用Dropuout，以及比例 ========================
use_dropout = True  # 不使用Dropout的情况下为False
dropout_ratio = 0.2 # 丢弃率
# ====================================================

network = MultiLayerNetExtend(input_size=784, hidden_size_list=[100, 100, 100, 100, 100, 100],
                              output_size=10, use_dropout=use_dropout, dropout_ration=dropout_ratio)
trainer = Trainer(network, x_train, t_train, x_test, t_test,
                  epochs=301, mini_batch_size=100,
                  optimizer='sgd', optimizer_param={'lr': 0.01}, verbose=True)
trainer.train()

train_acc_list, test_acc_list = trainer.train_acc_list, trainer.test_acc_list

# 绘制图形==========
markers = {'train': 'o', 'test': 's'}
x = np.arange(len(train_acc_list))
plt.plot(x, train_acc_list, marker='o', label='train', markevery=10)
plt.plot(x, test_acc_list, marker='s', label='test', markevery=10)
plt.xlabel("epochs")
plt.ylabel("accuracy")
plt.ylim(0, 1.0)
plt.legend(loc='lower right')
plt.show()
```

```python [trainer.py]
import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
import numpy as np
from common.optimizer import *

class Trainer:
    """进行神经网络的训练的类
    """
    def __init__(self, network, x_train, t_train, x_test, t_test,
                 epochs=20, mini_batch_size=100,
                 optimizer='SGD', optimizer_param={'lr':0.01},
                 evaluate_sample_num_per_epoch=None, verbose=True):
        self.network = network
        self.verbose = verbose
        self.x_train = x_train
        self.t_train = t_train
        self.x_test = x_test
        self.t_test = t_test
        self.epochs = epochs
        self.batch_size = mini_batch_size
        self.evaluate_sample_num_per_epoch = evaluate_sample_num_per_epoch

        # optimzer
        optimizer_class_dict = {'sgd':SGD, 'momentum':Momentum, 'nesterov':Nesterov,
                                'adagrad':AdaGrad, 'rmsprpo':RMSprop, 'adam':Adam}
        self.optimizer = optimizer_class_dict[optimizer.lower()](**optimizer_param)

        self.train_size = x_train.shape[0]
        self.iter_per_epoch = max(self.train_size / mini_batch_size, 1)
        self.max_iter = int(epochs * self.iter_per_epoch)
        self.current_iter = 0
        self.current_epoch = 0

        self.train_loss_list = []
        self.train_acc_list = []
        self.test_acc_list = []

    def train_step(self):
        batch_mask = np.random.choice(self.train_size, self.batch_size)
        x_batch = self.x_train[batch_mask]
        t_batch = self.t_train[batch_mask]

        grads = self.network.gradient(x_batch, t_batch)
        self.optimizer.update(self.network.params, grads)

        loss = self.network.loss(x_batch, t_batch)
        self.train_loss_list.append(loss)
        if self.verbose: print("train loss:" + str(loss))

        if self.current_iter % self.iter_per_epoch == 0:
            self.current_epoch += 1

            x_train_sample, t_train_sample = self.x_train, self.t_train
            x_test_sample, t_test_sample = self.x_test, self.t_test
            if not self.evaluate_sample_num_per_epoch is None:
                t = self.evaluate_sample_num_per_epoch
                x_train_sample, t_train_sample = self.x_train[:t], self.t_train[:t]
                x_test_sample, t_test_sample = self.x_test[:t], self.t_test[:t]

            train_acc = self.network.accuracy(x_train_sample, t_train_sample)
            test_acc = self.network.accuracy(x_test_sample, t_test_sample)
            self.train_acc_list.append(train_acc)
            self.test_acc_list.append(test_acc)

            if self.verbose: print("=== epoch:" + str(self.current_epoch) + ", train acc:" + str(train_acc) + ", test acc:" + str(test_acc) + " ===")
        self.current_iter += 1

    def train(self):
        for i in range(self.max_iter):
            self.train_step()

        test_acc = self.network.accuracy(self.x_test, self.t_test)

        if self.verbose:
            print("=============== Final Test Accuracy ===============")
            print("test acc:" + str(test_acc))


```

::

> `trainer.py` 是一个神经网络训练器（Trainer）类，它封装了完整的神经网络训练流程，提供了灵活的训练配置和监控功能。

Dropout 的实验和前面的实验一样，使用 7 层网络（每层有 100 个神经元，激活函数为 ReLU），一个使用 Dropout，另一个不使用 Dropout，实验的结果如下图所示：

![左边没有使用 Dropout，右边使用了 Dropout（dropout_rate=0.15）](/images/content/deep-learning/learning-skill/dropout-example.png)

> 左边没有使用 Dropout，右边使用了 Dropout（dropout_rate=0.15）

通过使用 Dropout，训练数据和测试数据的识别精度的差距变小了。并且，训练数据也没有到达 100% 的识别精度。像这样，通过使用 Dropout，即便是表现力强的网络，也可以抑制过拟合。

## 超参数的验证

神经网络中，除了权重和偏置等参数，**超参数**（hyper-parameter）也经常出现。这里所说的超参数是指，比如各层的神经元数量、batch 大小、参数更新时的学习率或权值衰减等。如果这些超参数没有设置合适的值，模型的性能就会很差。虽然超参数的取值非常重要，但是在决定超参数的过程中一般会伴随很多的试错。

### 验证数据

之前我们使用的数据集分成了训练数据和测试数据，训练数据用于学习，测试数据用于评估泛化能力。由此，就可以评估是否只过度拟合了训练数据（是否发生了过拟合），以及泛化能力如何等。

下面我们要对超参数设置各种各样的值以进行验证。（不能使用测试数据评估超参数的性能）

调整超参数时，必须使用超参数专用的确认数据。用于调整超参数的数据，一般称为**验证数据**（validation data）。我们使用这个验证数据来评估超参数的好坏。

::detail

#title
为什么不能用测试数据评估超参数的性能
#default
如果使用测试数据调整超参数，超参数的值会对测试数据发生过拟合。

换句话说，用测试数据确认超参数的值的 “好坏”，就会导致超参数的值被调整为只拟合测试数据。这样的话，可能就会得到不能拟合其他数据、泛化能力低的模型。

根据不同的数据集，有的会事先分成训练数据、验证数据、测试数据三部分，有的只分成训练数据和测试数据两部分，有的则不进行分割。在这种情况下，用户需要自行进行分割。

- 训练数据用于参数（权重和偏置）的学习

- 验证数据用于超参数的性能评估

- 为了确认泛化能力，要在最后使用（比较理想的是只用一次）测试数据。

::

如果是 MNIST 数据集，获得验证数据的最简单的方法就是从训练数据中事先分割 20% 作为验证数据：

::code-group

```python [打乱数据]
(x_train, t_train), (x_test, t_test) = load_mnist()
# 打乱训练数据
x_train, t_train = shuffle_dataset(x_train, t_train)
# 分割验证数据
validation_rate = 0.20 # 设置验证集比例
validation_num = int(x_train.shape[0] * validation_rate)
# 分割验证集（取打乱后的前 validation_num 个样本）
x_val = x_train[:validation_num]
t_val = t_train[:validation_num]
# 剩余作为训练集
x_train = x_train[validation_num:]
t_train = t_train[validation_num:]
```

```python [shuffle_dataset 函数]
def shuffle_dataset(x, t):
    """打乱数据集

    Parameters
    ----------
    x : 训练数据
    t : 监督数据

    Returns
    -------
    x, t : 打乱的训练数据和监督数据
    """
    permutation = np.random.permutation(x.shape[0])
    x = x[permutation,:] if x.ndim == 2 else x[permutation,:,:,:]
    t = t[permutation]

    return x, t
```

::

::detail

#title
代码解释
#default
这里，分割训练数据前，先打乱了输入数据和监督数据。这是因为数据集的数据可能存在偏向（比如，数据从 “0” 到 “10” 按顺序排列等）

::

### 超参数的最优化

进行超参数的最优化时，逐渐缩小超参数的 “好值” 的存在范围非常重要。所谓逐渐缩小范围，是指一开始先大致设定一个范围，从这个范围中随机选出一个超参数（采样），用这个采样到的值进行识别精度的评估；然后，多次重复该操作，观察识别精度的结果，根据这个结果缩小超参数的“好值”的范围。通过重复这一操作，就可以逐渐确定超参数的合适范围。

超参数的范围只要 “大致地指定” 就可以了。所谓 “大致地指定”，是指像 0.001（$10^{-3}$）到 1000（$10^3$）这样 ， 以 “10 的阶乘” 的尺度指定范围（也表述为 “用对数尺度（log scale）指定”）。

在超参数的最优化中，要注意的是深度学习需要很长时间（比如，几天或几周）。因此，在超参数的搜索中，需要尽早放弃那些不符合逻辑的超参数。于是，在超参数的最优化中，减少学习的 epoch，缩短一次评估所需的时间是一个不错的办法。

简单归纳一下，如下所示:

- 步骤 0：设定超参数的范围。

- 步骤 1：从设定的超参数范围中随机采样。

- 步骤 2：使用步骤 1 中采样到的超参数的值进行学习，通过验证数据评估识别精度（但是要将 epoch 设置得很小）。

- 步骤 3：重复步骤 1 和步骤 2（100 次等），根据它们的识别精度的结果，缩小超参数的范围。

反复进行上述操作，不断缩小超参数的范围，在缩小到一定程度时，从该范围中选出一个超参数的值。这就是进行超参数的最优化的一种方法。

::detail

#title
贝叶斯最优化
#default
在超参数的最优化中，如果需要更精炼的方法，可以使用**贝叶斯最优化**（Bayesian optimization）。贝叶斯最优化运用以贝叶斯定理为中心的数学理论，能够更加严密、高效地进行最优化。

::

### 超参数最优化的实现

现在，我们使用 MNIST 数据集进行超参数的最优化。这里我们将学习率和控制权值衰减强度的系数（权值衰减系数）这两个超参数的搜索问题作为对象。

超参数的随机采样的代码如下所示：

```python
weight_decay = 10 ** np.random.uniform(-8, -4)
lr = 10 ** np.random.uniform(-6, -2)
```

::detail

#title
代码解释
#default
如前所述，通过从 0.001（$10^{-3}$）到 1000（$10^3$）这样的对数尺度的范围中随机采样进行超参数的验证。这在 Python 中可以写成 `10 ** np.random.uniform(-3, 3)`。

在该实验中，权值衰减系数的初始范围为 $10^{−8}$ 到 $10^{−4}$，学习率的初始范围为 $10^{−6}$ 到 $10^{−2}$。

::

像这样进行随机采样后，再使用那些值进行学习。之后，多次使用各种超参数的值重复进行学习，观察合乎逻辑的超参数在哪里：

```python
import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
import numpy as np
import matplotlib.pyplot as plt
from dataset.mnist import load_mnist
from common.multi_layer_net import MultiLayerNet
from common.util import shuffle_dataset
from common.trainer import Trainer

(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True)

# 为了实现高速化，减少训练数据
x_train = x_train[:500]
t_train = t_train[:500]

# 分割验证数据
validation_rate = 0.20
validation_num = int(x_train.shape[0] * validation_rate)
x_train, t_train = shuffle_dataset(x_train, t_train)
x_val = x_train[:validation_num]
t_val = t_train[:validation_num]
x_train = x_train[validation_num:]
t_train = t_train[validation_num:]


def __train(lr, weight_decay, epocs=50):
    network = MultiLayerNet(input_size=784, hidden_size_list=[100, 100, 100, 100, 100, 100],
                            output_size=10, weight_decay_lambda=weight_decay)
    trainer = Trainer(network, x_train, t_train, x_val, t_val,
                      epochs=epocs, mini_batch_size=100,
                      optimizer='sgd', optimizer_param={'lr': lr}, verbose=False)
    trainer.train()

    return trainer.test_acc_list, trainer.train_acc_list


# 超参数的随机搜索======================================
optimization_trial = 100
results_val = {}
results_train = {}
for _ in range(optimization_trial):
    # 指定搜索的超参数的范围===============
    weight_decay = 10 ** np.random.uniform(-8, -4)
    lr = 10 ** np.random.uniform(-6, -2)
    # ================================================

    val_acc_list, train_acc_list = __train(lr, weight_decay)
    print("val acc:" + str(val_acc_list[-1]) + " | lr:" + str(lr) + ", weight decay:" + str(weight_decay))
    key = "lr:" + str(lr) + ", weight decay:" + str(weight_decay)
    results_val[key] = val_acc_list
    results_train[key] = train_acc_list

# 绘制图形========================================================
print("=========== Hyper-Parameter Optimization Result ===========")
graph_draw_num = 20
col_num = 5
row_num = int(np.ceil(graph_draw_num / col_num))
i = 0

for key, val_acc_list in sorted(results_val.items(), key=lambda x:x[1][-1], reverse=True):
    print("Best-" + str(i+1) + "(val acc:" + str(val_acc_list[-1]) + ") | " + key)

    plt.subplot(row_num, col_num, i+1)
    plt.title("Best-" + str(i+1))
    plt.ylim(0.0, 1.0)
    if i % 5: plt.yticks([])
    plt.xticks([])
    x = np.arange(len(val_acc_list))
    plt.plot(x, val_acc_list)
    plt.plot(x, results_train[key], "--")
    i += 1

    if i >= graph_draw_num:
        break

plt.show()
```

结果如下图所示：

![超参数的验证](/images/content/deep-learning/learning-skill/hyper-parameter-verification.png)

> 实线是验证数据的识别精度，虚线是训练数据的识别精度

从图中可知，直到 “Best-5” 左右，学习进行得都很顺利。我们来观察一下 “Best-5” 之前的超参数的值（学习率和权值衰减系数）：

```cmd
Best-1 (val acc:0.83) | lr:0.0092, weight decay:3.86e-07
Best-2 (val acc:0.78) | lr:0.00956, weight decay:6.04e-07
Best-3 (val acc:0.77) | lr:0.00571, weight decay:1.27e-06
Best-4 (val acc:0.74) | lr:0.00626, weight decay:1.43e-05
Best-5 (val acc:0.73) | lr:0.0052, weight decay:8.97e-06
```

从这个结果可以看出，学习率在 0.001 到 0.01、权值衰减系数在 $10^{−8}$ 到 $10^{−6}$ 之间时，学习可以顺利进行。

像这样，观察可以使学习顺利进行的超参数的范围，从而缩小值的范围。然后，在这个缩小的范围中重复相同的操作。这样就能缩小到合适的超参数的存在范围，然后在某个阶段，选择一个最终的超参数的值。

## 小结

::detail

#title
小结
#default

- 机器学习中使用的数据集分为训练数据和测试数据

- 神经网络用训练数据进行学习，并用测试数据评价学习到的模型的泛化能力

- 神经网络的学习以损失函数为指标，更新权重参数，以使损失函数的值减小

- 利用某个给定的微小值的差分求导数的过程，称为数值微分

- 利用数值微分，可以计算权重参数的梯度

- 数值微分虽然费时间，但是实现起来很简单

- 参数的更新方法，除了 SGD（随机梯度下降法）之外，还有 Momentum、AdaGrad、Adam 等方法

- 权重初始值的赋值方法对进行正确的学习非常重要

- 作为权重初始值，Xavier 初始值、He 初始值等比较有效

- 通过使用 Batch Normalization，可以加速学习，并且对初始值变得健壮

- 抑制过拟合的正则化技术有权值衰减、Dropout 等

- 逐渐缩小 “好值” 存在的范围是搜索超参数的一个有效方法

::

::detail

#title
专有名词
#default

- **训练数据**：神经网络学习时使用的数据集。

- **测试数据**：神经网络学习过程中，对学习效果进行评价时使用的数据集。

- **泛化能力**：神经网络学习过程中，对训练数据以外的数据进行评价，以评价学习效果。

- **损失函数**：神经网络学习过程中，用于评价学习效果的指标。损失函数越小，表示学习效果越好。

- **mini-batch**：一个训练数据集的子集，通常取一个较小的数据集，比如 100 个样本。

- **学习率**：神经网络学习过程中，权重参数的更新大小。

- **过拟合**：神经网络学习过程中，在训练数据上过拟合，即在训练数据上表现良好，但测试数据上表现不好。

- **epoch**：一个 epoch 表示学习中，所有训练数据均被使用过一次时的更新次数。

- **超参数**：神经网络学习过程中，需要设定手动的参数。比如，学习率、权重参数的初始值、权重参数的更新大小等等。

- **最优化**：神经网络的学习中寻找最优参数的过程

- **SGD（随机梯度下降法）**：一种最优化方法，使用参数的梯度，沿梯度方向更新参数，并重复这个步骤多次，从而逐渐靠近最优参数

- **Momentum**：一种改进随机梯度下降法的方法，在梯度方向上受力，使参数的更新更平滑

- **AdaGrad**：一种改进随机梯度下降法，会为参数的每个元素适当地调整学习率，与此同时进行学习

- **Adam**：一种改进随机梯度下降法，融合了 Momentum 和 AdaGrad 的优点，并添加了超参数的 “偏置校正”

- **权值衰减**：一种抑制过拟合的方法，在学习的过程中对大的权重进行惩罚，减小权重参数的值来抑制过拟合的发生

- **激活值**：神经元在通过激活函数计算后的输出数据

- **梯度消失**：偏向 0 和 1 的数据分布会造成反向传播中梯度的值不断变小，最后消失

- **Xavier 初始化**：一种智能的权重初始化方法，保持网络中每层的输入和输出方差一致，防止在前向传播和反向传播过程中信号消失或爆炸，推荐在 sigmoid 或 tanh 等 S 型曲线函数作为激活函数时使用

- **He 初始值**：一种权重初始化方法，推荐在 ReLU 作为激活函数时使用

- **Batch Normalization**：一种对数据分布进行正规化的方法，使得各层激活值的分布有适当的广度，从而可以顺利地进行学习

- **Dropout**：一种抑制过拟合的方法，在学习的过程中随机删除神经元

- **验证数据**：用于超参数的调整的数据

::
