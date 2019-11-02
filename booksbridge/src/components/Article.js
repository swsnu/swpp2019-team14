import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Image from "react-bootstrap/Image";
import { UI, Feed, Button, Modal, Input } from "semantic-ui-react";
import * as actionCreators from "../store/actions/actionCreators";
import "./Article.css";
import Alert from 'react-bootstrap/Alert';

const Article = props => {
  const clickHandler = () => {
    if (props.direct) {
      props.history.push("/book/" + props.isbn);
    } else {
      props.onGetSpecificBook(props.isbn);
    }
  };

  return (
    <Alert variant="secondary" className="article">
      <div class="ui feed">
        <div class="event">
          <div class="label">
            <img src="/images/profile.png" />
          </div>
          <div class="content">
            <div class="summary">
              <a>{props.author}</a>
              <div class="date">3 days ago</div>
            </div>
            <div class="ui items">
              <div class="item">
                <div class="book_cover">
                  <img src="/images/no_cover.jpg" />
                </div>
                <div class="box">
                  <a class="header">{props.title}</a>
                  <div class="meta">
                    <span>{props.book}</span>
                  </div>
                  <div class="extra text">{props.content}</div>
                  <div class="extra">Additional Details</div>
                </div>
              </div>
            </div>
            <div class="meta">
              <div class="ui labeled button" tabindex="0">
                <div class="ui red button">
                  <i class="heart icon"></i> Like
                </div>
                <a class="ui basic red left pointing label">1,048</a>
              </div>
            </div>
          </div>
        </div>
        <div class="ui comments">
          <h3 class="ui dividing header">Comments</h3>
        </div>
      </div>
    </Alert>
  );
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Article));
