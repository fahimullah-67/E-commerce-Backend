import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { CartContextProvider } from "./context/CartContext.jsx";
import { CheckoutContextProvider } from './context/CheckoutContext.jsx'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <CheckoutContextProvider>
          <App />
        </CheckoutContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
