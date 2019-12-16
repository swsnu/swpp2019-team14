import React from 'react';
import { shallow, mount } from 'enzyme';
import Alarm from './Alarm';

const alarm1 = {
  link: 'link',
  id: 1,
  author_username: 'name',
  profile_photo: 'photo',
  content: 'content',
  is_new: true,
};

const alarm2 = {
  link: 'link',
  id: 1,
  author_username: 'name',
  profile_photo: 'http/photo',
  content: 'content',
  is_new: false,
};
describe('<Alarm />', () => {
  let new_alarm, old_alarm, spyToggle;

  beforeEach(() => {
    spyToggle = jest.fn();
    new_alarm = <Alarm alarm={alarm1} onClickAlarm={spyToggle} />;
    old_alarm = <Alarm alarm={alarm2} onClickAlarm={spyToggle} />;
  });
  it('should render new alarm', () => {
    const component = shallow(new_alarm);
    const wrapper = component.find('.new-alarm');
    expect(wrapper.length).toBe(1);
  });
  it('should render old alarm', () => {
    const component = shallow(old_alarm);
    const wrapper = component.find('.old-alarm');
    expect(wrapper.length).toBe(1);
  });
  it('should click alarm', () => {
    const component = shallow(old_alarm);
    const wrapper = component.find('#click-alarm');
    wrapper.simulate('click');
    expect(spyToggle).toHaveBeenCalledTimes(1);
  });
});
