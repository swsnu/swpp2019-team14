import * as actionTypes from './actionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

// export const POST_NEW_USER = 'POST_NEW_USER'
export const postUser = (user) => {
  return dispatch => {
    return axios.post('/api/user/', user)
      .then(res => {
        dispatch({
          type: actionTypes.POST_NEW_USER,
          user: res.data,
        });
        dispatch(push('/sigin-in/'));
      })
  };
};
// export const LOGIN_USER = 'LOGIN_USER'
export const loginUser = (user) => {
  return dispatch => {
    return axios.post('/api/sign_in/', user)
      .then(res => {
        dispatch({
          type: actionTypes.LOGIN_USER,
          user: res.data,
        });
        dispatch(push('/main/'));
      }).catch(err => {
        alert("Username or Password is incorrect.");
      });
  };
};

// export const LOGOUT_USER = 'LOGOUT_USER'
export const logoutUser = () => {
  return dispatch => {
    return axios.post('/api/sign_out/')
      .then(res => dispatch({
        type: actionTypes.LOGOUT_USER,
      }));
  };
};
// export const GET_SIGNED_IN_USER = 'GET_SIGNED_IN_USER'
// 일단은 필요없어 보임 - 한결

// export const GET_SPECIFIC_USER = 'GET_SPECIFIC_USER'
export const getSpecificUser = (id) => {
  return dispatch => {
    return axios.get('/api/user/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SPECIFIC_USER,
        user: res.data,
      }));
  };
};
// export const GET_SEARCHED_USERS = 'GET_SEARCHED_USERS'
export const getSearchedUsers = (keyword) => {
  return dispatch => {
    return axios.get('/api/user/searchWord=' + keyword + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SEARCHED_USERS,
        users: res.data
      }));
  };
};

// export const GET_SEARCHED_BOOKS = 'GET_SEARCHED_BOOKS'
export const getSearchedBooks = (keyword, page) => {
  return dispatch => {
    return axios.get('/api/book/' + encodeURI(keyword) + '/' + page + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SEARCHED_BOOKS,
        books: res.data.books,
        count: res.data.count,
      }));
  };
};
// export const GET_SPECIFIC_BOOK = 'GET_SPECIFIC_BOOK'
export const getSpecificBook = (isbn) => {
  return dispatch => {
    return axios.get('/api/book/' + isbn + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SPECIFIC_BOOK,
        book: res.data,
      }));
  };
};

export const getArticles = (page) => {
  return dispatch => {
    return axios.get('/api/article/'+page+'/')
      .then(res => dispatch({
        type: actionTypes.GET_ARTICLES,
        articles: res.data.articles,
        has_next: res.data.has_next,
      }));
  };
};

// export const POST_ARTICLE = 'POST_ARTICLE'
export const postArticle = (article) => {
  return dispatch => {
    return axios.post('/api/article/', article)
      .then(res => dispatch({
        type: actionTypes.POST_ARTICLE,
        article: res.data,
      }));
  };
};

// export const GET_SPECIFIC_ARTICLE = 'GET_SPECIFIC_ARTICLE'
export const getSpecificArticle = (id) => {
  return dispatch => {
    return axios.get('/api/article/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SPECIFIC_ARTICLE,
        article: res.data,
      }));
  };
};

// export const EDIT_SPECIFIC_ARTICLE = 'EDIT_SPECIFIC_ARTICLE'
export const editSpecificArticle = (article) => {
  return dispatch => {
    return axios.put('/api/article/' + article.id + '/', article)
      .then(res => dispatch({
        type: actionTypes.EDIT_SPECIFIC_ARTICLE,
        article: res.data,
      }));
  };
};
// export const DELETE_SPECIFIC_ARTICLE = 'DELETE_SPECIFIC_ARTICLE'
export const deleteSpecificArticle = (id) => {
  return dispatch => {
    return axios.delete('/api/article/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.DELETE_SPECIFIC_ARTICLE,
      }))
  }
}
// export const GET_ARTICLE_LIKE = 'GET_ARTICLE_LIKE'
export const getArticleLike = (id) => {
  return dispatch => {
    return axios.get('/api/article/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_ARTICLE_LIKE,
        like: res.data,
      }));
  };
};
// export const POST_ARTICLE_LIKE = 'POST_ARTICLE_LIKE'
export const postArticleLike = (id) => {
  return dispatch => {
    return axios.post('/api/article/' + id + '/like/')
      .then(res => dispatch({
        type: actionTypes.POST_ARTICLE_LIKE,
        like: res.data,
      }));
  };
};
// export const DELETE_ARTICLE_LIKE = 'DELETE_ARTICLE_LIKE'
export const deleteArticleLike = (id) => {
  return dispatch => {
    return axios.delete('/api/article/' + id + '/like/')
      .then(res => dispatch({
        type: actionTypes.DELETE_ARTICLE_LIKE,
      }));
  };
};
// export const GET_ARTICLES_BY_BOOKID = 'GET_ARTICLES_BY_BOOKID'
export const getArticlesByBookId = (isbn) => {
  return dispatch => {
    return axios.get('/api/article/bookID=' + isbn + '/')
      .then(res => dispatch({
        type: actionTypes.GET_ARTICLES_BY_BOOKID,
        articles: res.data,
      }));
  };
};
// export const GET_ARTICLES_BY_USERID = 'GET_ARTICLES_BY_USERID'
export const getArticlesByUserId = (id) => {
  return dispatch => {
    return axios.get('/api/article/userID=' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_ARTICLES_BY_USERID,
        articles: res.data,
      }));
  };
};

