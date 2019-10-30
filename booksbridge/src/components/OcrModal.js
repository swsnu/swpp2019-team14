import React, { Component } from 'react'
import { Button, Modal, TextArea } from 'semantic-ui-react'

class OcrModal extends Component {

  render () {
    return (
      <Modal trigger={<Button>페이지 가져오기</Button>}>
        <Modal.Content>
          <Button id="upload">사진 업로드</Button>
          <Button id="run-ocr">내용 추출하기</Button> 
          <TextArea 
            id="ocr-text" 
            style={{ minHeight: 500, minWidth: 1000 }} 
          />
          <Button id="close-ocr-feature">닫기</Button>
        </Modal.Content>
      </Modal>
    )
  }
}
export default OcrModal;
                 