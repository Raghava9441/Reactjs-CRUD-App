import React from 'react';
export default function SearchField({ placeholder, onsearch }) {
  return (
    <div className = "search_box">
      <input
        className="search form-control mb-3"
        style={{width:"50%", marginLeft:"25%"}} 
        type="search"
        placeholder={placeholder}
        onChange={onsearch}
      />
    </div>
  );
}