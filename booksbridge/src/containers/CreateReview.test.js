import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateReview from './CreateReview';
import { getMockStore } from '../test-utils/mocks';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store/store';
import { Provider } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
// import { render, fireEvent } from '@testing-library/react';

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

// const stubInitialState2 = {
//   selectedBook: {
//     author: {
//       id: 1,
//       username: 'TEST_USER',
//       profile_photo: '',
//       nickname: 'TEST_USER',
//     },
//     book_isbn: 9788915092044,
//     book_title: 'TEST_BOOK',
//     book_thumbnail: '',
//     id: 1,
//     title: 'TEST_ARTICLE',
//     content: 'TEST_ARTICLE',
//     date: [0, 0, 0, 0, 454],
//     is_long: false,
//     is_short: true,
//     is_phrase: false,
//   },
//   searchedBooks: [],
// };
// const mockStore2 = getMockStore(stubInitialState2);

// const stubInitialState3 = {
//   selectedBook: {
//     author: {
//       id: 1,
//       username: 'TEST_USER',
//       profile_photo: '',
//       nickname: 'TEST_USER',
//     },
//     book_isbn: 9788915092044,
//     book_title: 'TEST_BOOK',
//     book_thumbnail: '',
//     id: 1,
//     title: 'TEST_ARTICLE',
//     content: 'TEST_ARTICLE',
//     date: [0, 0, 0, 0, 454],
//     is_long: false,
//     is_short: false,
//     is_phrase: true,
//   },
//   searchedBooks: [],
// };
// const mockStore3 = getMockStore(stubInitialState3);

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
    const content =
      'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT';
    const component = mount(createReview);
    const title_space = component.find('#review-title').at(0);
    const content_space = component.find('#review-content').at(0);
    title_space.simulate('change', { target: { value: title } });
    content_space.simulate('change', { target: { value: content } });
    const submitbutton = component.find('.SubmitButton').at(0);
    submitbutton.simulate('click');
    //console.log(component.debug());
    const instance = component.find(CreateReview.WrappedComponent).instance();
    expect(instance.state.title).toEqual(title);
    expect(instance.state.content).toEqual(content);
    component
      .find('Button[content="작성"]')
      .at(0)
      .simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(1);
  });
  it('should post short review', () => {
    const content = 'content';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(1); // short review
    radio.simulate('change', { target: { value: 'short-review' } });
    const instance = component.find(CreateReview.WrappedComponent).instance();
    expect(instance.state.type).toEqual('short-review');
    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    component
      .find('Button[content="작성"]')
      .at(0)
      .simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(1);
  });
  it('should post phrase review', () => {
    const content = 'CONTENT';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(2); // phrase
    radio.simulate('change', { target: { value: 'phrase' } });
    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    component
      .find('Button[content="작성"]')
      .at(0)
      .simulate('click');
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
    const radio = component.find({ type: 'radio' }).at(0);
    radio.simulate('change', { target: { value: 'long-review' } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
  it('should not create long review with whitespace title', () => {
    const title = '     ';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(0);
    radio.simulate('change', { target: { value: 'long-review' } });

    const title_space = component.find('#review-title').at(0);
    title_space.simulate('change', { target: { value: title } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
  it('should not create long review with too long title', () => {
    const title =
      'sakjfsdkfjsfkjsadlkfjsadklfjsdlfksjafklsjflsjfklasjfklsjdkfjsdalfjsdkfjslfdjsaklfsjdlfkajsdlkadjfkadslffjdskfdsf' +
      'sakjfsdkfjsfkjsadlkfjsadklfjsdlfksjafklsjflsjfklasjfklsjdkfjsdalfjsdkfjslfdjsaklfsjdlfkajsdlkadjfkadslffjdskfdsf';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(0);
    radio.simulate('change', { target: { value: 'long-review' } });

    const title_space = component.find('#review-title').at(0);
    title_space.simulate('change', { target: { value: title } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
  it('should not create long review with too short content', () => {
    const content = 'jfkadslffjdskfdsf';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(0);
    radio.simulate('change', { target: { value: 'long-review' } });
    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });

    const instance = component.find(CreateReview.WrappedComponent).instance();
    expect(instance.state.content).toEqual(content);
    expect(instance.state.type).toEqual('long-review');

    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
  it('should not create long review with empty content', () => {
    const content = '';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(0);
    radio.simulate('change', { target: { value: 'long-review' } });

    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });

    const instance = component.find(CreateReview.WrappedComponent).instance();
    expect(instance.state.content).toEqual(content);
    expect(instance.state.type).toEqual('long-review');

    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
  it('should not create long review with whitespace content', () => {
    const content = '       ';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(0);
    radio.simulate('change', { target: { value: 'long-review' } });

    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
  it('should not create short review with empty content', () => {
    const content = '';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(1);
    radio.simulate('change', { target: { value: 'short-review' } });
    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
  it('should not create short review with whitespace content', () => {
    const content = '   ';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(1);
    radio.simulate('change', { target: { value: 'short-review' } });
    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
  it('should not create short review with too long content', () => {
    const content =
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs' +
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs' +
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs' +
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs' +
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs' +
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs' +
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs' +
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs' +
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs' +
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs' +
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs' +
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs' +
      'asdfadsfdsfsdafsdafsdafasdfadsfdafadfsadfdsafadsfasdfasdfdafs';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(1);
    radio.simulate('change', { target: { value: 'short-review' } });
    const instance = component.find(CreateReview.WrappedComponent).instance();
    expect(instance.state.type).toEqual('short-review');
    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
  it('should not create phrase with whitespace content', () => {
    const content = '   ';
    const component = mount(createReview);
    const radio = component.find({ type: 'radio' }).at(0);
    radio.simulate('change', { target: { value: 'phrase' } });
    const instance = component.find(CreateReview.WrappedComponent).instance();
    expect(instance.state.type).toEqual('phrase');

    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(0);
  });
});
