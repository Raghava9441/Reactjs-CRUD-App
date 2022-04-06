import axios from "axios";
import React, { Component } from "react";
import { axiosClient } from "../api";
import Comment from "./Comment";

export default class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      newComment: {
        body: "",
        email: "",
        name: "",
      },
    };
  }
  componentDidMount() {
    this.getComments();
  }
  getComments = () => {
    axiosClient
      .get(`/posts/${this.props.post.id}/comments`)
      // axios
      //   .get(
      //     `https://gorest.co.in/public/v2/posts/${this.props.post.id}/comments`,
      //     {
      //       headers: {
      //         Authorization:
      //           "Bearer 43157fce0d07e7f20855dde25fbb772a6078687c40c3d2734da25e50d18dd1d3",
      //       },
      //     }
      //   )
      .then((response) => {
        // console.log(response.data);
        this.setState({ ...this.state, comments: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post(`/posts/${this.props.post.id}/comments`, this.state.newComment)
      .then((res) => {
        this.setState({
          ...this.state,
          newComment: {
            body: "",
            email: "",
            name: "",
          },
        });
        this.getComments();

        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    this.getComments();
  };
  render() {
    return (
      <div className="comments mb-5">
        <div className="comments-title">Comments</div>
        <div className="comment-form-title">Write comment</div>
        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              onChange={(e) =>
                this.setState({
                  ...this.state,
                  newComment: {
                    ...this.state.newComment,
                    name: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="form-group" style={{ marginTop: "5px" }}>
            <input
              type="email"
              placeholder="email"
              className="form-control"
              onChange={(e) =>
                this.setState({
                  ...this.state,
                  newComment: {
                    ...this.state.newComment,
                    email: e.target.value,
                  },
                })
              }
            />
          </div>
          <textarea
            className="comment-form-textarea form-control"
            value={this.state.commentText}
            onChange={(e) =>
              this.setState({
                ...this.state,
                newComment: {
                  ...this.state.newComment,
                  body: e.target.value,
                },
              })
            }
          />
          <button className="comment-form-button">submit</button>
        </form>
        <div className="comments-container">
          {this.state.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    );
  }
}
