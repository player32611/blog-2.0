# 与学习相关的技巧

::: details 目录

[[toc]]

:::

## 参数的更新

神经网络的学习的目的是找到使损失函数的值尽可能小的参数。这是寻找最优参数的问题，解决这个问题的过程称为**最优化**（optimization）。但遗憾的是，神经网络的最优化问题非常难。这是因为参数空间非常复杂，无法轻易找到最优解（无法使用那种通过解数学式一下子就求得最小值的方法）。而且，在深度神经网络中，参数的数量非常庞大，导致最优化问题更加复杂。

之前我们为了找到最优参数，我们将参数的梯度（导数）作为了线索。使用参数的梯度，沿梯度方向更新参数，并重复这个步骤多次，从而逐渐靠近最优参数，这个过程称为**随机梯度下降法**（stochastic gradient descent），简称 **SGD**。

SGD 是一个简单的方法，比起胡乱地搜索参数空间，也算是 “聪明” 的方法。但是，根据不同的问题，也存在比 SGD 更加聪明的方法。

### SGD

用数学式可以将 SGD 写成如下的式：

![SGD数学式](/images/deep-learning/learning-skill/SGD.png)

> $W$：需要更新的权重参数
>
> $\frac{\partial L}{\partial W}$：损失函数关于 $W$ 的梯度
>
> $\eta$：学习率，实际上会取 0.01 或 0.001 这些事先决定好的值
>
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

::: details 代码解释

这里，进行初始化时的参数 `lr` 表示 learning rate（学习率）。这个学习率会保存为实例变量。

代码段中还定义了 `update(params, grads)` 方法，这个方法在 SGD 中会被反复调用。

参数 `params` 和 `grads`（与之前的神经网络的实现一样）是字典型变量，按 `params['W1']`、`grads['W1']` 的形式，分别保存了权重参数和它们的梯度。

:::

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

::: details 伪代码解释

这里首次出现的变量名 `optimizer` 表示 “进行最优化的人” 的意思，这里由 SGD 承担这个角色。参数的更新由 optimizer 负责完成。我们在这里需要做的只是将参数和梯度的信息传给 `optimizer`。

:::

像这样，通过单独实现进行最优化的类，功能的模块化变得更简单。这样一来，只需要将 `SGD()` 换成其它可行的优化类，就可以实现快速切换。

### SGD 的缺点

虽然SGD简单，并且容易实现，但是在解决某些问题时可能没有效率。

::: details 具体示例

我们来思考一下求下面这个函数的最小值的问题：

$$ f(x, y) = \frac{1}{20}x^2 + y^2 $$

![图形（左图）和等高线（右图）](/images/deep-learning/learning-skill/SGD-example.png)

> $f(x, y) = \frac{1}{20}x^2 + y^2$ 的图形（左图）和它的等高线（右图）

该函数数是向 x 轴方向延伸的 “碗” 状函数，且等高线呈向 x 轴方向延伸的椭圆状。

如果用图表示梯度的话，则如下所示：

![梯度图](/images/deep-learning/learning-skill/SGD-gradient.png)

这个梯度的特征是，y 轴方向上大，x 轴方向上小。换句话说，就是 y 轴方向的坡度大，而 x 轴方向的坡度小。这里需要注意的是，虽然这个函数的最小值在 (x,y)=(0,0) 处，但是图中的梯度在很多地方并没有指向(0,0)。

我们来尝试对这种形状的函数应用 SGD。从 (x,y)=(−7.0,2.0) 处（初始值）开始搜索：

![基于SGD的最优化的更新路径：呈 “之” 字形朝最小值(0,0)移动，效率低](/images/deep-learning/learning-skill/SGD-search.png)

结果显示，SGD 呈 “之” 字形移动。这是一个相当低效的路径。也就是说，SGD 的缺点是，如果函数的形状非均向（anisotropic），比如呈延伸状，搜索的路径就会非常低效。

:::

因此，我们需要比单纯朝梯度方向前进的 SGD 更聪明的方法。SGD 低效的根本原因是，梯度的方向并没有指向最小值的方向。

