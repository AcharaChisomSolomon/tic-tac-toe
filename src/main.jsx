import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { Global } from '@emotion/react'
import globalStyles from './globalStyles.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Global styles={globalStyles} />
    <App />
  </StrictMode>,
)
