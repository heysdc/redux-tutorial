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

// React例子
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

const connect = (mapStateToProps, mapDispatchToProps) => (comp) => {
  class Connect extends Component {
    render () {
      console.log('ss', this.context, {...mapStateToProps(this.context.store.getState())})
      return <comp
        {
          ...mapStateToProps(this.context.store.getState())
        }
        {
          ...mapDispatchToProps(this.context.store.dispatch)
        }
      />
    }
  }
  Connect.contextTypes = {
    store: React.PropTypes.object
  }
  return Connect
}

const AddTodo = ({articles, addArticle}) => {
  const add = (e) => {
    e.preventDefault()
    addArticle(inputNode.value)
  }
  let inputNode = null
  console.log('articles', articles)
  return <div>
    <ul>
      {
        articles.map((value, id) => (<li key={id}>{value}</li>))
      }
    </ul>
    <form onSubmit={add}>
      <input ref={(node) => { inputNode = node }} />
      <button type='sbumit'>添加</button>
    </form>
  </div>
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addArticle: (inputValue) => {
      dispatch(actions.addArticle(inputValue))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    articles: state.articles
  }
}

const ReactDemo = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo)

class Text2 extends Component {
  render () {
    console.log('context', this.context)
    return <div>222</div>
  }
}

Text2.contextTypes = {
  color: React.PropTypes.string
}

class Text extends Component {
  getChildContext () {
    return {color: 'purple'}
  }

  render () {
    return <div>
      <Text2 />
    </div>
  }
}
Text.childContextTypes = {
  color: React.PropTypes.string
}
class World extends Component {
  render () {
    console.log('store', store)
    return <Provider store={store}>
      <ReactDemo />
    </Provider>
  }
}

ReactDOM.render(<World />, document.getElementById('root'))
