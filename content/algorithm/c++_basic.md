# C++基础

::: details 目录

[[toc]]

:::

## 头文件

::: tip 注意

在 C 语言中头文件的扩展名是`.h`，但是 C++中的用法发生了一些变化，对老式 C 的头文件保留了扩展名`.h`，但是 C++自己的文件没有扩展名了。

有些 C 的头文件被转换成 C++头文件，这些文件名被重命名，去掉了`.h`扩展名，并在文件名的前面加上了前缀`c`(表示来自 C 语言)。有时头文件的 C 语言版本和 C++版本相同，而有时候，新版本做了一些修改。

| 头文件类型  |         约定         |      实例      |                    说明                    |
| :---------: | :------------------: | :------------: | :----------------------------------------: |
| C++旧式风格 |      以`.h`结尾      | `<iostream.h>` | C++程序可以使用，一些新的 IDE 可能不再支持 |
| C 旧式风格  |      以`.h`结尾      |   `<math.h>`   |             C、C++程序可以使用             |
| C++新式风格 |      没有扩展名      |  `<iostream>`  |    C++程序可以使用，使用 namespace std     |
| 转换后的 C  | 加上前缀，没有扩展名 |   `<cmath>`    |   C++程序可以使用，可能包含不是 C 的特性   |

:::

## 命名空间

在 C++中，变量、函数和类都是大量存在的，这些变量、函数和类的名称如果都存在于全局作用域中，可能会导致很多冲突，使用**命名空间**的目的是对标识符的名称进行隔离，以避免命名冲突或名字污染，`namespace`关键字的出现就是针对这种问题的。

`std`是 C++标准库的命名空间名，C++将标准库的定义实现都放到这个命名空间中，当我们需要使用标准库中的内容时，就需要加上：`using namespace std;`当有了这句代码的时候，表示命名空间`std`中信息都是可见和可用的，比如：`cin`、`cout`、`endl`等。

命名空间也是根据需要自己可以定义的。

代码中的`std::cout`的意思就是使用`std`命名空间中的`cout`。

::: warning 注意

采用`std::cout`这种写法，如果频繁使用，在算法竞赛中比较麻烦，耽搁时间。

但是在企业中做软件开发基本上都这样写的，这样写更好的避免名字冲突的问题。

:::

## 数据类型、变量与常量

### 各类型取值范围

|         类型         |                 取值范围                 |    速记最小值     |     速记最大值      |
| :------------------: | :--------------------------------------: | :---------------: | :-----------------: |
|        `char`        |                 -128~127                 |  `CHAR_MIN` -2^7  |  `CHAR_MAX` 2^7-1   |
|   `unsigned char`    |                  0~255                   |        `0`        |  `UCHAR_MAX` 2^8-1  |
|       `short`        |               -32768~32767               | `SHRT_MIN` -2^15  |  `SHRT_MAX` 2^15-1  |
|   `unsigned short`   |                 0~65535                  |        `0`        | `USHRT_MAX` 2^16-1  |
|        `int`         |          -2147483648~2147483647          |  `INT_MIN` -2^31  |  `INT_MAX` 2^31-1   |
|    `unsigned int`    |               0~4294967295               |        `0`        |  `UINT_MAX` 2^32-1  |
|        `long`        | -9223372036854775808~9223372036854775807 | `LONG_MIN` -2^31  |  `LONG_MAX` 2^31-1  |
|   `unsigned long`    |          0~18446744073709551615          |        `0`        | `ULONG_MAX` 2^32-1  |
|     `long long`      | -9223372036854775808~9223372036854775807 | `LLONG_MIN` -2^63 | `LLONG_MAX` 2^63-1  |
| `unsigned long long` |          0~18446744073709551615          |        `0`        | `ULLONG_MAX` 2^64-1 |

为了代码的可移植性，和方便记忆，需要知道某种整数类型的极限值时，经常使用这些速记的符号，`limits.h`文件中说明了整型类型的取值范围。(C++中头文件的名字是`<climits>`)

`float.h`这个头文件中说明浮点型类型的取值范围。(C++中头文件的名字是`<cfloat>`)

### typedef

在 C++中有一个关键字是和类型有关的，是用来给类型重命名的。当有一个类型比较复杂的时候，可以简化类型。`typedef`在竞赛中经常使用，可以提升编码速度。`typedef`使用的基本语法形式：

```c++
typedef <old_type> <new_type>;
```

比如：

```c++
typedef unsigned int ui;
typedef long long ll;
typedef unsigned long long ull;
```

上面代码的意思是将`unsigned int`重命名为`ui`，使用`ui`创建的变量和使用`unsigned int`是一样的，其它几个也是一样的道理。

### 全局变量与局部变量

