import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./BookTabsReview.css";

class BookTabsReview extends Component {
  componentDidMount() {}

  render() {
		if(this.props.reviews.length == 0){
			return(
				<div>
					아직 리뷰가 없어요... 하나 작성해보시면 어떨까요?
				</div>
			);
		}


		const reviews = this.props.reviews.map((review) => {
			console.log("[DEBUG] review.title: " + review.title + "review.content: " + review.content);
			return(
				<div>
					<p>-------------------------------------------------------------------------------------</p>
					<h1>{review.title}</h1>
					<h3>{review.author}</h3>
					<h4>{review.date}</h4>
					<p>{review.content}</p>
					<p>-------------------------------------------------------------------------------------</p>
				</div>
			);
		});


    if (this.props.is_short) {
      return(
        <div>{reviews}</div>
      );
    }

    if (this.props.is_long){
      return(
				<div>{reviews}</div>
      );
		}
		
		if(this.props.is_phrase){
			return(
				<div>{reviews}</div>
			);
		}

	}
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BookTabsReview));
