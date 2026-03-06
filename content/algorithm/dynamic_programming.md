# 动态规划

::: danger 警告
该页面尚未完工!
:::

::: details 目录

[[toc]]

:::

## 入门：从记忆化搜索到动态规划

::: details 回忆：记忆化搜索

在搜索的过程中，如果搜索树中有很多重复的结点，此时可以通过一个“备忘录”，记录第一次搜索到的结果。当下一次搜索到这个结点时，直接在“备忘录”里面找结果。其中，搜索树中的一个一个结点，也称为一个一个状态。

比如经典的斐波那契数列问题：

```c++
int f[N] // 备忘录

int fib(int n) {
    // 搜索之前先往备忘录里面瞅一瞅
    if (f[n] != -1) return f[n];
    if(n == 0 || n == 1) return f[n] = n;
    // 返回之前，把结果记录在备忘录中
    f[n] = fib(n - 1) + fib(n - 2);
    return f[n];
}
```

在用记忆化搜索解决斐波那契问题时，如果关注“备忘录”的填写过程，会发现它是从左往右依次填写的。当 i 位置前面的格子填写完毕之后，就可以根据格子里面的值计算出 i 位置的值。所以，整个递归过程，我们也可以改写成循环的形式，也就是递推：

```c++
int f[N] // f[i] 表示：第 i 个斐波那契数

int fib(int n) {
    // 初始化前两个格子
    f[0] = 0;
    f[1] = 1;
    // 按照递推过程计算后面的值
    for(int i = 2;i <= n;i++) f[i] = f[i - 1]+f[i - 2];
    // 返回结果
    return f[n];
}
```

:::

动态规划（Dynamic Programming，简称 DP）是一种用于解决多阶段决策问题的算法思想。它通过将复杂问题分解为更小的子问题，并存储子问题的解（通常称为“状态”），从而避免重复计算，提高效率。因此，动态规划里，蕴含着分治与剪枝思想。

上述通过**记忆化搜索**以及**递推**解决斐波那契数列的方式，其实都是动态规划。

::: warning 注意

动态规划中的相关概念其实远远不止如此，还会有：重叠子问题、最优子结构、无后效性、有向无环图等等。

:::

在递推形式的动态规划中，常用下面的专有名词来表述：

- **状态表示**：指 `f` 数组中，每一个格子代表的含义。其中，这个数组也会称为 `dp` 数组，或者 `dp` 表。

- **状态转移方程**：指 `f` 数组中，每一个格子是如何用其余的格子推导出来的。

- **初始化**：在填表之前，根据题目中的默认条件或者问题的默认初始状态，将 `f` 数组中若干格子先填上值。

::: tip 递推形式与递归形式的对应关系

- 状态表示 <--> 递归函数的意义；

- 状态转移方程 <--> 递归函数的主函数体；

- 初始化 <--> 递归函数的递归出口。

:::

### 如何利用动态规划解决问题

**第一种方式**：记忆化搜索

- 先用递归的思想去解决问题；

- 如果有重复子问题，就改成记忆化搜索的形式。

**第二种方式**：递推形式的动态规划

1. **定义状态表示**：一般情况下根据经验 + 递归函数的意义，赋予 `dp` 数组相应的含义。

2. **推导状态转移方程**：根据状态表示以及题意，在 `dp` 表中分析，当前格子如何通过其余格子推导出来。

3. **初始化**：根据题意，先将显而易见的以及边界情况下的位置填上值。

4. **确定填表顺序**：根据状态转移方程，确定按照什么顺序来填表。

5. **确定最终结果**：根据题意，在表中找出最终结果。

