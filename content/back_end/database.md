# 数据库

## 数据库概述

**数据库**（database）是用来组织、存储和管理数据的仓库。用户可以对数据库中的数据进行新增、查询、更新、删除等操作

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

## MySQL 数据库

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

<img src="/images/content/back-end/nodejs/mysql-new-schema.png" alt="新建数据库" width="100"/>

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

## Redis 数据库

Redis(Remote Dictionary Server) 远程词典服务器，诞生于 2009 年，是一个基于内存的 key-value 结构(NoSQL)数据库

- 单线程，每个命令具备原子性

- 基于内存存储，读写性能高(基于内存、IO 多路复用、良好的编码)

- 适合存储热点数据(热点商品、咨询、新闻)

- 支持数据持久化

- 支持主从集群、分片集群

- 支持多语言客户端

- 企业应用广泛

### Redis 配置

```properties
# 监听的地址，默认是 127.0.0.1，会导致只能在本地访问。修改为 0.0.0.0 则可以在任意 IP 访问；生产环境不要设置为 0.0.0.0
bind 0.0.0.0

# 守护进程，修改为 yes 后即可后台运行
daemonize yes

# 密码，设置后访问 Redis 必须输入密码
requirepass 123321

# 监听的端口
port 6379

# 数据库数量，设置为 1，代表只使用 1 个库，默认有 16 个库，编号 0~15
databases 1

# 设置 redis 能够使用的最大内存
maxmemory 512mb

# 日志文件，默认为空，不记录日志，可以指定日志文件名
logfile "redis.log"
```

### 常用数据类型

Redis 存储的是 key-value 结构的数据，其中 key 是字符串类型，value 有 5 种常用的数据类型：

- 字符串 **string**：Redis 中最简单的数据类型，其 value 是字符串，不过根据字符串的格式不同，又可以分为 3 类
  - string: 普通字符串
  - int: 整数类型，可以做自增、自建操作
  - float: 浮点类型，可以做自增、自建操作

- 哈希 **hash**：也叫散列，类似于 Java 中的 HashMap 结构，一个 key 对应多个 field-value 键值对

- 列表 **list**：按照插入顺序排序，可以有重复元素，可以看作是一个双向链表结构，类似于 Java 中的 LinkedList

- 集合 **set**：无序集合，没有重复元素，类似于 Java 中的 HashSet

- 有序集合 **sorted set/zset**：集合中每个元素关联一个分数(double score)，根据分数升序排序，没有重复元素

### key 的结构

Redis 的 key 允许有多个单词形成层级结构，多个单词之间用 ':' 隔开，格式为 `[项目名]:[业务名]:[类型]:[id]`

这个格式并非固定，也可以根据自己的需求来删除或添加词条

### Redis 操作命令

- `redis-server redis.conf`: 启动 Redis，需先进入 redis 安装目录

- `redis-cli [-u password] shutdown`: 停止 Redis，如果配置了密码需要通过 `-u` 来指定密码

- `redis-cli [-u password] shutdown`: 停止 Redis，如果配置了密码需要通过 `-u` 来指定密码

### 字符串操作命令

- `SET [key] [value]`: 设置指定 key 的值为 value

- `GET [key]`: 获取指定 key 的值

- `MSET [key1] [value1] [...key] [...value]`: 批量添加多个 String 类型的键值对

- `MGET [key1] [...key]`: 根据多个 key 获取多个 String 类型的 value

- `INCR [key]`: 让一个整型的 key 自增 1

- `INCRBY [key] [step]`: 让一个整型的 key 自增并指定步长

- `INCRBYFLOAT [key] [step]`: 让一个浮点类型的 key 自增并指定步长

- `SETEX [key] [seconds] [value]`: 设置指定 key 的值，并将 key 的过期时间设为 seconds 秒

- `SETNX [key] [value]`: 只有在 key 不存在时设置 key 的值

### 哈希操作命令

- `HSET [key] [field] [value]`: 将哈希表 key 中的字段 field 的值设为 value

- `HGET [key] [field]`: 获取存储在哈希表中指定字段的值

- `HMSET [key] [field] [value] [...field ...value]`: 向 hash 类型的 key 中批量添加多个 field-value 键值对

- `HMGET [key] [field1] [...field]`: 根据多个 key 获取多个 String 类型的 value

- `HGETALL [key]`: 获取一个 hash 类型的 key 中所有的 field-value 键值对

- `HKEYS [key]`: 获取一个 hash 类型的 key 中所有的 field

- `HVALS [key]`: 获取一个 hash 类型的 key 中所有的 value

- `HINCRBY [key] [field] [step]`: 让一个 hash 类型的 key 中 field 的值自增并指定步长 step

- `HSETNX [key] [field] [value]`: 添加一个 hash 类型的 key 的 field-value 键值对，前提是 field 不存在，否则不执行

- `HDEL [key] [field]`: 删除存储在哈希表中的指定字段

### 列表操作命令

- `LPUSH [key] [value1] [...value]`: 将一个或多个值按顺序插入到列表左侧

- `LPOP [key] [count]`: 依次移除并返回列表左侧 count 个元素，没有则返回 null

- `RPUSH [key] [value1] [...value]`: 将一个或多个值按顺序插入到列表右侧

- `RPOP [key]`: 依次移除并返回列表右侧 count 个元素 ，没有则返回 null

- `LRANGE [key] [start] [end]`: 获取列表指定范围内的元素

- `BLPOP [key] [time]` 和 `BRPOP [key] [time]`: 与 `LPOP` 和 `RPOP` 类似，只不过在没有元素时等待 time 秒，而不是直接返回 null

### 集合操作命令

- `SADD [key] [member1] [...member]`: 向集合添加一个或多个成员

- `SISMEMBER [key] [member]`: 判断一个元素是否存在于 set 中

- `SMEMBERS [key]`: 返回集合中的所有成员

- `SCARD [key]`: 获取集合的元素个数

- `SINTER [key] [...key]`: 返回给定所有集合的交集

- `SDIFF [key] [...key]`: 返回给定所有集合的差集

- `SUNION [key] [...key]`: 返回给定所有集合的并集

- `SREM [key] [member1] [...member]`: 删除集合中一个或多个成员

### 有序集合操作命令

- `ZADD [key] [score1] [member1] [...score ...member]`: 向有序集合添加一个或多个成员，如果已经存在则更新其 score 值

- `ZREM [key] [member]`: 移除有序集合中的一个指定元素

- `ZSCORE [key] [member]`: 获取有序集合中的指定元素的 score 值

- `ZRANK [key] [member]`: 获取有序集合中的指定元素的排名

- `ZCARD [key]`: 获取有序集合中的元素个数

- `ZCOUNT [key] [min] [max]`: 统计 score 值在 min 和 max 之间的元素个数

- `ZINCRBY [key] [increment] [member]`: 有序集合中对指定成员的分数加上增量 increment

- `ZRANGE [key] [min] [max]`: 按照 score 排序后，获取指定排名范围内的元素

- `ZRANGEBYSCORE [key] [min] [max]`: 按照 score 排序后，获取指定 score 范围内的元素

- `ZINTER [key] [...key]`: 返回给定所有集合的交集

- `ZDIFF [key] [...key]`: 返回给定所有集合的差集

- `ZUNION [key] [...key]`: 返回给定所有集合的并集

::tip

所有的排序默认都是升序，如果要降序，则在命令的 Z 后面添加 REV 即可

例如: `ZREVRANK stus Rose`

::

### 通用命令

Redis 的通用命令是不分数据类型的，都可以使用的命令

- `KEYS [pattern]`: 查找所有符合给定模式(pattern)的 key(不建议在生产环境设备上使用)

- `EXISTS [key]`: 检查给定 key 是否存在

- `TYPE [key]`: 返回 key 所存储的值的类型

- `DEL [key]`: 该命令用于在 key 存在时删除 key

- `EXPIRE [key]`: 给一个 key 设置有效期，有效期到期时该 key 会被自动删除

- `TTL [key]`: 查看一个 key 的剩余有效期

- `help [command]`: 查看一个命令的具体用法

::tip

有效期为 -1 时代表永久有效；有效期为 -2 时代表过期

::

## Elasticsearch 与 Kibana

Elasticsearch 结合 kibana、Logstash、Beats，是一整套技术栈，被叫做 ELK。被广泛应用在日志数据分析、实时监控等领域，是一个开源的、分布式的搜索和分析引擎，常用于对大规模文本数据进行全文搜索、结构化搜索和数据分析

官网地址: https://www.elastic.co/cn/elasticsearch

Kibana 是一个开源的数据可视化和探索工具，主要用于配合 Elasticsearch 使用

::tip

Elasticsearch 的优势

- 支持分布式，可水平扩展

- 提供 Restful 接口，可被任何语言调用

::

::tip

默认端口

Kibana: 5601

Elasticsearch: 9200

::

::tip

Lucene

