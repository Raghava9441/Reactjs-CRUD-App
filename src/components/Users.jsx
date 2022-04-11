import React, { Component } from "react";
import User from "./User";
import { axiosClient } from "../api";
import ModelComponent from "./ModelComponent";
import SearchField from "./SearchField";

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            option: null,
            searchField: "",
            filteredUsers: [],
            newUser: {
                id: "",
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
    // get all users
    getUsers = () => {
        axiosClient
            .get("/users")
            .then((response) => {
                this.setState({
                    users: response.data,
                    filteredUsers: response.data,
                });
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

    handleChange = (e) => {
        this.setState({
            ...this.state,
            newUser: {
                ...this.state.newUser,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // this.createUser();
        console.log(this.state.newUser);
        axiosClient
            .post("/users", this.state.newUser)
            .then((response) => {
                console.log(response.data);
                this.getUsers();
                this.setState({ ...this.state, show: false });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleGender = (e) => {
        this.setState({
            ...this.state,
            option: e.target.value,
        });
        switch (e.target.value) {
            case "male":
                let maleUsers = this.state.users.filter(
                    (user) => user.gender === "male"
                );
                this.setState({
                    ...this.state,
                    filteredUsers: maleUsers,
                });
                return;
            case "female":
                let femaleUsers = this.state.users.filter(
                    (user) => user.gender === "female"
                );
                this.setState({
                    ...this.state,
                    filteredUsers: femaleUsers,
                });
                return;
            case "all":
                let allusers = this.state.users.filter((user) => user);
                this.setState({
                    ...this.state,
                    filteredUsers: allusers,
                });
                return;
        }
    };

    onSearchChange = (e) => {
        this.setState({
            searchField: e.target.value,
        });
    };

    render() {
        const { users, searchField, filteredUsers } = this.state;
        const filteredMonsters = filteredUsers.filter((searchUser) =>
            searchUser.name.toLowerCase().includes(searchField.toLowerCase())
        );

        return (
            <>
                <div className="container">
                    {/* <pre>{JSON.stringify(this.state.users)}</pre>
                    <pre>{JSON.stringify(this.state.option)}</pre> */}

                    <button
                        className="btn btn-primary btn-sm mb-3"
                        onClick={this.handleModel}
                    >
                        Create user
                    </button>

                    <div
                        className="d-flex"
                        style={{ marginLeft: "25%", marginBottom: "10px" }}
                    >
                        <div className="form-group">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="all"
                                defaultChecked
                                id="flexRadioDefault3"
                                onChange={this.handleGender}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault3"
                                style={{ marginRight: "20px" }}
                            >
                                all
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="male"
                                id="flexRadioDefault1"
                                onChange={this.handleGender}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                                style={{ marginLeft: "5px" }}
                            >
                                Male
                            </label>
                        </div>
                        <div
                            className="form-check"
                            style={{ marginLeft: "5px" }}
                        >
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="female"
                                id="flexRadioDefault1"
                                onChange={this.handleGender}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                            >
                                female
                            </label>
                        </div>
                    </div>
                    <SearchField
                        placeholder="search user By name"
                        onsearch={this.onSearchChange}
                    />
                    <div className="row">
                        <h3>
                            {" "}
                            {this.state.option}users Count:
                            {filteredMonsters.length}
                        </h3>
                    </div>
                    <div className="row ">
                        {filteredMonsters.map((user) => (
                            <div
                                className="col-md-4 col-xs-1 d-flex justify-content-center"
                                key={user.id}
                            >
                                <User user={user} success={this.getUsers} />
                            </div>
                        ))}
                    </div>
                </div>
                <ModelComponent
                    show={this.state.show}
                    onHide={this.handleClose}
                    onchange={this.handleChange}
                    onsubmit={this.handleSubmit}
                    newUser={this.state.newUser}
                />
            </>
        );
    }
}
