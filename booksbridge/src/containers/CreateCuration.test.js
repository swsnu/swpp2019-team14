import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateCuration from './CreateCuration';
import { getMockStore } from '../test-utils/mocks';
import { Provider } from 'react-redux';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import * as actionCreators from '../store/actions/actionCreators';

const stubInitialState = {
  selectedBook: {
    isbn: 1,
    title: 'TEST_BOOK',
    url: 'TEST_URL',
    thumbnail: 'TEST_THUMBNAIL',
    contents: 'TEST_CONTENTS',
    authors: 'TEST_AUTHORS',
    publisher: 'TEST_PUBLISHER',
    published_date: 'TEST_DATE',
    author_contents: 'TEST_AUTHOR_CONTENTS',
  },
  searchedBooks: [
    {
      isbn: 1,
      title: 'TEST_BOOK',
      url: 'TEST_URL',
      thumbnail: 'TEST_THUMBNAIL',
      contents: 'TEST_CONTENTS',
      authors: 'TEST_AUTHORS',
      publisher: 'TEST_PUBLISHER',
      published_date: 'TEST_DATE',
      author_contents: 'TEST_AUTHOR_CONTENTS',
    },
  ],
};

const mockStore = getMockStore(stubInitialState);

describe('<CreateCuration />', () => {
  let modal, spySearchBooks, spyEmptySearchedBooks;
  beforeEach(() => {
    modal = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <CreateCuration />
        </ConnectedRouter>
      </Provider>
    );
    spySearchBooks = jest
      .spyOn(actionCreators, 'getSearchedBooks')
      .mockImplementation((keyword, page) => {
        return dispatch => {};
      });
    spyEmptySearchedBooks = jest
      .spyOn(actionCreators, 'emptySearchedBooks')
      .mockImplementation(() => {
        return dispatch => {};
      });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render', () => {
    const component = mount(modal);
    const wrapper = component.find('.create-curation');
    expect(wrapper.length).toBe(1);
  });
});
