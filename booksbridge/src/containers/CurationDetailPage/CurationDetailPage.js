import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Icon, Container, Divider } from 'semantic-ui-react';

import Header from '../../components/Header';
import BookInfo from '../../components/BookDetail/BookInfo';
import BookResultSummary from '../../components/BookResultSummary/BookResultSummary';
import Comments from '../Comments/Comments';
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary';
import BookListItem from '../../components/CurationDetailPage/BookListItem';

import * as actionCreators from '../../store/actions/actionCreators';

import './CurationDetailPage.css';

class CurationDetailPage extends Component {
  constructor(params) {
    super(params);
    this.props.onLoadCuration(this.props.match.params.curation_id);
  }

  likeHandler(like_or_not, curation_id) {
    if (like_or_not) {
      this.props.onDeleteLikeCuration(curation_id);
    } else {
      this.props.onPostLikeCuration(curation_id);
    }
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
          size="small"
          content={entry.content}
        ></BookListItem>
      );
    });

    const likeButton = this.props.currentCuration.like_or_not ? (
      <div
        className="CurationLikeButton"
        onClick={() => this.likeHandler(true, this.props.currentCuration.id)}
      >
        <Icon color="red" name="like" />
        {this.props.currentCuration.like_count}
      </div>
    ) : (
      <div
        className="CurationLikeButton"
        onClick={() => this.likeHandler(false, this.props.currentCuration.id)}
      >
        <Icon name="like" />
        {this.props.currentCuration.like_count}
      </div>
    );
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
            {/* <div className="LikeButton" onClick={this.likeHandler}>
              <div className="ui labeled button" tabIndex="0">
                <div className="ui red button">
                  <i className="heart icon" /> Like
                </div>
                <a className="ui basic red left pointing label">
                  {this.props.currentCuration.like_count}
                </a>
              </div>
            </div> */}
            {likeButton}

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
    logged_in_user: state.user.logged_in_user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadCuration: id => dispatch(actionCreators.getSpecificCuration(id)),
    onPostLikeCuration: curation_id =>
      dispatch(actionCreators.postCurationLike(curation_id)),
    onDeleteLikeCuration: curation_id =>
      dispatch(actionCreators.deleteCurationLike(curation_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CurationDetailPage));
