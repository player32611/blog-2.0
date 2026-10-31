# 后端面试题

## Java 基础

### == 和 equals 的区别

> `==` 对于基本数据类型比较的是值，对于引用类型比较的是对象的内存地址；`equals` 是 `Object` 提供的方法，默认实现也是用 `==` 比较地址，但很多类（如 `String`、`Integer` 等）会重写 `equals`，让它比较对象的内容是否相等。

- `==`：基本类型比较值，引用类型比较地址

- `equals`：`Object` 默认实现 `return (this == obj)`，比较的是地址

```java
String s1 = new String("hello");
String s2 = new String("hello");

System.out.println(s1 == s2);       // false，比较地址
System.out.println(s1.equals(s2));  // true，String 重写了 equals，比较内容

int a = 100;
int b = 100;
System.out.println(a == b);         // true，基本类型比较值
```

::tip

重写 `equals` 时通常也要重写 `hashCode`。如果两个对象 `equals` 返回 true，它们的 `hashCode` 必须相等，否则在 `HashSet`、`HashMap` 等基于哈希的结构中会出现问题。

::

### String、StringBuffer、StringBuilder 的区别

> `String` 是不可变的，每次修改都会生成新的对象；`StringBuffer` 和 `StringBuilder` 是可变的字符串。其中 `StringBuffer` 是线程安全的（方法加了 `synchronized`），`StringBuilder` 不是线程安全的但性能更好。单线程环境下优先使用 `StringBuilder`。

- `String`：不可变，底层是 `final char[]`（JDK 9 之后是 `byte[]`）

- `StringBuffer`：可变，线程安全，效率较低

- `StringBuilder`：可变，线程不安全，效率较高

```java
// String 拼接会创建新对象，浪费内存
String s = "a";
s += "b"; // 实际创建了新的 String 对象

// 循环拼接推荐使用 StringBuilder
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100; i++) {
    sb.append(i);
}
```

### 重载（Overload）和重写（Override）的区别

> 重载发生在同一个类中，方法名相同但参数列表不同（参数个数、类型或顺序不同），返回值可以不同，属于编译期多态；重写发生在父子类之间，子类重新实现父类的方法，方法签名必须一致，属于运行期多态。

- 重载：方法名相同，参数列表不同，与返回值无关

- 重写：方法名、参数列表、返回值都相同，子类对父类方法重新实现

```java
class Parent {
    public void say(String name) {
        System.out.println("parent: " + name);
    }
}

class Child extends Parent {
    // 重写
    @Override
    public void say(String name) {
        System.out.println("child: " + name);
    }

    // 重载
    public void say(String name, int age) {
        System.out.println(name + " " + age);
    }
}
```

### 接口（interface）和抽象类（abstract class）的区别

> 接口强调“能做什么”，抽象类强调“是什么”。接口中的方法默认是 `public abstract`，JDK 8 之后可以有 `default` 方法和 `static` 方法，JDK 9 之后可以有私有方法；抽象类可以有普通方法、成员变量、构造方法。一个类可以实现多个接口，但只能继承一个抽象类。

- 接口：多实现，JDK 8 后可以有 `default` 方法

- 抽象类：单继承，可以有成员变量、构造方法、普通方法

```java
interface Flyable {
    void fly();

    default void land() {
        System.out.println("landing");
    }
}

abstract class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    abstract void eat();
}
```

### final、finally、finalize 的区别

> `final` 是关键字，用于修饰类（不可继承）、方法（不可重写）、变量（不可修改）；`finally` 是异常处理的一部分，无论是否发生异常都会执行，常用于释放资源；`finalize` 是 `Object` 的方法，在对象被 GC 回收前调用，但已被 JDK 9 标记为废弃，不应依赖它。

```java
final int MAX = 100; // 不可修改

try {
    // 业务逻辑
} finally {
    // 无论是否异常都会执行，释放资源
}
```

### Java 中的异常体系

> Java 异常分为 `Throwable` 下的 `Error` 和 `Exception`。`Error` 是系统级错误，程序无法处理；`Exception` 分为受检异常（`checked exception`，编译期强制处理）和非受检异常（`unchecked exception`，即 `RuntimeException` 及其子类）。常见受检异常有 `IOException`、`SQLException`；常见非受检异常有 `NullPointerException`、`IndexOutOfBoundsException`。

```java
// 受检异常：必须 try-catch 或 throws
public void readFile() throws IOException {
    FileReader reader = new FileReader("test.txt");
}

// 非受检异常：可以不处理
public void test() {
    throw new NullPointerException("空指针");
}
```

### Java 中创建对象的方式

> 常见方式有：使用 `new` 关键字、反射（`Class.newInstance()` 或 `Constructor.newInstance()`）、`clone()`、反序列化，以及工厂方法、建造者模式等设计模式。

- `new`：最常用

- 反射：`Class.forName("...").newInstance()` 或 `Constructor.newInstance()`

- `clone()`：需要实现 `Cloneable` 接口

- 反序列化：从字节流恢复对象

```java
// 反射创建对象
Class<?> clazz = Class.forName("com.example.User");
User user = (User) clazz.getDeclaredConstructor().newInstance();
```

### Java 的四种引用类型

> Java 引用分为强引用、软引用、弱引用、虚引用。强引用是最常见的引用，只要存在就不会被 GC；软引用在内存不足时才会被回收；弱引用在下一次 GC 时就会被回收，常用于 `WeakHashMap`；虚引用主要用于跟踪对象被回收的时机。

