import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal, Header, Image, Card } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/actionCreators';
import { withRouter } from 'react-router';

import './SelectLibraryModal.css';
import AddLibraryModal from '../Library/AddLibraryModal';

class SelectLibraryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount = () => {
    this.props.onLoadLibrary();
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  // need to check if the book is already in the library
  onLibraryClicked = library => {
    const book = {
      isbn: this.props.book.isbn,
      title: this.props.book.title,
      thumbnail: this.props.book.thumbnail,
    };
    const title_books_dict = {
      title: library.title,
      books: library.books.concat(book),
    };

    this.props.onEditLibrary(library.id, title_books_dict);
    alert('Library에 책을 추가하였습니다!');
    this.close();
  };

  render() {
    const { open } = this.state;
    const button = (
      <Button icon labelPosition="left">
        <Icon name="plus" />
        라이브러리에 추가하기
      </Button>
    );
    const libraries_html = this.props.libraries.map((library, index) => {
      let images_html = library.books.slice(0, 5).map((book, _index) => {
        return (
          <div className="BookCoverWrapper" key={_index}>
            <Image
              src={book.thumbnail}
              className="BookCover"
              onClick={() => this.props.history.push('/book/' + book.isbn)}
            />
          </div>
        );
      });

      return (
        <div className="CardContentWrapper" key={index}>
          <Card
            link
            className="CardContent"
            onClick={() => this.onLibraryClicked(library)}
          >
            <Card.Content>
              <div className="CardArea">
                <Card.Header>
                  <div className="CardTitle">{library.title}</div>
                </Card.Header>
              </div>
            </Card.Content>
            <Card.Content>
              <div className="BookCoverArea">
                <div className="BookCoverList">{images_html}</div>
              </div>
            </Card.Content>
          </Card>
        </div>
      );
    });

    return (
      <div className="LibraryModalWrapper">
        <Modal
          trigger={button}
          className="LibraryModal"
          open={open}
          onOpen={this.open}
          onClose={this.close}
        >
          <Modal.Header>책을 추가할 라이브러리를 선택하세요.</Modal.Header>
          <Modal.Content scrolling className="LibraryList">
            {libraries_html}
          </Modal.Content>
          <Modal.Actions className="LibraryModalAction">
            <AddLibraryModal
              mode={'ADD'}
              calledFromBookDetail={this.props.calledFromBookDetail}
            />
            <Button primary onClick={this.close}>
              닫기 <Icon name="chevron right" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedin_user: state.user.loggedin_user,
    libraries: state.library.libraries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadLibrary: () => dispatch(actionCreators.getLibraries()),
    onEditLibrary: (library_id, title_books_dict) =>
      dispatch(
        actionCreators.editSpecificLibrary(library_id, title_books_dict),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SelectLibraryModal));
