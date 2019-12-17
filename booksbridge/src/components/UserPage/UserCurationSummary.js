import React, { useState } from 'react';
import './UserCurationSummary.css';
import { Label, Popup, Icon, Confirm } from 'semantic-ui-react';

const UserCurationSummary = props => {
  const [delete_confirm, openConfirm] = useState(false);
  const onConfirm = () => {
    openConfirm(false);
    props.deleteHandler(props.id);
  };

  let books_title =
    props.books[0].book.title + ' 등 총 ' + props.books.length + '권';
  return (
    <div className="UserCurationSummary">
      <Confirm
        className="DeleteReviewConfirm"
        size={'small'}
        cancelButton="취소"
        confirmButton="삭제"
        content="정말로 큐레이션을 삭제하시겠습니까? 삭제한 큐레이션은 되돌릴 수 없습니다."
        open={delete_confirm}
        onCancel={() => openConfirm(false)}
        onConfirm={() => onConfirm()}
      />
      <div className="CurationSummary">
        <div className="CurationSummaryHeader">
          <a href={'/curation/' + props.id}>
            <p className="CurationTitle">{props.title}</p>
          </a>
          <div className="UserPageEditDeleteButton">
            {props.author.username === props.logged_in_user.username ? (
              <div className="CurationEditDeleteButton">
                <Popup
                  content="수정"
                  position={'top center'}
                  trigger={
                    <a
                      className="ReviewEditIcon"
                      href={
                        '/curation/' +
                        props.author.username +
                        '/' +
                        props.id +
                        '/edit/'
                      }
                    >
                      <Icon id="edit-curation-button" name="pencil" />
                    </a>
                  }
                />
                <Popup
                  content="삭제"
                  position={'top center'}
                  trigger={
                    <Icon
                      id="delete-curation-button"
                      name="delete"
                      onClick={() => openConfirm(true)}
                    />
                  }
                />
              </div>
            ) : null}
          </div>
        </div>
        <p className="BookTitle">{books_title}</p>
        <p className="CurationContent">{props.content}</p>
      </div>
    </div>
  );
};

export default UserCurationSummary;
