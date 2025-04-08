import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./store";
import Home from './pages/Home';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="/home" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
    
  </StrictMode>,
)
