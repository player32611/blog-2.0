# STL

## 什么是 STL

STL 即标准模板库(Standard Template Library)，是 C++ 标准库的一部分，里面包含了一些模板化的通用的数据结构和算法。由于其模板化的特点，它能够兼容自定义的数据类型，避免大量的造轮子工作。

NOI 和 ICPC 赛事都支持 STL 库的使用，蓝桥杯也是支持的。因此，一定要学习 STL 的使用，能够极大的提高编写代码的效率。

STL 的实现涉及比较高深的 C++ 知识，比如类、模板、容器适配等。如果想搞清楚背后的原理，就必须要学会这些知识。仅需做到：对于 STL 中一些的数据结构和算法，知道有这个东西，并且知道如何使用，以及会有什么效果。

## 字符串-string

`string` 字符串其实是一种更加高级的封装，`string` 字符串中包含大量的方法，这些方法使得字符串的操作变得更加简单。

C++ 中将字符串直接作为一种类型，也就是 `string` 类型，使用 `string` 类型创建的对象就是 C++ 的字符串。

```cpp
string s1;
string s2 = "hello world";
```

使用 C++ 中提供的 `string` 时，必须添加头文件`<string>`。

### 创建字符串

|            方式             |         解释         |
| :-------------------------: | :------------------: |
|         `string s1`         |   创建一个空字符串   |
| `string s2 = "hello world"` | **创建字符串(常用)** |

除了以上创建字符串的写法外，C++ 中还有一些其他的创建字符串方式，如：

```cpp
string s3("hello world");
string s4 = s3;
```

::warning

`string` 类型内的字符串不再以 `\0` 作为结束标志了。

::

### 字符串输入

可以直接使用 `cin` 给 `string` 类型的字符串中输入一个字符串的数据，但无法正常读取带空格的字符串。

`getline()` 是头文件 `<string>` 中定义的函数，用于从输入流中读取**一行文本**，并将其存储为字符串。

`getline()` 函数有两种不同的形式，分别对应着字符串的结束方式。

第一种 `getling()` 函数以换行符 `\n` 作为字符串的结束表示，它的一般格式是：

```cpp
istream& getline(istream& is, string& str);
```

- **cin** : 表示从输入流中读取信息

- **str** : 存放读取到的信息的字符串

第二种 `getline()` 函数允许用户自定义结束标志，它的一般格式是：

```cpp
istream& getline(istream& is, string& str, char delim);
```

- **cin** : 表示从输入流中读取信息

- **str** : 存放读取到的信息的字符串

- **delim** : 自定义的结束标志

::tip

`istream` 是输入流类型，`cin` 是 `istream` 类型的标准输入流对象。

`ostream` 是输出流类型，`cout` 是 `ostream` 类型的标准输出流对象。

`getline()` 函数是输入流中读取一行文本信息，所有如果是在标准输入流(键盘)中读取数据，就可以传 `cin` 给第一个参数。

::

### size()

`<string>`中提供了`size()`函数用于获取字符串长度。

使用示例：

```cpp
string s = "hello world";
cout << s.size() << endl;
```

::warning

`string` 类型的字符串是可以通过下标访问的，比如 `s[i]`

::

### 迭代器

迭代器是一种对象，它可以用来遍历容器(`string`)中的元素，迭代器的作用类似于指针，或者数组下标。

C++ 中的 `string` 提供了多种迭代器，用于遍历和操作字符串中的内容。常用的迭代器有：

- `begin()`：返回指向字符串第一个字符的迭代器，需要一个迭代器的变量来接收。

- `end()`：返回指向字符串最后一个字符的下一个位置的迭代器(该位置不属于字符串)。

`string` 中 `begin()` 和 `end()` 返回的迭代器的类型是 `string::iterator`。

```cpp
string s = "abc";
string::iterator it1 = s.begin();
string::iterator it2 = s.end();
cout << *it1;
```

::warning

