import React from 'react';

import { createBrowserHistory } from "history";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';

//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/css/style.css';

const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

<BrowserRouter history={history}>
    <App />
</BrowserRouter>,

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
