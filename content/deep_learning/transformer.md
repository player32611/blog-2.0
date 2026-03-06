# Transformer

> Transformer 是一种专门设计用来处理序列数据（例如句子、语音、时间序列）的模型，是大型语言模型的基础

::: danger 警告

该页面尚未完工!

:::

::: details 目录

[[toc]]

:::

## 词嵌入

### 处理文字

文字是相当好的，我们可以用它们来传达各种酷炫的想法。

不幸的是，许多机器学习算法，包括神经网络，并不擅长处理文字。

所以，如果我们想把文字输入神经网络或其他一些机器学习算法，我们需要一种方法将文字转换成数字。

一种非常简单的将文字转换成数字的方法就是为每个词分配一个随机数字。

::: details 具体示例

如果有人刚看完热门电影《Troll 2》并说："Troll 2 is great"，我们可以为每每个词分配一个随机数字：

- Troll 2 --> 12

- is --> -3.05

- great --> 4.2

如果下一个人说："Trolls 2 is awesome"，那么我们可以重新使用我们已经为 "Trolls 2" 和 "is" 选择的随机数字，并为新词 "awesome" 分配一个新的随机数字：

- Troll 2 --> 12 <-- Troll 2

- is --> -3.05 <-- is

- great --> 4.2

- awesome --> -32.1

:::

理论上这是可行的。

但这意味着尽管 "great" 和 "awesome" 意思相似并且用法相似，它们关联的数字却大不相同。

这意味着神经网络在训练中可能需要更多的复杂性。（因为学会正确处理词 "great" 不会帮助神经网络正确使用词 "awesome"）

所以如果用法相似的相似词能够被赋予相似的数字就好了，这样学会使用一个词就能同时帮助学会使用另一个词。而且因为同一个词可以在不同的语境中使用，或变成复数、或以其他方式使用，为每个词分配多个数字可能会很好。这样神经网络可以更容易地适应不同的语境。

::: details 具体示例

例如，词 "great" 可以用在积极的方式："StatQuest is great!"

它也可以以讽刺负面的方式使用："My cellphone's broken, great."

所以，如果我们有一个数字，能够记录 "great" 使用的积极方式和另一个数字来记录负面方式，那将很棒。

:::

好消息是，我们可以让一个超级简单的神经网络为我们完成所有工作。使用神经网络的优势是它可以使用训练数据集中词汇的上下文，来优化可用于嵌入的权重。

**词嵌入**（Word Embedding）是自然语言处理（NLP）中的一项核心技术。它是一种将文字符号（单词、词组、字符）转换为计算机能够处理的数值形式（即向量） 的方法。更重要的是，这种转换不是随机的，而是让转换后的数值向量能够捕捉到词语的语义和上下文信息。

### 数字与词的关联

假设我们有两个短语："Trolls 2 is great" 和 "Gymkata 2 is great"。

为了创建一个神经网络来弄清楚我们应该将哪些数字与每个词关联，我们首先为每个独特的词创建输入：

<img src="/images/deep-learning/transformer/words-input.png" alt="词的输入" width="60" />

> 在这个例子中我们的训练数据中有四个独特的词，因此我们有四个输入

现在我们将每个输入链接到至少一个激活函数：

<img src="/images/deep-learning/transformer/words-activation.png" alt="词的激活" width="160" />

> 这个激活函数使用恒等函数

激活函数的数量对应我们想要与每个词关联的数字数量，并且这些连接上的权重最终会是我们与每个词关联的数字。

如果我们想要与每个词关联两个数字，这意味着我们将使用两个激活函数，并且连接到第二个激活函数的权重将是与每个词关联的另一个数字：

<img src="/images/deep-learning/transformer/words-activation-two.png" alt="两个激活函数" width="170" />

像往常一样，这些权重一开始都是随机值，这些权重将通过反向传播进行优化。

现在，为了进行反向传播，我们必须做出预测。所以我们将使用输入词来预测短语中的下一个词。

如果短语是 "Troll 2 is great"，那么我们可以使用词 "Troll 2" 来预测词 "is"。

换句话说，如果输入词是 "Troll 2"，我们通过在 "Troll 2" 的输入中放置 1 来指示这一点，并在所有其他输入中放置 0。那么我们希望下一个词 "is" 的输出具有最大值：

<div style="display: flex;align-items: center;">

<img src="/images/deep-learning/transformer/words-prediction-1000.png" alt="输入 Troll 2" width="60" />

——> 经过计算 ——>

<img src="/images/deep-learning/transformer/words-result-0100.png" alt="输出 is" width="60" />

</div>

同理，如果输入词是 "is"，这意味着 "is" 的输入是 1，所有其他输入都是 0，那么我们希望下一个词 "great" 的输出具有最大值。

<div style="display: flex;align-items: center;">

<img src="/images/deep-learning/transformer/words-prediction-0100.png" alt="输入 is" width="60" />

——> 经过计算 ——>

<img src="/images/deep-learning/transformer/words-result-0010.png" alt="输出 great" width="60" />

</div>

为了做出这些预测，我们将激活函数连接到输出，并在这些连接上添加随机初始化值的权重。

然后我们通过 Softmax 函数运行输出，因为我们有多个分类输出。

