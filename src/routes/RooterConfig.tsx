import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Layout from "../feature/Layout/Index";
import Note from "../pages/Note";
import NoteLayout from "../feature/Note/Layout";
import Notes from "../pages/Notes";
import Post from "../pages/Task";
import TaskLayout from "../feature/Task/Layout";
import Tasks from "../pages/Tasks";
import Toggl from "../pages/Toggl";

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
        path: 'toggl',
        element: <Toggl />
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
        ],
      },
      {
        path: 'notes',
        element: <NoteLayout />,
        children: [
          {
            index: true,
            element: <Notes />,
            errorElement: <ErrorPage />,
          },
          {
            path: ':NoteId',
            element: <Note />,
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
