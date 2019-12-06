import * as actionTypes from '../actions/actionTypes';

const initialState = {
  longReviews: [],
  shortReviews: [],
  phrases: [],
  articles: [],
  hasNext: null,
  selectedArticle: null,
  articlesByUserID: [],
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
      const longs = state.longReviews.map(article => {
        if (article.id === action.article.id) {
          return {
            ...article,
            like_or_not: true,
            like_count: article.like_count + 1,
          };
        } else {
          return { ...article };
        }
      });
      const shorts = state.shortReviews.map(article => {
        if (article.id === action.article.id) {
          return {
            ...article,
            like_or_not: true,
            like_count: article.like_count + 1,
          };
        } else {
          return { ...article };
        }
      });
      const phrases = state.phrases.map(article => {
        if (article.id === action.article.id) {
          return {
            ...article,
            like_or_not: true,
            like_count: article.like_count + 1,
          };
        } else {
          return { ...article };
        }
      });
      return {
        ...state,
        selectedArticle: action.article,
        longReviews: longs,
        shortReviews: shorts,
        phrases: phrases,
      };
    case actionTypes.GET_ARTICLE_LIKE:
      return {
        ...state,
        selectedArticle: action.article,
      };
    case actionTypes.DELETE_ARTICLE_LIKE:
      const longs_deleted = state.longReviews.map(article => {
        if (article.id === action.article.id) {
          return {
            ...article,
            like_or_not: false,
            like_count: article.like_count - 1,
          };
        } else {
          return { ...article };
        }
      });
      const shorts_deleted = state.shortReviews.map(article => {
        if (article.id === action.article.id) {
          return {
            ...article,
            like_or_not: false,
            like_count: article.like_count - 1,
          };
        } else {
          return { ...article };
        }
      });
      const phrases_deleted = state.phrases.map(article => {
        if (article.id === action.article.id) {
          return {
            ...article,
            like_or_not: false,
            like_count: article.like_count - 1,
          };
        } else {
          return { ...article };
        }
      });
      return {
        ...state,
        selectedArticle: action.article,
        longReviews: longs_deleted,
        shortReviews: shorts_deleted,
        phrases: phrases_deleted,
      };
  }
  return state;
};

export default reducer;
