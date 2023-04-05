import React from "react";

const SearchBar = (props) => {
  return (
    <span className="tw-bg-white tw-border tw-border-gray-200 tw-ml-auto tw-flex [border-radius:43px] md:tw-w-96 tw-w-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="tw-w-6 tw-h-6 tw-mx-4 tw-my-3"
      >
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="text"
        placeholder="Cari Video Tutorial"
        value={props.state}
        onChange={(e) => props.setState(e.target.value)}
        className="tw-outline-none tw-mr-4 tw-placeholder-gray-500 tw-text-xs [color:#575757] tw-w-9/12"
      />
    </span>
  );
};

export default SearchBar;
