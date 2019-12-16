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
import Alert from 'react-bootstrap/Alert';

class AddLibraryModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    open: false,
    title: this.props.title ? this.props.title : '',
    books: this.props.books ? this.props.books : [],
    mode: this.props.mode === 'ADD' ? 'ADD' : 'EDIT',
  };

  /////////////* Logic for Modal */////////////
  open = () => this.setState({ ...this.state, open: true });
  close = () => {
    if (this.state.mode === 'ADD') {
      this.setState({
        ...this.state,
        title: '',
        books: [],
        open: false,
      });
      this.props.onLoadLibrary();
      this.props.onEmptySelectedBook();
    } else {
      this.setState({
        ...this.state,
        open: false,
      });
      this.props.onLoadLibrary();
      this.props.onEmptySelectedBook();
    }
  };
  /////////////////////////////////////////////
  //////////* Logic for Title Input *//////////
  handleChange = (event, { value }) =>
    this.setState({ ...this.state, title: value });
  /////////////////////////////////////////////

  addToLibrary = book => {
    /* Debug Start
    console.log('[DEBUG] booktitle: ' + book.title);
    console.log('[DEBUG] status: ' + this.state.mode);
    console.log('[DEBUG] books: ');
    this.state.books.map(_book => {
      console.log(_book.title);
    });
    console.log(
      '[DEBUG] selectedBook exists?: ' +
        (this.props.selectedBook != null
          ? 'yes. the title is: ' + this.props.selectedBook.title
          : 'no'),
    );
    //if (this.props.selectedBook == null) return;
    Debug End */

    this.setState({
      ...this.state,
      books: this.state.books.concat(book),
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
    if (this.state.title.trim().length > 40) {
      window.alert('제목은 40자 이내여야 합니다.');
      return;
    }
    let title_books_dict = {
      title: this.state.title.trim(),
      books: this.state.books,
    };
    if (this.state.mode === 'ADD') this.props.onSaveLibrary(title_books_dict);
    else this.props.onEditLibrary(this.props.id, title_books_dict);

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
    const libraryEditButton = (
      <Button size="mini" icon>
        <Icon name="pencil" size="small" />
      </Button>
    );

    const saveButton = (
      <Button
        onClick={this.save}
        disabled={this.state.title.trim() === ''}
        color="green"
      >
        <Icon name="checkmark" />
        저장
      </Button>
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
    if (booksHTML && booksHTML.length != 0)
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
          trigger={
            this.state.mode === 'ADD' ? libraryAddButton : libraryEditButton
          }
          className="AddLibraryModal"
          open={open}
          onOpen={this.open}
          onClose={this.close}
        >
          <Modal.Header>
            {this.state.mode === 'ADD'
              ? '라이브러리 만들기'
              : '라이브러리 수정하기'}
          </Modal.Header>
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
                <div className="LibraryChooseBookModal">
                  <LibraryChooseBookModal
                    id="choose-book-modal"
                    addToLibrary={this.addToLibrary}
                  />
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
    onLoadLibrary: () => dispatch(actionCreators.getLibraries()),
    onEditLibrary: (library_id, title_books_dict) =>
      dispatch(
        actionCreators.editSpecificLibrary(library_id, title_books_dict),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AddLibraryModal));
