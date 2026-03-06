# 数据结构

::: danger 警告
该页面尚未完工!
:::

::: details 目录

[[toc]]

:::

## 顺序表

### 线性表与顺序表的概念

线性表是 n 个具有相同特性的数据元素的有序序列。线性表的顺序存储就是顺序表。

### 顺序表的实现方式

按照数组的申请方式，有以下两种实现方式：

- 数组采用静态分配，此时的顺序表称为静态顺序表。就是直接向内存申请一大块连续的区域，然后将需要存放的数组放在这一大块连续的区域上。

- 数组采用动态分配，此时的顺序表称为动态顺序表。就是按照需要存放的数据的数量，合理的申请大小合适的空间来存放数据。

在算法竞赛中，我们主要关心的其实是时间开销，空间上是基本够用的。因此，定义一个超大的静态数组来解决问题是完全可以接受的。

### 创建顺序表

```c++
const int N = 1e6 + 10; // 定义静态数组的最大长度

int a[N], n; // 直接创建一个大数组来实现顺序表，n 表示当前有多少个元素。
```

### 插入元素

**尾插：在顺序表表尾的后面，插入一个新元素。**

时间复杂度：O(1)

```c++
// 尾插
void push_back(int x) {
	a[++n] = x;
}
```

::: tip 提示

约定：下标为 0 的位置，不存储有效数据。也就是说数据是从 a[1] 开始存储。

:::

**头插：在顺序表表头的前面，插入一个新元素。**

1: 将[1,n]内所有元素右移一位；

2: 新的元素放在表头；

3: 元素个数 +1。

```c++
// 头插
void push_front(int x) {
	for (int i = n; i >= 1; i--) {
		a[i + 1] = a[i];
	}
	a[1] = x;
	n++;
}
```

**任意位置插入：在位置 p 处，插入一个新的元素。**

1: 将[p,n]内所有元素右移一位；

2: 把新的元素放在 p 位置上；

3: 元素个数 +1。

时间复杂度：O(n)

```c++
// 任意位置插入
void insert(int p, int x) {
	for (int i = n; i >= p; i--)a[i + 1] = a[i];
	a[p] = x;
	n++;
}
```

### 删除元素

**尾删：删除顺序表的表尾元素。**

时间复杂度：O(1)

```c++
// 尾删
void pop_back() {
	n--;
}
```

**头删：删除顺序表的表头元素。**

1: 将[2,n]区间内的元素统一左移一位；

2: 元素个数 -1。

时间复杂度：O(n)

```c++
void pop_front() {
	for (int i = 2; i <= n; i++)a[i - 1] = a[i];
	n--;
}
```

**删除任意位置元素：删除位置 p 的元素。**

1: 将[p + 1,n]区间内的元素统一左移一位；

2: 元素个数 -1。

```c++
// 任意位置删除
void erase(int p) {
	for (int i = p + 1; i <= n; i++)a[i - 1] = a[i];
	n--;
}
```

### 查找元素

**按值查找：查找顺序表中数值 x 存储的位置**

策略：从前往后遍历整个顺序表，判断遍历到的元素是否等于 x。

时间复杂度：O(n)

```c++
// 按值查找
int find(int x) {
	for (int i = 1; i <= n; i++) {
		if (a[i] == x)return i;
	}
	return 0;
}
```

**按位查找：返回顺序表中第 p 位的元素**

时间复杂度：O(1)

```c++
// 按位查找
int at(int p) {
	return a[p];
}
```

### 修改元素

**修改元素：修改顺序表中第 p 位的元素为 x**

时间复杂度：O(1)

```c++
// 修改元素
void change(int p, int x) {
    a[p] = x;
}
```

### 清空顺序表

**清空顺序表：将顺序表置空**

时间复杂度：O(1)

```c++
// 清空顺序表
void clear() {
    n = 0;
}
```

::: warning 注意

要注意，我们直接实现的简单形式的时间复杂度是 O(1)。

但是，严谨的方式应该是 O(n)。

:::

### 封装静态顺序表

利用 C++中的结构体和类把我们实现的顺序表封装起来，就能简化操作，使代码的复用率大大提升。

```c++
class SQList {
	int a[N];
	int n;
public:
	// 尾插
	void push_back(int x) {
		a[++n] = x;
	}
	// 打印
	void print() {
		for (int i = 1; i <= n; i++)cout << a[i] << " ";
		cout << endl;
	}
	// ...
}
```

## 链表

### 链表的定义

- 链表：用**链式存储**实现的线性表。

- 带头链表：链表中第一个结点不存放数据元素，只存放下一个结点的指针。插入和删除操作更方便。

- 双向链表：每个结点除了存放数据元素外，还存放两个指针，分别指向该结点的前一个结点和后一个结点。方便找到前驱结点。

- 循环链表：最后一个结点的指针域指向头结点。从任意结点开始都能遍历整个链表。

链表的实现方式分为**动态实现**和**静态实现**两种。

- 动态实现是通过 new 申请结点，然后通过 delete 释放结点的形式构造链表。这种实现方式最能体现链表的特性；

- 静态实现是利用两个数组配合来模拟链表。运行速度很快，在算法竞赛中会经常使用到。

### 单链表的静态实现

要求：**两个足够大的数组**，**两个变量**

- 其中一个数组 elem 存储数据，充当数据域；

- 另一个数组 next 存储下一个结点的下标，充当指针域。

- 一个变量 h 标记头结点的下标；

- 另一个变量 id 标记新来结点的存储位置。

**定义、创建、初始化**

```c++
const int N = 1e5 + 10;

int e[N], ne[N], h, id;
```

**头插**

> 这是链表中最常用也是使用最多的操作。

1: 先把 x 放在一个格子里面；

2: x 的右指针指向哨兵位的后继

3: 哨兵位的右指针指向 x。

