# redux-tutorial

##什么是redux
![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)

- 可预测的数据容器（store）

- redux特点：
  - 容器唯一(store)
  - store内容只读，不能直接修改，需要提交action去修改
  - 纯函数reducers描述store如何被action改变

##优势

- 随着页面复杂度的提高，流程化可提高程序的稳定性
- 有助于实现数据与ui的分离

##Action

- action提交给store用于请求数据修改

- action一个包含type的普通对象

- **action creator**用于产生action，主要起到信息处理，得到有效action的作用

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

- 提供访问接口`getState()`

- 提供接收action的接口`dispatch(action)`

- 提供监听dispatch的接口`subscribe(listener)`

##Flow

- dispatch(action)

- reducer(oldStore, action)

- newStore = reducer(oldStore, action)

- state = newStore.getState()

##Usage with React

- react的render来源为state，state变了才能触发render

- dispatch提供监听接口subscribe(func)

- 可以将setState写在注册的监听函数中

- 数据走向为：
  
  - dispatch(action)

  - reducer(oldStore, action)

  - newStore = reducer(oldStore, action)

  - reactState = newStore.getState()，触发render

##Middleware

- 在dispatch过程中做其它的事

- 详解：
  
  ```js
  // 1.store改变前后打印出值的变化
  store.dispatch = (store, action) => {
    console.log(store.getState())
    store.dispatch(action)
    console.log(store.getState())
  }

  // 2.封装一下
  const initialLogger = (store, action) => {
    const next = store.dispatch
    store.dispatch = function () {
      console.log(store.getState())
      next(action)
      console.log(store.getState())
    }
  }

  // 3.如果有多个需求呢，比如还有一个检查dispatch过程是否出错的
  const initialLogger = (store) => {
    const next = store.dispatch
    store.dispatch = function (action) {
      console.log(store.getState())
      next(action)
      console.log(store.getState())
    }
  }

  const initialTest = (store) => {
    const next = store.dispatch
    store.dispatch = function (action) {
      try {
        next(action)
      } catch (e) {
        console.error(e)
      }
    }
  }

  // 4.将替换dispatch的操作移除函数
  const initialLogger = (store) => {
    const next = store.dispatch
    return function (action) {
      console.log(store.getState())
      next(action)
      console.log(store.getState())
    }
  }
  store.dispatch = initialLogger(store)

  // 5.后面会覆盖前面，不如在原来dispatch的基础上不断更改，可以修改为
  const initialLogger = (store, next) => {
    return (action) => {
      console.log(store.getState())
      next(action)
      console.log(store.getState())
    }
  }
  const initialTest = (store, next) => (action) => {
    try {
      next(action)
    } catch (e) {
      console.error(e)
    }
  }
  const handleMiddleware = (store, middlewares) {
    middlewares = middlewares.slice(0)
    const next = store.dispatch
    middlewares.forEach((mid) => {
      next = mid(store, next)
    })
    return Object.assign({}, store, { dispatch })
  }
  ```

##服务端渲染

- 服务端需要准备两部分：
  - 初始化的html
  - 初始化的store:：因为前端有redux，所以要将前端渲染好的数据同步到前端的store中

  ```js
  <!doctype html>
  <html>
    <head>
      <title>Redux Universal Example</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
      </script>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
  ```

- html：在服务端跑前端代码，将要渲染的内容转成html

  ```js
  import { renderToString } from 'react-dom/server'
  const store = createStore(counterApp)

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
  ```

- store

  ```js
  const preloadedState = store.getState()
  ```

- 浏览器端

  ```js
  const preloadedState = window.__PRELOADED_STATE__
  const store = createStore(counterApp, preloadedState)
  ```

##相关推荐库

- **redux-thunk**：处理异步的middleware

  ```js
  // redux-thunk自实现
  const thunkMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === 'function') {
      action(dispatch)
    } else {
      dispatch(action)
    }
  }
  ```

- **redux-logger**：middleware,便于跟踪对store的修改

- **immutable**：提高store存取效率，便于管理

- **react-redux**：store与react的state联系起来，同时为render提供优化

- **react-router-redux**：兼容**react-router**与**redux**
