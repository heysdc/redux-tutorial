export const ADD_ARTICLE = 'ADD_ARTICLE'
export function addArticle (article) {
  return {
    type: ADD_ARTICLE,
    article
  }
}

export const DEL_ARTICLE = 'DEL_ARTICLE'
export function popArticle () {
  return {
    type: DEL_ARTICLE
  }
}
