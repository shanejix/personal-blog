---
title: 记一次没有面试的面试
date: '2019-09-03T22:12:03.284Z'
tags: ["面试"]
---



主要记录下26号的面试过程，以及面试感受。为什么说是没有面试的面试：因为缺少面试经验，笔试没过，所以做下自我排查，查漏补缺，未雨绸缪——自己给自己来场面试吧！

### 开场三道题

在漂亮小姐姐的的带领下，领了份试卷，4页，手写代码限时1小时，于是就手忙脚乱的搞起来了

#### 第一题：按需扩展功能

第一题呢，就是一个类包含获取URL参数并且转化为对象存储为数组和包含获取数组，排序等，下面根据记忆尽量还原原题

```js

//es6 class 名字不记得了，姑且就叫urlUtil吧
class urlUtil {

    constructor() {
        this.list = []//用于保存截取的字符串，初始化为空
    }
    consoleList() {
        console.log(this.list)
    }

    // 获取满足条件的第一项
    getOne(condition) {
        let list = this.list
        if (list && list.length) {
            let resultt = null
            for (let ele of list) {
                Object.keys(ele).forEach(key => {
                    //有重复的key会取后一个
                    if (condition === key) {
                        resultt = ele
                    }
                })
                //返回满足条件的第一项
                if (resultt) {
                    return resultt
                }
            }
        } else {
            return {}//没有匹配返回一个空对象
        }
    }

    // 获取满足条件的数组
    getList(condition) {
        let list = this.list
        if (list && list.length) {
            let resultt = []
            for (let ele of list) {
                Object.keys(ele).forEach(key => {
                    if (condition === key) {
                        resultt = push(ele)
                    }
                    //forEach中不能continue，这里找到了就应该进入下轮循环，可以改为for-of
                })
            }
            // 循环结束找到满足条件的数组
            return resultt
        } else {
            return []//没有匹配返回一个空数组
        }
    }

    //将url转化为对象键值对的形式存储
    querry(url) {
        //类型校验
        if (!typeof url === 'string') {
            return null
        }
        //截取url参数？后面和#前面的部分
        let querrySring = url.split('?')[1].split('#')[0]
        //用&分组
        let querryList = querrySring.split('&')

        //对象存储
        let temp = {}

        querryList.forEach(item => {
            let key = item.split('=')[0]
            let val = item.split('=')[1]

            //处理key，统一大小写
            if (typeof key === 'string') key = key.toLowerCase()
            // 处理value，val肯能的出现的情况很多，比如
            // 1索引数组
            // 2非索引数组
            // 3没有值
            // 4字符串
            // 5已经存在
            // 这里只实现重复出现的key转化为数组的处理
            if (!temp.key) {
                temp[key] = val
            } else {
                temp[key] = [...temp.key, val]
            }
        })
        this.list.push(temp)
    }
}

let url = new urlUtil();

url.querry('http://hahah/?id=1000&name=a&color=f&idx=5')
url.querry('http://hahah/?id=10500&name=b&color=d&idx=8')
url.querry('http://hahah/?id=10100&name=c&color=d&idx=6')
url.querry('http://hahah/?id=18000&name=d&color=r&idx=2')
url.querry('http://hahah/?id=10030&name=e&color=y&idx=1')

url.consoleList();
```

querry尽量简单的实现了下，然后需要增加排序功能

- 使用内置函数Array.sort()实现
- 参数played为1时，升序，参数played为-1时，降序
- 按关键字排序，如id，name，key...

这道题是送分题，印象中见过，就是mdn上的例子，但是我平时sort()用的地方真的不多，加上失眠脑壳痛，回忆不起来也没去想，所有结局很惨了

当然不是说排序不重要，可以想见真实的数据处理中排序算法的应用非常广泛，下面拓展下六大排序的实现

现在我们先来实现sort的要求：

```js
// 现在才想起来当时这道题完全想错了，还在那儿搞了半天，原因找到了就是array.sort()没咋用过，不熟
sort(played) {

    // 权重id>name>idx>color 权重高的后计算保证顺序
    this.sortList('color', played)
    this.sortList('idx', played)
    this.sortList('name', played)
    this.sortList('id', played)

}

sortList(key, played) {
    this.list.sort(function (a, b) {
        if (played === 1 && a[key] < b[key]) {
            return 1
        }
        if (played === -1 && a[key] > b[key]) {
            return -1
        }
    })
}
```

