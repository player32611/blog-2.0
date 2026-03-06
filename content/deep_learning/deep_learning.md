# 深度学习

> 深度学习是加深了层的深度神经网络

::: details 目录

[[toc]]

:::

## 加深网络

关于神经网络，我们已经学了很多东西，比如构成神经网络的各种层、学习时的有效技巧、对图像特别有效的 CNN、参数的最优化方法等，这些都是深度学习中的重要技术。

接下来我们将这些已经学过的技术汇总起来，创建一个深度网络，挑战 MNIST 数据集的手写数字识别。

### 向更深的网络出发

我们来创建一个更深的网络结构的 CNN（一个比之前的网络都深的网络）：

![进行手写数字识别的深度CNN](/images/deep-learning/deep-learning/deep-cnn.png)

这里使用的卷积层全都是 3×3 的小型滤波器，特点是随着层的加深，通道数变大（卷积层的通道数从前面的层开始按顺序以 16、16、32、32、64、64 的方式增加）

此外，还插入了池化层，以逐渐减小中间数据的空间大小；并且，后面的全连接层中使用了 Dropout 层。

这个网络使用 He 初始值作为权重的初始值，使用 Adam 更新权重参数。

总结起来，这个网络有如下特点：

- 基于 3×3 的小型滤波器的卷积层

- 激活函数是 ReLU

- 全连接层的后面使用 Dropout 层

- 基于 Adam 的最优化

- 使用 He 初始值作为权重初始值

可以看出，该网络中使用了多个之前介绍的神经网络技术。

现在，我们使用这个网络进行学习：

::: code-group

```python [deep_convnet.py]
import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
import pickle
import numpy as np
from collections import OrderedDict
from common.layers import *


class DeepConvNet:
    """识别率为99%以上的高精度的ConvNet

    网络结构如下所示
        conv - relu - conv- relu - pool -
        conv - relu - conv- relu - pool -
        conv - relu - conv- relu - pool -
        affine - relu - dropout - affine - dropout - softmax
    """
    def __init__(self, input_dim=(1, 28, 28),
                 conv_param_1 = {'filter_num':16, 'filter_size':3, 'pad':1, 'stride':1},
                 conv_param_2 = {'filter_num':16, 'filter_size':3, 'pad':1, 'stride':1},
                 conv_param_3 = {'filter_num':32, 'filter_size':3, 'pad':1, 'stride':1},
                 conv_param_4 = {'filter_num':32, 'filter_size':3, 'pad':2, 'stride':1},
                 conv_param_5 = {'filter_num':64, 'filter_size':3, 'pad':1, 'stride':1},
                 conv_param_6 = {'filter_num':64, 'filter_size':3, 'pad':1, 'stride':1},
                 hidden_size=50, output_size=10):
        # 初始化权重===========
        # 各层的神经元平均与前一层的几个神经元有连接（TODO:自动计算）
        pre_node_nums = np.array([1*3*3, 16*3*3, 16*3*3, 32*3*3, 32*3*3, 64*3*3, 64*4*4, hidden_size])
        wight_init_scales = np.sqrt(2.0 / pre_node_nums)  # 使用ReLU的情况下推荐的初始值

        self.params = {}
        pre_channel_num = input_dim[0]
        for idx, conv_param in enumerate([conv_param_1, conv_param_2, conv_param_3, conv_param_4, conv_param_5, conv_param_6]):
            self.params['W' + str(idx+1)] = wight_init_scales[idx] * np.random.randn(conv_param['filter_num'], pre_channel_num, conv_param['filter_size'], conv_param['filter_size'])
            self.params['b' + str(idx+1)] = np.zeros(conv_param['filter_num'])
            pre_channel_num = conv_param['filter_num']
        self.params['W7'] = wight_init_scales[6] * np.random.randn(64*4*4, hidden_size)
        self.params['b7'] = np.zeros(hidden_size)
        self.params['W8'] = wight_init_scales[7] * np.random.randn(hidden_size, output_size)
        self.params['b8'] = np.zeros(output_size)

        # 生成层===========
        self.layers = []
        self.layers.append(Convolution(self.params['W1'], self.params['b1'],
                           conv_param_1['stride'], conv_param_1['pad']))
        self.layers.append(Relu())
        self.layers.append(Convolution(self.params['W2'], self.params['b2'],
                           conv_param_2['stride'], conv_param_2['pad']))
        self.layers.append(Relu())
        self.layers.append(Pooling(pool_h=2, pool_w=2, stride=2))
        self.layers.append(Convolution(self.params['W3'], self.params['b3'],
                           conv_param_3['stride'], conv_param_3['pad']))
        self.layers.append(Relu())
        self.layers.append(Convolution(self.params['W4'], self.params['b4'],
                           conv_param_4['stride'], conv_param_4['pad']))
        self.layers.append(Relu())
        self.layers.append(Pooling(pool_h=2, pool_w=2, stride=2))
        self.layers.append(Convolution(self.params['W5'], self.params['b5'],
                           conv_param_5['stride'], conv_param_5['pad']))
        self.layers.append(Relu())
        self.layers.append(Convolution(self.params['W6'], self.params['b6'],
                           conv_param_6['stride'], conv_param_6['pad']))
        self.layers.append(Relu())
        self.layers.append(Pooling(pool_h=2, pool_w=2, stride=2))
        self.layers.append(Affine(self.params['W7'], self.params['b7']))
        self.layers.append(Relu())
        self.layers.append(Dropout(0.5))
        self.layers.append(Affine(self.params['W8'], self.params['b8']))
        self.layers.append(Dropout(0.5))

        self.last_layer = SoftmaxWithLoss()

    def predict(self, x, train_flg=False):
        for layer in self.layers:
            if isinstance(layer, Dropout):
                x = layer.forward(x, train_flg)
            else:
                x = layer.forward(x)
        return x

    def loss(self, x, t):
        y = self.predict(x, train_flg=True)
        return self.last_layer.forward(y, t)

    def accuracy(self, x, t, batch_size=100):
        if t.ndim != 1 : t = np.argmax(t, axis=1)

        acc = 0.0

        for i in range(int(x.shape[0] / batch_size)):
            tx = x[i*batch_size:(i+1)*batch_size]
            tt = t[i*batch_size:(i+1)*batch_size]
            y = self.predict(tx, train_flg=False)
            y = np.argmax(y, axis=1)
            acc += np.sum(y == tt)

        return acc / x.shape[0]

    def gradient(self, x, t):
        # forward
        self.loss(x, t)

        # backward
        dout = 1
        dout = self.last_layer.backward(dout)

        tmp_layers = self.layers.copy()
        tmp_layers.reverse()
        for layer in tmp_layers:
            dout = layer.backward(dout)

        # 设定
        grads = {}
        for i, layer_idx in enumerate((0, 2, 5, 7, 10, 12, 15, 18)):
            grads['W' + str(i+1)] = self.layers[layer_idx].dW
            grads['b' + str(i+1)] = self.layers[layer_idx].db

        return grads

    def save_params(self, file_name="params.pkl"):
        params = {}
        for key, val in self.params.items():
            params[key] = val
        with open(file_name, 'wb') as f:
            pickle.dump(params, f)

    def load_params(self, file_name="params.pkl"):
        with open(file_name, 'rb') as f:
            params = pickle.load(f)
        for key, val in params.items():
            self.params[key] = val

        for i, layer_idx in enumerate((0, 2, 5, 7, 10, 12, 15, 18)):
            self.layers[layer_idx].W = self.params['W' + str(i+1)]
            self.layers[layer_idx].b = self.params['b' + str(i+1)]
```

