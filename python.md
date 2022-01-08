# 				                                python

### 一、什么是python

```txt
1、一个叫龟叔的是感觉c语言开法时间长但运行快为了综合两者设计的语言，因为接触到shell感觉语法简单，但是没有数据类型无法调用所的硬件工作，以shell为引导开发了一门python语言,--python的编译器是用c语言编写的
```

### 二、为什么用python

```txt
* 简单
* 免费
* 高层语言
* 可移植性
* 解释型语言
* 面向对象
* 可扩展性
* 丰富的库
```

### 三、在那里用python

```txt
* Web自动化测试
* 移动端自动化
* Web应用开发
* 操作系统管理 
* 网络爬虫
* 科学计算
* 桌面软件
* 服务器软件
* 游戏
* 构思实现，产品早期原型和迭代
2、规范的代码 ：Python采用强制缩进的方式使得代码具有极佳的可读性
```

### 四、怎么用python

* 下载[python](https://python.org)
* 安装[pycharm](https://www.jetbrains.com/pycharm/)
* 语法

0、输入输出

```
* 输入
	name = input('请求输入你的名字')
* 输出
	print(name)
* 格式化输出，点位符-%d、%f、%s
	num = 1
	flo = 1.0
	str = '1'
	print('格式化输出%d%f%s' % num, % flo, %str)
* 换行输出
	print('换/n行')
```

1、关键字

```txt
import keyword
print(keyword.kwList)

and		as		assert	break	class	continue	def		del		elif	else	except	exec	finally	for		from	global	if			in		import	is		lambda	not
or		pass	print 	raise	try		while		with	yield

```

2、标识符

```
* 标识名称的符号：由字母、下划线、数字组成，且不能数字和关键字开头
* 小驼峰：helleWord--变量名、方法名
* 大驼峰：HelloWord--类名
* 下划线：hello_word--
```

3、注释

```
# 单行注释的快捷键：chrl + /

'''
	多行注释的快捷键：没有快捷键
'''
```

4、常量

5、变量

```
* 在程序支行时，可以随着程序的支行更改的量称为变量，简单理解：变量就是用来临时存储数据的容器
* 变量的类型：
	* Numbers(数字)
		*int(在符号整数)
		*long(长整型[也可以代表八进制和十六进制])
		*float(浮点型)
		*complex(复数)
	* 布尔类型
		*True
		*False
	* String(字符串)
	* List(列表)
	* Tuple(元组)
	* Dictionary(字典)
* 定义变量
	name = '小明'
* 获取变量类型
	type(name)
* 类型转换
	int --> str	str(int)
	str --> int	int(str)
* 字符串自动类型转换:是什么类型会自动转成什么类型
	str --> eval(str)

```

6、运算符

```
* 算术运算符
	+	加	两个对象相加 a + b 输出结果 30
	-	减	
	*	乖
	/	除
	//	取整除	
	%	取余
	**	指数
* 赋值运算符
* 逻辑运算符
* 三元运算符
```



