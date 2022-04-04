import React from "react";
import { Button, Modal } from "react-bootstrap";

const Model = (props) => {
  return (
      <Modal
      {...props}
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
            onClick={() => {
              updateuser();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default Model;