为了改正 SGD 的缺点，下面我们将介绍 **Momentum**、**AdaGrad**、**Adam** 这 3 种方法来取代 SGD。

### Momentum

**Momentum**是 “动量” 的意思，和物理有关。用数学式表示 Momentum 方法，如下所示：

![Momentum 数学式](/images/deep-learning/learning-skill/Momentum.png)

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

::: details 具体示例

Momentum 方法给人的感觉就像是小球在地面上滚动：

![小球滚动](/images/deep-learning/learning-skill/Momentum-ball.png)

:::

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

::: details 代码解释

实例变量 `v` 会保存物体的速度。初始化时，`v` 中什么都不保存，但当第一次调用 `update()` 时，`v` 会以字典型变量的形式保存与参数结构相同的数据。

:::

现在尝试使用 Momentum 解决函数 $f(x, y) = \frac{1}{20}x^2 + y^2$ 的最优化问题：

![基于 Momentum 的最优化的更新路径](/images/deep-learning/learning-skill/Momentum-search.png)

可以看到，更新路径就像小球在碗中滚动一样。

和 SGD 相比，我们发现 “之” 字形的 “程度” 减轻了。这是因为虽然 x 轴方向上受到的力非常小，但是一直在同一方向上受力，所以朝同一个方向会有一定的加速。反过来，虽然 y 轴方向上受到的力很大，但是因为交互地受到正方向和反方向的力，它们会互相抵消，所以 y 轴方向上的速度不稳定。

因此，和 SGD 时的情形相比，可以更快地朝 x 轴方向靠近，减弱 “之” 字形的变动程度。

### AdaGrad

在神经网络的学习中，学习率（数学式中记为 $η$）的值很重要。学习率过小，会导致学习花费过多时间；反过来，学习率过大，则会导致学习发散而不能正确进行。

在关于学习率的有效技巧中，有一种被称为**学习率衰减**（learning ratedecay）的方法，即随着学习的进行，使学习率逐渐减小。实际上，一开始 “多” 学，然后逐渐 “少” 学的方法，在神经网络的学习中经常被使用。

逐渐减小学习率的想法，相当于将 “全体” 参数的学习率值一起降低。而 **AdaGrad** 进一步发展了这个想法，针对 “一个一个” 的参数，赋予其 “定制” 的值。

AdaGrad 会为参数的每个元素适当地调整学习率，与此同时进行学习（AdaGrad 的 Ada 来自英文单词 Adaptive，即 “适当的” 的意思）。

![AdaGrad 数学式](/images/deep-learning/learning-skill/AdaGrad.png)

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

::: warning 注意

AdaGrad 会记录过去所有梯度的平方和。因此，学习越深入，更新的幅度就越小。实际上，如果无止境地学习，更新量就会变为 0，完全不再更新。为了改善这个问题，可以使用 RMSProp 方法。RMSProp 方法并不是将过去所有的梯度一视同仁地相加，而是逐渐地遗忘过去的梯度，在做加法运算时将新梯度的信息更多地反映出来。这种操作从专业上讲，称为 “指数移动平均”，呈指数函数式地减小过去的梯度的尺度。

:::

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

::: details 代码解释

这里需要注意的是，最后一行加上了微小值 `1e-7`。这是为了防止当 `self.h[key]` 中有 0 时，将 0 用作除数的情况。在很多深度学习的框架中，这个微小值也可以设定为参数，但这里我们用的是 `1e-7` 这个固定值。

:::

现在，让我们试着使用 AdaGrad 解决函数 $f(x, y) = \frac{1}{20}x^2 + y^2$ 的最优化问题：

![基于 AdaGrad 的最优化的更新路径](/images/deep-learning/learning-skill/AdaGrad-search.png)

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

![基于 Adam 的最优化的更新路径](/images/deep-learning/learning-skill/Adam-search.png)

基于 Adam 的更新过程就像小球在碗中滚动一样。虽然 Momentun 也有类似的移动，但是相比之下，Adam 的小球左右摇晃的程度有所减轻。这得益于学习的更新程度被适当地调整了。

