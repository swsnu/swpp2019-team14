import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Sticky } from 'semantic-ui-react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import * as actionCreators from '../../store/actions/actionCreators';
import BookResultSummary from '../BookResultSummary/BookResultSummary';

import './ChooseBookModal.css';

const mapStateToProps = state => {
  return {
    searchedBooks: state.book.searchedBooks,
    count: state.book.count,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSearchBooks: (keyword, page) =>
      dispatch(actionCreators.getSearchedBooks(keyword, page)),
    onEmptySearchedBooks: () => dispatch(actionCreators.emptySearchedBooks()),
  };
};

class ChooseBookModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      requestNum: 1,
      search: false,
    };
  }

  async searchHandler() {
    this.props.onEmptySearchedBooks();
    await this.props.onSearchBooks(this.state.keyword, 1);

    if (this.props.count >= 10) {
      this.setState({ requestNum: 2, search: true });
    }
  }

  seeMoreHandler = () => {
    if ((this.state.requestNum - 1) * 10 < this.props.count) {
      this.props.onSearchBooks(this.state.keyword, this.state.requestNum);
      if (this.state.requestNum * 10 >= this.props.count) {
        this.setState({ ...this.state, search: false });
      } else {
        this.setState(state => ({
          ...this.state,
          requestNum: state.requestNum + 1,
        }));
      }
    }
  };

  render() {
    const result = this.props.searchedBooks
      ? this.props.searchedBooks.map((book, index) => {
          return (
            <BookResultSummary
              key={index}
              cover={book.thumbnail}
              title={book.title}
              authors={book.authors}
              publisher={book.publisher}
              isbn={book.isbn}
              direct={false}
              click={() => {
                this.props.selected(book);
              }}
            />
          );
        })
      : null;

    const moreButton = this.state.search && (
      <Button className="more-button" onClick={() => this.seeMoreHandler()}>
        더보기
      </Button>
    );

    return (
      <Modal.Content scrolling className="choose-book-modal-content">
        <InputGroup className="choose-book-input">
          <FormControl
            id="search-form"
            aria-describedby="basic-addon2"
            type="text"
            onChange={event => this.setState({ keyword: event.target.value })}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.searchHandler();
              }
            }}
          />
          <InputGroup.Append>
            <Button
              className="search-button"
              onClick={() => this.searchHandler()}
            >
              검색
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Button className="close-select-book-button" onClick={this.props.close}>
          닫기
        </Button>
        {result}
        {moreButton}
      </Modal.Content>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseBookModal);
