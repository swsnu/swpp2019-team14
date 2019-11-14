import React from 'react';
import { shallow, mount } from 'enzyme';
import OcrModal from './OcrModal';
import { getMockStore } from '../../test-utils/mocks';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { history } from '../../store/store';
import { Provider } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

const stubInitialState = {};

const mockStore = getMockStore(stubInitialState);

describe('<ChooseBookModal />', () => {
  let modal;
  beforeEach(() => {
    modal = (
      <Provider store={mockStore}>
        <OcrModal />
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render', () => {
    const component = mount(modal);
    const wrapper = component.find('.ocr-modal');
    expect(wrapper.length).toBe(1);
  });
  it('should open and close modal', () => {
    // I don't know, but components from Bootstrap or React-Semantic-UI has 2 components inside
    const component = mount(modal);
    const openButton = component.find('#open-ocr').at(0);
    openButton.simulate('click');
    const visibleModal = component.find('.modal');
    expect(visibleModal.length).toBe(1);
    const modalInstance = component.find(OcrModal.WrappedComponent).instance();
    expect(modalInstance.state.open).toEqual(true);

    const closeButton = component.find('#close-ocr').at(0);
    closeButton.simulate('click');
    expect(modalInstance.state.open).toEqual(false);
  });
  it('should click clear modal', () => {
    const component = mount(modal);
    const openButton = component.find('#open-ocr').at(0);
    openButton.simulate('click');
    const clearButton = component.find('#clear').at(0);
    clearButton.simulate('click');

    const modalInstance = component.find(OcrModal.WrappedComponent).instance();
    expect(modalInstance.state.files).toEqual([]);
    expect(modalInstance.state.content).toEqual('');
  });
  // should test promise regarding uploading file
  // should test run ocr
});
