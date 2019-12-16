import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Sticky } from 'semantic-ui-react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import * as actionCreators from '../../store/actions/actionCreators';
import ChooseBookModal from '../ChooseBookModal/ChooseBookModal';
import BookResultSummary from '../BookResultSummary/BookResultSummary';
import LibraryUnit from '../Library/LibraryUnit';
import './CurationModal.css';

class CurationModal extends Component {
  state = {
    open: false,
    selectedBooks: [],
  };

  componentDidMount() {
    this.props.onLoadLibrary();
    this.props.onGetLikedBooks();
  }

  openHandler = () => {
    this.setState({ open: true });
    this.props.onEmptySearchedBooks();
  };

  onEdit() {
    this.setState({
      ...this.state,
      selectedBooks: this.props.initialBooks,
    });
  }

  render() {
    if (
      this.props.initialBooks &&
      this.props.initialBooks.length > 0 &&
      this.state.selectedBooks.length === 0
    )
      this.onEdit();

    return (
      <div className="curation-modal-all">
        <Button
          className="select-book-button"
          onClick={this.openHandler}
          size="big"
          color="red"
        >
          책 고르기
        </Button>
        <Modal id="curation-modal" size={'large'} open={this.state.open}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="left-page">
              <Col sm={1} className="curation-modal-tabs">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">검색</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">서재</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">즐겨찾기</Nav.Link>
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
                        selected={book => {
                          this.setState((state, props) => ({
                            selectedBooks: state.selectedBooks.concat(book),
                          }));
                        }}
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
                      <div className="curation-modal-scroll">
                        {this.props.libraries ? (
                          this.props.libraries.map((library, index) => (
                            <a
                              onClick={() => {
                                this.setState((state, props) => ({
                                  selectedBooks: state.selectedBooks.concat(
                                    library.books,
                                  ),
                                }));
                              }}
                            >
                              <LibraryUnit
                                library={library}
                                index={index}
                                authorize={false}
                              />
                            </a>
                          ))
                        ) : (
                          <p>라이브러리가 없습니다.</p>
                        )}
                      </div>
                    </div>
                    <Button
                      className="close-select-book-button"
                      onClick={() => {
                        this.setState({ open: false });
                        this.props.update(this.state.selectedBooks);
                      }}
                    >
                      Close
                    </Button>
                  </Tab.Pane>
                  <Tab.Pane
                    className="curation-modal-tab-contents"
                    eventKey="third"
                  >
                    <div className="search-book-tab">
                      <div className="curation-modal-scroll">
                        {this.props.likedBooks
                          ? this.props.likedBooks.map(book => {
                              return (
                                <BookResultSummary
                                  cover={book.thumbnail}
                                  title={book.title}
                                  authors={book.authors}
                                  publisher={book.publisher}
                                  isbn={book.isbn}
                                  direct={false}
                                  size="small"
                                  click={() => {
                                    this.setState((state, props) => ({
                                      selectedBooks: state.selectedBooks.concat(
                                        book,
                                      ),
                                    }));
                                  }}
                                />
                              );
                            })
                          : null}
                      </div>
                    </div>
                    <Button
                      className="close-select-book-button"
                      onClick={() => {
                        this.setState({ open: false });
                        this.props.update(this.state.selectedBooks);
                      }}
                    >
                      Close
                    </Button>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          <div className="selected-book-tab">
            <Modal.Content scrolling className="selected-book-modal-content">
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
                        size="small"
                        click={() => {
                          this.setState((state, props) => ({
                            selectedBooks: state.selectedBooks.filter(
                              selectedBook => {
                                return book.isbn !== selectedBook.isbn;
                              },
                            ),
                          }));
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
    libraries: state.library.libraries,
    likedBooks: state.book.likedBooks,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onEmptySearchedBooks: () => dispatch(actionCreators.emptySearchedBooks()),
    onLoadLibrary: () => dispatch(actionCreators.getLibraries()),
    onGetLikedBooks: () => dispatch(actionCreators.getLikedBooks()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurationModal);
