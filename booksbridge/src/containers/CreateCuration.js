import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Form, TextArea } from 'semantic-ui-react';

import Header from '../components/Header';
import CurationModal from '../components/CurationModal/CurationModal';
import * as actionCreators from '../store/actions/actionCreators';
import BookResultSummary from '../components/BookResultSummary/BookResultSummary';

import './CreateCuration.css';
import { FormText, InputGroup, FormControl } from 'react-bootstrap';

class CreateCuration extends Component {
  state = {
    title: '',
    content: '',
    selectedBooks: [],
    bookInCuration: [],
  };

  onClickCreateButton = () => {
    if (this.state.title === '' || this.state.content === '') {
      window.alert('제목과 내용을 반드시 입력해야 합니다.');
    } else if (
      (this.state.title !== '' && this.state.title.trim() === '') ||
      (this.state.content !== '' && this.state.content.trim() === '')
    ) {
      window.alert('공백 문자로만 이루어진 제목이나 내용은 허용되지 않습니다.');
    } else if (this.state.title.trim().length > 40) {
      window.alert('제목은 40자 이내여야 합니다.');
    } else if (this.state.content.trim().length > 5000) {
      window.alert('내용은 5000자 이내여야 합니다.');
    } else if (
      this.state.bookInCuration.some(isbn_content_pair => {
        return isbn_content_pair.content.trim().length > 1500;
      })
    ) {
      window.alert('책 설명은 1500자 이내여야 합니다.');
    } else if (this.state.bookInCuration.length === 0) {
      window.alert('책을 한 권 이상 선택해야 합니다.');
    } else {
      if (
        this.props.match.params.username &&
        this.props.match.params.curation_id
      ) {
        this.props.onEditCuration({
          title: this.state.title.trim(),
          content: this.state.content.trim(),
          isbn_content_pairs: this.state.bookInCuration,
          curation_id: this.props.match.params.curation_id,
        });
      } else {
        this.props.onPostCuration({
          title: this.state.title.trim(),
          content: this.state.content.trim(),
          isbn_content_pairs: this.state.bookInCuration,
        });
      }
    }
  };

  async onEdit() {
    await this.props.onLoadCuration(this.props.match.params.curation_id);
    this.setState({
      title: this.props.currentCuration.title,
      content: this.props.currentCuration.content,
      selectedBooks: this.props.currentCuration.books.map(book => book.book),
      bookInCuration: this.props.currentCuration.books.map(book => {
        return { isbn: book.book.isbn, content: book.content };
      }),
    });
  }

  render() {
    if (
      this.props.match.params.username &&
      this.props.match.params.curation_id &&
      this.state.title === ''
    ) {
      this.onEdit();
    }

    return (
      <div className="create-curation">
        <Header />
        <div>
          <CurationModal
            className="curation-modal"
            initialBooks={this.state.selectedBooks}
            update={list => {
              let bookInCuration = [];
              let currContent = '';
              list.map((book, index) => {
                bookInCuration = bookInCuration.concat({
                  isbn: book.isbn,
                  content: this.state.bookInCuration.some(isbn_content_pair => {
                    if (isbn_content_pair.isbn === book.isbn) {
                      currContent = isbn_content_pair.content;
                    }
                    return isbn_content_pair.isbn === book.isbn;
                  })
                    ? currContent
                    : '',
                });
              });
              this.setState({
                ...this.state,
                selectedBooks: list,
                bookInCuration: bookInCuration,
              });
            }}
          />

          <div className="ReviewCreateForm">
            <Form className="ui form">
              <div className="field">
                <label className="FormLabel">큐레이션 제목</label>
                <input
                  id="curation-title"
                  type="text"
                  name="title"
                  value={this.state.title ? this.state.title : ''}
                  placeholder="Enter Title"
                  onChange={event =>
                    this.setState({ title: event.target.value })
                  }
                />
              </div>
              <br />
              <div className="field">
                <label className="FormLabel">큐레이션 설명</label>
                <TextArea
                  id="curation-content"
                  name="content"
                  value={this.state.content ? this.state.content : ''}
                  placeholder="Enter Content"
                  rows={this.state.type === 'long-review' ? '20' : '5'}
                  onChange={event =>
                    this.setState({ content: event.target.value })
                  }
                />
              </div>
              {this.state.selectedBooks
                ? this.state.selectedBooks.map((book, index) => {
                    let content = '';

                    return (
                      <div className="bookdetail-container">
                        <BookResultSummary
                          cover={book.thumbnail}
                          title={book.title}
                          authors={book.authors}
                          publisher={book.publisher}
                          isbn={book.isbn}
                          direct={false}
                          click={() => {}}
                        />
                        <label className="FormLabel">이 책에 대한 코멘트</label>
                        <TextArea
                          id="curation-book-content"
                          value={
                            this.state.bookInCuration.some(
                              isbn_content_pair => {
                                if (isbn_content_pair.isbn === book.isbn)
                                  content = isbn_content_pair.content;
                                return isbn_content_pair.isbn === book.isbn;
                              },
                            )
                              ? content
                              : ''
                          }
                          onChange={event => {
                            let value = event.target.value;
                            this.setState((state, props) => ({
                              bookInCuration: state.bookInCuration.map(
                                (bookInCuration, curationIndex) => {
                                  if (curationIndex === index)
                                    return {
                                      ...bookInCuration,
                                      content: value,
                                    };
                                  else return { ...bookInCuration };
                                },
                              ),
                            }));
                          }}
                          className="curation-book-content"
                        ></TextArea>
                      </div>
                    );
                  })
                : null}

              <Button
                className="SubmitButton"
                id="create-curation"
                content={
                  this.props.match.params.username &&
                  this.props.match.params.curation_id
                    ? '큐레이션 수정하기'
                    : '큐레이션 만들기'
                }
                onClick={() => this.onClickCreateButton()}
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentCuration: state.curation.selectedCuration,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadCuration: id => dispatch(actionCreators.getSpecificCuration(id)),
    onPostCuration: curation => {
      dispatch(actionCreators.postCuration(curation));
    },
    onEditCuration: curation => {
      dispatch(actionCreators.editCuration(curation));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CreateCuration));
