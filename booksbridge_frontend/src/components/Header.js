import React from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';

const Header = (props) => {


    return (
        <div className="header">
            <div class="logo">
                <a class="top">BOOKS</a>
                <a class="bottom">BRIDGE</a>
            </div>
            <div class="search">
                <InputGroup >
                    <FormControl
                        aria-describedby="basic-addon2"
                        type="text"
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                            }}
                        >Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            <div class="profile">
                <h4>내 프로필</h4>
            </div>
        </div>
    );
};

export default Header;