- 强引用：`Object obj = new Object()`，不会被 GC

- 软引用：`SoftReference`，内存不足时回收，适合做缓存

- 弱引用：`WeakReference`，下次 GC 即回收

- 虚引用：`PhantomReference`，配合引用队列跟踪回收

```java
SoftReference<Object> soft = new SoftReference<>(new Object());
WeakReference<Object> weak = new WeakReference<>(new Object());
```

## Java 集合

### ArrayList 和 LinkedList 的区别

> `ArrayList` 底层是动态数组，支持随机访问，时间复杂度为 O(1)，但在中间插入删除需要移动元素，时间复杂度为 O(n)；`LinkedList` 底层是双向链表，插入删除较快，但随机访问需要遍历，时间复杂度为 O(n)。查询多、随机访问多的场景用 `ArrayList`，频繁增删的场景用 `LinkedList`。

```java
List<Integer> arrayList = new ArrayList<>();
arrayList.add(1);
arrayList.get(0); // O(1)

List<Integer> linkedList = new LinkedList<>();
linkedList.add(1);
linkedList.get(0); // 需要遍历，O(n)
```

### ArrayList 的扩容机制

> `ArrayList` 底层是数组，初始容量为空数组，第一次 `add` 时扩容为默认容量 10。当元素个数超过当前容量时，会创建一个大小为原容量 1.5 倍的新数组，并把旧数组的元素拷贝过去。

```java
// 扩容核心逻辑（JDK 源码简化）
int newCapacity = oldCapacity + (oldCapacity >> 1); // 1.5 倍
elementData = Arrays.copyOf(elementData, newCapacity);
```

::tip

创建 `ArrayList` 时如果能够预估元素数量，建议使用 `new ArrayList<>(initialCapacity)` 指定初始容量，减少扩容次数。

::

### HashMap 的底层原理

> JDK 8 中 `HashMap` 底层是「数组 + 链表 + 红黑树」。通过 key 的 `hashCode` 计算下标存入数组，发生哈希冲突时用链表解决；当链表长度超过 8 且数组长度超过 64 时，链表会转换为红黑树以提高查询效率。默认初始容量为 16，负载因子为 0.75，超过阈值会扩容为原来的 2 倍。

```java
// 计算下标
int hash = (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
int index = (n - 1) & hash;
```

::warning

`HashMap` 是线程不安全的，并发场景下可能导致死循环或数据丢失（JDK 8 已修复死循环，但仍会丢数据）。并发场景应使用 `ConcurrentHashMap`。

::

### HashMap 和 Hashtable 的区别

> `Hashtable` 是 JDK 1.0 的遗留类，线程安全但效率低，且 key 和 value 都不能为 null；`HashMap` 线程不安全，key 和 value 都允许为 null。现代并发场景推荐使用 `ConcurrentHashMap`。

- `HashMap`：线程不安全，允许 null 键值

- `Hashtable`：线程安全（方法加 `synchronized`），不允许 null 键值

- `ConcurrentHashMap`：线程安全，采用分段锁/CAS，效率更高

### ConcurrentHashMap 的原理

> JDK 8 的 `ConcurrentHashMap` 放弃了分段锁（Segment），改为「数组 + 链表 + 红黑树」结构，使用 CAS 和 `synchronized` 锁单个桶（Node）来实现并发控制。写入时对桶头节点加锁，读取不加锁，因此并发读效率很高。

```java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("key", 1); // 对桶节点加锁或 CAS 写入
map.get("key");    // 无锁读
```

### HashSet 如何保证元素不重复

> `HashSet` 底层基于 `HashMap` 实现，把元素作为 `HashMap` 的 key，value 统一是一个固定的 `PRESENT` 对象。通过 key 的 `hashCode` 和 `equals` 来保证元素唯一，所以存入自定义对象时需要正确重写这两个方法。

```java
// HashSet.add 实际调用
map.put(e, PRESENT);
```

## JVM

### JVM 的内存结构

> JVM 内存主要分为线程私有的程序计数器、虚拟机栈、本地方法栈，以及线程共享的堆和方法区（JDK 8 后用元空间 Metaspace 取代永久代）。堆是对象分配的主要区域，也是 GC 的重点区域；虚拟机栈存放方法调用的栈帧，包括局部变量表、操作数栈等。

- 程序计数器：记录当前线程执行的字节码指令地址

- 虚拟机栈：每个方法执行时创建栈帧，存放局部变量、操作数栈、方法出口等

- 本地方法栈：为 native 方法服务

- 堆：存放对象实例，是 GC 的主要区域

- 方法区/元空间：存放类信息、常量、静态变量、即时编译后的代码

### 堆和栈的区别

> 堆用于存放对象实例，由所有线程共享，是 GC 管理的主要区域；栈是线程私有的，存放方法调用的局部变量、基本类型变量和对象引用。栈的存取速度快，生命周期与方法同步；堆的内存可以动态分配，但需要 GC 回收。

```java
public void test() {
    int a = 1;          // 基本类型，在栈上
    User user = new User(); // user 引用在栈上，User 对象在堆上
}
```

### 如何判断对象是否可回收

> 常见的判定算法有引用计数法和可达性分析算法。JVM 使用的是可达性分析：以 GC Roots 为起点，从这些根对象向下搜索，如果某个对象不可达，则判定为可回收。GC Roots 包括虚拟机栈中的局部变量、静态变量、常量、native 方法引用的对象等。

