---
title: Implementation new
date: '2019-08-09T22:12:03.284Z'
tags: ["javascript"]
---



### new

new操作符干了 什么（原理）

- 创造一个对象
- 将对象的`__proto__`指向原型的`__proto__`
- 绑定`this`
- 返回一个对象



### Implementation

```js

function myNew(constructor) {
    //创建一个对象
    let obj = {}

    //将对象的原型指向构造函数的原型
    obj.__proto__ = constructor.prototype

    //绑定this
    constructor.call(obj)

    //返回一个对象
    return obj
}
```