import { action as patchAction } from "../pages/Task"
import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Layout from "../feature/UserInterface/Layout";
import Post from "../pages/Task";
import TaskForm from "../feature/TaskForm/TaskForm";
import TaskLayout from "../feature/Task/Layout";
import Tasks from "../pages/Tasks";

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
    ],
  }
]);

export default RooterConfig;
