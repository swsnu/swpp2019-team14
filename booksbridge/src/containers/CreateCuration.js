import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Form, TextArea } from 'semantic-ui-react';

import Header from '../components/Header';
import CurationModal from '../components/CurationModal/CurationModal';
import * as actionCreators from '../store/actions/actionCreators';
import BookResultSummary from '../components/BookResultSummary/BookResultSummary';

import './CreateCuration.css';

class CreateCuration extends Component {
  state = {
    title: '',
    content: '',
    selectedBooks: [],
    type: 'long-review',
  };

  onClickCreateButton = () => {
    if (!this.props.selectedBook) {
      return;
    }
    if (this.state.type === 'long-review') {
      if (this.state.title != '' && this.state.content != '') {
        this.props.onPostArticle({
          isbn: this.props.selectedBook.isbn,
          title: this.state.title,
          content: this.state.content,
          is_long: true,
          is_short: false,
          is_phrase: false,
        });
        window.alert('Success!');
      } else {
        window.alert('Title or content is empty.');
      }
    } else {
      if (this.state.content != '') {
        this.props.onPostArticle({
          isbn: this.props.selectedBook.isbn,
          title: '',
          content: this.state.content,
          is_long: false,
          is_short: this.state.type === 'short-review',
          is_phrase: this.state.type === 'phrase',
        });
        window.alert('Success!');
      } else {
        window.alert('Content is empty.');
      }
    }
  };

  radioHandler = event => {
    this.setState({ type: event.target.value });
  };

  render() {
    const book = this.props.selectedBook ? (
      <BookResultSummary
        cover={this.props.selectedBook.thumbnail}
        title={this.props.selectedBook.title}
        authors={this.props.selectedBook.authors}
        publisher={this.props.selectedBook.publisher}
        isbn={this.props.selectedBook.isbn}
        direct={false}
        click={() => {}}
      />
    ) : null;
    return (
      <div className="CreateReview">
        <Header />
        <div>
          <CurationModal
            className="curation-modal"
            update={list => this.setState({ selectedBooks: list })}
          />

          {this.state.selectedBooks
            ? this.state.selectedBooks.map(book => {
                return (
                  <BookResultSummary
                    cover={book.thumbnail}
                    title={book.title}
                    authors={book.authors}
                    publisher={book.publisher}
                    isbn={book.isbn}
                    direct={false}
                    click={() => {}}
                  />
                );
              })
            : null}
          <div className="ReviewCreateForm">
            <Form className="ui form">
              {this.state.type === 'long-review' ? (
                <div className="field">
                  <label className="FormLabel">Title</label>
                  <input
                    id="review-title"
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    onChange={event =>
                      this.setState({ title: event.target.value })
                    }
                  />
                </div>
              ) : null}
              <br />
              <div className="field">
                <label className="FormLabel">Content</label>
                <TextArea
                  id="review-content"
                  name="content"
                  placeholder="Enter Content"
                  rows={this.state.type === 'long-review' ? '20' : '5'}
                  onChange={event =>
                    this.setState({ content: event.target.value })
                  }
                />
              </div>

              <Button
                className="SubmitButton"
                id="create-review"
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

const mapStateToProps = state => {
  return {
    selectedBook: state.book.selectedBook,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchBooks: (keyword, page) =>
      dispatch(actionCreators.getSearchedBooks(keyword, page)),
    onGetSpecificBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
    onPostArticle: review => dispatch(actionCreators.postArticle(review)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CreateCuration));
