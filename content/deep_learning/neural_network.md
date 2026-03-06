# 神经网络

::: details 目录

[[toc]]

:::

## 从感知机到神经网络

神经网络和感知机有很多共同点。用图来表示神经网络的话，我们把最左边的一列称为**输入层**，最右边的一列称为**输出层**，中间的一列称为**中间层**。中间层有时也称为**隐藏层**。

![神经网络的例子](/images/deep-learning/neural-network/example.png)

## 激活函数

$h(x)$ 函数会将输入信号的总和转换为输出信号，这种函数一般称为**激活函数**（activation function）。激活函数的作用在于决定如何来激活输入信号的总和。

### 阶跃函数

感知机中使用的激活函数一般都是**阶跃函数**。这种激活函数以阈值为界，一旦输入超过阈值，就切换输出。

阶跃函数如下式所示，当输入超过 0 时，输出 1，否则输出 0。

$$
h(x) =
\begin{cases}
0 & (x \leq 0) \\
1 & (x > 0)
\end{cases}
$$

可以像下面这样简单地实现阶跃函数：

::: code-group

```python [简单实现，但是参数 x 只能接受实数（浮点数）]
def step_function(x):
    if x > 0:
        return 1
    else:
        return 0
```

```python [支持 NumPy 数组的实现]
def step_function(x):
    y = x > 0
    return y.astype(np.int)
```

:::

::: details 代码解释

```python
x = np.array([-1.0, 1.0, 2.0])
# [-1.,  1.,  2.]
y = x > 0
# [False,  True,  True]
y = y.astype(np.int)
# [0,  1,  1]
```

对 NumPy 数组进行不等号运算后，数组的各个元素都会进行不等号运算，生成一个布尔型数组。这里，数组 x 中大于 0 的元素被转换为 True，小于等于 0 的元素被转换为 False，从而生成一个新的数组 y。

数组 y 是一个布尔型数组，但是我们想要的阶跃函数是会输出 int 型的 0 或 1 的函数。因此，需要把数组 y 的元素类型从布尔型转换为 int 型。可以用 astype()方法转换 NumPy 数组的类型。astype()方法通过参数指定期望的类型，这个例子中是 np.int 型。

:::

用图来表示上面定义的阶跃函数，为此需要使用 matplotlib 库。

```python
import numpy as np
import matplotlib.pylab as plt

def step_function(x):
    return np.array(x > 0, dtype=np.int32)

x = np.arange(-5.0, 5.0, 0.1)
y = step_function(x)
plt.plot(x, y)
plt.ylim(-0.1, 1.1) # 指定y轴的范围
plt.show()
```

::: details 代码解释

np.arange(-5.0, 5.0, 0.1)在 −5.0 到 5.0 的范围内，以 0.1 为单位，生成 NumPy 数组（[-5.0, -4.9, ..., 4.9]）。

step_function()以该 NumPy 数组为参数，对数组的各个元素执行阶跃函数运算，并以数组形式返回运算结果。

:::

![阶跃函数的图形](/images/deep-learning/neural-network/step-function.png)

阶跃函数以 0 为界，输出从 0 切换为 1（或者从 1 切换为 0）。它的值呈阶梯式变化，所以称为阶跃函数。

### sigmoid 函数

那么，如果感知机使用其他函数作为激活函数的话会怎么样呢？实际上，如果将激活函数从阶跃函数换成其他函数，就可以进入神经网络的世界了。

神经网络中经常使用的一个激活函数就是**sigmoid 函数**（sigmoid function）。

$$h(x) = \frac{1}{1 + e^{-x}}$$

神经网络中用 sigmoid 函数作为激活函数，进行信号的转换，转换后的信号被传送给下一个神经元。

```python
import numpy as np
import matplotlib.pylab as plt

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

x = np.arange(-5.0, 5.0, 0.1)
y = sigmoid(x)
plt.plot(x, y)
plt.ylim(-0.1, 1.1) # 指定y轴的范围
plt.show()
```

::: details 代码解释

np.exp(-x)对应 exp(−x)

注意参数 x 为 NumPy 数组时，结果也能被正确计算。

:::

![sigmoid 函数的图形](/images/deep-learning/neural-network/sigmoid-function.png)

### 阶跃函数和 sigmoid 函数的比较

