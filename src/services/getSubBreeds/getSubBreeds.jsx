import axios from "axios";

export const subBreedsBaseURL = (breed) => `https://dog.ceo/api/breed/${breed}/list` 

export const getSubBreeds = async( breed, url = subBreedsBaseURL(breed) ) => {
  try {
    const {data} = await axios.get(url);
    if (!data || !data.status || !data.message) {
      const error = new Error (`Incorrect response format`)
      error.codeError =  4;
      throw error
    }
    return data
  } catch (e) {
    if (typeof breed !== "string" || breed.length === 0) {
      const error = new Error("Breed not found or incorrect value");
      error.codeError = 1;
      throw error;
    } 
    if (e.response && e.response.status === 404) {
      const error = new Error("URL incorrect or missing");
      error.codeError = 2;
      throw error;
    }
    if (url === null || !url.includes("https://")) {
      const error = new Error("Incorrect url format");
      error.codeError =  3;
      throw error;
    }
  }
}
