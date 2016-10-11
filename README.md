# redux-tutorial
a tutorial of redux

##什么是redux
![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)
- 可预测的state容器（store）
- 单一容器(store)
- store内容只读，不能直接修改，需要提交action(包含type属性的普通对象)去修改
- 纯函数reducers描述store如何被action改变

##优势
－ 随着页面复杂度的提高，流程化可提高程序的稳定性
－ 有助于实现数据与ui的分离

##action

```js
var action = {
  type: 'ADD_TODO' // 必须
}
```