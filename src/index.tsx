import React from "react";
import ReactDOM from "react-dom/client";
import "./app/styles/index.scss";
import { App } from "./app/app";
import { RecoilRoot } from "recoil";
import ToastProvider from "./lib/react-toastify/ToastProvider";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  <RecoilRoot>
    <ToastProvider>
      <App />
    </ToastProvider>
  </RecoilRoot>
);
