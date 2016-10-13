/* global store */

import { createStore } from 'redux'
import todoApp from './reducers'
import * as actions from './actions'
window.actions = actions
window.reducers = todoApp

// // 自实现createStore
// window.createStore = function (reducer) {
//   var store = reducer(undefined, {type: undefined})
//   var subscribe

//   var currentStore = {
//     getState: function () {
//       return store
//     },
//     subscribe: function (callback) {
//       subscribe = callback
//     },
//     dispatch: function (action) {
//       store = reducer(store, action)
//       typeof subscribe === 'function' && subscribe()
//     }
//   }

//   return currentStore
// }

// 创建store
window.store = createStore(todoApp)
console.log('initialStore', store.getState())

// 监听dispatch
store.subscribe(() => {
  console.log('storeChanged!', store.getState())
})

// 更改store
store.dispatch(actions.addArticle('aaa'))
