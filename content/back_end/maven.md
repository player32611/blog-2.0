# Maven

## Maven 介绍

Maven 是一款用于管理和构建 Java 项目的工具，是 apache 旗下的一个开源项目

::tip

Maven 的作用：

- 依赖管理：方便快捷的管理项目依赖的资源（jar 包）

- 项目构建：标准的跨平台（Linux、Windows、MacOS）的自动化项目构建方式

- 统一项目结构：提供标准，统一的项目结构

::

## Maven 坐标

Maven 中的坐标是资源（jar）的唯一表示，通过该坐标可以唯一定位资源位置

使用坐标来定义项目或引入项目中需要的依赖

### Maven 坐标主要组成

- groupId：定义当前 Maven 项目隶属组织名称（通常是域名反写）

- artifactId：定义当前 Maven 项目名称（通常是模块名称）

- version：定义当前项目版本号
  - SNAPSHOT：功能不稳定，尚处于开发中的版本，即快照版本
  - RELEASE：功能趋于稳定，当前停止更新，可以用于发行的版本

## Maven 依赖管理

### 依赖配置

- 依赖：指当前项目运行所需要的 jar 包，一个项目中可以引入多个依赖

配置方法：

1. 在 `pom.xml` 中编写 `<dependencies>` 标签

2. 在 `<dependencies>` 标签中使用 `<dependency>` 引入坐标

3. 定义坐标的 `groupId`、`artifactId`、`version`

4. 点击刷新按钮，引入最新加入的坐标

### 排除依赖

- 排除依赖：指主动断开依赖的资源，被排除的资源无须指定版本

```xml
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-context</artifactId>
  <version>5.3.18</version>

  <exclusions>
    <exclusion>
      <groupId>io.micrometer</groupId>
      <artifactId>micrometer-observation</artifactId>
    </exclusion>
  </exclusions>
</dependency>
```

## Maven 生命周期

Maven 的生命周期就是为了对所有的 maven 项目构建过程进行抽象和统一

Maven 中有 3 套相互独立的生命周期：

- clean：清理工作
  - clean：移除上一次构建生成的文件

- default：核心工作，如：编译、测试、打包、安装、部署等
  - compile：编译项目源代码
  - test：使用合适的单元测试框架运行测试
  - package：将编译后的文件打包，如：jar、war 等
  - install：安装项目到本地目录

- site：生成报告、发布站点等

::warning

在**同一套**生命周期中，当运行后面的阶段时，前面的阶段都会运行

::

执行指定生命周期的两种方式：

- 在 idea 中，右侧的 maven 工具栏，选中对应的生命周期，双击执行

- 在命令行中，通过 `mvn <生命周期>` 命令执行

## 测试

- 测试：是一种用来促进鉴定软件的正确性、完整性、安全性和质量的过程，划分为：单元测试、集成测试、系统测试、验收测试。

::tip

测试类型：

单元测试对软件的基本组成单位进行测试，最小测试单位，采用白盒测试。

- 目的：检验软件基本组成单位的正确性

- 测试人员：开发人员

集成测试将已分别通过测试的单元，按设计要求组合成系统或子系统，再进行的测试，采用灰盒测试。

- 目的：检查单元之间的协作是否正确

- 测试人员：开发人员

系统测试对已经集成好的软件系统进行彻底的测试，采用黑盒测试。

- 目的：检验软件系统的正确性、性能是否满足指定的要求

- 测试人员：测试人员

验收测试是交付测试，是针对用户需求、业务流程进行的正式的测试，采用黑盒测试。

- 目的：检验软件是否满足验收标准

- 测试人员：客户/需求方

::

测试方法包括：白盒测试、黑盒测试及灰盒测试。

::tip

测试方法：

白盒测试时清楚软件内部结构、代码逻辑。用于验证代码、逻辑正确性。

黑盒测试不清楚软件内部结构、代码逻辑。用于验证软件的功能、兼容性等方面。

灰盒测试结合了白盒测试和黑盒测试的特点，即关注软件的内部结构，又考虑外部表现（功能）。

::

### 单元测试

单元测试就是针对最小的功能单元（方法），编写测试代码对其正确性进行测试

**JUnit** 是最流行的 Java 测试框架之一，提供了一些功能，方便程序进行单元测试（第三方公司提供）

::warning

使用 `main` 方法测试存在的问题：

