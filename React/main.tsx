import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './src/router'; 
import { AuthProvider } from './src/context/UserContext'; // Tu contexto
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* El AuthProvider debe ser el padre supremo de la app */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);