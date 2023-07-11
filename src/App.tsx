import {
  Route,
  Routes,
  Link,
  useResolvedPath,
  useMatch,
  Outlet,
} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Posts from "./routes/Posts";
import ErrorPage from "./routes/ErrorPage";
import Post from "./routes/Post";
import PostIndex from "./routes/PostIndex";

// To style the "isActive" ones.
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

const Layout = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Outlet />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <ul>
        <li>
          <CustomLink to={"/"}>Home</CustomLink>
        </li>
        <li>
          <CustomLink to={"/posts"}>Posts</CustomLink>
        </li>
        <li>
          <CustomLink to={"/about"}>About</CustomLink>
        </li>
        <li>
          <CustomLink to={"/contact"}>Contact</CustomLink>
        </li>
      </ul>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/posts" element={<Posts />}>
          <Route index element={<PostIndex />} />
          <Route path=":postId" element={<Post />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
