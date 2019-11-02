import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Image from "react-bootstrap/Image";
import { UI, Feed, Button, Modal, Input } from "semantic-ui-react";
import * as actionCreators from "../store/actions/actionCreators";
import "./Article.css";
import Alert from 'react-bootstrap/Alert';

const Article = props => {

  return (
    <Alert variant="secondary" className="article">
      <div class="ui feed">
        <div class="event">
          <div class="label">
            <img src="/images/profile.png" />
          </div>
          <div class="content">
            <div class="summary">
              <a>{props.author_name}</a>
              <div class="date">3 days ago</div>
            </div>
            <div class="ui items">
              <div class="item">
                <div class="book_cover">
                  <a onClick={() => {props.history.push("/book/" + props.book_isbn)}}>
                  <img src={props.book_thumbnail} /></a>
                </div>
                <div class="box">
                  <a><h3>{props.title}</h3></a>
                  <div class="meta">
                    <span>{props.book_title}</span>
                  </div>
                  <div class="extra text">{props.content}</div>
                  {props.is_long?<div class="extra">Additional Details</div>:null}
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
        {
          props.is_long?
        <div class="ui comments">
          <h3 class="ui dividing header">Comments</h3>
        </div>:null
        }
      </div>
    </Alert>
  );
};


export default withRouter(Article);
