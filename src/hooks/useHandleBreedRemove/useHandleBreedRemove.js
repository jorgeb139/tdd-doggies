export const useHandleBreedRemove = (setSelectedBreeds = () => {}, onDeleteBreed, setSelectedSubBreeds = () => {}) => {
  const handleBreedRemove = (breed) => {
    onDeleteBreed(breed);
    if(typeof setSelectedBreeds !== 'function') {
      setSelectedSubBreeds(prevSubBreeds => prevSubBreeds.filter((item) => item !== breed));
    }else{
      setSelectedBreeds(prevBreeds => prevBreeds.filter((item) => item !== breed));
    }
  };

  return handleBreedRemove;
};
