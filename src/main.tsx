import { App } from './App';
import { createRoot } from 'react-dom/client';
import { BaseStyles } from './feature/UserInterface/BaseStyles';
import { Reset } from 'styled-reset';

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <>
      <Reset />
      <BaseStyles />
      <App />
    </>
  )
}
