import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Switch, BrowserRouter, Router, Route,} from "react-router-dom";
import Header from "./partials/header/index";
import Footer from "./partials/footer/index"
import Home from "./content/home"
import About from "./content/about"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
