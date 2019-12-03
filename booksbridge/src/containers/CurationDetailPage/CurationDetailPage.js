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
comments = get_comments(curation, False)

likes = CurationLike.objects.filter(curation_id=curation.id).count()

curation_dict = {
    'id': curation.id,
    'author': user_dict,
    'books': book_list,    
    'title': curation.title,
    'content': curation.content,
    'date': time_array,
    'comments': comments,
    'likes': likes
}
 
*/
class CurationDetailPage extends Component {
  constructor(params) {
    super(params);
    this.props.onLoadCuration(this.props.match.params.curation_id);
  }

  likeHandler = () => {
    if (this.props.likes > 0) {
      this.props.onDeleteLikeCuration(this.props.match.params.curation_id);
    } else {
      this.props.onPostLikeCuration(this.props.match.params.curation_id);
    }
  };

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
          size="small"
          content={entry.content}
        ></BookListItem>
      );
    });

    return (
      <div>
        <Header />
        <div className="curation-detail-page">
          <ProfileSummary user={this.props.currentCuration.author} />

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
            <div className="LikeButton" onClick={this.likeHandler}>
              <div className="ui labeled button" tabIndex="0">
                <div className="ui red button">
                  <i className="heart icon" /> Like
                </div>
                <a className="ui basic red left pointing label">
                  {this.props.currentCuration.likes}
                </a>
              </div>
            </div>

            <div className="CurationComments">
              <Comments
                comments={this.props.currentCuration.comments}
                curation_id={this.props.match.params.curation_id}
                is_article={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentCuration: state.curation.selectedCuration,
    likes: state.curation.likes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadCuration: id => dispatch(actionCreators.getSpecificCuration(id)),
    onPostLikeCuration: curation_id =>
      dispatch(actionCreators.postCurationLike(curation_id)),
    onGetLikeCuration: curation_id =>
      dispatch(actionCreators.getCurationLike(curation_id)),
    onDeleteLikeCuration: curation_id =>
      dispatch(actionCreators.deleteCurationLike(curation_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CurationDetailPage));
