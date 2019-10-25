import * as actionTypes from './actionTypes';
import axios from 'axios';
import push from 'connected-react-router';

// export const POST_NEW_USER = 'POST_NEW_USER'
export const postUser = (user) => {
  return dispatch => {
    return axios.post('/api/user/', user)
      .then(res => dispatch({
        type: actionTypes.POST_NEW_USER,
        user: res.data,
      }));
  };
};
// export const LOGIN_USER = 'LOGIN_USER'
export const loginUser = (user) => {
  return dispatch => {
    return axios.post('/api/sign_in/', user)
      .then(res => dispatch({
        type: actionTypes.LOGIN_USER,
        user: res.data,
      }));
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

// export const POST_SHORT_REVIEW = 'POST_SHORT_REVIEW'
export const postShortReview = (review) => {
  return dispatch => {
    return axios.post('/api/review_short/', review)
      .then(res => dispatch({
        type: actionTypes.POST_SHORT_REVIEW,
        review: res.data,
      }));
  };
};
// export const GET_SPECIFIC_SHORT_REVIEW = 'GET_SPECIFIC_SHORT_REVIEW'
export const getSpecificShortReview = (id) => {
  return dispatch => {
    return axios.get('/api/review_short/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SPECIFIC_SHORT_REVIEW,
        review: res.data,
      }));
  };
};

// export const EDIT_SPECIFIC_SHORT_REVIEW = 'EDIT_SPECIFIC_SHORT_REVIEW'
export const editSpecificShortReview = (review) => {
  return dispatch => {
    return axios.put('/api/review_short/' + review.id + '/', review)
      .then(res => dispatch({
        type: actionTypes.EDIT_SPECIFIC_SHORT_REVIEW,
        review: res.data,
      }));
  };
};
// export const DELETE_SPECIFIC_SHORT_REVIEW = 'DELETE_SPECIFIC_SHORT_REVIEW'
export const deleteSpecificShortReview = (id) => {
  return dispatch => {
    return axios.delete('/api/review_short/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.DELETE_SPECIFIC_SHORT_REVIEW,
      }));
  };
};
// export const GET_SHORT_REIVEW_LIKE = 'GET_SHORT_REIVEW_LIKE'
export const getShortReviewLike = (id) => {
  return dispatch => {
    return axios.get('/api/review_short/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SHORT_REIVEW_LIKE,
        like: res.data,
      }));
  };
};
// export const POST_SHORT_REVIEW_LIKE = 'POST_SHORT_REVIEW_LIKE'
export const postShortReviewLike = (id) => {
  return dispatch => {
    return axios.post('/api/review_short/' + id + '/like/')
      .then(res => dispatch({
        type: actionTypes.POST_SHORT_REVIEW_LIKE,
        like: res.data,
      }));
  };
};
// export const DELETE_SHORT_REVIEW_LIKE = 'DELETE_SHORT_REVIEW_LIKE'
export const deleteShortReviewLike = (id) => {
  return dispatch => {
    return axios.delete('/api/review_short/' + id + '/like/')
      .then(res => dispatch({
        type: actionTypes.DELETE_SHORT_REVIEW_LIKE,
      }));
  };
};
// export const GET_SHORT_REVIEWS_BY_BOOKID = 'GET_SHORT_REVIEWS_BY_BOOKID'
export const getShortReviewsByBookId = (id) => {
  return dispatch => {
    return axios.get('/api/review_short/?bookID=' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SHORT_REVIEWS_BY_BOOKID,
        reviews: res.data,
      }));
  };
};
// export const GET_SHORT_REVIEWS_BY_USERID = 'GET_SHORT_REVIEWS_BY_USERID'
export const getShortReviewsByUserId = (id) => {
  return dispatch => {
    return axios.get('/api/review_short/?userID=' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SHORT_REVIEWS_BY_USERID,
        reviews: res.data,
      }));
  };
};

////////////////////////////////////////// LONG REVIEW ///////////////////////////////

// export const POST_LONG_REVIEW = 'POST_LONG_REVIEW'
export const postLongReview = (review) => {
  return dispatch => {
    return axios.post('/api/review_long/', review)
      .then(res => dispatch({
        type: actionTypes.POST_LONG_REVIEW,
        review: res.data,
      }));
  };
};

// export const GET_SPECIFIC_LONG_REVIEW = 'GET_SPECIFIC_LONG_REVIEW'
export const getSpecificLongReview = (id) => {
  return dispatch => {
    return axios.get('/api/review_long/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SPECIFIC_LONG_REVIEW,
        review: res.data,
      }));
  };
};

