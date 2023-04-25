import axios from "axios";

const startURL = 'https://dog.ceo/api/breed/'
export const baseURL = (breed, subBreed, imagesQty) => {
  const qty = Number.isInteger(imagesQty) ? imagesQty : 1
  const subBreedQuery = subBreed.length ? `/${subBreed}` : ''
  
  return `${startURL}${breed}${subBreedQuery}/images/random/${qty}`
}
export const getDoggiesImages = async ( breed, subBreed, imagesQty = 3, url ) => {
  if(typeof subBreed !== 'string'){
    const error = new Error (`Incorrect sub breed format or value`)
    error.codeError =  3;
    throw error
  }
  if (!breed || typeof breed !== 'string') {
    const error = new Error(`Incorrect breed format or value`);
    error.codeError = 2;
    throw error;
  }
  url = url || baseURL(breed, subBreed, imagesQty);

  if (!url || !url.includes(startURL) || !breed) {
    const error = new Error(`Please provide a valid url`);
    error.codeError = 1;
    throw error;
  }

  try{
    const baseURL = url;
    const { data } = await axios.get(baseURL);
    if (data && data.code && data.code === 404) {
      const error = new Error(`Breed not found (sub breed does not exist)`);
      error.codeError = 4;
      throw error;
    }
    if (data && (!data.message || !data.status)){
      const error = new Error(`Data structure is not valid`);
      error.codeError = 5;
      throw error;
    }
    return data;
  }catch(e){
    throw e
  }
};
