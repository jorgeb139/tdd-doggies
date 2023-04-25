import { describe, test, expect } from "vitest";
import { formatSubBreedString } from "./formatSubBreedString";

describe("formatSubBreedString", () => {

  test("Should return an object with breed and subBreed when given a subBreed string", () => {

    // Arrange
    const subBreedString = "Australian Shepherd";
    const breedExpected = "Australian"
    const subBreedExpected = "Shepherd"

    // Act
    const result = formatSubBreedString(subBreedString);

    // Assert
    expect(result).toEqual({ breed: breedExpected, subBreed: subBreedExpected });
  });

  test("Should return the original string when there is no subBreed in the given string", () => {

    // Arrange
    const breedString = "Bulldog";
    const expectedResult = "Bulldog";
  
    // Act
    const result = formatSubBreedString(breedString);
  
    // Assert
    expect(result).toEqual(expectedResult);
  });

});
