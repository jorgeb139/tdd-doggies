import { useState, useEffect, useRef } from 'react';

import './dropdownList.css'

export const DropdownList = ({breeds, onBreedChange, onSubBreedChange, breedBool}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filteredBreeds, setFilteredBreeds] = useState(breeds);

  const dropdownListRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);  

  useEffect(() => {
    setFilteredBreeds(breeds.filter(breed => breed.toLowerCase().includes(inputValue.toLowerCase())));
  }, [inputValue, breeds]);

  const handleClickOutside = (e) => {
    if (dropdownListRef.current && !dropdownListRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleChange = (e) => {
    setSelectedBreed(e.target.textContent);

    if (onBreedChange) {
      onBreedChange(e.target.textContent);
    } else if (onSubBreedChange){
      onSubBreedChange(e.target.textContent);
    }

    setInputValue('');
    setIsOpen(false);
  };

  const placeholderText = selectedBreed || (breedBool ? 'Seleccione una raza' : 'Seleccione una subraza');

  return (
    <div className='list_container' ref={dropdownListRef}>
      <div className={`dropdown_list ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
       <input type='text' className='dropdown_list-input' placeholder={placeholderText} value={inputValue} onChange={handleInputChange}/>
        <div className='breeds_options_container'>
          <div className={`breeds_options ${isOpen ? "active" : ""}`}>
            {filteredBreeds.map((breed, index) => (
              <div key={index} onClick={(e) => handleChange(e)}>
                {breed}
              </div>
            ))}
          </div>      
        </div>
      </div>
    </div>
  )
}
