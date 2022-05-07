import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AlertContainer } from "./components/CustomAlert/alert";
import { Provider } from "react-redux";
import {  createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Reducers from "./store/reducers/allReducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
			<AlertContainer floatingTime={5000} />
		</React.StrictMode>
	</Provider>,
	document.getElementById("root")
);