::: tip 提示

Adam 会设置 3 个超参数。一个是学习率（论文中以 $α$ 出现），另外两个是一次 momentum 系数 $β_1$ 和二次 momentum 系数 $β_2$。根据论文，标准的设定值是 $β_1$ 为 0.9，$β_2$ 为 0.999。设置了这些值后，大多数情况下都能顺利运行。

:::

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

![最优化方法的比较：SGD、Momentum、AdaGrad、Adam](/images/deep-learning/learning-skill/optimizer-compare.png)

根据使用的方法不同，参数更新的路径也不同。只看这个图的话，AdaGrad 似乎是最好的，不过也要注意，结果会根据要解决的问题而变。并且，很显然，超参数（学习率等）的设定值不同，结果也会发生变化。

这 4 种方法各有各的特点，都有各自擅长解决的问题和不擅长解决的问题。很多研究中至今仍在使用 SGD。Momentum 和 AdaGrad 也是值得一试的方法。最近，很多研究人员和技术人员都喜欢用 Adam。

::: details 基于MNIST数据集的更新方法的比较

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

![基于MNIST数据集的更新方法的比较](/images/deep-learning/learning-skill/optimizer-compare-mnist.png)

从图中结果可知，与 SGD 相比，其他 3 种方法学习得更快，而且速度基本相同，仔细看的话，AdaGrad 的学习进行得稍微快一点。这个实验需要注意的地方是，实验结果会随学习率等超参数、神经网络的结构（几层深等）的不同而发生变化。不过，一般而言，与 SGD 相比，其他 3 种方法可以学习得更快，有时最终的识别精度也更高。

:::

## 权重的初始值

在神经网络的学习中，权重的初始值特别重要。实际上，设定什么样的权重初始值，经常关系到神经网络的学习能否成功。

### 可以将权重初始值设为 0 吗

**权值衰减**（weight decay）是一种抑制过拟合、提高泛化能力的技巧。简单地说，权值衰减就是一种以减小权重参数的值为目的进行学习的方法。通过减小权重参数的值来抑制过拟合的发生。

如果想减小权重的值，一开始就将初始值设为较小的值才是正途。

::: tip 提示

之前我们的权重初始值都是像 `0.01 * np.random.randn(10, 100)` 这样，使用由高斯分布生成的值乘以 0.01 后得到的值（标准差为 0.01 的高斯分布）。

:::

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

::: details 代码解释

这里假设神经网络有 5 层，每层有 100 个神经元。

然后，用高斯分布随机生成 1000 个数据作为输入数据，并把它们传给 5 层神经网络。

激活函数使用 sigmoid 函数，各层的激活值的结果保存在 activations 变量中。

这个代码段中需要注意的是权重的尺度。虽然这次我们使用的是标准差为 1 的高斯分布，但实验的目的是通过改变这个尺度（标准差），观察激活值的分布如何变化。

:::

运行这段代码后，可以得到使用标准差为 **1** 的高斯分布作为权重初始值时的各层激活值的分布：

![使用标准差为 1 的高斯分布作为权重初始值时的各层激活值的分布](/images/deep-learning/learning-skill/activation-distribution-1.png)

观察结果，可以发现，各层的激活值呈偏向 0 和 1 的分布。

这里使用的 sigmoid 函数是 S 型函数，随着输出不断地靠近 0（或者靠近 1），它的导数的值逐渐接近 0。因此，偏向 0 和 1 的数据分布会造成反向传播中梯度的值不断变小，最后消失。这个问题称为**梯度消失**（gradient vanishing）。层次加深的深度学习中，梯度消失的问题可能会更加严重。

下面，将权重的标准差设为 **0.01**，进行相同的实验：

![使用标准差为 0.01 的高斯分布作为权重初始值时的各层激活值的分布](/images/deep-learning/learning-skill/activation-distribution-0.01.png)

这次呈集中在 0.5 附近的分布。因为不像刚才的例子那样偏向 0 和 1，所以不会发生梯度消失的问题。

