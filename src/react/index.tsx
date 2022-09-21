import './global.scss'

import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import { App } from './app'

const app = document.createElement("div")
app.setAttribute("id", "app")
document.body.append(app)

const root = createRoot(app)

root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
)
