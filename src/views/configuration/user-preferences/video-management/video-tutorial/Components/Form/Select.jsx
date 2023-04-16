import React from "react";
import IconDropdown from "../../assets/Forward.png";

const Select = () => {
  return (
    <div>
      <div className="input-group">
        <label>Kategori</label>
        <div className="tw-flex">
          <input
            type="text"
            name="kategori"
            value="Kategori"
            className="[color:#C0C0C0]"
          />
          <img
            src={IconDropdown}
            onClick={() => setOpen(!open)}
            alt=""
            className="tw-w-6 -tw-mt-2 tw-cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Select;
