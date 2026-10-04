# 数据库

## MySQL 数据库

**数据库**（database）是用来组织、存储和管理数据的仓库。用户可以对数据库中的数据进行新增、查询、更新、删除等操作。

最常见的数据库有如下几个：

- MySQL 数据库

- Oracle 数据库

- SQL Server 数据库

- Mongodb 数据库

其中，MySQL、Oracle、SQL Server 属于传统型数据库（又叫做：关系型数据库或 SQL 数据库），这三者的设计理念相同，用法比较类似。

而 Mongodb 属于新型数据库（又叫做非关系数据库或 NoSQL 数据库），它在一定程度上弥补了传统型数据库的缺陷。

传统型数据库的数据组织结构，与 Excel 中数据的组织结构（工作簿、工作表、数据行、列）比较类似，数据的组织结构分为**数据库**（database）、**数据表**（table）、**数据行**（row）、**字段**（field）这 4 大部分组成。

在实际项目开发中，一般情况下，每个项目都对应独立的数据库。

不同的数据，要存储到数据库的不同表中。例如：用户数据存储到 users 表中，图书数据存储到 books 表中。

每个表中具体存储哪些信息，由字段来决定。例如：我们可以为 users 表设计 id、username、password 这 3 个字段。

表中的行，代表每一条具体的数据。

### 安装并配置 MySQL

- **MySQL Server**：专门用来提供数据存储和服务的软件

- **MySQL Workbench**：可视化的 MySQL 管理工具，可以方便的操作存储在 MySQL Server 中的数据

下载连接：https://downloads.mysql.com/archives/installer/

`net start mysql80`：启动 MySQL Server

`net stop mysql80`：停止 MySQL Server

### 主界面组成部分

![MySQL Workbench 主界面](/images/content/back-end/nodejs/mysql.png)

### 创建数据

**创建数据库的步骤**：

① 点击新建数据库按钮

![新建数据库](/images/content/back-end/nodejs/mysql-new-schema.png)

② 填写数据库的名称

③ 点击 Apply 按钮，创建数据库

**创建数据表的步骤**：

① 展开对应的数据库，在 Tables 节点上右键选择 Create Table ...

② 在 Table Name 内输入数据表的名称

③ 在 Comments 内输入数据表的描述（可选）

④ 设计表的字段

::tip

Data Type 数据类型：

- **INT**：整数

- **VARCHAR(len)**：字符串

- **TINYINT(1)**：布尔值

::

::tip

Storage 特殊标识：

- **PK**(Primary Key)：主键、唯一标识

- **NN**(Not Null)：值不允许为空

- **UQ**(Unique)：值唯一

- **AI**(Auto Increment)：值自动增长

::

⑤ 点击 Apply 按钮，创建数据表

**向表中写入数据的步骤**：

① 在对应表上右键选择 Select Rows - Limit 1000

② 输入需要输入的数据

③ 点击 Apply 按钮，写入数据

## SQL 管理数据库

**SQL**（Structured Query Language）是结构化查询语言，专门用来发访问和处理数据库的编程语言。能够让我们以编程的形式，操作数据库里面的数据。

SQL 能做到：

- 从数据库中查询数据

- 向数据库中插入新的数据

- 更新数据库中的数据

- 从数据库中删除数据

- 创建新数据库

- 在数据库中创建新表

- 在数据库中创建存储过程，视图

- etc...

::tip

- SQL 是一门数据库编程语言

- 使用 SQL 语言编写出来的代码，叫做 SQL 语句

- SQL 语言只能在关系型数据库中使用（MySQL、Oracle、SQL Server）。非关系型数据库（Mongodb）不支持 SQL 语言

::

### SELECT 语句

**SELECT** 语句用于从表中查询数据。执行的结果被存储在一个结果表中（结果集）：

```sql
-- 从 FROM 指定的【表中】，查询出【所有的】数据，* 表示【所有列】
SELECT * FROM 表名称;

-- 从 FROM 指定的【表中】，查询出指定列名称（字段）的数据
SELECT 列名称 FROM 表名称;
```

::detail

#title
具体示例
#default
我们希望从 users 表中选取所有的列，可以使用符号 \* 取代列的名称：

```sql
SELECT * from users
```

如获取名为 `username` 和 `password` 的列的内容（从名为 "users" 的数据库表），请使用下面的 SELECT 语句：

```sql
SELECT username, password FROM users;
```

::

::warning

- 多个列和多个值之间，使用英文逗号进行分隔

- SQL 语句中的关键字对大小写不敏感，SELECT 等效于 select，FROM 等效于 from

::

### INSERT INTO 语句

**INSERT INTO** 语句用于向数据表中插入新的数据行：

```sql
INSERT INTO 表名称 (列1, 列2, ...) VALUES (值1, 值2, ...);
```

::detail

#title
具体示例
#default
向 users 表中，插入一条 `username` 为 tony stark，`password` 为 098123 的用户数据：

