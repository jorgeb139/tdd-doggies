import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Page404 } from './pages/Page404/Page404';
import { Home } from './pages/home/Home';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { LanguageSelector } from './components/LanguageSelector';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="language-selector_app">
          <LanguageSelector />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