- 引用计数法：对象被引用计数为 0 则回收，但无法解决循环引用

- 可达性分析：从 GC Roots 出发，不可达的对象可回收

### 常见的垃圾回收算法

> 垃圾回收算法主要有标记-清除、复制、标记-整理和分代收集。标记-清除产生内存碎片；复制算法效率高但浪费空间，适合新生代；标记-整理解决碎片问题但效率较低；现代 JVM 通常采用分代收集，新生代用复制算法，老年代用标记-清除或标记-整理。

- 标记-清除：标记可回收对象后直接清除，产生碎片

- 复制：将存活对象复制到另一块区域，适合对象存活率低的新生代

- 标记-整理：清除后将存活对象向一端移动，避免碎片

- 分代收集：按对象存活时间分区域，采用不同算法

### 常见的垃圾回收器

> 常见 GC 有 Serial、ParNew、Parallel Scavenge（新生代）以及 CMS、G1、ZGC（老年代/整堆）。CMS 以低停顿为目标但会产生碎片；G1 将堆划分为多个 Region，可预测停顿时间；ZGC 以极低停顿为目标，适合大内存、低延迟场景。

- Serial：单线程，适合客户端小内存

- Parallel Scavenge：吞吐量优先

- CMS：低停顿，标记-清除，产生碎片

- G1：可预测停顿，Region 划分

- ZGC：超低延迟，支持超大堆

### 类加载过程

> 类加载分为加载、验证、准备、解析、初始化五个阶段。加载读取 class 字节码生成 Class 对象；验证保证字节码安全；准备为静态变量分配内存并赋默认值；解析把符号引用替换为直接引用；初始化执行静态变量赋值和静态代码块。

1. 加载：读取 class 文件字节码

2. 验证：校验字节码格式和安全性

3. 准备：为静态变量分配内存并赋默认值

4. 解析：符号引用替换为直接引用

5. 初始化：执行 `<clinit>`，静态变量赋值、静态代码块

### 双亲委派模型

> 类加载器采用双亲委派模型：当一个类加载器收到类加载请求时，先委派给父类加载器加载，只有父加载器无法加载时才自己加载。这样可以避免类的重复加载，并防止核心类库被篡改。

```java
protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
    // 先检查是否已加载
    Class<?> c = findLoadedClass(name);
    if (c == null) {
        try {
            if (parent != null) {
                c = parent.loadClass(name, false); // 先交给父加载器
            }
        } catch (ClassNotFoundException e) {
            // 父加载器加载不到
        }
        if (c == null) {
            c = findClass(name); // 自己加载
        }
    }
    return c;
}
```

### 内存泄漏和内存溢出

> 内存泄漏（Memory Leak）是指不再使用的对象仍然被引用，无法被 GC 回收；内存溢出（OutOfMemoryError，OOM）是指内存不足无法分配新对象。内存泄漏积累到一定程度会导致内存溢出。常见泄漏场景有静态集合持有对象、未关闭的连接、`ThreadLocal` 未清理等。

## 并发编程

### 线程和进程的区别

> 进程是资源分配的基本单位，拥有独立的内存空间；线程是 CPU 调度的基本单位，同一进程内的线程共享进程的内存资源。进程之间相互独立，线程之间可以共享数据但切换开销更小。

- 进程：独立内存空间，创建销毁开销大

- 线程：共享进程内存，轻量级，切换快

### 线程的生命周期

> Java 线程有 NEW（新建）、RUNNABLE（可运行）、BLOCKED（阻塞）、WAITING（等待）、TIMED_WAITING（限时等待）、TERMINATED（终止）六种状态。

```java
Thread thread = new Thread();  // NEW
thread.start();                // RUNNABLE
// 等待锁 -> BLOCKED
// wait() -> WAITING
// sleep() / wait(timeout) -> TIMED_WAITING
// 运行结束 -> TERMINATED
```

### 创建线程的方式

> 主要有四种方式：继承 `Thread` 类、实现 `Runnable` 接口、实现 `Callable` 接口（有返回值、可抛异常）、使用线程池。

```java
// 1. 继承 Thread
class MyThread extends Thread {
    @Override
    public void run() {}
}

// 2. 实现 Runnable
class MyRunnable implements Runnable {
    @Override
    public void run() {}
}

// 3. 实现 Callable
class MyCallable implements Callable<String> {
    @Override
    public String call() {
        return "result";
    }
}
```

### synchronized 的原理

> `synchronized` 是 JVM 层面的锁，通过对象的 Monitor（监视器）实现。进入同步块时获取对象的 monitor 锁，退出时释放。JDK 1.6 之后进行了大量优化，引入了偏向锁、轻量级锁、重量级锁的升级过程，以及锁粗化、锁消除等优化。

```java
public synchronized void method() {
    // 方法级同步，锁的是 this
}

public void method() {
    synchronized (lock) {
        // 代码块同步
    }
}
```

### volatile 的作用

> `volatile` 保证变量的可见性和有序性，但不保证原子性。被 `volatile` 修饰的变量，写操作会立即刷回主内存，读操作会从主内存读取，从而保证多个线程之间能看到最新值。同时它通过内存屏障禁止指令重排序。

```java
private volatile boolean flag = false;

public void stop() {
    flag = true; // 其它线程能立即看到修改
}
```

::tip

