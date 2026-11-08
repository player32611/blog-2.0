# FastAPI

> FastAPI 是一个用于构建 API 的现代、快速（高性能）的 Web 框架，使用 Python 并基于标准的 Python 类型提示

## 快速开始

1. 安装 FastAPI 和 Uvicorn

```bash
pip install "fastapi[standard]"
```

2. 创建 main.py

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {
        "message": "Hello FastAPI"
    }
```

3. 启动项目

```bash
fastapi dev main.py
```

::tip

可在以下地址访问 FastAPI 交互式文档: http://127.0.0.1:8000/docs

::

## 路由

路由就是 URL 地址和处理函数之间的映射关系，它决定了当用户访问某个特定网址时，服务器应该执行哪段代码来返回结果

```python
@app.get("/hello")
async def root():
    return {"message": "Hello"}
```

## 参数

参数就是客户端发送请求时附带的额外信息和指令

参数的作用是让同一个接口能根据不同的输入，返回不同的输出，实现动态交互

- 路径参数：为 URL 路径的一部分，指向唯一的、特定的资源，采用 GET 方法

```python
@app.get("/book/{id}")
async def get_book(id: int):
    return {"id": id, "title": f"这是第{id}本书"}
```

- 查询参数：URL? 之后，对资源集合进行过滤、排序、分页等操作，采用 GET 方法

```python
@app.get("/news/news_list")
async def get_news_list(skip: int, limit: int=10):
    return {"skip": skip, "limit": limit}
```

- 请求体：位于 HTTP 请求的消息体(body)中，用于创建、更新资源，携带大量数据，采用 POST、PUT 方法等

```python
from pydantic import BaseModel

class User(BaseModel):
  username: str
  password: str

@app.post("/register")
async def register(user: User):
    return user
```

::tip

FastAPI 允许通过 Path 函数为路径参数声明额外的信息和校验

```python
from fastapi import FastAPI, Path

@app.get("/book/{id}")
async def get_book(id: int = Path(..., gt=0, lt=101, description="数据id，取值范围1~100")):
    return {"id": id, "title": f"这是第{id}本书"}

@app.get("/author/{name}")
async def get_name(name: str = Path(..., min_length=2, max_length=10)):
    return {"msg": f"这是{name}的消息"}
```

::

::tip

FastAPI 允许通过 Query 函数为查询参数声明额外的信息和校验

```python
from fastapi import FastAPI, Query

@app.get("/news/news_list")
async def get_news_list(
        skip: int = Query(0, description="跳过的记录数", lt=100),
        limit: int = Query(10, description="返回的记录数")
):
    return {"skip": skip, "limit": limit}
```

::

::tip

导入 pydantic 的 Field 函数可以为请求体参数声明额外的信息和校验

```python
from pydantic import BaseModel, Field

class User(BaseModel):
  username: str = Field(default="张三", min_length=2, max_length=10)
  password: str = Field(min_length=3, max_length=20)

@app.post("/register")
async def register(user: User):
    return user
