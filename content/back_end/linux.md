# Linux

> Linux 是一套免费使用和自由传播的操作系统

::detail

#title
操作系统介绍
#default

|      系统      |       分类       |                       特点                       |
| :------------: | :--------------: | :----------------------------------------------: |
|    Windows     |   桌面操作系统   |                   用户数量最多                   |
|     Mac OS     |   桌面操作系统   |             操作体验好，办公人士首选             |
|     Linux      |   桌面操作系统   |                    用户数量少                    |
|    Android     | 移动设备操作系统 | 基于 Linux、开源、主要用智能手机、平板、智能电视 |
|      IOS       | 移动设备操作系统 |     苹果公司开发、不开源，用于苹果公司的产品     |
|   HarmonyOS    | 移动设备操作系统 |    华为公司开发、开源，目前用于华为公司的产品    |
|      Unix      |  服务器操作系统  |                 安全、稳定、付费                 |
|     Linux      |  服务器操作系统  |            安全、稳定、免费、占有率高            |
| Windows Server |  服务器操作系统  |                  付费、占有率低                  |

::

## Linux 概述

### Linux 系统版本

Linux 系统分为**内核版**和**发行版**

**内核版**：

- 由 Linux 核心团队开发、维护

- 免费、开源

- 负责控制硬件

**发行版**：

- 基于 Linux 内核版进行扩展

- 由各个 Linux 厂商开发、维护

- 由收费版本和免费版本

::detail

#title
Linux 系统发行版
#default

- Ubuntu：子桌面应用为主，免费

- RedHat：面向企业用户，收费

- CentOS：RedHat 的社区版，免费

- Fedora：功能完备、快速更新，免费

- openSUSE：对个人完全免费、图形界面华丽

- 红旗 Linux：国产

::

### 系统安装

- 物理机安装：直接将操作系统安装的服务器硬件上

- 虚拟机安装：通过虚拟机软件安装

查看 IP 地址的命令：`ip addr`

关闭 Linux 系统：`init 0`

重启 Linux 系统：`init 6`

### 远程连接

常用的 SSH（Secure Shell，安全外壳协议）远程连接工具：Putty、SecureCRT、Xshell、FinalShell 等

### 目录介绍

Linux 系统中的目录特点：

1. `/` 是所有目录的顶点

2. 目录结构像一颗倒挂的树

**bin**：存放二进制可执行文件

**boot**：存放系统引导时使用的各种文件

**dev**：存放设备文件

**etc**：存放系统配置文件

**home**：存放系统用户的文件

**lib**：存放程序运行所需的共享库和内核模块

**opt**：额外安装的可选应用程序包所放置的位置

**root**：超级用户目录

**sbin**：存放二进制可执行文件，只有 root 用户才能访问

**tmp**：存放临时文件

**usr**：存放系统应用程序

**var**：存放运行时需要改变数据的文件，例如日志文件

::tip

路径 `/itheima` 与 `itheima` 的区别：

`/itheima` 是绝对路径，是指根目录 `/` 下的 `itheima` 目录

`itheima` 是相对路径，是指当前目录下的 `itheima` 目录

::

## Linux 常用命令

### 命令初识

Linux 命令格式：`command [-option] [parameter]`

- `command`：命令名

- `-option`：选项，可用来对命令进行控制，也可以省略（可选）

- `parameter`：参数，可以是零个、一个或多个（可选）

::tip

使用技巧

- Tab 键自动补全

- 连续两次 Tab 键，给出操作提示

- 使用上下箭头快速调出曾经使用过的命令

- 使用 `clear` 命令或 Ctrl + l 快捷键实现清屏

- `command --help` 显示某命令的详细帮助信息

::

### 目录操作命令

`ls`：显示指定目录下的内容

- 语法：`ls [-al] [dir]`

- 选项：`-a` 显示所有文件（`.` 开头的隐藏文件也会列出）；`-l` 除文件名外，同时将文件类型、权限、拥有者、文件大小等信息详细列出；`dir` 指定要检索的目录，默认为当前目录

::tip

