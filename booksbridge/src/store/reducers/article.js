import * as actionTypes from '../actions/actionTypes';

const initialState = {
  longReviews: [],
  shortReviews: [],
  phrases: [],
  articles: [],
  hasNext: [],
  selectedArticle: null,
  articlesByUserID: [],
  likes: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLES_BY_BOOKID:
      return {
        ...state,
        longReviews: action.articles.filter(article => article.is_long),
        shortReviews: action.articles.filter(article => article.is_short),
        phrases: action.articles.filter(article => article.is_phrase),
      };
    case actionTypes.GET_ARTICLES:
      return {
        ...state,
        articles: action.articles,
        hasNext: action.has_next,
      };
    case actionTypes.GET_SPECIFIC_ARTICLE:
      return {
        ...state,
        selectedArticle: action.article,
      };
    case actionTypes.GET_ARTICLES_BY_USERID:
      return {
        ...state,
        articlesByUserID: action.articles,
      };
    case actionTypes.POST_LONG_REVIEW_COMMENT:
      return {
        ...state,
        selectedArticle: action.article,
      };
    case actionTypes.POST_ARTICLE_LIKE:
      return {
        ...state,
        selectedArticle: action.article,
      };

    case actionTypes.GET_ARTICLE_LIKE:
      return {
        ...state,
        likes: action.likes.count,
      };

    case actionTypes.DELETE_ARTICLE_LIKE:
      return {
        ...state,
        selectedArticle: action.article,
      };
  }
  return state;
};

export default reducer;
