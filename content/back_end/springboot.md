# Spring Boot

> Spring Boot 可以帮助我们非常快速的构建应用程序、简化开发、提高效率

## HTTP 协议

**HTTP 协议**（Hyper Text Transfer Protocol、超文本传输协议）规定了浏览器和服务其之间数据传输的规则。

::tip

HTTP 协议的特点：

1. 基于 TCP 协议：面向连接，安全

2. 基于请求-响应模型的：一次请求对应一次响应

3. HTTP 协议是无状态的协议：对于事务处理没有记忆能力，每次请求-响应都是独立的。多次请求间不能共享数据，但速度快。

::

### 请求协议

请求数据格式由三部分组成：**请求行**、**请求头**、**请求体**

**请求行**：请求数据第一行，包含请求方式、资源路径、协议

**请求头**：第二行开始，格式为 `key: value`

**请求体**：POST 请求，存放请求参数

::tip

GET 与 POST：

请求方式 - GET：请求参数在请求行中，没有请求体，如：`/brand/findAll?name=POOP&status=1`。GET 请求大小在浏览器中是有限制的

请求方式 - POST：请求参数在请求体中，POST 请求大小是没有限制的

::

::tip

常见的请求头：

|     请求头      |                                                            详细信息                                                             |
| :-------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
|      Host       |                                                          请求的主机名                                                           |
|   User-Agent    | 浏览器版本、例如 Chrome 浏览器的标识类似 Mozilla/5.0 ... Chrome/79，IE 浏览器的标志类似 Mozilla/5.0（Windows NT ...）like Gecko |
|     Accept      |                              表示浏览器能接收的资源类型，如 text/\*，image/\* 或者 \*/\* 表示所有                               |
| Accept-Language |                                     表示浏览器偏好的语言，服务器可以据此返回不同语言的网页                                      |
| Accept-Encoding |                                       表示浏览器可以支持的压缩类型，例如 gzip，deflate 等                                       |
|  Content-Type   |                                                         请求主体的类型                                                          |
| Content-Length  |                                                  请求主体的大小（单位：字节）                                                   |

::

Web 服务器（Tomcat）对 HTTP 协议的请求数据进行解析，并进行了封装（HttpServletRequest），在调用 Controller 方法的时候传递给了该方法。这样，就使得程序员不必直接对协议进行操作，让 Web 开发更加便捷。

```java
package com.example.demo.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RequestController {
    @RequestMapping("/request")
    public String request(HttpServletRequest  request) {
        // 获取请求方式
        String method = request.getMethod();
        System.out.println("method: " + method);
        // 获取请求 url 地址
        String url = request.getRequestURL().toString(); // http://localhost:8080/request
        System.out.println("url: " + url);
        String uri = request.getRequestURI(); // /request
        System.out.println("uri: " + uri);
        // 获取请求协议
        String protocol = request.getProtocol();
        System.out.println("protocol: " + protocol);
        // 获取请求参数 - name,age
        String name = request.getParameter("name");
        System.out.println("name: " + name);
        // 获取请求头 - Accept
        String accept = request.getHeader("Accept");
        System.out.println("accept: " + accept);

        return "OK";
    }
}
```

### 响应协议

响应数据格式由三部分组成：**响应行**、**请求头**、**请求体**

**响应行**：响应数据第一行，包含协议、状态码、描述

**响应头**：第二行开始，格式 `key: value`

**响应体**：最后一部分，存放响应数据

::tip

常见的响应头：

|      响应头      |                            详细信息                            |
| :--------------: | :------------------------------------------------------------: |
|   Content-Type   |     表示该响应内容的类型，例如 text/html，application/json     |
|  Content-Length  |                 表示该响应内容的长度（字节数）                 |
| Content-Encoding |                 表示该响应压缩算法，例如 gzip                  |
|  Cache-Control   | 指示客户端应如何缓存，例如 max-age=300 表示可以最多缓存 300 秒 |
|    Set-Cookie    |            告诉浏览器为当前页面所在的域设置 cookie             |

::

Web 服务器对 HTTP 协议的响应数据进行了封装（HttpServletResponse），并在调用 Controller 方法的时候传递给了该方法。这样，就使得程序员不必直接对协议进行操作，让 Web 开发更加便捷。

```java
package com.example.demo.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class ResponseController {
    @RequestMapping("/response")
    public void response(HttpServletResponse response) throws IOException {
        // 设置响应状态码
        response.setStatus(HttpServletResponse.SC_OK);
        // 设置响应头
        response.setHeader("name", "text/html;charset=utf-8");
        // 设置响应体
        response.getWriter().write("<h1>Hello World</h1>");
    }

    @RequestMapping("/response2")
    public ResponseEntity<String> response2(){
        return ResponseEntity
                .status(401)
                .header("name", "text/html;charset=utf-8")
                .body("<h1>Hello response</h1>");
    }
}
```

::warning

响应状态码和响应头如果没有特殊要求的话，通常不手动设定。服务器会根据请求处理的逻辑，自动设置响应状态码和响应头

::

## 分层解耦

### 三层架构

为了使我们所定义的接口、类以及方法的复杂度更低，可读性更强，扩展性更好，便于项目的后期维护，基于此，在 Web 开发中有了**三层架构**：

**controller**：控制层，接收前端发送的请求，对请求进行处理，并响应数据（接收请求，响应数据）

**service**：业务逻辑层，处理具体的业务逻辑（业务逻辑处理）

**dao**：数据访问层（Data Access Object）（持久层），负责数据访问操作。包括数据的增、删、改、查（数据访问操作）

::code-group

```java [UserDao.java]
// /main/java/com.xxx.xxx/dao/UserDao.java

public interface UserDao {
    // 加载用户数据
    public List<String> findAll();
}
```

```java [UserDaoImpl.java]
// /main/java/com.xxx.xxx/dao/impl/UserDaoImpl.java

public class UserDaoImpl implements UserDao {

    @Override
    public List<String> findAll(){
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("user.txt");
        ArrayList<String> lines = IOUtils.reafLines(in, StandardCharsets.UTF_8,new ArrayList<>());
        return lines;
    }
}
```

```java [UserService.java]
// /main/java/com.xxx.xxx/service/UserService.java

public interface UserService {
    // 查询所有用户信息
    public List<User> findAll();
}
```

```java [UserServiceImpl.java]
// /main/java/com.xxx.xxx/service/impl/UserServiceImpl.java

public class UserServiceImpl implements UserService {

    private UserDao userDao = new UserDaoImpl();

    @Override
    public List<User> findAll(){
        // 调用 dao，获取数据
        List<User> lines = userDao.findAll();

        // 解析用户信息，封装为 User 对象 -> list 集合
        List<User> userList = lines.stream().map(line->{
            String[] parts = line.split(",");
            Integer id = Integer.parseInt(parts[0]);
            String username = parts[1];
            String password = parts[2];
            String name = parts[3];
            Integer age = Integer.parseInt(parts[4]);
            LocalDateTime updateTime = LocalDateTime.parse(parts[5], DateTimeFormatter.ofPattern("yyyy-MM-dd H"));
            return new User(id,username,password,name,age,updateTime);
        }).toList();

        return userList;
    }
}
```

```java [UserController.java]
// /main/java/com.xxx.xxx/controller/UserController.java

@RestController
public class UserController {

    private UserService userService = new UserServiceImpl();

    @RequestMapping("/list")
    public List<User> list() throws Exception{
        // 调用 service，获取数据
        List<User> userList = userService.findAll();

        // 返回数据(json)
        return userList;
    }
}
```

::

### 分层解耦

**耦合**：衡量软件中各个层/各个模块的依赖关联程度

**内聚**：软件中各个功能模块内部的功能联系

::tip

软件设计原则：**高内聚低耦合**

::

**控制反转**（Inversion Of Control，IOC）：对象的创建控制权由程序自身转移到外部（容器），这种思想被称为控制反转。

**依赖注入**（Dependency Injection，DI）：容器为应用程序提供运行时，所依赖的资源，称之为依赖注入

**Bean对象**：IOC 容器中创建、管理的对象，称之为 Bean

::tip

实现分层解耦的思路：

- 将项目中的类交给 IOC 容器管理（IOC，控制反转）

- 应用程序运行时需要什么对象，直接依赖容器为其提供（DI，依赖注入）

::

1. 通过 `@Component` 将 Dao 及 Service 层的实现类，交给 IOC 容器管理（是加在实现类上，而非接口上）

2. 通过 `@Autowired` 为 Controller 及 Service 注入运行时所依赖的对象

::code-group

```java [UserServiceImpl.java] 1,4
@Component // 将当前类交给 IOC 容器管理
public class UserServiceImpl implements UserService {

    @Autowired // 应用程序运行时，会自动的查询该类型的 bean 对象，并赋值给该成员变量
    private UserDao userDao;

    @Override
    public List<User> findAll(){
        // 调用 dao，获取数据
        List<User> lines = userDao.findAll();

        // 解析用户信息，封装为 User 对象 -> list 集合
        List<User> userList = lines.stream().map(line->{
            String[] parts = line.split(",");
            Integer id = Integer.parseInt(parts[0]);
            String username = parts[1];
            String password = parts[2];
            String name = parts[3];
            Integer age = Integer.parseInt(parts[4]);
            LocalDateTime updateTime = LocalDateTime.parse(parts[5], DateTimeFormatter.ofPattern("yyyy-MM-dd H"));
            return new User(id,username,password,name,age,updateTime);
        }).toList();

        return userList;
    }
}
```

```java [UserDaoImpl.java] 1
@Component // 将当前类交给 IOC 容器管理
public class UserDaoImpl implements UserDao {

    @Override
    public List<String> findAll(){
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("user.txt");
        ArrayList<String> lines = IOUtils.reafLines(in, StandardCharsets.UTF_8,new ArrayList<>());
        return lines;
    }
}
```

```java [UserController.java] 4,5
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/list")
    public List<User> list() throws Exception{
        // 调用 service，获取数据
        List<User> userList = userService.findAll();

        // 返回数据(json)
        return userList;
    }
}
```