时间复杂度：O(1)

```c++
// 头插
void push_front(int x) {
	id++;
	e[id] = x;
	ne[id] = ne[h];
	ne[h] = id;
}
```

**遍历链表**

时间复杂度：O(n)

```c++
// 遍历链表
void print() {
	// 定义一个指针从头结点开始
	// 通过 ne 数组逐渐向后移动
	// 知道遇到空指针
	for (int i = ne[h]; i; i = ne[i])cout << e[i] << " ";
	cout << endl;
}
```

**按值查找**

解法一：遍历整个链表即可。时间复杂度：O(n)

解法二：如果存储的值数据范围不大，且无重复值，可以使用哈希表优化。时间复杂度：O(1)

::: code-group

```c++ [解法1]
// 遍历整个链表
int find(int x) {
	for (int i = ne[h]; i; i = ne[i])if (e[i] == x)return i;
	return 0;
}
```

```c++ [解法2]{2,7,12-14}
// 用哈希表优化
int mp[N]; // mp[i] 表示 i 这个元素存放的位置

void push_front(int x) {
	id++;
	e[id] = x;
	mp[x] = id;// 标记 x 存储的位置
	ne[id] = ne[h];
	ne[h] = id;
}

int find(int x) {
	return mp[x];
}
```

:::

**在任意（存储）位置之后插入元素**

时间复杂度：O(1)

```c++
void insert(int p, int x) {
	id++;
	e[id] = x;
	mp[x] = id;// 标记 x 存储的位置
	ne[id] = ne[p];
	ne[p] = id;
}
```

::: warning 警告注意

这里的 p 是存储位置，不是元素，也不是链表位置。

:::

**删除任意（存储）位置之后的元素**

时间复杂度：O(1)

```c++
void erase(int p) {
	if (ne[p]) { // 当 p 不是最后一个元素的时候
		mp[e[ne[p]]] = 0; // 把标记清空
		ne[p] = ne[ne[p]];
	}
}
```

### 双向链表的静态实现

要求：**三个足够大的数组**

- 第一个数组 `elem` 存储数据；

- 第二个数组 `prev` 存储前一个元素的存储下标；

- 第三个数组 `next` 存储下一个元素的存储下标。

```c++
const int N = 1e5 + 10;

int e[N], ne[N], pre[N], id, h;
```

**头插**

时间复杂度：O(1)

```c++
// 头插
void push_front(int x) {
	id++;
	e[id] = x;
	pre[id] = h;
	ne[id] = ne[h];
	pre[ne[h]] = id;
	ne[h] = id;
}
```

**遍历链表**

直接无视 `prev` 数组，与单链表的遍历方式一致。

```c++
// 遍历链表
void print() {
	for (int i = ne[h]; i; i = ne[i])cout << e[i] << " ";
	cout << endl;
}
```

**按值查找**

时间复杂度：O(1)

```c++{1,7,15-17}
int mp[N]; // mp[i] 表示 i 这个值存储的位置

// 头插
void push_front(int x) {
	id++;
	e[id] = x;
	mp[x] = id;
	pre[id] = h;
	ne[id] = ne[h];
	pre[ne[h]] = id;
	ne[h] = id;
}

// 按值查找
int find(int x) {
	return mp[x];
}
```

**在任意（存储）位置之后插入元素**

1: id++，标记新结点存储的位置；把新的元素存储下来；

2: 修改新结点的前驱指针，让其指向 p 位置；

3: 修改新结点的后继指针，让其指向 p 位置的下一个位置；

4: 修改 p 下一个位置的前驱指针，让其指向新的结点；

5: 修改 p 的后继指针，让其指向新的结点。

时间复杂度：O(1)

```c++
// 在任意位置之后插入元素
void insert(int p,int x) {
	id++;
	e[id] = x;
	mp[x] = id;
	pre[id] = p;
	ne[id] = ne[p];
	pre[ne[p]] = id;
	ne[p] = id;
}
```

**在任意（存储）位置之前插入元素**

1: id++，标记新结点存储的位置；

2: 修改新结点的前驱指针，让其指向 p 的前一个位置；

3: 修改新结点后继指针，让其指向 p 位置；

4: 修改 p 前一个位置的后继指针，让其指向新的结点；

5: 修改 p 的前驱指针，让其指向新的结点。

```c++
// 在任意位置之前插入元素
void insert_front(int p, int x) {
	id++;
	e[id] = x;
	mp[x] = id;
	pre[id] = pre[p];
	ne[id] = p;
	ne[pre[p]] = id;
	pre[p] = id;
}
```

**删除任意（存储）位置的元素**

- 让 p 的前驱结点的后继指针指向 p 的后继结点；

- 让 p 的后继结点的前驱指针指向 p 的前驱结点。

时间复杂度：O(1)

```c++
// 删除任意位置的元素
void erase(int p) {
	mp[e[p]] = 0; // 把标记清空
	ne[pre[p]] = ne[p];
	pre[ne[p]] = pre[p];
}
```

## 栈

栈是一种只允许**在一端**进行**插入和删除**操作的**线性表**。

- 进行数据插入或删除的一段称为**栈顶**，另一端称为**栈底**。。不含元素的栈称为**空栈**。

- **进栈**就是往栈中放入元素，**出栈**就是将元素弹出栈顶。

::: warning 注意

如果定义了一个栈结构，那么添加和删除元素只能在栈顶进行不能随意添加和删除元素。

:::

### 创建栈结构

1: 创建一个足够大的数组，充当栈结构；

2: 再定义一个变量 `n`，用来记录栈中元素的个数，同时还可以标记栈顶的位置。

```c++
const int N = 1e5 + 10;

int stk[N], n;
```

::: warning 注意

这里舍弃下标为 0 的位置，有效元素从 1 开始记录。

:::

### 进栈

时间复杂度：O(1)

