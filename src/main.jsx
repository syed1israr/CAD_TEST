import React from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "react-hot-toast"
import App from "./App.jsx"
import { CartProvider } from "./contexts/CartContext"
import { FilterProvider } from "./contexts/FilterContext"
import "./index.css"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <FilterProvider>
       <Toaster position="bottom-center" reverseOrder={false} />
        <App />
      </FilterProvider>
    </CartProvider>
  </React.StrictMode>
)
