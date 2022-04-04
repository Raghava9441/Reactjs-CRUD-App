import axios from "axios";
import React, { Component } from "react";

export default class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://gorest.co.in/public/v2/todos")
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.todos);
    return (
      <div className="container">
        <div className="row">
          {this.state.todos.map((todo) => (
            <div className="col-md-4">
              <div className="card mb-5 d-flex" key={todo.id}>
                <div
                  className="card-header"
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  todo
                </div>
                <h3>{todo.title}</h3>

                <div className="card-footer">
                  <h3>status</h3>
                </div>
                <div className="card-body">
                  <h3>{todo.status}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
