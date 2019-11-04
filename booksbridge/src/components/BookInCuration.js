import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Header from './Header';
import OCRModal from '../components/OCRModal';
import AddBookModal from '../components/AddBookModal';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

class BookInCuration extends Component {
  state = {
    content: '',
  };

  componentDidMount() {}

  //   static getDerivedStateFromProps(nextProps, nextState) {
  //     return nextState;
  //   }

  render() {
    const { book } = this.props;

    return (
      <div className="BookInCuration">
        {book}
        <textarea
          id="curation-book-content"
          onChange={event => this.setState({ content: event.target.value })}
        />
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
    // 1. send post request to add to BookInCuration table
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookInCuration);
