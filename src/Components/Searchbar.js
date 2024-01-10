import React from "react";

const Searchbar = (props) => {
  return (
    <div>
      <input
        className="searchbox"
        type="text"
        placeholder="Search Here...."
        value={props.searchValue}
        onChange={props.onChange}
      ></input>
    </div>
  );
};

export default Searchbar;