例题：[P10250 [GESP样题 六级] 下楼梯](https://www.luogu.com.cn/problem/P10250)

<p><font color="blue">状态表示：f[i] 表示有 i 个台阶的时候，一共有多少种方案</font></p>

<p><font color="blue">状态转移方程：f[i] = f[i - 1] + f[i - 2] + f[i - 3]</font></p>

<p><font color="blue">初始化：保证填表是正确的、填表的时候不越界</font></p>

<p><font color="blue">填表顺序：从左到右</font></p>

<p><font color="blue">最终结果：f[n]</font></p>

```c++
#include<iostream>
using namespace std;

typedef long long LL;

const int N = 65;

int n;
LL f[N]; // f[i] 表示：有 i 个台阶的时候，一共有多少种方案

int main() {
	cin >> n;
	// 初始化
	f[0] = 1;
	f[1] = 1;
	f[2] = 2;
	for (int i = 3; i <= n; i++)f[i] = f[i - 1] + f[i - 2] + f[i - 3];
	cout << f[n] << endl;
}
```

::: details 空间优化版本

由于 `f[n]` 只与 `f[i - 1]`、`f[i - 2]`、`f[i - 3]` 有关，因此可以空间优化，只存储三个变量：

```c++
#include<iostream>
using namespace std;

typedef long long LL;

const int N = 65;

int n;
LL f[N]; // f[i] 表示：有 i 个台阶的时候，一共有多少种方案

int main() {
	cin >> n;
	// 初始化
	LL a = 1, b = 1, c = 2;
	for (int i = 3; i <= n; i++) {
		LL t = a + b + c;
		a = b;
		b = c;
		c = t;
	}
	if (n == 1)cout << b << endl;
	else cout << c << endl;
}
```

但该方法很少能对时间做优化。

:::

例题：[P1216 [IOI 1994 / USACO1.5] 数字三角形 Number Triangles](https://www.luogu.com.cn/problem/P1216)

<p><font color="blue">状态表示：f[i][j] 表示从 [1, 1] 走到 [i, j] 位置时，所有方案下的最大权值</font></p>

<p><font color="blue">状态转移方程：f[i][j] = max(f[i - 1][j - 1], f[i - 1][j]) + a[i][j]</font></p>

<p><font color="blue">初始化：填表的时候不越界、保证后面的填表是正确的</font></p>

<p><font color="blue">填表顺序：从左到右，从上到下</font></p>

<p><font color="blue">最终结果：最后一行的最大值</font></p>

```c++
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 1010;

int n;
int a[N][N];
int f[N][N]; // f[i][j]：从 [1, 1] 走到 [i, j] 时，所有方案下的最大权值

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)for (int j = 1; j <= i; j++)cin >> a[i][j];
	for (int i = 1; i <= n; i++)for (int j = 1; j <= i; j++)f[i][j] = max(f[i - 1][j], f[i - 1][j - 1]) + a[i][j];
	int ret = 0;
	for (int j = 1; j <= n; j++)ret = max(ret, f[n][j]);
	cout << ret << endl;
}
```

::: details 空间优化版本

采用从右往左的遍历方式，可以优化空间为一维数组：

```c++
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 1010;

int n;
int a[N][N];
int f[N]; // f[i][j]：从 [1, 1] 走到 [i, j] 时，所有方案下的最大权值

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)for (int j = 1; j <= i; j++)cin >> a[i][j];
	for (int i = 1; i <= n; i++)for (int j = i; j >= 1; j--)f[j] = max(f[j], f[j - 1]) + a[i][j]; //修改一下遍历顺序
	int ret = 0;
	for (int j = 1; j <= n; j++)ret = max(ret, f[j]);
	cout << ret << endl;
}
```

:::

::: details 二维数组转一维数组的注意事项

- 是否修改遍历顺序

- 删掉第一维即可

:::

## 线性 dp

线性 dp 是动态规划问题中最基础，最常见的一类问题。它的特点是**状态转移只依赖于前一个或前几个状态**，状态之间的关系是线性的，通常可以用一维或者二维数组来存储状态。

### 基础线性 dp

例题：[P1192 台阶问题](https://www.luogu.com.cn/problem/P1192)

<p><font color="blue">状态表示：f[i] 表示到达第 i 个台阶时，一共有多少种不同的方案</font></p>

<p><font color="blue">状态转移方程：f[i] += f[i - j] (1 <= j <= k)</font></p>

<p><font color="blue">初始化：f[0] = 1</font></p>

<p><font color="blue">填表顺序：从左到右</font></p>

<p><font color="blue">最终结果：f[n]</font></p>

```c++
#include<iostream>
using namespace std;

const int N = 1e5 + 10, MOD = 1e5 + 3;

int n, k;
int f[N];

int main() {
	cin >> n >> k;
	f[0] = 1;
	for (int i = 1; i <= n; i++) {
		for (int j = 1; j <= k && i - j >= 0; j++) {
			f[i] = (f[i] + f[i - j]) % MOD;
		}
	}
	cout << f[n] << endl;
}
```

例题：[P1115 最大子段和](https://www.luogu.com.cn/problem/P1115)

::: danger 警告

该部分尚未完工!

:::

例题：[P5888 传球游戏](https://www.luogu.com.cn/problem/P5888)

::: danger 警告

该部分尚未完工!

:::

例题：[P1541 [NOIP 2010 提高组] 乌龟棋](https://www.luogu.com.cn/problem/P1541)

::: danger 警告

该部分尚未完工!

:::

### 路径类 dp

路径类 dp 是线性 dp 的一种，它是在一个 n × m 的矩阵中设置一个行走规则，研究从起点走到终点的方案数、最小路径和或者最大路径和等等的问题。

> 入门阶段的《数字三角形》其实就是路径类 dp。

例题：[矩阵的最小路径和](https://www.nowcoder.com/practice/38ae72379d42471db1c537914b06d48e?tpld=230&tqld=39755&ru=/exam/oj)

<p><font color="blue">状态表示：f[i][j] 表示从 [1, 1] 走到 [i, j] 时，所有方案下最小路径和</font></p>

<p><font color="blue">状态转移方程：f[i][j] = min(f[i - 1][j], f[i][j - 1]) + a[i][j]</font></p>

<p><font color="blue">初始化：全部格子初始化为正无穷（0x3f3f3f3f）、f[0][1] 或 f[1][0] 初始化为0</font></p>

<p><font color="blue">填表顺序：从上往下每一行、每一行从左往右</font></p>

<p><font color="blue">最终结果：f[n][m]</font></p>

```c++
#include<iostream>
#include<cstring>
#include<algorithm>
using namespace std;

const int N = 510;

int n, m;
int f[N][N];

int main() {
	cin >> n >> m;
	// 初始化
	memset(f, 0x3f, sizeof f);
	f[0][1] = 0;
	for (int i = 1; i <= n; i++) {
		for (int j = 1; j <= m; j++) {
			int x;
			cin >> x;
			f[i][j] = min(f[i - 1][j], f[i][j - 1]) + x;
		}
	}
	cout << f[n][m] << endl;
}
```

例题：[P1002 [NOIP 2002 普及组] 过河卒](https://www.luogu.com.cn/problem/P1002)

::: danger 警告

该部分尚未完工!

:::

例题：[P1004 [NOIP 2000 提高组] 方格取数](https://www.luogu.com.cn/problem/P1004)

::: danger 警告

该部分尚未完工!

:::

### 经典线性 dp 问题

经典线性 dp 问题有两个：最长上升子序列（简称：LIS）以及最长公共子序列（简称：LCS）。这两道题目的很多方面都是可以作为经验，运用到别的题目中。

- 解法一：纯动态规划

例题：[B3637 最长上升子序列](https://www.luogu.com.cn/problem/B3637)

<p><font color="blue">状态表示：f[i] 表示以 i 位置元素为结尾的所有的子序列中，最长上升子序列的长度</font></p>

<p><font color="blue">状态转移方程：f[i] = max(f[i], f[j] + 1) (1 <= j < i)</font></p>

<p><font color="blue">初始化：f[i] = 0</font></p>

<p><font color="blue">填表顺序：从左到右</font></p>

<p><font color="blue">最终结果：整个 f 表里面的最大值</font></p>

```c++
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 5010;

int n;
int a[N];
int f[N];

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	int ret = 0;
	for (int i = 1; i <= n; i++) {
		f[i] = 1; // 长度为 1 的子序列
		for (int j = 1; j < i; j++) {
			if (a[j] < a[i]) {
				f[i] = max(f[i], f[j] + 1);
			}
		}
		ret = max(ret, f[i]);
	}
	cout << ret << endl;
}
```

- 解法二：贪心 + 二分优化动态规划

例题：[【模板】最长上升子序列](https://ac.nowcoder.com/acm/problem/226831)

::: tip 当研究最长上升子序列的**长度**时：

- 我们并不关心这个序列具体长什么样子，仅需知道长度以及最后一个元素是谁即可；

- 如果长度为 i 的序列有很多个，仅需保留最小的末尾；

- f 数组（用于存储最小的末尾的数组）是严格递增的，因此对于一个新来的数 a[i]，就可以二分出要放的位置（目标位置为大于等于 a[i] 的最小位置）。

:::

```c++
#include<iostream>
using namespace std;

const int N = 1e5 + 10;

int n;
int a[N];
int f[N], len; // f[N]：用于存储不同长度子序列的最小的末尾的数组；len：当前统计到的长度

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	for (int i = 1; i <= n; i++) {
		// 处理边界情况
		if (len == 0 || a[i] > f[len])f[++len] = a[i];
		else {
			// 二分插入位置
			int l = 1, r = len;
			while (l < r) {
				int mid = (l + r) / 2;
				if (f[mid] >= a[i])r = mid;
				else l = mid + 1;
			}
			f[l] = a[i];
		}
	}
	cout << len << endl;
}
```

::: details 两种解法的对比

时间上：解法二快于解法一；

使用范围上：解法二仅能处理只研究最长上升子序列的长度的情况，解法一可以处理研究最长上升子序列的长度和具体序列的情况。

:::

例题：[P1091 [NOIP 2004 提高组] 合唱队形](https://www.luogu.com.cn/problem/P1091)

::: danger 警告

该部分尚未完工!

:::

例题：[P2758 编辑距离](https://www.luogu.com.cn/problem/P2758)

::: danger 警告

该部分尚未完工!

:::

## 背包问题

背包问题是动态规划中最经典的问题，很多题目或多或少都有背包问题的影子。它的基本形式是：**给定一组物品，每个物品有体积和价值，在不超过背包容量的情况下，选择物品使得总价值最大**。

背包问题有多种变种，主要包括：**01 背包**、**完全背包**、**多重背包**、**分组背包**、**混合背包**、**多维费用的背包问题**。

除了经典的总价值最大问题，还会有：**方案总数**、**最优方案**、**方案可行性**、**输出具体方案**。

因此，背包问题种类非常繁多，题型非常丰富。但是，尽管背包问题有很多变形，都是从 01 背包问题演化过来的。

::: warning 注意

背包问题不能使用贪心策略。

:::

### 01 背包

**01 背包问题**：每种物品只能选或不选（选 0 次或 1 次）。

例题：[【模板】01背包](https://ac.nowcoder.com/acm/problem/226514)

> v[i] 表示：第 i 个物品体积
>
> w[i] 表示：第 i 个物品价值

**第一问**：

<p><font color="blue">状态表示：f[i][j] 表示在 [1, i] 区间内挑选物品，总体积不能超过 j，所有的选法下，最大的价值</font></p>

<p><font color="blue">状态转移方程：f[i][j] = max(f[i - 1][j], w[i] + f[i - 1][j - v[i]])（不选 i 的情况、选 i 的情况）</font></p>

<p><font color="blue">初始化：第 0 行初始化为 0</font></p>

<p><font color="blue">填表顺序：从上到下每一行</font></p>

<p><font color="blue">最终结果：f[n][V]</font></p>

**第二问**：

<p><font color="blue">状态表示：f[i][j] 表示在 [1, i] 区间内挑选物品，总体积必须为 j，所有的选法下，最大的价值</font></p>

<p><font color="blue">状态转移方程：f[i][j] = max(f[i - 1][j], w[i] + f[i - 1][j - v[i]])（不选 i 的情况、选 i 的情况）</font></p>

<p><font color="blue">初始化：非法的格子初始化为负无穷</font></p>

```c++
#include<iostream>
#include<algorithm>
#include<cstring>
using namespace std;

const int N = 1010;

int n, V;
int v[N], w[N]; // v[i]：第 i 个物品体积；w[i]：第 i 个物品价值
int f[N][N]; // f[i][j] 表示：在 [1, i] 区间内挑选物品，总体积不能超过 j，所有的选法下，最大的价值

int main() {
	cin >> n >> V;
	for (int i = 1; i <= n; i++)cin >> v[i] >> w[i];

	// 第一问
	for (int i = 1; i <= n; i++) {
		for (int j = 0; j <= V; j++) {
			f[i][j] = f[i - 1][j];
			if (j >= v[i]) {
				f[i][j] = max(f[i][j], f[i - 1][j - v[i]] + w[i]);
			}
		}
	}
	cout << f[n][V] << endl;

	// 第二问
	// 初始化
	memset(f, -0x3f, sizeof f);
	f[0][0] = 0;
	for (int i = 1; i <= n; i++) {
		for (int j = 0; j <= V; j++) {
			f[i][j] = f[i - 1][j];
			if (j >= v[i]) {
				f[i][j] = max(f[i][j], f[i - 1][j - v[i]] + w[i]);
			}
		}
	}
	if (f[n][V] < 0)cout << 0 << endl;
	else cout << f[n][V] << endl;

}
```

::: details 空间优化版本

- 考虑是否修改遍历顺序

- 直接在源代码上，删掉第一位即可

```c++
#include<iostream>
#include<algorithm>
#include<cstring>
using namespace std;

const int N = 1010;

int n, V;
int v[N], w[N]; // v[i]：第 i 个物品体积；w[i]：第 i 个物品价值
int f[N];

int main() {
	cin >> n >> V;
	for (int i = 1; i <= n; i++)cin >> v[i] >> w[i];

	// 第一问
	for (int i = 1; i <= n; i++) {
		for (int j = V; j >= v[i]; j--) { // 修改遍历顺序
				f[j] = max(f[j], f[j - v[i]] + w[i]);
		}
	}
	cout << f[V] << endl;

	// 第二问
	// 初始化
	memset(f, -0x3f, sizeof f);
	f[0] = 0;
	for (int i = 1; i <= n; i++) {
		for (int j = V; j >= v[i]; j--) { // 修改遍历顺序
			if (j >= v[i]) {
				f[j] = max(f[j], f[j - v[i]] + w[i]);
			}
		}
	}
	if (f[V] < 0)cout << 0 << endl;
	else cout << f[V] << endl;
}
```

:::

例题：[P1048 [NOIP 2005 普及组] 采药](https://www.luogu.com.cn/problem/P1048)

::: danger 警告

该部分尚未完工!

:::

例题：[P1164 小A点菜](https://www.luogu.com.cn/problem/P1164)

::: danger 警告

该部分尚未完工!

:::

例题：[P2946 [USACO09MAR] Cow Frisbee Team S](https://www.luogu.com.cn/problem/P2946)

::: danger 警告

该部分尚未完工!

:::

### 完全背包

**完全背包问题**：每种物品可以选择无限次。

例题：[【模板】完全背包](https://ac.nowcoder.com/acm/problem/226516)

> v[i] 表示：第 i 个物品体积
>
> w[i] 表示：第 i 个物品价值

**第一问**：

<p><font color="blue">状态表示：f[i][j] 表示在 [1, i] 区间内挑选物品，总体积不超过 j 的情况下，所有的选法下，最大价值</font></p>

<p><font color="blue">状态转移方程：f[i][j] = max(f[i - 1][j], f[i - 1][j - k * v[i]] + k * w[i])（不选 i 的情况、选 k 个 i 的情况）</font></p>

<p><font color="blue">初始化：第 0 行初始化为 0</font></p>

<p><font color="blue">填表顺序：从上往下每一行，每一行从左往右</font></p>

<p><font color="blue">最终结果：f[n][V]</font></p>

**第二问**：

<p><font color="blue">状态表示：f[i][j]表示在 [1, i] 区间内挑选物品，总体积正好为 j，所有的选法下，最大价值</font></p>

<p><font color="blue">初始化：非法的格子初始化为负无穷</font></p>

::: tip 优化状态转移方程

由原状态转移方程可知：

$$f[i][j] = max(f[i - 1][j], f[i - 1][j - v[i]] + w[i], f[i - 1][j - 2 * v[i]] + 2 * w[i], ...)$$

$$f[i][j - v[i]]= max(f[i - 1][j - v[i]], f[i - 1][j - 2 * v[i]] + w[i], ...)$$

令 $x = max(f[i - 1][j - v[i]] + w[i], f[i - 1][j - 2 * v[i]] + 2 * w[i], ...)$，则 $x = f[i][j - v[i]] + w[i]$。

所以原状态转移方程可表示为：

$$f[i][j] = max(f[i - 1][j], f[i][j - v[i]] + w[i])$$

:::

```c++
#include<iostream>
#include<algorithm>
#include<cstring>
using namespace std;

const int N = 1010;

int n, V;
int v[N], w[N];
int f[N][N];

int main() {
	cin >> n >> V;
	for (int i = 1; i <= n; i++)cin >> v[i] >> w[i];

	// 第一问
	for (int i = 1; i <= n; i++) {
		for (int j = 0; j <= V; j++) {
			f[i][j] = f[i - 1][j];;
			if (j >= v[i])f[i][j] = max(f[i][j], f[i][j - v[i]] + w[i]);
		}
	}
	cout << f[n][V] << endl;

	// 第二问
	memset(f, -0x3f, sizeof f);
	f[0][0] = 0;
	for (int i = 1; i <= n; i++) {
		for (int j = 0; j <= V; j++) {
			f[i][j] = f[i - 1][j];
			if (j >= v[i])f[i][j] = max(f[i][j], f[i][j - v[i]] + w[i]);
		}
	}
	if (f[n][V] < 0)cout << 0 << endl;
	else cout << f[n][V] << endl;
}
```

::: details 空间优化版本

**01 背包**的空间优化：第二层 for 循环要求从大到小

**完全背包**的空间优化：第二层 for 循环要求从小到大

```c++
#include<iostream>
#include<algorithm>
#include<cstring>
using namespace std;

const int N = 1010;

int n, V;
int v[N], w[N];
int f[N];

int main() {
	cin >> n >> V;
	for (int i = 1; i <= n; i++)cin >> v[i] >> w[i];

	// 第一问
	for (int i = 1; i <= n; i++) {
		for (int j = v[i]; j <= V; j++) { // 从小到大循环
			f[j] = max(f[j], f[j - v[i]] + w[i]);
		}
	}
	cout << f[V] << endl;

	// 第二问
	memset(f, -0x3f, sizeof f);
	f[0] = 0;
	for (int i = 1; i <= n; i++) {
		for (int j = v[i]; j <= V; j++) { // 从小到大循环
			f[j] = max(f[j], f[j - v[i]] + w[i]);
		}
	}
	if (f[V] < 0)cout << 0 << endl;
	else cout << f[V] << endl;
}
```

:::

例题：[P1616 疯狂的采药](https://www.luogu.com.cn/problem/P1616)

::: danger 警告

该部分尚未完工!

:::

例题：[P2918 [USACO08NOV] Buying Hay S](https://www.luogu.com.cn/problem/P2918)

::: danger 警告

该部分尚未完工!

:::

例题：[P5662 [CSP-J 2019] 纪念品](https://www.luogu.com.cn/problem/P5662)

::: danger 警告

该部分尚未完工!

:::

### 多重背包

**多重背包问题**：每种物品有数量限制。

例题：[多重背包](https://ac.nowcoder.com/acm/problem/235950)

> v[i] 表示：第 i 个物品的价值
>
> w[i] 表示：第 i 个物品的重量
>
> x[i] 表示：第 i 个物品的数量

<p><font color="blue">状态表示：f[i][j] 表示从 [1, i] 区间内挑选物品，总重量不超过 j 的情况下，此时的最大价值</font></p>

<p><font color="blue">状态转移方程：f[i][j] = max(f[i - 1][j], f[i - 1][j - x[i] * w[i]] + x[i] * v[i])</font></p>

<p><font color="blue">初始化：全为 0</font></p>

<p><font color="blue">填表顺序：从上往下每一行，每一行从左往右（空间优化：第二维一定要从大到小循环）</font></p>

<p><font color="blue">最终结果：f[n][V]</font></p>

```c++
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 110;

int n, T;
int x[N], w[N], v[N];
int f[N][N];

int main() {
	cin >> n >> T;
	for (int i = 1; i <= n; i++)cin >> x[i] >> w[i] >> v[i];
	for (int i = 1; i <= n; i++) {
		for (int j = T; j >= 0; j--) {
			for (int k = 0; k <= x[i] && k * w[i] <= j; k++) {
				f[i][j] = max(f[i][j], f[i - 1][j - k * w[i]] + k * v[i]);
			}
		}
	}
	cout << f[n][T] << endl;
}
```

::: details 空间优化版本

```c++
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 110;

int n, T;
int x[N], w[N], v[N];
int f[N];

int main() {
	cin >> n >> T;
	for (int i = 1; i <= n; i++)cin >> x[i] >> w[i] >> v[i];
	for (int i = 1; i <= n; i++) {
		for (int j = T; j >= 0; j--) {
			for (int k = 0; k <= x[i] && k * w[i] <= j; k++) {
				f[j] = max(f[j], f[j - k * w[i]] + k * v[i]);
			}
		}
	}
	cout << f[T] << endl;
}
```

:::

::: tip 二进制优化

二进制优化可以将多重背包问题转化为 01 背包问题。并把时间复杂度由原来的 $O(n·m·x)$ 降低为 $O(n·m·\log x)$。但无法解决 “求方案数” 的问题。

二进制优化的基本思路是将每一种物品分为数量分别为 1、2、4、8··· 的物品堆，并对分完后的物品对进行 01 背包处理。

```c++
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 110 * 5;

int n, T;
int w[N], v[N], pos;
int f[N];

int main() {
	cin >> n >> T;
	for (int i = 1; i <= n; i++) {
		int x, y, z;
		cin >> x >> y >> z;
		// 按照二进制拆分
		int t = 1;
		while (x >= t) {
			pos++;
			w[pos] = t * y;
			v[pos] = t * z;
			x -= t;
			t *= 2;
		}
		if (x) { // 处理剩余
			pos++;
			w[pos] = x * y;
			v[pos] = x * z;
		}
	}

	// 针对拆分后的物品，做一次 01 背包即可
	for (int i = 1; i <= pos; i++)
		for (int j = T; j >= w[i]; j--)
			f[j] = max(f[j], f[j - w[i]] + v[i]);
	cout << f[T] << endl;
}
```

:::

例题：[P1077 [NOIP 2012 普及组] 摆花](https://www.luogu.com.cn/problem/P1077)

::: danger 警告

该部分尚未完工!

:::

### 分组背包

**分组背包问题**：物品被分为若干组，每组只能选一个物品。

例题：[P1757 通天之分组背包](https://www.luogu.com.cn/problem/P1757)

>

<p><font color="blue">状态表示：f[i][j] 表示从前 i 个小组中挑选，总重量不超过 j 的情况下，最大的价值</font></p>

<p><font color="blue">状态转移方程：f[i][j] = max(f[i - 1][j], f[i - 1][j - a[i]] + b[i])</font></p>

<p><font color="blue">初始化：全部初始化为 0</font></p>

<p><font color="blue">填表顺序：从上往下每一行（空间优化：第二维一定要从大到小循环）</font></p>

<p><font color="blue">最终结果：f[n'][m]</font></p>

```c++
#include<iostream>
#include<vector>
#include<utility>
#include<algorithm>
using namespace std;

typedef pair<int, int> PII;

const int N = 1010;

int n, m, cnt; // n：物品总数；m：背包最大承受重量；cnt：最大组数
vector<PII> g[N]; // g[i]：第 i 组的所有物品
int f[N][N];

int main() {
	cin >> m >> n;
	for (int i = 1; i <= n; i++) {
		int a, b, c;
		cin >> a >> b >> c;
		cnt = max(c, cnt);
		g[c].push_back({ a,b });
	}
	// 动态规划
	for (int i = 1; i <= cnt; i++) {
		for (int j = m; j >= 0; j--) {
			// 在这一组中不选择物品
			f[i][j] = f[i - 1][j];
			// 在这一组中选择物品
			for (auto& t: g[i]) {
				int a = t.first, b = t.second;
				if (j >= a)f[i][j] = max(f[i][j], f[i - 1][j - a] + b);
			}
		}
	}
	cout << f[cnt][m] << endl;
}
```

::: details 空间优化版本

```c++
#include<iostream>
#include<vector>
#include<utility>
#include<algorithm>
using namespace std;

typedef pair<int, int> PII;

const int N = 1010;

int n, m, cnt; // n：物品总数；m：背包最大承受重量；cnt：最大组数
vector<PII> g[N]; // g[i]：第 i 组的所有物品
int f[N];

int main() {
	cin >> m >> n;
	for (int i = 1; i <= n; i++) {
		int a, b, c;
		cin >> a >> b >> c;
		cnt = max(c, cnt);
		g[c].push_back({ a,b });
	}
	// 动态规划
	for (int i = 1; i <= cnt; i++) {
		for (int j = m; j >= 0; j--) {
			// 在这一组中选择物品
			for (auto& t: g[i]) {
				int a = t.first, b = t.second;
				if (j >= a)f[j] = max(f[j], f[j - a] + b);
			}
		}
	}
	cout << f[m] << endl;
}
```

:::

例题：[P5322 [BJOI2019] 排兵布阵](https://www.luogu.com.cn/problem/P5322)

::: danger 警告

该部分尚未完工!

:::

### 混合背包

**混合背包问题**：以上四种背包问题混在一起。

例题：[P1833 樱花](https://www.luogu.com.cn/problem/P1833)

::: danger 警告

该部分尚未完工!

:::

### 多维费用的背包问题

**多维费用的背包问题**：限定条件不止有体积，还会有其它因素（比如重量）。

例题：[P1910 L 国的战斗之间谍](https://www.luogu.com.cn/problem/P1910)

::: danger 警告

该部分尚未完工!

:::

## 区间 dp

区间 dp 也是线性 dp 的一种，它用区间的左右端点来描述状态，通过小区间的解来推导出大区间的解。因此，区间 dp 的核心思想是将大区间划分为小区间，它的状态转移方程通常依赖于区间的划分点。

常用的划分点的方式有两个：

- 基于区间的左右端点，分情况讨论；

- 基于区间上某一点，划分成左右区间讨论。

例题：[P1435 [IOI 2000] 回文字串](https://www.luogu.com.cn/problem/P1435)

<p><font color="blue">状态表示：f[i][j] 表示将字符串 [i, j] 区间中的字串变成一个回文串的最小插入次数</font></p>

<p><font color="blue">状态转移方程：f[i][j] = min(f[i + 1][j - 1], f[i + 1][j] + 1, f[i][j - 1] + 1)</font></p>

<p><font color="blue">初始化：长度为 1 的位置初始化为 0</font></p>

<p><font color="blue">填表顺序：第一层循环枚举区间的长度，第二层循环枚举区间的左端点</font></p>

<p><font color="blue">最终结果：f[1][n]</font></p>

```c++
#include<iostream>
#include<string>
#include<algorithm>
using namespace std;

const int N = 1010;

int f[N][N];

int main() {
	string s;
	cin >> s;
	int n = s.size();
	s = " " + s;
	for(int len = 2;len<=n;len++) // 枚举长度
		for (int i = 1; i + len - 1 <= n; i++) { // 枚举左端点
			int j = i + len - 1;
			if (s[i] == s[j])f[i][j] = f[i + 1][j - 1];
			else f[i][j] = min(f[i + 1][j], f[i][j - 1]) + 1;
		}
	cout << f[1][n] << endl;
}
```

例题：[P2858 [USACO06FEB] Treats for the Cows G/S](https://www.luogu.com.cn/problem/P2858)

::: danger 警告

该部分尚未完工!

:::

例题：[P1775 石子合并（弱化版）](https://www.luogu.com.cn/problem/P1775)

::: danger 警告

该部分尚未完工!

:::

例题：[P1880 [NOI1995] 石子合并](https://www.luogu.com.cn/problem/P1880)

::: danger 警告

该部分尚未完工!

:::

例题：[P3146 [USACO16OPEN] 248 G](https://www.luogu.com.cn/problem/P3146)

::: danger 警告

该部分尚未完工!

:::
