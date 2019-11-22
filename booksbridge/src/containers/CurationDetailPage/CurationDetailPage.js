import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Container, Divider } from 'semantic-ui-react';

import Header from '../../components/Header';
import BookInfo from '../../components/BookDetail/BookInfo';
import BookResultSummary from '../../components/BookResultSummary/BookResultSummary';
import Comments from '../Comments/Comments';
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary';
import BookListItem from '../../components/CurationDetailPage/BookListItem';

import * as actionCreators from '../../store/actions/actionCreators';

import './CurationDetailPage.css';

/* 
PATH    curation/:curation_id"

RESOPNSE FROM BACKEND   curation_dict
user_dict = {
        'id':user.id,
        'username':user.username,
        'profile_photo':user.profile.profile_photo.name,
        'nickname':user.profile.nickname,
    }

book_in_curation = BookInCuration.objects.filter(curation=curation)
book_list = [{'book': model_to_dict(get_object_or_404(Book, isbn=book.book_id)), 'content': book.content} 
              for book in book_in_curation]  # book_id: isbn 

curation_dict = {
  'author': user_dict,
  'books': book_list,    
  'id': curation.id,
  'title': curation.title,
  'content': curation.content,
  'date': time_array,
}
*/
class CurationDetailPage extends Component {
  componentDidMount() {
    this.props.onLoadCuration(this.props.match.params.curation_id);
  }

  render() {
    if (!this.props.currentCuration) {
      return <div className="loading">LOADING..!</div>;
    }

    const bookAndContent = this.props.currentCuration.books.map(entry => {
      // { {book info}, content } list
      return (
        <BookListItem
          cover={entry.book.thumbnail}
          title={entry.book.title}
          authors={entry.book.authors}
          publisher={entry.book.publisher}
          isbn={entry.book.isbn}
          direct={true}
          click={() => {}}
          size="big"
          content={entry.content}
        ></BookListItem>
      );
    });

    return (
      <div className="curation-detail-page">
        <Header />
        <div className="AuthorProfile">
          <ProfileSummary user={this.props.currentCuration.author} />
        </div>

        <div className="curation-title">
          <h1>{this.props.currentCuration.title}</h1>
        </div>
        <Divider />
        <div className="curation-content">
          <Container>
            <h5>{this.props.currentCuration.content}</h5>
          </Container>
        </div>
        <div className="book-and-content">{bookAndContent}</div>

        <div className="CurationContainer">
          <div className="LikeButton">
            <div className="ui labeled button" tabIndex="0">
              <div className="ui red button">
                <i className="heart icon" /> Like
              </div>
              <a className="ui basic red left pointing label">0</a>
            </div>
          </div>

          <div className="CurationComments">
            <Comments
              comments={this.props.currentCuration.comments}
              curation_id={this.props.match.params.curation_id}
            />
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CurationDetailPage));