访问迭代器指向的值，需要解引用 `*`。

::

::tip

- 迭代器是可以进行大小比较，也可以进行 + 或者 - 整数运算的。比如：`it++`，就是让迭代器前进一步，`it--` 就是让迭代器后退一步。

- 同一个容器的两个迭代器也可以相减，相减结果的绝对值，是两个迭代器中间元素的个数。

::

迭代器通常用于遍历字符串，可以正序遍历，也可以逆序遍历。

```cpp
string s = "hello world";
// 正序遍历
for (string::iterator it = s.begin(); it != s.end(); it++) {
    cout << *it;
}
```

::warning

通过迭代器找到元素后，改变迭代器指向的元素，是可以直接改变字符串内容的。

::

### push_back()

`push_back()` 函数用于在字符串(包括空字符串)尾部插入一个字符。

```cpp
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

`push_back()` 是用于在字符串后添加一个字符，然而部分情况下我们需要向原有的字符串后继续添加字符串。其实 `string` 类型的字符串是支持 `+` 和 `+=` 运算的。这里的本质是 `string` 中重载了 `operator+=` 这个操作符。

```cpp
string s = "hello";
s += " world";
cout << s << endl;
```

### pop_back()

`pop_back()` 用于删除字符串中尾部的一个字符。这个成员函数是在 `c++11` 标准中引入的，有些编译器可能不支持。

```cpp
string s = "helloX";
s.pop_back();
cout << s << endl;
```

### insert()

`insert()` 函数用于在字符串中间的某个位置插入一个字符或者字符串。函数原型如下：

```cpp
string& insert(size_t pos, const string& str); // pos位置前面插入一个 string 字符串
string& insert(size_t pos, const char* s); // pos位置前面插入一个 C 风格的字符串
string& insert(size_t pos, size_t n, char c); // pos位置前面插入 n 个字符 c
```

```cpp
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

`find()` 函数用于查找字符串中指定字串/字符，并返回子串/字符在字符串中第一次出现的位置。函数原型如下：

```cpp
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

- 若未找到，返回一个整数值 `npos`。通常判断 `find()` 函数的返回值是否等于 `npos` 就能直到是否查找到字串或者字符。

```cpp
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

::tip

`npos` 并不是一个随机的数字，而是 `string` 中定义的一个静态常量 `npos`。

```cpp
static const size_t npos = -1;
```

::

### substr()

`substr()` 函数用于截取字符串中指定位置指定长度的字串。函数原型如下：

```cpp
string substr(size_t pos = 0, size_t len = npos) const;
```

- `pos` : 开始截取的位置，默认从 0 开始。

- `len` : 截取的长度，默认一直截取到字符串末尾。

常见有三种用法：

- `substr()` : 如果函数不传参数，就是从下标为 0 的位置开始截取，直到结尾，得到的是整个字符串；

- `substr(pos)` : 从指定下标`pos`位置开始截取字串，直到结尾；

- `substr(pos, len)` : 从指定下标`pos`位置开始截取长度为`len`的字串。

**返回值类型** : `string`，返回的是截取到的字符串，可以使用`string`类型的字符串接收。

```cpp
string s = "hello world";
string s1 = s.substr(0, 3);
string s2 = s.substr(3);
cout << s << endl;
cout << s1 << endl;
cout << s2 << endl;
```

::warning

`substr()` 不会修改原字符串。

::

`substr()` 和 `find()` 经常是配合使用的，`find()` 负责找到位置，`substr()` 从这个位置向后获得字符串。

```cpp
string s = "hello world hello everyone";
size_t n = s.find("world");
string s1 = s.substr(n, 11);
cout << s1 << endl;
```

### string 的关系运算

两个`string`类型字符串可以比较大小，C++ 中为 `string` 提供了一系列的关系运算。

