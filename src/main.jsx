import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { ThemeContextProvider } from './context/ThemeContext'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </ThemeContextProvider>
)
