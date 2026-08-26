# HttpClient

> HttpClient 是 Apache Jakarta Common 下的子项目，可以用来提供高效的、最新的、功能丰富的支持 HTTP 协议的客户端编程工具包，并且它支持 HTTP 协议最新的版本和建议

## 起步

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

## 核心 API

- HttpClient

- HttpClients

- CloseableHttpClient

- HttpGet

- HttpPost