- **全局变量**：在大括号外部定义的变量就是全局变量

- **局部变量**：在大括号内部定义的变量就是局部变量

当局部变量与全局变量同名的时候，局部变量优先使用。

::: tip 提示

如果想要使用全局变量，必须加上`::`

:::

::: warning 注意

全局变量通常在定义时就被初始化，如果没有明确指定初始值，它们通常会被初始化为 0

局部变量通常不会自动初始化。它们需要在使用之前明确地赋值或初始化。如果没有初始化，它们的值将是未定义的。

:::

::: tip 小提示

如果一个题目可以使用全局变量，又可以使用局部变量，那怎么选择呢？

**如果是在竞赛中：**

能使用全局变量，一般会直接使用全局变量，这样的好处是：

1.变量不需要初始化，因为默认会初始化为 0，这样写会比较块

2.很多时候，会避免传参，因为全局变量到处都可以使用

所以在竞赛中其实哪种方便就使用哪种，全局变量的使用很常见。

但是在企业里软件开发的工程实践中一般建议：能使用局部变量的，尽量减少使用全局变量，因为企业级的开发，代码量比较大，全局变量在任意地方都可以使用，这样就变得不可控了。

:::

### 常量

常量就是不能被改变的值，通常我们会使用三种常量：

- 字面常量

- `#define`定义的常量

- `const`定义的常量

```c++
#define 变量名 内容
```

使用`#define`定义常量的时候是不关注类型的，只关注常量的名字叫啥，常量的值是啥，编译在处理这种常量的时候就是直接替换，在出现常量名字的地方，通通替换成常量的内容。

::: tip 提示

习惯上，常量的名字一般会写成大写，而普通变量的名字不会全大写。

:::

## 输入输出

### getchar()

`getchar()`是属于 C 语言的库函数，C++是兼容 C 语言的，所以 C++中只要正确包含头文件也可以正常使用这个函数。

`getchar()`函数返回用户从键盘输入的一个字符，使用时不带有任何参数，函数原型如下：

```c++
int getchar(void);
```

程序运行到这个命令就会暂停，等待用户从键盘输入，等同于使用`cin`或`scanf()`方法读取一个字符。

它的原型定义在头文件`<cstdio>`。

::: tip 提示

`getchar()`不会忽略起首的空白字符，总是返回当前读取的第一个字符，无论是否为空格。

如果读取失败，返回常量`EOF`，由于`EOF`通常是 -1，所以返回值的类型要设为`int`，而不是`char`。

如何让`getchar()`函数读取失败，返回 -1 呢？其实需要在输入字符之前，直接按`Ctrl+z`就可以。

:::

### putchar()

`getchar()`通常和`putchar()`配合使用。`putchar()`函数原型如下：

```c++
int putchar(int ch);
```

`putchar()`函数将它的参数字符输出到屏幕，它的原型定义在头文件`<cstdio>`。

操作成功时，`putchar()`返回输出的字符，否则返回常量`EOF`。

### printf()

`printf()`函数函数原型如下：

```c++
int printf(const char *format, ...);
```

`printf()`的作用是将参数文本输出到屏幕，并可以定制输出文本的格式。

`printf()`不会在行尾自动添加换行符，运行结束后，光标就停留在输出结束的地方，不会自动换行。需使用换行符`\n`进行手动换行。

```c++
#include <cstdio>
int main(){
    printf("hello world\n");
}
```

`printf()`可以在输出文本中**指定占位符**，就是这个位置可以用其它值代入。

```c++
#include <cstdio>
int main(){
    printf("There are %d apples\n", 3);
}
```

上面示例中，`There are %d apples`是输出文本，里面的`%d`就是**占位符**。

占位符的第一个字符一律为百分号`%`，第二个字符表示占位符的类型，常见的占位符如下：

|  占位符  |                  介绍                   |
| :------: | :-------------------------------------: |
|  **%d**  |             **十进制整数**              |
| **%lld** |      **十进制 long long int 类型**      |
|  **%f**  | **小数(包含 float 类型和 double 类型)** |
| **%Lf**  |          **long double 类型**           |
|  **%c**  |                **字符**                 |
|  **%s**  |               **字符串**                |

`printf()`的第二个参数就是替换占位符的值。

输出文本里面可以使用**多个占位符**。

```c++
#include <cstdio>
int main() {
    printf("%s says it is %d o 'clock\n", "Lily", 21);
}
```

`printf()`参数与占位符是一一对应关系，如果有 n 个占位符，`printf()`的参数值就应该有 n+1 个。如果参数个数少于对应的占位符，`printf()`可能会输出内存中的任意值。

`printf()`可以定制占位符的输出格式。包括**限定占位符的最小宽度**，**限定小数的位数**

