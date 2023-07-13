import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Root from './routes/Root';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import PostIndex from './routes/PostIndex';
import Posts from './routes/Posts';
import Post from './routes/Post';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
    <Route index element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
