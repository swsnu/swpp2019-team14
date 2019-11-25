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
  open = () => this.setState({ ...this.state, open: true });
  close = () => {
    this.setState({
      ...this.state,
      title: '',
      books: [],
      open: false,
    });
    this.props.onLoadLibrary(this.props.logged_in_user.id);
    this.props.onEmptySelectedBook();
  };
  /////////////////////////////////////////////
  //////////* Logic for Title Input *//////////
  handleChange = (event, { value }) =>
    this.setState({ ...this.state, title: value });
  /////////////////////////////////////////////

  onClickAddToLibrary = () => {
    if (this.props.selectedBook == null) return;
    this.setState({
      ...this.state,
      books: this.state.books.concat(this.props.selectedBook),
    });
    this.props.onEmptySelectedBook();
  };

  onClickDeleteFromSelectedBooks = isbn => {
    this.setState({
      ...this.state,
      books: this.state.books.filter(book => book.isbn !== isbn),
    });
  };

  save = () => {
    let title_books_dict = {
      title: this.state.title,
      books: this.state.books,
    };
    this.props.onSaveLibrary(title_books_dict);
    this.close();
  };

  render() {
    const { open, title } = this.state;
    const libraryAddButton = (
      <Button icon labelPosition="left">
        <Icon name="plus" />
        라이브러리 만들기
      </Button>
    );

    const saveButton = (
      <Button
        onClick={this.save}
        disabled={this.state.title == '' || this.state.books == []}
        color="green"
      >
        <Icon name="checkmark" />
        저장
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

    const booksHTML = this.state.books.map((book, index) => {
      return (
        <div className="AddedBookWrapper" key={index}>
          <div className="AddedBookHeader">
            <Button
              icon
              size="mini"
              onClick={() => this.onClickDeleteFromSelectedBooks(book.isbn)}
            >
              <Icon name="times" size="small"></Icon>
            </Button>
          </div>
          <div className="AddedBookContent">
            <Image src={book.thumbnail} className="AddedBookCover" />
          </div>
        </div>
      );
    });

    let books_in_rows = [];
    for (let i = 0; i < booksHTML.length; i += 1) {
      if (i % 3 == 0) {
        books_in_rows.push(
          <div className="AddedBooks_by_3" key={i}>
            {booksHTML.slice(i, i + 3)}
          </div>,
        );
      }
    }

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
          <Modal.Content scrolling className="LibraryContent">
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
                <div className="LibraryBookSearchContent">
                  {selectedBookHTML}
                </div>
              </div>
            </Modal.Content>
            <Modal.Content className="LibraryAddedBooks">
              {books_in_rows}
            </Modal.Content>
          </Modal.Content>
          <Modal.Actions>
            {saveButton}
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
    onSaveLibrary: title_books_dict =>
      dispatch(actionCreators.postLibrary(title_books_dict)),
    onLoadLibrary: user_id =>
      dispatch(actionCreators.getLibrariesByUserID(user_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AddLibraryModal));
