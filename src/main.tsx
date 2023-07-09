import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './routes/root'
import ErrorPageWrapper from './error-page'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPageWrapper />,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