```cpp
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

```cpp
int stoi(const string& str, size_t* idx = 0, int base = 10);
long int stol(const string& str, size_t* idx = 0, int base = 10);
```

- `str` : 表示被转换的`string`类型的字符串

- `idx` : 是一个输出型参数，也就是通过这个参数会带会一个值。`idx` 是一个指针，需要在外边创建一个 `size_t` 类型的值，传递它的地址给 `idx`，这个参数将会带回 `str` 中无法正确匹配数字的第一个字符的位置。

- `base` : 表示被解析的字符串中数字的进制值，可能是 `2`、`8`、`10`、`16` 或者 `0`。默认情况下这个值是 `10`，表示十进制数字；如果传递的是 `2`，表示被解析的字符串中是二进制的数字，最终会转换成十进制的；如果传递的是 `0`，会根据字符串的内容的信息自动推导进制，比如：字符串中有 `0x`，就认为是十六进制，`0` 开头会被认为是八进制，最终会转换成十进制。

```cpp
string s = "11x22";
size_t pos = 0;
int r = stoi(s, &pos, 10);
cout << r << endl;
cout << pos << endl;
```

::tip

如果不想传递 `idx` 参数，可以传递 `0` 或者 `NULL`。如 `stoi(s, NULL, 10)`。

::

### `stod()`/`stof()`

`stod()` 是将字符串转换成 `double` 类型的值，`stof` 是将字符串转换成 `float` 类型的值。和 `stoi()` 函数比较的话，少了描述字符串中数字进制的参数，其他参数一致。函数原型如下：

```cpp
double stod(const string& str, size_t* idx = 0);
float stof(const string& str, size_t* idx = 0);
```

### `to_string()`

`to_string()` 函数可以将数字转换成字符串，包括整型、浮点型等。函数原型如下：

```cpp
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

```cpp
string pi = "pi is " + to_string(3.14);
```

## 动态顺序表-vector

如果需要使用动态顺序表，C++ 的 STL 提供了一个已经封装好的容器-`vector`。有的地方也叫做可变长的数组。`vector` 的底层就是一个会自动扩容的顺序表，其中创建以及增删改查等等的逻辑已经实现好了，并且也完成了封装。

### 创建 vector

```cpp
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

::tip

`<>` 里面可以存放任意的数据类型，包括结构体 struct、字符串 string、顺序表 vector 等等。

::

::warning

`vector<int> a[N]` 创建了一个大小为 N 的 vector 数组。

::

### size()/empty()

- `size()`: 返回实际元素的个数；

- `empty()`: 返回顺序表是否为空。如果为空：返回 true，否则返回 false。

```cpp
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

利用迭代器可以访问整个 `vector`，存在迭代器的容器就可以使用范围 for 遍历。

::code-group

```cpp [写法1]
// 利用迭代器来遍历
void print(vector<int>& a) {
	for (vector<int>::iterator it = a.begin(); it != a.end(); it++)cout << *it << " ";
	cout << endl;
}
```

```cpp [写法2]
// 利用范围 for 来遍历
void print(vector<int>& a) {
	for (auto x : a)cout << x << " ";
	cout << endl;
}
```

::

### push_back()/pop_back()

- `push_back()`: 在顺序表尾部添加一个元素；

- `pop_back()`: 删除顺序表尾部的一个元素。

> 当然还有 `insert()` 和 `erase()`。不过由于事件复杂度过高，尽量不使用。

```cpp
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

```cpp
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

```cpp
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

```cpp
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

如果需要使用双向链表，C++ 的 STL 提供了一个已经封装好的容器-`list`。`list` 的底层就是一个双向链表，其中创建以及增删改查等等的逻辑已经实现好了，并且也完成了封装。

`list` 与 `vector` 最大的区别在于，`list` 支持在任意位置以 $O(1)$ 的时间复杂度插入和删除元素，但是不支持随机访问（不能使用下标访问元素）。

### 创建 list

```cpp
#include<list>

int main() {
    std::list<int> a1;
    std::list<int> a2(10);
    std::list<int> a3(10, 2);
    std::list<int> a4 = { 1,2,3,4,5 };
}
```