![预测结果](/images/deep-learning/transformer/words-softmax.png)

这意味着我们可以使用交叉熵损失函数进行反向传播。

再次强调，目标是训练这个神经网络，以便它能正确预测短语中的下一个词。

### 可视化

假设在训练之前，该神经网络能正确处理 "Troll 2" 的输入计算并正确预测下一个词 "is"：

![正确预测](/images/deep-learning/transformer/words-prediction-true.png)

但还无法正确处理 "is" 的输入计算并预测：

![错误预测](/images/deep-learning/transformer/words-prediction-false.png)

所以我们需要训练这个神经网络。

在我们优化所有权重之前，我们可以在图表上绘制每个词

![词的图表](/images/deep-learning/transformer/words-graph.png)

> 图表的 x 轴是连接到顶部激活函数的权重值，y 轴是连接到底部激活函数的权重值

我们现在看到，词 "Troll 2" 和 "Gymkata" 现在并不接近相比训练数据中的其他词汇。

然而，由于这两个词在训练数据中出现在相同的上下文中，我们希望反向传播会使它们的权重变得更加相似。

![词的图表 2](/images/deep-learning/transformer/words-graph-2.png)

当我们使用新的权重绘制词汇时，我们看到 "Troll 2" 和 "Gymkata" 现在相对于其他词汇更接近。

此时再进行 "Troll 2" 和 "Gymkata" 的预测，我们会会得到我们想要的结果。

总结一下：

- 首先，我们不是随机分配数字给词汇，而是训练一个相对简单的神经网络来为我们分配数字。这可以使相似的词汇最终具有相似的嵌入。

- 最后，具有相似嵌入的相似词汇意味着训练一个处理语言的神经网络更容易，因为学习一个词的使用有助于学习如何使用相似的词。

截至目前，我们展示了我们可以训练一个神经网络来预测每个短语中的下一个词。但是仅仅预测下一个词并没有给我们提供足够的上下文来理解每个词。

所以现在让我们学习新的策略使得用于包含更多的上下文。

### Word2Vec

Word2Vec 是一种流行的创建词嵌入的方法，可以用于包含更多的上下文。

Word2Vec 包含两种方法： **连续词袋**（Context Bag of Words）和 **跳跃模型**（SkipGram）。

连续词袋方法通过使用周围的词来预测中间发生的词来增加语境。

::: details 具体示例

例如，连续词袋方法可能使用词 "Troll 2" 和 "great" 来预测它们之间的词，即 "is"。

:::

跳跃模型方法通过使用中间的词来预测周围的词来增加语境。

::: details 具体示例

例如，跳跃模型方法可以使用词 "is" 来预测周围的词 "Troll 2"、"great" 和 "Gymkata"。

:::

最后，在结束之前，请知道在实践中，人们通常不是仅使用两个激活函数来为每个词语创建两个词嵌入。人们通常使用 100 个或更多的激活函数来为每个词创建大量的嵌入。而且不是使用两个句子进行训练，它们使用整个维基百科。

因此，Word2Vec 不是只有四个单词和短语的词汇量，而是可能拥有大约 300 万词的词汇表。

![Word2Vec](/images/deep-learning/transformer/word2vec.png)

因此，我们需要优化的这个神经网络中的权重总数是 300 万词汇，至少乘以 100（每个词到激活函数的权重的数量），再乘以 2（从激活函数到输出的权重也是 300 万乘以 100），总共 6 亿个权重。因此训练可能会很慢。

然而，Word2Vec 加速的一种方式是采用**负采样**，随机选择一部分我们不想预测哪些用于优化的单词。

::: details 具体示例

例如，假设我们想要预测单词 "aardvark" 来预测单词 "A"。

这意味着只有单词 "aardvark" 中有一个 1，而所有其他单词都是 0。

<img src="/images/deep-learning/transformer/words-prediction-aardvark.png" alt="预测单词 aardvark" width="60" />

这意味着我们可以忽略来自除了 "aardvark" 之外所有其他单词的权重，因为其他单词将他们的权重乘以 0。

![忽略权重](/images/deep-learning/transformer/words-ignore-weights.png)

这单独就从这个优化步骤中移除了接近 3 亿个权重。

然而，激活函数之后我们仍然有 3 亿个权重。

因为我们想预测单词 "A"，不想预测 "aardvark"、"abandon" 和所有其他单词。所以在这个例子中，让我们想象 Word2Vec 随机选择 "abandon" 作为我们不想预测的单词。

> 实际上，Word2Vec 会选择我们不想预测的 2 至 20 个单词，这个例子中我们只选择了 1 个 "abandon"

所以现在，Word2Vec 只使用 "A" 和 "abandon" 的输出值。这意味着在这轮反向传播中，我们可以忽略导致所有其他可能输出的权重：

![忽略权重 2](/images/deep-learning/transformer/words-ignore-weights-2.png)

所以最终，在这个神经网络中总共有 6 亿个权重，我们每步只优化 300 个。这是 Word2Vec 有效创建大词汇量中每个单词的大量词嵌入的一种方式。

:::

## 编码&解码神经网络

现在你面前有一种序列（语言句子，DNA 序列等），需要翻译成另一种的序列。

