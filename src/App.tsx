import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/contact';
import ErrorPage from './routes/ErrorPage';

interface RouteProps {
  path: string;
  element: React.ReactNode;
}

const App: React.FC = () => {
  return (
    <div>
      <h1>PoC React Router</h1>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;