- 测试代码与源代码为分开，难维护

- 一个方法测试失败，影响后面方法

- 无法自动化测试，得到测试报告

::

::tip

使用 JUnit 测试的优势：

- 测试代码与源代码分开，便于维护

- 可根据需要进行自动化测试

- 可自动分析测试结果，产出测试报告

::

**使用方法**：

1. 在 `pom.xml` 中，引入 JUnit 的依赖

```xml
<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter</artifactId>
  <version>5.9.1</version>
</dependency>
```

2. 在 `test/java` 目录下，创建测试类，并编写对应的测试方法，并在方法上声明 `@Test` 注解

```java
@Test
public void testGetAge() {
  // 测试逻辑
  Integer age = new UserService().getAge("110002200505091218");
  System.out.println(age);
}
```

::warning

JUnit 单元测试类名命名规范为：XxxxxTest

JUnit 单元测试的方法，必须声明为 `public void`

::

3. 运行单元测试（测试通过：绿色；测试失败：红色）

### 断言

单元测试方法不报错，不代表业务方法没问题

JUnit 提供了一些辅助方法，用来帮我们确定被测试的方法是否按照预期的效果正常工作，这种方式称为**断言**

通过断言可以检测方法运行结果是否和预期一致，从而判断业务方法的正确性

|                              断言方法                               |                   描述                    |
| :-----------------------------------------------------------------: | :---------------------------------------: |
|     `Assertions.assertEquals(Object exp,Object act,String msg)`     |     检查两个值是否相等，不相等就报错      |
|   `Assertions.assertNotEquals(Object exp,Object act,String msg)`    |     检查两个值是否不相等，相等就报错      |
|           `Assertions.assertNull(Object obj,String msg)`            | 检查给定对象是否为 null，不为 null 就报错 |
|          `Assertions.assertNotNull(Object obj,String msg)`          | 检查给定对象是否不为 null，为 null 就报错 |
|        `Assertions.assertTrue(boolean condition,String msg)`        |    检查给定条件是否为真，不为真就报错     |
|       `Assertions.assertFalse(boolean condition,String msg)`        |    检查给定条件是否为假，不为假就报错     |
| `Assertions.assertThrows(Class expType,Executable exec,String msg)` |   检查程序运行抛出的异常，是否符合预期    |

::detail

#title
具体示例
#default

```java
public void testGenderWithAssert(){
  UserService userService = new UserService();
  String gender = userService.getGender("100000200010011011");
  Assertions.assertEquals("男", gender, "性别测试失败！");
}

public void testGenderWithAssert2(){
  UserService userService = new UserService();
  Assertions.assertThrows(IllegalArgumentException.class, () -> {
    userService.getGender(null);
  })
}
```

::

::tip

上述方法形参中的最后一个参数 msg 表示错误提示信息，可以不指定（有对应的重载方法）

::

### 常见注解

在 JUnit 中还提供了一些注解，还增强其功能，常见的注解有以下几个：

|         注解         |                                说明                                |                备注                 |
| :------------------: | :----------------------------------------------------------------: | :---------------------------------: |
|       `@Test`        |        测试类中的方法用它修饰才能成为测试方法，才能启动执行        |              单元测试               |
| `@ParameterizedTest` | 参数化测试的注解（可以让单个测试运行很多次，每次运行时仅参数不同） | 用了该注解，就不需要 `@Test` 注解了 |
|    `@ValueSource`    |               参数化测试的参数来源，赋予测试方法参数               |      与参数化测试注解配合使用       |
|    `@DisplayName`    |        指定测试类、测试方法显示的名称（默认为类名、方法名）        |                                     |
|    `@BeforeEach`     |     用来修饰一个实例方法，该方法会在每一个测试方法之前执行一次     |       初始化资源（准备工作）        |
|     `@AfterEach`     |     用来修饰一个实例方法，该方法会在每一个测试方法之后执行一次     |        释放资源（清理工作）         |
|     `@BeforeAll`     |     用来修饰一个静态方法，该方法会在所有测试方法之前只执行一次     |       初始化资源（准备工作）        |
|     `@AfterAll`      |     用来修饰一个静态方法，该方法会在所有测试方法之后只执行一次     |        释放资源（清理工作）         |

::detail

#title
具体示例
#default

