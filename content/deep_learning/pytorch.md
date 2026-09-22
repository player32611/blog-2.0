# PyTorch

::danger

该页面尚未完成!

::

> PyTorch 是一个基于 Python 语言的深度学习框架，它将数据封装成张量(Tensor)来进行处理

PyTorch 提供了灵活且高效的工具，用于构建、训练和部署机器学习和深度学习模型

PyTorch 广泛应用于学术研究和工业界，特别是在计算机视觉、自然语言处理、强化学习等领域

## 入门

### PyTorch 的安装

```bash
pip install torch
```

### PyTorch 特点

- 类似于 NumPy 的张量计算

- 自动微分系统

- 深度学习库

- 动态计算图

- GPU 加速

- 支持多种应用场景

- 跨平台支持

## 张量

### 什么是张量

PyTorch 中的张量就是**元素为同一种数据类型的多维矩阵**。在 PyTorch 中，张量以 "类" 的形式封装起来，对张量的一些运算、处理的方法被封装在类中

PyTorch 张量于 NumPy 数组类似，但 PyTorch 的张量具有 GPU 加速的能力(通过 CUDA)，这使得深度学习模型能够高效地在 GPU 上运行

PyTorch 提供了对张量的强大支持，可以经行搞笑的数值经计算、矩阵操作、自动求导等

### 创建张量

- `torch.tensor()`: 根据指定数据创建张量

- `torch.Tensor()`: 根据形状创建张量，其也可用来创建指定数据的张量

- `torch.IntTensor()、torch.FloatTensor()、torch.DoubleTensor()`: 创建指定类型的张量

::code-group

```python [torch.tensor()]
import torch

# 标量张量
t1 = torch.tensor(10)
print(f't1: {t1}, type: {type(t1)}')

# 列表 -> 张量
data = [[1,2,3],[4,5,6],[7,8,9]]
t2 = torch.tensor(data)
print(f't2: {t2}, type: {type(t2)}')

# numpy nd 数组 -> 张量
data = np.random.randint(0,10,size=(2, 3))
t3 = torch.tensor(data)
print(f't3: {t3}, type: {type(t3)}')
```

```python [torch.Tensor()]
import torch

# 标量张量
t1 = torch.Tensor(10)
print(f't1: {t1}, type: {type(t1)}')

# 列表 -> 张量
data = [[1,2,3],[4,5,6],[7,8,9]]
t2 = torch.Tensor(data)
print(f't2: {t2}, type: {type(t2)}')

# numpy nd 数组 -> 张量
data = np.random.randint(0,10,size=(2, 3))
t3 = torch.Tensor(data)
print(f't3: {t3}, type: {type(t3)}')

# 直接创建指定维度张量
t4 = torch.Tensor(2, 3)
print(f't4: {t4}, type: {type(t4)}')
```

```python [torch.IntTensor())]
import torch
import numpy as np

# 标量张量
t1 = torch.IntTensor(10)
print(f't1: {t1}, type: {type(t1)}')

# 列表 -> 张量
data = [[1,2,3],[4,5,6],[7,8,9]]
t2 = torch.IntTensor(data)
print(f't2: {t2}, type: {type(t2)}')

# numpy nd 数组 -> 张量
data = np.random.randint(0,10,size=(2, 3))
t3 = torch.IntTensor(data)
print(f't3: {t3}, type: {type(t3)}')

# 直接创建指定维度张量
t4 = torch.IntTensor(2, 3)
print(f't4: {t4}, type: {type(t4)}')

# 如果类型不匹配，会尝试自动转换类型
data = np.random.randint(0,10,size=(2, 3))
t5 = torch.FloatTensor(data)
print(f't5: {t5}, type: {type(t5)}')
```

::

::tip

张量中默认的数据类型是 **float32**

::

### 线性张量和随机张量

- `torch.arange(起始值, 结束值, 步长)` 和 `torch.linspace(起始值, 结束值, 参数的个数)`: 创建线性张量

