# 循环神经网络

> 循环神经网络（Recurrent Neural Network, RNN）是一类具有内部环状连接的人工神经网络，用于处理序列数据。

::: danger 警告

该页面尚未完工!

:::

::: details 目录

[[toc]]

:::

## 核心思想

::: danger 警告

该部分尚未完工!

:::

循环神经网络（Recurrent Neural Network，RNN）是一种专门用于处理**序列数据**的神经网络。它的核心特点是能够利用 “记忆”（隐藏状态）来捕捉序列中的时间依赖关系，从而对前后关联的数据进行建模。

传统神经网络（如全连接网络、CNN）假设输入是独立同分布的，但现实中的序列数据（如文本、语音、时间序列）的前后元素是相关的。

RNN 通过引入循环连接，使网络能够保留之前步骤的信息，并用它来影响当前步骤的输出。

## 与 CNN 的区别

::: danger 警告

该部分尚未完工!

:::

### 数据类型

::: danger 警告

该部分尚未完工!

:::

RNN 处理的数据常常是**时序数据**/**序列数据**，即数据点之间有明确的先后顺序和依赖关系。例如文本（单词序列）、语音（音频帧序列）、时间序列（股价、传感器读数）、DNA 序列等。

CNN 处理的数据则是**空间数据**/**网格数据**，数据点在空间上排列，局部区域内的关系比遥远区域的关系更紧密。例如图像（像素网格）、频谱图（时频网格）、棋盘（网格状态）等。

### 输入输出

::: danger 警告

该部分尚未完工!

:::

相对于 CNN，RNN 非常灵活，可以实现一对一，一对多，多对一，多对多（同步或异步），且可以处理可变长度的输入和输出序列。

CNN 则相对固定，通常是一对一或多对一，输入尺寸通常需要固定（或通过池化、自适应池调整为固定尺寸）。

::: details 具体示例

我们之前学习的 CNN 模型大多是处理图像，进行 MNIST 手写数字识别，图像的尺寸是固定的（28×28），且输入输出的尺寸也是固定的（10）。

而 RNN 模型则更灵活，可以处理可变长度的输入和输出序列，例如对股票进行预测：

假设 A 只有 7 天的股票价格数据，B 有 10 天的股票价格数据，此时模型可以处理 A 和 B 的股票价格数据，并给出 A 和 B 的预测结果。

:::

## 关键结构

::: danger 警告

该部分尚未完工!

:::

RNN 最大特点是网络中存在着环，使得信息能在网络中进行循环，实现对序列信息的存储和处理。

## LSTM（长短期记忆神经网络）

总结来说，基本、普通循环神经网络很难训练因为梯度可能会爆炸（或者消失）。

好消息是，对基本、普通循环神经网络稍加扩展，我们就可以避免这个问题。

**长短期记忆神经网络**（Long Short-Term Memory，LSTM）是一种避免爆炸/消失梯度问题的循环神经网络。

LSTM 使用 Sigmoid 激活函数和 Tanh 激活函数。

::: details Tanh 激活函数

Tanh 激活函数或双曲正切激活函数将任何 x 轴坐标转换为介于 -1 和 1 之间的 y 轴坐标。

![Tanh 激活函数](/images/deep-learning/recurrent-neural-network/tanh.png)

:::

### 主要思想

LSTM 背后的主要思想是它不使用相同的反馈环连接。

当使用很久以前的事件，和昨天刚发生的事件，来预测明天时，LSTM 使用两条独立的路径来对明天做出预测。一条用于长期记忆，另一条用于短期记忆。

![LSTM](/images/deep-learning/recurrent-neural-network/lstm.png)

即它使用不同的路径处理长期和短期记忆。

坏消息是，与从一个相对简单单元展开的基本、普通循环神经网络相比，LSTM 基于一个更复杂的单元的长短期记忆。

![LSTM 工作原理](/images/deep-learning/recurrent-neural-network/lstm-work.png)

### 遗忘门

