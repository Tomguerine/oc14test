import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD:hrnet-react/src/main.jsx
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from './store.js'
=======
import './styles/index.css'
import App from './app/App.tsx'
>>>>>>> main:hrnet-react/src/main.tsx

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
