# Docker

> Docker 就是一款快速构建、运行、管理应用的工具

## Docker 配置

### 安装

首先要安装一个工具：

```bash
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
```

安装成功后，执行命令，配置 Docker 的源：

```bash
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

更新，建立缓存：

```bash
sudo apt update
```

最后，安装 Docker：

```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 启动和校验

启动 Docker：

```bash
sudo systemctl start docker
```

停止 Docker：

```bash
sudo systemctl stop docker
```

重启 Docker：

```bash
sudo systemctl restart docker
```

设置开机自启：

```bash
sudo systemctl enable docker
```

执行 docker ps 命令，如果不报错，说明安装启动成功：

```bash
docker ps
```

### 配置镜像加速

镜像地址可能会变更，如果失效可以百度找最新的 docker 镜像，配置步骤如下：

1. 创建目录：

```bash
sudo mkdir -p /etc/docker
```

2. 编辑配置文件：

```bash
sudo tee /etc/docker/daemon.json <<EOF
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
EOF
```

3. 重新加载配置：

```bash
sudo systemctl daemon-reload
```

4. 重启 Docker：

```bash
sudo systemctl restart docker
```

5. 验证配置是否生效：

```bash
sudo docker info | grep -A 5 "Registry Mirrors"
```

## 快速入门

### 安装 MySQL

先停掉虚拟机中的 MySQL，确保虚拟机内已经安装 Docker，且网络开通的情况下，执行下面命令即可安装 MySQL：

```bash
docker run -d \
--name mysql \
-p 3308:3306 \
-e TZ=Asia/Shanghai \
-e MYSQL_ROOT_PASSWORD=<PASSWORD> \
mysql:8
```

- `docker run`：创建并运行一个容器，`-d` 是让容器在后台运行

- `--name mysql`：给容器起个名字，必须唯一

- `-p 3308:3306`：设置端口映射，前为宿主机的端口，后为容器的端口

- `-e [KEY]=[VALUE]`：设置环境变量

- `mysql:8`：指定运行的镜像的名字，版本

镜像名称一般分两部分组成：`[repository]:[tag]`，其中 `repository` 就是镜像名，`tag` 时镜像的版本

::warning

在没有指定 `tag` 时，默认是 latest，代表最新版本的镜像

::

### 镜像和容器

当我们利用 Docker 安装应用时，Docker 会自动搜索并下载应用**镜像**（image）。镜像不仅包含应用本身，还包含应用运行所需要的环境、配置、系统函数库。Docker 会在运行镜像时创建一个隔离环境，称为**容器**（container）

