import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import store  from './redux/store.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    <Toaster/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
