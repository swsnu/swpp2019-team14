import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Popup, Button, Modal, TextArea } from 'semantic-ui-react';
import Spinner from 'react-bootstrap/Spinner';
import './OcrModal.css';
import * as actionCreators from '../../store/actions/actionCreators';
import * as actionTypes from '../../store/actions/actionTypes';
import Copy from './CopyToClipboard';

const mapStateToProps = state => {
  return {
    quote: state.book.quote,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRunOcr: formData => dispatch(actionCreators.runOcr(formData)),
    onClearQuote: () => dispatch({ type: actionTypes.CLEAR_QUOTE }),
  };
};

class OcrModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      open: false,
      imageShow: true,
      image: null,
      run: false,
    };

    this.fileInputRef = React.createRef();
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.runOcrOnFiles = this.runOcrOnFiles.bind(this);
  }

  onFilesAdded(event) {
    this.props.onClearQuote();

    const { files } = event.target;

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    this.setState({
      ...this.state,
      file: files[0],
      imageShow: true,
    });
  }

  runOcrOnFiles() {
    const formData = new FormData();
    formData.append('image', this.state.file);

    this.setState({ ...this.state, run: true });
    this.props.onRunOcr(formData);
  }

  openHandler = () => {
    this.props.onClearQuote();
    this.setState({
      ...this.state,
      file: null,
      open: true,
      imageShow: false,
      image: null,
      run: false,
    });
  };

  clearEverything = () => {
    this.props.onClearQuote();
    this.setState({
      ...this.state,
      file: null,
      open: true,
      imageShow: false,
      image: null,
      run: false,
    });
  };

  render() {
    //console.log('[DEBUG]: ', this.state.file, this.state.run, this.props.quote);
    const image = this.state.imageShow && (
      <img id="target" src={this.state.image} width={300} height={300} />
    );

    const loading =
      this.state.file && this.state.run && !this.props.quote ? (
        <Spinner animation="border" id="ocr-spinner" />
      ) : null;

    return (
      <div className="ocr-modal">
        <Popup
          wide={500}
          position={'top center'}
          content="사진 안의 문자를 추출합니다. 책 안에 인용하고 싶은 문장이 있을 경우, 직접 타이핑하지 말고 이 기능을 활용해 보세요."
          trigger={
            <Button onClick={() => this.openHandler()} id="open-ocr">
              텍스트 추출하기
            </Button>
          }
        />

        <Modal id="ocr-modal" open={this.state.open}>
          <Modal.Content>
            <div
              id="choose-file"
              onClick={() => this.setState({ ...this.state, run: false })}
            >
              <input
                ref={this.fileInputRef}
                className="FileInput"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={this.onFilesAdded}
              />
            </div>
            {image}
            {loading}

            <div className="ocr-buttons">
              <Button id="run-ocr" onClick={this.runOcrOnFiles}>
                텍스트 추출하기
              </Button>

              <Copy
                text={this.props.quote}
                clickCopy={() => this.clearEverything()}
              />

              <Button id="clear" onClick={() => this.clearEverything()}>
                모두 지우기
              </Button>

              <Button
                id="close-ocr"
                onClick={() => this.setState({ open: false })}
              >
                창닫기
              </Button>
            </div>

            <TextArea
              id="ocr-text"
              rows="20"
              value={this.props.quote} // this.state.content  vs this.props.quote
            />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OcrModal);
