// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const UserTodos = () => {
//   const { id } = useParams();
//   const [todos, settodos] = useState("");
//   useEffect(() => {
//     axios
//       .get(`https://gorest.co.in/public/v2/users/${id}/todos`, {
//         headers: {
//           Authorization:
//             "Bearer 43157fce0d07e7f20855dde25fbb772a6078687c40c3d2734da25e50d18dd1d3",
//         },
//       })
//       .then((response) => {
//         settodos(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const addTodo = () => {};
//   return (
//     <div>
//       <pre>{JSON.stringify(todos)}</pre>
//       <div id="myDIV" className="header">
//         <h2 style={{ margin: "5px" }}>User To Do List</h2>
//         <input type="text" id="myInput" placeholder="Title..." />
//         <span
//           onClick={() => {
//             addTodo();
//           }}
//           className="addBtn"
//         >
//           Add
//         </span>
//       </div>
//       <div>
//         <ul className="myUL">
//           {todos.map((todo) => (
//             <li key={todo.id}>
//               <li>{todo.title}</li>
//               <li>{todo.status}</li>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default UserTodos;

import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class UserTodos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTodos: [],
      newTodo: {
        due_on: new Date().toLocaleDateString("en-US"),
        status: "",
        title: "",
      },
    };
  }
  componentDidMount() {
    this.getUserTodos();
  }

  getUserTodos = () => {
    console.log(this.state.newTodo);
    axios
      .get(
        `https://gorest.co.in/public/v2/users/${this.props.match.params.id}/todos`,
        {
          headers: {
            Authorization:
              "Bearer 43157fce0d07e7f20855dde25fbb772a6078687c40c3d2734da25e50d18dd1d3",
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        this.setState({ userTodos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  addTodo = (e) => {
    e.preventDefault();
    console.log(this.state.newTodo);

    axios({
      method: "post",
      url: `https://gorest.co.in/public/v2/users/${this.state.id}/todos`,
      data: JSON.stringify(this.state.newTodo),
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
    return !this.state.userTodos.length ? (
      <h2>No todos</h2>
    ) : (
      <div>
        <div id="myDIV" className="header">
          <h2 style={{ margin: "5px" }}>User To Do List</h2>
          <form action="">
            <div className="form-group">
              <label htmlFor="todo">todo</label>
              <input
                type="text"
                className="form-control"
                id="todo"
                placeholder="todo..."
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    newTodo: { ...this.state.newTodo, title: e.target.value },
                  });
                }}
              />
              <div></div>
              <div className="form-group d-flex mt-3">
                <h4 className={{ marginRight: "20px" }}>status</h4>
                <div
                  className="form-check mt-1"
                  style={{ marginRight: "10px", marginLeft: "20px" }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    value="pending"
                    id="flexRadioDefault1"
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        newTodo: {
                          ...this.state.newTodo,
                          status: e.target.value,
                        },
                      });
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    pending
                  </label>
                </div>
                <div className="form-check  mt-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    value="completed"
                    id="flexRadioDefault1"
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        newTodo: {
                          ...this.state.newTodo,
                          status: e.target.value,
                        },
                      });
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    completed
                  </label>
                </div>
              </div>
              {/* <div className="form-group d-flex">
                <label htmlFor="date" style={{ marginRight: "25px" }}>
                  {" "}
                  <h4>Date</h4>{" "}
                </label>
                <DatePicker
                  selected={this.state.newTodo.date}
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      newTodo: { ...this.state.newTodo, date: e.target.value },
                    });
                  }}
                  showTimeSelect
                  dateFormat="Pp"
                />
              </div> */}
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                this.addTodo(e);
              }}
            >
              Add Todo
            </button>
          </form>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">title</th>
                <th scope="col">status</th>
                <th scope="col">Due_On</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userTodos.map((todo) => (
                <tr key={todo.id}>
                  <th scope="row">{todo.id}</th>
                  <td>{todo.title}</td>
                  <td>{todo.status}</td>
                  <td>{todo.due_on}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default withRouter(UserTodos);
