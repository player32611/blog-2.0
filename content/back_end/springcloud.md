# Spring Cloud

> Spring Cloud 是目前国内适用最广泛的微服务框架，集成了各种微服务功能组件，并基于 SpringBoot 实现了这些组件的自动装配，从而提供了良好的开箱即用体验

## 微服务

微服务是一种软件架构风格，它是以专注于单一职责的很多小型项目为基础，组合出复杂的大型应用

- **单一架构**: 将业务的所有功能集中在一个项目中开发，打成一个包部署
  - 优点: 具有架构简单，部署成本低
  - 缺点: 但同时具有团队协作成本高、系统发布效率低、系统可用性差的缺点
  - 适用范围: 功能相对简单，规模较小的项目

- **微服务架构**: 把单体架构中的功能模块拆分为多个独立项目

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

从 Spring Boot 项目改造成微服务时，需要先导入依赖

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-dependencies</artifactId>
</dependency>
```

同时对不同的微服务项目设置不同的端口的名称

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

## 微服务保护

### 雪崩问题

微服务调用链路中的某个服务故障，引起整个链路中所有的微服务都不可用，这就是雪崩

当出现以下状况时容易产生雪崩问题:

- 微服务相互调用，服务提供者出现故障或阻塞

- 服务调用者没有做好异常处理，导致自身故障

- 调用链中的所有服务级联失效，导致整个集群故障

解决雪崩问题的常见方案:

- 请求限流: 限制访问微服务的请求的并发量，避免服务因流量激增出现故障

- 线程隔离: 也叫做舱壁模式，模拟船舱隔板的防水原理。通过限定每个业务能使用的线程数量而将故障业务隔离，避免故障扩散

- 服务熔断: 由断路器统计请求的异常比例或慢调用比例，如果超出阈值则会熔断该业务，则拦截该接口的请求；熔断期间，所有请求快速失败，全都走 fallback 逻辑

- 失败处理: 定义 fallback 逻辑，让业务失败时不再抛出异常，而是返回默认数据或友好提示

### 服务保护技术

|          |                    Sentinel                    |           Hystrix            |
| :------: | :--------------------------------------------: | :--------------------------: |
| 线程隔离 |                   信号量隔离                   |    线程池隔离/信号量隔离     |
| 熔断策略 |              基于慢调用或异常比例              |         基于异常比率         |
|   限流   |            基于 QPS ，支持流量整型             |          优先的支持          |
| Fallback |                      支持                      |             支持             |
|  控制台  | 开箱即用，可配置规则，查看秒级监控、机器发现等 |            不完善            |
| 配置方式 |             基于控制台，重启后失效             | 基于注解或配置文件，永久生效 |

## Sentinel

Sentinel 是阿里巴巴开源的一款微服务流量控制组件，官网地址: https://sentinelguard.io/zh-cn/index.html

启动控制台需要从官网中下载 jar 包并运行

在 Spring 项目中整合 sentinel，需要引入 sentinel 依赖:

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

然后修改 application.yml 文件，添加以下内容:

```yml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8090 # sentinel 的控制台地址
```

### 簇点链路

簇点链路，就是单机调用链路，是依次请求进入服务后经过的每一个被 Sentinel 监控的资源链。默认 Sentinel 会监控 SpringMVC 的每一个 EndPoint(http 接口)。限流、熔断等都是针对簇点链路中的资源设置的。而资源名默认就是按接口的请求路径

Restful 风格的 API 请求路径一般都相同，这会导致簇点资源名称重复。因此我们要修改配置，把请求方式 + 请求路径作为簇点资源名称:

```yml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8090
      http-method-specify: true # 开启请求方式前缀
