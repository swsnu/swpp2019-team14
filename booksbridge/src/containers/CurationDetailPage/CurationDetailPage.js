import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react';

import Header from '../../components/Header';
import BookInfo from '../../components/BookDetail/BookInfo';
import Comments from '../Comments/Comments';
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary';

import * as actionCreators from '../../store/actions/actionCreators';

import './CurationDetailPage.css';

class CurationDetailPage extends Component {
  //   componentDidMount() {
  //     this.props.onLoadCuration(this.props.match.params.curation_id);
  //   }

  render() {
    return <div>Yes</div>;
    // if (!this.props.currentCuration) {
    //   return <div className="loading">LOADING...</div>;
    // }
    // const book = this.props.currentCuration.book;
    // return (
    //   <div className="CurationDetailPage">
    //     <Header />
    //     <div className="CurationTitleStyle">
    //       <h1>{this.props.currentCuration.title}</h1>
    //     </div>
    //     <div className="AuthorProfile">
    //       <ProfileSummary user={this.props.currentCuration.author} />
    //     </div>
    //     <div className="infoStyle">
    //       <BookInfo
    //         isbn={book.isbn}
    //         title={book.title}
    //         authors={book.authors}
    //         publisher={book.publisher}
    //         publishedDate={book.published_date}
    //         thumbnail={book.thumbnail}
    //       />
    //     </div>
    //     <div>
    //       <Button
    //         id="check-book-button"
    //         onClick={() => this.props.history.push(`/book/${book.isbn}`)}
    //       >
    //         Check this book!
    //       </Button>
    //     </div>
    //     <div className="CurationContainer">
    //       {this.props.currentCuration.content}
    //       <div className="LikeButton">
    //         <div className="ui labeled button" tabIndex="0">
    //           <div className="ui red button">
    //             <i className="heart icon" /> Like
    //           </div>
    //           <a className="ui basic red left pointing label">0</a>
    //         </div>
    //       </div>
    //       <div className="CurationComments">
    //         <Comments
    //           comments={this.props.currentCuration.comments}
    //           article_id={this.props.match.params.review_id}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

const mapStateToProps = state => {
  return {
    // TODO: create reducer for curation
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
