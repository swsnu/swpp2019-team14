import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Card, Image, Button, Icon } from 'semantic-ui-react';

import Header from '../../components/Header';
import AddLibraryModal from '../../components/Library/AddLibraryModal';
import EditLibraryModal from '../../components/Library/EditLibraryModal';

import './Library.css';

import * as actionCreators from '../../store/actions/actionCreators';

class Library extends Component {
  constructor(props) {
    super(props);
    this.props.onLoadLibrary(this.props.logged_in_user.id);
  }

  onDeleteLibrary = library_id => this.props.onDeleteLibrary(library_id);

  render() {
    const libraries_html = this.props.libraries.map((library_dict, index) => {
      let images_html = library_dict.books.slice(0, 5).map((book, _index) => {
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
          <Card className="CardContent">
            <Card.Content>
              <div className="CardArea">
                <Card.Header>
                  <div className="CardTitle">{library_dict.title}</div>
                </Card.Header>
                <div className="CardButtons">
                  <div className="CardButton">
                    <EditLibraryModal
                      id={library_dict.id}
                      title={library_dict.title}
                      books={library_dict.books}
                    />
                  </div>
                  <div className="CardButton">
                    <Button
                      size="mini"
                      icon
                      color="red"
                      onClick={() => this.onDeleteLibrary(library_dict.id)}
                    >
                      <Icon name="times" size="small" />
                    </Button>
                  </div>
                </div>
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
      <div className="Library">
        <Header />
        <div className="Content">
          <div className="LibraryContainer">
            <div className="LibraryContainerHeader">
              <div className="LibraryContainerHeaderWrapper">
                <AddLibraryModal />
              </div>
            </div>
            <div className="LibraryContainerContent">{libraries_html}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged_in_user: state.user.logged_in_user,
    libraries: state.library.libraries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadUser: username => dispatch(actionCreators.getSpecificUser(username)),
    onLoadLibrary: user_id =>
      dispatch(actionCreators.getLibrariesByUserID(user_id)),
    onDeleteLibrary: library_id =>
      dispatch(actionCreators.deleteSpecificLibrary(library_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Library));