`synchronized` 和 `volatile` 的区别

- `volatile` 只能修饰变量，保证可见性、有序性，不保证原子性，不会阻塞

- `synchronized` 修饰方法或代码块，保证原子性、可见性、有序性，但会阻塞

::

### CAS 是什么

> CAS（Compare And Swap，比较并交换）是一种无锁的乐观并发控制机制。它比较内存中的值是否等于预期值，如果相等就更新为新值，否则不做任何操作。CAS 底层由 CPU 指令支持，是 `AtomicInteger` 等原子类的实现基础。

```java
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet(); // 基于 CAS 的原子自增
```

::warning

CAS 存在 ABA 问题：值从 A 变成 B 又变回 A，CAS 无法察觉。可以通过版本号（如 `AtomicStampedReference`）解决。

::

### ThreadLocal 的原理

> `ThreadLocal` 为每个线程提供独立的变量副本，实现线程隔离。每个线程内部有一个 `ThreadLocalMap`，key 是 `ThreadLocal` 的弱引用，value 是存储的值。常用于保存线程上下文，如数据库连接、用户信息等。

```java
ThreadLocal<String> local = new ThreadLocal<>();
local.set("user-1"); // 当前线程自己的副本
String value = local.get();
local.remove();      // 使用后务必 remove，防止内存泄漏
```

::warning

`ThreadLocal` 使用完应调用 `remove()`。因为 `ThreadLocalMap` 的 key 是弱引用，但 value 是强引用，在线程池场景下线程长期存活，可能导致 value 无法被回收，造成内存泄漏。

::

### 线程池的核心参数与工作原理

> 线程池的核心参数有 corePoolSize（核心线程数）、maximumPoolSize（最大线程数）、keepAliveTime（非核心线程空闲存活时间）、workQueue（工作队列）、threadFactory 和 handler（拒绝策略）。当任务到来时，先创建核心线程处理，核心线程满了放入队列，队列满了再创建非核心线程，达到最大线程数后执行拒绝策略。

```java
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    2,                              // corePoolSize
    5,                              // maximumPoolSize
    60,                             // keepAliveTime
    TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(100),  // 工作队列
    new ThreadPoolExecutor.AbortPolicy() // 拒绝策略
);
```

### synchronized 和 Lock 的区别

> `synchronized` 是 JVM 内置的关键字，自动加锁释放，使用简单但功能有限；`Lock`（如 `ReentrantLock`）是 JDK 提供的接口，需要手动 `lock()`/`unlock()`，但支持公平锁、可中断、超时、条件变量等更灵活的锁控制。

```java
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // 业务逻辑
} finally {
    lock.unlock(); // 务必在 finally 中释放
}
```

## Spring / Spring Boot

### Spring 的 IoC 和 AOP

> IoC（控制反转）把对象的创建和依赖管理交给 Spring 容器，通过 DI（依赖注入）注入依赖，降低耦合；AOP（面向切面编程）将日志、事务、权限等横切关注点与业务逻辑分离，通过代理在方法前后织入增强逻辑。

- IoC：创建对象的控制权由程序员反转到 Spring 容器

- AOP：在不修改源码的情况下为方法增加额外功能

```java
// 事务、日志等就是典型的 AOP 应用
@Transactional
public void save() {
    // 业务逻辑
}
```

### Bean 的生命周期

> Spring Bean 的生命周期大致为：实例化 → 属性填充 → 初始化（`@PostConstruct`、`InitializingBean`、`init-method`）→ 使用 → 销毁（`@PreDestroy`、`DisposableBean`、`destroy-method`）。通过 `BeanPostProcessor` 可以在初始化前后做额外处理。

```java
@Component
public class UserService {
    @PostConstruct
    public void init() {
        // 初始化
    }

    @PreDestroy
    public void destroy() {
        // 销毁
    }
}
```

### Bean 的作用域

> Spring 中 Bean 的作用域主要有 singleton（单例，默认）、prototype（原型，每次获取新建）、request（每个请求一个）、session（每个会话一个）。单例 Bean 由容器缓存，原型 Bean 每次获取都创建新实例。

```java
@Scope("prototype")
@Component
public class PrototypeBean {}
```

### Spring 如何解决循环依赖

> Spring 通过三级缓存解决单例 Bean 的循环依赖。三级缓存分别是 singletonObjects（完整 Bean）、earlySingletonObjects（早期 Bean）、singletonFactories（Bean 工厂）。A 依赖 B、B 依赖 A 时，A 实例化后先把对象工厂放入三级缓存，然后填充 B，B 又依赖 A 时从三级缓存拿到 A 的早期引用完成注入。

::warning

Spring 只能解决单例 Bean 的构造器循环依赖，无法解决 prototype 作用域的循环依赖，构造器注入的循环依赖也无法完全解决，推荐使用 `@Lazy` 或重构设计。

::

### @Autowired 和 @Resource 的区别

> `@Autowired` 是 Spring 提供的注解，默认按类型注入，配合 `@Qualifier` 按名称注入；`@Resource` 是 JDK 提供的注解，默认按名称注入，找不到再按类型。`@Autowired` 的 `required` 属性默认为 true，找不到 Bean 会报错。

```java
// 按类型注入
@Autowired
private UserService userService;

// 按名称注入
@Resource(name = "userService")
private UserService userService;
```

### Spring Boot 自动装配原理

