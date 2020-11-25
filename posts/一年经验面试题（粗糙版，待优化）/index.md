---
  title: '一年经验面试题（粗糙版，待优化）'
  date: '2019-11-02T15:50:15Z'
  update: '2019-11-05T04:36:47Z'
  comments: 0
  url: 'https://api.github.com/repos/shanejixx/shanejixx.github.io/issues/23'
  tags: ["Interviews"]
---

### 排序算法相关

常见的例如：冒泡排序，归并排序，快排以及二分查找等

冒泡排序：

```js
function BobbleSort(arr) {
  for(let i = 0;<arr.length;i++){//循环的轮次

        for(let j=i;i<arr.length-i-1;j++){//每一轮的循环
            if(arr[j+1]>arr[j]){
                //实现升序排列

                //交换变量
                [arr[j+1],arr[j]] = [arr[j+1],arr[j]]

            }
        }
    }

    return arr
}
```

优化一：记录最后一次变量交换的位置

优化二：正向和反向遍历同时进行

```js
function BobbleSsort(arr) {
  //记录左右区间最值位置标识
  let low = 0;
  let high = arr.length - 1;

  while (low < high) {
    //正向遍历，得到遍历区间的最大（小）值
    for (let i = low; i < high; i++) {
      if (arr[i] > arr[i + 1]) {
        //交换
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
    //修正指针
    high--;

    //负向遍历，同上
    for (let j = high; j > low; j--) {
      if (arr[j] < arr[j - 1]) {
        //交换
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
    //修复指针
    low++;
  }

  return arr;
}
```

快排和归并排序：

- 都是利用递归分治思想
- 归并排序：着重怎么“合”
- 快排：着重怎么“分”

归并排序：

思想：

- 怎么分：一般一分为二
- 怎么合：一般是将两个待排序列合并为一个有序序列

```js
function mergeSort(arr) {
  //递归结束的的条件
  if (arr.length < 2) {
    return arr;
  }

  //怎么分？一分为二
  let left = arr.slice(0, arr.length / 2);
  let right = arr.slice(arr.length / 2);

  //怎么合并？
  return merge(mergeSort(left), mergeSort(right));
}

function merge(arr1, arr2) {
  let res = [];

  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      res.push(arr1[0]);
      arr1.shift();
    } else {
      res.push(arr2[0]);
      arr2.shift();
    }
  }

  while (arr1.length) {
    res.push(arr1.shift());
  }

  while (arr2.length) {
    res.push(arr2.shift());
  }

  return res;
}
```

快速排序：

思想：

- 将区间分成大于 pivot 和小于 pivot 的两部分:递归实现
  - privot 左右区间分隔的界限，随机的（一般选择数组的最后一项）
  - left：小于 privot 的区间
  - righy：大于 privot 的区间

```js
function QuickSort(arr){
    //递归结束的条件
    fi(arr.length<=1){
        return arr
    }

    //确定privot
    let privot = arr.pop()
    //小于privot区间
    let left = []
    //大于privot区间
    let right = []

    //遍历数组
    for(let i = 0; i<arr.length;i++){
        if(arr[i]>privot){
            right.push(arr[i])
        }else{
            left.push(arr[i])
        }
    }

    //返回当前序列:拼接左右部分
    return [...QuickSort(left),privot,...QuickSort(right)]
}
```

### 框架相关，React 技术栈

1.为什么要使用框架？好处？局限？

好处：

- 组件化思想，便于开发和维护
- 生态丰富
- 分层思想，MVC
- 性能高效：diff，虚拟 DOM

局限：

- MVC 中的 V，

  2.生命周期

- v16.4 之后，getDerivedStateFromPorps 替换了之前的三个生命周期

  - componentWillMount
  - componentWillReceiveProps
  - componetWillUpdate

- 更新阶段增加了，getSnapshotBeforeUpdate

3.v16.4 为什么重写生命周期？出于什么目的？

- 防止异步渲染，导致组件多次渲染

4.setState()是同步的还是异步的？

粗略的说：

- 通过原生 js（原生时间，setTimeout 等）调用的 setState()都是同步的
- 通过 React 合成事件和生命周期函数调用的都是异步的

目的：

- 性能优化
- 将 state 缓存，然后批量合并处理，减少 DOM 操作

如何同步拿到数据：

- 使用 setState 的第二个回调参数
- 直接传入函数

具体实现：

- 通过一个方法维护一个是否异步更新的标志：
  - 原生 api，不会触发更新标志为 true
  - 合成事件和生命周期中会，将标志更新为 true，将 state 加入队列中批量更新


5.

### JavaScript&其他