但是，激活值的分布有所偏向，说明在表现力上会有很大问题。

因为如果有多个神经元都输出几乎相同的值，那它们就没有存在的意义了。比如，如果 100 个神经元都输出几乎相同的值，那么也可以由 1 个神经元来表达基本相同的事情。因此，激活值在分布上有所偏向会出现 “表现力受限” 的问题。

::: tip 各层的激活值的分布都要求有适当的广度

因为通过在各层间传递多样性的数据，神经网络可以进行高效的学习。反过来，如果传递的是有所偏向的数据，就会出现梯度消失或者 “表现力受限” 的问题，导致学习可能无法顺利进行。

:::

接着，我们尝试使用 Xavier Glorot 等人的论文中推荐的权重初始值（俗称 “Xavier 初始值”）：

::: details 关于 Xavier

现在，在一般的深度学习框架中，Xavier 初始值已被作为标准使用。比如，Caffe 框架中，通过在设定权重初始值时赋予 xavier 参数，就可以使用 Xavier 初始值。

Xavier 的论文中，为了使各层的激活值呈现出具有相同广度的分布，推导了合适的权重尺度。推导出的结论是，**如果前一层的节点数为 $n$，则初始值使用标准差为 $\sqrt{\frac{1}{n}}$ 的分布**。

![Xavier 初始值](/images/deep-learning/learning-skill/xavier-initial-value.png)

使用 Xavier 初始值后，前一层的节点数越多，要设定为目标节点的初始值的权重尺度就越小。

:::

![使用Xavier初始值作为权重初始值时的各层激活值的分布](/images/deep-learning/learning-skill/activation-distribution-xavier.png)

从这个结果可知，越是后面的层，图像变得越歪斜，但是呈现了比之前更有广度的分布。因为各层间传递的数据有适当的广度，所以 sigmoid 函数的表现力不受限制，有望进行高效的学习。

::: details 激活函数的优化

图中可以看到，后面的层的分布呈稍微歪斜的形状。如果用 tanh 函数（双曲线函数）代替 sigmoid 函数，这个稍微歪斜的问题就能得到改善。实际上，使用 tanh 函数后，会呈漂亮的吊钟型分布。tanh 函数和 sigmoid 函数同是 S 型曲线函数，但 tanh 函数是关于原点 (0, 0) 对称的 S 型曲线，而 sigmoid 函数是关于 (x,y)=(0, 0.5) 对称的 S 型曲线。众所周知，用作激活函数的函数最好具有关于原点对称的性质。

:::

### ReLU 的权重初始值

Xavier 初始值是以激活函数是线性函数为前提而推导出来的。因为 sigmoid 函数和 tanh 函数左右对称，且中央附近可以视作线性函数，所以适合使用 Xavier 初始值。

但当激活函数使用 ReLU 时，一般推荐使用 ReLU 专用的初始值，也就是 Kaiming He 等人推荐的初始值，也称为**He 初始值**。

当前一层的节点数为 $n$ 时，He 初始值使用标准差为 $\sqrt{\frac{2}{n}}$ 的高斯分布。

::: details Xavier 初始值与 He 初始值的对比

当 Xavier 初始值是 $\sqrt{\frac{1}{n}}$ 时，（直观上）可以解释为，因为 ReLU 的负值区域的值为 0，为了使它更有广度，所以需要 2 倍的系数。

:::

现在来看一下激活函数使用 ReLU 时激活值的分布，依次是权重初始值为标准差是 0.01 的高斯分布时、初始值为 Xavier 初始值时、初始值为 He 初始值时的结果：

![激活函数使用ReLU时,不同权重初始值的激活值分布的变化](/images/deep-learning/learning-skill/activation-distribution-relu.png)

- 当初始值为标准差是 0.01 的高斯分布时，各层的激活值非常小。神经网络上传递的是非常小的值，说明逆向传播时权重的梯度也同样很小。这是很严重的问题，实际上学习基本上没有进展。

