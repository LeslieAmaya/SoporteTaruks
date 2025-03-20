import React from 'react';
import ReactDOM from 'react-dom/client'; // Asegúrate de usar 'react-dom/client' en lugar de 'react-dom'
import { BrowserRouter } from 'react-router-dom';  // Usar BrowserRouter para gestionar rutas
import AppRoutes from './routes/routes';  // Asegúrate de que las rutas estén en un archivo separado
import './index.css';  // O tu archivo de estilo

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>  
    <BrowserRouter>  {/* Aquí envuelves las rutas con BrowserRouter */}
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