```java
// test/java/com.xxx.xxx/UserServiceTest.java

@DisplayName("用户服务测试类")
public class UserServiceTest {
  @BeforeAll
  public static void beforeAll() {
    System.out.println("所有测试开始执行之前执行");
  }

  @AfterAll
  public static void afterAll() {
    System.out.println("所有测试执行完毕之后执行");
  }

  @BeforeEach
  public void beforeEach() {
    System.out.println("每个测试开始执行之前执行");
  }

  @AfterEach
  public void afterEach() {
    System.out.println("每个测试执行完毕之后执行");
  }

  @DisplayName("测试获取性别")
  @ParameterizedTest
  @ValueSource(strings = {"100000200010011011", "110002200505091218","120002200505091218"})
  public void testGetGender(String idCard){
    UserService userService = new UserService();
    String gender = userService.getGender(idCard);
    Assertions.assertEquals("男", gender, "性别测试失败！");
  }
}
```

::

### 依赖范围

依赖的 jar 包，默认情况下，可以在任何地方使用。可以通过 `<scope>` 标签设置其作用范围

作用范围：

- 主程序范围有效（main 文件夹范围内）

- 测试程序范围有效（test 文件夹范围内）

- 是否参与打包运行（package 指令范围内）

|    scope 值     | 主程序 | 测试程序 | 打包（运行） |    范例     |
| :-------------: | :----: | :------: | :----------: | :---------: |
| compile（默认） |   √    |    √     |      √       |    log4j    |
|      test       |   -    |    √     |      -       |    jUnit    |
|    provided     |   √    |    √     |      -       | servlet-api |
|     runtime     |   -    |    √     |      √       |  jdbc 驱动  |

```xml 5
<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter</artifactId>
  <version>5.9.3</version>
  <scope>test</scope>
</dependency>
```

## Maven 高级

### 分模块设计与开发

将一个大项目拆分成若干个子模块，方便项目的管理维护、扩展，也方便模块间的相互引用，资源共享

**策略一**：按照功能模块拆分，比如：公共组件、商品模块、搜索模块、购物车模块、订单模块等

**策略二**：按照层拆分，比如：公共组件、实体类、控制层、业务层、数据访问层

**策略三**：按照功能模块 + 层拆分

::warning

分模块开发需要先针对模块功能进行设计，再进行编码。不会先将工程开发完毕，然后进行拆分

::

### 继承

**继承**描述的是两个工程间的关系，与 java 中的继承相似，子工程可以继承父工程中的配置信息，常见于依赖关系的继承

::tip

作用

简化依赖配置、统一管理依赖

::

1. 创建 maven 模块 xxx-parent，该工程为父工程，设置打包方式为 pom（默认 jar）

```xml
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>3.2.10</version>
  <!-- 父工程的 pom.xml 的相对路径 -->
  <relativePath/>
</parent>

<groupId>com.xxx</groupId>
<artifactId>xxx-parent</artifactId>
<version>1.0-SNAPSHOT</version>
<packaging>pom</packaging>
```

2. 在子工程的 pom.xml 文件中，配置继承关系

```xml
<parent>
  <groupId>com.xxx</groupId>
  <artifactId>xxx-parent</artifactId>
  <version>1.0-SNAPSHOT</version>
  <relativePath>../xxx-parent/pom.xml</relativePath>
</parent>

<artifactId>xxx-pojo</artifactId>
<version>1.0-SNAPSHOT</version>
```

3. 在父工程中配置各个工程共有的依赖（子工程会自动继承父工程的依赖）

::tip

在子过程中，配置了继承关系之后，坐标中的 groupId 是可以省略的，因为会自动继承父工程的

relativePath 指定父工程的 pom 文件的相对位置（如果不指定，将从本地仓库/远程仓库查找）

若父子工程都配置了同一个依赖的不同版本，以子工程的为准

::

在 maven 中，可以在父工程的 pom 文件中通过 `<dependencyManagement>` 来统一管理依赖版本

::code-group

```xml [父工程 pom.xml]
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.aliyun.oss</groupId>
      <artifactId>aliyun-sdk-oss</artifactId>
      <version>3.17.4</version>
    </dependency>
  </dependencies>
</dependencyManagement>
```

```xml [子工程 pom.xml]
<dependencies>
  <dependency>
    <groupId>org.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
  </dependency>
</dependencies>
```

::

::tip

`<dependencies>` 和 `<dependencyManagement>` 的区别

