import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import SortDropdown from './SortDropdown'

const LABEL = {
  ratingDesc: "평점 높은 순",
  ratingAsc : "평점 낮은 순",
  popularity: "인기순",
  release   : "개봉일 최신순"
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
