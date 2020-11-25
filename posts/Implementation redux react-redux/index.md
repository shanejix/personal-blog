---
  title: 'Implementation redux react-redux'
  date: '2019-08-09T13:05:16Z'
  update: '2019-08-09T13:05:16Z'
  comments: 0
  url: 'https://api.github.com/repos/shanejixx/shanejixx.github.io/issues/15'
  tags: ["JavaScript"]
---

### redux API

redux

- `createStore()`
- `applyMiddleware()`
- `combineReducers()`

store

- `getState()`
- `dispatch()`
- `subscribe()`

### Implementation

实现简版redux,包含`createStore()` `combineReducers()`

`redux.js ` base struct

```js

// import { createStore } from "redux";
// import { combineReducers } from "redux";


// redux模块
 
export let createStore = (reducer, { }) => {
    
    //定义状态变量，并且初始化
    let state=reducer({},{type:'@@redux/init'})
    
    let getState = () => {
        
    }
    let dispatch = (action) => {
        
    }
    let subscribe = (listener) => {
        
    }
     
    //返回一个store
    return {
        getState,
        dispatch,
        subscribe
    }
}
 
export let combineReducers = (reducers) => {
    return (state, action) => {
        
    }
}
```

`getState()`

```js
let getState = () => {
    return state
}
```

```dispatch()```

```js
let dispatch = (action) => {
    //触发reducer得到性的state
    let newState = reducer(state, action);
    //更新state
    state = newState;
    //通知listener更新
    listeners.forEach(listener => listener());
}
```

```subscribe()```

```js
let listeners = [];//可以监听多个事件
let subscribe = (listener) => {
    listeners.push(listener)
}
```

```combineReducers()```

```js
export let combineReducers = (reducers) => {
    //state总状态
    return (state = {}, action) => {
        //遍历reducers中的子reducer并合并
        let totalState = {};

        Object.keys(reducers).forEach(key => {
            totalState[key]=reducers[key](state[key],action)
        })

        return totalState
    }
}
```

简版实现

```js


// import { createStore } from "redux";
// import { combineReducers } from "redux";


// redux模块
 
export let createStore = (reducer, { }) => {
    
    //定义状态变量，并且初始化
    let state=reducer({},{type:'@@redux/init'})
    
    let getState = () => {
        return state
    }
    let dispatch = (action) => {
        //触发reducer得到性的state
        let newState = reducer(state, action);
        //更新state
        state = newState;
        //通知listener更新
        listeners.forEach(listener => listener());
    }

    
    let listeners = [];//可以监听多个事件
    let subscribe = (listener) => {
        listeners.push(listener)
    }
     
    //返回一个store
    return {
        getState,
        dispatch,
        subscribe
    }
}
 
export let combineReducers = (reducers) => {
    //state总状态
    return (state = {}, action) => {
        //遍历reducers中的子reducer并合并
        let totalState = {};

        Object.keys(reducers).forEach(key => {
            totalState[key]=reducers[key](state[key],action)
        })

        return totalState
    }
}
```

### react-redux 

react-redux API

- `Provider`
- `connect()`

### Implementation

实现简版react-redux,包含`Provider` `connect()`

`react-redux.js` base struct

```js
import React from 'react'
import PropTypes from  'prop-types'


export class Provider extends React.Component{
    //声明接收store
    static propTypes = {
        store:PropTypes.object.isRequired
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export let connect = (mapStateToProps, mapDispachToProps) => {
    //返回一个高阶组件
    return (UIComponent) => {
        //接收一个UI组件返回一个容器组件
        return class ContainerComponent extends React.Component{

            render() {
                return <UIComponent />
            }
        }
    }
}
```

借助`context`

