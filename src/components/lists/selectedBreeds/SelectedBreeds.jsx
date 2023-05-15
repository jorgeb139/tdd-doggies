import React from "react";
import "./selectedBreeds.css";

export const SelectedBreeds = ({ breeds, onBreedRemove }) => {
  return (
    <div className="selected-breeds">
      {breeds.map((breed, index) => (
        <div key={index} className="selected-breed__item">
          {breed}
          <span className="selected-breeds__remove-icon" onClick={() => onBreedRemove(breed)}>
            &#215;
          </span>
        </div>
      ))}
    </div>
  );
};