以上代码创建了:

- 一个名字为 a1 的空链表，里面都是 int 类型的数据；

- 一个名字为 a2 的链表，大小为 10；

- 一个名字为 a3 的链表，大小为 10，里面的值都初始化为 2。

- 一个名字为 a4 的链表，里面有 5 个数据，数据初始化为 1,2,3,4,5。

::tip

`<>` 里面可以存放任意的数据类型，包括结构体 struct、字符串 string 等等。

::

### size()/empty()

- `size()`: 返回链表里实际元素的个数；

- `empty()`: 链表是否为空。如果为空：返回 true，否则返回 false。

```cpp
#include<iostream>
#include<list>
using namespace std;

void print(list<int>& a) {
    for (auto x : a)cout << x << " ";
    cout << endl;
}

int main() {
    list<int> a = { 1,2,3,4,5 };
    print(a);
    cout << a.size() << " " << a.empty() << endl;
}
```

### push_back()/push_front()/pop_back()/pop_front()

- `push_back()`: 在链表尾部添加一个元素；

- `push_front()`: 在链表头部添加一个元素；

- `pop_back()`: 删除链表尾部的一个元素；

- `pop_front()`: 删除链表头部的一个元素。

```cpp
#include<iostream>
#include<list>
using namespace std;

void print(list<int>& a) {
    for (auto x : a)cout << x << " ";
    cout << endl;
}

int main() {
    list<int> a = { 1,2,3,4,5 };
    print(a);
    a.push_back(6);
    a.push_front(0);
    print(a);
    a.pop_back();
    a.pop_front();
    print(a);
}
```

### front()/back()

- `front()`: 返回链表第一个元素；

- `back()`: 返回链表最后一个元素。

```cpp
#include<iostream>
#include<list>
using namespace std;

int main() {
    list<int> a = { 1,2,3,4,5 };
    cout << a.front() << " " << a.back() << endl;
}
```

### insert()/erase()

`list` 在任意位置插入和删除的效率非常高，因此 `insert()` 和 `erase()` 是 `list` 的常用方法。

- `insert(pos, val)`: 在 pos 位置（迭代器）前面插入一个元素 val；

- `erase(pos)`: 删除 pos 位置（迭代器）指向的元素。

```cpp
#include<iostream>
#include<list>
using namespace std;

void print(list<int>& a) {
    for (auto x : a)cout << x << " ";
    cout << endl;
}

int main() {
    list<int> a = { 1,2,3,4,5 };
    list<int>::iterator it = a.begin();
    it++;              // 指向第二个元素 2
    a.insert(it, 10);  // 在 2 前面插入 10
    print(a);          // 输出：1 10 2 3 4 5
    a.erase(it);       // 删除 2
    print(a);          // 输出：1 10 3 4 5
}
```

::warning

`list` 的迭代器不支持 `it + 2` 这种跨多步的运算，只能通过 `it++` 一步一步移动。因为链表在内存中不是连续存储的。

::

### 遍历

`list` 不支持下标访问，但可以使用迭代器或者范围 for 进行遍历。

```cpp
#include<iostream>
#include<list>
using namespace std;

int main() {
    list<int> a = { 1,2,3,4,5 };
    // 使用迭代器遍历
    for (list<int>::iterator it = a.begin(); it != a.end(); it++) {
        cout << *it << " ";
    }
    cout << endl;
    // 使用范围 for 遍历
    for (auto x : a) {
        cout << x << " ";
    }
    cout << endl;
}
```

::warning

`list` 不支持 `a[i]` 这种下标访问方式，因为链表在内存中不是连续存储的，无法通过下标快速定位元素。

::

::tip

`list` 不支持 STL 算法中的 `sort()` 函数，但自身提供了 `sort()` 成员函数用于排序，还提供了 `reverse()` 成员函数用于反转链表。

