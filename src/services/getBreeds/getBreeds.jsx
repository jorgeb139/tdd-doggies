import axios from "axios";

export const breedsBaseURL = `https://dog.ceo/api/breeds/list/all` 
export const getBreeds = async(url = breedsBaseURL) => {
  if (url === null || !url.includes("https://")) {
    const error = new Error("Incorrect url format");
    error.codeError = 1;
    throw error;
  }
  
  try {
    const {data} = await axios.get(url);
    if (!data || !data.status || !data.message) {
      const error = new Error (`Incorrect response format`)
      error.codeError =  4;
      throw error
    }
    return data
  } catch (e) {
    if (url !== breedsBaseURL) {
      const error = new Error(`No route found for "GET ${url}" with code: 0`);
      error.codeError =  2;
      throw error;
    }
    if (e.response && e.response.status === 500) {
      const error = new Error("Internal server error");
      error.codeError =  3;
      throw error;
    }
    throw e;
  }
};
