import React from 'react';
import { shallow, mount } from 'enzyme';
import CurationModal from './CurationModal';
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import * as actionCreators from '../../store/actions/actionCreators';

const stubInitialState = {
  selectedBook: {},
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

describe('<CurationModal />', () => {
  let modal, spySearchBooks, spyEmptySearchedBooks, spyGetSpecificBook;
  beforeEach(() => {
    modal = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <CurationModal update={() => {}} />
        </ConnectedRouter>
      </Provider>
    );
    spySearchBooks = jest
      .spyOn(actionCreators, 'getSearchedBooks')
      .mockImplementation((keyword, page) => {
        return dispatch => {};
      });
    spyGetSpecificBook = jest
      .spyOn(actionCreators, 'getSpecificBook')
      .mockImplementation(isbn => {
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
    const modalInstance = component
      .find(CurationModal.WrappedComponent)
      .instance();
    expect(modalInstance.state.open).toEqual(true);
    const closeButton = component.find('.close-select-book-button').at(2);
    closeButton.simulate('click');
    expect(modalInstance.state.open).toEqual(false);
  });

  it('should add selected book', () => {
    const component = mount(modal);
    component
      .find('.select-book-button')
      .at(0)
      .simulate('click');
    const button = component.find('.inside').at(0);
    button.simulate('click');
    component.setProps({
      store: getMockStore({
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
      }),
    });
    const modalInstance = component
      .find(CurationModal.WrappedComponent)
      .instance();
    // expect(modalInstance.state.selectedBooks).toEqual([
    //   {
    //     isbn: 1,
    //     title: 'TEST_BOOK',
    //     url: 'TEST_URL',
    //     thumbnail: 'TEST_THUMBNAIL',
    //     contents: 'TEST_CONTENTS',
    //     authors: 'TEST_AUTHORS',
    //     publisher: 'TEST_PUBLISHER',
    //     published_date: 'TEST_DATE',
    //     author_contents: 'TEST_AUTHOR_CONTENTS',
    //   },
    // ]);
    // component
    //   .find('#inside')
    //   .at(2)
    //   .simulate('click');
    // component.setProps({
    //   store: getMockStore({
    //     selectedBook: {
    //       isbn: 2,
    //       title: 'TEST_BOOK',
    //       url: 'TEST_URL',
    //       thumbnail: 'TEST_THUMBNAIL',
    //       contents: 'TEST_CONTENTS',
    //       authors: 'TEST_AUTHORS',
    //       publisher: 'TEST_PUBLISHER',
    //       published_date: 'TEST_DATE',
    //       author_contents: 'TEST_AUTHOR_CONTENTS',
    //     },
    //     searchedBooks: [],
    //   }),
    // });
    // expect(modalInstance.state.selectedBooks).toEqual([]);
  });
});
