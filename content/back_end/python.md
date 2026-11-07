# Python

## 核心语法

### `__name__`

`__name__` 时 Python 中非常重要的内置变量，表示的是当前模块的名称

- 当模块直接运行时: `__name__` 的值为 `"__main__"` (`if __name__ == "__main__"`)

- 当模块被导入时: `__name__` 等于模块的文件名(不含 .py 后缀)

### 字面量

|                |                                 |                      |
| :------------: | :-----------------------------: | :------------------: |
|    数字类型    |            整数(int)            |    10、18、-5、0     |
|    数字类型    |       浮点数/小数(float)        | 8.5、3.14、1.0、-3.5 |
|   布尔(bool)   |  表达显示生活中的逻辑，真或假   |     True、False      |
|  字符串(str)   |     描述文本的一种数据类型      |       "Python"       |
| 空值(NoneType) | 表示空或无值，仅包含一个值 None |         None         |
|    数据容器    |       存储多项数据的容器        | 列表/元组/集合/字典  |

通过 `str()` 语句可以将 int 类型的数据转为 str

通过 `int()` 语句可以将 str 类型的数据转为 int

::tip

通过 `type()` 语句来得到数据的类型，具体语法为：`type(要查看类型的数据)`

通过 `isinstance()` 检查数据是否属于指定的类型，返回的是一个 bool 知，具体语法为：`isinstance(数据, 类型)`

```python
print(type("Hello"))
print(type(10))
print(type(3.14))

num = 0.5
print(isinstance(num, int))
```

::

### 变量

一条语句可以定义多个变量，也可以连续赋值

```python
a, b = 1, "Python"
```

### 标识符

**标识符**是程序员在代码中为变量、函数、类等元素所起的名字

1. 只能包含字母，数字，下划线

2. 不能以数字开头

3. 不能使用关键字 True、False 等

4. 严格区分大小写

::tip

Python 命名规范

1. 见名知意

2. 多个部分使用下划线链接

3. 英文字母全小写

::

### 字符串

```python
# 双引号定义
s1 = "Hello"

# 单引号定义
s2 = 'Python'

# 三引号定义(多行字符串)
s3 = """
  定义:
    字符串
"""

s4 = "hello"
print("python: " + s4 + " , ")

# 通过 % 占位符的形式完成字符串和变量的快速拼接，% 表示占的位置，s 表示将变量转为字符串放入占位的位置
s5 = "user"
print("你好, 我是 %s" % s5)
print("你好, 我是 %s , 也是 %s" % (s5, s5))

# 也可以通过 f"内容{变量/表达式}" 的形式来完成快速格式化
name = "name"
print(f"你好，我是 {name}")
```

::warning

- 号也可以用来拼接两个字符串，但是无法将非字符串与字符串进行拼接(非字符串类型需要转换为字符串类型)

::

### 运算符

| 运算符 |  描述  |         举例说明          |
| :----: | :----: | :-----------------------: |
|   /    |  除法  | `10 / 5`，除法结果是小数  |
|   //   |  整除  | `10 // 3`，整除结果为整数 |
|  \*\*  | 幂指数 |  `10 ** 3`: 10 的 3 次方  |
|  and   | 逻辑与 |  同时成立才是符合条件的   |
|   or   | 逻辑或 | 只要有一个符合要求的即可  |
|  not   | 逻辑非 |         取反操作          |

::tip

- `//=`: 取整除赋值运算符

- `**=`: 幂赋值运算符

::

### 输入与输出

input 语句(函数)的功能就是获取键盘输入的数据

print 语句(函数)的功能就是将数据输出到控制台

```python
name = input("请输入姓名：")
print(f"欢迎您, {name}")
```

### 条件判断

::code-group

```python [if]
if 要判断的条件:
  条件成立时，要执行对应的操作
```

```python [if...else]
if 要判断的条件:
  条件成立时，要执行对应的操作
else:
  条件不成立时，执行的操作
```

```python [if...elif...else]
if 要判断的条件1:
  条件成立时，要执行对应的操作1
elif 要判断的条件2:
  条件成立时，要执行对应的操作2
else:
  条件不成立时，执行的操作
```

```python [match...case]
match 变量:
  case 值1:
    逻辑1
  case 值2:
    逻辑2
  case 值3:
    逻辑3
  case 值4:
    逻辑4
  case 值5 | 值6:
    逻辑5
  case _:
    默认逻辑
```

::

::warning

Python 中是通过缩进来描述代码的归属的

::

### 循环

::code-group