- 当初始值为 Xavier 初始值时，各层的激活值呈现更宽的分布，但依然有偏斜。在这种情况下，随着层的加深，偏向一点点变大。实际上，层加深后，激活值的偏向变大，学习时会出现梯度消失的问题。

- 当初始值为 He 初始值时，各层中分布的广度相同。由于即便层加深，数据的广度也能保持不变，因此逆向传播时，也会传递合适的值。

总结一下，当激活函数使用 ReLU 时，权重初始值使用 He 初始值，当激活函数为 sigmoid 或 tanh 等 S 型曲线函数时，初始值使用 Xavier 初始值。这是目前的最佳实践。

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

::: details 代码解释

这个实验中，神经网络有 5 层，每层有 100 个神经元，激活函数使用的是 ReLU。

:::

![基于MNIST数据集的权重初始值的比较：横轴是学习的迭代次数（iterations），纵轴是损失函数的值（loss）](/images/deep-learning/learning-skill/weight-init-comparison.png)

从图中的结果可知，初始值为标准差是 0.01 的高斯分布时完全无法进行学习。这和刚才观察到的激活值的分布一样，是因为正向传播中传递的值很小（集中在 0 附近的数据）。因此，逆向传播时求到的梯度也很小，权重几乎不进行更新。

相反，当权重初始值为 Xavier 初始值和 He 初始值时，学习进行得很顺利。并且，我们发现 He 初始值时的学习进度更快一些。

综上，在神经网络的学习中，权重初始值非常重要。很多时候权重初始值的设定关系到神经网络的学习能否成功。权重初始值的重要性容易被忽视，而任何事情的开始（初始值）总是关键的，

## Batch Normalization

如果设定了合适的权重初始值，则各层的激活值分布会有适当的广度，从而可以顺利地进行学习。

那么，为了使各层拥有适当的广度，“强制性” 地调整激活值的分布会怎样呢？实际上，**Batch Normalization** 方法就是基于这个想法而产生的

### Batch Normalization 的算法

Batch Normalization（下文简称Batch Norm）是 2015 年提出的方法。Batch Norm 虽然是一个问世不久的新方法，但已经被很多研究人员和技术人员广泛使用。

::: tip Batch Norm 的优点

- 可以使学习快速进行（可以增大学习率）

- 不那么依赖初始值（对于初始值不用那么神经质）

- 抑制过拟合（降低 Dropout 等的必要性）

考虑到深度学习要花费很多时间，第一个优点令人非常开心。另外，后两点也可以帮我们消除深度学习的学习中的很多烦恼。

:::

Batch Norm 的思路是调整各层的激活值分布使其拥有适当的广度。为此，要向神经网络中插入对数据分布进行正规化的层，即 Batch Normalization 层（下文简称 Batch Norm 层）：

![使用了 Batch Normalization 的神经网络的例子（Batch Norm 层的背景为灰色）](/images/deep-learning/learning-skill/batch-norm.png)

Batch Norm，顾名思义，以进行学习时的 mini-batch 为单位，按 minibatch 进行正规化。具体而言，就是进行使数据分布的均值为 0、方差为 1 的正规化。用数学式表示的话，如下所示：

![Batch Norm 的算法](/images/deep-learning/learning-skill/batch-norm-algorithm.png)

> $\mu_B$： minibatch 中数据的均值
>
> $\sigma_B^2$：minibatch 中数据的方差
>
> $ε$：一个微小值（比如，10e-7 等），防止出现除以 0 的情况。

这里对 mini-batch 的 $m$ 个输入数据的集合 $B={\{x_1,x_2,...,x_m\}}$ 求均值 $\mu_B$ 和方差 $\sigma_B^2$。然后，对输入数据进行均值为 0、方差为 1（合适的分布）的正规化。

接着，Batch Norm 层会对正规化后的数据进行缩放和平移的变换，用数学式可以如下表示：

![Batch Norm 层对输入数据的变换](/images/deep-learning/learning-skill/batch-norm-transform.png)

