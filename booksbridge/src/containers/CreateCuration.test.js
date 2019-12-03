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

  it('should post long review', () => {
    const title = 'TITLE';
    const content = 'CONTENT';
    const component = mount(createCuration);
    const title_space = component.find('#curation-title').at(0);
    const content_space = component.find('#curation-content').at(0);
    title_space.simulate('change', { target: { value: title } });
    content_space.simulate('change', { target: { value: content } });
    const submitbutton = component.find('#create-curation').at(0);
    submitbutton.simulate('click');
    expect(spyPostCuration).toHaveBeenCalledTimes(1);
    const instance = component.find(CreateCuration.WrappedComponent).instance();
    expect(instance.state.title).toEqual(title);
    expect(instance.state.content).toEqual(content);
  });

  // it('should post short review', () => {
  //   const content = 'content';
  //   const component = mount(createReview);
  //   const radio = component.find({ type: 'radio' }).at(1); // short review
  //   radio.simulate('change', { target: { checked: true } });
  //   const content_space = component.find('#review-content').at(0);
  //   content_space.simulate('change', { target: { value: content } });
  //   const submitButton = component.find('.SubmitButton').at(0);
  //   submitButton.simulate('click');
  //   expect(spyPostArticle).toHaveBeenCalledTimes(1);
  // });
  // it('should post phrase review', () => {
  //   const content = 'CONTENT';
  //   const component = mount(createReview);
  //   const radio = component.find({ type: 'radio' }).at(2); // phrase
  //   radio.simulate('change', { target: { checked: true } });
  //   const content_space = component.find('#review-content').at(0);
  //   content_space.simulate('change', { target: { value: content } });
  //   const submitButton = component.find('.SubmitButton').at(0);
  //   submitButton.simulate('click');
  //   expect(spyPostArticle).toHaveBeenCalledTimes(1);
  // });
  // it('should not create review with no selected book', () => {
  //   const createReview = (
  //     <Provider store={getMockStore({ selectedBook: null, searchedBooks: [] })}>
  //       <ConnectedRouter history={history}>
  //         <CreateReview />
  //       </ConnectedRouter>
  //     </Provider>
  //   );
  //   const component = mount(createReview);
  //   const submitButton = component.find('.SubmitButton').at(0);
  //   submitButton.simulate('click');
  //   expect(spyPostArticle).toHaveBeenCalledTimes(0);
  // });
});
