import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router'; // Importamos el proveedor
import { router } from './src/router';         // Importamos tus rutas
import './index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* AQUÍ VA EL ROUTER PROVIDER. Le da el poder de las rutas a toda la app */}
    <RouterProvider router={router} />
  </StrictMode>,
)