import React from 'react';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { withRouter } from 'react-router';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './BookResultSummary.css';
import * as actionCreators from '../../store/actions/actionCreators';

const Article = (props) => {
  const clickHandler = () => {
    if (props.direct) {
      props.history.push(`/book/${props.isbn}`);
    } else {
      props.onGetSpecificBook(props.isbn);
    }
  };

  let cover;
  if (props.cover === '') cover = '/images/no_cover.jpg';
  else cover = props.cover;
  const pattern = /[\[\]\']/g;
  const authors = props.authors.replace(pattern, '');

  return (
    <div className="comment">
      <a className="avatar">
        <img src="/images/avatar/small/matt.jpg" />
      </a>
      <div className="content">
        <a className="author">Matt</a>
        <div className="metadata">
          <span className="date">Today at 5:42PM</span>
        </div>
        <div className="text">How artistic!</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onGetSpecificBook: (isbn) => dispatch(actionCreators.getSpecificBook(isbn)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Article));
