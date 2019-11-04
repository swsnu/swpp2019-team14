import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, TextArea } from 'semantic-ui-react';
import Dropzone from '../Dropzone/Dropzone';
import './OcrModal.css';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onRunOcr: file => console.log(`running ocr on ${file.name}`), // ocr actioncreator to be created
  };
};

class OcrModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      open: false,
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
      promises.push(this.props.onRunOcr(file));
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
        <Button onClick={() => this.setState({ open: true })}>Quote</Button>
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
            <Button id="clear" onClick={() => this.setState({ files: [] })}>
              삭제하기
            </Button>
            <Button id="run-ocr" onClick={this.runOcrOnFiles}>
              내용 추출하기
            </Button>
            <Button onClick={() => this.setState({ open: false })}>
              Close
            </Button>
            <TextArea
              id="ocr-text"
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
