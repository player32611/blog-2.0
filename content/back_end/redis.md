# Redis

## Redis 简介

Redis 是一个基于内存的 key-value 结构数据库

- 基于内存存储，读写性能高

- 适合存储热点数据（热点商品、咨询、新闻）

- 企业应用广泛

## 常用数据类型

Redis 存储的是 key-value 结构的数据，其中 key 是字符串类型，value 有 5 种常用的数据类型：

- 字符串 **string**：Redis 中最简单的数据类型

- 哈希 **hash**：也叫散列，类似于 Java 中的 HashMap 结构

- 列表 **list**：按照插入顺序排序，可以有重复元素，类似于 Java 中的 LinkedList

- 集合 **set**：无序集合，没有重复元素，类似于 Java 中的 HashSet

- 有序集合 **sorted set/zset**：集合中每个元素关联一个分数(double score)，根据分数升序排序，没有重复元素

## Redis 常用命令

### 字符串操作命令

- `SET key value`: 设置指定 key 的值

- `GET key`: 获取指定 key 的值

- `SETEX key seconds value`: 设置指定 key 的值，并将 key 的过期时间设为 seconds 秒

- `SETNX key value`: 只有在 key 不存在时设置 key 的值

### 哈希操作命令

- `HSET key field value`: 将哈希表 key 中的字段 field 的值设为 value

- `HGET key field`: 获取存储在哈希表中指定字段的值

- `HDEL key field`: 删除存储在哈希表中的指定字段

- `HKEYS key field`: 获取哈希表中所有字段

- `HVALS key`: 获取哈希表中所有值

### 列表操作命令

- `LPUSH key value1 [value2]`: 将一个或多个值插入到列表头部

- `LRANGE key start stop`: 获取列表指定范围内的元素

- `RPOP key`: 移除并获取列表最后一个元素

- `LLEN key`: 获取列表长度

### 集合操作命令

- `SADD key member1 [member2]`: 向集合添加一个或多个成员

- `SMEMBERS key`: 返回集合中的所有成员

- `SCARD key`: 获取集合的成员数

- `SINTER key1 [key2]`: 返回给定所有集合的交集

- `SUNION key1 [key2]`: 返回给定所有集合的并集

- `SREM key member1 [member2]`: 删除集合中一个或多个成员

### 有序集合操作命令

- `ZADD key score1 member1 [score2 member2]`: 向有序集合添加一个或多个成员

- `ZRANGE key start stop [WITHSCORES]`: 通过索引区间返回有序集合中指定区间内的成员

- `ZINCRBY key increment member`: 有序集合中对指定成员的分数加上增量 increment

- `ZREM key member [member...]`: 移除有序集合中的一个或多个成员

### 通用命令

Redis 的通用命令是不分数据类型的，都可以使用的命令

- `KEYS pattern`: 查找所有符合给定模式(pattern)的 key

- `EXISTS key`: 检查给定 key 是否存在

- `TYPE key`: 返回 key 所存储的值的类型

- `DEL key`: 该命令用于在 key 存在时删除 key

## Spring Data Redis

Spring Data Redis 是 Spring 的一部分，对 Redis 底层开发包进行了高度封装。在 Spring 项目中，可以使用 Spring Data Redis 来简化操作

### 使用方式

1. 导入依赖

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

2. 配置数据源

```yml
spring:
  redis:
    host: localhost
    port: 6379
    password: 123456
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
