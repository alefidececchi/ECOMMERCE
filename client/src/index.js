import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./Redux/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
// import dotenv from 'dotenv';
// dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";
// axios.defaults.baseURL =  `https://ecommerce-books-three.vercel.app`;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
        <BrowserRouter>
      <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
