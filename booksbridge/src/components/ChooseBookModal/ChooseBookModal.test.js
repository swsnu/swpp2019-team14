import React from 'react';
import { shallow, mount } from 'enzyme';
import ChooseBookModal from './ChooseBookModal';
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import * as actionTypes from '../../store/actions/actionTypes';
import store from '../../store/store';

const book1 = {
  author: {
    id: 1,
    username: 'TEST_USER',
    profile_photo: '',
    nickname: 'TEST_USER',
  },
  book_isbn: 9788915092044,
  book_title: 'TEST_BOOK',
  book_thumbnail: '',
  id: 1,
  title: 'TEST_ARTICLE',
  content: 'TEST_ARTICLE',
  date: [0, 0, 0, 0, 454],
  is_long: true,
  is_short: false,
  is_phrase: false,
};

const book2 = {
  author: {
    id: 2,
    username: 'TEST_USER',
    profile_photo: '',
    nickname: 'TEST_USER',
  },
  book_isbn: 9788915092044,
  book_title: 'TEST_BOOK',
  book_thumbnail: '',
  id: 2,
  title: 'TEST_ARTICLE',
  content: 'TEST_ARTICLE',
  date: [0, 0, 0, 0, 454],
  is_long: true,
  is_short: false,
  is_phrase: false,
};

const stubInitialState = {
  selectedBook: book1,
  searchedBooks: [],
  count: 0,
};
const mockStore = getMockStore(stubInitialState);

const stubInitialState1 = {
  selectedBook: book1,
  searchedBooks: [book1, book2],
  count: 100,
};
const mockStore1 = getMockStore(stubInitialState1);

jest.mock('../BookResultSummary/BookResultSummary', () => {
  return jest.fn(props => {
    return (
      <div
        className="spyBookResultSummary"
        cover={props.cover}
        title={props.title}
        authors={props.authors}
        published={props.published}
        isbn={props.isbn}
        isbn={props.isbn}
        direct={props.direct}
        click={props.click}
      ></div>
    );
  });
});

describe('<ChooseBookModal />', () => {
  let modal, spySearchBooks, spyEmptySearchedBooks;
  beforeEach(() => {
    modal = (
      <Provider store={mockStore}>
        <ChooseBookModal />
      </Provider>
    );
    spySearchBooks = jest
      .spyOn(actionCreators, 'getSearchedBooks')
      .mockImplementation((keyword, page) => dispatch => {
        dispatch({
          type: actionTypes.GET_SEARCHED_BOOKS,
          books: [book1, book2],
          count: 200,
        });
      });
  });

  spyEmptySearchedBooks = jest
    .spyOn(actionCreators, 'emptySearchedBooks')
    .mockImplementation(() => {
      return dispatch => {};
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const component = mount(modal);
    const wrapper = component.find('.choose-book-modal-content');
    expect(wrapper.length).toBe(2);
  });

  it('should open modal, set state properly with user input, and close modal', () => {
    const input = 'TEST_INPUT';
    const component = mount(modal);

    const searchBar = component.find('#search-form').at(0);
    searchBar.simulate('change', { target: { value: input } });
    const modalInstance = component
      .find(ChooseBookModal.WrappedComponent)
      .instance();
    expect(modalInstance.state.keyword).toEqual(input);
    const closeButton = component.find('.close-select-book-button').at(0);
    closeButton.simulate('click');
  });

  it('should search with enter', () => {
    const component = mount(modal);
    const searchBar = component.find('#search-form').at(0);
    searchBar.simulate('keypress', { key: 'Spacebar' });
    searchBar.simulate('keypress', { key: 'Enter' });
    expect(spySearchBooks).toHaveBeenCalledTimes(1);
    expect(spyEmptySearchedBooks).toHaveBeenCalledTimes(1);
  });

  it('cannot have see more button', () => {
    const input = 'TEST_INPUT';
    const component = mount(modal);
    const searchBar = component.find('#search-form').at(0);
    searchBar.simulate('change', { target: { value: input } });
    const searchButton = component.find('.search-button').at(0);
    searchButton.simulate('click');
    const moreButton = component.find('.more-button').at(0);
    expect(moreButton.length).toBe(0);
  });
  it('with some searched books', () => {
    const modal1 = (
      <Provider store={mockStore1}>
        <ChooseBookModal />
      </Provider>
    );
    const component = mount(modal1);
    const wrapper = component.find('.choose-book-modal-content');
    expect(wrapper.length).toBe(2);
    const input = 'TEST_INPUT';
    const searchBar = component.find('#search-form').at(0);
    searchBar.simulate('change', { target: { value: input } });
    const searchButton = component.find('.search-button').at(0);
    searchButton.simulate('click');
    expect(spySearchBooks).toHaveBeenCalledTimes(1);

    const moreButton = component.find('.more-button').at(0);
    expect(moreButton.length).toBe(0);
    // moreButton.simulate('click');
    // expect(spySearchBooks).toHaveBeenCalledTimes(2);

    const modalInstance = component
      .find(ChooseBookModal.WrappedComponent)
      .instance();
    expect(modalInstance.state.keyword).toEqual(input);
    expect(modalInstance.state.search).toEqual(false);
    expect(modalInstance.state.requestNum).toEqual(1);
  });
});