```c++
#include <cstdio>
int main() {
    printf("%5d\n", 123);
}
```

`%5d`表示这个占位符的宽度至少为 5 位。如果不满 5 位，对应的值的前面会添加空格。

::: tip 提示

输出的值默认是右对齐，即输出内容前面会有空格；如果希望改成右对齐，在输出内容后面添加空格，可以在占位符的 `%` 的后面插入一个 `-` 号。

:::

::: warning 注意

对于小数，这个限定符会限制所有数字的最小显示宽度。

:::

当希望限定小数的位数时，占位符可以写成`%.2f`，表示小数点后最多显示 2 位。

```c++
#include <cstdio>
int main() {
    printf("%.2f\n", 3.1415926);
}
```

这种写法可以与限定宽度占位符结合使用：

```c++
#include <cstdio>
int main() {
    printf("%6.2f\n", 3.1415926);
}
```

上面示例中，`%6.2f`表示输出字符串最小宽度为 6，小数位数为 2.

::: tip 提示

最小宽度和小数位数这两个限定值，都可以用 `*` 代替，通过`printf()`的参数指传入。

```c++
#include <cstdio>
int main() {
    printf("%*.*f\n", 6, 2, 3.1415926);
}
```

上面示例中，`%*.*f`的两个星号通过`printf()`的两个参数 6 和 2 传入。

:::

### scanf()

`scanf()`函数原型如下：

```c++
int scanf(const char *format, ...);
```

`scanf()`函数运用读取用户的键盘输入。程序运行到`scanf()`这个语句时，会停下来，等待用户从键盘输入。用户输入数据，按下回车键后，`scanf()`就会处理用户的输入，将其存入变量。

`scanf()`的语法跟`printf()`类似。

```c++
#include <cstdio>
int main() {
    int i = 0;
    scanf("%d", &i);
    printf("i = %d\n", i);
}
```

它的第一个参数是一个格式字符串，里面会放置占位符(与`printf()`的占位符基本一致)，告诉编译器如何解读用户的输入，需要提取的数据是什么类型。这是因为 C 语言的数据都是有类型的，`scanf()`必须提前知道用户输入的数据类型，才能处理数据。

它的其余参数就是存放用户输入的变量，格式字符串里面有多少个占位符，就有多少个变量。

::: warning 警告

`scanf()`函数中存储数据的变量前面必须加上`&`运算符(指针变量除外)，因为`scanf()`需要的是地址，必须将变量的地址取出来传给`scanf()`函数。

如果这里的变量是数组，那就不用加`&`运算符。

:::

::: warning 注意

`scanf()`函数的占位符后面一般不会加`\n`。

:::

下面是一次从键盘读取多个变量的例子：

```c++
#include <cstdio>
int main() {
    int a, b, c, d;
    scanf("%d%d%d%d", &a, &b, &c, &d);
    printf("a = %d, b = %d, c = %d, d = %d\n", a, b, c, d);
}
```

::: warning 注意

`scanf()`函数中指定的格式和程序输入的数据格式要严格的匹配，否则可能不能得到想要的值。

:::

读取多个变量时也可以读取不同类型的变量：

```c++
#include <cstdio>
int main() {
    int i = 0;
    int j = 0;
    float x = 0;
    float y = 0;
    scanf("%d%d%f%f", &i, &j, &x, &y);
    printf("i = %d, j = %d, x = %f, y = %f\n", i, j, x, y);
}
```

`scanf()` 处理数值占位符时，会自动过滤空白字符，包括空格、制表符、换行符等。所以，用户输入的数据之间，有一个或多个空格不影响`scanf()`解读数据。另外，用户使用回车键，将输入分成几行，也不影响解读。

`scanf()`常用的占位符如下，与`printf()`的占位符基本一致。

| 占位符  |                                      介绍                                      |
| :-----: | :----------------------------------------------------------------------------: |
| **%c**  |                                    **字符**                                    |
| **%d**  |                                    **整数**                                    |
| **%f**  |                              **float 类型浮点数**                              |
| **%lf** |                             **double 类型浮点数**                              |
| **%Lf** |                           **long double 类型浮点数**                           |
| **%s**  |                                   **字符串**                                   |
|   %[]   | 在方括号中指定一组匹配的字符(比如%[0-9])，遇到不在集合之中的字符，匹配将会停止 |

::: warning 注意

除了`%c`以外，都会自动忽略起首的空白字符。`%c`不忽略空白字符，总是返回当前第一个字符，无论该字符是否为空格。

如果要强制跳过字符前的空白字符，可以写成`scanf(" %c", &ch)`，即`%c`前加上一个空格，表示跳过零个或多个空白字符。

:::

::: details `scanf()`处理用户输入的原理

