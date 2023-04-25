import { getDoggiesImages } from "../../services/getDoggiesImages/getDoggiesImages";
import { formatSubBreedString } from "../formatSubBreedString/formatSubBreedString";

export const loadImages = async(breed = null, subBreed = null, setImages, setIsLoading, imagesQty) => {
  let newBreed = breed;
  let newSubBreed = subBreed;

  if (subBreed.length > 0) {
    const breedsValues = formatSubBreedString(subBreed);
    newBreed = breedsValues.breed;
    newSubBreed = breedsValues.subBreed;
  }

  const response = await getDoggiesImages(newBreed, newSubBreed, imagesQty);

  if (response.message.length > 0 && !response.codeError) {
    setImages((prevImages) => [
      {
        breed: newBreed,
        subBreed: newSubBreed,
        images: response.message,
      },
      ...prevImages
    ]);
  }
  setIsLoading(false);
}