```python [while]
while 条件表达式:
  循环体语句
# 以下可选
else:
  条件为False，循环正常结束时执行
```

```python [for]
for 元素 in 待处理数据集:
  循环体代码
# 以下可选
else：
  循环结束时，执行的代码
```

::

::tip

range 语句

作用：生成指定规则的数字序列

`range(end)`: 获取一个从 0 开始，到 end 结束的数字序列(不含 end 本身)

- `range(5)`: 0, 1, 2, 3, 4

`range(start, end)`: 获取一个从 start 开始，到 end 结束的数字序列(不含 end 本身)

- `range(2, 8)`: 2, 3, 4, 5, 6, 7

`range(start, end, step)`: 获取一个从 start 开始，到 end 结束的数字序列，step 为步长(不含 end 本身)

- `range(0, 10, 2)`: 0, 2, 4, 6, 8

```python
# 计算 100-500 之间所有 3 的倍数的数字之和
total = 0

for i in range(100, 501)
  if i % 3 == 0:
      total += i
```

::

### 数据统计

- `min()`: 获取最小值

- `max()`: 获取最大值

- `sum()`: 求和

- `len()`: 获取元素的个数

### 函数

```python
def 函数名(参数列表):
  函数体
  return 返回值

# 调用函数
函数名(参数)
```

::warning

函数定义时的参数列表与返回值语句是可有可无的

函数必须先定义后调用执行

::

位置参数：调用函数时根据函数定义时的位置来传递参数

关键字参数：调用函数时以函数定义时的形参名称作为关键字，以 "键=值" 的形式来传递参数(不要求顺序)

::code-group

```python [位置参数]
def reg_stu(name, age, gender, city):
  print(f"注册成功，姓名:{name}, 年龄:{age}, 性别:{gender}, 城市:{city}" )
  return { "name": name, "age": age, "gender": gender, "city": city }

stu = reg_stu("张三", 18, "男", "北京")
```

```python [位置参数]
def reg_stu(name, age, gender, city):
  print(f"注册成功，姓名:{name}, 年龄:{age}, 性别:{gender}, 城市:{city}" )
  return { "name": name, "age": age, "gender": gender, "city": city }

stu = reg_stu(name="张三", age=18, gender="男", city="北京")
stu2 = reg_stu(gender="男", name="张三", city="北京", age=18)
stu3 = reg_stu("张三", 18, gender="男", city="北京")
```

```python [默认参数]
def reg_stu(name, age, gender, city='北京'):
  print(f"注册成功，姓名:{name}, 年龄:{age}, 性别:{gender}, 城市:{city}" )
  return { "name": name, "age": age, "gender": gender, "city": city }

stu = reg_stu("张三", 18, "男")
```

```python [不定长参数]
def calc_data(*args):
  min_data = min(args)
  max_data = max(args)
  avg_data = sum(args) / len(args)
  return min_data, max_data, round(avg_data, 1)

data = calc_data(10, 20, 30, 40, 50)
```

```python [不定长参数-关键字传递]
def calc_data(*args, **kwargs):
  min_data = min(args)
  max_data = max(args)
  avg_data = sum(args) / len(args)

  if kwargs.get('round'):
    avg_data = round(avg_data, kwargs.get('round'))

  return min_data, max_data, round(avg_data, 1)

data = calc_data(10, 20, 30, 40, 5, round=2)
```

::

::warning

- 如果位置参数与关键字参数混用，关键字参数必须在位置参数之后(关键字参数之间，没有顺序要求)

- 默认参数必须放在没有默认值的参数列表的后面，一个函数在定义时是可以设置多个默认参数的

::

::detail

#title
函数说明文档
#default
函数的说明文档是写在函数开头，用三个引号包裹的字符串，用于结束函数的功能、参数、返回值等信息、方便调用者清楚函数的具体作用及细节

```python
def circle_area_len(r):
  """
  该函数用于根据圆的半径，计算圆的面积和圆的周长
  :param r: 圆的半径
  :return: 圆的面积，圆的周长
  """
  return 3.14 * r * r, 2 * 3.14 * r
```

::

### 匿名函数

匿名函数指的是没有名称的函数，需要通过 lambda 表达式来声明函数，可以简化简单函数的编写(单行表达式)

```python
# 定义匿名函数
lambda 参数列表 : 函数体

out_line = lambda : print('------------------')
add = lambda x, y: x + y

out_line()
print(add(100, 200))
```

::tip

匿名函数中可以返回结果，也可以不返回结果，返回结果时，不需要写 return，表达式的运行结果就是要返回的结果

::

### global 关键字