```python [train_deepnet.py]
import sys, os
sys.path.append(os.pardir)  # 为了导入父目录而进行的设定
import numpy as np
import matplotlib.pyplot as plt
from dataset.mnist import load_mnist
from deep_convnet import DeepConvNet
from common.trainer import Trainer

(x_train, t_train), (x_test, t_test) = load_mnist(flatten=False)

network = DeepConvNet()
trainer = Trainer(network, x_train, t_train, x_test, t_test,
                  epochs=20, mini_batch_size=100,
                  optimizer='Adam', optimizer_param={'lr':0.001},
                  evaluate_sample_num_per_epoch=1000)
trainer.train()

# 保存参数
network.save_params("deep_convnet_params.pkl")
print("Saved Network Parameters!")
```

:::

::: details 代码解释

实现该网络的源代码在 `deep_convnet.py` 中，训练用的代码在 `train_deepnet.py` 中。

虽然使用这些代码可以重现这里进行的学习，不过深度网络的学习需要花费较多的时间（大概要半天以上）。

这里给出学习完的权重参数（`deep_conv_net_params.pkl`）。`deep_convnet.py` 备有读入学习完的参数的功能，根据需要进行使用。

:::

这个网络的识别精度为 99.38%，错误识别率只有 0.62%，可以说是非常优秀的性能了！

这里我们实际看一下在什么样的图像上发生了识别错误：

![识别错误的图像的例子](/images/deep-learning/deep-learning/recognition-error-example.png)

> 各个图像的左上角显示了正确解标签，右下角显示了本网络的推理结果

观察图像可知，这些图像对于我们人类而言也很难判断。这里面有几个图像很难判断是哪个数字，即使是我们人类，也同样会犯 “识别错误”。

比如，左上角的图像（正确解是 “6”）看上去像 “0”，它旁边的图像（正确解是 “3”）看上去像 “5”。 整体上，“1” 和 “7”、“0” 和 “6”、“3” 和 “5” 的组合比较容易混淆。

这次的深度 CNN 尽管识别精度很高，但是对于某些图像，也犯了和人类同样的 “识别错误”。从这一点上，我们也可以感受到深度 CNN 中蕴藏着巨大的可能性。

### 进一步提高识别精度

在一个标题为 “What is the class of this image ?” 的网站上，以排行榜的形式刊登了目前为止通过论文等渠道发表的针对各种数据集的方法的识别精度：

![针对MNIST数据集的各种方法的排行](/images/deep-learning/deep-learning/mnist-ranking.png)

可以发现 “Neural Networks”“Deep”“Convolutional” 等关键词特别显眼。实际上，排行榜上的前几名大都是基于 CNN 的方法。

实际上，排行榜上的前几名大都是基于 CNN 的方法。

截止到 2016 年 6 月，对 MNIST 数据集的最高识别精度是 99.79%（错误识别率为 0.21%），该方法也是以 CNN 为基础的。不过，它用的 CNN 并不是特别深层的网络（卷积层为 2 层、全连接层为 2 层的网络）

::: details 为什么层不用特别深就获得了较高的识别精度

对于 MNIST 数据集，层不用特别深就获得了（目前）最高的识别精度。

一般认为，这是因为对于手写数字识别这样一个比较简单的任务，没有必要将网络的表现力提高到那么高的程度。

因此，可以说加深层的好处并不大。

而大规模的一般物体识别的情况，因为问题复杂，所以加深层对提高识别精度大有裨益。

:::

参考刚才排行榜中前几名的方法，可以发现进一步提高识别精度的技术和线索。比如，集成学习、学习率衰减、**Data Augmentation**（数据扩充）等都有助于提高识别精度。尤其是Data Augmentation，虽然方法很简单，但在提高识别精度上效果显著。

::: details Data Augmentation

Data Augmentation 基于算法 “人为地” 扩充输入图像（训练图像）。

具体地说，对于输入图像，通过施加旋转、垂直或水平方向上的移动等微小变化，增加图像的数量：

![Data Augmentation 的例子](/images/deep-learning/deep-learning/data-augmentation-example.png)

