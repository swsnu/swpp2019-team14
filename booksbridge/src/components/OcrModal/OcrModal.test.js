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

jest.mock('./CopyToClipboard', () => {
  return jest.fn(props => {
    return (
      <div id="copy-to-clipboard">
        {props.text}
        <button id="copy" onClick={props.clickCopy} />
      </div>
    );
  });
});

describe('<OcrModal />', () => {
  let modal, spyRunOcr;
  beforeEach(() => {
    modal = (
      <Provider store={mockStore}>
        <OcrModal />
      </Provider>
    );
    spyRunOcr = jest
      .spyOn(actionCreators, 'runOcr')
      .mockImplementation(formData => {
        return dispatch => {};
      });
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
    expect(modalInstance.state.file).toEqual(null);
  });

  it('should close modal when copy to clipboard', () => {
    const component = mount(modal);
    const openButton = component.find('#open-ocr').at(0);
    openButton.simulate('click');
    const copyButton = component.find('#copy').at(0);
    copyButton.simulate('click');
    const modalInstance = component.find(OcrModal.WrappedComponent).instance();
    expect(modalInstance.state.open).toEqual(true);
  });
  it('should run ocr', () => {
    const component = mount(modal);
    const openButton = component.find('#open-ocr').at(0);
    openButton.simulate('click');
    const runButton = component.find('#run-ocr').at(1);
    runButton.simulate('click');

    expect(spyRunOcr).toHaveBeenCalledTimes(1);
  });
  xit('should upload file with ref', () => {
    // not this
    const component = mount(modal);
    const wrapper = component.find('.ocr-modal');
    expect(wrapper.length).toBe(1);
  });
});
