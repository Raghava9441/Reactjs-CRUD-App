import React from "react";

export default function CommentForm({ submitLabel, handleSubmit }) {
    const [text, setText] = React.useState("");
    
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button">{submitLabel}</button>
    </form>
  );
}