这在数据集的图像数量有限时尤其有效。

除了上图所示的旋转平移变形之外，Data Augmentation 还可以通过其他各种方法扩充图像，比如裁剪图像的 “crop 处理”、将图像左右翻转的 “flip 处理” 等。对于一般的图像，施加亮度等外观上的变化、放大缩小等尺度上的变化也是有效的。

不管怎样，通过 Data Augmentation 巧妙地增加训练图像，就可以提高深度学习的识别精度。虽然这个看上去只是一个简单的技巧，不过经常会有很好的效果。

:::

### 加深层的动机

关于加深层的重要性，现状是理论研究还不够透彻。尽管目前相关理论还比较贫乏，但是有几点可以从过往的研究和实验中得以解释（虽然有一些直观）。

首先，从以 ILSVRC 为代表的大规模图像识别的比赛结果中可以看出加深层的重要性（详细内容请参考下一节）。这种比赛的结果显示，最近前几名的方法多是基于深度学习的，并且有逐渐加深网络的层的趋势。也就是说，可以看到层越深，识别性能也越高。

加深层的其中一个好处就是可以减少网络的参数数量。

说得详细一点，就是与没有加深层的网络相比，加深了层的网络可以用更少的参数达到同等水平（或者更强）的表现力。这一点结合卷积运算中的滤波器大小来思考就好理解了。

::: details 具体示例

比如，下图展示了由 5×5 的滤波器构成的卷积层：

![5×5 的卷积运算的例子](/images/deep-learning/deep-learning/convolution-example.png)

> 这里希望大家考虑一下输出数据的各个节点是从输入数据的哪个区域计算出来的。

显然，在上图的例子中，每个输出节点都是从输入数据的某个 5×5 的区域算出来的。

接下来我们思考一下图中重复两次 3×3 的卷积运算的情形：

![重复两次 3×3 的卷积层的例子](/images/deep-learning/deep-learning/convolution-example-2.png)

此时，每个输出节点将由中间数据的某个 3×3 的区域计算出来。

那么，中间数据的 3×3 的区域又是由前一个输入数据的哪个区域计算出来的呢？仔细观察图可知它对应一个 5×5 的区域。

也就是说，图中输出数据是 “观察” 了输入数据的某个 5×5 的区域后计算出来的。

因此，一次 5×5 的卷积运算的区域可以由两次 3×3 的卷积运算抵充。

并且，相对于前者的参数数量 25（5×5），后者一共是 18（2×3×3），通过叠加卷积层，参数数量减少了。

而且，这个参数数量之差会随着层的加深而变大。比如，重复三次 3×3 的卷积运算时，参数的数量总共是 27。而为了用一次卷积运算 “观察” 与之相同的区域，需要一个 7×7 的滤波器，此时的参数数量是 49。

所以，叠加小型滤波器来加深网络的好处是可以减少参数的数量，扩大**感受野**（receptive field，给神经元施加变化的某个局部空间区域）。并且通过叠加层，将 ReLU 等激活函数夹在卷积层的中间，进一步提高了网络的表现力。这是因为向网络添加了基于激活函数的 “非线性” 表现力，通过非线性函数的叠加，可以表现更加复杂的东西。

:::

加深层的另一个好处就是使学习更加高效。

与没有加深层的网络相比，通过加深层，可以减少学习数据，从而高效地进行学习。

::: details 直观理解

大家可以回忆一下 CNN。CNN 的卷积层会分层次地提取信息。具体地说，在前面的卷积层中，神经元会对边缘等简单的形状有响应，随着层的加深，开始对纹理、物体部件等更加复杂的东西有响应。

我们先牢记这个网络的分层结构，然后考虑一下 “狗” 的识别问题。

要用浅层网络解决这个问题的话，卷积层需要一下子理解很多 “狗” 的特征。“狗” 有各种各样的种类，根据拍摄环境的不同，外观变化也很大。

因此，要理解 “狗” 的特征，需要大量富有差异性的学习数据，而这会导致学习需要花费很多时间。

不过，通过加深网络，就可以分层次地分解需要学习的问题。因此，各层需要学习的问题就变成了更简单的问题。

比如，最开始的层只要专注于学习边缘就好，这样一来，只需用较少的学习数据就可以高效地进行学习。因为和印有 “狗” 的照片相比，包含边缘的图像数量众多，并且边缘的模式比 “狗” 的模式结构更简单。

:::

通过加深层，可以分层次地传递信息，这一点也很重要。

比如，因为提取了边缘的层的下一层能够使用边缘的信息，所以应该能够高效地学习更加高级的模式。

也就是说，通过加深层，可以将各层要学习的问题分解成容易解决的简单问题，从而可以进行高效的学习。

## 深度学习的小历史

一般认为，现在深度学习之所以受到大量关注，其契机是 2012 年举办的大规模图像识别大赛 ILSVRC（ImageNet Large Scale Visual RecognitionChallenge）。

在那年的比赛中，基于深度学习的方法（通称 AlexNet）以压倒性的优势胜出，彻底颠覆了以往的图像识别方法。

2012 年深度学习的这场逆袭成为一个转折点，在之后的比赛中，深度学习一直活跃在舞台中央。

我们以 ILSVRC 这个大规模图像识别比赛为轴，看一下深度学习最近的发展趋势。

### ImageNet

ImageNet 是拥有超过 100 万张图像的数据集。它包含了各种各样的图像，并且每张图像都被关联了标签（类别名）。每年都会举办使用这个巨大数据集的 ILSVRC 图像识别大赛。\

![大规模数据集 ImageNet 的数据例](/images/deep-learning/deep-learning/imagenet-example.png)

> 大规模数据集 ImageNet 的数据例

ILSVRC 大赛有多个测试项目，其中之一是 “类别分类”（classification），在该项目中，会进行 1000 个类别的分类，比试识别精度。

