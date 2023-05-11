import { useEffect, useState } from "react";
import { formatSubBreeds } from "../../../utils/formatSubBreeds/formatSubBreeds";
import { DropdownList } from "../DropdownList";

export const SubBreedsList = ({ breed, onSubBreedChange }) => {
  const [subBreeds, setSubBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

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
          <DropdownList 
            breeds={subBreeds} 
            onSubBreedChange={onSubBreedChange} 
            breedBool = {false}
          />
        )}
    </>
  );
};
