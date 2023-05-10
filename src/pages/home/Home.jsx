import { useState } from "react"
import './home.css';

import { BreedsList } from "../../components/lists/breedsList/BreedsList"
import { SubBreedsList } from "../../components/lists/subBreedsList/SubBreedsList"
import { RenderImages } from "../../components/renderImages/RenderImages"

export const Home = () => {
  const [actualBreed, setActualBreed] = useState('')
  const [actualSubBreed, setActualSubBreed] = useState('')

  const handleBreedsChange = (breed) => {
    setActualBreed(breed);
  };
  
  const handleSubBreedsChange = (subBreed) => {
    setActualSubBreed(subBreed);
  };
  
  return (
    <div className="container">
      <div data-testid="breed-selector" className="container__selector">
        <BreedsList onBreedChange={handleBreedsChange} />
      </div>
      <div data-testid="sub-breed-selector" className="container__selector">
        <SubBreedsList breed={actualBreed} onSubBreedChange={handleSubBreedsChange} />
      </div>
      <RenderImages breed={actualBreed} subBreed={actualSubBreed}/>
    </div>
  );
};
