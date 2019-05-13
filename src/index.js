import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { HashRouter } from "react-router-dom";

import App from "./App";
import reducers from "./reducers"; //index.js

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
