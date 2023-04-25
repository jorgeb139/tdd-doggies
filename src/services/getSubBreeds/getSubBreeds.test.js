import axios from "axios";

import { describe, test, expect, vi, afterEach } from "vitest";
import { subBreedsBaseURL, getSubBreeds } from "./getSubBreeds";

vi.mock("axios");

describe("Get breed fetch function", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should be a function", () => {
    // Act and Assert
    expect(typeof getSubBreeds).toBe("function");
  });

  // Test error related with URL before API calls
  test("URL NULL", async () => {
    const breed = "Hound Afghan";
    const url = null;
    const codeError = 3;

    axios.get.mockRejectedValueOnce(new Error("Incorrect url format"));

    try {
      // Act
      await getSubBreeds(breed, url);
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.codeError).toBe(codeError);
    }
  });

  // Test error related with API response
  test.each([
    ["Breed is empty", "", "", 1],
    ["Breed is null", null, "", 1],
    ["Breed is NaN", NaN, "", 1],
    ["Breed is number", 1, "", 1],
    [
      "404 URL in correct domain",
      "hound",
      "https://dog.ceo/api/breed/hound/listttt",
      2,
    ],
  ])("%s", async (errorMessage, breed, url, codeError) => {
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });

    try {
      // Act
      await getSubBreeds(breed, url);
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.codeError).toBe(codeError);
      expect(axios.get).toHaveBeenCalledWith(url);
    }
  });

  test("Should return error data when the response object has an incorrect structure because data or server problems", async () => {
    // Arrange
    const breed = "hound";
    const mockBreeds = {
      subBreeds: [
        "afghan",
        "basset",
        "blood",
        "english",
        "ibizan",
        "plott",
        "walker",
      ],
      statusMessage: "success",
    };
    const expectedError = {
      message: "Incorrect response format",
      codeError: 4,
    };

    // Act
    axios.get.mockResolvedValueOnce({ data: mockBreeds });

    try {
      // Act
      await getSubBreeds(breed);
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expectedError.message);
      expect(error.codeError).toBe(expectedError.codeError);
    }
  });

  test("Should be return array with multiple values when breed is hound", async () => {
    // Arrange
    const breed = "hound";
    const mockBreeds = {
      message: [
        "afghan",
        "basset",
        "blood",
        "english",
        "ibizan",
        "plott",
        "walker",
      ],
      status: "success",
    };

    // Act
    axios.get.mockResolvedValueOnce({ data: mockBreeds });
    const breeds = await getSubBreeds(breed);

    // Assert
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${subBreedsBaseURL(breed)}`);
    expect(breeds.status).toBeDefined();
    expect(breeds.status).toStrictEqual(mockBreeds.status);
    expect(breeds.message).toBeDefined();
    expect(breeds.message).toStrictEqual(mockBreeds.message);
  });
});