```

::

## 响应

### 响应类型

默认情况下，FastAPI 会自动将路径操作函数返回的 Python 对象(字典、列表、Pydantic 模型等)，经由 jsonable_encoder 转换为 JSON 兼容格式，并包装为 JSONResponse 返回，这省去了手动序列化的步骤，让开发者更能专注于业务逻辑

如果需要返回非 JSON 数据(如 HTML、文件流)，FastAPI 提供了丰富的响应类型来返回不同数据

|     响应类型      |           用途           |                示例                 |
| :---------------: | :----------------------: | :---------------------------------: |
|   JSONResponse    | 默认响应，返回 JSON 数据 |      `return {"key": "value}`       |
|   HTMLResponse    |      返回 HTML 内容      | `return HTMLResponse(html_content)` |
| PlainTextResponse |        返回纯文本        | `return PlainTextResponse("text")`  |
|   FileResponse    |       返回文件下载       |     `return FileResponse(path)`     |
| StreamingResponse |         流式响应         |         生成器函数返回数据          |
| RedirectResponse  |          重定向          |   `return RedirectResponse(url)`    |

::code-group

```python [在装饰器中指定响应类型-响应 HTML 格式]
from fastapi.responses import HTMLResponse

@app.get("/html", response_class=HTMLResponse)
async def get_html():
    return "<h1>这是标题</h1>"
```

```python [直接返回响应对象-响应文件格式]
from fastapi.responses import FileResponse

@app.get("/file")
async def get_file():
    file_path = "./files/1.jpeg"
    return FileResponse(file_path)
```

::

### 自定义响应数据格式

`response_model` 是路径操作装饰器(如 `@app.get` 或 `@app.post`)的关键参数，它通过一个 Pydantic 模型来严格定义和约束 API 端点的输出格式。这一机制在提供自动数据验证的序列化的同时，更是保障数据安全性的第一道防线

```python
from pydantic import BaseModel

class News(BaseModel):
  id: int
  title: str
  content: str

@app.get("/news/{id}", response_model=News)
async def get_news(id: int):
  return {
    "id": id,
    "title": f"这是第{id}本书",
    "content": "这是一本好书"
  }
```

::warning

报错会产生在服务端，对客户端则返回 Internal Server Error

::

## 异常处理

对于客户端引发的错误(4xx，如资源未找到、认证失败)，应使用 `fastapi.HTTPException` 来中断正常处理流程，并返回标准错误响应

```python
from fastapi import HTTPException

@app.get("/news/{id}")
async def get_news(id: int):
    id_list = [1, 2, 3, 4, 5, 6]
    if id not in id_list:
        raise HTTPException(status_code=404, detail="当前 id 不存在")
    return {"id": id}
```

## ORM

ORM(Object-RelationMapping, 对象关系映射)是一种编程技术，用于在面向对象编程语言和关系型数据库之间建立映射。它允许开发者通过操作对象的方式与数据库进行交互，而无需直接编写复杂的 SQL 语句

::tip

优势

- 减少重复的 SQL 代码

- 代码更简洁易读

- 自动处理数据库连接和事物

- 自动防止 SQL 注入攻击

::

## 进阶

### 中间件

中间件(Middleware)是一个在每次请求进入 FastAPI 应用时都会被执行的函数

它在请求到达实际的路径操作之前运行，并且在响应返回给客户端之前再运行一次

要定义中间件，需要在函数的顶部使用装饰器 `@app.middleware("http")`

```python
@app.middleware("http")
async def middleware(request, call_next):
    print("中间件开始处理 -- start")
    response = await call_next(request)
    print("中间件处理完成 -- end")
    return response
```

- `request`: 请求

- `call_next`: 传递请求给路径处理函数

::tip

多个中间件的执行顺序是以定义的顺序自下而上

::

### 依赖注入

使用依赖注入系统可以共享通用逻辑，避免代码重复

依赖项：可重用的组件(函数/类)，负责提供某种功能或数据

::code-group

```python [定义依赖项]
from fastapi import Query

async def common_parameters(
  skip: int = Query(0, ge=0),
  limit: int = QUery(10, le=60)
):
  return {"skip": skip, "limit": limit}
```

```python [依赖注入]
from fastapi import FastAPI, Depends

@app.get("/news/news_list")
async def get_news_list(commons=Depends(common_parameters))
  return commons
```

::

### 目录结构

FastAPI 常见项目结构如下：

```text
fastapi-project/
│
├── app/
│   │
│   ├── main.py
│   │
│   ├── api/                        # API 路由
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── router.py           # 路由统一注册
│   │       └── endpoints/
│   │           ├── user.py
│   │           ├── auth.py
│   │           └── article.py
│   │
│   ├── core/                       # 核心配置
│   │   ├── __init__.py
│   │   ├── config.py               # 配置管理
│   │   ├── security.py             # JWT、密码加密
│   │   └── dependencies.py         # 全局依赖
│   │
│   ├── models/                     # ORM 模型
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── article.py
│   │
│   ├── schemas/                    # Pydantic 模型
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── article.py
│   │
│   ├── services/                   # 业务逻辑
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── article.py
│   │
│   ├── repositories/               # 数据访问层
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── article.py
│   │
│   ├── database/                   # 数据库配置
│   │   ├── __init__.py
│   │   ├── connection.py
│   │   └── session.py
│   │
│   └── utils/                      # 工具函数
│       ├── __init__.py
│       └── response.py
│
├── alembic/                        # 数据库迁移
│
├── tests/                          # 单元测试
│   ├── test_user.py
│   └── test_article.py
│
├── .env
├── .env.example
├── .gitignore
├── alembic.ini
├── requirements.txt
└── README.md
```

- api(routers): HTTP 路由

- core: 全局配置

- db: 数据库连接

- models: 数据库模型

- schemas: 请求和响应模型

- services: 业务逻辑

### 路由模块化

::code-group

```python [定义路由(user.py)]
from fastapi import APIRouter

router = APIRouter(
    prefix="/users",
    tags=["用户管理"]
)

@router.get("/")
async def get_users():
    return [{"id": 1, "name": "Tom"}]
```

```python [导入路由(main.py)]
from fastapi import FastAPI
from app.routers import user

app = FastAPI()

app.include_router(user.router)
```

::

### 中间件模块化

::code-group

```python [定义中间件(logging.py)]
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print("中间件开始处理 -- start")
        response = await call_next(request)
        print("中间件处理完成 -- end")
        return response
```

```python [导入中间件(main.py)]
from fastapi import FastAPI
from middleware.logging import LoggingMiddleware

app = FastAPI()

app.add_middleware(LoggingMiddleware)
```

::
