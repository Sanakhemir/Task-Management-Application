
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

// Création du root avec 'ReactDOM.createRoot' pour une meilleure gestion du rendu

const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendu de l'application dans le DOM
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
