import React from 'react';
import { shallow, mount } from 'enzyme';
import BookResultSummary from './BookResultSummary';
import * as actionCreators from '../../store/actions/actionCreators';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

const stubInitialState = {
  selectedBook: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<BookResultSummary />', () => {
  let bookresultsummary;
  beforeEach(() => {
    bookresultsummary = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <BookResultSummary
            title="TITLE"
            authors="AUTHOR"
            publishers="PUBLISHER"
            cover="/images/no_cover.jpg"
            direct={true}
            isbn="1"
          />
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render summary of a book', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(bookresultsummary);
    const wrapper = component.find('.outer');
    expect(wrapper.length).toBe(1);
    expect(component.find('.book_title').text()).toEqual('TITLE');
    expect(component.find('.book_summary').text()).toEqual('AUTHOR');
    component.find('.inside').simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/book/1');
  });

  it('should render summary of a book with no cover', () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <BookResultSummary
            title="TITLE"
            authors="AUTHOR"
            publishers="PUBLISHER"
            cover=""
          />
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find('.outer');
    expect(wrapper.length).toBe(1);
    expect(component.find('.book_title').text()).toEqual('TITLE');
    expect(component.find('.book_summary').text()).toEqual('AUTHOR');
  });

  it(`when called in create review`, () => {
    const spyGetSpecificBook = jest
      .spyOn(actionCreators, 'getSpecificBook')
      .mockImplementation(() => {
        return dispatch => {};
      });
    const click = jest.fn();

    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <BookResultSummary
            title="TITLE"
            authors="AUTHOR"
            publishers="PUBLISHER"
            cover=""
            direct={false}
            isbn="1"
            click={click}
          />
        </ConnectedRouter>
      </Provider>,
    );
    component.find('.inside').simulate('click');
    expect(spyGetSpecificBook).toHaveBeenCalledWith('1');
  });
});
