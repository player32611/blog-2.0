# Java

> Java 语言是一个面向对象的程序设计语言，除了面向对象的特点意外， Java 语言还在安全性、平台无关性、支持多线程、内存管理等许多方面具有卓越的优点

::: danger 警告

该页面尚未完工!

:::

::: details 目录

[[toc]]

:::

## JDK

Java 的产品加 **JDK**（Java Development Kit：Java 开发工具包），必须安装 JDK 才能使用 Java。

下载链接：https://www.oracle.com/cn/java/

### JDK 的组成

- JVM（Java Virtual Machine）：Java 虚拟机，真正运行 Java 程序的地方。

- 核心类库：Java 自己写好的程序，给程序员自己的程序调用的。

- JRE（Java Runtime Environment）：Java 的运行环境

- JDK（Java Development Kit）：Java 开发工具包（包括上面所有）

::: details Java 与 C++ 的区别

Java 中没有 `#include` 和 `#define` 等预处理功能，用 `import` 语句包含其它类和包

Java 中没有 `structure`，`union` 及 `typedef`

Java 中没有不属于类成员的函数，没有指针和多重继承，Java 只支持单重继承

Java 中禁用 `goto`，但 `goto` 还是保留的关键字

Java 中没有操作符重载

Java 中没有全局变量，可以在类中定义公用、静态的数据成员实现相同功能

:::

## IDEA

### 使用 IDEA 开发 Java 程序的步骤

- project -> module -> package -> class

- 一个 project 中可以创建多个 module

- 一个 module 中可以创建多个 package

- 一个 package 中可以创建多个 class

IDEA 中的 java 程序是自动编译和执行的，编译后的 class 问价在工程路径下的一个 out 文件夹里。

### 常用快捷键

- `main/psvm`、 `sout` 等：快速键入相关代码

- `ctrl + alt + l`：格式化代码

## Java 原理

### 内存

**内存**：软件在运行时，用来临时存储数据的

**内存地址**：

在 32 位的操作系统中，内存地址以 32 位的二进制表示

在 64 位操作系统中，内存地址以 64 位的二进制表示

### 内存分配

Java 中把内存分为了五部分：**栈内存**、**堆内存**、**方法区**、**本地内存栈**、**程序计数器**

**栈内存**：方法被调用进栈执行，执行完毕出栈

::: tip 提示

- 程序的主入口（main 方法）开始执行时会进栈，代码执行完毕会出栈

- 方法出栈后，方法里面的变量全部消失

:::

**堆内存**：所有线程共享，存储对象、数组、字符串常量池（new 关键字开辟的空间在堆内存中）

::: tip 提示

- 如果没有任何地方使用堆里面的对象，那么对象也会从堆里面消失。

:::

**方法区**：存储字节码信息

::: tip 提示

- 方法区里面字节码一般不会消失，除非关闭虚拟机（IDE）

:::

**本地内存栈**：调用本地 Native 方法

**程序计数器**：每个线程独立，记录当前线程执行的字节码指令地址（行号）

基本数据类型在内存中记录的是真实的数据，传递也是真实的数据。

引用数据类型在内存中记录的是地址值，传递也是地址值。

## 基础语法

### 特殊字符

| 特殊字符 |   描述   |
| :------: | :------: |
|    \n    |   换行   |
|    \t    | Tab 缩进 |

### 标识符

**标识符**是代码中所有我们自己起的名字。

::: tip 标识符的命名规则-硬性要求

- 由数组、字母、下划线、美元符 `$` 组成

- 不能以数字开头

- 不能是关键字

- 区分大小写

:::

::: tip 标识符的命名规则-软性建议

- **小驼峰命名法**：用于方法，变量。一个单词时全部小写，多个单词时第一个字母全部小写，其它单词首字母大写

- **大驼峰命名法**：用于类，接口。一个单词时首字母大写，多个单词时每个单词首字母大写

:::

### 逻辑运算符

| 逻辑运算符 |    描述    |
| :--------: | :--------: |
|    `&`     | 与（而且） |
|    `\|`    | 或（或者） |
|    `!`     | 非（取反） |

::: tip 短路逻辑运算符

**运行规则**：和单个的 `&`、`|` 是一样的，只不过提高了效率

- `&&`：**短路与**，当第一个条件为 `true` 时，才会判断第二个条件，当第一个条件为 `false` 时，第二个条件不会判断

