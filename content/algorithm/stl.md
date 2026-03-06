# STL

::: danger 警告
该页面尚未完工!
:::

::: details 目录

[[toc]]

:::

## 什么是 STL

STL 即标准模板库(Standard Template Library)，是 C++标准库的一部分，里面包含了一些模板化的通用的数据结构和算法。由于其模板化的特点，它能够兼容自定义的数据类型，避免大量的造轮子工作。

NOI 和 ICPC 赛事都支持 STL 库的使用，蓝桥杯也是支持的。因此，一定要学习 STL 的使用，能够极大的提高编写代码的效率。

STL 的实现涉及比较高深的 C++ 知识，比如类、模板、容器适配等。如果想搞清楚背后的原理，就必须要学会这些知识。仅需做到：对于 STL 中一些的数据结构和算法，知道有这个东西，并且知道如何使用，以及会有什么效果。

## 字符串-string

`string`字符串其实是一种更加高级的封装，`string`字符串中包含大量的方法，这些方法使得字符串的操作变得更加简单。

C++ 中将字符串直接作为一种类型，也就是`string`类型，使用`string`类型创建的对象就是 C++ 的字符串。

```c++
string s1;
string s2 = "hello world";
```

使用 C++ 中提供的`string`时，必须添加头文件`<string>`。

### 创建字符串

|            方式             |         解释         |
| :-------------------------: | :------------------: |
|         `string s1`         |   创建一个空字符串   |
| `string s2 = "hello world"` | **创建字符串(常用)** |

除了以上创建字符串的写法外，C++ 中还有一些其他的创建字符串方式，如：

```c++
string s3("hello world");
string s4 = s3;
```

::: warning 注意

`string`类型内的字符串不再以`\0`作为结束标志了。

:::

### 字符串输入

可以直接使用`cin`给`string`类型的字符串中输入一个字符串的数据，但无法正常读取带空格的字符串。

`getline()`是头文件`<string>`中定义的函数，用于从输入流中读取**一行文本**，并将其存储为字符串。

`getline()`函数有两种不同的形式，分别对应着字符串的结束方式。

第一种`getling()`函数以换行符`\n`作为字符串的结束表示，它的一般格式是：

```c++
istream& getline(istream& is, string& str);
```

- **cin** : 表示从输入流中读取信息

- **str** : 存放读取到的信息的字符串

第二种`getline()`函数允许用户自定义结束标志，它的一般格式是：

```c++
istream& getline(istream& is, string& str, char delim);
```

- **cin** : 表示从输入流中读取信息

- **str** : 存放读取到的信息的字符串

- **delim** : 自定义的结束标志

::: tip 提示

`istream`是输入流类型，`cin`是`istream`类型的标准输入流对象。

`ostream`是输出流类型，`cout`是`ostream`类型的标准输出流对象。

`getline()`函数是输入流中读取一行文本信息，所有如果是在标准输入流(键盘)中读取数据，就可以传`cin`给第一个参数。

:::

### size()

`<string>`中提供了`size()`函数用于获取字符串长度。

使用示例：

```c++
string s = "hello world";
cout << s.size() << endl;
```

::: warning 注意

`string`类型的字符串是可以通过下标访问的，比如`s[i]`

:::

### 迭代器

迭代器是一种对象，它可以用来遍历容器(`string`)中的元素，迭代器的作用类似于指针，或者数组下标。

C++中的`string`提供了多种迭代器，用于遍历和操作字符串中的内容。常用的迭代器有：

- `begin()`：返回指向字符串第一个字符的迭代器，需要一个迭代器的变量来接收。

- `end()`：返回指向字符串最后一个字符的下一个位置的迭代器(该位置不属于字符串)。

`string`中`begin()`和`end()`返回的迭代器的类型是`string::iterator`。

```c++
string s = "abc";
string::iterator it1 = s.begin();
string::iterator it2 = s.end();
cout << *it1;
```

::: warning 注意

访问迭代器指向的值，需要解引用`*`。

