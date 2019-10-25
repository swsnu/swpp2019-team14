// this checkbox is used in other containers and components
// <Button> should be changed to appropriate form

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';  // this gives warning (type checking)

const Checkbox = (props) => {
    const { id, content, onClick } = props;
    return (
        <div>
            <Button id={id} onClick={onClick} />
            {content}
        </div>
    )
}

// Button.propTypes = {
//     id: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     onClick: PropTypes.function.isRequired
// }

export default Checkbox;