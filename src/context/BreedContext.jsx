import { createContext, useState, useContext } from 'react';

export const BreedContext = createContext();

export const BreedProvider = ({ children }) => {
  const [actualBreed, setActualBreed] = useState('');
  const [actualSubBreed, setActualSubBreed] = useState('');
  const [deleteBreed, setDeleteBreed] = useState('');
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [selectedSubBreeds, setSelectedSubBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedSubBreed, setSelectedSubBreed] = useState("");

  const handleBreedsChange = (breed) => {
    setActualBreed(breed);
    setDeleteBreed('');
  };

  const handleSubBreedsChange = (subBreed) => {
    setActualSubBreed(subBreed);
    setDeleteBreed('');
  };

  const handleDeleteBreed = (breed) => {
    setDeleteBreed(breed);
    setActualBreed('');
    setActualSubBreed('');
  };

  const value = {
    actualBreed,
    actualSubBreed,
    deleteBreed,
    selectedBreeds,
    selectedSubBreeds,
    selectedBreed,
    selectedSubBreed,
    handleBreedsChange,
    handleSubBreedsChange,
    handleDeleteBreed,
    setSelectedBreeds,
    setSelectedSubBreeds,
    setSelectedBreed,
    setSelectedSubBreed
  };

  return <BreedContext.Provider value={value}>{children}</BreedContext.Provider>;
};

export const useBreedContext = () => useContext(BreedContext);
