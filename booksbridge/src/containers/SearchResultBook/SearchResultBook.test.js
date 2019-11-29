import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchResultBook from './SearchResultBook';
import * as actionCreators from '../../store/actions/actionCreators';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

const stubInitialState = {
  books: [
    {
      isbn: '1',
      title: 'BOOK TITLE',
      contents: 'BOOK CONTENTS',
      url: 'BOOK_URL',
      thumbnail: 'BOOK_THUMBNAIL',
      authors: 'BOOK AUTHORS',
      publisher: 'BOOK PUBLISHER',
      published_data: '2000-01-01',
    },
  ],
  users: [
    {
      id: '1',
      username: 'USERNAME',
      profile_photo: 'PROFILE_PHOTO',
      profile_text: 'PROFILE TEXT',
      nickname: 'NICKNAME',
    },
  ],
  curations: [],
};

const mockStore = getMockStore(stubInitialState);

describe('<SearchResultBook />', () => {
  let searchresultbook, spyGetBooks, spyGetUsers, spyGetCurations, spyScroll;
  beforeEach(() => {
    searchresultbook = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <SearchResultBook />
        </ConnectedRouter>
      </Provider>
    );
    spyGetBooks = jest
      .spyOn(actionCreators, 'getSearchedBooks')
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyGetUsers = jest
      .spyOn(actionCreators, 'getSearchedUsers')
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyGetCurations = jest
      .spyOn(actionCreators, 'getSearchedCurations')
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyScroll = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  it('should render search result page without errors', () => {
    const component = mount(searchresultbook);
    const wrapper = component.find('.SearchResultBook');
    expect(wrapper.length).toBe(1);
    expect(spyGetBooks).toBeCalledTimes(1);
    expect(spyGetUsers).toBeCalledTimes(1);
  });

  it('correct pagination', () => {
    const component = mount(searchresultbook);
    const wrapper = component.find('.SearchResultBook');
    wrapper
      .find('PaginationItem')
      .at(2)
      .simulate('click');
  });

  it('move tabs', () => {
    const component = mount(searchresultbook);
    const wrapper = component.find('.SearchResultBook');
    wrapper.find('MenuItem[content="Users"]').simulate('click');
    wrapper.find('MenuItem[content="Curations"]').simulate('click');
  });
});
