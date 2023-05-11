export const formatSubBreedString = (subBreedString) => {
  const [subBreed, breed] = subBreedString.split(' ')

  if (!breed || !subBreed) return subBreedString
  
  return {breed, subBreed}
}