```cpp
list<int> a = { 3,1,4,1,5 };
a.sort();    // 排序后：1 1 3 4 5
a.reverse(); // 反转后：5 4 3 1 1
```

::

## 栈-stack

### 创建 stack

```cpp
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

```cpp
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

```cpp
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

双端队列 `deque` 是一种可以在头部和尾部同时进行插入和删除的容器。与 `vector` 类似，`deque` 也支持随机访问（使用下标访问元素）；与 `list` 类似，`deque` 也支持在头部进行插入和删除。

### 创建 deque

```cpp
#include<deque>

int main() {
    std::deque<int> a1;
    std::deque<int> a2(10);
    std::deque<int> a3(10, 2);
    std::deque<int> a4 = { 1,2,3,4,5 };
}
```

以上代码创建了:

- 一个名字为 a1 的空双端队列，里面都是 int 类型的数据；

- 一个名字为 a2 的双端队列，大小为 10；

- 一个名字为 a3 的双端队列，大小为 10，里面的值都初始化为 2。

- 一个名字为 a4 的双端队列，里面有 5 个数据，数据初始化为 1,2,3,4,5。

### size()/empty()

- `size()`: 返回双端队列里实际元素的个数；

- `empty()`: 双端队列是否为空。如果为空：返回 true，否则返回 false。

### push_back()/push_front()/pop_back()/pop_front()

- `push_back()`: 在双端队列尾部添加一个元素；

- `push_front()`: 在双端队列头部添加一个元素；

- `pop_back()`: 删除双端队列尾部的一个元素；

- `pop_front()`: 删除双端队列头部的一个元素。

```cpp
#include<iostream>
#include<deque>
using namespace std;

void print(deque<int>& a) {
    for (auto x : a)cout << x << " ";
    cout << endl;
}

int main() {
    deque<int> a = { 1,2,3,4,5 };
    print(a);
    a.push_back(6);
    a.push_front(0);
    print(a);
    a.pop_back();
    a.pop_front();
    print(a);
}
```

### front()/back()

- `front()`: 返回双端队列第一个元素；

- `back()`: 返回双端队列最后一个元素。

```cpp
#include<iostream>
#include<deque>
using namespace std;

int main() {
    deque<int> a = { 1,2,3,4,5 };
    cout << a.front() << " " << a.back() << endl;
}
```

### clear()

- `clear()`: 清空双端队列。

```cpp
#include<iostream>
#include<deque>
using namespace std;

void print(deque<int>& a) {
    for (auto x : a)cout << x << " ";
    cout << endl;
}

int main() {
    deque<int> a = { 1,2,3,4,5 };
    print(a);
    a.clear();
    print(a);
}
```

::tip

`deque` 的底层不是一段连续的内存，而是由多段连续内存拼接而成，因此可以在头部高效地插入和删除元素。这也是它和 `vector` 的主要区别。

::

## 优先队列-priority_queue

优先队列 `priority_queue` 是一种特殊的队列，它的出队顺序不是先进先出，而是**优先级最高的元素先出队**。`priority_queue` 的底层是一个堆，默认情况下是一个**大根堆**，也就是队首（堆顶）元素是最大的。

### 创建 priority_queue

```cpp
#include<queue>

int main() {
    std::priority_queue<int> a;                              // 默认大根堆
    std::priority_queue<int, vector<int>, greater<int>> b;   // 小根堆
}
```

- `priority_queue<int> a` 创建了一个大根堆，队首元素最大；

- `priority_queue<int, vector<int>, greater<int>> b` 创建了一个小根堆，队首元素最小。

::tip

`priority_queue` 需要包含 `<queue>` 头文件。第三个模板参数是用于比较的函数对象，`greater<int>` 表示小根堆，需要包含 `<functional>` 头文件。

::

### size()/empty()

- `size()`: 返回优先队列里实际元素的个数；

- `empty()`: 优先队列是否为空。如果为空：返回 true，否则返回 false。

### push()/pop()

- `push()`: 往优先队列里添加一个元素；

- `pop()`: 删除优先队列队首（优先级最高）的一个元素。

### top()

- `top()`: 返回队首元素（优先级最高的元素），但是不会删除。

```cpp
#include<iostream>
#include<queue>
using namespace std;

