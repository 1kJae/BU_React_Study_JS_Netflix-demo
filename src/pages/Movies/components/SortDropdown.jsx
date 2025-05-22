import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const LABEL = {
  ratingDesc: "평점순 (높→낮)",
  ratingAsc : "평점순 (낮→높)",
  popularity: "인기순",
  release   : "개봉일순"
};

function SortDropdown({ value, onChange }) {
  return (
    <DropdownButton
      id="sort-dropdown"
      title={`정렬: ${LABEL[value]}`}
      variant="secondary"
      className="mb-3"
      onSelect={onChange}
    >
      {Object.entries(LABEL).map(([k,v])=>(
        <Dropdown.Item eventKey={k} key={k}>{v}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default SortDropdown;