:::

::: tip 提示

- 迭代器是可以进行大小比较，也可以进行 + 或者 - 整数运算的。比如：`it++`，就是让迭代器前进一步，`it--` 就是让迭代器后退一步。

- 同一个容器的两个迭代器也可以相减，相减结果的绝对值，是两个迭代器中间元素的个数。

:::

迭代器通常用于遍历字符串，可以正序遍历，也可以逆序遍历。

```c++
string s = "hello world";
// 正序遍历
for (string::iterator it = s.begin(); it != s.end(); it++) {
    cout << *it;
}
```

::: warning 注意

通过迭代器找到元素后，改变迭代器指向的元素，是可以直接改变字符串内容的。

:::

### push_back()

`push_back()`函数用于在字符串(包括空字符串)尾部插入一个字符。

```c++
string s = "hello";
s.push_back(' ');
s.push_back('w');
s.push_back('o');
s.push_back('r');
s.push_back('l');
s.push_back('d');
cout << s << endl;
```

### 字符串的 += 和 + 运算

`push_back()`是用于在字符串后添加一个字符，然而部分情况下我们需要向原有的字符串后继续添加字符串。其实`string`类型的字符串是支持`+`和`+=`运算的。这里的本质是`string`中重载了`operator+=`这个操作符。

```c++
string s = "hello";
s += " world";
cout << s << endl;
```

### pop_back()

`pop_back()`用于删除字符串中尾部的一个字符。这个成员函数是在`c++11`标准中引入的，有些编译器可能不支持。

```c++
string s = "helloX";
s.pop_back();
cout << s << endl;
```

### insert()

`insert()`函数用于在字符串中间的某个位置插入一个字符或者字符串。函数原型如下：

```c++
string& insert(size_t pos, const string& str); // pos位置前面插入一个 string 字符串
string& insert(size_t pos, const char* s); // pos位置前面插入一个 C 风格的字符串
string& insert(size_t pos, size_t n, char c); // pos位置前面插入 n 个字符 c
```

```c++
string s = "hello world";

// 插入一个字符串 X
string s1 = "X";
s.insert(5, s1);

// 插入一个 C 风格的字符串 X
s.insert(5, "X");

// 插入 n 个字符 c
s.insert(5, 2, 'X');
```

### find()

`find()`函数用于查找字符串中指定字串/字符，并返回子串/字符在字符串中第一次出现的位置。函数原型如下：

```c++
size_t find(const string& str, size_t pos = 0) const;
// 查找 string 类型的字符串 str，默认是从头开始，pos可以指定位置开始

size_t find(const char* s, size_t pos = 0) const;
// 查找 C 风格的字符串 s，默认是从头开始，pos可以指定位置开始

size_t find(const char* s, size_t pos, size_t n) const;
// 在字符串的 pos 这个位置开始查找 C 风格的字符串 s 中的前 n 个字符

size_t find(char c, size_t pos = 0) const;
// 查找字符 c，默认是从头开始，pos可以指定位置开始
```

**对于返回值** :

- 若找到，返回字串/字符在字符串中第一次出现的起始下标位置。

- 若未找到，返回一个整数值`npos`。通常判断`find()`函数的返回值是否等于`npos`就能直到是否查找到字串或者字符。

```c++
string s = "hello world";

// 查找字符串 hello
string s1 = "hello";
cout<< s.find(s1) << endl;

// 查找 C 风格的字符串 hello
cout << s.find("hello") << endl;

// 查找 C 风格的字符串的前 3 个字符
cout << s.find("hello everyone", 0, 3) << endl;

// 查找字符 w
cout << s.find('w') << endl;

```

::: tip 提示

`npos`并不是一个随机的数字，而是`string`中定义的一个静态常量`npos`。

```c++
static const size_t npos = -1;
```

:::

### substr()

`substr()`函数用于截取字符串中指定位置指定长度的字串。函数原型如下：

```c++
string substr(size_t pos = 0, size_t len = npos) const;
```

