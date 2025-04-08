import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { bootstrap } from './bootstrap';

async function main() {
  await bootstrap();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

document.addEventListener('DOMContentLoaded', main);