用户的输入先放入缓存，等到按下回车键后，按照占位符对缓存进行解读，解读用户输入时，会从上一次解读遗留的第一个字符开始，直到读完缓存，或者遇到第一个不符合条件的字符为止。

:::

`scanf()`的返回值是一个整数，表示成功读取的变量个数。如果没有读取任何项，或者匹配失败，则返回 0.如果在成功读取任何数据之前，发生了读取错误或者遇到读取到文件结尾，则返回常量 EOF (-1)。

### cin 和 cout

`cin`是 C++中提供的标准输入流对象，一般针对的是键盘，也就是从键盘上输入的字符流，使用`cin`来进行数据的提取，`cin`一般是和`>>`(流提取运算符)配合使用的。`cin`的功能和`scanf()`是类似的。

`cout`是 C++中提供的标准输出流对象，一般针对控制台的窗口，也就是将数据以字符流的形式输出到控制台窗口上显示。`cout`一般是和`<<`(流插入运算符)配合使用的。`cout`的功能和`printf()`是类似的。

`cin`和`cout`的输入输出非常的方便，不需要手动控制格式，能够自动识别变量类型。

::: tip `cin`使用细节

`cin`在读取的时候是根据用户的输入，从前往后，从上往下依次扫面。

`cin`在读取的过程中遇到空格，自动会跳过，使用不要担心在想要的字符前输入空白字符。当一行读取结束的时候，会自动换行，读取下一行的内容。

`cin`后面不可以跟换行`endl`

:::

### scanf()/printf() 和 cin/cout 的对比

`scanf()`和`printf()`是 C 语言中的标准输入输出函数，而`cin`和`cout`是 C++ 语言中的标准输入输出流对象。它们各自有优缺点，整体上来说`cin`和`cout`会更加方便，但有时候我们也不得不使用`scanf()`和`printf()`。

- `scanf()`和`printf()`不能自动识别输入数据的类型，需要手动指定格式字符串，容易出现格式错误。开发者需要确保格式字符串与变量类型匹配，否则会导致未定义行为。

- `cin`和`cout`会根据变量类型自动处理输入输出，避免格式化错误。相对`scanf()`和`printf()`，C++ 的`cin`和`cout`更加易用。

- `scanf()`和`printf()`在格式化输出更精确直观，特别适合复杂格式的输入输出。比如：在要求指定格式输出的时候，`printf()`函数就比`cout`更加方便和灵活。

::: warning 注意

- `cout`默认不会输出六位小数，自动忽略小数点后多余的`0`，`printf()`函数打印浮点数的时候，小数点默认打印 6 位。

- `cout`在输出的时候不需要指定格式，`printf()`则需要明确的格式。

:::

- `scanf()`和`printf()`通常比`cin`和`cout`快。

::: tip 原因

`cin`和`cout`由于要考虑兼容 C 语言的输入和输出，封装实现的更加复杂，通常比`scanf()`和`printf()`稍慢，但这种差异在大多数应用场景中可以忽略不计。

但是在竞赛的题目中，尤其是当输入输出数据量较大时，使用`cin`和`cout`完成输入输出，经常会出现`Time Limit Exceeded`的情况。而`scanf()`和`printf()`就不存在类似的问题。

:::

### puts()

`puts()`函数用于将字符串输出到标准输出（通常是屏幕）。它会在字符串末尾自动添加一个换行符。

```c++
puts(""); // 换行
```

## 条件判断与循环

### 悬空 else

如果有多个 if 和 else，else 总是跟最接近的 if 匹配：

```c++
int a = 0, b = 2;
if(a == 1)
    if(b == 2)
        cout << "hehe" << endl;
else
    cout << "haha" << endl;
```

以上代码无输出。

### 浮点数比较相等

在比较浮点数时，由于浮点数在计算机中是以有限精度表示，也就是说有些浮点数在内存中其实无法精确保存，这可能导致浮点数比较中的一些精度误差问题。

如果直接使用`==`来比较两个浮点数，很可能会由于这些微小的误差导致不准确的结果。

这时候就要允许有误差存在，常见的写法如下：

```c++
#include <iostream>
#include <cmath>

using namespace std;

int main() {
    double a = 0.1;
    double b = 0.2;
    double c = 0.3;
    if (fabs((a + b) - c) < 1e-9) // 1e-9 表示允许的误差范围
        cout << "a + b 约等于 c" << endl;
    else
        cout << "a + b 不等于 c" << endl;
}
```

### 范围 for

打印数组元素除了可以使用 while、do-while、for 三种循环外，还有一个更方便的方式：使用范围`for`。范围 for 是在`C++11`这个标准中引入的，如果你使用的编译器默认不支持`c++11`，可能需要配置才能使用。

