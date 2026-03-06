# 算法提高

::: danger 警告

该页面尚未完工!

:::

::: details 目录

[[toc]]

:::

## 线段树

> 前置：[二叉树](data-structure.html#二叉树)、[堆](data-structure.html#堆)、[递归初阶](algorithm-basic.html#递归初阶)、[分治](algorithm-basic.html#分治)

### 引入

有如下问题：

- 有 $n(n \leq 10^5)$ 个数，$q(q \leq 10^5)$ 次操作，每次操作为询问区间 [l, r] 的和

- 有 $n(n \leq 10^5)$ 个数，$q(q \leq 10^5)$ 次操作，操作有两种：
  - 查询区间 [l, r] 的和
  - 将第 i 个数修改成 $x$

- 有 $n(n \leq 10^5)$ 个数，$q(q \leq 10^5)$ 次操作，操作有两种：
  - 查询区间 [l, r] 的和
  - 将区间 [l, r] 的数全部修改成 $x$

- 有 $n(n \leq 10^5)$ 个数，$q(q \leq 10^5)$ 次操作，每次操作为区间 [l, r] 的最大值或者最小值

这个其实是 **RMQ**（Range Minimum/Maximum Query）问题。我们使用**线段树**来解决。

线段树是一棵二叉树，常用来维护区间信息。可以在 $\log$ 级别的时间复杂度内完成：区间的单点修改，区间修改，区间查询（区间和、区间最大/最小值）等操作。

### 线段树的构建

线段树是基于分治思想的二叉树，树中的每一个结点都会维护一段区间的信息。其中叶子结点存储元素本身，非叶结点维护区间内元素的信息。

线段树类似堆的存储方式，用结构体数组来存储。

::: details 具体示例

以数组 $a=[5,1,3,0,2,2,7,4,5,8]$ 为例，如果查询的是区间和，我们会创建出来这样一棵树来维护信息：

![线段树](/images/algorithm/algorithm-improve/segment-tree.png)

:::

根据构建方式，可以得到以下性质：

- 线段树的每个结点都维护一个区间的信息；

- 线段树中的根结点维护整个区间的信息，叶子结点维护长度为 1 的区间信息；

- 可以用结构体数组来实现线段树，类似堆的存储方式，也就是二叉树的静态存储。此时父结点的编号为 $p$ 时，左孩子编号为 $p \times 2$，右孩子编号为 $p \times 2+1$；

- 若当前结点维护的区间为 [l, r]，那么左右孩子分别维护 [l, mid] 以及 [mid + 1, r] 区间的信息；

- 线段树的空间，需要开最大区间的 4 倍。

::: tip 推导过程

设数组的大小为 $n$，则：

线段树的高：$h=\log n + 2$

线段树节点的个数：$N=2^h-1=4n-1$

:::

```c++
#define lc p << 1 // 相当于 p * 2
#define rc p << 1 | 1 // 相当于 p * 2 + 1

typedef long long LL;
const int N = 1e5 + 10;

int n, m;
LL a[N];

struct node { // 线段树的结点
	LL l, r, sum;
}tr[N << 2];

// 整合左右孩子的信息
void pushup(int p) {
	tr[p].sum = tr[lc].sum + tr[rc].sum;
}

// 创建线段树
void build(int p, int l, int r) {
	tr[p] = { l,r,0 }; // 初始化
	if (l == r) { // 如果是叶子结点
		tr[p].sum = a[l]; // 更新 sum 的值
		return;
	}
	int mid = (l + r) >> 1; // 一分为二
	build(lc, l, mid); // 构建左子树
	build(rc, mid + 1, r); // 构建右子树
	pushup(p); // 左右子树构建完成之后，维护 sum 信息
}
```

时间复杂度：$O(n)$

### 区间查询

对于一个待查询的区间，用拆分 + 拼凑的思想，在线段树的结点中收集结果。具体流程：

1. 从根结点出发，向下递归；

2. 如果当前结点维护的区间信息包含在待查询的区间内，直接返回结点维护的信息；

3. 如果左区间有重叠，去左子树上找结果；

4. 如果右区间有重叠，去右子树上找结果；

```c++
// 区间查询
LL query(int p, int x, int y) {
	LL l = tr[p].l, r = tr[p].r; // 当前结点维护的信息
	if (x <= 1 && r <= y)return tr[p].sum; // 如果是查询区间的子区间，返回结果
	LL sum = 0, mid = (l + r) >> 1;
	if (x <= mid)sum += query(lc, x, y);
	if (y > mid)sum += query(rc, x, y);
	return sum;
}
```

时间复杂度：$O(\log n)$

### 单点修改

具体流程：

1. 递归找到叶子结点，并且维护修改之后的信息；

2. 然后一路向上回溯，修改所有路径上的结点信息，使得维护的信息为修改之后的信息。

::: details 具体示例

以数组 $a=[5,1,3,0,2,2,7,4,5,8]$ 为例，如果将 $x=6$ 位置上的元素增加 3，维护的信息如下：

![线段树单点修改](/images/algorithm/algorithm-improve/segment-tree-single-point-modify.png)

:::

```c++
// 单点修改
void modify(int p, int x, LL k) {
	int l = tr[p].l, r = tr[p].r;
	if (l == x && r == x) { // 找到叶子结点
		tr[p].sum += k;
		return;
	}
	int mid = (l + r) >> 1;
	if (x <= mid)modify(lc, x, k);
	else modify(rc, x, k);
	pushup(p);
}
```

[P3374 【模板】树状数组 1](https://www.luogu.com.cn/problem/P3374)

```c++
#include<iostream>
using namespace std;

#define lc p<<1
#define rc p<<1|1
typedef long long LL;

const int N = 5e5 + 10;

int n, m;
LL a[N];

struct node {
	int l, r;
	LL sum;
}tr[N << 2];

void pushup(int p) {
	tr[p].sum = tr[lc].sum + tr[rc].sum;
}

void build(int p,int l,int r) {
	tr[p] = { l,r,a[l] };
	if (l == r)return;
	int mid = (l + r) >> 1;
	build(lc, l, mid);
	build(rc, mid + 1, r);
	pushup(p);
}

void modify(int p, int x, LL k) {
	int l = tr[p].l, r = tr[p].r;
	if (x == l && r == x) {
		tr[p].sum += k;
		return;
	}
	int mid = (l + r) >> 1;
	if (x <= mid)modify(lc, x, k);
	else modify(rc, x, k);
	pushup(p);
}

LL query(int p, int x, int y) {
	int l = tr[p].l, r = tr[p].r;
	if (x <= l && r <= y)return tr[p].sum;
	int mid = (l + r) >> 1;
	LL sum = 0;
	if (x <= mid)sum += query(lc, x, y);
	if (y > mid) sum += query(rc, x, y);
	return sum;
}

int main() {
	cin >> n >> m;
	for (int i = 1; i <= n; i++)cin >> a[i];
	build(1, 1, n);
	while (m--) {
		int op, x, y;
		cin >> op >> x >> y;
		if (op == 1)modify(1, x, y);
		else cout << query(1, x, y) << endl;
	}
}
```

### 区间修改（懒标记）

试想一下，如果某个结点维护的区间 [l, r] 被修改的区间 [x, y] 完全覆盖时，如果能够在 $O(1)$ 时间内修改区间维护的信息，那么左右子树其实没有必要修改。可以等到下次遇到的时候再去处理。

借助这样的思想，我们会在每一个结点中额外维护一个懒标记：

- 如果当前结点维护的区间 [l, r] 被待查询区间 [x, y] 完全覆盖时，停止递归，根据区间长度维护出增加元素之后的和；不去处理左右孩子，打上一个区间增加一个值的懒标记；

- 等到下次修改或者查询操作，遇到该结点时，再把懒标记下放给左右孩子。

这样，就可以把时间控制的与查询时间一致，都是 $O(\log n)$。

::: code-group

```c++ [结点维护信息]
// 线段树的结点
struct node {
	int l, r;
	LL sum, add;
}tr[N * 4];
```

```c++ [创建线段树]
// 创建线段树
void build(int p, int l, int r) {
	tr[p] = { l,r,a[l],0 }; // 初始化
	if (l == r) return; // 如果是叶子结点
	int mid = (l + r) >> 1; // 一分为二
	build(lc, l, mid); // 构建左子树
	build(rc, mid + 1, r); // 构建右子树
	pushup(p); // 左右子树构建完成之后，维护 sum 信息
}
```

```c++ [懒标记下放]
// 接收到修改任务，修改完毕之后，把修改信息懒下来
void lazy(int p, LL add) {
	int l = tr[p].l, r = tr[p].r;
	tr[p].sum += (r - l + 1) * add;
	tr[p].add += add;
}

// 下放懒标记
void pushdown(int p) {
	if (tr[p].add) {
		lazy(lc, tr[p].add); // 懒标记分给左孩子
		lazy(rc, tr[p].add); // 懒标记分给右孩子
		tr[p].add = 0;
	}
}
```

```c++ [区间查询]
// 区间查询
LL query(int p, int x, int y) {
	LL l = tr[p].l, r = tr[p].r; // 当前结点维护的信息
	if (x <= l && r <= y)return tr[p].sum; // 如果是查询区间的子区间，返回结果
	pushdown(p); // 懒标记下放
	LL sum = 0, mid = (l + r) >> 1;
	if (x <= mid)sum += query(lc, x, y);
	if (y > mid)sum += query(rc, x, y);
	return sum;
}
```

```c++ [区间修改]
// 区间修改
void modify(int p, int x, int y, LL k) {
	LL l = tr[p].l, r = tr[p].r; // 当前结点维护的信息
	if (x <= l && r <= y) {
		lazy(p, k);
		return;
	}
	int mid = (l + r) >> 1;
	pushdown(p); // 懒标记下放
	if (x <= mid) modify(lc, x, y, k);
	if (y > mid) modify(rc, x, y, k);
	pushup(p); // 更新父结点
}
```

:::

例题：[P3372 【模板】线段树 1](https://www.luogu.com.cn/problem/P3372)

```c++
#include<iostream>
using namespace std;

#define lc p << 1
#define rc p << 1 | 1
typedef long long LL;

const int N = 1e5 + 10;

int n, m;
LL a[N];

struct node {
	int l, r;
	LL sum, add;
}tr[N * 4];

void lazy(int p, LL k) {
	tr[p].sum += (tr[p].r - tr[p].l + 1) * k;
	tr[p].add += k;
}

void pushup(int p) {
	tr[p].sum = tr[lc].sum + tr[rc].sum;
}

void pushdown(int p) {
	if (tr[p].add) {
		lazy(lc, tr[p].add);
		lazy(rc, tr[p].add);
		tr[p].add = 0;
	}
}

void build(int p, int l, int r) {
	tr[p] = { l,r,a[l],0 };
	if (l == r)return;
	int mid = (l + r) >> 1;
	build(lc, l, mid);
	build(rc, mid + 1, r);
	pushup(p);
}

void modify(int p, int x, int y, LL k) {
	int l = tr[p].l, r = tr[p].r;
	if (x <= l && r <= y) {
		lazy(p, k);
		return;
	}
	pushdown(p);
	int mid = (l + r) >> 1;
	if (x <= mid)modify(lc, x, y, k);
	if (y > mid)modify(rc, x, y, k);
	pushup(p);
}

LL query(int p, int x, int y) {
	int l = tr[p].l, r = tr[p].r;
	if (x <= l && r <= y) return tr[p].sum;
	pushdown(p);
	int mid = (l + r) >> 1;
	LL sum = 0;
	if (x <= mid)sum += query(lc, x, y);
	if (y > mid)sum += query(rc, x, y);
	return sum;
}

int main() {
	cin >> n >> m;
	for (int i = 1; i <= n; i++)cin >> a[i];
	build(1, 1, n);
	while (m--) {
		int op, x, y;
		cin >> op >> x >> y;
		LL k;
		if (op == 1) {
			cin >> k;
			modify(1, x, y, k);
		}
		else cout << query(1, x, y) << endl;
	}
}
```

例题：[P3368 【模板】树状数组 2](https://www.luogu.com.cn/problem/P3368)

```c++
#include<iostream>
using namespace std;

#define lc p << 1
#define rc p << 1 | 1
typedef long long LL;

const int N = 5e5 + 10;

int n, m;
LL a[N];

struct node {
	int l, r;
	LL sum, add;
}tr[N << 2];

void lazy(int p, LL k) {
	tr[p].sum += (tr[p].r - tr[p].l + 1) * k;
	tr[p].add += k;
}

void pushup(int p) {
	tr[p].sum = tr[lc].sum + tr[rc].sum;
}

void pushdown(int p) {
	if (tr[p].add) {
		lazy(lc, tr[p].add);
		lazy(rc, tr[p].add);
		tr[p].add = 0;
	}
}

void build(int p, int l, int r) {
	tr[p] = { l,r,a[l],0 };
	if (l == r)return;
	int mid = (l + r) >> 1;
	build(lc, l, mid);
	build(rc, mid + 1, r);
	pushup(p);
}

void modify(int p, int x, int y, LL k) {
	int l = tr[p].l, r = tr[p].r;
	if (x <= l && r <= y) {
		lazy(p, k);
		return;
	}
	pushdown(p);
	int mid = (l + r) >> 1;
	if (x <= mid)modify(lc, x, y, k);
	if (y > mid)modify(rc, x, y, k);
	pushup(p);
}

LL query(int p, int x) {
	int l = tr[p].l, r = tr[p].r;
	if (l == x && x == r) return tr[p].sum;
	pushdown(p);
	int mid = (l + r) >> 1;
	if (x <= mid)return query(lc, x);
	else return query(rc, x);
}

int main() {
	cin >> n >> m;
	for (int i = 1; i <= n; i++)cin >> a[i];
	build(1, 1, n);
	while (m--) {
		int op, x, y;
		LL k;
		cin >> op;
		if (op == 1) {
			cin >> x >> y >> k;
			modify(1, x, y, k);
		}
		else {
			cin >> x;
			cout << query(1, x) << endl;
		}
	}
}
```

### 小结

由于懒标记的加入，使得线段树能够高效地应对多种类型的区间修改以及查询。

在实现线段树时，可以根据下面几个方面来记忆以及修改模板代码：

- 根据查询以及修改操作，决定结构体中维护什么信息；

- `pushup()`：根据左右孩子维护的信息，更新当前结点维护的信息；

- `pushdown()`：当前结点的懒信息往下发一层，让左右孩子接收信息，并清空当前结点懒信息；

- `lazy()`：当前区间收到修改操作之后，更新当前结点维护的信息并且把修改操作 "懒" 下来；

- `build()`：遇到叶子结点返回，否则递归处理左右孩子，然后整合左右孩子的信息；

- `modify()`：遇到完全覆盖的区间，直接修改；否则有懒信息就先分给左右孩子懒信息，然后递归处理左右区间，最后整合左右孩子的信息；

- `query()`：遇到完全覆盖的区间，直接返回结点维护的信息；否则有懒信息就先分给左右孩子懒信息，然后整合左右区间的查询信息。

实现时易错的细节问题：

- `lazy()` 函数只把懒信息存了下来，没有修改区间维护的信息；

- `query()` 以及 `modify()` 操作，没有分配懒信息；

- `pushdown()` 之后，没有清空当前结点的懒标记。

线段树如果想做到单次区间修改操作的时间复杂度为 $O(\log n)$，那么在一段范围上执行修改操作之后，需要能够在 $O(1)$ 时间内得到需要维护的信息。

### 维护更多类型的信息

例题：[P1816 忠诚](https://www.luogu.com.cn/problem/P1816)

::: danger 警告

该部分尚未完工!

:::

例题：[P3870 [TJOI2009] 开关](https://www.luogu.com.cn/problem/P3870)

::: danger 警告

该部分尚未完工!

:::

例题：[P2184 贪婪大陆](https://www.luogu.com.cn/problem/P2184)

::: danger 警告

该部分尚未完工!

:::

例题：[P1438 无聊的数列](https://www.luogu.com.cn/problem/P1438)

::: danger 警告

该部分尚未完工!

:::

### 多个区间操作

例题：[P3373 【模板】线段树 2](https://www.luogu.com.cn/problem/P3373)

::: danger 警告

该部分尚未完工!

:::

例题：[P1253 扶苏的问题](https://www.luogu.com.cn/problem/P1253)

::: danger 警告

该部分尚未完工!

:::

### 线段树 + 分治

例题：[P4513 小白逛公园](https://www.luogu.com.cn/problem/P4513)

::: danger 警告

该部分尚未完工!

:::

例题：[P2572 [SCOI2010] 序列操作](https://www.luogu.com.cn/problem/P2572)

::: danger 警告

该部分尚未完工!

:::

### 线段树 + 剪枝

例题：[P4145 上帝造题的七分钟 2 / 花神游历各国](https://www.luogu.com.cn/problem/P4145)

::: danger 警告

该部分尚未完工!

:::

### 权值线段树 + 离散化

例题：[P1908 逆序对](https://www.luogu.com.cn/problem/P1908)

::: danger 警告

该部分尚未完工!

:::

### 线段树 + 数学

例题：[P5142 区间方差](https://www.luogu.com.cn/problem/P5142)

::: danger 警告

该部分尚未完工!

:::

例题：[P10463 Interval GCD](https://www.luogu.com.cn/problem/P10463)

::: danger 警告

该部分尚未完工!

:::

## 树状数组

::: danger 警告

该部分尚未完工!

:::

## ST 表

::: danger 警告

该部分尚未完工!

:::

## 树形 dp

::: danger 警告

该部分尚未完工!

:::

## 状压 dp

::: danger 警告

该部分尚未完工!

:::

## 数位 dp

::: danger 警告

该部分尚未完工!

:::

## 双向搜索

::: danger 警告

该部分尚未完工!

:::

## 迭代加深搜索

::: danger 警告

该部分尚未完工!

:::

## 树的重心与直径

::: danger 警告

该部分尚未完工!

:::

## 树上前缀和与差分

::: danger 警告

该部分尚未完工!

:::

## 树上倍增与 LCA

::: danger 警告

该部分尚未完工!

:::

## 差分约束

::: danger 警告

该部分尚未完工!

:::

## 同余最短路

::: danger 警告

该部分尚未完工!

:::

## 欧拉回路

::: danger 警告

该部分尚未完工!

:::

## 分层树

::: danger 警告

该部分尚未完工!

:::

## 01 分数规划

::: danger 警告

该部分尚未完工!

:::

## kmp

> 前置：[动态规划](dynamic-programming.md)

### 相关概念

- **字符串**：用字符构成的序列就是字符串

::: tip 提示

在字符串匹配问题中，我们会i让字符串的下标从 1 开始，这样便于我们处理一些边界问题。因此，在输入字符串时，我们一般会在前面加上一个空格，这样字符就从 1 开始计数了。

```c++
string s;
cin >> s;
int n = s.size();
s = ' ' + s;
```

:::

- **子串**：选取字符串中连续的一段

- **前缀**：从字符串的首端开始，到某一个位置结束的字串。字符串长度为 i 的前缀，就是字符串 [1, i] 区间的字串

- **真前缀**：不包含字符串本身的前缀

- **后缀**：从字符串的某个位置开始，到字符串末端的字串。字符串长度为 i 的后缀，就是字符串 [n - i + 1, n] 区间的字串

- **真后缀**：不包含字符串本身的后缀子串

- **真公共前后缀（border）**：字符串 s 的真公共前后缀为 s 的一个子串 t，满足 t 即是 s 的真前缀，又是 s 的真后缀，又称为字符串 s 的 border

::: tip 性质

- **传递性**：字符串 s 的 border 的 border 也是字符串 s 的 border

:::

- **最长真公共前后缀（$\pi$）**：在一个字符串中，最长的真公共前后缀的长度用 $\pi$ 表示

::: details 具体示例

例如，字符串 `aabaaba` 的真公共前后缀有：`a`、`aaba`。

字符串 `abaaba` 的 border 有：`a`、`aba`，因此 $\pi$ 值为 3。

字符串 `aaaaaa` 的 border 有：`a`、`aa`、`aaa`、`aaaa`、`aaaaa`，因此 $\pi$ 值为 5。

:::

- **字符串匹配（模式匹配）**：给定两个字符串 $S$ 和 $T$，需要在主串 $S$ 中找到模式串 $T$

::: details 具体示例

主串 `S = "abcdefcde"`，模式串 `T="cde"`。如果下标从 1 开始计数，模式串会在主串 3，7 位置出现

:::

### 前缀函数

**前缀函数**：字符串每一个前缀子串的 $\pi$ 值

::: details 具体示例

以字符串 `aabaab` 为例，$\pi[i]$ 表示：字符串 s 长度为 i 的前缀，最长的 border 长度（最长真公共前后缀）。

|   下标   |  1  |  2  |  3  |  4   |   5   |   6    |
| :------: | :-: | :-: | :-: | :--: | :---: | :----: |
| 前缀子串 |  a  | aa  | aab | aaba | aabaa | aabaab |
|  $\pi$   |  0  |  1  |  0  |  1   |   2   |   3    |

:::

前缀函数可以用于从大到小枚举字符串 s 某个前缀的所有的 border。

::: details 证明

假设我们此时生成了一个字符串 s 的前缀表，我们可以利用这张表，从大到小拿到某个前缀所有的 border。

原理就是 border 的传递性：字符串 border 的 border 还是 border。

![前缀函数](/images/algorithm/algorithm-improve/prefix-function.png)

- 首先 $\pi[i]$ 存的是最长的 border 的长度，母庸置疑；

- 其次，如果下一个 $\pi[\pi[i]]$ 如果不是次长的，那么 $\pi[\pi[i]]$ 就不是长度为 $\pi[i]$ 的前缀的最长 border 的长度，与我们的定义相违背；

- 因此，整个过程一定能够不重不漏的将所有的 border 从大到小枚举出来。

:::

```c++
string s;
int pi[N]; // 假设已经生成好了前缀函数

// 长度为 i 的前缀中，所有 border 的长度
void get_border(int i) {
	int j = pi[i];
	while (j) {
		cout << j << endl;
		j = pi[j];
	}
}
```

### 计算前缀函数

计算前缀函数的过程包含了动态规划的思想，就是推导状态转移方程。

对于字符串 s：

<p><font color="blue">状态表示：pi[i] 表示字符串 s 长度为 i 的前缀，最长的 border 长度（最长真公共前后缀）</font></p>

<p><font color="blue">状态转移方程：f[i][j] = min(f[i + 1][j - 1], f[i + 1][j] + 1, f[i][j - 1] + 1)</font></p>

::: details 推导状态转移方程

我们发现，如果，如果将长度为 i 的前缀中的 border 删去最后一个字符，就变成了长度为 i - 1 的前缀中的 border。

那么，我们就可以从大到小枚举长度为 i - 1 的前缀中所有的 border，然后判断这个 border 的下一个字符是否和 s[i] 相等：

![前缀函数的计算 ](/images/algorithm/algorithm-improve/prefix-function-calculation.png)

- 如果相等，说明这个就是最长的；

- 如果不相等，那就继续判断下一个 border，直到将所有的 border 验证完毕。

:::

::: code-group

```c++
string s;
int pi[N];

void get_pi() {
	cin >> s;
	int n = s.size();
	s = ' ' + s;
	// pi[1] = 0
	for (int i = 2; i <= n; i++) {
		int j = pi[i - 1];
		while (j && s[i] != s[j + 1])j = pi[j];
		if (s[i] == s[j + 1])j++;
		pi[i] = j;
	}
}
```

```c++ [优化]
string s;
int pi[N];

void get_pi() {
	cin >> s;
	int n = s.size();
	s = ' ' + s;
	// 我们注意到 i++ 之后，pi[i - 1] 依旧是上一次的 j，所以代码也可以这样写
	// 更能体现到 j 指针基本上不回退
	for (int i = 2, j = 0; i <= n; i++) {
		while (j && s[i] != s[j + 1])j = pi[j];
		if (s[i] == s[j + 1])j++;
		pi[i] = j;
	}
}
```

:::

时间复杂度：$O(n)$

### 用字符串解决字符串匹配

设主串 `S = "abcabaaaba"`，模式串 `T = "aba"`，主串的长度为 `n`，模式串的长度为 `m`。

将两个字符串拼起来：`S = T + '#' + S = "aba#abcabaaaba"`（`#` 可替换成主串和模式串中不会出现的字符），对于新的字符串，可以在 $O(n + m)$ 时间内生成前缀函数：

| 下标  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  | 13  | 14  |
| :---: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| $\pi$ |  0  |  0  |  1  |  0  |  1  |  2  |  0  |  1  |  2  |  3  |  1  |  1  |  2  |  3  |

前缀函数等于模式串长度的位置 $i$,就是能够匹配的末端。在主串中，出现的位置就是 $i-2 \times m$。

那么，有了前缀函数之后，不仅能知道匹配了几次，还能知道每次匹配的起始位置。

### kmp 算法模板

例题：[P3375 【模板】KMP](https://www.luogu.com.cn/problem/P3375)

```c++
#include<iostream>
using namespace std;

const int N = 2e6 + 10;

string s, t;
int n, m;
int pi[N];

int main() {
	cin >> s >> t;
	n = s.size();
	m = t.size();
	s = ' ' + t + '#' + s;
	for (int i = 2; i <= n + m + 1; i++) {
		int j = pi[i - 1];
		while (j && s[i] != s[j + 1])j = pi[j];
		if (s[i] == s[j + 1])j++;
		pi[i] = j;
		if (j == m)cout << i - 2 * m << endl; // 能够匹配
	}
	for (int i = 1; i <= m; i++)cout << pi[i] << " ";
	cout << endl;

}
```

### next 数组版本

大多数教材中的 next 数组版本，其实是把 "用前缀函数解决字符串匹配问题" 的过程拆成两部分：

- 先预处理模式串 $t$ 的前缀函数 - next 数组；

- 在暴力匹配的过程中，用生成的 bext 数组，加速匹配。当第一次匹配失败的时候，前面已经匹配的字符串的信息我们是已知的。此时，可以利用前面已经匹配的字符串的 border，来加速匹配。

```c++
string s, t;
int n, m;
int ne[N];

void kmp() {
	n = s.size();
	m = t.size();
	s = ' ' + s;
	t = ' ' + t;
	// 预处理模式串的 next 数组
	for (int i = 2, j = 0; i <= m; i++) {
		while (j && t[i] != t[j + 1])j = ne[j];
		if (t[i] = t[j + 1])j++;
		ne[i] = j;
	}
	// 利用 next 数组匹配
	for (int i = 1, j = 0; j <= n; i++) {
		while (j && s[i] != t[j + 1])j = ne[j];
		if (s[i] == t[j + 1])j++;
		if (j == a)cout << i - m + 1 << endl;
	}
}
```

### 周期和循环节

例题：[UVA10298 Power Strings](https://www.luogu.com.cn/problem/UVA10298)

::: danger 警告

该部分尚未完工!

:::

例题：[P4391 [BalticOI 2009] Radio Transmission 无线传输](https://www.luogu.com.cn/problem/P4391)

::: danger 警告

该部分尚未完工!

:::

### 练习题

例题：[P4824 [USACO15FEB] Censoring S](https://www.luogu.com.cn/problem/P4824)

::: danger 警告

该部分尚未完工!

:::

例题：[P9606 [CERC2019] ABB](https://www.luogu.com.cn/problem/P9606)

::: danger 警告

该部分尚未完工!

:::

## manacher

::: danger 警告

该部分尚未完工!

:::
