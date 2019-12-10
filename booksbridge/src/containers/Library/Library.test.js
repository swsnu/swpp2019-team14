import React from 'react';
import { shallow, mount } from 'enzyme';
import Library from './Library';
import AddLibraryModal from '../../components/Library/AddLibraryModal';
import ConfirmDelete from '../../components/Library/ConfirmDelete';
import { getMockStore } from '../../test-utils/mocks';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { history } from '../../store/store';
import { Provider } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

const stubInitialState = {
  logged_in_user: {
    id: 1,
    username: 'zzz',
    nickname: 'zzz',
    profile_photo:
      'https://react.semantic-ui.com/images/avatar/large/matthew.png',
    profile_text: '',
  },
  libraries: [
    {
      title: '교양쌓기',
      date: '2019-12-09T11:14:20.613',
      id: 1,
      books: [
        { isbn: 9788934972464, title: '사피엔스', thumbnail: 'thumbnail' },
      ],
    },
  ],
  selectedBook: {
    isbn: 9788934972464,
    title: '사피엔스',
    contents: 'content',
    author_contents: 'author contents',
    url: 'url',
    thumbnail: 'thumbnail',
    authors: '유발 하라리',
    publisher: '김영사',
    published_date: '2015-11-2',
    like_users: [],
  },
};
const mockStore = getMockStore(stubInitialState);

const stubInitialState2 = {};
const mockStore2 = getMockStore(stubInitialState2);

describe('<Library />', () => {
  let page, spyLoadUser, spyLoadLibrary, spyDeleteLibrary, spyHistoryPush;

  beforeEach(() => {
    page = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Library />
        </ConnectedRouter>
      </Provider>
    );

    spyLoadUser = jest
      .spyOn(actionCreators, 'getSpecificUser')
      .mockImplementation(username => {
        return dispatch => {};
      });
    spyLoadLibrary = jest
      .spyOn(actionCreators, 'getLibraries')
      .mockImplementation(() => dispatch => {});
    spyDeleteLibrary = jest
      .spyOn(actionCreators, 'deleteSpecificLibrary')
      .mockImplementation(id => dispatch => {});
    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const component = mount(page);
    const wrapper = component.find('.Library');
    expect(wrapper.length).toBe(1);
  });

  it('', () => {
    const component = mount(page);
    const wrapper = component.find('.Library');
  });
});
