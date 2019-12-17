import React, { useState } from 'react';
import './UserReviewSummary.css';
import { Label, Popup, Icon, Confirm } from 'semantic-ui-react';

const UserReviewSummary = props => {
  const [delete_confirm, openConfirm] = useState(false);
  const onConfirm = () => {
    openConfirm(false);
    props.deleteHandler(props.id);
  };
  return (
    <div className="UserReviewSummary">
      <Confirm
        className="DeleteReviewConfirm"
        size={'small'}
        cancelButton="취소"
        confirmButton="삭제"
        content="정말로 리뷰를 삭제하시겠습니까? 삭제한 리뷰는 되돌릴 수 없습니다."
        open={delete_confirm}
        onCancel={() => openConfirm(false)}
        onConfirm={() => onConfirm()}
      />
      <div className="ReviewSummary">
        <div className="LabelAndButton">
          <div className="ReviewTypeLabel">
            {props.is_long === true ? (
              <Label size="mini">Long Review</Label>
            ) : null}
            {props.is_short === true ? (
              <Label size="mini">Short Review</Label>
            ) : null}
            {props.is_phrase === true ? (
              <Label size="mini">Phrase</Label>
            ) : null}
          </div>
          <div className="UserPageEditDeleteButton">
            {props.author.username === props.logged_in_user.username ? (
              <div className="ArticleEditDeleteButton">
                <Popup
                  content="수정"
                  position={'top center'}
                  trigger={
                    <a
                      className="ReviewEditIcon"
                      href={'/review/edit/' + props.id}
                    >
                      <Icon id="edit-review-button" name="pencil" />
                    </a>
                  }
                />
                <Popup
                  content="삭제"
                  position={'top center'}
                  trigger={
                    <Icon
                      id="delete-review-button"
                      name="delete"
                      onClick={() => openConfirm(true)}
                    />
                  }
                />
              </div>
            ) : null}
          </div>
        </div>
        <a href={'/review/' + props.id}>
          <h3 className="ReviewTitle">{props.title}</h3>
        </a>
        <a href={'/book/' + props.book_isbn}>
          <p className="BookTitle">{props.book_title}</p>
        </a>
        {props.is_long === true ? (
          <p className="ReviewContent">{props.content}</p>
        ) : (
          <p className="ShortContent">{props.content}</p>
        )}
      </div>
    </div>
  );
};

export default UserReviewSummary;
