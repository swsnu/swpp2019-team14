import axios from 'axios';
// import * as router from 'connected-react-router';

import * as actionCreators from './actionCreators';
import store from '../store';
import { push } from 'connected-react-router';

const stubUser = {
  id: 1,
  email: 'swpp@snu.ac.kr',
  password: 'iluvswpp',
  name: 'ARTICLE_AUTHOR',
};
const stubBook = {
  isbn: 123456789101,
  title: 'TEST_TITLE',
  author: 'TEST_AUTHOR',
};
const stubArticle = {
  id: 11,
  book_id: 123456789101,
  author_id: 2,
  title: 'TEST_TITLE',
  content: 'TEST_CONTENT',
  is_long: true,
  is_short: false,
  is_phrase: false,
};

const stubSpecificArticle = {
  article: stubArticle,
  comments: [],
};

const stubShortArticle = {
  id: 11,
  book_id: 123456789101,
  author_id: 2,
  title: 'TEST_TITLE',
  content: 'TEST_CONTENT',
  is_long: false,
  is_short: false,
  is_phrase: false,
};

const stubCuration = {
  id: 11,
  author_id: 2,
  title: 'TEST_TITLE',
  content: 'TEST_CONTENT',
};

const stubSpecificCuration = {
  curation: stubCuration,
  comments: [],
};

const stubBookInCuration = {
  id: 1,
  curation_id: 11,
  book_id: 123456789101,
  content: 'TEST_CONTENT',
};

const stubComment = {
  id: 1,
  article_id: 1,
  author_id: 2,
  content: 'TEST_CONTENT',
};

const stubLibrary = {
  id: 11,
  author_id: 2,
};

const stubQuote = {
  quote: 'EXTRACTED FROM BOOK',
};

const stubFollows = {
  follower_list: [
    {
      id: 1,
      username: 'test_name',
      profile_photo: '',
      nickname: 'test_nickname',
    },
  ],
  followee_list: [],
};

