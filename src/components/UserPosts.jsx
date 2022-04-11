import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Modal } from "react-bootstrap";
import Post from "./Post";
import { axiosClient } from "../api";

class UserPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            posts: [],
            comments: [],
            todos: [],
            show: false,
            newPost: {
                title: "",
                body: "",
            },
        };
    }

    componentDidMount() {
        //user posts
        this.getUserPosts();
    }

    getUserPosts = () => {
        axiosClient
            .get(`/users/${this.state.id}/posts`)
            .then((response) => {
                // console.log(response.data);
                this.setState({ ...this.state, posts: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleModel = () => {
        this.setState({ ...this.state, show: true });
    };
    handleClose = () => {
        this.setState({ ...this.state, show: false });
    };

    addPost = () => {
        axios({
            method: "post",
            url: `https://gorest.co.in/public/v2/users/${this.state.id}/posts`,
            data: this.state.newPost,
            headers: {
                Authorization:
                    "Bearer 43157fce0d07e7f20855dde25fbb772a6078687c40c3d2734da25e50d18dd1d3",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(response.data);
                this.getUserPosts();

                this.setState({ ...this.state, show: false });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    render() {
        return (
            <>
                {this.state.show && (
                    <Modal
                        show={true}
                        onHide={() => {
                            this.handleClose();
                        }}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Add user</Modal.Title>
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
                                        placeholder="Enter title"
                                        onChange={(e) => {
                                            this.setState({
                                                ...this.state,
                                                newPost: {
                                                    ...this.state.newPost,
                                                    title: e.target.value,
                                                },
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
                                                newPost: {
                                                    ...this.state.newPost,
                                                    body: e.target.value,
                                                },
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
                    </Modal>
                )}
                <Button
                    className="btn bt-primary mb-3"
                    onClick={() => {
                        this.handleModel();
                    }}
                >
                    create Post
                </Button>
                {!this.state.posts.length ? (
                    <div>
                        <h2>no posts</h2>
                    </div>
                ) : (
                    <div>
                        <h2>User Posts</h2>
                        <div className="container">
                            <div className="row">
                                {this.state.posts.map((post) => (
                                    <Post key={post.id} post={post} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
export default withRouter(UserPosts);