```

### 请求限流

在控制台的簇点链路后面点击流控按钮，即可对其做限流配置

![请求限流](/images/content/back-end/springcloud/request-rate-limiting.png)

### 线程隔离

当商品服务出现阻塞或故障时，调用商品服务的购物车服务可能因此被拖慢，甚至资源耗尽。所以必须限制购物车服务中查询商品这个业务的可用线程数，实现线程隔离

在 sentinel 控制台中，会出现 Feign 接口的簇点资源，点击后面的流控按钮，并设置阈值类型为并发线程数，即可配置线程隔离

### Fallback

1. 将 FeignClient 作为 Sentinel 的簇点资源

```yml
feign:
  sentinel:
    enabled: true
```

2. 配置 FeignClient 的 Fallback

::code-group

```java [ItemClientFallbackFactory.java]
// 自定义类，实现 FallbackFactory，编写对某个 FeignClient 的 fallback 逻辑

@Slf4j
public class ItemClientFallbackFactory implements FallbackFactory<ItemClient> {
  @Override
  public ItemClient create(Throwable throwable) {
    // 创建 UserClient 接口实现类，实现其中的方法，编写失败降级的处理逻辑
    return new ItemClient() {
      @Override
      public List<ItemDTO> queryItemByIds(Collection<Long> ids) {
        log.error("查询商品失败!", throwable)
        return CollUtils.emptyList();
      }

      @Override
      public void deductStock(List<OrderDetailDTO> items) {
        log.error("扣减商品库存失败! ", cause);
        throw new RuntimeException(cause);
      }
    }
  }

  // 将刚刚定义的 ItemClientFallbackFactory 注册为一个 Bean
  @Bean
  public ItemClientFallbackFactory itemClientFallbackFactory() {
    return new ItemClientFallbackFactory()
  }
}
```

```java [ItemClient.java]
// 在 ItemClient 接口中使用 ItemClientFallbackFactory

@FeignClient(value = "item-service", fallbackFactory = ItemClientFallbackFactory.class)
public interface ItemClient {
  @GetMapping("/items")
  List<ItemDTO> queryItemByIds(@RequestParam("ids") Collection<Long> ids);

  @PutMapping("/items/stock/deduct")
  void deductStock(@RequestBody List<OrderDetailDTO> items)
}
```

::

### 服务熔断

思路是由断路器统计服务调用发异常比例、慢请求比例，如果超出阈值则会熔断该服务。即拦截访问该服务的一切请求；而当服务恢复时，断路器会放行访问该请求的服务

在控制台中点击簇点资源后的熔断按钮，即可配置熔断策略

## 分布式事务

在分布式系统中，如果一个业务需要多个服务合作完成，而且每一个服务都有事务，多个事务必须同时成功或 失败，这样的事务就是分布式事务。其中的每个服务的事务就是一个分支事务。整个业务称为全局事务

解决分布式事务，各个子事务之间必须能感知到彼此的事务状态，才能保证状态一致

官网地址: https://seata.apache.org/zh-cn/

### Seata

Seata 致力于提高性能和简单易用的分布式事务服务，为用户打造一站式的分布式解决方案

Seata 事务管理中有三个重要的角色:

- TC(Transcation Coordinator) 事务协调者: 维护全局和分支事务的状态，协调全局事务提交或回滚

- TM(Transaction Manager) 事务管理器: 定义全局事务的范围，开始全局事务，提交或回滚全局事务

- RM(Resource Manager) 资源管理器: 管理分支事务，与 TC 交谈以注册分支事务和报告分支事务的状态

首先要在项目中引入 Seata 依赖:

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
</dependency>
```

::tip

所有需要使用 seata 进行分布式事务管理的微服务都需要引入依赖

::

然后，在 application.yml 中添加配置，让微服务找到 TC 服务地址

```yml
seata:
  registry: # 注册中心的配置，微服务根据这些信息去注册中心获取 TC 服务地址
    type: nacos # 注册中心类型
    nacos:
      application: seara-server # seata 服务名称
      server-addr: nacos:8848 # nacos 地址
      group: DEFAULT_GROUP
      namespace: ""
      username: nacos
      password: nacos
  tx-service-group: my_test_tx_group # 事务分组名称，非常重要，需与配置中心里的映射保持一致
  service:
    vgroup-mapping: # 事务组与 tc 集群的映射关系
      my_test_tx_group: default
```

