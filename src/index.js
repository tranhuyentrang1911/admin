import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import GlobalStyles from "components/GlobalStyles";
import store from "redux/store";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalStyles>
    <Provider store={store}>
      <App />
    </Provider>
  </GlobalStyles>
);