::

### IOC详解

要把某个对象交给 IOC 容器管理，需要在对应的类上加上如下注解之一：

|    注解     |         说明          |                        位置                         |
| :---------: | :-------------------: | :-------------------------------------------------: |
| @Component  | 声明 bean 的基础注解  |             不属于以下三类时，用此注解              |
| @Controller | @Component 的衍生注解 |                  标注在控制层类上                   |
|  @Service   | @Component 的衍生注解 |                  标注在业务层类上                   |
| @Repository | @Component 的衍生注解 | 标注在数据访问层类上（由于与 mybatis 整合，用的少） |

::code-group

```java [UserDaoImpl.java] 1
@Repository // 将当前类交给 IOC 容器管理
public class UserDaoImpl implements UserDao {

    @Override
    public List<String> findAll(){
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("user.txt");
        ArrayList<String> lines = IOUtils.reafLines(in, StandardCharsets.UTF_8,new ArrayList<>());
        return lines;
    }
}
```

```java [UserServiceImpl.java] 1
@Service // 将当前类交给 IOC 容器管理
public class UserServiceImpl implements UserService {

    @Autowired // 应用程序运行时，会自动的查询该类型的 bean 对象，并赋值给该成员变量
    private UserDao userDao;

    @Override
    public List<User> findAll(){
        // 调用 dao，获取数据
        List<User> lines = userDao.findAll();

        // 解析用户信息，封装为 User 对象 -> list 集合
        List<User> userList = lines.stream().map(line->{
            String[] parts = line.split(",");
            Integer id = Integer.parseInt(parts[0]);
            String username = parts[1];
            String password = parts[2];
            String name = parts[3];
            Integer age = Integer.parseInt(parts[4]);
            LocalDateTime updateTime = LocalDateTime.parse(parts[5], DateTimeFormatter.ofPattern("yyyy-MM-dd H"));
            return new User(id,username,password,name,age,updateTime);
        }).toList();

        return userList;
    }
}
```

```java [UserController.java] 1
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/list")
    public List<User> list() throws Exception{
        // 调用 service，获取数据
        List<User> userList = userService.findAll();

        // 返回数据(json)
        return userList;
    }
}
```

::

::tip

声明 bean 的时候，可以通过注解的 value 属性指定 bean 的名字。如果没有指定，默认为类名首字母小写。

```java
@Repository("userDao")
public class UserDaoImpl implements UserDao {

    @Override
    public List<String> findAll(){
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("user.txt");
        ArrayList<String> lines = IOUtils.reafLines(in, StandardCharsets.UTF_8,new ArrayList<>());
        return lines;
    }
}
```

::

前面声明 bean 的四大注解，要想生效，还需要被组件扫描注解 `@ComponentScan` 扫描。

该注解虽然没有显示配置，但是实际上已经包含在了启动类声明注解 `@SpringBootApplication` 中，默认扫描的范围是启动类所在包及其子包。

### DI 详解

基于 `@Autowired` 进行依赖注入的常见方式有三种：**属性注入**、**构造函数注入**、**setter 注入**。

::code-group

```java [属性注入] 4,5
@RestController
public class UserController {

    @Autowired
    private UserService userService;
    // ...
}
```

```java [构造函数注入] 4,7-9
@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
      this.userService = userService;
    }
    // ...
}
```

```java [setter 注入] 4,7-9
@RestController
public class UserController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService){
      this.userService = userService;
    }
    // ...
}
```

::

::tip

如果使用构造函数方法时，当前类中只存在一个构造函数，可省略 `@Autowired` 注解。

::

::tip

三种方式的优缺点：

- 属性注入：代码简洁，方便快速开发；但隐藏了类之间的依赖关系，可能会破坏类的封装性

- 构造函数注入：能清晰地看到类的依赖关系，提高了代码的安全性；但代码繁琐，如果构造参数过多，可能会导致构造函数臃肿

- setter 注入：保持了类的封装性，依赖关系更清晰；但需要额外编写 setter 方法，增加了代码量

::

`@Autowired` 注解，默认是按照类型进行注入的。如果存在多个相同类型的 bean，将会出现报错。

**解决方案一**：`@Primary`

```java
@Primary
@Service
public class UserServiceImpl2 implements UserService {
  @Override
  public List<User> list(){
    // ...
  }
}
```

**解决方案二**：`@Qualifier`

```java
@RestController
public class UserController {
  @Autowired
  @Qualifier("userServiceImpl2")
  private UserService userService;
}
```

**解决方案三**：`@Resource`

```java
@RestController
public class UserController {
  @Resource(name="userServiceImpl")
  private UserService userService;
}
```

::tip

`@Resource` 与 `@Autowired` 的区别：

- `@Autowired` 是 Spring 框架提供的注解，而 `@Resource` 是 JavaEE 规范提供的

- `@Autowired` 是默认按照类型注入，而 `@Resource` 默认是按照名称注入

::

## JDBC

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
  <artifactId>mysql-connector-j</artifactId>
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

## MyBatis

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

## MyBatis-Plus

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

## Spring AOP

**AOP**（Aspect Oriented Programming）（面向切面编程，面向方面编程），可简单理解为就是面向特定方法编程

例如当需要在多个方法中添加相同的功能时，可以使用 AOP 进行代码复用

AOP 的应用场景包括：记录系统的操作日志、事务管理、权限控制

::tip

优势：

- 减少重复代码

- 代码无侵入

- 提高开发效率

- 维护方便

::

::tip

AOP 是一种思想，而在 Spring 框架中对这种思想进行的实现，就是 Spring AOP

Spring AOP 的实现原理：**动态代理**，使用代理类来调用原始方法，并添加额外的功能

::

### 快速入门

**需求**：统计所有业务层方法的执行耗时

1. **导入依赖**

```xml [pom.xml]
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-aop</artifactId>
  <version>3.2.10</version>
</dependency>
```

2. **编写 AOP 程序**

```java [src/main/java/com/itheima/RecordTimeAspect.java]
@Aspect
@Component
public class RecordTimeAspect {
  @Around("execution(* com.itheima.service.impl.*.*(..))") // 匹配需要使用到的方法
  public Object recordTime(ProceedingJoinPoint joinPoint) throws Throwable {
    long beginTime = System.currentTimeMillis(); // 记录方法运行的开始时间
    Object result = joinPoint.proceed(); // 运行原始方法
    long endTime = System.currentTimeMillis(); // 记录方法运行的结束时间
    log.info("方法 {} 执行耗时：{} ms", joinPoint.getSignature() , endTime - beginTime);
    return result;
  }
}
```

### AOP 核心概念

- **连接点**（JoinPoint）：可以被 AOP 控制的方法（暗含方法执行的相关信息）

- **通知**（Advice）：指那些重复的逻辑，也就是共性功能（最终体现为一个方法）

- **切入点**（PointCut）：实际被 AOP 控制的方法，匹配连接点的条件，通知仅会在切入点执行时被应用
  - 切入点表达式：`@Around("execution(* com.itheima.service.impl.*.*(..))")`

- **切面**（Aspect）：描述通知与切入点的对应关系（通知 + 切入点）
  - **切面类**：`@Aspect` 注解修饰的类

- **目标对象**（Target）：通知所应用的对象

### 通知类型

根据通知方法执行时机的不同，将通知类型分为以下常见的五类：

- **`@Around`**：环绕通知，此注解标注的通知方法在目标方法前、后都被执行

- **`@Before`**：前置通知，此注解标注的通知方法在目标方法前被执行

- **`@After`**：后置通知，此注解标注的通知方法在目标方法后被执行，无论是否有异常都会执行

- **`@AfterReturning`**：返回后通知，此注解标注的通知方法在目标方法后被执行，有异常不会执行

- **`@AfterThrowing`**：异常通知，此注解标注的通知方法发生异常后被执行

::warning

`@Around` 环绕通知需要自己调用 `ProceedingJoinPoint.proceed()` 来让原始方法执行，其他通知不需要考虑目标方法执行

`@Around` 环绕通知方法的返回值，必须指定为 Object，来接收原始方法的返回值

::

::detail

#title
具体示例
#default

```java [com.itheima.aop.MyAspect.java]
public class MyAspect {
  @Before("execution(* com.itheima.service.impl.*.*(..))")
  public void before() {
    log.info("前置通知");
  }

  @Around("execution(* com.itheima.service.impl.*.*(..))")
  public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
    log.info("环绕通知开始");
    Object result = joinPoint.proceed();
    log.info("环绕通知结束");
    return result;
  }

  @After("execution(* com.itheima.service.impl.*.*(..))")
  public void after() {
    log.info("后置通知");
  }

  @AfterReturning("execution(* com.itheima.service.impl.*.*(..))")
  public void afterReturning() {
    log.info("返回后通知");
  }

  @AfterThrowing("execution(* com.itheima.service.impl.*.*(..))")
  public void afterThrowing() {
    log.info("异常通知");
  }
}
```

::

::tip

`@PointCut` 注解

该注解的作用是将公共的切入点表达式抽取出来，需要用到时引用该切点表达式即可

```java [com.itheima.aop.MyAspect.java]
public class MyAspect {

  @Pointcut("execution(* com.itheima.service.impl.*.*(..))")
  private void pt(){}

  @Before("pt()")
  public void before() {
    log.info("前置通知");
  }

  @Around("pt()")
  public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
    log.info("环绕通知开始");
    Object result = joinPoint.proceed();
    log.info("环绕通知结束");
    return result;
  }

  @After("pt()")
  public void after() {
    log.info("后置通知");
  }

  @AfterReturning("pt()")
  public void afterReturning() {
    log.info("返回后通知");
  }

  @AfterThrowing("pt()")
  public void afterThrowing() {
    log.info("异常通知");
  }
}
```

- **private**：仅能在当前切面类中引用该表达式

- **public**：在其它外部的切面类中也可以引用该表达式

::

