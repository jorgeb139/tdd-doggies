import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Page404 } from './pages/Page404/Page404';
import { Home } from './pages/home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
