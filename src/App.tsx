import {
  Route,
  Routes,
  Link,
  useResolvedPath,
  useMatch,
} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import ErrorPage from "./routes/ErrorPage";

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  
  let match = useMatch({
    path: resolved.pathname,
    end: true,
  });
  return (
    <div>
      <Link style={{ color: match ? "blue" : "" }} to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <div>
      <h1>PoC React Router</h1>
      <ul>
        <li>
          <CustomLink to={"/"}>Home</CustomLink>
        </li>
        <li>
          <CustomLink to={"/about"}>About</CustomLink>
        </li>
        <li>
          <CustomLink to={"/contact"}>Contact</CustomLink>
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
};

export default App;