::tip

所有需要使用 seata 进行分布式事务管理的微服务都需要进行以上配置，建议在 nacos 中共享配置

::

### XA 模式

XA 规范是 X/Open 组织定义的分布式事务处理 (DTP, Distributed Transaction Processing) 标准，XA 规范描述了全局的 TM 与局部的 RM 之间的接口，几乎所有主流的关系型数据库都对 XA 规范提供了支持

::tip

XA 模式的优点

- 事务的强一致性，满足 ACID 原则

- 常用数据库都支持，实现简单，并且没有代码侵入

::

::warning

XA 模式的缺点

- 因为一阶段需要锁定数据库资源，等待二阶段结束才释放，性能较差

- 依赖关系型数据库实现事务

::

1. 修改 application.yml 文件(每个参数事务的微服务)，开启 XA 模式

```yml
seata:
  data-source-proxy-mode: XA
```

2. 给发起全局事务的入口方法添加 `@GlobalTransactional` 注解

```java
@Override
@GlobalTransactional
public Long createOrder(OrderFormDTO order) {
  // 事务逻辑
}
```

### AT 模式

Seata 主推的是 AT 模式，AT 模式同样是分阶段提交的事务模型，不过弥补了 XA 模型中资源锁定周期过长的缺陷

::tip

AT 模式与 XA 模式最大的区别

- XA 模式一阶段不提交事务，而是锁定资源；AT 模式一阶段直接提交，不锁定资源

- XA 模式依赖数据库机制实现回滚；AT 模式利用数据快照实现数据回滚

- XA 模式强一致；AT 模式最终一致

::

实现 AT 模式，需要先在**每个**参与事务的业务数据库中创建 undo_log 表

```sql
-- 注意此处0.3.0+ 增加唯一索引 ux_undo_log
CREATE TABLE `undo_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `branch_id` bigint(20) NOT NULL,
  `xid` varchar(100) NOT NULL,
  `context` varchar(128) NOT NULL,
  `rollback_info` longblob NOT NULL,
  `log_status` int(11) NOT NULL,
  `log_created` datetime NOT NULL,
  `log_modified` datetime NOT NULL,
  `ext` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

然后，对每个参数事务的微服务修改 application.yml 文件，将事务模式修改为 AT 模式

```yml
seata:
  data-source-proxy-mode: AT
```

最后给发起全局事务的入口方法添加 `@GlobalTransactional` 注解

## MQ

MQ(MessageQueue) 消息队列，就是异步调用中的 Broker

同步调用: 时效性强，等到结果后才返回；但扩展性差，性能下降，导致级联失败问题

异步调用: 通常是基于消息通知的方式，包含三个角色:

- 消息发送者: 投递消息的人，就是原来的调用者

- 消息接收者: 接收和处理消息的人，就是原来的服务提供者

- 消息代理: 管理、暂存、转发消息

异步调用具有解除耦合、扩展性强，无需等待、性能好，故障隔离，缓存消息、流量削峰填谷的优势；但不能立即得到调用结果、时效性差，不确定下游业务执行是否成功，且业务安全依赖于 Broker 的可靠性

### MQ 技术选型

|            |        RabbitMQ         |             ActiveMQ              |  RocketMQ  |   Kafka    |
| :--------: | :---------------------: | :-------------------------------: | :--------: | :--------: |
| 公司/社区  |         Rabbit          |              Apache               |    阿里    |   Apache   |
|  开发语言  |         Erlang          |               Java                |    Java    | Scala&Java |
|  协议支持  | AMQP、XMPP、SMTP、STOMP | OpenWire、STOMP、REST、XMPP、AMQP | 自定义协议 | 自定义协议 |
|   可用性   |           高            |               一般                |     高     |     高     |
| 单机吞吐量 |          一般           |                差                 |     高     |   非常高   |
|  消息延迟  |         微秒级          |              毫秒级               |   毫秒级   |  毫秒以内  |
| 消息可靠性 |           高            |               一般                |     高     |    一般    |

