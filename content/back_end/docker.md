# Docker

> Docker 就是一款快速构建、运行、管理应用的工具

::danger

该页面尚未完工!

::

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

`docker build`：构建镜像

`docker save`：保存容器

`docker load`：加载容器

### 数据卷

**数据卷**（volume）是一个虚拟目录，是**容器内目录**与**宿主机目录**之间映射的桥梁

`docker volume create`：创建数据卷

`docker volume ls`：查看所有数据卷

`docker volume rm`：删除指定数据卷

`docker volume inspect [数据卷]`：查看某个数据卷的详情

- `Mountpoint`：宿主机内的数据卷挂载路径

`docker volume prune`：清理所有未使用的数据卷

::warning

在执行 `docker run` 命令时，使用 `-v [数据卷]:[容器内目录]` 形式可以完成数据卷挂载（数据卷不存在会自动创建）

```bash
docker run -d --name nginx -p 80:80 -v html:/usr/share/nginx/html nginx:latest
```

::

## 项目部署

::danger

该部分尚未完工!

::
