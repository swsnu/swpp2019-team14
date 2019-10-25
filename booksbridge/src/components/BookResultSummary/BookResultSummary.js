import React from "react";
import Image from 'react-bootstrap/Image';
import { withRouter } from 'react-router';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const BookResultSummary = (props) => {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={props.cover}/>
                    </Col>
                    <Col>
                        <div id="book_title">{props.title}</div>
                        <div id="book_summary">
                            {props.authors}
                            <br/>
                            {props.publisher}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default withRouter(BookResultSummary);
