---
title: Implementation Promise
date: '2019-08-09T22:12:03.284Z'
tags: ["javascript"]
---



### Promise

```js
new Promise( function(resolve, reject) {...} /* executor */  );
```

干了什么：

- Promise构造函数执行时立即调用`executor` 函数（返回实例前）
- `resolve` 和 `reject` 两个函数作为参数传递给`executor`

### Implementation

实现`new Promise()`和`.then()`

base stuct

`test.js`

```js
let Promise = require('./Promise');

// Promise构造函数执行时立即调用executor 函数（返回实例前）
let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('foo');
    }, 300);
}/*executor */);

promise1.then((value) => {
    console.log(value);
    // expected output: "foo"
});

console.log(promise1);
  // expected output: [object Promise]

```

`Promise.js`

```js

class Promise {

    //构造函数
    constructor(executorCB) {
        //保存在实例上属性
        this.status = 'pedding'//保存状态值pedding->fulfilled or rejected
        this.value = null//保存result or resean
        this.fulfilledArr = []//fulfilled listener
        this.rejectArr = []//rejected listener

        let resolveFn = (result) => {
            //更新status
            if (this.status !== 'pedding') return
            this.status = 'fulfilled'
            //更新value
            this.value = result

            //通知订阅执行
            this.fulfilledArr.forEach(listener => listener(this.value))

        }

        let rejectFn = (resean) => {
            //更新status
            if (this.status !== 'pedding') return
            this.status = 'rejected'
            //更新value
            this.value = resean

            //通知订阅执行
            this.fulfilledArr.forEach(listener => listener(this.value))
        }

        // Promise构造函数执行时立即调用executor 函数（返回实例前）
        executorCB(resolveFn, rejectFn)

    }

    //Promise实例能够使用.then，因此存在原型上
    then(fulfilledCB, rejectCB) {
        //订阅listener（fulfilledCB和rejectCB）等待通知
        this.fulfilledArr.push(fulfilledCB)
        this.rejectArr.push(rejectCB)
    }

}

module.exports = Promise
```

基本结构中包含**发布订阅**的实现

test.js期望的执行过程

```js
new Promise()=>serTimeout()放入等待栈=>.then()=>console.log()
```

但是这样不能发现问题

加入`test.js`是这样

```js
let promise1 = new Promise((resolve, reject) => {
    resolve('foo');
});

promise1.then((value) => {
    console.log(value);
});
console.log(promise1);
```

test.js期望的执行过程

```js
new Promise()=>resolve()=>.then()=>console.log()
```

这样问题就很明显了：我们期望的是在rosolve()之前就拿到promise1.then()中的fulfilled和rejected回调函数=>这就是Promise实现管控异步操作的**关键**之处了

如何实现？

```js
let resolveFn = (result) => {
    //包装resolveFn，让其进入等待栈，当主栈liteners进入listenerArr后执行
    let timer = setTimeout(() => {
        //防抖
        clearTimeout(timer);

        //更新status
        if (this.status !== 'pedding') return
        this.status = 'fulfilled'
        //更新value
        this.value = result

        //通知订阅执行
        this.fulfilledArr.forEach(listener => listener(this.value))
    }, 0)

    }

let rejectFn = (resean) => {
    //包装rejectFn，让其进入等待栈，当主栈liteners进入listenerArr后执行
    let timer = setTimeout(() => {
        //防抖
        clearTimeout(timer);

        //更新status
        if (this.status !== 'pedding') return
        this.status = 'rejected'
        //更新value
        this.value = resean

        //通知订阅执行
        this.fulfilledArr.forEach(listener => listener(this.value))

    }, 0);
}
```

test.js期望的执行过程

```js
new Promise()=>serTimeout()放入等待栈=>.then()=>console.log()=>主栈空闲

执行setTimeout()=>resolve()放入等待栈=>主栈空闲

执行resolve()
```

从而达到了我们的目的：管控异步操作（这儿的setTimeout）=> 更向同步编程(先setTimeout后.then)

现在仍需完成两个问题：

- `then()`的链式调用
- 抛出异常的错误处理

逐个实现

实现链式调用

```js
//Promise实例能够使用.then，因此存在原型上
then(fulfilledCB, rejectCB) {
    //实现链式调用
    return new Promise((resolve, reject) => {
        //订阅listener
        this.fulfilledArr.push(() => {
            try {
                let result = fulfilledCB(this.value)
                resolve(result)
            } catch (e) {
                reject(e)
            }
        })
        this.rejectArr.push(() => {
            try {
                let result = rejectCB(this.value)
                resolve(result)
            } catch (e) {
                reject(e)
            }
        })
    })

    // //订阅listener（fulfilledCB和rejectCB）等待通知
    // this.fulfilledArr.push(fulfilledCB)
    // this.rejectArr.push(rejectCB)
}

```

实现抛出异常的错误处理

