import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { BreedsList } from "../../components/lists/breedsList/BreedsList"
import { SubBreedsList } from "../../components/lists/subBreedsList/SubBreedsList"
import { RenderImages } from "../../components/renderImages/RenderImages"
import { Home } from "./Home";

vi.mock("../../components/lists/breedsList/BreedsList");
vi.mock("../../components/lists/subBreedsList/SubBreedsList");
vi.mock("../../components/renderImages/RenderImages");

describe("Home component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // TDD guided by ZOMBIES
  
  // Zero
  // ZombIes -> Zero - Interface
  test("Should render breed selector, sub-breed selector, and breed images with the default text", () => {

    // Arrange
    const breedText = 'Cargando razas'
    BreedsList.mockReturnValueOnce(breedText);
    
    const subBreedText = 'Seleccione una raza'
    SubBreedsList.mockReturnValueOnce(subBreedText);
    
    const renderImagesText = 'Seleccione una raza o subraza'
    RenderImages.mockReturnValueOnce(renderImagesText);

    // Act
    render(<Home />);
    const breedSelector = screen.getByText(breedText);
    const subBreedSelector = screen.getByText(subBreedText);
    const breedImages = screen.getByText(renderImagesText);

    // Assert
    expect(breedSelector).toBeInTheDocument();
    expect(subBreedSelector).toBeInTheDocument();
    expect(breedImages).toBeInTheDocument();
  });

  // O-ne
  // zOmBIes -> One - Interfaces - Boundaries
  test("Should render 3 images when select Beagle on breed selector, 'Seleccione una raza' on sub-breed", async () => {
    
    // Arrange
    const initialBreedText = 'Seleccione una raza'
    const breed = 'Beagle'
    const breedText = (
      <select>
        <option value={initialBreedText}>{initialBreedText}</option>
        <option value={breed}>{breed}</option>
      </select>
    );
    BreedsList.mockReturnValueOnce(breedText);
  
    const initialSubBreedText = "Seleccione una raza";
    const finalSubBreedText = "No hay subrazas para mostrar"
    SubBreedsList.mockReturnValueOnce(initialSubBreedText);
  
    const renderImagesText = "Seleccione una raza o subraza";
    RenderImages.mockReturnValueOnce(renderImagesText);
  
    render(<Home />);
  
    // Act
    const breedDropdown = screen.getByRole("combobox");
    fireEvent.change(breedDropdown, { target: { value: {breed} } });
  
    // Update the mocks for SubBreedsList and RenderImages
    SubBreedsList.mockReturnValueOnce(finalSubBreedText);
  
    const renderBeagleImages = (
      <>
        <img
          src="https://images.dog.ceo/breeds/beagle/n02088364_14431.jpg"
          alt="beagle-0"
          data-testid="image-0-0"
        ></img>
        <img
          src="https://images.dog.ceo/breeds/beagle/n02088364_14548.jpg"
          alt="beagle-1"
          data-testid="image-0-1"
        ></img>
        <img
          src="https://images.dog.ceo/breeds/beagle/n02088364_2566.jpg"
          alt="beagle-2"
          data-testid="image-0-2"
        ></img>
      </>
    );
    RenderImages.mockReturnValueOnce(renderBeagleImages);
  
    render(<Home />);
  
    // Assert
    const updatedSubBreedSelector = screen.getByText(finalSubBreedText);
    expect(updatedSubBreedSelector).toBeInTheDocument();
  
    const image0 = screen.getByAltText("beagle-0");
    const image1 = screen.getByAltText("beagle-1");
    const image2 = screen.getByAltText("beagle-2");
  
    expect(image0).toBeInTheDocument();
    expect(image1).toBeInTheDocument();
    expect(image2).toBeInTheDocument();
  });

  // M-any
  // zoMbIes -> Many - Interfaces
  test("Should render 3 additional images when a sub-breed is selected", async () => {
    // Arrange
    const initialBreedText = "Seleccione una raza";
    const breed = "Bulldog";
    const breedText = (
      <select>
        <option value={initialBreedText}>{initialBreedText}</option>
        <option value={breed}>{breed}</option>
      </select>
    );
    BreedsList.mockReturnValue(breedText);
  
    const initialSubBreedText = "Seleccione una subraza";
    const subBreed1 = "Boston";
    const subBreed2 = "English";
    const subBreed3 = "French";
    const subBreedText = (
      <select>
        <option value={initialSubBreedText}>{initialSubBreedText}</option>
        <option value={subBreed1}>{subBreed1}</option>
        <option value={subBreed2}>{subBreed2}</option>
        <option value={subBreed3}>{subBreed3}</option>
      </select>
    );
    SubBreedsList.mockReturnValue(subBreedText);
  
    const bulldogRenderImages = (
      <>
        <img
          src="https://images.dog.ceo/breeds/bulldog-boston/n02096585_169.jpg"
          alt="bulldog-0"
          data-testid="image-0-0"
        ></img>
        <img
          src="https://images.dog.ceo/breeds/bulldog-french/n02108915_12139.jpg"
          alt="bulldog-1"
          data-testid="image-0-1"
        ></img>
        <img
          src="https://images.dog.ceo/breeds/bulldog-french/n02108915_225.jpg"
          alt="bulldog-2"
          data-testid="image-0-2"
        ></img>
      </>
    );
    RenderImages.mockReturnValue(bulldogRenderImages);
  
    const {rerender} = render(<Home />);
  
    // Act
    const breedDropdown = screen.getAllByRole("combobox")[0];
    fireEvent.change(breedDropdown, { target: { value: breed } });
  
    const subBreedDropdown = screen.getAllByRole("combobox")[1];
    fireEvent.change(subBreedDropdown, { target: { value: subBreed1 } });
  
    const bulldogBostonRenderImages = (
      <>
        {bulldogRenderImages}
        <img
          src="https://images.dog.ceo/breeds/beagle/subBreed1_1.jpg"
          alt="bullgod-boston-0"
          data-testid="image-1-0"
        ></img>
        <img
          src="https://images.dog.ceo/breeds/beagle/subBreed1_2.jpg"
          alt="bullgod-boston-1"
          data-testid="image-1-1"
        ></img>
        <img
          src="https://images.dog.ceo/breeds/beagle/subBreed1_3.jpg"
          alt="bullgod-boston-2"
          data-testid="image-1-2"
        ></img>
      </>
    );
    RenderImages.mockReturnValue(bulldogBostonRenderImages);

    rerender(<Home />)
    await act(async () => new Promise(setImmediate));
    const images = screen.getAllByRole("img");
  
    expect(images.length).toBe(6);
  }); 

});
