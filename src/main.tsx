import { App } from "./App";
import { BaseStyles } from "./feature/UserInterface/BaseStyles";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./utils/api/UserProvider";

const root: HTMLElement | null = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <>
      <UserProvider>
        <BaseStyles />
        <App />
      </UserProvider>
    </>
  );
}
