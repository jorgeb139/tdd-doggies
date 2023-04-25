import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";

import { Page404 } from "./Page404";

describe("Page404 component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // TDD guided by ZOMBIES
  // Zero
  // ZombIes -> Zero - Interface
  test("Should return 'Page not found'", () => {
    // Arrange
    const initialText = "Page not found";

    // Act
    render(
      <Router>
        <Page404 />
      </Router>
    );
    const initialTextRender = screen.getByText(initialText);

    // Assert
    expect(initialTextRender).toBeInTheDocument();
  });

  test("Should render 'Back to home' button", () => {

    // Arrange
    const findRole = 'button'

    // Act
    render(
      <Router>
        <Page404 />
      </Router>
    );
    const backButton = screen.getByRole(findRole);

    // Assert
    expect(backButton).toBeInTheDocument();
  });

  // ZomBIes -> Zero - Boundaries
  test("Should navigate to home when the button is clicked", async () => {

    // Arrange
    const findRole = 'button'
    const finalUrl = '/'

    // Act
    const history = createMemoryHistory();
    render(
      <Router>
        <Page404 />
      </Router>
    );

    const button = screen.getByRole(findRole);
    fireEvent.click(button);

    // Assert
    expect(history.location.pathname).toBe(finalUrl);
  });

});
