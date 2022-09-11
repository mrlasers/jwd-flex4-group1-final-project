import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'

const app = document.createElement("div")
app.setAttribute("id", "app")
document.body.append(app)

const root = createRoot(app)

root.render(<App />)
