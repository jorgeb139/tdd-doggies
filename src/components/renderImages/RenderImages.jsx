import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import './renderImages.css';
import { loadImages } from "../../utils/loadImages/loadImages";
import { deleteImages } from "../../utils/deleteImages/deleteImages";

export const RenderImages = ({ breed = '', subBreed = '', imagesQty = 4, deleteBreed = ''}) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    if (breed !== 'Seleccione una raza' && subBreed !== 'Seleccione una subraza'){
      if(deleteBreed.length){
        setIsLoading(true);
        deleteImages(deleteBreed.toLowerCase(), setIsFirstLoad, setImages, setIsLoading, images)
      }
      else if ((breed && breed.length > 0) || (subBreed && subBreed.length > 0)) {
        breed = breed.toLowerCase()
        subBreed = subBreed.toLowerCase()
        setIsLoading(true);
        loadImages(breed, subBreed, setImages, setIsLoading, imagesQty);
        setIsFirstLoad(false);
      }
    }
  }, [breed, subBreed, deleteBreed]);  
  
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };  

  return (
    <>
      <div data-testid="rendered-images" className="container_grid">
        {isFirstLoad ? (
          t('selectBreedOrSubbreedToShow')
        ) : isLoading ? (
          t('loadingImages')
        ) : images.length === 0 ? (
          t('noImagesToShow')
        ) : (
        images.map((breedData, breedIndex) =>
          breedData.images.map((image, index) => (
            <div className="card" key={`${breedIndex}-${index}`}>
              <div className="card_image">
                <FontAwesomeIcon className="card_image-icon" icon={faUpRightAndDownLeftFromCenter} />
                <img
                  className="card_image-image"
                  src={image}
                  alt={`${breedData.subBreed ? breedData.subBreed : breedData.breed}-${index}`}
                  data-testid={`image-${breedIndex}-${index}`}
                  onClick={() => openModal(image)}
                />
              </div>
              <h2 className="card_text-h2">
                {breedData.subBreed.length !== 0 ? `${breedData.subBreed} ${breedData.breed}` : breedData.breed}
              </h2>
            </div>
          ))
        ))}
      </div>
      {isModalOpen && (
        <div
          className="modal-background"
          onClick={() => {
            closeModal();
          }}
        >
          <div className="modal">
            <img className="modal-image" src={selectedImage} alt="Doggies image" />
          </div>
        </div>
      )}
    </>
  );    
};

