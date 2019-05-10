import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./App";
import reducers from "./reducers"; //index.js

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