- `pos` : 开始截取的位置，默认从 0 开始。

- `len` : 截取的长度，默认一直截取到字符串末尾。

常见有三种用法：

- `substr()` : 如果函数不传参数，就是从下标为 0 的位置开始截取，直到结尾，得到的是整个字符串；

- `substr(pos)` : 从指定下标`pos`位置开始截取字串，直到结尾；

- `substr(pos, len)` : 从指定下标`pos`位置开始截取长度为`len`的字串。

**返回值类型** : `string`，返回的是截取到的字符串，可以使用`string`类型的字符串接收。

```c++
string s = "hello world";
string s1 = s.substr(0, 3);
string s2 = s.substr(3);
cout << s << endl;
cout << s1 << endl;
cout << s2 << endl;
```

::: warning 注意

`substr()`不会修改原字符串。

:::

`substr()`和`find()`经常是配合使用的，`find()`负责找到位置，`substr()`从这个位置向后获得字符串。

```c++
string s = "hello world hello everyone";
size_t n = s.find("world");
string s1 = s.substr(n, 11);
cout << s1 << endl;
```

### string 的关系运算

两个`string`类型字符串可以比较大小，C++中为`string`提供了一系列的关系运算。

```c++
string s1 = "abc";
string s2 = "abcd";
char s3[] = "abcdef"; // C 风格的字符串

// s1 == s2
bool operator==(const string& lhs, const string& rhs);// 使用方式：s1 == s2
bool operator==(const char* lhs, const string& rhs);// 使用方式：s3 == s1
bool operator==(const string& lhs, const char* rhs);// 使用方式：s1 == s3

// s1 != s2
bool operator!=(const string& lhs, const string& rhs);// 使用方式：s1 != s2
bool operator!=(const char* lhs, const string& rhs);// 使用方式：s3 != s1
bool operator!=(const string& lhs, const char* rhs);// 使用方式：s1 != s3

// s1 < s2
bool operator<(const string& lhs, const string& rhs);// 使用方式：s1 < s2
bool operator<(const char* lhs, const string& rhs);// 使用方式：s3 < s1
bool operator<(const string& lhs, const char* rhs);// 使用方式：s1 < s3

// s1 <= s2
bool operator<=(const string& lhs, const string& rhs);// 使用方式：s1 <= s2
bool operator<=(const char* lhs, const string& rhs);// 使用方式：s3 <= s1
bool operator<=(const string& lhs, const char* rhs);// 使用方式：s1 <= s3

// s1 > s2
bool operator>(const string& lhs, const string& rhs);// 使用方式：s1 > s2
bool operator>(const char* lhs, const string& rhs);// 使用方式：s3 > s1
bool operator>(const string& lhs, const char* rhs);// 使用方式：s1 > s3

// s1 >= s2
bool operator>=(const string& lhs, const string& rhs);// 使用方式：s1 >= s2
bool operator>=(const char* lhs, const string& rhs);// 使用方式：s3 >= s1
bool operator>=(const string& lhs, const char* rhs);// 使用方式：s1 >= s3

```

字符串的比较是基于字典序进行的，比较是对应位置上字符的 ASCII 值的大小；比较的不是字符串的长度。比如：

```markdown
"abc" < "aq"
"abcdef" < "ff"
"100" < "9"
```

### `stoi()`/`stol()`

- `stoi()`是将字符串转换成`int`类型的值

- `stol()`是将字符串转换成`long int`类型的值

函数原型如下：

```c++
int stoi(const string& str, size_t* idx = 0, int base = 10);
long int stol(const string& str, size_t* idx = 0, int base = 10);
```

- `str` : 表示被转换的`string`类型的字符串

- `idx` : 是一个输出型参数，也就是通过这个参数会带会一个值。`idx`是一个指针，需要在外边创建一个`size_t`类型的值，传递它的地址给`idx`，这个参数将会带回`str`中无法正确匹配数字的第一个字符的位置。

