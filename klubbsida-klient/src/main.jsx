import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

const isLocalhost = window.location.origin === "http://localhost:5173";
const redirectUri = isLocalhost
  ? "http://localhost:5173"
  : "https://madebyjakob.github.io/ETK-klubbsida";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: "klubbsida.onrender.com/api",
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
)
