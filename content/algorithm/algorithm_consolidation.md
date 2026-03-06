# 算法巩固

::: danger 警告

该页面尚未完工!

:::

::: details 目录

[[toc]]

:::

## 第 1 周

### Day 01

[P2669 [NOIP 2015 普及组] 金币](https://www.luogu.com.cn/problem/P2669)

<p><font color="blue">解法：模拟</font></p>

```c++
#include<iostream>
using namespace std;

int main() {
	int k;
	cin >> k;
	int ret = 0, tmp = 1, cnt = 1;
	for (int i = 1; i <= k; i++) {
		ret += tmp;
		cnt--;
		if (cnt == 0) {
			tmp++;
			cnt = tmp;
		}
	}
	cout << ret << endl;
}
```

[P1190 [NOIP 2010 普及组] 接水问题](https://www.luogu.com.cn/problem/P1190)

<p><font color="blue">解法：模拟，找出所有的水龙头中最早结束的那一个</font></p>

```c++
#include<iostream>
#include<queue>
#include<vector>
#include<functional>
#include<algorithm>
using namespace std;

int n, m;

int main() {
	cin >> n >> m;
	priority_queue<int, vector<int>, greater<int>> heap;

	for (int i = 1; i <= m; i++) {
		heap.push(0);
	}
	int ret = 0;
	for (int i = 1; i <= n; i++) {
		int x;
		cin >> x;
		int t = heap.top();
		heap.pop();
		t += x;
		heap.push(t);
		ret = max(ret, t);
	}
	cout << ret << endl;
}
```

[P1774 最接近神的人](https://www.luogu.com.cn/problem/P1774)

<p><font color="blue">解法：逆序对</font></p>

```c++
#include<iostream>
using namespace std;

typedef long long LL;
const int N = 5e5 + 10;

int n;
int a[N], tmp[N];

LL merge_sort(int l, int r) {
	if (l >= r)return 0;
	LL ret = 0;
	int mid = (l + r) / 2;
	// [l, mid] [mid + 1, r]
	ret += merge_sort(l, mid);
	ret += merge_sort(mid + 1, r);
	int cur1 = l, cur2 = mid + 1, i = l;
	while (cur1 <= mid && cur2 <= r) {
		if (a[cur1] <= a[cur2])tmp[i++] = a[cur1++];
		else {
			ret += mid - cur1 + 1;
			tmp[i++] = a[cur2++];
		}
	}
	while (cur1 <= mid)tmp[i++] = a[cur1++];
	while (cur2 <= r)tmp[i++] = a[cur2++];
	for (int j = l; j <= r; j++)a[j] = tmp[j];
	return ret;
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	cout << merge_sort(1, n) << endl;
}
```

[P1455 搭配购买](https://www.luogu.com.cn/problem/P1455)

<p><font color="blue">解法：01 背包 + bfs/dfs/并查集，将连接的物品合并为一个大物品</font></p>

```c++
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

const int N = 1e4 + 10;

int n, m, w;
int c[N], d[N]; // 合并前
vector<int> edges[N];

bool st[N]; // 标记 dfs 过程中，那些点还没有标记过
int cnt;
int cc[N], dd[N]; // 合并后

int f[N];

void dfs(int a) {
	st[a] = true;
	cc[cnt] += c[a];
	dd[cnt] += d[a];
	for (auto b : edges[a]) {
		if (!st[b])dfs(b);
	}
}

int main() {
	cin >> n >> m >> w;
	for (int i = 1; i <= n; i++)cin >> c[i] >> d[i];
	for (int i = 1; i <= m; i++) {
		int a, b;
		cin >> a >> b;
		edges[a].push_back(b);
		edges[b].push_back(a);
	}
	for (int i = 1; i <= n; i++) {
		if (!st[i]) {
			cnt++;
			dfs(i);
		}
	}

	// 01 背包
	for (int i = 1; i <= cnt; i++) {
		for (int j = w; j >= cc[i]; j--)f[j] = max(f[j], f[j - cc[i]] + dd[i]);
	}
	cout << f[w] << endl;
}
```

### Day 02

[P1548 [NOIP 1997 普及组] 棋盘问题](https://www.luogu.com.cn/problem/P1548)

<p><font color="blue">解法：暴力枚举</font></p>

```c++
#include<iostream>
using namespace std;

int main() {
	int n, m;
	cin >> n >> m;
	int x = 0, y = 0;
	for (int x1 = 0; x1 <= n; x1++)
		for (int y1 = 0; y1 <= m; y1++)
			for (int x2 = x1 + 1; x2 <= n; x2++)
				for (int y2 = y1 + 1; y2 <= m; y2++) {
					int dx = x2 - x1, dy = y2 - y1;
					if (dx == dy)x++;
					else y++;
				}
	cout << x << " " << y << endl;
}
```

[P1208 [USACO1.3] 混合牛奶 Mixing Milk](https://www.luogu.com.cn/problem/P1208)

<p><font color="blue">解法：贪心策略，每次选取单价最小的</font></p>

```c++
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 5010;

int n, m;

struct node {
	int p, x;
}a[N];

bool cmp(node& a, node& b) {
	return a.p < b.p;
}

int main() {
	cin >> n >> m;
	for (int i = 1; i <= m; i++)cin >> a[i].p >> a[i].x;
	sort(a + 1, a + 1 + m, cmp);
	int ret = 0, sum = 0;
	for (int i = 1; i <= m; i++) {
		int t = min(a[i].x, n - sum);
		ret += t * a[i].p;
		sum += t;
	}
	cout << ret << endl;
}
```

[P1060 [NOIP 2006 普及组] 开心的金明](https://www.luogu.com.cn/problem/P1060)

<p><font color="blue">解法：01 背包</font></p>

<p><font color="blue">状态表示：f[i][j] 表示在前 i 个物品中挑选，总价格不超过 j 的情况下，最大的价值。</font></p>

<p><font color="blue">状态转移方程：f[i][j] = max(f[i - 1][j], f[i - 1][j - v[i]] + v[i] * p[i])</font></p>

```c++
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 30010, M = 30;

int n, m;
int v[M], p[M];

int f[N];

int main() {
    cin >> n >> m;
    for (int i = 1; i <= m; i++)cin >> v[i] >> p[i];
    for (int i = 1; i <= m; i++) {
        for (int j = n; j >= v[i]; j--) {
            f[j] = max(f[j], f[j - v[i]] + v[i] * p[i]);
        }
    }
    cout << f[n] << endl;
}
```

[P1083 [NOIP 2012 提高组] 借教室](https://www.luogu.com.cn/problem/P1083)

<p><font color="blue">解法：差分 + 二分答案</font></p>

```c++
#include<iostream>
using namespace std;

const int N = 1e6 + 10;

int n, m;
int r[N];
int d[N], s[N], t[N];

int f[N]; // 差分数组

// 把 [1, x] 所有的订单处理完毕之后，判断是否可行
bool check(int x) {
	// 初始差分数组
	for (int i = 1; i <= n; i++) {
		f[i] = r[i] - r[i - 1];
	}

	// 处理订单
	for (int i = 1; i <= x; i++) {
		// s[i] ~ t[i] - d[i]
		f[s[i]] -= d[i];
		f[t[i] + 1] += d[i];
	}

	for (int i = 1; i <= n; i++) {
		f[i] = f[i - 1] + f[i];
		if (f[i] < 0)return false;
	}
	return true;
}

int main() {
	cin >> n >> m;
	for (int i = 1; i <= n; i++)cin >> r[i];
	for (int i = 1; i <= m; i++)cin >> d[i] >> s[i] >> t[i];

	int l = 1, r = m;
	while (l < r) {
		int mid = (l + r) / 2;
		if (check(mid))l = mid + 1;
		else r = mid;
	}
	if (check(l))cout << 0;
	else cout << -1 << endl << l << endl;
}
```

### Day 03

[CF25B Phone numbers](https://www.luogu.com.cn/problem/CF25B)

<p><font color="blue">解法：分类讨论</font></p>

```c++
#include<iostream>
#include<string>
using namespace std;

int main() {
	int n;
	string s;
	cin >> n >> s;
	if (n % 2) { // 奇数
		for (int i = 0; i < n; i++) {
			cout << s[i];
			if (i % 2 && i < n - 3)cout << '-';
		}
	}
	else { // 偶数
		for (int i = 0; i < n; i++) {
			cout << s[i];
			if (i % 2 && i < n - 2)cout << '-';
		}
	}
}
```

[P2660 zzc 种田](https://www.luogu.com.cn/problem/P2660)

<p><font color="blue">解法：尽可能的选择较大的正方形</font></p>

```c++
#include<iostream>
#include<utility>
using namespace std;

typedef long long LL;

int main() {
	LL x, y;
	cin >> x >> y;
	LL ret = 0;
	while (x && y) {
		LL cnt = x / y;
		ret += cnt * y * 4;
		x %= y;
		swap(x, y);
	}
	cout << ret << endl;
}
```

[P2661 [NOIP 2015 提高组] 信息传递](https://www.luogu.com.cn/problem/P2661)

<p><font color="blue">解法：拓扑排序 + DFS/BFS 计数</font></p>

```c++
#include<iostream>
#include<queue>
#include<algorithm>
using namespace std;

const int N = 2e5 + 10;

int n;
int ne[N];
int in[N];

bool st[N];

int cnt;

void dfs(int a) {
	cnt++;
	st[a] = true;
	int b = ne[a];
	if (!st[b])dfs(b);
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++) {
		cin >> ne[i];
		// i -> ne[i]
		in[ne[i]]++;
	}
	// 1.利用拓扑排序给环以外的点打上标记
	queue<int> q;
	for (int i = 1; i <= n; i++) {
		if (in[i] == 0)q.push(i);
	}
	while (q.size()) {
		auto a = q.front();
		q.pop();
		st[a] = true;
		int b = ne[a];
		// a -> b
		in[b]--;
		if (in[b] == 0)q.push(b);
	}

	// 2.利用 dfs 计算环的大小
	int ret = n;
	for (int i = 1; i <= n; i++) {
		if (!st[i]) {
			cnt = 0;
			dfs(i);
			ret = min(ret, cnt);
		}
	}
	cout << ret << endl;
}
```

[P6070 『MdOI R1』Decrease](https://www.luogu.com.cn/problem/P6070)

<p><font color="blue">解法：二维差分</font></p>

```c++
#include<iostream>
#include<cstdlib>
using namespace std;

typedef long long LL;

const int N = 5e3 + 10;

int n, m, k;
LL f[N][N];

void insert(int x1, int y1, int x2, int y2, int k) {
	f[x1][y1] += k;
	f[x1][y2 + 1] -= k;
	f[x2 + 1][y1] -= k;
	f[x2 + 1][y2 + 1] += k;
}

int main() {
	cin >> n >> m >> k;
	for (int i = 1; i <= m; i++) {
		int x, y, z;
		cin >> x >> y >> z;
		insert(x, y, x, y, z);
	}
	// 输出差分数组
	//for (int i = 1; i <= n; i++) {
	//	for (int j = 1; j <= n; j++) {
	//		cout << f[i][j] << " ";
	//	}
	//	cout << endl;
	//}
	LL ret = 0;
	for (int x1 = 1; x1 <= n - k + 1; x1++) {
		for (int y1 = 1; y1 <= n - k + 1; y1++) {
			ret += abs(f[x1][y1]);
			int x2 = x1 + k - 1, y2 = y1 + k - 1;
			insert(x1, y1, x2, y2, -f[x1][y1]);
		}
	}
	for (int i = 1; i <= n; i++) {
		for (int j = 1; j <= n; j++) {
			if (f[i][j] != 0) {
				cout << -1 << endl;
				return 0;
			}
		}
	}
	cout << ret << endl;
}
```

### Day 04

[P1046 [NOIP 2005 普及组] 陶陶摘苹果](https://www.luogu.com.cn/problem/P1046)

```c++
#include<iostream>
using namespace std;

int a[15];

int main() {
	for (int i = 1; i <= 10; i++)cin >> a[i];
	int h;
	cin >> h;
	h += 30;
	int ret = 0;
	for (int i = 1; i <= 10; i++)
		if (a[i] <= h)ret++;
	cout << ret << endl;
}
```

[P1478 陶陶摘苹果（升级版）](https://www.luogu.com.cn/problem/P1478)

<p><font color="blue">解法：贪心</font></p>

```c++
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 5010;

int n, s;
int a, b;

int cnt;
int t[N];

int main() {
	cin >> n >> s;
	cin >> a >> b;
	a += b;
	for (int i = 1; i <= n; i++) {
		int x, y;
		cin >> x >> y;
		if (x <= a)t[++cnt] = y;
	}
	sort(t + 1, t + 1 + cnt);
	int ret = 0, sum = 0;
	for (int i = 1; i <= cnt; i++) {
		sum += t[i];
		if (sum <= s)ret++;
	}
	cout << ret << endl;
}
```

[P2969 [USACO09DEC] Music Notes S](https://www.luogu.com.cn/problem/P2969)

<p><font color="blue">解法：前缀和 + 二分</font></p>

```c++
#include<iostream>
using namespace std;

const int N = 5e4 + 10;

int n, q;
int f[N];

int main() {
	cin >> n >> q;
	for (int i = 1; i <= n; i++) {
		int x;
		cin >> x;
		f[i] = f[i - 1] + x;
	}
	while (q--) {
		int t;
		cin >> t;
		int l = 1, r = n;
		while (l < r) {
			int mid = (l + r) / 2;
			if (f[mid] > t)r = mid;
			else l = mid + 1;
		}
		cout << l << endl;
	}
}
```

[P1032 [NOIP 2002 提高组] 字串变换（疑似错题）](https://www.luogu.com.cn/problem/P1032)

<p><font color="blue">解法：BFS</font></p>

```c++
#include<iostream>
#include<queue>
#include<unordered_map>
using namespace std;

const int N = 10;

string a, b;
unordered_map<string, int>dist;

int n; // 记录一共有多少个变化规则
string x[N], y[N];

int bfs() {
	if (a == b)return 0;
	queue<string> q;
	q.push(a);
	dist[a] = 0;
	while (q.size()) {
		string s = q.front();
		q.pop();
		if (dist[s] >= 10)return -1;
		// 变
		for (int i = 0; i < n; i++) {
			// x[i] -> y[i]
			int pos = 0;
			while (s.find(x[i], pos) != -1) {
				pos = s.find(x[i], pos);
				// 拼接
				string tmp = s.substr(0, pos) + y[i] + s.substr(pos + x[i].size());
				pos++;
				// s -> tmp
				if (dist.count(tmp))continue;
				dist[tmp] = dist[s] + 1;
				q.push(tmp);
				if (tmp == b)return dist[tmp];
			}
		}
	}
	return -1;
}

int main() {
	cin >> a >> b;
	while (cin >> x[n] >> y[n])n++;
	int ret = bfs();
	if (ret == -1)cout << "NO ANSWER!" << endl;
	else cout << ret << endl;
}
```

### Day 05

[P7071 [CSP-J 2020] 优秀的拆分](https://www.luogu.com.cn/problem/P7071)

<p><font color="blue">解法：数的二进制表示</font></p>

```c++
#include<iostream>
using namespace std;

int main() {
	int n;
	cin >> n;
	if (n & 1) {
		cout << -1 << endl;
		return 0;
	}
	for (int i = 30; i >= 0; i--) {
		if ((n >> i) & 1)cout << (1 << i) << " ";
	}
	return 0;
}
```

[P1106 删数问题](https://www.luogu.com.cn/problem/P1106)

<p><font color="blue">解法：贪心，删除极大值点</font></p>

```c++
#include<iostream>
#include<string>
using namespace std;

int main() {
	string s;
	int k;
	cin >> s >> k;
	for (int i = 1; i <= k; i++) {
		bool flag = false;
		for (int j = 0; j < s.size() - 1; j++) {
			if (s[j] > s[j + 1]) {
				s.erase(j, 1);
				flag = true;
				break;
			}
		}
		if (!flag)s.pop_back();
	}
	// 前导零
	while (s.size() > 1 && s[0] == '0')s.erase(0, 1);
	cout << s << endl;
}
```

[P1466 [USACO2.2] 集合 Subset Sums](https://www.luogu.com.cn/problem/P1466)

<p><font color="blue">解法：01 背包</font></p>

<p><font color="blue">状态表示：f[i][j] 表示从 [1, i] 中挑选，总和为 j 时，一共有多少种方案</font></p>

<p><font color="blue">状态转移方程：f[i][j] = f[i - 1][j] + f[i - 1][j - i]</font></p>

<p><font color="blue">初始化：f[0][0] = 1</font></p>

<p><font color="blue">最终结果：f[n][sum / 2] / 2</font></p>

```c++
#include<iostream>
using namespace std;

typedef long long LL;

const int N = 45, M = 810;

int n;
LL f[N];

int main() {
	cin >> n;
	int sum = (1 + n) * n / 2;
	if (sum & 1) {
		cout << 0 << endl;
		return 0;
	}
	sum /= 2;
	f[0] = 1;
	for (int i = 1; i <= n; i++)
		for (int j = sum; j >= i; j--)
			f[j] = f[j] + f[j - i];
	cout << f[sum] / 2 << endl;
}
```

[P4537 [CQOI2007] 矩形](https://www.luogu.com.cn/problem/P4537)

<p><font color="blue">解法：DFS 暴力搜索；任何一种分割方式，都可以看作在矩阵的四边选择一个非四角的点进入，然后在矩阵中随意行走，直到走到一个边界为止</font></p>

```c++
#include<iostream>
using namespace std;

const int N = 10;

int n, m;
bool st[N][N];
int ret;

int dx[] = { 0,0,1,-1 };
int dy[] = { 1,-1,0,0 };

void dfs(int i,int j) {
	if (i < 1 || i >= n || j < 1 || j >= m) {
		ret++;
		return;
	}
	st[i][j] = true;
	for (int k = 0; k < 4; k++) {
		int x = i + dx[k], y = j + dy[k];
		if (!st[x][y])dfs(x, y);
	}
	st[i][j] = false;
}

int main() {
	cin >> n >> m;
	// 从上
	for (int j = 1; j < m; j++) {
		// [0, j] -> [1, j]
		st[0][j] = true;
		dfs(1, j);
		st[0][j] = false;
	}

	// 从左
	for (int i = 1; i < n; i++) {
		// [i, 0] -> [1, 1]
		st[i][0] = true;
		dfs(i, 1);
		st[i][0] = false;
	}
	cout << ret << endl;
}
```

## 第 2 周

::: danger 警告

该部分尚未完工!

:::

## 第 3 周

::: danger 警告

该部分尚未完工!

:::

## 第 4 周

::: danger 警告

该部分尚未完工!

:::

## 第 5 周

::: danger 警告

该部分尚未完工!

:::

## 第 6 周

::: danger 警告

该部分尚未完工!

:::

## 第 7 周

::: danger 警告

该部分尚未完工!

:::

## 第 8 周

::: danger 警告

该部分尚未完工!

:::
