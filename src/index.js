import React from 'react';

import {createBrowserHistory} from "history";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';

//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/css/style.css';
import "flatpickr/dist/themes/light.css";
// import '@styles/react/libs/toastify/toastify.scss'
import {ToastContainer} from "react-toastify";

const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter history={history}>
        <App/>
        <ToastContainer newestOnTop/>
    </BrowserRouter>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
