import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Page404 } from './pages/Page404/Page404';
import { Home } from './pages/home/Home';
import { LanguageSelector } from './components/languageSelector/LanguageSelector';
import { DarkModeSelector } from './components/darkModeSelector/DarkModeSelector';
import { useThemeContext } from './context/ThemeContext';

function App() {
  const {contextTheme, setContextTheme} = useThemeContext()

  return (
    <Router>
      <div className='container' id={contextTheme}>
        <div className='header_container'>
          <div className="darkmode-selector_app">
            <DarkModeSelector />
          </div>
          <div className="language-selector_app">
            <LanguageSelector />
          </div>
        </div>
        <div className="content_container"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
