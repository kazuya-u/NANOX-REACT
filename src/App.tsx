import { Route, Routes, NavLink } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import ErrorPage from './routes/ErrorPage';



const App: React.FC = () => {
  return (
    <div>
      <h1>PoC React Router</h1>
      <ul>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} style={({ isActive }) => (isActive ? { color: 'blue'} : undefined)} to="/">Home</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} to="/about">About</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} to="/contact">Contact</NavLink>
        </li>
      </ul>
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