这两个问题和许多其他类似问题称为**序列到序列问题**（sequence-to-sequence, seq2seq）。

解决 seq2seq 的一种方法是**编码器-解码器模型**。

### 编码器

我们的目标是创造一个可以将英语句子翻译成西班牙语的编码器-解码器模型。

但是首先，这很明显，在英语中不是所有的句子长度都相同（"Let's go" 与 "My name is StatSquatch"），所以我们需要可以做到让不同长度的句子作为输入。

同样，并非所有西班牙语句子的长度都相同，所以我们需要可以做到生成不同长度的句子作为输出。

最后，英语句子的西班牙语翻译比原先句子可以有不同的长度。

::: details 具体示例

比如两个单词的英语句子 "Let's go!" 翻译成一个西班牙语单词的句子 "Vamos."

:::

所以我们需要 seq2seq 编码器-解码器模型能够处理可变的输入和可变输出长度。

好消息是我们已经知道如何使用 LSTM （长短期记忆单元）来处理具有可变长度的输入和输出。

::: details 具体示例

例如，如果输入的句子是 "Let's go!"，然后我们把 "Let's" 放入 LSTM 的输入中，然后展开 LSTM，然后将 "go" 插入第二个输入

![处理 "Let's go!"](/images/deep-learning/transformer/lstm-letsgo.png)

:::

但我们不能直接把单词塞进神经网络，反而，我们使用词嵌入将单词转换为数字。因为词汇中包含了单词和符号，我们将词汇表中的各个元素作为 **tokens**。

::: details 具体示例

> 为了使示例相对简单，我们的编码器解码器的英语词汇只有三个字 "Let's"、"to"、"go"，实际应有大量的词汇
>
> < EOS > 代表句子结束
>
> 在此示例中，我们只是在创造每个 token 两个嵌入值，而不是数百或数千

![微型词嵌入](/images/deep-learning/transformer/word-embedding-small.png)

:::

现在我们有了输入的嵌入层词汇表，我们可以把它放在 LSTM 的输入前面

![连接词嵌入与 LSTM](/images/deep-learning/transformer/word-embedding-to%20lstm.png)

现在当我们输入句子 "Let's go!"，我们在 "Let's" 输入中输入 1 且其他都为 0；然后我们展开 LSTM 和嵌入层，并在 "go" 的输入中输入 1 且其他都为 0

::: details 注意

当我们展开 LSTM 和嵌入层时，我们重复使用完全相同的权重的偏置，无论我们展开多少次。

换句话说，LSTM 单元和嵌入层中用于表示 "Let's" 这个词的权重和偏置和我们对 "go" 这个词使用的权重和偏置完全一样。

:::

现在，理论上，这就是我们对输入句子进行编码所需要做的全部工作。

然而，在实践中，为了有更多的权重的偏置使模型适合我们的数据，人们经常在输入中添加额外的 LSTM 单元。

![两层 LSTM](/images/deep-learning/transformer/two-lstm.png)

> 为了保持简单，我们只需在此阶段添加一个额外的 LSTM 单元
>
> 这意味着两个单词的嵌入值用作两个不同 LSTM 单元的输入值，这两个 LSTM 单元有自己单独的权重和偏置集

现在，添加更多的权重和偏置使模型适合我们的数据，人们经常添加额外的 LSTM 层。

为了说明这是如何工作的，我们将在编码其中再添加一层 LSTM 层，这意味着第二层中展开的 LSTM 单元以第一层中展开的 LSTM 单元的输出值、短期记忆或隐藏层作为输入。

![更多 LSTM](/images/deep-learning/transformer/more-lstm.png)

::: details 注意

就像两个嵌入值如何被用作第一层中两个 LSTM 单元的输入一样，来自第一层的每个单元格的两个输出（短期记忆或隐藏状态）都作为第二层的 LSTM 单元的输入

实际应用中不止两层 LSTM，每层也不止 2 个 LSTM 单元

:::

最后，唯一要做的就是初始化长期和短期记忆，cell 和隐藏状态。

现在我们完成了创建编码器-解码器模型的**编码器**部分。

![编码器](/images/deep-learning/transformer/encoder.png)

总结一下，在此示例中，我们有两层 LSTM，每层分别有两个 LSTM 单元。

本质上，编码器对输入的句子进行编码，变成长期记忆和短期记忆的集合，也称为细胞状态和隐藏状态。

最后的长期和短期记忆（细胞状态和隐藏状态）来自编码器中 LSTM 单元的两层，被称为**上下文向量**。因此，编码器对输入句子进行编码，"Let's go" 变成上下文向量。

### 解码器

现在我们需要解码上下文向量。

所以我们要做的第一件事是从上下文向量中连接出长期记忆和短期记忆（隐藏状态的细胞），使其传输到一组新的 LSTM。

![新的 LSTM](/images/deep-learning/transformer/new-lstm-layer.png)

就像编码器一样，有两层，每层有两个单元。

::: warning 注意

要明确解码器中的 LSTM 是与编码器中的不同，并有自己独立的权重和偏置

:::

无论如何，上下文向量用于初始化解码器 LSTM 中的长期和短期记忆（隐藏状态单元）。解码器的最终目标是解码上下文向量作为输出句子。

