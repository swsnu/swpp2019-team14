import React from 'react';
import { shallow, mount } from 'enzyme';
import LibraryChooseBookModal from './LibraryChooseBookModal';
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

const stubInitialState = {};

const mockStore = getMockStore(stubInitialState);

// jest.mock('../BookResultSummary/BookResultSummary', () => {
//   return jest.fn(props => {
//     return (
//       <div
//         className="spyBookResultSummary"
//         cover={props.cover}
//         title={props.title}
//         authors={props.authors}
//         published={props.published}
//         isbn={props.isbn}
//         isbn={props.isbn}
//         direct={props.direct}
//         click={props.click}
//       ></div>
//     );
//   });
// });

describe('<LibraryChooseBookModal />', () => {
  let modal, spySearchBooks, spyEmptySearchedBooks;

  beforeEach(() => {
    modal = (
      <Provider store={mockStore}>
        <LibraryChooseBookModal />
      </Provider>
    );
    spySearchBooks = jest
      .spyOn(actionCreators, 'getSearchedBooks')
      .mockImplementation((keyword, page) => {
        return dispatch => {};
      });
    spyEmptySearchedBooks = jest
      .spyOn(actionCreators, 'emptySearchedBooks')
      .mockImplementation(() => {
        return dispatch => {};
      });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const component = mount(modal);
    const wrapper = component.find('.library-choose-book-modal');
    expect(wrapper.length).toBe(1);
  });
});