- `||`：**短路或**，当第一个条件为 `true` 时，返回 `true`，当第一个条件为 `false` 时，才会判断第二个条件

:::

### 键盘录入

**键盘录入**：获取键盘按下的数据，并保存在变量当中

1. 导入 `java.util.Scanner` 类：

```java
import java.util.Scanner;
```

2. 创建 Scanner 对象：

```java
Scanner sc = new Scanner(System.in);
```

3. 获取数据：

```java
int a = sc.nextInt();
String b = sc.next();
double c = sc.nextDouble();
```

### 输出

**输出**：将数据输出到控制台

```java
System.out.println("输出内容");
```

### 类型转换

**类型转换**：将一种数据类型转换成另一种数据类型

- 隐式转换：不同类型的数据进行计算时，默认采用隐式转换，Java 自动转换，把取值范围小的提升为取值范围大的，再进行计算（如有 byte short 类型的数据，先提升为 int 类型）

- 强制转换：不会主动触发，需要手动书写代码，有可能导致精度丢失

```java
int a = 10;
byte b = (byte) a;
```

### 字符串运算

字符串只有 `+` 操作，没有其它操作

任意数据 + 字符串都是拼接操作，并产生一个新的字符串

```java
String a = 123 + "hello";
// a = "123hello"
String b = 10 + 8 + "岁"
// b = "18岁";
String c = 10 + 8 + "岁" + 1 + 2;
// c = "18岁12"
```

### switch 语句新特性

在 JDK14 及以后的版本中，switch 语句可以采用另一种方式进行书写：

```java
switch (expression) {
  case value1 ->{
    statement1;
  }
  case value2 ->{
    statement2;
  }
  default ->{
    statement3;
  }
}
```

```java
switch (expression) {
  case value1 -> statement1;
  case value2 -> statement2;
  default -> statement3;
}
```

这种情况下，不会发生 case 穿透，即不会执行后面的 case。

如何想要穿透，可以采用以下写法：

```java
int result = switch (expression) {
  case value1 -> {
    yield statement1;
  }
  case value2 -> {
    yield statement2;
  }
  default -> {
    yield statement3;
  }
};
```

```java
int result = switch (expression) {
  case value1 -> statement1;
  case value2 -> statement2;
  default -> statement3;
};
```

这种写法表示将语句结果返回给 `result`。

### 相等与同一

当我们使用通常的等号 `==` 来判断两个对象是否相等时，实际上判断的是这两个对象是否同一。

::: details 具体示例

```java
public class Demo {
  public static void main(String[] args) {
    Student s1 = new Student("张三");
    Student s2 = new Student("张三");
    Student s3 = s1;
    System.out.println(s1 == s2); // false
    System.out.println(s1 == s3); // true
    System.out.println(s1.equals(s2)); // true
  }
}
```

:::

如果想判断两个对象的属性值是否相等，通常的办法是使用 `equals()` 方法进行判断。

## 数组

::: danger 警告

该部分尚未完工!

:::

### 数组的声明

```java
Type[] arrayName;
Type arrayName[];
```

### 数组的静态初始化

**静态初始化**：创建数组的时候，直接给数组赋值

```java
数据类型 数组名[] = new 数据类型[]{数据值, 数据值, ...};
```

或者简写为以下形式：

```java
数据类型 数组名 =  {数据值, 数据值, ...};
```

这里 arrayName 是数组名，其内容是创建的数组在堆空间的地址

::: details 具体示例

```java
int[] arr = new int[]{1, 2, 3}
```

或：

```java
int[] arr = {1, 2, 3}
```

:::

### 数组的动态初始化

**动态初始化**：创建数组的时候指定长度，由系统为数组分配初始值

```java
数据类型 数组名[] = new 数据类型[长度];
```

### 数组在方法中传递

::: details 具体示例

```java
public class Memory{
  public static void main(String[] args) {
    int[] arr = {1, 2, 3};
    System.out.println("交换前：" + arr[0] + arr[1] + arr[2]);
    change(arr);
    System.out.println("交换后：" + arr[0] + arr[1] + arr[2]);
  }
  public static void change(int[] arr) {
    int temp = arr[0];
    arr[0] = arr[2];
    arr[2] = temp;
  }
}
```

:::

### 获取数组长度

