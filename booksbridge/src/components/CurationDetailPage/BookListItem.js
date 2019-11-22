import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import BookResultSummary from '../../components/BookResultSummary/BookResultSummary';
import './BookListItem.css';

class BookListItem extends Component {
  render() {
    const {
      cover,
      title,
      authors,
      publisher,
      isbn,
      direct,
      click,
      size,
      content,
    } = this.props;

    return (
      <div key={isbn} className="book-list-item">
        <div className="book">
          <BookResultSummary
            cover={cover}
            title={title}
            authors={authors}
            publisher={publisher}
            isbn={isbn}
            direct={direct}
            click={click}
            size={size}
          />
        </div>
        <div className="content">
          <h5>{content}</h5>
        </div>
      </div>
    );
  }
}

export default BookListItem;
