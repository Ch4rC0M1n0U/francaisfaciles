/**
 * FrançaisPro - Application d'entraînement au français avec IA
 * Point d'entrée principal de l'application
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