```c++
// 进栈
void push(int x) {
	stk[++n] = x;
}
```

### 出栈

不用真的删除元素，只用将元素个数减 1，就相当于删除栈顶元素。

时间复杂度：O(1)

```c++
// 出栈
void pop() {
	n--;
}
```

### 获取栈顶元素

时间复杂度：O(1)

```c++
// 获取栈顶元素
int top() {
	return stk[n];
}
```

### 判断栈是否为空

时间复杂度：O(1)

```c++
// 判断栈是否为空
bool empty() {
	return n == 0;
}
```

### 获取栈中有效元素个数

时间复杂度：O(1)

```c++
// 获取栈中元素个数
int size() {
	return n;
}
```

## 队列

队列也是一种特殊的**线性表**，它只允许在表的**一端进行插入操作**，在**另一端进行删除操作**。

- 允许插入的一段称为**队尾**，允许删除的一端称为**队头**。

- 先进入队列的元素会先出队，故队列具有**先进先出（First In First Out）**的特性。

### 创建队列

**要求：**

- 一个足够大的数组充当队列；

- 一个变量 `h` 标记队头元素的前一个位置；

- 一个变量 `t` 标记队尾元素的位置。

```c++
const int N = 1e5 + 10;

int q[N], h, t;
```

::: warning 注意

这里舍弃下标为 0 的位置，有效元素从 1 开始记录。

:::

### 入队

时间复杂度：O(1)

```c++
// 入队
void push(int x) {
	q[++t] = x;
}
```

### 出队

时间复杂度：O(1)

```c++
// 出队
void pop() {
	h++;
}
```

### 获取队头元素

时间复杂度：O(1)

```c++
// 获取队头元素
int front() {
	return q[h + 1];
}
```

### 获取队尾元素

时间复杂度：O(1)

```c++
// 获取队尾元素
int back() {
	return q[t];
}
```

### 判断队列是否为空

时间复杂度：O(1)

```c++
bool empty() {
	return h == t;
}
```

### 获取队列中有效元素个数

时间复杂度：O(1)

```c++
int size() {
	return t - h;
}
```

## 树

树形结构是一类重要的非线性数据结构。

树是 n(n>=0) 个结点的有限集。当 n=0 时，称为空树。在任意一颗非空树中应满足：

- 有且仅有一个特定的称为根(root)的结点；

- 当 n>1 时，其余结点可分为 m(m>0) 个互不相交的有限集 T，其中每一个集合本身又是一棵树，并且称为根的子树。

::: details 相关术语

- 父节点：直接前驱，根结点没有父结点；

- 孩子节点：直接后继，叶子结点没有孩子结点；

- 结点的度：孩子的数量；

- 树的度：所有结点中，度的最大值；

- 树的高度：一共有多少层；

- 两个结点之间的路径：两个结点之间的最短路径；

- 路径长度：两点的路径中，边的个数。

:::

::: details 性质

结点个数 = 边数 + 1

:::

### 树的分类

- 有序树：结点的子树按照从左往右的顺序排序，不能更改

- 无序树：结点的子树之间没有顺序，随意更改

::: tip 提示

除了二叉树以外，我们在算法竞赛中遇到的树基本上都是无序树。也就是说，不需要考虑孩子结点的顺序。

:::

- 有根树：树的根结点是固定的

- 无根树：树的根结点是不固定的，谁都可以是根结点

::: tip 提示

无根树会导致父子关系不明确，在存储的时候需要注意。算法竞赛中，一般遇到的树都是无根树。

即使是有根树，也会存在父子关系未知的情况。此时我们需要把所有的情况都存下来，比如 a 和 b 之间有一条边，我们不仅要存 a 有一个孩子 b，也要存 b 有一个孩子 a。

:::

### 树的存储-孩子表示法

树结构相对线性结构来说就比较复杂。存储时，既要保存值域，也要保存结点域结点之间的关系。实际中树有很多种存储方式：**双亲表示法**、**孩子表示法**、**孩子双亲表示法**、**孩子兄弟表示法**等。

- **孩子表示法**：对于每一个结点，只存储所有孩子的信息。(如果不清楚父子关系，那就把与该结点相连的结点都存下来)

**实现方式一：用 vector 数组**

1：创建一个大小足够的 vector 数组`vector<int> edges[N];`。其中，`edges[i]`里面就存着 i 号结点的所有孩子。

2：对于 i 的孩子，直接`edges[i].push_back;`进去即可。

![treelist-vector](/images/algorithm/data-structure/treelist-vector.png)

```c++
#include<iostream>
#include<vector>
using namespace std;

const int N = 1e5 + 10;

int n;
vector<int> edges[N]; // 存储树

int main() {
	cin >> n;
	for (int i = 1; i < n; i++) {
		int a, b;
		cin >> a >> b; // a 和 b 之间有一条边
		edges[a].push_back(b);
		edges[b].push_back(a);
	}
}
```

**实现方式二：链式前向星**

本质就是用链表存储所有的孩子，其中链表是用数组模拟实现的。

1：创建一个足够大的数组 h，作为所有结点的哨兵位；

2：创建两个足够大的数组 e 和 ne，一个作为数据域，一个作为指针域；

3：一个变量 id，标记新来结点存储的位置；

4：当 x 有一个孩子 y 的时候，就把 y 头插到 x 的链表中。

```c++
#include<iostream>
using namespace std;

const int N = 1e5 + 10;

// 链式前向星
int h[N], e[N * 2], ne[N * 2], id;
int n;

// 把 b 头插到 a 所在的链表后面
void add(int a, int b) {
	id++;
	e[id] = b;
	ne[id] = h[a];
	h[a] = id;
}

int main() {
	cin >> n;
	for (int i = 1; i < n; i++) {
		int a, b;
		cin >> a >> b;
		add(a, b);
		add(b, a);
	}
}
```