![解码器第 1 层的输入](/images/deep-learning/transformer/decoder-input-1.png)

就像在编码器中一样，第一层 LSTM 单元的输入来自嵌入层，但现在的嵌入层创建了西班牙语单词的嵌入值。

::: details 编码器与解码器的嵌入层

![两个嵌入层](/images/deep-learning/transformer/two-embedding-layer.png)

> 左边是我们在编码器中使用的嵌入层
>
> 右边是我们在解码器中使用的嵌入层

它们有不同的输入单词和样本或标记，以及不同的权重，从而导致每个标记不同的嵌入值。

:::

因为我们刚刚完成对英语句子 "Let's go" 的编码，解码器从 EOS（句末）的嵌入值开始，在这种情况下，我们使用 EOS token 开始解码（有的会使用 SOS 作为句子开头）。

反正，解码器使用两层 LSTM 进行数学计算。

### 全连接

解码器 LSTM 单元顶层的输出值通过格外的权重和偏置 transform 到全连接层中。

![解码器到全连接层](/images/deep-learning/transformer/decoder-to-fullconnected.png)

这个全连接层具有来自顶层 LSTM 单元的两个值的两个输入，且输出对应西班牙词汇表中的每个词汇。

在这两者之间，我们在每个输入和输出之间都有权重的偏置的联系，然后我们通过 softmax 函数运行全连接层的输出来提取输出词：

![全连接层](/images/deep-learning/transformer/fullconnected.png)

现在回到完整的编码器-解码器模型，我们就可以看到 softmax 函数的输出是 "vamos"，西班牙语 "Let's go" 的翻译。

### 继续解码

目前为止，翻译是正确的。但直到输出 EOS token 解码器才会停止。

所以我们把 "vamos" 插入解码器展开的嵌入层，并扩展 LSTM 单元，然后将输出值运行到相同的全连接层：

![解码器最终输出](/images/deep-learning/transformer/decoder-output.png)

下一个预测 token 是 EOS，这意味着我们翻译了英文句子 "Let's go" 到正确的西班牙语句子 "Vamos"。

总结一下解码器阶段，由编码器展开的两层 LSTM 单元创建的上下文向量用于初始化解码器中的 LSTM，LSTM 的输入来自以 EOS 开始的输出词嵌入层，EOS 的输出又决定下一层的输入。解码器将继续预测单词直到它预测出 EOS token 或者达到某个最大输出长度。

::: warning 注意

通过将编码器与解码器解耦输入文本和翻译后的输出文本可以有不同的长度

且实际应用中的全连接层的输入输出都要更多

:::

### 训练

就像所有神经网络一样，所有这些权重和偏置都是使用反向传播进行训练的。

在预测时，解码器每一层的输入来源于上一层的输出。

但在训练编码器-解码器时，我们不使用预测的 token 作为解码器 LSTM 的输入，而是使用已知的、正确的标记。

换句话说，如果第一个预测的标记时西班牙语单词 "y"，在英语中翻译为 "and"，是错误的词，那么在训练期间我们仍然会使用 "vamos" 将正确的西班牙语单词作为无规则 LSTM 的输入。

![解码器的训练](/images/deep-learning/transformer/decoder-trainning-example.png)

另外，在训练过程中，不仅仅是预测标记直到解码器预测出 EOS token，每个输出短语在已知短语结束的地方结束。

换句话说，即使第 2 个预测标记是西班牙语单词 "ir" 而不是正确的标记 EOS，在训练期间，我们仍然会停止预测额外的 token。停在已知的短语长度，而不是将预测的 token 用于所有事情。

## 注意力机制

我们使用基本的编码器-解码器模型将 "Let's go" 翻译成西班牙语，效果很棒。

但如果进行大量的翻译工作（例如，整本书的翻译，长句的翻译），我们会发现我们的基本的编码器-解码器模型做的不太好。

问题在于，在基本的编码器-解码器中，会将整个输入句子压缩成单个上下文向量。这对于短语（例如 "Let's go"）来说还可以，但如果我们有数千个词的大输入词汇量，那么我们就可以输入更长更复杂的句子。对于较长的句子，即使使用 LSTM，一开始输入的单词也可能被遗忘。

::: details 具体示例

例如：我们要翻译 "Don't eat the delicious looking and smelling pizza."。

在这种情况下，如果我们忘记了第一个词 "Don't"，就变成了 "Eat the delicious looking and smelling pizza."，这两个句子的意思完全相反。

所以有时记住第一个词是非常重要的。

:::

基本的循环神经网络（RNN）在处理长期记忆时会有问题，因为它们会通过单一路径来运行长期和短期记忆。而长短期记忆网络（LSTM）的主要思想是通过提供分离的路径用于长期和短期记忆来解决这个问题，但即使有了分离的路径，如果我们有大量数据，两条路径都会携带大量信息，这意味着长句子开头的单词（比如 "Don't）也可能会丢失。

所以**注意力机制**的主要思想是从编码器到解码器添加一堆新路径，每个输入值一条路径。

![注意力机制](/images/deep-learning/transformer/attention.png)

这样解码器的每一步就可以直接访问输入值。

### 输入与解码器

不幸的是，就像为 LSTM 添加额外的长期记忆路径一样，为编码器-解码器模型添加额外的注意力路径也不是那么简单。