由于我们使用 `ls` 命令时经常需要加入 `-l` 选项，所以 Linux 为 `ls -l` 命令提供了一种简写方式，即 `ll`

::

::tip

文件详细信息解释

```bash
drwxr-x--- 20 bba  bba   4096  5月  2 14:09 ./
-rw-r--r--  1 bba  bba   3771  3月 31  2024 .bashrc
```

第一列开头为 `d` 表示目录，`-` 表示文件，剩余九位代表文件权限，`r` 代表读权限，`w` 代表写权限，`x` 代表执行权限，若无对应权限则为 `-`

第三列代表文件所有者，第四列代表文件所属组

第五列代表文件大小，以字节为单位

剩余为文件修改时间和文件名

::

`pwd`：显示当前目录所在路径

`cd`：用于切换当前工作目录，即进入指定目录

- 语法：`cd [dirName]`

- 说明：`.` 表示目前所在的目录，`..` 表示目前目录位置的上级目录，`~` 表示用户的 home 目录，`-` 命令上一次访问的目录

`mkdir`：创建目录

- 语法：`mkdir [-p] [dirName]`

- 说明：`-p` 确保目录名称存在，不存在的就创建一个。通过此选项，可以实现多层目录同时创建

::detail

#title
具体示例
#default

`mkdir itcast`：在当前目录下，建立一个名为 itcast 的子目录

`mkdir -p itcast/test`：在 itcast 目录中创建 test 子目录，若 itcast 目录不存在，则建立一个

::

`rm`：删除文件或者目录

- 语法：`rm [-rf] name`

- 说明：`-r` 将目录及目录中所有文件（目录）逐一删除，即递归删除；`-f` 无需确认，直接删除

::detail

#title
具体示例
#default

`rm -r itcast/`：删除名为 itcast 的目录和目录中所有文件，删除前需确认

`rm -rf itcast/`：无需确认，直接删除名为 itcast 的目录和目录中所有文件

`rm -f hello.txt`：无需确认，直接删除 hello.txt 文件

::

### 文件操作命令

`cat`：用于显示文件的所有内容

- 语法：`cat [-n] fileName`

- 说明：`-n` 由 1 开始对所有输出的行数编号

::detail

#title
具体示例
#default

`cat /etc/profile`：查看 /etc 目录下的 profile 文件内容

::

`more`：以分页的形式显示文件内容

- 语法：`more fileName`

- 操作说明：回车键向下滚动一行，空格键向下滚动一屏，`b` 返回上一屏，`q` 或 Ctrl + c 退出

::detail

#title
具体示例
#default

`more /etc/profile`：以分页方式显示 /etc 目录下的 profile 文件内容

::

`head`：查看文件开头的内容

- 语法：`head [-n] fileName`

- 说明：`-n` 输出文件开头的 n 行内容

::detail

#title
具体示例
#default

`head 1.log`：默认显示 1.log 文件开头的 10 行内容

`head -20 1.log`：显示 1.log 文件开头 20 行内容

::

`tail`：查看文件末尾的内容

- 语法：`tail [-nf] fileName`

- 说明：`-n` 输出文件末尾的 n 行内容；`-f` 动态读取文件末尾内容并显示，通常用于日志文件的内容输出

::detail

#title
具体示例
#default

`tail 1.log`：默认显示 1.log 文件末尾 10 行的内容

`tail -20 1.log`：显示 1.log 文件末尾 20 行的内容

`tail -f 1.log`：动态读取 1.log 文件末尾内容并显示（实时刷新）

::

### 拷贝移动命令

`cp`：用于赋值文件或目录

- 语法：`cp [-f] source dest`

- 选项：`-f` 如果复制的是目录需要使用此选项，此时将复制该目录下所有的子目录和文件；

::detail

#title
具体示例
#default

`cp hello.txt itcast/`：将 hello.txt 复制到 itcast 目录中

`cp hello.txt ./hi.txt`：将 hello.txt 复制到当前目录，并改名为 hi.txt

`cp -r itcast/ ./itheima/`：将 itcast 目录和目录下所有文件复制到 itheima 目录下

`cp -r itcast/* ./itheima/`：将 itcast 目录下所有文件复制到 itheima 目录下

