import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ id, name, email, gender, status }) => {
  return (
    <>
      <div className="card mt-3">
        <div className="card-header bg-primary text-white">{name}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span>Email:</span>

            <Link to={`/users/${id}`}>{email}</Link>
          </li>
          <li className="list-group-item">
            <span>Gender:</span>
            {gender}
          </li>
          <li className="list-group-item">
            <span>Status:</span>
            {status}
          </li>
        </ul>
        <div className="card-footer"></div>
      </div>
    </>
  );
};

export default UserCard;