### 树的遍历-深度优先遍历(DFS)

深度优先遍历，英文缩写为 DFS，全称是 Depth First Search，是一种用于遍历或搜索树或图的算法。所谓深度优先，就是说每次都尝试向更深的结点走，也就是一条路走到黑。当一条路走完，走到不能再走的时候，那就回去，继续找别的路。

![DFS](/images/algorithm/data-structure/DFS.png)

::: code-group

```c++ [用 vector 数组]
#include<iostream>
#include<vector>
using namespace std;

const int N = 1e5 + 10;

int n;
vector<int> edges[N]; // 存储树
bool st[N]; // 标记哪些点已经访问过了

void dfs(int u) {
	cout << u << " ";
	st[u] = true; // 当前这个点已经访问过了

	// 访问所有的孩子
	for(auto v : edges[u]){
		if(!st[v]) dfs(v);
	}
}

int main() {
	// 建树
	cin >> n;
	for (int i = 1; i < n; i++) {
		int a, b;
		cin >> a >> b; // a 和 b 之间有一条边
		edges[a].push_back(b);
		edges[b].push_back(a);
	}

	// 深度优先遍历
	dfs(1);
}
```

```c++ [用链式前向星]
#include<iostream>
using namespace std;

const int N = 1e5 + 10;

// 链式前向星
int h[N], e[N * 2], ne[N * 2], id;
int n;

bool st[N]; // 标记哪些点已经访问过了

// 把 b 头插到 a 所在的链表后面
void add(int a, int b) {
	id++;
	e[id] = b;
	ne[id] = h[a];
	h[a] = id;
}

void dfs(int u) {
	cout << u << " ";
	st[u] = true;

	for (int i = h[u]; i; i = ne[i]) {
		int v = e[i];
		if (!st[v]) dfs(v);
	}
}

int main() {
	cin >> n;
	for (int i = 1; i < n; i++) {
		int a, b;
		cin >> a >> b;
		add(a, b);
		add(b, a);
	}

	// 深度优先遍历
	dfs(1);
}
```

:::

### 树的遍历-宽度优先遍历(BFS)

宽度优先遍历，又名广度优先遍历或层序遍历，英文缩写为 BFS，全称是 Breadth First Search，也是一种用于遍历树或图的算法。就是每次都尝试访问同一层的结点。如果同一层都访问完了，再访问下一层。

1：创建一个队列，辅助 BFS；

2：根结点入队；

3：若队列不为空，队头结点出队并访问该结点，然后将该点的孩子依次入队；

4：重复 3 过程，直到队列为空。

::: code-group

```c++ [用 vector 数组]
#include<iostream>
#include<queue>
#include<vector>
using namespace std;

const int N = 1e5 + 10;

int n;
vector<int> edges[N]; // 存树
bool st[N];

void bfs() {
	queue<int> q;
	q.push(1);
	st[1] = true;
	while (q.size()) {
		int u = q.front();
		q.pop();
		cout << u << " ";
		for (auto v : edges[u]) {
			if (!st[v])q.push(v);
			st[v] = true;
		}
	}
}

int main() {
	// 建树
	cin >> n;
	for (int i = 1; i < n; i++) {
		int a, b;
		cin >> a >> b;
		edges[a].push_back(b);
		edges[b].push_back(a);
	}
	bfs();
}
```

```c++ [用链式前向星]
#include<iostream>
#include<queue>
using namespace std;

const int N = 1e5 + 10;

int n;
int h[N], e[N * 2], ne[N * 2], id;
bool st[N];

void add(int a, int b) {
	id++;
	e[id] = b;
	ne[id] = h[a];
	h[a] = id;
}

void bfs() {
	queue<int> q;
	q.push(1);
	st[1] = true;
	while (q.size()) {
		int u = q.front();
		q.pop();
		cout << u << " ";
		for (int i = h[u]; i; i = ne[i]) {
			int v = e[i];
			if (!st[v]) {
				q.push(v);
				st[v] = true;
			}
		}
	}
}

int main() {
	cin >> n;
	for (int i = 1; i < n; i++) {
		int a, b;
		cin >> a >> b;
		add(a, b);
		add(b, a);
	}
	bfs();
}
```

:::

## 二叉树

::: danger 警告
该部分尚未完工!
:::

## 堆

::: danger 警告
该部分尚未完工!
:::

## 红黑树

::: danger 警告
该部分尚未完工!
:::

## 哈希表

::: danger 警告
该部分尚未完工!
:::

## 排序

### 插入排序

**插入排序(Insertion Sort)** 类似于玩扑克牌插牌过程，每次将一个待排序的元素按照其关键字大小插入到前面已经有序的序列中，按照这种方式将所有元素全部插入完成即可。

```c++
#include<iostream>
using namespace std;

const int N = 1e5 + 10;

int n;
int a[N];

void insert_sort() {
	for (int i = 2; i <= n; i++) { // 第一个位置默认就是有序的
		int key = a[i];
		// 前面比 key 大的，统一右移
		int j = i - 1;
		while (j >= 1 && a[j] > key) {
			a[j + 1] = a[j];
			j--;
		}
		a[j + 1] = key;
	}
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	insert_sort();
	for (int i = 1; i <= n; i++)cout << a[i] << " ";
}
```

### 选择排序

**选择排序(Selection Sort)** 是一种特别直观的排序算法

<font color="blue">算法思想：</font>每次找出未排序序列中最小的元素，然后放进有序序列的后面。

```c++
#include<iostream>
#include<utility>
using namespace std;

const int N = 1e5 + 10;

int n;
int a[N];

void selection_sort() {
	for (int i = 1; i < n; i++) { // 带排序区间的首位置
		// [i, n] 区间就是待排序的区间
		int pos = i;
		for (int j = i + 1; j <= n; j++) { // 查找待排序区间最小的元素的下标
			if (a[j] < a[pos])pos = j;
		}
		swap(a[i], a[pos]);
	}
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	selection_sort();
	for (int i = 1; i <= n; i++)cout << a[i] << " ";
}
```

