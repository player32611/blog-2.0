# Http

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

## HttpClient

HttpClient 是 Apache Jakarta Common 下的子项目，可以用来提供高效的、最新的、功能丰富的支持 HTTP 协议的客户端编程工具包，并且它支持 HTTP 协议最新的版本和建议

### 起步

添加以下依赖

```xml
<dependency>
  <groupId>org.apache.httpcomponents</groupId>
  <artifactId>httpclient</artifactId>
  <version>4.5.13</version>
</dependency>
```

测试：

```java
@Test
public void testGET() throws Exception{
    // 创建 httpClient 对象
    CloseableHttpClient httpClient = HttpClients.createDefault();

    // 创建请求对象
    HttpGet httpGet = new HttpGet("http://localhost:8080/user/shop/status");

    // 发送请求，接受响应结果
    CloseableHttpResponse response = httpClient.execute(httpGet);

    // 获取服务端返回的状态码
    Integer statusCode = response.getStatusLine().getStatusCode();
    log.info("testGET 响应状态码: {}", statusCode);

    // 获取服务端返回的数据
    HttpEntity httpEntity = response.getEntity();
    String body = EntityUtils.toString(httpEntity);
    log.info("testGET 响应数据: {}", body);

    // 关闭资源
    response.close();
    httpClient.close();
}

@Test
public void testPOST() throws Exception{
    // 创建 httpClient 对象
    CloseableHttpClient httpClient = HttpClients.createDefault();

    // 创建请求对象
    HttpPost httpPost = new HttpPost("http://localhost:8080/admin/employee/login");

    // 构造请求数据
    JSONObject jsonObject = new JSONObject();
    jsonObject.put("username", "test");
    jsonObject.put("password", "123456");
    StringEntity entity = new StringEntity(jsonObject.toString());

    // 设置数据格式
    entity.setContentEncoding("utf-8");
    entity.setContentType("application/json");

    // 封装请求数据
    httpPost.setEntity(entity);

    // 发送请求，接受响应结果
    CloseableHttpResponse response = httpClient.execute(httpPost);

    // 获取服务端返回的状态码
    Integer statusCode = response.getStatusLine().getStatusCode();
    log.info("testPOST 响应状态码: {}", statusCode);

    // 获取服务端返回的数据
    HttpEntity httpEntity = response.getEntity();
    String body = EntityUtils.toString(httpEntity);
    log.info("testPOST 响应数据: {}", body);

    // 关闭资源
    response.close();
    httpClient.close();
}
```

### 核心 API

- HttpClient

- HttpClients

- CloseableHttpClient

- HttpGet

- HttpPost