> Spring Boot 通过 `@EnableAutoConfiguration` 和 `spring.factories`（或 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`）加载自动配置类。`@Conditional` 系列注解根据类是否存在、Bean 是否缺失等条件决定是否生效，从而实现“约定优于配置”。

```java
@SpringBootApplication
// 等价于
// @SpringBootConfiguration
// @EnableAutoConfiguration  -> 开启自动装配
// @ComponentScan           -> 组件扫描
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### Spring 事务的传播行为

> 事务传播行为定义了多个事务方法相互调用时事务如何传播。常见的有 REQUIRED（默认，有事务则加入，没有则新建）、REQUIRES_NEW（总是新建事务，挂起当前事务）、SUPPORTS（有则加入，没有则以非事务执行）、NOT_SUPPORTED（以非事务执行，挂起当前事务）、MANDATORY（必须有事务）、NEVER（必须无事务）、NESTED（嵌套事务）。

```java
@Transactional(propagation = Propagation.REQUIRED)
public void methodA() {
    // 加入当前事务
}

@Transactional(propagation = Propagation.REQUIRES_NEW)
public void methodB() {
    // 新建独立事务
}
```

### Spring 事务失效的场景

> 事务失效的常见场景有：方法不是 public、自身调用（this 调用导致代理失效）、异常被 try-catch 捕获未抛出、抛出的不是 `RuntimeException`、数据库引擎不支持事务、类未被 Spring 管理、`@Transactional` 用在非事务方法上等。

```java
// 事务失效：自调用，绕过了代理
public void outer() {
    this.inner(); // 事务不生效
}

@Transactional
public void inner() {
    // ...
}
```

## Spring Cloud / 微服务

### 什么是微服务

> 微服务是把一个大型单体应用拆分为多个独立的小服务，每个服务负责单一业务功能，可以独立开发、部署、扩展。服务之间通过 HTTP、RPC 等方式通信。优点是独立部署、技术栈灵活、易扩展，缺点是系统复杂度高、运维成本高、分布式事务和一致性问题。

- 优点：独立部署、易扩展、故障隔离、技术栈灵活

- 缺点：复杂度高、调用链路长、分布式事务难处理

### 服务注册与发现

> 服务注册与发现是微服务的核心组件。服务启动时向注册中心（如 Nacos、Eureka、Consul）注册自己的地址信息，服务调用方从注册中心获取可用服务列表。注册中心还负责健康检查、服务下线等，常见的实现有 Eureka、Nacos、Zookeeper、Consul。

### 负载均衡

> 负载均衡将请求分摊到多个服务实例上，提高可用性和吞吐量。客户端负载均衡（如 Ribbon、Spring Cloud LoadBalancer）由调用方根据策略选择实例；服务端负载均衡（如 Nginx）由代理统一分发。常见策略有轮询、随机、加权轮询、最少连接、一致性哈希等。

### 熔断、降级和限流

> 熔断是当某个服务错误率达到阈值时，直接快速失败，避免故障扩散；降级是在服务不可用或高负载时，返回兜底数据保证核心流程可用；限流是控制请求速率，防止系统被突发流量压垮。常见的实现有 Hystrix、Sentinel。

- 熔断：快速失败，防止级联故障

- 降级：返回兜底方案

- 限流：控制流量，如令牌桶、漏桶算法

### API 网关的作用

> API 网关是所有请求的统一入口，负责路由转发、鉴权、限流、日志、协议转换、灰度发布等。常见的网关有 Spring Cloud Gateway、Zuul、Kong、Nginx 等。

### CAP 理论

> CAP 理论指分布式系统无法同时满足一致性（Consistency）、可用性（Availability）和分区容错性（Partition tolerance），最多只能同时满足两个。分布式系统由于网络分区不可避免，必须在 C 和 A 之间取舍。常见的 CP 方案有 Zookeeper，AP 方案有 Eureka、Nacos（可配置）。

### 分布式事务的解决方案

> 分布式事务解决方案主要有两阶段提交（2PC）、三阶段提交（3PC）、TCC、本地消息表、最终一致性（可靠消息）、SAGA 等。强一致方案（2PC、TCC）复杂度高、性能差；最终一致方案（本地消息表、可靠消息）更常用。

- 2PC：两阶段提交，强一致但阻塞

- TCC：Try-Confirm-Cancel，业务侵入强

- 本地消息表：保证最终一致，实现简单

- 可靠消息：事务消息 + 消息确认

## MySQL

### MySQL 的存储引擎

> MySQL 常见的存储引擎有 InnoDB 和 MyISAM。InnoDB 支持事务、行级锁、外键，是默认引擎；MyISAM 不支持事务，只支持表级锁，但查询速度较快，适合读多写少的场景。

- InnoDB：支持事务、行锁、外键、崩溃恢复，默认引擎

- MyISAM：不支持事务、表锁、查询快

### InnoDB 和 MyISAM 的区别

> InnoDB 支持事务、行级锁和外键，支持崩溃恢复（通过 redo log），数据以聚簇索引存储；MyISAM 不支持事务和行锁，只支持表锁，索引和数据文件分离，不支持外键。

| 对比项 | InnoDB | MyISAM |
| --- | --- | --- |
| 事务 | 支持 | 不支持 |
| 锁 | 行级锁 | 表级锁 |
| 外键 | 支持 | 不支持 |
| 崩溃恢复 | 支持 | 不支持 |
| 索引存储 | 聚簇索引 | 非聚簇索引 |

### 索引的底层原理（B+ 树）