`<dependencies>` 是直接依赖，在父成功配置了依赖，子工程会直接继承下来

`<dependencyManagement>` 是统一管理依赖版本，不会直接依赖，还需要在子工程中引入所需依赖（子工程中无需指定版本）

::

可以通过自定义属性/引用属性来简化父工程的 pom.xml 配置：

```xml
<properties>
  <lombok.version>1.18.30</lombok.version>
  <jjwt.version>0.9.1</jjwt.version>
</properties>

<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>io.jsonwebtoken</groupId>
      <artifactId>jjwt</artifactId>
      <version>${jjwt.version}</version>
    </dependency>
  </dependencies>
</dependencyManagement>

<dependencies>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>${lombok.version}</version>
  </dependency>
</dependencies>
```

### 聚合

**聚合**是将多个模块组织成一个整体，同时进行项目的构建

- **聚合工程**：一个不具有业务功能的“空”工程（有且仅有一个 pom 文件），可用故意快速构建项目（无需根据依赖关系手动构建，直接在聚合工程上构建即可）

maven 中可以通过 `<modules>` 设置当前聚合工程所包含的子模块名称

```xml
<!-- 父工程的 pom.xml 文件 -->
<modules>
  <module>xxx-pojo</module>
  <module>xxx-dao</module>
  <module>xxx-service</module>
  <module>xxx-utils</module>
</modules>
```

::warning

聚合工程中所包含的模块，在构建时，会自动根据模块间的依赖关系设置构建顺序，与聚合工程中模块的配置书写位置无关

::

::tip

maven 中继承与聚合的联系与区别

**联系**：继承与聚合都属于设计型模块，打包方式都为 pom，常将两种关系制作到同一个 pom 文件中

**区别**：

- 继承用于简化依赖配置、统一管理依赖版本，是在子工程中配置继承关系

- 聚合用于快速构建项目，是在父工程（聚合工程）中配置聚合的模块

::

### 私服

**私服**是一种特殊的远程仓库，它是架设在局域网内的仓库服务，用来代理位于外部的中央仓库，用于解决团队内部的资源共享与资源同步问题。

对于一个依赖，查找的顺序是：本地仓库 -> 私服 -> 中央仓库

::warning

私服在企业项目开发中，一个项目/公司，只需要一台即可（无需我们自己搭建）

::

想要在私服中上传或下载资源，需要进行以下步骤：

1. 设置私服的访问用户名/密码（settings.xml 中的 servers 中配置）

```xml
<!-- settings.xml -->

<server>
  <id>xxx-releases</id>
  <username>admin</username>
  <password>admin</password>
</server>
<server>
  <id>xxx-snapshots</id>
  <username>admin</username>
  <password>admin</password>
</server>
```

2. 在 IDEA 的 maven 工程的 pom 文件中配置上传（发布）地址

```xml
<!-- pom.xml -->

<distributionManagement>
  <repository>
    <id>xxx-releases</id>
    <url>xxx</url>
  </repository>
  <snapshotRepository>
    <id>xxx-snapshots</id>
    <url>xxx</url>
  </snapshotRepository>
</distributionManagement>
```

3. 设置私服依赖下载的仓库组地址（settings.xml 中的 mirrors、profiles 中配置）

```xml
<!-- settings.xml -->

<mirror>
  <id>xxx-public</id>
  <mirrorOf>*</mirrorOf>
  <url>xxx</url>
</mirror>

<profile>
  <id>all-snapshots</id>
  <activation>
    <activeByDefault>true</activeByDefault>
  </activation>
  <repositories>
    <repository>
      <id>xxx-public</id>
      <url>xxx</url>
      <releases>
        <enabled>true</enabled>
      </releases>
      <snapshots>
        <enabled>true</enabled>
      </snapshots>
    </repository>
  </repositories>
</profile>
```

配置后执行 maven 生命周期的 deploy 生命周期，即可将资源上传到私服中

::warning

maven 的 settings.xml 位置在本地安装 maven 的配置目录下

::

::tip

**项目版本**：

- RELEASE（发行版本）：功能趋于稳定，当前更新停止，可以用于发行的版本，存储在私服中的 RELEASE 仓库中

- SNAPSHOT（快照版本）：功能不稳定，尚处于开发中的版本，即快照版本，存储在私服的 SNAPSHOT 仓库中

::
