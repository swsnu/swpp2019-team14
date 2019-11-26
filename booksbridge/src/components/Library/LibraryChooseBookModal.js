import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/actionCreators';
import ChooseBookModal from '../ChooseBookModal/ChooseBookModal';

import './LibraryChooseBookModal.css';

const mapDispatchToProps = dispatch => {
  return {
    onEmptySearchedBooks: () => dispatch(actionCreators.emptySearchedBooks()),
  };
};

class LibraryChooseBookModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  openHandler = () => {
    this.setState({ open: true });
    this.props.onEmptySearchedBooks();
  };

  render() {
    return (
      <div>
        <Button className="selectBookButton" onClick={this.openHandler}>
          책 고르기
        </Button>

        <Modal className="choose-book-modal" open={this.state.open}>
          <ChooseBookModal
            selected={() => {
              this.setState({ open: false });
            }}
            close={() => {
              this.setState({ open: false });
            }}
          />
        </Modal>
      </div>
    );
  }
}
export default connect(
  null,
  mapDispatchToProps,
)(LibraryChooseBookModal);
