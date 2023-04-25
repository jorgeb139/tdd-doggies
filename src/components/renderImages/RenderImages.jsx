import { useEffect, useState } from "react";
import { loadImages } from "../../utils/loadImages/loadImages";
import { deleteImages } from "../../utils/deleteImages/deleteImages";

export const RenderImages = ({ breed = '', subBreed = '', imagesQty = 3, deleteBreed = ''}) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (breed !== 'Seleccione una raza' && subBreed !== 'Seleccione una subraza'){
      if ((breed && breed.length > 0) || (subBreed && subBreed.length > 0)) {
        breed = breed.toLowerCase()
        subBreed = subBreed.toLowerCase()
        setIsLoading(true);
        loadImages(breed, subBreed, setImages, setIsLoading, imagesQty);
        setIsFirstLoad(false);
      }
      else if(deleteBreed.length){
        setIsLoading(true);
        deleteImages(deleteBreed, setIsFirstLoad, setImages, setIsLoading, images)
      }
    }
  }, [breed, subBreed, deleteBreed]);  

  return (
    <>
      {isFirstLoad ? (
        'Seleccione una raza o subraza'
        ) : 
        isLoading ? (
        'Cargando imágenes...'
        ) : images.length === 0 ? (
        'No hay imágenes para mostrar'
        ) : (
        images.map((breedImages, breedIndex) =>
          breedImages.images.map((image, index) => (
            <img
              key={`${breedIndex}-${index}`}
              src={image}
              alt={`${breedImages.subBreed ? breedImages.subBreed : breedImages.breed}-${index}`}
              data-testid={`image-${breedIndex}-${index}`}
            />
          ))
        )
      )}
    </>
  );   
  
};

