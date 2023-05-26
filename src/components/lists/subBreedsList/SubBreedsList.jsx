import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';

import { formatSubBreeds } from "../../../utils/formatSubBreeds/formatSubBreeds";
import { DropdownList } from "../DropdownList";
import { SelectedBreeds } from "../selectedBreeds/SelectedBreeds";
import { useHandleBreedSelect } from "../../../hooks/useHandleBreedSelect/useHandleBreedSelect";
import { useHandleBreedRemove } from "../../../hooks/useHandleBreedRemove/useHandleBreedRemove";
import { useBreedContext } from "../../../context/BreedContext";

export const SubBreedsList = ({ breed, onSubBreedChange, onDeleteBreed, deleteBreed }) => {
  const [subBreeds, setSubBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const {
    selectedSubBreeds,
    setSelectedSubBreeds
  } = useBreedContext();

  const { t } = useTranslation();
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
      const formattedSubBreeds = await formatSubBreeds(breed, t);
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
          t('selectBreed')
        ) : isLoading ? (
          t('loadingSubbreeds')
        ) : subBreeds.length === 0 ? (
          t('noSubbreedsToShow')
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
