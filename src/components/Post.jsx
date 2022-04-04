import React, { Component } from "react";
import Comments from "./Comments";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {}
  render() {
    // console.log("comments" + this.state.comments);
    return (
      <>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3>{this.props.post.id}</h3>
              <h4>{this.props.post.title}</h4>
              <p>{this.props.post.body}</p>
            </div>
            <div className="card-footer">
              <Comments post={this.props.post} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
