import React, { useState } from 'react';
import './BookTabsReview.css';
import Alert from 'react-bootstrap/Alert';
import Time from '../Time';
import ProfileSummary from '../ProfileSummary/ProfileSummary';
import { Icon, Confirm, Popup } from 'semantic-ui-react';

const BookTabsReview = props => {
  const [delete_confirm, openConfirm] = useState(false);
  const Author = <ProfileSummary user={props.author} />;

  let type;
  if (props.is_long) type = 'long';
  else if (props.is_short) type = 'short';
  else type = 'phrase';

  const onConfirm = () => {
    openConfirm(false);
    props.deleteHandler(props.id, type);
  };

  return (
    <div className="Review">
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
      <Alert variant="light" className="article">
        <div>
          <div>
            <div className="AuthorProfileMain">
              <div>{Author}</div>
              <div>
                {props.author.username === props.logged_in_user.username ? (
                  <div className="ArticleDeleteButton">
                    <Popup
                      content="수정"
                      position={'top center'}
                      trigger={
                        <a
                          className="ReviewEditIcon"
                          href={'/review/edit/' + props.id}
                        >
                          <Icon name="pencil" />
                        </a>
                      }
                    />
                    <Popup
                      content="삭제"
                      position={'top center'}
                      trigger={
                        <Icon name="delete" onClick={() => openConfirm(true)} />
                      }
                    />
                  </div>
                ) : null}
                <div className="BookTabsReviewDate">
                  <Time date={props.date} />
                </div>
              </div>
            </div>
            <div className="content">
              <div className="box">
                {props.is_long ? (
                  <a href={'/review/' + props.id}>
                    <h3 className="ReviewTitle">{props.title}</h3>
                  </a>
                ) : null}
                <div>
                  <span>{props.book_title}</span>
                </div>
                {!props.is_long ? (
                  <div className="PhraseContent">{props.content}</div>
                ) : (
                  <div className="ReviewContent">{props.content}</div>
                )}
              </div>
              {props.like_or_not ? (
                <div
                  className="ReviewLikeButton"
                  onClick={() => props.likeHandler(true, props.id)}
                >
                  <Icon color="red" name="like" />
                  {props.like_count}
                </div>
              ) : (
                <div
                  className="ReviewLikeButton"
                  onClick={() => props.likeHandler(false, props.id)}
                >
                  <Icon name="like" />
                  {props.like_count}
                </div>
              )}
            </div>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default BookTabsReview;