int main() {
    priority_queue<int> q; // 大根堆
    q.push(3);
    q.push(1);
    q.push(4);
    q.push(1);
    q.push(5);
    while (q.size()) {
        cout << q.top() << " ";
        q.pop();
    }
    // 输出：5 4 3 1 1
}
```

::tip

默认的大根堆，`top()` 返回的是最大的元素。如果需要每次返回最小的元素，可以创建小根堆：

```cpp
priority_queue<int, vector<int>, greater<int>> q;
```

::

::warning

`priority_queue` 没有迭代器，不能像 `vector` 那样通过下标或者范围 for 遍历，只能通过 `top()` 和 `pop()` 依次取出元素。

::

### 自定义优先级

当元素是自定义类型（如结构体）时，需要自定义比较规则。可以通过自定义比较函数来实现。

```cpp
#include<iostream>
#include<queue>
using namespace std;

struct Node {
    int x;
    int y;
};

// 自定义比较：x 小的优先级高（小根堆）
struct cmp {
    bool operator()(Node a, Node b) {
        return a.x > b.x;
    }
};

int main() {
    priority_queue<Node, vector<Node>, cmp> q;
    q.push({3, 1});
    q.push({1, 2});
    q.push({2, 3});
    while (q.size()) {
        Node t = q.top();
        cout << t.x << " " << t.y << endl;
        q.pop();
    }
    // 输出：
    // 1 2
    // 2 3
    // 3 1
}
```

::tip

自定义比较时，`cmp` 中的 `operator()` 返回 true 表示 a 的优先级低于 b。所以 `return a.x > b.x` 表示 x 小的元素优先级高，即小根堆。

::

## 集合-set

`set` 是集合容器，它的内部元素是**自动排序**并且**去重**的。`set` 的底层是一棵红黑树，因此插入、删除、查找的时间复杂度都是 $O(logn)$。

### 创建 set

```cpp
#include<set>

int main() {
    std::set<int> a;
    std::set<int> b = { 3,1,4,1,5,9 };
}
```

::tip

`set` 中的元素会自动去重并且升序排序。上面的 `b` 中实际存储的元素是 `1,3,4,5,9`（`1` 只保留了一个）。

::

### size()/empty()

- `size()`: 返回集合里实际元素的个数；

- `empty()`: 集合是否为空。如果为空：返回 true，否则返回 false。

### insert()/erase()

- `insert(x)`: 往集合里插入元素 x，如果 x 已经存在，则不会插入（去重）；

- `erase(x)`: 删除集合中值为 x 的元素。

```cpp
#include<iostream>
#include<set>
using namespace std;

void print(set<int>& a) {
    for (auto x : a)cout << x << " ";
    cout << endl;
}

int main() {
    set<int> a;
    a.insert(3);
    a.insert(1);
    a.insert(4);
    a.insert(1); // 重复插入，无效
    print(a);    // 输出：1 3 4
    a.erase(3);
    print(a);    // 输出：1 4
}
```

### find()/count()

- `find(x)`: 查找值为 x 的元素，返回指向该元素的迭代器；如果不存在，返回 `end()`；

- `count(x)`: 返回集合中值为 x 的元素的个数。由于 `set` 去重，因此返回值只能是 0 或 1。

```cpp
#include<iostream>
#include<set>
using namespace std;

int main() {
    set<int> a = { 1,2,3,4,5 };
    if (a.find(3) != a.end()) {
        cout << "found 3" << endl;
    }
    cout << a.count(3) << " " << a.count(10) << endl; // 输出：1 0
}
```

### 遍历

`set` 中的元素是按升序排列的，遍历 `set` 会按从小到大的顺序访问元素。

```cpp
#include<iostream>
#include<set>
using namespace std;

