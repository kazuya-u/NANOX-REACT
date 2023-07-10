import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './error-page'
import Contact from './routes/contact'
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
