import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./assets/styles/all.scss";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/styles/fonts.scss";

import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
        <ScrollToTop />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