int main() {
    set<int> a = { 3,1,4,1,5,9 };
    for (auto x : a) {
        cout << x << " ";
    }
    // 输出：1 3 4 5 9
}
```

::warning

`set` 中的元素是只读的，不能通过迭代器修改元素的值。因为 `set` 是依靠元素的值来排序的，如果修改元素的值，会破坏 `set` 的有序性。

::

### lower_bound()/upper_bound()

`set` 也提供了 `lower_bound()` 和 `upper_bound()` 成员函数，用于查找第一个大于等于 x 或者第一个大于 x 的元素。

- `lower_bound(x)`: 返回第一个大于等于 x 的元素的迭代器；

- `upper_bound(x)`: 返回第一个大于 x 的元素的迭代器。

```cpp
#include<iostream>
#include<set>
using namespace std;

int main() {
    set<int> a = { 1,3,5,7,9 };
    auto it1 = a.lower_bound(4); // 第一个 >= 4 的元素是 5
    auto it2 = a.upper_bound(4); // 第一个 > 4 的元素是 5
    cout << *it1 << " " << *it2 << endl;
}
```

::tip

`set` 的 `lower_bound()`/`upper_bound()` 成员函数时间复杂度是 $O(logn)$。而 STL 算法中的 `lower_bound()`/`upper_bound()` 作用在 `set` 上时时间复杂度是 $O(n)$，所以要优先使用 `set` 自带的成员函数。

::

## 红黑树-map

`map` 是一种键值对（key-value）容器，它的内部元素是**自动按键排序**并且**键去重**的。`map` 的底层也是一棵红黑树，插入、删除、查找的时间复杂度都是 $O(logn)$。

### 创建 map

```cpp
#include<map>

int main() {
    std::map<string, int> a; // 键是 string，值是 int
}
```

::tip

`map` 的键值对类型是 `pair`，可以使用 `make_pair(key, value)` 或者 `{key, value}` 来创建一个键值对。

::

### size()/empty()

- `size()`: 返回 map 里实际元素的个数；

- `empty()`: map 是否为空。如果为空：返回 true，否则返回 false。

### 插入元素

可以使用下标运算符 `[]` 或者 `insert()` 来插入元素。

```cpp
#include<iostream>
#include<map>
using namespace std;

int main() {
    map<string, int> m;
    // 方式1：使用下标运算符
    m["apple"] = 3;
    m["banana"] = 5;
    // 方式2：使用 insert()
    m.insert({"cherry", 2});
    m.insert(make_pair("date", 7));
    cout << m["apple"] << endl;
}
```

::tip

使用下标运算符 `m[key]` 时，如果 key 不存在，会**自动插入**一个默认值（value 为 0），然后返回该值的引用。

::

### 查找元素

- `find(key)`: 查找键为 key 的元素，返回指向该元素的迭代器；如果不存在，返回 `end()`；

- `count(key)`: 返回键为 key 的元素的个数。由于 `map` 的键去重，因此返回值只能是 0 或 1。

```cpp
#include<iostream>
#include<map>
using namespace std;

int main() {
    map<string, int> m = { {"apple", 3}, {"banana", 5} };
    if (m.find("apple") != m.end()) {
        cout << m["apple"] << endl;
    }
    cout << m.count("apple") << " " << m.count("cherry") << endl;
}
```

### erase()

- `erase(key)`: 删除键为 key 的元素。

```cpp
#include<iostream>
#include<map>
using namespace std;

int main() {
    map<string, int> m = { {"apple", 3}, {"banana", 5} };
    m.erase("apple");
    cout << m.size() << endl;
}
```

### 遍历

遍历 `map` 时，得到的是 `pair` 类型，`first` 是键，`second` 是值。遍历顺序按键的升序。

```cpp
#include<iostream>
#include<map>
using namespace std;