Lucene 是一个 Java 语言的搜索引擎类库，是 Apache 公司的顶级项目，是 Elasticsearch、Solr 等搜索系统的底层核心

官网地址: https://lucene.apache.org/

::

### 倒排索引

传统数据库(如 MySQL) 采用正向索引，Elasticsearch 采用倒排索引

- 文档(document): 每条数据就是一个文档，对应 MySQL 的 Row(行)

- 词条(term): 文档按照语义分成的词语

::tip

正向索引与倒排索引

- 正向索引: 基于文档 id 创建索引。根据 id 查询快，但是查询词条时必须先找到文档，而后判断是否包含词条

- 倒排索引: 对文档内容分词，对词条创建索引，并记录词条所在文档的 id。查询时先根据词条查询到文档 id，而后根据文档 id 查询文档

::

::detail

#title
具体示例
#default

| id  |     title      | price |
| :-: | :------------: | :---: |
|  1  |    小米手机    | 3499  |
|  2  |    华为手机    | 4999  |
|  3  | 华为小米充电器 |  49   |
|  4  |    小米手机    |  299  |

|  词条  | 文档id |
| :----: | :----: |
|  小米  | 1,3,4  |
|  手机  |  1,2   |
|  华为  |  2,3   |
| 充电器 |   3    |
|  手环  |   4    |

::

### IK 分词器

中文分词往往需要根据语义分析，比较复杂，这就需要用到中文分词器，例如 IK 分词器

在 Kibana 的 DevTools 中可以使用下面的语法来测试 IK 分词器

::code-group

```dsl [standard]
POST /_analyze
{
  "analyzer": "standard",
  "text": "专门用来快速查找和分析海量数据的数据库"
}
```

```dsl [ik_smart]
POST /_analyze
{
  "analyzer": "ik_smart",
  "text": "专门用来快速查找和分析海量数据的数据库"
}
```

```dsl [ik_smart]
POST /_analyze
{
  "analyzer": "ik_max_word",
  "text": "专门用来快速查找和分析海量数据的数据库"
}
```

::

- POST: 请求方式

- `/_analyze`: 请求路径，省略了协议、IP 与端口号

- 请求参数，json 风格
  - analyzer: 分词器类型，standard 分词器分词英文，ik_smart 智能切分，ik_max_word 最细切分
  - text: 要分词的内容

::tip

IK 分词器允许我们配置扩展词典来增加自定义的词库

::

### 基本概念

Elasticsearch 中的文档数据会被序列化为 json 格式后存储在 Elasticsearch 中

索引(index): 相同类型的文档的集合，对应 MsSQL 的 Table(表)

映射(mapping): 索引中文档的字段约束信息，类似表的结构约束，对应 MySQL 的 Schema(表结构)

文档(document): 每条数据就是一个文档，对应 MySQL 的 Row(行)

字段(field): JSON 文档中的字段，类似 MySQL 中的 Column(列)

DSL: 是 Elasticsearch 提供的 JSON 风格的请求语句，用来定义搜索条件，类似 MySQL 中的 SQL 语句

### Mapping 映射属性

mapping 是对索引库中文档的约束，常见的 mapping 属性包括:

- type: 字段数据类型，常见的简单类型有:
  - 字符串: text(可分词的文本)、keyword(精确值，例如: 品牌名、国家、ip 地址等不进行分词的文本)
  - 数值: long、integer、short、byte、double、float
  - 布尔: boolean
  - 日期: date
  - 对象: object
- index: 是否创建索引，默认为 true
- analyzer: 使用哪种分词器
- properties: 该字段的子字段

```json
{
	"age": 21, // byte
	"weight": 52.1, // float
	"isMarried": false, // boolean
	"info": "高级程序员", // text
	"email": "zy@xxx.cm", // keyword
	"score": [99.1, 99.5, 98.9], // float
	"name": {
		"firstName": "云", // keyword
		"lastName": "赵" // keyword
	}
}
```

::tip

对于数组类型，只需指定数组元素类型

::

### 索引库操作

Elasticsearch 提供的所有 API 都是 Restful 的接口，遵循 Restful 的基本规范。创建索引库和 mapping 的请求语法如下:

::code-group

```dsl [创建索引库]
PUT /索引库名称
{
  "mappings": {
    "properties": {
      "字段名": {
        "type": "text",
        "analyzer": "ik_smart"
      },
      "字段名2": {
        "type": "keyword",
        "index": "false"
      },
      "字段名3": {
        "type": "object",
        "properties": {
          "子字段": {
            "type": "keyword"
          }
        }
      },
      // 略...
    }
  }
}
```

```dsl [查询索引库]
GET /索引库名称
```

```dsl [删除索引库]
DELETE /索引库名称
```

```dsl [修改索引库]
PUT /索引库名/_mapping
{
  "properties": {
    "新字段名": {
      "type": "integer"
    }
  }
}
```

::

::tip

索引库和 mapping 一旦创建无法修改，但是可以添加新的字段

::

### 文档操作

::code-group

```dsl [新增文档]
POST /索引库名/_doc/文档id
{
  "字段1": "值1",
  "字段2": "值2",
  "字段3": {
    "子属性1": "值3",
    "子属性2": "值4",
  }
}
```

```dsl [查询文档]
GET /索引库名/_doc/文档id
```

```dsl [删除文档]
DELETE /索引库名/_doc/文档id
```

```dsl [修改文档-全量修改]
// 全量修改，会删除旧文档，添加新文档
PUT /索引库名/_doc/文档id
{
  "字段1": "值1",
  "字段2": "值2",
  "字段3": {
    "子属性1": "值3",
    "子属性2": "值4",
  }
}
```

```dsl [修改文档-增量修改]
// 增量修改，只修改指定字段值
POST /索引库名/_update/文档id
{
  "doc": {
    "字段名": "新的值"
  }
}
```

::

Elasticsearch 中允许通过一次请求中携带多次文档操作，也就是批量处理

```dsl
POST /_bulk
{ "index": { "_index": "索引库名", "_id": "文档id" } }
{ "字段1": "值1", "字段2": "值2" } // 查询操作
{ "index": { "_index": "索引库名", "_id": "文档id" } }
{ "字段1": "值1", "字段2": "值2" } // 查询操作
{ "index": { "_index": "索引库名", "_id": "文档id" } }
{ "字段1": "值1", "字段2": "值2" } // 查询操作
{ "delete": { "_index": "索引库名", "_id": "文档id" } } // 删除操作
{ "update": { "_id": "文档id", "_index": "索引库名" } }
{ "doc": { "字段1": "值1" } } // 修改操作，增量修改
```

## JDBC(java 数据库驱动)

**JDBC**（Java DataBase Connectivity），就是使用 Java 语言操作关系型数据库的一套 API

::tip

JDBC 的本质：

- sum 公司官方定义的一套操作所有关系型数据库的规范，即接口

- 各个数据库厂商去实现这套接口，提供数据库驱动 jar 包

- 我们可以使用这套接口（JDBC）编程，真正执行的代码时驱动 jar 包中的实现类

::

### JDBC 快速入门

**需求**：基于 JDBC 程序，执行 update 语句（update user set age = 25 where id = 1）

**准备工作**：创建一个 maven 项目，引入依赖；并准备数据库表 user

```xml
<dependency>
  <groupId>com.mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <version>8.0.33</version>
</dependency>
```

**代码实现**：编写 JDBC 程序，操作数据库

```java
@Test
public void testUpdate() throws Exception {
  // 注册驱动
  Class.forName("com.mysql.cj.jdbc.Driver");
  // 获取数据库连接
  String url = "jdbc:mysql://localhost:3306/shopping";
  String username = "root";
  String password = "1234";
  Connection connection = DriverManager.getConnection(url, username, password);
  // 获取 SQL 语句执行对象
  Statement statement = connection.createStatement();
  // 执行 SQL
  int i =  statement.executeUpdate("update user set name='root' where id=1");
  System.out.println("SQL 执行完毕影响的记录数为："+i);
  // 释放资源
  statement.close();
  connection.close();
}
```

### JDBC 查询数据

**需求**：基于 JDBC 程序，执行 select 语句，将查询结果封装到 User 对象中

**SQL**：`select * from users where username = 'root' and password = '123456'`

```java
@Test
public void testSelect() {
    String url = "jdbc:mysql://localhost:3306/shopping";
    String username = "root";
    String password = "`12345`";

    Connection conn = null;
    PreparedStatement stmt = null;
    ResultSet rs = null; // 封装查询返回的结果

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection(url, username, password);

        String sql = "SELECT id, name, password, avatar, role_id, balance FROM users WHERE name = ? AND password = ?"; // 预编译 SQL
        stmt = conn.prepareStatement(sql);
        stmt.setString(1, "bba");
        stmt.setString(2, "123456");
        rs = stmt.executeQuery();

        while (rs.next()) {
            User user = new User(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("password"),
                    rs.getString("avatar"),
                    rs.getInt("role_id"),
                    rs.getInt("balance")
            );
            System.out.println(user);
        }
    } catch (SQLException se){
        se.printStackTrace();
    } catch (Exception e){
        e.printStackTrace();
    } finally {
        try{
            if(rs!= null) rs.close();
            if(stmt!= null) stmt.close();
            if(conn!= null) conn.close();
        } catch (SQLException se){
            se.printStackTrace();
        }
    }
}
```