> InnoDB 索引底层使用 B+ 树。B+ 树是一种多路平衡搜索树，非叶子节点只存键值不存数据，所有数据都存放在叶子节点，叶子节点之间通过链表连接，方便范围查询。B+ 树的高度低，磁盘 IO 次数少，查询效率高。

::tip

为什么不用 B 树或哈希？

- B 树节点会存数据，导致每页存储的键值减少，树更高，IO 更多

- 哈希索引只支持等值查询，不支持范围查询和排序

::

### 聚簇索引和非聚簇索引

> 聚簇索引的叶子节点存放的是整行数据，一个表只能有一个聚簇索引（InnoDB 默认用主键作为聚簇索引）；非聚簇索引（二级索引）的叶子节点存放的是主键值，通过主键值回表查询。覆盖索引可以避免回表。

```sql
-- 主键索引（聚簇）
PRIMARY KEY (id)

-- 二级索引（非聚簇），叶子存主键 id
INDEX idx_name (name)
```

### 事务的四大特性 ACID

> 事务的四大特性是原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）。原子性通过 undo log 保证，隔离性通过锁和 MVCC 保证，持久性通过 redo log 保证。

- 原子性：事务内的操作要么全部成功，要么全部失败

- 一致性：事务执行前后数据保持合法状态

- 隔离性：多个事务并发执行时互不干扰

- 持久性：事务提交后数据永久保存

### 事务隔离级别

> MySQL 事务隔离级别从低到高依次为：读未提交（READ UNCOMMITTED）、读已提交（READ COMMITTED）、可重复读（REPEATABLE READ，默认）、串行化（SERIALIZABLE）。隔离级别越高，并发性能越低。不同级别可能产生脏读、不可重复读、幻读问题。

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
| --- | --- | --- | --- |
| 读未提交 | 可能 | 可能 | 可能 |
| 读已提交 | 不会 | 可能 | 可能 |
| 可重复读 | 不会 | 不会 | 可能 |
| 串行化 | 不会 | 不会 | 不会 |

### MVCC 是什么

> MVCC（多版本并发控制）通过版本链和 ReadView 实现不加锁的并发读。每行记录有隐藏的 `trx_id`（事务 ID）和 `roll_pointer`（回滚指针），指向 undo log 中的旧版本。事务读取时根据自己的 ReadView 判断可见版本，从而实现读已提交和可重复读。

- 每个事务在开始时生成 ReadView

- 根据版本链中记录的 `trx_id` 判断可见性

- 读已提交：每次查询都生成新 ReadView

- 可重复读：事务内使用同一个 ReadView

### 索引失效的场景

> 索引失效的常见场景：对索引列使用函数或运算、隐式类型转换、使用 `LIKE '%xx'` 前置模糊查询、违反最左前缀原则、OR 条件、范围查询后的列、`IS NULL`/`IS NOT NULL`、`!=`/`<>`、优化器认为全表扫描更快等。

```sql
-- 失效示例
WHERE YEAR(create_time) = 2024;      -- 对索引列使用函数
WHERE name LIKE '%keyword%';         -- 前置模糊
WHERE phone = 13800138000;           -- 隐式类型转换（phone 是 varchar）
WHERE a = 1 OR b = 2;                -- OR 连接非索引列
```

### 慢查询如何优化

> 慢查询优化首先开启慢查询日志定位慢 SQL，然后用 `EXPLAIN` 分析执行计划，关注 type、key、rows 等字段。优化手段包括：添加或调整索引、避免索引失效、优化 SQL 语句、减少回表、使用覆盖索引、垂直/水平分表、读写分离等。

```sql
EXPLAIN SELECT * FROM user WHERE name = 'Tom';
-- 关注：type（访问类型）、key（使用索引）、rows（扫描行数）
```

### SQL 优化的一般思路

> SQL 优化遵循：先看是否命中索引，再看是否返回过多数据。具体手段有：`SELECT` 只查需要的字段避免 `SELECT *`、使用连接代替子查询、避免在 where 中对字段做运算、合理分页、小表驱动大表、分批处理大数据等。

## Redis

### Redis 的数据类型及使用场景

> Redis 常见数据类型有 String、Hash、List、Set、ZSet，以及 Bitmap、HyperLogLog、GEO、Stream 等扩展类型。String 适合缓存、计数器；Hash 适合存对象；List 适合消息队列、排行榜；Set 适合去重、交并集；ZSet 适合排行榜。

```bash
SET user:1:name "Tom"       # String
HSET user:1 name Tom age 18 # Hash
LPUSH list a b c            # List
SADD set a b c              # Set
ZADD rank 100 Tom           # ZSet
```

### Redis 的持久化 RDB 和 AOF

> RDB 是快照式持久化，定期把内存数据写入磁盘，恢复快但可能丢失最近的数据；AOF 是追加日志，每次写操作追加到日志文件，数据更完整但文件更大、恢复慢。生产环境通常两者结合使用。

- RDB：定时快照，恢复快，可能丢数据

- AOF：记录写命令，数据更完整，文件大

::tip

AOF 有三种同步策略：`always`（每次写都同步，最安全）、`everysec`（每秒同步，默认）、`no`（由操作系统决定）。

::

### 缓存穿透、缓存击穿、缓存雪崩