![ILSCRV 优胜队伍的成绩演变](/images/deep-learning/deep-learning/imagenet-result.png)

> 从 2010 年到 2015 年的优胜队伍的成绩
>
> 前 5 类中出现正确解的情况视为 “正确”，错误识别率用柱形图来表示
>
> 竖轴是错误识别率，横轴是年份。横轴的括号内是队伍名或者方法名

以 2012 年为界，之后基于深度学习的方法一直居于首位。

实际上，我们发现 2012 年的 AlexNet 大幅降低了错误识别率。并且，此后基于深度学习的方法不断在提升识别精度。特别是 2015 年的 ResNet（一个超过 150 层的深度网络）将错误识别率降低到了 3.5%。据说这个结果甚至超过了普通人的识别能力。

这些年深度学习取得了不斐的成绩，其中 VGG、GoogLeNet、ResNet 已广为人知，在与深度学习有关的各种场合都会遇到这些网络。

### VGG

VGG 是由卷积层和池化层构成的基础的 CNN。

![VGG](/images/deep-learning/deep-learning/vgg.png)

它的特点在于将有权重的层（卷积层或者全连接层）叠加至 16 层（或者 19 层），具备了深度（根据层的深度，有时也称为 “VGG16” 或 “VGG19”）

VGG 中需要注意的地方是，基于 3×3 的小型滤波器的卷积层的运算是连续进行的。

图中重复进行 “卷积层重叠 2 次到 4 次，再通过池化层将大小减半” 的处理，最后经由全连接层输出结果。

### GoogLeNet

GoogLeNet 的网络结构如下图所示：

![GoogLeNet](/images/deep-learning/deep-learning/googlenet.png)

> 图中的矩形表示卷积层、池化层等

只看图的话，这似乎是一个看上去非常复杂的网络结构，但实际上它基本上和之前介绍的 CNN 结构相同。

不过，GoogLeNet 的特征是，网络不仅在纵向上有深度，在横向上也有深度（广度）

GoogLeNet 在横向上有“宽度”，这称为 “Inception 结构”，以下图的结构为基础：

![GoogLeNet 的 Inception 结构](/images/deep-learning/deep-learning/googlenet-inception.png)

Inception 结构使用了多个大小不同的滤波器（和池化），最后再合并它们的结果。

GoogLeNet 的特征就是将这个 Inception 结构用作一个构件（构成元素）。

此外，在 GoogLeNet 中，很多地方都使用了大小为 1×1 的滤波器的卷积层。这个 1×1 的卷积运算通过在通道方向上减小大小，有助于减少参数和实现高速化处理。

### ResNet

ResNet 是微软团队开发的网络。它的特征在于具有比以前的网络更深的结构。

我们已经知道加深层对于提升性能很重要。但是，在深度学习中，过度加深层的话，很多情况下学习将不能顺利进行，导致最终性能不佳。

ResNet 中，为了解决这类问题，导入了 “快捷结构”（也称为 “捷径” 或 “小路”）。导入这个快捷结构后，就可以随着层的加深而不断提高性能了（当然，层的加深也是有限度的）。

![ResNet 的构成要素](/images/deep-learning/deep-learning/resnet-structure.png)

> 这里的 “weight layer” 是指卷积层

如图所示，快捷结构横跨（跳过）了输入数据的卷积层，将输入 x 合计到输出。

在连续 2 层的卷积层中，将输入 x 跳着连接至 2 层后的输出。这里的重点是，通过快捷结构，原来的 2 层卷积层的输出 F(x) 变成了 F(x)+x。通过引入这种快捷结构，即使加深层，也能高效地学习。这是因为，通过快捷结构，反向传播时信号可以无衰减地传递。

::: details 为什么快捷结构能使反向传播时信号无衰减地传递

因为快捷结构只是原封不动地传递输入数据，所以反向传播时会将来自上游的梯度原封不动地传向下游。

这里的重点是不对来自上游的梯度进行任何处理，将其原封不动地传向下游。

因此，基于快捷结构，不用担心梯度会变小（或变大），能够向前一层传递 “有意义的梯度”。

通过这个快捷结构，之前因为加深层而导致的梯度变小的梯度消失问题就有望得到缓解。

:::

ResNet 以 VGG 网络为基础，引入快捷结构以加深层：

![ResNet](/images/deep-learning/deep-learning/resnet.png)

> 方块对应 3×3 的卷积层，其特征在于引入了横跨层的快捷结构

ResNet 通过以 2 个卷积层为间隔跳跃式地连接来加深层。

另外，根据实验的结果，即便加深到 150 层以上，识别精度也会持续提高。

::: details 迁移学习

实践中经常会灵活应用使用 ImageNet 这个巨大的数据集学习到的权重数据，这称为**迁移学习**，将学习完的权重（的一部分）复制到其他神经网络，进行再学习（fine tuning）。

比如，准备一个和 VGG 相同结构的网络，把学习完的权重作为初始值，以新数据集为对象，进行再学习。迁移学习在手头数据集较少时非常有效。

:::

## 深度学习的高速化

随着大数据和网络的大规模化，深度学习需要进行大量的运算。

目前为止，我们都是使用 CPU 进行计算的，但现实是只用 CPU 来应对深度学习无法令人放心。

实际上，环视一下周围，大多数深度学习的框架都支持 GPU（Graphics Processing Unit），可以高速地处理大量的运算。

另外，最近的框架也开始支持多个 GPU 或多台机器上的分布式学习。

### 需要努力解决的问题

我们先来看一下深度学习中什么样的处理比较耗时：

![AlexNet 的 forward 处理中各层的时间比](/images/deep-learning/deep-learning/alexnet-forward.png)

