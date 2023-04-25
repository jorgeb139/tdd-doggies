import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownList } from './DropdownList';

const onBreedChange = vi.fn()
const onSubBreedChange = vi.fn();

describe('DropdownList component', () => {

  // TDD guided by ZOMBIES
  // Zombies -> Zero
  test('Should not render any list item when breeds is empty', () => {
    // Arrange
    const breeds = [];
    const componentExpected = 'option'

    // Act
    render(<DropdownList breeds={breeds} />);

    // Assert
    const listItems = screen.queryAllByRole(componentExpected);
    expect(listItems.length).toBe(0);
  });

  // zOmbies -> One
  test('Should render only option item when there is only one breed', () => {
    // Arrange
    const breeds = ['Bulldog'];
    const componentExpected = 'option'

    // Act
    render(<DropdownList breeds={breeds} onBreedChange={onBreedChange}/>);

    // Assert
    const listItems = screen.getAllByRole(componentExpected);
    expect(listItems.length).toBe(1);
  });

  // zOmBies -> One - Boundaries
  test('Should call onBreedChange with the correct value when the dropdown value is changed', () => {
    // Arrange
    const breeds = ['Bulldog', 'Beagle', 'Boxer'];
    const newValue = 'Beagle';
    
    // Act
    render(<DropdownList breeds={breeds} onBreedChange={onBreedChange} />);
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { 
      target: { 
        value: newValue 
      }
    });
  
    // Assert
    expect(onBreedChange).toHaveBeenCalledTimes(1);
    expect(onBreedChange).toHaveBeenCalledWith(newValue);
  });

  test('Should call onSubBreedChange with the correct value when the dropdown value is changed', () => {
    // Arrange
    const breeds = ['Afghan', 'Basset', 'Beagle'];
    const newValue = 'Basset';
    
    // Act
    render(<DropdownList breeds={breeds} onSubBreedChange={onSubBreedChange} />);
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { 
      target: { 
        value: newValue 
      }
    });

    // Assert
    expect(onSubBreedChange).toHaveBeenCalledTimes(1);
    expect(onSubBreedChange).toHaveBeenCalledWith(newValue);
  });

  // M-any
  test('Should render the correct number of options when there are multiple breeds', () => {
    // Arrange
    const breeds = ['Bulldog', 'Beagle', 'Boxer'];
    const componentExpected = 'option'

    // Act
    render(<DropdownList breeds={breeds} />);

    // Assert
    const listItems = screen.getAllByRole(componentExpected);
    expect(listItems.length).toBe(breeds.length);
  });

  test('Should render list items with correct text when there are multiple breeds', () => {
    // Arrange
    const breeds = ['Bulldog', 'Beagle', 'Boxer'];
  
    // Act
    render(<DropdownList breeds={breeds} />);
  
    // Assert
    breeds.forEach((breed) => {
      const listItem = screen.getByText(breed);
      expect(listItem).toBeInTheDocument();
    });
  });
});
