import './style.css'
import { Providers } from './components/providers'
import { RouterProvider } from "react-router-dom"
import React from "react"
import RooterConfig from "./Route/RooterConfig"

export const App: React.FC = () => {
  
  return (
    <Providers>
      <React.StrictMode>
        <RouterProvider router={RooterConfig} />
      </React.StrictMode>
    </Providers>
  )
}
