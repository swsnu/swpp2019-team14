import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from '../../components/Header';
import AddLibraryModal from '../../components/Library/AddLibraryModal';
import LibraryUnit from '../../components/Library/LibraryUnit';

import './Library.css';

import * as actionCreators from '../../store/actions/actionCreators';

class Library extends Component {
  constructor(props) {
    super(props);
    this.props.onLoadLibrary();
    this.state = {
      openConfirm: false,
    };
  }

  openConfirm = () => this.setState({ ...this.state, openConfirm: true });
  closeConfirm = () => this.setState({ ...this.state, openConfirm: false });
  onDeleteLibrary = library_id => {
    this.props.onDeleteLibrary(library_id);
    this.closeConfirm();
  };

  render() {
    const libraries_html = this.props.libraries.map((library, index) => (
      <LibraryUnit
        library={library}
        index={index}
        authorize={true}
        onDeleteLibrary={library_id => this.onDeleteLibrary(library_id)}
      />
    ));

    return (
      <div className="Library">
        <Header />
        <div className="Content">
          <div className="LibraryContainer">
            <div className="LibraryContainerHeader">
              <div className="LibraryContainerHeaderWrapper">
                <AddLibraryModal mode={'ADD'} />
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
    selectedBook: state.book.selectedBook,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadUser: username => dispatch(actionCreators.getSpecificUser(username)),
    onLoadLibrary: () => dispatch(actionCreators.getLibraries()),
    onDeleteLibrary: library_id =>
      dispatch(actionCreators.deleteSpecificLibrary(library_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Library));
