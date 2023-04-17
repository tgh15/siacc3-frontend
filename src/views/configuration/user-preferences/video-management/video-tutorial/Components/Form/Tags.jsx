import { useState } from "react";

const Tags = (props) => {
  const [tags, setTags] = useState(props.tags);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    props.selectedTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  return (
    <div className="input-group-vid" style={{ flexDirection: "column" }}>
      <label htmlFor="tags">Tags</label>
      <div></div>
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span
              className="tag-close-icon tw-cursor-pointer"
              onClick={() => removeTags(index)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="tw-self-center"
        onKeyUp={(event) => (event.key === " " ? addTags(event) : null)}
        placeholder="Klik Space untuk tambah tags"
      />
    </div>
  );
};

export default Tags;
