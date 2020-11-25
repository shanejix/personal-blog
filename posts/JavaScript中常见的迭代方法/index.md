---
  title: 'JavaScript中常见的迭代方法'
  date: '2019-07-14T03:21:05Z'
  update: '2019-07-14T03:21:46Z'
  comments: 0
  url: 'https://api.github.com/repos/shanejixx/shanejixx.github.io/issues/1'
  tags: ["JavaScript"]
---

JavaScript中常见的**迭代**方法有：

- for
- for-in
- for-of
- Array.prototype.forEach()
- Array.prototype.map()
- Array.prototype.filter()
- Array.prototype.reduce()

> ## for

```js
//string
for(let i=str.length;i>=0;i--){
    console.log(arr[i])
}
```

可以遍历数组和字符串;

需要注意：

- 可以由`break`, `throw  continue `   或`return`终止

> ## for-in

```js
//打印对象自有属性
for(let key in obj){
    if(arr.hasOwnProperty(key)){
        console.log(obj[key])
    }
}
```

```js
//不要这样
for(let key in arr){
    console.log(arr[key])
}
```

`for-in`遍历对象的属性(键)

简而言之

- 能遍历字符串类型的键（底层实现）
- 返回的顺序随机
- 包含**原型**上的键，适合遍历对象，不适合遍历数组

> ## for-of

```js
//遍历数组
for(let key of arr){
    console.log(key)
}
```

可以遍历包括 Array，Map，Set，String；强大

简而言之：

- 避开for-in的‘缺点’
- 与forEach()不同，可以响应`break`, `throw  continue `   或`return`语句

> ## forEach()

```js
let array = ['a', 'b', 'c'];

array.forEach((currValue,currIndex,array)=>{},this)
```

需要注意:

- 返回`undefined`
- 不能提前终止

> ## map()

```js
let array =[1,2,3];

array.map((currValue,currIndex,array)=>{},this);
```

需要注意：

- 不改变原数组
- 返回通过组装的新数组

> ## filter()

```js
let arr =[];

arr.filter((currValue,currIndex,array)=>{},this)
```

需要注意：

- 不改变原数组
- 返回通过测试的新数组

> ## reduce()

```js
let arr =[];

arr.reduce((accumulater,currValue,currIndex,arr)=>{},initialValue);
```

需要注意

- 指定了accumulater=initialValue，currIndex从0开始

- 没有指定accumulater的初始值,currIndex从1开始
- 返回accumulater的值

