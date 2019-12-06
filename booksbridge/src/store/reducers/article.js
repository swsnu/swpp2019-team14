import * as actionTypes from '../actions/actionTypes';

const initialState = {
  longReviews: [],
  shortReviews: [],
  phrases: [],
  articles: [],
  hasNext: null,
  selectedArticle: null,
  articlesByUserID: [],
  myLikes: { count: 0, users: [] },
  likes: 0,
  length: 0,
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
        articlesByUserID: action.articles.articles,
        length: action.articles.length,
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

    // case actionTypes.GET_ARTICLE_LIKE:
    //   return {
    //     ...state,
    //     myLikes: action.likes.count,
    //   };

    case actionTypes.DELETE_ARTICLE_LIKE:
      return {
        ...state,
        selectedArticle: action.article,
      };
  }
  return state;
};

export default reducer;
