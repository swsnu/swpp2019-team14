import * as actionTypes from '../actions/actionTypes';

const initialState = {
  longReviews: [],
  shortReviews: [],
  phrases: [],
  articles: [],
  hasNext: null,
  selectedArticle: null,
  comments: [],
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
        selectedArticle: action.data.article,
        comments: action.data.comments,
      };
    case actionTypes.EDIT_SPECIFIC_ARTICLE:
      return {
        ...state,
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
        comments: action.comments,
      };
    case actionTypes.EDIT_SPECIFIC_LONG_REVIEW_COMMENT:
      return {
        ...state,
        comments: action.comments,
      };
    case actionTypes.DELETE_SPECIFIC_LONG_REVIEW_COMMENT:
      return {
        ...state,
        comments: action.comments,
      };
    case actionTypes.POST_ARTICLE_LIKE:
      let liked = [];
      if (action.article.is_long) {
        liked = state.longReviews.map(article => {
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
          longReviews: liked,
        };
      } else if (action.article.is_short) {
        liked = state.shortReviews.map(article => {
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
          shortReviews: liked,
        };
      } else {
        liked = state.phrases.map(article => {
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
          phrases: liked,
        };
      }
    case actionTypes.GET_ARTICLE_LIKE:
      return {
        ...state,
        selectedArticle: action.article,
      };
    case actionTypes.DELETE_ARTICLE_LIKE:
      let unliked = [];
      if (action.article.is_long) {
        unliked = state.longReviews.map(article => {
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
          longReviews: unliked,
        };
      } else if (action.article.is_short) {
        unliked = state.shortReviews.map(article => {
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
          shortReviews: unliked,
        };
      } else {
        unliked = state.phrases.map(article => {
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
          phrases: unliked,
        };
      }
    case actionTypes.DELETE_SPECIFIC_ARTICLE:
      //in Book detail page
      let deleted;
      switch (action.targetTYPE) {
        case 'long':
          deleted = state.longReviews.filter(article => {
            return article.id !== action.targetID;
          });
          return { ...state, longReviews: deleted };
        case 'short':
          deleted = state.shortReviews.filter(article => {
            return article.id !== action.targetID;
          });
          return { ...state, shortReviews: deleted };
        case 'phrase':
          deleted = state.phrases.filter(article => {
            return article.id !== action.targetID;
          });
          return { ...state, phrases: deleted };
      }
      //in User Page
      deleted = state.articlesByUserID.filter(article => {
        return article.id !== action.targetID;
      });
      return { ...state, articlesByUserID: deleted, length: state.length - 1 };
  }
  return state;
};

export default reducer;