- `torch.initial_seed()` 和 `torch.manual_seed()`: 随机种子设置

- `torch.rand()` 和 `torch.randn()`: 创建随机浮点类型张量

- `torch.randint(low, high, size=())`: 创建随机整数类型张量

::code-group

```python [torch.arange() 和 torch.linspace()]
# 创建指定范围的线性张量
t1 = torch.arange(0, 10, 2)
print(f't1: {t1}, type: {type(t1)}')

# 创建指定范围的线性等差张量
t2 = torch.linspace(1, 10, 5)
print(f't2: {t2}, type: {type(t2)}')
```

```python [torch.initial_seed()、torch.rand()、torch.randint()]
# 设置随机种子
torch.initial_seed()
torch.manual_seed(3)

# 创建随机张量
t1 = torch.rand(size=(2, 3))
print(f't1: {t1}, type: {type(t1)}')

# 符合正态分布的随机张量
t2 = torch.randn(size=(2, 3))
print(f't2: {t2}, type: {type(t2)}')

# 符合正态分布的随机张量
t3 = torch.randint(low=1, high=10, size=(3, 5))
print(f't3: {t3}, type: {type(t3)}')
```

::

::tip

`torch.initial_seed()` 默认采用当前系统的时间戳作为随机种子，无需参数

`torch.manual_seed()` 需要手动设置种子号，设置后每次产生的随机数都相同

::

### 指定值张量

- `torch.ones` 和 `torch.ones_like`: 创建全 1 张量

- `torch.zeros` 和 `torch.zeros_like`: 创建全 0 张量

- `torch.full` 和 `torch.full_like`: 创建全为指定值张量

```python
# 创建全 1 张量
t1 = torch.ones(2, 3)
print(f't1: {t1}, type: {type(t1)}')
t2 = torch.ones_like(torch.tensor([[1, 2], [3, 4], [5, 6]]))
print(f't2: {t2}, type: {type(t2)}')

# 创建全 0 张量
t3 = torch.zeros(2, 3)
print(f't3: {t3}, type: {type(t3)}')
t4 = torch.zeros_like(torch.tensor([[1, 2], [3, 4], [5, 6]]))
print(f't4: {t4}, type: {type(t4)}')

# 符合正态分布的随机张量
t5 = torch.full(size=(2, 3), fill_value=255)
print(f't5: {t5}, type: {type(t5)}')
t6 = torch.full_like(t5, fill_value=222)
print(f't6: {t6}, type: {type(t6)}')
```

### 元素类型转换

`data.type()`

```python
# 创建指定类型的张量
t1 = torch.tensor([[1, 2, 3], [4, 5, 6], [7, 8, 9]], dtype=torch.float)
print(f't1: {t1}, (元素)类型: {t1.dtype}, (张量)类型: {type(t1)}')

# type() 函数转换张量类型
t2 = t1.type(torch.int16)
print(f't2: {t2}, (元素)类型: {t2.dtype}, (张量)类型: {type(t2)}')

# half()/double()/float()/short()/int()/long()
print(t2.half())
print(t2.double())
print(t2.float())
print(t2.short())
print(t2.int())
print(t2.long())
```

### 张量类型转换

- `(Tensor 张量).numpy()`: 将张量转换为 ndarray 数组，但是共享内存(浅拷贝) ，可以使用 `copy()` 避免共享

- `torch.from_numpy()`: 将 ndarray 数组转换为 Tensor，默认共享内存，使用 `copy()` 避免共享

- `torch.tensor()`: 将 ndarray 数组转换为 Tensor，默认不共享内存

- `(Tensor 标量张量).item()`: 将只有一个元素的张量的值提取出来

