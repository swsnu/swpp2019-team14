import * as actionTypes from './actionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';



export const getUsers = () => {
  return dispatch => {
    return axios.get('/api/user/')
      .then(res => dispatch({ type: actionTypes.GET_USERS, users: res.data }));
  };
};

export const toggleLoginInfo = (User) => {
  return dispatch => {
    return axios.patch('/api/user/' + User.id, { logged_in: !User.logged_in })
      .then(res => {
        dispatch({ type: actionTypes.TOGGLE_LOGININFO, targetID: User.id })
        if (!res.data.logged_in)
          dispatch(push('/login/'));
      });
  };
};

export const getArticles = () => {
  return dispatch => {
    return axios.get('/api/articles/')
      .then(res => dispatch({ type: actionTypes.GET_ARTICLES, articles: res.data }));
  };
};

export const addArticle = (article) => {
  return (dispatch) => {
    return axios.post('/api/articles/', article)
      .then(res => {
        dispatch({
          type: actionTypes.ADD_ARTICLE,
          id: res.data.id,
          author_id: res.author_id,
          title: res.data.title,
          content: res.data.content
        });
        dispatch(push('/articles/' + res.data.id));
      });
  };
};

export const getArticle = (id) => {
  return (dispatch) => {
    return axios.get('/api/articles/' + id)
      .then(res => {
        dispatch({ type: actionTypes.GET_ARTICLE, target: res.data })
      });
  };
};

export const editArticle = (article) => {
  return (dispatch) => {
    return axios.patch('/api/articles/' + article.id, { title: article.title, content: article.content })
      .then(res => {
        dispatch({
          type: actionTypes.EDIT_ARTICLE,
          id: res.data.id,
          title: res.data.title,
          content: res.data.content,
        });
        dispatch(push('/articles/' + article.id));
      });
  };
};

export const deleteArticle = (id) => {
  return dispatch => {
    return axios.delete('/api/articles/' + id)
      .then(res => {
        dispatch({
          type: actionTypes.DELETE_ARTICLE,
          targetID: id
        });
        dispatch(push('/articles/'));
      });
  };
};

export const getComments = (id) => {
  return dispatch => {
    return axios.get('/api/comments/')
      .then(res => dispatch({ type: actionTypes.GET_COMMENTS, comments: res.data, targetID: id }));
  };
};

export const addComment = (comment) => {
  return (dispatch) => {
    return axios.post('/api/comments/', comment)
      .then(res => {
        dispatch({
          type: actionTypes.ADD_COMMENT,
          id: res.data.id,
          article_id: res.data.article_id,
          author_id: res.data.author_id,
          content: res.data.content,
        });
      });
  };
};

export const editComment = (comment) => {
  return (dispatch) => {
    return axios.patch('/api/comments/' + comment.id, { content: comment.content })
      .then(res => {
        dispatch({
          type: actionTypes.EDIT_COMMENT,
          id: res.data.id,
          content: res.data.content,
        });
      });
  };
};

export const deleteComment = (id) => {
  return dispatch => {
    return axios.delete('/api/comments/' + id)
      .then(res => dispatch({
        type: actionTypes.DELETE_COMMENT,
        targetID: id
      }));
  };
};
