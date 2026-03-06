# 算法基础

::: danger 警告
该页面尚未完工!
:::

::: details 目录

[[toc]]

:::

## 模拟

模拟，顾名思义，就是题目让你做什么你就做什么，考察的是将思路转化成代码的代码能力。

这类题一般较为简单，属于竞赛里面的签到题。

### 多项式输出

例题：[P1067 [NOIP 2009 普及组] 多项式输出](https://www.luogu.com.cn/problem/P1067)

```c++
#include<iostream>
#include<vector>
using namespace std;

int ptr = 0;

int main() {
    int n;
    cin >> n;
    int* array = new int[++n];
    for (int i = 0; i < n; i++) {
        int a;
        cin >> a;
        array[ptr++] = a;
    }
    bool isFirst = true;
    for (int i = 0; i < n; i++) {
        if (!isFirst) {
            if (array[i] > 0)cout << '+';
        }
        if (array[i]) {
            if(array[i]==1){
                if(i==n-1)cout<<1;
            }
            else if(array[i]==-1){
                cout<<'-';
                if(i==n-1)cout<<1;
            }
            else cout << array[i];
            isFirst = false;
        }
        else continue;
        if (n - i - 1 == 1)cout << "x";
        else if (n - i - 1 == 0)continue;
        else cout << "x^" << n - i - 1;
    }
}
```

### 蛇形方阵

例题：[P5731 【深基 5.习 6】蛇形方阵](https://www.luogu.com.cn/problem/P5731)

**通用的解法-解决矩阵中填数的题目**

1. 定义方向向量

2. 根据规则结合方向向量填数（朝一个方向走，一边走一边填数，直到越界；越界之后，结合方向向量，重新计算出新的坐标以及方向）

```c++
#include<cstdio>

const int N = 15;

// 定义 右、下、左、上 四个方向
int dx[] = { 0,1,0,-1 };
int dy[] = { 1,0,-1,0 };

int arr[N][N];

int main() {
	int n;
	scanf_s("%d", &n);
	// 模拟填数过程
	int x = 1, y = 1; // 初始位置
	int cnt = 1; // 当前位置要填的数
	int pos = 0; // 当前的方向
	while (cnt <= n * n) {
		arr[x][y] = cnt;
		// 计算下一个位置
		int a = x + dx[pos], b = y + dy[pos];
		// 判断是否越界
		if (a<1 || a>n || b<1 || b>n || arr[a][b]) {
			// 更新出正确的该走的位置
			pos = (pos + 1) % 4;
			a = x + dx[pos], b = y + dy[pos];
		}
		x = a, y = b;
		cnt++;
	}
	// 输出
	for (int i = 1; i <= n; i++) {
		for (int j = 1; j <= n; j++)printf("%3d", arr[i][j]);
		puts("");
	}
}
```

### 字符串的展开

::: danger 警告

该部分尚未完工!

:::

## 高精度

当数据的值特别大，各种类型都存不下的时候，此时就要用高精度算法来计算加减乘除：

- 先用字符串读入这个数，然后用数组逆序存储该数的每一位；

- 利用数组，模拟加减乘除运算的过程。

高精度算法本质上还是模拟算法，用代码模拟小学竖式计算加减乘除的过程。

### 高精度加法

例题：[P1601 A+B Problem（高精）](https://www.luogu.com.cn/problem/P1601)

<font color="blue">解法：模拟小学列竖式计算的过程</font>

1. 先用字符串读入，拆分每一位，逆序放在数组中

2. 利用数组，模拟小学列竖式计算加法的过程

```c++
#include<iostream>
#include<string>
#include<algorithm>
using namespace std;

const int N = 1e6 + 10;

int a[N], b[N], c[N];
int la, lb, lc;

// 高精度加法的模板 c = a + b;
void add(int c[], int a[], int b[]) {
	for (int i = 0; i < lc; i++) {
		c[i] += a[i] + b[i]; // 对应位相加，再加上进位
		c[i + 1] = c[i] / 10; // 处理进位
		c[i] %= 10; // 处理余数
	}
	if (c[lc])lc++; // 处理边界情况（99 + 1 = 100）
}

int main() {
	string x, y;
	cin >> x >> y;
	// 1.拆分每一位，逆序放在数组中
	la = x.size();
	lb = y.size();
	lc = max(la, lb);
	for (int i = 0; i < la; i++)a[la - 1 - i] = x[i] - '0';
	for (int i = 0; i < lb; i++)b[lb - 1 - i] = y[i] - '0';
	// 2.模拟加法的过程
	add(c, a, b); // c = a + b
	// 输出结果
	for (int i = lc - 1; i >= 0; i--)cout << c[i];
}
```

### 高精度减法

例题：[P2142 高精度减法](https://www.luogu.com.cn/problem/P2142)

<font color="blue">解法：模拟小学列竖式计算的过程</font>

1. 先比较大小，然后用较大的数减去较小的数（用字符串比较之前，先比较一下长度）

2. 先用字符串读入，拆分每一位，逆序放在数组中

3. 利用数组，模拟小学列竖式计算减法过程

```c++
#include<iostream>
#include<string>
#include<algorithm>
using namespace std;

const int N = 1e6 + 10;

int a[N], b[N], c[N];
int la, lb, lc;

bool cmp(string& x, string& y) {
	// 先比较长度
	if (x.size() != y.size())return x.size() < y.size();
	// 再按照字典序的方式1比较
	return x < y;
}

void sub(int c[],int a[],int b[]) {
	for (int i = 0; i < lc; i++) {
		c[i] += a[i] - b[i]; // 对应位相减，然后处理借位
		if (c[i] < 0) {
			c[i + 1] -= 1; // 借位
			c[i] += 10;
		}
	}
	// 处理前导零
	while (lc > 1 && c[lc - 1] == 0)lc--;
}

int main() {
	string x, y;
	cin >> x >> y;
	// 1.比较大小
	if (cmp(x, y)) {
		swap(x, y);
		cout << '-';
	}
	// 2.拆分每一位，逆序放在数组中
	la = x.size();
	lb = y.size();
	lc = max(la, lb);
	for (int i = 0; i < la; i++)a[la - 1 - i] = x[i] - '0';
	for (int i = 0; i < lb; i++)b[lb - 1 - i] = y[i] - '0';
	// 3.模拟减法的过程
	sub(c, a, b); // c = a + b
	// 输出结果
	for (int i = lc - 1; i >= 0; i--)cout << c[i];
}
```

### 高精度乘法

例题：[P1303 A\*B Problem](https://www.luogu.com.cn/problem/P1303)

<font color="blue">解法：模拟列竖式计算的过程</font>

1. 先用字符串读入，拆分每一位，逆序放在数组中

2. 利用数组，模拟列竖式乘法过程（无进位相乘，然后相加，最后处理进位）

```c++
#include<iostream>
#include<string>
#include<algorithm>
using namespace std;

const int N = 1e6 + 10;

int a[N], b[N], c[N];
int la, lb, lc;

// 高精度乘法的模板 c = a * b;
void mul(int c[], int a[], int b[]) {
	for (int i = 0; i < la; i++) {
		for (int j = 0; j < lb; j++) {
			c[i + j] += a[i] * b[j];
		}
	}
	// 处理进位
	for (int i = 0; i < lc; i++) {
		c[i + 1] += c[i] / 10; // 处理进位
		c[i] %= 10; // 处理余数
	}
	// 处理前导零
	while (lc > 1 && c[lc - 1] == 0)lc--;
}

int main() {
	string x, y;
	cin >> x >> y;
	// 1.拆分每一位，逆序放在数组中
	la = x.size();
	lb = y.size();
	lc = la + lb;
	for (int i = 0; i < la; i++)a[la - 1 - i] = x[i] - '0';
	for (int i = 0; i < lb; i++)b[lb - 1 - i] = y[i] - '0';
	// 2.模拟乘法的过程
	mul(c, a, b); // c = a + b
	// 输出结果
	for (int i = lc - 1; i >= 0; i--)cout << c[i];
}
```

### 高精度除法

例题：[P1480 A/B Problem](https://www.luogu.com.cn/problem/P1480)

<font color="blue">解法：模拟列竖式计算除法过程</font>

1. 先用字符串读入，拆分每一位，逆序放在数组中

2. 利用数组，模拟列竖式除法过程

```c++
#include<iostream>
#include<string>
using namespace std;

typedef long long ll;

const int N = 1e6 + 10;

int a[N], b, c[N];
int la, lc;

// 高精度除法的模板 c = a / b （高精度 / 低精度）
void div(int c[],int a[],int b) {
	ll t = 0; // 标记每次除完之后的余数
	for (int i = la - 1; i >= 0; i--) {
		// 计算当前的被除数
		t = t * 10 + a[i];
		c[i] = t / b;
		t %= b;
	}
	// 处理前导零
	while (lc > 1 && c[lc - 1] == 0)lc--;
}

int main() {
	string x;
	cin >> x >> b;
	// 1.拆分每一位，逆序放在数组中
	la = x.size();
	lc = la;
	for (int i = 0; i < la; i++)a[la - 1 - i] = x[i] - '0';
	// 2.模拟除法的过程
	div(c, a, b); // c = a + b
	// 输出结果
	for (int i = lc - 1; i >= 0; i--)cout << c[i];
}
```

## 枚举

顾名思义，就是把所有情况全都罗列出来，然后找出符合题目要求的那一个。因此，枚举是一种纯暴力的算法。

一般情况下，枚举策略都是会超时的。此时要先根据题目的数据范围来判断暴力枚举是否可以通过。如果不行的话，就要用后面学的各种算法来进行优化（比如二分、双指针、前缀和与差分等）。

使用枚举策略是，重点思考枚举的对象（枚举什么），枚举的顺序（正序还是逆序），以及枚举的方式（普通枚举？递归枚举？二进制枚举）。

### 普通枚举

例题：[P1003 [NOIP 2011 提高组] 铺地毯](https://www.luogu.com.cn/problem/P1003)

<font color="blue">解法：枚举所有的地毯，找出最后覆盖题目中点的那个地毯即可</font>

```c++
#include<iostream>
using namespace std;

const int N = 1e4 + 10;

int n;
int a[N], b[N], g[N], k[N];
int x, y;

int find() {
	// 从后往前枚举
	for (int i = n; i >= 1; i--) {
		// 判断是否覆盖
		if (a[i] <= x && b[i] <= y && a[i] + g[i] >= x && b[i] + k[i] >= y)return i;
	}
	return  -1;
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i] >> b[i] >> g[i] >> k[i];
	cin >> x >> y;
	cout << find() << endl;
}
```

例题：[P2010 [NOIP 2016 普及组] 回文日期](https://www.luogu.com.cn/problem/P2010)

```c++
#include<bits/stdc++.h>
using namespace std;

string date1, date2;
int year1,month1,day1;
int year2,month2,day2;
int res;

void add(){
    day1++;
    if((year1%4==0&&year1%100!=0)||year1%400==0){
        if(month1==2&&day1>29){
            day1 = 1;
            month1++;
        }
        else{
            switch(month1){
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    if(day1>31){
                        day1=0;
                        month1++;
                    }
                break;
                case 4:
                case 6:
                case 9:
                case 11:
                    if(day1>30){
                        day1=0;
                        month1++;
                    }
            }
        }
    }
    else{
        if(month1==2&&day1>28){
            day1 = 1;
            month1++;
        }
        else{
            switch(month1){
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    if(day1>31){
                        day1=0;
                        month1++;
                    }
                break;
                case 4:
                case 6:
                case 9:
                case 11:
                    if(day1>30){
                        day1=0;
                        month1++;
                    }
            }
        }
    }
    if(month1>12){
        month1 = 1;
        year1++;
    }
}

bool isEcho(){
    if(year1/1000!=day1%10)return false;
    if(year1/100%10!=day1/10)return false;
    if(year1/10%10!=month1%10)return false;
    if(year1%10!=month1/10)return false;
    return true;
}

bool isOver(){
    if(year1>year2)return true;
    if(year1==year2&&month1>month2)return true;
    if(year1==year2&&month1==month2&&day1>day2)return true;
    return false;
}

int main(){
    cin>>date1>>date2;
    year1 = stoi(date1.substr(0,4));
    year2 = stoi(date2.substr(0,4));
    month1 = stoi(date1.substr(4,2));
    month2 = stoi(date2.substr(4,2));
    day1 = stoi(date1.substr(6,2));
    day2 = stoi(date2.substr(6,2));
    while(!isOver()){
        if(isEcho())res++;
        add();
    }
    cout<<res<<endl;
}
```

例题：[B4167 [GXPC-S 2024] 扫雷](https://www.luogu.com.cn/problem/B4167)

::: danger 警告

该部分尚未完工!

:::

### 二进制枚举

二进制枚举：用二进制表示中的 0/1 表示两种状态，从而达到枚举各种情况。

- 利用二进制枚举时，会用到一些位运算的知识。

- 关于用二进制中的 0/1 表示状态这种方法，会在动态规划中的状态压缩 dp 中继续使用到。

- 二进制枚举的方式也可以用递归实现。

例题：[78. 子集](https://leetcode.cn/problems/subsets/description/)

<font color="blue">解法：利用二进制枚举的方式，把所有情况都枚举出来</font>

```c++
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> ret;
        int n = nums.size();
        // 枚举所有的状态
        for (int st = 0; st < (1 << n); st++) {
            // 根据 st 的状态，还原出要选的数
            vector<int> tmp; // 从当前选的子集
            for (int i = 0; i < n; i++) {
                if ((st >> i) & 1)
                    tmp.push_back(nums[i]);
            }
            ret.push_back(tmp);
        }
        return ret;
    }
};
```

例题：[P10449 费解的开关](https://www.luogu.com.cn/problem/P10449)

> 1. 每一盏灯，最多只会点一次：对于一盏灯而言，只有按或者不按两种状态
> 2. 按法的先后顺序，是不影响最终结果的：不用关心按的顺序，只用关心按了什么
> 3. 第一行的按法确定之后，后续灯的按法就跟着确定了

<font color="blue">解法：暴力枚举第一行所有的按法，并根据第一行的按法，计算出当前行以及下一行被按之后的结果，推导出下一行的按法。直到按到最后一行，然后判断所有灯是否全亮。</font>

::: tip 解法实现

1. 如何枚举出第一行所有的按法？

- 用二进制枚举所有的状态，0 ~ (1 << 5) - 1

2. 如何计算出，一共按了多少次？

- 二进制表示中，一共有多少个 1

3. 用二进制表示，来存储灯的状态

- 存的时候，把 0 -> 1，把 1 -> 0，此时，题目就从全亮变成全灭

4. 如何根据 push 这个按法，计算出当前行 a[i] 以及下一行 a[i + 1] 被按之后的状态？

- 可以用位运算的只是，快速计算出被按之后的状态

:::

```c++
#include<iostream>
#include<cstring>
#include<algorithm>
using namespace std;

const int N = 10;

int n = 5;
int a[N]; // 用二进制表示，来存储灯的状态
int t[N]; // 备份 a 数组

// 计算 x 的二进制表示中一共有多少个 1
int calc(int x) {
	int cnt = 0;
	while (x) {
		cnt++;
		x &= x - 1;
	}
	return cnt;
}

int main() {
	int T;
	cin >> T;
	while (T--) {
		// 多组测试时，一定要注意清空之前的数据
		memset(a, 0, sizeof a);
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				char ch;
				cin >> ch;
				// 存成相反的
				if (ch == '0')a[i] |= 1 << j;
			}
		}
		int ret = 0x3f3f3f3f; // 统计所有合法的按法中的最小值
		// 枚举第一行所有的按法
		for (int st = 0; st < (1 << n); st++) {
			memcpy(t, a, sizeof a);
			int push = st; // 当前行的按法
			int cnt = 0; // 统计当前按法下一共按了多少次
			// 依次计算后续行的结果以及按法
			for (int i = 0; i < n; i++) {
				cnt += calc(push);
				// 修改当前行被按的结果
				t[i] = t[i] ^ push ^ (push << 1) ^ (push >> 1);
				t[i] &= (1 << n) - 1; // 清空影响
				// 修改下一行的状态
				t[i + 1] ^= push;
				// 下一行的按法
				push = t[i];
			}
			if (t[n - 1] == 0)ret = min(ret, cnt);
		}
		if (ret > 6)cout << -1 << endl;
		else cout << ret << endl;
	}
}
```

## 前缀和

前缀和与差分的核心思想是**预处理**，可以在暴力枚举的过程中，快速给出查询的结果，从而优化时间复杂度。是经典的**用空间替换时间**的做法。

### 一维前缀和

例题：[【模板】前缀和](https://ac.nowcoder.com/acm/problem/226282)

<font color="blue">解法：先预处理出来一个前缀和数组 f ，f[i]表示区间[1, i]中，所有元素的和</font>

```c++
#include<iostream>
using namespace std;

typedef long long ll;

const int N = 1e5 + 10;

int n, q;
ll a[N];
ll f[N]; // 前缀和数组

int main() {
	cin >> n >> q;
	for (int i = 1; i <= n; i++)cin >> a[i];
	// 处理前缀和数组
	for (int i = 1; i <= n; i++) {
		f[i] = f[i - 1] + a[i];
	}
	// 处理 q 次询问
	while (q--) {
		int l, r;
		cin >> l >> r;
		cout << f[r] - f[l - 1] << endl;
	}
}
```

::: warning 注意

使用前缀和数组时，下标必须从 1 开始计数

:::

### 最大子段和

例题：[P1115 最大子段和](https://www.luogu.com.cn/problem/P1115)

<font color="blue">解法：利用前缀和</font>

```c++
#include<iostream>
#include<algorithm>
using namespace std;

typedef long long ll;

const int N = 2e5 + 10;

int n;
ll f[N]; // 前缀和数组

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++) {
		ll x;
		cin >> x;
		f[i] = f[i - 1] + x;
	}

	ll ret = -1e20;
	ll prevmin = 0;
	for (int i = 1; i <= n; i++) {
		ret = max(ret, f[i] - prevmin);
		prevmin = min(prevmin, f[i]);
	}
	cout << ret << endl;
}
```

### 二维前缀和

::: danger 警告

该部分尚未完工!

:::

例题：[P2280 [HNOI2003] 激光炸弹](https://www.luogu.com.cn/problem/P2280)

::: danger 警告

该部分尚未完工!

:::

## 差分

前缀和与差分核心思想是**预处理**，可以在暴力枚举的过程中，快速给出查询的结果，从而优化时间复杂度。是经典的**用空间替换时间**的做法。

### 一维差分

例题：[【模板】差分](https://ac.nowcoder.com/acm/problem/226303)

<p><font color="blue">解法一：暴力解法 -> 直接模拟</font></p>

<p><font color="blue">解法二：利用差分数组解决问题（快速解决“将某一个区间所有元素统一加上一个数”操作）</font></p>

1. 预处理出来差分数组 f, f[i] 表示当前元素与前一个元素的差值

2. 利用差分数组解决 m 次修改操作

3. 直接对差分数组做前缀和运算，还原出原始的数组

::: code-group

```c++ [利用差分数组的定义创建差分数组]
#include<iostream>
using namespace std;

typedef long long ll;

const int N = 1e5 + 10;

int n, m;
ll a[N];
ll f[N]; // 差分数组

int main() {
	cin >> n >> m;
	// 利用差分数组的定义创建差分数组
	for (int i = 1; i <= n; i++) {
		cin >> a[i];
		f[i] = a[i] - a[i - 1];
	}
	// 处理 n 次修改操作
	while (m--) {
		ll l, r, k;
		cin >> l >> r >> k;
		f[l] += k;
		f[r + 1] -= k;
	}
	// 还原出原始的数组
	for (int i = 1; i <= n; i++) {
		a[i] = a[i - 1] + f[i];
		cout << a[i] << " ";
	}
}
```

```c++ [利用差分数组的性质创建差分数组]
#include<iostream>
using namespace std;

typedef long long ll;

const int N = 1e5 + 10;

int n, m;
ll f[N]; // 差分数组

int main() {
	cin >> n >> m;
	// 利用差分数组的性质创建差分数组
	for (int i = 1; i <= n; i++) {
		ll x;
		cin >> x;
		f[i] += x;
		f[i + 1] -= x;
	}
	// 处理 n 次修改操作
	while (m--) {
		ll l, r, k;
		cin >> l >> r >> k;
		f[l] += k;
		f[r + 1] -= k;
	}
	// 还原出原始的数组
	for (int i = 1; i <= n; i++) {
		f[i] = f[i - 1] + f[i];
		cout << f[i] << " ";
	}
}
```

:::

::: tip 差分数组的性质

原数组 [L, R] 区间全部加 k 这个操作，相当于在差分数组中，f[L] += k, f[R + 1] -= k

:::

::: warning 注意

差分数组使用的时候，所有的操作必须全部进行完毕之后，才能还原出操作之后的数组

:::

例题：[P3406 海底高铁](https://www.luogu.com.cn/problem/P3406)

<p><font color="blue">解法：利用差分计算出每段路程经的次数，并判断最小花费</font></p>

```c++
#include<iostream>
#include<algorithm>
using namespace std;

typedef long long ll;

const int N = 1e5 + 10;

int n, m;
ll f[N]; // 差分数组

int main() {
	cin >> n >> m;
	// x -> y
	int x;
	cin >> x;
	for (int i = 2; i <= m; i++) {
		int y;
		cin >> y;
		// x -> y
		if (x > y) {
			f[y]++;
			f[x]--;
		}
		else {
			f[x]++;
			f[y]--;
		}
		x = y;
	}
	// 利用差分数组，还原出原数组
	for (int i = 1; i <= n; i++)f[i] += f[i - 1];
	// 直接求结果
	ll ret = 0;
	for (int i = 1; i < n; i++) {
		ll a, b, c;
		cin >> a >> b >> c;
		ret += min(a * f[i], c + b * f[i]);
	}
	cout << ret << endl;
}
```

### 二维差分

::: danger 警告

该部分尚未完工!

:::

例题：[P3397 地毯](https://www.luogu.com.cn/problem/P3397)

::: danger 警告

该部分尚未完工!

:::

## 双指针

双指针算法有时候也叫**尺取法**或者**滑动窗口**，是一种**优化暴力枚举策略的手段**。

- 当我们发现在两层 for 循环的暴力枚举过程中，**两个指针是可以不回退的**，此时我们就可以利用两个指针不回退的性质来优化时间复杂度。

- 因为双指针算法中，两个指针是朝着同一个方向移动的，因此也叫做**同向双指针**

时间复杂度：**O(n)**

例题：[UVA11572 唯一的雪花 Unique Snowflakes](https://www.luogu.com.cn/problem/UVA11572)

<p><font color="blue">解法一：暴力枚举 -> 枚举出所有符合要求的子数组</font></p>

<p><font color="blue">解法二：利用单调性，使用“同向双指针”来优化（在暴力枚举的过程中，left 以及 right 其实是可以不回退的）</font></p>

```c++
#include<iostream>
#include<map>
#include<algorithm>
using namespace std;

const int N = 1e6 + 10;

int n;
int a[N];

int main() {
	int T;
	cin >> T;
	while (T--) {
		cin >> n;
		for (int i = 1; i <= n; i++)cin >> a[i];
		// 初始化
		int left = 1, right = 1, ret = 0;
		map<int, int> mp; // 维护窗口内所有元素出现的次数
		while (right <= n) {
			// 进窗口
			mp[a[right]]++;
			// 判断
			while (mp[a[right]] > 1) {
				// 出窗口
				mp[a[left]]--;
				left++;
			}
			// 窗口合法，更新结果
			ret = max(ret, right - left + 1);
			right++;
		}
		cout << ret << endl;
	}
}
```

例题：[P1638 逛画展](https://www.luogu.com.cn/problem/P1638)

::: danger 警告

该部分尚未完工!

:::

例题：[P14171 【MX-X23-T1】丢手绢](https://www.luogu.com.cn/problem/P14171)

```c++
#include<bits/stdc++.h>
using namespace std;

const int N = 1e5+10;

int n;
int m;
int a[N];

int main(){
    cin>>n;
    for(int i = 0;i<n;i++){
        int pos;
        cin>>pos;
        int idx = (i+pos+n)%n;
        a[idx]++;
        if(m<a[idx])m=a[idx];
    }
    for(int i = 0;i<n;i++){
        if(a[i]==m)cout<<i+1<<" ";
    }
    cout<<endl;
}
```

## 二分算法

例题：[在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/)

<p><font color="blue">解法一：暴力解法 -> 从前往后扫描数组</font></p>

<p><font color="blue">解法二：二分算法</font></p>

::: warning 查找起始位置的细节问题

while 循环里面的判断如何写?

- `while (left < right)`

求中点的方式？

- `mid = (left + right) / 2`

二分结束之后，相遇点的情况？

- 需要判断以下，循环结束之后，是否是我们想要的结果

:::

::: warning 查找终止位置的细节问题

while 循环里面的判断如何写?

- `while (left < right)`

求中点的方式？

- `mid = (left + right + 1) / 2`

二分结束之后，相遇点的情况？

- 需要判断以下，循环结束之后，是否是我们想要的结果

:::

```c++
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int n = nums.size();
        // 处理边界情况
        if (n == 0)
            return {-1, -1};
        // 1.求起始位置
        int left = 0, right = n - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] >= target)
                right = mid;
            else
                left = mid + 1;
        }
        // left 或者 right 所指的位置就有可能是最终结果
        if (nums[left] != target)
            return {-1, -1};
        int retleft = left; // 记录一下起始位置
        // 2.求终止位置
        left = 0, right = n - 1;
        while (left < right) {
            int mid = (left + right + 1) / 2;
            if (nums[mid] <= target)
                left = mid;
            else
                right = mid - 1;
        }
        return {retleft, left};
    }
};
```

### 二分查找

例题：[P1102 A-B 数对](https://www.luogu.com.cn/problem/P1102)

```c++
#include<bits/stdc++.h>
using namespace std;

const int N = 2e5+10;

typedef long long ll;

ll n,c;
ll num[N];
ll length[N];
ll res;

int main(){
    cin>>n>>c;
    num[0] = -1;
    for(ll i = 1;i<=n;i++){
        cin>>num[i];
    }
    sort(num+1,num+1+n);
    for(ll i = 1;i<=n;i++){
        if(num[i]==num[i-1])length[i]=length[i-1]+1;
        else length[i]=1;
    }
    ll l=n,r=n;
    while(l>0&&r>0){
        if(num[r]-num[l]>c)r--;
        else if(num[r]-num[l]<c)l--;
        else if(num[r]-num[l]==c){
            res+=length[l]*length[r];
            l-=length[l];
            r-=length[r];
        }
    }
    cout<<res<<endl;
}
```

例题：[P1678 烦恼的高考志愿](https://www.luogu.com.cn/problem/P1678)

::: danger 警告

该部分尚未完工!

:::

### 二分答案

准确来说，应该叫做 [二分答案 + 判断]。

二分答案可以处理大部分 [最大值最小] 以及 [最小值最大] 的问题。如果 [解空间] 在从小到大的 [变化] 过程中，[判断] 答案的结果出现 [二段性]，此时我们就可以 [二分] 这个 [解空间]，通过 [判断]，找出最优解。

例题：[P2440 木材加工](https://www.luogu.com.cn/problem/P2440)

<p><font color="blue">解法一：暴力枚举，枚举所有的切割长度 x</font></p>

<p><font color="blue">解法二：利用二分来优化</font></p>

```c++
#include<iostream>
#include<algorithm>
using namespace std;

typedef long long ll;

const int N = 1e5 + 10;

ll n, k;
ll a[N];

// 当切割长度为 x 的时候，最多能切出来多少段
ll calc(ll x) {
	ll cnt = 0;
	for (int i = 1; i <= n; i++) {
		cnt += a[i] / x;
	}
	return cnt;
}

int main() {
	cin >> n >> k;
	for (int i = 1; i <= n; i++)cin >> a[i];
	ll left = 0, right = 1e8;
	while (left < right) {
		ll mid = (left + right + 1) / 2;
		if (calc(mid) >= k)left = mid;
		else right = mid - 1;
	}
	cout << left << endl;
}
```

例题：[P1873 [COCI 2011/2012 #5] EKO / 砍树](https://www.luogu.com.cn/problem/P1873)

::: danger 警告

该部分尚未完工!

:::

例题：[P2678 [NOIP 2015 提高组] 跳石头](https://www.luogu.com.cn/problem/P2678)

::: danger 警告

该部分尚未完工!

:::

### 二分模板

::: details 算法原理

当我们的解具有**二段性**时，就可以使用二分算法找出答案：

- 根据待查找区间的中点位置，分析答案会出现在哪一侧；

- 接下来舍弃一半的待查找区间，转而在有答案的区间内继续使用二分算法查找结果。

:::

::: code-group

```c++ [二分查找区间左端点]
int l = 1, r = n; // 待查找区间为 [1, n]
while (l < r) {
	int mid = (l + r) / 2;
	if (check(mid)) r = mid;
	else l = mid + 1;
}
// 二分结束之后可能需要判断是否存在结果
```

```c++ [二分查找区间右端点]
int l = 1, r = n; // 待查找区间为 [1, n]
while (l < r) {
	int mid = (l + r + 1) / 2;
	if (check(mid)) l = mid;
	else r = mid - 1;
}
// 二分结束之后可能需要判断是否存在结果
```

:::

::: tip 防止溢出

为了防止溢出，求中点时可以用下面的方式：

- `mid = left + (right - left) / 2;`

- `mid = left + (right - left + 1) / 2;`

:::

时间复杂度：**$O(logn)$**

## 贪心

贪心算法，或者说是贪心策略：企图用局部最优找出全局最优。

- 1.把解决问题的过程分成若干步；

- 2.解决每一步时，都选择“当前看起来最优的”解法；

- 3.“希望”得到全局的最优解。

::: tip 贪心算法的特点

对于大多数题目，贪心策略的提出并不是很难，难的是证明它是正确的。因为贪心算法相较于暴力枚举，每一步并不是把所有情况的考虑进去，而是只考虑当前看起来最优的情况。但是，局部最优并不等于全局最优，所以我们必须要能严谨的证明我们的贪心策略是正确的。

:::

### 简单贪心

例题：[P10452 货仓选址](https://www.luogu.com.cn/problem/P10452)

::: code-group

```c++ [利用中间值来计算]
#include<iostream>
#include<algorithm>
#include<cstdlib>

using namespace std;

typedef long long ll;

const int N = 1e5 + 10;

int n;
ll a[N];

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	sort(a + 1, a + 1 + n);
	ll ret = 0;
	for (int i = 1; i <= n; i++)ret += abs(a[i] - a[n / 2]);
	cout << ret << endl;
}
```

```c++ [利用结论计算]
#include<iostream>
#include<algorithm>

using namespace std;

typedef long long ll;

const int N = 1e5 + 10;

int n;
ll a[N];

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	sort(a + 1, a + 1 + n);
	ll ret = 0;
	for (int i = 1; i <= n; i++)ret += a[n - i + 1] - a[i];
	cout << ret << endl;
}
```

:::

::: tip 结论

形如：$sum=\sum_{i=1}^n |a[i]-x| = |a[1]-x|+|a[2]-x|+...+|a[n]-x|$ 这样一个式子：

- 当 $x$ 取到 $n$ 个数的中位数时，和最小；

- 最小和为：$(a[n]-a[1])+(a[n-1]+a[2])+...+(a[n+1-n/2]+a[n/2])$。

:::

例题：[P1115 最大子段和](https://www.luogu.com.cn/problem/P1115)

```c++
#include<iostream>
#include<algorithm>

using namespace std;

typedef long long ll;

const int N = 2e5 + 10;

int n;
ll a[N];

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	ll sum = 0, ret = -1e6;
	for (int i = 1; i <= n; i++) {
		sum += a[i];
		ret = max(ret, sum);
		if (sum < 0)sum = 0;
	}
	cout << ret << endl;
}
```

例题：[P1094 [NOIP 2007 普及组] 纪念品分组](https://www.luogu.com.cn/problem/P1094)

::: danger 警告

该部分尚未完工!

:::

例题：[P1056 [NOIP 2008 普及组] 排座椅](https://www.luogu.com.cn/problem/P1056)

::: danger 警告

该部分尚未完工!

:::

### 推公式

例题：[P14357 [CSP-J 2025] 拼数](https://www.luogu.com.cn/problem/P14357)

::: danger 警告

该部分尚未完工!

:::

例题：[P1842 [USACO05NOV] 奶牛玩杂技](https://www.luogu.com.cn/problem/P1842)

::: danger 警告

该部分尚未完工!

:::

### 哈夫曼编码

哈夫曼算法是哈夫曼树的构建过程，是根据弹性策略得到的算法。主要流程为：

> 1. 初始化：将所有叶子结点看作一棵棵树，那么刚开始我们有一片森林；
> 2. 贪心：每次选择根节点权值最小的两棵树作为左右子树合并成一棵新的二叉树，这棵新的二叉树根节点的权值为左右子树的权值之和；
> 3. 重复 2 过程，直到森林中所有的树合并成一棵树。

哈夫曼编码是一种被广泛应用而且非常有效的数据压缩编码，其构造步骤如下：

> 1. 统计待编码的序列中，每一个字符出现的次数；
> 2. 将所有的次数当成叶结点，构造哈夫曼树；
> 3. 规定哈夫曼树的左分支为 0，右分支为 1，那么从根节点走到叶子结点的序列，就是该叶子结点对应字符的编码。

例题：[哈夫曼编码](https://ac.nowcoder.com/acm/problem/233601)

<p><font color="blue">解法：编码后的字符串长度等于带权路径长度</font></p>

```c++
#include<iostream>
#include<queue>
#include<vector>
#include<functional>

typedef long long ll;

using namespace std;

int n;
priority_queue<ll,vector<ll>,greater<ll>> heap;

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++) {
		ll x;
		cin >> x;
		heap.push(x);
	}
	// 哈夫曼编码
	ll ret = 0;
	while (heap.size() > 1) {
		ll x = heap.top();
		heap.pop();
		ll y = heap.top();
		heap.pop();
		ret += x + y;
		heap.push(x + y);
	}
	cout << ret << endl;
}
```

::: tip 如何计算带权路径长度

- 在合并的过程中，每一棵树的根节点的权值其实等于该树所有叶子结点的权值之和；

- 在每次合并的时候，由于多出来两条路径，此时累加上左右子树的根节点权值，相当于计算了一次叶子结点到这两条路径的长度；

- 每次合并都把左右子树的权值累加起来，就是最终的带权路径长度。

:::

例题：[P1090 [NOIP 2004 提高组] 合并果子](https://www.luogu.com.cn/problem/P1090)

::: danger 警告

该部分尚未完工!

:::

### 区间问题

例题：[P1803 凌乱的yyy / 线段覆盖](https://www.luogu.com.cn/problem/P1803)

::: danger 警告

该部分尚未完工!

:::

例题：[P2887 [USACO07NOV] Sunscreen G](https://www.luogu.com.cn/problem/P2887)

::: danger 警告

该部分尚未完工!

:::

## 倍增思想

倍增，顾名思义就是**翻倍**。它能够使线性的处理转化为对数级的处理，极大地优化时间复杂度。

### 快速幂

例题：[P1226 【模板】快速幂](https://www.luogu.com.cn/problem/P1226)

<p><font color="blue">解法：利用倍增 + 二进制</font></p>

```c++
#include<iostream>
#include<cstdio>
using namespace std;

typedef long long ll;

ll a, b, p;

// 快速幂的模板
ll qpow(ll a, ll b, ll p) {
	ll ret = 1;
	while (b) {
		if (b & 1)ret = ret * a % p;
		a = a * a % p;
		b >>= 1;
	}
	return ret;
}

int main() {
	cin >> a >> b >> p;
	printf("%lld^%lld mod %lld=%lld", a, b, p, qpow(a, b, p));
}
```

::: tip 取模运算的规则

- 当计算过程中，只有**加法**和**乘法**时，取模可以放在任意的位置。

- 当计算过程中，存在**减法**时，结果是可能出现负数的，此时如果需要补正，就需要加上模数。

- 当计算过程中，存在**除法**的时候，任意位置取模是会造成结果错误的。

:::

### 大整数乘法

例题：[P10446 64位整数乘法](https://www.luogu.com.cn/problem/P10446)

::: danger 警告

该部分尚未完工!

:::

## 离散化

例题：[P1496 火烧赤壁](https://www.luogu.com.cn/problem/P1496)

::: danger 警告

该部分尚未完工!

:::

例题：[P3740 [HAOI2014] 贴海报](https://www.luogu.com.cn/problem/P3740)

::: danger 警告

该部分尚未完工!

:::

## 递归初阶

::: tip 为什么会用到递归？

本质：在处理主问题时，需要解决子问题，两者的处理方式完全一致。

问题 -> 相同的子问题 -> 相同的子子问题......直到子问题不能继续拆分

:::

::: tip 从宏观角度看待递归

- 不要在意递归的细节展开图 --- 写完代码不要再去纠结递归展开图；

- 把递归函数当成一个黑盒 --- 赋予这个黑盒一个任务；

- 相信这个黑盒一定能帮助我们完成这个任务。

:::

::: tip 如何写好一个递归

- 先找到相同的子问题 -> 确定函数的功能以及函数头的设计；

- 只关心某一个子问题时如何解决的 -> 函数题；

- 不能继续拆分的子问题 -> 递归出口。

:::

例题：[1205：汉诺塔问题](https://ybt.ssoier.cn/problem_show.php?pid=1205)

<p><font color="yellowgreen">相同的问题：x 柱子上有 n 个盘子，需要借助 y 的帮助，转移到 z 上</font></p>

```c++
#include<iostream>
#include<cstdio>
using namespace std;

int n;
char a, b, c;

// 把 x 柱子上的 n 个盘子，借助 y 的帮助，全部放到 z 上
void Hanoi(int n, char x, char y, char z) {
	if (n == 0)return;
	Hanoi(n - 1, x, z, y);
	printf("%c->%d->%c\n", x, n, z);
	Hanoi(n - 1, y, x, z);
}

int main() {
	cin >> n >> a >> b >> c;
	Hanoi(n, a, c, b);
}
```

例题：[P10457 占卜DIY](https://www.luogu.com.cn/problem/P10457)

::: danger 警告

该部分尚未完工!

:::

例题：[P1087 [NOIP 2004 普及组] FBI 树](https://www.luogu.com.cn/problem/P1087)

::: danger 警告

该部分尚未完工!

:::

## 分治

分治，字面上的解释是 [分而治之]，就是把一个复杂的问题分成两个或更多的相同的子问题，直到最后子问题可以简单的直接求解，原问题的解即子问题的解的合并。

例题：[P1908 逆序对](https://www.luogu.com.cn/problem/P1908)

<p><font color="blue">解法一：两层 for 循环</font></p>

<p><font color="blue">解法二：利用 分治 + 归并排序 来解决（全在左边选、全在右边选、一左一右）</font></p>

```c++
#include<iostream>
using namespace std;;

typedef long long ll;

const int N = 5e5 + 10;

int n;
int a[N];
int tmp[N];

ll merge(int left, int right) {
	if (left >= right)return 0;
	ll ret = 0;
	int mid = (left + right) / 2;
	ret += merge(left, mid);
	ret += merge(mid + 1, right);
	// 一左一右的情况
	int cur1 = left, cur2 = mid + 1, i = left;
	while (cur1 <= mid && cur2 <= right) {
		if (a[cur1] <= a[cur2])tmp[i++] = a[cur1++];
		else {
			ret += mid - cur1 + 1;
			tmp[i++] = a[cur2++];
		}
	}
	while (cur1 <= mid)tmp[i++] = a[cur1++];
	while (cur2 <= right)tmp[i++] = a[cur2++];
	for (int j = left; j <= right; j++)a[j] = tmp[j];
	return ret;
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++)cin >> a[i];
	cout << merge(1,n) << endl;
}
```

例题：[P1923 【深基9.例4】求第 k 小的数](https://www.luogu.com.cn/problem/P1923)

::: danger 警告

该部分尚未完工!

:::

例题：[P1115 最大子段和](https://www.luogu.com.cn/problem/P1115)

::: danger 警告

该部分尚未完工!

:::

例题：[P1228 地毯填补问题](https://www.luogu.com.cn/problem/P1228)

::: danger 警告

该部分尚未完工!

:::

## 其他

### ACM 模式与核心代码模式

**ACM 模式**一般是竞赛和笔试面试常用的模式，就是只给你一个题目描述，外加输入样例和输出样例，不会给你任何的代码。此时，选手或者应聘者需要根据题目要求，自己完成如下任务：

> 1. 头文件的包含
> 2. main 函数的设计
> 3. 自己定义程序所需的变量和容器（数组、哈希表等等）
> 4. 数据的输入（根据题目叙述控制输入数据的格式）
> 5. 数据的处理（各种函数接口的设计）
> 6. 数据的输出（根据题目叙述控制输出数据的格式）

**核心代码模式**就只用实现主要功能：

> 1. 核心代码模式不需要你处理头文件，输入和输出等乱七八糟的东西，只是甩给你一个函数接口。你的任务就仅仅是完成这个函数；
> 2. 在这一个函数接口中，函数头部分会传给你需要的数据，直接使用即可；
> 3. 在你完成这个函数并且提交之后，后台会调用你所写的函数，并且根据你返回的结果测试是否正确。
