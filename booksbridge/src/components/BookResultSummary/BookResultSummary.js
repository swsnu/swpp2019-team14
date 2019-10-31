import React from "react";
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { withRouter } from 'react-router';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './BookResultSummary.css';
import * as actionCreators from '../../store/actions/actionCreators';

const BookResultSummary = (props) => {

    const clickHandler = () => {
        if (props.direct) {
            props.history.push('/book/' + props.isbn);
        } else {
            props.onGetSpecificBook(props.isbn);
        }    
    }

    let cover;
    if(props.cover==='') cover = "/images/no_cover.jpg";
    else cover = props.cover;
    var pattern = /[\[\]\']/g;
    const authors = props.authors.replace(pattern,'');

    return (
        <div className="outer">
            <Container className="Summary">
                <div className="inside" onClick={clickHandler}>
                <Row>
                    <Col md="auto" className="book_cover">
                        <Image src={cover}/>
                    </Col>
                    <Col className="book_info">
                        <div className="book_title">{props.title}</div>
                        <div className="book_summary">
                            {authors}
                            <br/>
                            {props.publisher}
                        </div>
                    </Col>
                </Row>
                </div>
            </Container>
        </div>
    );
}
const mapDispatchToProps = dispatch => {
  return {
    onGetSpecificBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
  }
}

export default connect(null, mapDispatchToProps)(withRouter(BookResultSummary));
