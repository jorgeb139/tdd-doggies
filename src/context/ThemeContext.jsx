import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) => {
  const [contextTheme, setContextTheme] = useState(localStorage.getItem('theme') || 'Light');

  const saveTheme = () => {
    const newTheme = contextTheme === 'Light' ? 'Dark' : 'Light';
    setContextTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  const values = {contextTheme, saveTheme}

  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)

  return context
}

