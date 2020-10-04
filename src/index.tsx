import React from "react";
import ReactGA from 'react-ga';
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import "./style.scss";
import App from "./components/App";

interface CustomEnvVars extends NodeJS.ProcessEnv {
  REACT_APP_GA_KEY: string
}
const customEnvVars = process.env as any as CustomEnvVars

interface DevToolsWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R
}

const devToolsWindow = window as any as DevToolsWindow

ReactGA.initialize(customEnvVars.REACT_APP_GA_KEY);
ReactGA.pageview(window.location.pathname + window.location.search);
const composeEnhancers = devToolsWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);