差不多就是这样子，需要注意几个地方

- array.sort是就地排序，不会做数据备份
- sort接收的回调函数的参数a，b中，返回-1表示a在b后面，并且按照A码排序
- 权重大的后排序

然后再来看看常见的比较重要的排序算法和sort是如何实现的

#### 排序：冒泡排序

思路

- 在每一轮的循环遍历中将较小的放在左边或者右边
- 每一轮结束最小的被放在最左边或者最右边

```js
arr = [15, 546, 8, 6, 5, 49, 54, 13, 0]

function bubbleSort(arr) {
    let len = arr.length
    for (let i = 0; i < len; i++) {//i循环的轮数
        for (let j = 0; j < len - i - 1; j++) {//考虑到比较交换的位置，需要-1
            //比较交换,可以将最大的放右边实现降序，反之升序
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
        }
    }

    return arr
}

console.log(bubbleSort(arr))
```

如果真个数组是已排序或者部分已排序，那么循环遍历就显得很多余，所以需要优化

优化一：

- 记录pos为每一轮最后交换变量的位置

```js
function bubbleSort1(arr) {
    let i = arr.length - 1//初始终点位置

    while (i > 0) {
        let pos = 0;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j//记录交换的位置
                let temp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
        }
        i = pos//更新下一轮循环的终点
    }

    return arr
}

console.log(bubbleSort1(arr))
```

一般的冒泡算法一次只能找到一个最值

优化二：

- 每轮循环中进行正向和反向两次遍历，找到两个最值

```js
function bubbleSort2(arr) {
    let low = 0;//正向遍历的起点
    let high = arr.length - 1;//负向遍历起点

    while (low < high) {
        //正向遍历
        for (let i = low; i < high; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i + 1]
                arr[i + 1] = arr[i]
                arr[i] = temp
            }
        }
        high--

        //反向遍历
        for (let j = high; j > low; j--) {
            if (arr[j] < arr[j - 1]) {
                let temp = arr[j - 1]
                arr[j - 1] = arr[j]
                arr[j] = temp
            }
        }
        low++

    }
    return arr
}

console.log(bubbleSort2(arr))
```

差不多就这样把，在来看看插入排序

#### 排序：插入排序

思路：

- 每一轮循环从未排序中拿出一个和已排序比较（交换）
- 直到数组末尾（未排序为空，已排序为满）

```js

function insertSort(arr) {

    for (let i = 1; i < arr.length; i++) {//循环的轮次
        for (let j = i; j > 0; j--) {//每一轮中，这里实现逆序比较，升序排列
            if (arr[j] < arr[j - 1]) {
                let temp = arr[j]
                arr[j] = arr[j - 1]
                arr[j - 1] = temp
            } else {
                break
            }
        }
    }

    return arr
}

console.log(insertSort(arr))
```

当然简单的插入排序经过优化后，就是著名的希尔排序

#### 排序：选择排序

思路：

- 在待排序区间选出最值，并添加到已排序区间的末尾
- 直到待排序区间为空

```js
function selectionSort(arr) {

    for (let i = 0; i < arr.length; i++) {//轮次
        //求出最值
        let min = arr[i]//每轮循环的第一个值
        let idx = null
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < min) {
                min = arr[j]
                idx = j
            }
        }

        //交换
        if (!idx) {//idx为null时，表示当前轮的第一个值就是最小值，不用交换
            continue
        } else {
            arr[idx] = arr[i]
            arr[i] = min
        }
    }

    return arr
}

console.log(selectionSort(arr))
```

插入排序和选择排序看起来很相似

- 插入排序是依次遍历待排区间，并且和已排区间逐个比较交换
- 选择排序是每轮循环中在待排区间遍历找到最值并更新已排区间末尾（准确的说是将待排区间的头替换成已排区间的尾）

#### 排序：归并排序

思路：

- 怎么分：将待排区间一分为二（一分为n），直到不能再分
- 怎么合并：将两个子项合并为有序的一项（也有可能将多项合并）

具体细节看代码

```js
function mergeSort(arr) {
    //怎么分？
    let len = arr.length

    //递归结束的条件
    if (len < 2) {
        return arr
    }
    let mid = Math.floor(len / 2)
    let left = arr.slice(0, mid)
    let right = arr.slice(mid)

    return merge(mergeSort(left), mergeSort(right))//这里是关键

}

function merge(left, right) {//怎么合并，

    let res = []

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            res.push(left.shift())
        } else {
            res.push(right.shift())
        }
    }

    while (left.length) {
        res.push(left.shift())
    }

    while (right.length) {
        res.push(right.shift())
    }

    return res
}

console.log(mergeSort(arr))

```