global 关键字用于明确的告诉 Python 解释器在函数中要使用全局变量，使得可以在函数内部修改全局变量的值

```python
num1 = 1 # 全局变量
def fun1():
  global num1
  num1 = 100 # 修改全局变量 num1
  print(num1)

fun1()
```

### 类型注解

类型注解是 Python 中的一种语法特性，用于明确标识变量、函数参数和返回值的数据类型，从而使代码更清晰、更安全、更易维护

```python
a: int = 695
score: float = 98.5
hobby: str = "Python"
flag: bool = True
puc: None = None

namess: list[str] = ["A", "C", "E"]
phones: set[str] = {"13322222", "1522222"}
options: dict[str, int] = { "count": 0, "total": 0}
goods: tuple[str, int, int] = ("手机", 5999, 1)

def calc(scores: list[int]) -> float:
  return sum(scores) / len(scores)

def calc_data(scores: list[int]) -> tuple[int, int, float]:
  max_v = max(scores)
  min_v = min(scores)
  avg_v = sum(scores) / len(scores)
  return max_v, min_v, avg_v
```

### 模块

Python 模块(module): 一个 .py 文件就是一个模块，模块是 Python 程序的基本组织单位。在模块中可以定义变量、函数、类、以及可执行的代码

在使用模块中提供的功能之前，必须得先导入，再使用

|              导入形式               |               代码样例               |    调用方式     |       调用方式样例        |
| :---------------------------------: | :----------------------------------: | :-------------: | :-----------------------: |
|           `import 模块名`           |         `import random, os`          | `模块名.功能名` | `random.randint(10, 100)` |
|       `import 模块名 as 别名`       |        `import random as rd`         |  `别名.功能名`  |   `rd.randint(10, 100)`   |
|     `from 模块名 import 功能名`     | `from random import randint, choice` |    `功能名`     |    `randint(10, 100)`     |
| `from 模块名 import 功能名 as 别名` | `from random import randint as rint` |     `别名`      |      `rint(10, 100)`      |
|       `from 模块名 import *`        |        `from random import *`        |    `功能名`     |    `randint(10, 100)`     |

::warning

每一个 python 文件都可以作为一个模块，模块的名字就是文件的名字(建议使用 python 标识符定义，规范命名)

::

::detail

#title
`__all__`
#defalut

`__all__` 是一个模块级别的特殊变量，用于指定 `from 模块名 import *` 时会导入哪些功能

```python
__all__ = ["log_separator1", "log_separator3", "PI"]

PI = 3.1415926

def log_separator1():
  print("-" * 30)

def log_separator2():
  print("+" * 30)

def log_separator3():
  print("#" * 30)

def log_separator4():
  print("*" * 30)
```

::

### 包

包：本质就是一个文件夹，该文件夹中可以包含若干 python 模块(.py 文件)，文件夹下还包含了一个 `__init__.py`

作用：模块文件较多时，用来管理多个模块(包的本质也是一个模块)

|             导入形式             |                 代码样例                  |       调用方式       |          调用方式样例           |
| :------------------------------: | :---------------------------------------: | :------------------: | :-----------------------------: |
|       `import 包名.模块名`       |           `import utils.my_fun`           | `包名.模块名.功能名` | `utils.my_fun.log_separator1()` |
|    `from 包名 import 功能名`     |        `from utils import my_fun`         |   `模块名.功能名`    |    `my_fun.log_separator1()`    |
|       `from 包名 import *`       |           `from utils import *`           |   `模块名.功能名`    |    `my_fun.log_separator1()`    |
| `from 包名.模块名 import 功能名` | `from utils.my_fun import log_separator1` |       `功能名`       |       `log_separator1()`        |
|   `from 包名.模块名 import *`    |       `from utils.my_fun import *`        |       `功能名`       |    `log_separator1(10, 100)`    |

::warning

在通过 `from 包名 import *` 导入全部模块的时候，需要在 `__init__.py` 文件中添加 `__all__ = []` 控制允许导入的模块列表

::

::detail

#title
`__init__.py`
#default

`__init__.py` 文件用于标识这是一个包，而不是普通的文件夹

也可控制在 `import *` 时导入的模块列表(`__all__` 变量)

```python
# 描述包信息
__version__ = "1.0.0"
__author__ = "user"

__all__ = ["my_fun", "my_var"]

```

::

## 数据存储容器

