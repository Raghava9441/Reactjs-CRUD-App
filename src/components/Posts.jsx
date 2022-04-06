import axios from "axios";
import React, { Component } from "react";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      newPost: {
        title: "",
        body: "",
      },
    };
  }
  componentDidMount() {
    axios
      .get("https://gorest.co.in/public/v2/posts")
      .then((response) => {
        this.setState({ allPosts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // addPost = () => {
  //   console.log(this.state.newPost);
  //   // axios({
  //   //   method: "post",
  //   //   url: `https://gorest.co.in/public/v2/posts`,
  //   //   data: this.state.newPost,
  //   //   headers: {
  //   //     Authorization:
  //   //       "Bearer 43157fce0d07e7f20855dde25fbb772a6078687c40c3d2734da25e50d18dd1d3",
  //   //     "Content-Type": "application/json",
  //   //   },
  //   // })
  //   axiosClient
  //     .post("/posts", this.state.newPost)
  //     .then((response) => {
  //       console.log(response.data);
  //       this.componentDidMount();
  //       this.setState({ ...this.state, show: false });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // handleModel = () => {
  //   this.setState({ ...this.state, show: true });
  // };
  // handleClose = () => {
  //   this.setState({ ...this.state, show: false });
  // };

  render() {
    return (
      <div>
        <div className="container">
          <h2 className="mt-3 md-3">All Posts</h2>

          <div className="row">
            {this.state.allPosts.map((post) => (
              <div className="col-md-4 mb-3" key={post.id}>
                <div className="card" style={{ height: "26rem" }}>
                  <div className="card-body mb-3">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <Modal
          show={this.state.show}
          onHide={() => {
            this.handleClose();
          }}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="title">Post Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder=" "
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      newPost: { ...this.state.newPost, title: e.target.value },
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="body">Body</label>
                <textarea
                  className="form-control"
                  id="body"
                  rows="3"
                  name="body"
                  placeholder="Enter body"
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      newPost: { ...this.state.newPost, body: e.target.value },
                    });
                  }}
                ></textarea>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.handleClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.addPost();
              }}
            >
              ADD
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    );
  }
}