::

`mv`：为文件或目录重命名、或将文件或目录移动到其它位置（若第二个参数是已存在的目录则执行移动）

- 语法：`mv source dest`

::detail

#title
具体示例
#default

`mv hello.txt hi.txt`：将 hello.txt 改名为 hi.txt

`mv hi.txt itheima/`：将 hi.txt 移动到 itheima 目录中

`mv hi.txt itheima/hello.txt`：将 hi.txt 移动到 itheima 目录下，并改名为 hello.txt

`mv itcast/ itheima/`：如果 itheima 目录不存在，将 itcast 目录改名为 itheima；如果 itheima 目录存在，将 itcast 目录移动到 itheima 目录中

::

### 打包压缩命令

`tar`：对文件进行打包、解包、压缩、解压

- 语法：`tar [-zcxvf] fileName [files]`

- 说明：包文件后缀为 .tar 表示只是完成了打包，并没有压缩；包文件后缀为 .tarr.gz 表示打包的同时还进行了压缩

- 选项：`-z` 代表的是 gzip，通过 gzip 命令处理文件，gzip 可以对文件压缩或者解压；`-c` 代表的是 create，即创建新的包文件；`-x` 代表的是 extract，实现从包文件中还原文件；`-v` 代表的是 verbose，显示命令的执行过程；`-f` 代表的是 file，用于指定包文件的名称

::detail

#title
具体实例
#default

`tar -cvf hello.tar hello`：将当前目录下所有文件打包，打包后的文件名为 hello.tar

`tar -zcvf hello.tar.gz hello`：将当前目录下所有文件打包并压缩，打包后的文件名为 hello.tar.gz

`tar -xvf hello.tar`：将 hello.tar 文件进行解包，并将解包后的文件放在当前目录

`tar -zxvf hello.tar.gz`：将 hello.tar.gz 文件进行解压，并将解压后的文件放在当前目录

`tar -zxvf hello.tar.gz -C /user/local`：将 hello.tar.gz 文件进行解压。解压到指定的 /user/local 目录中

::

### 文本编辑命令

`vi`：vi 命令是 Linux 系统提供的一个文本编辑工具，可以对文件内容进行编辑，类似于 Windows 中的记事本

- 语法：`vi fileName`

vim 是从 vi 发展来的一个功能更加强大的文本编辑工具，在编辑文件时可以对文本内容进行着色（更常用）。要使用 vim 命令，需要我们自己完成安装。可以使用下面的命令来完成安装：

```bash
yum install vim
```

`vim`：对文件内容进行编辑，vim 其实就是一个文本编辑器

- 语法：`vim fileName`

::tip

vim 使用指南

输入 `vim fileName` 打开文件后会先进入**命令模式**

|   命令模式指令    |                含义                 |
| :---------------: | :---------------------------------: |
|       `gg`        |       定位到文本内容的第一行        |
|        `G`        |       定位到文本内容最后一行        |
|       `dd`        |        删除光标所在行的数据         |
|       `ndd`       | 删除当前光标所在行及之后的 n 行数据 |
|        `u`        |              撤销操作               |
| `i` 或 `a` 或 `o` |            进入插入模式             |

命令模式下，可以按下 i、a、o 键进入**插入模式**，插入模式下按下 Esc 键返回命令模式

命令模式下，可以按下 : 键进入**底行模式**，底行模式下按下 Esc 键返回命令模式

| 底行模式命令 |     含义      |
| :----------: | :-----------: |
|    `:wq`     |  保存并退出   |
|    `:q!`     |  不保存退出   |
|  `:set nu`   |   显示行号    |
| `:set nonu`  | 取消行号显示  |
|     `:n`     | 定位到第 n 行 |

::

### 查找命令

`find`：在指定目录下查找文件

- 语法：`find dirName -option fileName`

::detail

#title
具体示例
#default

`find . -name "*.log"`：在当前目录及其子目录下查找 .log 结尾文件

`find /itcast -name "*.log"`：在 /itcast 目录及其子目录下查找 .log 结尾的文件

::