范围 for 的语法如下：

```c++
for( 类型 变量名 : 数组名)
    语句 // 多条语句需要加大括号
```

**示例**：打印数组

```c++
#include <iostream>
using namespace std;

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    for(int e : arr)
        cout << e << " ";
}
```

::: warning 注意

这里的`e`是单独的一个变量，不是数组的元素，所以对`e`的修改，不会影响数组。

:::

### auto 关键字

`auto`的主要用途是让编译器自动推导出变量的类型的，比如：

```c++
auto a = 10;
auto ch = 'A';
int arr[5] = {1, 2, 3, 4, 5};

for(auto e : arr)
     cout << e << " ";
```

## 数组

### memset() 设置数组内容

`memset()`是用来设置内存的，将内存中的值**以字节为单位**设置成想要的内容，需要头文件`<cstring>`。

函数原型如下：

```c++
void *memset(void *ptr, int value, size_t num)
```

- **ptr**：指向了要设置的内存块的起始位置

- **value**：要设置的值

- **num**：设置的字节个数

**示例**：设置数组内容：

```c++
#include <iostream>
#include<cstring>
using namespace std;

int main() {
    char str[] = "hello world";
    memset(str, 'x', 5);
    cout << str << endl;

    int arr[5] = {1, 2, 3, 4, 5};
    memset(arr, 0, sizeof(arr));
    for(int e : arr)cout << e << " ";
}

```

### memcpy() 拷贝数组内容

C++中有一颗库函数`memcpy()`可以做数组内容的拷贝。虽然`memcpy()`其实是用来做内存块的拷贝的，当然用来做数组内容的拷贝也是没问题的。`memcpy()`需要的头文件是`<cstring>`。

函数原型如下：

```c++
void *memcpy(void *dest, const void *src, size_t num)
```

- **dest**：目标空间的起始地址

- **src**：源数据空间的起始地址

- **num**：拷贝的数据的字节个数

**代码示例**：

```c++
#include <iostream>
#include <cstring>
using namespace std;

int main() {
    char a[10] = {1,2,3,4,5,6,7,8,9,10}
    char b[10] = {0};
    memcpy(b, a, 10 * sizeof(int));
}
```

### strlen() 字符串长度

字符数组中存放着的字符串，这个字符数组有自己的长度，也就是数组的元素个数，这个可以使用`sizeof()`计算。要想计算数组中存放的字符串的长度，可以使用 C/C++中的一个库函数`strlen()`，其实统计的就是字符串中 **\0** 之前的字符个数。需要的头文件是`<cstring>`。

```c++
size_t strlen(const char *str)
```

- **str**：指针，存放的是字符串的起始地址，从这个地址开始计算字符串的长度

**代码示例**：

```c++
#include <iostream>
#include <cstring>
using namespace std;

int main() {
    char str[20] = "hello world";
    cout << strlen(str) << endl;
    cout << sizeof(str) << endl;
}
```

### 字符数组的输入

当输入没有空格字符的字符串时，使用`scanf()`和`cin`来实现均可：

::: code-group

```c++ [scanf()]
char arr[20] = { 0 };
scanf("%s", arr);
printf("%s", arr);
```

```c++ [cin]
char arr[20] = { 0 };
cin >> arr;
cout << arr;
```

:::

当输入的字符串中有空格时，`scanf()`和`cin`正常情况下均无法正常读取。

::: warning 注意

占位符`%s`其实不能简单地等同于字符串。它的规则时，从当前第一个非空白字符开始读起，直到遇到空白字符(即空格、换行符、制表符等)为止。

因为`%s`的读取不会包含空白字符，所以无法用来读取多个单词，除非多个`%s`一起使用。这也意味着，`scanf()`不适合读取可能包含空格的字符串，比如书名或歌曲名。

另外有一个细节，`scanf()`遇到`%s`占位符，会在字符串变量末尾存储一个`\0`字符。

同时`scanf()`将字符串读入字符数组时，不会检测字符串是否超过了数组长度。所以，储存字符串时，很可能会超过数组的边界，导致意想不到的结果。为了放置这种情况，使用`%s`占位符时，可以指定读入字符串的最长长度，即写成`%[m]s`，其中的`[m]`是一个整数，表示读取字符串的最大长度，后面的字符将被丢弃。

:::

::: warning 注意

其实`cin`在读取一个字符串的时候，遇到空白字符的时候，就认为字符串结束了，不再继续往后读取剩余的字符，同时将已经读取到的字符串末尾加上`\0`，直接存储起来。

:::

**解决方案 1**

使用`gets()`函数的方式，这种方式能解决问题。但是因为`gets()`存在安全性问题，在 C++11 中取消了`gets()`，给出了更加安全的方案：`fgets()`。

