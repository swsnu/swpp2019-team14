import React from 'react';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { withRouter } from 'react-router';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './BookResultSummary.css';
import * as actionCreators from '../../store/actions/actionCreators';

const BookResultSummary = props => {
  const clickHandler = () => {
    if (props.direct) {
      props.history.push(`/book/${props.isbn}`);
    } else {
      props.onGetSpecificBook(props.isbn);
      props.click();
    }
  };

  let cover;
  if (props.cover === '') cover = '/images/no_cover.jpg';
  else cover = props.cover;

  return (
    <div className={props.size === 'small' ? 'outer-small' : 'outer'}>
      <Container
        className={props.size === 'small' ? 'Summary-small' : 'Summary'}
      >
        <div
          id="inside"
          className={props.size === 'small' ? 'inside-small' : 'inside'}
          onClick={clickHandler}
        >
          <Row>
            <Col
              md="auto"
              className={
                props.size === 'small' ? 'book_cover-small' : 'book_cover'
              }
            >
              <Image
                src={cover}
                className={
                  props.size === 'small' ? 'book_image-small' : 'book_image'
                }
                fluid={props.size === 'small'}
              />
            </Col>
            <Col
              className={
                props.size === 'small' ? 'book_info-small' : 'book_info'
              }
            >
              <div
                className={
                  props.size === 'small' ? 'book_title-small' : 'book_title'
                }
              >
                {props.title}
              </div>
              <div
                className={
                  props.size === 'small' ? 'book_summary-small' : 'book_summary'
                }
              >
                {props.authors}
                <br />
                {props.publisher}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  onGetSpecificBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(BookResultSummary));
