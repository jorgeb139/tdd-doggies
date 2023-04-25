import {describe, test, expect, vi, afterEach} from "vitest";
import { render, screen, act, waitFor } from '@testing-library/react';
import { formatSubBreeds } from "../../../utils/formatSubBreeds/formatSubBreeds";
import { SubBreedsList } from "./SubBreedsList";

vi.mock("../../../utils/formatSubBreeds/formatSubBreeds")

describe('SubBreedsList component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  })

  // TDD guided by ZOMBIES

  // Z-ero
  // Zombies -> Zero
  test('Should render "Seleccione una raza" when there are no dog breeds if breeds is empty', async () => {
    // Arrange
    const textExpected = /Seleccione una raza/i;
    formatSubBreeds.mockImplementation(() => new Promise(() => {}));
    render(<SubBreedsList />);

    // Act
    const textScreen = screen.getByText(textExpected)

    // Assert
    expect(textScreen).toBeInTheDocument();
  });  

  test('Should not render any list when breeds is empty', () => {

    // Arrange
    const componentExpected = 'list'
    formatSubBreeds.mockImplementation(() => new Promise(() => {}));
    render(<SubBreedsList />);

    // Act
    const componentScreen = screen.queryByRole(componentExpected)

    // Assert
    expect(componentScreen).not.toBeInTheDocument();
  })

  test('Should not render any list item when breeds is empty', () => {

    // Arrange
    const componentExpected = 'listitem'
    formatSubBreeds.mockImplementation(() => new Promise(() => {}));
    render(<SubBreedsList/>)

    // Act
    const componentScreen = screen.queryByRole(componentExpected)

    // Assert
    expect(componentScreen).not.toBeInTheDocument();
  })

  test('Should render "Cargando subrazas" when change the state', async () => {
    // Arrange
    const breed = "Hound Afghan";
    const textExpected = /Cargando subrazas/i;
    formatSubBreeds.mockImplementation(() => new Promise(() => {}));
    render(<SubBreedsList breed={breed} />);
  
    // Act
    await waitFor(() => {
      const textScreen = screen.getByText(textExpected);
      expect(textScreen).toBeInTheDocument();
    });
  });

  // ZombIes -> Zero - Interfaces
  test("Should render 'Seleccione una raza' and not call formatSubBreeds when breed is 'Seleccione una raza'", async () => {
    // Arrange
    const breed = "Seleccione una raza";
    const textExpected = /Seleccione una raza/i;
  
    formatSubBreeds.mockImplementation(() => new Promise(() => {}));
    render(<SubBreedsList breed={breed} />);
  
    // Act
    await act(async () => new Promise(setImmediate));
    const textScreen = screen.getByText(textExpected);
  
    // Assert
    expect(textScreen).toBeInTheDocument();
    expect(formatSubBreeds).not.toHaveBeenCalled();
  });  
  
  test('Should render "No hay subrazas para mostrar" when there are no sub-breeds for the selected breed', async () => {
    // Arrange
    const breed = 'BreedWithNoSubBreeds';
    const textExpected = /No hay subrazas para mostrar/i;
    formatSubBreeds.mockResolvedValue([]);
  
    // Act
    render(<SubBreedsList breed={breed} />);
    await act(async () => new Promise(setImmediate));
    const textScreen = screen.getByText(textExpected);
  
    // Assert
    expect(textScreen).toBeInTheDocument();
  });  

  // O-ne
  // zOmbies -> One
  test('Should render "Cargando subrazas" and later show the single breed item', async () => {
    // Arrange
    const singleBreedText = 'Corgi Cardigan';
    const mockedData = [singleBreedText];
    const breed = 'corgi'
    
    formatSubBreeds.mockResolvedValue(mockedData);
    
    // Act
    render(<SubBreedsList breed={breed}/>);
    await act(async () => new Promise(setImmediate));
    const listItem = screen.getByText(singleBreedText);

    // Assert
    expect(listItem).toBeInTheDocument();
  });

  // M-any
  // zoMbIes -> Many
  test('Should render "Seleccione una raza" and later show the subbreeds list with multiple items', async () => {
    // Arrange
    const textExpected = /Seleccione una raza/i;
    const secondTextExpected = /Cargando subrazas/i;
    const mockedData = ['Bulldog Boston', 'Bulldog English', 'Bulldog French'];
    const breed = 'bulldog'
    
    formatSubBreeds.mockResolvedValue(mockedData);
    
    // Act
    render(<SubBreedsList breed={breed}/>);
    await act(async () => new Promise(setImmediate));
    const initialTextRender = screen.queryByText(textExpected);
    const secondTextRender = screen.queryByText(secondTextExpected);
    const listItem1 = screen.getByText(mockedData[0]);
    const listItem2 = screen.getByText(mockedData[1]);
    const listItem3 = screen.getByText(mockedData[2]);

    // Assert
    expect(initialTextRender).not.toBeInTheDocument();
    expect(secondTextRender).not.toBeInTheDocument();
    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();
    expect(listItem3).toBeInTheDocument();
  });

});