- **镜像仓库**：存储和管理镜像的平台，Docker 官方维护了一个公共仓库：[Docker Hub](https://hub.docker.com/)

## Docker 核心

### 常见命令

Docker 最常见的命令就是操作镜像、容器的命令

`docker pull`：拉取镜像

`docker push`：推送镜像

`docker images`：查看所有镜像

`docker rmi`：删除镜像

`docker run`：创建并运行容器

`docker start`：启动容器

`docker stop`：停止容器

`docker ps`：查看正在运行的容器

`docker rm`：删除容器

`docker logs`：查看容器的日志

`docker exec`：进入容器

- ` docker exec -it [容器名] bash`：进入容器终端

`docker build`：构建镜像

`docker save`：保存容器

`docker load`：加载容器

`docker inspect`：查看容器的详情信息

### 数据卷

**数据卷**（volume）是一个虚拟目录，是**容器内目录**与**宿主机目录**之间映射的桥梁

`docker volume create`：创建数据卷

`docker volume ls`：查看所有数据卷

`docker volume rm [数据卷]`：删除指定数据卷

`docker volume inspect [数据卷]`：查看某个数据卷的详情

- `Mountpoint`：宿主机内的数据卷挂载路径

`docker volume prune`：清理所有未使用的数据卷

::tip

在执行 `docker run` 命令时，使用 `-v [数据卷]:[容器内目录]` 形式可以完成数据卷挂载（数据卷不存在会自动创建）

```bash
docker run -d --name nginx -p 80:80 -v html:/usr/share/nginx/html nginx:latest
```

::

### 本地目录挂载

```bash
docker run -d --name [容器名] -p [宿主机端口]:[容器端口] -v [宿主机目录或文件]:[容器内目录或文件] [镜像名]
```

::warning

- 本地目录必须以 `/` 或 `./` 开头，如果直接以名称揩油，会被识别为数据卷而非本地目录

- `-v mysql:/var/lib/mysql` 会被识别为一个数据卷，数据卷叫 mysql

- `-v ./mysql:/var/lib/mysql` 会被识别为当前目录下的 mysql 目录

::

::detail

#title
具体示例
#default

**需求**：创建 MySQL 容器，并基于本地目录挂载实现 MySQL 容器数据目录、配置文件、初始化脚本的目录挂载

- 挂载 `/root/mysql/data` 到容器内的 `/var/lib/mysql` 目录

- 挂载 `/root/mysql/init` 到容器内的 `/docker-entrypoint-initdb.d` 目录

- 挂载 `/root/mysql/conf` 到容器内的 `/etc/mysql/conf.d` 目录

```bash
docker run -d \
--name mysql \
-p 3307:3306 \
-e TZ=Asia/Shanghai \
-e MYSQL_ROOT_PASSWORD=123 \
-v /root/mysql/data:/var/lib/mysql \
-v /root/mysql/conf:/etc/mysql/conf.d \
-v /root/mysql/init:/docker-entrypoint-initdb.d \
mysql:8
```

::

::tip

数据卷挂载与本地目录挂载的区别

- 数据卷挂载：数据卷会自动创建，数据卷会保存在 Docker 容器中，数据卷会保存在宿主机的 `/var/lib/docker/volumes/xxx/_data` 目录下

- 本地目录挂载：数据卷不会自动创建，会保存在宿主机的指定目录下

::

### 自定义镜像

镜像就是包含了应用程序、程序运行的系统函数库、运行配置等文件的文件包。构建镜像的过程其实就是把上述文件打包的过程。

- **层**（Layer）：添加安装包、依赖、配置等，每次操作都形成新的一层

- **基础镜像**（BaseImage）：应用依赖的系统函数库、环境、配置、文件等

- **入口**（Entrypoint）：镜像运行入口，一般时程序启动的脚本和参数

::tip

构建一个 Java 镜像的步骤

1. 准备一个 Linux 运行环境

2. 安装 JDK 并配置环境变量

3. 拷贝 Jar 包

4. 编写运行脚本

::

### Dockerfile

Dockerfile 就是一个文本文件，其中包含一个个的指令（Instruction），用指令来说明要执行什么操作来构建镜像。将来 Docker 可以根据 Dockerfile 帮助构建镜像。

|    指令    |                      说明                      |               示例                |
| :--------: | :--------------------------------------------: | :-------------------------------: |
|    FROM    |                  指定基础镜像                  |          `FROM centos:7`          |
|    ENV     |         设置环境变量，可在后面指令使用         |          `ENV key=value`          |
|    COPY    |          拷贝本地文件到镜像的指定目录          |    `COPY ./jdk17.tar.gz /tmp`     |
|    RUN     | 执行 Linux 的 shell 命令，一般是安装过程的命令 | `RUN tar -zxvf /tmp/jdk17.tar.gz` |
|   EXPOSE   |  指定容器运行时监听的端口，是给镜像使用者看的  |           `EXPOSE 8080`           |
| ENTRYPOINT |      镜像中应用的启动命令，容器运行时调用      |   `ENTRYPOINT java -jar xx.jar`   |

::detail

#title
具体示例
#default
**基于 CentOS 7 基础镜像，利用 Docker 描述镜像结构**：

```dockerfile
# 使用 CentOS 7 作为基础镜像
FROM centos:7
# 添加 JDK 到镜像中
COPY jdk17.tar.gz /usr/local
RUN tar -xzf /usr/local/jdk17.tar.gz -C /usr/local && rm /usr/local/jdk17.tar.gz
# 设置环境变量
ENV JAVA_HOME=/usr/local/jdk-17.0.10
ENV PATH=$JAVA_HOME/bin:$PATH
# 创建应用目录
RUN mkdir -p /app
WORKDIR /app
# 复制应用 JAR 文件到容器
COPY app.jar app.jar
# 暴露端口
EXPOSE 8080
# 运行命令
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

编写好了 Dockerfile 之后，可以利用下面命令来构建镜像：

```bash
docker build -t myImage:1.0 .
```

- `-t`：是给镜像起名，格式是 `镜像名:版本号` 的格式，不指定 tag 时，默认为 latest

- `.`：是指定 Dockerfile 所在目录，如果就在当前目录，则指定为 `.`

::

### 网络

默认情况下，所有容器都是以 bridge 方式连接到 Docker 的一个虚拟网桥上

加入自定义网络的容器才可以通过容器名互相网文，Docker 的网络操作命令如下：

|                    命令                    |           说明           |
| :----------------------------------------: | :----------------------: |
|      `docker network create [网络名]`      |       创建一个网络       |
|            `docker network ls`             |       查看所有网络       |
|        `docker network rm [网络名]`        |       删除指定网络       |
|           `docker network prune`           |     清除未使用的网络     |
| `docker network connect [网络名] [容器名]` | 使指定容器连接加入某网络 |
|        `docker network disconnect`         | 使指定容器连接离开某网络 |
|     `docker network inspect [网络名]`      |     查看网络详细信息     |

::tip

也可以在创建容器时指定网络：

```bash
docker run -d --name [容器名] --network [网络名] [镜像名]
```

::

## 项目部署

### 后端部署

1. 准备 MySQL 容器，并创建数据及表结构

2. 准备 java 应用镜像，部署 Docker 容器，运行测试

- 修改项目的配置文件，修改数据库服务地址，打 jar 包

- 编写 Dockerfile 文件

- 构建 Docker 镜像

- 部署 Docker 容器

### 前端部署

1. 部署 nginx 容器（设置目录映射）：

```bash
-v /root/xxx/html:/usr/share/nginx/html # 静态资源文件
-v /root/xxx/conf/nginx.conf:/etc/nginx/nginx.conf # nginx 配置文件
```

2. 将部署的前端资源文件及配置文件上传，执行命令创建 nginx 容器

### Docker Compose

Docker Compose 通过一个单独的 docker-compose.yml 模板文件（YAML 格式）来定义一组相关联的应用容器，帮助实现多个相互关联的 Docker 容器的快速部署

```yaml
services:
  [容器名]:
    image: [镜像名]
    container_name: [容器名]
    volumes:
      - [宿主机目录]:[容器目录]
    networks:
      - [网络名]
    ports:
      - [宿主机端口]:[容器端口]
    environment:
      - [环境变量名]:[环境变量值]
networks:
  [网络名]:
    name: [网络名]
```

Docker Compose 的命令格式：docker compose [OPTIONS] [COMMAND]

| 参数或指令 |  类型   |             说明              |
| :--------: | :-----: | :---------------------------: |
|    `-f`    | Options | 指定 compose 文件的路径和名称 |
|    `-p`    | Options |       指定 project 名称       |
|    `up`    | Command |  创建并启动所有 service 容器  |
|   `down`   | Command |   停止并移除所有容器、网络    |
|    `ps`    | Command |      列出所有启动的容器       |
|   `logs`   | Command |      查看指定容器的日志       |
|   `stop`   | Command |           停止容器            |
|  `start`   | Command |           启动容器            |
| `restart`  | Command |           重启容器            |
|   `top`    | Command |        查看运行的进程         |
