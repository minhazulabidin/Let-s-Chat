import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(

  <>
  <Toaster
  position="top-center"
  reverseOrder={false}
/>
  <App />
  </>

)
