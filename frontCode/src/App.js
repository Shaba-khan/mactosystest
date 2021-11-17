import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-notifications/lib/notifications.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Product from './Components/Product';

import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="">
       <BrowserRouter>
         <Routes>
            <Route exact path="/" element={<SignUp />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/product" element={<Product />}/>


          </Routes>
        </BrowserRouter>  

      </div>
    );
  }
}

export default App;
