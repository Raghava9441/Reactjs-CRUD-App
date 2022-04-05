import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export class ModelComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Modal
        show={this.props.show}
        {...this.props}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{JSON.stringify(this.props.newUser)}</pre>
          <form>
            <div className="form-group">
              <label htmlFor="title">user name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="name"
                value={this.props.newUser.name}
                placeholder="User Name "
                onChange={this.props.onchange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">email</label>
              <input
                className="form-control"
                id="body"
                rows="3"
                name="email"
                value={this.props.newUser.email}
                placeholder="Enter body"
                onChange={this.props.onchange}
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
                  onChange={this.props.onchange}
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
                  onChange={this.props.onchange}
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
                  onChange={this.props.onchange}
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
                  onChange={this.props.onchange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  inactive
                </label>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.onsubmit}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModelComponent;
