import React from 'react';
import { mount } from 'enzyme';
import BookTabs from './BookTabs';

describe('<BookTabs />', () => {
  it('should render without errors', () => {
    const component = mount(
      <BookTabs
        contents="CONTENTS"
        author_contents="AUTHOR CONTENTS"
        shortReviews={[]}
        longReviews={[]}
        phrases={[]}
      />,
    );
    const wrapper = component.find('.DetailTabStyle');
    expect(wrapper.length).toBe(1);
    component.find('MenuItem[content="Short Review"]').simulate('click');
    component.find('MenuItem[content="Long Review"]').simulate('click');
    component.find('MenuItem[content="Phrase"]').simulate('click');
  });
});
