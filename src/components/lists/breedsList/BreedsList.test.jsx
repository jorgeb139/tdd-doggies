import {describe, test, expect, vi, afterEach} from "vitest";
import { render, screen, waitFor, act } from '@testing-library/react';
import { BreedsList } from "./BreedsList";
import { formatBreeds } from "../../../utils/formatBreeds/formatBreeds";

vi.mock("../../../utils/formatBreeds/formatBreeds")

describe('BreedsList component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  })

  // TDD guided by ZOMBIES

  // Z-ero
  // Zombies -> Zero
  test('Should render "Cargando razas" when there are no dog breeds if breeds is empty', async () => {
    // Arrange
    const textExpected = /Cargando razas/i;
    formatBreeds.mockImplementation(() => new Promise(() => {}));
    render(<BreedsList />);

    // Act
    const textScreen = screen.getByText(textExpected)

    // Assert
    expect(textScreen).toBeInTheDocument();
  });  

  test('Should not render any list when breeds is empty', () => {

    // Arrange
    const componentExpected = 'list'
    formatBreeds.mockImplementation(() => new Promise(() => {}));
    render(<BreedsList />);

    // Act
    const componentScreen = screen.queryByRole(componentExpected)

    // Assert
    expect(componentScreen).not.toBeInTheDocument();
  })

  test('Should not render any list item when breeds is empty', () => {

    // Arrange
    const componentExpected = 'listitem'
    formatBreeds.mockImplementation(() => new Promise(() => {}));
    render(<BreedsList/>)

    // Act
    const componentScreen = screen.queryByRole(componentExpected)

    // Assert
    expect(componentScreen).not.toBeInTheDocument();
  })

  test('Should render "Cargando razas" and later show "No hay razas para mostrar" if breeds is empty', async () => {
    // Arrange
    const textExpected = /Cargando razas/i;
    const secondTextExpected = /No hay razas para mostrar/i;
    const mockedData = [];
    
    formatBreeds.mockResolvedValue(mockedData);
    
    // Act
    render(<BreedsList/>)
    await act(async () => new Promise(setImmediate))
    const initialTextRender = screen.queryByText(textExpected)
    const finalTextRender = screen.getByText(secondTextExpected)

    // Assert
    expect(initialTextRender).not.toBeInTheDocument();
    expect(finalTextRender).toBeInTheDocument();
  });

  test('Should throw error when recived an incorrect response format error', async() => {

    // Arrange
    const textExpected = /Cargando razas/i;
    const secondTextExpected = /No hay razas para mostrar/i;
    const expectedError = {
      message: 'Incorrect response format',
      codeError: 4
    };
    
    formatBreeds.mockResolvedValue(expectedError);
    
    // Act
    render(<BreedsList />);
    await act(async () => new Promise(setImmediate));
    const initialTextRender = screen.queryByText(textExpected);
    const finalTextRender = screen.getByText(secondTextExpected)

    // Assert
    expect(initialTextRender).not.toBeInTheDocument();
    expect(finalTextRender).toBeInTheDocument();
    
  });

  // O-ne
  // zOmbies -> One
  test('Should render "Cargando razas" and later show the single breed item', async () => {
    // Arrange
    const textExpected = /Cargando razas/i;
    const singleBreedText = 'Bulldog';
    const mockedData = [singleBreedText];
    
    formatBreeds.mockResolvedValue(mockedData);
    
    // Act
    render(<BreedsList />);
    await act(async () => new Promise(setImmediate));
    const initialTextRender = screen.queryByText(textExpected);
    const listItem = screen.getByText(singleBreedText);

    // Assert
    expect(initialTextRender).not.toBeInTheDocument();
    expect(listItem).toBeInTheDocument();
  });

  // M-any
  // zoMbIes -> Many
  test('Should render "Cargando razas" and later show the breeds list with multiple items', async () => {
    // Arrange
    const textExpected = /Cargando razas/i;
    const mockedData = ['Bulldog', 'Beagle', 'Boxer'];
    
    formatBreeds.mockResolvedValue(mockedData);
    
    // Act
    render(<BreedsList />);
    await act(async () => new Promise(setImmediate));
    const initialTextRender = screen.queryByText(textExpected);
    const listItem1 = screen.getByText(mockedData[0]);
    const listItem2 = screen.getByText(mockedData[1]);
    const listItem3 = screen.getByText(mockedData[2]);

    // Assert
    expect(initialTextRender).not.toBeInTheDocument();
    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();
    expect(listItem3).toBeInTheDocument();
  });

  test('Should call formatBreeds once on component mount', async () => {
    // Arrange
    const mockedData = ['Bulldog', 'Beagle', 'Boxer'];
    formatBreeds.mockResolvedValue(mockedData);
  
    // Act
    render(<BreedsList />);
    await act(async () => new Promise(setImmediate));
  
    // Assert
    expect(formatBreeds).toHaveBeenCalledTimes(1);
  });

});