```python
# 张量 -> numpy nd数组对象
t1 = torch.tensor([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(f't1: {t1}, type: {type(t1)}')
n1 = t1.numpy()
print(f'n1: {n1}, type: {type(n1)}')
c1 = t1.numpy().copy()
print(f'c1: {c1}, type: {type(c1)}')

# numpy nd 数组 -> 张量
n2 = np.array([11, 12, 13])
print(f'n2: {n2}, type: {type(n2)}')
t2 = torch.from_numpy(n2)
print(f't2: {t2}, type: {type(t2)}')
c2 = torch.tensor(n2)
print(f'c2: {c2}, type: {type(c2)}')

# 从标量张量中提取其内容
t3 = torch.tensor(100)
print(f't3: {t3}, type: {type(t3)}')
value = t3.item()
print(f'value: {value}, type: {type(value)}')
```

### 张量数值计算

- `add`、`sub`、`mul`、`div`、`neg`(取相反数)

- `add_`、`sub_`、`mul_`、`div_`、`neg_`: 会修改原数据

```python
t1 = torch.tensor([1, 2, 3])
print(f't1: {t1}')
print(f'--------')

t2 = t1.add(10)
t3 = t1.add_(2)

print(f't1: {t1}')
print(f't2: {t2}')
print(f't3: {t3}')
```

::tip

可以用 `+`、`-`、`*`、`/` 等符号来替代上述的加减乘除函数

如果是张量和数值运算，则该数值会和张量中的每个值依次进行对应的运算

```python
t1 = torch.tensor([1, 2, 3])

t2 = t1 + 10

print(f't1: {t1}')
print(f't2: {t2}')
```

::

### 点乘运算与矩阵乘法

**点乘**指的是相同形状的张量对应位置的元素相乘，使用 `mul` 和 `*` 实现

`torch.matmul` 函数和运算符 `@` 用于进行两个矩阵的乘积运算

```python
t1 = torch.tensor([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
t2 = torch.tensor([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# 张量点乘
t3 = t1 * t2
print(f't3: {t3}')
# 矩阵乘法
t4 = t1 @ t2
print(f't4: {t4}')
```

### 常见运算函数

- `sum()`、`max()`、`min()`、`mean()`: 可提供 dim 参数，0 表示列，1 表示行

- `pow()`、`sqrt()`、`exp()`、`log()`、`log2()`、`log10()`: 无 dim 参数

```python
t1 = torch.tensor([
    [1, 2, 3],
    [4, 5, 6]
], dtype=torch.float)

# 按列求和
print(f'sum: {t1.sum(dim=0)}')
# 按行求和
print(f'sum: {t1.sum(dim=1)}')
# 整体求和
print(f'sum: {t1.sum()}')

# 按列求最大值
print(f'max: {t1.max(dim=0)}')
# 按行求最大值
print(f'max: {t1.max(dim=1)}')
# 整体求最大值
print(f'max: {t1.max()}')

# 按列求最小值
print(f'min: {t1.min(dim=0)}')
# 按行求最小值
print(f'min: {t1.min(dim=1)}')
# 整体求最小值
print(f'min: {t1.min()}')

# 按列求平均值
print(f'mean: {t1.mean(dim=0)}')
# 按行求平均值
print(f'mean: {t1.mean(dim=1)}')
# 整体求平均值
print(f'mean: {t1.mean()}')

# 对每个数平方
print(f'pow: {t1.pow(2)}')
# 对每个数立方
print(f'pow: {t1.pow(3)}')
# 对每个数立方
print(f'pow: {t1 ** 3}')

# 对每个数计算平方根
print(f'sqrt: {t1.sqrt()}')

# 对每个数计算 e 的 n(对应元素) 次幂
print(f'exp: {t1.exp()}')

# 对每个数计算以 e 为底的对数
print(f'log: {t1.log()}')
# 对每个数计算以 2 为底的对数
print(f'log: {t1.log2()}')
# 对每个数计算以 10 为底的对数
print(f'log: {t1.log10()}')
```

### 张量的索引操作