```c++
char *gets(char *str)
char *fgets(char *str, int num, FILE *stream)
```

- **gets()** : 从第一个字符开始读取，一直读到`\n`停止，但是不会读取`\n`，也就是读取到的内容中没有包含`\n`，但是会在读取到的内容后自动加上`\0`。

- **fgets()** : 也是从第一个字符开始读取，最多读取`num-1`个字符，最后一个位置留给`\0`，如果`num`的长度是远大于输入的字符串长度，就会一直读取到`\n`停止，并且会读取`\n`，将`\n`作为读取到内容的一部分，同时在读取到的内容后自动加上`\0`。

::: code-group

```c++ [gets()]
#include<cstdio>

int main(){
    char arr[20] = {0};
    gets(arr);
    printf("%s\n", arr);
}
```

```c++ [fgets()]
#include<cstdio>

int main(){
    char arr[20] = {0};
    fgets(arr, sizeof(arr), stdin);
    printf("%s\n", arr);
}

```

:::

**解决方案 2**

C 语言中使用`scanf()`函数其实也能做到读取带有空格的字符串，只是不常见而已。方式就是将`%s`改成`%[^\n]s`，其中在`%`和`s`之间加上了`[^\n]`，意思是一直读取，直到遇到`\n`，这样即使遇到空格也就不会结束了。

这种方式读取，不会将`\n`读取进来，但是在读取到的字符串末尾加上`\0`。

```c++
#include<cstdio>

int main(){
    char arr[20] = {0};
    scanf("%[^\n]s", arr);
    printf("%s\n", arr);
}

```

::: tip 提示

`%[^\n]s`也可写成`%[^\n]`

:::

**解决方案 3**

使用`getchar()`逐个字符的读取，也是可以读取一个字符串的。

```c++
#include<iostream>
#include<cstdio>
using namespace std;

int main() {
    char arr[20] = { 0 };
    int ch = 0;
    int i = 0;
    while ((ch = getchar()) != '\n') {
        arr[i] = ch;
        i++;
    }
    cout << arr << endl;
}
```

### strcpy() 和 strcat()

C/C++中有一个库函数叫`strcpy()`，可以将字符数组进行复制。包含在头文件`<cstring>`中。函数原型如下：

```c++
char *strcpy(char *dest, const char *src)
```

- **dest**：目标空间的地址

- **src**：源头空间的地址

代码演示：

```c++
#include<cstdio>
#include<cstring>

int main(){
    char arr1[] = "hello";
    char arr2[10] = {0};
    strcpy(arr2, arr1);
    printf("%s\n", arr2);
}
```

有时候我们需要在一个字符串的末尾再追加一个字符串，C/C++中的头文件`<cstring>`中有一个库函数叫`strcat()`可以完成，函数原型如下：

```c++
char *strcat(char *dest, const char *src)
```

- **dest**：目标空间的地址

- **src**：源头空间的地址

代码演示：

```c++
#include<cstdio>
#include<cstring>

int main(){
    char arr1[20] = "hello";
    char arr2[] = "world";
    strcat(arr1, arr2);
    printf("%s\n", arr1);
}
```

## 函数

### 函数传参

在使用函数解决问题的时候，难免会将数组作为参数传递给函数，在函数内部对数组进行操作。我们需要知道数组传参的几个重点知识：

- 函数的实参是数组，形参也写成数组形式的

- 形参如果是一维数组，数组大小可以省略不写

- 形参如果是二维数组，行可以省略，但是列不能省略

- **形参操作的数组和实参的数组是同一个数组**

```c++
void set_array(int arr[], int sz) {
    for (int i = 0; i < sz; i++) {
        arr[i] = -1;
    }
}

int main() {
    int arr[10] = { 0 };
    set_array(arr, 10);
}
```

那如果将字符串做函数参数呢？其实也很简单，直接在形参的部分使用字符串来接受就可以。这里的形参也是实参的一份临时拷贝，对形参的修改不能影响实参。

```c++
void test(string s) {
    s = "hehe";
    cout << s << endl;
}

int main() {
    string s = "hello world";
    test(s);
    cout << s << endl;
}
```

## 结构体

### 结构体类型声明和变量定义

结构体类型声明的关键字是`struct`。结构体类型声明的基本语法如下：

```c++
struct struct_name {
    结构体成员变量列表; // 成员变量可以有 1 个，也可以有多个
    结构体成员函数; // 成员函数可以有，也可以没有
} 结构体变量列表; // 在声明结构体类型的同时，创建结构体变量，可以有多个，中间使用逗号隔开
```

### 结构体变量的特点

结构体变量的初始化和数组类似，使用`{}`，将初始化的内容按照顺序放在`{}`中就可以。

