import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./index.css";
import AuthProvider  from './context/AuthProvider';
import ProductoProvider from "./context/ProductoProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ProductoProvider>
        <App />
      </ProductoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
