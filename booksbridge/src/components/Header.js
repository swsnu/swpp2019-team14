import React, { Component } from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alarm from './Alarm/Alarm';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Popup, Menu, Icon } from 'semantic-ui-react';
import ProfileSummary from './ProfileSummary/ProfileSummary';
import * as actionCreators from '../store/actions/actionCreators';

class Header extends Component {
  state = {
    show_menu: false,
    search_input: '',
  };

  componentDidMount() {
    this.props.onGetAlarms();
    this.timerID = setInterval(() => this.props.onGetAlarms(), 30000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onSearch = () => {
    if (this.state.search_input !== '')
      this.props.history.push(`/result/search=${this.state.search_input}/1`);
  };

  onClickProfile = () => {
    this.setState({ show_menu: !this.state.show_menu });
  };
  render() {
    const menu = (
      <div className="ProfileMenu">
        <Menu vertical>
          <Menu.Item
            onClick={() =>
              this.props.history.push(
                '/page/' + this.props.logged_in_user.username,
              )
            }
          >
            My Page
          </Menu.Item>
          <Menu.Item onClick={() => this.props.history.push('/library/')}>
            My Library
          </Menu.Item>
          <Menu.Item onClick={() => this.props.onLogout()}>LOGOUT</Menu.Item>
        </Menu>
      </div>
    );

    return (
      <div className="MainHeader">
        <a className="logo" href="/main">
          <img src="/images/logo2.png" height="80px" className="logo-image" />
        </a>
        <div className="search">
          <InputGroup>
            <FormControl
              id="search-input"
              aria-describedby="basic-addon2"
              type="text"
              value={this.state.search_input}
              onChange={({ target: { value } }) =>
                this.setState({ search_input: value })
              }
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.onSearch();
                }
              }}
            />
            <InputGroup.Append>
              <Button
                id="search-button"
                variant="outline-secondary"
                onClick={() => this.onSearch()}
              >
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <div className="headerProfile">
          <div className="HeaderProfileSummary">
            <Popup
              trigger={
                <div className="menu-trigger">
                  <div className="profile-hidden">
                    <ProfileSummary
                      user={this.props.logged_in_user}
                      menu={this.onClickProfile}
                    />
                  </div>
                  <Icon
                    name="angle down"
                    size="large"
                    className="header-icon"
                  />
                </div>
              }
              hoverable
              flowing
              basic
              on="click"
              position="bottom right"
              className="header-menu-popup"
              content={menu}
            ></Popup>
            <Popup
              trigger={
                <Icon
                  name="alarm"
                  size="big"
                  color={this.props.new_alarm ? 'yellow' : 'white'}
                  className="header-alarm-icon"
                />
              }
              hoverable
              flowing
              wide
              on="click"
              position="bottom right"
            >
              <div className="header-alarm-popup">
                {this.props.alarms ? (
                  this.props.alarms.map((alarm, index) => (
                    <Alarm
                      alarm={alarm}
                      onClickAlarm={this.props.onToggleAlarm}
                    />
                  ))
                ) : (
                  <p>알람이 없습니다.</p>
                )}
              </div>
              <div
                id="toggle-button"
                onClick={() => this.props.onToggleAlarms()}
              >
                모두 읽음으로 표시
              </div>
            </Popup>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged_in_user: state.user.logged_in_user,
    alarms: state.user.alarms,
    new_alarm: state.user.new_alarm,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(actionCreators.logoutUser());
    },
    onGetAlarms: () => {
      dispatch(actionCreators.getAlarms());
    },
    onToggleAlarm: id => {
      dispatch(actionCreators.toggleAlarm(id));
    },
    onToggleAlarms: () => {
      dispatch(actionCreators.toggleAlarmsAll());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