::tip

AMQP

**AMQP(Advanced Message Queuing Protocol)**，是用于在应用程序之间传递业务消息的开放流程，该协议与语言和平台无关，更符合微服务中独立性的要求

::

### RabbitMQ

RabbitMQ 整体架构包含:

- publisher: 消息发送者

- consumer: 消息的消费者

- queue: 队列，存储消息

- exchange: 交换机，主要是接收发送者发送的消息，并将消息路由到与其绑定的队列
  - Fanout: 广播交换机，会将消息路由到每个绑定的队列
  - Direct: 定向交换机，根据 RoutingKey 判断路由给哪个路由(如果多个队列具有相同 RoutingKey，则与 Fanout 功能类似)
  - Topic: 话题交换机，RoutingKey 和 bindingKey 可以是多个单词，以 `.` 分割

- virtual-host: 虚拟主机，起到数据隔离的作用

官网地址: https://www.rabbitmq.com/

本地开发可以使用 Docker 启动 RabbitMQ，并启用管理后台:

```bash
docker run -d \
  --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:management
```

- 5672: 应用程序连接 RabbitMQ 的 AMQP 端口。

- 15672: 管理后台端口。

::tip

消息发送的注意事项

- 交换机只能路由消息，无法存储消息

- 交换机只会路由消息给与其绑定的队列，因此队列必须与交换机绑定

::

### Spring AMQP

Spring AMQP 是基于 AMQP 协议定义的一套 API 规范，提供了模板来发送和接收消息。包含两部分，其中 spring-amqp 是基础抽象，spring-rabbit 是底层的默认实现

1. 引入 spring-amqp 依赖

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

2. 在每个微服务中配置 RabbitMQ 服务端信息

```yml
spring:
  rabbitmq:
    host: 192.168.150.101 # 主机名
    port: 5671 # 端口
    virtual-host: /hmall # 虚拟主机名
    username: hmall # 用户名
    password: 123 # 密码
```

3. 使用 `RabbitTemplate` 工具类发送消息

```java
@Autowired
private RabbitTemplate rabbitTemplate;

@Test
public void testSimpleQueue() {
  String queueName = "simple.queue" // 队列名称
  String message = "hello" // 消息内容
  rabbitTemplate.convertAndSend(queueName, message) // 发送消息
}
```

4. 通过注解在方法上声明要监听的队列名称来接收消息

```java
@Slf4j
@Component
public class SpringRabbitListener {

  @RabbitListener(queues = "simple.queue")
  public void listenSimpleQueueMessage(String msg) throws InterruptedException {
    log.info("spring 消费者接收到消息: [" + msg + "]");
  }
}
```

::warning

需先在控制台中创建队列 simple.queue

::

::warning

同一条消息只会被一个消费者处理

::

### Work Queues

Work Queues(任务模型) 就是让多个消费者绑定到一个队列，共同消费队列中的消息，可以加快消息处理速度

::code-group

```java [发送者]
@Test
public void testWorkQueue() {
  String queueName = "work.queue" // 队列名称
  for(int i = 1; i <= 50; i++) {
      String message = "hello" + i // 消息内容
        rabbitTemplate.convertAndSend(queueName, message) // 发送消息
  }
}
```

```java [消费者]
@Slf4j
@Component
public class SpringRabbitListener {

  @RabbitListener(queues = "work.queue")
  public void listenWorkQueue1(String msg) throws InterruptedException {
    log.info("spring 消费者 1 接收到消息: [" + msg + "]" + ", " + LocalTime.now());
    Thread.sleep(25)
  }

  @RabbitListener(queues = "work.queue")
  public void listenWorkQueue2(String msg) throws InterruptedException {
    log.info("spring 消费者 2 接收到消息: [" + msg + "]" + ", " + LocalTime.now());
    Thread.sleep(20)
  }
}
```

::