> $\gamma$ 和 $\beta$：两个参数，分别对输入数据进行缩放和平移的变换，一开始设置为 1 和 0，然后再通过学习调整到合适的值。

上面就是 Batch Norm 的算法。这个算法是神经网络上的正向传播。如果使用计算图，Batch Norm 可以表示为：

![Batch Norm 的计算图](/images/deep-learning/learning-skill/batch-norm-graph.png)

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

![基于 Batch Norm 的效果：使用 Batch Norm 后，学习进行得更快了](/images/deep-learning/learning-skill/batch-norm-result.png)

从图中的结果可知，使用 Batch Norm 后，学习进行得更快了。

接着，给予不同的初始值尺度，观察学习的过程如何变化：

![图中的实线是使用了 Batch Norm时的结果，虚线是没有使用 Batch Norm 时的结果：图的标题处标明了权重初始值的标准差](/images/deep-learning/learning-skill/weight-init-scale-result.png)

我们发现，几乎所有的情况下都是使用 Batch Norm 时学习进行得更快。同时也可以发现，实际上，在不使用 Batch Norm 的情况下，如果不赋予一个尺度好的初始值，学习将完全无法进行。

综上，通过使用 Batch Norm，可以推动学习的进行。并且，对权重初始值变得健壮（表示不那么依赖初始值）。

## 正则化

机器学习的问题中，**过拟合**是一个很常见的问题。过拟合指的是只能拟合训练数据，但不能很好地拟合不包含在训练数据中的其他数据的状态。

机器学习的目标是提高泛化能力，即便是没有包含在训练数据里的未观测数据，也希望模型可以进行正确的识别。我们可以制作复杂的、表现力强的模型，但是相应地，抑制过拟合的技巧也很重要。

### 过拟合

发生过拟合的原因，主要有以下两个：

- 模型拥有大量参数、表现力强。

- 训练数据少。

::: details 具体示例：制造过拟合现象

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

![训练数据（train）和测试数据（test）的识别精度的变化](/images/deep-learning/learning-skill/overfitting-result.png)

过了 100 个 epoch 左右后，用训练数据测量到的识别精度几乎都为 100%。但是，对于测试数据，离 100% 的识别精度还有较大的差距。如此大的识别精度差距，是只拟合了训练数据的结果。从图中可知，模型对训练时没有使用的一般数据（测试数据）拟合得不是很好。

:::

### 权值衰减

**权值衰减**是一直以来经常被使用的一种抑制过拟合的方法。该方法通过在学习的过程中对大的权重进行惩罚，来抑制过拟合。很多过拟合原本就是因为权重参数取值过大才发生的。

神经网络的学习目的是减小损失函数的值。这时，例如为损失函数加上权重的平方范数（L2 范数）。这样一来，就可以抑制权重变大。

如果将权重记为 $W$，L2范数的权值衰减就是 $\frac{1}{2} \lambda W^2$，然后将这个 $\frac{1}{2} \lambda W^2$ 加到损失函数上。

> $\lambda$ 是控制正则化强度的超参数，设置得越大，对大的权重施加的惩罚就越重。
>
> $\frac{1}{2} \lambda W^2$ 开头的 $\frac{1}{2}$ 是用于将 $\frac{1}{2} \lambda W^2$ 的求导结果变成 $\lambda W$ 的调整用常量。

对于所有权重，权值衰减方法都会为损失函数加上 $\frac{1}{2} \lambda W^2$。因此，在求权重梯度的计算中，要为之前的误差反向传播法的结果加上正则化项的导数 $\lambda W$。

::: tip 范数

L2 范数相当于各个元素的平方和。用数学式表示的话，假设有权重 $W=(w_1, w_2, ..., w_n)$，则 L2 范数可用 $\sqrt{w_1^2 + w_2^2 + ... + w_n^2}$ 计算出来。

除了 L2 范数，还有 L1 范数、L∞ 范数等。

L1 范数是各个元素的绝对值之和，相当于 $|w_1| + |w_2| + ... + |w_n|$。

L∞ 范数也称为 Max 范数，相当于各个元素的绝对值中最大的那一个。