int main() {
    map<string, int> m = { {"banana", 5}, {"apple", 3}, {"cherry", 2} };
    for (auto it = m.begin(); it != m.end(); it++) {
        cout << it->first << " " << it->second << endl;
    }
    // 输出（按键升序）：
    // apple 3
    // banana 5
    // cherry 2
}
```

::tip

`map` 中的 `key` 是只读的，不能修改，但 `value` 可以修改。因为 `map` 依靠 `key` 来排序，如果修改 `key` 会破坏有序性。

::

## 哈希表-unordered_map

`unordered_map` 也是一种键值对容器，功能与 `map` 类似，但是底层是**哈希表**实现，因此元素是**无序**的，插入、删除、查找的平均时间复杂度是 $O(1)$。

### 创建 unordered_map

```cpp
#include<unordered_map>

int main() {
    std::unordered_map<string, int> a; // 键是 string，值是 int
}
```

::tip

`unordered_map` 需要包含 `<unordered_map>` 头文件。

::

### size()/empty()

- `size()`: 返回哈希表里实际元素的个数；

- `empty()`: 哈希表是否为空。如果为空：返回 true，否则返回 false。

### 插入元素

和 `map` 一样，可以使用下标运算符 `[]` 或者 `insert()` 插入元素。

```cpp
#include<iostream>
#include<unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> m;
    m["apple"] = 3;
    m["banana"] = 5;
    m.insert({"cherry", 2});
    cout << m["apple"] << endl;
}
```

### 查找元素

- `find(key)`: 查找键为 key 的元素，返回指向该元素的迭代器；如果不存在，返回 `end()`；

- `count(key)`: 返回键为 key 的元素的个数，只能是 0 或 1。

```cpp
#include<iostream>
#include<unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> m = { {"apple", 3}, {"banana", 5} };
    if (m.find("apple") != m.end()) {
        cout << m["apple"] << endl;
    }
    cout << m.count("apple") << endl;
}
```

### erase()

- `erase(key)`: 删除键为 key 的元素。

```cpp
#include<iostream>
#include<unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> m = { {"apple", 3}, {"banana", 5} };
    m.erase("apple");
    cout << m.size() << endl;
}
```

### 遍历

遍历 `unordered_map` 得到的是 `pair` 类型，但是元素的顺序是**无序**的。

```cpp
#include<iostream>
#include<unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> m = { {"banana", 5}, {"apple", 3}, {"cherry", 2} };
    for (auto it = m.begin(); it != m.end(); it++) {
        cout << it->first << " " << it->second << endl;
    }
}
```

### map 与 unordered_map 的区别

|      特性      |     map      |   unordered_map   |
| :------------: | :----------: | :---------------: |
|    底层实现    |    红黑树    |      哈希表       |
|    元素顺序    | 按键升序排序 |       无序        |
| 查找时间复杂度 |  $O(logn)$   |    平均 $O(1)$    |
|     头文件     |   `<map>`    | `<unordered_map>` |

::tip

- 如果需要元素按键有序（如遍历时按键升序输出），使用 `map`；

- 如果只关心快速查找，对顺序没有要求，使用 `unordered_map`，平均查找速度更快。

::

::warning

`unordered_map` 的查找时间复杂度是**平均** $O(1)$，最坏情况下会退化到 $O(n)$（当哈希冲突严重时）。

::

## STL 函数

### lower_bound()

包含在 `<algorithm>` 头文件中。在 a 数组（有序）（左闭右开）中查找第一个大于等于 x 的元素，返回该元素的地址。

```cpp
lower_bound(a, a + n, x);
```

时间复杂度：**$O(logn)$**

### upper_bound()

包含在 `<algorithm>` 头文件中。在 a 数组（有序）（左闭右开）中查找第一个大于 x 的元素，返回该元素的地址。

```cpp
upper_bound(a, a + n, x);
```

时间复杂度：**$O(logn)$**
