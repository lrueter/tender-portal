import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '@clerk/clerk-react/dist/clerk-react.css'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} 