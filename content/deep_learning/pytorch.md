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
