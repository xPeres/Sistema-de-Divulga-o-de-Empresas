import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { InicioProvider } from './paginas/conta/inicio.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InicioProvider>
      <App />
    </InicioProvider>
  </StrictMode>,
)