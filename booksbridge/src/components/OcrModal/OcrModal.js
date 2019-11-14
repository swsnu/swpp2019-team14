import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, TextArea } from 'semantic-ui-react';
import './OcrModal.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as actionCreators from '../../store/actions/actionCreators';

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
      files: [],
      open: false,
      content: '',
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

    const array = this.fileListToArray(files);
    //this.setState(prevState => ({ files: prevState.files.concat(array) }));
    this.setState({
      ...this.state,
      files: this.state.files.concat(array),
      imageShow: true,
    });
  }

  fileListToArray(list) {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  async runOcrOnFiles() {
    const promises = [];

    this.state.files.forEach(file => {
      let formData = new FormData();
      formData.append('image', file);
      promises.push(this.props.onRunOcr(formData));
    });
    try {
      await Promise.all(promises);
      this.setState({
        content: this.props.quote,
      });
    } catch (e) {
      this.setState({
        files: [],
        imageShow: false,
      });
      window.alert('running ocr on file has failed');
    }
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
          onClick={() => this.setState({ files: [], open: true, content: '' })}
        >
          Quote
        </Button>
        <Modal open={this.state.open}>
          <Modal.Content>
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                </div>
              );
            })}
            <div
              id="choose-file"
              onClick={() => this.fileInputRef.current.click()}
            >
              <Button>Upload</Button>
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
            <CopyToClipboard text={this.state.content}>
              <Button
                onClick={() => this.setState({ ...this.state, open: false })}
              >
                Copy to the Clipboard
              </Button>
            </CopyToClipboard>
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
              value={this.state.content} // this.state.content  vs this.props.quote
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
