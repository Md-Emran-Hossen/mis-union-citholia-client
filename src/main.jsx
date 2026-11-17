import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import AuthProvider from './provider/AuthProvider'
import router from './routes/Routes'
import './index.css'
import toast, { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
      <RouterProvider router = {router}></RouterProvider>
      <Toaster />
   </AuthProvider>
  </StrictMode>,
)
