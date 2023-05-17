import { getSubBreeds } from '../../services/getSubBreeds/getSubBreeds';
import CustomError from '../CustomError.js';

export const formatSubBreeds = async (breed, t) => {

  if (breed === '') {
    return [];
  }else if (breed){
    breed = breed.toLowerCase()
  }

  const response = await getSubBreeds(breed);

  if (response.codeError) {
    throw new CustomError(response.message, response.codeError);
  }
  if (response.status === 'error') {
    throw new CustomError('Status error', 5);
  }

  const subBreeds = response.message;
  const formattedSubBreeds = [];

  if (subBreeds && subBreeds.length > 0) {
    for (const subBreed of subBreeds) {
      const subBreedTrimmed = subBreed.trim();
      const subBreedWithoutUnderscores = subBreedTrimmed.replace(/_/g, ' ');
      const subBreedWithoutSpecialChars = subBreedWithoutUnderscores.replace(/[^a-zA-Z\s]/g, '');
      const subBreedCapitalized = subBreedWithoutSpecialChars.charAt(0).toUpperCase() + subBreedWithoutSpecialChars.slice(1).trim();      
      
      const breedCapitalized = breed.charAt(0).toUpperCase() + breed.slice(1).trim();      
      
      if (!formattedSubBreeds.includes(`${subBreedCapitalized} ${breedCapitalized}`) && subBreedCapitalized.length > 0) {
        if(formattedSubBreeds.length === 0){
          formattedSubBreeds.push({ label: t('selectSubBreed'), value: 'Seleccione una subraza'});
        }
        formattedSubBreeds.push({ label: `${subBreedCapitalized} ${breedCapitalized}`, value: `${subBreedCapitalized} ${breedCapitalized}` });
      }
    }
  }

  return formattedSubBreeds;
};