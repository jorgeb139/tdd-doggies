import axios from "axios"

import {describe , test , expect, vi, afterEach } from "vitest";
import { getDoggiesImages, baseURL } from "./getDoggiesImages"; 

vi.mock('axios')
describe('Get breed fetch function', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should be a function', () => {
    // Act and Assert
    expect(typeof getDoggiesImages).toBe('function');
  });

// Test error related with URL before API calls
test.each([
  ['The url is valid format but another domain', "hound", "afghan", "https://google.com", 1 ],
  ['The url is null', "hound", "afghan", null, 1 ],
  ['The url is NaN', "hound", "afghan", NaN, 1 ],
  ['The url is not valid', "hound", "afghan", 'fakeurl', 1 ],
])('%s', async (errorMessage, breed, subBreed, url, codeError) => {
  try {
    await getDoggiesImages(breed, subBreed, 3, url);
  } catch (error) {
    // Act
    expect(error).toBeInstanceOf(Error);
    expect(error.codeError).toBe(codeError);
  }
});

// Test error breed and sub breed values
test.each([
  ['The breed is empty', "", "afghan", 2 ],
  ['Breed is null', null, "afghan", 2 ],
  ['SubBreed is null', 'hound', null, 3 ],
  ['The sub breed is a number', "hound", 1, 3 ],
])('%s', async (errorMessage, breed, subBreed, codeError) => {
  // Arrange
  const url = ''
  const mockedErrorData = {
    status: "error",
    message: "Breed not found (sub breed does not exist)",
    code: 404
  };
  axios.get.mockRejectedValueOnce({ data: mockedErrorData });
  try {
    await getDoggiesImages(breed, subBreed, 3, url);
  } catch (error) {
    // Act
    expect(error).toBeInstanceOf(Error);
    expect(error.codeError).toBe(codeError);
  }
});

// Test error related with API responses when breed or sub breed is not valid
test.each([
  ['The breed is string but incorrect value', "houndddd", 'afghan', 4 ],
  ['The sub breed is string but incorrect value', "hound", 'mini-guau', 4 ],
])('%s', async (errorMessage, breed, subBreed, codeError) => {
  // Arrange
  const url = ''
  const mockedData = {
    status: "error",
    message: "Breed not found (sub breed does not exist)",
    code: 404
  };
  axios.get.mockResolvedValueOnce({ data: mockedData });
  try {
    await getDoggiesImages(breed, subBreed, 3, url);
  } catch (error) {
    // Act
    expect(error).toBeInstanceOf(Error);
    expect(error.codeError).toBe(codeError);
  }
});

  test("Should return error data when the response object has an incorrect structure data", async () => {
        
    // Arrange
    const imagesQty = 3
    const breed = "australian";
    const subBreed = "";
    const mockResponse = {
      breedImages: [
        "https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg",
        "https://images.dog.ceo/breeds/australian-shepherd/pepper2.jpg",
        "https://images.dog.ceo/breeds/australian-shepherd/sadie.jpg",
      ],
      statusMessage: "success",
    };
    const expectedError = {
      message: 'Data structure is not valid',
      codeError: 5
    };
    const url = baseURL(breed, subBreed, imagesQty);

    axios.get.mockResolvedValueOnce({ data: mockResponse });

    try {
      // Act 
      await getDoggiesImages(breed, subBreed, imagesQty, url);
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expectedError.message);
      expect(error.codeError).toBe(expectedError.codeError);
    }
  });

  test("Should return 3 random images when input is australian, the 3 url must to be string and include https://images.dog.ceo", async () => {
        
    // Arrange
    const imagesQty = 3
    const breed = "australian";
    const subBreed = "";
    const mockBreedRandomImages = {
      message: [
        "https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg",
        "https://images.dog.ceo/breeds/australian-shepherd/pepper2.jpg",
        "https://images.dog.ceo/breeds/australian-shepherd/sadie.jpg",
      ],
      status: "success",
    };

    // Act
    axios.get.mockResolvedValueOnce({ data: mockBreedRandomImages });
    const url = baseURL(breed, subBreed, imagesQty);
    const images = await getDoggiesImages(breed, subBreed, imagesQty, url);

    // Assert
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url);
    expect(images.message.length).toBe(3);
    expect(typeof images.message[0]).toBe("string");
    expect(images.message[0].includes("https://images.dog.ceo")).toBeTruthy();
  });

  test.each([
    ['Images Qty is string', 'four'],
    ['Images Qty is null', null],
    ['Images Qty is NaN', NaN],
    ['Images Qty is negative number', -1],
    ['Images Qty is decimals number', 1,5],
    ['Images Qty is boolean', false],
  ])('%s', async (message, imagesQty) => {

    // Arrange
    const breed = "australian";
    const subBreed = "";
    const mockBreedRandomImages = {
      message: [
        "https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg",
      ],
      status: "success",
    };

    // Act
    axios.get.mockResolvedValueOnce({ data: mockBreedRandomImages });
    const url = baseURL(breed, subBreed, imagesQty);
    const images = await getDoggiesImages(breed, subBreed, imagesQty, url);

    // Assert
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(images.message.length).toBe(1);

  });
    
});