|   特性   | 字符串(str) |     列表(list)     | 元组(tuple)  |  集合(set)   | 字典(dict) |
| :------: | :---------: | :----------------: | :----------: | :----------: | :--------: |
|  有序性  |    有序     |        有序        |     有序     |     无序     | 有序(3.7+) |
| 重复元素 |    允许     |        允许        |     允许     |    不允许    | key 不允许 |
|  可变性  |   不可变    |        可变        |    不可变    |     可变     |    可变    |
| 索引访问 |    支持     |        支持        |     支持     |    不支持    |   不支持   |
| 切片操作 |    支持     |        支持        |     支持     |    不支持    |   不支持   |
| 使用场景 |  文本处理   | 有序可重复数据集合 | 固定数据记录 | 去重数据集合 |   键值对   |

::tip

从前向后(正向索引)，下标从 0 开始；从后向前(反向索引)，下标从 -1 开始

::

:: tip

可以使用 `in` 运算发判断一个元素是否存在于列表/字符串之中。返回结果为 bool 类型，True 表示存在，False 表示不存在

```python
元素 in 列表
```

::

### 列表

```python
# 定义
s = [元素1, 元素2, 元素3, ...]

# 访问
print(s[0])
print(s[-2])

# 修改
s[1] = 修改值

# 删除指定位置的值
del s[2]
```

|    方法     |                             作用                             |          样例          |
| :---------: | :----------------------------------------------------------: | :--------------------: |
| `append()`  |                     在列表的尾部追加元素                     |   `s.append(10035)`    |
| `insert()`  |                  在指定索引之前，插入该元素                  |   `s.insert(0, 92)`    |
| `remove()`  |                  移除列表中第一个匹配到的值                  |     `s.remove(75)`     |
|   `pop()`   | 删除列表中指定索引位置的元素(如果未指定索引，默认删最后一个) | `s.pop(2)` / `s.pop()` |
|  `sort()`   |    对列表进行排序(列表元素的数据类型一致，才可以进行排序)    |       `s.sort()`       |
| `reverse()` |                         反转列表元素                         |     `s.reverse()`      |

::tip

合并列表

可以使用 + 运算符直接合并，也可以使用 \* 进行解构操作后合并

```python
num_list1 = []
num_list2 = []

num_list = num_list1 + num_list2
num_list = [*num_list1, *num_list2]
```

::

::tip

列表推导式

列表推导式就是按照一定规则快速生成一个列表的方法

```python
列表名称 = [要插入列表的数据 for i in 列表]
# num_list = [i**2 for i in range(1, 21)]
列表名称 = [要插入列表的数据 for i in 列表 if 条件]
# num_list = [i**2 for i in range(1, 21) if i % 2 == 0]
```

::

### 字符串

特点：不可变性(无法修改)、有序性、可迭代性

|      方法      |                            作用                             |             样例             |
| :------------: | :---------------------------------------------------------: | :--------------------------: |
|    `find()`    | 在字符串中查找子串，返回第一次出现的索引位置，找不到返回 -1 |      `s.find('Python')`      |
|   `count()`    |                统计子串在字符串中出现的次数                 |        `s.count('H')`        |
|   `upper()`    |               将字符串中的所有字母转换为大写                |        `s.upper(75)`         |
|   `lower()`    |               将字符串中的所有字母转换为小写                |         `s.lower()`          |
|   `split()`    |               将字符串按指定分割符分割成列表                |        `s.split(' ')`        |
|   `strip()`    |             去除字符串两端的空白字符或指定字符              | `s.strip()` / `s.strip('*')` |
|  `replace()`   |             将字符串中的指定子串替换成新的子串              |    `s.replace('H', 'C')`     |
| `startswith()` |          检查字符串是否以指定子串开头，返回布尔值           |     `s.startswith('P')`      |
|  `endswith()`  |          检查字符串是否以指定子串结尾，返回布尔值           |      `s.endswith('P')`       |

### 元组

元组是不可变的序列，类似于列表，但创建后不能修改

- 可以存储不同类型的元素

- 元素可以重复、有序、不可以修改(支持索引访问、切片)

```python
# 定义
元组名称 = (元素1, 元素2, ...)

# 定义空元组
元组名称 = ()
元组名称 = tuple()
```

|   方法    |                       作用                       |
| :-------: | :----------------------------------------------: |
| `index()` | 查找某个元素在元组中的索引位置(第一次出现的位置) |
| `count()` |           统计某元素在元组中出现的次数           |

::warning

定义单元素元组时，需要在结尾加上逗号，比如 `('A',)`

::

### 集合(set)

```python
# 定义集合
s1 = {元素1, 元素2, 元素3, ...}

# 定义空集合
s2 = set()
```

