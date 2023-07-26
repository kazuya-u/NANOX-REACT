import { action as patchAction } from "../pages/Post"
import { createBrowserRouter } from "react-router-dom";
import { loader as postLoader } from "../pages/Post"
import { loader as postsLoader } from "../pages/PostIndex"
import About from "../pages/About";
import Contact from "../pages/Contact";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Post from "../pages/Post";
import PostIndex from "../pages/PostIndex";
import Posts from "../pages/Posts";
import TaskForm from "../feature/TaskForm";
import Layout from "../feature/Layout";

const RooterConfig = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
            action: patchAction,
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
        element: <TaskForm />,
      },
    ],
  },
]);

export default RooterConfig;
