import { describe, test, expect, vi, afterEach } from "vitest";
import { formatBreeds } from "./formatBreeds";
import { getBreeds } from "../../services/getBreeds/getBreeds";

vi.mock("../../services/getBreeds/getBreeds");

describe("Get breed fetch function", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Should be a function", () => {
    // Act and Assert
    expect(typeof formatBreeds).toBe("function");
  });

  // TDD guided by ZOMBIES

  // Z-ero
  // ZombIes -> Zero - Interfaces
  test("Should return array with 'Seleccione una raza' when object is empty", async () => {
    // Arrange
    const mockedData = {}
    const response = ['Seleccione una raza']

    // Act
    getBreeds.mockResolvedValue(mockedData)
    const result = await formatBreeds();

    // Assert
    expect(result).toEqual(response);
  });

  test("Should return array with 'Seleccione una raza' when object has empty message", async () => {
    // Arrange
    const mockedData = { message: {}, status: "success" }
    const response = ['Seleccione una raza']

    // Act
    getBreeds.mockResolvedValue(mockedData)
    const result = await formatBreeds();

    // Assert
    expect(result).toEqual(response);
  });

  // ZombiEs -> Zero - Errors, exceptionals values
  test('Throw error when recived an incorrect response format error', async() => {

    // Arrange
    const expectedError = {
      message: 'Incorrect response format',
      codeError: 4
    };
  
    // Act
    getBreeds.mockResolvedValue(expectedError);
    try {
      await formatBreeds();
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expectedError.message);
      expect(error.codeError).toBe(expectedError.codeError);
    }
  });

  test('Throw error when consult was status 500', async() => {

    // Arrange
    const expectedError = {
      message: 'Internal server error',
      codeError: 3
    };

    // Act
    getBreeds.mockResolvedValue(expectedError);
    try {
      await formatBreeds();
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expectedError.message);
      expect(error.codeError).toBe(expectedError.codeError);
    }
  });
  
  // O-NE
  // zOmBIes -> One - Interfaces - Boundaries
  test("Should return array with one formatted breed and 'Seleccione una raza' when there is only one breed with no sub-breeds", async () => {
    // Arrange
    const mockedData = {
      message: {
        "beagle": []
      },
      status: "success"
    };
    const response = [
      'Seleccione una raza', 
      'Beagle'
    ]
  
    // Act
    getBreeds.mockResolvedValue(mockedData);
    const result = await formatBreeds();
  
    // Assert
    expect(result).toEqual(response);
  });
  
  test("Should return array with one formatted breed and 'Seleccione una raza' when there is only one breed with multiple sub-breeds", async () => {
    // Arrange
    const mockedData = {
      message: {
        "bulldog": [
          "boston",
          "english",
          "french"
        ]
      },
      status: "success"
    };
    const response = [
      'Seleccione una raza', 
      'Bulldog'
    ]
  
    // Act
    getBreeds.mockResolvedValue(mockedData);
    const result = await formatBreeds();
  
    // Assert
    expect(result).toEqual(response);
  });

  test("Should return array with one formatted breed and 'Seleccione una raza' when there is only one breed with a long name and spaces", async () => {
    // Arrange
    const mockedData = {
      message: {
        "affenpinscher african airedale akita appenzellerakitaairedaleafrican": []
      },
      status: "success"
    };
    const response = [
      'Seleccione una raza',
      'Affenpinscher african airedale akita appenzellerakitaairedaleafrican'
    ]
  
    // Act
    getBreeds.mockResolvedValue(mockedData);
    const result = await formatBreeds();
  
    // Assert
    expect(result).toEqual(response);
  });
  
  // zOmbiEs -> One - Errors
  test('Should throw error when response status is not success', async() => {
    // Arrange
    const mockedData = {
      message: {
        "beagle": []
      },
      status: "error"
    };

    const expectedError = {
      message: 'Status error',
      codeError: 5
    };
  
    // Act
    getBreeds.mockResolvedValue(mockedData);
    try {
      await formatBreeds();
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expectedError.message);
      expect(error.codeError).toBe(expectedError.codeError);
    }
  });
  
  test("Should return array with one formatted breed and 'Seleccione una raza' when there is only one breed with special characters and white spaces in the start and the end", async () => {
    // Arrange
    const mockedData = {
      message: {
        "    breed_with_special_chars!@#$%^&*()_+   ": []
      },
      status: "success"
    };
    const response = [
      'Seleccione una raza',
      'Breed with special chars'
    ]
  
    // Act
    getBreeds.mockResolvedValue(mockedData);
    const result = await formatBreeds();
  
    // Assert
    expect(result).toEqual(response);
  });

  // M-any
  // zoMbIes -> Many - Interfaces - Boundaries
  test('Should return an array of formatted breeds when there are two breeds', async () => {
    // Arrange
    const mockedData = {
      message: {
        australian: ["shepherd"],
        beagle: [],
      },
      status: "success"
    };
    const response = [
      'Seleccione una raza',
      'Australian',
      'Beagle',
    ]
  
    // Act
    getBreeds.mockResolvedValue(mockedData);
    const result = await formatBreeds();
  
    // Assert
    expect(result).toEqual(response);
  });

  // zoMbiEs -> Many - Exceptions Errors
  test('Should handle duplicate breed names', async () => {
    // Arrange
    const mockedData = {
      message: {
        "australian": [],
        "bulldog": [],
        "bulldog": []
      },
      status: "success"
    };
    const response = [
      'Seleccione una raza',
      'Australian',
      'Bulldog'
    ]
  
    // Act
    getBreeds.mockResolvedValue(mockedData);
    const result = await formatBreeds();
  
    // Assert
    expect(result).toEqual(response);
  });
  
  test("Should return array with 'Seleccione una raza' when object entries are only with special characters", async () => {
    // Arrange
    const mockedData = {
      message: {
        "!@#$%^&*()+": [],
        "{}|:<>?`~": []
      },
      status: "success"
    };
    const response = ['Seleccione una raza']
  
    // Act
    getBreeds.mockResolvedValue(mockedData);
    const result = await formatBreeds();
  
    // Assert
    expect(result).toEqual(response);
  });

});
