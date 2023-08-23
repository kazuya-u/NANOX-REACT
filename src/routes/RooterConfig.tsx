import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Layout from "../feature/Layout/Index";
import Note from "../pages/Note";
import NoteLayout from "../feature/Note/Layout";
import NotePatch from "../pages/NotePatch";
import NotePost from "../pages/NotePost";
import Notes from "../pages/Notes";
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
        path: 'note/post',
        element: <NotePost />
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
          {
            path: ':NoteId/edit',
            element: <NotePatch />,
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