### 通知顺序

当有多个切面的切入点都匹配到了目标方法，目标方法运行时，多个通知方法都会被执行

不同切面类中，默认按照切面类的**类名字母排序**：

- 目标方法前的通知方法：字母排名靠前的先执行

- 目标方法后的通知方法：字母排名靠前的后执行

或者可以用 `@Order` 注解加在切面类上来控制顺序

- 目标方法前的通知方法：数字小的先执行

- 目标方法后的通知方法：数字小的后执行

::detail

#title
具体示例
#default

```java [com.itheima.aop.MyAspect.java]
@Aspect
@Component
@Order(5)
public class MyAspect {
  // ...
}
```

::

### 切入点表达式

即描述切入点方法的一种表达式，用来决定项目中的那些方法需要加入通知

有以下常见形式：

- **`execution(...)`**：根据方法的签名来匹配

- **`@annotation(...)`**：根据注解匹配

`execution()` 主要根据方法的返回值、包名、类名、方法名、方法参数等信息来匹配，语法为：

```java
excution(访问修饰符? 返回值 包名.类名.?方法名(方法参数) throws 异常?)
```

- **访问修饰符**：可省略（比如：public、protected）

- **包名.类名**：可省略

- **throws 异常**：可省略（注意是方法上声明抛出的异常，不是实际抛出的异常）

可以使用通配符描述切入点：

- **`*`**：单个独立的任意符号，可以通配任意返回值、包名、类名、方法名、任意类型的一个参数，也可以通配包、类、方法名的一部分：

```java
execution(* com.*.service.*.update*(*))
```

- **`..`**：多个任意符号，可以通配任意层级的包，或任意类型、任意个数的参数

```java
execution(* com.itheima..DeptService.*(..))
```

::tip

`*` 通配符支持模糊匹配，例如 `com.itheima.service.impl.*.del*(java.lang.Integer)` 匹配 com.itheima.service.impl 包下所有以 del 开头的方法，并且只有一个参数，参数类型为 Integer；`com.itheima.service.impl.*.*e(*)` 匹配 com.itheima.service.impl 包下所有以 e 结尾的方法，并且有一个任意参数

::

::tip

根据业务需要，可以使用**且**（&&）、**或**（||）、**非**（!）来组合比较复杂的切入点表达式，例如：

```java
@Before("execution(* com.itheima.service.impl.*.list(..)) || execution(* com.itheima.service.impl.*.delete(..))")
public void before() {
  // ...
}
```

这表示匹配 com.itheima.service.impl 包下 list 和 delete 方法

::

::tip

**书写建议**：

- 所有业务方法名在命名时尽量规范，方便切入点表达式快速匹配。如：`findXxx`、`updateXxx`

- 描述切入点方法通常基于接口描述，而不是直接描述实现类，增强扩展性

- 在满足业务需要的前提下，尽量缩小切入点的匹配范围。如：包名尽量不使用 `..`，使用 `*` 匹配单个包

::

`@annotation` 切入点表达式，用于匹配标识有特定注解的方法

::code-group

```java [src/main/java/com/itheima/anno/LogOperation.java]
package com.itheima.anno;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogOperation {
}
```

```java [src/main/java/com/itheima/aop/MyAspect.java]
// ...
@Before("@annotation(com.itheima.anno.LogOperation)")
public void before() {
  log.info("前置通知");
}
// ...
```

```java [src/main/java/com/itheima/service/impl/DeptServiceImpl.java]
// ...
@LogOperation
@Override
public void delete(Integer id) {
  deptMapper.delete(id);
}
// ...
```

::

### 连接点

在 Spring 中用 JoinPoint 抽象了连接点，用它可以获得方法执行时的相关信息，如目标类名、方法名、方法参数等

- 对于 `@Around` 通知，获取连接点信息只能使用 `ProceedingJoinPoint`

- 对于其它四种通知，获取连接点信息只能使用 `JoinPoint`，他是 `ProceedingJoinPoint` 的父类型

::detail

#title
具体示例
#default

```java
// ...
@Before("execution(* com.itheima.service.impl.*.*(..))")
public void before(JoinPoint joinPoint) {
  log.info("before ...")
  // 获取目标对象
  Object target = joinPoint.getTarget();
  log.info("获取目标对象: {}", target);
  // 获取目标类
  String className = joinPoint.getTarget().getClass().getName();
  log.info("获取目标类: {}", className);

  // 获取目标方法
  String methodName = joinPoint.getSignature().getName();
  log.info("获取目标方法: {}", methodName);

  // 获取目标方法参数
  Object[] args = joinPoint.getArgs();
  log.info("获取目标方法参数: {}", Arrays.toString(args));
}
```

::

### ThreadLocal

**ThreadLocal** 并不是一个 Thread，而是 Thread 的局部变量

ThreadLoacl 为每个线程提供一份单独的存储空间，具有线程隔离的效果，不同的线程之间不会相互干扰

**ThreadLocal** 常用方法：

- `public void set(T value)`：设置当前线程的线程局部变量的值

- `public T get()`：返回当前线程所对应的线程局部变量的值

- `public void remove()`：移除当前线程的线程局部变量

::detail

#title
具体示例：获取当前登录员工
#default

具体操作步骤：

1. 定义 ThreadLocal 操作的工具类，用于操作当前登录员工 ID

2. 在 TokenFilter 中，解析完当前登录员工 ID，将其存入 ThreadLocal（用完之后需将其删除）

3. 在 AOP 程序中，从 ThreadLocal 中获取当前登录员工的 ID

::code-group

```java [src/main/java/com/itheima/utils/CurrentHolder.java]
public class CurrentHolder {
  private static final ThreadLocal<Integer> CURRENT_LOCAL = new ThreadLocal<>();

  public static void set(Integer employeeId) {
    CURRENT_LOCAL.set(employeeId);
  }

  public static Integer get() {
    return CURRENT_LOCAL.get();
  }

  public static void remove() {
    CURRENT_LOCAL.remove();
  }
}
```

```java [src/main/java/com/itheima/filter/TokenFilter.java]
// ...
Integer empId = Integer.valueOf(claims.get("id")).toString()
CurrentHolder.set(empId);
// ...
filterChain.doFilter(request, response);
CurrentHolder.remove(); // 删除 ThreadLocal
```

```java [src/main/java/com/itheima/aop/MyAspect.java]
// ...
private Integer getCurrentUserId() {
  return CurrentHolder.get();
}
// ...
```

::

::

## Bean 管理

### Bean 作用域

Spring 支持五种作用域，后三种在 Web 环境才生效：

|  作用域   |                       说明                       |
| :-------: | :----------------------------------------------: |
| singleton | 容器内同名称的 Bean 只有一个实例（单例）（默认） |
| prototype | 每次使用该 Bean 时会创建新的实例（非单例/多例）  |
|  request  |           每个请求范围内会创建新的实例           |
|  session  |           每个会话范围内会创建新的实例           |
|  global   |           每个应用范围内会创建新的实例           |

可以通过 `@Scope` 注解指定作用域

::detail

#title
具体示例
#default

```java
@Scope("prototype")
@RequestMapping("/depts")
@RestController
public class DeptController {

}
```

::

::warning

默认单例的 Bean 是在项目启动时创建的，创建完毕后会将该 Bean 存入 IOC 容器

通过添加 `@Lazy` 注解延迟初始化，将单例 Bean 改为懒加载，即在第一次使用时创建

::

::tip

作用域的使用场景

1. 单例 Bean（无状态的 Bean）：

```java
@Slf4j
@RestController
@Scope("singleton")
public class DeptController {
  @Autowired
  private DeptService deptService;

  @GetMapping("/depts")
  public List<Dept> list() {
    log.info("查询所有部门信息...");
    List<Dept> list = deptService.list();
    return Result.success(list);
  }
}
```

2. 多例 Bean（有状态的 Bean）：

```java
@Component
public class DataProcessor {
  private List<EmpModel> dataList = new ArrayList<EmpModel>(); // 暂存数据
  private Integer errCount = 0; //错误数据统计

  @Autowired
  private EmpService empService;
  public void process(List<EmpModel> empList) {
    dataList = empList.stream().map(emp->{
      // 数据处理
    }).toList();
  }
  public void handle() {
    // ...
  }
}
```

::

::warning

实际开发当中，绝大部分的 Bean 是单例的，也就是说绝大部分 Bean 不需要配置 scope 属性

::

### Bean 的线程安全

Bean 的线程安全取决于 Bean 的状态及 Bean 的作用域

单例 Bean：

- 如果是无状态的 Bean，内部不保存任何状态信息，则是线程安全的
- 如果是有状态的 Bean，内部会保存状态信息，多个线程会同时操作该 Bean 时，可能会出现数据不一致的问我呢提，这样的 Bean 则是线程不安全的

### 第三方 Bean

如果要管理的 Bean 对象来自第三方（不是自定义的），是无法用 `@Component` 及衍生注解声明 Bean 的，就需要用到 `@Bean` 注解

::detail

#title
具体示例
#default

在**启动类**中定义一个新方法，

```java
@SpringBootApplication
public class SpringbootWebConfigApplication {

  //...

  @Bean // 将方法返回值交给 IOC 容器管理，成为 IOC 容器的 Bean 对象
  public AliyunOSSOperator aliyunOSSOperator(AliyunOSSProperties aliyunOSSProperties) {
    return new AliyunOSSOperator(aliyunOSSProperties);
  }
}
```

- **aliyunOSSProperties**：可能需要的形参

::

::warning

如果第三方 Bean 需要依赖其它 Bean 对象，直接在 Bean 定义方法中设置形参即可，容器会根据类型自动装配

::

::warning

通过 `@Bean` 注解的 name 或 value 属性可以声明 Bean 的名称，如果不指定，默认 Bean 的名称就是方法名

::

若要管理第三方 Bean 对象，建议对这些 Bean 进行集中分类配置，可以通过 `@Configuration` 注解声明一个配置类

