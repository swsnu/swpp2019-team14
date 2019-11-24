import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Icon,
  Modal,
  Header,
  Image,
  Card,
  Form,
} from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/actionCreators';
import { withRouter } from 'react-router';

import LibraryChooseBookModal from './LibraryChooseBookModal';
import BookInfo from '../BookDetail/BookInfo';

import './AddLibraryModal.css';

class AddLibraryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      books: [],
    };
  }

  /////////////* Logic for Modal */////////////
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  /////////////////////////////////////////////
  //////////* Logic for Title Input *//////////
  handleChange = (event, { value }) =>
    this.setState({ ...this.state, title: value });
  /////////////////////////////////////////////
  onClickAddLibrary() {
    console.log('[DEBUG] onClickAddLibrary called');
    console.log('[DEBUG] libraries: ' + this.props.libraries);
  }

  onClickAddToLibrary = () => {
    this.setState({
      ...this.state,
      books: this.state.books.concat(this.props.selectedBook),
    });
    this.props.onEmptySelectedBook();
    console.log('[DEBUG] books: ' + this.state.books.map(book => book.title));
    console.log(
      '[DEBUG] this.props.selectedBook: ' + this.props.selectedBook
        ? this.props.selectedBook.title
        : 'No selectedBook',
    );
  };

  render() {
    const { open, title } = this.state;
    const libraryAddButton = (
      <Button
        icon
        labelPosition="left"
        onClick={() => this.onClickAddLibrary()}
      >
        <Icon name="plus" />
        Add a Library
      </Button>
    );
    const selectedBookHTML = this.props.selectedBook ? (
      <BookInfo
        isbn={this.props.selectedBook.isbn}
        title={this.props.selectedBook.title}
        authors={this.props.selectedBook.authors}
        publisher={this.props.selectedBook.publisher}
        publishedDate={this.props.selectedBook.publishedDate}
        thumbnail={this.props.selectedBook.thumbnail}
      />
    ) : (
      '아직 선택한 책이 없어요. 책 고르기 버튼을 눌러 추가해보세요!'
    );

    return (
      <div className="AddLibraryModalContainer">
        <Modal
          trigger={libraryAddButton}
          className="AddLibraryModal"
          open={open}
          onOpen={this.open}
          onClose={this.close}
        >
          <Modal.Header>라이브러리 만들기</Modal.Header>
          <Modal.Content className="LibraryTitleInput">
            <Form>
              <Form.Field>
                <label>라이브러리 이름</label>
                <Form.Input
                  placeholder="라이브러리 이름을 입력하세요."
                  value={title}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Content className="LibraryBookSearch">
            <div className="LibraryBookSearchInner">
              <div className="LibraryBookSearchHeader">
                <div className="LibraryChooseBookModal">
                  <LibraryChooseBookModal id="choose-book-modal" />
                </div>
                <div className="AddToLibrary_Button">
                  <Button
                    icon
                    labelPosition="right"
                    onClick={this.onClickAddToLibrary}
                  >
                    <Icon name="plus" />
                    라이브러리에 추가하기
                  </Button>
                </div>
              </div>
              <div className="LibraryBookSearchContent">{selectedBookHTML}</div>
            </div>
          </Modal.Content>
          <Modal.Content className="LibraryAddedBooks">
            Library Added Books - not yet implemented
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={this.close}>
              닫기 <Icon name="chevron right" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged_in_user: state.user.logged_in_user,
    libraries: state.library.libraries,
    selectedBook: state.book.selectedBook,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEmptySelectedBook: () => dispatch(actionCreators.emptySelectedBook()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AddLibraryModal));