> 阶跃函数以 0 为界，输出发生急剧性的变化。
>
> sigmoid 函数是一条平滑的曲线，输出随着输入发生连续性的变化。

> 阶跃函数只能返回 0 或 1。
>
> sigmoid 函数返回任意实数。

> 二者具有相似的形状，均是 “输入小时，输出接近 0（为 0）；随着输入增大，输出向 1 靠近（变成 1）”
>
> 不管输入信号有多小，或者有多大，输出信号的值都在 0 到 1 之间。

### 非线性函数

神经网络的激活函数必须使用非线性函数，激活函数不能使用线性函数。

线性函数的问题在于，不管如何加深层数，总是存在与之等效的 “无隐藏层的神经网络”。

考虑把线性函数 $h(x)=cx$ 作为激活函数，把 $y(x)=h(h(h(x)))$ 的运算对应 3 层神经网络。这个运算会进行 $y(x) = c×c×c×x$ 的乘法运算，但是同样的处理可以由 $y(x)=ax$（注意，$a =c^3$）这一次乘法运算（即没有隐藏层的神经网络）来表示。使用线性函数时，无法发挥多层网络带来的优势。因此，为了发挥叠加层所带来的优势，激活函数必须使用非线性函数。

### ReLU 函数

在神经网络发展的历史上，sigmoid 函数很早就开始被使用了，而最近则主要使用 **ReLU**（Rectified Linear Unit）函数。

ReLU 函数在输入大于 0 时，直接输出该值；在输入小于等于 0 时，输出 0。

$$
h(x) =
\begin{cases}
x & (x > 0) \\
0 & (x \leq 0)
\end{cases}
$$

```python
import numpy as np
import matplotlib.pylab as plt

def relu(x):
    return np.maximum(0, x)

x = np.arange(-5.0, 5.0, 0.1)
y = relu(x)
plt.plot(x, y)
plt.ylim(-0.1, 1.1) # 指定y轴的范围
plt.show()
```

::: details 代码解释

这里使用了 NumPy 的 maximum 函数。maximum 函数会从输入的数值中选择较大的那个值进行输出。

:::

![ReLU 函数](/images/deep-learning/neural-network/relu-function.png)

## 3 层神经网络的实现

### 符号确认

如下图所示，只突出显示了从输入层神经元 $x_2$ 到后一层的神经元 $a_1^{(1)}$ 的权重。

![权重的符号](/images/deep-learning/neural-network/weight.png)

### 各层间信号传递的实现

如下图所示，从输入层到第 1 层的第 1 个神经元的信号传递过程。

![从输入层到第1层的信号传递](/images/deep-learning/neural-network/signal-transmission-1.png)

图中增加了表示偏置的神经元 “1”。请注意，偏置的右下角的索引号只有一个。这是因为前一层的偏置神经元（神经元 “1”）只有一个。

此时 $a_1^{(1)}$ 通过加权信号和偏置的和按如下方式进行计算：

$$a_1^{(1)} = w_{11}^{(1)} x_1 + w_{12}^{(1)} x_2 + b_1^{(1)}$$

如果使用矩阵的乘法运算，则可以将**第 1 层**的加权和表示成:

$$A^{(1)} = X W^{(1)} + B^{(1)}$$

其中，$A^{(1)}$ 、$X$、$B^{(1)}$、$W^{(1)}$ 如下所示：

$A^{(1)} = (a_1^{(1)}, a_2^{(1)}, a_3^{(1)})$，$X = (x_1, x_2)$，$B^{(1)} = (b_1^{(1)}, b_2^{(1)}, b_3^{(1)})$，$\mathbf{W}^{(1)} = \begin{pmatrix}w_{11}^{(1)} & w_{21}^{(1)} & w_{31}^{(1)} \\w_{12}^{(1)} & w_{22}^{(1)} & w_{32}^{(1)}\end{pmatrix}$

```python
import numpy as np

# 输入信号、权重、偏置设置成任意值。
X = np.array([1.0, 0.5])
W1 = np.array([[0.1, 0.3, 0.5], [0.2, 0.4, 0.6]])
B1 = np.array([0.1, 0.2, 0.3])
print(W1.shape) # (2, 3)
print(X.shape)  # (2,)
print(B1.shape) # (3,)
A1 = np.dot(X, W1) + B1
```