我们先用 1 代表句子结束符 EOS 输入到嵌入层：

<img src="/images/deep-learning/transformer/decoder-input-eos.png" alt="EOS 输入到嵌入层" width="200" />

> 因为我们刚刚完成了对 "Let's go" 的编码
>
> 并且一些早期的编码器-解码器加注意力论文就是这样做的

现在我们讨论如何为模型添加注意力。

::: warning 注意

虽然有一些常用的做法，但是没有一个确定的做法注意力应该如何添加到编码器-解码器模型中

所以接下来只是一个例子，说明如何将注意力添加到编码器-解码器模型

注意力的主要思想是为每个输入值添加一条额外的路径，以便解码器的每一步都可以直接访问那些值。这一点对于所有带注意力的编码器-解码器模型都是一致的

:::

### 相似度分数

在这个例子中，注意力首先要做的事确定**编码器 LSTM 在每一步的输出**与**解码器 LSTM 在这一步的输出**这两者之间有多么相似。

换句话说，我们想要一个相似性分数，在编码器第一步的 LSTM 输出（即短期记忆或隐藏状态）与解码器第一步的 LSTM 输出之间；还有编码器第二步的 LSTM 输出与解码器第一步的 LSTM 输出之间。

![相似性分数](/images/deep-learning/transformer/similar-score.png)

比较单词，或更准确地说是表示单词的数值序列（表示文字的序列）的相似性有很多种方法，以及不同的注意力算法。使用不同的方法都可以来比较这些序列。

然而，有一种简单的方法来决定单词的数值序列之间的相似性，那就是使用**余弦相似度**。

::: details 余弦相似度

余弦相似度是通过下面这个等式计算的：

$$Cosine Siilarity = \frac{{\sum_{i=1}^{n}}{A_i}{B_i}}{\sqrt{{\sum_{i=1}^{n}}A_i^2}\sqrt{{\sum_{i=1}^{n}}B_i^2}}$$

其中分子部分计算两个数值序列之间的相似性，而分母部分将这个值缩放到 -1 到 1 之间。

:::

为了解释余弦相似度在这种情况下是如何计算的，我们先计算编码器中以下两者的相似度：第一对 LSTM 单元（对应单词 "Let's" 的输出值）与解码器中第一对 LSTM 单元（对应 EOS 标记的输出值）。

![第一对比较计算](/images/deep-learning/transformer/attention-first-pair.png)

计算得编码器的两个 LSTM 单元对应 "Let's" 的输出值是 -0.76 和 0.75，解码器的两个 LSTM 单元对应 "EOS" 的输出值是 0.91 和 0.38

| cell #1 | cell #2 |
| :-----: | :-----: |
|  -0.76  |  0.75   |
|  0.91   |  0.38   |

现在我们将这些数值代入余弦相似度公式：

$$Cosine Siilarity = \frac{{\sum_{i=1}^{n}}{A_i}{B_i}}{\sqrt{{\sum_{i=1}^{n}}A_i^2}\sqrt{{\sum_{i=1}^{n}}B_i^2}} = \frac{(-0.76×0.91)+(0.75×0.38)}{\sqrt{-0.76^2+0.75^2}\sqrt{0.91^2+0.38^2}}$$

计算结果为 -0.39。

因此，编码器中两个 LSTM 单元（对应单词 "Let's" 的输出值）与解码器器中两个 LSTM 单元（对应 EOS 标记的输出值）之间的余弦相似度为 -0.39。

![第一对单元的余弦相似度](/images/deep-learning/transformer/attention-first-pair-result.png)

不过，在注意力机制中计算相似性更常见的做法是只计算余弦相似度的分子部分，这是因为分母只是将相似度分数缩放到 -1 到 1 之间而已。如果我们想比较两个（或更多） LSTM 单元的相似度分数，这种缩放是很有用的。换句话说，分母去除了相似度的量级影响。

但在我们这种情况下，我们总是使用相同数量的 LSTM 单元。在实践中，只是用分子部分的结果就已经很好了。所以我们可以节省一些额外的计算量，只计算分子部分。这也被称为**点积计算**。

不管怎样，点积计算在注意力机制中比使用余弦相似度更常见。因为它计算起来非常简单，而且大致来说，大的正值意味着两者更相似，小的正值则相似度较低。大的负值意味着两者更加完全背道而驰，小的负值则相反意义较弱。

使用点积计算后，结果是 -0.41。

同样，我们可以计算第二个输入单词 "go" 与 EOS 标记之间的相似度分数的点积，结果为 0.01。

![所有单元的余弦相似度](/images/deep-learning/transformer/attention-all-pair-result.png)

现在我们得到了输入单词 "Let's" 和 "go" 相对于解码器中的 EOS 标记的相似度分数。

### 影响输出单词

可以看到 "go" 与 EOS 标记的相似度分数为 0.01，高于 "Let's" 与 EOS 标记的 -0.41。

由于 "go" 的分数更高，我们希望 "go" 的编码对解码器输出的第一个单词有更大影响，。

为此，我们首先要将这些分数通过 softmax 函数运算：

![相似度分数通过 softmax 计算](/images/deep-learning/transformer/attention-after-softmax.png)