> 缓存穿透是指查询不存在的 key，请求直接打到数据库，可用布隆过滤器或缓存空值解决；缓存击穿是指热点 key 过期瞬间大量请求打到数据库，可用互斥锁或热点 key 不过期解决；缓存雪崩是指大量 key 同时过期或 Redis 宕机，可用过期时间加随机值、多级缓存、集群高可用解决。

```java
// 缓存穿透：缓存空值
if (redis.get(key) == null) {
    Object data = db.query(key);
    if (data == null) {
        redis.set(key, "", 60); // 缓存空值，防止穿透
    }
}
```

### 缓存一致性（缓存和数据库如何保持一致）

> 缓存一致性指缓存和数据库数据保持一致。常见方案有：先更新数据库再删除缓存（Cache Aside）、先删缓存再更新数据库、延迟双删、基于 binlog 的最终一致等。最常用的是 Cache Aside 模式：更新数据库后删除缓存，读时缓存未命中再回填。

```java
// Cache Aside
public void update(User user) {
    db.update(user);   // 1. 先更新数据库
    redis.del(key);    // 2. 再删除缓存
}
```

### Redis 分布式锁

> Redis 分布式锁通过 `SET key value NX EX` 命令实现，NX 保证只有第一个客户端能设置成功，EX 设置过期时间防止死锁。释放锁时需要通过 Lua 脚本原子地判断并删除，防止误删其它线程的锁。Redisson 提供了更完善的实现。

```lua
-- 加锁
SET lock_key unique_value NX EX 30

-- 释放锁（Lua 脚本原子判断）
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end
```

### Redis 为什么快

> Redis 快的原因：基于内存操作；使用单线程避免线程切换和锁竞争；使用高效的数据结构；采用 IO 多路复用处理大量连接；核心命令使用 C 语言实现。

- 基于内存

- 单线程，避免上下文切换和锁

- IO 多路复用（epoll）

- 高效数据结构

### Redis 的过期删除策略和内存淘汰策略

> 过期删除策略有惰性删除和定期删除，二者结合使用：访问 key 时惰性检查是否过期，同时定期随机抽取一批 key 检查删除。当内存达到上限时，根据内存淘汰策略（如 LRU、LFU）删除数据，常见的策略有 `allkeys-lru`、`volatile-lru` 等。

## 消息队列

### 为什么要使用消息队列

> 消息队列（如 Kafka、RabbitMQ、RocketMQ）主要用于异步处理、系统解耦、流量削峰。异步处理可以提升响应速度，解耦可以让上下游系统独立演进，削峰可以缓解高并发对下游系统的冲击。

- 异步：提升响应速度

- 解耦：降低系统间耦合

- 削峰：缓冲瞬时流量

### 如何保证消息不丢失

> 消息丢失可能发生在生产者、Broker、消费者三个环节。生产者可以通过确认机制（confirm/ack）保证消息发送成功；Broker 需要持久化（如 Kafka 的副本同步、RabbitMQ 的持久化队列）；消费者需要在业务处理完成后手动 ack，避免自动 ack 导致消息丢失。

```java
// Kafka 生产者开启确认
props.put(ProducerConfig.ACKS_CONFIG, "all"); // 所有副本确认

// 消费者手动提交 offset
consumer.commitSync(); // 处理成功后提交
```

### 如何保证消息不重复消费

> 消息重复消费是分布式系统的固有问题，无法完全避免，需要通过幂等设计保证重复消费不会造成业务错误。常见方案有：数据库唯一索引、Redis 去重、乐观锁、全局唯一 ID 校验等。

```java
// 幂等：用唯一索引或前置校验
if (db.exists(messageId)) {
    return; // 已处理过，直接跳过
}
```

### 消息堆积如何处理

> 消息堆积通常是消费速度跟不上生产速度。处理方案：增加消费者实例（前提是分区数足够）、优化消费者处理逻辑、扩大分区数、临时增加消费线程、使用批量消费等。核心是提升消费能力。

- 增加消费者数量和分区数

- 优化消费逻辑，减少处理耗时

- 批量消费

### Kafka 和 RabbitMQ 的区别

> Kafka 是分布式流平台，吞吐量极高，适合日志、大数据等海量消息场景，消息按分区顺序消费，支持消息回溯；RabbitMQ 是传统的 AMQP 消息中间件，功能完善，支持复杂的路由规则和消息确认，吞吐量相对较低，适合业务系统的异步解耦。

| 对比项 | Kafka | RabbitMQ |
| --- | --- | --- |
| 吞吐量 | 极高 | 较低 |
| 消息顺序 | 分区内有序 | 队列有序 |
| 回溯 | 支持 | 不支持 |
| 使用场景 | 日志、大数据 | 业务解耦 |

## 网络

### TCP 三次握手和四次挥手

> 三次握手建立连接：客户端发送 SYN，服务端回复 SYN+ACK，客户端再回复 ACK。四次挥手断开连接：一方发送 FIN，另一方回复 ACK，然后发送 FIN，最后回复 ACK。四次挥手是因为 TCP 是全双工的，两个方向都需要分别关闭。

```text
三次握手:
客户端 --SYN--> 服务端
客户端 <-SYN+ACK- 服务端
客户端 --ACK--> 服务端

四次挥手:
客户端 --FIN--> 服务端
客户端 <-ACK--- 服务端
客户端 <-FIN--- 服务端
客户端 --ACK--> 服务端
```

### TCP 和 UDP 的区别

