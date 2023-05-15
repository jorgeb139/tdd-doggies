import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { formatBreeds } from "../../../utils/formatBreeds/formatBreeds";
import { DropdownList } from "../DropdownList";
import { SelectedBreeds } from "../selectedBreeds/SelectedBreeds";
import { useHandleBreedSelect } from "../../../hooks/useHandleBreedSelect/useHandleBreedSelect";
import { useHandleBreedRemove } from "../../../hooks/useHandleBreedRemove/useHandleBreedRemove";

export const BreedsList = ({ onBreedChange, onDeleteBreed }) => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const notSelectText = 'Seleccione una raza'

  const handleBreedSelect = useHandleBreedSelect(setSelectedBreeds, onBreedChange, notSelectText);
  const handleBreedRemove = useHandleBreedRemove(setSelectedBreeds, onDeleteBreed);

  const loadFormatedBreeds = async () => {
    const formattedBreeds = await formatBreeds();
    if (Array.isArray(formattedBreeds)) {
      setBreeds(formattedBreeds);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadFormatedBreeds();
  }, []);

  return (
    <>
      {isLoading ? (
        'Cargando razas'
      ) : breeds.length === 0 ? (
        'No hay razas para mostrar'
      ) : (
        <>
          <DropdownList 
            breeds = {breeds}
            onBreedChange = {handleBreedSelect}
            breedBool = {true}
          />
          <SelectedBreeds
            breeds={selectedBreeds}
            onBreedRemove={handleBreedRemove}
          />
        </>
      )}
    </>
  );
};

BreedsList.propTypes = {
  onBreedChange: PropTypes.func,
  onDeleteBreed: PropTypes.func,
};
