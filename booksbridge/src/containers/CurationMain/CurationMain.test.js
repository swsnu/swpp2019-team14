import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import CurationMain from './CurationMain';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/actionCreators';

const stubInitialState = {
  curations: [
    {
      author: {
        id: 1,
        username: 'TEST_USER',
        profile_photo: '',
        nickname: 'TEST_USER',
      },
      book: [
        [
          {
            isbn: 1234567891011,
            title: 'TEST_TITLE',
            contents: 'TEST_CONTENTS',
            url: 'TEST_URL',
            thumbnail: 'TEST_THUMBNAIL',
          },
        ],
      ],
      id: 1,
      title: 'TEST_ARTICLE',
      content: 'TEST_ARTICLE',
      date: [0, 0, 0, 1, 454],
    },
  ],
  hasNext: true,
};

const mockStore = getMockStore(stubInitialState);

describe('<CurationMain />', () => {
  let main;
  beforeEach(() => {
    main = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <CurationMain />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Curation', () => {
    const component = mount(main);
    const wrapper = component.find('.main');
    expect(wrapper.length).toBe(1);
  });
});
