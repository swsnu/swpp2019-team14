import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Image from 'react-bootstrap/Image';
import { UI, Feed, Button, Modal, Input } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/actionCreators';
import './BookTabsReview.css';
import Alert from 'react-bootstrap/Alert';

const BookTabsReview = props => (
  <Alert variant="secondary" className="article">
    <div className="ui feed">
      <div className="event">
        <div className="label">
          <img src="/images/profile.png" />
        </div>
        <div className="content">
          <div className="summary">
            <a>{props.author_name}</a>
            <div className="date">3 days ago</div>
          </div>
          <div className="ui items">
            <div className="item">
              <div className="box">
                <a
                  onClick={() => {
                    props.history.push(`/review/${props.id}`);
                  }}
                >
                  <h3>{props.title}</h3>
                </a>
                <div className="meta">
                  <span>{props.book_title}</span>
                </div>
                <div className="extra text">{props.content}</div>
              </div>
            </div>
          </div>
          <div>
            {props.is_long ? (
              <a
                className="extra"
                onClick={() => {
                  props.history.push(`/review/${props.id}`);
                }}
              >
                Additional Details
              </a>
            ) : null}
          </div>
          <div className="meta">
            <div className="ui labeled button" tabIndex="0">
              <div className="ui red button">
                <i className="heart icon" /> Like
              </div>
              <a className="ui basic red left pointing label">1,048</a>
            </div>
          </div>
        </div>
      </div>
      {props.is_long ? (
        <div className="ui comments">
          <h3 className="ui dividing header">Comments</h3>
        </div>
      ) : null}
    </div>
  </Alert>
);

export default withRouter(BookTabsReview);