> AlexNet 的 forward 处理中各层的时间比
>
> 左边是使用 GPU 的情况，右边是使用 CPU 的情况
>
> 图中的 “conv” 对应卷积层，“pool” 对应池化层，“fc” 对应全连接层，“norm” 对应正规化层

从图中可知，AlexNex 中，大多数时间都被耗费在卷积层上。实际上，卷积层的处理时间加起来占 GPU 整体的 95%，占 CPU 整体的 89%！

因此，如何高速、高效地进行卷积层中的运算是深度学习的一大课题。

::: tip 提示

卷积层中进行的运算可以追溯至乘积累加运算。

因此，深度学习的高速化的主要课题就变成了如何高速、高效地进行大量的乘积累加运算。

:::

### 基于 GPU 的高速化

GPU 原本是作为图像专用的显卡使用的，但最近不仅用于图像处理，也用于通用的数值计算。

由于 GPU 可以高速地进行并行数值计算，因此 **GPU 计算**的目标就是将这种压倒性的计算能力用于各种用途。

所谓 GPU 计算，是指基于 GPU 进行通用的数值计算的操作。

深度学习中需要进行大量的乘积累加运算（或者大型矩阵的乘积运算）。这种大量的并行运算正是 GPU 所擅长的（反过来说，CPU 比较擅长连续的、复杂的计算）。

因此，与使用单个 CPU 相比，使用 GPU 进行深度学习的运算可以达到惊人的高速化。

我们看一下基于 GPU 可以实现多大程度的高速化：

![基于 GPU 的高速化](/images/deep-learning/deep-learning/gpu-computing.png)

> 使用 CPU 的 “16-core Xeon CPU” 和 GPU 的 “Titan 系列” 进行 AlexNet 的学习时分别所需的时间
>
> cuDNN 是在 CUDA 上运行的库，它里面实现了为深度学习最优化过的函数等

从图中可知，使用 CPU 要花 40 天以上的时间，而使用 GPU 则可以将时间缩短至 6 天。

此外，还可以看出，通过使用 cuDNN 这个最优化的库，可以进一步实现高速化。

GPU 主要由 NVIDIA 和 AMD 两家公司提供。虽然两家的 GPU 都可以用于通用的数值计算，但与深度学习比较 “亲近” 的是 NVIDIA 的 GPU。

实际上，大多数深度学习框架只受益于 NVIDIA 的 GPU。这是因为深度学习的框架中使用了 NVIDIA 提供的 CUDA 这个面向 GPU 计算的综合开发环境。

::: details im2col 与 GPU

通过 im2col 可以将卷积层进行的运算转换为大型矩阵的乘积。

这个 im2col 方式的实现对 GPU 来说是非常方便的实现方式。

这是因为，相比按小规模的单位进行计算，GPU 更擅长计算大规模的汇总好的数据。

也就是说，通过基于 im2col 以大型矩阵的乘积的方式汇总计算，更容易发挥出 GPU 的能力。

:::

### 分布式学习

虽然通过 GPU 可以实现深度学习运算的高速化，但即便如此，当网络较深时，学习还是需要几天到几周的时间。

并且，前面也说过，深度学习伴随着很多试错。为了创建良好的网络，需要反复进行各种尝试，这样一来就必然会产生尽可能地缩短一次学习所需的时间的要求。

于是，将深度学习的学习过程扩展开来的想法（也就是分布式学习）就变得重要起来。

为了进一步提高深度学习所需的计算的速度，可以考虑在多个 GPU 或者多台机器上进行分布式计算。

现在的深度学习框架中，出现了好几个支持多 GPU 或者多机器的分布式学习的框架。其中，Google 的 TensorFlow、微软的 CNTK（Computational Network Toolki）在开发过程中高度重视分布式学习。以大型数据中心的低延迟·高吞吐网络作为支撑，基于这些框架的分布式学习呈现出惊人的效果。

下面中显示基于 TensorFlow 的分布式学习的效果：

![基于 TensorFlow 的分布式学习的效果](/images/deep-learning/deep-learning/tensorflow-distributed-learning.png)

> 横轴是 GPU 的个数，纵轴是与单个 GPU 相比时的高速化率

可以看到，随着 GPU 个数的增加，学习速度也在提高。

实际上，与使用 1 个 GPU 时相比，使用 100 个 GPU（设置在多台机器上，共 100 个）似乎可以实现 56 倍的高速化！这意味着之前花费 7 天的学习只要 3 个小时就能完成，充分说明了分布式学习惊人的效果。

关于分布式学习，“如何进行分布式计算” 是一个非常难的课题。它包含了机器间的通信、数据的同步等多个无法轻易解决的问题。可以将这些难题都交给 TensorFlow 等优秀的框架。

### 运算精度的位数缩减

在深度学习的高速化中，除了计算量之外，内存容量、总线带宽等也有可能成为瓶颈。

关于内存容量，需要考虑将大量的权重参数或中间数据放在内存中。

关于总线带宽，当流经 GPU（或者 CPU）总线的数据超过某个限制时，就会成为瓶颈。

考虑到这些情况，我们希望尽可能减少流经网络的数据的位数。

计算机中为了表示实数，主要使用 64 位或者 32 位的浮点数。通过使用较多的位来表示数字，虽然数值计算时的误差造成的影响变小了，但计算的处理成本、内存使用量却相应地增加了，还给总线带宽带来了负荷。

关于数值精度（用几位数据表示数值），我们已经知道深度学习并不那么需要数值精度的位数。这是神经网络的一个重要性质。这个性质是基于神经网络的健壮性而产生的。

::: details 健壮性

健壮性是指，比如，即便输入图像附有一些小的噪声，输出结果也仍然保持不变。

可以认为，正是因为有了这个健壮性，流经网络的数据即便有所 “劣化”，对输出结果的影响也较小。

:::

计算机中表示小数时，有 32 位的单精度浮点数和 64 位的双精度浮点数等格式。

