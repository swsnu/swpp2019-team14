import React from 'react';
import { Button } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Copy = props => {
  return (
    <div id="copy-to-clipboard">
      <CopyToClipboard text={props.text}>
        <Button id="copy" onClick={props.clickCopy}>
          클립보드에 복사
        </Button>
      </CopyToClipboard>
    </div>
  );
};

export default Copy;