```c++
struct Stu {
    string name;
    int age;
}

int main() {
    Stu s1 = {"张三", 18};
    struct Stu s2 = {"李四", 21};
}
```

结构体变量中虽然包含多个成员，而且成员可能是不同类型的。但是一个结构体变量可以看做一个整体，是可以直接进行赋值操作的。

```c++
struct s2 = s1;
```

### 结构体的成员函数

C++中的结构体除了有成员变量之外，还可以包含成员函数。

C++的结构体会有一些默认的成员函数，比如：构造函数、析构函数等，是编译器默认生成的，如果觉得不合适，也是可以自己显式定义这些函数。这些函数都是自动调用，不需要手动调用。

除了默认的成员函数之外，我们可以自己定义一些成员函数，可以有，也可以没有，完全根据实际的需要来添加就可以。这些成员函数可以**直接访问成员变量**。

```c++
struct Stu {
    string name;
    int age;
    void print() {
        cout << name << " " << age << endl;
    }
};
```

### 结构体的运算符重载

弱国想要针对自定义结构体使用`cout`和`<<`来输出变量的内容，就得对`<<`这个输出运算符进行重载。具体代码如下：

```c++
ostream& operator<<(ostream& os, const Stu& s) {
    os << s.name << " " << s.age << endl;
    return os;
}
```

### sort()

C++的 STL 中的库函数`sort()`，可以直接用来排序数据，在算法竞赛和日常开发中使用非常频繁。只要涉及到数据的排序，又没有明确要求自己实现排序算法的时候，就可以直接使用`sort()`函数。`sort()`函数需要包含的头文件是`<algorithm>`。函数原型如下：

```c++
// 版本1：
template <class RandomAccessIterator>
void sort(RandomAccessIterator first, RandomAccessIterator last);
// void sort(开始位置, 结束位置);
// first: 指向要排序范围的第一个元素的迭代器或者指针。
// last: 指向要排序范围的最后一个元素之后位置的迭代器或者指针。

// 版本2：
template <class RandomAccessIterator, class Compare>
void sort(RandomAccessIterator first, RandomAccessIterator last, Compare comp);
// void sort(开始位置, 结束位置, 自定义排序函数);
// first: 指向要排序范围的第一个元素的迭代器或者指针。
// last: 指向要排序范围的最后一个元素之后位置的迭代器或者指针。
// comp: 是一个比较函数或者函数对象。可以是函数，也可以是仿函数。
```

**对数组进行排序：**

```c++
#include<iostream>
#include<algorithm>
using namespace std;

int main() {
	int arr[] = { 4,5,6,9,7,1,2,8,5,4,2 };
	int sz = sizeof(arr) / sizeof(arr[0]);
	sort(arr, arr + sz);
	for (auto i : arr)cout << i << " ";
}
```

**对字符串中的字符进行排序：**

```c++
#include<iostream>
#include<algorithm>
#include<string>
using namespace std;

int main() {
	string s = "defxxxabccba";
	sort(s.begin(), s.end());
	cout << s;
}
```

::: tip 提示

默认排序的结果是升序。

:::

如果想要按照降序排序，或是对结构体类型数据进行排序，就使用版本 2。

```c++
void sort(RandomAccessIterator first, RandomAccessIterator last, Compare comp);
```

- **compare** : 是一个可选的自定义比较函数（或函数对象），用于指定排序的规则。如果不提供这个参数，`std::sort`默认会使用小于运算符`<`来比较元素，并按照升序排序。这个比较函数，接受两个参数，并返回一个布尔值。如果第一个参数应该排在第二个参数之前，则返回`true`；否则返回`false`。

**创建比较函数进行比较：**

```c++
#include<iostream>
#include<algorithm>
using namespace std;

bool compare(int x, int y) {
	return x > y; // 降序
}

int main() {
	int arr[] = { 4,5,6,9,7,1,2,8,5,4,2 };
	int sz = sizeof(arr) / sizeof(arr[0]);
	sort(arr, arr + sz, compare);
	for (auto i : arr)cout << i << " ";
}
```

**创建仿函数进行比较：**

```c++
#include<iostream>
#include<algorithm>
using namespace std;

struct Cmp {
	bool operator()(int x, int y) {
		return x > y; // 降序
	}
}cmp;

int main() {
	int arr[] = { 4,5,6,9,7,1,2,8,5,4,2 };
	int sz = sizeof(arr) / sizeof(arr[0]);
	sort(arr, arr + sz, cmp);
	for (auto i : arr)cout << i << " ";
}
```

**排序结构体数据：**