根据以往的实验结果，在深度学习中，即便是 16 位的半精度浮点数（half float），也可以顺利地进行学习。

> 实际上，NVIDIA 的下一代 GPU 框架 Pascal 也支持半精度浮点数的运算，由此可以认为今后半精度浮点数将被作为标准使用

以往的深度学习的实现中并没有注意数值的精度，不过 Python 中一般使用 64 位的浮点数。

NumPy 中提供了 16 位的半精度浮点数类型（不过，只有 16 位类型的存储，运算本身不用 16 位进行），即便使用 NumPy 的半精度浮点数，识别精度也不会下降。

关于深度学习的位数缩减，到目前为止已有若干研究。有人提出了用 1 位来表示权重和中间数据的 Binarized Neural Networks 方法。为了实现深度学习的高速化，位数缩减是今后必须关注的一个课题，特别是在面向嵌入式应用程序中使用深度学习时，位数缩减非常重要。

## 深度学习的应用案例

前面，作为使用深度学习的例子，我们主要讨论了手写数字识别的图像类别分类问题（称为 “物体识别”）。

不过，深度学习并不局限于物体识别，还可以应用于各种各样的问题。在图像、语音、自然语言等各个不同的领域，深度学习都展现了优异的性能。

### 物体检测

物体检测是从图像中确定物体的位置，并进行分类的问题。

比如下图就是要从图像中确定物体的种类和物体的位置：

![物体检测的例子](/images/deep-learning/deep-learning/object-detection.png)

物体检测是比物体识别更难的问题。之前介绍的物体识别是以整个图像为对象的，但是物体检测需要从图像中确定类别的位置，而且还有可能存在多个物体。

对于这样的物体检测问题，人们提出了多个基于 CNN 的方法。这些方法展示了非常优异的性能，并且证明了在物体检测的问题上，深度学习是非常有效的。

在使用 CNN 进行物体检测的方法中，有一个叫作 R-CNN 的有名的方法:

![R-CNN 的处理流](/images/deep-learning/deep-learning/rcnn-processing-flow.png)

> 注意图中的 “2.Extract region proposals”（候选区域的提取）和 “3.Compute CNN features”（CNN 特征的计算）的处理部分

这里，首先（以某种方法）找出形似物体的区域，然后对提取出的区域应用 CNN 进行分类。

R-CNN 中会将图像变形为正方形，或者在分类时使用 SVM（支持向量机），实际的处理流会稍微复杂一些，不过从宏观上看，也是由刚才的两个处理（候选区域的提取和 CNN 特征的计算）构成的。

在 R-CNN 的前半部分的处理——候选区域的提取（发现形似目标物体的处理）中，可以使用计算机视觉领域积累的各种各样的方法。R-CNN 的论文中使用了一种被称为 Selective Search 的方法，最近还提出了一种基于 CNN 来进行候选区域提取的 Faster R-CNN 方法。Faster R-CNN 用一个 CNN 来完成所有处理，使得高速处理成为可能。

### 图像分割

图像分割是指在像素水平上对图像进行分类。使用以像素为单位对各个对象分别着色的监督数据进行学习。然后，在推理时，对输入图像的所有像素进行分类。

其目标是将一张数字图像分割成多个有意义的、互不重叠的区域或片段。更通俗地说，就是为图像中的每一个像素都分配一个标签或类别，从而回答 “这个像素属于哪个物体或哪个部分？” 的问题。

::: details 图像分类、目标检测、图像分割的对比

- 图像分类：回答 “整张图片里是什么？”（例如：这是一张猫的图片）。

- 目标检测：回答 “物体在哪里？是什么？”（例如：用边界框标出图片中猫和狗的位置）。

- 图像分割：回答 “每一个像素属于什么？”（例如：精确地勾勒出猫、狗以及背景的轮廓，达到像素级精度）。

:::

![图像分割的例子](/images/deep-learning/deep-learning/image-segmentation.png)

> 左边是输入图像，右边是监督用的带标签图像

之前实现的神经网络是对图像整体进行了分类，要将它落实到像素水平的话，该怎么做呢？

要基于神经网络进行图像分割，最简单的方法是以所有像素为对象，对每个像素执行推理处理。

比如，准备一个对某个矩形区域中心的像素进行分类的网络，以所有像素为对象执行推理处理。

但这样的方法需要按照像素数量进行相应次 forward 处理，因而需要耗费大量的时间（正确地说，卷积运算中会发生重复计算很多区域的无意义的计算）。

为了解决这个无意义的计算问题，有人提出了一个名为 FCN（Fully Convolutional Network）的方法。该方法通过一次 forward 处理，对所有像素进行分类：

![FCN 的概略图](/images/deep-learning/deep-learning/fcn-overview.png)

> FCN 的概略图

FCN 的字面意思是 “全部由卷积层构成的网络”。相对于一般的 CNN 包含全连接层，FCN 将全连接层替换成发挥相同作用的卷积层。在物体识别中使用的网络的全连接层中，中间数据的空间容量被作为排成一列的节点进行处理，而只由卷积层构成的网络中，空间容量可以保持原样直到最后的输出。

::: details 如何用卷积层发挥全连接层的作用

全连接层中，输出和全部的输入相连。使用卷积层也可以实现与此结构完全相同的连接。

比如，针对输入大小是 32×10×10（通道数 32、高 10、长 10）的数据的全连接层可以替换成滤波器大小为 32×10×10 的卷积层。

如果全连接层的输出节点数是 100，那么在卷积层准备 100 个 32×10×10 的滤波器就可以实现完全相同的处理。

像这样，全连接层可以替换成进行相同处理的卷积层。

:::

FCN 的特征在于最后导入了扩大空间大小的处理。基于这个处理，变小了的中间数据可以一下子扩大到和输入图像一样的大小。