- `base` : 表示被解析的字符串中数字的进制值，可能是`2`、`8`、`10`、`16`或者`0`。默认情况下这个值是`10`，表示十进制数字；如果传递的是`2`，表示被解析的字符串中是二进制的数字，最终会转换成十进制的；如果传递的是`0`，会根据字符串的内容的信息自动推导进制，比如：字符串中有`0x`，就认为是十六进制，`0`开头会被认为是八进制，最终会转换成十进制。

```c++
string s = "11x22";
size_t pos = 0;
int r = stoi(s, &pos, 10);
cout << r << endl;
cout << pos << endl;
```

::: tip 提示

如果不想传递`idx`参数，可以传递`0`或者`NULL`。如`stoi(s, NULL, 10)`。

:::

### `stod()`/`stof()`

`stod()`是将字符串转换成`double`类型的值，`stof`是将字符串转换成`float`类型的值。和`stoi()`函数比较的话，少了描述字符串中数字进制的参数，其他参数一致。函数原型如下：

```c++
double stod(const string& str, size_t* idx = 0);
float stof(const string& str, size_t* idx = 0);
```

### `to_string()`

`to_string()`函数可以将数字转换成字符串，包括整型、浮点型等。函数原型如下：

```c++
string to_string(int val);
string to_string(long val);
string to_string(long long val);
string to_string(unsigned val);
string to_string(unsigned long val);
string to_string(unsigned long long val);
string to_string(float val);
string to_string(double val);
string to_string(long double val);
```

使用示例如下：

```c++
string pi = "pi is " + to_string(3.14);
```

## 动态顺序表-vector

如果需要使用动态顺序表，C++ 的 STL 提供了一个已经封装好的容器-`vector`。有的地方也叫做可变长的数组。`vector` 的底层就是一个会自动扩容的顺序表，其中创建以及增删改查等等的逻辑已经实现好了，并且也完成了封装。

### 创建 vector

```c++
#include<vector>

int main() {
	std::vector<int> a1;
    std::vector<int> a2(10);
    std::vector<int> a3(10, 2);
    std::vector<int> a4 = { 1,2,3,4,5 };
}
```

以上代码创建了:

- 一个名字为 a1 的可变长数组，里面都是 int 类型的数据；

- 一个名字为 a2 的可变长数组，大小为 10；

- 一个名字为 a3 的可变长数组，大小为 10，里面的值都初始化为 2。

- 一个名字为 a4 的可变长数组，里面有 5 个数据，数据初始化为 1,2,3,4,5。

::: tip 提示

`<>`里面可以存放任意的数据类型，包括结构体 struct、字符串 string、顺序表 vector 等等。

:::

::: warning 注意

`vector<int> a[N]`创建了一个大小为 N 的 vector 数组。

:::

### size()/empty()

- `size()`: 返回实际元素的个数；

- `empty()`: 返回顺序表是否为空。如果为空：返回 true，否则返回 false。

```c++
#include<iostream>
#include<vector>
using namespace std;

void print(vector<int>& a) {
	for (int i = 0; i < a.size(); i++)cout << a[i] << " ";
	cout << endl;
}

int main() {
	std::vector<int> a = { 1,2,3,4,5 };
	print(a);
	cout << a.size() << " " << a.empty();
}
```

### begin()/end()

- `begin()`: 返回起始位置的迭代器（左闭）；

- `end()`: 返回终点位置的下一个位置的迭代器（右开）。

利用迭代器可以访问整个`vector`，存在迭代器的容器就可以使用范围 for 遍历。

::: code-group

```c++ [写法1]
// 利用迭代器来遍历
void print(vector<int>& a) {
	for (vector<int>::iterator it = a.begin(); it != a.end(); it++)cout << *it << " ";
	cout << endl;
}
```

```c++ [写法2]
// 利用范围 for 来遍历
void print(vector<int>& a) {
	for (auto x : a)cout << x << " ";
	cout << endl;
}
```

:::

### push_back()/pop_back()

- `push_back()`: 在顺序表尾部添加一个元素；

