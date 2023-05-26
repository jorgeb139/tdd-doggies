import './home.css';
import { BreedsList } from "../../components/lists/breedsList/BreedsList"
import { SubBreedsList } from "../../components/lists/subBreedsList/SubBreedsList"
import { RenderImages } from "../../components/renderImages/RenderImages"
import { useBreedContext } from "../../context/BreedContext";

export const Home = () => {
  const {
    actualBreed,
    actualSubBreed,
    deleteBreed,
    handleBreedsChange,
    handleSubBreedsChange,
    handleDeleteBreed,
  } = useBreedContext();

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
