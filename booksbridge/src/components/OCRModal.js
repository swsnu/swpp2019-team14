// this is modal (popup box) such as that in email-write box in Gmail
// to be used in OCR feature

import { connect } from 'react-redux';
import React, { Component } from 'react';
import Button from './Button';


// user copies value in text area
class OCRModal extends Component {

    state = {
        ocrText: "",
    }

    onClickUploadPictureButton = () => {
        // should let user upload picture from local PC 
    }

    onClickRunOcrButton = () => {
        // run OCR with API
        // and set this.state.ocrText with the extracted text from picture
    }

    onClickCloseButton = () => {
        // closes this modal pop-up 
        // by changing this.state.ocr in CreateReview.js
        this.props.whenDone();
    }


    render() {
        const OCR = this.props.show &&
            <div id="ocr-modal">
                <Button id="upload-page-picture" content="Upload Picture" onClick={() => this.onClickUploadPictureButton()} />
                <Button id="run-ocr" content="Run" onClick={() => this.onClickRunOcrButton()} />
                <textarea id="ocr-text" value={this.state.ocrText} />
                <Button id="close-ocr-feature" content="close" onClick={() => this.onClickCloseButton()} />
            </div>
        return OCR;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // 1. send picture to backend and get back extracted text

    }
}
export default connect(null, mapDispatchToProps)(OCRModal);