首先，这条贯穿单元顶部的绿线被称为细胞状态，代表长期记忆：

![长期记忆](/images/deep-learning/recurrent-neural-network/long-term-memory.png)

尽管长期记忆可以通过乘法，稍后再通过加法被修改，你会注意到这里没有权重和偏置可以直接修改它。

这种没有权重的情况允许长期记忆通过一系列展开的单元流动而不会导致梯度爆炸或消失。

现在，这条被称为隐藏状态的粉色线代表短期记忆：

![短期记忆](/images/deep-learning/recurrent-neural-network/short-term-memory.png)

短期记忆直接连接到可以修改它们的权重。

::: details 具体示例

我们假设之前的长期记忆是 2，之前的短期记忆是 1，并将输入值设为 1：

![长期记忆](/images/deep-learning/recurrent-neural-network/long-term-memory-example.png)

![短期记忆](/images/deep-learning/recurrent-neural-network/short-term-memory-example.png)

让我们进行计算，看看在长短期记忆单元的第一阶段会发生什么：

<img src="/images/deep-learning/recurrent-neural-network/calculation-phase1.png" alt="第一阶段" width="120">

我们从短期记忆 1 开始，乘以它的权重 2.7；然后我们将输入 1 乘以 它的权重 1.63；然后将这两个项相加，并添加偏置 1.62，得到 5.95；再通过 Sigmoid 激活函数，得到 0.997；最后我们将长期记忆 2 乘以 0.997，得到 1.99。

<img src="/images/deep-learning/recurrent-neural-network/calculation-phase1-result.png" alt="第一阶段的计算结果" width="140">

所以这个长短期记忆单元的第一阶段稍微减少了长期记忆。

> 如果 LSTM 的输入是一个相对较小的负数（-10），Sigmoid 激活函数的输出将是 0。这意味着长期记忆将被完全遗忘。

因此，由于 Sigmoid 激活函数将任何输入转换为 0 到 1 之间的数字，输出决定了记住长期记忆的百分比。

:::

总结来说，LSTM 的第一阶段确定了记住长期记忆的百分比。

尽管这部分 LSTM 单元确定了将要记住的长期记忆的百分比，它通常被称为**遗忘门**。

### 输入门

让我们回到输入为 1 的情况，并讨论第二部分的作用。

<img src="/images/deep-learning/recurrent-neural-network/potential-memory-creation.png" alt="潜在记忆的创建" width="300">

> 右侧的模块将短期记忆和输入结合，创建潜在的长期记忆，左侧的模块确定将这个潜在记忆中的那个百分比加入到长期记忆中。

从最右侧的模块开始，我们将短期记忆和输入乘以各自的权重，然后将这些值相加，并添加一个偏置项，得到 2.03，这是 Tanh 激活函数的输入值。计算后得到 0.97。

<img src="/images/deep-learning/recurrent-neural-network/potential-memory-creation-result.png" alt="potential-memory-creation-result" width="300">

> 在这种情况下，当 LSTM 的输入为 1 时，Tanh 激活函数的输出接近 1
>
> 相反，如果 LSTM 的输入是 -10，Tanh 激活函数的输出将是 -1

所以我们有一个潜在的记忆 0.97，基于短期记忆和输入。

现在 LSTM 需要决定要保存多少这个潜在记忆，这是通过我们之前使用的相同方法（确定要记住的长期记忆的百分比）完成的。

<img src="/images/deep-learning/recurrent-neural-network/potential-memory-creation-phase2.png" alt="potential-memory-creation-phase2" width="300">

换句话说，在将短期记忆和输入通过权重相乘后，将这些乘积相加，并添加一个偏置，通过 Sigmoid 激活函数，得到 1.0。这意味这全部潜在的长期记忆被保留（因为乘以 1 不会改变它）。

> 如果原始输入值是 -10，则记住潜在记忆的百分比将是 0，所以我们不会向长期记忆中添加任何东西

