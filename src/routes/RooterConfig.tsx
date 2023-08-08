import { action as PatchAction } from "../feature/Task/api/PostData";
import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import CreateContent from "../pages/CreateContent";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Layout from "../feature/UserInterface/Layout";
import Post from "../pages/Task";
import TaskLayout from "../feature/Task/Layout";
import TaskPatch from "../pages/TaskPatch";
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
        path: 'add',
        element: <CreateContent />
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
          },
          {
            path: ':taskId/edit',
            element: <TaskPatch />,
            action: PatchAction,
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