```sql
INSERT INTO users (username, password) VALUES ('tony stark', '098123');
```

::

### UPDATE 语句

**UPDATE** 语句用于修改表中的数据：

```sql
-- 1. 用 UPDATE 指定要更新哪个表中的数据
-- 2. 用 SET 指定列对应的新值
-- 3. 用 WHERE 语句指定更新的条件，不带 WHERE 语句，则更新表中所有的数据
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值;
```

::detail

#title
具体示例
#default
把 users 表中 `id` 为 4 的用户密码，更新为 888888：

```sql
UPDATE users SET password = '888888' WHERE id = 4;
```

把 users 表中 `id` 为 2 的用户密码和用户状态，分别更新为 admin123 和 1：

```sql
UPDATE users SET password = 'admin123', status = 1 WHERE id = 2;
```

::

### DELETE 语句

**DELETE** 语句用于删除表中的行：

```sql
-- 从指定的表中，根据 WHERE 条件，删除对应的数据行
DELETE FROM 表名称 WHERE 列名称 = 某值;
```

::detail

#title
具体示例
#default
从 users 表中，删除 id 为 4 的用户：

```sql
DELETE FROM users WHERE id = 4;
```

::

### WHERE 子句

**WHERE** 子句用于限定选择的标准。在 SELECT、UPDATE、DELETE 语句中，皆可使用 WHERE 子句来限定选择的标准：

```sql
-- 查询语句中的 WHERE 条件
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值;
-- 更新语句中的 WHERE 条件
UPDATE 表名称 SET 列名称 = 新值 WHERE 列 运算符 值;
-- 删除语句中的 WHERE 条件
DELETE FROM 表名称 WHERE 列 运算符 值;
```

下面的运算符可在 WHERE 子句中使用，用来限定选择的标准:

| 操作符  |     描述     |
| :-----: | :----------: |
|    =    |     等于     |
|   <>    |    不等于    |
|    >    |     大于     |
|    <    |     小于     |
|   >=    |   大于等于   |
|   <=    |   小于等于   |
| BETWEEN | 在某个范围内 |
|  LIKE   | 搜索某种模式 |

::warning

在某些版本的 SQL 中，操作符 `<>` 可以写为 `!=`

::

::detail

#title
具体示例
#default
可以通过 WHERE 子句来限定 SELECT 的查询条件：

```sql
-- 查询 status 为 1 的所有用户
SELECT * FROM users WHERE status = 1;
-- 查询 id 大于 2 的所有用户
SELECT * FROM users WHERE id > 2;
-- 查询 username 不等于 admin 的所有用户
SELECT * FROM users WHERE username <> 'admin';
```

::

### AND 和 OR 运算符

**AND** 和 **OR** 可在 WHERE 子语句中把两个或多个条件结合起来。

AND 表示必须同时满足多个条件，OR 表示只要满足任意一个条件即可。

::detail

#title
具体示例
#default
使用 AND 来显示所有 `status` 为 0，并且 `id` 小于 3 的用户：

```sql
SELECT * FROM users WHERE status = 0 AND id < 3;
```

使用 OR 来显示所有 `status` 为 1，或者 `username` 为 zs 的用户：

```sql
SELECT * FROM users WHERE status = 1 OR username = 'zs';
```

::

### ORDER BY 子句

**ORDER BY** 语句用于根据指定的列对结果集进行排序，默认按照升序对记录进行排序。

如果希望按照降序对记录进行排序，可以使用 **DESC** 关键字。**ASC** 关键字代表升序排序。

也可以一次性先后进行多次排序。

::detail

#title
具体示例
#default
对 users 表中的数据，按照，`status` 字段进行升序排序：

```sql
-- 如下两条 SQL 语句是等价的
SELECT * FROM users ORDER BY status;
SELECT * FROM users ORDER BY status ASC;
```

对 users 表中的数据，按照，`id` 字段进行降序排序：

```sql
SELECT * FROM users ORDER BY id DESC;
```

对 users 表中的数据，先按照，`status` 字段进行降序排序，再按照 `username` 的字母顺序，进行升序排序：

```sql
SELECT * FROM users ORDER BY status DESC, username ASC;
```

::

### COUNT(\*) 函数

**COUNT(\*)** 函数用于返回查询结果的总数据条数，语法格式如下：

```sql
SELECT COUNT(*) FROM 表名称;
```

::detail

#title
具体示例
#default
查询 users 表中 `status` 为 0 的总数据条数：

```sql
SELECT COUNT(*) FROM users WHERE status = 0;
```

::

### AS 关键字

如果希望给查询出来的列名称设置别名，可以使用 **AS** 关键字。

::detail

#title
具体示例
#default
使用 AS 关键字给列起别名

```sql
SELECT COUNT(*) AS total FROM users WHERE status = 0;
SELECT username AS uname, password AS upwd FROM users;
```

::
