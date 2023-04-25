import { useState } from "react"

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
    <>
      <div data-testid="breed-selector" className="container">
        <BreedsList onBreedChange={handleBreedsChange} />
      </div>
      <div data-testid="sub-breed-selector">
        <SubBreedsList breed={actualBreed} onSubBreedChange={handleSubBreedsChange} />
      </div>
      <div data-testid="rendered-images">
        <RenderImages breed={actualBreed} subBreed={actualSubBreed}/>
      </div>
    </>
  );
};
