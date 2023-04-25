export const formatSubBreedString = (subBreedString) => {
  const [breed, subBreed] = subBreedString.split(' ')

  if (!breed || !subBreed) return subBreedString
  
  return {breed, subBreed}
}
