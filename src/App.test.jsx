import { describe, test, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

describe('App component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // TDD guided by ZOMBIES

  // O-ne
  // zOmbIes -> One - Interface
  test('Should render Home component when path is "/"', () => {
    // Arrange
    const homeTestId = 'breed-selector';

    // Act
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const breedSelector = screen.getByTestId(homeTestId);

    // Assert
    expect(breedSelector).toBeInTheDocument();
  });

  test('Should render Page404 component when path is not recognized', () => {
    // Arrange
    const text404 = 'Page not found';
    const incorrectURL = '/fake-url'

    // Act
    render(
      <MemoryRouter initialEntries={[incorrectURL]}>
        <App />
      </MemoryRouter>
    );
    const pageNotFoundText = screen.getByText(text404);

    // Assert
    expect(pageNotFoundText).toBeInTheDocument();
  });
});
