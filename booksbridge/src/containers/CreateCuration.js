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
    if (this.state.bookInCuration.length === 0) {
      window.alert('책을 한 권 이상 선택해야 합니다.');
    } else if (this.state.title === '' || this.state.content === '') {
      window.alert('제목과 내용을 반드시 입력해야 합니다.');
    } else {
      this.props.onPostCuration({
        title: this.state.title,
        content: this.state.content,
        isbn_content_pairs: this.state.bookInCuration,
      });
    }
  };

  render() {
    return (
      <div className="create-curation">
        <Header />
        <div>
          <CurationModal
            className="curation-modal"
            update={list => {
              let bookInCuration = [];
              list.map((book, index) => {
                bookInCuration = bookInCuration.concat({
                  isbn: book.isbn,
                  content: '',
                });
              });
              this.setState({
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
                  placeholder="Enter Content"
                  rows={this.state.type === 'long-review' ? '20' : '5'}
                  onChange={event =>
                    this.setState({ content: event.target.value })
                  }
                />
              </div>
              {this.state.selectedBooks
                ? this.state.selectedBooks.map((book, index) => {
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
                content="Submit"
                onClick={() => this.onClickCreateButton()}
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostCuration: curation => {
      dispatch(actionCreators.postCuration(curation));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(CreateCuration));
