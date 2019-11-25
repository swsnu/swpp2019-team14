import React from 'react';
import { Header } from 'semantic-ui-react';

import './ContainerHeader.css';

const ContainerHeader = props => {
  return (
    <Header className="ContainerHeader" as="h2" dividing>
      {props.title}
    </Header>
  );
};

export default ContainerHeader;
