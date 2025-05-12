import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './pages/Home.jsx'
import { Toaster } from 'react-hot-toast'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        className: '',
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },
      }}/>
  </StrictMode>,
)
