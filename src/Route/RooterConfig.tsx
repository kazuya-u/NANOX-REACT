import { action as patchAction } from "../pages/Task"
import { createBrowserRouter } from "react-router-dom";
import { loader as postLoader } from "../pages/Task"
import { loader as postsLoader } from "../pages/TaskIndex"
import About from "../pages/About";
import Contact from "../pages/Contact";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Layout from "../feature/Layout";
import Login from "../pages/Login";
import ParentContext from "../pages/Context";
import Post from "../pages/Task";
import TaskForm from "../feature/TaskForm";
import TaskIndex from "../pages/TaskIndex";
import Tasks from "../pages/Tasks";
import { AuthUserProvider } from "../feature/providers";

const RooterConfig = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthUserProvider>
        <Layout />
      </AuthUserProvider>
    ),
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
        path: 'tasks',
        element: <Tasks />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <TaskIndex />,
            loader: postsLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: ':taskId',
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
        path: 'addtask',
        element: <TaskForm />,
      },
      {
        path: 'poc-context',
        element: <ParentContext />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export default RooterConfig;