归并排序主要用了分治思想和递归实现，然而第三题也是就是递归，下面会着重说说递归

#### 排序：快速排序

思路：

- 三个指针：每一轮循环结束，将区间分成大于pivot和小于pivot的两部分
  - pivot：左右的分区的界限，随机选择，一般可以选择数组的最后一项
  - left：小于pivot的区间
  - right：大于等于pivot的区间

- 递归实现left和right部分

```js

function quickSort(arr) {
    //递归结束的条件
    if (arr.length <= 1) {
        return arr
    }

    //确定轴心点,这里去数去最后一项
    let pivot = arr.pop()
    let left = []
    let right = []

    //分区，left和right
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    
	//合并，这里是关键
    return quickSort(left).concat([pivot], quickSort(right))
}

console.log(quickSort(arr))
```

当然和排序密切相关的还有一个算法，二分查找

#### 排序相关：二分查找

二分查找的连个必要条件：线性结构，数据有序

思路：

- 三个指针
  -  left区间最左值
  - right区间最右值
  - mid中间值
- 每次判断被查找值和mid值，然后更新区间继续

```js

function binarySearch(arr,tar){
    let left =0
    let right= arr.length-1

    while(left <= right){
        let mid = Math.floor(left+(right-left)/2)
        if(tar<arr[mid]){
            right=mid-1
        }else if(tar>arr[mid]){
            left=mid+1
        }else{
            return mid
        }
    }

    return -1
}

console.log(binarySearch(arr,154))
```

#### 第二题：JavaScript运行机制

在第一题事项sort排序接口之后，然后就是setTimout异步调用打印几个结果，本质还是JavaScript的运行机制。所以在此复习这个专题

#### 事件循环

什么是事件循环？

众所周知JavaScript是单线程的，代码的执行是按照顺序依次执行的，前一个任务如果耗时很多，那么后一个任务会等待前一个任务完成后执行，于是就出现了事件循环机制

- 同步任务直接进入主栈执行
- 异步任务会被挂起，加入到任务队列中
- 当主栈为空时，将任务队列中的任务依次放入执行栈中执行
- 由此形成事件循环

上面说到同步和异步，从事件循环机制中可以看出javaScript中的异步本质还是同步，然后异步任务有被分为微任务和宏任务

常见宏任务包含：

- 浏览器第一次执行script
- setTimeout
- setInterval

常见微任务包含：

- process.nextTick
- Promise

所以一次完整的是事件循环执行流程是这样的

- 执行同步代码（script宏任务）
- 执行栈为空，查询是否有微任务
- 执行所有微任务
- 必要是渲染UI
- 下一轮事件循环

宏任务每次只会进入一个，微任务每次会执行完

涉及到大量dom操作和UI更新时应该放在微任务中执行

#### 第三题：斐波那契数列

#### 第一问：用递归的方式实现fib(n)

```js
function fib(n) {
    if (n === 1 || n === 2) {
        return n
    }

    return fib(n - 1) + fib(n - 2)
}
```

这个没啥

#### 第二问：为什么fib(20)没有输出值？

首先想到了栈溢出但是n这么小没可能

然后想到了参数没有做类型校验，但是输入的是20有输出才对

所以这题我又错了！

这题暂时没想到答案

#### 第三问：递归的时间和空间复杂分别是多少？

可以用递归树求递归的时间复杂度，递归树是满二叉树，对于数据规模为n的递归树其高度为log2n，没层计算的时间和n成相关，因此递归的时间复杂度是log2n*n===>nlogn

对于斐波那契数列2^n

对于上面的实现空间复杂度为常量阶

#### 第四问：怎么优化递归？

将循环转化为递归

```js
function fib1(n) {
    let res = 0;
    let pre1 = 1;
    let pre2 = 2;

    if (n <= 2) {
        return n
    }

    for (let i = 3; i <= n; i++) {
        res = pre1 + pre2;
        pre1 = pre2
        pre2 = res
    }

    return res
}
```



#### 补充
关于fib(20)没有输出结果，在浏览器的中跑了一下，f(200)我猜出题人的想考的是数字超过JavaScript中数字的最大值了