```python
t1 = torch.randint(1, 10, (5, 5))
print(f't1: {t1}')

# 简单行列索引
# 获取第 2 行的数据
print(f't1[1]: {t1[1]}')
print(f't1[1]: {t1[1, :]}') # : 表示所有列
# 获取第 3 列的数据
print(f't1[1]: {t1[:, 2]}') # : 表示所有行

# 列表索引
# 获取 (1,2)、(3,4) 两个位置的元素
print(f't1[[1, 3], [2, 4]]: {t1[[1, 3], [2, 4]]}')
# 获取第 0,1 行的 1,2 列共 4 个元素
print(f't1[[[0], [1]], [1, 2]]: {t1[[[0], [1]], [1, 2]]}')

# 范围索引
# 获取前 3 行的前 2 列的元素
print(f't1[:3, :2]: {t1[:3, :2]}')
# 获取第 2 行到最后一行，前两列的数据
print(f't1[1:, :2]: {t1[1:, :2]}')
# 获取所有奇数行，偶数列
print(f't1[1::2, ::2]: {t1[1::2, ::2]}')

# 布尔索引
# 获取第 3 列大于 5 的行数据
print(f't1[t1[:, 2] > 5]: {t1[t1[:, 2] > 5]}')
# 获取第 2 行大于 5 的列数据
print(f't1[:, t1[1, :] > 5]: {t1[:, t1[1, :] > 5]}')


t2 = torch.randint(1, 10, (2, 2, 3))
print(f't2: {t2}')

# 多维索引
# 获取 0 轴上的第 1 个数据
print(f't2[0, :, :]: {t2[0, :, :]}')
# 获取 1 轴上的第 1 个数据
print(f't2[:, 0, :]: {t2[:, 0, :]}')
# 获取 2 轴上的第 1 个数据
print(f't2[:, :, 0]: {t2[:, :, 0]}')
```

### 张量的形状操作

- `reshape()`: 在保证张量**数据不变**的前提下改变数据的维度，将其转换成指定的形状

- `squeeze()`: 删除形状为 1 的维度(降维)

- `unsqueeze()`: 在指定位置添加形状为 1 的维度(升维)

- `transpose()`: 一次交换两个维度

- `permute()`: 一次交换多个维度

- `view()`: 用于修改连续(一维存储顺序与显示的顺序相同)的张量的形状

- `contiguous()`: 基于张量中显示的顺序，修改内存中的存储顺序

::code-group

```python [reshape()]
t1 = torch.randint(1, 10, (2, 3))
print(f't1: {t1}, shape: {t1.shape}, rows: {t1.shape[0]}, cols: {t1.shape[1]}')

# 把 t1 转为 3 行 2 列
t2 = t1.reshape(3, 2)
print(f't2: {t2}, shape: {t2.shape}, rows: {t2.shape[0]}, cols: {t2.shape[1]}')
# 把 t1 转为 1 行 6 列
t3 = t1.reshape(1, 6)
print(f't3: {t3}, shape: {t3.shape}, rows: {t3.shape[0]}, cols: {t3.shape[1]}')
```

```python [squeeze() 和 unsqueeze()]
t1 = torch.randint(1, 10, (2, 3))
print(f't1: {t1}, shape: {t1.shape}')

# 在 0 维上添加一个维度
t2 = t1.unsqueeze(0)
print(f't2: {t2}, shape: {t2.shape}')
# 在 1 维上添加一个维度
t3 = t1.unsqueeze(1)
print(f't3: {t3}, shape: {t3.shape}')


t4 = torch.randint(1, 10, size=(2, 1, 3, 1, 1))
print(f't4: {t4}, shape: {t4.shape}')
# 删除所有维度为 1 的维度
t5 = t4.squeeze()
print(f't5: {t5}, shape: {t5.shape}')
```

```python [transpose() 和 transpose()]
t1 = torch.randint(1, 10, (2, 3, 4))
print(f't1: {t1}, shape: {t1.shape}')

# 从 (2,3,4) -> (3,2,4)
t2 = t1.transpose(0, 1)
print(f't2: {t2}, shape: {t2.shape}')

# 从 (2,3,4) -> (4,2,3)
t3 = t1.permute(2, 0, 1)
print(f't3: {t3}, shape: {t3.shape}')
```

