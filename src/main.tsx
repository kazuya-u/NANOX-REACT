import { App } from './App';
import { createRoot } from 'react-dom/client';

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <App />
  )
}
