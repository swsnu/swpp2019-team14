import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, TextArea } from 'semantic-ui-react';
import Dropzone from '../Dropzone/Dropzone';
import './OcrModal.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as actionCreators from '../../store/actions/actionCreators';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onRunOcr: formData => dispatch(actionCreators.runOcr(formData)), // ocr actioncreator to be created
  };
};

class OcrModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      open: false,
      content: '',
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.runOcrOnFiles = this.runOcrOnFiles.bind(this);
  }

  onFilesAdded = files => {
    this.setState(prevState => ({ files: prevState.files.concat(files) }));
  };

  async runOcrOnFiles() {
    // this.setState({ uploading: true });

    const promises = [];

    this.state.files.forEach(file => {
      let formData = new FormData();
      formData.append('image', file);
      promises.push(this.props.onRunOcr(formData));
      this.setState({
        content:
          'swpp  swpp  swpp  swpp  swpp  swpp  swpp  swpp  swpp  swpp  swpp  swpp  swpp  swpp  swpp  swpp  ',
      });
    });
    try {
      await Promise.all(promises);
      // this.setState({
      //   uploaded: true,
      //   uploading: false
      // })
    } catch (e) {
      this.setState({
        // right?
        files: [],
        // uploaded: false,
        // uploading: false
      });
      window.alert('running ocr on file has failed');
    }
  }

  render() {
    return (
      <div className="ocr-modal">
        <Button
          onClick={() => this.setState({ files: [], open: true, content: '' })}
        >
          Quote
        </Button>
        <Modal open={this.state.open}>
          <Modal.Content>
            <Dropzone onFilesAdded={this.onFilesAdded} disabled={false} />
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                </div>
              );
            })}

            <Button id="run-ocr" onClick={this.runOcrOnFiles}>
              Extract
            </Button>
            <CopyToClipboard text={this.state.content}>
              <Button>Copy to the Clipboard</Button>
            </CopyToClipboard>
            <Button
              id="clear"
              onClick={() => this.setState({ files: [], content: '' })}
            >
              Clear
            </Button>
            <Button onClick={() => this.setState({ open: false })}>
              Close
            </Button>
            <TextArea
              id="ocr-text"
              value={this.state.content}
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
