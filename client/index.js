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

// // React例子
// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'

// // 自实现connect
// const connect = (mapStateToProps, mapDispatchToProps) => (Comp) => {
//   class Connect extends Component {
//     state = {
//       store: this.context.store.getState()
//     }
//     componentDidMount = () => {
//       this.context.store.subscribe(() => {
//         const store = this.context.store.getState()
//         this.setState({
//           store
//         })
//       })
//     }

//     render () {
//       const store = this.state.store
//       return <Comp
//         {
//           ...mapStateToProps(store)
//         }
//         {
//           ...mapDispatchToProps(this.context.store.dispatch)
//         }
//       />
//     }
//   }
//   Connect.contextTypes = {
//     store: React.PropTypes.object
//   }
//   return Connect
// }

// const AddTodo = ({articles, addArticle}) => {
//   const add = (e) => {
//     e.preventDefault()
//     addArticle(inputNode.value)
//   }
//   let inputNode = null
//   return <div>
//     <ul>
//       {
//         articles.map((value, id) => (<li key={id}>{value}</li>))
//       }
//     </ul>
//     <form onSubmit={add}>
//       <input ref={(node) => { inputNode = node }} />
//       <button type='sbumit'>添加</button>
//     </form>
//   </div>
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     addArticle: (inputValue) => {
//       dispatch(actions.addArticle(inputValue))
//     }
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   return {
//     articles: state.articles
//   }
// }

// const ReactDemo = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AddTodo)

// class World extends Component {
//   render () {
//     return <Provider store={store}>
//       <ReactDemo />
//     </Provider>
//   }
// }

// ReactDOM.render(<World />, document.getElementById('root'))
