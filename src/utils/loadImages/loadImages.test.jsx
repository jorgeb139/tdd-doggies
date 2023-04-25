import { describe, test, expect } from "vitest";
import { act } from '@testing-library/react';

import { loadImages } from "./loadImages";
import { getDoggiesImages } from "../../services/getDoggiesImages/getDoggiesImages";
import { formatSubBreedString } from "../formatSubBreedString/formatSubBreedString";

vi.mock("../../services/getDoggiesImages/getDoggiesImages")
vi.mock("../formatSubBreedString/formatSubBreedString")

const setImages = vi.fn();
const setIsLoading = vi.fn();

describe("Load Images component tests", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  // TDD guided by ZOMBIES
  // Z-ero
  // Zombies -> Zero
  test('Should return no images if breeds is empty, not call setImages and setIsLoading change to false', async () => {

    // Arrange
    const breed = ''
    const subBreed = ''
    const qty = 3
    const mockBreedRandomImages = {
      message: [],
      status: "success",
    };
    getDoggiesImages.mockResolvedValueOnce(mockBreedRandomImages);

    // Act
    await loadImages(breed, subBreed, setImages, setIsLoading, qty);

    // Assert
    expect(setImages).not.toBeCalled();
    expect(setIsLoading).toBeCalledWith(false);
  });

  // ZombiEs -> Zero - Exceptions
  test("Should don't called setImages when received an error", async () => {

    // Arrange
    const expectedError = {
      message: 'Breed not found (sub breed does not exist',
      codeError: 4
    };
    const breed = 'Incorrect'
    const subBreed = ''
    const qty = 3

    getDoggiesImages.mockResolvedValueOnce(expectedError);

    // Act
    await loadImages(breed, subBreed, setImages, setIsLoading, qty);

    // Assert
    expect(setImages).not.toBeCalled();
    expect(setIsLoading).toBeCalledWith(false);
  });

  // zOmbies -> One
  test('Should return object with 3 props: Breed: Beagle, subBreed: empty and 1 image when API return only 1 image', async () => {

    // Arrange
    const breed = 'Beagle'
    const subBreed = ''
    const qty = 1
    const mockBreedBeagleResponse = {
      message: [
        "https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg",
      ],
      status: "success",
    };
    const mockBreedBeagleImages = {
      breed: "Beagle",
      subBreed: "",
      images: [
        "https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg",
      ],
    }
    getDoggiesImages.mockResolvedValueOnce(mockBreedBeagleResponse);
  
    // Act
    await loadImages(breed, subBreed, setImages, setIsLoading, qty);
    const setImagesCall = setImages.mock.calls[0][0];
    const setImagesState = setImagesCall([]);
  
    // Assert
    expect(setIsLoading).toBeCalledWith(false);

    expect(setImagesState).toHaveLength(1);
    expect(setImagesState[0]).toEqual(mockBreedBeagleImages);    
  });

  // zoMbies -> Many
  test('Should return 2 objects with 3 props, with multiple-images breeds and state with 1 breed previouslly loaded', async () => {

    // Arrange
    const breed = 'Beagle'
    const subBreed = ''
    const qty = 3
    const mockBreedBeagleResponse = {
      message: [
        "https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/1374053345_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/166407056_Milo.jpg",
      ],
      status: "success",
    };
    const mockBreedBeagleImages = {
      breed: "Beagle",
      subBreed: "",
      images: [
        "https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/1374053345_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/166407056_Milo.jpg",
      ],
    }
    const mockBreedHoundImages = {
      breed: "Hound",
      subBreed: "",
      images: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_988.jpg",
        "https://images.dog.ceo/breeds/hound-basset/n02088238_10005.jpg",
        "https://images.dog.ceo/breeds/hound-english/n02089973_3688.jpg",
      ],
    }
    getDoggiesImages.mockResolvedValueOnce(mockBreedBeagleResponse);
  
    // Act
    await loadImages(breed, subBreed, setImages, setIsLoading, qty);
    const setImagesCall = setImages.mock.calls[0][0];
    const setImagesState = setImagesCall([mockBreedHoundImages]);
  
    // Assert
    expect(setImagesState).toHaveLength(2);
    expect(setImagesState[0]).toEqual(mockBreedBeagleImages, mockBreedHoundImages);    
  });
  
  test('Should return 2 objects with 3 props, added 1 subbreed (Hound Afghan) with multiple-images breeds and state with 1 breed previouslly loaded', async () => {

    // Arrange
    const breed = ''
    const subBreed = 'Hound Afghan'
    const qty = 3
    const mockedFormatedSubBreed = { 
      breed: 'Hound', 
      subBreed: 'Afghan' 
    };
    const mockBreedHoundImages = {
      breed: "Hound",
      subBreed: "",
      images: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_988.jpg",
        "https://images.dog.ceo/breeds/hound-basset/n02088238_10005.jpg",
        "https://images.dog.ceo/breeds/hound-english/n02089973_3688.jpg",
      ],
    }
    const mockSubBreedHoundAfghanResponse = {
      message: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg",
      ],
      status: "success",
    };
    const mockSubBreedHoundAfghanImages = {
      breed: "Hound",
      subBreed: "Afghan",
      images: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg",
      ],
    };

    formatSubBreedString.mockReturnValueOnce(mockedFormatedSubBreed);
    getDoggiesImages.mockResolvedValueOnce(mockSubBreedHoundAfghanResponse);

    // Act
    await loadImages(breed, subBreed, setImages, setIsLoading, qty);
    const setImagesCall = setImages.mock.calls[0][0];
    const setImagesState = setImagesCall([mockBreedHoundImages]);
  
    // Assert
    expect(setImagesState).toHaveLength(2);
    expect(setImages).toHaveBeenCalledTimes(1);
    expect(setImages).toHaveBeenCalledWith(expect.any(Function))
    expect(setImagesState[0]).toEqual(mockSubBreedHoundAfghanImages, mockBreedHoundImages);    
  });
  
});
