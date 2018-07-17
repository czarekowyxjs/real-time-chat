import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';
import ioClient from 'socket.io-client';
import Login from './components/Auth/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';

import { RequireAuth } from './hocs/Auth';

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
          </div>
          <Switch>
            <Route path="/login" render={(props) => <Login {...this.props} socket={socket}/>}/>
            <Route path="/dashboard" component={RequireAuth(Dashboard, socket)}/>
          </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