const stubLikes = {
  count: 1,
};

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //   postUser,
  it(`'postUsers,loginUser'`, done => {
    const stubUsers = [stubUser];
    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUsers,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.loginUser()).then(() => {
      const newState = store.getState();
      expect(newState.user.logged_in_user).toBe(stubUsers);
      expect(spy).toHaveBeenCalledTimes(2);
      done();
    });

    store.dispatch(actionCreators.postUser()).then(() => {
      expect(spy).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it(`'login error when id or password is wrong'`, done => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.loginUser()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledWith(
        '아이디 혹은 비밀번호가 틀렸습니다.',
      );
      done();
    });
  });

  //sign out
  it(`'sign out'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 204,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.logoutUser()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  //   getSpecificUser,
  it(`'getSpecificUser'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUser,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getSpecificUser()).then(() => {
      //   const newState = store.getState();
      //   expect(newState.user.logged_in_user).toBe(stubUsers);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  //   getSearchedUsers,
  it(`'getSearchedUsers'`, done => {
    const stubUsers = [stubUser];
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUsers,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getSearchedUsers()).then(() => {
      //   const newState = store.getState();
      //   expect(newState.user.logged_in_user).toBe(stubUsers);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   getSearchedBooks,
  it(`'getSearchedBooks'`, done => {
    const stubBooks = [stubBook];
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: { books: stubBooks, count: 1 },
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getSearchedBooks()).then(() => {
      const newState = store.getState();
      expect(newState.book.books).toBe(stubBooks);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getSpecificBook'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubBook,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getSpecificBook()).then(() => {
      const newState = store.getState();
      expect(newState.book.selectedBook).toBe(stubBook);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  //   getArticles,
  //   getArticlesByBookId,
  //   getArticlesByUserId,
  it(`'getArticles'`, done => {
    const stubArticles = [stubArticle];

    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: { articles: stubArticles, hasNext: false },
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getArticles()).then(() => {
      const newState = store.getState();
      expect(newState.article.articles).toBe(stubArticles);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getArticlesByBookId, UserId'`, done => {
    const stubArticles = [stubArticle];

    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: { articles: stubArticles, length: 1 },
        };
        resolve(result);
      });
    });
    store
      .dispatch(actionCreators.getArticlesByBookId(123456789101))
      .then(() => {
        const newState = store.getState();
        expect(newState.article.longReviews).toStrictEqual(stubArticles);
        expect(spy).toHaveBeenCalledTimes(2);
        done();
      });

    store.dispatch(actionCreators.getArticlesByUserId(2)).then(() => {
      const newState = store.getState();
      expect(newState.article.articles).toStrictEqual(stubArticles);
      expect(spy).toHaveBeenCalledTimes(2);
      done();
    });
  });

  //   postArticle,
  it(`'postArticle' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticle,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.postArticle(stubArticle)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  //postArticle(short),
  it(`'postArticle' should post short article correctly`, done => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubShortArticle,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.postArticle(stubShortArticle)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  //   getSpecificArticle,
  it(`'getSpecificArticle'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubSpecificArticle,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getSpecificArticle()).then(() => {
      const newState = store.getState();
      expect(newState.article.selectedArticle).toBe(stubArticle);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   editSpecificArticle,
  it(`'editSpecificArticle'`, done => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubSpecificArticle,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.editSpecificArticle(stubArticle)).then(() => {
      //   expect(newState.article.selectedArticle).toBe(stubArticle);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   deleteSpecificArticle,
  it(`'deleteSpecificArticle'`, done => {
    const newState = store.getState();
    const spy = jest.spyOn(axios, 'delete').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: null,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.deleteSpecificArticle()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   getArticleLike,
  it(`'getArticleLike'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubLikes,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getArticleLike()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   postArticleLike,
  it(`'postArticleLike' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticle,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.postArticleLike()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   deleteArticleLike,
  it(`'deleteArticleLike' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticle,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.deleteArticleLike()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   postCuration,
  it(`'postCuration' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: { curation: stubCuration, book_content: stubBookInCuration },
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.postCuration()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   getSpecificCuration,
  it(`'getSpecificCuration'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubSpecificCuration,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getSpecificCuration()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   editSpecificCuration,
  it(`'editSpecificCuration'`, done => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store
      .dispatch(actionCreators.editSpecificCuration(stubCuration))
      .then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });
  //   deleteSpecificCuration,
  it(`'deleteSpecificCuration' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.deleteSpecificCuration()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   getCurationLike,
  it(`'getCurationLike'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubLikes,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getCurationLike()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   postCurationLike,
  it(`'postCurationLike' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.postCurationLike()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   deleteCurationLike,
  it(`'deleteCurationLike' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.deleteCurationLike()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   getSearchedCurations,
  it(`'getSearchedCurations'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getSearchedCurations()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   getCurationsByUserId,
  it(`'getCurationsByUserId'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubCuration,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getCurationsByUserId()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   postLongReviewComment,
  it(`'postLongReviewComment' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.postLongReviewComment()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   getSpecificLongReviewComment,
  it(`'getSpecificLongReviewComment'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getSpecificLongReviewComment()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   editSpecificLongReviewComment,
  it(`'editSpecificLongReviewComment'`, done => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store
      .dispatch(actionCreators.editSpecificLongReviewComment(stubComment))
      .then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });
  //   deleteSpecificLongReviewComment,
  it(`'deleteSpecificLongReviewComment' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store
      .dispatch(actionCreators.deleteSpecificLongReviewComment())
      .then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });
  //   getCommentsByReviewID,
  it(`'getCommentsByReviewID'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getCommentsByReviewID()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   postCurationComment,
  it(`'postCurationComment' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.postCurationComment()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   getSpecificCurationComment,
  it(`'getSpecificCurationComment'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getSpecificCurationComment()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   editSpecificCurationComment,
  it(`'editSpecificCurationComment'`, done => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store
      .dispatch(actionCreators.editSpecificCurationComment(stubComment))
      .then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });
  //   deleteSpecificCurationComment,
  it(`'deleteSpecificCurationComment' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.deleteSpecificCurationComment()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   getCommentsByCurationID,
  it(`'getCommentsByCurationID'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getCommentsByCurationID()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   postLibrary,
  it(`'postLibrary' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.postLibrary()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   getSpecificLibrary,
  it(`'getSpecificLibrary'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getSpecificLibrary(stubLibrary)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   editSpecificLibrary,
  it(`'editSpecificLibrary'`, done => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.editSpecificLibrary(stubLibrary)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   deleteSpecificLibrary,
  it(`'deleteSpecificLibrary' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.deleteSpecificLibrary()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   followUser,
  it(`'followUser' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: {
            id: 1,
            username: 'test_name',
            profile_photo: '',
            nickname: 'test_nickname',
          },
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.followUser()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   unfollowUser,
  it(`'unfollowUser' should post article correctly`, done => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: {
            id: 1,
            username: 'test_name',
            profile_photo: '',
            nickname: 'test_nickname',
          },
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.unfollowUser()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   getFollowers,
  it(`'getFollows'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubFollows,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getFollows()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  //   runOcr
  it(`'runOcr'`, done => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubQuote,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.runOcr()).then(() => {
      const newState = store.getState();
      expect(newState.book.quote).toBe(stubQuote.quote);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
