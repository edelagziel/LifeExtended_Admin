import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { configureAmplify } from "./aws/amplify";

configureAmplify();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