::tip

ResultSet（结果集对象）：

- **next()**：将光标从当前位置向前移动一行，并判断当前行是否为有效行，返回值为 boolean
  - **true**：有效行，当前行有数据
  - **false**：无效行，当前行没有数据

- **getXxx(...)**：获取数据，可以根据列的编号获取，也可以根据列名获取

结果解析步骤：

```java
while(resultSet.next()){
  int id = resultSet.getInt("id");
  // ...
}
```

::

### 预编译 SQL

```java
PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM users WHERE username = ? AND password = ?");
pstmt.setString(1, "bba");
pstmt.setString(2, "123456");
ResultSet resultSet = pstmt.executeQuery();
```

优势一：可以防止 SQL 注入，更安全

::tip

SQL 注入：通过控制输入来修改事先定义好的 SQL 语句，以达到执行代码对服务器进行攻击的方法

::

优势二：性能更高

## MyBatis(java 数据库驱动)

**MyBatis** 是一款优秀的**持久层**框架，用于简化 JDBC 的开发

```java
@Mapper
public interface UserMapper {
  // 查询全部
  @Select("select * from users")
  public List<User> findAll();
}
```

官网：[https://mybatis.org/](https://mybatis.org/)

### MyBatis 快速入门

**准备工作**：

1. 创建 SpringBoot 工程，引入 Mybatis 相关依赖（Developer Tools -> Lombok, SQL -> MyBatis Framework, SQL -> MySQL Driver）

2. 准备数据库表 users、实体类 User

3. 配置 Mybatis（在 application.properties 中数据库连接信息）

```properties
# main/resources/application.properties

spring.application.name=springboot-mybatis

# 配置数据库连接信息
spring.datasource.url=jdbc:mysql://localhost:3306/shopping
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=1234
```

**编写 Mybatis 程序**：编写 Mybatis 的持久层接口，定义 SQL（注解/XML）

```java
@Mapper // 应用程序在运行时，会自动的为该接口创建一个实现类对象（代理对象），并且会自动将该实现类对象存入 IOC 容器 - bean
public interface UserMapper {
    @Select("select * from users")
    public List<User> findAll();
}

```

**测试 Mybatis**：

```java
// test/java/com.xxx.xxx/SpringbootMybatisApplicationTests.java
@SpringBootTest // SpringBoot 单元测试的注解 - 当前测试类中的测试方法运行时，会启动 springboot 项目 - IOC 容器
class SpringbootMybatisApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testFindAll() {
        List<User> userList =  userMapper.findAll();
        userList.forEach(System.out::println);
    }
}
```

::tip

Mybatis 的持久层接口命名规范为 XxxMapper，也称为 Mapper 接口

::

::tip

日志输出：

默认情况下，在 Mybatis 中，SQL 语句执行时，我们并看不到 SQL 语句的执行日志。在 `application.properties` 加入如下配置，即可查看日志：

```properties
mybatis.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

::

### 数据库连接池

**数据库连接池**是一个容器，负责分配、管理数据库连接

它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个

释放空闲时间超过最大空闲时间的连接，来避免因为没有释放连接而引起的数据库连接遗漏

::tip

使用数据库连接池的优势：

- 资源重用

- 提升系统响应速度

- 避免数据库连接遗漏

::

官方提供了一个标准的数据库连接池接口 `DataSource`，用于获取连接，由第三方组织实现此接口

普通的 SpringBoot 项目，默认使用的是 Hikari 数据库连接池。如果想要切换为其他连接池（例如 Druid），可进行以下配置：

**引入依赖**：

```xml
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>druid-spring-boot-starter</artifactId>
  <version>1.2.19</version>
</dependency>
```

**配置连接池**：

```properties
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
```

### 增删改查

::detail

#title
具体示例：删除用户
#default
**需求**：根据 ID 删除用户信息

**SQL**：`delete from users where id = 5`

**Mapper 接口**：

```java
@Mapper
public interface UserMapper {
  // ...

  @Delete("delete from users where id = #{id}")
  public Integer deleteById(Integer id);

  // ...
}
```

**测试**：

```java
@SpringBootTest
class SpringbootMybatisApplicationTests {

    @Autowired
    private UserMapper userMapper;

    // ...

    @Test
    public void testDeleteById() {
        Integer i = userMapper.deleteById(1);
        System.out.println("执行完毕，影响的记录数："+ i);
    }

    // ...
}
```

DML 语句执行完毕的返回值，表示该 DML 语句执行完毕影响的行数

::

::detail

#title
具体示例：添加用户
#default
**需求**：添加一个用户

**SQL**：`insert into users (name,password,avator,role_id,balance) values("bba", '123456', 'https://666', 1, 114514)`

**Mapper 接口**：

```java
@Mapper
public interface UserMapper {
  // ...

    @Insert("insert into users (name,password,avatar,role_id,balance) values(#{name}, #{password}, #{avatar}, #{role_id},#{balance})")
    public void insertUser(User user);

  // ...
}
```

**测试**：

```java
@SpringBootTest
class SpringbootMybatisApplicationTests {

    @Autowired
    private UserMapper userMapper;

    // ...

    @Test
    public void testInsertUser() {
        User user = new User(null, "小王", "123456", "https://picsum.photos/200/300", 1, 0);
        userMapper.insertUser(user);
    }

    // ...
}
```

当参数过多时，可以将所有参数封装到一个对象中，`#{}` 中为响应的对象属性名

::

::detail

#title
具体示例：更新用户
#default
**需求**：根据 ID 更新用户信息

**SQL**：`update users set name = "小王", password = "123456", avator = "https://666", role_id = 1, balance = 114514 where id = 5`

**Mapper 接口**：

```java
@Mapper
public interface UserMapper {
    // ...

    @Update("update users set name = #{name}, password = #{password}, avatar = #{avatar}, role_id = #{role_id}, balance = #{balance} where id = #{id}")
    public void updateUser(User user);

    // ...
}
```

**测试**：

```java
@SpringBootTest
class SpringbootMybatisApplicationTests {

    @Autowired
    private UserMapper userMapper;

    // ...

    @Test
    public void testUpdateUser() {
        User user = new User(1, "小王", "123456", "https://picsum.photos/200/300", 1, 0);
        userMapper.updateUser(user);
    }

    // ...
}
```

::

::detail

#title
具体示例：查询用户
#default
**需求**：根据用户名和密码查询用户信息

**SQL**：`select * from users where name = "bba" and password = "123456"`

**Mapper 接口**：

```java
@Mapper
public interface UserMapper {
    // ...

    @Select("select * from users where name = #{name} and password = #{password}")
    public User findByNameAndPassword(@Param("name") String name, @Param("password") String password);

    // ...
}
```

**测试**：

```java
@SpringBootTest
class SpringbootMybatisApplicationTests {

    @Autowired
    private UserMapper userMapper;

    // ...

    @Test
    public void testFindByNameAndPassword() {
        User user = userMapper.findByNameAndPassword("小王", "123456");
        System.out.println(user);
    }

    // ...
}
```

如果接口方法形参中，需要传递多个参数，需要通过 `@Param` 注解为参数起名字

::

::tip

在基于官方骨架创建的 springboot 项目中，接口编译时会保留方法形参名，`@Param` 注解可以省略

```java
@Select("select * from users where name = #{name} and password = #{password}")
public User findByNameAndPassword(String name, String password);
```

::

::tip

Mybatis 中的 `#` 号和 `$` 号：

|   符号   |                               说明                               |            场景            |     优缺点     |
| :------: | :--------------------------------------------------------------: | :------------------------: | :------------: |
| `#{...}` | 占位符。执行时，会将 `#{...}` 替换为 `?`，生成预编译 SQL（推荐） |         参数值传递         |  安全、性能高  |
| `${...}` |      拼接符。直接将参数拼接在 SQL 语句中，存在 SQL 注入问题      | 表名、字段名动态设置时使用 | 不安全、性能低 |

```java
@Delete("delete from dept where id = #{id}")
```

```java
@Select("select  id,name,score from ${tableName} order by ${sortField}")
```

::

### XML 映射配置

在 Mybatis 中，既可以通过注解配置 SQL 语句，也可以通过 XML 配置文件配置 SQL 语句

**默认规则**：

1. XML 映射文件的名称与 Mapper 接口名称一致，并且将 XML 映射文件和 Mapper 接口放置在相同包下（同包同名）

2. XML 映射文件的 namespace 属性为 Mapper 接口全限定名（引用）一致

3. XML 映射文件中 sql 语句的 id 与 Mapper 接口中的方法名一致，并保持返回类型一致

::code-group

```xml [UserMapper.xml]
<-- src/main/resources/com/itheima/mapper/UserMapper.xml -->

<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.itheima.springbootmybatis.mapper.UserMapper">
    <select id="findAll" resultType="com.itheima.springbootmybatis.pojo.User">
        select * from users
    </select>
</mapper>
```

```java [UserMapper.java]
// main/java/com/itheima/springbootmybatis/mapper/UserMapper.java

@Mapper
public interface UserMapper {
    // ...

    public List<User> findAll();

    // ...
}
```

::

::tip

**resultType**：查询返回的单条记录所封装的类型

::

::tip

注解开发与 XML 开发：

使用 Mybatis 的注解，主要是来完成一些简单的增删改查功能

如果需要实现复杂的 SQL 功能，建议使用 XML 来配置映射语句

::

如果想要手动指定 XML 映射配置文件的位置，可在 `application.properties` 中添加如下配置:

```properties
mybatis.mapper-locations=classpath:mapper/*.xml
```

此时便可将 XML 映射配置文件放置在 `src/main/resources/mapper` 目录下

### yml 配置文件

SpringBoot 项目提供了多种属性配置方式（properties、yaml、yml）

::code-group

```properties [application.properties]
spring.datasource.url=jdbc:mysql://localhost:3306/shopping
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=1234
```

```yml [application.yaml/application.yml]
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:3306/shopping
    username: root
    password: 1234
```

::

**格式**：

- 数值前边必须有空格，作为分隔符

- 使用缩进表示层级关系，缩进时，不允许使用 Tab 键，只能用空格（idea 中会自动将 Tab 转换为空格）

- 缩进的空格数目不重要，只要相同层级的元素的左侧对齐即可

- `#` 表示注释，从这个字符一直到行尾，都会被解析器忽略

定义对象/Map 集合：

```yml
user:
  name: 小王
  age: 18
  password: 123456
```

定义数组/list/Set 集合：

```yml
hobby:
  - java
  - game
  - sport
```

将 `application.properties` 的配置迁移到 `application.yml` 中：

```yml
spring:
  application:
    name: springboot-mybatis
  datasource:
    url: jdbc:mysql://localhost:3306/shopping
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 123456
mybatis:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  mappper-locations: classpath:mapper/*.xml
```

::warning

在 yml 格式的配置文件中，如果配置项的值是以 0 开头的，值需要使用 `''` 引起来，因为以 0 开头在 yml 中表示 8 进制的数据

::

::tip

yml 配置文件的特点及格式：

- 简洁、以数据为中心

::

### 数据封装

实体类属性名和数据库表查询返回的字段名一致时，mybatis 会自动封装

如果实体类属性名和数据库表查询返回的字段名不一致时，则不能自动封装

**手动结果映射**：通过 `@Results` 及 `@Result` 注解来进行手动结果映射：

```java
@Results({
  @Result(column = "create_time", property = "createTime"),
  @Result(column = "update_time", property = "updateTime")
})
@Select("select id, name,create_time, update_time from dept order by update_time desc")
public User findAll();
```

**起别名**：在 SQL 语句中，对不一样的列名起别名，别名和实体类属性名一样：

```java
@Select("select id, name, create_time createTime, update_time updateTime from dept order by update_time desc")
public User findAll();
```

**开启驼峰命名**：如果字段名与属性名符合驼峰命名规则，mybatis 会自动通过驼峰命名规则映射：

```yml
mybatis:
  configuration:
    map-underscore-to-camel-case: true
```

## MyBatis-Plus(java 数据库驱动)

MyBatisPlus 官方提供了 starter，其中集成了 Mybatis 和 MybatisPlus 的所有功能，并且实现了自动装配效果

因此我们可以用 MybatisPlus 的 starter 代替 Mybatis 的 starter:

```xml
<dependency>
  <groupId>com.baomidou</groupId>
  <artifactId>mybatis-plus-boot-starter</artifactId>
  <version>3.5.17</version>
</dependency>
```

然后需要将我们自定义的 Mapper 继承 MybatisPlus 提供的 BaseMapper 接口:

```java
public interface UserMapper extends BaseMapper<User> {

}
```

### 常见注解

MyBatisPlus 通过扫描实体类，并基于反射获取实体类信息作为数据库表信息

::tip

MyBatisPlus 扫描规则

- 类名驼峰转下划线作为表名

- 名为 id 的字段作为主键

- 变量名驼峰转下划线作为表的字段名

::

当命名不符合约定时，需要手动使用注解来指定

- `@TableName`: 用来指定表名

- `@TableId`: 用来指定表中的主键字段信息

- `@TableField`: 用来指定表中的普通字段信息

```java
// 数据库配置
// 名称         数据类型  注释      默认
// id           BiGINT   用户id    AUTO_INCREMENT
// username     VARCHAR  用户名    无默认值
// is_married   BIT      密码      0
// order        TINYINT  序号      NULL

@TableName("tb_user")
public class User {
  @TableId(value="id", type=IdType.AUTO)s
  private Long id
  @TableField("username")
  private String name;
  @TableField("is_married")
  private Boolean isMarried;
  @TableField("`order`")
  private Integer order;
  @TableField(exist = false)
  private String address;
}
```

::tip

使用 `@TableField` 的常见场景

- 成员变量名与数据库字段名不一致

- 成员变量名以 is 开头，且是 boolean 类型

- 成员变量名与数据库关键字冲突

- 成员变量不是数据库字段

::

### 常见配置

MyBatisPlus 的配置项继承了 MyBatis 原生配置和一些自己特有的配置

```yml
mybatis-plus:
  type-aliases-package: com.xxx.xxx.xxx # 别名扫描包
  mapper-locations: "classpath*:/mapper/**/*.xml" # Mapper.xml 文件地址，默认值
  configuration:
    map-underscore-to-camel-case: true # 是否开启下划线和驼峰的映射
    cache-enable: false # 是否开启二级缓存
  global-config:
    db-config:
      id-type: assign_id # id 为雪花算法生成
      update-strategy: not_null # 更新策略: 只更新非空字段
```

### 条件构造器

MyBatisPlus 支持各种复杂的 where 条件，可以满足日常开发的所有需求

QueryWrapper 和 LambdaQueryWrapper 通常用来构建 select、delete、update 的 where 条件部分

UpdateWrapper 和 LambdaUpdateWrapper 通常只有在 set 语句比较特殊才使用

尽量使用 LambdaQueryWrapper 和 LambdaUpdateWrapper，避免硬编码

::code-group

```java [案例一]
// 查询出名字中带 o 的，存款大于等于 1000 元的人的 id、username、info、balance 字段
// SQL: SELECT id,username,info,balance FROM user WHERE username LIKE "%o%" AND balance >= 1000

@Test
void testQueryWrapper() {
  QueryWrapper<User> wrapper = new QueryWrapper<>() // 构建查询条件
    .select("id", "username", "info", "balance")
    .like("username", "0")
    .ge("balance", 1000);
  List<User> users = userMapper.selectList(wrapper); // 查询
}

@Test
void testLambdaQueryWrapper() {
  LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>() // 构建查询条件
    .select(User::getId, User::getUsername, User::getInfo, User::getBalance)
    .like(User::getUsername, "0")
    .ge(User::getBalance, 1000);
  List<User> users = userMapper.selectList(wrapper); // 查询
}
```

```java [案例二]
// 更新用户名为 jack 的用户的余额为 2000
// SQL: UPDATE user SET balance = 2000 WHERE username = "jack"

@Test
void testUpdateByQueryWrapper() {
  // 要更新的数据
  User user = new User();
  user.setBalance(2000);

  // 更新的条件
  QueryWrapper<User> wrapper = new QueryWrapper<>().eq("username", "jack");

  // 执行更新
  userMapper.update(user, wrapper);
}
```

```java [案例三]
// 更新 id 为 1,2,3 的用户的余额，扣 200
// SQL: UPDATE user SET balance = balance - 200 WHERE id in (1, 2, 4)

@Test
void testUpdateByQueryWrapper() {
  List<Long> ids = List.of(1L, 2L, 4L);
  new UpdateWrapper<User> wrapper = new UpdateWrapper<>()
    .setSql("balance = balance - 200");
  userMapper.update(null, wrapper);
}
```

::

### 自定义 SQL

可以利用 MyBatisPlus 的 Wrapper 来构建复杂的 where 条件，然后自己定义 SQL 语句中剩下的部分

1. 基于 Wrapper 构建 where 条件

```java
// 将 id 在指定范围的用户(例如 1、2、4)的余额扣减指定值

List<Long> ids = List.of(1L, 2L, 4L); // 更新条件

LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<User>().in(User::getId, ids); // 定义条件

userMapper.updateBalanceByIds(wrapper, amount); // 调用自定义 SQL 方法
```

2. 在 mapper 方法参数中用 Param 注解声明 wrapper 变量名称，必须是 ew

```java
void updateBalanceByIds(@Param("ew") LambdaQueryWrapper<User> wrapper, @Param("amount") int amount);
```

3. 自定义 SQL，并使用 Wrapper 条件

```xml
<update id="updateBalanceByIds">
  UPDATE tb_user SET balance = balance - #{amount} ${ew.customSqlSegment}
</update>
```

### Service 接口

1. 自定义 Service 接口继承 IService 接口

2. 自定义 Service 实现类，实现自定义接口并继承 ServiceImpl 类

::code-group

```java [UserService.java]
public interface UserService extends IService<User> {

}
```

```java [UserServiceImpl.java]
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
```

```java [UserServiceTest.java]
@Test
void testSaveUser() {
  User user = new User();
  user.setUsername("LiLei");
  user.setPassword("123");

  userService.save(user);
}

@Test
void testQuery() {
  List<User> users = userService.listByIds(List.of(1L, 2L, 4L));
  users.forEach(System.out::println);
}
```

::

::detail

#title
基于 Restful 风格实现接口
#default

|         接口         | 请求方式 |            请求路径             |                  请求参数                  |    返回值    |
| :------------------: | :------: | :-----------------------------: | :----------------------------------------: | :----------: |
|       新增用户       |   POST   |            `/users`             |                用户表单实体                |      无      |
|       删除用户       |  DELETE  |          `/users/{id}`          |                  用户 id                   |      无      |
|   根据 id 查询用户   |   GET    |          `/users/{id}`          |                  用户 id                   |   用户 VO    |
|   根据 id 批量查询   |   GET    |            `/users`             |                用户 id 集合                | 用户 VO 集合 |
|   根据 id 扣减余额   |   PUT    | `/users/{id}/deduction/{money}` |             用户 id、扣减金额              |      无      |
| 根据复杂条件查询用户 |   GET    |          `/users/list`          | 用户名关键字、用户状态、最小余额、最大余额 | 用户 VO 集合 |

::code-group

```java [UserController.java]
@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @PostMapping
  public void saveUser(@RequestBody UserFormDTO userDTO) {
    User user = BeanUtil.copyProperties(userDTO, User.class) // 把 DTO 拷贝到 PO

    userService.save(user);
  }

  @DeleteMapping("/{id}")
  public void deleteUserById(@PathVariable("id") Long id) {
    userService.removeById(id);
  }

  @GetMapping("/{id}")
  public UserVO queryUserById(@PathVariable("id") Long id) {
    User user = userService.getById(id); // 查询用户
    return BeanUtil.copyProperties(user, UserVO.class) // 把 PO 拷贝到 VO
  }

  @GetMapping
  public List<UserVO> queryUserById(@RequestParams("ids") List<Long> ids) {
    List<User> users = userService.listByIds(ids); // 查询用户
    return BeanUtil.copyToLists(users, UserVO.class); // 把 PO 拷贝到 VO
  }

  @PutMapping("/{id}/deduction/{money}")
  public void deductMoneyNyId(@PathVariable("id") Long id, @PathVariable("money") Integer money) {
    userService.deductBalance(id, money);
  }

  @GetMapping("/list")
  public List<UserVO> queryUsers(UserQuery query) {
    // UserQuery 包含: String name、Integer status、Integer minBalance、Integer maxBalance
    List<User> users = userService.queryUsers(query.getName(), query.getStatus(), query.getMinBalance(), query.getMaxBalance());

    return BeanUtil.copyToList(users, UserVO.class);
  }
}
```

```java [UserServiceImpl.java]
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

  @Override
  @Transactional
  public void deductBalance(Lont id, Integer money) {
    User user = getById(id); // 查询用户

    // 校验用户状态
    if( user == null || user.getStatus() == 2) {
      throw new RuntimeException("用户状态异常");
    }

    // 校验余额是否充足
    if(user.getBalance() < money) {
      throw new RuntimeException("用户余额不足");
    }

    // 扣减余额
    int remainBalance = user.getBalance() - money;
    baseMapper.deductBalance(id, money);
    lambdaUpdate()
      .set(User::getBalance, remainBalance)
      .set(remainBalance == 0, User::getStatus, 2)
      .eq(User::getId, id)
      .eq(User::getBalance, user.getBalance()) // 乐观锁，高并发处理
      .update();
  }

  @Override
  public List<User> queryUsers(String name, Integer status, Integer minBalance, Integer maxBalance) {
    return lambdaQuery()
      .like(name != null, User::getUsername, name)
      .eq(status != null, User::getStatus, status)
      .ge(minBalance != null, User::getMinBalance, minBalance)
      .le(maxBalance != null, User::getMaxBalance, maxBalance);
      .list();
  }
}
```

```java [UserMapper.java]
public interface UserMapper extends BaseMapper<User> {
  @Update("UPDATE tb_user SET balance = balance - #{money}")
  void deductBalance(@Param("id") Long id, @Param("money") Integer money);
}
```

::

::

### 静态工具

一旦出现 Service 相互调用时，推荐使用 Db 的静态工具来调用

```java
@Override
public UserVO queryUserAndAddressById(Long id) {
  User user = getById(id);
  if(user == null || user.getStatus() == 2) {
    throw new RuntimeException("用户状态异常");
  }

  // 查询地址
  List<Address> assresses = Db.lambdaQuery(Address.class).eq(Address::getUserId, id);

  // 封装 VO
  UserVO userVO = BeanUtil.copyProperties(user, UserVO.class);
  if(CollUtil.isNotEmpty(address)) {
    userVO.setAddresses(BeanUtil.copyToList(addresses, AddressVO.class));
  }
  return userVO;
}
```

### 逻辑删除

逻辑删除就是基于代码逻辑模拟删除效果，但并不会真正删除数据。思路如下:

- 在表中添加一个字段标记数据是否被删除

- 当删除数据时把标记置为 1

- 查询时只查询标记为 0 的数据

MyBatisPlus 提供了逻辑删除功能，无需改变方法调用的方式，而是在底层帮我们自动修改 CRUD 的语句。我们要做的就是在 application.yaml 文件中配置逻辑删除的字段名称和值即可

```yml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: flag # 全局逻辑删除的实体字段名，字段类型可以是 boolean、integer
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

::warning

逻辑删除的问题

- 会导致数据库垃圾数据越来越多，影响查询效率

- SQL 中全都需要对逻辑删除字段做判断，影响查询效率

::

### 枚举处理器

对于枚举类型的数据字段，可以使用枚举处理器进行管理

::code-group

```java [User.java]

public class User {
  //...

  // 使用状态(1正常 2冻结)
  private UserStatue status;
}
```

```java [UserStatus.java]
@Getter
public enum UserStatus {
  NORMAL(1, "正常"),
  FROZEN(2, "冻结")
  ;

  @EnumValue
  private finnal int value;
  private final STring desc;

  UserStatus(int value, String desc) {
    this.value = value;
    this.desc = desc;
  }
}
```

```yml [application.yml]
mybatis-plus:
  configuration:
    default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler
```

```java [UserTest.java]
//...

if(user == null || user.getStatus() == UserStatus.FROZEN) {
  throw new RuntimeException("用户状态异常");
}
```

::

### JSON 处理器

当数据库里存储 JSON 字符串，后端想要操作 JSON 属性时，可以使用 JSON 处理器

::code-group

```java [User.java]
@Data
@TableName(value="user", autoResultMap = true)
public class User {
  private Long id;

  private String username;

  @TableFIeld(typeHandler = JacksonTypeHandler.class)
  private UserInfo info; // JSON 数据
}
```

::

### 插件功能

MyBatisPlus 提供的内置拦截器有下面这些:

|              拦截器              |                 描述                 |
| :------------------------------: | :----------------------------------: |
|    TenantLineInnerInterceptor    |              多租户插件              |
| DynamicTableNameInnerInterceptor |             动态表名插件             |
|    PaginationInnerInterceptor    |               分页插件               |
| OptimisticLockerInnerInterceptor |              乐观锁插件              |
|    IllegalSQLInnerInterceptor    | SQL 性能规范插件，检测并拦截垃圾 SQL |
|   BlockAttackInnerInterceptor    |       防止全表更新和删除的插件       |

### 分页插件

首先，要在配置类中注册 MyBatisPlus 的核心插件，同时添加分页插件

```java
@Configuration
public class MybatisConfig {

  @Bean
  public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor - new MybatisPlusInterceptor(); // 初始化核心插件

    // 添加分页插件
    PaginationInnerInterceptor pageInterceptor = new PaginationInnerInterceptor(DbType.MYSQL);
    pageInterceptor.setMaxLimit(1000L); // 设置分页上限
    interceptor.addInnerInterceptor(pageInterceptor);

    return interceptor;
  }
}
```

接着，就可以使用分页的 API 了

```java
@Test
void testPageQuery() {
  int pageNo = 1, pageSize = 5; // 查询

  Page<User> page = Page.of(pageNo, pageSize); // 分页参数
  page.addOrder(new OrderItem("balance", false)); // 排序参数，通过 OrderItem 来指定
  Page<User> p = userService.page(page); // 分页查询

  System.out.println("total = " + p.getTotal()); // 总条数
  System.out.println("pages = " + p.getPages()); // 总页数

  List<User> records = p.getRecords(); // 分页数据
  records.forEach(System.out::println);
}
```

::detail

#title
基于 Restful 风格实现分页查询
#default

|   参数   |                                         说明                                         |
| :------: | :----------------------------------------------------------------------------------: |
| 请求方式 |                                         GET                                          |
| 请求路径 |                                    `/users/page`                                     |
| 请求参数 | `{pageNo: 1, pageSize: 5, sortBy: "balance", isAsc: false, name: "jack", status: 1}` |
|  返回值  |                   `{total: 1005, pages: 201, list: Array<UserVO>}`                   |
| 特殊说明 |      如果排序字段为空，默认按照更新时间排序；排序字段不为空，则按照排序字段排序      |

::code-group

```java [PageQuery.java]
@Data
public class PageQuery {
  private Integer pageNo;
  private Integer pageSize;
  private Integer sortBy;
  private Integer isAsc;
}
```

```java [UserQuery.java]
@Data
public class UserQuery extends PageQuery {
  private String name;
  private Integer status;
  private Integer minBalance;
  private Integer maxBalance;
}
```

```java [PageDTO.java]
@Data
public class PageDTO<T> {
  private Long total;
  private Long pages;
  private List<T> list;
}
```

```java [UserController.java]
@GetMapping("/page")
public PageDTO<UserVO> queryUsersPage(UserQuery query) {
  return userService.queryUsersPage(query)
}
```

```java [UserService.java]
public interface UserService extends IService<User> {
  PageDTO<UserVO> queryUsersPage(UserQuery query);
}
```

```java [UserServiceImpl.java]
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
  @Override
  public PageDTO<UserVO> queryUsersPage(UserQuery query) {
    String name = query.getName();
    Integer status = query.getStatus();

    // 构建分页条件
    Page<UserVO> page = Page.of(query.getPageNo(), query.getPageSize());
    // 构建排序条件
    if(query.getSortBy() != null) {
      page.addOrder(new OrderItem(query.getSortBy(), query.getIsAsc()));
    } else {
      page.addOrder(new OrderItem("update_time", false));
    }


    // 分页查询
    Page<User> p =lambdaQuery()
      .like(name != null, User::getUsername, name)
      .eq(status != null. User::getStatus, status)
      .page(page);

    // 封装 VO 结果
    PageDTO<UserVO> dto = new PageDTO<>();
    dto.setTotal(p.getTotal()); // 总条数
    dto.setPages(p.getPages()); // 总页数
    List<User> records = p.getRecords(); // 当前页数据
    if(CollUtil.isEmpty(records)) {
      dto.setList(Collections.emptyList());
      return dto;
    }
    dto.setList(BeanUtil.copyToList(records, UserVO.class)); // 拷贝

    // 返回
    return dto;
  }
}
```

::

::

### 通用分页实体

对于复杂业务逻辑，可以封装为通用分页实体

::code-group

```java [PageQuery.java]
@Data
public class PageQuery {
  private Integer pageNo = 1;
  private Integer pageSize = 5;
  private Integer sortBy;
  private Integer isAsc = true;

