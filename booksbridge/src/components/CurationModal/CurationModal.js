import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Sticky } from 'semantic-ui-react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import * as actionCreators from '../../store/actions/actionCreators';
import ChooseBookModal from '../ChooseBookModal';
import BookResultSummary from '../BookResultSummary/BookResultSummary';
import './CurationModal.css';

class CurationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedBooks: [],
      searchedBooksCount: 0,
      delete: false,
    };
  }

  componentWillUpdate(nextProps, nextState, snapshot) {
    if (this.state.open) {
      if (this.state.delete && this.state.selectedBooks.length > 0) {
        this.setState({
          selectedBooks: this.state.selectedBooks.filter(book => {
            return book.isbn !== nextProps.selectedBook.isbn;
          }),
          delete: false,
        });
      } else if (
        nextProps.selectedBook &&
        nextProps.selectedBook !== this.props.selectedBook
      ) {
        this.state.selectedBooks.push(nextProps.selectedBook);
      }
    }
  }
  openHandler = () => {
    this.setState({ open: true });
    this.props.onEmptySearchedBooks();
  };

  seeMoreHandler = () => {
    this.props.onSearchBooks(this.state.keyword, this.state.requestNum);
    this.setState({ requestNum: this.state.requestNum + 1 });
  };

  render() {
    return (
      <div>
        <Button className="select-book-button" onClick={this.openHandler}>
          Select Book
        </Button>
        <Modal id="curation-modal" size={'large'} open={this.state.open}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="left-page">
              <Col sm={1} className="curation-modal-tabs">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={11} className="curation-modal-tab-contents">
                <Tab.Content className="curation-modal-tab-contents">
                  <Tab.Pane
                    className="curation-modal-tab-contents"
                    eventKey="first"
                  >
                    <div className="search-book-tab">
                      <ChooseBookModal
                        selected={() => {}}
                        close={() => {
                          this.setState({ open: false });
                          this.props.update(this.state.selectedBooks);
                        }}
                      />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane
                    className="curation-modal-tab-contents"
                    eventKey="second"
                  >
                    <div className="search-book-tab">
                      <ChooseBookModal
                        selected={() => {}}
                        close={() => {
                          this.setState({ open: false });
                        }}
                      />
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          <div className="selected-book-tab">
            <Modal.Content scrolling className="choose-book-modal-content">
              {this.state.selectedBooks.length > 0
                ? this.state.selectedBooks.map(book => {
                    return (
                      <BookResultSummary
                        cover={book.thumbnail}
                        title={book.title}
                        authors={book.authors}
                        publisher={book.publisher}
                        isbn={book.isbn}
                        direct={false}
                        click={() => {
                          this.setState({ delete: true });
                        }}
                      />
                    );
                  })
                : null}
            </Modal.Content>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedBook: state.book.selectedBook,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSearchBooks: (keyword, page) =>
      dispatch(actionCreators.getSearchedBooks(keyword, page)),
    onGetSpecificBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
    onEmptySearchedBooks: () => dispatch(actionCreators.emptySearchedBooks()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurationModal);
