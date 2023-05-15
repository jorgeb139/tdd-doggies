import { useState } from "react"
import './home.css';

import { BreedsList } from "../../components/lists/breedsList/BreedsList"
import { SubBreedsList } from "../../components/lists/subBreedsList/SubBreedsList"
import { RenderImages } from "../../components/renderImages/RenderImages"

export const Home = () => {
  const [actualBreed, setActualBreed] = useState('')
  const [actualSubBreed, setActualSubBreed] = useState('')
  const [deleteBreed, setDeleteBreed] = useState('')

  const handleBreedsChange = (breed) => {
    setActualBreed(breed);
    setDeleteBreed('')
  };
  
  const handleSubBreedsChange = (subBreed) => {
    setActualSubBreed(subBreed);
    setDeleteBreed('')
  };
  
  const handleDeleteBreed = (breed) => {
    setDeleteBreed(breed);
    setActualBreed('')
    setActualSubBreed('')
  };

  return (
    <div className="container">
      <div data-testid="breed-selector" className="breed__selector">
        <BreedsList onBreedChange={handleBreedsChange} onDeleteBreed={handleDeleteBreed}/>
      </div>
      <div data-testid="sub-breed-selector" className="subbreed__selector">
        <SubBreedsList breed={actualBreed} onSubBreedChange={handleSubBreedsChange} onDeleteBreed={handleDeleteBreed} deleteBreed={deleteBreed}/>
      </div>
      <div data-testid="render-images" className="renderImages__container">
        <RenderImages breed={actualBreed} subBreed={actualSubBreed} deleteBreed={deleteBreed}/>
      </div>
    </div>
  );
};