  public <T> Page<T> toMpPage(OrderItem ... items) {
    // 构建分页条件
    Page<T> page = Page.of(pageNo, pageSize);
    // 构建排序条件
    if(sortBy != null) {
      page.addOrder(new OrderItem(sortBy, isAsc));
    } else if(items != null) {
      // 为空，默认排序
      page.addOrder(items);
    }

    return page;
  }

  // 重载方法
  public <T> Page<T> toMpPage(String defaultSortBy, Boolean defaultAsc) {
    return toMpPage(new OrderItem(defaultSortBy, defaultAsc));
  }


  // 定义其它情况的方法
  public <T> Page<T> toMpPageDefaultSortByCreateTime() {
    return toMpPage(new OrderItem("create_time", false));
  }

  public <T> Page<T> toMpPageDefaultSortByUpdateTime() {
    return toMpPage(new OrderItem("update_time", false));
  }
}
```

```java [PageDTO.java]
@Data
public class PageDTO<T> {
  private Long total;
  private Long pages;
  private List<T> list;

  public static <PO, VO> PageDTO<VO> of(Page<PO> p, Class<VO>, clazz) {
    PageDTO<VO> dto = new PageDTO<>();
    dto.setTotal(p.getTotal()); // 总条数
    dto.setPages(p.getPages()); // 总页数
    List<PO> records = p.getRecords(); // 当前页数据
    if(CollUtil.isEmpty(records)) {
      dto.setList(Collections.emptyList());
      return dto;
    }
    dto.setList(BeanUtil.copyToList(records, clazz)); // 拷贝

    return dto; // 返回
  }

