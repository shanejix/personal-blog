---
  title: '(译)13 useful JavaScript array tips and tricks you should know'
  date: '2019-11-07T15:27:10Z'
  update: '2020-10-30T09:37:09Z'
  comments: 0
  url: 'https://api.github.com/repos/shanejixx/shanejixx.github.io/issues/25'
  tags: ["JavaScript"]
---

数组作为 JavaScript 中最基本的数据结构，在工作中有相当大的作用。下面总结一些数组的使用技巧

1.数据去重

面试中频率非常高的的问题，这是使用 set 实现两种方法

```js
let fruits = [
  "banana",
  "apple",
  "orange",
  "watermelon",
  "apple",
  "orange",
  "grape",
  "apple"
];

//first method

let uniqueFruites = Array.from(new Set(fruits));

console.log(uniqueFruites);

//second method

let uiniqueFruites2 = [...new Set(fruits)];

console.log(uiniqueFruites2);
```

2.替换数组中指定的值

```js
let fruits = [
  "banana",
  "apple",
  "orange",
  "watermelon",
  "apple",
  "orange",
  "grape",
  "apple"
];
fruits.splice(0, 2, "potato", "tomato");
console.log(fruits);
```

3.非`.map()`遍历

类似 map 比 map 更加简洁，from

```js
var friends = [
  { name: "John", age: 22 },
  { name: "Peter", age: 23 },
  { name: "Mark", age: 24 },
  { name: "Maria", age: 22 },
  { name: "Monica", age: 21 },
  { name: "Martha", age: 19 }
];

var friendsNames = Array.from(friends, ({ name }) => name);
console.log(friendsNames);
```

4.清空数组

出于某种目的需要清空数组，但是又不想遍历数组；最简洁的方式是设置数组的长度为零`arr.lenght = 0`

```js
let fruits = [
  "banana",
  "apple",
  "orange",
  "watermelon",
  "apple",
  "orange",
  "grape",
  "apple"
];

fruits.length = 0;

console.log(fruits);
```

6.数组转对象

处于某种母的需要将数组转化为对象；最快的方式是使用展开运算符`...`

```js
let fruits = [
  "banana",
  "apple",
  "orange",
  "watermelon",
  "apple",
  "orange",
  "grape",
  "apple"
];

let fruitsObj = { ...fruits };

console.log(fruitsObj);
```

6.填充数组

某些情况需要填充数组的值（可以是相同的值）可以使用 `fill()`

```js
var newArray = new Array(10).fill("8");
console.log(newArray);
```

7.合并数组

不适用`concat()`方法，更加简洁的方法可以使用展开运算符`...`

```js
var fruits = ["apple", "banana", "orange"];
var meat = ["poultry", "beef", "fish"];
var vegetables = ["potato", "tomato", "cucumber"];
var food = [...fruits, ...meat, ...vegetables];
console.log(food);
```

8.数组的交集

使用数组的`filter`和`includes`,面试中比较容易问道

```js
var numOne = [0, 2, 4, 6, 8, 8];
var numTwo = [1, 2, 3, 4, 5, 6];
var duplicatedValues = [...new Set(numOne)].filter(item =>
  numTwo.includes(item)
);
console.log(duplicatedValues);
```

9.移除数组中的假值

falsy:false 0,'',null,undefined,NaN

```js
var mixedArr = [0, "blue", "", NaN, 9, true, undefined, "white", false];
var trueArr = mixedArr.filter(Boolean);
console.log(trueArr);
```

10.获取数组的随机下标（值）

```js
let fruits = [
  "banana",
  "apple",
  "orange",
  "watermelon",
  "apple",
  "orange",
  "grape",
  "apple"
];

console.log(Math.floor(Math.random() * fruits.length));
```

11.反转数组

使用`reverse()`

12.lastIndexOf()

13.求数组的和

比较简洁的方法，使用`reduce()`

```js
var nums = [1, 5, 2, 6];
var sum = nums.reduce((x, y) => x + y);
console.log(sum);
```

### 总结

虽然这篇文章看似**简单**，很多 api 和方法都很熟知；
但是，是否在日常工作中都能已最**简短**和**清晰**方式实现代码，这是个需要思考的问题。
因此，过下此篇文章，复习下数组的基本方法，未雨绸缪

数组的 api

- concat
- every
- fill
- filter
- find
- findIndex
- flat
- flatMap
- forEach
- includes
- indexOf
- lastIndexOf
- join
- map
- reduce
- some
- sort
- slice
- splice
- pop
- push
- shift
- unshift

> MDN：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