```c++
#include<iostream>
#include<algorithm>
#include<string>
using namespace std;

struct S {
	string name;
	int age;
};

bool cmp_s_by_name(S s1,S s2) {
	return s1.name < s2.name;
}

int main() {
	S arr[] = { {"zhangsan",20},{"lisi",25},{"wangwu",18} };
	int sz = sizeof(arr) / sizeof(arr[0]);
	sort(arr, arr + sz, cmp_s_by_name);
	for (S i : arr)cout << i.name << ":" << i.age << endl;
}
```

## 随机数

### srand()

`srand()`函数，用于设置随机数种子。这个函数的参数是一个整数，这个整数作为随机数种子，用于生成随机数。包含在`<cstdlib>`头文件中。

```c++
#include<ctime>
#include<cstdlib>

int main() {
    srand(time(0)); // 种下一个随机数种子
}
```

### rand()

`rand()`函数，用于生成一个随机数。这个函数返回一个整数，这个整数是随机数，通常与`srand()`搭配使用。包含在`<cstdlib>`头文件中。

```c++
#include<iostream>
#include<ctime>
#include<cstdlib>
using namespace std;

int main() {
	srand(time(0));
	int r1 = rand();
	int r2 = rand();
	cout << r1 << endl;
	cout << r2 << endl;
}
```

也可以指定生成随机数的区间：

```c++
rand() % (right - left + 1) + left // 在 [left, right] 区间内，随机选择一个数
```

## 特殊技巧

### 含空格字符串的特殊处理方式

根据我们现在掌握的知识，含空格的字符串，如要读取，有`fgets()`、`scanf()`、`getchar()`、`getline()`四种方式。但是有时候，根据题目的情况，不一定非要完整的读取这个带空格的字符串，而是将字符串中空格隔开的每一个字符，当作一个单词处理更方便，也避免了读取带空格的各种问题。

**练习：统计数字字符个数**

::: code-group

```c++ [解法1.cpp]
// 读取整个带空格的字符串分析
#include<iostream>
#include<string>
using namespace std;

int main() {
	string s;
	getline(cin, s);
	int count = 0;
	for (auto ch : s) {
		if (ch >= '0' && ch <= '9')count++;
	}
	cout << count;
}
```

```c++ [解法2.cpp]
// 按照多个单词分析
#include<iostream>
#include<string>
using namespace std;

int main() {
	string s;
	int count = 0;
	while (cin >> s) {
		for (auto c : s) {
			if (c >= '0' && c <= '9')count++;
		}
	}
	cout << count;
}
```

:::

### 数字的特殊处理方式

当我们程序运行的时候，在控制台输入`123`的时候，这是的`123`是一个字符序列，程序会根据代码中的数据类型，可能将`123`解析成整型，也可能将`123`解析成字符串。比如：

```c++
int num = 0;
cin >> num; // 输入123，就被解析成整数

string s;
cin >> s; // 输入123，就被解析成字符串
```

这里的解析的方式，主要是依赖编译器对变量类型的识别，根据类型再将读取字符串数据转化成对应类型的数据。我们在写代码的时候，应该根据实际的情况，来决定如何处理输入的内容。

**练习：将数字中的奇数位变为 1，偶数位变为 0**

::: code-group

```c++ [解法1.cpp]
#include<iostream>
using namespace std;

int main() {
	int n, i = 0, ret = 0;
	cin >> n;
	while (n) {
		if (n % 10 % 2)ret += 1 * pow(10, i);
		else ret += 0 * pow(10, i);
		n /= 10;
		i++;
	}
	cout << ret;
}
```

```c++ [解法2.cpp]
#include<iostream>
#include<string>
using namespace std;

int main() {
	string s;
	cin >> s;
	for (int i = 0; i < s.size(); i++) {
		if (s[i] % 2)s[i] = '1';
		else s[i] = '0';
	}
	cout << stoi(s);
}
```

:::

### 优化 cin 和 cout

C++ 中为了支持混合使用`cin` `cout`和`scanf()` `printf()`，C++ 标准库默认会将`cin`、`cout`等 C++ 流对象与`stdin`、`stout`等 C 标准库的流对象同步在一起。这种同步操作意味着每次使用`cin`或`cout`时，都会自动刷新 C 标准库的缓冲区，以确保 C++ 和 C 的 I/O 操作是一致的。这就导致了性能的下降。

在默认情况下，`cin`和`cout`之间存在一种绑定关系。这种绑定意味着，每当从`cin`读取数据时，任何之前通过`cout`输出的内容都会被强制刷新到屏幕上。这种绑定也可能导致性能问题，特别是在需要频繁读取大量数据的情况下。

如果想要对`cin`进行优化，就需要加入以下代码：

```c++
ios::sync_with_stdio(false); // 取消给 C 语言输入输出缓冲区的同步
cin.tie(nullptr);// 取消了 cin 和 cout 的绑定
```