```python [view() 和 contiguous()]
t1 = torch.randint(1, 10, (2, 3))
print(f't1: {t1}, shape: {t1.shape}')

# 修改张量形状
t2 = t1.view(3, 2)
print(f't2: {t2}, shape: {t2.shape}')

# 通过 transpose() 交换维度
t3 = t1.transpose(0, 1)
print(f't3: {t3}, shape: {t3.shape}')
print(t3.is_contiguous()) # False

# 修改内存中的存储顺序后修改形状
t4 = t3.contiguous().view(2, 3)
print(f't4: {t4}, shape: {t4.shape}')
print(t4.is_contiguous()) # True
```

::

### 张量的拼接操作

- `torch.cat()`: 不改变维度数，将多个张量根据指定的维度拼接起来。除了拼接的哪个维度外，其它维度数必须保持一致

- `torch.stack()`: 在一个新的维度上连接一系列张量，这回增加一个新维度，并且所有输入张量的形状必须完全相同

```python
t1 = torch.randint(1, 10, (2, 3))
t2 = torch.randint(1, 10, (2, 3))
print(f't1: {t1}, shape: {t1.shape}')
print(f't2: {t2}, shape: {t2.shape}')

# cat() 张量拼接
t3 = torch.cat((t1, t2), dim=0)
print(f't3: {t3}, shape: {t3.shape}') # (4, 3)
t4 = torch.cat((t1, t2), dim=1)
print(f't4: {t4}, shape: {t4.shape}') # (2, 6)

# stack() 拼接张量
t5 = torch.stack([t1, t2], dim=0)
print(f't5: {t5}, shape: {t5.shape}') # (2, 2, 3)
```

## 自动微分模块

> 对损失函数求导，结合反向传播，更新权重参数

训练神经网络时，最常用的算法就是反向传播。在该算法中，参数(模型权重)会根据损失函数关于对应参数的梯度进行调整，为了计算这些梯度，PyTorch 内置了名为 `torch.autograd` 的微分模块。它支持任意计算图的自动梯度计算。

::tip

梯度下降公式: $w = w - r * grad$

- $r$: 学习率

- $grad$: 梯度值

::

### 梯度基本计算

1. 定义变量，设置初始值

2. 定义损失函数，计算损失值

3. 反向传播，计算梯度: `y.backword()`(y 是一个标量)

4. 获取 x 点的梯度值: `x.grad`(会累加上一次的梯度值)

```python
# 定义变量，基础初始权重
w = torch.tensor(10, requires_grad=True, dtype=torch.float)

# loss 变量，表示损失函数
loss = 2 * w ** 2 # 仅模拟

# 计算梯度，计算完毕后会记录到 w.grad 中
loss.sum().backward()

# 带入权重更新公式: w新 = w旧 - 学习率 * 梯度
w.data = w.data - 0.01 * w.grad

print(f'更新后的权重: {w}')
```

::tip

`torch.tensor(初始值, requires_grad=是否能被自动微分/求导, dtype=数据类型)`

::

### 循环更新参数

```python
# 定义变量，基础初始权重
w = torch.tensor(10, requires_grad=True, dtype=torch.float)

# loss 变量，表示损失函数
loss = w ** 2 + 20 # 仅模拟

print(f'开始 权重初始值: {w}, loss: {loss}')

for i in range(1, 101):
    # 前向传播
    loss = w ** 2 + 20  # 仅模拟

    # 反向传播
    loss.sum().backward()

    # 梯度更新
    w.data = w.data - 0.01 * w.grad

    print(f'第 {i} 次，权重初始值: {w}, loss: {loss}')

    # 梯度清零
    w.grad.zero_()

print(f'结束 权重: {w}, loss: {loss}')
```

::tip

- `x.grad.zero_()`: 清空上一次计算的梯度值

::
