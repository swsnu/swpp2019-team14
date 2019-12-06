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
          content="정말 이 라이브러리를 지우시겠어요?"
          cancelButton="아..아니요..."
          confirmButton="가즈아!!!"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          className="Confirmation"
        />
      </div>
    );
  }
}

export default ConfirmDelete;
