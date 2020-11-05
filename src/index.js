import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routes from "./routes";
const store = createStore(rootReducer, applyMiddleware(thunk))
ReactDOM.render(

    <Router>
        <Provider store={store}>

            <Routes />

        </Provider>

    </Router>

    ,
  document.getElementById('root')
);
reportWebVitals();
