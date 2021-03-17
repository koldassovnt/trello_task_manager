import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Detail from './Components/Detail';
import AllCards from './Components/AllCards';
import CustomNavbar from './Components/CustomNavbar';
import Home from './Components/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";



function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <CustomNavbar/>
        </div>
        <Switch>
          <Route path="/allcards">
            <AllCards/>
          </Route>
          <Route path="/detail/:id">
            <Detail/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
