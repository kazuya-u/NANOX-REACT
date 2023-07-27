import './style.css'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import React from "react";
import RooterConfig from "./Route/RooterConfig";

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <React.StrictMode>
    <RouterProvider router={RooterConfig} />
  </React.StrictMode>,
  )
}
