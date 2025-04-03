import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { SuperAdminProvider } from './contexts/superAdminContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
    <SuperAdminProvider>
      <App />
      </SuperAdminProvider>
      </BrowserRouter>
    
    
  </StrictMode>,
)
