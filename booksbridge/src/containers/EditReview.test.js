import React from 'react';
import { shallow, mount } from 'enzyme';
import EditReview from './EditReview';
import { getMockStore } from '../test-utils/mocks';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store/store';
import { Provider } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

const longContent =
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT' +
  'CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT';
const b = {
  isbn: 9788915092044,
  title: 'TEST_BOOK',
  thumbnail: '',
  authors: '',
  publisher: '',
};

const article = {
  author: {
    id: 1,
    username: 'TEST_USER',
    profile_photo: '',
    nickname: 'TEST_USER',
  },
  book: b,
  id: 1,
  title: 'TEST_ARTICLE',
  content: longContent,
  date: [0, 0, 0, 1, 454],
  is_long: true,
  is_short: false,
  is_phrase: false,
  is_spoiler: false,
  like_or_not: true,
  like_count: 1,
};
const shortArticle = {
  author: {
    id: 1,
    username: 'TEST_USER',
    profile_photo: '',
    nickname: 'TEST_USER',
  },
  book: b,
  id: 1,
  title: 'TEST_ARTICLE',
  content: 'TEST_CONTENT',
  date: [0, 0, 0, 1, 454],
  is_long: false,
  is_short: true,
  is_phrase: false,
  is_spoiler: false,
  like_or_not: true,
  like_count: 1,
};
const phrase = {
  author: {
    id: 1,
    username: 'TEST_USER',
    profile_photo: '',
    nickname: 'TEST_USER',
  },
  book: b,
  id: 1,
  title: 'TEST_ARTICLE',
  content: 'TEST_CONTENT',
  date: [0, 0, 0, 1, 454],
  is_long: false,
  is_short: false,
  is_phrase: true,
  is_spoiler: false,
  like_or_not: true,
  like_count: 1,
};
const book = {
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
  content: longContent,
  date: [0, 0, 0, 0, 454],
  is_long: true,
  is_short: false,
  is_phrase: false,
};

const stubInitialState = {
  selectedBook: book,
  searchedBooks: [],
  selectedArticle: article,
};
const mockStore = getMockStore(stubInitialState);

const stubInitialState2 = {
  selectedArticle: null,
  selectedBook: null,
  searchedBooks: [],
};
const mockStore2 = getMockStore(stubInitialState2);

const stubInitialState3 = {
  selectedBook: book,
  searchedBooks: [],
  selectedArticle: shortArticle,
};
const mockStore3 = getMockStore(stubInitialState3);

const stubInitialState4 = {
  selectedBook: book,
  searchedBooks: [],
  selectedArticle: phrase,
};
const mockStore4 = getMockStore(stubInitialState4);

