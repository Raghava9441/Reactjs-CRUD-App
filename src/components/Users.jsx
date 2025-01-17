import React, { Component } from "react";
import User from "./User";
import { axiosClient } from "../api";
import ModelComponent from "./ModelComponent";
import SearchField from "./SearchField";
import { addUsersFromAPI, getUsers } from "../db/db";

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
            option: null,
            searchField: "",
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
        this.fetchUsers();
    }

    fetchUsers = async () => {
        const storedUsers = await getUsers();
        console.log(storedUsers);
        this.setState({
            users: storedUsers,
            filteredUsers: storedUsers,
        });

        this.syncUsersWithAPI(storedUsers);
    };

    syncUsersWithAPI = (storedUsers) => {
        axiosClient
            .get("/users")
            .then((response) => {
                const apiUsers = response.data;
                const newUsers = apiUsers.filter(apiUser =>
                    !storedUsers.some(storedUser => storedUser.id === apiUser.id)
                );

                if (newUsers.length > 0) {
                    const updatedUsers = [...storedUsers, ...newUsers];
                    this.setState({
                        users: updatedUsers,
                        filteredUsers: updatedUsers,
                    });
                    addUsersFromAPI(updatedUsers);
                }
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
    //create new user
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
                this.setState({
                    ...this.state,
                    newUser: {
                        id: "",
                        name: "",
                        email: "",
                        gender: "",
                        status: "",
                    },
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    //filter users based on gender
    handleGender = (e) => {
        // this.setState({
        //     ...this.state,
        //     option: e.target.value,
        // });
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
    //filter users based on name
    onSearchChange = (e) => {
        this.setState({
            ...this.state,
            searchField: e.target.value,
        });
    };

    render() {
        const { searchField, filteredUsers } = this.state;
        const filteredMonsters = filteredUsers.filter((filteredUser) =>
            filteredUser.name.toLowerCase().includes(searchField.toLowerCase())
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
                                style={{ marginLeft: "5px" }}
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
                                style={{ marginLeft: "5px" }}
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
                            {this.state.option}Users Count:
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
