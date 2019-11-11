import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react';

import Header from '../components/Header';
import UserInfo from '../components/UserPage/UserInfo';
import UserReviewList from '../components/UserPage/UserReviewList';

import * as actionCreators from '../store/actions/actionCreators';
import './UserPage.css';

class UserPage extends Component {
    constructor(params) {
        super(params);
        this.props.onLoadUser(this.props.match.params.user_id);
    }

    componentDidMount() {
    }

    // Q. how to enforce reendering after loading props state?

    render() {
        // need to implement whether user_id from url is valid or not

        console.log('[DEBUG from userpage] user_id: ' + this.props.match.params.user_id);
        console.log('[DEBUG from userpage] user: ' + this.props.profile_user);

        return (
            <div className="userPage">
                <Header />
                <div className="userInfo">
                    <UserInfo
                        profile_user={this.props.profile_user}
                    />
                </div>
                <div className="userReviewList">
                    <UserReviewList
                        profile_user={this.props.profile_user}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profile_user: state.user.profile_user,
});

const mapDispatchToProps = dispatch => {
    return {
        onLoadUser: user_id => dispatch(actionCreators.getSpecificUser(user_id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(UserPage));
