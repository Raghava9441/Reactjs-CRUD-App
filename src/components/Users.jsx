import axios from "axios";

import React, { Component } from "react";
import User from "./User";
import UserTodos from "./UserTodos";
import { Button, Modal } from "react-bootstrap";

export default class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      newUser: {
        name: "",
        email: "",
        gender: "",
        status: "",
      },
    };
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers = () => {
    axios
      .get("https://gorest.co.in/public/v2/users", {
        headers: {
          Authorization:
            "Bearer 43157fce0d07e7f20855dde25fbb772a6078687c40c3d2734da25e50d18dd1d3",
        },
      })
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createUser = () => {
    // console.log(this.state.newUser);
    axios({
      method: "post",
      url: `https://gorest.co.in/public/v2/users`,
      data: this.state.newUser,
      headers: {
        Authorization:
          "Bearer 43157fce0d07e7f20855dde25fbb772a6078687c40c3d2734da25e50d18dd1d3",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        this.getUsers();

        this.setState({ ...this.state, show: false });
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

  render() {
    return (
      <>
        <div className="container">
          <button
            className="btn btn-primary btn-sm mb-3"
            onClick={this.handleModel}
          >
            Create user
          </button>
          <div className="row ">
            {this.state.users.map((user) => (
              <div
                className="col-md-4 d-flex justify-content-center"
                key={user.id}
              >
                <User user={user} success={this.getUsers} />
              </div>
            ))}
          </div>
        </div>
        <Modal
          show={this.state.show}
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
                <label htmlFor="title">user name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="User Name "
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      newUser: { ...this.state.newUser, name: e.target.value },
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="body">email</label>
                <input
                  className="form-control"
                  id="body"
                  rows="3"
                  name="email"
                  placeholder="Enter body"
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      newUser: { ...this.state.newUser, email: e.target.value },
                    });
                  }}
                ></input>
              </div>
              status
              <div className="d-flex">
                <div className="form-group">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="male"
                    id="flexRadioDefault1"
                    onChange={(e) =>
                      this.setState({
                        ...this.state,
                        newUser: {
                          ...this.state.newUser,
                          gender: e.target.value,
                        },
                      })
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Male
                  </label>
                </div>
                <div className="form-check" style={{ marginLeft: "5px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="female"
                    id="flexRadioDefault1"
                    onChange={(e) =>
                      this.setState({
                        ...this.state,
                        newUser: {
                          ...this.state.newUser,
                          gender: e.target.value,
                        },
                      })
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    female
                  </label>
                </div>
              </div>
              status
              <div className="mb-3 d-flex">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    value="active"
                    id="flexRadioDefault1"
                    onChange={(e) =>
                      this.setState({
                        ...this.state,
                        newUser: {
                          ...this.state.newUser,
                          status: e.target.value,
                        },
                      })
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    active
                  </label>
                </div>
                <div className="form-check" style={{ marginLeft: "5px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    value="inactive"
                    id="flexRadioDefault1"
                    onChange={(e) =>
                      this.setState({
                        ...this.state,
                        newUser: {
                          ...this.state.newUser,
                          status: e.target.value,
                        },
                      })
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    inactive
                  </label>
                </div>
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
                this.createUser();
              }}
            >
              ADD
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