////////////////////////////////////// CURATION //////////////////////////////////////

// export const POST_CURATION = 'POST_CURATION'
export const postCuration = (curation) => {
  return dispatch => {
    return axios.post('/api/curation/', curation)
      .then(res => dispatch({
        type: actionTypes.POST_CURATION,
        curation: res.data,
      }));
  };
};

// export const GET_SPECIFIC_CURATION = 'GET_SPECIFIC_CURATION'
export const getSpecificCuration = (id) => {
  return dispatch => {
    return axios.get('/api/curation/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SPECIFIC_CURATION,
        curation: res.data,
      }));
  };
};

// export const EDIT_SPECIFIC_CURATION = 'EDIT_SPECIFIC_CURATION'
export const editSpecificCuration = (curation) => {
  return dispatch => {
    return axios.put('/api/curation/' + curation.id + '/', curation)
      .then(res => dispatch({
        type: actionTypes.EDIT_SPECIFIC_CURATION,
        curation: res.data,
      }));
  };
};

// export const DELETE_SPECIFIC_CURATION = 'DELETE_SPECIFIC_CURATION'
export const deleteSpecificCuration = (id) => {
  return dispatch => {
    return axios.delete('/api/curation/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.DELETE_SPECIFIC_CURATION,
      }));
  };
};

// export const GET_CURATION_LIKE = 'GET_CURATION_LIKE'
export const getCurationLike = (id) => {
  return dispatch => {
    return axios.get('/api/curation/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_CURATION_LIKE,
        like: res.data,
      }));
  };
};

// export const POST_CURATION_LIKE = 'POST_CURATION_LIKE'
export const postCurationLike = (id) => {
  return dispatch => {
    return axios.post('/api/curation/' + id + '/like/')
      .then(res => dispatch({
        type: actionTypes.POST_CURATION_LIKE,
        like: res.data,
      }));
  };
};
// export const DELETE_CURATION_LIKE = 'DELETE_CURATION_LIKE'
export const deleteCurationLike = (id) => {
  return dispatch => {
    return axios.delete('/api/curation/' + id + '/like/')
      .then(res => dispatch({
        type: actionTypes.DELETE_CURATION_LIKE,
      }));
  };
};
// export const GET_SEARCHED_CURATIONS = 'GET_SEARCHED_CURATIONS'
export const getSearchedCurations = (keyword) => {
  return dispatch => {
    return axios.get('/api/curation/?searchWord=' + keyword + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SEARCHED_CURATIONS,
        curations: res.data,
      }));
  };
};
// export const GET_CURATIONS_BY_USERID = 'GET_CURATIONS_BY_USERID'
export const getCurationsByUserId = (id) => {
  return dispatch => {
    return axios.get('/api/curation/?userID=' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_CURATIONS_BY_USERID,
        curations: res.data,
      }));
  };
};

////////////////////////////////////// CURATION //////////////////////////////////////

// export const POST_LONG_REVIEW_COMMENT = 'POST_LONG_REVIEW_COMMENT'
export const postLongReviewComment = (comment) => {
  return dispatch => {
    return axios.post('/api/comment/long_review/', comment)
      .then(res => dispatch({
        type: actionTypes.POST_LONG_REVIEW_COMMENT,
        comment: res.data,
      }));
  };
};
// export const GET_SPECIFIC_LONG_REVIEW_COMMENT = 'GET_SPECIFIC_LONG_REVIEW_COMMENT' 
export const getSpecificLongReviewComment = (id) => {
  return dispatch => {
    return axios.get('/api/comment/long_review/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SPECIFIC_LONG_REVIEW_COMMENT,
        comment: res.data,
      }));
  };
};
// export const EDIT_SPECIFIC_LONG_REVIEW_COMMENT  = 'EDIT_SPECIFIC_LONG_REVIEW_COMMENT'
export const editSpecificLongReviewComment = (comment) => {
  return dispatch => {
    return axios.put('/api/comment/long_review/' + comment.id + '/', comment)
      .then(res => dispatch({
        type: actionTypes.EDIT_SPECIFIC_LONG_REVIEW_COMMENT,
        comment: res.data,
      }));
  };
};
// export const DELETE_SPECIFIC_LONG_REVIEW_COMMNET = 'DELETE_SPECIFIC_LONG_REVIEW_COMMNET'
export const deleteSpecificLongReviewComment = (id) => {
  return dispatch => {
    return axios.delete('/api/comment/long_review/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.DELETE_SPECIFIC_LONG_REVIEW_COMMNET,
      }));
  };
};
// export const GET_COMMENTS_BY_REVIEWID = 'GET_COMMENTS_BY_REVIEWID'
export const getCommentsByReviewID = (id) => {
  return dispatch => {
    return axios.get('/api/comment/long_review/reviewID=' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_COMMENTS_BY_REVIEWID,
        comments: res.data,
      }));
  };
};


