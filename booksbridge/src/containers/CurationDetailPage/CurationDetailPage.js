import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Icon, Container, Divider, Button } from 'semantic-ui-react';

import Header from '../../components/Header';
import BookInfo from '../../components/BookDetail/BookInfo';
import BookResultSummary from '../../components/BookResultSummary/BookResultSummary';
import Comments from '../Comments/Comments';
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary';
import BookListItem from '../../components/CurationDetailPage/BookListItem';

import * as actionCreators from '../../store/actions/actionCreators';

import './CurationDetailPage.css';
import { stringify } from 'querystring';

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

  handleDeleteCuration = () => {
    this.props.onDeleteCuration(this.props.currentCuration.id);
    this.props.history.push('/curation/');
  };

  handleEditCuration = () => {
    console.log('[DEBUG] handleEditCuration');
    this.props.history.push(
      '/curation/' +
        this.props.logged_in_user.username +
        '/' +
        this.props.currentCuration.id +
        '/edit/',
    );
  };

  render() {
    if (!this.props.currentCuration) {
      return <div className="loading">LOADING..!</div>;
    }

    const bookAndContent = this.props.currentCuration.books.map(entry => {
      // { {book info}, content } list
      return (
        <div>
          <Divider />
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
        </div>
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

    const editButton =
      this.props.currentCuration.author.id === this.props.logged_in_user.id ? (
        <Button onClick={this.handleEditCuration} icon size="small">
          <Icon name="pencil" size="small" />
        </Button>
      ) : null;

    const deleteButton =
      this.props.currentCuration.author.id === this.props.logged_in_user.id ? (
        <Button
          onClick={this.handleDeleteCuration}
          icon
          color="red"
          size="small"
        >
          <Icon name="times" size="small" />
        </Button>
      ) : null;

    return (
      <div>
        <Header />
        <div className="curation-detail-page">
          <ProfileSummary user={this.props.currentCuration.author} />
          <div className="curation-detail-header">
            <div className="curation-detail-title">
              <h1>{this.props.currentCuration.title}</h1>
            </div>
            <div className="curation-detail-title-buttons">
              {editButton}
              {deleteButton}
            </div>
          </div>
          <Divider />
          <Container>
            <h5 className="curation-detail-content">
              {this.props.currentCuration.content}
            </h5>
          </Container>
          <div className="book-and-content">{bookAndContent}</div>

          <div className="CurationContainer">
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
    onDeleteCuration: curation_id =>
      dispatch(actionCreators.deleteSpecificCuration(curation_id)),
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
