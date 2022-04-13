import React, { Component } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../api";
import ModelComponent from "./ModelComponent";

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            newUser: {
                id: this.props.user.id,
                name: "",
                email: "",
                gender: "",
                status: "",
            },
        };
    }
    //open model
    handleModel = () => {
        this.setState({ ...this.state, show: true });
    };
    //close model
    handleClose = () => {
        this.setState({ ...this.state, show: false });
    };

    selectusers = (user) => {
        this.setState({
            ...this.setState,
            newUser: {
                name: user.name,
                email: user.email,
                gender: user.gender,
                status: user.status,
            },
        });
    };
    //input handler
    handleChange = (e) => {
        this.setState({
            ...this.state,
            newUser: {
                ...this.state.newUser,
                [e.target.name]: e.target.value,
            },
        });
    };
    //update user
    updateUser = () => {
        console.log(this.state.newUser);
        axiosClient
            .put(`/users/${this.props.user.id}`, this.state.newUser)
            .then((res) => {
                this.handleClose();
                this.props.success();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    //delete user
    deleteUser = async (id) => {
        axiosClient
            .delete(`/users/${id}`, {})
            .then((response) => {
                this.props.success();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <div
                className="card mb-3"
                style={{ width: "24rem", height: "18rem" }}
            >
                <div className="card-body">
                    <table className="table justify-content-left">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: "left" }}>
                                    Name
                                </th>
                                <th scope="col" style={{ textAlign: "left" }}>
                                    {this.props.user.name}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row" style={{ textAlign: "left" }}>
                                    Email
                                </th>
                                <td style={{ textAlign: "left" }}>
                                    {this.props.user.email}
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ textAlign: "left" }}>
                                    Gender
                                </th>
                                <td style={{ textAlign: "left" }}>
                                    {this.props.user.gender}
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ textAlign: "left" }}>
                                    Status
                                </th>
                                <td style={{ textAlign: "left" }}>
                                    {this.props.user.status}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div
                        className="d-flex"
                        style={{ justifyContent: "space-between" }}
                    >
                        <button href="#" className="btn btn-primary btn-sm">
                            <Link
                                to={`/public/v2/users/${this.props.user.id}/posts`}
                                style={{
                                    color: "white",
                                    MarginRight: "5px",
                                    textDecoration: "none",
                                }}
                            >
                                Posts
                            </Link>
                        </button>

                        <button
                            href="#"
                            className="btn btn-primary btn-sm"
                            style={{}}
                        >
                            <Link
                                to={`/public/v2/users/${this.props.user.id}/todos`}
                                style={{
                                    color: "white",
                                    marginLeft: "5px",
                                    textDecoration: "none",
                                }}
                            >
                                Todos
                            </Link>
                        </button>
                        <button
                            href="#"
                            className="btn btn-warning btn-sm"
                            style={{ marginLeft: "5px", color: "white" }}
                            onClick={(id) => {
                                this.handleModel(id);
                                this.selectusers(this.props.user);
                            }}
                        >
                            Edit user
                        </button>
                        <button
                            href="#"
                            className="btn btn-danger btn-sm"
                            style={{ marginLeft: "5px" }}
                            onClick={() => {
                                const confirm = window.confirm("Are you sure?");
                                if (confirm) {
                                    this.deleteUser(this.props.user.id);
                                }
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <ModelComponent
                    show={this.state.show}
                    onHide={this.handleClose}
                    newUser={this.state.newUser}
                    onchange={this.handleChange}
                    onsubmit={this.updateUser}
                />
            </div>
        );
    }
}