所以我们可以将 softmax 函数的输出看作是决定在解码时我们应该使用每个编码后输入单词的百分比。

在这种情况下，我们将使用 40% 的第一个编码单词 "Let's" 和 60% 的第二个编码单词 "go" 来确定第一个翻译出的单词。

所以我们将第一个编码单词 "Let's" 的值乘以 0.4，将第二个编码单词 "go" 的值乘以 0.6，最后将这些缩放后的值相加。这个总和结合了输入单词 "Let's" 和 "go" 的单独编码与它们相对于 EOS 的相似度。这些总和就是 EOS 的注意力值。

![注意力值总和](/images/deep-learning/transformer/attention-after-softmax-sum.png)

现在，要确定第一个输出单词，我们只需要将这些注意力值输入到全连接层中，并将 EOS 的编码输入到同一个全连接层中进行计算。然后将输出值通过 softmax 函数运算来选择第一个输出单词 "vamos"。

![结果](/images/deep-learning/transformer/attention-result.png)

现在由于输出不是 EOS 标记，我们需要继续展开解码器中的嵌入层和 LSTM，并将翻译出的单词 "vamos" 输入到解码器展开后的嵌入层中，重复上述计算过程。直到输出 EOS 标记为止。

总之，当我们将注意力机制添加到基本的编码器-解码器模型时，编码器的工作基本保持不变。但现在解码的每一步都可以访问每个输入单词的单独编码。我们利用相似度分数和 softmax 函数来确定每个编码后的输入单词应该以多大百分比来预测下一个输出单词。

事实证明，我们确实不再需要 LSTM 了。

## Transformer

Transformer 使用词嵌入将单词转换为数字，位置编码来跟踪单词顺序，自注意力跟踪输入和输出短语中的单词关系，编码器解码器注意力跟踪输入和输出短语之间的关系以确保输入中的重要单词在翻译中不会丢失，以及残差连接使每个子单元（比如自注意力）专注于解决问题的一部分。

### 词嵌入

现在，因为 Transformer 是一种神经网络，而神经网络通常只接受数字作为输入值，所以我们首先需要做的是使用词嵌入来将输入单词编码为数字。

![词嵌入](/images/deep-learning/transformer/transformer-embedding.png)

### 位置编码

位置编码是一种为 Transformer 模型提供词语在序列中 "顺序" 和 "位置" 信息的技术。 它是解决 Transformer 核心缺陷——"自身不具备理解顺序能力"——的关键。

::: details Transformer 的 "先天缺陷"

Transformer 的核心是自注意力机制。它的工作方式是：当处理一个句子时，它会同时关注句子中的所有词，然后根据重要性加权求和。

但这种 "同时处理" 的方式，意味着模型天然地丢失了词的顺序信息。

例如，对于模型来说，句子 "我爱中国" 和 "中国爱我" 的输入（在没有位置信息时）是一模一样的，因为都是由 "我"、"爱"、"中国" 这三个词组成的集合。

但显然，这两个句子的含义天差地别。顺序是语言理解的基础。

:::

我们必须显式地告诉模型每个词在序列中的位置，否则它就无法理解语言的逻辑结构。位置编码就是完成这个任务的 "位置说明书"。

也就是说，首先我们用词嵌入的方法先将句子转换为数字，再为每个单词的嵌入值添加一组对应词序的数字：

![位置编码](/images/deep-learning/transformer/transformer-position-encoding.png)

代表词序的数字，来自一系列交替的正弦和余弦曲线，每条曲线为每个词的嵌入提供特定的位置值。

::: details 如何提供位置值

![正余弦曲线](/images/deep-learning/transformer/transformer-position-encoding-sin-cos.png)

具体来说，第一个词的位置值位于 x 轴的 1st 坐标上，第一个嵌入的位置值绿色曲线上的 y 轴坐标 0，第二个嵌入的位置值来自橙色曲线对应的 y 轴坐标 1。同理依次类推。

第二个词的位置值位于 x 轴的 2nd 坐标上。等等。

由于正弦和余弦曲线是重复的，有可能两个词会得到相同的位置或 y 轴值。

但由于曲线在更大的嵌入位置上变得更宽，每个输入词最终都有一个独特的位置值序列。

:::

现在我们所要做的就是将位置值添加到嵌入值中：

![位置编码结果](/images/deep-learning/transformer/transformer-position-encoding-result.png)

我们最终得到了词嵌入加上整个句子 "Squatch eats pizza" 的位置编码。

同理，我们可以计算句子 "Let's go" 的位置编码：

![位置编码结果](/images/deep-learning/transformer/transformer-position-encoding-result-2.png)

::: details 词序跟踪

如果我们将输入词的顺序反过来变成 "pizza eats Squatch"，那么第一个词和第三个词的嵌入就会交换，但是它们的位置值保持不变。

当我们将位置值添加到嵌入值中，我们又会得到第一个和第三个词的新位置编码，而第二个词由于没有移动，所以保持不变。

![位置编码结果](/images/deep-learning/transformer/transformer-position-encoding-result-reverse.png)

因此位置编码允许 Transformer 保持词序的跟踪。

:::

现在我们知道如何跟踪每个词的位置。

### 自注意力

