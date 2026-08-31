# WebSocket

## 介绍

WebSocket 是基于 TCP 的一种新的网络协议。它实现了浏览器与服务器全双工通信————浏览器和服务器只需要外层一次握手，两者之间就可以创建持久性的链接，并进行双向数据传输。

::tip

HTTP 协议与 WebSocket 协议对比：

- HTTP 是短链接

- WebSocket 是长连接

- HTTP 通信是单向的，基于请求响应模式

- WebSocket 支持双向通行

- HTTP 和 WebSocket 底层都是 TCP 连接

## 实现步骤

1. 导入 WebSocket 的 maven 坐标

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

2. 创建服务端组件 WebSocketServer，用于和客户端通信

```java
@Component
@ServerEndpoint("/es/{sid}")
public class WebSocketServer {

    private static Map<String, Session> sessionMap = new HashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("sid") String sid){
        System.out.println("客户端: " + sid + "建立连接");
        sessionMap.put(sid, session);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("sid") String sid){
        System.out.println("收到来自客户端: " + sid + "的信息" + message);
    }

    @OnClose
    public void onClose(@PathParam("sid") String sid){
        System.out.println("连接断开: " + sid);
        sessionMap.remove(sid);
    }

    // 手动群发
    public void sentToAllClient(String message){
      Collection<Session> sessions = sessionMap.values();
      for(Session session : sessions){
        try {
          session.getBasicRemote().sendText(message);
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
    }
}

```

3. 创建配置类，注册 WebSocket 的服务端组件

```java
@Configuration
public class WebSocketConfiguration {

    @Bean
    public ServerEndpointExporter serverEndpointExporter(){
        return new ServerEndpointExporter();
    }
}
```

4. 创建任务类

```java
@Component
public class WebSocketTask{

  @Autowired
  private WebSocketServer webSocketServer;

  // 定时任务
  @Scheduled(cron = "0/5 * * * * ?")
  public void sndMessageToClient() {
    webSocketServer.sendToAllClient("这是来自服务端的消息: " + DateTimeFormatter.ofPattern("HH:mm:ss").format(LocalDateTime.now()));
  }
}
```