L2 范数、L1 范数、L∞ 范数都可以用作正则化项，它们各有各的特点。

:::

现在我们来进行实验。对于刚刚进行的实验，应用 λ=0.1 的权值衰减：

![使用了权值衰减的训练数据（train）和测试数据（test）的识别精度的变化](/images/deep-learning/learning-skill/weight-decay-result.png)

虽然训练数据的识别精度和测试数据的识别精度之间有差距，但是与没有使用权值衰减的结果相比，差距变小了。这说明过拟合受到了抑制。

此外，还要注意，训练数据的识别精度没有达到 100%。

### Dropout

权值衰减方法实现简单，在某种程度上能够抑制过拟合。但是，如果网络的模型变得很复杂，只用权值衰减就难以应对了。在这种情况下，我们经常会使用 **Dropout** 方法。

Dropout 是一种在学习的过程中随机删除神经元的方法。训练时，随机选出隐藏层的神经元，然后将其删除。被删除的神经元不再进行信号的传递。

![Dropout的概念图：左边是一般的神经网络，右边是应用了 Dropout 的网络](/images/deep-learning/learning-skill/dropout.png)

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

::: details 代码解释

每次正向传播时，`self.mask` 中都会以 `False` 的形式保存要删除的神经元。

`self.mask` 会随机生成和 `x` 形状相同的数组，并将值比 `dropout_ratio` 大的元素设为 `True`。

反向传播时的行为和 ReLU 相同。

也就是说，正向传播时传递了信号的神经元，反向传播时按原样传递信号；正向传播时没有传递信号的神经元，反向传播时信号将停在那里。

:::

现在，我们使用 MNIST 数据集进行验证，以确认 Dropout 的效果：

::: code-group

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

:::

> `trainer.py` 是一个神经网络训练器（Trainer）类，它封装了完整的神经网络训练流程，提供了灵活的训练配置和监控功能。

Dropout 的实验和前面的实验一样，使用 7 层网络（每层有 100 个神经元，激活函数为 ReLU），一个使用 Dropout，另一个不使用 Dropout，实验的结果如下图所示：

![左边没有使用 Dropout，右边使用了 Dropout（dropout_rate=0.15）](/images/deep-learning/learning-skill/dropout-example.png)

> 左边没有使用 Dropout，右边使用了 Dropout（dropout_rate=0.15）

通过使用 Dropout，训练数据和测试数据的识别精度的差距变小了。并且，训练数据也没有到达 100% 的识别精度。像这样，通过使用 Dropout，即便是表现力强的网络，也可以抑制过拟合。

## 超参数的验证

神经网络中，除了权重和偏置等参数，**超参数**（hyper-parameter）也经常出现。这里所说的超参数是指，比如各层的神经元数量、batch 大小、参数更新时的学习率或权值衰减等。如果这些超参数没有设置合适的值，模型的性能就会很差。虽然超参数的取值非常重要，但是在决定超参数的过程中一般会伴随很多的试错。

### 验证数据

之前我们使用的数据集分成了训练数据和测试数据，训练数据用于学习，测试数据用于评估泛化能力。由此，就可以评估是否只过度拟合了训练数据（是否发生了过拟合），以及泛化能力如何等。

下面我们要对超参数设置各种各样的值以进行验证。（不能使用测试数据评估超参数的性能）

调整超参数时，必须使用超参数专用的确认数据。用于调整超参数的数据，一般称为**验证数据**（validation data）。我们使用这个验证数据来评估超参数的好坏。

::: details 为什么不能用测试数据评估超参数的性能

如果使用测试数据调整超参数，超参数的值会对测试数据发生过拟合。

换句话说，用测试数据确认超参数的值的 “好坏”，就会导致超参数的值被调整为只拟合测试数据。这样的话，可能就会得到不能拟合其他数据、泛化能力低的模型。

根据不同的数据集，有的会事先分成训练数据、验证数据、测试数据三部分，有的只分成训练数据和测试数据两部分，有的则不进行分割。在这种情况下，用户需要自行进行分割。