让我们来谈谈 Transformer 如何保持词与词之间关系的跟踪。

如果输入句子是 "The **pizza** came out of the **oven** and **it** tasted good!"，那么这个词 "it" 可以指 "pizza"，或者可能指 "oven"（烤箱）。

这就是为什么 Transformer 正确地将 "it" 与 "pizza" 关联起来是很重要的。

好消息是，Transformer 有一种叫做**自注意力**的机制，能将 "it" 与 "pizza" 正确关联。

自注意力机制的原理是通过检查每个词与句子中所有词（包括它自己）的相似度。一旦相似度计算出来，它们被用来决定 Transformer 如何编码每个词。

::: details 具体示例

通常来说，"it" 这个词更常与 "pizza" 关联，而不是 "oven"，那么 "pizza" 的相似度得分会导致它对 Transformer 如何编码 "it" 这个词产生更大的影响。

:::

接下来让我们看看细节。

我们刚刚将位置编码添加到单词 "Let's" 和 "go" 的嵌入值中：

![位置编码结果](/images/deep-learning/transformer/transformer-position-encoding-result-3.png)

我们首先将单词 "Let's" 的位置编码值乘以一对权重，并将这些乘积相加得到 -1.0。然后我们用不同的一对权重做同样的事情，得到 3.7。

我们这样做两次，因为我们一开始有两个表示单词 "Let's" 的位置编码值，经过两次数学运算后，我们仍有两个表示单词 "Let's" 的值。

![query 值](/images/deep-learning/transformer/transformer-query.png)

::: details 为什么不直接使用一开始的两个位置编码好的值

每个词的新自注意力值包含来自所有其他词的输入，这有助于为每个词提供上下文，并有助于建立输入中每个词之间的关系。

:::

在 Transformer 术语中，我们把它称为 **query**。

现在我们有了单词 "Let's" 的 query 值，让我们用它们来计算它和单词 "go" 之间的相似度。

我们需要再创建两个新值来实现这一点，并也为 "go" 做同样的事情：

![key 值](/images/deep-learning/transformer/transformer-key.png)

这两组新值都称为 **key**。

我们用它们来计算与 "Let's" 的 query 值之间的相似度。计算它们之间的相似度的一种方法是计算点积。我们只需将每对数字相乘，然后将乘积相加。

![计算点积](/images/deep-learning/transformer/transformer-similarity.png)

"Let's" 与自身的相似度值为 11.7，比 "let's" 与单词 "go" 之间的相似度值 -2.6 更大。所以 "let's" 与它自己比单词 "go" 更加相似。

因此，我们希望 "let's" 对其编码的影响大于单词 "go"。

我们通过将相似度得分输入 softmax 函数来实现这一点：

![相似度得分比例](/images/deep-learning/transformer/transformer-similarity-score.png)

我们可以把 softmax 函数的输出看作一种确定我们应该为每个输入词用多少百分比来编码 "Let's" 的方式。

在这种情况下，因为 "Let's" 比 "go" 相似得多，我们将使用 100% 的 "Let" 来编码 "Let's"，使用 0% 的 "go" 来编码 "Let's"。

我们创建两个新值用来表示 "Let's"，并按 1.0 比例缩放 "let's" 的值。同时也创建两个新值来表示 "go"，并按 0.0 比例缩放 "go" 的值。最后我们将这些缩放值相加，就是 "Let's" 的自注意力值：

!["Let's" 的自注意力值](/images/deep-learning/transformer/transformer-attention.png)

接下来，我们以同样的方式计算单词 "go" 的自注意力值。好消息是，我们不需要重新计算 key 和 value。我们只需要创建表示单词 "go" 的 query 并进行数学计算：

!["go" 的自注意力值](/images/deep-learning/transformer/transformer-attention-2.png)

::: warning 注意

我们用来计算自注意力 query 的权重是完全相同的。

同样，我们为每个输入词计算自注意力 key 和 value 时的权重也分别是相同的。

这意味着无论 Transformer 输入多少个单词，我们只需为自注意力 query、key 和 value 重复使用同一组权重。

我们也可以同时计算每个词的 query、key 和 value。

:::

::: warning 注意

实际应用中，我们会使用多个自注意力单元。

:::

::: details query、key 与 value

- query 用于计算其他单词对自己的相似度

- key 用于计算相似度比例

- value 用于将相似度比例应用到输出的编码中

:::

### 残差链接

整理一下：

![Transformer 自注意力](/images/deep-learning/transformer/transformer-attention-result.png)

我们还需要做一件事来对输入进行编码。

我们取位置编码好的值，并将它们添加到自注意力值中：

![残差链接](/images/deep-learning/transformer/transformer-residual-connection.png)

这些旁路称为**残差连接**。它们使训练复杂的神经网络变得更容易。

让自注意力层在建立输入词之间关系时，不必同时保留词嵌入和位置编码信息。

::: warning 注意

这个简单的 transformer 只包含编码输入所需的部分：词嵌入、位置编码、自注意力和残差连接。

这四个特性使得 transformer 能够将单词编码成数字、编码单词的位置、编码单词之间的关系、并且可以相对容易和快速地并行训练。

也就是说，我们可以在 transformer 中添加很多额外的东西。

