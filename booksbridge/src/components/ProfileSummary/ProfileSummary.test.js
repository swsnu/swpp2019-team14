import React from 'react';
import { mount } from 'enzyme';
import ProfileSummary from './ProfileSummary';
import { history } from '../../store/store';
import { Router } from 'react-router-dom';

describe('<ProfileSummary />', () => {
  it('should render without errors', () => {
    const user = {
      profile_photo: 'resources/image/profile/ybzzang',
      nickname: 'ybzzang',
    };
    const component = mount(
      <Router history={history}>
        <ProfileSummary user={user} />
      </Router>,
    );
    const wrapper = component.find('.ProfileSummary');
    expect(wrapper.length).toBe(1);
  });
});
