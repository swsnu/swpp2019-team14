import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';

import Header from '../../components/Header';
import AddLibraryModal from '../../components/Library/AddLibraryModal';

import './Library.css';

import * as actionCreators from '../../store/actions/actionCreators';

class Library extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Library));
