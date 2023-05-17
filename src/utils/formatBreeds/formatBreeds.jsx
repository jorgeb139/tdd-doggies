import { getBreeds } from '../../services/getBreeds/getBreeds';
import CustomError from '../CustomError.js'

export const formatBreeds = async(t) => {
  const response = await getBreeds();

  if (response.codeError) {
    throw new CustomError(response.message, response.codeError);
  }

  if (response.status === 'error') {
    throw new CustomError('Status error', 5);
  }

  const breeds = response.message;
  const formattedBreeds = [{label: t('selectBreed'), value: 'Seleccione una raza'}];

  for (const breed in breeds) {
    const breedTrimmed = breed.trim();
    const breedWithoutUnderscores = breedTrimmed.replace(/_/g, ' ');
    const breedWithoutSpecialChars = breedWithoutUnderscores.replace(/[^a-zA-Z\s]/g, '');
    const breedCapitalized = breedWithoutSpecialChars.charAt(0).toUpperCase() + breedWithoutSpecialChars.slice(1).trim();
    
    const breedObject = {label: breedCapitalized, value: breedCapitalized};
    
    const breedExists = formattedBreeds.some(b => b.value === breedCapitalized);
    if (!breedExists && breedCapitalized.length > 0) {
      formattedBreeds.push(breedObject);
    }
  }
  
  return formattedBreeds;
  
};