我们将计算后的 0.97 添加到现有的长期记忆中，我们得到一个新的长期记忆 2.96

<img src="/images/deep-learning/recurrent-neural-network/add-long-term-memory.png" alt="添加长期记忆" width="300">

尽管这部分 LSTM 单元确定我们应该如何更新长期记忆，它通常被称为**输入门**。

### 输出门

现在我们有了一个新的长期记忆，并准备讨论 LSTM 中的最后一个阶段。这个最终阶段更新短期记忆。

![更新短期记忆](/images/deep-learning/recurrent-neural-network/update-short-term-memory.png)

我们从新的长期记忆开始，使用它作为输入到 Tanh 激活函数，得到 0.99，代表潜在的短期记忆。

现在 LSTM 需要决定传递多少这个潜在的短期记忆，这与我们之前两次使用的相同方法完成的。在这种情况下，我们得到 0.99。

我们通过将 0.99 乘以 0.99 得到 0.98。

![更新短期记忆](/images/deep-learning/recurrent-neural-network/update-short-term-memory-phase2.png)

因为这个新的短期记忆 0.98 也是整个 LSTM 单元的输出，这个阶段被称为**输出门**。

### 股价预测

现在我们了解了单个 LSTM 单元中所有三个阶段的工作方式，让我们用真实数据看看它们的实际表现。

::: details 具体示例

这里我们有两家公司的股价：

![股价示例](/images/deep-learning/recurrent-neural-network/stock-example.png)

> y 轴上是股价，x 轴上是记录价值的日期
>
> 如果我们叠加两家公司的数据，我们看到唯一的差异出现在第 1 天和第 5 天

考虑到这些序列数据，我们希望 LSTM 记住第 1 天发生的事情，这样它就能正确预测第 5 天将发生的事情。

换句话说，我们将从第 1 天到第 4 天的数据依次通过展开的 LSTM 运行，看看它是否能正确预测两家公司第 5 天的值。

所以让我们回到 LSTM，并将长期记忆和短期记忆初始化为 0：

<img src="/images/deep-learning/recurrent-neural-network/lstm-example-day1.png" alt="第 1 天的输入" width="140" />

如果我们想通过这个 LSTM 依次运行公司 A 从第 1 天到第 4 天的值，那么我们将从第 1 天的值 0 开始输入，像之前一样进行计算。更新后的长期记忆是 -0.20，更新后的短期记忆是 -0.13，因此我们输入 -0.2 作为更新后的长期记忆和 -0.1 作为更新后的短期记忆：

<img src="/images/deep-learning/recurrent-neural-network/lstm-example-day1-result.png" alt="第 1 天的输出" width="160" />

现在我们使用更新后的记忆展开 LSTM，并将第 2 天的值 0.5 输入，然后 LSTM 进行计算，使用之前相同的权重的偏置，我们又得到了更新后的长期和短期记忆。

重复进行计算直到第 4 天的数据计算完毕：

![第 4 天的输出](/images/deep-learning/recurrent-neural-network/lstm-example-day4-result.png)

在最终的短期记忆中，0.0 是从展开的 LSTM 中得到的输出，这意味着 LSTM 正确预测了公司 A 第 5 天的值。

同理，相同的 LSTM，使用相同的权重和偏置，也能正确预测公司 B 第 5 天的值：

![公司 B 的预测结果](/images/deep-learning/recurrent-neural-network/lstm-example-company-b.png)

:::

总结来说，使用独立的长期和短期记忆路径，LSTM 避免了梯度爆炸/消失的问题。比起普通循环神经网络，这意味着我们可以更多次展开它们，以适应更长的输入数据序列。

## 小结

::: danger 警告

该部分尚未完工!

:::

::: details 专有名词

- **序列数据**：数据点之间有明确的先后顺序和依赖关系

- **空间数据**：数据点在空间上排列，局部区域内的关系比遥远区域的关系更紧密

- **LSTM**：

- **遗忘门**：

- **输入门**：

- **输出门**：

:::
