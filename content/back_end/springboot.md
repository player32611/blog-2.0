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