FCN 最后进行的扩大处理是基于双线性插值法的扩大（双线性插值扩大）。FCN 中，这个双线性插值扩大是通过去卷积（逆卷积运算）来实现的。

### 图像标题的生成

有一项融合了计算机视觉和自然语言的有趣的研究，该研究如下图所示，给出一个图像后，会自动生成介绍这个图像的文字（图像的标题）。

![基于深度学习的图像标题生成的例子](/images/deep-learning/deep-learning/image-title-generation.png)

比如，左上角的第一幅图像生成了文本 “A person riding a motorcycle on a dirt road.”（在没有铺装的道路上骑摩托车的人），而且这个文本只从该图像自动生成。文本的内容和图像确实是一致的。并且，令人惊讶的是，除了 “骑摩托车” 之外，连 “没有铺装的道路” 都被正确理解了。

一个基于深度学习生成图像标题的代表性方法是被称为 NIC（NeuralImage Caption）的模型。

![Neural Image Caption（NIC）的整体结构](/images/deep-learning/deep-learning/nic-overview.png)

> Neural Image Caption（NIC）的整体结构

NIC 由深层的 CNN 和处理自然语言的 RNN（Recurrent Neural Network）构成。RNN 是呈递归式连接的网络，经常被用于自然语言、时间序列数据等连续性的数据上。

::: details 关于 RNN

RNN 的 R 表示 Recurrent（递归的）。这个递归指的是神经网络的递归的网络结构。

根据这个递归结构，神经网络会受到之前生成的信息的影响（换句话说，会记忆过去的信息），这是 RNN 的特征。

比如，生成 “我” 这个词之后，下一个要生成的词受到 “我” 这个词的影响，生成了 “要”；然后，再受到前面生成的 “我要” 的影响，生成了 “睡觉” 这个词。

对于自然语言、时间序列数据等连续性的数据，RNN 以记忆过去的信息的方式运行。

:::

NIC 基于 CNN 从图像中提取特征，并将这个特征传给 RNN。RNN 以 CNN 提取出的特征为初始值，递归地生成文本。基本上 NIC 是组合了两个神经网络（CNN 和 RNN）的简单结构。

基于 NIC，可以生成惊人的高精度的图像标题。我们将组合图像和自然语言等多种信息进行的处理称为**多模态处理**。多模态处理是近年来备受关注的一个领域。

## 深度学习的未来

深度学习已经不再局限于以往的领域，开始逐渐应用于各个领域。

### 图像风格变换

有一项研究是使用深度学习来 “绘制” 带有艺术气息的画：输入两个图像后，会生成一个新的图像。两个输入图像中，一个称为 “内容图像”，另一个称为 “风格图像”。

![图像风格变换的例子](/images/deep-learning/deep-learning/image-style-transfer.png)

> 左上角是风格图像，右上角是内容图像，下面的图像是新生成的图像

如图所示，如果指定将梵高的绘画风格应用于内容图像，深度学习就会按照指示绘制出新的画作。

这里我们不会介绍这项研究的详细内容，只是叙述一下这个技术的大致框架，即刚才的方法是在学习过程中使网络的中间数据近似内容图像的中间数据。

这样一来，就可以使输入图像近似内容图像的形状。

此外，为了从风格图像中吸收风格，导入了风格矩阵的概念。通过在学习过程中减小风格矩阵的偏差，就可以使输入图像接近梵高的风格。

### 图像的生成

刚才的图像风格变换的例子在生成新的图像时输入了两个图像。不同于这种研究，现在有一种研究是生成新的图像时不需要任何图像（虽然需要事先使用大量的图像进行学习，但在 “画” 新图像时不需要任何图像）：

![基于 DCGAN 生成的新的卧室图像](/images/deep-learning/deep-learning/image-generation.png)

> 基于 DCGAN（Deep Convolutional Generative Adversarial Network） 生成的新的卧室图像

可能看上去像是真的照片，但其实这些图像都是基于 DCGAN 新生成的图像。也就是说，DCGAN 生成的图像是谁都没有见过的图像（学习数据中没有的图像），是从零生成的新图像。

能画出以假乱真的图像的 DCGAN 会将图像的生成过程模型化。使用大量图像（比如，印有卧室的大量图像）训练这个模型，学习结束后，使用这个模型，就可以生成新的图像。

DCGAN 中使用了深度学习，其技术要点是使用了 Generator（生成者）和 Discriminator（识别者）这两个神经网络。

Generator 生成近似真品的图像，Discriminator 判别它是不是真图像（是 Generator 生成的图像还是实际拍摄的图像）

像这样，通过让两者以竞争的方式学习，Generator 会学习到更加精妙的图像作假技术，Discriminator 则会成长为能以更高精度辨别真假的鉴定师。两者互相切磋、共同成长，这是 **GAN**（Generative Adversarial Network）这个技术的有趣之处。在这样的切磋中成长起来的 Generator 最终会掌握画出足以以假乱真的图像的能力（或者说有这样的可能）。

::: details 监督学习与无监督学习

之前我们见到的机器学习问题都是被称为**监督学习**（supervised learning）的问题。这类问题就像手写数字识别一样，使用的是图像数据和教师标签成对给出的数据集。

不过这里讨论的问题，并没有给出监督数据，只给了大量的图像（图像的集合），这样的问题称为**无监督学习**（unsupervised learning）。

无监督学习虽然是很早之前就开始研究的领域（Deep Belief Network、Deep Boltzmann Machine 等很有名），但最近似乎并不是很活跃。今后，随着使用深度学习的 DCGAN 等方法受到关注，无监督学习有望得到进一步发展。

:::

### 自动驾驶

计算机代替人类驾驶汽车的自动驾驶技术有望得到实现。除了汽车制造商之外，IT 企业、大学、研究机构等也都在为实现自动驾驶而进行着激烈的竞争。