  // 重载，用于自定义拷贝时使用
  public static <PO, VO> PageDTO<VO> of(Page<PO> p, Function<PO, VO> convertor) {
    PageDTO<VO> dto = new PageDTO<>();
    dto.setTotal(p.getTotal()); // 总条数
    dto.setPages(p.getPages()); // 总页数
    List<PO> records = p.getRecords(); // 当前页数据
    if(CollUtil.isEmpty(records)) {
      dto.setList(Collections.emptyList());
      return dto;
    }

    dto.setList(records.stream().map(convertor).collect(Collectors.toList())); // 拷贝

    return dto; // 返回
  }
}
```

```java [UserServiceImpl.java]
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
  @Override
  public PageDTO<UserVO> queryUsersPage(UserQuery query) {
    String name = query.getName();
    Integer status = query.getStatus();

    // 构建分页条件
    Page<User> page = query.toMpPageDefaultSortByUpdateTime();

    // 分页查询
    Page<User> p =lambdaQuery()
      .like(name != null, User::getUsername, name)
      .eq(status != null. User::getStatus, status)
      .page(page);

    // 封装 VO 结果
    return PageDTO.of(p, UserVO.class);

    // 自定义拷贝逻辑
    return PageDTO.of(p, user -> {
      UserVO vo = BeanUtil.copyProperties(user, UserVO.class); // 拷贝基础属性

      // 处理特殊逻辑
      vo.setUsername(vo.getUsername().substring(0, vo.getUsername().length() - 2) + "**");
      return vo;
    })
  }
}
```

::

## mysql 模块(javascript 数据库驱动)

mysql 模块是托管于 npm 上的第三方模块。它提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。

### 安装 mysql 模块

**在项目中操作数据库的步骤**：

① 安装操作 MySQL 数据库的第三方模块 mysql

② 通过 mysql 模块连接到 MySQL数据库

③ 通过 mysql 模块执行 SQL 语句

想要在项目中使用它，需要先运行如下命令，将 mysql 安装为项目的依赖包：

```bash
npm install mysql2
```

### 配置 mysql 模块

在使用 mysql 模块操作 MySQL 数据库之前，必须先对 mysql 模块进行必要的配置，主要的配置步骤如下：

```javascript
import mysql from "mysql2";

