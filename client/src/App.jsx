import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Logout from './components/Logout/Logout.jsx';
import AppContainer from './components/AppContainer/AppContainer.jsx';

import { RequireAuth, NoRequireAuth } from './hocs/Auth';

import "./App.css";

class App extends Component {
  render() {
    return (
      <div id="app">
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={NoRequireAuth(Login)}/>
            <Route path="/register" component={NoRequireAuth(Register)}/>
            <Route path="/logout" component={RequireAuth(Logout)}/>
            <Route path="/" component={RequireAuth(AppContainer)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