> TCP 是面向连接的可靠传输协议，保证数据顺序和完整性，但开销大、速度慢；UDP 是无连接的不可靠协议，不保证数据到达，但开销小、速度快。TCP 适合文件传输、网页等需要可靠性的场景，UDP 适合视频、语音、游戏等实时性要求高的场景。

- TCP：面向连接、可靠、有序、慢

- UDP：无连接、不可靠、快

### HTTP 和 HTTPS 的区别

> HTTPS 是 HTTP 加上 SSL/TLS 加密。HTTP 明文传输，容易被窃听和篡改；HTTPS 通过 TLS 握手协商密钥，对数据加密传输，并利用证书验证服务器身份。HTTPS 默认端口 443，HTTP 默认端口 80。

- HTTP：明文，端口 80

- HTTPS：加密，端口 443，需要 CA 证书

### OSI 七层模型

> OSI 七层模型从上到下为：应用层、表示层、会话层、传输层、网络层、数据链路层、物理层。实际开发中常说的五层模型（TCP/IP 模型）为：应用层、传输层、网络层、数据链路层、物理层。

- 应用层：HTTP、FTP、DNS

- 传输层：TCP、UDP

- 网络层：IP、路由

- 数据链路层：以太网、MAC 地址

- 物理层：物理介质

### 常见 HTTP 状态码

> HTTP 状态码分为五类：1xx 信息、2xx 成功、3xx 重定向、4xx 客户端错误、5xx 服务端错误。常见的 200 成功、301 永久重定向、302 临时重定向、400 请求错误、401 未认证、403 禁止访问、404 未找到、500 服务器内部错误、502 网关错误、503 服务不可用。

- 200：成功

- 301/302：重定向

- 400：请求参数错误

- 401：未认证，403：无权限，404：不存在

- 500：服务器错误，502：网关错误，503：服务不可用

### 浏览器输入 URL 到页面展示，发生了什么

> 大致流程：DNS 解析域名得到 IP → 建立 TCP 连接（三次握手）→ 若是 HTTPS 则进行 TLS 握手 → 发送 HTTP 请求 → 服务器处理请求并返回响应 → 浏览器解析 HTML 构建 DOM、解析 CSS 构建 CSSOM、合并成渲染树 → 布局（Layout）→ 绘制（Paint）→ 合成（Composite）显示页面。

## 操作系统 / Linux

### 死锁及产生条件

> 死锁是指多个线程相互等待对方持有的资源，导致都无法继续执行。产生死锁需要同时满足四个条件：互斥、请求与保持、不可剥夺、循环等待。破坏其中任意一个条件即可避免死锁。

- 互斥：资源只能被一个线程占用

- 请求与保持：持有资源的同时请求其它资源

- 不可剥夺：资源不能被强制抢占

- 循环等待：形成资源的环形等待链

### Linux 常用命令

> 常见命令有：`ls` 查看目录、`cd` 切换目录、`pwd` 查看路径、`cat`/`tail`/`head` 查看文件、`grep` 搜索、`ps` 查看进程、`top` 查看资源占用、`df`/`du` 查看磁盘、`chmod` 修改权限、`netstat`/`ss` 查看网络、`tar` 打包解压、`find` 查找文件。

```bash
ls -l                 # 查看目录
tail -f app.log       # 实时查看日志
grep "ERROR" app.log  # 搜索关键字
ps aux | grep java    # 查看 java 进程
top                   # 查看 CPU、内存占用
netstat -tlnp         # 查看端口监听
```

### 用户态和内核态

> 用户态和内核态是 CPU 的两种运行级别。用户态权限受限，只能执行受限指令；内核态拥有最高权限，可以访问硬件和系统资源。当用户程序需要执行系统调用（如读写文件、网络 IO）时，会从用户态切换到内核态，完成后切换回用户态。

## Docker

### Docker 镜像和容器的区别

> 镜像是只读的模板，包含运行应用所需的代码、依赖、环境；容器是镜像的运行实例，在镜像之上添加了一层可写层。一个镜像可以创建多个容器，容器之间相互隔离。

- 镜像：只读模板

- 容器：镜像的可运行实例

### Docker 和虚拟机的区别

> Docker 容器共享宿主机内核，只隔离进程和文件系统，启动快、占用资源少；虚拟机需要完整的操作系统，隔离性强但启动慢、资源开销大。Docker 更轻量，虚拟机更彻底。

| 对比项 | Docker | 虚拟机 |
| --- | --- | --- |
| 隔离级别 | 进程级 | 系统级 |
| 启动速度 | 秒级 | 分钟级 |
| 资源占用 | 少 | 多 |
| 内核 | 共享宿主机 | 独立 |

## WebSocket

### WebSocket 和 HTTP 的区别

> HTTP 是请求-响应模式，客户端不请求服务器就无法主动推送；WebSocket 是长连接协议，建立连接后客户端和服务器可以双向实时通信。WebSocket 通过 HTTP 升级握手建立连接，之后使用独立协议，适合聊天、在线协作、实时推送等场景。

- HTTP：请求-响应，短连接

- WebSocket：全双工，长连接，服务器可主动推送

### WebSocket 的心跳机制

> WebSocket 通过心跳（ping/pong）机制检测连接是否存活。客户端定期发送 ping，服务端返回 pong，若长时间未收到响应则判定连接断开并重连。心跳还能防止中间设备（如 Nginx）因超时断开空闲连接。

```javascript
// 前端心跳
setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "ping" }));
    }
}, 30000);
```