2. BFC 概念，BFC 怎样形成的

   BFC

   - block formate context:块级格式化上下位
   - 一个独立的布局空间：
     - 盒子内外不相互影响
     - 盒子外不与浮动元素重叠，垂直方向 margin 重叠
     - 盒子内的浮动元素也会计算高度

   创建 BFC

   - float 部位 none
   - position 部位 statci，relative
   - display 为 table-cell，flex
   - overflow 部位 hidden

3. AMD 和 CMD 的概念 import 和 export

   只用过 ES modul 和 common.js

   两者区别：

   - require 支持动态导入
   - require 中是按值导入导出，ESmodul 中式按照引用导入导出
   - require 是同步导入到处，ESmodul 是异步导入导出

4)  rem 的适配方案

rem 是根式 html 根标签来计算

5. git 或 svn 常用命令

   git 常用命令

   - git add .
   - git commit -m
   - git status
   - git push
   - git clone
   - git pull
   - git checkout
   - git checkout -b
   - git diff
   - git reset --hard

   svn

   - svn checkout
   - svn commit
   - svn update
   - svn diff

   https://juejin.im/post/5bd95bf4f265da392c5307eb#heading-7

6. 闭包，构造函数，继承

闭包：

- 函数中返回一个不被销毁的作用域栈内存
- 两种形式
  - 函数中返回一个函数
  - 函数中返回一个对象
- 两种作用
  - 保护
  - 缓存
- 例子
  - 高阶函数
  - 高阶组件

7.  flex 布局和 flex 兼容性问题

flex：弹性盒子布局

- 父容器
  - display:flex
  - flex-wrap:flex-start,flex-end
  - flex-deration:
  - flex-grow:flex-wrap+flex-deration
  - justify-content:
  - align-content:
  - align-item
    - flex-start
    - center
    - flex-end
    - baseline
    - **strech**
- 子容器：
  - flex:flex-basis+flex-grow+flex-shrink
  - order
  - align-self

8.  浏览器从 url 输入到渲染成页面经历了哪些过程

过程：

- 地址栏输入 url
- DNS 查询
- tcp 三次握手
- 客户端发送 http 请求
- 服务端接收到 http 请求，根据 url，匹配相应路由规则，执行返回结果
- 客户端接收到响应数据
- 客户端解析 html，和 css，渲染页面

9.  ES6 语法

新的特性

- 块级作用域 let const
- 解构赋值，剩余参数，默认参数。。。
- 数据结构的扩展:数组，对象，map，set,
- ESmodule
- class:基于原型模拟面向对象的语法糖
- 箭头函数
- Promise

10. webpack 和 gulp 原理及应用


    webpack

    - module
    - plugin

11. 本地 localstorage 和 session 的区别


    localStorge:

    - 存储在客户端
    - 2M
    - 同源策略的限制

    session

    - 储存在服务端
    - 大小没有限制
    - 不受跨域限制，相对安全

12. nodejs 是干什么用的


    nodejs就是可以在服务端执行的js代码

13. http https 的概念，为什么 http 不能访问 https


    https

    - 加密版的http（ssl层）

    为什么不能访问：

    - 协议不同

14. npm 包管理机制，package.json


    package

    - name
    - script：
      - 执行相应的命令行
    - 生产依赖
    - 开发依赖

15. html 语义化和 H5 标签


    html语义化

    - 用合适的标签表达合适内容和结构
      - 让开发者跟容易看懂，有益于维护和协同
      - 让机器看懂，有利于seo，和浏览器解析和爬虫

    h5新标签：

    - 存储
    - DOM
    - 视频
    - Audio
    - 语义化标签

16. 页面性能优化


    三方面

    减少http请求

    - 雪碧图
    - 懒加载
    - 防抖
    - 减少cookie携带

    浏览器渲染方面

    - 减少回流和重绘
    - 异步加载
    - 减少阻塞
    - 减少dom操作

    开发习惯

    - 少用递归
    - 栈溢出，闭包

17. 前端 SEO


    - 语义化标签
    - meta元标签设置

18. IE8 的兼容问题，hack


    没接触

19. 在改变 url 时页面不刷新的办法


    （1）锚点特性，或者说hash值变化（ps：window.location.hash），不会导致页面刷新；

    （2）使用pushState和replaceState，也不会导致页面刷新；

20.

```js
问一下这些结果吧，能说对两个以上就行：
[]+[]

[]+{}

{}+[]

{}+{}

如果能解释清楚前因后果可以做高级前端了。



```

21.

```js
沟通能力

js 的语言糟粕（这个必须的）

平常用的 eslint 有哪些规则

移动端开发的时候常见的问题（ 1px、点击穿透、点击延迟、三倍图、svg or png 的选择）

css 方便会不会几个基础布局（圣杯）

对 display、position 的几个属性掌握情况

了解不了解一些新特性（比如 flex ）

框架方面 jq 的基本原理（比如怎么实现的选择器，不用太深）

vue 的常见问题（ watch 和 computed 区别）

react 的几个生命周期，组件传值

```