默认情况下，RabbitMQ 会将消息一次轮询投递给绑定在队列上的每一个消费者。但这并没有考虑到消费者是否已经处理完消息，可能出现消息堆积

因此我们需要修改 application.yml，设置 preFetch 值为 1，确保同一时刻最多投递给消费者 1 条消息

```yml
spring:
  rabbitmq:
    listener:
      simple:
        prefetch: 1 # 每次只能获取一条消息，处理完成才能获取下一个消息
```

::tip

实际代码中只会编写一个消费者，当在不同服务器上部署时才会存在多个消费者

::

### Fanout 交换机

Fanout Exchange 会将接收到的消息路由到每一个跟其绑定的 queue，所以也叫广播模式

::code-group

```java [发送者]
@Test
public void testFanoutQueue() {
  String exchangeName = "hmall.fanout" // 交换机名称
  String message = "hello" // 消息内容
  rabbitTemplate.convertAndSend(exchangeName, null, message) // 发送消息，参数: 交换机名称、Routing Key、消息
}
```

```java [消费者]
@Slf4j
@Component
public class SpringRabbitListener {

  @RabbitListener(queues = "fanout.queue1")
  public void listenFanoutQueue1(String msg) throws InterruptedException {
    log.info("spring 消费者 1 接收到消息: [" + msg + "]" + ", " + LocalTime.now());
  }

  @RabbitListener(queues = "fanout.queue2")
  public void listenFanoutQueue2(String msg) throws InterruptedException {
    log.info("spring 消费者 2 接收到消息: [" + msg + "]" + ", " + LocalTime.now());
  }
}
```

::

::warning

需先将 hmall.fanout 交换机与 fanout.queue1 和 fanout.queue2 队列绑定

::

### Direct 交换机

Direct Exchange 会将接收到的消息根据规则路由到指定的 Queue，因此称为定向路由

- 每一个 Queue 都与 Exchange 设置一个 BindingKey

- 发布者发送消息时，指定消息的 RoutingKey

- Exchange 将消息路由到 BindingKey 与消息 RoutingKey 一致的队列

::code-group

```java [发送者]
@Test
public void testDirectQueue() {
  String exchangeName = "hmall.direct" // 交换机名称
  String message = "hello" // 消息内容
  rabbitTemplate.convertAndSend(exchangeName, "red", message) // 发送消息，参数: 交换机名称、Routing Key、消息
}
```

```java [消费者]
@Slf4j
@Component
public class SpringRabbitListener {

  @RabbitListener(queues = "direct.queue1")
  public void listenDirectQueue1(String msg) throws InterruptedException {
    log.info("spring 消费者 1 接收到消息: [" + msg + "]" + ", " + LocalTime.now());
  }

  @RabbitListener(queues = "direct.queue2")
  public void listenDirectQueue2(String msg) throws InterruptedException {
    log.info("spring 消费者 2 接收到消息: [" + msg + "]" + ", " + LocalTime.now());
  }
}
```

::

::warning

需先将 hmall.direct 交换机与 direct.queue1 和 direct.queue2 队列绑定，并设置 Routing Key

::

### Topic 交换机

Topic Exchange 也是基于 Routing Key 做消息路由，但是 Routing Key 通常是多个单词的组合，并且以 `.` 分割

Queue 与 Exchange 指定 BindingKey 时可以使用通配符

- `#`: 代指 0 个或多个单词

- `*`: 代指一个单词

::code-group

```java [发送者]
@Test
public void testTopicQueue() {
  String exchangeName = "hmall.topic" // 交换机名称
  String message = "hello" // 消息内容
  rabbitTemplate.convertAndSend(exchangeName, "china.news", message) // 发送消息，参数: 交换机名称、Routing Key、消息
}
```