// 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
	host: "127.0.0.1", // 数据库的 IP 地址
	user: "root", // 登录数据库的账号
	password: 密码, // 登录数据库的密码
	database: "my_db_01", // 指定要操作哪个数据库
});
```

### 测试 mysql 模块能否正常工作

调用 `dp.query()` 函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果。

只要能打印出 `[ { '1': 1 } ]` 的结果，就证明数据库连接正常。

```javascript
// 检测 mysql 模块能否正常工作
db.query("SELECT 1", (err, result) => {
	if (err) return console.log(err.message);
	console.log(result);
});
```

### 查询数据

::detail

#title
具体示例
#default
查询 users 表中所有的数据：

```javascript
// 查询 users 表中所有的用户数据
db.query("SELECT * FROM users", (err, result) => {
	// 查询失败
	if (err) return console.log(err.message);
	// 查询成功
	console.log(result);
});
```

::

::warning

如果执行的是 SELECT 查询语句，则执行的结果是数组

::

### 插入数据

::detail

#title
具体示例
#default
向 users 表中新增数据，其中 `username` 为 Spider-Man，`password` 为 pcc321：

```javascript
// 要插入到 users 表中的数据对象
const user = { username: "Spider-Man", password: "pcc321" };
// 待执行的 SQL 语句，其中英文的 ? 表示占位符
const sqlStr = "INSERT INTO users (username, password) VALUES (?, ?)";
// 使用数组的形式，依次为 ? 占位符指定具体的值
db.query(sqlStr, [user.username, user.password], (err, result) => {
	if (err) return console.log(err.message);
	if (result.affectedRows === 1) {
		console.log("插入数据成功！");
	}
});
```

::

::tip

插入数据的便捷方式：

向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速插入数据：

```javascript
const user = { username: "Spider-Man2", password: "pcc4321" };
const sqlStr = "INSERT INTO users SET ?";
db.query(sqlStr, user, (err, result) => {
	if (err) return console.log(err.message);
	if (result.affectedRows === 1) {
		console.log("插入数据成功！");
	}
});
```

::

::warning

如果执行的是 INSERT 插入语句，则执行的结果是对象

::

### 更新数据

::detail

#title
具体示例
#default
可以通过如下方式，更新表中的数据：

```javascript
// 要更新的数据对象
const user = { id: 7, username: "aaa", password: "000" };
// 待执行的 SQL 语句
const sqlStr = "UPDATE users SET username=?, password=? WHERE id=?";
// 调用 db.query() 执行 SQL 语句的同时，使用数组依次为占位符指定具体的值
db.query(sqlStr, [user.username, user.password, user.id], (err, result) => {
	if (err) return console.log(err.message);
	if (result.affectedRows === 1) {
		console.log("更新数据成功！");
	}
});
```

::

::tip

更新数据的便捷方式：

更新表数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速更新表数据：

```javascript
const user = { id: 7, username: "aaaa", password: "0000" };
const sqlStr = "UPDATE users SET ? WHERE id=?";
db.query(sqlStr, [user, user.id], (err, result) => {
	if (err) return console.log(err.message);
	if (result.affectedRows === 1) {
		console.log("更新数据成功！");
	}
});
```

::

::warning

如果执行的是 UPDATE 更新语句，则执行的结果是对象

::

### 删除数据

::detail

#title
具体示例
#default
在删除数据时，推荐根据 `id` 这样的唯一表示，来删除对应的数据：

```javascript
// 要执行的 SQL 语句
const sqlStr = "DELETE FROM users WHERE id=?";
// 调用 db.query() 执行 SQL 语句的同时，为 ? 占位符指定具体的值
db.query(sqlStr, 7, (err, result) => {
	if (err) return console.log(err.message);
	if (result.affectedRows === 1) {
		console.log("删除数据成功！");
	}
});
```

::

::warning

- 如果 SQL 语句中有多个占位符，则必须使用数组为每个占位符指定具体的值

- 如果 SQl 语句中只有一个占位符，则可以省略数组

::

::warning

如果执行的是 DELETE 删除语句，则执行的结果是对象

::

::tip

标记删除：

使用 DELETE 语句，会真正的把数据从表中删除掉。为了保险期间，推荐使用**标记删除**的形式，来模拟删除的动作。

所谓标记删除，就是在表中设置类似于 `status` 这样的状态字段，来标记当前这条数据是否被删除。

当用户执行了删除的动作时，我们并没有执行 DELETE 语句把数据删除掉，而是执行了 UPDATE 语句，将这条数据对应的 `status` 字段标记为删除即可。

```javascript
// 标记删除：使用 UPDATE 语句代替 DELETE 语句；只更新数据的状态，并没有真正删除
db.query("UPDATE users SET status=1 WHERE id=?", 6, (err, result) => {
	if (err) return console.log(err.message);
	if (result.affectedRows === 1) {
		console.log("删除数据成功！");
	}
});
```

::

## Jedis(java 数据库驱动)

Jedis 以 Redis 命令作为方法名称，学习成本第，简单使用，用于操作 Redis，但是 Jedis 示例是线程不安全的，多线程环境下需要基于连接池来使用

官网地址: https://github.com/redis/jedis

### 基本用法

1. 引入依赖

```xml
<dependency>
  <groupId>redis.clients</groupId>
  <artifactId>jedis</artifactId>
  <version>8.0.1</version>