接下来，我们观察第 1 层中激活函数的计算过程。

![从输入层到第1层的信号传递](/images/deep-learning/neural-network/signal-transmission-2.png)

如图所示，隐藏层的加权和（加权信号和偏置的总和）用 $a$ 表示，被激活函数转换后的信号用 $z$ 表示，图中 $h()$ 表示激活函数。

```python
Z1 = sigmoid(A1)
print(A1) # [0.3, 0.7, 1.1]
print(Z1) # [0.57444252, 0.66818777, 0.75026011]
```

同理，也可以实现第 1 层到第 2 层的信号传递。

::: details 第 1 层到第 2 层的信号传递

![第1层到第2层的信号传递](/images/deep-learning/neural-network/signal-transmission-3.png)

```python
W2 = np.array([[0.1, 0.4], [0.2, 0.5], [0.3, 0.6]])
B2 = np.array([0.1, 0.2])
print(Z1.shape) # (3,)
print(W2.shape) # (3, 2)
print(B2.shape) # (2,)
A2 = np.dot(Z1, W2) + B2
Z2 = sigmoid(A2)
```

:::

::: details 第 2 层到输出层的信号传递

![第2层到输出层的信号传递](/images/deep-learning/neural-network/signal-transmission-4.png)

```python
def identity_function(x):
    return x

W3 = np.array([[0.1, 0.3], [0.2, 0.4]])
B3 = np.array([0.1, 0.2])
A3 = np.dot(Z2, W3) + B3
Y = identity_function(A3) # 或者Y = A3
```

这里我们定义了 identity_function()函数（也称为 “恒等函数”），并将其作为输出层的激活函数。恒等函数会将输入按原样输出，因此，这个例子中没有必要特意定义 identity_function()。这里这样实现只是为了和之前的流程保持统一。

另外，图 3-20 中，输出层的激活函数用 $σ()$ 表示，不同于隐藏层的激活函数 $h()$（$σ$ 读作 sigma）。

:::

### 代码实现小结

这里，我们按照神经网络的实现惯例，只把权重记为大写字母 W1，其他的（偏置或中间结果等）都用小写字母表示。

```python
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))
def identity_function(x):
    return x
def init_network():
    network = {}
    network['W1'] = np.array([[0.1, 0.3, 0.5], [0.2, 0.4, 0.6]])
    network['b1'] = np.array([0.1, 0.2, 0.3])
    network['W2'] = np.array([[0.1, 0.4], [0.2, 0.5], [0.3, 0.6]])
    network['b2'] = np.array([0.1, 0.2])
    network['W3'] = np.array([[0.1, 0.3], [0.2, 0.4]])
    network['b3'] = np.array([0.1, 0.2])
    return network
def forward(network, x):
    W1, W2, W3 = network['W1'], network['W2'], network['W3']
    b1, b2, b3 = network['b1'], network['b2'], network['b3']
    a1 = np.dot(x, W1) + b1
    z1 = sigmoid(a1)
    a2 = np.dot(z1, W2) + b2
    z2 = sigmoid(a2)
    a3 = np.dot(z2, W3) + b3
    y = identity_function(a3)
    return y
network = init_network()
x = np.array([1.0, 0.5])
y = forward(network, x)
print(y) # [ 0.31682708  0.69627909]
```

- **init_network()** 函数会进行权重和偏置的初始化，并将它们保存在字典变量 network 中。这个字典变量 network 中保存了每一层所需的参数（权重和偏置）。

- **forward()** 函数中封装了将输入信号转换为输出信号的处理过程

## 输出层的设计

神经网络可以用在分类问题和回归问题上，不过需要根据情况改变输出层的激活函数。一般而言，回归问题用**恒等函数**，分类问题用 **softmax 函数**。

::: tip 提示

机器学习的问题大致可以分为分类问题和回归问题。

分类问题是数据属于哪一个类别的问题。比如，区分图像中的人是男性还是女性的问题就是分类问题。

回归问题是根据某个输入预测一个（连续的）数值的问题。比如，根据一个人的图像预测这个人的体重的问题就是回归问题（类似 “57.4kg” 这样的预测）。

:::

### 恒等函数

恒等函数会将输入按原样输出，对于输入的信息，不加以任何改动地直接输出。

