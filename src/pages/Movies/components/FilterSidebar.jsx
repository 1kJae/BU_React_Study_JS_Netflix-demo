import React from 'react';
import { Form } from 'react-bootstrap';
import SortDropdown from './SortDropdown';

function FilterSidebar({
  genres = [],
  selected = [],
  onToggle,
  sortKey,
  onSortChange,
}) {
  return (
    <div className="p-3">
      <div className="mb-3">
        <SortDropdown value={sortKey} onChange={onSortChange} />
      </div>
      <hr className="my-3" />

      <h5 className="mb-2">장르</h5>
      {genres.map((g) => (
        <Form.Check
          key={g.id}
          type="checkbox"
          id={`genre-${g.id}`}
          label={g.name}
          value={g.id}
          checked={selected.includes(g.id)}
          onChange={() => onToggle(g.id)}
          className="mb-1"
        />
      ))}
    </div>
  );
}

export default FilterSidebar;