</dependency>
```

2. 建立连接

```java
private Jedis jedis

@BeforeEach
void setUp() {
  // 建立连接
  jedis = new Jedis("xxx.xxx.xxx.xxx", 6379)

  // 设置密码
  jedis.auth("xxxxxx")

  // 选择库
  jedis.select(0)
}
```

3. 测试 string

```java
@Test
void testString() {
  // 插入数据
  String result = jedis.set("name", "张三");
  // 获取数据
  String name = jedis.get("name");
}
```

4. 释放资源

```java
@AfterEach
void tearDown() {
  // 释放资源
  if(jedis != null) {
    jedis.close();
  }
}
```

### Jedis 连接池

Jedis 本身是线程不安全的，并且频繁的创建和销毁连接会有新能损耗，因此我们推荐使用 Jedis 连接池代替 Jedis 的直连方式

::code-group

```java [JedisConnectionFactory.java]
public class JedisConnectionFactory {
  private static final JedisPool jedisPool;

  static {
    JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
    // 最大连接数量
    jedisPoolConfig.setMaxTotal(8);
    // 最大空闲连接数量
    jedisPoolConfig.setMaxIdle(8);
    // 最小空闲连接数量
    jedisPoolConfig.setMaxTotal(8);
    // 设置最长等待时间(ms)
    jedisPoolConfig.setMaxWait(Duration.ofMillis(1000));
    // 添加配置、IP 地址、端口号、超时时间、密码
    jedisPool = new JedisPool(jedisPoolConfig, "xxx.xxx.xxx.xxx", 6379, 1000, "password")
  }

  // 获取 Jedis 对象
  public static Jedis getJedis() {
    return jedisPool.getResource();
  }
}
```

```java [Test.java]
@BeforeEach
void setUp() {
  jedis = JedisConnectionFactory.getJedis();
}

@Test
void testString() {
  // 插入数据
  String result = jedis.set("name", "张三");
  // 获取数据
  String name = jedis.get("name");
}
```

::

## Spring Data Redis(java 数据库驱动)

Spring Data Redis 是 Spring 的一部分，对 Redis 底层开发包进行了高度封装。在 Spring 项目中，可以使用 Spring Data Redis 来简化操作

- 提供了对不同 Redis 客户端的整合

- 提供了对 RedisTemplate 统一 API 来操作 Redis

- 支持 Redis 的发布订阅模型

- 支持 Redis 哨兵和 Redis 集群

- 支持基于 Lettuce 的响应式编程

- 支持基于 JDK、JSON、字符串、Spring 对象的数据序列化及反序列化

- 支持基于 Redis 的 JDKCollection 实现

官网地址: https://spring.io/projects/spring-data-redis

::detail

#title
SpringData
#default
SpringData 是 Spring 中数据操作的模块，包含对各种数据库的集成

其中对 Redis 的集成模块就叫做 Spring Data Redis

::

::detail

#title
Lettuce
#default

Lettuce 是基于 Netty 实现的，支持同步、异步和响应式编程方式，并且是线程安全的。支持 Redis 的哨兵模式、集群模式和普通模式

Spring Data Redis 底层兼容 Jedis 和 Lettuce

::

### 使用方式

1. 导入依赖

```xml
<!-- Redis 依赖 -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- 连接池依赖 -->
<dependency>
  <groupId>org.apache.commons</groupId>
  <artifactId>commons-pool2</artifactId>
</dependency>
```

2. 配置数据源

```yml
spring:
  redis:
    host: localhost
    port: 6379
    password: 123456
    lettuce:
      pool:
        max-active: 8 # 最大连接
        min-idle: 8 # 最大空闲连接
        min-idle: 0 # 最小空闲连接
        max-wait: 100ms # 连接等待时间
```

3. 编写配置类，创建 RedisTemplate 对象

```java
@Configuration
public class RedisConfiguration{
  @Bean
  public RedisTemplate redisTemplate(RedisConnectionFactory redisConnectionFactory){
    RedisTemplate redisTemplate = new RedisTemplate();
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    redisTemplate.setConnectionFactory(redisConnectionFactory);
    return redisTemplate;
  }
}
```

4. 通过 RedisTemplate 对象操作 Redis

```java
@SpringBootTest
@Slf4j
public class RedisConfigurationTest {

    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    public void testRedisTemplate() {
        log.info("Redis 单元测试: {}", redisTemplate);
    }

    @Test
    public void testString(){
        ValueOperations valueOperations = redisTemplate.opsForValue();

        valueOperations.set("city", "北京");
        log.info("SET key value: city, 北京");

        String city = (String)valueOperations.get("city");
        log.info("GET key: {}", city);

        valueOperations.set("code", "1234",3, TimeUnit.MINUTES);
        log.info("SETEX key seconds value: code, 1234, 3, TimeUnit.MINUTES");

        valueOperations.setIfAbsent("lock", "1");
        log.info("SETNX key value: lock, 1");
        String lock = (String)valueOperations.get("lock");
        log.info("GET key: {}", lock);

        valueOperations.setIfAbsent("lock", "2");
        log.info("SETNX key value: lock, 2");
        lock = (String)valueOperations.get("lock");
        log.info("GET key: {}", lock);
    }

