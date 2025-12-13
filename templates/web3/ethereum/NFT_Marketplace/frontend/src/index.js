import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: You can define global styles here.
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Rendering the App component inside a Router for routing support.
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
