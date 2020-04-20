import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import config from './config';
import createStore from './store';

import Screen from './components/routes/Screen';
import Login from './components/Login';
import RegisterNGO from './components/RegisterNGO';
import RegisterVolunteer from './components/RegisterVolunteer';
import Navbar from './components/Navbar';

const store = createStore(config);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route path="/" component={Screen} exact />
              <Route path="/login" component={Login} />
              <Route path="/registervolunteer" component={RegisterVolunteer} />
              <Route path="/registerngo" component={RegisterNGO} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default observer(App);
