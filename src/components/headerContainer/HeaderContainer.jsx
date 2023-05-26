import { useEffect, useState } from "react";

import { LanguageSelector } from "../languageSelector/LanguageSelector";
import { DarkModeSelector } from "../darkModeSelector/DarkModeSelector";
import "./headerContainer.css";
import { BreedsList } from "../lists/breedsList/BreedsList";
import { SubBreedsList } from "../lists/subBreedsList/SubBreedsList";
import { useBreedContext } from '../../context/BreedContext';

export const HeaderContainer = () => {
  const [isSticky, setIsSticky] = useState(false);

  const {
    actualBreed,
    deleteBreed,
    handleBreedsChange,
    handleSubBreedsChange,
    handleDeleteBreed,
  } = useBreedContext();

  const handleScroll = () => {
    if (window.scrollY >= 200) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`fixed_header ${isSticky ? 'is_sticky' : ''}`}>
        <div className="fixed_breed_selector">
          <BreedsList 
            onBreedChange={handleBreedsChange} 
            onDeleteBreed={handleDeleteBreed} 
          />
        </div>
        <div className="fixed-sub-breed-selector">
          <SubBreedsList 
            breed={actualBreed} 
            onSubBreedChange={handleSubBreedsChange} 
            onDeleteBreed={handleDeleteBreed} 
            deleteBreed={deleteBreed} 
          />
        </div>
      </div>
      <div className="header_container">
        <div className="darkmode-selector_app">
          <DarkModeSelector />
        </div>
        <div className="language-selector_app">
          <LanguageSelector />
        </div>
      </div>
    </>
  );  
};
