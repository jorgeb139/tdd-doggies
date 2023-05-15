export const useHandleBreedSelect = (setSelectedBreeds, onBreedChange, notSelectText) => {
  const handleBreedSelect = (breed) => {
    onBreedChange(breed);
    if (breed !== notSelectText) {
      setSelectedBreeds(prevBreeds => [...prevBreeds, breed]);
    }
  };

  return handleBreedSelect;
};