```java [src/main/java/com/itheima/config/OSSConfig.java]
// src/main/java/com/itheima/config/OSSConfig.java
public class OSSConfig {
  @Bean
  public AliyunOSSOperator aliyunOSSOperator(AliyunOSSProperties aliyunOSSProperties) {
    return new AliyunOSSOperator(aliyunOSSProperties);
  }
}
```

## Spring Boot 原理

### 配置优先级

Spring Boot 中支持三种格式的配置文件：`properties`、`yml`、`yaml`

如果存在多个配置文件，Spring Boot 会优先加载 `application.properties` 文件，然后加载 `application.yml` 文件，最后加载 `application.yaml` 文件

::warning

虽然 Spring Boot 支持多种格式配置文件，但是在项目开发时，推荐统一使用一种格式的配置（yml 是主流）

::

Spring Boot 除了支持配置文件属性配置，还支持 Java 系统属性和命令行参数的方式进行属性配置

- **Java 系统属性**：`-Dserver.port=9000`

- **命令行参数**：`--server.port=10010`

::tip

命令行参数的优先级高于 Java 系统属性，Java 系统属性的优先级高于配置文件属性

::

可以在 IDEA 中配置启动参数，也可以在打包后进行属性配置：

1. 执行 maven 打包命令：`mvn clean package`

2. 执行 java 指令，运行 jar 包：

```bash
java -Dserver.port=9000 -jar xxx.jar --server.port=10010
```

::warning

Spring Boot 项目进行打包时，需要引入插件 spring-boot-maven-plugin（基于官网骨架创建项目，会自动添加该插件）

::

### 起步依赖

**原理**：依赖传递

### 自动配置

SpringBoot 的自动配置就是当 spring 项目启动后，一些配置类，bean 对象就自动存入到了 IOC 容器中，不需要我们手动去声明，从而简化了开发，省去了繁琐的配置操作

**自动配置实现方案一：`@Component` + `@ComponentScan`**

在第三方工具包中，需要使用 `@Component` 注解进行声明 bean，并在我们的项目中基于 `@ComponentScan` 注解进行扫描

::code-group

```java [第三方工具包工具类]
// itheima-utils/src/main/java/com/example/TokenParser.java

@Component
public class TokenParser{
  public void parse(){
    System.out.println("TokenParser ... parse ...");
  }
}
```

```java [主项目启动类]
// springboot-web-config/src/main/java/com/itheima/SpringbootWebConfigApplication.java

@ComponentScan(basePackages = {"com.example", "com.itheima"})
@SpringBootApplication
public class SpringbootWebConfigApplication {
  public static void main(String[] args) {
    SpringApplication.run(SpringbootWebConfigApplication.class, args);
  }
}
```

::

**自动配置实现方案二：`@Import`**

`@Import` 导入的类会被 Spring 加载到 IOC 容器中，导入形式主要有以下几种：

- 导入普通类

```java [主项目启动类]
// springboot-web-config/src/main/java/com/itheima/SpringbootWebConfigApplication.java

@Import(TokenParser.class) // 导入普通类
@SpringBootApplication
public class SpringbootWebConfigApplication {
  public static void main(String[] args) {
    SpringApplication.run(SpringbootWebConfigApplication.class, args);
  }
}
```

- 导入配置类

::code-group

```java [工具包配置类]
// itheima-utils/src/main/java/com/example/HeaderConfig.java

@Configuration
public class HeaderConfig {

  @Bean
  public HeaderParser headerParser(){
    return new HeaderParser();
  }

  @Bean
  public HeaderGenerator headerGenerator(){
    return new HeaderGenerator();
  }
}
```

```java [主项目启动类]
// springboot-web-config/src/main/java/com/itheima/SpringbootWebConfigApplication.java

@Import(HeaderConfig.class) // 导入配置类
@SpringBootApplication
public class SpringbootWebConfigApplication {
  public static void main(String[] args) {
    SpringApplication.run(SpringbootWebConfigApplication.class, args);
  }
}
```

::

- 导入 ImportSelector 接口实现类：在 ImportSelector 内导入的类

::code-group

```java [工具包接口实现类]
// itheima-utils/src/main/java/com/example/MyImportSelector.java

public class MyImportSelector implements ImportSelector {
  public String[] selectImports(AnnotationMetadata importingClassMetadata) {
    return new String[]{"com.example.HeaderConfig", "com.example.TokenParser"};
  }
}
```

```java [主项目启动类]
// springboot-web-config/src/main/java/com/itheima/SpringbootWebConfigApplication.java

@Import(MyImportSelector.class) // 导入 ImportSelector 实现类
@SpringBootApplication
public class SpringbootWebConfigApplication {
  public static void main(String[] args) {
    SpringApplication.run(SpringbootWebConfigApplication.class, args);
  }
}
```

::

::tip

**`@EnableXxx` 注解**

大多数工具包内会存在一个 `@EnableXxx` 注解，内部封装了 `@Import` 注解实现了配置类导入，我们可以借助 `@EnableXxx` 注解进行导入

```java
@EnableHeaderCongfig
@SpringBootApplication
public class SpringbootWebConfigApplication {
  public static void main(String[] args) {
    SpringApplication.run(SpringbootWebConfigApplication.class, args);
  }
}
```

::

### 源码跟踪

`@SpringBootApplication`：该注解标识在 SpringBoot 工程引导类上，是 SpringBoot 中**最**重要的注解。该注解由三个部分组成：

- `@SpringBootConfiguration`：该注解与 `@Configuration` 注解作用相同，用来声明当前也是一个配置类

- `@ComponentScan`：组件扫描，默认扫描当前引导类所在包及其子包

- `@EnableAutoConfiguration`：SpringBoot 实现自动化配置的核心注解

::warning

在低版本（2.7.0 以前）的 SpringBoot 中，自动配置类（XxxAutoConfiguration）是定义在 spring.factories 文件中

::

`@Conditional` 注解按照一定的条件进行判断，作用于方法或类，在满足给定条件后才会注册对应的 bean 对象到 Spring IOC 容器中

`@Conditional` 本身是一个父注解，派生出大量的子注解：

- `@ConditionalOnClass`：判断环境中是否有对应字节码文件，才注册 bean 到 IOC 容器

- `@ConditionalOnMissingBean`：判断环境中没有对应的 bean（类型或名称），才注册 bean 到 IOC 容器

- `@ConditionalOnProperty`：判断配置文件中有对应属性和值，才注册 bean 到 IOC 容器

::tip

`@Conditional` 及其衍生注解作用在方法上时针对当前这个方法声明的 bean 生效

作用在类上时针对当前这个类中所有的方法声明的 bean 生效

::

::tip

自己定义自动配置类的核心是**定义自动配置类**，并将自动配置类配置在 `/META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 文件中

::

### 自定义 starter

在实际开发中，经常会定义一些公共组件，提供给哥哥项目团队使用。而在 SpringBoot 的项目中，一般会将这些公共组件封装为 SpringBoot 的 starter（包含了起步依赖和自动配置的功能）

::detail

#title
自定义 starter
#default
**需求**：自定义 aliyun-oss-spring-boot-starter，完成阿里云 OSS 操作工具类 AliyunOSSOperator 的自动配置

**目标**：引入起步依赖之后，要想使用阿里云 OSS，注入 AliyunOSSIoerator 直接使用即可

**步骤**：

1. 创建 aliyun-oss-spring-boot-starter 模块

2. 创建 aliyun-oss-spring-boot-autoconfigure 模块，在 starter 中引入该模块

3. 在 aliyun-oss-spring-boot-autoconfigure 模块中的定义自动配置功能，并定义自动配置文件 META-INF/spring/xxxx.imports

::code-group

```xml [aliyun-oss-spring-boot-autoconfigure/pom.xml]
<!-- 阿里云 OSS 依赖 -->
<dependency>
  <groupId>com.aliyun.oss</groupId>
  <artifactId>aliyun-sdk-oss</artifactId>
  <version>3.17.4</version>
</dependency>
```

```java [AliyunOSSAutoConfiguration.java]
// aliyun-oss-spring-boot-autoconfigure/src/main/java/com/aliyun/oss/AliyunOSSAutoConfiguration.java

@EnableConfigurationProperties(AliyunOSSProperties.class)
@Configuration
public class AliyunOSSAutoConfiguration {
  @Bean
  @ConditionalOnMissingBean
  public AliyunOSSOperator aliyunOSSOperator(AliyunOSSProperties aliyunOSSProperties) {
    return new AliyunOSSOperator(aliyunOSSProperties);
  }
}
```

```[org.springframework.boot.autoconfigure.AutoConfiguration.imports]
// aliyun-oss-spring-boot-autoconfigure/src/main/resources/META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports

com.aliyun.oss.AliyunOSSAutoConfiguration
```

```xml [aliyun-oss-spring-boot-starter/pom.xml]
<dependency>
  <groupId>com.aliyun.oss</groupId>
  <artifactId>spring-boot-starter</artifactId>
</dependency>
```

使用时引入 starter 依赖：

```xml [pom.xml]
<dependency>
  <groupId>com.aliyun.oss</groupId>
  <artifactId>aliyun-oss-spring-boot-starter</artifactId>
  <version>0.0.1-SNAPSHOT</version>
