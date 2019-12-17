import React from 'react';
import { shallow, mount } from 'enzyme';
import CurationDetailPage from './CurationDetailPage';
import { getMockStore } from '../../test-utils/mocks';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { history } from '../../store/store';
import { Provider } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

const author1 = {
  id: 2,
  username: 'www',
  nickname: 'www',
  profile_photo:
    'https://react.semantic-ui.com/images/avatar/large/matthew.png',
  profile_text: '',
};
const author2 = {
  id: 10,
  username: 'TEST_USER',
  profile_photo: '',
  nickname: 'TEST_USER',
};

const book1 = {
  isbn: 9788915092044,
  title: 'TEST_TITLE',
  contents: 'TEST_CONTENT',
  url: 'TEST_URL',
  thumbnail: null,
  authors: 'TEST_AUTHOR',
  publisher: 'TEST_PUBLISHER',
  published_date: 'TEST_DATE',
};

const book2 = {
  isbn: 123456789,
  title: 'TEST_TITLE',
  contents: 'TEST_CONTENT',
  url: 'TEST_URL',
  thumbnail: null,
  authors: 'TEST_AUTHOR',
  publisher: 'TEST_PUBLISHER',
  published_date: 'TEST_DATE',
};

const comment = {
  id: 1,
  curation: 1,
  author: {
    id: 3,
    username: 'TEST_USER',
    profile_photo: '',
    nickname: 'TEST_USER',
  },
  content: 'TEST_CONTENT',
  date: 'TEST_DATE',
  parent: 1,
  replies: [],
};

const stubInitialState = {
  curations: [],
  logged_in_user: author1,
  selectedCuration: {
    id: 1,
    author: author2,
    books: [
      {
        book: book1,
        content: 'TEST_CONTENT',
      },
      {
        book: book2,
        content: 'TEST_CONTENT',
      },
    ],
    title: 'TEST_TITLE',
    content: 'TEST_CONTENT',
    date: 'TEST_DATE',
    like_or_not: false,
    like_count: 10,
  },
  comments: [comment],
};
const mockStore = getMockStore(stubInitialState);

const stubInitialState2 = {
  curations: [],
  selectedCuration: null,
  likes: null,
};
const mockStore2 = getMockStore(stubInitialState2);

const stubInitialState3 = {
  curations: [],
  logged_in_user: author1,
  selectedCuration: {
    id: 1,
    author: author1,
    books: [
      {
        book: book1,
        content: 'TEST_CONTENT',
      },
      {
        book: book2,
        content: 'TEST_CONTENT',
      },
    ],
    title: 'TEST_TITLE',
    content: 'TEST_CONTENT',
    date: 'TEST_DATE',
    like_or_not: true,
    like_count: 10,
  },
  comments: [comment],
};
const mockStore3 = getMockStore(stubInitialState3);

describe('<CurationDetailPage/>', () => {
  let page,
    spyPostLikeCuration,
    spyDeleteLikeCuration,
    spyDeleteCuration,
    spyPush;
  beforeEach(() => {
    page = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <CurationDetailPage />
        </ConnectedRouter>
      </Provider>
    );
    spyPostLikeCuration = jest
      .spyOn(actionCreators, 'postCurationLike')
      .mockImplementation(id => {
        return dispatch => {};
      });
    spyDeleteLikeCuration = jest
      .spyOn(actionCreators, 'deleteCurationLike')
      .mockImplementation(id => {
        return dispatch => {};
      });
    spyPush = jest.spyOn(history, 'push').mockImplementation(() => {});
    spyDeleteCuration = jest
      .spyOn(actionCreators, 'deleteSpecificCuration')
      .mockImplementation(() => {
        return dispatch => {};
      });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const component = mount(page);
    const wrapper = component.find('.curation-detail-page');
    expect(wrapper.length).toBe(1);
  });

  it('should render `loading` with no current curation selected', () => {
    const page2 = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <CurationDetailPage />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(page2);
    const wrapper = component.find('.curation-detail-page');
    expect(wrapper.length).toBe(0);
  });

  it('should like and unlike curation', () => {
    const component = mount(page);
    const wrapper = component.find('.CurationLikeButton');
    wrapper.simulate('click');
    expect(spyPostLikeCuration).toHaveBeenCalledTimes(1);
    // wrapper.simulate('click');
    // expect(spyDeleteLikeCuration).toHaveBeenCalledTimes(1);
  });

  it('no edit and delete button for non author', () => {
    const page3 = (
      <Provider store={mockStore3}>
        <ConnectedRouter history={history}>
          <CurationDetailPage />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(page3);
    const wrapper = component.find('.curation-detail-page');
    expect(wrapper.length).toBe(1);
  });
  it('like', () => {
    const page3 = (
      <Provider store={mockStore3}>
        <ConnectedRouter history={history}>
          <CurationDetailPage />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(page3);
    const likeButton = component.find('.CurationLikeButton');
    likeButton.simulate('click');
    expect(spyDeleteLikeCuration).toHaveBeenCalledTimes(1);
  });
  it('like', () => {
    const component = mount(page);
    const likeButton = component.find('.CurationLikeButton');
    likeButton.simulate('click');
    expect(spyPostLikeCuration).toHaveBeenCalledTimes(1);
  });
  it('click delete button', () => {
    const page3 = (
      <Provider store={mockStore3}>
        <ConnectedRouter history={history}>
          <CurationDetailPage />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(page3);
    const button = component.find('#redirect-delete-curation').at(0);
    button.simulate('click');
    expect(spyDeleteCuration).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledTimes(1);
  });
  it('click edit button', () => {
    const page3 = (
      <Provider store={mockStore3}>
        <ConnectedRouter history={history}>
          <CurationDetailPage />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(page3);
    const button = component.find('#redirect-edit-curation').at(0);
    button.simulate('click');
    expect(spyPush).toHaveBeenCalledTimes(1);
  });
});
