import React from "react";
import Image from 'react-bootstrap/Image';
import { withRouter } from 'react-router';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './BookResultSummary.css';

const BookResultSummary = (props) => {

    let cover;
    if(props.cover==='') cover = "/images/no_cover.jpg";
    else cover = props.cover;
    var pattern = /[\[\]\']/g;
    const authors = props.authors.replace(pattern,'');

    return (
        <div className="outer">
            <Container className="Summary">
                <div className="inside" onClick={()=>props.history.push('/book/'+props.isbn)}>
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

export default withRouter(BookResultSummary);
