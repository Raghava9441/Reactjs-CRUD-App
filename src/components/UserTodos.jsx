import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { axiosClient } from "../api";
class UserTodos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
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
        axiosClient
            .get(`/users/${this.props.match.params.id}/todos`, {})
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
        axiosClient
            .post(`/users/${this.state.id}/todos`, this.state.newTodo)
            .then((response) => {
                console.log(response.data);
                this.getUserTodos();

                this.setState({ ...this.state, show: false });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    render() {
        return (
            <div>
                <div id="myDIV" className="header">
                    <h2 style={{ margin: "5px" }}>User To Do List</h2>
                    <form action="">
                        <div className="form-group">
                            {/* <label htmlFor="todo">todo</label> */}
                            <input
                                type="text"
                                className="form-control"
                                id="todo"
                                placeholder="todo..."
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        newTodo: {
                                            ...this.state.newTodo,
                                            title: e.target.value,
                                        },
                                    });
                                }}
                            />
                            <div></div>
                            <div className="form-group d-flex mt-3">
                                <h4 className={{ marginRight: "20px" }}>
                                    status
                                </h4>
                                <div
                                    className="form-check mt-1"
                                    style={{
                                        marginRight: "10px",
                                        marginLeft: "20px",
                                    }}
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
                    {!this.state.userTodos.length ? (
                        <div>
                            <h2>no posts</h2>
                        </div>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Date</th>
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
                    )}
                </div>
            </div>
        );
    }
}
export default withRouter(UserTodos);

// <table className="table">
//   <thead>
//     <tr>
//       <th scope="col">#</th>
//       <th scope="col">title</th>
//       <th scope="col">status</th>
//       <th scope="col">Due_On</th>
//     </tr>
//   </thead>
//   <tbody>
//     {this.state.userTodos.map((todo) => (
//       <tr key={todo.id}>
//         <th scope="row">{todo.id}</th>
//         <td>{todo.title}</td>
//         <td>{todo.status}</td>
//         <td>{todo.due_on}</td>
//       </tr>
//     ))}
//   </tbody>
// </table>
