import React, { useState } from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Popup, Menu } from 'semantic-ui-react';
import ProfileSummary from './ProfileSummary/ProfileSummary';
import * as actionCreators from '../store/actions/actionCreators';

const Header = props => {
  const [show_menu, setMenu] = useState(false);
  const [search_input, setSearchInput] = useState('');

  const onSearch = () => {
    props.history.push(`/result/search=${search_input}/book/1`);
  };

  const onClickProfile = () => {
    setMenu(!show_menu);
  };

  const menu = (
    <div className="ProfileMenu">
      <Menu vertical>
        <Menu.Item
          onClick={() =>
            props.history.push('/page/' + props.logged_in_user.username)
          }
        >
          My Page
        </Menu.Item>
        <Menu.Item onClick={() => props.onLogout()}>LOGOUT</Menu.Item>
      </Menu>
    </div>
  );

  return (
    <div className="MainHeader">
      <a className="logo" onClick={() => props.history.push('/main')}>
        <img src="/images/logo2.png" height="80px" />
      </a>
      <div className="search">
        <InputGroup>
          <FormControl
            id="search-input"
            aria-describedby="basic-addon2"
            type="text"
            value={search_input}
            onChange={({ target: { value } }) => setSearchInput(value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                onSearch();
              }
            }}
          />
          <InputGroup.Append>
            <Button
              id="search-button"
              variant="outline-secondary"
              onClick={() => onSearch()}
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      <div className="headerProfile">
        <div className="HeaderProfileSummary" onClick={onClickProfile}>
          <ProfileSummary user={props.logged_in_user} />
        </div>
        {show_menu == true ? menu : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    logged_in_user: state.user.logged_in_user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(actionCreators.logoutUser());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
