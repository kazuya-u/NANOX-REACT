import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';

function App() {
  return (
    <div>
      <h1>PoC React Router</h1>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path={"/about"} element={<About />}></Route>
        <Route path={"/contact"} element={<Contact />}></Route>
      </Routes>
    </div>
  );
}

export default App;