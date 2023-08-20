import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Layout from "../feature/Layout/Index";
import Post from "../pages/Task";
import TaskLayout from "../feature/Task/Layout";
import TaskPatch from "../pages/TaskPatch";
import Tasks from "../pages/Tasks";
import Tips from "../pages/Tips";

const RooterConfig = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout />
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
        path: 'tips',
        element: <Tips />
      },
      {
        path: 'tasks',
        element: <TaskLayout />,
        children: [
          {
            index: true,
            element: <Tasks />,
            errorElement: <ErrorPage />,
          },
          {
            path: ':taskId',
            element: <Post />,
          },
          {
            path: ':taskId/edit',
            element: <TaskPatch />,
          },
        ],
      },
      {
        path: 'contact',
        element: <Contact />
      },
    ],
  }
]);

export default RooterConfig;
