import React from 'react';
import { shallow, mount } from 'enzyme';
import CurationModal from './CurationModal';
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

const stubInitialState = {
  selectedBook: {
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
  },
};

const mockStore = getMockStore(stubInitialState);

describe('<CurationModal />', () => {
  let modal, spySearchBooks, spyEmptySearchedBooks;
  beforeEach(() => {
    modal = (
      <Provider store={mockStore}>
        <CurationModal update={() => {}} />
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
    const wrapper = component.find('.curation-modal-all');
    expect(wrapper.length).toBe(1);
  });
  it('should open modal, set state properly with user input, and close modal', () => {
    const component = mount(modal);

    const button = component.find('.select-book-button').at(0);
    button.simulate('click');
    const wrapper = component.find('#curation-modal');
    expect(wrapper.length).toBe(2);
    const modalInstance = component
      .find(CurationModal.WrappedComponent)
      .instance();
    expect(modalInstance.state.open).toEqual(true);

    const closeButton = component.find('.close-select-book-button').at(0);
    closeButton.simulate('click');
    expect(modalInstance.state.open).toEqual(false);
  });
  it('should rendering another tab', () => {
    const component = mount(modal);
    const button = component.find('.select-book-button').at(0);
    button.simulate('click');
    component
      .find('#left-tabs-example-tab-second')
      .at(0)
      .simulate('click');
    const wrapper = component.find('#left-tabs-example-tabpane-second');
    expect(wrapper.length).toBe(1);
  });
  // it('should add selected book', () => {
  //   const component = mount(modal);
  //   const button = component.find('.select-book-button').at(0);
  //   button.simulate('click');
  //   component
  //     .find('#left-tabs-example-tab-second')
  //     .at(0)
  //     .simulate('click');
  //   const wrapper = component.find('#left-tabs-example-tabpane-second');
  //   expect(wrapper.length).toBe(1);
  // });
});
