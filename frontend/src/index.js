import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import "./index.css";

// Use createRoot to render your application
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