</dependency>
```

```java
String url = aliyunOSSOperator.upload(image.getBytes(), image.getOriginalFilename());
```

::

::

## Spring Boot 项目结构

### 单模块项目

```text
my-spring-boot-project/
├── src/
│ ├── main/
│ │ ├── java/
│ │ │ └── com/example/demo/
│ │ │     ├── DemoApplication.java      # 启动类
│ │ │     ├── controller/               # 控制器层
│ │ │     ├── service/                  # 业务逻辑层
│ │ │     ├── repository/               # 数据访问层
│ │ │     ├── model/entity/             # 实体类
│ │ │     ├── dto/                      # 数据传输对象
│ │ │     ├── config/                   # 配置类
│ │ │     └── util/                     # 工具类
│ │ ├── resources/
│ │ │   ├── application.yml             # 核心配置文件
│ │ │   ├── application-dev.yml         # 开发环境配置
│ │ │   ├── application-prod.yml        # 生产环境配置
│ │ │   ├── static/                     # 静态资源（CSS/JS/图片）
│ │ │   ├── templates/                  # 模板文件（Thymeleaf等）
│ │ │   └── db/migration/               # Flyway/Liquibase 迁移脚本
│ │ └── webapp/                         # （可选）传统Web应用目录
│ └── test/
│     ├── java/                         # 单元测试和集成测试
│     └── resources/                    # 测试资源文件
├── mvnw / mvnw.cmd                     # Maven Wrapper
├── pom.xml 或 build.gradle             # 构建配置文件
└── .gitignore
```

### 多模块项目

```text
my-multi-module-project/          # 项目根目录
├── pom.xml                        # 父工程POM，packaging为pom，管理版本
├── my-common/                     # 公共模块（被所有业务模块依赖）
│   ├── pom.xml
│   └── src/main/java/
│       └── com/example/
│           ├── config/            # 公共配置（如Redis、Swagger）[citation:1][citation:8]
│           ├── exception/         # 全局异常处理、自定义异常[citation:8]
│           ├── util/              # 工具类（如JWT、日期处理）[citation:8]
│           └── response/          # 统一API响应结构[citation:8]
├── my-pojo/                     # 对象模块，存放普通 Java 对象，只有属性和对应的 getter 和 setter
│   ├── pom.xml
│   └── src/main/java/
│       └── com/example/
│           ├── dto/               # 数据传输对象，通常用于程序中各层之间传递数据
│           ├── entity/            # 实体，通常和数据库中的表对应
│           └── vo/                # 视图对象，为前端展示数据提供的对象
├── my-service/              # 用户模块业务实现
│   ├── pom.xml
│   └── src/main/java/
│       └── com/example/
│           ├── config/            # 配置文件
│           ├── controller/        # REST API 入口[citation:1]
│           ├── mapper/            # 数据链接实现
│           ├── service/           # 业务逻辑实现
│           ├── repository/        # 数据访问层
│           └── ...
├── my-order-api/                 # 订单模块API接口
│   └── ... (结构同 my-user-api)
├── my-order-service/             # 订单模块业务实现（依赖 my-order-api 和 my-user-api）
│   └── ... (结构同 my-user-service)
└── my-gateway/                   # 网关模块（可选，微服务场景）[citation:1]
    └── ...
```

## 登录校验

### 会话技术

**会话**：用户打开浏览器，访问 web 服务器的资源，会话建立，知道有一方断开连接，会话结束。在一次会话中可以包含多次请求和响应。

**会话跟踪**：一种维护浏览器状态的方法，服务器需要多次识别多次请求是否来自于同一浏览器，以便在同一次会话的多次请求间共享数据。

**会话跟踪方案**：

- 客户端会话跟踪技术：Cookie

- 服务端会话跟踪技术：Session

- 令牌技术

### Cookie

优点：HTTP 协议中支持的技术

缺点：移动端 APP 无法使用 Cookie；不安全，用户可以自己禁用 Cookie；Cookie 不能跨域

```java
@GetMapping("/setCookie")
public Result setCookie(HttpServletResponse response){
  response.addCookie(new Cookie("login_username", "123456"));
  return Result.success();
}

@GetMapping("/getCookie")
public Result getCookie(HttpServletResponse response){
  Cookie[] cookies = request.getCookies();
  for(Cookie cookie : cookies) {
    if(cookie.getName().equals("login_username")){
      System.out.println("login_username: " + cookie.getValue());
    }
  }
  return Result.success();
}
```

::tip

Cookie 会话跟踪方案的原理：

- 响应头：Set-Cookie

- 请求头：Cookie

::

### Session

优点：存储在服务器端，安全

缺点：服务器集群环境下无法直接使用 Session，同时还具有 Cookie 的缺点

```java
@GetMapping("/setSession")
public Result setSession(HttpSession session){
  log.info("HttpSession-setSession: {}", session.hashCode());

  session.setAttribute("loginUser", "123456")
  return Result.success();
}

@GetMapping("/getSession")
public Result getSession(HttpSession session){
  log.info("HttpSession-getSession: {}", session.hashCode());

  Object loginUser = session.getAttribute("loginUser");
  log.info("loginUser: {}", loginUser);
  return Result.success();
}
```

::tip

Cookie 会话跟踪方案的原理：基于 Cookie 的（Set-Cookie, Cookie）

::

### JWT 令牌

优点：支持 PC 端，移动端；解决集群环境下的认证问题；减轻服务器端存储压力

缺点：需要自己实现

**JWT 令牌**(JSON Web Token) 定义了一种简洁的、自包含的格式，用于在通信双方以 json 数据格式安全的传输信息

- 第一部分：**Header**(头)，记录令牌类型、签名算法等。例如：`{"alg":"HS256", "type":"JWT"}`，通过 Base64 编码

- 第二部分：**Payload**(有效载荷)，携带一些自定义信息、默认信息等。例如：`{"id": "1", "username":"Tom"}`，通过 Base64 编码

- 第三部分：**Signature**(签名)，放置 Token 被篡改，确保安全性。将 header、payload 融入，并加入指定密钥，通过指定签名算法计算而来

**使用步骤**：

1. 引入 jjwt 依赖

```xml
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt</artifactId>
  <version>0.9.1</version>