```java [消费者]
@Slf4j
@Component
public class SpringRabbitListener {

  @RabbitListener(queues = "topic.queue1")
  public void listenTopicQueue1(String msg) throws InterruptedException {
    log.info("spring 消费者 1 接收到消息: [" + msg + "]" + ", " + LocalTime.now());
  }

  @RabbitListener(queues = "topic.queue2")
  public void listenTopicQueue2(String msg) throws InterruptedException {
    log.info("spring 消费者 2 接收到消息: [" + msg + "]" + ", " + LocalTime.now());
  }
}
```

::

::warning

需先将 hmall.topic 交换机与 topic.queue1 和 topic.queue2 队列绑定，并设置 Routing Key (`chain.#`、`#.news`)

::

### 代码声明队列交换机

Spring AMQP 提供了几个类，用来声明队列、交换机及其绑定关系:

- Queue: 用于声明队列，可以用工厂类 QueueBuilder 构建

- Exchange: 用于声明交换机，可以用工厂类 ExchangeBuilder 构建

- Binding: 用于声明队列和交换机的绑定关系，可以用工厂类 BindingBuilder 构建

```java
@Configuration
public class FanoutConfig {
  // 声明 FanoutExchange 交换机
  @Bean
  public FanoutExchange fanoutExchange() {
    // return ExchangeBuilder.fanoutExchange("hmall.fanout").build();
    return new FanoutExchange("hmall.fanout");
  }

  // 声明队列
  @Bean
  public Queue fanoutQueue1() {
    // return QueueBuilder.durable("hmall.fanout").build();
    return new Queue("fanout.queue1");
  }

  // 绑定队列和交换机
  @Bean
  public Binding bindingQueue(Queue fanoutQueue, FanoutExchange fanoutExchange) {
    return BindingBuilder.bind(fanoutQueue).to(fanoutExchange)
  }
}
```

::tip

基于注解声明队列和交换机

Spring AMQP 还提供了基于 `@RabbitListener` 注解来声明队列和交换机的方式

```java
@RabbitListener(bindings = @QueueBinding(
  value = @Queue(name = "direct.queue1"),
  exchange = @Exchange(name = "itcast.direct", type = ExchangeTypes.DIRECT),
  key = {"red", "blue"}
))
public void listenDirectQueue1(String msg) {
  System.out.println("消费者 1 接收到 Direct 消息: [" + msg + "]");
}
```

::

### 消息转换器

Spring 对消息对象的处理是由 org.springframework.amqp.support.converter.MessageConverter 来处理的。而默认实现是 SimpleMessageConverter，基于 JDK 的 ObjectOutputStream 完成序列化。但存在安全风险，具有消息太大，可读性差的问题

```java
@Test
public void testSendObject() {
  // 准备消息
  Map<String, Object> msg = new HashMap<>(2);
  msg.put("name", "Jack");
  msg.put("age", 21);

  rabbitTemplate.converAndSend("object.queue", msg); // 发送消息
}
```

建议采用 JSON 序列化代替默认的 JDK 序列化

::code-group

```xml [pom.xml]
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
</dependency>
```

```java [MqConfig.java]
@Configuration
public class MqConfig {

  @Bean
  public MessageConverter messageConverter() {
    return new Jackson2JsonMessageConverter();
  }
}
```

::

### MQ 高级

::danger

该部分尚未完工

::

## Elasticsearch 与 Kibana

Elasticsearch 是一个开源的、分布式的搜索和分析引擎，常用于对大规模文本数据进行全文搜索、结构化搜索和数据分析

官网地址: https://www.elastic.co/cn/elasticsearch

Kibana 是一个开源的数据可视化和探索工具，主要用于配合 Elasticsearch 使用

::tip

Lucene

Lucene 是一个 Java 语言的搜索引擎类库，是 Apache 公司的顶级项目，是 Elasticsearch、Solr 等搜索系统的底层核心

官网地址: https://lucene.apache.org/

::

::tip

Elasticsearch 的优势

- 支持分布式，可水平扩展

- 提供 Restful 接口，可被任何语言调用

::

Elasticsearch 结合 kibana、Logstash、Beats，是一整套技术栈，被叫做 ELK。被广泛应用在日志数据分析、实时监控等领域