|          方法          |                              作用                              |              样例               |
| :--------------------: | :------------------------------------------------------------: | :-----------------------------: |
|        `add()`         |                        添加元素到集合中                        |          `s.add('t')`           |
|       `remove()`       |           移除集合中的指定元素(指定元素不存在将报错)           |         `s.remove('t')`         |
|        `pop()`         |                   随机删除集合中的元素并返回                   |          `s = s.pop()`          |
|       `clear()`        |                            清空集合                            |           `s.clear()`           |
|  `difference()` / `-`  | 求取两个集合的差集(包含在第一个集合但不包含在第二个集合的元素) |  `s.difference(s2)` / `s - s2`  |
|    `union()` / `\|`    |                       求取两个集合的并集                       |    `s.union(s2)` / `s \| s2`    |
| `intersection()` / `&` |                       求取两个集合的交集                       | `s.intersection(s2)` / `s & s2` |

::warning

由于集合是无序的，因此是不支持下标索引访问的

::

::tip

集合推导式

```python
变量名称 = [i表达式 for i in 列表]
列表名称 = [i表达式 for i in 列表 if 条件]
```

::

### 字典

字典: 使用键值对(key: value)来存储数据，每一个键都对应一个值，通过键(key)可以快速找到对应的值(value)

```python
# 定义字典
字典名称 = {键1: 值1, 键2: 值2, ...}

# 定义空字典
字典名称 = {}
字典名称 = dict{}

# 根据 key 获取 value
值 = 字典名称[key]
```

| 类型 |          操作           |                      含义                       |            样例             |
| :--: | :---------------------: | :---------------------------------------------: | :-------------------------: |
| 添加 | `字典名称[key] = value` |        往指定字典中添加 key-value 键值对        |    `dict1["key1"] = 688`    |
| 删除 |   `字典名称.pop(key)`   | 删除字典中指定的 key，并返回该 key 对应的 value | `score = dict1.pop("key1")` |
| 删除 |   `del 字典名称[key]`   |             删除字典中指定的键值对              |     `del dict1["key1"]`     |
| 修改 | `字典名称[key] = value` |          修改字典中指定的 key 对应的值          |       `dict1["key1"]`       |
| 查询 |     `字典名称[key]`     |               根据 key 获取 value               |       `dict1["key1"]`       |
| 查询 |   `字典名称.get(key)`   |               根据 key 获取 value               |     `dict1.get("key1")`     |
| 查询 |    `字典名称.keys()`    |                 获取所有的 key                  |       `dict1.keys()`        |
| 查询 |   `字典名称.values()`   |                获取所有的 value                 |      `dict1.values()`       |
| 查询 |   `字典名称.items()`    |           获取所有的 key-value 键值对           |       `dict1.items()`       |

```python
# 遍历
for k in dict1.keys():
  print(f"{k}: {dict1[k]}")

for item in dict1.items():
  print(f"{item[0]} : {item[1]}")
```

::warning

字典内的 key 不允许重复，如果重复定义，后面的覆盖前面的

字典中的 value 可以是任何类型的数据，而 key 不能为可变类型(如: 不能为列表 list、集合 set、字典 dict)

::

### 组包与解包

- 组包: 将多个值合并到一个容器中

- 解包: 将容器(元组、列表)解开成独立的元素，分别赋值给多个变量

在元组解包时，`*` 表示收集剩余的所有元素，允许我们处理不确定数量的元素

```python
t1 = (5, 7, 9, 1)
t2 = 5, 7, 9, 1

# 基础解包
a, b, c, d = t1

# (*)扩展解包
x, *y, z = t2 # x 为 5，y 为 [7, 9]，z 为 1
s, *o = t2 # s 为 5，o 为 [7, 9, 1]
*o, e = t2 # o 为 [5, 7, 9]，e 为 1
```

### 切片

切片是指对操作的数据截取其中一部分的操作。列表、字符串、元组都支持切片操作

```python
序列数据[开始索引:结束索引:步长]

s = ["A", "C", "E", "B", "D", "E", "G"]

s[0:5:1] # ["A", "C", "E", "B", "D"]
s[:5:1] # ["A", "C", "E", "B", "D"]
s[:5:] # ["A", "C", "E", "B", "D"]
s[:5] # ["A", "C", "E", "B", "D"]

s[0:5:2] # ["A", "E", "D"]
```

- 不包含结束索引位置对应的元素(开始索引未指定默认为 0；结束索引未指定默认为列表长度；步长未指定默认为 1)

- 索引采用正向，反向索引都可以

- 步长是选取间隔，默认步长为 1
