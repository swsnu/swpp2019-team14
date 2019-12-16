import React from 'react';

import { Card, Image } from 'semantic-ui-react';
import AddLibraryModal from '../../components/Library/AddLibraryModal';
import ConfirmDelete from '../../components/Library/ConfirmDelete';
import './LibraryUnit.css';

const LibraryUnit = props => {
  let images_html = props.library.books.slice(0, 5).map((book, _index) => {
    return props.authorize ? (
      <a className="BookCoverWrapper" key={_index} href={'/book/' + book.isbn}>
        <Image src={book.thumbnail} className="BookCover" />
      </a>
    ) : (
      <a className="BookCoverWrapper" key={_index}>
        <Image src={book.thumbnail} className="BookCover" />
      </a>
    );
  });

  return (
    <div className="CardContentWrapper" key={props.index}>
      <Card className="CardContent">
        <Card.Content>
          <div className="CardArea">
            <Card.Header>
              <div className="CardTitle">{props.library.title}</div>
            </Card.Header>
            {props.authorize ? (
              <div className="CardButtons">
                <div className="CardButton">
                  <AddLibraryModal
                    id={props.library.id}
                    title={props.library.title}
                    books={props.library.books}
                    mode={'EDIT'}
                  />
                </div>
                <div className="CardButton">
                  <ConfirmDelete
                    id="confirm-delete-library"
                    onConfirm={() => props.onDeleteLibrary(props.library.id)}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </Card.Content>
        <Card.Content>
          <div className="BookCoverArea">
            <div className="BookCoverList">{images_html}</div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default LibraryUnit;