</dependency>
```

2. 调用官方提供的工具类 Jwts 来生成或解析 jwt 令牌

::code-group

```java [生成令牌]
@Test
public void testGenJwt() {
  Map<String, Object> claims = new HashMap<>();
  claims.put("id", 10);
  claims.put("username", "test");
  String jwt = Jwts.builder().signWith(SignatureAlgorithm.HS256, "SVRIRULNQQ==") // 指定加密算法与密钥
    .addClaims(claims)
    .setExpiration(new Date(System.currentTimeMillis() + 12 * 3600 * 1000)) // 指定有效期
    .compact();
  System.out.println(jwt)
}
```

```java [解析令牌]
@Test
public void testGenJwt() {
  String jwtToken = "exJoe......";
  Claims claims = Jwts.parser()
    .setSigningKey("SVRIRULNQQ==")
    .parseClaimsJws(jwtToken)
    .getBody();
  System.out.println(claims)
}
```

::

### Filter 过滤器

**过滤器**(Filter)可以把对资源的请求拦截下来，从而实现一些特殊的功能。比如：登录校验，统一编码处理，敏感字符处理等。

**使用步骤：**

1. 定义一个类，实现 Filter 接口，并实现其所有方法（init、doFilter、destroy）

2. Filter 类上加 `@WebFilter` 注解，配置拦截路径

```java
@WebFilter(urlPatterns = "/*") // 拦截所有请求
public class DemoFilter implements Filter {
  // 初始化方法，web 服务器启动，创建 Filter 实例时调用，只调用一次
  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
    System.out.println("init ...");
  }

  // 拦截到请求时，调用该方法
  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws Exception {
    System.out.print("拦截到了请求 ...");
    chain.doFilter(servletRequest, servletResponse); // 放行
  }

  // 销毁方法，web 服务器关闭时调用，只调用一次
  @Override
  public void destory() {
    System.out.println("destory ...");
  }
}
```

3. 启动类上加 `@ServletComponentScan` 开启 Servlet 组件支持

```java
@ServletComponentScan
@SpringBootApplication
public class XxxApplication {

}
```

::warning

如果过滤器中不执行放行操作，过滤器拦截到请求之后，就不会访问对应的资源

::

|   过滤路径   | urlPatterns 值 |                  含义                  |
| :----------: | :------------: | :------------------------------------: |
| 拦截具体路径 |    `/login`    |  只有访问 `/login` 路径时，才会被拦截  |
|   目录拦截   |   `/emps/*`    | 访问 `/emps/` 下的所有资源，都会被拦截 |
|   拦截所有   |      `/*`      |        访问所有资源，都会被拦截        |

::detail

#title
具体示例：登录过滤校验
#default

```java
@WebFilter(urlPatterns = "/*") // 拦截所有请求
public class TokenFilter implements Filter {
  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws Exception {
    HttpServletRequest request = (HttpServletRequest) servletRequest;
    HttpServletResponse response = (HttpServletResponse) servletResponse;

    // 1. 获取到请求路径
    String requestURI = request.getRequestURI();

    // 2. 判断是否是登录请求，如果路径中包含 /login，说明是登录操作，放行
    if(requestURI.contains("/login")){
      filterChain.doFilter(request, response);
      return;
    }

    // 3. 获取请求头中的 token
    String token = request.getHeader("token");

    // 4. 判断 token 是否存在，如果不存在，说明用户没有登录，返回错误信息（401 状态码）
    if(token == null || token.isEmpty()){
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }

    // 5. 如果 token 存在，校验令牌，如果校验失败 -> 返回错误信息（401 状态码）
    try {
      JwtUtils.parseToken(token); // 手动实现的校验方法
    } catch (Exception e){
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }

    // 6. 校验通过，放行
    chain.doFilter(servletRequest, servletResponse);
  }
}
```

::

::tip

放行后访问对应资源，资源访问完成后，还会回到 Filter 中，并可继续执行放行后逻辑代码

::

::tip

过滤器链

一个 web 应用中，可以配置多个过滤器，这多个过滤器就形成了一个过滤器链

::

### Interceptor 拦截器

**拦截器**(Interceptor) 是一种动态拦截方法调用的机制，类似于过滤器。Spring 框架中提供的，主要用来动态拦截控制器方法的执行，在指定的方法调用前后，根据业务需要执行预先设定的代码。

**使用步骤：**

1. 定义拦截器，实现 HandlerInterceptor 接口，并实现其所有方法

2. 注册拦截器

```java
@Component
public class DemoInterceptor implements HandlerInterceptor {
  // 目标资源方法执行前执行，返回 true时代表放行；返回 false 时代表不放行
  @Override
  public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception{
    return true;
  }

  // 目标资源方法执行后执行
  @Override
  public void postHandle(HttpServletRequest req, HttpServletResponse resp, Object handler, ModelAndView mv) throws Exception{
    System.out.println("preHandle ...");
  }

  // 视图渲染完毕后执行
  @Override
  public void afterCompletion(HttpServletRequest req, HttpServletResponse resp, Object handler, ModelAndView mv) throws Exception{
    System.out.println("afterCompletion ...");
  }
}
```

3. 拦截器配置

```java

@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Autowwired
  private DemoInterceptor demoInterceptor;

  @Override
  public void addInterceptors(InterceptorRegistry registry){
    registry.addInterceptor(demoInterceptor).addPathPatterns("/**");
  }
}

```

|  拦截路径   |          含义           |                             含义                              |
| :---------: | :---------------------: | :-----------------------------------------------------------: |
|    `/*`     |        一级路径         |    能匹配 `/depts`、`/emp`、`/login`，不能匹配 `/depts/1`     |
|    `/**`    |       任意级路径        |            能匹配 `/depts`、`depts/1`、`depts/1/2`            |
| `/depts/*`  |  `/depts` 下的一级路径  |       能匹配 `/depts`，不能匹配 `/depts/1/2`、`/depts`        |
| `/depts/**` | `/depts` 下的任意级路径 | 能匹配 `/depts`、`/depts/1`、`/depts/1/2`，不能匹配 `/emps/1` |

::detail

#title
具体示例：登录过滤校验

#default

```java
@Component
public class TokenInterceptor implements HandlerInterceptor {
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
    // 1. 获取到请求路径
    String requestURI = request.getRequestURI();

    // 2. 判断是否是登录请求，如果路径中包含 /login，说明是登录操作，放行
    if(requestURI.contains("/login")){
      return true;
    }

    // 3. 获取请求头中的 token
    String token = request.getHeader("token");

    // 4. 判断 token 是否存在，如果不存在，说明用户没有登录，返回错误信息（401 状态码）
    if(token == null || token.isEmpty()){
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return false;
    }

    // 5. 如果 token 存在，校验令牌，如果校验失败 -> 返回错误信息（401 状态码）
    try {
      JwtUtils.parseToken(token); // 手动实现的校验方法
    } catch (Exception e){
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return false;
    }

    // 6. 校验通过，放行
    return true;
  }

}
```

::

::tip

`registry.addPathPatterns()` 用于设置需要拦截的请求路径

`registry.excludePathPatterns()` 用于设置不需要拦截的请求路径

::

::warning

Filter 与 Interceptor 优先级

浏览器发送请求到服务器时，先经过 Filter 过滤器，再经过 Interceptor 拦截器

::

::warning

Filter 与 Interceptor 区别

- 接口规范不同：过滤器需要实现 Filter 接口，而拦截器需要实现 HandlerInterceptor 接口

- 拦截范围不同：过滤器 Filter 会拦截所有的资源，而 Interceptor 只会拦截 Spring 环境中的资源

::

## Spring Cache 缓存

Spring Cache 是一个框架，实现了基于注解的缓存功能，只需要简单的加一个注解，就能实现缓存功能

Spring Cache 提供了一层抽象，底层可以切换不同的缓存实现，例如：

- EHCache

- Caffeine

- Redis

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

### 入门

1. 在启动类上开启缓存:

```java
@EnableCaching
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

2. 在添加或修改数据上添加 `@CachePut`:

```java
@CachePut(value = "dish", key = "#dish.id")
public DishVO update(Dish dish) {
    dishMapper.update(dish);

    return dishMapper.selectById(dish.getId());
}
```

3. 在查询方法上添加 `@Cacheable`

```java
@Cacheable(value = "dish", key = "#id")
public DishVO getById(Long id) {
    System.out.println("查询数据库");

    return dishMapper.selectById(id);
}
```

4. 在删除方法上添加 `@CacheEvict`

```java
@CacheEvict(value = "dish", key = "#id")
public void delete(Long id) {
    dishMapper.deleteById(id);
}
```

::tip

`@CachePut`、`@Cacheable`、`@CacheEvict` 的第一个参数 value 为缓存名称，可以理解为给这一组缓存起一个名字

第二个参数 key 表示具体的缓存 Key，最终拼接出的 key 为 `value::key`

当第二个参数 key 为 `#xxx` (xxx 为任意字符串)时，xxx 对应方法的参数，`#user.id` 代表参数 user 的 id 属性；

当第二个参数 key 为 `#p0` 时，p0 对应方法的第一个参数，`#p0.id` 代表第一个参数的 id 属性；

当第二个参数 key 为 `#result` 时， result 对应方法的返回值，`#result.id` 代表返回值的 id 属性(`@Cacheable` 无法使用)；

当配置为 `@CacheEvict(value = "dish", allEntries = true)` 时，代表删除 dish 组下所有的缓存

::

### @EnableCaching

用于开启缓存注解功能，通常加载启动类上

### @Cacheable

在方法执行前先查询缓存中是否有数据，如果有数据，则直接返回缓存数据；如果没有缓存数据，调用方法并将方法返回值放到缓存中

### @CachePut

将方法的返回值放到缓存中

### @CacheEvict

将一条或多条数据从缓存中删除

## Spring Task

Spring Task 是 Spring 框架提供的任务调度工具，可以按照约定的时间自动执行某个代码逻辑

**使用步骤：**

1. 导入 maven 坐标 spring-contexr

2. 启动类添加注解 `@EnableScheduling` 开启任务调度

3. 自定义定时任务类

```java
@Component
@Slf4j
public class MyTask {
  // 定时任务，每隔 5 秒触发一次
  @Scheduled(cron = "0/5 * * * * ?")
  public void executeTask(){
    log.info("定时任务开始执行: {}", new Date())
  }

}
```

### cron 表达式

cron 表达是其实就是一个字符串，通过 cron 表达式可以**定义任务触发的时间**

- 构成规则：分为 6 或 7 个域，由空格分隔开，每个域代表一个含义(秒、分钟、小时、日、月、周、年(可选))

::detail

#title
具体示例
#default

2022 年 10 月 12 日上午 9 点整对应的 cron 表达式为：`0 0 9 12 10 ? 2022`

::

## Spring Cloud

Spring Cloud 是目前国内适用最广泛的微服务框架，集成了各种微服务功能组件，并基于 SpringBoot 实现了这些组件的自动装配，从而提供了良好的开箱即用体验

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-dependencies</artifactId>
</dependency>
```

::tip

微服务

微服务是一种软件架构风格，它是以专注于单一职责的很多小型项目为基础，组合出复杂的大型应用

- **单一架构**: 将业务的所有功能集中在一个项目中开发，打成一个包部署
  - 优点: 具有架构简单，部署成本低
  - 缺点: 但同时具有团队协作成本高、系统发布效率低、系统可用性差的缺点
  - 适用范围: 功能相对简单，规模较小的项目

- **微服务架构**: 把单体架构中的功能模块拆分为多个独立项目

::

### 服务拆分原则

对于创业型项目: 先采用单体架构，快速开发，快速试错。随着规模扩大，逐渐拆分

对于确定的大型项目: 资金明确，可以直接选择微服务架构，避免后续拆分的麻烦

从拆分目标来说，要做到:

- **高内聚**: 每个微服务的职责要尽量单一，包含的业务相互关联度高、完整度高

- **低耦合**: 每个微服务的功能要相对独立，尽量减少对其它微服务的依赖

从拆分方式来说，一般包含两种方式:

- **纵向拆分**: 按照业务模块来拆分

- **横向拆分**: 抽取公共服务，提高复用性

微服务的工程项目结构有两种:

- **独立 Project**: 每一个服务都是一个独立的项目，可以有不同的 git 仓库

- **Maven 集合**: 一个主项目下分为不同的模块，各个模块都是一个项目，可以各自启动

### 改造 Spring Boot

从 Spring Boot 项目改造成微服务时，需要对不同的微服务项目设置不同的端口的名称

```yml
server:
  port: 8080
spring:
  application:
    name: hm-service # 微服务名称
```

### 远程调用

拆分后，某些数据在不同服务，无法直接调用本地方法查询数据

Spring 给我们提供了一个 RestTemplate 工具，可以方便的实现 Http 请求的发送

1. 注入 ResTemplate 到 Spring 容器

```java
@Bean
public RestTemplate restTemplate() {
  return new RestTemplate();
}
```

2. 发起远程调用

```java
public <T> ResponseEntity exchange(
  String url, // 请求路径
  HttpMethod method, // 请求方式
  @Nullable HttpEntity<?> requestEntity, // 请求实体，可以为空
  Class<T> responseType, // 返回值类型
  Map<String, ?> uriVariables // 请求参数
)

```

::detail

#title
具体使用示例
#default

```java
@Service
@RequiredArgsConstructor
public class CartServiceImpl extends ServiceImpl<CartMapper, Cart> implements ICartService {

  private final RestTemplate restTemplate;

  private void handleCartItems(List<CartVO> vos) {
    Set<Long> itemIds = vos.stream().map(CartVO::getItemId).collect(Collectors.toSet()); // 获取商品 id

    // List<ItemDTO> items = itemService.queryItemByIds(itemIds); // 单一架构内查询商品

    // 利用 RestTemplate 发起 http 请求，得到 http 的响应
    ResponseEntity<List<ItemDTO>> response = restTemplate.exchange(
      "http://localhost:8081/items?ids={ids}",
      HttpMethod.GET,
      null,
      new ParameterizedTypeReference<List<ItemDTO>>() {},
      Map.of("ids", CollUtil.join(itemIds, ","))
    );

    // 解析响应
    if(response.getStatusCode().is2xxSuccessful()) {
      return; // 查询失败
    }
    List<ItemDTO> items = response.getBody();

    // ...
  }
}
```

::

## Nacos 注册中心

在服务治理中，存在服务提供者，服务消费者，注册中心

- **服务提供者**: 暴露服务接口，供其它服务调用

- **服务消费者**: 调用其它服务提供的接口

- **注册中心**: 记录并监控微服务各示例状态，推送服务变更信息

服务提供者会在启动时注册自己信息到注册中心，消费者可以从注册中兴订阅和拉取服务信息

服务提供者通过心跳机制向注册中心报告自己的健康状态，当心跳异常时注册中心会将异常服务剔除，并痛殴告知订阅了该服务的消费者

消费者可以通过负载均衡算法，从多个实例中选择一个

Nacos 是目前国内企业中占比最多的注册中心组件。它是阿里巴巴的产品，目前已经加入 Spring Cloud Alibaba 中

官网地址: https://nacos.io/

### 服务注册

服务注册步骤如下:

1. 引入 nacos discovery 依赖

```xml
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

2. 配置 Nacos 地址

```yml
# application.yml
spring:
  application:
    name: item-service # 服务名称
  cloud:
    nacos:
      server-addr: 192.168.150.101:8848 # nacos 地址
```

### 服务发现

消费者需要连接 nacos 以拉取和订阅服务，因此服务发现的前两步与服务注册是一样，后面再加上服务调用即可:

1. 引入 nacos discovery 依赖

2. 配置 Nacos 地址

3. 服务发现

```java
private final DiscoveryClient discoveryClient:

private void handleCartItems(List<CartVO> vos) {
  // 根据服务名称，拉取服务的实例列表
  List<ServiceInstance> instances = discoveryClient.getInstances("实例名称");
  if(CollUtil.isEmpty(instances)) {
    return;
  }

  // 负载均衡，随机挑选一个实例
  ServiceInstance instance = instances.get(RandomUtil.randomInt(instances.size()));

  // 获取实例的 IP 和端口
  URI uri = instance.getUri();

  // 业务逻辑
  ResponseEntity<List<ItemDTO>> response = restTemplate.exchange(
    uri + "/item?ids={idss}",
    HttpMethod.GET,
    null,
    new ParameterizedTypeReference<List<ItemDTO>>() {},
    Map.of("ids", CollUtil.join(itemIds, ","))
  );

  // 解析响应
  if(response.getStatusCode().is2xxSuccessful()) {
    return; // 查询失败
  }
  List<ItemDTO> items = response.getBody();
}
```

### 配置共享

由于微服务重复配置过多，维护成本高；业务配置经常变动时，每次修改都要重启服务；当网关路由配置写死，如果变更要重启网关。可以使用 Nacos 实现配置管理

1. 添加配置到 Nacos: 在 Nacos 控制台中即可设置共享配置

2. 引入依赖

```xml
<!-- nacos 配置管理 -->
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>

<!-- 读取 bootstrap 文件 -->
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-bootstrap</artifactId>
</dependency>
```

3. 新建 bootstrap.yaml

```yaml
# bootstrap.yaml

spring:
  application:
    name: xxx-service # 服务名称
  profiles:
    active: dev
  cloud:
    nacos:
      server-addr: 192.168.150.101 # nacos 地址
      config:
        file-extension: yaml # 共享配置文件后缀名
        shared-confids: # 共享配置
          - dataId: shared-xxx.yaml # 共享配置 Data ID
          - dataId: shared-xxx.yaml # 共享配置 Data ID
```

### 配置热更新

**配置热更新**: 当修改配置文件中的配置时，微服务无需重启即可使配置生效

条件:

- nacos 中要有一个与微服务名有关的配置文件: `[spring.application.name]-[spring.active.profile].[file-extension]`(`[微服务名称]-[项目 profile(可选)].[文件后缀名]`)
  - 在 nacos 控制台中进行配置，例如 xxx-service.yaml

- 微服务中要以特定方式读取需要热更新的配置属性

::code-group

```java [配置方式一]
@Data
@Component
@configurationProperties(prefix = "xxx.xxx")
public class CartProperties {
  private int maxItems;
}
```

```java [配置方式二]
@Data
@Component
@RefreshScope
public class CartProperties {
  @Value("${xxx.xxx.maxItems}")
  private int maxItems;
}
```

::

### 动态路由

::danger

该部分尚未完工!

::

## OpenFeign

OpenFeign 是一个声明式的 http 客户端，是 Spring Cloud 在 Eureka 公司开源的 Feigh 基础上改造而来，其作用就是基于 SpringMVC 的常见注解，帮我们优雅的实现 http 请求的发送

OpenFeigh 已被 Spring Cloud 自动装配，实现起来非常简单

1. 引入依赖，包括 OpenFeign 和负载均衡组件 SpringCloudLoadBalancer

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
```

2. 通过在启动类上添加 `@EnableFeignClients` 注解，启用 OpenFeign 功能

```java
@EnableFeighClients
@SpringBootApplication
public class XxxApplication {
  // ...
}
```

3. 编写 FeignClient

```java
@FeignClient(name = "实例名称")
public interface XxxClient {

  @GetMapping("/items")
  List<ItemDTO> queryItemByIds(@RequestParam("ids") Collection<Long> ids);
}
```

4. 使用 FeignClient，实现远程调用

```java
List<ItemDTO> items = xxxClient.queryItemByIds(List.of(1,2,3));
```

### 连接池

OpenFeign 对 Http 请求做了优雅的封装，不过其底层发起 http 请求，依赖于其它的框架。这些框架可以自己选择，包括以下三种:

- **HttpURLConnection**: 默认实现，不支持连接池

- **Apache HttpClient**: 支持连接池

- **OKHttp**: 支持连接池

OpenFeign 整合 OKHttp 的步骤如下:

1. 引入依赖

```xml
<dependency>
  <groupId>io.github.openfeign</groupId>
  <artifactId>feign-okhttp</artifactId>
</dependency>
```

2. 开启连接池功能

```yml
feign:
  okhttp:
    enabled: true
```

### 最佳实践

针对 OpenFeign 的最佳项目结构，是将 Feign 客户端接口抽取为独立的 API 模块，供所有消费者服务依赖，而不是在每个服务里重复定义

```text
project-parent/
├── xxx-api/                 # 独立 API 模块
│   ├── src/main/java/
│   │   └── com/example/api/
│   │       ├── client/       # Feign 客户端接口
│   │       │   └── UserClient.java
│   │       ├── dto/          # 接口相关的 DTO
│   │       │   └── UserDTO.java
│   │       ├── fallback/     # 降级处理类
│   │       │   └── UserFallbackFactory.java
│   │       └── config/       # 默认 Feign 配置
│   │           └── DefaultFeignConfig.java
│   └── pom.xml               # 引入 openfeign、loadbalancer 依赖
├── user-service/             # 服务提供者
└── order-service/            # 服务消费者，依赖 xxx-api
```

当定义的 FeignClient 不在 SpringBootApplication 的扫描包范围时，这些 FeignClient 无法使用。有两种方式解决:

- **指定 FeignCLient 所在包**: `@EnableFeignClients(basePackages = "com.xxx.api.client")`

- **指定 FeignClient 字节码**: `@EnableFeignClients(clients = {XxxClient.class})`

### 日志输出

OpenFeign 只会在 FeignClient 所在包的日志级别为 **DEBUG**，才会输出日志。而且其日志级别有 4 级:

- **NONE**: 不记录任何日志信息，这是默认值

- **BASIC**: 仅记录请求的方法，URL 以及响应状态码和执行时间

- **HEADERS**: 在 BASIC 的基础上，额外记录了请求和响应的头信息

- **FULL**: 记录所有请求和响应的明细，包括头信息、请求体、元数据

要自定义日志级别需要声明一个类型为 Logger.Level 的 Bean，在其中定义日志级别:

```java
public class DefaultFeignConfig {
  @Bean
  public Logger.Level feignLogLevel() {
    return Logger.Level.FULL;
  }
}
```

但此时这个 Bean 并未生效，要想配置某个 FeignClient 的日志，可以在 `@FeignClient` 注解中声明:

```java
@FeignClient(value = "实例名称", configuration = DefaultFeignConfig.class)
```

如果想要全局配置，让所有 FeignClient 都按照这个日志配置，则需要在 `@EnableFeignCLients` 注解中声明:

```java
@EnableFeignClients(defaultConfiguration = DefaultFeignConfig.class)
```

## 网关

网关就是网络的关口，负责请求的路由、转发、身份校验

在 SpringCloud 中网关的实现包括两种:

- Spring Cloud Gateway: Spring 官方出品，基于 WebFlux 响应式编程，无需调优即可获得优异性能

- Netfilx Zuul: Netfix 出品，基于 Servlet 的阻塞式编程，需要调优才能获得与 SpringCloudGateway 类似的性能

1. 创建网关模块

2. 引入网关依赖

```xml
<!-- 网关 -->
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<!-- nacos discovery -->
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
<!-- 负载均衡 -->
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
```

3. 编写启动类

```java
// GatwayApplication.java

@SpringBootApplication
public class GatewayApplication {
  public static void main(String[] args) {
    SpringApplication.run(GatewayApplication.class, args)
  }
}
```

4. 配置路由规则

```yml
server:
  port: 8080
spring:
  application:
    name: gateway
  cloud:
    nacos:
      server-addr: 192.168.150.101:8848
    gateway:
      routes:
        - id: xxx # 路由规则 id，自定义，唯一
          uri: lb://xxx-service # 路由目标微服务，lb 代表负载均衡
          predicates: # 路由断言，判断请求是否符合规则，符合则路由到目标
            - Path=/xxx/** # 以请求路径做判断
        - id: item
          uri: lb://item-service
          predicates:
            - Path=/items/**
      default-filters: # 通用过滤器
        - xxx # 过滤器逻辑
```

### 路由属性

网关路由对应的 Java 类型是 RouteDefinition，其中常见的属性有:

- id: 路由唯一标识

- uri: 路由目标地址

- predicates: 路由断言，判断请求是否符合当前路由

|          名称          |              说明               |                                                   示例                                                   |
| :--------------------: | :-----------------------------: | :------------------------------------------------------------------------------------------------------: |
|         After          |      是某个时间点后的请求       |                         `- After=2037-01-20T17:42:47.789-07:00[America/Denver]`                          |
|         Before         |     是某个时间点之前的请求      |                         `- Before=2031-04-13T15:14:47.433+08:00[Asia/Shanghai]`                          |
|        Between         |    是某两个时间点之前的请求     | `- Between=2037-01-20T17:42:47.789-07:00[America/Denver], 2037-01-21T17:42:47.789-07:00[America/Denver]` |
|         Cookie         |     请求必须包含某些 cookie     |                                        `- Cookie=chocolate, ch.p`                                        |
|         Header         |     请求必须包含某些 header     |                                       `- Header=X-Request-Id, \d+`                                       |
|          Host          | 请求必须是访问某个 host（域名） |                                 `- Host=.somehost.org,.anotherhost.org`                                  |
|         Method         |     请求方式必须是指定方式      |                                           `- Method=GET,POST`                                            |
|          Path          |    请求路径必须符合指定规则     |                                     `- Path=/red/{segment},/blue/**`                                     |
|         Query          |    请求参数必须包含指定参数     |                                   `- Query=name,Jack或者- Query=name`                                    |
|       RemoteAddr       |    请求者的ip必须是指定范围     |                                      `- RemoteAddr=192.168.1.1/24`                                       |
|         Weight         |            权重处理             |                                           `- Weight=group1, 2`                                           |
| XForwarded Remote Addr |    基于请求的来源 IP 做判断     |                                 `- XForwardedRemoteAddr=192.168.1.1/24`                                  |

- filters: 路由过滤器，对请求或响应做特殊处理

|         名称         |             说明             |                        示例                        |
| :------------------: | :--------------------------: | :------------------------------------------------: |
|   AddRequestHeader   |   给当前请求添加一个请求头   |    `- AddRequestHeader=headerName,headerValue`     |
| RemoveRequestHeader  |    移除请求中的一个请求头    |         `- RemoveRequestHeader=headerName`         |
|  AddResponseHeader   |  给响应结果中添加一个响应头  |    `- AddResponseHeader=headerName,headerValue`    |
| RemoveResponseHeader | 从响应结果中移除有一个响应头 |        `- RemoveResponseHeader=headerName`         |
|     RewritePath      |         请求路径重写         | `- RewritePath=/red/?(?<segment>.\*), /${segment}` |
|     StripPrefix      |  去除请求路径中的 N 段前缀   |    `- StripPrefix=1，则路径/a/b转发时只保留/b`     |
|         ...          |

### 自定义过滤器

网关过滤器有两种，分别是:

- GatewayFilter: 路由过滤器，作用于任意指定的路由；默认不生效，要配置到路由后生效
  - 定义 GatewayFilter 需要实现 AbstractGatewayFilterFactory，同时需要进行配置

- GlobalFilter: 全局过滤器，作用范围是所有路由；声明后自动生效
  - 定义 GlobalFilter 需要实现 GlobalFilter 接口

两种过滤器的过滤方法签名完全一致

::code-group

```java [MyGlobalFilter.java]
@Component
public class MyGlobalFilter implements GlobalFilter, Ordered {

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    ServerHttpRequest request = exchange.getRequest(); // 获取请求
    HttpHeaders headers = request.getHeaders(); // 获取请求头
    System.out.println("headers = " + headers);

    return chain.filter(exchange); // 放行
  }

  @Override
  public int getOrder() {
    return 0; // 定义过滤器顺序，值越小，优先级越高
  }
}
```

```java [PrintAnyGatewayFilterFactory.java]
// 类名称后缀必须为 GatewayFilterFactory，方便配置使用
@Component
public class PrintAnyGatewayFilterFactory extends AbstractGatewayFilterFactory<Object> {
  @Override
  public GatewayFilter apply(Object config) {
    return new GatewayFilter() {
      @Override
      public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        System.out.println("print any filter running"); // 编写过滤器逻辑

        return chain.filter(exchange); // 放行
      }
    }

    // 编写带顺序的 filter
    // return new OrderedGatewayFilter(new GatewayFilter() {
    //   @Override
    //   public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    //     System.out.println("print any filter running");

    //     return chain.filter(exchange); // 放行
    //   }
    // }, 1);
  }
}
```

```yml [application.yml]
spring:
  cloud:
    gateway:
      routes:
        - id: xxx
          uri: lb://xxx-service
          predicates:
            - Path=/xxx/**
      default-filters:
        - PrintAny
```

::

::detail

#title
定义带参数的 GatewayFilter
#default

::code-group

```java [PrintAnyGatewayFilterFactory.java]
@Component
public class PrintAnyGatewayFilterFactory extends AbstractGatewayFilterFactory<Config> {
  @Override
  public GatewayFilter apply(Config config) {
    return new GatewayFilter() {
      @Override
      public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String a = config.getA();
        String b = config.getB();
        String c = config.getC();

        return chain.filter(exchange); // 放行
      }
    }
  }

  // 自定义配置属性，成员变量名称很重要
  public static class Config {
    private String a;
    private String b;
    private String c;
  }

  // 将变量名称依次返回，顺序很重要，将来读取参数时需要按顺序读取
  @Override
  public List<String> shortcutFieldOrder() {
    return List.of("a", "b", "c");
  }

  // 将 Config 字节码传递给父类，父类负责帮我们读取 yml 配置
  public PrintAnyGatewayFilterFactory() {
    super(Config.class);
  }
}
```

```yml [application.yml]
spring:
  cloud:
    gateway:
      default-filters:
        - PrintAny=1,2,3
```

::

::

### 登录校验

::code-group

```java [AuthProperties.java]
// 在 xxx-gateway 网关服务下配置读取需要鉴权的路径与不需要鉴权的路径

@Data
@Component
@ConfigurationProperties(prefix = "xxx.auth")
public class AuthProperties {
  private List<String> includePaths;
  private List<String> excludePaths;
}
```

```yml [application.yml]
# 在 xxx-gateway 网关服务下配置需要排除的路径
xxx:
  auth:
    excludePaths:
      - /search/**
      - /users/login
      - /items/**
```

```java [AuthGlobalFilter.java]
// xxx-gateway 网关服务下进行处理

@Component
@RequiredArgsConstructor
public class AuthGlobalFilter implements GlobalFilter, Ordered {

  private final AuthProperties authProperties; // 注入路径配置

  private final JwtTool jwtTool; // jwt 工具类

  private final AntPathMatcher antPathMatcher = new AntPathMatcher();

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    // 获取 request
    ServerHttpRequest request = exchange.getRequest(); // 获取请求


    // 判断是否需要做登录拦截
    if(isExclude(request.getPath().toString())) {
      return chain.filter(exchange); // 放行
    }

    // 获取 token
    String token = null;
    List<String> headers = request.getHeaders().get("authorization"); // 获取请求头
    if(headers != null && !headers.isEmpty()) {
      token = headers.get(0);
    }

    // 校验并解析 token
    Long userId = null;
    try {
      userId = jwtTool.parseToken(token);
    } catch (UnauthorizedException e) {
      // 拦截，设置响应状态码为 401
      ServerHttpResponse response = exchange.getResponse();
      response.setStatusCode(HttpStatus.UNAUTHORIZED);
      return response.setComplete();
    }

    // 传递用户信息
    String userInfo = userId.toString();
    ServerWebExchange swe = exchange.mutate() // 对下游请求做更改
      .request(builder -> builder.header("user-info", userInfo))
      .build();

    // 放行
    return chain.filter(swe);
  }

  // 判断是否需要排除
  private boolean isExclude(String path) {
    for(String pathPattern : authProperties.getExcludePaths()) {
      if (antPathMatcher.match(pathPattern, path)) {
        return true;
      }
    }
    return false;
  }

  @Override
  public int getOrder() {
    return 0;
  }
}
```

```java [UserContext.java]
// 在 xxx-common 通用模块下定义线程上下文

public class UserContext {
  private static final ThreadLocal<Long> tl = new ThreadLocal<>();

  public static void setUser(Long userId) {
    tl.set(userId);
  }

  public static Long getUser() {
    return tl.get();
  }

  public static void removeUser() {
    tl.remove();
  }
}
```

```java [UserInfoInterceptor.java]
// 在 xxx-common 通用模块下定义拦截器

public class UserInfoInterceptor implements HandlerInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    String userInfo = request.getHeader("user-info") // 获取登录信息

    // 判断是否获取了用户，如果有，存入 ThreadLocal
    if(StrUtil.isNotBlank()) {
      UserContext.setUser(Long.valueOf(userInfo))
    }

    return true; // 放行
  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    UserContext.removeUser(); // 清理用户
  }
}
```

```java [MvcConfig.java]
// 在 xxx-common 通用模块下配置拦截器

@Configuration
@ConditionalOnClass(DispatcherServlet.class) // 判断是否存在 Spring Mvc 环境
public class MvcConfig implements WebMmvcConfigurer {
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new UserInfoInterceptor());
  }
}
```

```factories [spring.factories]
# 在 xxx-common 通用模块下配置拦截器
# /resources/META-INF/spring.factories

org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  com.xxx.common.config.MvcConfig
```

::

::detail

#title
使用 OpenFeign 在微服务之间传递用户信息
#default

OpenFeign 中提供了一个拦截器接口 `RequestInterceptor`，所有由 OpenFeign 发起的请求都会先调用拦截器处理请求

```java
// DefaultFeignConfig.java
// 在 xxx-api 的 OpenFeign 配置类中定义拦截器

public class DefaultFeignConfig {
  // 拦截器配置
  @Bean
  public RequestInterceptor userInfoRequestInterceptor() {
    return new RequestInterceptor() {
      @Override
      public void apply(RequestTemplate template) {
        Long userId = UserContext.getUser();
        if (userId != null) {
          template.header("user-info", userId.toString());
        }
      }
    }
  }
}
```

::