自动驾驶需要结合各种技术的力量来实现，比如决定行驶路线的路线计划（path plan）技术、照相机或激光等传感技术等，在这些技术中，正确识别周围环境的技术据说尤其重要。这是因为要正确识别时刻变化的环境、自由来往的车辆和行人是非常困难的。

如果可以在各种环境中稳健地正确识别行驶区域的话，实现自动驾驶可能也就没那么遥远了。

最近，在识别周围环境的技术中，深度学习的力量备受期待。比如，基于 CNN 的神经网络 SegNet，可以高精度地识别行驶环境：

![基于深度学习的图像分割的例子](/images/deep-learning/deep-learning/image-segmentation-car.png)

观察结果可知，在某种程度上正确地识别了道路、建筑物、人行道、树木、车辆等。今后若能基于深度学习使这种技术进一步实现高精度化、高速化的话，自动驾驶的实用化可能也就没那么遥远了。

### Deep Q-Network（强化学习）

就像人类通过摸索试验来学习一样（比如骑自行车），让计算机也在摸索试验的过程中自主学习，这称为**强化学习**（reinforcement learning）。强化学习和有 “教师” 在身边教的 “监督学习” 有所不同。

强化学习的基本框架是，代理（Agent）根据环境选择行动，然后通过这个行动改变环境。根据环境的变化，代理获得某种报酬。强化学习的目的是决定代理的行动方针，以获得更好的报酬。

![强化学习的基本框架](/images/deep-learning/deep-learning/reinforcement-learning.png)

> 强化学习的基本框架：代理自主地进行学习，以获得更好的报酬

这里需要注意的是，报酬并不是确定的，只是 “预期报酬”。如果是监督学习的话，每个行动都可以从 “教师” 那里获得正确的评价。

::: details 具体示例

比如，在《超级马里奥兄弟》这款电子游戏中，让马里奥向右移动能获得多少报酬不一定是明确的。

这时需要从游戏得分（获得的硬币、消灭的敌人等）或者游戏结束等明确的指标来反向计算，决定 “预期报酬”。

:::

在使用了深度学习的强化学习方法中，有一个叫作 Deep Q-Network（通称**DQN**）的方法。

该方法基于被称为 Q 学习的强化学习算法。在 Q 学习中，为了确定最合适的行动，需要确定一个被称为最优行动价值函数的函数。为了近似这个函数，DQN 使用了深度学习（CNN）。

::: details 具体示例

在 DQN 的研究中，有让电子游戏自动学习，并实现了超过人类水平的操作的例子。

![基于 Deep Q-Network 学习电子游戏的操作](/images/deep-learning/deep-learning/dqn-game.png)

> 输入是电子游戏的图像，经过摸索试验，学习出让专业玩家都自愧不如的游戏手柄（操作杆）的操作手法

如图所示，DQN 中使用的 CNN 把游戏图像的帧（连续 4 帧）作为输入，最终输出游戏手柄的各个动作（控制杆的移动量、按钮操作的有无等）的 “价值”。

之前在学习电子游戏时，一般是把游戏的状态（人物的地点等）事先提取出来，作为数据给模型。

但是，在 DQN 中，输入数据只有电子游戏的图像，可以说大幅提高了 DQN 的实用性。因为这样就无需根据每个游戏改变设置，只要给 DQN 游戏图像就可以了。

:::

## 小结

::: details 小结

- 对于大多数的问题，都可以期待通过加深网络来提高性能

- 在图像识别大赛 ILSVRC 中，基于深度学习的方法独占鳌头，使用的网络也在深化

- VGG、GoogLeNet、ResNet 等是几个著名的网络

- 基于 GPU、分布式学习、位数精度的缩减，可以实现深度学习的高速化

- 深度学习（神经网络）不仅可以用于物体识别，还可以用于物体检测、图像分割

- 深度学习的应用包括图像标题的生成、图像的生成、强化学习等。最近，深度学习在自动驾驶上的应用也备受期待

:::

::: details 专有名词

- **深度学习**：加深了层的深度神经网络

- **感受野**：给神经元施加变化的某个局部空间区域

- **ImageNet**：拥有超过 100 万张图像的数据集

- **VGG**：由卷积层和池化层构成的基础的 CNN，将有权重的层叠加至 16 层（或者 19 层），并连续进行基于 3×3 的小型滤波器的卷积层的运算

- **Inception 结构**：在横向上有 “宽度”，使用了多个大小不同的滤波器（和池化），最后再合并结果

- **GoogleNet**：结构上和 VGG 基本相同，但将 Inception 结构作为构成元素，且使用了大小为 1×1 的滤波器的卷积层

- **快捷结构**：将输入数据跳过卷积层，将输入数据与卷积层的输出合计，作为输出

- **ResNet**：具有比以前的网络更深的结构，并导入了 “快捷结构”

- **GPU 计算**：基于 GPU 进行通用的数值计算的操作

- **健壮性**：神经网络在输入图像附有一些噪声时，输出结果仍然保持不变

- **R-CNN**：使用 CNN 进行物体检测的方法，先找出形似物体的区域，然后对提取出的区域应用 CNN 进行分类

- **FCN**：对图像中所有像素进行分类的方法，将全连接层替换成发挥相同作用的卷积层，并在最后导入了扩大空间大小的处理

- **RNN**：呈递归式连接的网络，被用于自然语言、时间序列数据等连续性的数据上

- **NIC**：基于深度学习生成图像标题的模型，基于 CNN 从图像中提取特征，并将这个特征传给 RNN 递归地生成文本

- **多模态处理**：基于多个信息进行处理的处理，如图像和自然语言的组合

- **强化学习**：代理根据环境选择行动，然后通过行动改变环境，根据环境的变化，代理获得某种报酬

- **DQN**：一种基于深度学习的强化学习方法，基于被称为 Q 学习的强化学习算法，使用深度学习确定最优行动价值函数

:::
