import './style.css'
import { RouterProvider } from "react-router-dom"
import React from "react"
import RooterConfig from "./Route/RooterConfig"

export const App: React.FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={RooterConfig} />
    </React.StrictMode>
  )
}
