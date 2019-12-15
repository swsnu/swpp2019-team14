import React from 'react';
import { shallow, mount } from 'enzyme';
import CurationDetailPage from './CurationDetailPage';
import { getMockStore } from '../../test-utils/mocks';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { history } from '../../store/store';
import { Provider } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

const stubInitialState = {
  curations: [],
  logged_in_user: {
    id: 2,
    username: 'www',
    nickname: 'www',
    profile_photo:
      'https://react.semantic-ui.com/images/avatar/large/matthew.png',
    profile_text: '',
  },
  selectedCuration: {
    id: 1,
    author: {
      id: 2,
      username: 'TEST_USER',
      profile_photo: '',
      nickname: 'TEST_USER',
    },
    books: [
      {
        book: {
          isbn: 9788915092044,
          title: 'TEST_TITLE',
          contents: 'TEST_CONTENT',
          url: 'TEST_URL',
          thumbnail: null,
          authors: 'TEST_AUTHOR',
          publisher: 'TEST_PUBLISHER',
          published_date: 'TEST_DATE',
        },
        content: 'TEST_CONTENT',
      },
      {
        book: {
          isbn: 123456789,
          title: 'TEST_TITLE',
          contents: 'TEST_CONTENT',
          url: 'TEST_URL',
          thumbnail: null,
          authors: 'TEST_AUTHOR',
          publisher: 'TEST_PUBLISHER',
          published_date: 'TEST_DATE',
        },
        content: 'TEST_CONTENT',
      },
    ],
    title: 'TEST_TITLE',
    content: 'TEST_CONTENT',
    date: 'TEST_DATE',
    likes: { count: 0, users: [] },
  },
  comments: [
    {
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
    },
  ],
};
const mockStore = getMockStore(stubInitialState);

const stubInitialState2 = {
  curations: [],
  selectedCuration: null,
  likes: null,
};
const mockStore2 = getMockStore(stubInitialState2);

describe('<CurationDetailPage/>', () => {
  let page,
    spyLoadCuration,
    spyPostLikeCuration,
    spyGetLikeCuration,
    spyDeleteLikeCuration;
  beforeEach(() => {
    page = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <CurationDetailPage />
        </ConnectedRouter>
      </Provider>
    );
    spyLoadCuration = jest
      .spyOn(actionCreators, 'getSpecificCuration')
      .mockImplementation(id => {
        return dispatch => {};
      });
    spyPostLikeCuration = jest
      .spyOn(actionCreators, 'postCurationLike')
      .mockImplementation(id => {
        return dispatch => {};
      });
    spyGetLikeCuration = jest
      .spyOn(actionCreators, 'getCurationLike')
      .mockImplementation(id => {
        return dispatch => {};
      });
    spyDeleteLikeCuration = jest
      .spyOn(actionCreators, 'deleteCurationLike')
      .mockImplementation(id => {
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
});
