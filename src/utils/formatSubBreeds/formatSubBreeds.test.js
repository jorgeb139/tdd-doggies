import { describe, test, expect, vi, afterEach } from "vitest";
import { formatSubBreeds } from "./formatSubBreeds";
import { getSubBreeds } from "../../services/getSubBreeds/getSubBreeds";

vi.mock("../../services/getSubBreeds/getSubBreeds");

describe("Get breed fetch function", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Should be a function", () => {
    // Act and Assert
    expect(typeof formatSubBreeds).toBe("function");
  });

  // TDD guided by ZOMBIES

  // Z-ero
  // ZombIes -> Zero - Interfaces
  test("Should return an empty array when there are no sub-breeds", async () => {
    // Arrange
    const mockedData = { message: [], status: "success" };
    const breed = "Affenpinscher";

    // Act
    getSubBreeds.mockResolvedValue(mockedData);
    const result = await formatSubBreeds(breed);

    // Assert
    expect(result).toEqual([]);
  });

  // ZomBies -> Zero - Boundaries
  test("Should return an empty array when breed is an empty string", async () => {
    // Arrange
    const mockedData = { message: {}, status: "success" };
    const breed = "";

    // Act
    getSubBreeds.mockResolvedValue(mockedData);
    const result = await formatSubBreeds(breed);

    // Assert
    expect(result).toEqual([]);
  });

  // // ZombiEs -> Zero - Errors, exceptionals values
  test("Should throw a custom error when response contains codeError - invalid breed", async () => {
    // Arrange
    const expectedError = {
      message: "Breed not found or incorrect value",
      codeError: 1,
    };
    const breed = "Perrito";

    // Act
    getSubBreeds.mockResolvedValue(expectedError);
    try {
      await formatSubBreeds(breed);
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expectedError.message);
      expect(error.codeError).toBe(expectedError.codeError);
    }
  });

  // // O-NE
  // // zOmBIes -> One - Interfaces - Boundaries
  test("Should return array with one formatted sub-breed and Seleccione una subraza when there is only one sub-breed", async () => {
    // Arrange
    const mockedData = {
      message: ["shepherd"],
      status: "success",
    };
    const breed = "Australian";
    const response = ["Seleccione una subraza", "Australian Shepherd"];

    // Act
    getSubBreeds.mockResolvedValue(mockedData);
    const result = await formatSubBreeds(breed);

    // Assert
    expect(result).toEqual(response);
  });

  test("Should return array with one formatted sub-breed and Seleccione una subraza when there is only one sub breed with a long name and spaces", async () => {
    // Arrange
    const mockedData = {
      message: [
        "affenpinscher african airedale akita appenzellerakitaairedaleafrican",
      ],
      status: "success",
    };
    const breed = "Breed";
    const response = [
      "Seleccione una subraza",
      "Breed Affenpinscher african airedale akita appenzellerakitaairedaleafrican",
    ];

    // Act
    getSubBreeds.mockResolvedValue(mockedData);
    const result = await formatSubBreeds(breed);

    // Assert
    expect(result).toEqual(response);
  });

  test("Should return an empty array when pass incorrect breed", async () => {
    // Arrange
    const mockedData = {
      message: [],
      status: "success",
    };
    const response = [];

    // Act
    getSubBreeds.mockResolvedValue(mockedData);
    const result = await formatSubBreeds();

    // Assert
    expect(result).toEqual(response);
  });

  // zOmbiEs -> One - Errors
  test("Should throw error when response status is not success", async () => {
    // Arrange
    const mockedData = {
      message: {
        beagle: [],
      },
      status: "error",
    };

    const expectedError = {
      message: "Status error",
      codeError: 5,
    };

    // Act
    getSubBreeds.mockResolvedValue(mockedData);
    try {
      await formatSubBreeds();
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expectedError.message);
      expect(error.codeError).toBe(expectedError.codeError);
    }
  });

  test("Should return array with one formatted sub breed when there is only one sub breed with special characters and white spaces in the start and the end", async () => {
    // Arrange
    const mockedData = {
      message: ["    sub breed_with_special_chars!@#$%^&*()_+   "],
      status: "success",
    };
    const breed = "African";
    const response = [
      "Seleccione una subraza",
      "African Sub breed with special chars",
    ];

    // Act
    getSubBreeds.mockResolvedValue(mockedData);
    const result = await formatSubBreeds(breed);

    // Assert
    expect(result).toEqual(response);
  });

  test("Should return an empty array when there is only one sub breed with special characters", async () => {
    // Arrange
    const mockedData = {
      message: ["!@#$%^&*()"],
      status: "success",
    };
    const breed = "African";
    const response = [];

    // Act
    getSubBreeds.mockResolvedValue(mockedData);
    const result = await formatSubBreeds(breed);

    // Assert
    expect(result).toEqual(response);
  });

  // M-any
  // zoMbIes -> Many - Interfaces - Boundaries
  test("Should return an array of formatted breeds when there are two breeds", async () => {
    // Arrange
    const mockedData = {
      message: ["bernese", "swiss"],
      status: "success",
    };
    const response = [
      "Seleccione una subraza",
      "Mountain Bernese",
      "Mountain Swiss",
    ];
    const breed = "Mountain";

    // Act
    getSubBreeds.mockResolvedValue(mockedData);
    const result = await formatSubBreeds(breed);

    // Assert
    expect(result).toEqual(response);
  });

  // // zoMbiEs -> Many - Exceptions Errors
  test("Should return an array of formatted breeds when there are three breeds, one of them is invalid", async () => {
    // Arrange
    const mockedData = {
      message: ["bernese", "#$%#$&#&#", "swiss"],
      status: "success",
    };
    const response = [
      "Seleccione una subraza",
      "Mountain Bernese",
      "Mountain Swiss",
    ];
    const breed = "Mountain";

    // Act
    getSubBreeds.mockResolvedValue(mockedData);
    const result = await formatSubBreeds(breed);

    // Assert
    expect(result).toEqual(response);
  });
  test("Should handle duplicate breed names", async () => {
    // Arrange
    const mockedData = {
      message: ["bernese", "bernese", "swiss"],
      status: "success",
    };
    const response = [
      "Seleccione una subraza",
      "Mountain Bernese",
      "Mountain Swiss",
    ];
    const breed = "Mountain";

    // Act
    getSubBreeds.mockResolvedValue(mockedData);
    const result = await formatSubBreeds(breed);

    // Assert
    expect(result).toEqual(response);
  });
});
