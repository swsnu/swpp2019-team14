import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateCuration from './CreateCuration';
import { getMockStore } from '../test-utils/mocks';
import { Provider } from 'react-redux';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import * as actionCreators from '../store/actions/actionCreators';
// import configureMockStore from 'redux-mock-store';

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
  selectedBooks: [
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
  bookInCuration: [
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
const book = {
  isbn: 1,
  title: 'TEST_BOOK',
  url: 'TEST_URL',
  thumbnail: 'TEST_THUMBNAIL',
  contents: 'TEST_CONTENTS',
  authors: 'TEST_AUTHORS',
  publisher: 'TEST_PUBLISHER',
  published_date: 'TEST_DATE',
  author_contents: 'TEST_AUTHOR_CONTENTS',
};

const mockStore = getMockStore(stubInitialState);

// const mockStore2 = configureMockStore();
// let store = mockStore2(stubInitialState);

describe('<CreateCuration />', () => {
  let createCuration, spyPostCuration;
  beforeEach(() => {
    createCuration = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <CreateCuration />
        </ConnectedRouter>
      </Provider>
    );
    spyPostCuration = jest
      .spyOn(actionCreators, 'postCuration')
      .mockImplementation((keyword, page) => {
        return dispatch => {};
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const component = mount(createCuration);
    const wrapper = component.find('.create-curation');
    expect(wrapper.length).toBe(1);
  });
  it('should not be able to create curation with empty input', () => {
    const component = mount(createCuration);
    const submitButton = component.find('#create-curation').at(0);
    submitButton.simulate('click');
    expect(spyPostCuration).toHaveBeenCalledTimes(0);
  });

  it('should not post long review with empty book', () => {
    const title = 'TITLE';
    const content = 'content';
    const component = mount(createCuration);
    // component.setState({ bookInCuration: book });
    const title_space = component.find('#curation-title').at(0);
    const content_space = component.find('#curation-content').at(0);
    title_space.simulate('change', { target: { value: title } });
    content_space.simulate('change', { target: { value: content } });
    const instance = component.find(CreateCuration.WrappedComponent).instance();
    expect(instance.state.title).toEqual(title);
    expect(instance.state.content).toEqual(content);
    const submitbutton = component.find('#create-curation').at(0);
    submitbutton.simulate('click');
    // expect(spyPostCuration).toHaveBeenCalledTimes(1);
  });

  it('no white space title', () => {
    const title = '   ';
    const content = 'content';
    const component = mount(createCuration);
    const title_space = component.find('#curation-title').at(0);
    const content_space = component.find('#curation-content').at(0);
    title_space.simulate('change', { target: { value: title } });
    content_space.simulate('change', { target: { value: content } });
    const instance = component.find(CreateCuration.WrappedComponent).instance();
    expect(instance.state.title).toEqual(title);
    expect(instance.state.content).toEqual(content);
    const submitbutton = component.find('#create-curation').at(0);
    submitbutton.simulate('click');
    expect(spyPostCuration).toHaveBeenCalledTimes(0);
  });
  it('no empty title', () => {
    const title = '';
    const content = 'content';
    const component = mount(createCuration);
    const title_space = component.find('#curation-title').at(0);
    const content_space = component.find('#curation-content').at(0);
    title_space.simulate('change', { target: { value: title } });
    content_space.simulate('change', { target: { value: content } });
    const instance = component.find(CreateCuration.WrappedComponent).instance();
    expect(instance.state.title).toEqual(title);
    expect(instance.state.content).toEqual(content);
    const submitbutton = component.find('#create-curation').at(0);
    submitbutton.simulate('click');
    expect(spyPostCuration).toHaveBeenCalledTimes(0);
  });
  it('no empty content', () => {
    const title = 'sadf';
    const content = '';
    const component = mount(createCuration);
    const title_space = component.find('#curation-title').at(0);
    const content_space = component.find('#curation-content').at(0);
    title_space.simulate('change', { target: { value: title } });
    content_space.simulate('change', { target: { value: content } });
    const instance = component.find(CreateCuration.WrappedComponent).instance();
    expect(instance.state.title).toEqual(title);
    expect(instance.state.content).toEqual(content);
    const submitbutton = component.find('#create-curation').at(0);
    submitbutton.simulate('click');
    expect(spyPostCuration).toHaveBeenCalledTimes(0);
  });
  it('no whitespace content', () => {
    const title = 'sadf';
    const content = '     ';
    const component = mount(createCuration);
    const title_space = component.find('#curation-title').at(0);
    const content_space = component.find('#curation-content').at(0);
    title_space.simulate('change', { target: { value: title } });
    content_space.simulate('change', { target: { value: content } });
    const instance = component.find(CreateCuration.WrappedComponent).instance();
    expect(instance.state.title).toEqual(title);
    expect(instance.state.content).toEqual(content);
    const submitbutton = component.find('#create-curation').at(0);
    submitbutton.simulate('click');
    expect(spyPostCuration).toHaveBeenCalledTimes(0);
  });
  it('no too long title', () => {
    const title =
      'dsafdsafsadfdsfsdafadsfadfafadfdafadsfadsfadfadsfsadf' +
      'dsafdsafsadfdsfsdafadsfadfafadfdafadsfadsfadfadsfsadf' +
      'dsafdsafsadfdsfsdafadsfadfafadfdafadsfadsfadfadsfsadf' +
      'dsafdsafsadfdsfsdafadsfadfafadfdafadsfadsfadfadsfsadf' +
      'dsafdsafsadfdsfsdafadsfadfafadfdafadsfadsfadfadsfsadf' +
      'dsafdsafsadfdsfsdafadsfadfafadfdafadsfadsfadfadsfsadf' +
      'dsafdsafsadfdsfsdafadsfadfafadfdafadsfadsfadfadsfsadf' +
      'dsafdsafsadfdsfsdafadsfadfafadfdafadsfadsfadfadsfsadf';
    const content = 'dsfsd';
    const component = mount(createCuration);
    const title_space = component.find('#curation-title').at(0);
    const content_space = component.find('#curation-content').at(0);
    title_space.simulate('change', { target: { value: title } });
    content_space.simulate('change', { target: { value: content } });
    const instance = component.find(CreateCuration.WrappedComponent).instance();
    expect(instance.state.title).toEqual(title);
    expect(instance.state.content).toEqual(content);
    const submitbutton = component.find('#create-curation').at(0);
    submitbutton.simulate('click');
    expect(spyPostCuration).toHaveBeenCalledTimes(0);
  });
});
