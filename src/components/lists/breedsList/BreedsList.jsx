import { useEffect, useState } from "react";
import { formatBreeds } from "../../../utils/formatBreeds/formatBreeds";
import { DropdownList } from "../DropdownList";

export const BreedsList = ({ onBreedChange }) => {
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <DropdownList 
          breeds = {breeds}
          onBreedChange = {onBreedChange}
        />
      )}
    </>
  );
};

