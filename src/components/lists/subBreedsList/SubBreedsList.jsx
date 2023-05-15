import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { formatSubBreeds } from "../../../utils/formatSubBreeds/formatSubBreeds";
import { DropdownList } from "../DropdownList";
import { SelectedBreeds } from "../selectedBreeds/SelectedBreeds";
import { useHandleBreedSelect } from "../../../hooks/useHandleBreedSelect/useHandleBreedSelect";
import { useHandleBreedRemove } from "../../../hooks/useHandleBreedRemove/useHandleBreedRemove";

export const SubBreedsList = ({ breed, onSubBreedChange, onDeleteBreed, deleteBreed }) => {
  const [subBreeds, setSubBreeds] = useState([]);
  const [selectedSubBreeds, setSelectedSubBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const setSelectedBreeds = ''
  const notSelectText = 'Seleccione una subraza'

  const handleBreedSelect = useHandleBreedSelect(setSelectedSubBreeds, onSubBreedChange, notSelectText);
  const handleBreedRemove = useHandleBreedRemove(setSelectedBreeds, onDeleteBreed, setSelectedSubBreeds);

  const loadFormatedSubBreeds = async (breed) => {
    if(breed === 'Seleccione una raza'){
      setSubBreeds([])
      setIsFirstLoading(true)
    }else{
      setIsLoading(true);
      const formattedSubBreeds = await formatSubBreeds(breed);
      setIsLoading(false);
      if (Array.isArray(formattedSubBreeds)) {
        setIsFirstLoading(false)
        setSubBreeds(formattedSubBreeds);
      }
    }
  };

  useEffect(() => {
    if (breed) {
      setIsFirstLoading(false)
      loadFormatedSubBreeds(breed);
    }
  }, [breed]);

  useEffect(() => {
    if (deleteBreed.split(' ').length === 1) {
      handleBreedRemove(deleteBreed);
    }
  }, [deleteBreed]);

  return (
    <>
      {
        isFirstLoading ? (
          'Seleccione una raza'
        ) : isLoading ? (
          'Cargando subrazas'
        ) : subBreeds.length === 0 ? (
          'No hay subrazas para mostrar'
        ) : (
          <>
            <DropdownList 
              breeds={subBreeds} 
              onSubBreedChange={handleBreedSelect}
              breedBool = {false}
            />
            <SelectedBreeds
              breeds={selectedSubBreeds}
              onBreedRemove={handleBreedRemove}
            />
          </>
        )}
    </>
  );
};

SubBreedsList.propTypes = {
  breed: PropTypes.string,
  onSubBreedChange: PropTypes.func,
  onDeleteBreed: PropTypes.func,
};