    @Test
    public void testHash(){
        HashOperations hashOperations = redisTemplate.opsForHash();

        hashOperations.put("100", "name", "tom");
        log.info("HSET key field value: 100, name, tom");
        hashOperations.put("100", "age", "20");
        log.info("HSET key field value: 100, age, 20");

        String name = (String) hashOperations.get("100","name");
        log.info("HGET key field: {}", name);

        Set<String> keys = hashOperations.keys("100");
        log.info("HKEYS key field: {}", keys);

        List<String> values = hashOperations.values("100");
        log.info("HVALS key: {}", values);

        hashOperations.delete("100", "age");
        log.info("HDEL key field: 100, age");
    }
}

```

### 序列化

RedisTemplate 可以接收任意 Object 作为值写入 Redis，只不过写入前会把 Object 序列化为字节形式，默认是采用 JDK 序列化

但是会具有可读性差，内存占用较大的缺点

```java
@Configuration
public class RedisConfiguration{
  @Bean
  public RedisTemplate redisTemplate(RedisConnectionFactory redisConnectionFactory){
    // 创建 Template
    RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();

    // 设置连接工厂
    redisTemplate.setConnectionFactory(redisConnectionFactory);

    // 设置序列化工具
    GenericJackson2JsonRedisSerializer jsonRedisSerializer = new GenericJackson2JsonRedisSerializer()
    // key 和 hashKey 采用 string 序列化
    redisTemplate.setKeySerializer(RedisSerializer.string());
    redisTemplate.setHashKeySerializer(RedisSerializer.string());
    // value 和 hashValue 采用 JSON 序列化
    redisTemplate.setValueSerializer(jsonRedisSerializer);
    redisTemplate.setHashValueSerializer(jsonRedisSerializer);

    return redisTemplate;
  }
}
```

### StringRedisTemplate

为了在反序列化时知道对象的类型，JSON 序列化器会将类的 class 类型写入 json 结果中，存入 Redis，会带来额外的内存开销

为了节省内存空间，我们并不会使用 JSON 序列化器来处理 value，而是统一使用 String 序列化器，要求只能存储 String 类型的 key 和 value。当需要存储 java 对象时，手动完成对象的序列化和反序列化

Spring 默认提供了一个 StringRedisTemplate 类，他的 key 和 value 的序列化方式默认就是 String 方式，省去了我们自定义 RedisTemplate 的过程

```java
@Autowired
private String RedisTemplate stringRedisTemplate;
// JSON 工具
private static final ObjectMapper mapper = new ObjectMapper();

@Test
void testStringTemplate() throws JsonProcessingException {
  // 准备对象
  User user = new User("张三", 18);

  // 手动序列化
  String json = mapper.writeValueAsString(user);

  // 写入一条数据到 Redis
  stringRedisTemplate.opsForValue().set("user:200", json);

  // 读取数据
  String val = stringRedisTemplate.opsForValue().get(":user:200")

  // 反序列化
  User user1 = mapper.readValue(val, User.class);
  System.out.println("user1 = " + user1)
}
```

### RedisTemplate 工具类

|              API              |   返回值类型    |          说明           |
| :---------------------------: | :-------------: | :---------------------: |
| `RedisTemplate.opsForValue()` | ValueOperations |  操作 String 类型数据   |
| `RedisTemplate.opsForHash()`  | HashOperations  |   操作 Hash 类型数据    |
| `RedisTemplate.opsForList()`  | ListOperations  |   操作 List 类型数据    |
|  `RedisTemplate.opsForSet()`  |  SetOperations  |    操作 Set 类型数据    |
| `RedisTemplate.opsForZSet()`  | ZSetOperations  | 操作 SortedSet 类型数据 |

## JavaRestClient(java 数据库驱动)

参考文档: https://www.elastic.co/docs/reference/elasticsearch/clients/java/setup/installation

1. 引入依赖

::code-group

```xml [7.x 版本]
<dependency>
    <groupId>org.elasticsearch.client</groupId>
    <artifactId>elasticsearch-rest-high-level-client</artifactId>
</dependency>
```

```xml [9.x 版本]
<dependency>
    <groupId>co.elastic.clients</groupId>
    <artifactId>elasticsearch-java</artifactId>
</dependency>
```

::

2. 初始化:

::code-group

```java [7.x 版本]
RestHighLevelClient client = new RestHignLevelClient(RestClient.builder(
  HttpHost.create('http://localhost:9200')
))
```

```java [9.x 版本]
ElasticsearchClient esClient = ElasticsearchClient.of(b -> b
    .host("https://localhost:9200")
    .apiKey(apiKey)
);
```

::

::warning

客户端版本必须与 Elasticsearch 服务端版本保持一致，否则可能出现兼容性问题

::

### 索引库操作

::code-group

```java [7.x 版本]
private RestHighLevelClient client;

// 创建索引库
@Test
void testCreateHotelIndex() throws IOException {
  CreateIndexRequest request = new CreateIndexRequest("索引库名"); // 创建 Request 对象
  request.source(MAPPING_TEMPLATE, XContentType.JSON); // 设置请求参数，构建请求体
  client.indices().create(request, RequestOptions.DEFAULT); // 发起请求
}

// 查询索引库
@Test
void testGetHotelIndex() throws IOException {
  GetIndexRequest request = new GetIndexRequest("索引库名"); // 创建 Request 对象
  client.indices().exists(request, RequestOptions.DEFAULT); // 发起请求，判断是否存在

  System.out.println("exists = " + exists);
}

// 删除索引库
@Test
void testDeleteHotelIndex() throws IOException {
  DeleteIndexRequest request = new DeleteIndexRequest("索引库名"); // 创建 Request 对象
  client.indices().delete(request, RequestOptions.DEFAULT); // 发起请求
}

// 查询索引库信息
@Test
voiod testExistsHotelIndex() throws IOException {
  GetIndexRequest request = new GetIndexRequest("索引库名"); // 创建 Request 对象
  client.indices().get(request, RequestOptions.DEFAULT); // 发起请求
}

// 构造 JSON
private static final String MAPPING_TEMPLATE = "{\n" +
  "  \"mappings\": {\n" +
  // ...
  "}"
```

::

### 文档操作

::code-group

```java [7.x 版本]
private RestHighLevelClient client;
private ItemService itemService;

// 新增文档 && 修改文档-全量更新
@Test
void testIndexDocument() throws IOException {
  Item item = itemService.getById("数据库项id"); // 准备文档数据
  ItemDoc itemDoc = BeanUtil.copyProperties(item, ItemDoc.class); // 拷贝到 es 实体类
  IndexRequest request = new IndexRequest("索引库名").id(itemDoc.getId()); // 创建 request 对象
  request.source(JSONUtil.toJsonStr(itemDoc), XContentType.JSON); // 准备请求参数
  client.index(request, RequestOptions.DEFAULT); // 发送请求
}

// 查询文档
@Test
void testGetDocument() throws IOException {
  GetRequest request = new GetRequest("索引库名", "文档id"); // 创建 request 对象
  client.get(request, RequestOptions.DEFAULT); // 发送请求，得到结果
  String json = response.getSourceAsString(); // 解析结果

  System.out.println(json);
  // ItemDoc doc = JSONUtil.toBean(json, ItemDoc.class); // 封装为实体类
}

// 删除文档
@Test
void testDeleteDocument() throws IOException {
  DeleteRequest request = new DeleteRequest("索引库名", "文档id"); // 创建 request 对象
  client.delete(request, RequestOptions.DEFAULT); // 发送请求
}

// 修改文档-局部更新
@Test
void testUpdateDocument() throws IOException {
  UpdateRequest request = new UpdateRequest("索引库名", "文档id"); // 创建 request 对象
  request.doc(
    "age", 18,
    "name", "Rose"
  )
  client.update(request, RequestOptions.DEFAULT); // 发送请求
}

// 批处理
@Test
void testUpdateDocument() throws IOException {
  // 准备数据
  // int pageNo = 1, pageSize = 500;
  // while(true) {
  // Page<Item> page = itemService.lambdaQuery()
  //  .eq(Item::getStatus, 1)
  //  .page(Page.of(pageNo, pageSize));
  // List<Item> records = page.getRecords();
  // if(records == null || records.isEmpty()) return;

  BulkRequest request = new BulkRequest(); // 创建 request 对象

  request.add(new IndexRequest("索引库名"))
    .id("文档id").source("json数据", XContentType.JSON);
  request.add(new IndexRequest("索引库名"))
    .id("文档id").source("json数据", XContentType.JSON);

  //  循环插入
  // for(Item item : records) {
  //   request.add(new IndexRequest("索引库名"))
  //     .id(item.getId().toString())
  //     .source(JSONUtil.toJsonStr(BeanUtil.copyProperties(item, ItemDoc.class)), XContentType.JSON);
  // }

  client.bulk(request, RequestOptions.DEFAULT); // 发送请求

  // pageNo++; // 翻页
  // }
}
```

::
