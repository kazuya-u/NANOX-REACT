import { App } from "./App";
import { BaseStyles } from "./feature/UserInterface/BaseStyles";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";

const root: HTMLElement | null = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <>
      <CssBaseline />
      <BaseStyles />
      <App />
    </>
  );
}
