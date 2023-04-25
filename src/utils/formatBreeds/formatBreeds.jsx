import { getBreeds } from '../../services/getBreeds/getBreeds';
import CustomError from '../CustomError.js'

export const formatBreeds = async() => {
  const response = await getBreeds();

  if (response.codeError) {
    throw new CustomError(response.message, response.codeError);
  }

  if (response.status === 'error') {
    throw new CustomError('Status error', 5);
  }

  const breeds = response.message;
  const formattedBreeds = ['Seleccione una raza'];

  for (const breed in breeds) {
    const breedTrimmed = breed.trim();
    const breedWithoutUnderscores = breedTrimmed.replace(/_/g, ' ');
    const breedWithoutSpecialChars = breedWithoutUnderscores.replace(/[^a-zA-Z\s]/g, '');
    const breedCapitalized = breedWithoutSpecialChars.charAt(0).toUpperCase() + breedWithoutSpecialChars.slice(1).trim();
    if (!formattedBreeds.includes(breedCapitalized) && breedCapitalized.length > 0) {
      formattedBreeds.push(breedCapitalized);
    }
  }

  return formattedBreeds;
};