// export const POST_CURATION_COMMENT = 'POST_CURATION_COMMENT'
export const postCurationComment = (comment) => {
  return dispatch => {
    return axios.post('/api/comment/curation/', comment)
      .then(res => dispatch({
        type: actionTypes.POST_CURATION_COMMENT,
        comment: res.data,
      }));
  };
};
// export const GET_SPECIFIC_CURATION_COMMENT = 'GET_SPECIFIC_CURATION_COMMENT' 
export const getSpecificCurationComment = (id) => {
  return dispatch => {
    return axios.get('/api/comment/curation/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SPECIFIC_CURATION_COMMENT,
        comment: res.data,
      }));
  };
};
// export const EDIT_SPECIFIC_CURATION_COMMENT  = 'EDIT_SPECIFIC_CURATION_COMMENT'
export const editSpecificCurationComment = (comment) => {
  return dispatch => {
    return axios.put('/api/comment/curation/' + comment.id + '/', comment)
      .then(res => dispatch({
        type: actionTypes.EDIT_SPECIFIC_CURATION_COMMENT,
        comment: res.data,
      }));
  };
};
// export const DELETE_SPECIFIC_CURATION_COMMNET = 'DELETE_SPECIFIC_CURATION_COMMNET'
export const deleteSpecificCurationComment = (id) => {
  return dispatch => {
    return axios.delete('/api/comment/curation/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.DELETE_SPECIFIC_CURATION_COMMNET,
      }));
  };
};
// export const GET_COMMENTS_BY_CURATIONID = 'GET_COMMENTS_BY_CURATIONID'
export const getCommentsByCurationID = (id) => {
  return dispatch => {
    return axios.get('/api/comment/curation/?curationID=' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_COMMENTS_BY_CURATIONID,
        comments: res.data,
      }));
  };
};

/////////////////////////////////// Library ////////////////////////////////////

// export const POST_LIBRARY = 'POST_LIBRARY'
export const postLibrary = (library) => {
  return dispatch => {
    return axios.post('/api/library/', library)
      .then(res => dispatch({
        type: actionTypes.POST_LIBRARY,
        library: res.data,
      }));
  };
};
// export const GET_SPECIFIC_LIBRARY = 'GET_SPECIFIC_LIBRARY'
export const getSpecificLibrary = (id) => {
  return dispatch => {
    return axios.get('/api/library/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SPECIFIC_LIBRARY,
        library: res.data,
      }));
  };
};
// export const EDIT_SPECIFIC_LIBRARY = 'EDIT_SPECIFIC_LIBRARY'
export const editSpecificLibrary = (library) => {
  return dispatch => {
    return axios.put('/api/library/' + library.id + '/', library)
      .then(res => dispatch({
        type: actionTypes.EDIT_SPECIFIC_LIBRARY,
        library: res.data,
      }));
  };
};
// export const DELETE_SPECIFIC_LIBRARY = 'DELETE_SPECIFIC_LIBRARY'
export const deleteSpecificLibrary = (id) => {
  return dispatch => {
    return axios.delete('/api/library/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.DELETE_SPECIFIC_LIBRARY,
      }));
  };
};

////////////////////////////////////// FOLLOW ///////////////////////////////////

// export const FOLLOW_USER = 'FOLLOW_USER'
export const followUser = (userid) => {
  return dispatch => {
    return axios.post('/follow/', userid) //변경해야함
      .then(res => dispatch({
        type: actionTypes.FOLLOW_USER,
        user: res.data,
      }));
  };
};
// export const UNFOLLOW_USER = 'UNFOLLOW_USER'
export const unfollowUser = (userid) => {
  return dispatch => {
    return axios.delete('/follow/', userid) //변경해야함
      .then(res => dispatch({
        type: actionTypes.UNFOLLOW_USER,
        user: res.data,
      }));
  };
};
// export const GET_FOLLOWERS = 'GET_FOLLOWERS'
export const getFollowers = (userid) => {
  return dispatch => {
    return axios.get('/follow/?follower=' + userid + '/')
      .then(res => dispatch({
        type: actionTypes.GET_FOLLOWERS,
        users: res.data,
      }));
  };
};
// export const GET_FOLLOWEES = 'GET_FOLLOWEES'
export const getFollowees = (userid) => {
  return dispatch => {
    return axios.get('/follow/?followee=' + userid + '/')
      .then(res => dispatch({
        type: actionTypes.GET_FOLLOWEES,
        users: res.data,
      }));
  };
};


/////////////////////////////////// EXTRA /////////////////////////////////////////
export const emptySearchedBooks = () => {
  return {
    type: actionTypes.EMPTY_SEARCHED_BOOKS,
  };
};