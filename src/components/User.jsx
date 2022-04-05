import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { axiosClient } from "../api";

const User = ({ user, success }) => {
  const [show, setShow] = useState(false);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [status, setstatus] = useState("");

  //delete perticular user
  const deleteUser = async (id) => {
    axiosClient
      .delete(`/users/${id}`, {})
      .then((response) => {
        success();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const selectusers = (user) => {
    setname(user.name);
    setemail(user.email);
    setgender(user.gender);
    setstatus(user.status);
  };

  //update user details
  const updateuser = (e) => {
    e.preventDefault();
    // console.log(user.id, name, email, gender, status);
    axiosClient
      .put(`/users/${user.id}`, { name, email, gender, status })
      .then((res) => {
        handleClose();
        success();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card mb-3" style={{ width: "18rem", height: "16rem" }}>
      <div className="card-body">
        <h5 className="card-title">UserName:{user.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Email:{user.email}</h6>
        <p className="card-text">Gender:{user.gender}</p>
        <p className="card-text">Status:{user.status}</p>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <button href="#" className="btn btn-primary btn-sm">
            <Link
              to={`/public/v2/users/${user.id}/posts`}
              style={{
                color: "white",
                MarginRight: "5px",
                textDecoration: "none",
              }}
            >
              posts
            </Link>
          </button>

          <button href="#" className="btn btn-primary btn-sm" style={{}}>
            <Link
              to={`/public/v2/users/${user.id}/todos`}
              style={{
                color: "white",
                marginLeft: "5px",
                textDecoration: "none",
              }}
            >
              todos
            </Link>
          </button>
          <button
            href="#"
            className="btn btn-primary btn-sm"
            style={{ marginLeft: "5px" }}
            onClick={(id) => {
              handleShow(id);
              selectusers(user);
            }}
          >
            Edit
          </button>
          <button
            href="#"
            className="btn btn-danger btn-sm"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              const confirm = window.confirm("Are you sure?");
              if (confirm) {
                deleteUser(user.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => {
          handleClose();
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
                value={name}
                onChange={(e) => setname(e.target.value)}
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
                value={email}
                disabled
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
                  defaultChecked={gender === "male"}
                  onChange={(e) => setgender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
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
                  defaultChecked={gender === "female"}
                  onChange={(e) => setgender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
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
                  defaultChecked={status === "active"}
                  onChange={(e) => setstatus(e.target.value)}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
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
                  defaultChecked={status === "inactive"}
                  onChange={(e) => setstatus(e.target.value)}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
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
              handleClose();
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              updateuser(e);
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default User;
