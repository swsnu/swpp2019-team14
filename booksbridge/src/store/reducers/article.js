import * as actionTypes from '../actions/actionTypes';

const initialState = {
  longReviews: [],
  shortReviews: [],
  phrases: [],
  articles: [],
  hasNext: [],
  selectedArticle: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLES_BY_BOOKID:
      return {
        ...state,
        longReviews: action.articles.filter((article) => { return article.is_long }),
        shortReviews: action.articles.filter((article) => { return article.is_short }),
        phrases: action.articles.filter((article) => { return article.is_phrase })
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
          selectedArticle: action.article
        };
  }
  return state;
};

export default reducer;