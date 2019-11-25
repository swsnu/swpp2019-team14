import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateReview from './CreateReview';
import { getMockStore } from '../test-utils/mocks';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store/store';
import { Provider } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

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
  searchedBooks: [],
};

const mockStore = getMockStore(stubInitialState);

describe('<CreateReview/>', () => {
  let createReview, spyPostArticle;
  beforeEach(() => {
    createReview = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <CreateReview />
        </ConnectedRouter>
      </Provider>
    );
    spyPostArticle = jest
      .spyOn(actionCreators, 'postArticle')
      .mockImplementation(review => {
        return dispatch => {};
      });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render', () => {
    const component = mount(createReview);
    const wrapper = component.find('.CreateReview');
    expect(wrapper.length).toBe(1);
  });
  it('should not be able to create long review with empty input', () => {
    const component = mount(createReview);
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
  it('should not be able to create short review with empty input', () => {
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(1); // short review
    radio.simulate('change', { target: { checked: true } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
  it('should post long review', () => {
    const title = 'TITLE';
    const content = 'CONTENT';
    const component = mount(createReview);
    const title_space = component.find('#review-title').at(0);
    const content_space = component.find('#review-content').at(0);
    title_space.simulate('change', { target: { value: title } });
    content_space.simulate('change', { target: { value: content } });
    const submitbutton = component.find('.SubmitButton').at(0);
    submitbutton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
    const instance = component.find(CreateReview.WrappedComponent).instance();
    expect(instance.state.title).toEqual(title);
    expect(instance.state.content).toEqual(content);
  });
  it('should post short review', () => {
    const content = 'content';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(1); // short review
    radio.simulate('change', { target: { checked: true } });
    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(1);
  });
  it('should post phrase review', () => {
    const content = 'CONTENT';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(2); // phrase
    radio.simulate('change', { target: { checked: true } });
    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(1);
  });
  it('should not create review with no selected book', () => {
    const createReview = (
      <Provider store={getMockStore({ selectedBook: null, searchedBooks: [] })}>
        <ConnectedRouter history={history}>
          <CreateReview />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(createReview);
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
});
