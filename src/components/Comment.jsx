import React from "react";
import UserIcon from "../user-icon.png";

export default function Comment(props) {
  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src={UserIcon} alt="user icon" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{props.comment.name}</div>
        </div>
        <div>
          <span style={{ color: "blue" }}>Email: </span>
          {props.comment.email}
        </div>
        <div className="comment-text">{props.comment.body}</div>
      </div>
    </div>
  );
}