数组长度的获取方式：

```java
数组名.length;
```

## 类与对象

::: danger 警告

该部分尚未完工!

:::

**对象**：把相关的数据和方法组织为一个整体来看待

**面向对象**：利用对象进行软件开发

::: tip 小细节

- 描述一类事物的类叫 Javabean 类

- Javabean 类可以写属性和方法（Javabean 类中的方法不加 `static`）

- 带有 main 方法的类叫测试类

:::

### 类的分类

**Javabean 类**：描述一类事物的类

**抽象类**：就是不能使用 new 方法进行初始化的类，即没有具体实例对象的类

**工具类**：不是用来描述一类事物的，也没有 `main` 方法，而是帮我们做一些事情的类

### 类的声明

类的声明语法形式如下：

```java
[public] [abstract|final] class 类名称 [<Type {,Type}>] [extends 父类名称] [implements 接口名称列表] {
  变量成员声明及初始化;
  方法声明及初始化;
 }
```

::: details 具体示例

学生（Student）类举例：

```java
class Student {
  String name;
  int age;
  void introduce(){
    System.out.println("我叫" + name + "，今年" + age + "岁");
  }
}
```

:::

### 方法成员

方法成员声明语法形式如下：

```java
[public|private|protected] [static] [final] [abstract] [native] [synchronized] [<Type,{, Type}>] 返回类型 方法名([参数列表]) [throws exceptionList]
{
  方法体;
}
```

### 创建对象

创建对象的语法形式如下：

```java
类名 对象名 = new 类名();
```

**构造方法**也叫做构造器、构造函数，用于在创建对象的时候给成员变量进行初始化。语法格式如下：

```java
修饰符 类名(参数){
  方法体;
}
```

::: tip 构造方法的特点

- 方法名与类名相同，大小写也要一致

- 没有返回值类型，连 void 都没有

- 没有具体的返回值（不能由 return 带回结果数据）

- 如果没有定义构造方法，系统将给出一个默认的无参数的构造方法

- 如果自己写了任意构造方法，系统将不再提供默认的构造方法

- 待参构造方法和无参数构造方法，两者方法名相同，但是参数不同，这叫做构造方法的重载

- **习惯**：无论是否使用，都手动书写无参数构造方法，和带全部参数的构造方法

:::

::: tip 构造方法的执行时机

- 创造对象的时候由虚拟机调用，不能手动调用构造方法

- 每创建一次对象，就会调用一次构造方法

:::

::: details 创建对象的基本原理

创建对象分为七步：

① 加载 class 字节码文件

② 声明等号左边的局部变量

③ 在堆里面开辟一个空间（对象）

④ 给对象中的属性进行默认初始化

⑤ 给对象中的属性进行显式初始化

⑥ 给对象中的属性利用构造方法进行初始化

⑦ 把对象的内存地址赋值给等号左边的变量

:::

### 传递对象

把一个对象传递给方法，实际传递的是对象的**内存地址**。

当多个变量指向同一个对象的时候，只要有一个变量修改了对象中的属性，其它变量再次访问就是修改之后的结果了。

```java
public class Memory{
  public static void main(String[] args) {
    Student stu = new Student();
    stu.name = "张三";
    stu.age = 18;
    sout.println(stu.name + " " + stu.age);
    change(stu);
    sout.println(stu.name + " " + stu.age);
  }

  public static void change(Student stu) {
    stu.name = "李四";
    stu.age = 19;
  }
}
```

### 枚举类

当对象的个数是有限个时，就不能用以前的 Javabean 类的形式来定义对象。

**枚举**是一个特殊的 Javabean 类，这个类的对象是有限个。

枚举类声明语法形式如下：

```java
public enum 枚举类名 {
  枚举项1,枚举项2,枚举项3, ...
  // 枚举类成员
}
```

::: details 具体示例

```java
public enum Season {
  SPRING("春天"), SUMMER("夏天"), AUTUMN("秋天"), WINTER("冬天");
  private String name;

  private Season(String name) {
    this.name = name;
  }
}

Season s = Season.SPRING;
```

:::

::: warning 枚举类的注意事项

- 每一个枚举项，都是该枚举类的对象

- 枚举项在底层其实就是常量，默认使用 `public`、`static`、`final` 修饰

- 枚举类的第一行上必须是枚举项，枚举项之间用逗号隔开，以分号作为结尾

