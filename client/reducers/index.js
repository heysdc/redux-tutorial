import * as actions from '../actions'

export default function todoApp (state = {articles: []}, action) {
  switch (action.type) {
    case actions.ADD_ARTICLE:
      return Object.assign({}, state, {
        articles: [
          ...state.articles,
          action.article
        ]
      })
    case actions.DEL_ARTICLE:
      return Object.assign({}, state, {
        articles: state.articles.slice(0, -1)
      })
    default:
      return state
  }
}
