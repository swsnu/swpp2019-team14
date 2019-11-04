import React, { useState } from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileSummary from './ProfileSummary/ProfileSummary';
import { Dropdown, Menu } from 'semantic-ui-react';

const Header = (props) => {

    const [search_input, setSearchInput] = useState('');

    const onSearch = () => {
        props.history.push('/result/search=' + search_input + '/book/1');
    };

    var user_load = false;
    let profile_photo;
    let nickname;
    let username;

    if (!user_load && props.logged_in_user) {
        nickname = props.logged_in_user.nickname;
        username = props.logged_in_user.username;
        profile_photo = '/static/' + username + '.jpg';
        user_load = true;
    }

    return (
        <div className="header">
            <div className="logo"
                onClick={() => props.history.push('/main')}>
                <img src="/images/logo.png" width="170px"></img>
            </div>
            <div className="search">
                <InputGroup >
                    <FormControl
                        aria-describedby="basic-addon2"
                        type="text"
                        value={search_input}
                        onChange={({ target: { value } }) => setSearchInput(value)}
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                onSearch()
                            }
                        }
                        }
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={() => onSearch()}
                        >Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>

            <ProfileSummary profile_photo={profile_photo} nickname={nickname} username={username} />

            </div>
            );
        };
        
const mapStateToProps = state => {
    return {
                logged_in_user: state.user.logged_in_user,
        };
    };
    
export default connect(mapStateToProps, null)(withRouter(Header));