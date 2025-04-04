import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { store } from './redux/store'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Toaster />
    <App />
  </BrowserRouter>
    </Provider>
  </StrictMode>,
)
