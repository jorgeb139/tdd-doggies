import { formatSubBreedString } from "../formatSubBreedString/formatSubBreedString";

export const deleteImages = (deleteBreed, setIsFirstLoad, setImages, setIsLoading, images) => {
  if(deleteBreed){
    const breedsValues = formatSubBreedString(deleteBreed);
    let filteredImages = []
  
    if(typeof breedsValues === 'string'){
      filteredImages = images.filter((breedObject) => breedObject.breed !== breedsValues && breedObject.subBreed !== breedsValues)
    }else{
      filteredImages = images.filter((breedObject) => breedObject.breed !== breedsValues.breed || breedObject.subBreed !== breedsValues.subBreed)
    }
  
    if(filteredImages.length === 0){
      setIsFirstLoad(true);
    }
    setImages(filteredImages)
    setIsLoading(false);
  }
}
