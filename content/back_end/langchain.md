# LangChain

> LangChain 是一个用于开发大语言模型（LLM）应用的开源框架

::danger

该页面尚未完工!

::

## 快速入门

1. 安装依赖

```bash
pip install langchain langchain-openai
```

2. 简单的模型调用

```python
from langchain.chat_models import init_chat_model

# 初始化模型
model = init_chat_model(
    "gpt-4.1-mini",
    model_provider="openai",
    api_key="YOUR_API_KEY"
)

# 调用模型
response = model.invoke("什么是 LangChain？")

print(response.content)
```

## 核心组成

### Models

**Models**(模型)负责连接和调用大语言模型，由 LangChain 提供统一的模型接口，可以降低切换模型提供商时的代码修改成本

```python
from langchain.chat_models import init_chat_model

def create_chat_model():
    return llm = init_chat_model(
      "deepseek-chat",
      model_provider="deepseek"
  )
```

::tip

一般建议在 `.env` 文件中定义 API Key 等信息，而不是硬编码在代码中

::code-group

```[.env]
API_KEY=your_api_key
BASE_URL=https://api.deepseek.com
MODEL=deepseek-chat
```

```python [core/config.py]
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DEEPSEEK_API_KEY: str
    DEEPSEEK_BASE_URL: str = "https://api.deepseek.com"
    DEEPSEEK_MODEL: str = "deepseek-chat"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()
```

```python
from langchain_openai import ChatOpenAI

from core.config import settings

llm = ChatOpenAI(
    model=settings.DEEPSEEK_MODEL,
    api_key=settings.DEEPSEEK_API_KEY,
    base_url=settings.DEEPSEEK_BASE_URL,
    temperature=0.7,
    timeout=60,
    max_retries=2
)
```

::

::

### Prompts

**Prompts**(提示词模板)用于统一管理发送给大模型的提示词

```python
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个专业的 Python 助手。"),
    ("human", "{question}")
])

messages = prompt.format_messages(
    question="什么是 FastAPI？"
)
```

### Chains

**Chain**(链)可以理解为将多个处理步骤串联起来，形成一个完整的工作流程，这样就可以将复杂任务拆分成多个独立步骤

### Memory

**Memory**(记忆)用于管理 AI 应用的对话上下文

大模型本身不会自动记住不同请求之间的历史对话，因此需要应用层管理对话历史，并在后续请求中提供相关上下文

::warning

当前 LangChain 的新版本更倾向于通过消息历史、持久化和 LangGraph 状态管理实现这类能力，而不是简单依赖旧版 Memory API

::

### Tools

**Tools**(工具)可以让大模型调用外部功能

### RAG

**RAG**(检索增强生成)是 LangChain 非常重要的应用场景。它能够让大模型在回答问题之前，先从外部知识库中检索相关内容
