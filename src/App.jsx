import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Page404 } from './pages/Page404/Page404';
import { Home } from './pages/home/Home';
import { useThemeContext } from './context/ThemeContext';
import { HeaderContainer } from './components/headerContainer/HeaderContainer';

function App() {
  const { contextTheme } = useThemeContext()

  return (
    <Router>
      <div className='container' id={contextTheme}>
        <HeaderContainer />
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
