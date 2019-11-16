import React from 'react';
import { shallow, mount } from 'enzyme';
import OcrModal from './OcrModal';
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import Copy from './CopyToClipboard';

const stubInitialState = {};

const mockStore = getMockStore(stubInitialState);

describe('<Copy />', () => {
  let copy;
  beforeEach(() => {
    copy = (
      <Provider store={mockStore}>
        <Copy text="" clickCopy={() => console.log('')} />
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const component = mount(copy);
    const wrapper = component.find('#copy-to-clipboard');
    expect(wrapper.length).toBe(1);
  });
});