- `pop_back()`: 删除顺序表尾部的一个元素。

> 当然还有`insert()`和`erase()`。不过由于事件复杂度过高，尽量不使用。

```c++
#include<iostream>
#include<vector>
using namespace std;

void print(vector<int>& a) {
	for (auto x : a)cout << x << " ";
	cout << endl;
}

int main() {
	std::vector<int> a = { 1,2,3,4,5 };
	print(a);
	a.pop_back();
	print(a);
	a.push_back(6);
	print(a);
}
```

### front()/back()

- `front()`: 返回顺序表第一个元素；

- `back()`: 返回顺序表最后一个元素。

```c++
#include<iostream>
#include<vector>
using namespace std;

int main() {
	std::vector<int> a = { 1,2,3,4,5 };
	cout << a.front() << " " << a.back();
}
```

### resize()

- `resize()`: 修改顺序表的大小。

- 如果大于原始的大小，多出来的位置会补上默认值，一般是 0。

- 如果小于原始的大小，相当于把后面的元素全部删掉。

```c++
#include<iostream>
#include<vector>
using namespace std;

void print(vector<int>& a) {
	for (auto x : a)cout << x << " ";
	cout << endl;
}

int main() {
	std::vector<int> a(4,4);
	print(a);
	a.resize(3);
	print(a);
	a.resize(6);
	print(a);
}
```

### clear()

- `clear()`: 清空顺序表。

```c++
#include<iostream>
#include<vector>
using namespace std;

void print(vector<int>& a) {
	for (auto x : a)cout << x << " ";
	cout << endl;
}

int main() {
	std::vector<int> a(4,4);
	print(a);
	a.clear();
	print(a);
}
```

## 双向链表-list

## 栈-stack

### 创建 stack

```c++
#include<stack>

int main() {
	std::stack<int> a;
}
```

`T`可以是任意类型的数据。

### size()/empty()

- `size()`: 返回栈里实际元素的个数；

- `empty()`: 栈是否为空。如果为空：返回 true，否则返回 false。

### push()/pop()

- `push()`: 往栈里添加一个元素；

- `pop()`: 删除栈顶的一个元素。

### top()

- `top()`: 返回栈顶元素，但是不会删除栈顶元素。

```c++
#include<iostream>
#include<stack>
using namespace std;

int main() {
	stack<int> st;
	for (int i = 1; i <= 10; i++)st.push(i);
	while (st.size()) {
		cout << st.top() << endl;
		st.pop();
	}
}
```

## 队列-queue

### 创建 queue

```c++
#include<queue>

int main() {
	std::queue<int> a;
}
```

### size()/empty()

- `size()`: 返回队列里实际元素的个数；

- `empty()`: 队列是否为空。如果为空：返回 true，否则返回 false。

### push()/pop()

- `push()`: 往队列里添加一个元素；

- `pop()`: 删除队列头一个元素。

### front()/back()

- `front()`: 返回队头元素，但不会删除；

- `back()`: 返回队尾元素，但不会删除。

## 双端队列-deque

::: danger 警告
该部分尚未完工!
:::

## 优先队列-priority_queue

::: danger 警告
该部分尚未完工!
:::

## 集合-set

::: danger 警告
该部分尚未完工!
:::

## 红黑树-map

::: danger 警告
该部分尚未完工!
:::

## 哈希表-unordered_map

::: danger 警告
该部分尚未完工!
:::

## STL 函数

### lower_bound()

包含在`<algorithm>`头文件中。在 a 数组（有序）（左闭右开）中查找第一个大于等于 x 的元素，返回该元素的地址。

```c++
lower_bound(a, a + n, x);
```

时间复杂度：**$O(logn)$**

### upper_bound()

包含在`<algorithm>`头文件中。在 a 数组（有序）（左闭右开）中查找第一个大于 x 的元素，返回该元素的地址。

```c++
upper_bound(a, a + n, x);
```

时间复杂度：**$O(logn)$**
