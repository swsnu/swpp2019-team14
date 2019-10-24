import React, {useState} from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';
import {withRouter} from 'react-router-dom';

const Header = (props) => {

    const [search_input, setSearchInput] = useState('');

    const onSearch = () => {
        props.history.push('/result/search='+search_input);
    };

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
                        value={search_input}
                        onChange={({target:{value}})=>setSearchInput(value)}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={() => onSearch()}
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

export default withRouter(Header);