`grep`：从指定文件中查找指定的文本内容

- 语法：`grep [-inAB] word fileName`

- 选项：`-i` 检索的关键字忽略（ignore）大小写；`-n` 显示关键字所在的这一行的行号；`-A` 输出关键字所在行及之后（After）的几行记录；`-B` 输出关键字所在行及之前（Before）的几行记录

::detail

#title
具体示例
#default

`grep Hello HelloWorld.java`：查找 HelloWorld.java 文件中出现的 Hello 字符串的位置

`grep hello *.java`：查找当前目录中所有 .java 结尾的文件中包含 hello 字符串的位置

::

### Mysql 数据库操作命令

`mysql -u[用户名] -p`：连接 mysql 数据库

`service mysql status`：查看 mysql 服务状态

`service mysql start`：启动 mysql 服务

### 防火墙操作命令

`systemctl status firewalld`、`firewall-cmd --state`：查看防火墙状态

`systemctl stop firewalld`：关闭防火墙

`systemctl start firewalld`：开启防火墙

`systemctl disable firewalld`：永久关闭防火墙

`firewall-cmd --zone=public --add-port=8080/tcp --permanent`：开放指定端口

`firewall-cmd --zone=public --remove-port=8080/tcp --permanent`：关闭指定端口

`firewall-cmd --reload`：立即生效

`firewall-cmd --zone=public --list-ports`：查看开放的端口

::tip

- systemctl 是管理 Linux 中服务的命令，可以对服务进行启动、停止、重启、查看状态等操作

- firewall-cmd 是 Linux 中专门用于控制防火墙的命令

- 为了保证系统安全，生产服务器的防火墙不建议关闭

::

::tip

Ubuntu 系统防火墙关闭命令

`sudo ufw status`：查看防火墙状态

`sudo ufw enable`：开启防火墙

::

### Nginx 操作命令

`nginx`：启动 nginx 服务

`nginx -s reload`：重启 nginx 服务

`nginx -s quit`：停止 nginx 服务

### 其它命令

`history`：查看命令历史记录

### 特殊符号

`|`：管道符，将前面命令的输出，作为后面命令的输入

`>` 与 `>>`：重定向符号，将前面的问问你笨内容，输出到后面的文件中（`>`：覆盖重定向，`>>`：追加重定向）

## 软件安装

**二进制发布包安装**：软件已经针对具体平台编译打包发布，只要解压，修改配置即可

**rpm 安装**：软件已经按照 redhat 的包管理规范进行打包，使用 rpm 命令进行安装，不能自行解决库依赖问题

**yum 安装**：一种在线软件安装方式，本质上还是 rpm 安装，自动下载安装包并安装，安装过程中自动解决库依赖问题

**源码编译安装**：软件以源码工程的形式发布，需要自己编译打包

## 项目部署

### 前端项目部署

1. 将打包好的静态资源，上传到 nginx 的 html 目录中

2. 配置 nginx 的配置文件，在 conf/nginx.conf 中配置反向代理服务器及路径重写规则

```conf
server {
  listen 80;
  server_name localhost;
  client_max_body_size 10m;
  location / {
    root html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
  location ^~ /api/ {
    rewrite ^/api/(.*)$ / break;
    proxy_pass http://localhost:8080;
  }
}
```

3. 在 nginx 的安装目录中，执行 sbin 目录下的 nginx 命令启动 nginx 服务：`sbin/nginx` 或 `sbin/nginx -s start`

### 后端项目部署

1. 执行 maven 的父工程中的 package 生命周期，对项目进行打包

2. 在 linux 服务器的 /usr/local 目录下，创建一个目录 xxx-app，将 jar 包上传到服务器的 /usr/local/xxx-app 目录中

3. 然后在命令行执行命令，运行 jar 包：`java -jar xxx.jar`

::tip

上述执行运行 jar 包之后，会占用前台窗口，窗口关闭服务器也就停了。可以使用 nohup 指令，后台运行服务：

```bash
nohup java -jar xxx.jar &
```

- 查看进程：`ps -ef | grep java`

- 停止进程：`kill -9 [进程号]`

::
