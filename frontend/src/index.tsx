import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.scss';

let container = (document.getElementById('app') as HTMLElement);
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);