# 感知机

::: details 目录

[[toc]]

:::

## 感知机是什么

感知机接收多个输入信号，输出一个信号。这里所说的 “信号” 可以想象成电流或河流那样具备 “流动性” 的东西。像电流流过导线，向前方输送电子一样，感知机的信号也会形成流，向前方输送信息。

![有两个输入的感知机](/images/deep-learning/perceptron/perceptron.png)

## 简单逻辑电路

![与门、与非门、或门的符号](/images/deep-learning/perceptron/gates.png)

### 与门

与门（AND gate）是有两个输入和一个输出的门电路，与门仅在**两个输入均为 1 时输出 1，其他时候则输出 0**。

| x1  | x2  |  y  |
| :-: | :-: | :-: |
|  0  |  0  |  0  |
|  0  |  1  |  0  |
|  1  |  0  |  0  |
|  1  |  1  |  1  |

```python
import numpy as np

def AND(x1, x2):
    x = np.array([x1, x2])
    w = np.array([0.5, 0.5])
    b = -0.7
    tmp = np.sum(w*x) + b
    if tmp <= 0:
       return 0
    else:
       return 1
```

### 与非门

与非门（NAND gate）就是颠倒了与门的输出，仅当 x1 和 x2 **同时为 1 时输出 0，其他时候则输出 1**。

| x1  | x2  |  y  |
| :-: | :-: | :-: |
|  0  |  0  |  1  |
|  0  |  1  |  1  |
|  1  |  0  |  1  |
|  1  |  1  |  0  |

```python
import numpy as np

def NAND(x1, x2):
    x = np.array([x1, x2])
    w = np.array([-0.5, -0.5]) # 仅权重和偏置与AND不同！
    b = 0.7
    tmp = np.sum(w*x) + b
    if tmp <= 0:
        return 0
    else:
        return 1
```

### 或门

或门（OR gate）是有两个输入和一个输出的电路，**只要有一个输入信号是 1，输出就为 1**。

| x1  | x2  |  y  |
| :-: | :-: | :-: |
|  0  |  0  |  0  |
|  0  |  1  |  1  |
|  1  |  0  |  1  |
|  1  |  1  |  1  |

```python
import numpy as np

def OR(x1, x2):
    x = np.array([x1, x2])
    w = np.array([0.5, 0.5])  # 仅权重和偏置与AND不同！
    b = -0.2
    tmp = np.sum(w * x) + b
    if tmp <= 0:
        return 0
    else:
        return 1
```

## 多层感知机

### 异或门

异或门（XOR gate）也被称为**逻辑异或**电路，仅当 x1 或 x2 中的一方为 1 时，才会输出 1（“异或” 是拒绝其他的意思）。

异或门的制作方法有很多，其中之一就是组合我们前面做好的与门、与非门、或门进行配置。

![通过组合与门、与非门、或门实现异或门](/images/deep-learning/perceptron/xor-gate.png)

| x1  | x2  | s1  | s2  |  y  |
| :-: | :-: | :-: | :-: | :-: |
|  0  |  0  |  1  |  0  |  0  |
|  1  |  0  |  1  |  1  |  1  |
|  0  |  1  |  1  |  1  |  1  |
|  1  |  1  |  0  |  1  |  0  |

```python
def XOR(x1, x2):
    s1 = NAND(x1, x2)
    s2 = OR(x1, x2)
    y = AND(s1, s2)
    return y
```

::: details 内容总结

- 感知机是具有输入和输出的算法。给定一个输入后，将输出一个既定的值。

- 感知机将权重和偏置设定为参数。

- 使用感知机可以表示与门和或门等逻辑电路。

- 异或门无法通过单层感知机来表示。

- 使用 2 层感知机可以表示异或门。

- 单层感知机只能表示线性空间，而多层感知机可以表示非线性空间。

- 多层感知机（在理论上）可以表示计算机。

:::