- 枚举类的构造方法必须是 `private` 修饰，不让外界创建本类的对象

- 编译器会给枚举类新增两个默认存在的方法：`values()`、`valueOf()`

- `values()` 方法表示获取本类所有的枚举项，`valueOf()` 方法表示获取一个指定的枚举项

```java
Season[] arr = Season.values();
Season s = Season.valueOf("SPRING");
```

:::

### 继承

继承是类与类之间的一种父子关系，Java 中提供关键字 **extends**，用于建立类与类之间的关系。

通过继承，可以根据已有类来定义新类，新类拥有已有类的所有成员，且可以增加自己的新成员。

Java 只支持类的单继承，每个子类（派生类）只能有一个直接父类（或叫做基类/超类）。

父类是所有子类的公共属性及方法的集合，子类则是父类的特殊化。

继承的语法形式如下：

```java
[ClassModifier] class 子类 [extends 父类]{
  // 类体
}
```

::: details 具体示例

```java
public class Student extends Person { }
```

:::

::: tip 继承的好处

- 可以把多个子类中重复的代码抽取到父类中，提高代码的复用性

- 子类可以在父类的基础上，增加其它的功能，使子类更强大

:::

::: warning 继承的特点

- Java 只支持单继承，不支持多继承，但支持多层继承

- Java 中的类都默认继承于顶级父类 `Object`

:::

::: details 如何实设计继承结构

- 当类与类之间，存在相同（共性）的内容，并满足子类是父类中的一种，就可以考虑使用继承，来优化代码。

:::

### 关键字

- `static`：表示**静态**，用来修饰成员变量/成员方法。
  - `static` 修饰成员变量，叫做静态变量，被该类所有对象共享
  - `static` 修饰成员方法，叫做静态方法，多用在测试类和工具类中，Javabean 类中很少会用

::: details 具体示例：静态变量

```java
public class Student {
  String name;
  int age;
  static String teacherName;
}

public static void main(String[] args) {
  Student stu = new Student();
  stu.name = "张三";
  stu.age = 18;
  Student.teacherName = "张三"; // 类名调用静态变量（推荐）
  stu.teacherName = "张三"; // 对象名调用静态变量
}
```

:::

::: details 具体示例：静态方法

```java
public class ArrayUtils {
  private ArrayUtils() {}
  public static int getMax(int[] arr) {}
}

public static void main(String[] args) {
  int[] arr = {1, 2, 3, 4, 5};
  int max = ArrayUtils.getMax(arr);
}
```

:::

::: tip static 关键字的内存解析

- 静态变量不属于某个对象，而是属于整个类的

- 静态变量是随着类的加载而加载的，优先于对象出现的。因此可以在任意对象创建前为静态变量赋值。

:::

::: warning 静态的注意事项

- 静态方法只能访问静态变量和其它的静态方法

- 非静态方法可以访问静态变量或者静态方法，也可以访问非静态的成员变量和非静态的成员方法

- 静态方法中没有 `this` 关键字

:::

- `final`：可以修饰变量、类、方法
  - `final` 修饰变量：表示该变量只能赋值一次、数据不可变、通常用大写字母表示、多个单词下划线隔开

::: details 具体示例

```java
final String NUMBER = 100;
final int MAX_SIZE = 100;
```

:::

- `private`：是一个权限修饰符，可以修饰成员变量和成员方法。一旦被 `private` 修饰，只能在本类中才能访问，外界无法访问。

::: details 具体示例

```java
class Student {
  private String name;
}
```

:::

- `this`：一个对象引用，表示当前对象，直接使用成员变量加 `this` 前缀

::: details 具体示例

```java
class Student {
  private String name;
  public void setName(String name) {
    this.name = name;
  }
}
```

:::

::: tip this 的本质

`this` 代表所在方法**调用者**的内存地址

:::

- `super`：一个对象引用，表示父类对象，直接使用成员变量加 `super` 前缀

::: details 具体示例

```java
public class Fu{
  String name = "Fu";
}
public class Zi extends Fu{
  String name = "Zi";
  public void show(){
    String name = "ziShow";
    System.out.println(name); // ziShow
    System.out.println(this.name); // zi
    System.out.println(super.name); // Fu
  }
}
```

:::

## 包

::: danger 警告

该部分尚未完工!

:::