因此，在输出层使用恒等函数时，输入信号会原封不动地被输出。

![恒等函数](/images/deep-learning/neural-network/identity-function.png)

### softmax 函数

softmax 函数可以用下面的公式表示：

$$y_k = \frac{e^{a_i}}{\sum_{i=1}^{n} e^{a_j}}$$

该式表示假设输出层共有 n 个神经元，计算第 k 个神经元的输出 $y_k$。

![softmax 函数](/images/deep-learning/neural-network/softmax-function.png)

图中 softmax 函数的输出通过箭头与所有的输入信号相连。这是因为输出层的各个神经元都受到所有输入信号的影响。

```python
import numpy as np

def softmax(a):
    exp_a = np.exp(a)
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y
```

::: warning 注意

上面的 softmax 函数的实现虽然正确描述了公式，但在计算机的运算上有一定的缺陷。这个缺陷就是溢出问题。。softmax 函数的实现中要进行指数函数的运算，但是此时指数函数的值很容易变得非常大。比如，$e^{10}$ 的值会超过 20000，$e^{100}$ 会变成一个后面有 40 多个 0 的超大值，$e^{1000}$ 的结果会返回一个表示无穷大的 inf。

softmax 函数的实现可以像以下进行改进：

$$y_k = \frac{e^{a_i}}{\sum_{i=1}^{n} e^{a_j}} = \frac{Ce^{a_i}}{C\sum_{i=1}^{n} e^{a_j}} = \frac{e^{a_i + logC}}{\sum_{i=1}^{n} e^{a_j + logC}} = \frac{e^{a_i + C'}}{\sum_{i=1}^{n} e^{a_j + C'}}$$

综上，我们可以像下面这样实现 softmax 函数：

```python
import numpy as np

def softmax(a):
    c = np.max(a)
    exp_a = np.exp(a - c) # 溢出对策
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y
```

:::

::: tip softmax 函数的特征

softmax 函数的输出是 0.0 到 1.0 之间的实数。并且，softmax 函数的输出值的总和是 1。正因为有了这个性质，我们才可以把 softmax 函数的输出解释为 “概率”。

```python
a = np.array([0.3, 2.9, 4.0])
y = softmax(a)
print(y) # [ 0.01821127  0.24519181  0.73659691]
print(np.sum(y)) # 1.0

```

比如，上面的例子可以解释成 y[0]的概率是 0.018（1.8%）， y[1]的概率是 0.245（24.5%）， y[2]的概率是 0.737（73.7%）

:::

### 输出层神经元的数量

输出层的神经元数量需要根据待解决的问题来决定。对于分类问题，输出层的神经元数量一般设定为类别的数量。

![输出层神经元的数量](/images/deep-learning/neural-network/neurons.png)

## 小结

::: details 小结

- 神经网络中的激活函数使用平滑变化的 sigmoid 函数或 ReLU 函数。

- 通过巧妙地使用 NumPy 多维数组，可以高效地实现神经网络。

- 机器学习的问题大体上可以分为回归问题和分类问题。

- 关于输出层的激活函数，回归问题中一般用恒等函数，分类问题中一般用 softmax 函数。

- 分类问题中，输出层的神经元的数量设置为要分类的类别数。

- 输入数据的集合称为批。通过以批为单位进行推理处理，能够实现高速的运算。

:::

::: details 专有名词

- **激活函数**：神经元在计算过程中，将输入信号进行转换的过程。
  - **阶跃函数**：激活函数的一种，以阈值为界，一旦输入超过阈值，就切换输出。

  - **sigmoid 函数**：激活函数的一种，将输入信号映射到 0 到 1 之间的实数。

  - **ReLU 函数**：激活函数的一种，将输入信号映射到 0 到正无穷之间的实数。

  - **恒等函数**：激活函数的一种，将输入信号原封不动地输出。

  - **softmax 函数**：激活函数的一种，将输入信号映射到 0 到 1 之间的实数，并且各个输出的数值之和为 1。

- **权重**：决定当前神经元传递信号到下一个神经元的信号相对大小。

- **偏置**：决定当前神经元传递信号到下一个神经元的信号产生的偏移量。

- **隐藏层**：神经网络中的非输入层和输出层组成的层。

:::
