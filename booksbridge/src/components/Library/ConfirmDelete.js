import React, { Component } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import './ConfirmDelete.css';

class ConfirmDelete extends Component {
  state = { open: false };

  show = () => this.setState({ open: true });
  handleConfirm = () => {
    this.props.onConfirm();
    this.setState({ open: false });
  };
  handleCancel = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Button size="mini" icon color="red" onClick={this.show}>
          <Icon name="times" size="small" />
        </Button>
        <Confirm
          open={this.state.open}
          content="이 라이브러리를 삭제할까요?"
          cancelButton="취소"
          confirmButton="삭제"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          className="Confirmation"
        />
      </div>
    );
  }
}

export default ConfirmDelete;