### 冒泡排序

**冒泡排序(Bubble Sort)** 也是一种简单的排序算法。

<font color="blue">算法思想：</font>执行 n-1 趟操作，每趟从前往后比较待排序区间的相邻元素，如果逆序，就交换。每趟结束之后，就会有一个较大元素在最终的位置上。

```c++
#include<iostream>
#include<utility>
using namespace std;

const int N = 1e5 + 10;

int n;
int a[N];

void bubble_sort() {
	for (int i = n; i > 1; i--) { // 依次枚举待排序区间的最后一个元素
		// [1, i] 就是待排序区间
		for (int j = 1; j < i; j++) {
			if (a[j] > a[j + 1])swap(a[j], a[j + 1]);
		}
	}
}


int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	bubble_sort();
	for (int i = 1; i <= n; i++)cout << a[i] << " ";
}
```

::: details 冒泡排序优化

当某一趟冒泡操作中，没有执行元素的交换操作时，整个序列就是有序的了，没有必要再继续执行冒泡排序算法了。

```c++
// 优化后的冒泡排序
void bubble_sort() {
	for (int i = n; i > 1; i--) { // 依次枚举待排序区间的最后一个元素
		bool flag = false;
		// [1, i] 就是待排序区间
		for (int j = 1; j < i; j++) {
			if (a[j] > a[j + 1]){
				swap(a[j], a[j + 1]);
				flag = true;
			}
		}
	}
	if (!flag)return;
}
```

:::

### 堆排序

堆排序(Heap Sort)是指利用堆这种数据结构所设计的一种排序算法。本质上是优化了选择排序算法，如果将数据放在堆中，能够快速找到待排序元素中的最小值或最大值。

堆排序的过程分两步：

**1. 建堆。** (升序建大根堆，降序建小根堆)是将待排序数组的基础上，使其变成一个堆。从倒数第一个非叶子结点开始，执行向下调整算法，直到根结点。

**2. 排序。** 每次将堆顶元素与堆中最后一个元素交换，堆的大小减一，然后将堆顶元素向下调整。重复上述过程，直到堆中剩下一个元素。

**向下调整算法**: 对于一棵树，选取其根结点与其最大(最小)的子结点进行比较，若根结点小于(大于)子结点，则交换两者，并继续向下比较，直到根结点大于等于(小于等于)其子结点为止。

建堆时间复杂度：O(n)

排序时间复杂度：O(nlogn)

```c++
#include<iostream>
#include<utility>
using namespace std;

const int N = 1e5 + 10;

int n;
int a[N];

// 向下调整算法
void down(int parent,int len) {
	int child = parent * 2;
	while (child<=len) {
		if (child + 1 <= len && a[child + 1] > a[child])child++;
		if (a[parent] >= a[child])return;
		swap(a[parent], a[child]);
		parent = child;
		child = parent * 2;
	}
}

// 堆排序
void heap_sort() {
	// 1.建堆
	for (int i = n / 2; i >= 1; i--)down(i, n);
	// 2.排序
	for (int i = n; i > 1; i--) { // 枚举堆里面最后一个元素的位置
		swap(a[1], a[i]);
		down(1, i - 1);
	}
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	heap_sort();
	for (int i = 1; i <= n; i++)cout << a[i] << " ";
}
```

### 快速排序

快速排序(Quick Sort)在很多情况下，是效率较高的算法。

<font color="blue">朴素快排的核心原理：</font>

1. 从待排序区间中选择一个基准元素，按照基准元素的大小将区间分成左右两部分；

2. 然后递归地处理左区间和右区间，直到区间长度为 1。

<font color="blue">时间复杂度：</font>

- 如果每次基准元素都选择得当，数组划分的比价均匀，时间复杂度 = 递归层数 \* N = O(nlogn)

- 如果划分不当，数组分布比较极端，时间复杂度退化成 O(n^2)

::: warning 朴素快排的缺陷

- 基准元素选择不当，递归层数会增加，时间复杂度变高；

解决方案：在待排序区间中，随机选择一个基准元素。利用 C++提供的随机函数，在一个区间内随机选择一个元素作为基准。

```c++
srand(time(0)) // 种下一个随机数种子
rand() // 获得一个随机数
rand() % (right - left + 1) + left // 在 [left, right] 区间内，随机选择一个数
```

:::

::: warning 朴素快排的缺陷

- 当有大量重复元素时，递归层数也会增加。

解决方案：在划分区间时，如果划分的区间长度小于某个阈值，则将区间直接排序。

:::

```c++
#include<iostream>
#include<ctime>
#include<cstdlib>
#include<utility>
using namespace std;

const int N = 1e5 + 10;

int n;
int a[N];

// 优化一：随机选择基准元素
int get_random(int left, int right) {
	return a[rand() % (right - left + 1) + left];
}

void quick_sort(int left, int right) {
	if (left >= right)return;
	// 1.选择一个基准元素
	int p = get_random(left, right);
	// 2. 数组分三块
	int l = left - 1, i = left, r = right + 1;
	while (i < r) {
		if (a[i] < p)swap(a[++l], a[i++]);
		else if (a[i] == p)i++;
		else swap(a[--r], a[i]);
	}
	// [left, l] [l + 1, r - 1] [r, right]
	quick_sort(left, l);
	quick_sort(r, right);
}

int main() {
	srand(time(0));
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	quick_sort(1,n);
	for (int i = 1; i <= n; i++)cout << a[i] << " ";
}
```

### 归并排序

归并排序(Merge Sort)是无论数据有什么特性，时间复杂度就能稳定 N \* logN 的排序算法。

