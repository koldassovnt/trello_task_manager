import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Detail from './Components/Detail';
import AllCards from './Components/AllCards';
import CustomNavbar from './Components/CustomNavbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Registration from './Components/Registration';
import {useCookies} from 'react-cookie';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function App() {

  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
  const isOnline = cookieJWT['jwt']? true : false;

  const[user, setUser] = useState(Object);

  async function getUser(){
    
    if (isOnline) {
    
      const bearer = "Bearer "+ cookieJWT['jwt'].jwtToken;

      const response = await fetch("http://localhost:8080/api/profile", {
          method:'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": bearer
          }
      });
      
      if(response.status === 200){
          let res = await response.json();
          console.log(res);
          setUser(res);
      }
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <div>
          <CustomNavbar isLogged = {isOnline} name = {user.fullName}/>
        </div>
        <Switch>
          <Route path="/allcards">
            <AllCards/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Registration/>
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