- 训练数据用于参数（权重和偏置）的学习

- 验证数据用于超参数的性能评估

- 为了确认泛化能力，要在最后使用（比较理想的是只用一次）测试数据。

:::

如果是 MNIST 数据集，获得验证数据的最简单的方法就是从训练数据中事先分割 20% 作为验证数据：

::: code-group

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

:::

::: details 代码解释

这里，分割训练数据前，先打乱了输入数据和监督数据。这是因为数据集的数据可能存在偏向（比如，数据从 “0” 到 “10” 按顺序排列等）

:::

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

::: details 贝叶斯最优化

在超参数的最优化中，如果需要更精炼的方法，可以使用**贝叶斯最优化**（Bayesian optimization）。贝叶斯最优化运用以贝叶斯定理为中心的数学理论，能够更加严密、高效地进行最优化。

:::

### 超参数最优化的实现

现在，我们使用 MNIST 数据集进行超参数的最优化。这里我们将学习率和控制权值衰减强度的系数（权值衰减系数）这两个超参数的搜索问题作为对象。

超参数的随机采样的代码如下所示：

```python
weight_decay = 10 ** np.random.uniform(-8, -4)
lr = 10 ** np.random.uniform(-6, -2)
```

::: details 代码解释

如前所述，通过从 0.001（$10^{-3}$）到 1000（$10^3$）这样的对数尺度的范围中随机采样进行超参数的验证。这在 Python 中可以写成 `10 ** np.random.uniform(-3, 3)`。

在该实验中，权值衰减系数的初始范围为 $10^{−8}$ 到 $10^{−4}$，学习率的初始范围为 $10^{−6}$ 到 $10^{−2}$。

:::

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

![超参数的验证](/images/deep-learning/learning-skill/hyper-parameter-verification.png)

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

::: details 小结

- 参数的更新方法，除了 SGD（随机梯度下降法）之外，还有 Momentum、AdaGrad、Adam 等方法。

- 权重初始值的赋值方法对进行正确的学习非常重要。

- 作为权重初始值，Xavier 初始值、He 初始值等比较有效

- 通过使用 Batch Normalization，可以加速学习，并且对初始值变得健壮。

- 抑制过拟合的正则化技术有权值衰减、Dropout 等。

- 逐渐缩小 “好值” 存在的范围是搜索超参数的一个有效方法。

:::

::: details 专有名词

- **最优化**：神经网络的学习中寻找最优参数的过程

- **SGD（随机梯度下降法）**：一种最优化方法，使用参数的梯度，沿梯度方向更新参数，并重复这个步骤多次，从而逐渐靠近最优参数

- **Momentum**：一种改进随机梯度下降法的方法，在梯度方向上受力，使参数的更新更平滑

- **AdaGrad**：一种改进随机梯度下降法，会为参数的每个元素适当地调整学习率，与此同时进行学习

- **Adam**：一种改进随机梯度下降法，融合了 Momentum 和 AdaGrad 的优点，并添加了超参数的 “偏置校正”

- **权值衰减**：一种抑制过拟合的方法，在学习的过程中对大的权重进行惩罚，减小权重参数的值来抑制过拟合的发生

- **激活值**：神经元在通过激活函数计算后的输出数据

- **梯度消失**：偏向 0 和 1 的数据分布会造成反向传播中梯度的值不断变小，最后消失

- **Xavier 初始值**：一种智能的权重初始化方法，保持网络中每层的输入和输出方差一致，防止在前向传播和反向传播过程中信号消失或爆炸，推荐在 sigmoid 或 tanh 等 S 型曲线函数作为激活函数时使用

- **He 初始值**：一种权重初始化方法，推荐在 ReLU 作为激活函数时使用

- **Batch Normalization**：一种对数据分布进行正规化的方法，使得各层激活值的分布有适当的广度，从而可以顺利地进行学习

- **Dropout**：一种抑制过拟合的方法，在学习的过程中随机删除神经元

- **验证数据**：用于超参数的调整的数据

:::