<font color="blue">主要过程：</font>

1. 只要能分，就将整个区间从中间一分为二，先将左区间和右区间排序；

2. 然后将左右两个已经排好序的区间合并在一起。

其中，如何让左右两边有序，就继续交给归并排序。

- 因此归并排序是用递归来实现的；

```c++
#include<iostream>
using namespace std;

const int N = 1e5 + 10;

int n;
int a[N];
int tmp[N]; // 辅助归并排序时，合并两个有序数组

void merge_sort(int left,int right) {
	if (left >= right)return;
	// 1.先一分为二
	int mid = (left + right) >> 1;
	// [left, mid] [mid + 1, right]
	// 2.先让左右区间有序
	merge_sort(left, mid);
	merge_sort(mid + 1, right);
	// 3.合并两个有序数组
	int cur1 = left, cur2 = mid + 1, i = left;
	while (cur1 <= mid && cur2 <= right) {
		if (a[cur1] <= a[cur2])tmp[i++] = a[cur1++];
		else tmp[i++] = a[cur2++];
	}
	while (cur1 <= mid)tmp[i++] = a[cur1++];
	while (cur2 <= right)tmp[i++] = a[cur2++];
	for (int j = left; j <= right; j++)a[j] = tmp[j];
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	merge_sort(1, n);
	for (int i = 1; i <= n; i++)cout << a[i] << " ";
}
```

## 单调栈

单调栈，顾名思义，就是具有单调性的栈。它依旧是一个栈结构，只不过里面存储的数据是严格递增或者严格递减的。

单调栈能帮助我们解决以下四个问题：

- 寻找当前元素左侧，离它最近，并且比它大的元素在哪；

- 寻找当前元素左侧，离它最近，并且比它小的元素在哪；

- 寻找当前元素右侧，离它最近，并且比它大的元素在哪；

- 寻找当前元素右侧，离它最近，并且比它小的元素在哪。

虽然是四个问题，但是原理是一致的。

时间复杂度：$O(n)$

### 单调栈的实现

**基本思想：栈 + 贪心**

```c++
#include<stack>

using namespace std;

const int N = 3e6 + 10;
int a[N], n;

void test1() {
	stack<int> st; // 维护一个严格单调递增的栈
	for (int i = 1; i <= n; i++) {
		// 栈里面大于等于 a[i] 的元素全部出栈
		while (st.size() && st.top() >= a[i])st.pop();
		st.push(a[i]);
	}
}

void test2() {
	stack<int> st; // 维护一个严格单调递减的栈
	for (int i = 1; i <= n; i++) {
		// 栈里面小于等于 a[i] 的元素全部出栈
		while (st.size() && st.top() <= a[i])st.pop();
		st.push(a[i]);
	}
}
```

### 单调栈的使用方法

**寻找当前元素左侧，离它最近，并且比它大的元素在哪：**

> 从左往右遍历元素，构造一个单调递减的栈。**插入当前位置的元素时**：
>
> - 如果栈为空，则左侧不存在比当前元素大的元素；
> - 如果栈非空，插入当前位置元素时的栈顶元素就是所找的元素。
>
> 注意，因为我们要找的是最终结果的位置。因此，栈里面存的是每个元素的下标。

**寻找当前元素左侧，离它最近，并且比它小的元素在哪：**

> 从左往右遍历元素，构造一个单调递增的栈。**插入当前位置的元素时**：
>
> - 如果栈为空，则左侧不存在比当前元素小的元素；
> - 如果栈非空，插入当前位置元素时的栈顶元素就是所找的元素。
>
> 注意，因为我们要找的是最终结果的位置。因此，栈里面存的是每个元素的下标。

### 单调栈模板

**模板一：寻找当前元素左侧，离它最近，并且比它大的元素在哪**

```c++
#include<iostream>
#include<stack>
#include<cstring>

using namespace std;

const int N = 1e5 + 10;

int n;
int a[N];
int ret[N];

// 模板一：寻找当前元素左侧，离它最近，并且比它大的元素在哪
void test() {
	memset(ret, -1, sizeof ret);
	stack<int> st; // 单调递减 - 元素的下标
	for (int i = 1; i <= n; i++) {
		while (st.size() && a[st.top()] <= a[i])st.pop();
		if (st.size()) ret[i] = st.top(); // 下标
		st.push(i); // 下标
	}
	for (int i = 1; i <= n; i++)cout << ret[i] << " ";
	cout << endl;
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	test();
}
```

**模板二：寻找当前元素左侧，离它最近，并且比它小的元素在哪：**

```c++
#include<iostream>
#include<stack>
#include<cstring>

using namespace std;

const int N = 1e5 + 10;

int n;
int a[N];
int ret[N];

// 模板二：寻找当前元素左侧，离它最近，并且比它小的元素在哪
void test() {
	memset(ret, -1, sizeof ret);
	stack<int> st; // 单调递增 - 元素的下标
	for (int i = 1; i <= n; i++) {
		while (st.size() && a[st.top()] >= a[i])st.pop();
		if (st.size()) ret[i] = st.top(); // 下标
		st.push(i); // 下标
	}
	for (int i = 1; i <= n; i++)cout << ret[i] << " ";
	cout << endl;
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	test();
}
```

**模板三：寻找当前元素右侧，离它最近，并且比它大的元素在哪：**

```c++
#include<iostream>
#include<stack>
#include<cstring>

using namespace std;

const int N = 1e5 + 10;

int n;
int a[N];
int ret[N];

// 模板三：寻找当前元素右侧，离它最近，并且比它大的元素在哪
void test() {
	memset(ret, -1, sizeof ret);
	stack<int> st; // 单调递增 - 元素的下标
	for (int i = n; i >= 1; i--) {
		while (st.size() && a[st.top()] <= a[i])st.pop();
		if (st.size()) ret[i] = st.top(); // 下标
		st.push(i); // 下标
	}
	for (int i = 1; i <= n; i++)cout << ret[i] << " ";
	cout << endl;
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	test();
}
```