```js
 //异常处理
try {
    //Promise构造函数执行时立即调用executor 函数（返回实例前）
    executorCB(resolveFn, rejectFn)
} catch (err) {
    //有异常信息按照rejected状态处理
    rejectFn(err);
}


//处理不传递的状况.then(null) or .then(null,null)
typeof fulfilledCB !== 'function' ? fulfilledCB = result => result : null;
typeof rejectCB !== 'function' ? rejectCB = reason => {
    throw new Error(reason instanceof Error ? reason.message : reason);
} : null;


//订阅listener
this.fulfilledArr.push(() => {
    try {
        let result = fulfilledCB(this.value)
        //是否是Promise
        result instanceof Promise ? result.then(resolve, reject) : resolve(result);
        resolve(result)
    } catch (e) {
        reject(e)
    }
})
this.rejectArr.push(() => {
    try {
        let result = rejectCB(this.value)
        //是否是Promise
        result instanceof Promise ? result.then(resolve, reject) : resolve(result);
        resolve(result)
    } catch (e) {
        reject(e)
    }
})
```



###  catch

```js
catch(rejectCB) {
    return this.then(null, rejectCB);
}
```



### Promise.all()

```js
//Promise.all()
static all(promiseAry = []) {
    return new Promise((resolve, reject) => {

        let index = 0;//记录成功的数量
        let result = [];//记录成功的结果

        for (let i = 0; i < promiseAry.length; i++) {
            //每一个需要处理的Promise实例
            promiseAry[i].then(val => {
                index++;
                result[i] = val;//保证结果的顺序和数组顺序一致
                if (index === promiseAry.length) {
                    resolve(result);
                }
            }, reject);
        }
    });
}
```



所有简版实现：

```js

class Promise {

    //构造函数
    constructor(executorCB) {
        //保存在实例上属性
        this.status = 'pedding'//保存状态值pedding->fulfilled or rejected
        this.value = null//保存result or resean
        this.fulfilledArr = []//fulfilled listenerArr
        this.rejectArr = []//rejected listenerArr

        let resolveFn = (result) => {
            //包装resolveFn，让其进入等待栈，当主栈liteners进入listenerArr后执行
            let timer = setTimeout(() => {
                //防抖
                clearTimeout(timer);

                //更新status
                if (this.status !== 'pedding') return
                this.status = 'fulfilled'
                //更新value
                this.value = result

                //通知订阅执行
                this.fulfilledArr.forEach(listener => listener(this.value))
            }, 0)

        }

        let rejectFn = (resean) => {
            //包装rejectFn，让其进入等待栈，当主栈liteners进入listenerArr后执行
            let timer = setTimeout(() => {
                //防抖
                clearTimeout(timer);

                //更新status
                if (this.status !== 'pedding') return
                this.status = 'rejected'
                //更新value
                this.value = resean

                //通知订阅执行
                this.fulfilledArr.forEach(listener => listener(this.value))

            }, 0);
        }

        //异常处理
        try {
            //Promise构造函数执行时立即调用executor 函数（返回实例前）
            executorCB(resolveFn, rejectFn)
        } catch (err) {
            //有异常信息按照rejected状态处理
            rejectFn(err);
        }
    }




    //Promise实例能够使用.then，因此存在原型上
    then(fulfilledCB, rejectCB) {
        //实现链式调用，返回一个Promise


        //处理不传递的状况.then(null) or .then(null,null)
        typeof fulfilledCB !== 'function' ? fulfilledCB = result => result : null;
        typeof rejectCB !== 'function' ? rejectCB = reason => {
            throw new Error(reason instanceof Error ? reason.message : reason);
        } : null;


        return new Promise((resolve, reject) => {
            //订阅listener
            this.fulfilledArr.push(() => {
                try {
                    let result = fulfilledCB(this.value)
                    //是否是Promise
                    result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                    resolve(result)
                } catch (e) {
                    reject(e)
                }
            })
            this.rejectArr.push(() => {
                try {
                    let result = rejectCB(this.value)
                    //是否是Promise
                    result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                    resolve(result)
                } catch (e) {
                    reject(e)
                }
            })
        })

        // //订阅listener（fulfilledCB和rejectCB）等待通知
        // this.fulfilledArr.push(fulfilledCB)
        // this.rejectArr.push(rejectCB)
    }

    catch(rejectCB) {
        return this.then(null, rejectCB);
    }

    //Promise.all()
    static all(promiseAry = []) {
        return new Promise((resolve, reject) => {

            let index = 0;//记录成功的数量
            let result = [];//记录成功的结果

            for (let i = 0; i < promiseAry.length; i++) {
                //每一个需要处理的Promise实例
                promiseAry[i].then(val => {
                    index++;
                    result[i] = val;//保证结果的顺序和数组顺序一致
                    if (index === promiseAry.length) {
                        resolve(result);
                    }
                }, reject);
            }
        });
    }

}

module.exports = Promise



```