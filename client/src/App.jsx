import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';
import ioClient from 'socket.io-client';
import Login from './components/Auth/Login.jsx';
import Logout from './components/Logout/Logout.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';

import { RequireAuth, NoRequireAuth } from './hocs/Auth';

let socket;

class App extends Component {
  constructor(props) {
    super(props);

    socket = ioClient("http://localhost:8000");

  }
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/logout">Logout</Link>
          </div>
          <Switch>
            <Route path="/login" component={NoRequireAuth(Login, socket)}/>
            <Route path="/dashboard" component={RequireAuth(Dashboard, socket)}/>
            <Route path="/logout" component={RequireAuth(Logout, socket)}/>
          </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
