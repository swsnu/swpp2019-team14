import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Input } from 'semantic-ui-react'

const mapStateToProps = state => {
  return {
    selectedBook: state.book.selectedBook,
  };
}

class ChooseBookModal extends Component {

  chooseHandler = () => {
    if (this.props.selectedBook) {
      this.props.onDone();
    }
     
  }

  render () {
    return (
      <Modal trigger={<Button>책 고르기</Button>}>
        <Modal.Content>
          <Input placeholder='search...'/>
          <Button>찾기</Button>
          <Button onClick={this.chooseHandler}>확인</Button> 
        </Modal.Content>
      </Modal>
    )
  }
}
export default connect(mapStateToProps, null)(ChooseBookModal);