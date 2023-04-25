import { describe, test, expect } from "vitest";
import { deleteImages } from "./deleteImages";
import { formatSubBreedString } from "../formatSubBreedString/formatSubBreedString";

vi.mock("../formatSubBreedString/formatSubBreedString")

const setImages = vi.fn();
const setIsLoading = vi.fn();
const setIsFirstLoad = vi.fn();

describe("Load Images component tests", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  // TDD guided by ZOMBIES
  // Z-ero
  // ZombiEs -> Zero - Exceptions
  test('Should not to call any set function if breeds is empty and state is empty', () => {

    // Arrange
    const deleteBreed = ''
    const images = []

    // Act
    deleteImages(deleteBreed, setIsFirstLoad, setImages, setIsLoading, images);

    // Assert
    expect(setImages).not.toBeCalled();
    expect(setIsLoading).not.toBeCalledWith();
    expect(setIsFirstLoad).not.toBeCalledWith();
  });

  // O-ne
  // zOmBies -> One - Boundary
  test('Should delete the unique breed when pass Beagle like deleteBreed, change setIsFirstLoad and setImages is empty array', () => {

    // Arrange
    const deleteBreed = 'Beagle'
    const images = [
      {
        breed: "Beagle",
        subBreed: "",
        images: [
          "https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg",
          "https://images.dog.ceo/breeds/beagle/1374053345_Milo.jpg",
          "https://images.dog.ceo/breeds/beagle/166407056_Milo.jpg",
        ],
      }
    ]

    formatSubBreedString.mockReturnValueOnce(deleteBreed);

    // Act
    deleteImages(deleteBreed, setIsFirstLoad, setImages, setIsLoading, images);

    // Assert
    expect(setImages).toBeCalledWith([]);
    expect(setIsLoading).toBeCalledWith(false);
    expect(setIsFirstLoad).toBeCalledWith(true);
  });

  // zOmbiEs -> One - Exceptions
  test('Should the same array when pass incorrect breed or sub breed', () => {

    // Arrange
    const deleteBreed = 'Breed'
    const images = [
      {
        breed: "Beagle",
        subBreed: "",
        images: [
          "https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg",
          "https://images.dog.ceo/breeds/beagle/1374053345_Milo.jpg",
          "https://images.dog.ceo/breeds/beagle/166407056_Milo.jpg",
        ],
      }
    ]

    formatSubBreedString.mockReturnValueOnce(deleteBreed);

    // Act
    deleteImages(deleteBreed, setIsFirstLoad, setImages, setIsLoading, images);

    // Assert
    expect(setImages).toBeCalledWith(images);
  });

  // M-any
  // zoMBIes -> Many - Interfaces - Boundary
  test('Should delete one breed when pass Beagle like deleteBreed, return object with 1 prop', () => {

    // Arrange
    const deleteBreed = 'Beagle'
    const mockImagesHoundLoaded = {
      breed: "Hound",
      subBreed: "",
      images: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_988.jpg",
        "https://images.dog.ceo/breeds/hound-basset/n02088238_10005.jpg",
        "https://images.dog.ceo/breeds/hound-english/n02089973_3688.jpg",
      ],
    }
    const mockImagesBeagleLoaded = {
      breed: "Beagle",
      subBreed: "",
      images: [
        "https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/1374053345_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/166407056_Milo.jpg",
      ],
    }
    const images = [
      mockImagesBeagleLoaded,
      mockImagesHoundLoaded
    ]

    formatSubBreedString.mockReturnValueOnce(deleteBreed);

    // Act
    deleteImages(deleteBreed, setIsFirstLoad, setImages, setIsLoading, images);

    // Assert
    expect(setImages).toBeCalledWith([mockImagesHoundLoaded]);
  });

  // zoMbIes -> Many - Interfaces
  test('Should delete only sub breed when pass Hound Afghan like deleteBreed, return object with 1 prop', () => {

    // Arrange
    const deleteBreed = 'Hound Afghan'
    const deletedSubBreedFormated = { breed: "Hound", subBreed: "Afghan" }
    const mockImagesHoundLoaded = {
      breed: "Hound",
      subBreed: "",
      images: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_988.jpg",
        "https://images.dog.ceo/breeds/hound-basset/n02088238_10005.jpg",
        "https://images.dog.ceo/breeds/hound-english/n02089973_3688.jpg",
      ],
    }
    const mockImagesHoundAfghan = {
      breed: "Hound",
      subBreed: "Afghan",
      images: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg",
      ],
    };
    const images = [
      mockImagesHoundAfghan,
      mockImagesHoundLoaded
    ]

    formatSubBreedString.mockReturnValueOnce(deletedSubBreedFormated);

    // Act
    deleteImages(deleteBreed, setIsFirstLoad, setImages, setIsLoading, images);

    // Assert
    expect(setImages).toBeCalledWith([mockImagesHoundLoaded]);
  });

  // zoMbIes -> Many - Interfaces
  test('Should delete breed and subbreed related by Hound, return object with 1 prop -> Beagle images', () => {

    // Arrange
    const deleteBreed = 'Hound'
    const mockImagesHoundLoaded = {
      breed: "Hound",
      subBreed: "",
      images: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_988.jpg",
        "https://images.dog.ceo/breeds/hound-basset/n02088238_10005.jpg",
        "https://images.dog.ceo/breeds/hound-english/n02089973_3688.jpg",
      ],
    }
    const mockImagesHoundAfghan = {
      breed: "Hound",
      subBreed: "Afghan",
      images: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg",
      ],
    };
    const mockImagesBeagleLoaded = {
      breed: "Beagle",
      subBreed: "",
      images: [
        "https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/1374053345_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/166407056_Milo.jpg",
      ],
    }
    const images = [
      mockImagesBeagleLoaded,
      mockImagesHoundAfghan,
      mockImagesHoundLoaded
    ]

    formatSubBreedString.mockReturnValueOnce(deleteBreed);

    // Act
    deleteImages(deleteBreed, setIsFirstLoad, setImages, setIsLoading, images);

    // Assert
    expect(setImages).toBeCalledWith([mockImagesBeagleLoaded]);
  });

});
