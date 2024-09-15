import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MarketProvider } from "./contexts/MarketContext";
import { SectionProvider } from "./contexts/SectionContext";
import { ProductProvider } from "./contexts/ProductContext";
import { ExchangeProvider } from "./contexts/ExchangeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MarketProvider>
    <SectionProvider>
      <ProductProvider>
        <ExchangeProvider>
          <App />
        </ExchangeProvider>
      </ProductProvider>
    </SectionProvider>
  </MarketProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
