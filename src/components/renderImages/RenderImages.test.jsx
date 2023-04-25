import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { RenderImages } from "../../components/renderImages/RenderImages";
import { loadImages } from "../../utils/loadImages/loadImages";
import { deleteImages } from "../../utils/deleteImages/deleteImages";

vi.mock("../../utils/loadImages/loadImages");
vi.mock("../../utils/deleteImages/deleteImages");

describe("RenderImages component", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  // TDD guided by ZOMBIES

  // Z-ero
  // Zombies -> Zero
  test('Should render "Seleccione una raza o subraza" when there are no dog breeds if breeds is empty', async () => {
    // Arrange
    const textExpected = /Seleccione una raza o subraza/i;
    loadImages.mockImplementation(() => new Promise(() => {}));
    render(<RenderImages/>);

    // Act
    const textScreen = screen.getByText(textExpected)

    // Assert
    expect(textScreen).toBeInTheDocument();
  });  

  test("Should render no images if breed is empty", () => {
    
    // Arrange
    render(<RenderImages/>);

    // Act
    const images = screen.queryAllByRole("img");

    // Assert
    expect(images.length).toBe(0);
  });

  test('Should render "Seleccione una raza o subraza" and later show "No hay imágenes para mostrar" if breeds is empty', async () => {
    // Arrange
    const textExpected = /Seleccione una raza o subraza/i;
    const secondTextExpected = /No hay imágenes para mostrar/i;
    const breed = 'Empty';
    
    loadImages.mockImplementation(async (breed, subBreed, setImages, setIsLoading, imagesQty) => {
      setIsLoading(false);
    });
    
    // Act
    render(<RenderImages breed={breed} />);
    await act(async () => new Promise(setImmediate));
  
    const initialTextRender = screen.queryByText(textExpected);
    const finalTextRender = screen.getByText(secondTextExpected);
  
    // Assert
    expect(initialTextRender).not.toBeInTheDocument();
    expect(finalTextRender).toBeInTheDocument();
  });

  test('Should render "Cargando imágenes..." while images are being loaded', async () => {
    // Arrange
    const textExpected = /Cargando imágenes.../i;
    loadImages.mockImplementation(() => new Promise(() => {}));
    render(<RenderImages breed="Australian" />);
  
    // Act
    const textScreen = screen.getByText(textExpected);
  
    // Assert
    expect(textScreen).toBeInTheDocument();
  });

  // O-ne
  // zOmbies -> One
  test("Should render 1 image for one breed with 1 image, and to be src and alt attributes", async () => {
    // Arrange
    const breed = "Australian";
    const imagesQty = 1;
    const mockAustralianImages = {
      breed: "Australian",
      subBreed: "",
      images: [
        "https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg",
      ],
    };
  
    loadImages.mockImplementationOnce((breed, subBreed, setImages, setIsLoading, imagesQty) => {
      setImages([mockAustralianImages]);
      setIsLoading(false);
    });
  
    // Act
    render(<RenderImages breed={breed} imagesQty={imagesQty} />);
    await act(async () => new Promise(setImmediate));
  
    const images = screen.getAllByRole("img");
  
    // Assert
    expect(images.length).toBe(1);
    images.forEach((image, index) => {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        "src",
        mockAustralianImages.images[index]
      );
      expect(image).toHaveAttribute("alt", `${breed}-${index}`);
    });
  });

  test("Should delete all images (3) corresponding to hound breed when only there is their images and render 'Seleccione una raza o subraza' ", async () => {
    // Arrange
    const textExpected = /Seleccione una raza o subraza/i;

    const breed = 'Beagle'
    const mockBreedBeagleImages = {
      breed: "Beagle",
      subBreed: "",
      images: [
        "https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/1374053345_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/166407056_Milo.jpg",
      ],
    };

    /************************** BEAGLE BREED **************************/
    loadImages.mockImplementationOnce((breed, subBreed, setImages, setIsLoading, imagesQty) => {
      setImages([mockBreedBeagleImages]);
      setIsLoading(false);
    }); 
  
    // Act
    const { rerender } = render(<RenderImages breed={breed} />);
    await act(async () => new Promise(setImmediate));

    const subBreedImages = screen.getAllByRole("img");
  
    // Assert
    expect(subBreedImages.length).toBe(3);
    
    /************************** DELETE BEAGLE BREED **************************/ 
    // Act
    deleteImages.mockImplementationOnce((deleteBreed, setIsFirstLoad, setImages, setIsLoading, images) => {
      setImages([]);
      setIsLoading(false);
      setIsFirstLoad(true)
    }); 

    rerender(<RenderImages deleteBreed={breed} />)
    await act(async () => new Promise(setImmediate))

    const finalImages = screen.queryAllByRole("img");
    const finalTextRender = screen.getByText(textExpected)

    // Assert
    expect(finalImages.length).toBe(0);
    expect(finalTextRender).toBeInTheDocument();
    
  });

  // M-any
  // zoMbIes -> Many
  test("Should render 3 images for one breed with 3 images, and to be src and alt attributes", async () => {
    // Arrange
    const breed = "Australian";
    const mockBreedAustralianImages = {
      breed: 'Australian',
      subBreed: '',
      images: [
        "https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg",
        "https://images.dog.ceo/breeds/australian-shepherd/pepper2.jpg",
        "https://images.dog.ceo/breeds/australian-shepherd/sadie.jpg",
      ],
    };
    loadImages.mockImplementationOnce((breed, subBreed, setImages, setIsLoading, imagesQty) => {
      setImages([mockBreedAustralianImages]);
      setIsLoading(false);
    }); 
  
    // Act
    render(<RenderImages breed={breed} />);
    await act(async () => new Promise(setImmediate))
    const images = screen.getAllByRole("img");
  
    // Assert
    expect(images.length).toBe(3);
    images.forEach((image, index) => {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", mockBreedAustralianImages.images[index]);
      expect(image).toHaveAttribute("alt", `${breed}-${index}`);
    });
  });

  test("Should render 3 images for subbreed when is prevouslly loaded 3 more", async () => {
    // Arrange
    const breed = "Hound";
    const subBreed = "Hound Afghan";
    const mockBreedHoundImages = {
      breed: 'Hound',
      subBreed: '',
      images: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_988.jpg",
        "https://images.dog.ceo/breeds/hound-basset/n02088238_10005.jpg",
        "https://images.dog.ceo/breeds/hound-english/n02089973_3688.jpg",
      ],
    };
    const mockSubBreedHoundAfghanImages = {
      breed: 'Hound',
      subBreed: 'Afghan',
      images: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg",
      ],
    };

    // Act
    loadImages.mockImplementationOnce((breed, subBreed, setImages, setIsLoading, imagesQty) => {
      setImages([mockSubBreedHoundAfghanImages, mockBreedHoundImages]);
      setIsLoading(false);
    }); 

    render(<RenderImages subBreed={subBreed} />)
    await act(async () => new Promise(setImmediate));
    const subBreedImages = screen.getAllByRole("img");
  
    // Assert
    expect(subBreedImages.length).toBe(6); 
    const allImages = [...mockSubBreedHoundAfghanImages.images, ...mockBreedHoundImages.images];
    subBreedImages.forEach((image, index) => {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", allImages[index]);
    });
  });

  test("Should delete 3 images corresponding to Afghan subbreeds when there is 9 images corresponding to Hound, Hound Afghman and Beagle", async () => {
    // Arrange
    const subBreed = "Hound Afghan";

    const mockBreedHoundImages = {
      breed: 'Hound',
      subBreed: '',
      images: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_988.jpg",
        "https://images.dog.ceo/breeds/hound-basset/n02088238_10005.jpg",
        "https://images.dog.ceo/breeds/hound-english/n02089973_3688.jpg",
      ],
    };
    const mockBreedBeagleImages = {
      breed: 'Beagle',
      subBreed: '',
      images: [
        "https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/1374053345_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/166407056_Milo.jpg",
      ],
    };
 
    // Act   
    deleteImages.mockImplementation((deleteBreed, setIsFirstLoad, setImages, setIsLoading, images) => {
      setImages([mockBreedBeagleImages, mockBreedHoundImages])
      setIsLoading(false)
      setIsFirstLoad(false)
    }); 
    render(<RenderImages deleteBreed={subBreed} />)
    await act(async () => new Promise(setImmediate))

    const finalImages = screen.getAllByRole("img")

    // Assert
    expect(finalImages.length).toBe(6);
    const allFinalImages = [ ...mockBreedBeagleImages.images, ...mockBreedHoundImages.images]
    finalImages.forEach((image, index) => {
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute("src", allFinalImages[index])
    });
    
  });

  test("Should delete 6 images corresponding to Hound breeds and its subbreeds when there is 9 images corresponding to Hound, Hound Afghman and Beagle", async () => {
    // Arrange
    const breed = "Hound";

    const mockBreedBeagleImages = {
      breed: 'Beagle',
      subBreed: '',
      images: [
        "https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/1374053345_Milo.jpg",
        "https://images.dog.ceo/breeds/beagle/166407056_Milo.jpg",
      ],
    };

    // Act
    deleteImages.mockImplementation((deleteBreed, setIsFirstLoad, setImages, setIsLoading, images) => {
      setImages([mockBreedBeagleImages]);
      setIsLoading(false);
      setIsFirstLoad(false)
    }); 
    render(<RenderImages deleteBreed={breed} />)
    await act(async () => new Promise(setImmediate))

    const finalImages = screen.getAllByRole("img");

    // Assert
    expect(finalImages.length).toBe(3);
    const allFinalImages = [...mockBreedBeagleImages.images];
    finalImages.forEach((image, index) => {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", allFinalImages[index]);
    });
    
  });
  
});