// export const EDIT_SPECIFIC_LONG_REVIEW = 'EDIT_SPECIFIC_LONG_REVIEW'
export const editSpecificLongReview = (review) => {
  return dispatch => {
    return axios.put('/api/review_long/' + review.id + '/', review)
      .then(res => dispatch({
        type: actionTypes.EDIT_SPECIFIC_LONG_REVIEW,
        review: res.data,
      }));
  };
};
// export const DELETE_SPECIFIC_LONG_REVIEW = 'DELETE_SPECIFIC_LONG_REVIEW'
export const deleteSpecificLongReview = (id) => {
  return dispatch => {
    return axios.delete('/api/review_long/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.DELETE_SPECIFIC_LONG_REVIEW,
      }))
  }
}
// export const GET_LONG_REVIEW_LIKE = 'GET_LONG_REVIEW_LIKE'
export const getLongReviewLike = (id) => {
  return dispatch => {
    return axios.get('/api/review_long/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_LONG_REVIEW_LIKE,
        like: res.data,
      }));
  };
};
// export const POST_LONG_REVIEW_LIKE = 'POST_LONG_REVIEW_LIKE'
export const postLongReviewLike = (id) => {
  return dispatch => {
    return axios.post('/api/review_long/' + id + '/like/')
      .then(res => dispatch({
        type: actionTypes.POST_LONG_REVIEW_LIKE,
        like: res.data,
      }));
  };
};
// export const DELETE_LONG_REVIEW_LIKE = 'DELETE_LONG_REVIEW_LIKE'
export const deleteLongReviewLike = (id) => {
  return dispatch => {
    return axios.delete('/api/review_long/' + id + '/like/')
      .then(res => dispatch({
        type: actionTypes.DELETE_LONG_REVIEW_LIKE,
      }));
  };
};
// export const GET_LONG_REVIEWS_BY_BOOKID = 'GET_LONG_REVIEWS_BY_BOOKID'
export const getLongReviewsByBookId = (id) => {
  return dispatch => {
    return axios.get('/api/review_long/?bookID=' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_LONG_REVIEWS_BY_BOOKID,
        reviews: res.data,
      }));
  };
};
// export const GET_LONG_REVIEWS_BY_USERID = 'GET_LONG_REVIEWS_BY_USERID'
export const getLongReviewsByUserId = (id) => {
  return dispatch => {
    return axios.get('/api/review_long/?userID=' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_LONG_REVIEWS_BY_USERID,
        reviews: res.data,
      }));
  };
};

////////////////////////////////////// PHRASE //////////////////////////////////////


// export const POST_PHRASE = 'POST_PHRASE'
export const postPhrase = (review) => {
  return dispatch => {
    return axios.post('/api/review_phrase/', review)
      .then(res => dispatch({
        type: actionTypes.POST_PHRASE,
        review: res.data,
      }));
  };
};

// export const GET_SPECIFIC_PHRASE = 'GET_SPECIFIC_PHRASE'
export const getSpecificPhrase = (id) => {
  return dispatch => {
    return axios.get('/api/review_phrase/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_SPECIFIC_PHRASE,
        review: res.data,
      }));
  };
};

// export const EDIT_SPECIFIC_PHRASE = 'EDIT_SPECIFIC_PHRASE'
export const editSpecificPhrase = (review) => {
  return dispatch => {
    return axios.put('/api/review_phrase/' + review.id + '/', review)
      .then(res => dispatch({
        type: actionTypes.EDIT_SPECIFIC_PHRASE,
        review: res.data,
      }));
  };
};

// export const DELETE_SPECIFIC_PHRASE = 'DELETE_SPECIFIC_PHRASE'
export const deleteSpecificPhrase = (id) => {
  return dispatch => {
    return axios.delete('/api/review_phrase/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.DELETE_SPECIFIC_PHRASE,
      }));
  };
};

// export const GET_PHRASE_LIKE = 'GET_PHRASE_LIKE'
export const getPhraseLike = (id) => {
  return dispatch => {
    return axios.get('/api/review_phrase/' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_PHRASE_LIKE,
        like: res.data,
      }));
  };
};

// export const POST_PHRASE_LIKE = 'POST_PHRASE_LIKE'
export const postPhraseLike = (id) => {
  return dispatch => {
    return axios.post('/api/review_phrase/' + id + '/like/')
      .then(res => dispatch({
        type: actionTypes.POST_PHRASE_LIKE,
        like: res.data,
      }));
  };
};
// export const DELETE_PHRASE_LIKE = 'DELETE_PHRASE_LIKE'
export const deletePhraseLike = (id) => {
  return dispatch => {
    return axios.delete('/api/review_phrase/' + id + '/like/')
      .then(res => dispatch({
        type: actionTypes.DELETE_PHRASE_LIKE,
      }));
  };
};
// export const GET_PHRASES_BY_BOOKID = 'GET_PHRASES_BY_BOOKID'
export const getPhrasesByBookId = (id) => {
  return dispatch => {
    return axios.get('/api/review_phrase/?bookID=' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_PHRASES_BY_BOOKID,
        reviews: res.data,
      }));
  };
};
// export const GET_PHRASES_BY_USERID = 'GET_PHRASES_BY_USERID'
export const getPhrasesByUserId = (id) => {
  return dispatch => {
    return axios.get('/api/review_long/?userID=' + id + '/')
      .then(res => dispatch({
        type: actionTypes.GET_PHRASES_BY_USERID,
        reviews: res.data,
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
    return axios.get('/api/comment/long_review/?reviewID=' + id + '/')
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