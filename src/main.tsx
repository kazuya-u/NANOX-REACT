import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { loader as postsLoader } from "./routes/PostIndex"
import About from "./routes/About"
import Contact from "./routes/Contact"
import ErrorPage from "./routes/ErrorPage"
import Home from "./routes/Home"
import Post from "./routes/Post"
import Posts from "./routes/Posts"
import React from "react"
import ReactDOM from "react-dom/client"
import Root from "./routes/Root"
import PostIndex from "./routes/PostIndex"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'posts',
        element: <Posts />,
        children: [
          {
            index: true,
            element: <PostIndex />,
            loader: postsLoader,
          },
          {
            path: ':postId',
            element: <Post />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: 'contact',
        element: <Contact />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
