import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './assets/styles/all.scss'
import 'bootstrap/dist/js/bootstrap.js'
import './assets/styles/fonts.scss'

import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
      <ScrollToTop />
    </RouterProvider>
  </StrictMode>,
)
