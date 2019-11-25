import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, TextArea } from 'semantic-ui-react';
import './OcrModal.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as actionCreators from '../../store/actions/actionCreators';
import Copy from './CopyToClipboard';

const mapStateToProps = state => {
  return {
    quote: state.book.quote,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRunOcr: formData => dispatch(actionCreators.runOcr(formData)),
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
    };

    this.fileInputRef = React.createRef();
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.runOcrOnFiles = this.runOcrOnFiles.bind(this);
  }

  onFilesAdded(event) {
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

  async runOcrOnFiles() {
    const formData = new FormData();
    formData.append('image', this.state.file);
    this.props.onRunOcr(formData);
  }

  render() {
    const image = this.state.imageShow && (
      <img id="target" src={this.state.image} width={300} height={300} />
    );

    return (
      <div className="ocr-modal">
        <Button
          onClick={() =>
            this.setState({
              files: [],
              open: true,
              content: '',
              imageShow: false,
            })
          }
          id="open-ocr"
        >
          Quote
        </Button>
        <Modal open={this.state.open}>
          <Modal.Content>
            <div id="choose-file">
              <input
                ref={this.fileInputRef}
                className="FileInput"
                type="file"
                accept=".jpg, .jpeg, .png"
                multiple
                onChange={this.onFilesAdded}
              />
            </div>
            {image}

            <Button id="run-ocr" onClick={this.runOcrOnFiles}>
              Extract
            </Button>
            <Copy
              text={this.props.quote}
              clickCopy={() => this.setState({ ...this.state, open: false })}
            />
            <Button
              id="clear"
              onClick={() =>
                this.setState({ files: [], content: '', imageShow: false })
              }
            >
              Clear
            </Button>
            <Button
              id="close-ocr"
              onClick={() => this.setState({ open: false })}
            >
              Close
            </Button>
            <TextArea
              id="ocr-text"
              value={this.props.quote} // this.state.content  vs this.props.quote
              style={{ minHeight: 500, minWidth: 1000 }}
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
