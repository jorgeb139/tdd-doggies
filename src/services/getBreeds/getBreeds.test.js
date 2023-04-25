import axios from "axios";

import {describe, test, expect, vi, afterEach } from "vitest";
import { breedsBaseURL, getBreeds } from "./getBreeds";

vi.mock('axios')

describe('Get breed fetch function', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should be a function', () => {
    // Act and Assert
    expect(typeof getBreeds).toBe('function');
  });

  // Test error related with URL before API calls
  test.each([
    ['Incorrect url format', "fake_url", 1 ],
    ['URL NULL', null, 1 ],
  ])('%s', async (errorMessage, url, codeError) => {
    try {
      // Act
      await getBreeds(url);
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.codeError).toBe(codeError);
    }
  });
  

  // Test error related with API response
  test.each([
    ['404 URL in correct domain', "https://dog.ceo/api/breeds/list/allll", 2 ],
  ])('%s', async (errorMessage, url, codeError) => {
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });

    try {
      // Act
      await getBreeds(url);
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.codeError).toBe(codeError);
      expect(axios.get).toHaveBeenCalledWith(url);
    }
  });

  test("Should return error data when the response object has an incorrect structure data", async () => {

    // Arrange
    const mockResponse = {
      breeds: {
        australian: [ 'shepherd' ],
        basenji: [],
      },
      codeStatus: 'success'
    }
    const expectedError = {
      message: 'Incorrect response format',
      codeError: 4
    };

    axios.get.mockResolvedValueOnce({ data: mockResponse });

    try {
      // Act
      await getBreeds();
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expectedError.message);
      expect(error.codeError).toBe(expectedError.codeError);
    }
  });
    
  test("Should throw custom error when API call returns a 500 status code", async () => {
    
    // Arrange
    const mockError = {
      response: {
        status: 500,
        data: {
          message: 'Internal server error',
          codeError: 3
        }
      }
    };

    axios.get.mockRejectedValueOnce(mockError);
  
    try {
      // Act
      await getBreeds();
    } catch (error) {
      // Assert
      expect(axios.get).toHaveBeenCalledWith(breedsBaseURL);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Internal server error");
      expect(error.codeError).toEqual(3);
    }
  });  

  test('Should be success when api was consulted correctly and return the correct format', async () => {

    // Arrange
    const mockBreeds = {
      message: {
        australian: [ 'shepherd' ],
        basenji: [],
      },
      status: 'success'
    }
    
    // Act
    axios.get.mockResolvedValueOnce({ data: mockBreeds });
    const breeds = await getBreeds();

    // Assert
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${breedsBaseURL}`);
    expect( breeds.status ).toBeDefined();
    expect( breeds.status ).toStrictEqual(mockBreeds.status);
    expect( breeds.message ).toBeDefined();
    expect( breeds.message ).toStrictEqual(mockBreeds.message);
  });
    
});
