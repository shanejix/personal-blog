---
title: 用vanillajs实现日期控件
date: '2019-09-03T22:12:03.284Z'
tags: ["javascript"]
---



### 前言

之前遇到的一道机验题，下图：

![1567394773801](https://user-images.githubusercontent.com/38394743/64262029-0e958200-cf60-11e9-8ed4-8e341583c619.png)


刚开始没有看到附加项，写了大半，后面的功能不好扩展，所以草草收尾了；加之，没有对整体流程有较好的把握，宁外之前还没有实现一个日期控件。所以，闲暇之余，好好思考下，算是给自己一个满意的答案！



### 明确需求

日历插件作为一个独立的个体，可以作为各个页面的部件，因此这里使用组件化开发的思想方便后期的复用和扩展

根据题意，日历控件的主要UI以及功能：

- input框按下回车后input下方渲染生成一个当前月份的日历，高亮单签日期（没有实现blur）
- 点击日期弹框显示日期并且同步到input
- 实现日历能够按年，月，日切换

最开始能，没有看到附加要求，后来才发现是日历组件，索性重新思考了下模型，具体思路如下



### 实现思路

日历组件的**核心**部分就是根据一个给定的日期（年月）得到当月的日期数据并且渲染的过程

为什么这么说？

我想先来看看数据是如何流动的：

对于input的keydown/up事件

1. 键盘抬起
2. 触发事件，获取input的value
3. 根据value解析出时间数据（年月日）
4. 通过年月日计算对应的月份日历数据
5. 将日历数据渲染到页面

对于年月日的切换

1. 触发对应标签绑定事件
2. 根据当前选中的时间计算出切换后的时间数据（年月日）
3. 通过年月日计算对应的月份日历数据
4. 将日历数据渲染到页面

对于日期的点击事件

1. 点击日期，触发相应事件
2. 根据当前时间同步input框的value

通过上面的分析，不难发现计算日历数据然后渲染数据完全可以**抽离**出来，

如何抽离？两个核心方法

- `getMonthData`
  - 接收年月日作为参数
  - 返回6*7个日历对象
- `generCanender`
  - 接收日历数据
  - 返回html对象
- `render`
  - 接收节点和html对象渲染到页面

具体功能实现看下面



### 功能实现

#### 静态页面

如图

![1567605374163](https://user-images.githubusercontent.com/38394743/64262062-19e8ad80-cf60-11e9-9965-1849d8e647af.png)


先简单的搞了下静态页面，没什么问题



#### 生成日历数据

`getMonthData`

如何计算一个月的日历数据并且按照星期显示呢？

先来看看需要多少行？

- 首先来看一个月的天数，大月31天小月30但是二月要特殊处理；如果按照每月的第一天使周日，剩下最多30天；4*7<30<5*7因此，**需要7行**来显示数据

每月的天数呢？开始我是用自己封装的闰年和大小月的方法来计算每月的天数，后来发现可以通过**Date对象**来简单的实现

- 获取当月第一天`new Date(year,month-1,1).getDate()`
- 获取当月第一天的星期`new Date(year,month-1,1).getDay()`
- 获取当月的最后已一天`new Date(year,month,0).getDate()`（下月的第0天）

上月和下月的天数呢？当月第一天前面的数据呢？和超过当月的天数呢？

- 做个for循环遍历42个数据（
  - **i从0开始,i+1表示每月的一号=>用m表示**）

- 首先计算需要**显示多少上月的数据**：**当月一号星期几-1（用n表示）**
- **数据偏移**（r=m-n），计算当月正确的日期
  - **r<0,上月的数据：上月的天数+r**
  - **r>=0包含下月的数据：r-下月的天数**

具体实现看代码写的有点杂乱

```js
this.getMonthData = function (year, month, date) {
    //用于存储日历6*7的数据
    let result = []
    date = date || new Date().getDate()
    year = year || new Date().getFullYear()
    month = month || new Date().getMonth() + 1


    //当月的第一天，日期对象
    let firstDayOfThisMonth = new Date(year, month - 1, 1)//利用越界处理
    //当月第一天是星期几
    let firstDayOfWeekday = firstDayOfThisMonth.getDay() || 7//如果0，代表周日，手动改为7

    //当月的最后一天，日期对象
    let lastDayOfThisMonth = new Date(year, month, 0)//利用越界处理
    //当月的最后一天日期
    let lastDateOfThisMonth = lastDayOfThisMonth.getDate()

    //上月的最后一天，日期对象
    let lastDayOfLastMonth = new Date(year, month - 1, 0)//利用越界处理
    //上月最后一天的日期
    let lastDateOfLastMonth = lastDayOfLastMonth.getDate()

    //上月显示日期数量
    let lastMonthDaysCount = firstDayOfWeekday - 1


    console.log('firstDayOfThisMonth:', firstDayOfThisMonth)
    console.log('firstDayOfWeekday:', firstDayOfWeekday)

    console.log('lastDayOfLastMonth:', lastDayOfLastMonth)
    console.log('lastDateOfLastMonth:', lastDateOfLastMonth)

    console.log('lastDayOfThisMonth:', lastDayOfThisMonth)
    console.log('lastDateOfThisMonth:', lastDateOfThisMonth)

    console.log('lastMonthDaysCount:', lastMonthDaysCount)


    //生成每一月的数据

    for (let i = 0; i < 7 * 6; i++) {
        //计算的当前日期
        let date = i + 1  - lastMonthDaysCount//注意这里加两次1，为了修正偏移
        //将要显示的当前日日期
        let showDate = date
        //当前月份
        let thisMonth = month

        if (date <= 0) {
            //上一月
            thisMonth = month - 1
            showDate = lastDateOfLastMonth + date
        } else if (date > lastDateOfThisMonth) {
            //下一月
            thisMonth = month + 1
            showDate = showDate - lastDateOfThisMonth

        }

        //修正month越界

        if (thisMonth === 0) {
            thisMonth = 12
        }

        if (thisMonth === 13) {
            thisMonth = 1
        }

        result.push({
            date,
            showDate,
            thisMonth
        })

    }
    this.data = {
        year,
        month,
        date,
        result
    }
    return this.data
}
```



#### 生成html

`generCanendar`

根据时间数据返回一个html

```js
this.generCanendar = function (year, month, date) {

    let monthData = this.data || this.getMonthData(year, month, date)

    date = date || monthData.date

    let html = "<header id='datepicker-container-body-header'>" +
        "<sapn>" +
        "<a id='year-pre'>&lt</a>" +
        "<span>" + monthData.year + "</span>" +
        "<a id='year-next'>&gt</a>" +
        "年" +
        "</sapn>" +
        "<sapn>" +
        "<a id='month-pre'>&lt</a>" +
        "<span>" + monthData.month + "</span>" +
        "<a id='month-next'>&gt</a>" +
        "月" +
        "</sapn>" +
        "<sapn>" +
        "<a id='date-pre'>&lt</a>" +
        "<span>" + monthData.date + "</span>" +
        "<a id='date-next'>&gt</a>" +
        "日" +
        "</sapn>" +
        "</header>" +
        "<main id='datepicker-container-body-main'>" +
        "<table>" +
        "<thead>" +
        "<tr>" +
        "<td>一</td>" +
        "<td>二</td>" +
        "<td>三</td>" +
        "<td>四</td>" +
        "<td>五</td>" +
        "<td>六</td>" +
        "<td>日</td>" +
        "</tr>" +
        "</thead>" +
        "<tbody>";

    for (let i = 0; i < monthData.result.length; i++) {
        let showDate = monthData.result[i].showDate
        if (i % 7 === 0) {
            html += "<tr>"
        }
        // console.log(monthData.month,monthData.result[i].thisMonth)
        month = monthData.result[i].thisMonth
        if (showDate === date && monthData.month === monthData.result[i].thisMonth) {
            html += `<td class='checked' year=${year} month=${month} > ${showDate}  </td>`
        } else {
            html += `<td  year=${year} month=${month} date=${showDate} > ${showDate}  </td>`
        }


        if (i % 7 === 6) {
            html += "</tr>"
        }

    }


    html += "</tbody>" +
        "</table>" +
        "</main>"

    return html

}
```



#### 事件处理

主要实现事件绑定

```js
this.addEvents = function () {
    let data = this.data
    let year = data.year
    let month = data.result[15].thisMonth
    let date = data.date

    let that = this


    let nodeInput = document.getElementById('datepicker-container-input')
    let nodeBody = document.getElementById('datepicker-container-body')

    //切换月份
    console.log(year, month, date)

    document.getElementById('month-pre').onclick = function () {
        month--
        if (month === 0) {
            month = 12
            year--
        }


        that.init('datepicker-container-body', year, month, date)
    }
    document.getElementById('month-next').onclick = function () {
        month++
        if (month === 13) {
            month = 1
            year++
        }
        that.init('datepicker-container-body', year, month, date)

    }
    //切换年份

    document.getElementById('year-pre').onclick = function () {
        year--
        that.init('datepicker-container-body', year, month, date)
    }
    document.getElementById('year-next').onclick = function () {
        year++
        that.init('datepicker-container-body', year, month, date)

    }
    //切换天
    document.getElementById('date-pre').onclick = function () {
        date--

        let lastDayOfLastMonth = timeUtile.getLastDayOfMonth(year, month - 1)
        if (date === 0) {
            date = lastDayOfLastMonth
            month--
        }

        that.init('datepicker-container-body', year, month, date)
    }
    document.getElementById('date-next').onclick = function () {
        date++

        let lastDayOfThisMonth = timeUtile.getLastDayOfMonth(year, month)

        if (date > lastDayOfThisMonth) {
            date = 1
            month++
        }
        that.init('datepicker-container-body', year, month, date)

    }

    //点击弹窗
    document.getElementById('datepicker-container-body').onclick = function (e) {

        console.log(nodeInput)
        if (e.target.tagName === 'TD') {
            console.log(e.target)
            console.log(e.target.getAttribute('year'))
            console.log(e.target.getAttribute('month'))
            console.log(e.target.getAttribute('date'))

            let year = e.target.getAttribute('year')
            let month = e.target.getAttribute('month')
            let date = e.target.getAttribute('date')

            alert(`你选择的时间是${year}年${month}月${date}日`)

            nodeInput.value = `${year}-${month}-${date}`

            // nodeBody.classList.add('datepicker-container-body-hidden')

            nodeBody.style.display = 'none'

        }
        // that.init('datepicker-container-body', year, month, date)
    }

    //input enter
    document.getElementById('datepicker-container-input').onkeydown = function (e) {
        console.log(e)

        // console.log(that)

        if (e.keyCode === 13) {

            let dateObj = that.validate(e.target.value)
            console.log(date)
            if (dateObj) {
                let { year, month, date } = dateObj
                that.init('datepicker-container-body', year, month, date)

                // nodeBody.classList.add('datepicker-container-body-show')

                nodeBody.style.display = 'block'
            } else {
                alert('时间有误')
            }
        }
    }

}
```



#### 功能扩展

其实日历组件可以做的东西还有很多，比如

- 根据不同的时间格式渲染
- 切换功能不限于点击可以手动输入数据
- 日历的列表项可以做更多的功能扩展

### 总结

做了这么多，总结下收获

- 做事前先思考，先理清思路，模拟流程，注意细节
- 尽量实现解耦，模块分离，能抽象出模型的可以搞搞

- 不要忘记一些平时见过的方法的探索，也许有惊喜