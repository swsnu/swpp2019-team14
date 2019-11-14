import React from 'react';
import { shallow } from 'enzyme';
import ProfileSummary from './ProfileSummary';

describe('<ProfileSummary />', () => {
  it('should render without errors', () => {
    const user = {
      profile_photo: 'resources/image/profile/ybzzang',
      nickname: 'ybzzang',
    };
    const component = shallow(<ProfileSummary user={user} />);
    const wrapper = component.find('.ProfileSummary');
    expect(wrapper.length).toBe(1);
  });
});
