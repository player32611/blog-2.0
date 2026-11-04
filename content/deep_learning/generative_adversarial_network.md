# 生成对抗网络

> 生成对抗网络（Generative Adversarial Network，GAN）是一种利用两个神经网络相互竞争来学习数据分布，并生成新数据的深度学习模型

::danger

该页面尚未完工!

::

## 基本结构

GAN 主要由两部分组成: 生成器和判别器。生成器的任务是生成接近真实数据分布的样本，而判别器的任务则是尽可能地区分真实的样本和生成器生成的样本。通过生成器和判别器之间的对抗，GAN 可以学习到生成高质量样本的能力

<img src="/images/content/deep-learning/generative-adversarial-network/GAN.png" alt="生成对抗网络" width="600"/>

### 目标函数

由于 GAN 的目标是使生成器生成的数据能够骗过判别器，因此需要定义一个目标函数，使得生成器判断真实样本为 "真"，生成样本为 "假" 的概率最小化

$$
\min_G\max_D V(D,G) = \mathbb{E}_{x\sim p_{data}(x)}[\log D(x)] + \mathbb{E}_{z\sim p_z(z)}[\log(1-D(G(z)))]
$$

- $V(D,G)$: 真实样本和生成样本的差异程度

- $p_{data}(x)$: 真实数据 $x$ 的分布

- $p_z(z)$: 噪声 $z$ 的分布

- $D(x)$: 判别模型认为 $x$ 是真实样本的概率

- $D(G(z))$: 判别模型认为生成样本 $G(z)$ 是假的概率

也可以写作损失函数的形式:

$$
L(G,D) = -\mathbb{E}_{x\sim p_{data}(x)}[\log D(x)] - \mathbb{E}_{z\sim p_z(z)}[\log(1-D(G(z)))]
$$

### GAN 的训练

GAN 的训练过程包括三个步骤:

1. 输入真实数据 $x$ 到判别器，前向传播，期望得到输出为 1(判断结果为真)，之后使用反向传播算法更新**判别器**的参数

2. 输入生成器生成的数据 $G(z)$ 到判别器，前向传播，期望得到输出为 0(判断结果为假)，之后使用反向传播算法再次更新**判别器**的参数

3. 输入生成器生成的数据 $G(z)$ 到判别器，采用 2 中训练好的判别器的参数前向传播，期望得到输出为 1(判断结果为真)，之后使用反向传播算法更新**生成器**的参数

## GAN 的改进与优化

### CGAN

**CGAN(Conditional Generative Adversarial Network) 条件生成对抗网络**在生成数据时加入额外的条件信息，让生成器按照指定的条件生成我们想要的数据

<img src="/images/content/deep-learning/generative-adversarial-network/CGAN.png" alt="GAN 与 CGAN" width="500" />

生成器 $G$ 接受一个噪声向量 $z$ 和一个条件 $y$ (通常是一个标签)为输入

CGAN 的目标函数如下:

$$
\begin{aligned}
\min_G\max_D V(D,G)
=&\mathbb{E}_{x\sim p_{data}(x)}
[\log D(x|y)]\\
&+\mathbb{E}_{z\sim p_z(z)}
[\log(1-D(G(z|y)|y))]
\end{aligned}
$$

- $\mathbb{E}_{x\sim p_{data}(x)}[\log D(x|y)]$: 表示在给定条件 $y$ 的情况下当样本采样自真实数据集时判别器能够准确判别其为真的期望

- $\mathbb{E}_{z\sim p_z(z)}[\log(1-D(G(z|y)|y))]$: 表示在给定条件 $y$ 和输入噪声 $z$ 的情况下通过生成器生成的样本数据被判别器判别为假的期望

因此，CGAN 在训练过程中可用于生成具有特定属性的图像

### InfoGAN

**InfoGAN(Information Maximizing Generative Adversarial Network) 信息最大化生成对抗网络**可以从生成的样本中理解和学习数据分布中的隐含变量并将其分解成独立的特征