```js
import React from 'react'
import PropTypes from 'prop-types'


export class Provider extends React.Component {
    //声明接收store
    static propTypes = {
        store: PropTypes.object.isRequired
    }

    //声明context传递的属性名及类型
    static childContextTypes = {
        store: PropTypes.object
    }

    //声明context向组件传递数据的方法
    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export let connect = (mapStateToProps, mapDispachToProps) => {
    //返回一个高阶组件
    return (UIComponent) => {
        //接收一个UI组件返回一个容器组件
        return class ContainerComponent extends React.Component {


            //声明context接收的属性名及类型
            static contextTypes = {
                store: PropTypes.object
            }

            constructor(props, context) {
                super(props)

            }

            render() {
                return <UIComponent />
            }
        }
    }
}
```

`mapStateToProps` `mapDispachToProps` `subcribe`

```js
export let connect = (mapStateToProps, mapDispachToProps) => {
    //返回一个高阶组件
    return (UIComponent) => {
        //接收一个UI组件返回一个容器组件
        return class ContainerComponent extends React.Component {


            //声明context接收的属性名及类型
            static contextTypes = {
                store: PropTypes.object
            }

            constructor(props, context) {
                super(props)

                const { store } = context

                //得到属性
                const stateProps = mapStateToProps(store.getState())
                //作为容器组件的状态-
                this.state = { ...stateProps }

                //得到方法
                const dispachProps = mapDispachToProps(store.dispach)
                //区别stateProps
                this.dispachProps = dispachProps

                //监听store的state状态变化
                store.subcribe(() => {
                    //容器组件更新导致UI组件更新
                    this.setState = { ...mapStateToProps(store.getState()) }
                })
            }

            render() {
                return <UIComponent {...this.state} {...this.dispachProps} />
            }
        }
    }
}
```

判断`mapDispachToProps`的类型

```js
//得到方法
let dispachProps
//判断返回的mapDispatchToProps返回的是对象还是方法
if (typeof mapDispachToProps === 'function') {
    dispachProps = mapDispachToProps(store.dispach)
} else {
    dispachProps = Object.keys(mapDispachToProps).reduce((pre, key) => {
        pre[key] = (...args) => store.dispach(mapDispachToProps[key](...args))
        return pre
    }, {})
}
//区别stateProps
this.dispachProps = dispachProps
```

简版实现

```js

// function mapDispatchToProps(dispatch) {
//     return {
//         increment: (number) => dispatch(increment(number)),
//         decrement: (number) => dispatch(decrement(number)),
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         increment,
//         decrement
//     }
// }



import React from 'react'
import PropTypes from 'prop-types'


export class Provider extends React.Component {
    //声明接收store
    static propTypes = {
        store: PropTypes.object.isRequired
    }

    //声明context传递的属性名及类型
    static childContextTypes = {
        store: PropTypes.object
    }

    //声明context向组件传递数据的方法
    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export let connect = (mapStateToProps, mapDispachToProps) => {
    //返回一个高阶组件
    return (UIComponent) => {
        //接收一个UI组件返回一个容器组件
        return class ContainerComponent extends React.Component {


            //声明context接收的属性名及类型
            static contextTypes = {
                store: PropTypes.object
            }

            constructor(props, context) {
                super(props)

                const { store } = context

                //得到属性
                const stateProps = mapStateToProps(store.getState())
                //作为容器组件的状态-
                this.state = { ...stateProps }

                //得到方法
                let dispachProps
                //判断返回的mapDispatchToProps返回的是对象还是方法
                if (typeof mapDispachToProps === 'function') {
                    dispachProps = mapDispachToProps(store.dispach)
                } else {
                    dispachProps = Object.keys(mapDispachToProps).reduce((pre, key) => {
                        pre[key] = (...args) => store.dispach(mapDispachToProps[key](...args))
                        return pre
                    }, {})
                }
                //区别stateProps
                this.dispachProps = dispachProps

                //监听store的state状态变化
                store.subcribe(() => {
                    //容器组件更新导致UI组件更新
                    this.setState = { ...mapStateToProps(store.getState()) }
                })
            }

            render() {
                return <UIComponent {...this.state} {...this.dispachProps} />
            }
        }
    }
}
```

