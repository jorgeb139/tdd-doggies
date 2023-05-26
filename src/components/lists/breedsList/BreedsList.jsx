import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';

import { formatBreeds } from "../../../utils/formatBreeds/formatBreeds";
import { DropdownList } from "../DropdownList";
import { SelectedBreeds } from "../selectedBreeds/SelectedBreeds";
import { useHandleBreedSelect } from "../../../hooks/useHandleBreedSelect/useHandleBreedSelect";
import { useHandleBreedRemove } from "../../../hooks/useHandleBreedRemove/useHandleBreedRemove";
import { useBreedContext } from "../../../context/BreedContext";

export const BreedsList = ({ onBreedChange, onDeleteBreed }) => {
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    selectedBreeds,
    setSelectedBreeds
  } = useBreedContext();

  const { t } = useTranslation();
  const notSelectText = t('selectBreed')

  const handleBreedSelect = useHandleBreedSelect(setSelectedBreeds, onBreedChange, notSelectText);
  const handleBreedRemove = useHandleBreedRemove(setSelectedBreeds, onDeleteBreed);

  const loadFormatedBreeds = async () => {
    const formattedBreeds = await formatBreeds(t);
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
        t('loadingBreeds')
      ) : breeds.length === 0 ? (
        t('noBreedsToShow')
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