:::

词嵌入、位置编码、自注意力和残差连接所组成的部分是 transformer 的编码器部分：

![Transformer 编码器](/images/deep-learning/transformer/transformer-encoder.png)

### 解码器

现在我们已经编码了英文输入短语，让我们继续。是时候将其解码成西班牙语了。

解码器和编码器一样，从词嵌入开始，不过是为输出词汇创建嵌入值。

同样的，与编码&解码神经网络相同，我们使用 EOS 标记来启动解码，创建词嵌入，并添加位置编码：

<img src="/images/deep-learning/transformer/transformer-decoder-input.png" alt="西班牙语输入" width="160">

接下来为 EOS 标记创建 query、key 和 value，像以前一样计算它的自注意力值，并添加残差连接：

<img src="/images/deep-learning/transformer/transformer-decoder-attention.png" alt="西班牙语输入" width="160">

::: details 注意

我们用来计算解码器自注意力的 query、key 和 value 权重集合与编码器中使用的不同。

:::

### 注意力连接

让我们整合数学和图表：

![Transformer 编码器与解码器](/images/deep-learning/transformer/transformer-encoder-decoder.png)

到目前为止，我们已经讨论了自注意力机制如何帮助 transformer 跟踪单词在句子中的关系。

然而，由于我们在翻译一个句子，我们还需要跟踪输入句子和输出句子之间的关系。

::: details 具体示例

例如，如果输入句子是 "Don't eat the delicious looking and smelling pizza."，那么在翻译时，非常重要的是要跟踪第一个单词 "Don't"。

如果翻译只关注句子的其他部分并忽略的 "Don't"，那么我们最终会得到 "Eat the delicious looking and smelling pizza."，这两个句子的意思完全相反。

因此，对于解码器来说，跟踪输入中的重要单词是非常重要的。

:::

所以，我们需要在编码器和解码器之间建立注意力连接。

就像我们为自注意力做的那样，我们创建两个新值来表示解码器中 EOS 标记的 query 值，然后我们为编码器中的每个单词创建 key 值，并计算解码器中 EOS 标记与编码器中每个单词之间的相似性。像以前一样通过点积计算，通过 softmax 函数处理相似性：

!["EOS" 的自注意力值](/images/deep-learning/transformer/transformer-encoder-decoder-attention-percent.png)

结果告诉我们在解码器确定第一个翻译单词时，应该使用第一个单词的 100% 和第二个的 0%。现在我们知道了每个输入单词在决定第一个单词该被翻译成什么时应当被使用的百分比。

我们计算每个输入单词的 value，然后按 softmax 百分比缩放这些值，然后将两对缩放值相加，得到编码器解码器的注意力值：

![编码器解码器的注意力值](/images/deep-learning/transformer/transformer-encoder-decoder-attention.png)

::: warning 注意

我们用来计算编码器解码器注意力的 query、key 和 value 的权重集合与我们用来计算自注意力的权重集合不同

即，三组不同的 query、key、value，分别用于编码器，解码器以及编码器解码器的注意力

:::

我们整合图表中编码器解码器注意力，并添加另一组残差连接：

![编码器解码器的残差连接](/images/deep-learning/transformer/transformer-encoder-decoder-residual-connection.png)

这使编码器解码器注意力能够专注于输出单词和输入单词之间的关系，而不必保留之前发生的自注意力或之前发生的单词和位置编码。

### 全连接

最后，我们需要一种方法来使用这两个值来表示解码器中的 EOS 标记并选择四个输出标记中的一个（"ir"、"Vamos"、"y" 或 EOS）。

因此，我们将这两个值通过一个全连接层和 softmax 函数来选择输出：

![编码器解码器的全连接](/images/deep-learning/transformer/transformer-encoder-decoder-fullconnected.png)

接着整合我们的图表，并将翻译的词 "vamos"，插入下一个解码器嵌入层中进行数学计算：

![编码器解码器的全部计算](/images/deep-learning/transformer/transformer-all.png)

终于，我们展示了 transformer 如何编码一个简单的输入短语 "Let's go"，并将其编码解码成翻译短语 "Vamos"。

### 额外内容

在上面的例子中，我们保持了非常简单。

但是，如果我们有更大的词汇表（原始 transformer 有 37000 个标记和更长的输入和输出短语）。

为了让他们的模型正常工作，他们不得不在每一步之后归一化这些值。

例如，他们在编码器和解码器中的位置编码和自注意力之后归一化这些值。

此外，当我们计算注意力值时，我们使用点积来计算相似性，但你可以使用任何你想要的相似性函数。

在原始的 transformer 论文中，他们通过点积计算这些相似性，再除以每个标记嵌入值的平方根。就像在每一步之后缩放值一样，他们发现缩放点积有助于编码和解码长而复杂的短语。

最后，为了给 transformer 增加更多的权重和偏置以适应复杂的数据，你可以在编码器和解码器中添加带有隐藏层的额外神经网络。

## 小结

::: danger 警告

该部分尚未完工!

:::

::: details 专有名词

- **词嵌入**：将文字符号转换为计算机能够处理的数值形式的方法

- **Word2Vec**：一种流行的创建词嵌入的方法，使用连续词袋与跳跃模型方法

:::
