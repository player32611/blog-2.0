# Redis

## Redis 简介

Redis(Remote Dictionary Server) 远程词典服务器，诞生于 2009 年，是一个基于内存的 key-value 结构(NoSQL)数据库

- 单线程，每个命令具备原子性

- 基于内存存储，读写性能高(基于内存、IO 多路复用、良好的编码)

- 适合存储热点数据(热点商品、咨询、新闻)

- 支持数据持久化

- 支持主从集群、分片集群

- 支持多语言客户端

- 企业应用广泛

## Redis 配置

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

## 常用数据类型

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

## Redis 常用命令

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

## Jedis

Jedis 以 Redis 命令作为方法名称，学习成本第，简单使用，但是 Jedis 示例是线程不安全的，多线程环境下需要基于连接池来使用

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

## Spring Data Redis

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