**模板四：寻找当前元素右侧，离它最近，并且比它小的元素在哪：**

```c++
#include<iostream>
#include<stack>
#include<cstring>

using namespace std;

const int N = 1e5 + 10;

int n;
int a[N];
int ret[N];

// 模板四：寻找当前元素右侧，离它最近，并且比它小的元素在哪
void test() {
	memset(ret, -1, sizeof ret);
	stack<int> st; // 单调递增 - 元素的下标
	for (int i = n; i >= 1; i--) {
		while (st.size() && a[st.top()] >= a[i])st.pop();
		if (st.size()) ret[i] = st.top(); // 下标
		st.push(i); // 下标
	}
	for (int i = 1; i <= n; i++)cout << ret[i] << " ";
	cout << endl;
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	test();
}
```

::: tip 总结

- 找左侧，正遍历；找右侧，逆遍历；

- 比它大，单调减；比它小，单调增。

:::

例题：[P5788 【模板】单调栈](https://www.luogu.com.cn/problem/P5788)

```c++
#include<iostream>
#include<stack>

using namespace std;

const int N = 3e6 + 10;

int n;
int a[N];
int ret[N];

void test() {
	stack<int> st; // 单调递增 - 元素的下标
	for (int i = n; i >= 1; i--) {
		while (st.size() && a[st.top()] <= a[i])st.pop();
		if (st.size()) ret[i] = st.top(); // 下标
		st.push(i); // 下标
	}
	for (int i = 1; i <= n; i++)cout << ret[i] << " ";
	cout << endl;
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	test();
}
```

例题：[P1901 发射站](https://www.luogu.com.cn/problem/P1901)

::: danger 警告

该部分尚未完工!

:::

## 单调队列

单调队列，顾名思义，就是存储的元素要么单调递增要么单调递减的队列（双端队列）。

单调队列一般用于解决滑动窗口内最大值最小值问题，以及优化动态规划。

例题：[P1886 【模板】单调队列 / 滑动窗口](https://www.luogu.com.cn/problem/P1886)

<p><font color=blue>求窗口内最大值：双端队列（单调递减） + 贪心</font></p>

<p><font color=blue>求窗口内最小值：双端队列（单调递增） + 贪心</font></p>

```c++
#include<iostream>
#include<deque>

using namespace std;

const int N = 1e6 + 10;

int n, k;
int a[N];

int main() {
	cin >> n >> k;
	for (int i = 1; i <= n; i++)cin >> a[i];
	deque<int> q; // 存下标

	// 窗口内最小值 - 单调递增的队列 - 存下标
	for (int i = 1; i <= n; i++) {
		while (q.size() && a[q.back()] >= a[i])q.pop_back();
		q.push_back(i);
		// 判断队列里面元素是否在合法窗口内
		if (q.back() - q.front() + 1 > k)q.pop_front();
		if (i >= k)cout << a[q.front()] << " ";
	}
	cout << endl;

	// 窗口内最大值 - 单调递减的队列 - 存下标
	q.clear();
	for (int i = 1; i <= n; i++) {
		while (q.size() && a[q.back()] <= a[i])q.pop_back();
		q.push_back(i);
		// 判断队列里面元素是否在合法窗口内
		if (q.back() - q.front() + 1 > k)q.pop_front();
		if (i >= k)cout << a[q.front()] << " ";
	}
}
```

例题：[P2251 质量检测](https://www.luogu.com.cn/problem/P2251)

::: danger 警告

该部分尚未完工!

:::

## 并查集

::: danger 警告

该部分尚未完工!

:::

### 双亲表示法

::: danger 警告

该部分尚未完工!

:::

### 并查集的实现

::: danger 警告

该部分尚未完工!

:::

### 并查集的优化

::: danger 警告

该部分尚未完工!

:::

### 普通并查集

::: danger 警告

该部分尚未完工!

:::

例题：[P3367 【模板】并查集](https://www.luogu.com.cn/problem/P3367)

::: danger 警告

该部分尚未完工!

:::

例题：[P1551 亲戚](https://www.luogu.com.cn/problem/P1551)

::: danger 警告

该部分尚未完工!

:::

例题：[P1955 [NOI2015] 程序自动分析](https://www.luogu.com.cn/problem/P1955)

::: danger 警告

该部分尚未完工!

:::

### 扩展并查集

例题：[P1892 [BalticOI 2003] 团伙](https://www.luogu.com.cn/problem/P1892)

::: danger 警告

该部分尚未完工!

:::

例题：[P2024 [NOI2001] 食物链](https://www.luogu.com.cn/problem/P2024)

::: danger 警告

该部分尚未完工!

:::

### 带权并查集

例题：[P1196 [NOI2002] 银河英雄传说](https://www.luogu.com.cn/problem/P1196)

::: danger 警告

该部分尚未完工!

:::

## 字符串哈希

::: details 回忆：哈希函数和哈希冲突

- **哈希函数**：将关键字映射成对应的地址的函数，记为 `Hash(key) = Addr`。

- **哈希冲突**：哈希函数可能会把两个或两个以上的不同关键字映射到同一地址，这种情况称为哈希冲突。

:::

定义一个把字符串映射到整数的函数 $hash$，这就是字符串哈希。说白了，就是将一个字符串用一个整数表示。

在字符串哈希中，有一种冲突概率较小的哈希函数，将字符串映射成 p 进制的数字：

$$hash(s) = \sum_{i=0}^{n-1} s[i] * p^{n-i-1} (\mod M)$$

其中，p 通常取质数 131 或者 13331。如果把哈希值定义为 `unsigned long long` 类型，在 C++ 中，溢出就会自动取模。

> 你没有看错，字符串哈希就是背一个公式即可...

**但是，实际求哈希值时，我们用的是前缀哈希的思想来求，这样会和下面的多次询问子串哈希一致。**

### 前缀哈希数组

单次计算一个字符串的哈希值的时间复杂度是 $O(N)$。如果需要多次询问一个字符串的子串的哈希值，每次重新计算效率非常低下。

一般利用前缀和思想先预处理字符串中每个前缀的哈希值，这样的话每次就能快速求出字串的哈希了。

**前缀哈希数组：`f[i]` 表示前 i 个字符组成的字符串的哈希值**

```c++
typedef unsigned long long ULL;

const int N = 1e6 + 10, P = 13331;

char s[N];
int len; // 字符串的长度
ULL f[N]; // 前缀哈希数组
ULL p[N]; // 记录 p 的 i 次方

// 处理前缀哈希数组以及 p 的 i 次方数组
void init_hash() {
	f[0] = 0;
	p[0] = 1;
	for (int i = 1; i <= len; i++) {
		f[i] = f[i - 1] * P + s[i];
		p[i] = p[i - 1] * P;
	}
}

// 快速求得任意区间的哈希值
ULL get_hash(int l, int r) {
	return f[r] - f[l - 1] * p[r - l + 1];
}
```

::: details 如果题目只是简单的求单个字符串的哈希值

```c++
typedef unsigned long long ULL;

const int N = 1e6 + 10, P = 13331;
int len;
char s[N];

ULL gethash() {
	ULL ret = 0;
	for (int i = 1; i <= len; i++)ret = ret * P + s[i];
	return ret;
}
```

:::

例题：[P3370 【模板】字符串哈希](https://www.luogu.com.cn/problem/P3370)

<p><font color=blue>解法：把所有字符串利用“字符串哈希”映射成数之后，看看一共有多少个不同的数</font></p>

```c++
#include<iostream>
#include<algorithm>
using namespace std;

typedef unsigned long long ULL;

const int N = 1e4 + 10, P = 131;

int n;
int a[N];

// 字符串哈希
ULL get_hash(string& s) {
	ULL ret = 0;
	for (int i = 0; i < s.size(); i++)ret = ret * P + s[i];
	return ret;
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++) {
		string s;
		cin >> s;
		a[i] = get_hash(s);
	}
	int ret = 1;
	sort(a + 1, a + 1 + n);
	for (int i = 2; i <= n; i++)if (a[i] != a[i - 1])ret++;
	cout << ret << endl;
}
```

例题：[P10468 兔子与兔子](https://www.luogu.com.cn/problem/P10468)

::: danger 警告

该部分尚未完工!

:::

## Trie 树

Trie 树又叫字典树或前缀树，是一种能够快速插入和查询字符串的数据结构。它利用字符串的公共前缀，将字符串组织成一课树形结构，从而大大提高了存储以及查找效率。

我们可以把字典树想象成一棵多叉树，每一条边代表一个字符。从根节点到某个节点的路径就代表了一个字符串。

同时，对于每个结点，都需要另外维护 `pass` 和 `end` 两个变量。`pass` 标记当前节点一共经过了多少次，`end` 标记当前结点是多少个字符串的结尾。

::: details 示例

例如，要存储 `"abc"`、`"abd"`、`"acde"` 以及 `"cd"` 时，构建的字典树如下：

![创建的 Trie 树](/images/algorithm/data-structure/trie-tree.png)

:::

::: tip 字典树的作用

当我们在字典树的每一个结点位置，额外维护一些信息时，就可以做到很多事情：

- 查询某个单词是否出现过，并且出现几次；

- 查询有多少个单词是以某个字符串为前缀；

- 查询所有以某个前缀开头的单词。

:::

### 字典树的实现

目标：实现一个能够**查询单词出现次数**以及**查询有多少个单词是以某个字符串为前缀**的字典树、默认全是小写字母。

**准备工作**：

```c++
#include<string>

using namespace std;

const int N = 1e6 + 10; // 表示所有的字符串中一共有多少个字符

int tree[N][26]; // tree[i]：表示 i 号结点的孩子信息；tree[i][0]：表示 'a' 的路径信息
int p[N], e[N]; // p[i]：表示 i 号结点的 pass 信息；e[i]：表示 i 号结点的 end 信息
int idx; // 新来一个字符之后，为它分配位置
```

**插入字符串**：

```c++
void insert(string& s) {
	int cur = 0; // 从根结点开始
	p[cur]++; // 这个格子经过一次
	for (auto ch : s) {
		int path = ch - 'a';
		// 如果没有路
		if (tree[cur][path] == 0)tree[cur][path] = ++idx;
		cur = tree[cur][path];
		p[cur]++;
	}
	e[cur]++;
}
```

**查询字符串出现的次数**：

```c++
int find(string& s) {
	int cur = 0;
	for (auto ch : s) {
		int path = ch - 'a';
		if (tree[cur][path] == 0)return 0;
		cur = tree[cur][path];
	}
	return e[cur];
}
```

**查询有多少个单词以字符串 `s` 为前缀**

```c++
int find_pre(string& s) {
	int cur = 0;
	for (auto ch : s) {
		int path = ch - 'a';
		if (tree[cur][path] == 0)return 0;
		cur = tree[cur][path];
	}
	return p[cur];
}
```

例题：[P8306 【模板】字典树](https://www.luogu.com.cn/problem/P8306)

::: danger 警告

该部分尚未完工!

:::

例题：[P2580 于是他错误的点名开始了](https://www.luogu.com.cn/problem/P2580)

::: danger 警告

该部分尚未完工!

:::

例题：[P10471 最大异或对 The XOR Largest Pair](https://www.luogu.com.cn/problem/P10471)

::: danger 警告

该部分尚未完工!

:::