describe('<EditReview />', () => {
  let editReview, spyEditArticle, spyAlert;
  beforeEach(() => {
    editReview = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <EditReview />
        </ConnectedRouter>
      </Provider>
    );
    spyEditArticle = jest
      .spyOn(actionCreators, 'editSpecificArticle')
      .mockImplementation(review => {
        return dispatch => {};
      });
    spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const component = mount(editReview);
    const wrapper = component.find('.EditReview');
    expect(wrapper.length).toBe(1);
  });
  it('should not render', () => {
    const editReview2 = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <EditReview />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(editReview2);
    const w1 = component.find('.EditReview').at(0);
    const w2 = component.find('#edit-review-spinner').at(0);
    expect(w1.length).toBe(0);
    expect(w2.length).toBe(1);
  });
  it('should not be able to edit review with empty content input', () => {
    const component = mount(editReview);
    const content = '';
    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const submitButton = component.find('.SubmitButton').at(0);
    submitButton.simulate('click');
    expect(spyEditArticle).toHaveBeenCalledTimes(0);
    expect(spyAlert).toHaveBeenCalledTimes(0); //
  });
  it('should edit review', () => {
    const title = 'EDITTITLE';
    const content = longContent;
    const component = mount(editReview);
    const title_space = component.find('#review-title').at(0);
    const content_space = component.find('#review-content').at(0);
    title_space.simulate('change', { target: { value: title } });
    content_space.simulate('change', { target: { value: content } });
    const instance = component.find(EditReview.WrappedComponent).instance();
    // expect(instance.state.title).toEqual(title);
    expect(instance.state.content).toEqual(content);
    const submitbutton = component.find('#edit-review').at(0);
    submitbutton.simulate('click');
    component
      .find('Button[content="수정"]')
      .at(0)
      .simulate('click');
    expect(spyEditArticle).toHaveBeenCalledTimes(1);
  });
  it('should not edit review with short input', () => {
    const title = 'EDITTITLE';
    const content = 'sdfsfsdf';
    const component = mount(editReview);
    const title_space = component.find('#review-title').at(0);
    const content_space = component.find('#review-content').at(0);
    title_space.simulate('change', { target: { value: title } });
    content_space.simulate('change', { target: { value: content } });
    const instance = component.find(EditReview.WrappedComponent).instance();
    expect(instance.state.content).toEqual(content);
    const submitbutton = component.find('#edit-review').at(0);
    submitbutton.simulate('click');
    const edit = component.find('Button[content="수정"]').at(0);
    expect(edit.length).toBe(0);
    expect(spyEditArticle).toHaveBeenCalledTimes(0);
    expect(spyAlert).toHaveBeenCalledTimes(1); //
  });
  it('should not edit short review with empty input', () => {
    const editReview3 = (
      <Provider store={mockStore3}>
        <ConnectedRouter history={history}>
          <EditReview />
        </ConnectedRouter>
      </Provider>
    );
    const content = '';
    const component = mount(editReview3);
    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const instance = component.find(EditReview.WrappedComponent).instance();
    // expect(instance.state.content).toEqual(content);
    const submitbutton = component.find('#edit-review').at(0);
    submitbutton.simulate('click');
    const edit = component.find('Button[content="수정"]').at(0);
    expect(edit.length).toBe(1); //
    expect(spyEditArticle).toHaveBeenCalledTimes(0);
    expect(spyAlert).toHaveBeenCalledTimes(0); //
  });

  it('should not edit short review with long content', () => {
    const editReview3 = (
      <Provider store={mockStore3}>
        <ConnectedRouter history={history}>
          <EditReview />
        </ConnectedRouter>
      </Provider>
    );
    const content = longContent;
    const component = mount(editReview3);
    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const submitbutton = component.find('#edit-review').at(0);
    submitbutton.simulate('click');
    const instance = component.find(EditReview.WrappedComponent).instance();
    // expect(instance.state.content).toEqual(content);
    const edit = component.find('Button[content="수정"]').at(0);
    expect(edit.length).toBe(1); //
    edit.simulate('click');
    expect(spyEditArticle).toHaveBeenCalledTimes(1);
    expect(spyAlert).toHaveBeenCalledTimes(0); //
  });
  it('should not edit phrase review with empty content', () => {
    const editReview4 = (
      <Provider store={mockStore4}>
        <ConnectedRouter history={history}>
          <EditReview />
        </ConnectedRouter>
      </Provider>
    );
    const content = '';
    const component = mount(editReview4);
    const content_space = component.find('#review-content').at(0);
    content_space.simulate('change', { target: { value: content } });
    const submitbutton = component.find('#edit-review').at(0);
    submitbutton.simulate('click');
    const instance = component.find(EditReview.WrappedComponent).instance();
    // expect(instance.state.content).toEqual(content);
    const edit = component.find('Button[content="수정"]').at(0);
    expect(edit.length).toBe(1); //
    edit.simulate('click');
    expect(spyEditArticle).toHaveBeenCalledTimes(1);
    expect(spyAlert).toHaveBeenCalledTimes(0); //
  });
});
