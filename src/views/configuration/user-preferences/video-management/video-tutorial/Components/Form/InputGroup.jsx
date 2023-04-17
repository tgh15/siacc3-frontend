import React from "react";

const InputGroup = (props) => {
  return (
    <div className="input-group-vid">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type || "text"}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputGroup;
