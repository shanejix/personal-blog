---
  title: 'prototype and __proto__ '
  date: '2020-10-25T07:46:18Z'
  update: '2020-10-26T06:26:16Z'
  comments: 0
  url: 'https://api.github.com/repos/shanejixx/shanejixx.github.io/issues/35'
  tags: ["Interviews","VanillaJS"]
---

## feature
### 一张图理解原型链：
![prototype](https://github.com/shanejixx/interview-and-demo/blob/master/function/prototype.png)

### 构造函数(constructor)，原型/对象(prototype)，实例(instance)三者间的关系：
- 构造函数都有一个原型对象
- 原型对象有一个属性指回构造函数
- 实例有一个内部指针指向原型

### 原型链
- 如果原型是另一个类的实例，那么原型就有一个内部指针指向原型，相应的另一个原型也有一个指针指向另一个构造函数。
- 由此，在实例和原型间构造了一条原型链
## scene