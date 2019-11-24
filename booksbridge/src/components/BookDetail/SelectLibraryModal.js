import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal, Header, Image, Card } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/actionCreators';
import { withRouter } from 'react-router';

import './SelectLibraryModal.css';

class SelectLibraryModal extends Component {
  constructor(props) {
    super(props);
    //this.props.onLoadUserLibrary('PeaceSong');
  }

  state = {
    open: false,
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  onClickAddToLibrary = () => {
    console.log('[DEBUG] onClickAddTLibrary called.');
    return;
  };

  LibraryClicked(title) {
    console.log('[DEBUG] library clicked: ' + title);
    console.log('[DEBUG] book to put to library: ' + this.props.isbn);
    const library_id = 1;
    const isbn_library = {
      isbn: this.props.isbn,
      library: library_id,
    };

    //need to check if a book is already on the library
    //this.props.onStoreBookToLibrary(isbn_library);
    alert('Library에 책을 추가하였습니다!');
    this.close();
  }

  render() {
    const { open } = this.state;

    const button = (
      <Button
        icon
        labelPosition="left"
        onClick={() => this.onClickAddToLibrary()}
      >
        <Icon name="plus" />
        Add to Library
      </Button>
    );

    // TODO: get username string by using loggedin_user state, make some libraries to test.
    const mockLibrariesUsername = [
      {
        title: 'My library 1',
        date: '2019-11-19 17:32:33',
      },
      {
        title: 'My library 2',
        date: '2019-11-17 13:31:03',
      },
      {
        title: 'My library 3',
        date: '2019-11-17 13:31:03',
      },
      {
        title: 'My library 4',
        date: '2019-11-17 13:31:03',
      },
      {
        title: 'My library 5',
        date: '2019-11-17 13:31:03',
      },
      {
        title: 'My library 6',
        date: '2019-11-17 13:31:03',
      },
      {
        title: 'My library 7',
        date: '2019-11-17 13:31:03',
      },
    ];

    const mockLibraryBookPickture = [
      'https://search1.kakaocdn.net/thumb/C116x164.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F478524%3Ftimestamp%3D20190420101113%3Fmoddttm=201911201629',
      'https://search1.kakaocdn.net/thumb/C116x164.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F478524%3Ftimestamp%3D20190420101113%3Fmoddttm=201911201629',
      'https://search1.kakaocdn.net/thumb/C116x164.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F478524%3Ftimestamp%3D20190420101113%3Fmoddttm=201911201629',
      'https://search1.kakaocdn.net/thumb/C116x164.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F478524%3Ftimestamp%3D20190420101113%3Fmoddttm=201911201629',
      'https://search1.kakaocdn.net/thumb/C116x164.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F478524%3Ftimestamp%3D20190420101113%3Fmoddttm=201911201629',
    ];

    const images_html = mockLibraryBookPickture.map((picture_url, index) => {
      return (
        <div className="BookCoverWrapper" key={index}>
          <Image src={picture_url} className="BookCover" />
        </div>
      );
    });

    // Should change to proper library object, and change the argument of LibraryClicked to library_id
    const libraries_html = mockLibrariesUsername.map(library_dict => {
      return (
        <div className="LibraryContentWrapper" key={library_dict.title}>
          <Card
            link
            className="LibraryContent"
            onClick={() => this.LibraryClicked(library_dict.title)}
          >
            <Card.Content>
              <div className="LibraryArea">
                <Card.Header>
                  <div className="LibraryTitle">{library_dict.title}</div>
                </Card.Header>
                <Card.Meta>{library_dict.date}</Card.Meta>
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
          <Modal.Actions>
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
    libraries_username: state.library.libraries_username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadUserLibrary: username =>
      dispatch(actionCreators.getLibrariesByUsername(username)),
    onStoreBookToLibrary: isbn_library =>
      dispatch(actionCreators.addBookToLibrary(isbn_library)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SelectLibraryModal));
