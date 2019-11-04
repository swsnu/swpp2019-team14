// this button component is used in other containers and components

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types'; // this gives warning (type checking)

const myButton = (props) => {
  const { id, content, onClick } = props;
  return <Button id={id} onClick={onClick}>{content}</Button>;
};

// myButton.propTypes = {
//     id: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     onClick: PropTypes.function.isRequired
// }

export default myButton;
