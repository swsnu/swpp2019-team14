import React from 'react';
import { shallow } from 'enzyme';
import CurationSummary from './CurationSummary';

describe('<CurationSummary />', () => {
  let modal;
  beforeEach(() => {
    const author = {};
    const books = [
      [
        {
          isbn: 1234567891011,
          title: 'TEST_TITLE',
          contents: 'TEST_CONTENTS',
          url: 'TEST_URL',
          thumbnail: 'TEST_THUMBNAIL',
        },
      ],
    ];
    modal = (
      <CurationSummary
        author={author}
        books={books}
        id="1"
        date={[0, 0, 0, 0, 0]}
        title="TEST_TITLE"
      />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const component = shallow(modal);
    const wrapper = component.find('.article');
    expect(wrapper.length).toBe(1);
  });
});
