import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// If the root already has children (skeleton HTML or pre-rendered content),
// use hydrateRoot so React attaches to the existing DOM instead of replacing it.
// Falls back to createRoot when the root is empty (e.g., during HMR in dev).
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
