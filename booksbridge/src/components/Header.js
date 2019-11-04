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

    return (
        <div className="header">
            <a className="logo"
                onClick={() => props.history.push('/main')}>
                <img src="/images/logo.png" width="170px"></img>
            </a>
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
            <div className="headerProfile">
            <ProfileSummary user = {props.logged_in_user} />
            </div>
            </div>
            );
        };
        
const mapStateToProps = state => {
    return {
                logged_in_user: state.user.logged_in_user,
        };
    };
    
export default connect(mapStateToProps, null)(withRouter(Header));