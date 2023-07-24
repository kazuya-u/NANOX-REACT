import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { loader as postLoader } from "./pages/Post"
import { action as postAction } from "./pages/Post"
import { loader as postsLoader } from "./pages/PostIndex"
import About from "./pages/About"
import Contact from "./pages/Contact"
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Post from "./pages/Post"
import PostIndex from "./pages/PostIndex"
import Posts from "./pages/Posts"
import React from "react"
import ReactDOM from "react-dom/client"
import Root from "./pages/Root"
import TaskForm from "./feature/TaskForm"

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
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <PostIndex />,
            loader: postsLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: ':postId',
            element: <Post />,
            loader: postLoader,
            action: postAction,
          },
        ],
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'addtask',
        element: <TaskForm />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
