# redux-tutorial

##什么是redux
![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)

- 可预测的数据容器（store）
- 容器唯一(store)
- store内容只读，不能直接修改，需要提交action去修改
- 纯函数reducers描述store如何被action改变

##优势

- 随着页面复杂度的提高，流程化可提高程序的稳定性
- 有助于实现数据与ui的分离

##Action

- action提交给store用于请求数据修改

- action一个包含type的普通对象

- **action creator**用于产生action

- **dispatch函数**接收action传给store，`dispatch(actionCreator(value))`

##Reducers

- 定义了store接收dispatch传过来的action后该如何改变

- 为纯函数`(preState, action) => newState`
  纯函数：
  - 不改变arguments
  - 不调接口
  - 不调用非纯函数，Date.now()

- 定义了store的结构

- reducer纯函数，state为参数，所以不能对state直接更改，要返回一个新的

##Store

- 保存state

- 提供访问接口`getState()`

- 提供接收action的接口`dispatch(action)`

- 提供监听dispatch的接口`subscribe(listener)`

##Flow

- dispatch(action)

- reducer(oldStore, action)

- newStore = reducer(oldStore, action)

- newState = newStore.getState()
