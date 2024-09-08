import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastConfig } from './components/common/toast.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastConfig/>
  </StrictMode>,
)
