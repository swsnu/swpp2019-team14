import React, { Component } from 'react'
import { Button, Modal, Input } from 'semantic-ui-react'

class ChooseBookModal extends Component {

  render () {
    return (
      <Modal trigger={<Button>책 고르기</Button>}>
        <Modal.Content>
          <Input placeholder='search...'/>
          <Button>Search</Button>
          <Button>Choose</Button> 
        </Modal.Content>
      </Modal>
    )
  }
}
export default ChooseBookModal;